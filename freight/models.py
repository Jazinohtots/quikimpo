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

    