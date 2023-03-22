from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers
from App import views
import re

# router = routers.DefaultRouter()
# router.register(r'create_room/', views.create_room)
# router.register(r'^room/(\d{8})$', views.room_detail)
# router.register(r'room',views.RoomView, 'rooms')

urlpatterns = [ 
    # it creates a room by calling the create_room function in views.py
    path("create_room/", views.CreateRoomView.as_view()),
    path('join_room/', views.JoinRoom.as_view()),
    path('show_all_rooms/', views.RoomView.as_view({'get': 'list', 'post': 'create'})),
    
    # the following urls are for the API - viewsets
    re_path(r'^player/$', views.PlayerView.as_view({'get': 'list', 'post': 'create'})),  
    # actual room for players
    re_path(r'^room/(\d{8})$', views.RoomDetail.as_view()),
]