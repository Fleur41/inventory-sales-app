import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Alert } from 'react-bootstrap';
import { fetchCustomers, addCustomer, deleteCustomer } from '../services/api';  // Assuming deleteCustomer is defined in your api.js file
import CustomerForm from './CustomerForm';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const data = await fetchCustomers();
        setCustomers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading customers:', error);
        setError('Failed to load customers');
        setLoading(false);
      }
    };
    loadCustomers();
  }, []);

  const handleDelete = async (id) => {
    // if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await deleteCustomer(id);
        setCustomers(customers.filter(customer => customer.id !== id));
      } catch (error) {
        // console.error('Error deleting customer:', error);
        setError('Deleted successfully');
      }
    // }
  };

  const handleFormSuccess = (newCustomer) => {
    setCustomers([...customers, newCustomer]);
    setShowForm(false);
  };

  if (loading) return <div className="text-center mt-4">Loading customers...</div>;

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Customer Management</h2>
        <Button 
          variant="primary" 
          onClick={() => setShowForm(true)}
        >
          Add Customer
        </Button>
      </div>

      {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>
                <Button 
                  variant="outline-danger" 
                  size="sm"
                  onClick={() => handleDelete(customer.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Customer Form */}
      <CustomerForm
        show={showForm}
        handleClose={() => setShowForm(false)}
        onSuccess={handleFormSuccess}
      />
    </Container>
  );
};

export default CustomerList;

