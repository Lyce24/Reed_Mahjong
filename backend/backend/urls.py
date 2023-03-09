from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers
from App import views
import re

router = routers.DefaultRouter()
router.register(r'todos', views.TodoView, 'todo')
router.register(r'rooms', views.RoomView, 'room')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('', views.welcome_page),
    re_path(r'^api/students/$', views.students_list),
    re_path(r'^api/students/([0-9])$', views.students_detail),
    # re_path(r'^api/rooms/[0-9]{8}$', views.create_room),
]