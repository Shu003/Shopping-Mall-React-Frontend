// src/api/mallAdminApi.js
import apiClient from "../utils/apiClient";

const mallAdminApi = {
  getAllMallAdmins: () => apiClient.get("/malladmins"),
  getMallAdminById: (id) => apiClient.get(`/malladmins/${id}`),
  addMallAdmin: (mallAdmin) => apiClient.post("/malladmins", mallAdmin),
  updateMallAdmin: (id, mallAdmin) => apiClient.put(`/malladmins/${id}`, mallAdmin),
  deleteMallAdmin: (id) => apiClient.delete(`/malladmins/${id}`),
};

export default mallAdminApi;
