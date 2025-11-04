from extensions import db
from datetime import datetime
from flask import url_for

comment_likes = db.Table('comment_likes',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('comment_id', db.Integer, db.ForeignKey('comments.id'), primary_key=True)
)

class Comment(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)

    likes = db.relationship('User', 
                            secondary=comment_likes, 
                            back_populates='liked_comments', 
                            lazy='dynamic')

    def __repr__(self):
        return f'<Comment {self.content[:50]}...>'

    def to_dict(self, current_user_id=None):
        """
        Serializes the Comment object to a dictionary.
        Optionally includes like info relative to current_user_id.
        """
        
        author_name = f"{self.author.first_name} {self.author.last_name}"
        
        author_avatar_url = None
        if self.author.avatar_filename:
            author_avatar_url = url_for('uploads.serve_file', 
                                        filename=self.author.avatar_filename, 
                                        _external=True)
        
        like_count = self.likes.count()
        
        is_liked_by_current_user = False
        if current_user_id:
            is_liked_by_current_user = self.likes.filter(
                comment_likes.c.user_id == current_user_id
            ).count() > 0
                                        
        return {
            "id": self.id,
            "content": self.content,
            "timestamp": self.timestamp.isoformat(),
            "user_id": self.user_id,
            "post_id": self.post_id,
            "author_name": author_name,
            "author_avatar_url": author_avatar_url,
            "like_count": like_count,
            "is_liked_by_current_user": is_liked_by_current_user
        }

