from flask import Blueprint, request
from services.postService import PostService
from flask_jwt_extended import jwt_required, get_jwt_identity

posts_bp = Blueprint('posts', __name__)

@posts_bp.route('/', methods=['POST'], strict_slashes=False)
@jwt_required()
def create_post():
    user_id = get_jwt_identity()
    data = request.get_json()
    return PostService.create_post(data, user_id)

@posts_bp.route('/', methods=['GET'], strict_slashes=False)
@jwt_required()
def get_posts():
    return PostService.get_posts()
