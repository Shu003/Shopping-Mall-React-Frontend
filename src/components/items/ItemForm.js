import React, { useState, useEffect } from "react";
import itemApi from "../../api/itemApi";
import shopApi from "../../api/shopApi"; // Proper naming: it's for shops/malls
import "./item.css";

export default function ItemForm({ item, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    manufacturing: "",
    expiry: "",
    price: "",
    category: "",
    shopId: "",
  });

  const [shops, setShops] = useState([]);

  // Load all shops for dropdown
  useEffect(() => {
    shopApi
      .getAllShops()
      .then((res) => setShops(res.data))
      .catch(() => alert("Failed to load shops"));
  }, []);

  // Populate form if editing
  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || "",
        manufacturing: item.manufacturing || "",
        expiry: item.expiry || "",
        price: item.price || "",
        category: item.category || "",
        shopId: item.shop ? item.shop.id : "",
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.shopId) {
      alert("Please fill all required fields: Name, Price, and Shop.");
      return;
    }

    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      shop: { id: formData.shopId },
    };

    delete payload.shopId;

    const request = item
      ? itemApi.updateItem(item.id, payload)
      : itemApi.addItem(payload);

    request
      .then(() => {
        alert(`Item ${item ? "updated" : "added"} successfully.`);
        onClose();
      })
      .catch(() => alert(`Failed to ${item ? "update" : "add"} item.`));
  };

  return (
    <div className="form-container">
      <h3>{item ? "Edit Item" : "Add New Item"}</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Name*:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Manufacturing Date:
          <input
            type="date"
            name="manufacturing"
            value={formData.manufacturing}
            onChange={handleChange}
          />
        </label>

        <label>
          Expiry Date:
          <input
            type="date"
            name="expiry"
            value={formData.expiry}
            onChange={handleChange}
          />
        </label>

        <label>
          Price*:
          <input
            type="number"
            step="0.01"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Category:
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </label>

        <label>
          Shop*:
          <select
            name="shopId"
            value={formData.shopId}
            onChange={handleChange}
            required
          >
            <option value="">Select Shop</option>
            {shops.map((shop) => (
              <option key={shop.id || shop.shopId} value={shop.id || shop.shopId}>
                {shop.shopName || shop.name || `Shop #${shop.id || shop.shopId}`}
              </option>
            ))}
          </select>
        </label>

        <div className="form-buttons">
          <button type="submit">{item ? "Update" : "Add"}</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
