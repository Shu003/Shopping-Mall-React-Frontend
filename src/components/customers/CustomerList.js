import React, { useEffect, useState } from "react";
import customerApi from "../../api/customerApi";
import CustomerForm from "./CustomerForm";
import "./customer.css";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await customerApi.getAllCustomers();
      setCustomers(response.data);
    } catch (error) {
      console.error("Failed to fetch customers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await customerApi.deleteCustomer(id);
        fetchCustomers();
      } catch (error) {
        console.error("Failed to delete customer:", error);
      }
    }
  };

  const handleFormClose = () => {
    setEditingCustomer(null);
    setShowForm(false);
  };

  const handleFormSubmit = () => {
    fetchCustomers();
    handleFormClose();
  };

  return (
    <div className="customer-container">
      <h2>Customers</h2>
      <button onClick={() => setShowForm(true)}>Add Customer</button>

      {showForm && (
        <CustomerForm
          customer={editingCustomer}
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
        />
      )}

      {loading ? (
        <p>Loading customers...</p>
      ) : (
        <table className="customer-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers.map(({ id, name, email, phone }) => (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{phone}</td>
                  <td>
                    <button onClick={() => handleEdit({ id, name, email, phone })}>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No customers found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CustomerList;
