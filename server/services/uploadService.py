import os
import uuid
from flask import current_app, request
from werkzeug.utils import secure_filename
from models.user import User
from extensions import db
from typing import Literal

class UploadService:
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
    ALLOWED_MIMETYPES = {'image/png', 'image/jpeg', 'image/gif'}

    @staticmethod
    def allowed_file(filename, mimetype):
        is_allowed_by_extension = '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in UploadService.ALLOWED_EXTENSIONS
        is_allowed_by_mimetype = mimetype in UploadService.ALLOWED_MIMETYPES
        
        if filename == '' and is_allowed_by_mimetype:
            return True
            
        return is_allowed_by_extension or is_allowed_by_mimetype

    @staticmethod
    def process_upload(user_id: int, file_key: Literal['avatar', 'cover']):
        user = db.get_or_404(User, user_id)
        
        if file_key not in request.files:
            raise ValueError(f"No file in the request (Expecteed '{file_key}')")
        
        file = request.files[file_key]

        if file.filename == '':
            raise ValueError("File not selected")

        if not UploadService.allowed_file(file.filename, file.mimetype):
            raise ValueError("Wrong file tyope")
        
        safe_filename = secure_filename(file.filename)
        extension = os.path.splitext(safe_filename)[1]

        if not extension and file.mimetype in UploadService.ALLOWED_MIMETYPES:
            extension = f".{file.mimetype.split('/')[1]}"

        unique_filename = f"{uuid.uuid4().hex}{extension}"
        file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], unique_filename)
        
        file.save(file_path)

        if file_key == 'avatar':
            user.avatar_filename = unique_filename
        elif file_key == 'cover':
            user.cover_filename = unique_filename
        
        db.session.commit()
        
        return user.to_dict()