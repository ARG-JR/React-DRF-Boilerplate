from rest_framework import serializers
from rest_framework_simplejwt.serializers import (
    TokenObtainPairSerializer,
    TokenRefreshSerializer,
)
from api_auth.models import User


class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["email", "username", "first_name", "last_name", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ["password"]

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data["refreshToken"] = str(refresh)
        data["accessToken"] = str(refresh.access_token)
        del data["refresh"]
        del data["access"]
        serializer_class = UserSerializer(self.user)
        # Add extra responses here
        data["user"] = serializer_class.data
        return data


class MyTokenRefreshSerializer(TokenRefreshSerializer):
    def validate(self, attrs):
        refresh = self.token_class(attrs["refresh"])

        refresh.set_jti()
        refresh.set_exp()
        refresh.set_iat()
        user_id = refresh.get("user_id")
        user = User.objects.get(id=user_id)
        user_serializer = UserSerializer(user)

        data = {
            "accessToken": str(refresh.access_token), 
            "user": user_serializer.data
        }

        return data
