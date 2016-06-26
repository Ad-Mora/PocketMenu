from django.views.decorators.csrf import ensure_csrf_cookie
from django.shortcuts import render
from .utils import *
import json

SEARCH_TYPE_RESTAURANT = "Restaurant"
SEARCH_TYPE_FOOD = "Food"

# AJAX
def drop_down_suggestions(request):
    if request.method == "POST":
        json_data = json.loads(request.body)
        search_type = json_data['search-type']
        query_string = json_data['search-bar']

        # either MenuItems or Restaurants can be 'suggested'
        if search_type == SEARCH_TYPE_FOOD:
            context = {
                'query_string':     query_string,
                'menu_items_list':  get_menu_items_for_search_string(query_string, 5)
            }
            return render(request, 'PhotoMenu/Snippets/AutoCompleteFoodSuggestions.html', context)

        elif search_type == SEARCH_TYPE_RESTAURANT:
            context = {
                'query_string':     query_string,
                'restaurants_list':  get_restaurants_for_search_string(query_string)
            }
            return render(request, 'PhotoMenu/Snippets/AutoCompleteRestaurantSuggestions.html', context)


def get_favorite_foods(request):
    if request.method == "POST":
        json_data = json.loads(request.body)
        food_ids_list = json_data['food-ids-list']
        context = {
            'restaurants_list': get_favorite_foods_context_data(food_ids_list)
        }
        return render(request, 'PhotoMenu/Snippets/FavoritesPageSections.html', context)

# SitePages
def homepage(request):
    return render(request, 'PhotoMenu/SitePages/Homepage.html')


def contact_page(request):
    context = {
        'search_options_list': [SEARCH_TYPE_RESTAURANT, SEARCH_TYPE_FOOD]
    }
    return render(request, 'PhotoMenu/SitePages/ContactPage.html', context)


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
    context = {
        'search_options_list': [restaurant_name.replace("-"," "), SEARCH_TYPE_RESTAURANT, SEARCH_TYPE_FOOD],
        'is_restaurant_page': True
    }
    return render(request, 'PhotoMenu/SitePages/RestaurantPage.html', context)


@ensure_csrf_cookie
def favorites_page(request):
    context = {
        'search_options_list': [SEARCH_TYPE_RESTAURANT, SEARCH_TYPE_FOOD]
    }
    return render(request, 'PhotoMenu/SitePages/FavoritesPage.html', context)

