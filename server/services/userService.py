from flask import jsonify
from extensions import db
from models.user import User
from helpers.helperFunctions import service_handler
from sqlalchemy import func, or_


class UserService:
    
    @staticmethod
    def _check_email_exists(email, exclude_id=None):
        """Check if email already exists (optionally excluding a user ID)."""
        query = User.query.filter(User.email == email.lower())
        if exclude_id:
            query = query.filter(User.id != exclude_id)
        return query.first()
    
    @staticmethod
    @service_handler()
    def search_users(query: str):
        """Search users by first or last name."""
        if not query:
            return jsonify([]), 200
        
        search_pattern = f"%{query.lower()}%"
        users = db.session.scalars(
            db.select(User).filter(
                or_(
                    func.lower(User.first_name).like(search_pattern),
                    func.lower(User.last_name).like(search_pattern)
                )
            ).limit(20)
        ).all()
        
        return jsonify([user.to_dict() for user in users]), 200
    
    @staticmethod
    @service_handler()
    def get_user(user_id):
        """Get user by ID."""
        user = db.get_or_404(User, user_id)
        return jsonify(user.to_dict()), 200
