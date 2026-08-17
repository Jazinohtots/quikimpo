from django.conf import settings
from django.core.cache import cache
from django.core.mail import send_mail
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
import anthropic
import re

from .models import QuoteRequest, ContactMessage, Shipment, FAQ
from .serializers import (
    QuoteRequestSerializer,
    ContactMessageSerializer,
    ShipmentSerializer,
    FAQSerializer,
)


AI_SYSTEM_PROMPT = """You are QuikImpo's Logistics Assistant.

You represent QuikImpo, a Nairobi-based freight forwarding and logistics company serving Kenya, East Africa, China, the UAE, Europe, and international trade routes. The company stays involved across bookings, documentation, customs, transportation, warehousing, shipment visibility, and final delivery coordination.

Help visitors understand air freight, sea freight (FCL and LCL), road freight and cross-border transportation, customs clearance, warehousing and distribution, shipment tracking, import/export documentation, and general freight forwarding. Be professional, human, practical, concise, and transparent. Prefer the verified company and FAQ context supplied below.

Never invent prices, duties, shipment statuses, delivery dates, airline or container availability, regulatory requirements, or capabilities. Never claim a shipment is booked, cleared, delivered, delayed, released, or in transit unless the supplied tracking context confirms it. Never present estimates as guarantees. Requirements and transit times vary by cargo, origin, destination, route, season, and applicable regulations; tell the visitor that the QuikImpo team should confirm shipment-specific details.

If a visitor wants a quote, ask for cargo type, origin, destination, weight, dimensions or package count if known, preferred freight method, and timeline, then direct them to /quote. If they want human support, provide WhatsApp +254722281742 and info@majuufreigthforwarders.com. Keep answers focused and avoid unrelated topics.

Verified QuikImpo services:
- Air Freight: time-sensitive cargo, booking, export documentation, cargo handling, customs clearance, arrival processing, and onward transportation; smaller shipments may be consolidated where suitable.
- Sea Freight: FCL and LCL, origin collection, consolidation, export and shipping documentation, vessel booking, port handling, customs clearance, and inland delivery. Transit times vary.
- Road Freight: inland and cross-border transportation through Kenya, Uganda, Tanzania, Rwanda, and wider East Africa, with cargo collection, documentation, border coordination, and delivery through logistics partners.
- Customs Clearance: customs declarations, HS classification, import documentation, duty and tax assessment, verification, regulatory compliance, cargo release, and PVoC/CoC coordination where applicable.
- Warehousing and Distribution: bonded and non-bonded storage, inventory coordination, consolidation, cross-docking, pick-and-pack, and distribution support where available. Do not promise duty deferral or facility ownership.
- Shipment Tracking: visibility across collection, departure, transit, arrival, port or airport handling, customs clearance, and final delivery when tracking information is available. Do not claim GPS or real-time status unless supplied.

{faq_context}
{tracking_context}"""


def _client_ip(request):
    return request.META.get('REMOTE_ADDR', 'unknown')


def _within_chat_limit(request):
    key = f"ai-chat:{_client_ip(request)}"
    count = cache.get(key, 0)
    if count >= 10:
        return False
    cache.set(key, count + 1, timeout=60)
    return True


def _faq_context():
    faqs = FAQ.objects.all()[:12]
    if not faqs:
        return "No FAQ records are currently available."
    return "Relevant FAQ records:\n" + "\n".join(
        f"Q: {faq.question}\nA: {faq.answer}" for faq in faqs
    )


def _tracking_context(message):
    tracking_number = re.search(r'\bQ(?:I|K)I?[-\s]?\d{4}[-\s]?\d{3,}\b', message, re.IGNORECASE)
    if not tracking_number:
        return "No tracking number was supplied. Do not invent tracking details."

    normalized = re.sub(r'\s+', '-', tracking_number.group(0).upper())
    shipment = Shipment.objects.prefetch_related('events').filter(
        tracking_number=normalized
    ).first()
    if not shipment:
        return f"Tracking number {normalized} was not found in the backend. Say that it could not be found and direct the visitor to the tracking page or human support."

    events = '; '.join(
        f"{event.get_status_display()} at {event.location} ({event.occurred_at.isoformat()})"
        for event in shipment.events.all()
    )
    return (
        f"Verified tracking context for {shipment.tracking_number}: status={shipment.get_status_display()}, "
        f"origin={shipment.origin}, destination={shipment.destination}, eta={shipment.eta or 'not available'}, "
        f"events={events or 'none recorded'}."
    )


