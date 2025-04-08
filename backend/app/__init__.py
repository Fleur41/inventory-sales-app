from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    CORS(app)
    
    app.config.from_pyfile('../config.py')
    
    db.init_app(app)
    
    from .routes import api_blueprint
    app.register_blueprint(api_blueprint)
    
    from .github.webhooks import github_blueprint
    app.register_blueprint(github_blueprint)
    
    return app