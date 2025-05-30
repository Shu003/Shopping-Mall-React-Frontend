import React, { useEffect, useState } from "react";
import orderDetailsApi from "../../api/orderDetailsApi";
import OrderDetailsForm from "./OrderDetailsForm";
import "./orderDetails.css";

const OrderDetailsList = () => {
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchOrders = async () => {
    try {
      const response = await orderDetailsApi.getAllOrders();
      setOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleEdit = (order) => {
    setEditingOrder(order);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await orderDetailsApi.deleteOrder(id);
        fetchOrders();
      } catch (error) {
        console.error("Failed to delete order:", error);
      }
    }
  };

  const handleFormClose = () => {
    setEditingOrder(null);
    setShowForm(false);
  };

  const handleFormSubmit = () => {
    fetchOrders();
    handleFormClose();
  };

  return (
    <div className="order-container">
      <h2>Order Details</h2>
      <button onClick={() => setShowForm(true)}>Add Order</button>

      {showForm && (
        <OrderDetailsForm
          order={editingOrder}
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
        />
      )}

      <table className="order-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Shop</th>
            <th>Date of Purchase</th>
            <th>Total</th>
            <th>Payment Mode</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No orders found.
              </td>
            </tr>
          ) : (
            orders.map((order) => {
              const {
                id,
                customer,
                shop,
                dateOfPurchase,
                total,
                paymentMode,
              } = order;
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>
                    {customer
                      ? `${customer.name || "N/A"} (ID: ${customer.id})`
                      : "N/A"}
                  </td>
                  <td>
                    {shop ? `${shop.shopName || "N/A"} (ID: ${shop.shopId})` : "N/A"}
                  </td>
                  <td>
                    {dateOfPurchase
                      ? new Date(dateOfPurchase).toLocaleString()
                      : "N/A"}
                  </td>
                  <td>{total?.toFixed(2) || "0.00"}</td>
                  <td>{paymentMode || "N/A"}</td>
                  <td>
                    <button onClick={() => handleEdit(order)}>Edit</button>
                    <button
                      onClick={() => handleDelete(id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDetailsList;
