import React, { useState } from "react";
import "./common.css";

export default function Navbar({ onNavigate }) {
  const [active, setActive] = useState("users");

  const handleClick = (section) => {
    setActive(section);
    onNavigate(section);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">Mall Admin Panel</div>
      <ul className="navbar-menu">
        <li
          className={active === "users" ? "active" : ""}
          onClick={() => handleClick("users")}
        >
          Users
        </li>
        <li
          className={active === "shopowners" ? "active" : ""}
          onClick={() => handleClick("shopowners")}
        >
          Shop Owners
        </li>
        <li
          className={active === "shops" ? "active" : ""}
          onClick={() => handleClick("shops")}
        >
          Shops
        </li>
        <li
          className={active === "orderdetails" ? "active" : ""}
          onClick={() => handleClick("orderdetails")}
        >
          Orders
        </li>
        <li
          className={active === "malls" ? "active" : ""}
          onClick={() => handleClick("malls")}
        >
          Malls
        </li>
        <li
          className={active === "malladmins" ? "active" : ""}
          onClick={() => handleClick("malladmins")}
        >
          Mall Admins
        </li>
        <li
          className={active === "items" ? "active" : ""}
          onClick={() => handleClick("items")}
        >
          Items
        </li>
        <li
          className={active === "employees" ? "active" : ""}
          onClick={() => handleClick("employees")}
        >
          Employees
        </li>
        <li
          className={active === "customers" ? "active" : ""}
          onClick={() => handleClick("customers")}
        >
          Customers
        </li>
      </ul>
    </nav>
  );
}
