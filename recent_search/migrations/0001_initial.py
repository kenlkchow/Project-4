# Generated by Django 3.0.2 on 2020-01-09 10:39

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='RecentSearch',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('spotifyId', models.CharField(max_length=64)),
                ('name', models.CharField(max_length=64)),
            ],
        ),
    ]
