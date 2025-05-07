from flask import jsonify
from extensions import db
from models.user import User

class UserService:
    # Service handling business logic for users.

    @staticmethod
    def create_user(data):
        # Logic for creating a new user.
        # Input data validation
        if not data or not all(k in data for k in ('email', 'password', 'first_name', 'last_name')):
            return jsonify({"error": "Missing required user data (email, password, first_name, last_name)"}), 400

        # Check for email uniqueness
        if User.query.filter_by(email=data['email']).first():
            return jsonify({"error": "Email already exists"}), 400

        # Create User object (password still plain text)
        new_user = User(
            email=data['email'],
            password=data['password'], # TODO: Hash password
            first_name=data['first_name'],
            last_name=data['last_name']
        )
        # Database operations
        db.session.add(new_user)
        db.session.commit()
        # Return response
        return jsonify({"message": "User created", "user": new_user.to_dict()}), 201

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
            return jsonify({"error": "Missing data"}), 400

        # Update fields
        user.email = data.get('email', user.email)
        user.password = data.get('password', user.password) # TODO: Handle password update securely
        user.first_name = data.get('first_name', user.first_name)
        user.last_name = data.get('last_name', user.last_name)

        # Check for email uniqueness after change (if email was changed)
        existing_user = User.query.filter(User.email == user.email, User.id != id).first()
        if existing_user:
            db.session.rollback() # Rollback changes before commit
            return jsonify({"error": f"Email '{user.email}' already exists for another user."}), 409

        db.session.commit()
        return jsonify({"message": "User updated", "user": user.to_dict()})

    @staticmethod
    def login_user(data):
        # Logic for user login.
        if not data or not data.get('email') or not data.get('password'):
            return jsonify({"error": "Email and password are required"}), 400

        email = data.get('email')
        password = data.get('password')

        user = User.query.filter_by(email=email).first()

        if not user:
            return jsonify({"error": "Invalid credentials, user not found"}), 401

        # This is a PLAIN TEXT password comparison.
        if user.password != password: # Direct insecure comparison
            return jsonify({"error": "Invalid credentials, password incorrect"}), 401

        # Login successful
        return jsonify({
            "message": "Login successful",
            "user": user.to_dict() # to_dict() should not expose password
        }), 200
