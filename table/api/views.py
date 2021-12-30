from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.pagination import PageNumberPagination
from ..models import Table
from .serializers import TableSerializer


def index(request):
    return render(request, 'table/index.html')


class StandardResultsSetPagination(PageNumberPagination):
    page_size_query_param = 'page_size'


class TableListView(ModelViewSet):
    queryset = Table.objects.all()
    serializer_class = TableSerializer
    pagination_class = StandardResultsSetPagination

