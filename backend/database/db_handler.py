from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import SQLAlchemyError

db = SQLAlchemy()

def init_db(app):
    db.init_app(app)
    with app.app_context():
        db.create_all()

def add_to_db(instance):
    try:
        db.session.add(instance)
        db.session.commit()
        return True
    except SQLAlchemyError as e:
        db.session.rollback()
        print(f"Database error: {str(e)}")
        return False

def delete_from_db(instance):
    try:
        db.session.delete(instance)
        db.session.commit()
        return True
    except SQLAlchemyError as e:
        db.session.rollback()
        print(f"Database error: {str(e)}")
        return False