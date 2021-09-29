from django.db.models import Q
from django.shortcuts import render
from rest_framework import generics, filters
from rest_framework.pagination import PageNumberPagination
from .models import Table
from .serializers import TableSerializer


def index(request):
    return render(request, 'table/index.html')


class TablePagination(PageNumberPagination):
    page_size = 3


class DynamicSearchFilter(filters.SearchFilter):
    def get_search_fields(self, view, request):
        return request.GET.getlist('search_fields', [])


class TableListView(generics.ListAPIView):
    serializer_class = TableSerializer
    pagination_class = TablePagination
    filter_backends = [DynamicSearchFilter]

    def get_queryset(self):
        queryset_list = Table.objects.all()
        qlte = self.request.GET.get("qlte")
        qgte = self.request.GET.get("qgte")
        dlte = self.request.GET.get("dlte")
        dgte = self.request.GET.get("dgte")
        if qlte:
            queryset_list = queryset_list.filter(
                Q(quantity__lte=qlte)
            ).distinct()
        elif qgte:
            queryset_list = queryset_list.filter(
                Q(quantity__gte=qgte)
            ).distinct()
        elif dgte:
            queryset_list = queryset_list.filter(
                Q(distance__gte=dgte)
            ).distinct()
        elif dlte:
            queryset_list = queryset_list.filter(
                Q(distance__lte=dlte)
            ).distinct()
        return queryset_list
