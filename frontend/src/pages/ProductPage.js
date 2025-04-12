import React, { useState, useEffect } from 'react';
import { Card, Button, Form, InputGroup, FormControl, Row, Col, Modal } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';  // For search icon
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', imei: '', price: '', quantity: '' });

  const navigate = useNavigate();

  // Fetch products from API
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  // Handle Search Query
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter products based on search query
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle input changes for new product
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Add new product via API
  const handleAddProduct = () => {
    axios.post('http://127.0.0.1:5000/products', newProduct)
      .then(response => {
        setProducts([...products, response.data]);
        setShowAddProductModal(false);
        setNewProduct({ name: '', imei: '', price: '', quantity: '' });
      })
      .catch(error => {
        console.error('Error adding product:', error);
      });
  };

  return (
    <div>
      {/* Search Bar */}
      <InputGroup className="mb-3" style={{ maxWidth: '600px', margin: '20px auto' }}>
        <FormControl
          placeholder="Search Products..."
          value={searchQuery}
          onChange={handleSearch}
          aria-label="Search Products"
        />
        <InputGroup.Text>
          <FaSearch />
        </InputGroup.Text>
      </InputGroup>

      {/* Add Product Button */}
      <Button variant="primary" onClick={() => setShowAddProductModal(true)} style={{ marginBottom: '20px' }}>
        Add New Product
      </Button>

      {/* Products List */}
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {filteredProducts.map(product => (
          <Col key={product.id}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">IMEI: {product.imei}</Card.Subtitle>
                <Card.Text>
                  <strong>Price:</strong> ${product.price}<br />
                  <strong>Quantity:</strong> {product.quantity}
                </Card.Text>
                <Button variant="outline-primary" onClick={() => navigate(`/product/${product.id}`)}>
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Add Product Modal */}
      <Modal show={showAddProductModal} onHide={() => setShowAddProductModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                name="name"
                value={newProduct.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>IMEI</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter IMEI"
                name="imei"
                value={newProduct.imei}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter product price"
                name="price"
                value={newProduct.price}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter product quantity"
                name="quantity"
                value={newProduct.quantity}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleAddProduct}>
              Add Product
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductPage;



// import React, { useState, useEffect } from 'react';
// import { Card, Button, Row, Col, Modal, Form } from 'react-bootstrap';
// import axios from 'axios';

// const ProductPage = () => {
//   const [products, setProducts] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [productData, setProductData] = useState({
//     name: '',
//     imei: '',
//     price: '',
//     quantity: ''
//   });

//   // Fetch Products
//   useEffect(() => {
//     axios.get('http://127.0.0.1:5000/products')
//       .then(response => setProducts(response.data))
//       .catch(error => console.error('Error fetching products:', error));
//   }, []);

//   const handleChange = (e) => {
//     setProductData({
//       ...productData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = () => {
//     axios.post('http://127.0.0.1:5000/products', productData)
//       .then(response => {
//         setProducts([...products, response.data]);
//         setShowModal(false);
//       })
//       .catch(error => console.error('Error adding product:', error));
//   };

//   return (
//     <div>
//       <h1>Product List</h1>
//       <Button onClick={() => setShowModal(true)} className="mb-3">Add Product</Button>
//       <Row>
//         {products.map((product) => (
//           <Col key={product.id} sm={12} md={6} lg={4}>
//             <Card>
//               <Card.Body>
//                 <Card.Title>{product.name}</Card.Title>
//                 <Card.Text>IMEI: {product.imei}</Card.Text>
//                 <Card.Text>Price: ${product.price}</Card.Text>
//                 <Card.Text>Quantity: {product.quantity}</Card.Text>
//                 <Button variant="primary">Edit</Button>
//                 <Button variant="danger" className="ml-2">Delete</Button>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>

//       {/* Add Product Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add New Product</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formProductName">
//               <Form.Label>Product Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter product name"
//                 name="name"
//                 value={productData.name}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formProductIMEI">
//               <Form.Label>IMEI</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter product IMEI"
//                 name="imei"
//                 value={productData.imei}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formProductPrice">
//               <Form.Label>Price</Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="Enter product price"
//                 name="price"
//                 value={productData.price}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formProductQuantity">
//               <Form.Label>Quantity</Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="Enter quantity"
//                 name="quantity"
//                 value={productData.quantity}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
//           <Button variant="primary" onClick={handleSubmit}>Add Product</Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default ProductPage;
