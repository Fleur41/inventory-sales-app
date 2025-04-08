from flask import Blueprint, jsonify, request
from .models import Product, Customer, Sale
from .forms import ProductForm, CustomerForm, SaleForm
from backend.database.db_handler import add_to_db, delete_from_db

api_blueprint = Blueprint('api', __name__)

# Product Routes
@api_blueprint.route('/products', methods=['GET', 'POST'])
def products():
    if request.method == 'GET':
        products = Product.query.all()
        return jsonify([p.to_dict() for p in products])
    
    elif request.method == 'POST':
        form = ProductForm()
        if form.validate():
            product = Product(
                name=form.name.data,
                imei=form.imei.data,
                price=form.price.data,
                quantity=form.quantity.data
            )
            if add_to_db(product):
                return jsonify(product.to_dict()), 201
            return jsonify({'error': 'Database error'}), 500
        return jsonify(form.errors), 400

# Customer Routes
@api_blueprint.route('/customers', methods=['GET', 'POST'])
def customers():
    if request.method == 'GET':
        customers = Customer.query.all()
        return jsonify([c.to_dict() for c in customers])
    
    elif request.method == 'POST':
        form = CustomerForm()
        if form.validate():
            customer = Customer(
                name=form.name.data,
                email=form.email.data,
                phone=form.phone.data
            )
            if add_to_db(customer):
                return jsonify(customer.to_dict()), 201
            return jsonify({'error': 'Database error'}), 500
        return jsonify(form.errors), 400

# Sale Routes
@api_blueprint.route('/sales', methods=['GET', 'POST'])
def sales():
    if request.method == 'GET':
        sales = Sale.query.all()
        return jsonify([s.to_dict() for s in sales])
    
    elif request.method == 'POST':
        form = SaleForm()
        if form.validate():
            sale = Sale(
                product_id=form.product_id.data,
                customer_id=form.customer_id.data,
                sale_date=form.sale_date.data,
                amount=form.amount.data
            )
            if add_to_db(sale):
                return jsonify(sale.to_dict()), 201
            return jsonify({'error': 'Database error'}), 500
        return jsonify(form.errors), 400

# IMEI-specific Route
@api_blueprint.route('/products/imei/<imei>', methods=['GET'])
def product_by_imei(imei):
    product = Product.query.filter_by(imei=imei).first()
    if product:
        return jsonify(product.to_dict())
    return jsonify({'error': 'Product not found'}), 404