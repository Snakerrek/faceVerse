import os
import uuid
from flask import current_app, request
from werkzeug.utils import secure_filename
from models.user import User
from extensions import db
from typing import Literal
from werkzeug.exceptions import NotFound

class UploadService:
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
    ALLOWED_MIMETYPES = {'image/png', 'image/jpeg', 'image/gif'}

    @staticmethod
    def allowed_file(filename, mimetype):
        """Checks if the file is valid by filename extension OR MIME type."""
        is_allowed_by_extension = '.' in filename and \
                                  filename.rsplit('.', 1)[1].lower() in UploadService.ALLOWED_EXTENSIONS
        is_allowed_by_mimetype = mimetype in UploadService.ALLOWED_MIMETYPES
        
        if filename == '' and is_allowed_by_mimetype:
            return True
            
        return is_allowed_by_extension or is_allowed_by_mimetype

    @staticmethod
    def save_file(file_storage):
        if not file_storage or file_storage.filename == '':
            return None

        if not UploadService.allowed_file(file_storage.filename, file_storage.mimetype):
            raise ValueError("Wrong file type")

        safe_filename = secure_filename(file_storage.filename)
        extension = os.path.splitext(safe_filename)[1]

        if not extension and file_storage.mimetype in UploadService.ALLOWED_MIMETYPES:
            extension = f".{file_storage.mimetype.split('/')[1]}"

        unique_filename = f"{uuid.uuid4().hex}{extension}"
        
        file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], unique_filename)
        file_storage.save(file_path)
        
        return unique_filename

    @staticmethod
    def process_upload(user_id: int, file_key: Literal['avatar', 'cover']):
        user = db.get_or_404(User, user_id) 
        
        if file_key not in request.files:
            raise ValueError(f"File is missing in the request (Expected '{file_key}')")
        
        file = request.files[file_key]
        
        unique_filename = UploadService.save_file(file)

        if not unique_filename:
             raise ValueError("No file choosen")

        if file_key == 'avatar':
            user.avatar_filename = unique_filename
        elif file_key == 'cover':
            user.cover_filename = unique_filename
        
        db.session.commit()
        return user.to_dict()