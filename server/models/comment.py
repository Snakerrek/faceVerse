from extensions import db
from datetime import datetime
from flask import url_for


comment_likes = db.Table(
    'comment_likes',
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

    likes = db.relationship(
        'User',
        secondary=comment_likes,
        back_populates='liked_comments',
        lazy='dynamic'
    )

    def __repr__(self):
        content_preview = self.content[:50]
        return f'<Comment {content_preview}...>'

    def to_dict(self, current_user_id=None):
        return {
            "id": self.id,
            "content": self.content,
            "timestamp": self.timestamp.isoformat(),
            "user_id": self.user_id,
            "post_id": self.post_id,
            "author_name": self._get_author_name(),
            "author_avatar_url": self._get_author_avatar_url(),
            "like_count": self._get_like_count(),
            "is_liked_by_current_user": self._is_liked_by_user(current_user_id)
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
    
    def _get_like_count(self):
        return self.likes.count()
    
    def _is_liked_by_user(self, user_id):
        if not user_id:
            return False
        return self.likes.filter(comment_likes.c.user_id == user_id).count() > 0
