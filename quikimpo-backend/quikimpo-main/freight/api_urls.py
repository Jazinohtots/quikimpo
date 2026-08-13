from django.urls import path
from . import api_views

urlpatterns = [
    path('quote/', api_views.QuoteCreateAPIView.as_view(), name='api-quote'),
    path('contact/', api_views.ContactCreateAPIView.as_view(), name='api-contact'),
    path('tracking/<str:tracking_number>/', api_views.ShipmentTrackAPIView.as_view(), name='api-tracking'),
    path('faqs/', api_views.FAQListAPIView.as_view(), name='api-faqs'),
    path('ai-chat/', api_views.AIChatAPIView.as_view(), name='api-ai-chat'),
]
