from .models import MenuItem


def get_menu_items_for_search_string(request, limit=30):
    context = {}

    if request.method == "POST":
        query_string = request.POST['search-bar']
        results = {}

        if query_string != "":
            results = MenuItem.objects.filter(name__contains=query_string)[:limit]

        context['query_string'] = query_string
        context['menu_items_list'] = results
        # context['search_for_food'] = search_for_food
        return context
