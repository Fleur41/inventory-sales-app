import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';

const SalesPage = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/sales')
      .then(response => setSales(response.data))
      .catch(error => console.error('Error fetching sales:', error));
  }, []);

  return (
    <div>
      <h1>Sales List</h1>
      <Button className="mb-3">Add Sale</Button>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Product</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id}>
              <td>{sale.product_name}</td>
              <td>{sale.customer_name}</td>
              <td>{sale.sale_date}</td>
              <td>{sale.amount}</td>
              <td>
                <Button variant="warning" className="mr-2">Edit</Button>
                <Button variant="danger">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default SalesPage;

