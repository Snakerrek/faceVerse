from flask import Blueprint, request, jsonify
from services.postService import PostService
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.datastructures import FileStorage

posts_bp = Blueprint('posts', __name__)

@posts_bp.route('/', methods=['POST'], strict_slashes=False)
@jwt_required()
def create_post():
    user_id_string = get_jwt_identity()
    user_id = int(user_id_string)
    
    uploaded_file: FileStorage | None = request.files.get('image')
    data_source = None
    
    if uploaded_file:
        data_source = request.form
    else:
        data_source = request.get_json(silent=True) 
    
    if uploaded_file:
        if not data_source or 'content' not in data_source:
             return jsonify({"error": "Content field missing in file upload form data."}), 400
             
    elif data_source is None:
        return jsonify({"error": "Missing JSON body or content in request."}), 400
    elif 'content' not in data_source:
         return jsonify({"error": "Missing JSON body or content in request."}), 400


    content = data_source.get('content')
    
    if not content or content.strip() == "":
        return jsonify({"error": "Content is required"}), 400
        
    return PostService.create_post({'content': content}, user_id, uploaded_file)

@posts_bp.route('/', methods=['GET'], strict_slashes=False)
@jwt_required()
def get_posts():
    current_user_id = int(get_jwt_identity())
    return PostService.get_posts(current_user_id=current_user_id)

@posts_bp.route('/user/<int:user_id>', methods=['GET'])
@jwt_required()
def get_posts_by_user(user_id):
    current_user_id = int(get_jwt_identity())
    return jsonify(PostService.get_posts_by_user_id(user_id, current_user_id=current_user_id)), 200

@posts_bp.route('/<int:post_id>/like', methods=['POST'])
@jwt_required()
def like_post(post_id):
    user_id = int(get_jwt_identity())
    return PostService.like_post(post_id, user_id)

@posts_bp.route('/<int:post_id>/likes', methods=['GET'])
@jwt_required()
def get_post_likers(post_id):
    """New endpoint to get the list of users who liked a post."""
    return PostService.get_post_likers(post_id)

@posts_bp.route('/<int:post_id>/comment', methods=['POST'])
@jwt_required()
def create_comment(post_id):
    """Creates a new comment on a specific post."""
    user_id = int(get_jwt_identity())
    data = request.get_json()
    
    if not data or 'content' not in data:
        return jsonify({"error": "Missing 'content' in JSON body"}), 400
        
    return PostService.create_comment(post_id, user_id, data)

@posts_bp.route('/<int:post_id>/comments', methods=['GET'])
@jwt_required()
def get_comments(post_id):
    """Fetches all comments for a specific post."""
    current_user_id = int(get_jwt_identity())
    return PostService.get_comments_for_post(post_id, current_user_id)

@posts_bp.route('/comments/<int:comment_id>/like', methods=['POST'])
@jwt_required()
def like_comment(comment_id):
    """Toggles a like on a specific comment."""
    user_id = int(get_jwt_identity())
    return PostService.like_comment(comment_id, user_id)

@posts_bp.route('/comments/<int:comment_id>/likes', methods=['GET'])
@jwt_required()
def get_comment_likers(comment_id):
    """Fetches a list of users who liked a specific comment."""
    return PostService.get_comment_likers(comment_id)

