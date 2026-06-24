from django.shortcuts import render, redirect
from django.contrib import messages
from django.core.mail import send_mail
from django.conf import settings


def home(request):
    return render(request, 'home.html')


def about(request):
    return render(request, 'about.html')


def services(request):
    return render(request, 'services.html')


def quote(request):
    if request.method == 'POST':
        full_name    = request.POST.get('full_name')
        company      = request.POST.get('company', '')
        email        = request.POST.get('email')
        phone        = request.POST.get('phone')
        origin       = request.POST.get('origin')
        destination  = request.POST.get('destination')
        shipment_type = request.POST.get('shipment_type')
        cargo_type   = request.POST.get('cargo_type', '')
        weight       = request.POST.get('weight', '')
        dimensions   = request.POST.get('dimensions', '')
        notes        = request.POST.get('notes', '')

        # Build email body
        body = f"""
New Quote Request from QuikImpo Website

Name:        {full_name}
Company:     {company}
Email:       {email}
Phone:       {phone}
Origin:      {origin}
Destination: {destination}
Shipment:    {shipment_type}
Cargo Type:  {cargo_type}
Weight:      {weight} kg
Dimensions:  {dimensions}
Notes:       {notes}
        """

        try:
            send_mail(
                subject=f'New Quote Request – {full_name}',
                message=body,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.DEFAULT_FROM_EMAIL],
                fail_silently=False,
            )
            messages.success(request, '✅ Quote submitted! We will contact you within 2 hours.')
        except Exception:
            messages.error(request, '⚠ Submission failed. Please email us directly at quotes@quikimpo.com.')

        return redirect('quote')

    return render(request, 'quote.html')


def contact(request):
    return render(request, 'contact.html')