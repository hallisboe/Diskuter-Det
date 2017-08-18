from django.contrib.auth.models import User
from api.serializers import UserSerializer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions


from .models import Comment, Discussion, Profile, Community, Topic
from .serializers import CommentSerializer, DiscussionSerializer, ProfileSerializer, UserSerializer, CommunitySerializer, TopicSerializer, DiscussionIDSerializer, CommentIDSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    
class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

   
class DiscussionViewSet(viewsets.ModelViewSet):
    queryset = Discussion.objects.all()
    serializer_class = DiscussionSerializer
    filter_fields = ('id','community__slug', 'slug', 'title')


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class CommunityViewSet(viewsets.ModelViewSet):
    queryset = Community.objects.all()
    serializer_class = CommunitySerializer


class TopicViewSet(viewsets.ModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer


class Vote(APIView):
	permission_classes = (IsAuthenticated,)

	def get(self, request):
		DS = DiscussionIDSerializer(Discussion.votes.all(request.user.id, action=False), many=True)
		CSU = CommentIDSerializer(Comment.votes.all(request.user.id, action=False), many=True)
		CSD = CommentIDSerializer(Comment.votes.all(request.user.id, action=True), many=True)

		def clean(array):
			new_array = []
			for x in range(0, len(array)):
				new_array.append(array[x]["id"])
			return new_array


		return Response({"discussionVoteData":clean(DS.data), "commentVoteDataUp": clean(CSU.data), "commentVoteDataDown":clean(CSD.data)}) #CommentData

		
	def post(self, request, format="json"):
		if request.data["model"] == "post":
			model = Discussion.objects.get(id=request.data["id"])
		elif request.data["model"] == "comment":
			model = Comment.objects.get(id=request.data["id"])
		else:
			return Response("model error")


		user_id = request.user.id
		vote_dict = {
			"true": True,
			"false": False
		}

		vote = vote_dict[request.data["vote"]]

		if not model.votes.exists(user_id, action=True) and not model.votes.exists(user_id, action=False):
			
			if vote:
				model.votes.up(user_id)
				return Response("Voted up" + str(model.votes.exists(user_id)))
			else:
				model.votes.down(user_id)
				return Response("Voted down"  + str(model.votes.exists(user_id)))

		else:
			if model.votes.exists(user_id, action=(not vote)):
				model.votes.delete(user_id)
				return Response("Deleted")
			else:
				model.votes.delete(user_id)

				if vote:
					model.votes.up(user_id)
					return Response("Voted up Change" + str(model.votes.exists(user_id)))
				else:
					model.votes.down(user_id)
					return Response("Voted down Change"  + str(model.votes.exists(user_id)))


		return Response({"user_id": user_id, "vote": vote, "voted_up": model.votes.exists(user_id, action=True),  "voted_down": model.votes.exists(user_id, action=False)})
		
		
		

