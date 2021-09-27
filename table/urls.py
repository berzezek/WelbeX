from django.urls import path
# from django.conf.urls import url
from .views import (
    # tableApi,
    index,
    TableListView
)


urlpatterns = [
    path('', index),
    path('table/', TableListView.as_view()),
    # path('table/', tableApi),
    # url(r'^table/([0-9]+)$', tableApi)
]
