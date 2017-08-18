from __future__ import unicode_literals


from django.contrib.auth.models import User


from django.db import models
from vote.models import VoteModel


from django.db.models.signals import post_save
from django.dispatch import receiver


class Topic(models.Model):
	name = models.CharField(max_length=30)
	slug = models.SlugField(max_length=40)

	def __unicode__(self):
		return self.name


class Community(models.Model):
	name = models.CharField(max_length=50)
	description = models.TextField(max_length=50)
	slug = models.SlugField(max_length=40)

	user = models.ForeignKey(User)


	def __unicode__(self):
		return self.name


class Discussion(VoteModel, models.Model):
	title = models.CharField(max_length=100)
	text = models.TextField(max_length=1000)
	slug = models.SlugField(max_length=40)

	user = models.ForeignKey(User)
	topics = models.ManyToManyField(Topic)
	community = models.ForeignKey(Community)


	posted = models.DateTimeField(auto_now_add=True)
	edited = models.DateTimeField(auto_now=True)

	image = models.URLField()

	@property
	def _get_score(self):
		return (self.votes.count(action=False) - self.votes.count(action=True))


	def __unicode__(self):
		return self.title


class Comment(VoteModel, models.Model):
	post = models.ForeignKey(Discussion, related_name='comments')
	text = models.TextField(max_length=200)
	user = models.ForeignKey(User)

	posted = models.DateTimeField(auto_now_add=True)
	edited = models.DateTimeField(auto_now=True)

	@property
	def _get_score(self):
		return (self.votes.count(action=False) - self.votes.count(action=True))


	def __unicode__(self):
		return self.text


class Profile(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE)
	bio = models.TextField(max_length=500, blank=True)
	location = models.CharField(max_length=30, blank=True)
	follows = models.ManyToManyField(Community)
	slug = models.SlugField(max_length=40)

	def __unicode__(self):
		return self.bio


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()





