from .consumers import *
# from django.conf.urls import url
from django.urls import re_path


websocket_urlpatterns=[
    re_path(r'ws/socket-server', PlayerConsumer.as_asgi()),
]