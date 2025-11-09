from flask import jsonify
from models.user import User
from flask_jwt_extended import create_access_token
from helpers.helperFunctions import parse_date, service_handler
from extensions import db


class AuthService:
    
    @staticmethod
    def _validate_required_fields(data, required_fields):
        if not data or not all(k in data for k in required_fields):
            return jsonify({"error": "Required data missing."}), 400
        return None
    
    @staticmethod
    def _validate_password(password):
        """Validate password requirements."""
        import re
        
        if len(password) < 8:
            return jsonify({"error": "Password must be at least 8 characters."}), 400
        
        if not re.search(r"[A-Z]", password):
            return jsonify({"error": "Password must contain at least one uppercase letter."}), 400
        
        if not re.search(r"\d", password):
            return jsonify({"error": "Password must contain at least one digit."}), 400
        
        if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
            return jsonify({"error": "Password must contain at least one special character."}), 400
        
        return None
    
    @staticmethod
    def _check_email_exists(email):
        return User.query.filter(User.email == email.lower()).first()
    
    @staticmethod
    @service_handler()
    def register(data):
        """Register a new user."""
        error = AuthService._validate_required_fields(
            data, ('email', 'password', 'first_name', 'last_name')
        )
        if error:
            return error
        
        if AuthService._check_email_exists(data['email']):
            return jsonify({"error": "This e-mail has account already."}), 400
        
        password_error = AuthService._validate_password(data['password'])
        if password_error:
            return password_error
        
        user_date_of_birth = None
        if data.get('date_of_birth'):
            user_date_of_birth, error = parse_date(data['date_of_birth'])
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
    @service_handler()
    def login(data):
        """Authenticate user and return access token."""
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
