from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('table.urls')),
    path('api/v1/', include('table.api.urls')),
]
