from extensions import db
from helpers.helperFunctions import get_cet_now

class Notification(db.Model):
    __tablename__ = 'notifications'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    actor_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    type = db.Column(db.String(50), nullable=False) 
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=True)
    is_read = db.Column(db.Boolean, default=False, nullable=False)
    created_at = db.Column(db.DateTime, default=get_cet_now, nullable=False)
    
    user = db.relationship('User', foreign_keys=[user_id], backref='notifications')
    actor = db.relationship('User', foreign_keys=[actor_id])
    post = db.relationship('Post', foreign_keys=[post_id])
    
    def to_dict(self):
        actor_data = {
            "id": self.actor.id,
            "first_name": self.actor.first_name,
            "last_name": self.actor.last_name,
            "avatar_url": self.actor.get_avatar_url() if hasattr(self.actor, 'get_avatar_url') else None
        }
        
        return {
            "id": self.id,
            "type": self.type,
            "actor": actor_data,
            "post_id": self.post_id,
            "is_read": self.is_read,
            "created_at": self.created_at.isoformat()
        }
