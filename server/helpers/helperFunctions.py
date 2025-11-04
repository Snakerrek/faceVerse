from flask import url_for


def generate_file_url(filename):
    if not filename:
        return None
    return url_for('uploads.serve_file', filename=filename, _external=True)
