import React, { useState, useEffect } from "react";
import shopApi from "../../api/shopApi";
import mallApi from "../../api/mallApi";
import shopOwnerApi from "../../api/shopOwnerApi";

const ShopForm = ({ shop, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    shopName: "",
    shopCategory: "",
    customers: "",
    shopStatus: "",
    leaseStatus: "",
    mallId: "",
    shopOwnerId: "",
  });

  const [malls, setMalls] = useState([]);
  const [shopOwners, setShopOwners] = useState([]);

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [mallRes, ownerRes] = await Promise.all([
          mallApi.getAllMalls(),
          shopOwnerApi.getAllShopOwners(),
        ]);
        setMalls(mallRes.data);
        setShopOwners(ownerRes.data);
      } catch (error) {
        console.error("Failed to fetch dropdown data", error);
      }
    };
    fetchDropdowns();
  }, []);

  useEffect(() => {
    if (shop) {
      setFormData({
        shopName: shop.shopName || "",
        shopCategory: shop.shopCategory || "",
        customers: shop.customers || "",
        shopStatus: shop.shopStatus || "",
        leaseStatus: shop.leaseStatus || "",
        mallId: shop.mall?.id || "",
        shopOwnerId: shop.shopOwner?.id || "",
      });
    } else {
      setFormData({
        shopName: "",
        shopCategory: "",
        customers: "",
        shopStatus: "",
        leaseStatus: "",
        mallId: "",
        shopOwnerId: "",
      });
    }
  }, [shop]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      shopName: formData.shopName,
      shopCategory: formData.shopCategory,
      customers: formData.customers,
      shopStatus: formData.shopStatus,
      leaseStatus: formData.leaseStatus,
      mall: formData.mallId ? { id: Number(formData.mallId) } : null,
      shopOwner: formData.shopOwnerId ? { id: Number(formData.shopOwnerId) } : null,
    };

    try {
      if (shop?.shopId) {
        await shopApi.updateShop(shop.shopId, payload);
      } else {
        await shopApi.addShop(payload);
      }
      onSubmit();
    } catch (error) {
      console.error("Error saving shop:", error);
      alert("Failed to save shop. Please check the inputs.");
    }
  };

  return (
    <div className="shop-form-container">
      <h3>{shop ? "Edit Shop" : "Add New Shop"}</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Shop Name:
          <input
            type="text"
            name="shopName"
            value={formData.shopName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Shop Category:
          <input
            type="text"
            name="shopCategory"
            value={formData.shopCategory}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Customers:
          <input
            type="text"
            name="customers"
            value={formData.customers}
            onChange={handleChange}
          />
        </label>

        <label>
          Shop Status:
          <input
            type="text"
            name="shopStatus"
            value={formData.shopStatus}
            onChange={handleChange}
          />
        </label>

        <label>
          Lease Status:
          <input
            type="text"
            name="leaseStatus"
            value={formData.leaseStatus}
            onChange={handleChange}
          />
        </label>

        <label>
          Mall:
          <select name="mallId" value={formData.mallId} onChange={handleChange} required>
            <option value="">Select Mall</option>
            {malls.map((mall) => (
              <option key={mall.id} value={mall.id}>
                {mall.mallName}
              </option>
            ))}
          </select>
        </label>

        <label>
          Shop Owner:
          <select name="shopOwnerId" value={formData.shopOwnerId} onChange={handleChange} required>
            <option value="">Select Shop Owner</option>
            {shopOwners.map((owner) => (
              <option key={owner.id} value={owner.id}>
                {owner.name || owner.ownerName}
              </option>
            ))}
          </select>
        </label>

        <div style={{ marginTop: "1em" }}>
          <button type="submit">{shop ? "Update" : "Add"}</button>
          <button type="button" onClick={onClose} style={{ marginLeft: "1em" }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShopForm;
