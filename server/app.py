import os
from flask import Flask
from extensions import db, jwt
from flask_cors import CORS
from models.user import User
from models.post import Post 
from dotenv import load_dotenv

load_dotenv()

def create_app():
    # Flask application factory.
    app = Flask(__name__)

    # --- THIS IS THE FIX ---
    # Explicitly allow the Authorization header for JWT
    CORS(app, 
         origins="*", 
         allow_headers=["Content-Type", "Authorization"], 
         supports_credentials=True
    )
    # ------------------------

    # --- JWT Configuration --- [1]
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")

    print(f"--- Loaded JWT Key: {app.config['JWT_SECRET_KEY']} ---")

    if not app.config["JWT_SECRET_KEY"]:
        raise ValueError("No JWT_SECRET_KEY set! Check your .env file.")

    # Configure SQLite database...
    basedir = os.path.abspath(os.path.dirname(__file__))
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'faceVerse.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Associate extensions
    db.init_app(app)
    jwt.init_app(app)

    # Import and register Blueprints
    from controllers.userController import users_bp
    from controllers.postController import posts_bp
    app.register_blueprint(users_bp, url_prefix='/users') 
    app.register_blueprint(posts_bp, url_prefix='/posts') 

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
