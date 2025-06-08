from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.timezone import now
from datetime import timedelta


class Organization(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class User(AbstractUser):
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f"{self.username} ({self.organization.name if self.organization else 'No Org'})"


def get_week_start():
    today = now().date()
    return today - timedelta(days=today.weekday())  # Monday of the current week


class Kudo(models.Model):
    giver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='given_kudos')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_kudos')
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.giver.username} → {self.receiver.username}: {self.message[:20]}..."


class WeeklyQuota(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    week = models.DateField(default=get_week_start)
    remaining_kudos = models.PositiveIntegerField(default=3)

    class Meta:
        unique_together = ('user', 'week')

    def __str__(self):
        return f"{self.user.username} | {self.week} | Remaining: {self.remaining_kudos}"
