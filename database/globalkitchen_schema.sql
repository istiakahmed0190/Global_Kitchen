-- GlobalKitchen Database Schema
-- "Cooking Without Borders where Flavors Meet Cultures"

CREATE DATABASE IF NOT EXISTS globalkitchen_db;
USE globalkitchen_db;

-- Users table (extends Django's built-in auth_user)
CREATE TABLE IF NOT EXISTS auth_user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    password VARCHAR(128) NOT NULL,
    last_login DATETIME(6),
    is_superuser TINYINT(1) NOT NULL,
    username VARCHAR(150) UNIQUE NOT NULL,
    first_name VARCHAR(150) NOT NULL,
    last_name VARCHAR(150) NOT NULL,
    email VARCHAR(254) NOT NULL,
    is_staff TINYINT(1) NOT NULL,
    is_active TINYINT(1) NOT NULL,
    date_joined DATETIME(6) NOT NULL
);

-- Extended user profile information
CREATE TABLE IF NOT EXISTS core_user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    password VARCHAR(128) NOT NULL,
    last_login DATETIME(6),
    is_superuser TINYINT(1) NOT NULL,
    username VARCHAR(150) UNIQUE NOT NULL,
    first_name VARCHAR(150) NOT NULL,
    last_name VARCHAR(150) NOT NULL,
    email VARCHAR(254) NOT NULL,
    is_staff TINYINT(1) NOT NULL,
    is_active TINYINT(1) NOT NULL,
    date_joined DATETIME(6) NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    bio TEXT,
    profile_picture VARCHAR(100),
    location VARCHAR(100),
    website VARCHAR(200),
    instagram VARCHAR(50),
    twitter VARCHAR(50),
    facebook VARCHAR(50),
    rank INT DEFAULT 0,
    avg_rating DOUBLE DEFAULT 0.0,
    followers_count INT DEFAULT 0,
    following_count INT DEFAULT 0,
    posts_count INT DEFAULT 0,
    created_at DATETIME(6) NOT NULL,
    updated_at DATETIME(6) NOT NULL
);

-- Follow relationships
CREATE TABLE IF NOT EXISTS core_follow (
    id INT PRIMARY KEY AUTO_INCREMENT,
    follower_id INT NOT NULL,
    following_id INT NOT NULL,
    created_at DATETIME(6) NOT NULL,
    UNIQUE KEY unique_follow (follower_id, following_id),
    FOREIGN KEY (follower_id) REFERENCES core_user(id) ON DELETE CASCADE,
    FOREIGN KEY (following_id) REFERENCES core_user(id) ON DELETE CASCADE
);

-- Ingredients
CREATE TABLE IF NOT EXISTS core_ingredient (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) UNIQUE NOT NULL,
    category VARCHAR(50),
    description TEXT
);

-- Recipes
CREATE TABLE IF NOT EXISTS core_recipe (
    id INT PRIMARY KEY AUTO_INCREMENT,
    author_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    instructions TEXT NOT NULL,
    prep_time INT NOT NULL,
    cook_time INT NOT NULL,
    servings INT NOT NULL,
    difficulty VARCHAR(10) DEFAULT 'easy',
    cuisine_type VARCHAR(50),
    image VARCHAR(100),
    video VARCHAR(100),
    avg_rating DOUBLE DEFAULT 0.0,
    total_ratings INT DEFAULT 0,
    likes_count INT DEFAULT 0,
    comments_count INT DEFAULT 0,
    saves_count INT DEFAULT 0,
    views_count INT DEFAULT 0,
    is_featured TINYINT(1) DEFAULT 0,
    created_at DATETIME(6) NOT NULL,
    updated_at DATETIME(6) NOT NULL,
    FOREIGN KEY (author_id) REFERENCES core_user(id) ON DELETE CASCADE,
    INDEX idx_recipe_author (author_id),
    INDEX idx_recipe_rating (avg_rating),
    INDEX idx_recipe_created (created_at)
);

