from .models import MenuItem, Restaurant


def get_menu_items_for_search_string(query_string, limit=30):
    results = {}
    if query_string != "":
        results = MenuItem.objects.filter(name__icontains=query_string)[:limit]
    return results


def get_restaurants_for_search_string(query_string, limit=5):
    restaurant_list = []
    if query_string != "":
        restaurant_list = Restaurant.objects.filter(name__icontains=query_string)[:limit]
    return restaurant_list


def get_favorite_foods_context_data(food_ids_list):
    restaurant_data_dict = {}
    for food_id in food_ids_list:
        food_id = int(food_id)
        food = MenuItem.objects.get(pk=food_id)
        restaurant_name = food.menu_category.restaurant.name

        # the restaurant will already have a list if there exists a favorited
        # food from the restaurant before. If not, make a new list
        favorites_list_from_restaurant = restaurant_data_dict.get(restaurant_name, [])

        # add the current food to the list and reassign it to keep track of the
        # all the foods from this restaurant
        favorites_list_from_restaurant.append(food)
        restaurant_data_dict[restaurant_name] = favorites_list_from_restaurant
        
    restaurant_list = []
    for restaurant_name in restaurant_data_dict:
        restaurant_list.append(
            {
                'name': restaurant_name,
                'favorite_foods': restaurant_data_dict[restaurant_name]
            }
        )
        
    return restaurant_list


def get_restaurant_internal_menu_items(query_string, restaurant_name, limit=5):
    results = {}
    if query_string != "":
        results = MenuItem.objects.filter(menu_category__restaurant__name__iexact=restaurant_name).\
            filter(name__icontains=query_string)[:limit]
    return results
