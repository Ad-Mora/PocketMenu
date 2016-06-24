from django.shortcuts import render
from django.http import HttpResponse
from .models import MenuItem

# Create your views here.

def homepage(request):
    return render(request, 'PhotoMenu/SitePages/Homepage.html')

def contact_page(request):
    return render(request, 'PhotoMenu/SitePages/ContactPage.html')

def search_results_page(request):
    context = {}
    print(request.POST)

    if request.method == "POST":
        query_string = request.POST['search-bar']
        food_matches = {}

        if (query_string != ""):
            food_matches = MenuItem.objects.filter(name__contains=query_string)
            # print("query_string: %s\nfood_mathches: %s" % (query_string, food_matches))
            # search_for_food = request.POST['search-for-food']

        context['query_string'] = query_string
        context['food_items'] = food_matches
        # context['search_for_food'] = search_for_food

    else :
        print "get instead of POST"

    return render(request, 'PhotoMenu/SitePages/SearchResultsPage.html', context)

def restaurants_page(request,restaurant_name):
    return render(request, 'PhotoMenu/SitePages/RestaurantPage.html')

def favorites_page(request):
    return render(request, 'PhotoMenu/SitePages/FavoritesPage.html')

