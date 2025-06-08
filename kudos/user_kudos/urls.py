from django.urls import path
from .views import RegisterView, LoginView, OrganizationListView, GiveKudoView, ReceivedKudosView, UserInfoView, UsersView


urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('organizations/', OrganizationListView.as_view(), name='organization-list'),
    path('kudos/give/', GiveKudoView.as_view(), name='give-kudo'),
    path('kudos/received/', ReceivedKudosView.as_view(), name='received-kudos'),
    path('user/info/', UserInfoView.as_view(), name='user-info'),
    path('users/info/', UsersView.as_view(), name='user-info'),

]
