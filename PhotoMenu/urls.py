from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.homepage, name='homepage'),
    url(r'^contact/$', views.contact_page, name='contact_page'),
    url(r'^search_results/$', views.search_results_page, name='search_results_page'),
    url(r'^restaurant_page/$', views.restaurants_page, name='restaurant_homepage'),
    url(r'^favorites/$', views.favorites_page, name='favorites_page'),
]