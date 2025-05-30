// src/api/orderDetailsApi.js
import apiClient from "../utils/apiClient";

const orderDetailsApi = {
  getAllOrders: () => apiClient.get("/orderdetails"),
  getOrderById: (id) => apiClient.get(`/orderdetails/${id}`),
  addOrder: (order) => apiClient.post("/orderdetails", order),
  updateOrder: (id, order) => apiClient.put(`/orderdetails/${id}`, order),
  deleteOrder: (id) => apiClient.delete(`/orderdetails/${id}`),
};

export default orderDetailsApi;
