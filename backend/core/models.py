from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator


class User(AbstractUser):
    """Custom User model for GlobalKitchen"""
    display_name = models.CharField(max_length=100)
    bio = models.TextField(max_length=500, blank=True)
    profile_picture = models.ImageField(upload_to='profile_images/', blank=True, null=True)
    location = models.CharField(max_length=100, blank=True)
    website = models.URLField(blank=True)
    instagram = models.CharField(max_length=50, blank=True)
    twitter = models.CharField(max_length=50, blank=True)
    facebook = models.CharField(max_length=50, blank=True)
    rank = models.IntegerField(default=0)
    avg_rating = models.FloatField(default=0.0)
    followers_count = models.IntegerField(default=0)
    following_count = models.IntegerField(default=0)
    posts_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"@{self.username} - {self.display_name}"


class Follow(models.Model):
    """Follow relationship between users"""
    follower = models.ForeignKey(User, on_delete=models.CASCADE, related_name='following')
    following = models.ForeignKey(User, on_delete=models.CASCADE, related_name='followers')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('follower', 'following')

    def __str__(self):
        return f"{self.follower.username} follows {self.following.username}"


class Recipe(models.Model):
    """Recipe model"""
    DIFFICULTY_CHOICES = [
        ('easy', 'Easy'),
        ('medium', 'Medium'),
        ('hard', 'Hard'),
    ]

    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='recipes')
    title = models.CharField(max_length=200)
    description = models.TextField()
    instructions = models.TextField()
    prep_time = models.IntegerField(help_text="Preparation time in minutes")
    cook_time = models.IntegerField(help_text="Cooking time in minutes")
    servings = models.IntegerField()
    difficulty = models.CharField(max_length=10, choices=DIFFICULTY_CHOICES, default='easy')
    cuisine_type = models.CharField(max_length=50, blank=True)
    image = models.ImageField(upload_to='recipe_images/', blank=True, null=True)
    video = models.FileField(upload_to='recipe_videos/', blank=True, null=True)
    avg_rating = models.FloatField(default=0.0)
    total_ratings = models.IntegerField(default=0)
    likes_count = models.IntegerField(default=0)
    comments_count = models.IntegerField(default=0)
    saves_count = models.IntegerField(default=0)
    views_count = models.IntegerField(default=0)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} by {self.author.username}"


class Ingredient(models.Model):
    """Ingredient model"""
    name = models.CharField(max_length=100, unique=True)
    category = models.CharField(max_length=50, blank=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class RecipeIngredient(models.Model):
    """Many-to-many relationship between Recipe and Ingredient with quantity"""
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='recipe_ingredients')
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    quantity = models.CharField(max_length=50)  # e.g., "2 cups", "1 tbsp"
    is_optional = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.quantity} {self.ingredient.name} for {self.recipe.title}"


class Post(models.Model):
    """General post model for food photos, reviews, tips"""
    POST_TYPES = [
        ('recipe', 'Recipe'),
        ('photo', 'Food Photo'),
        ('review', 'Restaurant Review'),
        ('tip', 'Cooking Tip'),
        ('story', 'Food Story'),
    ]

    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    post_type = models.CharField(max_length=10, choices=POST_TYPES, default='photo')
    title = models.CharField(max_length=200, blank=True)
    content = models.TextField()
    image = models.ImageField(upload_to='post_images/', blank=True, null=True)
    video = models.FileField(upload_to='post_videos/', blank=True, null=True)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, blank=True, null=True, related_name='posts')
    hashtags = models.CharField(max_length=500, blank=True, help_text="Comma-separated hashtags")
    likes_count = models.IntegerField(default=0)
    comments_count = models.IntegerField(default=0)
    shares_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.post_type} by {self.author.username} - {self.title[:50]}"


class Like(models.Model):
    """Like model for posts and recipes"""
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, blank=True, null=True, related_name='likes')
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, blank=True, null=True, related_name='likes')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = [('user', 'post'), ('user', 'recipe')]

    def __str__(self):
        if self.post:
            return f"{self.user.username} likes post {self.post.id}"
        return f"{self.user.username} likes recipe {self.recipe.title}"


class Comment(models.Model):
    """Comment model for posts and recipes"""
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, blank=True, null=True, related_name='comments')
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, blank=True, null=True, related_name='comments')
    parent = models.ForeignKey('self', on_delete=models.CASCADE, blank=True, null=True, related_name='replies')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        target = self.post or self.recipe
        return f"Comment by {self.user.username} on {target}"


class Rating(models.Model):
    """Rating model for recipes"""
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='ratings')
    rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    review = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'recipe')

    def __str__(self):
        return f"{self.user.username} rated {self.recipe.title}: {self.rating}/5"


class SavedRecipe(models.Model):
    """Saved/Bookmarked recipes"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='saved_recipes')
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'recipe')

    def __str__(self):
        return f"{self.user.username} saved {self.recipe.title}"


class SavedPost(models.Model):
    """Saved/Bookmarked posts"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='saved_posts')
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'post')

    def __str__(self):
        return f"{self.user.username} saved post {self.post.id}"


class Notification(models.Model):
    """Notification model"""
    NOTIFICATION_TYPES = [
        ('like', 'Like'),
        ('comment', 'Comment'),
        ('follow', 'Follow'),
        ('recipe_rated', 'Recipe Rated'),
        ('mention', 'Mention'),
    ]

    recipient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_notifications')
    notification_type = models.CharField(max_length=20, choices=NOTIFICATION_TYPES)
    message = models.CharField(max_length=255)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, blank=True, null=True)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, blank=True, null=True)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Notification for {self.recipient.username}: {self.message}"


class CookingTip(models.Model):
    """Daily cooking tips"""
    TIP_CATEGORIES = [
        ('cooking', 'Cooking Tips'),
        ('ingredient', 'Ingredient Tips'),
        ('baking', 'Baking Tips'),
        ('kitchen_hacks', 'Kitchen Hacks'),
        ('international', 'International Cooking Tips'),
        ('healthy', 'Healthy Eating Tips'),
    ]

    title = models.CharField(max_length=200)
    content = models.TextField()
    category = models.CharField(max_length=20, choices=TIP_CATEGORIES, default='cooking')
    author = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class UserIngredient(models.Model):
    """Ingredients that user has in their kitchen"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_ingredients')
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    quantity = models.CharField(max_length=50, blank=True)
    expiry_date = models.DateField(blank=True, null=True)
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'ingredient')

    def __str__(self):
        return f"{self.user.username} has {self.ingredient.name}"
