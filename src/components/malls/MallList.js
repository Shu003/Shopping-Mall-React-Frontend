import React, { useEffect, useState } from "react";
import mallApi from "../../api/mallApi";
import MallForm from "./MallForm";
import "./mall.css";

export default function MallList() {
  const [malls, setMalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingMall, setEditingMall] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchMalls = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await mallApi.getAllMalls();
      setMalls(response.data);
    } catch (err) {
      setError("Failed to fetch malls");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMalls();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this mall?")) {
      try {
        await mallApi.deleteMall(id);
        // Refresh mall list after delete
        fetchMalls();
      } catch (err) {
        alert("Failed to delete mall");
      }
    }
  };

  const handleEdit = (mall) => {
    setEditingMall(mall);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingMall(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    fetchMalls(); // Refresh list after add/edit
  };

  if (loading) return <p>Loading malls...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="mall-container">
      <h2>Malls</h2>
      <button onClick={handleAdd}>Add New Mall</button>
      {showForm && (
        <MallForm mall={editingMall} onSuccess={handleFormClose} onCancel={() => setShowForm(false)} />
      )}
      <table className="mall-table" border="1" cellPadding="8" cellSpacing="0" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Mall Name</th>
            <th>Location</th>
            <th>Categories</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {malls.length === 0 ? (
            <tr><td colSpan="5">No malls found.</td></tr>
          ) : (
            malls.map(({ id, mallName, location, categories }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{mallName}</td>
                <td>{location}</td>
                <td>{categories}</td>
                <td>
                  <button onClick={() => handleEdit({ id, mallName, location, categories })}>Edit</button>{" "}
                  <button onClick={() => handleDelete(id)} className="delete-btn">Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
