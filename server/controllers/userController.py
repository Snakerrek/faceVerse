from flask import Blueprint, request
from services.userService import UserService
from flask_jwt_extended import jwt_required

users_bp = Blueprint('users', __name__)


@users_bp.route('/', methods=['GET'], strict_slashes=False)
@jwt_required()
def get_users():
    return UserService.get_users()


@users_bp.route('/search', methods=['GET'])
@jwt_required()
def search_users():
    return UserService.search_users(request.args.get('q', ''))


@users_bp.route('/<int:id>', methods=['GET'], strict_slashes=False)
@jwt_required()
def get_user(id):
    return UserService.get_user(id)


@users_bp.route('/<int:id>', methods=['PUT'], strict_slashes=False)
@jwt_required()
def update_user(id):
    return UserService.update_user(id, request.get_json())
