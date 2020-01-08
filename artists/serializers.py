from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()
from .models import Artist

class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ('id', 'name')