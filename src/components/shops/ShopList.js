import React, { useEffect, useState } from "react";
import shopApi from "../../api/shopApi";
import ShopForm from "./ShopForm";
import "./shop.css";

const ShopList = () => {
  const [shops, setShops] = useState([]);
  const [editingShop, setEditingShop] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchShops = async () => {
    try {
      const response = await shopApi.getAllShops();
      setShops(response.data);
    } catch (error) {
      console.error("Failed to fetch shops:", error);
    }
  };

  useEffect(() => {
    fetchShops();
  }, []);

  const handleEdit = (shop) => {
    setEditingShop(shop);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this shop?")) {
      try {
        await shopApi.deleteShop(id);
        fetchShops();
      } catch (error) {
        console.error("Failed to delete shop:", error);
      }
    }
  };

  const handleFormClose = () => {
    setEditingShop(null);
    setShowForm(false);
  };

  const handleFormSubmit = () => {
    fetchShops();
    handleFormClose();
  };

  return (
    <div className="shop-container">
      <h2>Shop List</h2>
      <button
        onClick={() => {
          setEditingShop(null);
          setShowForm(true);
        }}
      >
        Add Shop
      </button>

      {showForm && (
        <ShopForm
          shop={editingShop}
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
        />
      )}

      <table className="shop-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Shop Name</th>
            <th>Category</th>
            <th>Customers</th>
            <th>Status</th>
            <th>Lease Status</th>
            <th>Shop Owner</th>
            <th>Mall</th>
            <th>Employees</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {shops.length === 0 ? (
            <tr>
              <td colSpan="10">No shops found.</td>
            </tr>
          ) : (
            shops.map((shop) => {
              const {
                shopId,
                shopName,
                shopCategory,
                customers,
                shopStatus,
                leaseStatus,
                shopOwner,
                mall,
                shopEmployees,
              } = shop;

              const employeeNames =
                Array.isArray(shopEmployees) && shopEmployees.length > 0
                  ? shopEmployees
                      .map(
                        (emp) =>
                          emp?.name || emp?.employeeName || `#${emp?.employeeId || "Unknown"}`
                      )
                      .join(", ")
                  : "N/A";

              const ownerName = shopOwner
                ? shopOwner.name || shopOwner.ownerName || `#${shopOwner.shopOwnerId || "Unknown"}`
                : "N/A";

              const mallName = mall
                ? mall.mallName || mall.name || `#${mall.mallId || "Unknown"}`
                : "N/A";

              return (
                <tr key={shopId}>
                  <td>{shopId}</td>
                  <td>{shopName}</td>
                  <td>{shopCategory}</td>
                  <td>{customers}</td>
                  <td>{shopStatus}</td>
                  <td>{leaseStatus}</td>
                  <td>{ownerName}</td>
                  <td>{mallName}</td>
                  <td>{employeeNames}</td>
                  <td>
                    <button onClick={() => handleEdit(shop)}>Edit</button>
                    <button
                      onClick={() => handleDelete(shopId)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ShopList;
