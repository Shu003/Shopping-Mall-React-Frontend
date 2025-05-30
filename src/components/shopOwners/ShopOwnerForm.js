import React, { useState, useEffect } from "react";
import shopOwnerApi from "../../api/shopOwnerApi";
import "./shopOwner.css";

const ShopOwnerForm = ({ shopOwner, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    address: "",
  });

  useEffect(() => {
    if (shopOwner) {
      setFormData({
        name: shopOwner.name || "",
        dob: shopOwner.dob || "",
        address: shopOwner.address || "",
      });
    } else {
      setFormData({ name: "", dob: "", address: "" });
    }
  }, [shopOwner]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (shopOwner && shopOwner.id) {
        await shopOwnerApi.updateShopOwner(shopOwner.id, formData);
      } else {
        await shopOwnerApi.addShopOwner(formData);
      }
      onSubmit();
    } catch (error) {
      console.error("Error saving shop owner:", error);
      alert("Failed to save shop owner. Please try again.");
    }
  };

  return (
    <div className="shopowner-form-overlay">
      <form className="shopowner-form" onSubmit={handleSubmit}>
        <h3>{shopOwner ? "Edit Shop Owner" : "Add Shop Owner"}</h3>

        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            autoFocus
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
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </label>

        <div className="form-buttons">
          <button type="submit">{shopOwner ? "Update" : "Add"}</button>
          <button type="button" onClick={onClose} className="cancel-btn">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShopOwnerForm;
