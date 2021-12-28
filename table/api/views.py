from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from ..models import Table
from .serializers import TableSerializer


def index(request):
    return render(request, 'table/index.html')


class TableListView(ModelViewSet):
    queryset = Table.objects.all()
    serializer_class = TableSerializer
