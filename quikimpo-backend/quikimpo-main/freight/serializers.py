from rest_framework import serializers
from .models import QuoteRequest, ContactMessage, Shipment, ShipmentEvent, FAQ


class QuoteRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuoteRequest
        fields = [
            'full_name', 'company', 'email', 'phone',
            'origin', 'destination', 'shipment_type', 'cargo_type',
            'weight', 'dimensions', 'notes',
        ]


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['full_name', 'email', 'phone', 'subject', 'message']


class ShipmentEventSerializer(serializers.ModelSerializer):
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = ShipmentEvent
        fields = ['status', 'status_display', 'location', 'note', 'occurred_at']


class ShipmentSerializer(serializers.ModelSerializer):
    events = ShipmentEventSerializer(many=True, read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    shipment_type_display = serializers.CharField(source='get_shipment_type_display', read_only=True)

    class Meta:
        model = Shipment
        fields = [
            'tracking_number', 'origin', 'destination',
            'shipment_type', 'shipment_type_display',
            'status', 'status_display', 'step', 'eta', 'events',
        ]


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ['question', 'answer']
