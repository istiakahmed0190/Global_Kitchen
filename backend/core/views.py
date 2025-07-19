from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import login
from django.db.models import Q, F, Avg, Count
from django.db import models
from django.utils import timezone
from random import choice

from .models import (
    User, Follow, Recipe, Ingredient, RecipeIngredient, Post, Like, Comment,
    Rating, SavedRecipe, SavedPost, Notification, CookingTip, UserIngredient
)
from .serializers import (
    UserSerializer, UserProfileSerializer, LoginSerializer, RecipeSerializer,
    PostSerializer, CommentSerializer, RatingSerializer, NotificationSerializer,
    CookingTipSerializer, FollowSerializer, IngredientSerializer, UserIngredientSerializer
)


# Authentication Views
@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def signup(request):
    """User registration"""
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'user': UserSerializer(user).data,
            'token': token.key,
            'message': 'User registered successfully'
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def login_view(request):
    """User login"""
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        login(request, user)
        return Response({
            'user': UserSerializer(user).data,
            'token': token.key,
            'message': 'Login successful'
        })
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def logout_view(request):
    """User logout"""
    try:
        request.user.auth_token.delete()
        return Response({'message': 'Logout successful'})
    except:
        return Response({'message': 'Logout successful'})


# Daily Tip View
@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def daily_tip(request):
    """Get a random cooking tip"""
    tips = [
        "Always preheat your pan before adding ingredients for even cooking.",
        "To keep herbs fresh longer, store them in a glass of water in the fridge.",
        "Add a pinch of salt when boiling water—it helps it boil faster!",
        "Don't overcrowd the pan when frying—it lowers the temperature and makes food soggy.",
        "Use a damp paper towel under your cutting board to prevent slipping.",
        "Store onions and potatoes separately to prevent spoilage.",
        "Add a slice of bread to your brown sugar container to keep it soft.",
        "Rinse rice until the water runs clear for fluffier grains.",
        "Freeze leftover herbs in olive oil to use later in cooking.",
        "A squeeze of lemon can enhance the flavor of almost any dish.",
        "Measure flour properly—spoon it into the cup and level it off.",
        "Use room temperature ingredients for smoother cake batters.",
        "Don't open the oven door while baking—it affects the rise!",
        "Add a teaspoon of cornstarch to your cookie dough for softer cookies.",
        "A dash of vinegar makes cakes fluffier by reacting with baking soda.",
        "Microwave citrus fruits for 10 seconds to get more juice out.",
        "Rub stainless steel with lemon to remove odors like garlic and fish.",
        "Use a spoon to peel ginger—it's easier than using a knife!",
        "Freeze leftover wine in ice cube trays for cooking later.",
        "Keep wooden spoons across boiling pots to prevent spills.",
        "Italian pasta water should be as salty as the sea for better flavor.",
        "Japanese sushi rice tastes better with a balance of vinegar, sugar, and salt.",
        "Mexican guacamole stays green longer with a little lime juice.",
        "Indian curries develop more flavor if you sauté spices before adding liquids.",
        "French sauces often start with a roux—flour and butter cooked together."
    ]
    tip = choice(tips)
    return Response({'tip': tip, 'motto': 'Cooking Without Borders where Flavors Meet Cultures'})


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_serializer_class(self):
        if self.action == 'create':
            return UserSerializer
        return UserProfileSerializer

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def follow(self, request, pk=None):
        """Follow/unfollow a user"""
        user_to_follow = self.get_object()
        follow_obj, created = Follow.objects.get_or_create(
            follower=request.user,
            following=user_to_follow
        )
        
        if not created:
            follow_obj.delete()
            user_to_follow.followers_count = F('followers_count') - 1
            request.user.following_count = F('following_count') - 1
            message = f'Unfollowed {user_to_follow.username}'
            is_following = False
        else:
            user_to_follow.followers_count = F('followers_count') + 1
            request.user.following_count = F('following_count') + 1
            message = f'Following {user_to_follow.username}'
            is_following = True
            
            # Create notification
            Notification.objects.create(
                recipient=user_to_follow,
                sender=request.user,
                notification_type='follow',
                message=f'{request.user.username} started following you'
            )
        
        user_to_follow.save()
        request.user.save()
        
        return Response({
            'message': message,
            'is_following': is_following
        })

    @action(detail=True, methods=['get'])
    def followers(self, request, pk=None):
        """Get user's followers"""
        user = self.get_object()
        followers = Follow.objects.filter(following=user).select_related('follower')
        serializer = FollowSerializer(followers, many=True, context={'request': request})
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def following(self, request, pk=None):
        """Get users that this user follows"""
        user = self.get_object()
        following = Follow.objects.filter(follower=user).select_related('following')
        serializer = FollowSerializer(following, many=True, context={'request': request})
        return Response(serializer.data)


