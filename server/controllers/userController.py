from flask import Blueprint, request, jsonify
from services.userService import UserService
from flask_jwt_extended import jwt_required, get_jwt_identity

users_bp = Blueprint('users', __name__)

@users_bp.route('/search', methods=['GET'])
@jwt_required()
def search_users():
    return UserService.search_users(request.args.get('q', ''))


@users_bp.route('/<int:id>', methods=['GET'])
@jwt_required()
def get_user(id):
    return UserService.get_user(id)

@users_bp.route('/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_profile(user_id):
    """Update user profile."""
    
    current_user_id = int(get_jwt_identity())
    if current_user_id != user_id:
        return jsonify({"error": "Unauthorized"}), 403
    
    return UserService.update_profile(user_id, request.json)

