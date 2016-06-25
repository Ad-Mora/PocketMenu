from .models import MenuItem, Restaurant


def get_menu_items_for_search_string(query_string, limit=30):
    results = {}
    if query_string != "":
        results = MenuItem.objects.filter(name__contains=query_string)[:limit]
    return results


def get_restaurants_for_search_string(query_string, limit=5):
    restaurant_list = []
    if query_string != "":
        results = Restaurant.objects.filter(name__contains=query_string)[:limit]
        for restaurant in results:
            restaurant_list.append({
                'name': restaurant.name,
                'link': "../" + restaurant.name.replace(" ", "-")
            })
    return restaurant_list
