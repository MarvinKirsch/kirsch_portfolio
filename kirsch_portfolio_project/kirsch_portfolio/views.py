from django.shortcuts import render

def home(request):
    return render(request, 'kirsch_portfolio/home.html')

# Create your views here.
