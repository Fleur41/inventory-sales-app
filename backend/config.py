import os
from pathlib import Path

BASE_DIR = Path(__file__).parent
DB_PATH = BASE_DIR / 'instance' / 'inventory.db'

class Config:
    SQLALCHEMY_DATABASE_URI = f'sqlite:///{DB_PATH.absolute()}'
    SQLALCHEMY_TRACK_MODIFICATIONS = False