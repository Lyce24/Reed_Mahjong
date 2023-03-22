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
    path('admin/', admin.site.urls),
    path('', views.PlayerView.as_view({'get': 'list', 'post': 'create'})),   
    path("create_room/", views.create_room),
    re_path(r'^room/$', views.RoomView.as_view({'get': 'list', 'post': 'create'})),
    re_path(r'^room/(\d{8})$', views.room_detail),
]