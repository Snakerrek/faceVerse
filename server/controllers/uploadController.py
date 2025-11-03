import os
import uuid
from flask import Blueprint, request, send_from_directory, current_app, jsonify
from flask_jwt_extended import get_jwt_identity, verify_jwt_in_request
from werkzeug.utils import secure_filename
from models.user import User
from extensions import db

uploads_bp = Blueprint('uploads', __name__)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
ALLOWED_MIMETYPES = {'image/png', 'image/jpeg', 'image/gif'}

def allowed_file_by_filename(filename):
    """Checks file by its filename extension."""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@uploads_bp.route('/<string:filename>')
def serve_file(filename):
    return send_from_directory(current_app.config['UPLOAD_FOLDER'], filename)


@uploads_bp.route('/avatar', methods=['POST', 'OPTIONS'], strict_slashes=False)
def upload_avatar():
    if request.method == 'OPTIONS':
        return jsonify({"message": "OPTIONS request allowed"}), 200

    if request.method == 'POST':
        try:
            verify_jwt_in_request() 
        except Exception as e:
            return jsonify({"error": f"Błąd autoryzacji: {str(e)}"}), 401

        try:
            user_id_string = get_jwt_identity()
            user = db.get_or_404(User, int(user_id_string))

            if 'avatar' not in request.files:
                return jsonify({"error": "Brak pliku w requeście"}), 400
            
            file = request.files['avatar']

            if file.filename == '':
                return jsonify({"error": "Nie wybrano pliku"}), 400

            if (file and 
                (allowed_file_by_filename(file.filename) or 
                 file.mimetype in ALLOWED_MIMETYPES)):
                
                safe_filename = secure_filename(file.filename)
                extension = os.path.splitext(safe_filename)[1]

                if not extension and file.mimetype in ALLOWED_MIMETYPES:
                    extension = f".{file.mimetype.split('/')[1]}"

                unique_filename = f"{uuid.uuid4().hex}{extension}"
                
                file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], unique_filename)
                file.save(file_path)

                user.avatar_filename = unique_filename
                db.session.commit()

                return jsonify(user.to_dict()), 200
            else:
                return jsonify({"error": "Niedozwolony typ pliku"}), 400
                
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": f"Wystąpił błąd: {str(e)}"}), 500