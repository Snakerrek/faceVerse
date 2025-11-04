from flask import jsonify
from extensions import db
from models.user import User
from flask_jwt_extended import create_access_token
from datetime import datetime
from sqlalchemy import func, or_

class UserService:

    @staticmethod
    def create_user(data):
        if not data or not all(k in data for k in ('email', 'password', 'first_name', 'last_name')):
            return jsonify({"error": "Required data missing."}), 400

        if User.query.filter_by(email=data['email']).first():
            return jsonify({"error": "This e-mail has account already."}), 400
        
        date_of_birth_str = data.get('date_of_birth')
        user_date_of_birth = None
        if date_of_birth_str:
            try:
                user_date_of_birth = datetime.strptime(date_of_birth_str, '%Y-%m-%d').date()
            except ValueError:
                return jsonify({"error": "Wrong date format. Use YYYY-MM-DD."}), 400


        new_user = User(
            email=data['email'].lower(),
            first_name=data['first_name'],
            last_name=data['last_name'],
            date_of_birth=user_date_of_birth,
            gender=data['gender']
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

        email_to_save = data['email'].lower()
        user.email = data.get('email', email_to_save)

        if 'password' in data and data['password']:
            user.set_password(data['password'])
        user.first_name = data.get('first_name', user.first_name)
        user.last_name = data.get('last_name', user.last_name)

        if 'date_of_birth' in data:
            try:
                user.date_of_birth = datetime.strptime(data.get('date_of_birth'), '%Y-%m-%d').date()
            except ValueError:
                return jsonify({"error": "Wrong date format. Use YYYY-MM-DD."}), 400

        if 'gender' in data:
            user.gender = data.get('gender', user.gender)

        existing_user = User.query.filter(User.email == user.email, User.id != id).first()
        if existing_user:
            db.session.rollback()
            return jsonify({"error": f"Email '{user.email}' is already used for an existing user."}), 409

        db.session.commit()
        return jsonify({"message": "User updated", "user": user.to_dict()})

    @staticmethod
    def login_user(data):
        if not data or not data.get('email') or not data.get('password'):
            return jsonify({"error": "E-mail and password are required"}), 400

        email = data.get('email')
        password = data.get('password')

        user = User.query.filter(User.email == email.lower()).first()

        if not user or not user.check_password(password):
            return jsonify({"error": "Wrong data"}), 401

        access_token = create_access_token(identity=str(user.id), expires_delta=False)

        return jsonify({
            "message": "Login succesfull.",
            "access_token": access_token,
            "user": user.to_dict()
        }), 200
