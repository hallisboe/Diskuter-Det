from django.conf.urls import url, include
from django.contrib import admin
from django.views.generic import TemplateView



urlpatterns = [
	url(r'^auth/registration/', include('rest_auth.registration.urls')),
	url(r'^auth/', include('rest_auth.urls')),
    url(r'^api/', include('api.urls')),
    url(r'^admin/', admin.site.urls),
    url(r'^', TemplateView.as_view(template_name='index.html')),
]
