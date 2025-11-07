from flask import Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.notificationService import NotificationService

notification_bp = Blueprint('notification', __name__)

@notification_bp.route('/', methods=['GET'], strict_slashes=False)
@jwt_required()
def get_notifications():
    """Get all notifications."""
    current_user_id = int(get_jwt_identity())
    return NotificationService.get_notifications(current_user_id)

@notification_bp.route('/unread-count', methods=['GET'], strict_slashes=False)
@jwt_required()
def get_unread_count():
    """Get unread notification count."""
    current_user_id = int(get_jwt_identity())
    return NotificationService.get_unread_count(current_user_id)

@notification_bp.route('/<int:notification_id>/read', methods=['POST'], strict_slashes=False)
@jwt_required()
def mark_as_read(notification_id):
    print('henlo')
    """Mark notification as read."""
    current_user_id = int(get_jwt_identity())
    return NotificationService.mark_as_read(notification_id, current_user_id)

@notification_bp.route('/mark-all-read', methods=['POST'], strict_slashes=False)
@jwt_required()
def mark_all_as_read():
    """Mark all notifications as read."""
    current_user_id = int(get_jwt_identity())
    return NotificationService.mark_all_as_read(current_user_id)
