from django.conf.urls import url

from . import views

app_name = 'PhotoMenu'

urlpatterns = [
    url(r'^$', views.homepage, name='homepage'),
    url(r'^contact/$', views.contact_page, name='contact_page'),
    url(r'^searchresults/$', views.search_results_page, name='search_results_page'),
    url(r'^favorites/$', views.favorites_page, name='favorites_page'),
    url(r'^(?P<restaurant_name>[a-zA-Z]+(-[a-zA-z]+)*)/$', views.restaurants_page, name='restaurant_homepage'),
]