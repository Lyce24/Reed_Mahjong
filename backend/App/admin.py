from django.contrib import admin
from .models import *

class TodoAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'completed')

class StudentAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'document', 'phone', 'registrationDate')
# Register your models here.

admin.site.register(Todo, TodoAdmin)
admin.site.register(Student, StudentAdmin)