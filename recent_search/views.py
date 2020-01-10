from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.status import HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT, HTTP_401_UNAUTHORIZED
from .models import RecentSearch
from .serializers import RecentSearchSerializer


class RecentSearchListView(APIView):

    def post(self, request):
        recent_search = RecentSearchSerializer(data=request.data)
        if recent_search.is_valid():
            recent_search.save()
            return Response(recent_search.data, status=HTTP_201_CREATED)
        return Response(recent_search.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

    def get(self, _request):
        recent_search = RecentSearch.objects.all()
        serialized_recent_search = RecentSearchSerializer(
            recent_search, many=True)
        return Response(serialized_recent_search.data)
