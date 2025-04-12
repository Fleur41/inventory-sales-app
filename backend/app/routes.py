from flask import Blueprint, jsonify, request
from .models import Product, Customer, Sale
from .forms import ProductForm, CustomerForm, SaleForm
from werkzeug.datastructures import MultiDict
from .extensions import db

api_blueprint = Blueprint('api', __name__)

@api_blueprint.route('/products', methods=['GET', 'POST'])
def handle_products():
    if request.method == 'GET':
        products = Product.query.all()
        return jsonify([p.to_dict() for p in products])

    elif request.method == 'POST':
        data = request.get_json()

        # Handling multiple products
        if isinstance(data, list):
            created_products = []
            for item in data:
                form = ProductForm(formdata=MultiDict(item), meta={'csrf': False})
                if form.validate():
                    product = Product(
                        name=form.name.data,
                        imei=form.imei.data,
                        price=form.price.data,
                        quantity=form.quantity.data
                    )
                    db.session.add(product)
                    created_products.append(product)
                else:
                    return jsonify({'error': 'Invalid product data', 'details': form.errors}), 400
            try:
                db.session.commit()
                return jsonify([p.to_dict() for p in created_products]), 201
            except Exception as e:
                db.session.rollback()
                return jsonify({'error': 'Database error', 'message': str(e)}), 500

        # Handle single product
        form = ProductForm(formdata=MultiDict(data), meta={'csrf': False})  # Use 'data' here instead of 'item'
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

@api_blueprint.route('/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    product = Product.query.get(product_id)
    if not product:
        return jsonify({'error': 'Product not found'}), 404

    try:
        db.session.delete(product)
        db.session.commit()
        return jsonify({'message': f'Product {product_id} deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to delete product', 'message': str(e)}), 500


# # # Customer Routes# Customer Routes
# Customer Routes
@api_blueprint.route('/customers', methods=['GET', 'POST'])
def handle_customers():
    if request.method == 'GET':
        customers = Customer.query.all()
        return jsonify([c.to_dict() for c in customers])
    
    elif request.method == 'POST':
        data = request.get_json()
        customer = Customer(
            name=data['name'],
            email=data['email'],
            phone=data['phone']
        )
        db.session.add(customer)
        db.session.commit()
        return jsonify(customer.to_dict()), 201

@api_blueprint.route('/customers/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def handle_customer(id):
    customer = Customer.query.get_or_404(id)

    if request.method == 'GET':
        return jsonify(customer.to_dict())

    elif request.method == 'PUT':
        data = request.get_json()
        customer.name = data['name']
        customer.email = data['email']
        customer.phone = data['phone']
        db.session.commit()
        return jsonify(customer.to_dict())

    elif request.method == 'DELETE':
        db.session.delete(customer)
        db.session.commit()
        return jsonify({'message': 'Customer deleted successfully'}), 200


# Sales Routes
@api_blueprint.route('/sales', methods=['GET', 'POST'])
def handle_sales():
    if request.method == 'GET':
        sales = Sale.query.all()
        return jsonify([s.to_dict() for s in sales])

    elif request.method == 'POST':
        data = request.get_json()
        sale = Sale(
            product_id=data['product_id'],
            customer_id=data['customer_id'],
            amount=data['amount']
        )
        db.session.add(sale)
        db.session.commit()
        return jsonify(sale.to_dict()), 201

@api_blueprint.route('/sales/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def handle_sale(id):
    sale = Sale.query.get(id)
    
    if not sale:
        return jsonify({'error': 'Sale not found'}), 404  # Returning 404 if the sale doesn't exist

    if request.method == 'GET':
        return jsonify(sale.to_dict())

    elif request.method == 'PUT':
        data = request.get_json()
        sale.product_id = data['product_id']
        sale.customer_id = data['customer_id']
        sale.amount = data['amount']
        db.session.commit()
        return jsonify(sale.to_dict())

    elif request.method == 'DELETE':
        try:
            db.session.delete(sale)
            db.session.commit()
            return jsonify({'message': 'Sale deleted successfully'}), 200  # Return 200 OK for successful deletion
        except Exception as e:
            db.session.rollback()  # Rollback in case of error
            return jsonify({'error': 'Failed to delete sale', 'message': str(e)}), 500  # Return 500 if deletion fails
