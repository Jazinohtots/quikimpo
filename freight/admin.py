from django.contrib import admin
from .models import QuoteRequest, ContactMessage


@admin.register(QuoteRequest)
class QuoteRequestAdmin(admin.ModelAdmin):
    list_display  = ('full_name', 'company', 'email', 'phone',
                     'origin', 'destination', 'shipment_type', 'submitted_at', 'is_responded')
    list_filter   = ('shipment_type', 'is_responded', 'submitted_at')
    search_fields = ('full_name', 'email', 'company', 'origin', 'destination')
    readonly_fields = ('submitted_at',)
    list_editable = ('is_responded',)
    ordering      = ('-submitted_at',)


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display  = ('full_name', 'email', 'subject', 'submitted_at', 'is_read')
    list_filter   = ('subject', 'is_read', 'submitted_at')
    search_fields = ('full_name', 'email', 'subject')
    readonly_fields = ('submitted_at',)
    list_editable = ('is_read',)
    ordering      = ('-submitted_at',)

    