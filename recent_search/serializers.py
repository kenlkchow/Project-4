from rest_framework import serializers
from .models import RecentSearch

class RecentSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecentSearch
        fields = ('deezerId', 'name')
