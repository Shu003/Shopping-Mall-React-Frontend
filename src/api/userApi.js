// src/api/userApi.js
import apiClient from "../utils/apiClient";

const userApi = {
  getAllUsers: () => apiClient.get("users"),
  getUserById: (id) => apiClient.get(`users/${id}`),
  addUser: (user) => apiClient.post("/users", user),
  updateUser: (id, user) => apiClient.put(`/users/${id}`, user),
  deleteUser: (id) => apiClient.delete(`/users/${id}`),
};

export default userApi;
