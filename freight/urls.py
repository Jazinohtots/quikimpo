
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('services/', views.services, name='services'),
    path('quote/', views.quote, name='quote'),
    path('contact/', views.contact, name='contact'),
    path('tracking/', views.tracking, name='tracking'),
    path('ai-chat/', views.ai_chat, name='ai_chat'),

]