class QuoteCreateAPIView(APIView):
    """POST /api/quote/ — same fields and behaviour as the quote.html form."""

    def post(self, request):
        serializer = QuoteRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        quote = serializer.save()

        body = f"""
New Quote Request from QuikImpo Website
========================================
Name:         {quote.full_name}
Company:      {quote.company}
Email:        {quote.email}
Phone:        {quote.phone}
Origin:       {quote.origin}
Destination:  {quote.destination}
Shipment:     {quote.shipment_type}
Cargo Type:   {quote.cargo_type}
Weight:       {quote.weight} kg
Dimensions:   {quote.dimensions}
Notes:        {quote.notes}
        """

        send_mail(
            subject=f'New Quote Request – {quote.full_name}',
            message=body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.DEFAULT_FROM_EMAIL],
            fail_silently=True,
        )

        return Response(
            {'detail': 'Quote submitted! We will contact you within 2 hours.'},
            status=status.HTTP_201_CREATED,
        )


class ContactCreateAPIView(APIView):
    """POST /api/contact/ — same fields and behaviour as the contact.html form."""

    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        msg = serializer.save()

        body = f"""
New Contact Message from QuikImpo Website
==========================================
Name:    {msg.full_name}
Email:   {msg.email}
Phone:   {msg.phone}
Subject: {msg.subject}
Message:
{msg.message}
        """

        send_mail(
            subject=f'Contact: {msg.subject} – {msg.full_name}',
            message=body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.DEFAULT_FROM_EMAIL],
            fail_silently=True,
        )

        return Response(
            {'detail': 'Message sent! We will get back to you shortly.'},
            status=status.HTTP_201_CREATED,
        )


class ShipmentTrackAPIView(generics.RetrieveAPIView):
    """GET /api/tracking/<tracking_number>/"""

    serializer_class = ShipmentSerializer
    lookup_field = 'tracking_number'
    lookup_url_kwarg = 'tracking_number'
    queryset = Shipment.objects.prefetch_related('events').all()

    def get_object(self):
        tracking_number = self.kwargs['tracking_number'].strip().upper()
        return get_object_or_404(self.get_queryset(), tracking_number=tracking_number)


class FAQListAPIView(generics.ListAPIView):
    serializer_class = FAQSerializer
    queryset = FAQ.objects.all()


class AIChatAPIView(APIView):
    """POST /api/ai-chat/ — QuikImpo logistics assistant."""

    def post(self, request):
        user_message = request.data.get('message', '').strip()
        history = request.data.get('history', [])
        if not user_message:
            return Response({'detail': 'Message is required.'}, status=status.HTTP_400_BAD_REQUEST)
        if len(user_message) > 2000:
            return Response({'detail': 'Message must be 2,000 characters or fewer.'}, status=status.HTTP_400_BAD_REQUEST)
        if not isinstance(history, list) or len(history) > 12:
            return Response({'detail': 'Conversation history is invalid.'}, status=status.HTTP_400_BAD_REQUEST)
        if not _within_chat_limit(request):
            return Response({'detail': 'Please wait a moment before sending another message.'}, status=status.HTTP_429_TOO_MANY_REQUESTS)

        messages = []
        for item in history[-12:]:
            if not isinstance(item, dict) or item.get('role') not in ('user', 'assistant'):
                continue
            content = str(item.get('content', '')).strip()
            if content and len(content) <= 2000:
                messages.append({'role': item['role'], 'content': content})
        messages.append({'role': 'user', 'content': user_message})

        try:
            client = anthropic.Anthropic(api_key=settings.ANTHROPIC_API_KEY)

            response = client.messages.create(
                model="claude-sonnet-4-6",
                max_tokens=600,
                system=AI_SYSTEM_PROMPT.format(
                    faq_context=_faq_context(),
                    tracking_context=_tracking_context(user_message),
                ),
                messages=messages,
            )

            reply = response.content[0].text
            return Response({'reply': reply})

        except Exception:
            return Response({
                'detail': 'The assistant is temporarily unavailable. Please contact QuikImpo on WhatsApp at +254722281742 or email info@majuufreigthforwarders.com.'
            }, status=status.HTTP_503_SERVICE_UNAVAILABLE)
