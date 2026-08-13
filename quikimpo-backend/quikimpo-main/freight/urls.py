
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('services/', views.services, name='services'),
    path('quote/', views.quote, name='quote'),
    path('contact/', views.contact, name='contact'),
    path('tracking/', views.tracking, name='tracking'),
    path('ai-chat/', views.ai_chat, name='ai_chat'),

    # REST API for the React frontend — see api_urls.py / api_views.py
    path('api/', include('freight.api_urls')),
]

