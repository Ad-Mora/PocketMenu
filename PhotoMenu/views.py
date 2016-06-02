from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def homepage(request):
    return HttpResponse("This is the homepage")

def contact_page(request):
    return HttpResponse("This is the contact page")

def search_results_page(request):
    return HttpResponse("This is the search results page")

def restaurants_page(request):
    return HttpResponse("This is the restaurant homepage")

def favorites_page(request):
    return HttpResponse("This is the favorites page")

