# coding=utf-8
from rest_framework import serializers
from niji.models import Topic, Post, Node
from account.models import User
class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(read_only=True)
    
    class Meta:
        model = User

class TopicSerializer(serializers.HyperlinkedModelSerializer):
    user_username = serializers.CharField(source='user.username',read_only=True)
    class Meta:
        model = Topic
        fields = ('title','user_username','pub_date','last_replied','view_count','reply_count', 'content_raw', 'order', 'hidden', 'closed')


class PostSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Post
        fields = ('content_raw', 'hidden')

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
