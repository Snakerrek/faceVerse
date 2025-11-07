from flask import jsonify
from extensions import db
from models.user import User
from sqlalchemy import func, or_


class UserService:
    
    @staticmethod
    def _check_email_exists(email, exclude_id=None):
        query = User.query.filter(User.email == email.lower())
        if exclude_id:
            query = query.filter(User.id != exclude_id)
        return query.first()
    
    @staticmethod
    def search_users(query: str):
        if not query:
            return jsonify([])
        
        search_pattern = f"%{query.lower()}%"
        users = db.session.scalars(
            db.select(User).filter(
                or_(
                    func.lower(User.first_name).like(search_pattern),
                    func.lower(User.last_name).like(search_pattern)
                )
            ).limit(20)
        ).all()
        
        return jsonify([user.to_dict() for user in users])
    
    @staticmethod
    def get_user(id):
        user = db.get_or_404(User, id)
        return jsonify(user.to_dict())
