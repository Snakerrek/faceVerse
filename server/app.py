import os
from dotenv import load_dotenv
from flask import Flask
from extensions import db, jwt, migrate
from flask_cors import CORS
from models.user import User
from models.post import Post 

load_dotenv()

def create_app():
    app = Flask(__name__)

    CORS(app, 
         origins="*", 
         allow_headers=["Content-Type", "Authorization"], 
         supports_credentials=True
    )

    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")

    if not app.config["JWT_SECRET_KEY"]:
        raise ValueError("No JWT_SECRET_KEY set! Check your .env file.")
    
    UPLOAD_FOLDER = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'uploads')
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

    basedir = os.path.abspath(os.path.dirname(__file__))
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'faceVerse.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)
    from controllers.userController import users_bp
    from controllers.postController import posts_bp
    from controllers.uploadController import uploads_bp
    app.register_blueprint(users_bp, url_prefix='/users') 
    app.register_blueprint(posts_bp, url_prefix='/posts')
    app.register_blueprint(uploads_bp, url_prefix='/uploads')

    return app

if __name__ == '__main__':
    app = create_app()

    with app.app_context():
        db.create_all()
        print("Database tables created (if they didn't exist). Using faceVerse.db")

    app.run(host='0.0.0.0', debug=True, port=5000)
