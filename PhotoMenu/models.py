from __future__ import unicode_literals
from django.db import models
import datetime
import os


def get_restaurant_upload_path(instance, filename):
    cleaned_name = instance.name.replace(' ', '')
    upload_path = os.path.join(cleaned_name, filename)
    return upload_path


def get_menu_item_upload_path(instance, filename):
    restaurant = instance.menu_category.restaurant.name.replace(' ', '')
    menu_item_name = instance.name.replace(' ', '')
    extension = os.path.splitext(filename)[1]
    full_filename = menu_item_name + extension

    upload_path = os.path.join(restaurant, full_filename)
    return upload_path


class Restaurant(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    description = models.CharField(max_length=100)
    header_image = models.ImageField(upload_to=get_restaurant_upload_path)
    mon_open_time = models.TimeField(default=datetime.time(0, 1))
    mon_close_time = models.TimeField(default=datetime.time(0, 1))
    tue_open_time = models.TimeField(default=datetime.time(0, 1))
    tue_close_time = models.TimeField(default=datetime.time(0, 1))
    wed_open_time = models.TimeField(default=datetime.time(0, 1))
    wed_close_time = models.TimeField(default=datetime.time(0, 1))
    thu_open_time = models.TimeField(default=datetime.time(0, 1))
    thu_close_time = models.TimeField(default=datetime.time(0, 1))
    fri_open_time = models.TimeField(default=datetime.time(0, 1))
    fri_close_time = models.TimeField(default=datetime.time(0, 1))
    sat_open_time = models.TimeField(default=datetime.time(0, 1))
    sat_close_time = models.TimeField(default=datetime.time(0, 1))
    sun_open_time = models.TimeField(default=datetime.time(0, 1))
    sun_close_time = models.TimeField(default=datetime.time(0, 1))

    def __unicode__(self):
        return self.name


class MenuCategory(models.Model):

    class Meta:
        verbose_name_plural = 'Menu categories'

    restaurant = models.ForeignKey('Restaurant', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    def __unicode__(self):
        return self.restaurant.name + ' ' + self.name


class MenuItem(models.Model):
    menu_category = models.ForeignKey('MenuCategory', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=200)
    price = models.FloatField()
    image = models.ImageField(upload_to=get_menu_item_upload_path)

    def __unicode__(self):
        return self.menu_category.restaurant.name + ' ' + self.name
