from flask import Blueprint, request
from services.authService import AuthService

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/register', methods=['POST'], strict_slashes=False)
def register():
    return AuthService.register(request.get_json())


@auth_bp.route('/login', methods=['POST'], strict_slashes=False)
def login():
    return AuthService.login(request.get_json())
