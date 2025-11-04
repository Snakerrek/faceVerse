from flask import Blueprint, request, jsonify
from services.postService import PostService
from flask_jwt_extended import jwt_required
from helpers.helperFunctions import get_current_user_id, validate_content

posts_bp = Blueprint('posts', __name__)


def _get_post_data():
    uploaded_file = request.files.get('image')
    data_source = request.form if uploaded_file else request.get_json(silent=True)
    return data_source, uploaded_file


@posts_bp.route('/', methods=['POST'], strict_slashes=False)
@jwt_required()
def create_post():
    data, uploaded_file = _get_post_data()
    content, error = validate_content(data)
    if error:
        return error
    
    user_id = get_current_user_id()
    return PostService.create_post({'content': content}, user_id, uploaded_file)


@posts_bp.route('/', methods=['GET'], strict_slashes=False)
@jwt_required()
def get_posts():
    return PostService.get_posts(current_user_id=get_current_user_id())


@posts_bp.route('/user/<int:user_id>', methods=['GET'])
@jwt_required()
def get_posts_by_user(user_id):
    posts = PostService.get_posts_by_user_id(user_id, current_user_id=get_current_user_id())
    return jsonify(posts), 200


@posts_bp.route('/<int:post_id>/like', methods=['POST'])
@jwt_required()
def like_post(post_id):
    return PostService.like_post(post_id, get_current_user_id())


@posts_bp.route('/<int:post_id>/likes', methods=['GET'])
@jwt_required()
def get_post_likers(post_id):
    return PostService.get_post_likers(post_id)


@posts_bp.route('/<int:post_id>/comment', methods=['POST'])
@jwt_required()
def create_comment(post_id):
    data = request.get_json()
    _, error = validate_content(data)
    if error:
        return error
    
    return PostService.create_comment(post_id, get_current_user_id(), data)


@posts_bp.route('/<int:post_id>/comments', methods=['GET'])
@jwt_required()
def get_comments(post_id):
    return PostService.get_comments_for_post(post_id, get_current_user_id())


@posts_bp.route('/comments/<int:comment_id>/like', methods=['POST'])
@jwt_required()
def like_comment(comment_id):
    return PostService.like_comment(comment_id, get_current_user_id())


@posts_bp.route('/comments/<int:comment_id>/likes', methods=['GET'])
@jwt_required()
def get_comment_likers(comment_id):
    return PostService.get_comment_likers(comment_id)
