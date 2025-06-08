
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import Organization, User, Kudo, WeeklyQuota


@admin.register(Organization)
class OrganizationAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    search_fields = ['name']


@admin.register(User)
class CustomUserAdmin(BaseUserAdmin):
    list_display = ['username', 'email', 'organization', 'is_staff', 'is_active']
    list_filter = ['organization', 'is_staff', 'is_active']
    search_fields = ['username', 'email']


@admin.register(Kudo)
class KudoAdmin(admin.ModelAdmin):
    list_display = ['id', 'giver', 'receiver', 'message', 'created_at']
    list_filter = ['giver', 'receiver']
    search_fields = ['message']


@admin.register(WeeklyQuota)
class WeeklyQuotaAdmin(admin.ModelAdmin):
    list_display = ['user', 'week', 'remaining_kudos']
    list_filter = ['week']
