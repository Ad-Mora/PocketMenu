from django.contrib import admin
from .models import Restaurant
from .models import MenuItem
from .models import MenuCategory


class MenuCategoryInline(admin.StackedInline):
    model = MenuCategory


class MenuItemInline(admin.StackedInline):
    model = MenuItem


class RestaurantAdmin(admin.ModelAdmin):
    inlines = [
        MenuCategoryInline
    ]


class MenuCategoryAdmin(admin.ModelAdmin):
    inlines = [
        MenuItemInline
    ]

admin.site.register(Restaurant, RestaurantAdmin)
admin.site.register(MenuCategory, MenuCategoryAdmin)
admin.site.register(MenuItem)
