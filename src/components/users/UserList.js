// src/components/users/UserList.js
import React, { useEffect, useState } from "react";
import userApi from "../../api/userApi";
import UserForm from "./UserForm";
import "./user.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await userApi.getAllUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await userApi.deleteUser(id);
        fetchUsers();
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  const handleFormClose = () => {
    setEditingUser(null);
    setShowForm(false);
  };

  const handleFormSubmit = () => {
    fetchUsers();
    handleFormClose();
  };

  return (
    <div className="user-container">
      <h2>User List</h2>
      <button onClick={() => setShowForm(true)}>Add User</button>

      {showForm && (
        <UserForm
          user={editingUser}
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
        />
      )}

      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(({ id, name, type, password }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{type}</td>
              <td>{password}</td>
              <td>
                <button onClick={() => handleEdit({ id, name, type, password })}>
                  Edit
                </button>
                <button onClick={() => handleDelete(id)} className="delete-btn">
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan="4">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
