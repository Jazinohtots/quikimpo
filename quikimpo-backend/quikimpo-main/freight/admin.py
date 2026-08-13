from django.contrib import admin
from .models import QuoteRequest, ContactMessage, Shipment, ShipmentEvent, FAQ


@admin.register(QuoteRequest)
class QuoteRequestAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'phone', 'origin', 'destination', 'shipment_type', 'submitted_at', 'is_responded')
    search_fields = ('full_name', 'email', 'phone', 'origin', 'destination')
    list_filter = ('shipment_type', 'is_responded', 'submitted_at')


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'phone', 'subject', 'submitted_at', 'is_read')
    search_fields = ('full_name', 'email', 'phone', 'subject')
    list_filter = ('subject', 'is_read', 'submitted_at')


class ShipmentEventInline(admin.TabularInline):
    model = ShipmentEvent
    extra = 1


@admin.register(Shipment)
class ShipmentAdmin(admin.ModelAdmin):
    list_display = ('tracking_number', 'origin', 'destination', 'shipment_type', 'status', 'eta', 'updated_at')
    search_fields = ('tracking_number', 'origin', 'destination')
    list_filter = ('status', 'shipment_type')
    inlines = [ShipmentEventInline]


@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ('question', 'order')
    search_fields = ('question',)
    ordering = ('order',)
