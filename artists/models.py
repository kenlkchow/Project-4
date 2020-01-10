from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()


class Artist(models.Model):
    deezerId = models.CharField(max_length=64)
    name = models.CharField(max_length=64)
    owner = models.ForeignKey(
        User,
        related_name='artists',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f'Artist {self.deezerId} - {self.name}'
