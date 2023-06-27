# views.py
from rest_framework import viewsets
from .models import Project
from .serializers import ProjectSerializer
from django.shortcuts import render

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

def home(request):
    return render(request, 'kirsch_portfolio/home.html')

# Create your views here.
