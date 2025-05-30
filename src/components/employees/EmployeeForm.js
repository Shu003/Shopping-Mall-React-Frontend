import React, { useState, useEffect } from "react";
import employeeApi from "../../api/employeeApi";
import shopApi from "../../api/shopApi";
import "./employee.css";

const EmployeeForm = ({ employee, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    salary: "",
    address: "",
    designation: "",
    shop: "",
  });

  const [shops, setShops] = useState([]);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await shopApi.getAllShops();
        setShops(response.data);
      } catch (error) {
        console.error("Failed to fetch shops:", error);
      }
    };

    fetchShops();
  }, []);

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || "",
        dob: employee.dob || "",
        salary: employee.salary || "",
        address: employee.address || "",
        designation: employee.designation || "",
        shop: employee.shop?.shopId ? employee.shop.shopId.toString() : "", // shopId as string for select
      });
    } else {
      setFormData({
        name: "",
        dob: "",
        salary: "",
        address: "",
        designation: "",
        shop: "",
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        dob: formData.dob,
        salary: parseFloat(formData.salary),
        address: formData.address,
        designation: formData.designation,
        shop: formData.shop ? { shopId: parseInt(formData.shop) } : null,
      };

      if (employee && employee.id) {
        await employeeApi.updateEmployee(employee.id, payload);
      } else {
        await employeeApi.addEmployee(payload);
      }
      onSubmit();
    } catch (error) {
      console.error("Error saving employee:", error);
      alert("Failed to save employee. Please check your inputs.");
    }
  };

  return (
    <div className="employee-form-overlay">
      <form className="employee-form" onSubmit={handleSubmit}>
        <h3>{employee ? "Edit Employee" : "Add Employee"}</h3>

        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Date of Birth:
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Salary:
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </label>

        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Designation:
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Shop:
          <select
            name="shop"
            value={formData.shop}
            onChange={handleChange}
            required
          >
            <option value="">Select Shop</option>
            {shops.map((shop) => (
              <option key={shop.shopId} value={shop.shopId}>
                {shop.shopName} (ID: {shop.shopId})
              </option>
            ))}
          </select>
        </label>

        <div className="form-buttons">
          <button type="submit">{employee ? "Update" : "Add"}</button>
          <button type="button" onClick={onClose} className="cancel-btn">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
