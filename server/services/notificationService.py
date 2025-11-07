from flask import jsonify
from extensions import db
from models.notification import Notification
from helpers.helperFunctions import handle_db_error

class NotificationService:
    
    @staticmethod
    def get_notifications(user_id):
        """Get all notifications for a user."""
        try:
            notifications = db.session.execute(
                db.select(Notification)
                .filter_by(user_id=user_id)
                .order_by(Notification.created_at.desc())
            ).scalars().all()
            
            return jsonify([n.to_dict() for n in notifications]), 200
        except Exception as e:
            return handle_db_error("Error fetching notifications", e)
    
    @staticmethod
    def get_unread_count(user_id):
        """Get count of unread notifications."""
        try:
            count = db.session.execute(
                db.select(db.func.count(Notification.id))
                .filter_by(user_id=user_id, is_read=False)
            ).scalar()
            
            return jsonify({"unread_count": count}), 200
        except Exception as e:
            return handle_db_error("Error fetching unread count", e)
    
    @staticmethod
    def mark_as_read(notification_id, user_id):
        """Mark notification as read."""
        try:
            notification = db.session.get(Notification, notification_id)
            
            if not notification or notification.user_id != user_id:
                return jsonify({"error": "Notification not found"}), 404
            
            notification.is_read = True
            db.session.commit()
            
            return jsonify({"message": "Notification marked as read"}), 200
        except Exception as e:
            db.session.rollback()
            return handle_db_error("Error marking notification as read", e)
    
    @staticmethod
    def mark_all_as_read(user_id):
        """Mark all notifications as read."""
        try:
            db.session.execute(
                db.update(Notification)
                .where(Notification.user_id == user_id)
                .values(is_read=True)
            )
            db.session.commit()
            
            return jsonify({"message": "All notifications marked as read"}), 200
        except Exception as e:
            db.session.rollback()
            return handle_db_error("Error marking all as read", e)
    
    @staticmethod
    def create_notification(user_id, actor_id, notification_type, post_id=None):
        """Helper to create notifications."""
        try:
            notification = Notification(
                user_id=user_id,
                actor_id=actor_id,
                type=notification_type,
                post_id=post_id
            )
            db.session.add(notification)
            db.session.commit()
            return notification
        except Exception as e:
            db.session.rollback()
            print(f"Error creating notification: {e}")
            return None
