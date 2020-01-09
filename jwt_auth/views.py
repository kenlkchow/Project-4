#pylint: disable = no-member
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import get_user_model
from django.conf import settings
from .serializers import UserSerializer
import jwt
User = get_user_model()

class RegisterView(APIView):

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Registration Successful'})
        return Response(serializer.errors, status=422)


class LoginView(APIView):

    def get_user(self, username):
        try:
            return User.objects.get(username=username)
        except User.DoesNotExist:
            raise PermissionDenied({'message': 'Invalid Credentilais'})

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = self.get_user(username)

        if not user.check_password(password):
            raise PermissionDenied({'message': 'Invalid Credentails'})

        token = jwt.encode({'sub': user.id}, settings.SECRET_KEY, algorithm='HS256')

        return Response({'token': token, 'message': f'Welcome back {user.username}'})

class ProfileView(APIView):

    permission_classes = (IsAuthenticated, )

    def get(self, request):
        user = User.objects.get(pk=request.user.id) 
        serialized_user = UserSerializer(user)
        return Response(serialized_user.data)