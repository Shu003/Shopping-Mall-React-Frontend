import React, { useState, useEffect } from "react";
import mallApi from "../../api/mallApi";
import "./mall.css";

export default function MallForm({ mall, onSuccess, onCancel }) {
  // Initialize form state either from mall prop (edit) or empty (add)
  const [formState, setFormState] = useState({
    mallName: "",
    location: "",
    categories: "",
  });

  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  // On mall prop change (when editing), populate form fields
  useEffect(() => {
    if (mall) {
      setFormState({
        mallName: mall.mallName || "",
        location: mall.location || "",
        categories: mall.categories || "",
      });
    } else {
      // Clear form if adding new mall
      setFormState({
        mallName: "",
        location: "",
        categories: "",
      });
    }
    setError(null);
  }, [mall]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  // Submit add or update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formState.mallName.trim() || !formState.location.trim()) {
      setError("Mall Name and Location are required.");
      return;
    }

    try {
      setSaving(true);
      if (mall && mall.id) {
        // Update existing mall
        await mallApi.updateMall(mall.id, formState);
      } else {
        // Add new mall
        await mallApi.addMall(formState);
      }
      setSaving(false);
      onSuccess();
    } catch {
      setSaving(false);
      setError("Failed to save mall. Please try again.");
    }
  };

  return (
    <div className="mall-form-container">
      <h2>{mall ? "Edit Mall" : "Add Mall"}</h2>

      {error && <p className="error-message" style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="mallName">Mall Name*:</label>
          <input
            type="text"
            id="mallName"
            name="mallName"
            value={formState.mallName}
            onChange={handleChange}
            required
            placeholder="Enter mall name"
            disabled={saving}
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location*:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formState.location}
            onChange={handleChange}
            required
            placeholder="Enter location"
            disabled={saving}
          />
        </div>

        <div className="form-group">
          <label htmlFor="categories">Categories:</label>
          <textarea
            id="categories"
            name="categories"
            value={formState.categories}
            onChange={handleChange}
            placeholder="Enter categories or description"
            rows={4}
            disabled={saving}
          />
        </div>

        <div className="form-buttons" style={{ marginTop: "1rem" }}>
          <button type="submit" disabled={saving}>
            {saving ? (mall ? "Updating..." : "Adding...") : (mall ? "Update" : "Add")}
          </button>{" "}
          <button type="button" onClick={onCancel} disabled={saving}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
