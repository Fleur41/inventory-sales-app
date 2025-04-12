import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Badge, Alert } from 'react-bootstrap';
import { 
  fetchProducts, 
  deleteProduct 
} from '../services/api';
import ProductForm from './ProductForm';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading products:', error);
        setError('Failed to load products');
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleDelete = async (id) => {
        await deleteProduct(id);
        setProducts(products.filter(product => product.id !== id));
      
  };

  const handleFormSuccess = (newProduct) => {
    if (editProduct) {
      setProducts(products.map(p => p.id === newProduct.id ? newProduct : p));
    } else {
      setProducts([...products, newProduct]);
    }
    setShowForm(false);
    setEditProduct(null);
  };

  if (loading) return <div className="text-center mt-4">Loading products...</div>;

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Product Inventory</h2>
        <Button 
          variant="primary" 
          onClick={() => {
            setEditProduct(null);
            setShowForm(true);
          }}
        >
          Add Product
        </Button>
      </div>

      {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>IMEI</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>
                {product.imei ? (
                  <Badge bg="secondary">{product.imei}</Badge>
                ) : 'N/A'}
              </td>
              <td>${product.price.toFixed(2)}</td>
              <td>
                <Badge bg={product.quantity > 0 ? 'success' : 'danger'}>
                  {product.quantity}
                </Badge>
              </td>
              <td>
                <Button 
                  variant="outline-primary" 
                  size="sm" 
                  className="me-2"
                  onClick={() => {
                    setEditProduct(product);
                    setShowForm(true);
                  }}
                >
                  Edit
                </Button>
                <Button 
                  variant="outline-danger" 
                  size="sm"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ProductForm
        show={showForm}
        handleClose={() => {
          setShowForm(false);
          setEditProduct(null);
        }}
        onSuccess={handleFormSuccess}
        product={editProduct}
      />
    </Container>
  );
};

export default ProductList;







// import React, { useState, useEffect } from 'react';
// import { Table, Button, Container } from 'react-bootstrap';
// import { fetchProducts } from '../services/api';

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadProducts = async () => {
//       try {
//         const data = await fetchProducts();
//         setProducts(data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error loading products:', error);
//         setLoading(false);
//       }
//     };

//     loadProducts();
//   }, []);

//   if (loading) return <div>Loading...</div>;

//   return (
//     <Container>
//       <h2>Products</h2>
//       <Button variant="primary" className="mb-3">Add Product</Button>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>IMEI</th>
//             <th>Price</th>
//             <th>Quantity</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map(product => (
//             <tr key={product.id}>
//               <td>{product.id}</td>
//               <td>{product.name}</td>
//               <td>{product.imei}</td>
//               <td>${product.price.toFixed(2)}</td>
//               <td>{product.quantity}</td>
//               <td>
//                 <Button variant="info" size="sm" className="me-2">Edit</Button>
//                 <Button variant="danger" size="sm">Delete</Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </Container>
//   );
// };

// export default ProductList;