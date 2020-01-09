from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT, HTTP_401_UNAUTHORIZED
from .models import Artist
from .serializers import ArtistSerializer


class ArtistListView(APIView):

    permission_classes = (IsAuthenticated, )

    def post(self, request):
        request.data['owner'] = request.user.id
        artist = ArtistSerializer(data=request.data)
        if artist.is_valid():
            artist.save()
            return Response(artist.data, status=HTTP_201_CREATED)
        return Response(artist.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)
