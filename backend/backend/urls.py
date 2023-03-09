from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers
from App import views
import re

# router = routers.DefaultRouter()
# router.register(r'todos', views.TodoView, 'todo')
# router.register(r'rooms', views.RoomView, 'room')
# router.register(r'students', views.StudentView, 'student')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.welcome_page),    
    re_path(r'^room/(\d{8})$', views.room_detail),
    re_path(r'^room/$', views.RoomView.as_view({'get': 'list', 'post': 'create'})),
    
    # re_path(r'^api/students/$', views.students_list),
    # re_path(r'^api/students/([0-9])$', views.students_detail),

]