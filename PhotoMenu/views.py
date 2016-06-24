from django.shortcuts import render
from .utils import *

# Create your views here.

# AJAX
def drop_down_suggestions(request):
    context = get_menu_items_for_search_string(request, 5)
    return render(request, 'PhotoMenu/Snippets/AutoCompleteSuggestions.html', context)

# SitePages
def homepage(request):
    return render(request, 'PhotoMenu/SitePages/Homepage.html')

def contact_page(request):
    return render(request, 'PhotoMenu/SitePages/ContactPage.html')

def search_results_page(request):
    context = get_menu_items_for_search_string(request)
    return render(request, 'PhotoMenu/SitePages/SearchResultsPage.html', context)

def restaurants_page(request,restaurant_name):
    return render(request, 'PhotoMenu/SitePages/RestaurantPage.html')

def favorites_page(request):
    return render(request, 'PhotoMenu/SitePages/FavoritesPage.html')

