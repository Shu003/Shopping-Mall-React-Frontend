import React, { useState, useEffect } from "react";
import customerApi from "../../api/customerApi";
import "./customer.css";

const CustomerForm = ({ customer, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    // For now, no order field here as it's a nested entity
  });

  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name || "",
        email: customer.email || "",
        phone: customer.phone || "",
      });
    } else {
      setFormData({ name: "", email: "", phone: "" });
    }
  }, [customer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (customer && customer.id) {
        await customerApi.updateCustomer(customer.id, formData);
      } else {
        await customerApi.addCustomer(formData);
      }
      onSubmit();
    } catch (error) {
      console.error("Error saving customer:", error);
    }
  };

  return (
    <div className="customer-form-overlay">
      <form className="customer-form" onSubmit={handleSubmit}>
        <h3>{customer ? "Edit Customer" : "Add Customer"}</h3>

        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            autoFocus
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>

        <div className="form-buttons">
          <button type="submit">{customer ? "Update" : "Add"}</button>
          <button type="button" onClick={onClose} className="cancel-btn">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
