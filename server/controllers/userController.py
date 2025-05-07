from flask import Blueprint, request
from services.userService import UserService

users_bp = Blueprint('users', __name__)

# --- Blueprint routes ---

@users_bp.route('/', methods=['POST'])
def create_user():
    """Trasa do tworzenia nowego użytkownika."""
    data = request.get_json()
    return UserService.create_user(data)

@users_bp.route('/', methods=['GET'])
def get_users():
    """Trasa do pobierania listy wszystkich użytkowników."""
    return UserService.get_users()

@users_bp.route('/<int:id>', methods=['GET'])
def get_user(id):
    """Trasa do pobierania pojedynczego użytkownika po ID."""
    return UserService.get_user(id)

@users_bp.route('/<int:id>', methods=['PUT'])
def update_user(id):
    """Trasa do aktualizacji istniejącego użytkownika."""
    data = request.get_json()
    return UserService.update_user(id, data)

@users_bp.route('/login', methods=['POST']) # New route for login
def login_user():
    """Trasa do logowania użytkownika."""
    data = request.get_json()
    return UserService.login_user(data) # Call the new service method
