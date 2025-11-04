from extensions import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask import url_for


class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    date_of_birth = db.Column(db.Date, nullable=True)
    gender = db.Column(db.String(50), nullable=True)
    avatar_filename = db.Column(db.String(128), nullable=True)
    cover_filename = db.Column(db.String(128), nullable=True)
    
    posts = db.relationship('Post', backref='author', lazy='dynamic')
    liked_posts = db.relationship(
        'Post',
        secondary='post_likes',
        back_populates='likes',
        lazy='dynamic'
    )
    comments = db.relationship('Comment', backref='author', lazy='dynamic')
    liked_comments = db.relationship(
        'Comment',
        secondary='comment_likes',
        back_populates='likes',
        lazy='dynamic'
    )

    def set_password(self, password):
        self.password_hash = generate_password_hash(password, method='pbkdf2:sha256')

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f'<User {self.email}>'

    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "date_of_birth": self._format_date_of_birth(),
            "gender": self.gender,
            "avatar_url": self._get_avatar_url(),
            "cover_url": self._get_cover_url(),
        }
    
    def _format_date_of_birth(self):
        return self.date_of_birth.isoformat() if self.date_of_birth else None
    
    def _get_avatar_url(self):
        if not self.avatar_filename:
            return None
        return url_for(
            'uploads.serve_file',
            filename=self.avatar_filename,
            _external=True
        )
    
    def _get_cover_url(self):
        if not self.cover_filename:
            return None
        return url_for(
            'uploads.serve_file',
            filename=self.cover_filename,
            _external=True
        )
