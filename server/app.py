import os
from dotenv import load_dotenv
from flask import Flask
from extensions import db, jwt, migrate
from flask_cors import CORS

load_dotenv()

def configure_app(app):
    """Configure application settings."""
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
    
    if not app.config["JWT_SECRET_KEY"]:
        raise ValueError("No JWT_SECRET_KEY set! Check your .env file.")
    
    basedir = os.path.abspath(os.path.dirname(__file__))
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(basedir, "faceVerse.db")}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    upload_folder = os.path.join(basedir, 'uploads')
    os.makedirs(upload_folder, exist_ok=True)
    app.config['UPLOAD_FOLDER'] = upload_folder


def configure_cors(app):
    """Configure CORS settings."""
    CORS(
        app,
        origins="*",
        allow_headers=["Content-Type", "Authorization"],
        supports_credentials=True
    )


def register_extensions(app):
    """Register Flask extensions."""
    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)


def register_blueprints(app):
    """Register Flask blueprints."""
    from controllers.authController import auth_bp
    from controllers.userController import users_bp
    from controllers.postController import posts_bp
    from controllers.uploadController import uploads_bp
    
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(users_bp, url_prefix='/users')
    app.register_blueprint(posts_bp, url_prefix='/posts')
    app.register_blueprint(uploads_bp, url_prefix='/uploads')


def create_app():
    """Application factory function."""
    app = Flask(__name__)
    
    configure_app(app)
    configure_cors(app)
    register_extensions(app)
    register_blueprints(app)
    
    return app


def init_database(app):
    """Initialize database tables."""
    with app.app_context():
        db.create_all()
        print("Database tables created (if they didn't exist). Using faceVerse.db")

if __name__ == '__main__':
    app = create_app()
    init_database(app)
    
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True
    )
