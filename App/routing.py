from .consumers import *
# from django.conf.urls import url
from django.urls import path, re_path


websocket_urlpatterns=[
    path('ws/clicked/<room_name>/',AppConsumer.as_asgi(),name="clicked"),
    re_path(r'ws/socket-server', AppConsumer.as_asgi()),
]