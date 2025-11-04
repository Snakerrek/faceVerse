from extensions import db
from datetime import datetime
from flask import url_for

post_likes = db.Table('post_likes',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('post_id', db.Integer, db.ForeignKey('posts.id'), primary_key=True)
)

class Post(db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    image_filename = db.Column(db.String(128), nullable=True)
    
    likes = db.relationship('User', secondary=post_likes, 
                            back_populates='liked_posts', 
                            lazy='dynamic')
                            
    comments = db.relationship('Comment', 
                               backref='post', 
                               lazy='dynamic', 
                               cascade='all, delete-orphan')

    def __repr__(self):
        return f'<Post {self.content[:50]}...>'

    def to_dict(self, current_user_id=None):
        author_name = f"{self.author.first_name} {self.author.last_name}"
        image_url = None
        if self.image_filename:
            image_url = url_for('uploads.serve_file', filename=self.image_filename, _external=True)
        
        author_avatar_url = None
        if self.author.avatar_filename:
            author_avatar_url = url_for('uploads.serve_file', 
                                        filename=self.author.avatar_filename, 
                                        _external=True)
        
        like_count = self.likes.count()
        
        is_liked_by_current_user = False
        if current_user_id:
            is_liked_by_current_user = self.likes.filter(
                post_likes.c.user_id == current_user_id
            ).count() > 0
            
        comment_count = self.comments.count()

        return {
            "id": self.id,
            "content": self.content,
            "timestamp": self.timestamp.isoformat(),
            "user_id": self.user_id,
            "author_name": author_name,
            "author_avatar_url": author_avatar_url,
            "image_url": image_url,
            "like_count": like_count,
            "is_liked_by_current_user": is_liked_by_current_user,
            "comment_count": comment_count
        }

