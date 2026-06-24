from django.contrib import admin
from django.urls import path
from freight import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',         views.home,     name='home'),
    path('about/',   views.about,    name='about'),
    path('services/', views.services, name='services'),
    path('quote/',   views.quote,    name='quote'),
    path('contact/', views.contact,  name='contact'),
]