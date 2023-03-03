from django.http import HttpResponse
from django.shortcuts import render
from django.views.generic import CreateView, TemplateView
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
import random
import string
from django.shortcuts import redirect
# df = getting_data.get_historical_data("AAPL", "2019-01-01", "2020-01-01", "1d")

# def hello(request):
#     return HttpResponse("Hello world ! ")


def search_form(request):
    return render(request, 'search_form.html')
 
class HomeView(TemplateView):
    template_name = 'home.html'
    def create_room(request):
        # Generate random room code
        room_code = ''.join(random.choices(string.ascii_uppercase, k=6))
        # Redirect user to new room URL
        return redirect(f'/room/{room_code}')
 
class CreateUserView(CreateView):
    template_name = 'register.html'
    form_class = UserCreationForm
    success_url = '/'
 
    def form_valid(self, form):
        valid = super(CreateUserView, self).form_valid(form)
        username, password = form.cleaned_data.get('username'), form.cleaned_data.get('password1')
        new_user = authenticate(username=username, password=password)
        login(self.request, new_user)
        return valid
 
def logout(request):
    return render(request, 'home.html')
 
 
# def test(request):
#     views_list = df[0]['Close'].tolist()
#     return render(request, "plotly_graph.html")

