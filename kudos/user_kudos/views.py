from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .serializers import RegisterSerializer, LoginSerializer, OrganizationSerializer
from .models import Organization, Kudo, WeeklyQuota, User
from .serializers import KudoSerializer, ReceivedKudoSerializer, UserInfoSerializer
from django.utils.timezone import now
from datetime import timedelta


class RegisterView(APIView):

    def post(self, request):
        try:
            serializer = RegisterSerializer(data=request.data)
            if serializer.is_valid():
                user = serializer.save()
                return Response(serializer.to_representation(user), status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as error:
            return Response({'error': str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LoginView(APIView):

    def post(self, request):
        try:
            serializer = LoginSerializer(data=request.data)
            if serializer.is_valid():
                return Response(serializer.validated_data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as error:
            return Response({'error': str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class OrganizationListView(APIView):

    def get(self, request):
        try:
            organizations = Organization.objects.all()
            serializer = OrganizationSerializer(organizations, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as error:
            return Response({'error': str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GiveKudoView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            user = request.user
            today = now().date()
            week_start = today - timedelta(days=today.weekday())

            quota, created = WeeklyQuota.objects.get_or_create(user=request.user, week=week_start)

            if quota.remaining_kudos <= 0:
                return Response({'error': 'No kudos left for this week.'}, status=status.HTTP_400_BAD_REQUEST)

            serializer = KudoSerializer(data=request.data)
            if serializer.is_valid():
                receiver = serializer.validated_data['receiver']

                if receiver.organization != user.organization:
                    return Response({'error': 'You can only give kudos to users in your organization.'},
                                    status=status.HTTP_400_BAD_REQUEST)

                if receiver == user:
                    return Response({'error': 'You cannot give kudos to yourself.'}, status=status.HTTP_400_BAD_REQUEST)

                Kudo.objects.create(
                    giver=user,
                    receiver=receiver,
                    message=serializer.validated_data['message']
                )

                quota.remaining_kudos -= 1
                quota.save()

                return Response({'success': 'Kudo given!'}, status=status.HTTP_201_CREATED)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as error:
            return Response({'error': str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ReceivedKudosView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:
            kudos = Kudo.objects.filter(receiver=request.user).order_by('-created_at')
            serializer = ReceivedKudoSerializer(kudos, many=True)
            return Response(serializer.data)
        except Exception as error:
            return Response({'error': str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UserInfoView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:
            user = User.objects.get(id=request.user.id)
            serializer = UserInfoSerializer(user)
            print(serializer.data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as error:
            return Response({'error': str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UsersView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:
            users = User.objects.filter(organization=request.user.organization).values('id', 'username')
            return Response(list(users), status=status.HTTP_200_OK)
        except Exception as error:
            return Response({'error': str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


