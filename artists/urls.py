from django.urls import path
from .views import ArtistListView, ArtistDetailView

urlpatterns = [
    path('artists', ArtistListView.as_view()),
    path('artists/<int:pk>', ArtistDetailView.as_view())
]