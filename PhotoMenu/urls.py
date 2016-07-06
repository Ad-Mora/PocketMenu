from django.conf.urls import url
from . import views

app_name = 'PhotoMenu'

urlpatterns = [
    url(r'^$', views.homepage, name='homepage'),
    url(r'^contact-us/$', views.contact_page, name='contact_page'),
    url(r'^search/$', views.search_results_page, name='search_results_page'),
    url(r'^drop-down-suggestions/$', views.drop_down_suggestions, name='drop_down_suggestions'),
    url(r'^load-favorite-foods/$', views.get_favorite_foods),
    url(r'^my-favorites/$', views.favorites_page, name='favorites_page'),
    url(r'^(?P<restaurant_name>[a-zA-Z]+(-[a-zA-z]+)*)/search/$',
        views.restaurants_page, name='restaurant_internal_search'),
    url(r'^(?P<restaurant_name>[a-zA-Z]+(-[a-zA-z]+)*)/$', views.restaurants_page, name='restaurant_homepage'),
]
