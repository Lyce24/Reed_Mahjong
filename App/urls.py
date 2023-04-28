from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from App import views

router = routers.DefaultRouter()
router.register(r'room', views.RoomView, 'room')
router.register(r'player', views.PlayerView, 'player')

urlpatterns = [ 
    # Room APIs 
    path('api/', include(router.urls)),
]