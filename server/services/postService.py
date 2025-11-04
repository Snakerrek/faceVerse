from flask import jsonify, request
from extensions import db
from models.post import Post
from models.user import User
from models.comment import Comment
from datetime import datetime
from sqlalchemy import desc, asc
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
        """Fetches all posts, including like status for the current user."""
        try:
            posts = db.session.scalars(
                db.select(Post).order_by(Post.timestamp.desc())
            ).all()
            
            return jsonify([post.to_dict(current_user_id=current_user_id) for post in posts]), 200
            
        except Exception as e:
            db.session.rollback()
            print(f"Error fetching posts: {e}")
            return jsonify({"error": "Internal server error"}), 500

    @staticmethod
    def get_posts_by_user_id(user_id, current_user_id):
        """Fetches posts for a specific user ID, including like status for the current user."""
        posts = db.session.execute(
            db.select(Post)
            .filter(Post.user_id == user_id)
            .order_by(desc(Post.timestamp))
        ).scalars().all()
        
        return [post.to_dict(current_user_id=current_user_id) for post in posts]

    @staticmethod
    def like_post(post_id, user_id):
        """Toggles a like on a post for a given user."""
        try:
            post = db.session.get(Post, post_id)
            if not post:
                return jsonify({"error": "Post not found"}), 404
            
            user = db.session.get(User, user_id)
            if not user:
                return jsonify({"error": "User not found"}), 404

            if user in post.likes:
                post.likes.remove(user)
                liked = False
            else:
                post.likes.append(user)
                liked = True
            
            db.session.commit()
            
            return jsonify({
                "message": "Like status updated", 
                "liked": liked,
                "like_count": post.likes.count()
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
            
            # Use the 'likes' relationship (not 'likers')
            likers_list = [user.to_dict() for user in post.likes]
            
            return jsonify(likers_list), 200

        except Exception as e:
            db.session.rollback()
            print(f"Error fetching post likers: {e}")
            return jsonify({"error": "Internal server error"}), 500


    @staticmethod
    def create_comment(post_id, user_id, data):
        """Creates a new comment on a post."""
        try:
            content = data.get('content')
            if not content or not content.strip():
                return jsonify({"error": "Comment content cannot be empty"}), 400

            post = db.session.get(Post, post_id)
            if not post:
                return jsonify({"error": "Post not found"}), 404
            
            new_comment = Comment(
                content=content,
                user_id=user_id,
                post_id=post_id
            )
            
            db.session.add(new_comment)
            db.session.commit()
            
            return jsonify({"message": "Comment created", "comment": new_comment.to_dict()}), 201
            
        except Exception as e:
            db.session.rollback()
            print(f"Error creating comment: {e}")
            return jsonify({"error": "Internal server error"}), 500

    @staticmethod
    def get_comments_for_post(post_id):
        """Fetches all comments for a specific post."""
        try:
            post = db.session.get(Post, post_id)
            if not post:
                return jsonify({"error": "Post not found"}), 404
                
            comments = db.session.scalars(
                db.select(Comment)
                .filter_by(post_id=post_id)
                .order_by(Comment.timestamp.asc())
            ).all()
            
            comments_list = [comment.to_dict() for comment in comments]
            
            return jsonify(comments_list), 200

        except Exception as e:
            db.session.rollback()
            print(f"Error fetching comments: {e}")
            return jsonify({"error": "Internal server error"}), 500

