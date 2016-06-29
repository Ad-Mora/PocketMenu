from django.views.decorators.csrf import ensure_csrf_cookie
from django.shortcuts import render
from django.http import HttpResponse
from .models import MenuCategory, Restaurant, MenuItem
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
        else:
            restaurant_name = search_type
            context = {
                'menu_items_list': get_restaurant_internal_menu_items(query_string, restaurant_name)
            }
            return render(request, 'PhotoMenu/Snippets/AutoCompleteFoodSuggestions.html', context)


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
    context = {
        'restaurants_list': Restaurant.objects.all()[:4],
        'restaurant_count': Restaurant.objects.count()
    }
    return render(request, 'PhotoMenu/SitePages/Homepage.html', context)


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


def restaurants_page(request, restaurant_name):
    restaurant_name = restaurant_name.replace('-', ' ')
    restaurant = Restaurant.objects.get(name__iexact=restaurant_name)
    num_horizontal_cats = 3
    menu_categories = None
    categories = None

    # used when somebody tries to search for foods withing a restaurant
    if request.method == "POST":
        query_string = request.POST['search-bar']
        # get all of the foods from the restaurant that match the query_string
        menu_item_results = MenuItem.objects.filter(menu_category__restaurant__name__iexact=restaurant_name).\
            filter(name__icontains=query_string)

        # collect the relevant categories for selected foods
        categories = {}
        for menu_item in menu_item_results:
            # get the menu category of the current food
            foods_menu_category = menu_item.menu_category

            # add this food to the list of other 'matching' foods
            category_menu_items_list = categories.get(foods_menu_category, [])
            category_menu_items_list.append(menu_item)

            # set this list as the new list in categories
            categories[foods_menu_category] = category_menu_items_list

        # compute horizontal categories and remaining categories
        menu_categories = []
        for category in categories:
            menu_categories.append(category)

    # used when somebody normally visits a restaurant's page
    elif request.method == "GET":

        menu_categories = MenuCategory.objects.filter(restaurant__name__iexact=restaurant_name)

        # possibly redundant code---------------------------
        categories = {}
        for category in menu_categories:
            categories[category] = []

        for category in menu_categories:
            menu_items = MenuItem.objects.filter(menu_category_id=category.id)
            for item in menu_items:
                categories[category].append(item)
        # ----------------------------------------------------

    horizontal_cats = menu_categories[:num_horizontal_cats]
    remaining_cats = menu_categories[num_horizontal_cats:]
    context = {
        'restaurant': restaurant,
        'categories': categories,
        'horizontal_cats': horizontal_cats,
        'remaining_cats': remaining_cats,
        'search_options_list': [restaurant_name.replace("-", " "), SEARCH_TYPE_RESTAURANT, SEARCH_TYPE_FOOD],
        'is_restaurant_page': True
    }
    return render(request, 'PhotoMenu/SitePages/RestaurantPage.html', context)


@ensure_csrf_cookie
def favorites_page(request):
    context = {
        'search_options_list': [SEARCH_TYPE_RESTAURANT, SEARCH_TYPE_FOOD]
    }
    return render(request, 'PhotoMenu/SitePages/FavoritesPage.html', context)

