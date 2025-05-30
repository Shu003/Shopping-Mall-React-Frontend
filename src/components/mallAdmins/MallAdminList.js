import React, { useEffect, useState } from "react";
import mallAdminApi from "../../api/mallAdminApi";
import MallAdminForm from "./MallAdminForm";
import "./mallAdmin.css";

const MallAdminList = () => {
  const [mallAdmins, setMallAdmins] = useState([]);
  const [editingMallAdmin, setEditingMallAdmin] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchMallAdmins = async () => {
    try {
      const response = await mallAdminApi.getAllMallAdmins();
      setMallAdmins(response.data);
    } catch (error) {
      console.error("Failed to fetch mall admins:", error);
    }
  };

  useEffect(() => {
    fetchMallAdmins();
  }, []);

  const handleEdit = (mallAdmin) => {
    setEditingMallAdmin(mallAdmin);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this mall admin?")) {
      try {
        await mallAdminApi.deleteMallAdmin(id);
        fetchMallAdmins();
      } catch (error) {
        console.error("Failed to delete mall admin:", error);
      }
    }
  };

  const handleFormClose = () => {
    setEditingMallAdmin(null);
    setShowForm(false);
  };

  const handleFormSubmit = () => {
    fetchMallAdmins();
    handleFormClose();
  };

  return (
    <div className="mallAdmin-container">
      <h2>Mall Admins</h2>
      <button
        onClick={() => {
          setEditingMallAdmin(null);
          setShowForm(true);
        }}
      >
        Add Mall Admin
      </button>

      {showForm && (
        <MallAdminForm
          mallAdmin={editingMallAdmin}
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
        />
      )}

      <table className="mallAdmin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Mall</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mallAdmins.length > 0 ? (
            mallAdmins.map((admin) => (
              <tr key={admin.id}>
                <td>{admin.id}</td>
                <td>{admin.name}</td>
                <td>{admin.phone}</td>
                <td>{admin.mall ? admin.mall.mallName || `#${admin.mall.id}` : "N/A"}</td>
                <td>
                  <button onClick={() => handleEdit(admin)}>Edit</button>
                  <button
                    onClick={() => handleDelete(admin.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No mall admins found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MallAdminList;
