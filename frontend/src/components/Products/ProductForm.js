import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { createProduct, updateProduct } from '../services/api';

const ProductForm = ({ show, handleClose, onSuccess, product }) => {
  const [formData, setFormData] = useState({
    name: '',
    imei: '',
    price: '',
    quantity: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        imei: product.imei,
        price: product.price,
        quantity: product.quantity
      });
    } else {
      setFormData({
        name: '',
        imei: '',
        price: '',
        quantity: ''
      });
    }
  }, [product]);

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
      if (product) {
        response = await updateProduct(product.id, formData);
      } else {
        response = await createProduct(formData);
      }
      onSuccess(response);
      handleClose();
    } catch (error) {
      console.error('Error saving product:', error);
      setError(error.message || 'Failed to save product');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{product ? 'Edit Product' : 'Add New Product'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Product Name *</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter product name"
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>IMEI Number</Form.Label>
            <Form.Control
              type="text"
              name="imei"
              value={formData.imei}
              onChange={handleChange}
              placeholder="Enter IMEI number (optional)"
            />
            <Form.Text className="text-muted">
              Leave blank if product doesn't have IMEI
            </Form.Text>
          </Form.Group>
          
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Price *</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  required
                  placeholder="0.00"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Quantity *</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  min="0"
                  required
                  placeholder="0"
                />
              </Form.Group>
            </Col>
          </Row>
          
          <div className="d-flex justify-content-end mt-4">
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {product ? 'Update Product' : 'Save Product'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ProductForm;




// import React, { useState } from 'react';
// import { Form, Button, Modal } from 'react-bootstrap';
// import { createProduct } from '../../services/api';

// const ProductForm = ({ show, handleClose }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     imei: '',
//     price: '',
//     quantity: ''
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await createProduct(formData);
//       handleClose();
//       // You might want to refresh the product list here
//     } catch (error) {
//       console.error('Error creating product:', error);
//     }
//   };

//   return (
//     <Modal show={show} onHide={handleClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>Add New Product</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form onSubmit={handleSubmit}>
//           <Form.Group className="mb-3">
//             <Form.Label>Product Name</Form.Label>
//             <Form.Control
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>
          
//           <Form.Group className="mb-3">
//             <Form.Label>IMEI Number</Form.Label>
//             <Form.Control
//               type="text"
//               name="imei"
//               value={formData.imei}
//               onChange={handleChange}
//             />
//           </Form.Group>
          
//           <Form.Group className="mb-3">
//             <Form.Label>Price</Form.Label>
//             <Form.Control
//               type="number"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//               step="0.01"
//               required
//             />
//           </Form.Group>
          
//           <Form.Group className="mb-3">
//             <Form.Label>Quantity</Form.Label>
//             <Form.Control
//               type="number"
//               name="quantity"
//               value={formData.quantity}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>
          
//           <Button variant="primary" type="submit">
//             Save Product
//           </Button>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default ProductForm;