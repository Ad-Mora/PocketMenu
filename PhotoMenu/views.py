from django.views.decorators.csrf import ensure_csrf_cookie
from django.shortcuts import render
from .utils import *
import json


# AJAX
def drop_down_suggestions(request):
    if request.method == "POST":
        json_data = json.loads(request.body)
        search_type = json_data['search-type']
        query_string = json_data['search-bar']

        # either MenuItems or Restaurants can be 'suggested'
        if search_type == "food":
            context = {
                'query_string':     query_string,
                'menu_items_list':  get_menu_items_for_search_string(query_string, 5)
            }
            return render(request, 'PhotoMenu/Snippets/AutoCompleteFoodSuggestions.html', context)

        elif search_type == "restaurant":
            context = {
                'query_string':     query_string,
                'restaurants_list':  get_restaurants_for_search_string(query_string)
            }
            return render(request, 'PhotoMenu/Snippets/AutoCompleteRestaurantSuggestions.html', context)


def get_favorite_foods(request):
    if request.method == "POST":
        json_data = json.loads(request.body)
        food_ids = json_data['food-ids-list']
        print "you made it!"

# SitePages
def homepage(request):
    return render(request, 'PhotoMenu/SitePages/Homepage.html')


def contact_page(request):
    return render(request, 'PhotoMenu/SitePages/ContactPage.html')


def search_results_page(request):
    if request.method == "POST":
        query_string = request.POST['search-bar']

        # only MenuItems can be returned to the SearchResultsPage (for now)
        context = {
            'query_string':     query_string,
            'menu_items_list':  get_menu_items_for_search_string(query_string),
            'search_type':      request.POST['search-type']
        }
        return render(request, 'PhotoMenu/SitePages/SearchResultsPage.html', context)

    else:
        return render(request, 'PhotoMenu/SitePages/SearchResultsPage.html')


def restaurants_page(request,restaurant_name):
    return render(request, 'PhotoMenu/SitePages/RestaurantPage.html')


@ensure_csrf_cookie
def favorites_page(request):
    return render(request, 'PhotoMenu/SitePages/FavoritesPage.html')

