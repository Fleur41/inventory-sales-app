from flask import Blueprint, jsonify, request
from .models import Product, Customer, Sale
from .forms import ProductForm, CustomerForm, SaleForm
from .extensions import db

api_blueprint = Blueprint('api', __name__)

@api_blueprint.route('/products', methods=['GET', 'POST'])
def handle_products():
    if request.method == 'GET':
        products = Product.query.all()
        return jsonify([p.to_dict() for p in products])
    
    elif request.method == 'POST':
        data = request.get_json()
        form = ProductForm(data=data)
        
        if form.validate():
            product = Product(
                name=form.name.data,
                imei=form.imei.data,
                price=form.price.data,
                quantity=form.quantity.data
            )
            db.session.add(product)
            try:
                db.session.commit()
                return jsonify(product.to_dict()), 201
            except:
                db.session.rollback()
                return jsonify({'error': 'Database error'}), 500
        return jsonify(form.errors), 400

# Add similar routes for customers and sales