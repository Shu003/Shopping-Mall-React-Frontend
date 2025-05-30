// src/api/customerApi.js
import apiClient from "../utils/apiClient";

const customerApi = {
  getAllCustomers: () => apiClient.get("/customers"),
  getCustomerById: (id) => apiClient.get(`/customers/${id}`),
  addCustomer: (customer) => apiClient.post("/customers", customer),
  updateCustomer: (id, customer) => apiClient.put(`/customers/${id}`, customer),
  deleteCustomer: (id) => apiClient.delete(`/customers/${id}`),
};

export default customerApi;
