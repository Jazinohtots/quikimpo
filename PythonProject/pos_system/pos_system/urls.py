from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('freight.urls')),
    path('products/', include('products.urls')),
    path('sales/', include('sales.urls')),
]