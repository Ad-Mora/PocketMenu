# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-06-22 02:41
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('PhotoMenu', '0002_menucategory_is_header_section'),
    ]

    operations = [
        migrations.AlterField(
            model_name='menucategory',
            name='description',
            field=models.TextField(blank=True),
        ),
    ]
