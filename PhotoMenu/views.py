from django.shortcuts import render
from django.http import HttpResponse
from .models import Restaurant

# Create your views here.

def homepage(request):
    return render(request, 'PhotoMenu/SitePages/Homepage.html')

def contact_page(request):
    return render(request, 'PhotoMenu/SitePages/ContactPage.html')

def search_results_page(request):
    return render(request, 'PhotoMenu/SitePages/SearchResultsPage.html')

def restaurants_page(request, restaurant_name):

    restaurant_name = restaurant_name.replace('-', ' ')
    restaurant = Restaurant.objects.get(name=restaurant_name)

    context = {
        'restaurant': restaurant,
    }
    return render(request, 'PhotoMenu/SitePages/RestaurantPage.html', context)

def favorites_page(request):
    return render(request, 'PhotoMenu/SitePages/FavoritesPage.html')

