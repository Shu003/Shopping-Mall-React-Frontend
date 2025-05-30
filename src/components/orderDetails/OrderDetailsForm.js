import React, { useState, useEffect } from "react";
import orderDetailsApi from "../../api/orderDetailsApi";
import customerApi from "../../api/customerApi"; // you should create this
import shopApi from "../../api/shopApi"; // you should create this
import "./orderDetails.css";

const OrderDetailsForm = ({ order, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    customerId: "",
    shopId: "",
    dateOfPurchase: "",
    total: "",
    paymentMode: "",
  });

  const [customers, setCustomers] = useState([]);
  const [shops, setShops] = useState([]);

  useEffect(() => {
    // Fetch customers and shops on component mount
    const fetchData = async () => {
      try {
        const customersResponse = await customerApi.getAllCustomers();
        setCustomers(customersResponse.data);

        const shopsResponse = await shopApi.getAllShops();
        setShops(shopsResponse.data);
      } catch (error) {
        console.error("Failed to fetch customers or shops:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (order) {
      setFormData({
        customerId: order.customer?.id || "",
        shopId: order.shop?.shopId || "",
        dateOfPurchase: order.dateOfPurchase
          ? new Date(order.dateOfPurchase).toISOString().substring(0, 16) // include time (yyyy-MM-ddTHH:mm)
          : "",
        total: order.total || "",
        paymentMode: order.paymentMode || "",
      });
    } else {
      setFormData({
        customerId: "",
        shopId: "",
        dateOfPurchase: "",
        total: "",
        paymentMode: "",
      });
    }
  }, [order]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Build order object with nested customer and shop ids
    const payload = {
      dateOfPurchase: formData.dateOfPurchase,
      total: parseFloat(formData.total),
      paymentMode: formData.paymentMode,
      customer: { id: parseInt(formData.customerId) },
      shop: { shopId: parseInt(formData.shopId) },
    };

    try {
      if (order && order.id) {
        await orderDetailsApi.updateOrder(order.id, payload);
      } else {
        await orderDetailsApi.addOrder(payload);
      }
      onSubmit();
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  return (
    <div className="order-form-overlay">
      <form className="order-form" onSubmit={handleSubmit}>
        <h3>{order ? "Edit Order" : "Add Order"}</h3>

        <label>
          Customer:
          <select
            name="customerId"
            value={formData.customerId}
            onChange={handleChange}
            required
          >
            <option value="">Select Customer</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} (ID: {c.id})
              </option>
            ))}
          </select>
        </label>

        <label>
          Shop:
          <select
            name="shopId"
            value={formData.shopId}
            onChange={handleChange}
            required
          >
            <option value="">Select Shop</option>
            {shops.map((s) => (
              <option key={s.shopId} value={s.shopId}>
              {s.name || s.shopName} (ID: {s.shopId})
              </option>
            ))}
          </select>
        </label>

        <label>
          Date of Purchase:
          <input
            type="datetime-local"
            name="dateOfPurchase"
            value={formData.dateOfPurchase}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Total:
          <input
            type="number"
            name="total"
            value={formData.total}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
          />
        </label>

        <label>
          Payment Mode:
          <input
            type="text"
            name="paymentMode"
            value={formData.paymentMode}
            onChange={handleChange}
            required
          />
        </label>

        <div className="form-buttons">
          <button type="submit">{order ? "Update" : "Add"}</button>
          <button type="button" onClick={onClose} className="cancel-btn">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderDetailsForm;
