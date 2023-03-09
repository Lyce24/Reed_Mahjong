from django.contrib import admin
from .models import *

class TodoAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'completed')

class RoomAdmin(admin.ModelAdmin):
    list_display = ('id', 'room_id')

class StudentAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'document', 'phone', 'registrationDate')
# Register your models here.

admin.site.register(Todo, TodoAdmin)
admin.site.register(Room, RoomAdmin)
admin.site.register(Student, StudentAdmin)