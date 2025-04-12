const API_BASE_URL = 'http://127.0.0.1:5000';

// Product API functions
export const fetchProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products`);
  if (!response.ok) throw new Error('Failed to fetch products');
  return await response.json();
};

export const createProduct = async (productData) => {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to create product');
  }
  return await response.json();
};

export const updateProduct = async (id, productData) => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to update product');
  }
  return await response.json();
};

export const deleteProduct = async (id) => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete product');
  return await response.json();
};

// Customer API functions
export const fetchCustomers = async () => {
  const response = await fetch(`${API_BASE_URL}/customers`);
  if (!response.ok) throw new Error('Failed to fetch customers');
  return await response.json();
};

export const createCustomer = async (customerData) => {
  const response = await fetch(`${API_BASE_URL}/customers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customerData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to create customer');
  }
  return await response.json();
};

export const updateCustomer = async (id, customerData) => {
  const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customerData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to update customer');
  }
  return await response.json();
};

export const deleteCustomer = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete customer');
    }
    return await response.json();
  }
  catch (error) {
    console.error('Error deleting customer:', error);
    throw error;
  }
  // const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
  //   method: 'DELETE',
  // });
  // if (!response.ok) {
  //   throw new Error('Failed to delete customer');
  // }
};

// export const deleteCustomer = async (id) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
//       method: 'DELETE',
//     });

//     if (!response.ok) {
//       throw new Error('Failed to delete customer');
//     }

//     return await response.json();  // Returns success message or other info
//   } catch (error) {
//     console.error('Error deleting customer:', error);
//     throw error;
//   }
// };


// Sales API functions
export const fetchSales = async () => {
  const response = await fetch(`${API_BASE_URL}/sales`);
  if (!response.ok) throw new Error('Failed to fetch sales');
  return await response.json();
};

export const createSale = async (saleData) => {
  const response = await fetch(`${API_BASE_URL}/sales`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(saleData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to create sale');
  }
  return await response.json();
};

export const updateSale = async (id, saleData) => {
  const response = await fetch(`${API_BASE_URL}/sales/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(saleData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to update sale');
  }
  return await response.json();
};

export const deleteSale = async (id) => {
  const response = await fetch(`${API_BASE_URL}/sales/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete sale');
  return await response.json();
};

// Enhanced functions with relationships
export const fetchSalesWithDetails = async () => {
  const response = await fetch(`${API_BASE_URL}/sales?_expand=product&_expand=customer`);
  if (!response.ok) throw new Error('Failed to fetch sales with details');
  return await response.json();
};

export const fetchCustomerSales = async (customerId) => {
  const response = await fetch(`${API_BASE_URL}/customers/${customerId}/sales`);
  if (!response.ok) throw new Error('Failed to fetch customer sales');
  return await response.json();
};







// const API_BASE_URL = 'http://127.0.0.1:5000';


// export const fetchProducts = async () => {
//   const response = await fetch(`${API_BASE_URL}/products`);
//   return await response.json();
// };

// export const createProduct = async (productData) => {
//   const response = await fetch(`${API_BASE_URL}/products`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(productData),
//   });
//   return await response.json();
// };

// export const fetchCustomers = async () => {
//   const response = await fetch(`${API_BASE_URL}/customers`);
//   return await response.json();
// };

// export const createCustomer = async (customerData) => {
//   const response = await fetch(`${API_BASE_URL}/customers`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(customerData),
//   });
//   return await response.json();
// };

// export const fetchSales = async () => {
//   const response = await fetch(`${API_BASE_URL}/sales`);
//   return await response.json();
// };

// export const createSale = async (saleData) => {
//   const response = await fetch(`${API_BASE_URL}/sales`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(saleData),
//   });
//   return await response.json();
// };