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
    # Room APIs 
    path('room/', views.RoomView.as_view({'get': 'list', 'post' : "create"})), #show all rooms
    path("create_room/", views.CreateRoomView.as_view()),  #create a room
    path("join_room/", views.JoinRoom.as_view()),  #input a JSON file with room_id, extract the room_id and join the room
    re_path(r'^room/(\d{8})$', views.RoomDetail.as_view()),  #check a room detail - need to implement
    re_path(r'^room/(\d{8})/delete_room$', views.DeleteRoom.as_view()), #delete a room
    path('player_in_room/', views.PlayerInRoom.as_view()), # return a JSON file showing the room_id and the player is in  
    path('player_leave_room/', views.PlayerLeaveRoom.as_view()),   #leave the room

    # # Games - actual room for players  
    re_path(r'^room/(\d{8})/create_game$', views.CreateGame.as_view()), #set game mode = 1 
    re_path(r'^room/(\d{8})/delete_game$', views.DeleteGame.as_view()), #set game mode = 0
    
    
    # # Player APIs - Not finished
    re_path(r'^player/$', views.PlayerView.as_view({'get': 'list',  'post' : "create"})), #show all players
    
]