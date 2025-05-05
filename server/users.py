# users.py
from flask import Blueprint, request, jsonify
# Importuj 'db' z pliku extensions.py
from extensions import db

# Definicja modelu User z wymaganymi polami [2]
class User(db.Model):
    # Jawne określenie nazwy tabeli na 'users' [2]
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    # Pole email: unikalne, nie może być puste
    email = db.Column(db.String(120), unique=True, nullable=False)
    # Pole password: nie może być puste (Uwaga: Przechowywanie jako plain text jest niebezpieczne!)
    password = db.Column(db.String(128), nullable=False)
    # Pole first_name: nie może być puste
    first_name = db.Column(db.String(80), nullable=False)
    # Pole last_name: nie może być puste
    last_name = db.Column(db.String(80), nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    # Metoda konwertująca obiekt User na słownik (bez hasła!) [2]
    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name
            # Celowo pomijamy pole 'password' w odpowiedziach API
        }

# Utworzenie obiektu Blueprint dla użytkowników
users_bp = Blueprint('users', __name__)

# --- Definicje tras dla Blueprint ---

# Create (Tworzenie nowego użytkownika) [2]
@users_bp.route('/', methods=['POST'])
def create_user():
    data = request.get_json()
    # Sprawdzenie, czy wszystkie wymagane pola są obecne
    if not data or not all(k in data for k in ('email', 'password', 'first_name', 'last_name')):
        return jsonify({"error": "Missing required user data (email, password, first_name, last_name)"}), 400

    # Sprawdzenie, czy użytkownik o podanym emailu już istnieje
    if User.query.filter_by(email=data['email']).first(): # Użycie User.query dla prostoty w tym przypadku
        return jsonify({"error": "Email already exists"}), 400

    # Utworzenie nowego użytkownika (Uwaga: hasło zapisywane jako plain text!)
    new_user = User(
        email=data['email'],
        password=data['password'], # W realnej aplikacji hasło powinno być hashowane przed zapisem!
        first_name=data['first_name'],
        last_name=data['last_name']
    )
    db.session.add(new_user)
    db.session.commit()
    # Zwrócenie danych użytkownika (bez hasła) używając metody to_dict()
    return jsonify({"message": "User created", "user": new_user.to_dict()}), 201

# Read (Odczyt wszystkich użytkowników) [2]
@users_bp.route('/', methods=['GET'])
def get_users():
    # Pobranie wszystkich użytkowników
    users = db.session.execute(db.select(User)).scalars().all()
    # Zwrócenie listy użytkowników (bez haseł)
    return jsonify([user.to_dict() for user in users])

# Read (Odczyt pojedynczego użytkownika po ID) [2]
@users_bp.route('/<int:id>', methods=['GET'])
def get_user(id):
    # Pobranie użytkownika lub zwrócenie błędu 404
    user = db.get_or_404(User, id)
    # Zwrócenie danych użytkownika (bez hasła)
    return jsonify(user.to_dict())

# Update (Aktualizacja istniejącego użytkownika) [2]
@users_bp.route('/<int:id>', methods=['PUT'])
def update_user(id):
    user = db.get_or_404(User, id)
    data = request.get_json()
    if not data:
        return jsonify({"error": "Missing data"}), 400

    # Aktualizacja pól, jeśli zostały podane w żądaniu
    user.email = data.get('email', user.email)
    # Pozwolenie na aktualizację hasła (w realnej aplikacji wymagałoby to hashowania)
    user.password = data.get('password', user.password)
    user.first_name = data.get('first_name', user.first_name)
    user.last_name = data.get('last_name', user.last_name)

    # Sprawdzenie unikalności emaila po potencjalnej zmianie (jeśli email się zmienił)
    # To jest uproszczona logika, można dodać bardziej złożoną weryfikację
    existing_user = User.query.filter(User.email == user.email, User.id != id).first()
    if existing_user:
        db.session.rollback() # Cofnij zmiany, jeśli email jest zajęty
        return jsonify({"error": f"Email '{user.email}' already exists for another user."}), 409 # 409 Conflict

    db.session.commit()
    # Zwrócenie zaktualizowanych danych użytkownika (bez hasła)
    return jsonify({"message": "User updated", "user": user.to_dict()})

# Delete (Usunięcie użytkownika) [2]
@users_bp.route('/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = db.get_or_404(User, id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted"})

