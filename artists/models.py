from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()

class Artist(models.Model):
    id = models.CharField(max_length=64, primary_key=True)
    name = models.CharField(max_length=64)
    owner = models.ForeignKey(
        User,
        related_name='artists',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f'Artist {self.id} - {self.name}'


