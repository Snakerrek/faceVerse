from flask import jsonify
from extensions import db
from models.user import User
from flask_jwt_extended import create_access_token
from sqlalchemy import func, or_
from helpers.helperFunctions import parse_date


class UserService:
    
    @staticmethod
    def _validate_required_fields(data, required_fields):
        if not data or not all(k in data for k in required_fields):
            return jsonify({"error": "Required data missing."}), 400
        return None
    
    @staticmethod
    def _check_email_exists(email, exclude_id=None):
        query = User.query.filter(User.email == email.lower())
        if exclude_id:
            query = query.filter(User.id != exclude_id)
        return query.first()
    
    @staticmethod
    def _process_date_of_birth(date_of_birth_str):
        if not date_of_birth_str:
            return None, None
        return parse_date(date_of_birth_str)
    
    @staticmethod
    def create_user(data):
        error = UserService._validate_required_fields(
            data, ('email', 'password', 'first_name', 'last_name')
        )
        if error:
            return error
        
        if UserService._check_email_exists(data['email']):
            return jsonify({"error": "This e-mail has account already."}), 400
        
        user_date_of_birth, error = UserService._process_date_of_birth(data.get('date_of_birth'))
        if error:
            return error
        
        new_user = User(
            email=data['email'].lower(),
            first_name=data['first_name'],
            last_name=data['last_name'],
            date_of_birth=user_date_of_birth,
            gender=data.get('gender')
        )
        new_user.set_password(data['password'])
        
        db.session.add(new_user)
        db.session.commit()
        
        return jsonify({"message": "User created", "user": new_user.to_dict()}), 201
    
    @staticmethod
    def get_users():
        users = db.session.execute(db.select(User)).scalars().all()
        return jsonify([user.to_dict() for user in users])
    
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
    
    @staticmethod
    def update_user(id, data):
        user = db.get_or_404(User, id)
        
        if not data:
            return jsonify({"error": "Required data missing"}), 400
        
        user.email = data.get('email', user.email).lower()
        
        if data.get('password'):
            user.set_password(data['password'])
        
        user.first_name = data.get('first_name', user.first_name)
        user.last_name = data.get('last_name', user.last_name)
        user.gender = data.get('gender', user.gender)
        
        if 'date_of_birth' in data:
            user.date_of_birth, error = parse_date(data['date_of_birth'])
            if error:
                return error
        
        if UserService._check_email_exists(user.email, exclude_id=id):
            db.session.rollback()
            return jsonify({"error": f"Email '{user.email}' is already used for an existing user."}), 409
        
        db.session.commit()
        return jsonify({"message": "User updated", "user": user.to_dict()})
    
    @staticmethod
    def login_user(data):
        if not data or not data.get('email') or not data.get('password'):
            return jsonify({"error": "E-mail and password are required"}), 400
        
        user = User.query.filter(User.email == data['email'].lower()).first()
        
        if not user or not user.check_password(data['password']):
            return jsonify({"error": "Wrong data"}), 401
        
        access_token = create_access_token(identity=str(user.id), expires_delta=False)
        
        return jsonify({
            "message": "Login succesfull.",
            "access_token": access_token,
            "user": user.to_dict()
        }), 200
