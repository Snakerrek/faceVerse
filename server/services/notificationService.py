from extensions import db
from models.notification import Notification
from helpers.helperFunctions import handle_db_error
from models.notification import Notification, NotificationType

class NotificationService:
    
    @staticmethod
    def create_notification(recipient_id, actor_id, notification_type, post_id=None, comment_id=None):
        """Create a notification."""
        try:
            # Prevent self-notifications
            if recipient_id == actor_id:
                return {"message": "Cannot notify yourself"}, 200
            
            notification = Notification(
                recipient_id=recipient_id,
                actor_id=actor_id,
                type=notification_type,
                post_id=post_id,
                comment_id=comment_id,
            )
            db.session.add(notification)
            db.session.commit()
            return notification.to_dict(), 201
        except Exception as e:
            return handle_db_error("Error creating notification", e)
    
    @staticmethod
    def notify_new_post(user_id, post_id):
        """Notify user's friends about new post."""
        try:
            from models.user import User
            from models.friendship import Friendship
            
            # Get all friends of the user
            friendships = db.session.execute(
                db.select(Friendship).filter(
                    ((Friendship.requester_id == user_id) | (Friendship.addressee_id == user_id)) &
                    (Friendship.status == 'accepted')
                )
            ).scalars().all()
            
            friends = []
            for f in friendships:
                friend_id = f.addressee_id if f.requester_id == user_id else f.requester_id
                friends.append(friend_id)
            
            # Create notification for each friend
            for friend_id in friends:
                NotificationService.create_notification(
                    recipient_id=friend_id,
                    actor_id=user_id,
                    notification_type=NotificationType.NEW_POST.value,
                    post_id=post_id
                )
            return True
        except Exception as e:
            print(f"Error notifying about new post: {e}")
            return False
    
    @staticmethod
    def notify_new_comment(post_owner_id, commenter_id, post_id, comment_id):
        """Notify post owner about new comment."""
        return NotificationService.create_notification(
            recipient_id=post_owner_id,
            actor_id=commenter_id,
            notification_type=NotificationType.NEW_COMMENT.value,
            post_id=post_id,
            comment_id=comment_id
        )
    
    @staticmethod
    def notify_post_liked(post_owner_id, liker_id, post_id):
        """Notify post owner about like."""
        return NotificationService.create_notification(
            recipient_id=post_owner_id,
            actor_id=liker_id,
            notification_type=NotificationType.POST_LIKED.value,
            post_id=post_id
        )
    
    @staticmethod
    def notify_comment_liked(comment_owner_id, liker_id, post_id, comment_id):
        """Notify comment author about like."""
        return NotificationService.create_notification(
            recipient_id=comment_owner_id,
            actor_id=liker_id,
            notification_type=NotificationType.COMMENT_LIKED.value,
            post_id=post_id,
            comment_id=comment_id
        )
    
    @staticmethod
    def notify_friend_request_accepted(requester_id, accepter_id):
        """Notify user that friend request was accepted."""
        return NotificationService.create_notification(
            recipient_id=requester_id,
            actor_id=accepter_id,
            notification_type=NotificationType.FRIEND_REQUEST_ACCEPTED.value
        )
    @staticmethod
    def notify_friend_request_sent(recipient_id, actor_id):
        """Notify user about incoming friend request."""
        return NotificationService.create_notification(
            recipient_id=recipient_id,
            actor_id=actor_id,
            notification_type=NotificationType.FRIEND_REQUEST.value
        )
    
    @staticmethod
    def get_notifications(user_id):
        """Get notifications for user."""
        try:
            notifications = db.session.execute(
                db.select(Notification)
                .filter(Notification.recipient_id == user_id)
                .order_by(Notification.created_at.desc())
            ).scalars().all()
            return [n.to_dict() for n in notifications], 200
        except Exception as e:
            return handle_db_error("Error fetching notifications", e)
    
    @staticmethod
    def get_unread_count(user_id):
        """Get unread notification count."""
        try:
            count = db.session.query(Notification).filter(
                (Notification.recipient_id == user_id) &
                (Notification.is_read == False)
            ).count()
            return {"unread_count": count}, 200
        except Exception as e:
            return handle_db_error("Error fetching unread count", e)
    
    @staticmethod
    def mark_as_read(notification_id):
        """Mark notification as read."""
        try:
            notification = db.session.get(Notification, notification_id)
            if not notification:
                return {"error": "Notification not found"}, 404
            
            notification.is_read = True
            db.session.commit()
            return notification.to_dict(), 200
        except Exception as e:
            return handle_db_error("Error marking notification as read", e)

    @staticmethod
    def mark_as_read(notification_id, user_id):
        """Mark notification as read."""
        try:
            notification = db.session.get(Notification, notification_id)
            if not notification:
                return {"error": "Notification not found"}, 404
            
            # Verify ownership
            if notification.recipient_id != user_id:
                return {"error": "Unauthorized"}, 403
            
            notification.is_read = True
            db.session.commit()
            return notification.to_dict(), 200
        except Exception as e:
            return handle_db_error("Error marking notification as read", e)
