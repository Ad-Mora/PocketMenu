from django.contrib import admin
from .models import Restaurant
from .models import FoodItem
from .models import MenuCategory


class MenuCategoryInline(admin.StackedInline):
    model = MenuCategory


class FoodItemInline(admin.StackedInline):
    model = FoodItem


class RestaurantAdmin(admin.ModelAdmin):
    inlines = [
        MenuCategoryInline
    ]


class MenuCategoryAdmin(admin.ModelAdmin):
    inlines = [
        FoodItemInline
    ]

admin.site.register(Restaurant, RestaurantAdmin)
admin.site.register(MenuCategory, MenuCategoryAdmin)
admin.site.register(FoodItem)