class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all().select_related('author').prefetch_related('recipe_ingredients__ingredient')
    serializer_class = RecipeSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        recipe = serializer.save(author=self.request.user)
        # Update user's posts count
        self.request.user.posts_count = F('posts_count') + 1
        self.request.user.save()

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def like(self, request, pk=None):
        """Like/unlike a recipe"""
        recipe = self.get_object()
        like_obj, created = Like.objects.get_or_create(
            user=request.user,
            recipe=recipe
        )
        
        if not created:
            like_obj.delete()
            recipe.likes_count = F('likes_count') - 1
            message = 'Recipe unliked'
            is_liked = False
        else:
            recipe.likes_count = F('likes_count') + 1
            message = 'Recipe liked'
            is_liked = True
            
            # Create notification
            if recipe.author != request.user:
                Notification.objects.create(
                    recipient=recipe.author,
                    sender=request.user,
                    notification_type='like',
                    message=f'{request.user.username} liked your recipe "{recipe.title}"',
                    recipe=recipe
                )
        
        recipe.save()
        return Response({
            'message': message,
            'is_liked': is_liked,
            'likes_count': recipe.likes_count
        })

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def save_recipe(self, request, pk=None):
        """Save/unsave a recipe"""
        recipe = self.get_object()
        saved_obj, created = SavedRecipe.objects.get_or_create(
            user=request.user,
            recipe=recipe
        )
        
        if not created:
            saved_obj.delete()
            recipe.saves_count = F('saves_count') - 1
            message = 'Recipe removed from saved'
            is_saved = False
        else:
            recipe.saves_count = F('saves_count') + 1
            message = 'Recipe saved'
            is_saved = True
        
        recipe.save()
        return Response({
            'message': message,
            'is_saved': is_saved,
            'saves_count': recipe.saves_count
        })

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def rate(self, request, pk=None):
        """Rate a recipe"""
        recipe = self.get_object()
        rating_value = request.data.get('rating')
        review_text = request.data.get('review', '')
        
        if not rating_value or not (1 <= int(rating_value) <= 5):
            return Response({'error': 'Rating must be between 1 and 5'}, status=status.HTTP_400_BAD_REQUEST)
        
        rating_obj, created = Rating.objects.get_or_create(
            user=request.user,
            recipe=recipe,
            defaults={'rating': rating_value, 'review': review_text}
        )
        
        if not created:
            rating_obj.rating = rating_value
            rating_obj.review = review_text
            rating_obj.save()
        else:
            recipe.total_ratings = F('total_ratings') + 1
        
        # Recalculate average rating
        avg_rating = Rating.objects.filter(recipe=recipe).aggregate(
            avg=Avg('rating')
        )['avg']
        recipe.avg_rating = avg_rating or 0
        recipe.save()
        
        # Create notification
        if recipe.author != request.user:
            Notification.objects.create(
                recipient=recipe.author,
                sender=request.user,
                notification_type='recipe_rated',
                message=f'{request.user.username} rated your recipe "{recipe.title}": {rating_value}/5',
                recipe=recipe
            )
        
        return Response({
            'message': 'Recipe rated successfully',
            'rating': rating_value,
            'avg_rating': recipe.avg_rating
        })

    @action(detail=False, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def recipe_matching(self, request):
        """Find recipes based on available ingredients"""
        ingredient_names = request.data.get('ingredients', [])
        if not ingredient_names:
            return Response({'error': 'Please provide ingredients'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Get recipes that contain any of the provided ingredients
        recipes = Recipe.objects.filter(
            recipe_ingredients__ingredient__name__in=ingredient_names
        ).distinct().annotate(
            matching_ingredients=Count('recipe_ingredients__ingredient', 
                                     filter=Q(recipe_ingredients__ingredient__name__in=ingredient_names))
        ).order_by('-matching_ingredients', '-avg_rating')
        
        serializer = RecipeSerializer(recipes[:20], many=True, context={'request': request})
        return Response(serializer.data)


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().select_related('author', 'recipe')
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        post = serializer.save(author=self.request.user)
        # Update user's posts count
        self.request.user.posts_count = F('posts_count') + 1
        self.request.user.save()

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def like(self, request, pk=None):
        """Like/unlike a post"""
        post = self.get_object()
        like_obj, created = Like.objects.get_or_create(
            user=request.user,
            post=post
        )
        
        if not created:
            like_obj.delete()
            post.likes_count = F('likes_count') - 1
            message = 'Post unliked'
            is_liked = False
        else:
            post.likes_count = F('likes_count') + 1
            message = 'Post liked'
            is_liked = True
            
            # Create notification
            if post.author != request.user:
                Notification.objects.create(
                    recipient=post.author,
                    sender=request.user,
                    notification_type='like',
                    message=f'{request.user.username} liked your post',
                    post=post
                )
        
        post.save()
        return Response({
            'message': message,
            'is_liked': is_liked,
            'likes_count': post.likes_count
        })

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def comment(self, request, pk=None):
        """Add a comment to a post"""
        post = self.get_object()
        content = request.data.get('content')
        parent_id = request.data.get('parent_id')
        
        if not content:
            return Response({'error': 'Comment content is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        comment_data = {
            'user': request.user,
            'post': post,
            'content': content
        }
        
        if parent_id:
            try:
                parent_comment = Comment.objects.get(id=parent_id, post=post)
                comment_data['parent'] = parent_comment
            except Comment.DoesNotExist:
                return Response({'error': 'Parent comment not found'}, status=status.HTTP_400_BAD_REQUEST)
        
        comment = Comment.objects.create(**comment_data)
        post.comments_count = F('comments_count') + 1
        post.save()
        
        # Create notification
        if post.author != request.user:
            Notification.objects.create(
                recipient=post.author,
                sender=request.user,
                notification_type='comment',
                message=f'{request.user.username} commented on your post',
                post=post
            )
        
        serializer = CommentSerializer(comment, context={'request': request})
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['get'])
    def comments(self, request, pk=None):
        """Get comments for a post"""
        post = self.get_object()
        comments = Comment.objects.filter(post=post, parent=None).select_related('user')
        serializer = CommentSerializer(comments, many=True, context={'request': request})
        return Response(serializer.data)


class NotificationViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(recipient=self.request.user).select_related('sender')

    @action(detail=True, methods=['post'])
    def mark_read(self, request, pk=None):
        """Mark a notification as read"""
        notification = self.get_object()
        notification.is_read = True
        notification.save()
        return Response({'message': 'Notification marked as read'})

    @action(detail=False, methods=['post'])
    def mark_all_read(self, request):
        """Mark all notifications as read"""
        self.get_queryset().update(is_read=True)
        return Response({'message': 'All notifications marked as read'})


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def search(request):
    """Global search for users, recipes, posts, hashtags"""
    query = request.GET.get('q', '')
    if not query:
        return Response({'error': 'Search query is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Search users
    users = User.objects.filter(
        Q(username__icontains=query) | Q(display_name__icontains=query)
    )[:10]
    
    # Search recipes
    recipes = Recipe.objects.filter(
        Q(title__icontains=query) | Q(description__icontains=query) | 
        Q(cuisine_type__icontains=query)
    )[:10]
    
    # Search posts
    posts = Post.objects.filter(
        Q(title__icontains=query) | Q(content__icontains=query) | 
        Q(hashtags__icontains=query)
    )[:10]
    
    # Search by hashtag
    hashtag_posts = Post.objects.filter(hashtags__icontains=f'#{query}')[:10]
    
    return Response({
        'users': UserProfileSerializer(users, many=True, context={'request': request}).data,
        'recipes': RecipeSerializer(recipes, many=True, context={'request': request}).data,
        'posts': PostSerializer(posts, many=True, context={'request': request}).data,
        'hashtag_posts': PostSerializer(hashtag_posts, many=True, context={'request': request}).data,
    })


class IngredientViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = super().get_queryset()
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(name__icontains=search)
        return queryset


class UserIngredientViewSet(viewsets.ModelViewSet):
    serializer_class = UserIngredientSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserIngredient.objects.filter(user=self.request.user).select_related('ingredient')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
