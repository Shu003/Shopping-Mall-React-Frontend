import React, { useState, useEffect } from "react";
import mallAdminApi from "../../api/mallAdminApi";
import mallApi from "../../api/mallApi"; // To fetch mall options
import "./mallAdmin.css";

const MallAdminForm = ({ mallAdmin, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    phone: "",
    mallId: "",
  });

  const [malls, setMalls] = useState([]);

  useEffect(() => {
    const fetchMalls = async () => {
      try {
        const response = await mallApi.getAllMalls();
        setMalls(response.data);
      } catch (error) {
        console.error("Failed to fetch malls:", error);
      }
    };

    fetchMalls();
  }, []);

  useEffect(() => {
    if (mallAdmin) {
      setFormData({
        name: mallAdmin.name || "",
        password: "", // Leave blank for security
        phone: mallAdmin.phone || "",
        mallId: mallAdmin.mall?.id || "",
      });
    } else {
      setFormData({ name: "", password: "", phone: "", mallId: "" });
    }
  }, [mallAdmin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        mall: { id: formData.mallId }
      };

      if (mallAdmin && mallAdmin.id) {
        await mallAdminApi.updateMallAdmin(mallAdmin.id, payload);
      } else {
        await mallAdminApi.addMallAdmin(payload);
      }

      onSubmit();
    } catch (error) {
      console.error("Error saving mall admin:", error);
    }
  };

  return (
    <div className="mallAdmin-form-overlay">
      <form className="mallAdmin-form" onSubmit={handleSubmit}>
        <h3>{mallAdmin ? "Edit Mall Admin" : "Add Mall Admin"}</h3>

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
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required={!mallAdmin} // required on creation
            placeholder={mallAdmin ? "Leave blank to keep current" : ""}
          />
        </label>

        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Mall:
          <select name="mallId" value={formData.mallId} onChange={handleChange} required>
            <option value="">Select a mall</option>
            {malls.map((mall) => (
              <option key={mall.id} value={mall.id}>
                {mall.mallName || `Mall #${mall.id}`}
              </option>
            ))}
          </select>
        </label>

        <div className="form-buttons">
          <button type="submit">{mallAdmin ? "Update" : "Add"}</button>
          <button type="button" onClick={onClose} className="cancel-btn">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default MallAdminForm;
