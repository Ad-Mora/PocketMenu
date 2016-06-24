from .models import MenuItem
import json

def get_menu_items_for_search_string(query_string, limit=30):
    context = {}
    print query_string

    results = {}
    if query_string != "":
        results = MenuItem.objects.filter(name__contains=query_string)[:limit]

    context['query_string'] = query_string
    context['menu_items_list'] = results
    # context['search_for_food'] = search_for_food
    return context