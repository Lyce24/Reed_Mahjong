from .consumers import *
# from django.conf.urls import url
from django.urls import path, re_path


websocket_urlpatterns=[
    path('ws/clicked/<room_name>/',PlayerConsumer.as_asgi(),name="clicked"),
    re_path(r'ws/socket-server', PlayerConsumer.as_asgi()),
]