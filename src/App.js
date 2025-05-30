import React, { useState } from "react";

import Navbar from "./components/common/Navbar";

import UserList from "./components/users/UserList";
import ShopOwnerList from "./components/shopOwners/ShopOwnerList";
import ShopList from "./components/shops/ShopList";
import OrderDetailsList from "./components/orderDetails/OrderDetailsList";
import CustomerList from "./components/customers/CustomerList";
import EmployeeList from "./components/employees/EmployeeList";
import MallList from "./components/malls/MallList";
import ItemList from "./components/items/ItemList";
import MallAdminList from "./components/mallAdmins/MallAdminList";

function App() {
  const [section, setSection] = useState("users");

  const renderSection = () => {
    switch (section) {
      case "users":
        return <UserList />;
      case "shopowners":
        return <ShopOwnerList />;
      case "shops":
        return <ShopList />;
      case "orderdetails":
        return <OrderDetailsList />;
      case "customers":
        return <CustomerList />;
      case "employees":
        return <EmployeeList />;
      case "malls":
        return <MallList />;
      case "items":
        return <ItemList />;
      case "malladmins":
        return <MallAdminList />;
      default:
        return <div>Select a section from the menu</div>;
    }
  };

  return (
    <div className="App">
      <Navbar onNavigate={setSection} />
      <div style={{ padding: "20px" }}>
        {renderSection()}
      </div>
    </div>
  );
}

export default App;
