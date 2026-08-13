from django.db import models


class QuoteRequest(models.Model):
    full_name     = models.CharField(max_length=200)
    company       = models.CharField(max_length=200, blank=True)
    email         = models.EmailField()
    phone         = models.CharField(max_length=50)
    origin        = models.CharField(max_length=200)
    destination   = models.CharField(max_length=200)
    shipment_type = models.CharField(max_length=100)
    cargo_type    = models.CharField(max_length=100, blank=True)
    weight        = models.CharField(max_length=50, blank=True)
    dimensions    = models.CharField(max_length=100, blank=True)
    notes         = models.TextField(blank=True)
    submitted_at  = models.DateTimeField(auto_now_add=True)
    is_responded  = models.BooleanField(default=False)

    class Meta:
        ordering = ['-submitted_at']
        verbose_name        = 'Quote Request'
        verbose_name_plural = 'Quote Requests'

    def __str__(self):
        return f"{self.full_name} — {self.origin} → {self.destination} ({self.submitted_at.strftime('%d %b %Y')})"


class ContactMessage(models.Model):
    full_name    = models.CharField(max_length=200)
    email        = models.EmailField()
    phone        = models.CharField(max_length=50, blank=True)
    subject      = models.CharField(max_length=200)
    message      = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)
    is_read      = models.BooleanField(default=False)

    class Meta:
        ordering = ['-submitted_at']
        verbose_name        = 'Contact Message'
        verbose_name_plural = 'Contact Messages'

    def __str__(self):
        return f"{self.full_name} — {self.subject} ({self.submitted_at.strftime('%d %b %Y')})"


class Shipment(models.Model):
    """
    A trackable shipment. tracking_number follows the format already used
    in templates/tracking.html: QKI-YEAR-XXXXX (e.g. QKI-2026-00123).
    """

    STATUS_CHOICES = [
        ('confirmed', 'Order Confirmed'),
        ('picked_up', 'Picked Up'),
        ('in_transit', 'In Transit'),
        ('customs', 'Customs Clearance'),
        ('out_for_delivery', 'Out for Delivery'),
        ('delivered', 'Delivered'),
    ]

    SHIPMENT_TYPE_CHOICES = [
        ('air', 'Air Freight'),
        ('sea', 'Sea Freight (FCL)'),
        ('lcl', 'Sea Freight (LCL)'),
        ('road', 'Road Transport'),
        ('courier', 'Express Courier'),
    ]

    tracking_number = models.CharField(max_length=30, unique=True)
    quote_request    = models.ForeignKey(
        QuoteRequest, on_delete=models.SET_NULL, null=True, blank=True,
        related_name='shipments'
    )
    origin           = models.CharField(max_length=200)
    destination      = models.CharField(max_length=200)
    shipment_type    = models.CharField(max_length=20, choices=SHIPMENT_TYPE_CHOICES)
    status           = models.CharField(max_length=20, choices=STATUS_CHOICES, default='confirmed')
    eta              = models.DateField(null=True, blank=True)
    created_at       = models.DateTimeField(auto_now_add=True)
    updated_at       = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name        = 'Shipment'
        verbose_name_plural = 'Shipments'

    def __str__(self):
        return f"{self.tracking_number} — {self.origin} → {self.destination}"

    STEP_ORDER = ['confirmed', 'picked_up', 'in_transit', 'customs', 'out_for_delivery', 'delivered']

    @property
    def step(self):
        try:
            return self.STEP_ORDER.index(self.status) + 1
        except ValueError:
            return 1


class ShipmentEvent(models.Model):
    """One row in a shipment's history timeline."""

    shipment  = models.ForeignKey(Shipment, on_delete=models.CASCADE, related_name='events')
    status    = models.CharField(max_length=20, choices=Shipment.STATUS_CHOICES)
    location  = models.CharField(max_length=200)
    note      = models.CharField(max_length=255, blank=True)
    occurred_at = models.DateTimeField()

    class Meta:
        ordering = ['occurred_at']
        verbose_name        = 'Shipment Event'
        verbose_name_plural = 'Shipment Events'

    def __str__(self):
        return f"{self.shipment.tracking_number} — {self.get_status_display()} ({self.occurred_at.strftime('%d %b %Y')})"


class FAQ(models.Model):
    question   = models.CharField(max_length=255)
    answer     = models.TextField()
    order      = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']
        verbose_name        = 'FAQ'
        verbose_name_plural = 'FAQs'

    def __str__(self):
        return self.question

    