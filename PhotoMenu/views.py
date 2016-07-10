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
    restaurant = get_object_or_404(Restaurant, name__iexact=restaurant_name)
    num_horizontal_cats = 2
    menu_categories = None
    categories = None

    # used when somebody tries to search for foods withing a restaurant
    if request.method == "POST":
        query_string = request.POST['search-bar']
        # get all of the foods from the restaurant that match the query_string
        menu_item_results = MenuItem.objects.filter(menu_category__restaurant__name__iexact=restaurant_name).\
            filter(name__icontains=query_string)

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
        menu_categories = []
        for category in categories:
            menu_categories.append(category)

    # used when somebody normally visits a restaurant's page
    elif request.method == "GET":

        # populate body with category and menu items
        menu_categories = MenuCategory.objects.filter(restaurant__name__iexact=restaurant_name)

        categories = collections.OrderedDict()
        for category in menu_categories:
            categories[category] = MenuItem.objects.filter(menu_category_id=category.id)

    # vvv Should this go in utils.py ?
    # get store hours
    hours_grouping_list = [['Mon']]
    time_groupings = [(restaurant.mon_open_time, restaurant.mon_close_time)]
    num_groups = 0
    store_hours = []

    days_of_week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

    opening_times = [restaurant.mon_open_time, restaurant.tue_open_time,
                     restaurant.wed_open_time, restaurant.thu_open_time,
                     restaurant.fri_open_time, restaurant.sat_open_time,
                     restaurant.sun_open_time]

    closing_times = [restaurant.mon_close_time, restaurant.tue_close_time,
                     restaurant.wed_close_time, restaurant.thu_close_time,
                     restaurant.fri_close_time, restaurant.sat_close_time,
                     restaurant.sun_close_time]

    for i in range(len(days_of_week)-1):
        if opening_times[i] == opening_times[i+1] and closing_times[i] == closing_times[i+1]:
            hours_grouping_list[num_groups].append(days_of_week[i+1])
        else:
            hours_grouping_list.append([days_of_week[i+1]])
            time_groupings.append((opening_times[i+1], closing_times[i+1]))
            num_groups += 1

    for i in range(len(hours_grouping_list)):
        first_day_in_group = hours_grouping_list[i][0]
        last_day_in_group = hours_grouping_list[i][-1]
        days_string = first_day_in_group + '-' + last_day_in_group + ':'
        if first_day_in_group == last_day_in_group:
            days_string = first_day_in_group + ':'
        store_hours.append((days_string, time_groupings[i][0], time_groupings[i][1]))

    horizontal_cats = menu_categories[:num_horizontal_cats]
    remaining_cats = menu_categories[num_horizontal_cats:]
    context = {
        'restaurant': restaurant,
        'categories': categories,
        'horizontal_cats': horizontal_cats,
        'remaining_cats': remaining_cats,
        'store_hours': store_hours,
        'search_options_list': [restaurant.name, SEARCH_TYPE_RESTAURANT, SEARCH_TYPE_FOOD],
        'is_restaurant_page': True
    }
    return render(request, 'PhotoMenu/SitePages/RestaurantPage.html', context)


@ensure_csrf_cookie
def favorites_page(request):
    context = {
        'search_options_list': [SEARCH_TYPE_RESTAURANT, SEARCH_TYPE_FOOD]
    }
    return render(request, 'PhotoMenu/SitePages/FavoritesPage.html', context)

