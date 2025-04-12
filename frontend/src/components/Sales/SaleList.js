import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Badge, Alert } from 'react-bootstrap';
import { 
  fetchSales, 
  deleteSale,
  fetchProducts,
  fetchCustomers
} from '../services/api';
import SaleForm from './SaleForm';

const SaleList = () => {
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editSale, setEditSale] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [salesData, productsData, customersData] = await Promise.all([
          fetchSales(),
          fetchProducts(),
          fetchCustomers()
        ]);
        
        // Enhance sales data with product and customer names
        const enhancedSales = salesData.map(sale => {
          const product = productsData.find(p => p.id === sale.product_id);
          const customer = customersData.find(c => c.id === sale.customer_id);
          return {
            ...sale,
            product_name: product?.name || 'Unknown',
            customer_name: customer?.name || 'Unknown'
          };
        });
        
        setSales(enhancedSales);
        setProducts(productsData);
        setCustomers(customersData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setError('Failed to load sales data');
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this sale?')) {
      try {
        await deleteSale(id);
        setSales(sales.filter(sale => sale.id !== id));
      } catch (error) {
        console.error('Error deleting sale:', error);
        setError('Failed to delete sale');
      }
    }
  };

  const handleFormSuccess = (newSale) => {
    // Enhance the new sale with product/customer names
    const product = products.find(p => p.id === newSale.product_id);
    const customer = customers.find(c => c.id === newSale.customer_id);
    
    const enhancedSale = {
      ...newSale,
      product_name: product?.name || 'Unknown',
      customer_name: customer?.name || 'Unknown'
    };

    if (editSale) {
      setSales(sales.map(s => s.id === enhancedSale.id ? enhancedSale : s));
    } else {
      setSales([...sales, enhancedSale]);
    }
    setShowForm(false);
    setEditSale(null);
  };

  if (loading) return <div className="text-center mt-4">Loading sales...</div>;

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Sales Records</h2>
        <Button 
          variant="primary" 
          onClick={() => {
            setEditSale(null);
            setShowForm(true);
          }}
        >
          Add Sale
        </Button>
      </div>

      {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sales.map(sale => (
            <tr key={sale.id}>
              <td>{sale.id}</td>
              <td>
                <Badge bg="info">{sale.product_name}</Badge> (ID: {sale.product_id})
              </td>
              <td>
                <Badge bg="secondary">{sale.customer_name}</Badge> (ID: {sale.customer_id})
              </td>
              <td>${sale.amount.toFixed(2)}</td>
              <td>{new Date(sale.created_at).toLocaleDateString()}</td>
              <td>
                <Button 
                  variant="outline-primary" 
                  size="sm" 
                  className="me-2"
                  onClick={() => {
                    setEditSale(sale);
                    setShowForm(true);
                  }}
                >
                  Edit
                </Button>
                <Button 
                  variant="outline-danger" 
                  size="sm"
                  onClick={() => handleDelete(sale.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <SaleForm
        show={showForm}
        handleClose={() => {
          setShowForm(false);
          setEditSale(null);
        }}
        onSuccess={handleFormSuccess}
        sale={editSale}
        products={products}
        customers={customers}
      />
    </Container>
  );
};

export default SaleList;

// import React, { useState, useEffect } from 'react';
// import { Table, Button, Container, Badge } from 'react-bootstrap';
// import { fetchSales } from '../services/api';
// // import SaleForm from './SaleForm';

// const SaleList = () => {
//   const [sales, setSales] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showForm, setShowForm] = useState(false);
//   const [editSale, setEditSale] = useState(null);

//   useEffect(() => {
//     const loadSales = async () => {
//       try {
//         const data = await fetchSales();
//         setSales(data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error loading sales:', error);
//         setLoading(false);
//       }
//     };
//     loadSales();
//   }, []);

// //   const handleDelete = async (id) => {
// //     if (window.confirm('Are you sure you want to delete this sale?')) {
// //       try {
// //         await deleteSale(id);
// //         setSales(sales.filter(sale => sale.id !== id));
// //       } catch (error) {
// //         console.error('Error deleting sale:', error);
// //       }
// //     }
// //   };

//   const handleFormSuccess = (newSale) => {
//     if (editSale) {
//       setSales(sales.map(s => s.id === newSale.id ? newSale : s));
//     } else {
//       setSales([...sales, newSale]);
//     }
//     setShowForm(false);
//     setEditSale(null);
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <Container>
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h2>Sales Records</h2>
//         <Button variant="primary" onClick={() => setShowForm(true)}>
//           Add New Sale
//         </Button>
//       </div>

//       <Table striped bordered hover responsive>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Product</th>
//             <th>Customer</th>
//             <th>Amount</th>
//             <th>Date</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {sales.map(sale => (
//             <tr key={sale.id}>
//               <td>{sale.id}</td>
//               <td>
//                 <Badge bg="info">{sale.product_id}</Badge>
//                 {sale.product_name && ` - ${sale.product_name}`}
//               </td>
//               <td>
//                 <Badge bg="secondary">{sale.customer_id}</Badge>
//                 {sale.customer_name && ` - ${sale.customer_name}`}
//               </td>
//               <td>${sale.amount.toFixed(2)}</td>
//               <td>{new Date(sale.created_at).toLocaleDateString()}</td>
//               <td>
//                 <Button 
//                   variant="info" 
//                   size="sm" 
//                   className="me-2"
//                   onClick={() => {
//                     setEditSale(sale);
//                     setShowForm(true);
//                   }}
//                 >
//                   Edit
//                 </Button>
//                 {/* <Button 
//                   variant="danger" 
//                   size="sm"
//                   onClick={() => handleDelete(sale.id)}
//                 >
//                   Delete
//                 </Button> */}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       {/* <SaleForm
//         show={showForm}
//         handleClose={() => {
//           setShowForm(false);
//           setEditSale(null);
//         }}
//         onSuccess={handleFormSuccess}
//         sale={editSale}
//       /> */}
//     </Container>
//   );
// };

// export default SaleList;