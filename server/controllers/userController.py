from flask import Blueprint, request
from services.userService import UserService
from flask_jwt_extended import jwt_required

users_bp = Blueprint('users', __name__)

@users_bp.route('/search', methods=['GET'])
@jwt_required()
def search_users():
    return UserService.search_users(request.args.get('q', ''))


@users_bp.route('/<int:id>', methods=['GET'])
@jwt_required()
def get_user(id):
    return UserService.get_user(id)
