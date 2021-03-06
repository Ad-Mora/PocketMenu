from django.views.decorators.csrf import ensure_csrf_cookie
from django.shortcuts import render
from .models import MenuCategory, Restaurant, MenuItem
from .utils import *
from .forms import ContactUsForm
from django.core.mail import send_mail
from Core.settings import EMAIL_HOST_USER
from Core.settings import EMAIL1
from Core.settings import EMAIL2
from django.shortcuts import get_object_or_404
import collections
import json
import sys


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
            'restaurants': get_favorite_foods_context_data(food_ids_list)
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

    search_options_list = [SEARCH_TYPE_RESTAURANT, SEARCH_TYPE_FOOD]
    form_submitted = False

    if request.method == 'POST':
        form = ContactUsForm(request.POST)
        if form.is_valid():
            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            message = 'From: ' + name + '\n'
            message += 'Email: ' + email + '\n\n'
            message += form.cleaned_data['message']
            subject = 'Feedback from chomps.io'
            first_address = EMAIL1
            second_address = EMAIL2
            send_mail(subject, message, EMAIL_HOST_USER, [first_address, second_address], fail_silently=False)

            form_submitted = True
    else:
        form = ContactUsForm()

    context = {
        'search_options_list': search_options_list,
        'form_submitted': form_submitted,
        'form': form,
    }
    return render(request, 'PhotoMenu/SitePages/ContactPage.html', context)


def search_results_page(request):
    if request.method == "POST":
        query_string = request.POST['search-bar']
        search_type = request.POST['search-type']
        context = None
        if search_type == SEARCH_TYPE_FOOD:
            menu_items_list = get_menu_items_for_search_string(query_string)
            context = {
                'query_string': query_string,
                'menu_items_list': menu_items_list,
                'search_type': search_type
            }
        elif search_type == SEARCH_TYPE_RESTAURANT:
            max_results_limit = 20
            restaurants_list = get_restaurants_for_search_string(query_string, max_results_limit)
            context = {
                'query_string': query_string,
                'restaurants_list': restaurants_list,
                'search_type': search_type
            }
        return render(request, 'PhotoMenu/SitePages/SearchResultsPage.html', context)
    else:
        return render(request, 'PhotoMenu/SitePages/SearchResultsPage.html')


def restaurants_page(request, restaurant_name):
    restaurant_name = restaurant_name.replace('-', ' ')
    restaurant = get_object_or_404(Restaurant, name__iexact=restaurant_name)
    num_horizontal_cats = 3
    menu_categories = []
    categories = None
    is_search_page = False
    query_string = None
    num_results = 0
    most_popular_list = []

    # used when somebody tries to search for foods within a restaurant
    if request.method == "POST":
        query_string = request.POST['search-bar']
        is_search_page = True

        if query_string != '':
            # get all of the foods from the restaurant that match the query_string
            menu_item_results = MenuItem.objects.filter(menu_category__restaurant__name__iexact=restaurant_name).\
                filter(name__icontains=query_string)
            num_results = len(menu_item_results)

            # collect the relevant categories for selected foods
            categories = collections.OrderedDict()
            for menu_item in menu_item_results:
                # get the menu category of the current food
                foods_menu_category = menu_item.menu_category

                # add this food to the list of other 'matching' foods
                category_menu_items_list = categories.get(foods_menu_category, [])
                category_menu_items_list.append(menu_item)

                # set this list as the new list in categories
                categories[foods_menu_category] = category_menu_items_list

            # used to compute horizontal categories and remaining categories
            for category in categories:
                menu_categories.append(category)

    # used when somebody normally visits a restaurant's page
    elif request.method == "GET":

        # populate body with category and menu items
        menu_categories = list(MenuCategory.objects.filter(restaurant__name__iexact=restaurant_name))
        most_popular_category = MenuCategory(restaurant_id=restaurant.id, name='Most Popular', description='')
        categories = collections.OrderedDict()

        for category in menu_categories:
            menu_item_list = MenuItem.objects.filter(menu_category_id=category.id)
            categories[category] = menu_item_list
            for item in menu_item_list:
                if item.is_most_popular:
                    most_popular_list.append(item)

    if len(most_popular_list) > 0:
        menu_categories.insert(0, most_popular_category)

    horizontal_cats = menu_categories[:num_horizontal_cats]
    remaining_cats = menu_categories[num_horizontal_cats:]
    context = {
        'restaurant': restaurant,
        'categories': categories,
        'horizontal_cats': horizontal_cats,
        'remaining_cats': remaining_cats,
        'search_options_list': [restaurant.name, SEARCH_TYPE_RESTAURANT, SEARCH_TYPE_FOOD],
        'is_restaurant_page': True,
        'is_search_page': is_search_page,
        'query_string': query_string,
        'num_results': num_results,
        'most_popular_list': most_popular_list,
    }
    return render(request, 'PhotoMenu/SitePages/RestaurantPage.html', context)


@ensure_csrf_cookie
def favorites_page(request):
    context = {
        'search_options_list': [SEARCH_TYPE_RESTAURANT, SEARCH_TYPE_FOOD]
    }
    return render(request, 'PhotoMenu/SitePages/FavoritesPage.html', context)

