# app.py
import os
from flask import Flask
# Importuj 'db' z pliku extensions.py
from extensions import db

def create_app():
    """Fabryka aplikacji Flask."""
    app = Flask(__name__)

    # Konfiguracja bazy danych SQLite z nową nazwą faceVerse.db [1]
    basedir = os.path.abspath(os.path.dirname(__file__))
    # Zmiana nazwy pliku bazy danych na 'faceVerse.db'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'faceVerse.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Powiązanie zaimportowanej instancji 'db' z aplikacją Flask
    db.init_app(app)

    # Import i rejestracja Blueprint z users.py
    from users import users_bp
    # Rejestrujemy Blueprint, dodając prefiks '/users' do wszystkich jego tras
    app.register_blueprint(users_bp, url_prefix='/users') # Ustawienie prefiksu na /users [1]

    return app

# Główny blok wykonania
if __name__ == '__main__':
    app = create_app()

    # Utworzenie tabel (w tym tabeli 'users') w bazie danych w kontekście aplikacji
    with app.app_context():
        # Upewnij się, że model User z users.py jest zaimportowany przed create_all()
        # Jest to zapewnione przez import users_bp powyżej
        db.create_all() # Stworzy tabelę 'users' zdefiniowaną w users.py [1]
        print("Database tables created (if they didn't exist). Using faceVerse.db")

    # Uruchomienie serwera Flask
    app.run(debug=True)

