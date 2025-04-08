from flask import Flask
from .extensions import db, login_manager, cors

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')
    
    # Initialize extensions
    db.init_app(app)
    cors.init_app(app)
    login_manager.init_app(app)
    
    # Register blueprints
    from .routes import api_blueprint
    from .github.webhooks import github_blueprint
    app.register_blueprint(api_blueprint)
    app.register_blueprint(github_blueprint)
    
    # Create tables
    with app.app_context():
        db.create_all()
    
    return app