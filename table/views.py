from django.shortcuts import render
# from django.views.decorators.csrf import csrf_exempt
# from rest_framework.parsers import JSONParser
# from django.http.response import JsonResponse
import re
from .models import Table
from .serializers import TableSerializer
from rest_framework import generics, filters
from rest_framework.pagination import PageNumberPagination


def index(request):
    return render(request, 'table/index.html')


# @csrf_exempt
# def tableApi(request, id=0):
#     if request.method == 'GET':
#         table = Table.objects.all()
#         table_serializer = TableSerializer(table, many=True)
#         return JsonResponse(table_serializer.data, safe=False)
#     elif request.method == 'POST':
#         table_data = JSONParser().parse(request)
#         table_serializer = TableSerializer(data=table_data)
#         if table_serializer.is_valid():
#             table_serializer.save()
#             return JsonResponse("Запись добавлена", safe=False)
#         return JsonResponse("Не удалось добавить")
#     elif request.method == 'PUT':
#         table_data = JSONParser().parse(request)
#         table = Table.objects.get(id=table_data['id'])
#         table_serializer = TableSerializer(table, data=table_data)
#         if table_serializer.is_valid():
#             table_serializer.save()
#             return JsonResponse("Запись изменена", safe=False)
#         return JsonResponse("Не удалось изменить")
#     elif request.method == 'DELETE':
#         table = Table.objects.get(pk=id)
#         table.delete()
#         return JsonResponse("Запись удалена", safe=False)


class TablePagination(PageNumberPagination):
    page_size = 10


class DynamicSearchFilter(filters.SearchFilter):
    def get_search_fields(self, view, request):
        return request.GET.getlist('search_fields', [])


class TableListView(generics.ListAPIView):
    queryset = Table.objects.all()
    serializer_class = TableSerializer
    pagination_class = TablePagination
    filter_backends = [DynamicSearchFilter]
    # search_fields = ['title', '$quantity', '$distance']

