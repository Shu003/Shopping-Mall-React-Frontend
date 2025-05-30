// src/api/shopOwnerApi.js
import apiClient from "../utils/apiClient";

/**
 * API methods for ShopOwner CRUD operations
 */
const shopOwnerApi = {
  // Fetch all shop owners
  getAllShopOwners: () => apiClient.get("/shopowners"),

  // Fetch a single shop owner by ID
  getShopOwnerById: (id) => apiClient.get(`/shopowners/${id}`),

  // Add a new shop owner
  addShopOwner: (shopOwner) => apiClient.post("/shopowners", shopOwner),

  // Update an existing shop owner by ID
  updateShopOwner: (id, shopOwner) => apiClient.put(`/shopowners/${id}`, shopOwner),

  // Delete a shop owner by ID
  deleteShopOwner: (id) => apiClient.delete(`/shopowners/${id}`),
};

export default shopOwnerApi;
