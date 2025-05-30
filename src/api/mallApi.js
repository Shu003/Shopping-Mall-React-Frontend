import apiClient from "../utils/apiClient";

const mallApi = {
  getAllMalls: () => apiClient.get("/malls"),
  getMallById: (id) => apiClient.get(`/malls/${id}`),
  addMall: (mall) => apiClient.post("/malls", mall),
  updateMall: (id, mall) => apiClient.put(`/malls/${id}`, mall),
  deleteMall: (id) => apiClient.delete(`/malls/${id}`),
};

export default mallApi;
