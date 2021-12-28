from django.urls import path
from rest_framework.routers import SimpleRouter
from .views import TableListView, index


router = SimpleRouter()
router.register('table', TableListView, basename='table')

urlpatterns = []

urlpatterns += router.urls
