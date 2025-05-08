from flask import jsonify
from extensions import db
from models.user import User
from flask_jwt_extended import create_access_token
from datetime import date, datetime # Import for date conversion

class UserService:
    # Service handling business logic for users.

    @staticmethod
    def create_user(data):
        # Logic for creating a new user.
        # Input data validation
        if not data or not all(k in data for k in ('email', 'password', 'first_name', 'last_name')):
            return jsonify({"error": "Brak wymaganych danych."}), 400

        # Check for email uniqueness
        if User.query.filter_by(email=data['email']).first():
            return jsonify({"error": "Ten e-mail jest zajęty."}), 400
        
        date_of_birth_str = data.get('date_of_birth') # Expecting YYYY-MM-DD string from frontend
        user_date_of_birth = None
        if date_of_birth_str:
            try:
                # Convert string to date object
                user_date_of_birth = datetime.strptime(date_of_birth_str, '%Y-%m-%d').date()
            except ValueError:
                return jsonify({"error": "Zły format daty. Użyj YYYY-MM-DD."}), 400

        # Create User object
        new_user = User(
            email=data['email'],
            first_name=data['first_name'],
            last_name=data['last_name'],
            date_of_birth=user_date_of_birth,
            gender=data['gender']
        )
        new_user.set_password(data['password'])
        # Database operations
        db.session.add(new_user)
        db.session.commit()
        # Return response
        return jsonify({"message": "Użytkownik utworzony", "user": new_user.to_dict()}), 201

    @staticmethod
    def get_users():
        # Logic for fetching all users.
        users = db.session.execute(db.select(User)).scalars().all()
        return jsonify([user.to_dict() for user in users])

    @staticmethod
    def get_user(id):
        # Logic for fetching a single user.
        user = db.get_or_404(User, id) # Using get_or_404 for simplicity
        return jsonify(user.to_dict())

    @staticmethod
    def update_user(id, data):
        # Logic for updating a user.
        user = db.get_or_404(User, id)
        if not data:
            return jsonify({"error": "Brakujące dane"}), 400

        # Update fields
        user.email = data.get('email', user.email)
        if 'password' in data and data['password']: # Check if password is provided and not empty
            user.set_password(data['password']) # Use the hashing method
        user.first_name = data.get('first_name', user.first_name)
        user.last_name = data.get('last_name', user.last_name)

        if 'date_of_birth' in data:
            try:
                user.date_of_birth = datetime.strptime(data.get('date_of_birth'), '%Y-%m-%d').date()
            except ValueError:
                return jsonify({"error": "Zły format daty. Użyj YYYY-MM-DD."}), 400

        if 'gender' in data:
            user.gender = data.get('gender', user.gender)

        # Check for email uniqueness after change (if email was changed)
        existing_user = User.query.filter(User.email == user.email, User.id != id).first()
        if existing_user:
            db.session.rollback() # Rollback changes before commit
            return jsonify({"error": f"Email '{user.email}' istnieje już dla innego użytkownika"}), 409

        db.session.commit()
        return jsonify({"message": "Użytkownik zaaktualizowany", "user": user.to_dict()})

    @staticmethod
    def login_user(data):
        # Logic for user login.
        if not data or not data.get('email') or not data.get('password'):
            return jsonify({"error": "E-mail i hasło są wymagane"}), 400

        email = data.get('email')
        password = data.get('password')

        user = User.query.filter_by(email=email).first()

        if not user or not user.check_password(password):
            return jsonify({"error": "Błędne dane"}), 401

        # --- MODIFIED: Generate JWT upon successful login ---
        # The identity can be anything that uniquely identifies the user, e.g., user.id or user.email
        access_token = create_access_token(identity=user.id) # Use user.id as the identity

        return jsonify({
            "message": "Logowanie udane.",
            "access_token": access_token,
            "user": user.to_dict()
        }), 200
