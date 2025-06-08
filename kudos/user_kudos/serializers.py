
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import serializers
from .models import Kudo, User, Organization, WeeklyQuota
from django.utils.timezone import now
from datetime import timedelta


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'organization']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password'],
            organization =validated_data['organization']
        )
        return user

    def to_representation(self, instance):
        refresh = RefreshToken.for_user(instance)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'message': 'User registered successfully'
        }


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(
            username=data.get('username'),
            password=data.get('password')
        )
        if not user:
            raise serializers.ValidationError("Invalid username or password")

        refresh = RefreshToken.for_user(user)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'message': 'Login successful'
        }


class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = ['id', 'name']


class KudoSerializer(serializers.ModelSerializer):
    receiver = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Kudo
        fields = ['receiver', 'message']


class ReceivedKudoSerializer(serializers.ModelSerializer):
    giver_username = serializers.CharField(source='giver.username', read_only=True)

    class Meta:
        model = Kudo
        fields = ['giver_username', 'message', 'created_at']


class UserInfoSerializer(serializers.ModelSerializer):
    organization_name = serializers.CharField(source='organization.name', default=None)
    kudos_remaining = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'organization_name', 'kudos_remaining']

    @staticmethod
    def get_kudos_remaining(user):
        today = now().date()
        week_start = today - timedelta(days=today.weekday())
        quota = WeeklyQuota.objects.filter(user=user, week=week_start).first()
        if quota:
            return quota.remaining_kudos
        return 3
