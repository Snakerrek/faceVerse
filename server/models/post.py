from extensions import db
from datetime import datetime
from models.user import User

class Post(db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    # Relacja Foreign Key do tabeli User
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def __repr__(self):
        return f'<Post {self.content[:50]}...>'

    # Zwraca post wraz z danymi autora
    def to_dict(self):
        # Uzyskujemy dostęp do obiektu autora przez backref zdefiniowany w User
        author_name = f"{self.author.first_name} {self.author.last_name}"
        
        return {
            "id": self.id,
            "content": self.content,
            "timestamp": self.timestamp.isoformat(),
            "user_id": self.user_id,
            "author_name": author_name
            # W przyszłości można dodać avatar autora itp.
        }
