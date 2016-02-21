# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-02-21 16:40
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fablabsch', '0005_auto_20160221_1736'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='link',
            field=models.URLField(blank=True, max_length=800, verbose_name='link'),
        ),
        migrations.AlterField(
            model_name='postimage',
            name='link',
            field=models.URLField(blank=True, max_length=800, verbose_name='link'),
        ),
        migrations.AlterField(
            model_name='postimage',
            name='src',
            field=models.URLField(blank=True, max_length=800, verbose_name='src'),
        ),
    ]
