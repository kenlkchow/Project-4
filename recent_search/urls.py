from django.urls import path
from .views import RecentSearchListView

urlpatterns = [
    path('recentsearch', RecentSearchListView.as_view())
]