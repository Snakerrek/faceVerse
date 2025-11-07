import os
import uuid
from flask import current_app, request, jsonify
from werkzeug.utils import secure_filename
from models.user import User
from extensions import db
from helpers.helperFunctions import service_handler
from typing import Literal


class UploadService:
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
    ALLOWED_MIMETYPES = {'image/png', 'image/jpeg', 'image/gif'}
    
    @staticmethod
    def _is_allowed_extension(filename):
        """Check if file extension is allowed."""
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in UploadService.ALLOWED_EXTENSIONS
    
    @staticmethod
    def _is_allowed_mimetype(mimetype):
        """Check if MIME type is allowed."""
        return mimetype in UploadService.ALLOWED_MIMETYPES
    
    @staticmethod
    def allowed_file(filename, mimetype):
        """Validate file is allowed by extension or MIME type."""
        if filename == '' and UploadService._is_allowed_mimetype(mimetype):
            return True
        return UploadService._is_allowed_extension(filename) or UploadService._is_allowed_mimetype(mimetype)
    
    @staticmethod
    def _get_file_extension(filename, mimetype):
        """Extract or derive file extension."""
        safe_filename = secure_filename(filename)
        extension = os.path.splitext(safe_filename)[1]
        
        if not extension and mimetype in UploadService.ALLOWED_MIMETYPES:
            extension = f".{mimetype.split('/')[1]}"
        
        return extension
    
    @staticmethod
    def save_file(file_storage):
        """Save uploaded file and return unique filename."""
        if not file_storage or file_storage.filename == '':
            return None
        
        if not UploadService.allowed_file(file_storage.filename, file_storage.mimetype):
            raise ValueError("Wrong file type")
        
        extension = UploadService._get_file_extension(file_storage.filename, file_storage.mimetype)
        unique_filename = f"{uuid.uuid4().hex}{extension}"
        file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], unique_filename)
        file_storage.save(file_path)
        
        return unique_filename
    
    @staticmethod
    @service_handler()
    def process_upload(user_id: int, file_key: Literal['avatar', 'cover']):
        """Process user avatar/cover upload."""
        user = db.get_or_404(User, user_id)
        if file_key not in request.files:
            raise ValueError(f"File is missing in the request (Expected '{file_key}')")
        
        unique_filename = UploadService.save_file(request.files[file_key])
        if not unique_filename:
            raise ValueError("No file chosen")
        
        setattr(user, f'{file_key}_filename', unique_filename)
        db.session.commit()
        
        return user.to_dict()