import unittest
from app.models import Product, db
from backend import create_app

class ProductModelTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app()
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()
        
    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()
    
    def test_product_creation(self):
        p = Product(
            name="Test Product",
            imei="123456789012345",
            price=99.99,
            quantity=10
        )
        db.session.add(p)
        db.session.commit()
        
        self.assertEqual(Product.query.count(), 1)
        self.assertEqual(p.name, "Test Product")