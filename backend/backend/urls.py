from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from App import views

router = routers.DefaultRouter()
router.register(r'todos', views.TodoView, 'todo')
router.register(r'rooms', views.RoomView, 'room')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('', views.welcome_page)
]