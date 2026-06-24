

from .models import QuoteRequest, ContactMessage

import os
import json
from django.shortcuts import render, redirect
from django.contrib import messages
from django.core.mail import send_mail
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import anthropic


def home(request):
    return render(request, 'home.html')


def about(request):
    return render(request, 'about.html')


def services(request):
    return render(request, 'services.html')


def quote(request):
    if request.method == 'POST':
        full_name     = request.POST.get('full_name')
        company       = request.POST.get('company', '')
        email         = request.POST.get('email')
        phone         = request.POST.get('phone')
        origin        = request.POST.get('origin')
        destination   = request.POST.get('destination')
        shipment_type = request.POST.get('shipment_type')
        cargo_type    = request.POST.get('cargo_type', '')
        weight        = request.POST.get('weight', '')
        dimensions    = request.POST.get('dimensions', '')
        notes         = request.POST.get('notes', '')

        body = f"""
New Quote Request from QuikImpo Website
========================================
Name:         {full_name}
Company:      {company}
Email:        {email}
Phone:        {phone}
Origin:       {origin}
Destination:  {destination}
Shipment:     {shipment_type}
Cargo Type:   {cargo_type}
Weight:       {weight} kg
Dimensions:   {dimensions}
Notes:        {notes}
        """

        try:# Save to database
            QuoteRequest.objects.create(
                full_name=full_name, company=company, email=email,
                phone=phone, origin=origin, destination=destination,
                shipment_type=shipment_type, cargo_type=cargo_type,
                weight=weight, dimensions=dimensions, notes=notes
            )
            # Send email notification
            send_mail(
                subject=f'New Quote Request – {full_name}',
                message=body,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.DEFAULT_FROM_EMAIL],
                fail_silently=True,
            )
            messages.success(request, '✅ Quote submitted! We will contact you within 2 hours.')
        except Exception as e:
            messages.error(request, '⚠ Submission failed. Please email us directly at joashodhiamboreagan@gmail.com'



    return render(request, 'quote.html')


def contact(request):
    if request.method == 'POST':
        full_name = request.POST.get('full_name')
        email     = request.POST.get('email')
        phone     = request.POST.get('phone', '')
        subject   = request.POST.get('subject')
        msg_body  = request.POST.get('message')

        body = f"""
New Contact Message from QuikImpo Website
==========================================
Name:    {full_name}
Email:   {email}
Phone:   {phone}
Subject: {subject}
Message:
{msg_body}
        """

        try:
            # Save to database
            ContactMessage.objects.create(
                full_name=full_name, email=email,
                phone=phone, subject=subject, message=msg_body
            )
            # Send email notification
            send_mail(
                subject=f'Contact: {subject} – {full_name}',
                message=body,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.DEFAULT_FROM_EMAIL],
                fail_silently=True,
            )
            messages.success(request, '✅ Message sent! We will get back to you shortly.')
        except Exception as e:
            messages.error(request, '⚠ Could not send message. Please email us directly.')
        .')

        return redirect('contact')

    return render(request, 'contact.html')

@csrf_exempt
def ai_chat(request):
    if request.method == 'POST':
        try:
            data         = json.loads(request.body)
            user_message = data.get('message', '')

            client = anthropic.Anthropic(api_key=os.getenv('ANTHROPIC_API_KEY'))

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
            return JsonResponse({'reply': reply})

        except Exception as e:
            return JsonResponse({
                'reply': 'Sorry, I am having trouble right now. Please email quotes@quikimpo.com or call us directly.'
            }, status=200)

    return JsonResponse({'reply': 'Invalid request'}, status=400)

def tracking(request):
    return render(request, 'tracking.html')