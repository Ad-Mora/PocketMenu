from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def homepage(request):
    return render(request, 'PhotoMenu/Homepage.html')

def contact_page(request):
    return render(request, 'PhotoMenu/ContactPage.html')

def search_results_page(request):
    return render(request, 'PhotoMenu/SearchResultsPage.html')

def restaurants_page(request):
    return render(request, 'PhotoMenu/RestaurantPage.html')

def favorites_page(request):
    return render(request, 'PhotoMenu/FavoritesPage.html')

