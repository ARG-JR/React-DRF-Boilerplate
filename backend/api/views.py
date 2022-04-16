from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.viewsets import ModelViewSet

from api_auth.models import User
from api_auth.serializers import UserSerializer
from api.permissions import IsSelf


class APIHomeView(APIView):
    permission_classes = [AllowAny]

    def get(self):
        return Response({"version": "0.1.0"}, status=status.HTTP_201_CREATED)


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        permission_classes = []
        if self.action == "list" or self.action == "retrieve":
            permission_classes = [IsAuthenticated]
        elif self.action == "create" or self.action == "destroy":
            permission_classes = [IsAdminUser]
        elif self.action == "update" or self.action == "partial_update":
            permission_classes = [IsSelf]

        return [permission() for permission in permission_classes]