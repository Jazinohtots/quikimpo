from django.conf import settings
from django.core.mail import send_mail
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
import anthropic

from .models import QuoteRequest, ContactMessage, Shipment, FAQ
from .serializers import (
    QuoteRequestSerializer,
    ContactMessageSerializer,
    ShipmentSerializer,
    FAQSerializer,
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
    """POST /api/ai-chat/ — same system prompt and behaviour as views.ai_chat."""

    def post(self, request):
        user_message = request.data.get('message', '')
        if not user_message:
            return Response({'reply': 'Invalid request'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            client = anthropic.Anthropic(api_key=settings.ANTHROPIC_API_KEY)

            response = client.messages.create(
                model="claude-sonnet-4-6",
                max_tokens=400,
                system="""You are the QuikImpo AI assistant for a freight forwarding and shipping
company serving Africa, especially East Africa (Kenya, Uganda, Tanzania, Rwanda).

You help customers with:
- Shipping quotes and estimated costs
- Transit times for air vs sea freight
- Customs clearance process in Kenya
- Cargo tracking
- Dangerous goods and special cargo handling
- Incoterms explained simply (FOB, CIF, EXW, DDP)
- Door-to-door delivery options
- General logistics and import/export questions

Your rules:
- Be concise, professional, and friendly
- If the user asks for a quote, ask for: origin country, destination, cargo type, and weight
- If they want to be contacted by the team, ask for their name, email, and phone number,
  then confirm a team member will reach out within 2 hours
- Never invent specific prices — direct them to the quote form for accurate pricing
- Keep answers under 4 sentences where possible
- If asked something unrelated to shipping or logistics, politely redirect""",
                messages=[{"role": "user", "content": user_message}]
            )

            reply = response.content[0].text
            return Response({'reply': reply})

        except Exception:
            return Response({
                'reply': 'Sorry, I am having trouble right now. Please email info@majuufreigthforwarders.com or call us directly.'
            })
