import random
from django.core.management.base import BaseCommand
from django.utils.timezone import now
from datetime import timedelta
from user_kudos.models import Organization, User, Kudo, WeeklyQuota


FAKE_MESSAGES = [
    "Great job on the presentation!",
    "Thanks for your help last week!",
    "Really appreciate your support!",
    "You nailed it!",
    "Awesome debugging skills!",
    "Thanks for stepping in during the crunch time.",
    "Fantastic work on the project launch!",
    "Your documentation was super helpful!",
    "Loved your attention to detail!",
    "You're a rockstar!"
]


class Command(BaseCommand):
    help = 'Generate demo organizations, users, kudos, and weekly quotas'

    def handle(self, *args, **kwargs):

        Kudo.objects.all().delete()
        WeeklyQuota.objects.all().delete()
        User.objects.exclude(is_superuser=True).delete()
        Organization.objects.all().delete()

        self.stdout.write("Generating organizations...")
        orgs = [Organization.objects.create(name=f"Org {i}") for i in range(1, 4)]

        self.stdout.write("Generating users...")
        users = []
        for i in range(1, 11):
            org = random.choice(orgs)
            user = User.objects.create_user(
                username=f"user{i}",
                email=f"user{i}@example.com",
                password="password123",
                organization=org
            )
            users.append(user)

        self.stdout.write("Assigning weekly quotas...")
        current_week = now().date() - timedelta(days=now().weekday())
        for user in users:
            WeeklyQuota.objects.create(user=user, week=current_week, remaining_kudos=3)

        self.stdout.write("Creating random kudos...")
        for _ in range(20):
            giver = random.choice(users)
            receiver = random.choice([u for u in users if u != giver])
            message = random.choice(FAKE_MESSAGES)
            Kudo.objects.create(giver=giver, receiver=receiver, message=message)

        self.stdout.write(self.style.SUCCESS("Dummy data generated successfully!"))
