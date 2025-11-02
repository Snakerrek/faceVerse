from flask import jsonify
from extensions import db
from models.post import Post
from datetime import datetime

class PostService:
    
    @staticmethod
    def create_post(data, user_id):
        content = data.get('content')
        if not content:
            return jsonify({"error": "Treść posta nie może być pusta."}), 400
        
        try:
            new_post = Post(
                content=content,
                user_id=user_id,
                timestamp=datetime.utcnow()
            )
            db.session.add(new_post)
            db.session.commit()
            
            return jsonify({"message": "Post utworzony", "post": new_post.to_dict()}), 201
            
        except Exception as e:
            db.session.rollback()
            print(f"Error creating post: {e}")
            return jsonify({"error": "Wewnętrzny błąd serwera przy tworzeniu posta."}), 500

    @staticmethod
    def get_posts():
        try:
            # Pobieramy posty, sortując od najnowszego do najstarszego
            posts = db.session.scalars(
                db.select(Post).order_by(Post.timestamp.desc())
            ).all()
            
            return jsonify([post.to_dict() for post in posts]), 200
            
        except Exception as e:
            db.session.rollback()
            print(f"Error fetching posts: {e}")
            return jsonify({"error": "Wewnętrzny błąd serwera przy pobieraniu postów."}), 500
