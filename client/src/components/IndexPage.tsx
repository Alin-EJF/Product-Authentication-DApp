import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import ProviderForm from "./ProviderForm"; // Importing the provider form component. Please create this component.

export default function IndexPage() {
  const { user } = useContext(UserContext);
  const [showForm, setShowForm] = useState(false);

  const handleAddProductClick = () => {
    setShowForm(true);
  };

  return (
    <div>
      <div className="content-container">
        <h1 className="main-header">
          {user?.userType === 2
            ? "Product Registration"
            : "Product Authentication"}
        </h1>
        <h2 className="sub-header">
          {user?.userType === 2 ? "Add new product" : "Type ID or scan QR code"}
        </h2>
        {user?.userType !== 2 && (
          <input
            type="text"
            className="input-field"
            placeholder="Type ID of product"
          />
        )}
        <button
          className="scan-button"
          onClick={user?.userType === 2 ? handleAddProductClick : undefined}
        >
          {user?.userType === 2 ? "Add Product" : "Scan QR"}
        </button>
        {showForm && <ProviderForm />}
      </div>
    </div>
  );
}
