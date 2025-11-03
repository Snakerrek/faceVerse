import os
import uuid
from flask import Blueprint, request, jsonify
from services.postService import PostService
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
from werkzeug.datastructures import FileStorage

posts_bp = Blueprint('posts', __name__)

@posts_bp.route('/', methods=['POST'], strict_slashes=False)
@jwt_required()
def create_post():
    print("\n--- [DEBUG] create_post route hit ---") # DEBUG
    """Trasa do tworzenia nowego posta z opcjonalnym zdjęciem."""
    user_id_string = get_jwt_identity()
    user_id = int(user_id_string)
    print(f"[DEBUG] User ID: {user_id}") # DEBUG
    
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
         print("[DEBUG] ERROR: No file uploaded, JSON is valid, but 'content' key is missing.")
         return jsonify({"error": "Missing JSON body or content in request."}), 400


    content = data_source.get('content')
    print(f"[DEBUG] Extracted content: '{content}'")
    
    if not content or content.strip() == "":
        print("[DEBUG] ERROR: Content is None or empty string.")
        return jsonify({"error": "Content is required"}), 400
        
    print(f"[DEBUG] Calling PostService.create_post with file: {uploaded_file.filename if uploaded_file else 'None'}")
    return PostService.create_post({'content': content}, user_id, uploaded_file)

@posts_bp.route('/', methods=['GET'], strict_slashes=False)
@jwt_required()
def get_posts():
    return PostService.get_posts()

@posts_bp.route('/user/<int:user_id>', methods=['GET'])
@jwt_required()
def get_posts_by_user(user_id):
    return jsonify(PostService.get_posts_by_user_id(user_id)), 200