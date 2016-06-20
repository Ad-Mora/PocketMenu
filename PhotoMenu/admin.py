from django.contrib import admin
from .models import Restaurant
from .models import FoodItem
from .models import MenuCategory

# Register your models here.

admin.site.register(Restaurant)
admin.site.register(FoodItem)
admin.site.register(MenuCategory)
