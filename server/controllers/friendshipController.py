from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.friendshipService import FriendshipService


friendship_bp = Blueprint('friendship', __name__)


@friendship_bp.route('/request', methods=['POST'])
@jwt_required()
def send_request():
    """Send friend request."""
    current_user_id = int(get_jwt_identity())
    data = request.get_json()
    addressee_id = data.get('addressee_id')
    
    return FriendshipService.send_friend_request(current_user_id, addressee_id)


@friendship_bp.route('/accept', methods=['POST'])
@jwt_required()
def accept_request():
    """Accept friend request."""
    current_user_id = int(get_jwt_identity())
    data = request.get_json()
    requester_id = data.get('requester_id')
    
    return FriendshipService.accept_friend_request(current_user_id, requester_id)


@friendship_bp.route('/status/<int:user_id>', methods=['GET'])
@jwt_required()
def get_status(user_id):
    """Get friendship status with another user."""
    current_user_id = int(get_jwt_identity())
    
    return FriendshipService.get_friendship_status(current_user_id, user_id)


@friendship_bp.route('/list', methods=['GET'])
@jwt_required()
def get_friends():
    """Get friends list for a specific user (or current user if not specified)."""
    current_user_id = int(get_jwt_identity())
    user_id = request.args.get('user_id', type=int, default=current_user_id)
    
    return FriendshipService.get_friends_list(user_id)


@friendship_bp.route('/<int:friend_id>', methods=['DELETE'])
@jwt_required()
def remove_friend(friend_id):
    """Remove a friend."""
    current_user_id = int(get_jwt_identity())
    
    return FriendshipService.remove_friend(current_user_id, friend_id)
