// src/components/users/UserForm.js
import React, { useState, useEffect } from "react";
import userApi from "../../api/userApi";
import "./user.css";

const UserForm = ({ user, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        type: user.type || "",
        password: user.password || "",
      });
    } else {
      setFormData({ name: "", type: "", password: "" });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (user && user.id) {
        await userApi.updateUser(user.id, formData);
      } else {
        await userApi.addUser(formData);
      }
      onSubmit();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
    <div className="user-form-overlay">
      <form className="user-form" onSubmit={handleSubmit}>
        <h3>{user ? "Edit User" : "Add User"}</h3>

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
          Type:
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Type --</option>
            <option value="Admin">Admin</option>
            <option value="Customer">Customer</option>
            <option value="Employee">Employee</option>
            <option value="ShopOwner">ShopOwner</option>
          </select>
        </label>

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>

        <div className="form-buttons">
          <button type="submit">{user ? "Update" : "Add"}</button>
          <button type="button" onClick={onClose} className="cancel-btn">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
