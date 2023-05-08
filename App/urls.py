from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from App import views

router = routers.DefaultRouter()
router.register(r"room", views.RoomView, "room")
router.register(r"player", views.PlayerView, "player")

urlpatterns = [
    # APIs to view rooms and players
    # type api/room/{id} to view room detail
    # type api/player/{id} to view player detail
    path("api/", include(router.urls)),
]
