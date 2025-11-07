from flask import jsonify
from extensions import db
from models.user import User
from sqlalchemy import func, or_
from helpers.helperFunctions import parse_date


class UserService:
    
    @staticmethod
    def _check_email_exists(email, exclude_id=None):
        query = User.query.filter(User.email == email.lower())
        if exclude_id:
            query = query.filter(User.id != exclude_id)
        return query.first()
    
    # @staticmethod
    # def get_users():
    #     users = db.session.execute(db.select(User)).scalars().all()
    #     return jsonify([user.to_dict() for user in users])
    
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
    
    # @staticmethod
    # def update_user(id, data):
    #     user = db.get_or_404(User, id)
        
    #     if not data:
    #         return jsonify({"error": "Required data missing"}), 400
        
    #     user.email = data.get('email', user.email).lower()
        
    #     if data.get('password'):
    #         user.set_password(data['password'])
        
    #     user.first_name = data.get('first_name', user.first_name)
    #     user.last_name = data.get('last_name', user.last_name)
    #     user.gender = data.get('gender', user.gender)
        
    #     if 'date_of_birth' in data:
    #         user.date_of_birth, error = parse_date(data['date_of_birth'])
    #         if error:
    #             return error
        
    #     if UserService._check_email_exists(user.email, exclude_id=id):
    #         db.session.rollback()
    #         return jsonify({"error": f"Email '{user.email}' is already used for an existing user."}), 409
        
    #     db.session.commit()
    #     return jsonify({"message": "User updated", "user": user.to_dict()})
