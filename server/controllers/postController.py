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
    
    # --- 1. DETERMINE DATA SOURCE ---
    # We use request.files to reliably detect a multipart request.
    if uploaded_file:
        print(f"[DEBUG] 'uploaded_file' FOUND: {uploaded_file.filename}. Using request.form.") # DEBUG
        # Source 1: Multipart/FormData (File is present). Data is in request.form (ImmutableMultiDict).
        data_source = request.form
    else:
        print("[DEBUG] 'uploaded_file' is None. Attempting request.get_json().") # DEBUG
        # Source 2: Application/JSON (Text-only post).
        # Use silent=True to handle cases where the body is empty without crashing.
        data_source = request.get_json(silent=True) 

    # --- 2. VALIDATION ---
    print(f"[DEBUG] Data source detected: {data_source}") # DEBUG
    
    # If the client sent a file, the text content must be in the form data.
    if uploaded_file:
        if not data_source or 'content' not in data_source:
             print("[DEBUG] ERROR: File uploaded, but 'content' field missing from request.form.") # DEBUG
             return jsonify({"error": "Content field missing in file upload form data."}), 400
             
    # If the client sent a text-only post, data_source must be a dict with content.
    elif data_source is None:
        print("[DEBUG] ERROR: No file uploaded, and data_source is None (Missing/invalid JSON).") # DEBUG
        return jsonify({"error": "Missing JSON body or content in request."}), 400
    elif 'content' not in data_source:
         print("[DEBUG] ERROR: No file uploaded, JSON is valid, but 'content' key is missing.") # DEBUG
         return jsonify({"error": "Missing JSON body or content in request."}), 400


    # --- 3. FINAL CONTENT CHECK ---
    content = data_source.get('content')
    print(f"[DEBUG] Extracted content: '{content}'") # DEBUG
    
    if not content or content.strip() == "":
        print("[DEBUG] ERROR: Content is None or empty string.") # DEBUG
        return jsonify({"error": "Content is required"}), 400
        
    # --- 4. CALL SERVICE ---
    print(f"[DEBUG] Calling PostService.create_post with file: {uploaded_file.filename if uploaded_file else 'None'}") # DEBUG
    return PostService.create_post({'content': content}, user_id, uploaded_file)

@posts_bp.route('/', methods=['GET'], strict_slashes=False)
@jwt_required()
def get_posts():
    return PostService.get_posts()

@posts_bp.route('/user/<int:user_id>', methods=['GET'])
@jwt_required()
def get_posts_by_user(user_id):
    return jsonify(PostService.get_posts_by_user_id(user_id)), 200