from flask import jsonify
from extensions import db
from models.post import Post
from models.user import User  # Import the User model
from datetime import datetime
from sqlalchemy import desc
from services.uploadService import UploadService

class PostService:
    
    @staticmethod
    def create_post(data, user_id, uploaded_file=None):
        content = data.get('content')
        if not content or content.strip() == "":
            return jsonify({"error": "Post content cannot be empty."}), 400
        
        image_filename_to_save = None
        
        try:
            if uploaded_file:
                image_filename_to_save = UploadService.save_file(uploaded_file)
            
            new_post = Post(
                content=content,
                user_id=user_id,
                timestamp=datetime.utcnow(),
                image_filename=image_filename_to_save
            )
            db.session.add(new_post)
            db.session.commit()
            
            # Pass current_user_id so 'is_liked' is correctly false
            return jsonify({"message": "Post created", "post": new_post.to_dict(current_user_id=user_id)}), 201
            
        except ValueError as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 400
        except Exception as e:
            db.session.rollback()
            print(f"Error creating post: {e}")
            return jsonify({"error": "Internal server error"}), 500

    @staticmethod
    def get_posts(current_user_id):
        """Fetches all posts, including like info for the current user."""
        try:
            posts = db.session.scalars(
                db.select(Post).order_by(Post.timestamp.desc())
            ).all()
            
            # Pass current_user_id to to_dict for each post
            return jsonify([post.to_dict(current_user_id) for post in posts]), 200
            
        except Exception as e:
            db.session.rollback()
            print(f"Error fetching posts: {e}")
            return jsonify({"error": "Internal server error"}), 500

    @staticmethod
    def get_posts_by_user_id(user_id, current_user_id):
        """Fetches posts for a specific user, including like info for the current user."""
        posts = db.session.execute(
            db.select(Post)
            .filter(Post.user_id == user_id)
            .order_by(desc(Post.timestamp))
        ).scalars().all()
        
        # Pass current_user_id to to_dict for each post
        return [post.to_dict(current_user_id) for post in posts]

    @staticmethod
    def like_post(post_id, user_id):
        """Likes or unlikes a post for a user."""
        try:
            post = db.session.get(Post, post_id)
            user = db.session.get(User, user_id)

            if not post:
                return jsonify({"error": "Post not found"}), 404
            if not user:
                return jsonify({"error": "User not found"}), 404

            # Check if the user has already liked the post
            # We use the relationship directly
            if post in user.liked_posts:
                # User has liked it, so unlike it
                user.liked_posts.remove(post)
                db.session.commit()
                # Recalculate count after commit
                like_count = post.likes.count()
                return jsonify({
                    "message": "Post unliked", 
                    "liked": False, 
                    "like_count": like_count
                }), 200
            else:
                # User has not liked it, so like it
                user.liked_posts.append(post)
                db.session.commit()
                # Recalculate count after commit
                like_count = post.likes.count()
                return jsonify({
                    "message": "Post liked", 
                    "liked": True, 
                    "like_count": like_count
                }), 200

        except Exception as e:
            db.session.rollback()
            print(f"Error liking post: {e}")
            return jsonify({"error": "Internal server error"}), 500

    @staticmethod
    def get_post_likers(post_id):
        """Fetches a list of users who liked a specific post."""
        try:
            post = db.session.get(Post, post_id)
            if not post:
                return jsonify({"error": "Post not found"}), 404
            
            # The 'likers' relationship on the Post model gives us the list of User objects
            # We then convert each User object to its dictionary representation
            likers_list = [user.to_dict() for user in post.likes]
            
            return jsonify(likers_list), 200

        except Exception as e:
            db.session.rollback()
            print(f"Error fetching post likers: {e}")
            return jsonify({"error": "Internal server error"}), 500
