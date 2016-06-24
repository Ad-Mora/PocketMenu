# from django.core.context_processors import csrf
from django.shortcuts import render
from .utils import *

# Create your views here.

# AJAX
def drop_down_suggestions(request):
    query_string = ""

    if request.method == "POST":
        json_data = json.loads(request.body)
        print json_data
        query_string = json_data['search-bar']

    context = get_menu_items_for_search_string(query_string, 5)
    return render(request, 'PhotoMenu/Snippets/AutoCompleteSuggestions.html', context)

# SitePages
def homepage(request):
    return render(request, 'PhotoMenu/SitePages/Homepage.html')

def contact_page(request):
    return render(request, 'PhotoMenu/SitePages/ContactPage.html')

def search_results_page(request):

    if request.method == "POST":
        query_string = request.POST['search-bar']
        print request.POST
        context = get_menu_items_for_search_string(query_string)
        print request.POST['search-type']
        context['search_type'] = request.POST['search-type']

        return render(request, 'PhotoMenu/SitePages/SearchResultsPage.html', context)

def restaurants_page(request,restaurant_name):
    return render(request, 'PhotoMenu/SitePages/RestaurantPage.html')

def favorites_page(request):
    return render(request, 'PhotoMenu/SitePages/FavoritesPage.html')

