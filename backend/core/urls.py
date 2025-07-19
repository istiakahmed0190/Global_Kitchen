from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from . import views

# Create a router and register our viewsets with it
router = DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'recipes', views.RecipeViewSet)
router.register(r'posts', views.PostViewSet)
router.register(r'notifications', views.NotificationViewSet, basename='notification')
router.register(r'ingredients', views.IngredientViewSet)
router.register(r'user-ingredients', views.UserIngredientViewSet, basename='user-ingredient')

urlpatterns = [
    # Authentication endpoints
    path('auth/signup/', views.signup, name='signup'),
    path('auth/login/', views.login_view, name='login'),
    path('auth/logout/', views.logout_view, name='logout'),
    path('auth/token/', obtain_auth_token, name='api_token_auth'),
    
    # Utility endpoints
    path('daily-tip/', views.daily_tip, name='daily_tip'),
    path('search/', views.search, name='search'),
    
    # Include the router URLs
    path('', include(router.urls)),
]