-- Recipe ingredients relationship
CREATE TABLE IF NOT EXISTS core_recipeingredient (
    id INT PRIMARY KEY AUTO_INCREMENT,
    recipe_id INT NOT NULL,
    ingredient_id INT NOT NULL,
    quantity VARCHAR(50) NOT NULL,
    is_optional TINYINT(1) DEFAULT 0,
    FOREIGN KEY (recipe_id) REFERENCES core_recipe(id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES core_ingredient(id) ON DELETE CASCADE
);

-- Posts (for food photos, reviews, tips, stories)
CREATE TABLE IF NOT EXISTS core_post (
    id INT PRIMARY KEY AUTO_INCREMENT,
    author_id INT NOT NULL,
    post_type VARCHAR(10) DEFAULT 'photo',
    title VARCHAR(200),
    content TEXT NOT NULL,
    image VARCHAR(100),
    video VARCHAR(100),
    recipe_id INT,
    hashtags VARCHAR(500),
    likes_count INT DEFAULT 0,
    comments_count INT DEFAULT 0,
    shares_count INT DEFAULT 0,
    created_at DATETIME(6) NOT NULL,
    updated_at DATETIME(6) NOT NULL,
    FOREIGN KEY (author_id) REFERENCES core_user(id) ON DELETE CASCADE,
    FOREIGN KEY (recipe_id) REFERENCES core_recipe(id) ON DELETE CASCADE,
    INDEX idx_post_author (author_id),
    INDEX idx_post_created (created_at),
    INDEX idx_post_type (post_type)
);

-- Likes (for both posts and recipes)
CREATE TABLE IF NOT EXISTS core_like (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    post_id INT,
    recipe_id INT,
    created_at DATETIME(6) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES core_user(id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES core_post(id) ON DELETE CASCADE,
    FOREIGN KEY (recipe_id) REFERENCES core_recipe(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_post (user_id, post_id),
    UNIQUE KEY unique_user_recipe (user_id, recipe_id)
);

-- Comments (for both posts and recipes)
CREATE TABLE IF NOT EXISTS core_comment (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    post_id INT,
    recipe_id INT,
    parent_id INT,
    content TEXT NOT NULL,
    created_at DATETIME(6) NOT NULL,
    updated_at DATETIME(6) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES core_user(id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES core_post(id) ON DELETE CASCADE,
    FOREIGN KEY (recipe_id) REFERENCES core_recipe(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES core_comment(id) ON DELETE CASCADE,
    INDEX idx_comment_post (post_id),
    INDEX idx_comment_recipe (recipe_id),
    INDEX idx_comment_created (created_at)
);

-- Recipe ratings
CREATE TABLE IF NOT EXISTS core_rating (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    recipe_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review TEXT,
    created_at DATETIME(6) NOT NULL,
    updated_at DATETIME(6) NOT NULL,
    UNIQUE KEY unique_user_recipe_rating (user_id, recipe_id),
    FOREIGN KEY (user_id) REFERENCES core_user(id) ON DELETE CASCADE,
    FOREIGN KEY (recipe_id) REFERENCES core_recipe(id) ON DELETE CASCADE
);

-- Saved recipes
CREATE TABLE IF NOT EXISTS core_savedrecipe (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    recipe_id INT NOT NULL,
    created_at DATETIME(6) NOT NULL,
    UNIQUE KEY unique_user_saved_recipe (user_id, recipe_id),
    FOREIGN KEY (user_id) REFERENCES core_user(id) ON DELETE CASCADE,
    FOREIGN KEY (recipe_id) REFERENCES core_recipe(id) ON DELETE CASCADE
);

-- Saved posts
CREATE TABLE IF NOT EXISTS core_savedpost (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    created_at DATETIME(6) NOT NULL,
    UNIQUE KEY unique_user_saved_post (user_id, post_id),
    FOREIGN KEY (user_id) REFERENCES core_user(id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES core_post(id) ON DELETE CASCADE
);

-- Notifications
CREATE TABLE IF NOT EXISTS core_notification (
    id INT PRIMARY KEY AUTO_INCREMENT,
    recipient_id INT NOT NULL,
    sender_id INT NOT NULL,
    notification_type VARCHAR(20) NOT NULL,
    message VARCHAR(255) NOT NULL,
    post_id INT,
    recipe_id INT,
    is_read TINYINT(1) DEFAULT 0,
    created_at DATETIME(6) NOT NULL,
    FOREIGN KEY (recipient_id) REFERENCES core_user(id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES core_user(id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES core_post(id) ON DELETE CASCADE,
    FOREIGN KEY (recipe_id) REFERENCES core_recipe(id) ON DELETE CASCADE,
    INDEX idx_notification_recipient (recipient_id),
    INDEX idx_notification_created (created_at)
);

-- Cooking tips
CREATE TABLE IF NOT EXISTS core_cookingtip (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(20) DEFAULT 'cooking',
    author_id INT,
    is_featured TINYINT(1) DEFAULT 0,
    created_at DATETIME(6) NOT NULL,
    FOREIGN KEY (author_id) REFERENCES core_user(id) ON DELETE CASCADE
);

-- User ingredients (what ingredients user has in their kitchen)
CREATE TABLE IF NOT EXISTS core_useringredient (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    ingredient_id INT NOT NULL,
    quantity VARCHAR(50),
    expiry_date DATE,
    added_at DATETIME(6) NOT NULL,
    UNIQUE KEY unique_user_ingredient (user_id, ingredient_id),
    FOREIGN KEY (user_id) REFERENCES core_user(id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES core_ingredient(id) ON DELETE CASCADE
);

-- Insert default cooking tips (25 tips as specified)
INSERT INTO core_cookingtip (title, content, category, is_featured, created_at) VALUES
-- Cooking Tips
('Preheat Your Pan', 'Always preheat your pan before adding ingredients for even cooking.', 'cooking', 1, NOW()),
('Keep Herbs Fresh', 'To keep herbs fresh longer, store them in a glass of water in the fridge.', 'cooking', 1, NOW()),
('Salt Your Water', 'Add a pinch of salt when boiling water—it helps it boil faster!', 'cooking', 1, NOW()),
('Don''t Overcrowd', 'Don''t overcrowd the pan when frying—it lowers the temperature and makes food soggy.', 'cooking', 1, NOW()),
('Cutting Board Stability', 'Use a damp paper towel under your cutting board to prevent slipping.', 'cooking', 1, NOW()),

-- Ingredient Tips
('Store Separately', 'Store onions and potatoes separately to prevent spoilage.', 'ingredient', 1, NOW()),
('Brown Sugar Hack', 'Add a slice of bread to your brown sugar container to keep it soft.', 'ingredient', 1, NOW()),
('Perfect Rice', 'Rinse rice until the water runs clear for fluffier grains.', 'ingredient', 1, NOW()),
('Freeze Herbs', 'Freeze leftover herbs in olive oil to use later in cooking.', 'ingredient', 1, NOW()),
('Lemon Enhancement', 'A squeeze of lemon can enhance the flavor of almost any dish.', 'ingredient', 1, NOW()),

-- Baking Tips
('Measure Flour Right', 'Measure flour properly—spoon it into the cup and level it off.', 'baking', 1, NOW()),
('Room Temperature', 'Use room temperature ingredients for smoother cake batters.', 'baking', 1, NOW()),
('Don''t Open Oven', 'Don''t open the oven door while baking—it affects the rise!', 'baking', 1, NOW()),
('Soft Cookies', 'Add a teaspoon of cornstarch to your cookie dough for softer cookies.', 'baking', 1, NOW()),
('Fluffy Cakes', 'A dash of vinegar makes cakes fluffier by reacting with baking soda.', 'baking', 1, NOW()),

-- Kitchen Hacks
('Citrus Juice', 'Microwave citrus fruits for 10 seconds to get more juice out.', 'kitchen_hacks', 1, NOW()),
('Stainless Steel Clean', 'Rub stainless steel with lemon to remove odors like garlic and fish.', 'kitchen_hacks', 1, NOW()),
('Peel Ginger Easy', 'Use a spoon to peel ginger—it''s easier than using a knife!', 'kitchen_hacks', 1, NOW()),
('Freeze Wine', 'Freeze leftover wine in ice cube trays for cooking later.', 'kitchen_hacks', 1, NOW()),
('Prevent Spills', 'Keep wooden spoons across boiling pots to prevent spills.', 'kitchen_hacks', 1, NOW()),

-- International Tips
('Italian Pasta Water', 'Italian pasta water should be as salty as the sea for better flavor.', 'international', 1, NOW()),
('Japanese Rice', 'Japanese sushi rice tastes better with a balance of vinegar, sugar, and salt.', 'international', 1, NOW()),
('Mexican Guacamole', 'Mexican guacamole stays green longer with a little lime juice.', 'international', 1, NOW()),
('Indian Curries', 'Indian curries develop more flavor if you sauté spices before adding liquids.', 'international', 1, NOW()),
('French Sauces', 'French sauces often start with a roux—flour and butter cooked together.', 'international', 1, NOW());

-- Insert some basic ingredients
INSERT INTO core_ingredient (name, category) VALUES
('Onion', 'Vegetables'),
('Garlic', 'Vegetables'),
('Tomato', 'Vegetables'),
('Potato', 'Vegetables'),
('Carrot', 'Vegetables'),
('Bell Pepper', 'Vegetables'),
('Spinach', 'Vegetables'),
('Chicken Breast', 'Meat'),
('Ground Beef', 'Meat'),
('Salmon', 'Seafood'),
('Eggs', 'Dairy'),
('Milk', 'Dairy'),
('Cheese', 'Dairy'),
('Butter', 'Dairy'),
('Rice', 'Grains'),
('Pasta', 'Grains'),
('Bread', 'Grains'),
('Olive Oil', 'Oils'),
('Salt', 'Seasonings'),
('Black Pepper', 'Seasonings'),
('Basil', 'Herbs'),
('Oregano', 'Herbs'),
('Thyme', 'Herbs'),
('Cumin', 'Spices'),
('Paprika', 'Spices');

-- Create indexes for better performance
CREATE INDEX idx_user_username ON core_user(username);
CREATE INDEX idx_user_email ON core_user(email);
CREATE INDEX idx_recipe_title ON core_recipe(title);
CREATE INDEX idx_post_hashtags ON core_post(hashtags);
CREATE INDEX idx_ingredient_name ON core_ingredient(name);
