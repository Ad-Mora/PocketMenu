from __future__ import unicode_literals
from django.db import models
import datetime


class Restaurant(models.Model):
    name = models.CharField(max_length=100, default="")
    address = models.CharField(max_length=100, default="")
    description = models.CharField(max_length=100, default="")
    header_image = models.ImageField()
    mon_open_time = models.TimeField(default=datetime.time(0,1))
    mon_close_time = models.TimeField(default=datetime.time(0,1))
    tue_open_time = models.TimeField(default=datetime.time(0,1))
    tue_close_time = models.TimeField(default=datetime.time(0,1))
    wed_open_time = models.TimeField(default=datetime.time(0,1))
    wed_close_time = models.TimeField(default=datetime.time(0,1))
    thu_open_time = models.TimeField(default=datetime.time(0,1))
    thu_close_time = models.TimeField(default=datetime.time(0,1))
    fri_open_time = models.TimeField(default=datetime.time(0,1))
    fri_close_time = models.TimeField(default=datetime.time(0,1))
    sat_open_time = models.TimeField(default=datetime.time(0,1))
    sat_close_time = models.TimeField(default=datetime.time(0,1))
    sun_open_time = models.TimeField(default=datetime.time(0,1))
    sun_close_time = models.TimeField(default=datetime.time(0,1))


class FoodItem(models.Model):
    restaurant = models.ForeignKey('Restaurant', on_delete=models.CASCADE)
    food_name = models.CharField(max_length=100, default="")
    description = models.CharField(max_length=200, default="")
    price = models.FloatField(default=0.0)
    image = models.ImageField()




