from django.conf.urls import url

from . import views

app_name = 'PhotoMenu'

urlpatterns = [
    url(r'^$', views.homepage, name='homepage'),
    url(r'^contact/$', views.contact_page, name='contact_page'),
    url(r'^searchresults/$', views.search_results_page, name='search_results_page'),
    url(r'^restaurantpage/$', views.restaurants_page, name='restaurant_homepage'),
    url(r'^favorites/$', views.favorites_page, name='favorites_page'),
]