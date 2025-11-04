from extensions import db
from datetime import datetime
from flask import url_for

post_likes = db.Table(
    'post_likes',
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
    
    likes = db.relationship(
        'User',
        secondary=post_likes,
        back_populates='liked_posts',
        lazy='dynamic'
    )
    
    comments = db.relationship(
        'Comment',
        backref='post',
        lazy='dynamic',
        cascade='all, delete-orphan'
    )

    def __repr__(self):
        content_preview = self.content[:50]
        return f'<Post {content_preview}...>'

    def to_dict(self, current_user_id=None):
        return {
            "id": self.id,
            "content": self.content,
            "timestamp": self.timestamp.isoformat(),
            "user_id": self.user_id,
            "author_name": self._get_author_name(),
            "author_avatar_url": self._get_author_avatar_url(),
            "image_url": self._get_image_url(),
            "like_count": self._get_like_count(),
            "is_liked_by_current_user": self._is_liked_by_user(current_user_id),
            "comment_count": self._get_comment_count()
        }
    
    def _get_author_name(self):
        return f"{self.author.first_name} {self.author.last_name}"
    
    def _get_author_avatar_url(self):
        if not self.author.avatar_filename:
            return None
        return url_for(
            'uploads.serve_file',
            filename=self.author.avatar_filename,
            _external=True
        )
    
    def _get_image_url(self):
        if not self.image_filename:
            return None
        return url_for(
            'uploads.serve_file',
            filename=self.image_filename,
            _external=True
        )
    
    def _get_like_count(self):
        return self.likes.count()
    
    def _is_liked_by_user(self, user_id):
        if not user_id:
            return False
        return self.likes.filter(post_likes.c.user_id == user_id).count() > 0
    
    def _get_comment_count(self):
        return self.comments.count()
