# Generated by Django 3.0.2 on 2020-01-10 10:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('artists', '0003_auto_20200109_1141'),
    ]

    operations = [
        migrations.RenameField(
            model_name='artist',
            old_name='spotifyId',
            new_name='lastFMId',
        ),
    ]