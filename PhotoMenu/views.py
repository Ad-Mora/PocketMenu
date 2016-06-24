from django.shortcuts import render
from django.http import HttpResponse
from .models import Restaurant
from .models import MenuCategory
from .models import MenuItem

def homepage(request):
    return render(request, 'PhotoMenu/SitePages/Homepage.html')

def contact_page(request):
    return render(request, 'PhotoMenu/SitePages/ContactPage.html')

def search_results_page(request):
    return render(request, 'PhotoMenu/SitePages/SearchResultsPage.html')

def restaurants_page(request, restaurant_name):

    restaurant_name = restaurant_name.replace('-', ' ')
    restaurant = Restaurant.objects.get(name=restaurant_name)
    menu_categories = MenuCategory.objects.filter(restaurant__name=restaurant_name)

    num_horizontal_cats = 3
    horizontal_cats = menu_categories[:num_horizontal_cats]
    remaining_cats = menu_categories[num_horizontal_cats:]

    categories = {}
    for category in menu_categories:
        categories[category] = []

    for category in menu_categories:
        menu_items = MenuItem.objects.filter(menu_category_id=category.id)
        for item in menu_items:
            categories[category].append(item)

    context = {
        'restaurant': restaurant,
        'categories': categories,
        'horizontal_cats': horizontal_cats,
        'remaining_cats': remaining_cats,
    }
    return render(request, 'PhotoMenu/SitePages/RestaurantPage.html', context)

def favorites_page(request):
    return render(request, 'PhotoMenu/SitePages/FavoritesPage.html')

