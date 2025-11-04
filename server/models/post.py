from extensions import db
from datetime import datetime
from helpers.mixins import AuthorInfoMixin, LikeableMixin
from helpers.helperFunctions import generate_file_url


post_likes = db.Table(
    'post_likes',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('post_id', db.Integer, db.ForeignKey('posts.id'), primary_key=True)
)


class Post(AuthorInfoMixin, LikeableMixin, db.Model):
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
            "is_liked_by_current_user": self._is_liked_by_user(current_user_id, post_likes),
            "comment_count": self._get_comment_count()
        }
    
    def _get_image_url(self):
        return generate_file_url(self.image_filename)
    
    def _get_comment_count(self):
        return self.comments.count()
