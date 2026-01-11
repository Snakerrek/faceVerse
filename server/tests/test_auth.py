import pytest
from app import create_app
from extensions import db
from models.user import User

@pytest.fixture
def client():
    # SETUP: Initialize application and clean database
    app = create_app()
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    
    with app.app_context():
        db.drop_all()   # Ensure base is empty before starting
        db.create_all()
        
        # Create a test user
        user = User(email="test@example.com", first_name="Jan", last_name="Kowalski")
        user.set_password("TajneHaslo123")
        db.session.add(user)
        db.session.commit()
    
    # Provide the test client to the tests
    with app.test_client() as client:
        yield client # Testing happens here
        
    # TEARDOWN: Clean up after each test
    with app.app_context():
        db.session.remove()
        db.drop_all()

def test_login_success(client):
    """Test checks for successful login and JWT token return"""
    payload = {
        "email": "test@example.com",
        "password": "TajneHaslo123"
    }
    
    response = client.post('/auth/login', json=payload)
    data = response.get_json()

    assert response.status_code == 200
    assert "access_token" in data
    assert data["user"]["email"] == "test@example.com"

def test_login_invalid_password(client):
    """Test checks for rejection of an invalid password"""
    payload = {
        "email": "test@example.com",
        "password": "ZleHaslo"
    }
    
    response = client.post('/auth/login', json=payload)
    assert response.status_code == 401