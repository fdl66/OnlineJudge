# coding=utf-8
from rest_framework import serializers
from .models import Topic, Post, Node,Appendix
from account.models import User
class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(read_only=True)
    class Meta:
        model = User

class TopicSerializer(serializers.HyperlinkedModelSerializer):
    user_username = serializers.CharField(source='user.username',read_only=True)
    class Meta:
        model = Topic
        fields = ('id','title','user_username','pub_date','last_replied','view_count','reply_count', 'content_raw', 'order', 'hidden', 'closed')


class PostSerializer(serializers.HyperlinkedModelSerializer):
    user_username = serializers.CharField(source='user.username',read_only=True)
    class Meta:
        model = Post
        fields = ('id','content_raw', 'hidden','user_username')

class EditPostSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    content_raw = serializers.CharField()
    hidden = serializers.BooleanField()
    user_username=serializers.CharField(max_length=30)

class AppendixSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Appendix
        fields = ('content_raw','id')

'''
class NodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Node
        fields = ('id','title', 'description')
'''

class NodeSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    title = serializers.CharField(max_length=30)
    description = serializers.CharField()

class EditNodeSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    title = serializers.CharField(max_length=30)
    description = serializers.CharField()
    num_of_topics= serializers.CharField()
