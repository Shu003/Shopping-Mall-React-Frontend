// src/api/shopApi.js
import apiClient from "../utils/apiClient";

const shopApi = {
  getAllShops: () => apiClient.get("/shops"),
  getShopById: (id) => apiClient.get(`/shops/${id}`),
  addShop: (shop) => apiClient.post("/shops", shop),
  updateShop: (id, shop) => apiClient.put(`/shops/${id}`, shop),
  deleteShop: (id) => apiClient.delete(`/shops/${id}`),
};

export default shopApi;
