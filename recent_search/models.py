from django.db import models

class RecentSearch(models.Model):
    spotifyId = models.CharField(max_length=64)
    name = models.CharField(max_length=64)
    
    def __str__(self):
        return f'Recent Search {self.spotifyId} - {self.name}'
