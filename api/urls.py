from django.conf.urls import url, include
from api.views import UserViewSet
from rest_framework import routers, renderers


from .views import CommentViewSet, DiscussionViewSet, Vote, ProfileViewSet, CommunityViewSet, TopicViewSet



router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'discussions', DiscussionViewSet)
router.register(r'profiles', ProfileViewSet)
router.register(r'communities', CommunityViewSet)
router.register(r'topic', TopicViewSet)



urlpatterns = [
	url(r'^vote/$', Vote.as_view()),
	url(r'^', include(router.urls)),
]