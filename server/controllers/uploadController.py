from flask import Blueprint, request, send_from_directory, current_app, jsonify
from flask_jwt_extended import get_jwt_identity, verify_jwt_in_request
from services.uploadService import UploadService 
from werkzeug.exceptions import NotFound
from typing import Literal

uploads_bp = Blueprint('uploads', __name__)

@uploads_bp.route('/<string:filename>')
def serve_file(filename):
    return send_from_directory(current_app.config['UPLOAD_FOLDER'], filename)


def handle_upload_request(file_key: Literal['avatar', 'cover']):
    if request.method == 'OPTIONS':
        return jsonify({"message": "OPTIONS request allowed"}), 200

    if request.method == 'POST':
        try:
            verify_jwt_in_request() 
            user_id_string = get_jwt_identity()
            user_id = int(user_id_string)
            
            user_data = UploadService.process_upload(user_id, file_key)

            return jsonify(user_data), 200
            
        except NotFound:
            return jsonify({"error": "Użytkownik nie znaleziony"}), 404
        except ValueError as e:
            return jsonify({"error": str(e)}), 400
        except Exception as e:
            return jsonify({"error": f"Wystąpił błąd: {str(e)}"}), 500


@uploads_bp.route('/avatar', methods=['POST', 'OPTIONS'], strict_slashes=False)
def upload_avatar():
    return handle_upload_request(file_key='avatar')


@uploads_bp.route('/cover', methods=['POST', 'OPTIONS'], strict_slashes=False)
def upload_cover():
    return handle_upload_request(file_key='cover')