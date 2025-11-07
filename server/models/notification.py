from extensions import db
from helpers.helperFunctions import get_cet_now

from enum import Enum as PyEnum

class NotificationType(PyEnum):
    FRIEND_REQUEST = "friend_request"
    FRIEND_REQUEST_ACCEPTED = "friend_request_accepted"
    NEW_POST = "new_post"
    NEW_COMMENT = "new_comment"
    POST_LIKED = "post_liked"
    COMMENT_LIKED = "comment_liked"

class Notification(db.Model):
    __tablename__ = 'notification'
    
    id = db.Column(db.Integer, primary_key=True)
    recipient_id = db.Column(db.Integer, nullable=False)
    actor_id = db.Column(db.Integer, nullable=False)
    type = db.Column(db.String(50), nullable=False)
    post_id = db.Column(db.Integer, nullable=True)
    comment_id = db.Column(db.Integer, nullable=True)
    is_read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=get_cet_now)
    
    def to_dict(self):
        actor = None
        if self.actor_id:
            from models.user import User
            actor_user = db.session.get(User, self.actor_id)
            actor = actor_user.to_dict() if actor_user else None
        
        return {
            "id": self.id,
            "type": self.type,
            "actor": actor,
            "post_id": self.post_id,
            "comment_id": self.comment_id,
            "is_read": self.is_read,
            "created_at": self.created_at.isoformat(),
        }
