# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-06-22 02:09
from __future__ import unicode_literals

import PhotoMenu.models
import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='MenuCategory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField()),
            ],
            options={
                'verbose_name_plural': 'Menu categories',
            },
        ),
        migrations.CreateModel(
            name='MenuItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.CharField(max_length=200)),
                ('price', models.FloatField()),
                ('image', models.ImageField(upload_to=PhotoMenu.models.get_menu_item_upload_path)),
                ('menu_category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='PhotoMenu.MenuCategory')),
            ],
        ),
        migrations.CreateModel(
            name='Restaurant',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('address', models.CharField(max_length=100)),
                ('description', models.CharField(max_length=100)),
                ('header_image', models.ImageField(upload_to=PhotoMenu.models.get_restaurant_upload_path)),
                ('mon_open_time', models.TimeField(default=datetime.time(0, 1))),
                ('mon_close_time', models.TimeField(default=datetime.time(0, 1))),
                ('tue_open_time', models.TimeField(default=datetime.time(0, 1))),
                ('tue_close_time', models.TimeField(default=datetime.time(0, 1))),
                ('wed_open_time', models.TimeField(default=datetime.time(0, 1))),
                ('wed_close_time', models.TimeField(default=datetime.time(0, 1))),
                ('thu_open_time', models.TimeField(default=datetime.time(0, 1))),
                ('thu_close_time', models.TimeField(default=datetime.time(0, 1))),
                ('fri_open_time', models.TimeField(default=datetime.time(0, 1))),
                ('fri_close_time', models.TimeField(default=datetime.time(0, 1))),
                ('sat_open_time', models.TimeField(default=datetime.time(0, 1))),
                ('sat_close_time', models.TimeField(default=datetime.time(0, 1))),
                ('sun_open_time', models.TimeField(default=datetime.time(0, 1))),
                ('sun_close_time', models.TimeField(default=datetime.time(0, 1))),
            ],
        ),
        migrations.AddField(
            model_name='menucategory',
            name='restaurant',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='PhotoMenu.Restaurant'),
        ),
    ]