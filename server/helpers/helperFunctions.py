from flask import url_for, jsonify
from flask_jwt_extended import get_jwt_identity
from datetime import datetime, timezone, timedelta


def generate_file_url(filename):
    if not filename:
        return None
    return url_for('uploads.serve_file', filename=filename, _external=True)

def get_current_user_id():
    return int(get_jwt_identity())


def validate_content(data, field='content'):
    content = data.get(field) if data else None
    if not content or not content.strip():
        return None, (jsonify({"error": f"{field.capitalize()} cannot be empty"}), 400)
    return content, None


def handle_db_error(error_msg, exception):
    print(f"{error_msg}: {exception}")
    return jsonify({"error": "Internal server error"}), 500


def parse_date(date_string, format='%Y-%m-%d'):
    from datetime import datetime
    try:
        return datetime.strptime(date_string, format).date(), None
    except ValueError:
        return None, (jsonify({"error": f"Wrong date format. Use {format}."}), 400)
    
def get_cet_now():
    """Get current time in CET (UTC+01:00)."""
    utc_now = datetime.now(timezone.utc)
    cet = timezone(timedelta(hours=1))
    return utc_now.astimezone(cet)
