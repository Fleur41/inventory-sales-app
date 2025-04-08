import os
from app import create_app
from app.extensions import db

def initialize_database():
    app = create_app()
    
    # Ensure instance directory exists
    instance_path = os.path.join(os.path.dirname(__file__), 'instance')
    os.makedirs(instance_path, exist_ok=True)
    
    # Set permissions (Linux/macOS)
    os.chmod(instance_path, 0o755)
    
    with app.app_context():
        try:
            db.create_all()
            print(f"✅ Database created at: {app.config['SQLALCHEMY_DATABASE_URI']}")
            print("Tables created:", db.metadata.tables.keys())
        except Exception as e:
            print(f"❌ Error: {e}")
            print("Check:")
            print(f"- Directory permissions for {instance_path}")
            print("- Disk space availability")
            print("- Anti-virus interference (Windows)")

if __name__ == '__main__':
    initialize_database()