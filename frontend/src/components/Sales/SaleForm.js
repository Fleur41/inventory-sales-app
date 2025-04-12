import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { createSale, updateSale } from '../services/api';

const SaleForm = ({ show, handleClose, onSuccess, sale, products, customers }) => {
  const [formData, setFormData] = useState({
    product_id: '',
    customer_id: '',
    amount: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (sale) {
      setFormData({
        product_id: sale.product_id,
        customer_id: sale.customer_id,
        amount: sale.amount
      });
    } else {
      setFormData({
        product_id: '',
        customer_id: '',
        amount: ''
      });
    }
  }, [sale]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      let response;
      if (sale) {
        response = await updateSale(sale.id, formData);
      } else {
        response = await createSale(formData);
      }
      onSuccess(response);
      handleClose();
    } catch (error) {
      console.error('Error saving sale:', error);
      setError(error.message || 'Failed to save sale');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{sale ? 'Edit Sale' : 'Add New Sale'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Product *</Form.Label>
                <Form.Select
                  name="product_id"
                  value={formData.product_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Product</option>
                  {products.map(product => (
                    <option key={product.id} value={product.id}>
                      {product.name} (${product.price.toFixed(2)})
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Customer *</Form.Label>
                <Form.Select
                  name="customer_id"
                  value={formData.customer_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Customer</option>
                  {customers.map(customer => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name} ({customer.email})
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Amount *</Form.Label>
            <Form.Control
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              step="0.01"
              min="0"
              required
              placeholder="0.00"
            />
          </Form.Group>

          <div className="d-flex justify-content-end mt-4">
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {sale ? 'Update Sale' : 'Save Sale'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SaleForm;