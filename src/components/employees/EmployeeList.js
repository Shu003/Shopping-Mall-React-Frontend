import React, { useEffect, useState } from "react";
import employeeApi from "../../api/employeeApi";
import EmployeeForm from "./EmployeeForm";
import "./employee.css";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchEmployees = async () => {
    try {
      const response = await employeeApi.getAllEmployees();
      console.log("Employees data:", response.data);
      setEmployees(response.data);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleDelete = async (employeeId) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await employeeApi.deleteEmployee(employeeId);
        fetchEmployees();
      } catch (error) {
        console.error("Failed to delete employee:", error);
      }
    }
  };

  const handleFormClose = () => {
    setEditingEmployee(null);
    setShowForm(false);
  };

  const handleFormSubmit = () => {
    fetchEmployees();
    handleFormClose();
  };

  return (
    <div className="employee-container">
      <h2>Employees</h2>
      <button onClick={() => setShowForm(true)}>Add Employee</button>

      {showForm && (
        <EmployeeForm
          employee={editingEmployee}
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
        />
      )}

      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>DOB</th>
            <th>Salary</th>
            <th>Address</th>
            <th>Designation</th>
            <th>Shop</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length ? (
            employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.dob}</td>
                <td>{emp.salary}</td>
                <td>{emp.address}</td>
                <td>{emp.designation}</td>
                <td>{emp.shop?.shopName || "N/A"}</td>
                <td>
                  <button onClick={() => handleEdit(emp)}>Edit</button>
                  <button
                    onClick={() => handleDelete(emp.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No employees found.</td>
            </tr>
          )}
        </tbody>

      </table>
    </div>
  );
};

export default EmployeeList;
