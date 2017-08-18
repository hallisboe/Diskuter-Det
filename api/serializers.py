from django.contrib.auth.models import User
from rest_framework import serializers


from .models import Discussion, Comment, Profile, Topic, Community


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('bio', 'location')

       
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'profile', 'url')
        lookup_field='id'


class UserLinkSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'url')



class TopicSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Topic
        fields = ("name",)


class CommunitySerializer(serializers.HyperlinkedModelSerializer):
    user=UserLinkSerializer()
    class Meta:
        model = Community
        fields = ("id", "user", 'name', "slug", "description", "url")
        read_only_fields = ("url",)

    def create(self):
        user = None   
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user


class CommunitySlugSerializer(serializers.ModelSerializer):
    class Meta:
        model = Community
        fields = ('slug',)


class CommentSerializer(serializers.HyperlinkedModelSerializer):
    def create(self, validated_data):
        user = None   
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user

        tmp_comment = validated_data
        
        comment = Comment.objects.create(
            user=user,
            post=tmp_comment['post'],
            text=tmp_comment['text'],
        )
        return comment


    user=UserLinkSerializer()
    class Meta:
        model = Comment
        fields = ('id', "post", "posted", "url", "_get_score", "user", 'text')
        read_only_fields = ('id', "url", "_get_score")
        order = ("-id",)



class CommentIDSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ('id',)


class DiscussionSerializer(serializers.HyperlinkedModelSerializer):
    comments = CommentSerializer(many=True, required=False)
    user=UserLinkSerializer()
    community = CommunitySlugSerializer()
    class Meta:
        model = Discussion
        fields = ('id', 'title', "user", "image", "url", "community" , "slug",  "_get_score", "comments", 'text')
        read_only_fields = ("id", "comments", "_get_score")

    def create(self, validated_data):
        tmp_post = validated_data
        user = None   

        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user

        post = Discussion.objects.create(
            user=user,
            title=tmp_post['title'],
            text=tmp_post['text'],
            community=tmp_post['community']
        )

        return post


class DiscussionIDSerializer(serializers.ModelSerializer):

    class Meta:
        model = Discussion
        fields = ('id',)
