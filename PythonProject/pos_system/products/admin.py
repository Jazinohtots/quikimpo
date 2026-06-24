from django.contrib import admin
from .models import Product
admin.site.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "barcode", "category", "selling_price", "stock_quantity", "is_active")
    search_fields = ("name", "barcode", "category")
    list_filter = ("category", "is_active")

# Register your models here.
