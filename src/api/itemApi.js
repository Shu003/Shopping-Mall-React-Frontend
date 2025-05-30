import apiClient from "../utils/apiClient";

const itemApi = {
  getAllItems: () => apiClient.get("items"),
  getItemById: (id) => apiClient.get(`items/${id}`),
  addItem: (item) => apiClient.post("items", item),
  updateItem: (id, item) => apiClient.put(`items/${id}`, item),
  deleteItem: (id) => apiClient.delete(`items/${id}`),
};

export default itemApi;
