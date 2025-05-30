import apiClient from "../utils/apiClient";

const employeeApi = {
  getAllEmployees: () => apiClient.get("/employees"),
  getEmployeeById: (employeeId) => apiClient.get(`/employees/${employeeId}`),
  addEmployee: (employee) => apiClient.post("/employees", employee),
  updateEmployee: (employeeId, employee) => apiClient.put(`/employees/${employeeId}`, employee),
  deleteEmployee: (employeeId) => apiClient.delete(`/employees/${employeeId}`),
};

export default employeeApi;
