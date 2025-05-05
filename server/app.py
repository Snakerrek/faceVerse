import os
from flask import Flask
from extensions import db

def create_app():
    """Fabryka aplikacji Flask."""
    app = Flask(__name__)

    # Konfiguracja bazy danych SQLite z nazwą faceVerse.db
    basedir = os.path.abspath(os.path.dirname(__file__))
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'faceVerse.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Powiązanie zaimportowanej instancji 'db' z aplikacją Flask
    db.init_app(app)

    # Import i rejestracja Blueprint z users.py
    from controllers.userController import users_bp
    # Rejestrujemy Blueprint, dodając prefiks '/users' do wszystkich jego tras
    app.register_blueprint(users_bp, url_prefix='/users') # Ustawienie prefiksu na /users

    return app

# Główny blok wykonania
if __name__ == '__main__':
    app = create_app()

    # Utworzenie tabel (w tym tabeli 'users') w bazie danych w kontekście aplikacji
    with app.app_context():
        db.create_all() # Stworzy tabelę 'users' zdefiniowaną w users.py
        print("Database tables created (if they didn't exist). Using faceVerse.db")

    # Uruchomienie serwera Flask
    app.run(debug=True)

