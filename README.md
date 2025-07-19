# GlobalKitchen.com - React Django Full Stack
**"Cooking Without Borders where Flavors Meet Cultures"**

A comprehensive food recipe sharing platform built with Django REST Framework backend and React Next.js frontend.

## 🚀 Features

### Core Functionality
- **User Authentication**: Sign up, login, logout with secure token-based authentication
- **User Profiles**: Custom profiles with bio, social media links, profile pictures
- **Recipe Sharing**: Create, share, and discover recipes from around the world
- **Social Features**: Follow users, like posts/recipes, comment, and share
- **Recipe Matching**: Find recipes based on ingredients you have
- **Search**: Global search for users, recipes, posts, and hashtags
- **Notifications**: Real-time notifications for interactions
- **Daily Tips**: Random cooking tips from 25+ curated tips

### Advanced Features
- **Recipe Rating System**: 5-star rating with reviews
- **Save/Bookmark**: Save favorite recipes and posts
- **Ingredient Management**: Track ingredients you have
- **Hashtag Support**: Organize content with hashtags
- **Media Support**: Upload images and videos
- **Multi-cuisine Support**: International recipes and tips

## 📋 Project Structure

```
global_kitchen/
├── backend/                        # Django REST Framework Backend
│   ├── manage.py                   # Django management script
│   ├── requirements.txt            # Python dependencies
│   ├── globalkitchen/              # Django project settings
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── ...
│   └── core/                       # Main Django app
│       ├── models.py               # Database models
│       ├── views.py                # API views
│       ├── serializers.py          # DRF serializers
│       ├── admin.py                # Admin interface
│       └── urls.py                 # API endpoints
├── app/                           # Next.js 15 app directory
├── components/                    # React UI components
├── lib/                          # Utility libraries
├── hooks/                        # Custom React hooks
├── styles/                       # Tailwind CSS styles
├── public/                       # Static assets
├── database/                     # Database schema files
├── start_globalkitchen.bat       # Full-stack launcher
├── start_django_server.bat       # Backend only
├── start_react_frontend.bat      # Frontend only
└── package.json                  # Node.js dependencies
```

## 🛠️ Setup Instructions

### Prerequisites
- Python 3.8+
- MySQL 5.7+ or 8.0+
- Node.js 16+ (for React frontend)

### Database Setup
1. Install MySQL and start the service
2. Create the database:
   ```sql
   mysql -u root -p < database/globalkitchen_schema.sql
   ```

### Backend Setup (Django)
1. Navigate to the Django backend:
   ```bash
   cd "v0 react django/backend/django_backend"
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Update database settings in `globalkitchen/settings.py`:
   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.mysql',
           'NAME': 'globalkitchen_db',
           'USER': 'your_mysql_user',
           'PASSWORD': 'your_mysql_password',
           'HOST': 'localhost',
           'PORT': '3306',
       }
   }
   ```

4. Run migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. Create a superuser:
   ```bash
   python manage.py createsuperuser
   ```

6. Start the Django server:
   ```bash
   python manage.py runserver 8000
   ```

### Quick Start (Windows)
Simply run the batch file:
```bash
start_django_server.bat
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup/` - User registration
- `POST /api/auth/login/` - User login
- `POST /api/auth/logout/` - User logout

### Users
- `GET /api/users/` - List all users
- `GET /api/users/{id}/` - Get user profile
- `POST /api/users/{id}/follow/` - Follow/unfollow user
- `GET /api/users/{id}/followers/` - Get user's followers
- `GET /api/users/{id}/following/` - Get users being followed

### Recipes
- `GET /api/recipes/` - List all recipes
- `POST /api/recipes/` - Create new recipe
- `GET /api/recipes/{id}/` - Get recipe details
- `POST /api/recipes/{id}/like/` - Like/unlike recipe
- `POST /api/recipes/{id}/rate/` - Rate recipe (1-5 stars)
- `POST /api/recipes/{id}/save_recipe/` - Save/unsave recipe
- `POST /api/recipes/recipe_matching/` - Find recipes by ingredients

