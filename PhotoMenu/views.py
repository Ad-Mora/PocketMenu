from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def homepage(request):
    return render(request, 'PhotoMenu/SitePages/Homepage.html')

def contact_page(request):
    return render(request, 'PhotoMenu/SitePages/ContactPage.html')

def search_results_page(request):
    context = {}
    print request.POST
    try:
        query_string = request.POST['search-bar']
        print query_string
        # search_for_food = request.POST['search-for-food']
        #
        context['query_string'] = query_string
        # context['search_for_food'] = search_for_food

    except (KeyError):
        print "EXCEPTION!!!!!"
        return render(request, 'PhotoMenu/SitePages/SearchResultsPage.html', context)

    else:
        return render(request, 'PhotoMenu/SitePages/SearchResultsPage.html', context)

def restaurants_page(request,restaurant_name):
    return render(request, 'PhotoMenu/SitePages/RestaurantPage.html')

def favorites_page(request):
    return render(request, 'PhotoMenu/SitePages/FavoritesPage.html')

