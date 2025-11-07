from flask import Blueprint, send_from_directory, current_app, jsonify
from flask_jwt_extended import verify_jwt_in_request
from services.uploadService import UploadService
from werkzeug.exceptions import NotFound
from typing import Literal
from helpers.helperFunctions import get_current_user_id

uploads_bp = Blueprint('uploads', __name__)


@uploads_bp.route('/<path:filename>')
def serve_file(filename):
    return send_from_directory(current_app.config['UPLOAD_FOLDER'], filename)


def handle_upload_request(file_key: Literal['avatar', 'cover']):
    try:
        verify_jwt_in_request()
        user_id = get_current_user_id()
        user_data = UploadService.process_upload(user_id, file_key)
        return jsonify(user_data), 200
    except NotFound:
        return jsonify({"error": "User not found"}), 404
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


@uploads_bp.route('/avatar', methods=['POST'])
def upload_avatar():
    return handle_upload_request(file_key='avatar')


@uploads_bp.route('/cover', methods=['POST'])
def upload_cover():
    return handle_upload_request(file_key='cover')
