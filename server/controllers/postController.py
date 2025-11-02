from flask import Blueprint, request
from services.postService import PostService
from flask_jwt_extended import jwt_required, get_jwt_identity

posts_bp = Blueprint('posts', __name__)

@posts_bp.route('/', methods=['POST'], strict_slashes=False)
@jwt_required() # Zabezpieczamy endpoint
def create_post():
    """Trasa do tworzenia nowego posta."""
    user_id = get_jwt_identity() # Pobieramy ID użytkownika z tokenu
    data = request.get_json()
    return PostService.create_post(data, user_id)

@posts_bp.route('/', methods=['GET'], strict_slashes=False)
@jwt_required() # Zabezpieczamy endpoint
def get_posts():
    """Trasa do pobierania wszystkich postów."""
    return PostService.get_posts()
