import React, { useState, useEffect } from "react";
import axios from "axios";

const ShopList = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/shops"); // Adjust URL as needed
      setShops(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch shops:", err);
      setError("Failed to load shops");
      setLoading(false);
    }
  };

  if (loading) return <p>Loading shops...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Shop List</h2>
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>Shop ID</th>
            <th>Shop Name</th>
            <th>Category</th>
            <th>Shop Owner</th> {/* Show Owner Name */}
            <th>Status</th>
            <th>Lease Status</th>
          </tr>
        </thead>
        <tbody>
          {shops.map((shop) => (
            <tr key={shop.shopId}>
              <td>{shop.shopId}</td>
              <td>{shop.shopName}</td>
              <td>{shop.shopCategory}</td>
              <td>{shop.shopOwner ? shop.shopOwner.name : "No Owner"}</td>
              <td>{shop.shopStatus}</td>
              <td>{shop.leaseStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShopList;
