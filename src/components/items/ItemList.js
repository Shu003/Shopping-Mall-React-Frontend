import React, { useEffect, useState } from "react";
import itemApi from "../../api/itemApi";
import ItemForm from "./ItemForm";
import "./item.css";

export default function ItemList() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchItems = () => {
    itemApi
      .getAllItems()
      .then((res) => setItems(res.data))
      .catch(() => alert("Failed to load items"));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this item?")) {
      itemApi
        .deleteItem(id)
        .then(fetchItems)
        .catch(() => alert("Failed to delete item"));
    }
  };

  const handleAdd = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    fetchItems();
  };

  return (
    <div className="item-container">
      <h2>Items</h2>
      <button onClick={handleAdd}>Add New Item</button>

      {showForm && <ItemForm item={editingItem} onClose={handleFormClose} />}

      <table className="item-table">
        <thead>
          <tr>
            <th>Item ID</th>
            <th>Name</th>
            <th>Manufacturing Date</th>
            <th>Expiry Date</th>
            <th>Price</th>
            <th>Category</th>
            <th>Shop</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan="8">No items found.</td>
            </tr>
          ) : (
            items.map((item) => {
              const {
                id,
                name,
                manufacturing,
                expiry,
                price,
                category,
                shop,
              } = item;

              // Flexible and readable fallback logic for shop name
const shopName =
  shop && (shop.shopName || shop.name || shop.id)
    ? shop.shopName || shop.name || `Shop #${shop.id}`
    : item.shopId
    ? `Shop #${item.shopId}`
    : "N/A";


              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{manufacturing || "N/A"}</td>
                  <td>{expiry || "N/A"}</td>
                  <td>{price}</td>
                  <td>{category || "N/A"}</td>
                  <td>{shopName}</td>
                  <td>
                    <button onClick={() => handleEdit(item)}>Edit</button>
                    <button
                      onClick={() => handleDelete(id)}
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
}
