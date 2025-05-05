from flask import jsonify
from extensions import db
from models.user import User

class UserService:
    """Serwis obsługujący logikę biznesową dla użytkowników."""

    @staticmethod
    def create_user(data):
        """Logika tworzenia nowego użytkownika."""
        # Walidacja danych wejściowych
        if not data or not all(k in data for k in ('email', 'password', 'first_name', 'last_name')):
            return jsonify({"error": "Missing required user data (email, password, first_name, last_name)"}), 400

        # Sprawdzenie unikalności emaila
        if User.query.filter_by(email=data['email']).first():
            return jsonify({"error": "Email already exists"}), 400

        # Utworzenie obiektu User (hasło wciąż plain text)
        new_user = User(
            email=data['email'],
            password=data['password'], # TODO: Hash password
            first_name=data['first_name'],
            last_name=data['last_name']
        )
        # Operacje na bazie danych
        db.session.add(new_user)
        db.session.commit()
        # Zwrócenie odpowiedzi
        return jsonify({"message": "User created", "user": new_user.to_dict()}), 201

    @staticmethod
    def get_users():
        """Logika pobierania wszystkich użytkowników."""
        users = db.session.execute(db.select(User)).scalars().all()
        return jsonify([user.to_dict() for user in users])

    @staticmethod
    def get_user(id):
        """Logika pobierania pojedynczego użytkownika."""
        user = db.get_or_404(User, id) # Użycie get_or_404 dla uproszczenia
        return jsonify(user.to_dict())

    @staticmethod
    def update_user(id, data):
        """Logika aktualizacji użytkownika."""
        user = db.get_or_404(User, id)
        if not data:
            return jsonify({"error": "Missing data"}), 400

        # Aktualizacja pól
        user.email = data.get('email', user.email)
        user.password = data.get('password', user.password) # TODO: Handle password update securely
        user.first_name = data.get('first_name', user.first_name)
        user.last_name = data.get('last_name', user.last_name)

        # Sprawdzenie unikalności emaila po zmianie (jeśli email został zmieniony)
        existing_user = User.query.filter(User.email == user.email, User.id != id).first()
        if existing_user:
            db.session.rollback() # Cofnij zmiany przed commitem
            return jsonify({"error": f"Email '{user.email}' already exists for another user."}), 409

        # Zapis zmian
        db.session.commit()
        return jsonify({"message": "User updated", "user": user.to_dict()})

    @staticmethod
    def delete_user(id):
        """Logika usuwania użytkownika."""
        user = db.get_or_404(User, id)
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "User deleted"})