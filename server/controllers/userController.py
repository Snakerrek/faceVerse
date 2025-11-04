from flask import Blueprint, request
from services.userService import UserService
from flask_jwt_extended import jwt_required

users_bp = Blueprint('users', __name__)

@users_bp.route('/', methods=['POST'], strict_slashes=False)
def create_user():
    data = request.get_json()
    return UserService.create_user(data)

@users_bp.route('/', methods=['GET'], strict_slashes=False)
@jwt_required()
def get_users():
    return UserService.get_users()

@users_bp.route('/search', methods=['GET'])
@jwt_required()
def search_users():
    query = request.args.get('q', '') 
    return UserService.search_users(query)

@users_bp.route('/<int:id>', methods=['GET'], strict_slashes=False)
@jwt_required()
def get_user(id):
    return UserService.get_user(id)

@users_bp.route('/<int:id>', methods=['PUT'], strict_slashes=False)
@jwt_required()
def update_user(id):
    data = request.get_json()
    return UserService.update_user(id, data)

@users_bp.route('/login', methods=['POST'], strict_slashes=False)
def login_user():
    data = request.get_json()
    return UserService.login_user(data)
