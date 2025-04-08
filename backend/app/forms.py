from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField, DateField, PasswordField
from wtforms.validators import DataRequired, Email, Length, Optional

class ProductForm(FlaskForm):
    name = StringField('Product Name', validators=[DataRequired(), Length(max=100)])
    imei = StringField('IMEI', validators=[Optional(), Length(min=15, max=15)])
    price = FloatField('Price', validators=[DataRequired()])
    quantity = IntegerField('Quantity', validators=[DataRequired()])

class CustomerForm(FlaskForm):
    name = StringField('Full Name', validators=[DataRequired(), Length(max=100)])
    email = StringField('Email', validators=[Optional(), Email()])
    phone = StringField('Phone', validators=[Optional()])

class SaleForm(FlaskForm):
    product_id = IntegerField('Product ID', validators=[DataRequired()])
    customer_id = IntegerField('Customer ID', validators=[DataRequired()])
    sale_date = DateField('Sale Date', validators=[DataRequired()])
    amount = FloatField('Amount', validators=[DataRequired()])

class LoginForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired(), Length(min=6)])