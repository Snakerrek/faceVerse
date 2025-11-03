from extensions import db
from datetime import datetime
from flask import url_for

class Post(db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def __repr__(self):
        return f'<Post {self.content[:50]}...>'

    def to_dict(self):
        author_name = f"{self.author.first_name} {self.author.last_name}"

        author_avatar_url = None
        if self.author.avatar_filename:
            author_avatar_url = url_for('uploads.serve_file', 
                                        filename=self.author.avatar_filename, 
                                        _external=True)
        
        return {
            "id": self.id,
            "content": self.content,
            "timestamp": self.timestamp.isoformat(),
            "user_id": self.user_id,
            "author_name": author_name,
            "author_avatar_url": author_avatar_url
        }
