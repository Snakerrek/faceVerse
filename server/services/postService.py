from flask import jsonify
from extensions import db
from models.post import Post
from models.user import User
from models.comment import Comment
from sqlalchemy import func
from services.uploadService import UploadService
from helpers.helperFunctions import validate_content, handle_db_error


class PostService:
    
    @staticmethod
    def _toggle_like(entity, user, entity_name):
        if user in entity.likes:
            entity.likes.remove(user)
            return False
        else:
            entity.likes.append(user)
            return True
    
    @staticmethod
    def _get_entity_or_404(model, entity_id, entity_name):
        entity = db.session.get(model, entity_id)
        if not entity:
            return None, (jsonify({"error": f"{entity_name} not found"}), 404)
        return entity, None
    
    @staticmethod
    def create_post(data, user_id, uploaded_file=None):
        content, error = validate_content(data)
        if error:
            return error
        
        try:
            image_filename = UploadService.save_file(uploaded_file) if uploaded_file else None
            
            new_post = Post(
                content=content,
                user_id=user_id,
                image_filename=image_filename
            )
            
            db.session.add(new_post)
            db.session.commit()
            
            return jsonify({"message": "Post created", "post": new_post.to_dict(current_user_id=user_id)}), 201
        
        except ValueError as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 400
        except Exception as e:
            db.session.rollback()
            return handle_db_error("Error creating post", e)
    
    @staticmethod
    def get_posts(current_user_id):
        try:
            posts = db.session.scalars(
                db.select(Post).order_by(Post.timestamp.desc())
            ).all()
            return jsonify([post.to_dict(current_user_id=current_user_id) for post in posts]), 200
        except Exception as e:
            db.session.rollback()
            return handle_db_error("Error fetching posts", e)
    
    @staticmethod
    def get_posts_by_user_id(user_id, current_user_id):
        posts = db.session.execute(
            db.select(Post)
            .filter(Post.user_id == user_id)
            .order_by(Post.timestamp.desc())
        ).scalars().all()
        
        return [post.to_dict(current_user_id=current_user_id) for post in posts]
    
    @staticmethod
    def like_post(post_id, user_id):
        try:
            post, error = PostService._get_entity_or_404(Post, post_id, "Post")
            if error:
                return error
            
            user, error = PostService._get_entity_or_404(User, user_id, "User")
            if error:
                return error
            
            liked = PostService._toggle_like(post, user, "Post")
            db.session.commit()
            
            return jsonify({
                "message": "Like status updated",
                "liked": liked,
                "like_count": post.likes.count()
            }), 200
        except Exception as e:
            db.session.rollback()
            return handle_db_error("Error liking post", e)
    
    @staticmethod
    def get_post_likers(post_id):
        try:
            post, error = PostService._get_entity_or_404(Post, post_id, "Post")
            if error:
                return error
            
            return jsonify([user.to_dict() for user in post.likes]), 200
        except Exception as e:
            db.session.rollback()
            return handle_db_error("Error fetching post likers", e)
    
    @staticmethod
    def create_comment(post_id, user_id, data):
        try:
            content, error = validate_content(data)
            if error:
                return error
            
            post, error = PostService._get_entity_or_404(Post, post_id, "Post")
            if error:
                return error
            
            new_comment = Comment(
                content=content,
                user_id=user_id,
                post_id=post_id
            )
            
            db.session.add(new_comment)
            db.session.commit()
            
            return jsonify({"message": "Comment created", "comment": new_comment.to_dict(current_user_id=user_id)}), 201
        except Exception as e:
            db.session.rollback()
            return handle_db_error("Error creating comment", e)
    
    @staticmethod
    def get_comments_for_post(post_id, current_user_id):
        try:
            post, error = PostService._get_entity_or_404(Post, post_id, "Post")
            if error:
                return error
            
            comments = db.session.scalars(
                db.select(Comment)
                .filter_by(post_id=post_id)
                .order_by(Comment.timestamp.asc())
            ).all()
            
            return jsonify([comment.to_dict(current_user_id=current_user_id) for comment in comments]), 200
        except Exception as e:
            db.session.rollback()
            return handle_db_error("Error fetching comments", e)
    
    @staticmethod
    def like_comment(comment_id, user_id):
        try:
            comment, error = PostService._get_entity_or_404(Comment, comment_id, "Comment")
            if error:
                return error
            
            user, error = PostService._get_entity_or_404(User, user_id, "User")
            if error:
                return error
            
            liked = PostService._toggle_like(comment, user, "Comment")
            db.session.commit()
            
            return jsonify({
                "message": "Comment like status updated",
                "liked": liked,
                "like_count": comment.likes.count()
            }), 200
        except Exception as e:
            db.session.rollback()
            return handle_db_error("Error liking comment", e)
    
    @staticmethod
    def get_comment_likers(comment_id):
        try:
            comment, error = PostService._get_entity_or_404(Comment, comment_id, "Comment")
            if error:
                return error
            
            return jsonify([user.to_dict() for user in comment.likes]), 200
        except Exception as e:
            db.session.rollback()
            return handle_db_error("Error fetching comment likers", e)