### Posts
- `GET /api/posts/` - List all posts
- `POST /api/posts/` - Create new post
- `GET /api/posts/{id}/` - Get post details
- `POST /api/posts/{id}/like/` - Like/unlike post
- `POST /api/posts/{id}/comment/` - Add comment
- `GET /api/posts/{id}/comments/` - Get post comments

### Utility
- `GET /api/daily-tip/` - Get random cooking tip + motto
- `GET /api/search/?q=query` - Global search
- `GET /api/notifications/` - Get user notifications
- `GET /api/ingredients/` - List ingredients

## 🎯 Frontend Integration

### React Component Example
```jsx
// Example: Daily tip component
const DailyTip = () => {
  const [tip, setTip] = useState('');
  const [motto, setMotto] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/api/daily-tip/')
      .then(res => res.json())
      .then(data => {
        setTip(data.tip);
        setMotto(data.motto);
      });
  }, []);

  return (
    <div className="daily-tip">
      <h3>{motto}</h3>
      <p>💡 Tip of the Day: {tip}</p>
    </div>
  );
};
```

### Authentication Example
```jsx
// Login example
const login = async (username, password) => {
  const response = await fetch('http://localhost:8000/api/auth/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  
  const data = await response.json();
  if (data.token) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  return data;
};
```

## 📱 Frontend Pages Mapping

Based on your specifications:

1. **Login Page** → `components/auth/login-form.tsx`
2. **Signup Page** → `components/auth/signup-form.tsx`
3. **Loading Page** → `components/loading-screen.tsx` (shows motto + random tip)
4. **Home Page** → `components/home-page.tsx` (feed, search, navigation)
5. **Profile Page** → `components/profile/` (user profiles)
6. **My Profile** → `components/profile/` (edit profile, settings)
7. **Notifications** → `components/notifications/`
8. **Recipe Matching** → Special search feature in home page

## 🔑 Key Features Implementation

### Recipe Matching
```python
# API endpoint: POST /api/recipes/recipe_matching/
# Send: {"ingredients": ["onion", "garlic", "chicken"]}
# Returns: Recipes sorted by matching ingredients count
```

### Daily Tips System
- 25 pre-loaded cooking tips in database
- Random tip API endpoint
- Categories: cooking, ingredient, baking, kitchen_hacks, international, healthy

### Notification System
- Real-time notifications for likes, comments, follows, ratings
- Mark as read functionality
- Notification types: like, comment, follow, recipe_rated, mention

### Social Features
- Follow/unfollow users
- Like posts and recipes
- Comment with reply support
- Share functionality
- Hashtag support (#tags)

## 🚀 Running the Full Stack

1. **Start Django Backend**: Run `start_django_server.bat` (port 8000)
2. **Start React Frontend**: `npm run dev` in the main directory (port 3000)
3. **Access Application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000/api/
   - Admin Panel: http://localhost:8000/admin/

## 🔧 Admin Panel

Access the Django admin at `http://localhost:8000/admin/` to:
- Manage users, recipes, posts
- View statistics and analytics
- Moderate content
- Manage cooking tips
- Handle notifications

Default admin credentials (created by startup script):
- Username: `admin`
- Password: `admin123`

## 📊 Database Models

### Core Models
- **User**: Extended Django user with profile info
- **Recipe**: Recipe details with ingredients and instructions
- **Post**: General posts (photos, tips, reviews)
- **Ingredient**: Available ingredients for recipes
- **Follow**: User follow relationships
- **Like**: Likes for posts and recipes
- **Comment**: Comments with reply support
- **Rating**: 5-star recipe ratings
- **Notification**: User notifications

## 🎨 Motto Integration

The project motto **"Cooking Without Borders where Flavors Meet Cultures"** appears in:
- Loading screen
- Daily tip API response
- Admin panel header
- Database schema comments
- README documentation

---

**Ready to cook up something amazing! 🍳👨‍🍳👩‍🍳**
 
