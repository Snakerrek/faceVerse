from flask import jsonify
from extensions import db
from models.post import Post
from models.user import User
from models.comment import Comment
from services.uploadService import UploadService
from helpers.helperFunctions import validate_content, service_handler
from services.notificationService import NotificationService
from services.friendshipService import FriendshipService


class PostService:
    
    @staticmethod
    def _toggle_like(entity, user):
        """Toggle like status for a post or comment."""
        if user in entity.likes:
            entity.likes.remove(user)
            return False
        else:
            entity.likes.append(user)
            return True
    
    @staticmethod
    def _get_entity_or_404(model, entity_id, entity_name):
        """Get entity by ID or return 404 error."""
        entity = db.session.get(model, entity_id)
        if not entity:
            return None, (jsonify({"error": f"{entity_name} not found"}), 404)
        return entity, None
    
    @staticmethod
    def get_posts_by_user_id(user_id, current_user_id):
        """Get all posts by a specific user (doesn't need decorator - no DB commits)."""
        posts = db.session.execute(
            db.select(Post)
            .filter(Post.user_id == user_id)
            .order_by(Post.timestamp.desc())
        ).scalars().all()
        
        return [post.to_dict(current_user_id=current_user_id) for post in posts]
    
    @staticmethod
    @service_handler()
    def create_post(data, user_id, uploaded_file=None):
        """Create a new post."""
        content, error = validate_content(data)
        if error:
            return error
        
        image_filename = UploadService.save_file(uploaded_file) if uploaded_file else None
        
        new_post = Post(
            content=content,
            user_id=user_id,
            image_filename=image_filename
        )
        
        db.session.add(new_post)
        db.session.commit()
        
        friend_ids = FriendshipService.get_friend_ids(user_id)
        for friend_id in friend_ids:
            NotificationService.create_notification(
                recipient_id=friend_id,
                actor_id=user_id,
                notification_type='new_post',
                post_id=new_post.id
            )
        
        return jsonify({"message": "Post created", "post": new_post.to_dict(current_user_id=user_id)}), 201
    
    @staticmethod
    @service_handler()
    def get_posts(current_user_id):
        """Get posts from current user and friends."""
        friend_ids = FriendshipService.get_friend_ids(current_user_id)
        friend_ids.append(current_user_id)
        
        posts = db.session.scalars(
            db.select(Post)
            .filter(Post.user_id.in_(friend_ids))
            .order_by(Post.timestamp.desc())
        ).all()
        
        return jsonify([post.to_dict(current_user_id=current_user_id) for post in posts]), 200
    
    @staticmethod
    @service_handler()
    def like_post(post_id, user_id):
        """Like or unlike a post."""
        post, error = PostService._get_entity_or_404(Post, post_id, "Post")
        if error:
            return error
        
        user, error = PostService._get_entity_or_404(User, user_id, "User")
        if error:
            return error
        
        liked = PostService._toggle_like(post, user)
        db.session.commit()
        
        if liked and post.user_id != user_id:
            NotificationService.create_notification(
                recipient_id=post.user_id,
                actor_id=user_id,
                notification_type='post_liked',
                post_id=post_id
            )
        
        return jsonify({
            "message": "Like status updated",
            "liked": liked,
            "like_count": post.likes.count()
        }), 200
    
    @staticmethod
    @service_handler()
    def get_post_likers(post_id):
        """Get all users who liked a post."""
        post, error = PostService._get_entity_or_404(Post, post_id, "Post")
        if error:
            return error
        
        return jsonify([user.to_dict() for user in post.likes]), 200
    
    @staticmethod
    @service_handler()
    def create_comment(post_id, user_id, data):
        """Create a new comment on a post."""
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
        
        if post.user_id != user_id:
            NotificationService.create_notification(
                recipient_id=post.user_id,
                actor_id=user_id,
                notification_type='new_comment',
                post_id=post_id,
                comment_id=new_comment.id
            )
        
        return jsonify({"message": "Comment created", "comment": new_comment.to_dict(current_user_id=user_id)}), 201
    
    @staticmethod
    @service_handler()
    def get_comments_for_post(post_id, current_user_id):
        """Get all comments for a post."""
        post, error = PostService._get_entity_or_404(Post, post_id, "Post")
        if error:
            return error
        
        comments = db.session.scalars(
            db.select(Comment)
            .filter_by(post_id=post_id)
            .order_by(Comment.timestamp.asc())
        ).all()
        
        return jsonify([comment.to_dict(current_user_id=current_user_id) for comment in comments]), 200
    
    @staticmethod
    @service_handler()
    def like_comment(comment_id, user_id):
        """Like or unlike a comment."""
        comment, error = PostService._get_entity_or_404(Comment, comment_id, "Comment")
        if error:
            return error
        
        user, error = PostService._get_entity_or_404(User, user_id, "User")
        if error:
            return error
        
        liked = PostService._toggle_like(comment, user)
        db.session.commit()
        
        if liked and comment.user_id != user_id:
            NotificationService.create_notification(
                recipient_id=comment.user_id,
                actor_id=user_id,
                notification_type='comment_liked',
                post_id=comment.post_id,
                comment_id=comment_id
            )
        
        return jsonify({
            "message": "Comment like status updated",
            "liked": liked,
            "like_count": comment.likes.count()
        }), 200
    
    @staticmethod
    @service_handler()
    def get_comment_likers(comment_id):
        """Get all users who liked a comment."""
        comment, error = PostService._get_entity_or_404(Comment, comment_id, "Comment")
        if error:
            return error
        
        return jsonify([user.to_dict() for user in comment.likes]), 200
    
    @staticmethod
    @service_handler()
    def get_post_by_id(post_id):
        """Get a specific post by ID."""
        post = db.session.get(Post, post_id)
        if not post:
            return jsonify({"error": "Post not found"}), 404
        return post.to_dict(), 200
