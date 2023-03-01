from django.http import HttpResponse
from django.shortcuts import render

# df = getting_data.get_historical_data("AAPL", "2019-01-01", "2020-01-01", "1d")

# def hello(request):
#     return HttpResponse("Hello world ! ")


def search_form(request):
    return render(request, 'search_form.html')

def create_room(request):
    pass
 
# def test(request):
#     views_list = df[0]['Close'].tolist()
#     return render(request, "plotly_graph.html")

