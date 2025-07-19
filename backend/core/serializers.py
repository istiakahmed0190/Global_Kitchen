from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import (
    User, Follow, Recipe, Ingredient, RecipeIngredient, Post, Like, Comment,
    Rating, SavedRecipe, SavedPost, Notification, CookingTip, UserIngredient
)


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'display_name', 'bio', 'profile_picture',
            'location', 'website', 'instagram', 'twitter', 'facebook',
            'rank', 'avg_rating', 'followers_count', 'following_count', 'posts_count',
            'password', 'created_at'
        ]
        extra_kwargs = {
            'password': {'write_only': True},
            'rank': {'read_only': True},
            'avg_rating': {'read_only': True},
            'followers_count': {'read_only': True},
            'following_count': {'read_only': True},
            'posts_count': {'read_only': True},
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    is_following = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = [
            'id', 'username', 'display_name', 'bio', 'profile_picture',
            'location', 'website', 'instagram', 'twitter', 'facebook',
            'rank', 'avg_rating', 'followers_count', 'following_count', 'posts_count',
            'is_following', 'created_at'
        ]

    def get_is_following(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return Follow.objects.filter(follower=request.user, following=obj).exists()
        return False


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        if username and password:
            user = authenticate(username=username, password=password)
            if not user:
                raise serializers.ValidationError('Invalid credentials')
            if not user.is_active:
                raise serializers.ValidationError('User account is disabled')
            data['user'] = user
        else:
            raise serializers.ValidationError('Must include username and password')
        
        return data


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['id', 'name', 'category', 'description']


class RecipeIngredientSerializer(serializers.ModelSerializer):
    ingredient = IngredientSerializer(read_only=True)
    ingredient_id = serializers.IntegerField(write_only=True)
    
    class Meta:
        model = RecipeIngredient
        fields = ['id', 'ingredient', 'ingredient_id', 'quantity', 'is_optional']


class RecipeSerializer(serializers.ModelSerializer):
    author = UserProfileSerializer(read_only=True)
    recipe_ingredients = RecipeIngredientSerializer(many=True, read_only=True)
    is_liked = serializers.SerializerMethodField()
    is_saved = serializers.SerializerMethodField()
    user_rating = serializers.SerializerMethodField()
    
    class Meta:
        model = Recipe
        fields = [
            'id', 'author', 'title', 'description', 'instructions', 'prep_time',
            'cook_time', 'servings', 'difficulty', 'cuisine_type', 'image', 'video',
            'avg_rating', 'total_ratings', 'likes_count', 'comments_count',
            'saves_count', 'views_count', 'recipe_ingredients', 'is_liked',
            'is_saved', 'user_rating', 'created_at', 'updated_at'
        ]
        read_only_fields = [
            'avg_rating', 'total_ratings', 'likes_count', 'comments_count',
            'saves_count', 'views_count'
        ]

    def get_is_liked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return Like.objects.filter(user=request.user, recipe=obj).exists()
        return False

    def get_is_saved(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return SavedRecipe.objects.filter(user=request.user, recipe=obj).exists()
        return False

    def get_user_rating(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            rating = Rating.objects.filter(user=request.user, recipe=obj).first()
            return rating.rating if rating else None
        return None


class PostSerializer(serializers.ModelSerializer):
    author = UserProfileSerializer(read_only=True)
    recipe = RecipeSerializer(read_only=True)
    is_liked = serializers.SerializerMethodField()
    is_saved = serializers.SerializerMethodField()
    hashtags_list = serializers.SerializerMethodField()
    
    class Meta:
        model = Post
        fields = [
            'id', 'author', 'post_type', 'title', 'content', 'image', 'video',
            'recipe', 'hashtags', 'hashtags_list', 'likes_count', 'comments_count',
            'shares_count', 'is_liked', 'is_saved', 'created_at', 'updated_at'
        ]
        read_only_fields = ['likes_count', 'comments_count', 'shares_count']

    def get_is_liked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return Like.objects.filter(user=request.user, post=obj).exists()
        return False

    def get_is_saved(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return SavedPost.objects.filter(user=request.user, post=obj).exists()
        return False

    def get_hashtags_list(self, obj):
        if obj.hashtags:
            return [tag.strip() for tag in obj.hashtags.split(',') if tag.strip()]
        return []


class CommentSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer(read_only=True)
    replies = serializers.SerializerMethodField()
    
    class Meta:
        model = Comment
        fields = [
            'id', 'user', 'content', 'replies', 'created_at', 'updated_at'
        ]

    def get_replies(self, obj):
        if obj.replies.exists():
            return CommentSerializer(obj.replies.all(), many=True, context=self.context).data
        return []


class RatingSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer(read_only=True)
    
    class Meta:
        model = Rating
        fields = ['id', 'user', 'rating', 'review', 'created_at', 'updated_at']


class NotificationSerializer(serializers.ModelSerializer):
    sender = UserProfileSerializer(read_only=True)
    
    class Meta:
        model = Notification
        fields = [
            'id', 'sender', 'notification_type', 'message', 'post', 'recipe',
            'is_read', 'created_at'
        ]


class CookingTipSerializer(serializers.ModelSerializer):
    author = UserProfileSerializer(read_only=True)
    
    class Meta:
        model = CookingTip
        fields = ['id', 'title', 'content', 'category', 'author', 'is_featured', 'created_at']


class FollowSerializer(serializers.ModelSerializer):
    follower = UserProfileSerializer(read_only=True)
    following = UserProfileSerializer(read_only=True)
    
    class Meta:
        model = Follow
        fields = ['id', 'follower', 'following', 'created_at']


class UserIngredientSerializer(serializers.ModelSerializer):
    ingredient = IngredientSerializer(read_only=True)
    ingredient_id = serializers.IntegerField(write_only=True)
    
    class Meta:
        model = UserIngredient
        fields = ['id', 'ingredient', 'ingredient_id', 'quantity', 'expiry_date', 'added_at']
