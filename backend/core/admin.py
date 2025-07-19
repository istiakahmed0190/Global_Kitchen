from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import (
    User, Follow, Recipe, Ingredient, RecipeIngredient, Post, Like, Comment,
    Rating, SavedRecipe, SavedPost, Notification, CookingTip, UserIngredient
)


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ('username', 'email', 'display_name', 'rank', 'avg_rating', 'followers_count', 'posts_count')
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'created_at')
    search_fields = ('username', 'email', 'display_name')
    ordering = ('-created_at',)
    
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Profile Info', {
            'fields': ('display_name', 'bio', 'profile_picture', 'location', 'website')
        }),
        ('Social Media', {
            'fields': ('instagram', 'twitter', 'facebook')
        }),
        ('Stats', {
            'fields': ('rank', 'avg_rating', 'followers_count', 'following_count', 'posts_count')
        }),
    )


@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'difficulty', 'cuisine_type', 'avg_rating', 'likes_count', 'created_at')
    list_filter = ('difficulty', 'cuisine_type', 'is_featured', 'created_at')
    search_fields = ('title', 'description', 'author__username')
    ordering = ('-created_at',)
    readonly_fields = ('avg_rating', 'total_ratings', 'likes_count', 'comments_count', 'views_count')


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'post_type', 'likes_count', 'comments_count', 'created_at')
    list_filter = ('post_type', 'created_at')
    search_fields = ('title', 'content', 'author__username', 'hashtags')
    ordering = ('-created_at',)
    readonly_fields = ('likes_count', 'comments_count', 'shares_count')


@admin.register(Ingredient)
class IngredientAdmin(admin.ModelAdmin):
    list_display = ('name', 'category')
    list_filter = ('category',)
    search_fields = ('name', 'category')
    ordering = ('name',)


@admin.register(RecipeIngredient)
class RecipeIngredientAdmin(admin.ModelAdmin):
    list_display = ('recipe', 'ingredient', 'quantity', 'is_optional')
    list_filter = ('is_optional',)
    search_fields = ('recipe__title', 'ingredient__name')


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('user', 'get_target', 'content_preview', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('user__username', 'content')
    ordering = ('-created_at',)

    def get_target(self, obj):
        if obj.post:
            return f"Post: {obj.post.title}"
        elif obj.recipe:
            return f"Recipe: {obj.recipe.title}"
        return "Unknown"
    get_target.short_description = 'Target'

    def content_preview(self, obj):
        return obj.content[:50] + "..." if len(obj.content) > 50 else obj.content
    content_preview.short_description = 'Content Preview'


@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    list_display = ('user', 'recipe', 'rating', 'created_at')
    list_filter = ('rating', 'created_at')
    search_fields = ('user__username', 'recipe__title')
    ordering = ('-created_at',)


@admin.register(Follow)
class FollowAdmin(admin.ModelAdmin):
    list_display = ('follower', 'following', 'created_at')
    search_fields = ('follower__username', 'following__username')
    ordering = ('-created_at',)


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('recipient', 'sender', 'notification_type', 'message', 'is_read', 'created_at')
    list_filter = ('notification_type', 'is_read', 'created_at')
    search_fields = ('recipient__username', 'sender__username', 'message')
    ordering = ('-created_at',)


@admin.register(CookingTip)
class CookingTipAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'author', 'is_featured', 'created_at')
    list_filter = ('category', 'is_featured', 'created_at')
    search_fields = ('title', 'content')
    ordering = ('-created_at',)


@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    list_display = ('user', 'get_target', 'created_at')
    ordering = ('-created_at',)

    def get_target(self, obj):
        if obj.post:
            return f"Post: {obj.post.title}"
        elif obj.recipe:
            return f"Recipe: {obj.recipe.title}"
        return "Unknown"
    get_target.short_description = 'Target'


@admin.register(SavedRecipe)
class SavedRecipeAdmin(admin.ModelAdmin):
    list_display = ('user', 'recipe', 'created_at')
    search_fields = ('user__username', 'recipe__title')
    ordering = ('-created_at',)


@admin.register(SavedPost)
class SavedPostAdmin(admin.ModelAdmin):
    list_display = ('user', 'post', 'created_at')
    search_fields = ('user__username', 'post__title')
    ordering = ('-created_at',)


@admin.register(UserIngredient)
class UserIngredientAdmin(admin.ModelAdmin):
    list_display = ('user', 'ingredient', 'quantity', 'expiry_date', 'added_at')
    list_filter = ('expiry_date', 'added_at')
    search_fields = ('user__username', 'ingredient__name')
    ordering = ('-added_at',)
