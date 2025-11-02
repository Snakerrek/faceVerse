import os
from flask import Flask
from extensions import db, jwt
from flask_cors import CORS
import secrets
from models.user import User
from models.post import Post 

def create_app():
    # Flask application factory.
    app = Flask(__name__)
    CORS(app)

    # --- JWT Configuration --- [1]
    app.config["JWT_SECRET_KEY"] = secrets.token_hex(32)

    # Configure SQLite database with the name faceVerse.db
    basedir = os.path.abspath(os.path.dirname(__file__))
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'faceVerse.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Associate the imported 'db' instance with the Flask application
    db.init_app(app)
    jwt.init_app(app)

    # Import and register Blueprint from userController.py (previously users.py)
    from controllers.userController import users_bp
    from controllers.postController import posts_bp
    # Register the Blueprint, adding the '/users' prefix to all its routes
    app.register_blueprint(users_bp, url_prefix='/users') # Set prefix to /users
    app.register_blueprint(posts_bp, url_prefix='/posts') # Set prefix to /users

    return app

# Main execution block
if __name__ == '__main__':
    app = create_app()

    # Create tables (including the 'users' table) in the database within the application context
    with app.app_context():
        db.create_all() # Will create the 'users' table defined in the User model
        print("Database tables created (if they didn't exist). Using faceVerse.db")

    # Run the Flask server
    app.run(host='0.0.0.0', debug=True, port=5000)
