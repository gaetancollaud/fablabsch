# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-02-24 18:55
from __future__ import unicode_literals

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fablabsch', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='link',
            field=models.TextField(blank=True, validators=[django.core.validators.URLValidator()], verbose_name='link'),
        ),
        migrations.AlterField(
            model_name='postimage',
            name='link',
            field=models.TextField(blank=True, validators=[django.core.validators.URLValidator()], verbose_name='link'),
        ),
        migrations.AlterField(
            model_name='space',
            name='country',
            field=models.CharField(default='CH', max_length=2, verbose_name='country'),
        ),
    ]