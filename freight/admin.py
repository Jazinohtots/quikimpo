from django.contrib import admin
from .models import QuoteRequest, ContactMessage, FAQ

@admin.register(QuoteRequest)
class QuoteRequestAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'phone', 'origin', 'destination', 'created_at')
    search_fields = ('full_name', 'email', 'phone', 'origin', 'destination')
    list_filter = ('created_at',)

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'phone', 'company', 'created_at')
    search_fields = ('full_name', 'email', 'phone', 'company')
    list_filter = ('created_at',)

@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ('question',)
    search_fields = ('question',)