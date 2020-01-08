from django.urls import path
from .views import ArtistListView

urlpatterns = [
    path('artists', ArtistListView.as_view())
]