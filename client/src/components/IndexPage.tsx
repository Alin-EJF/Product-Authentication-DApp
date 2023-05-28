import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import ProviderForm from "./ProviderForm"; // Importing the provider form component. Please create this component.
import { FaSearch, FaQrcode } from "react-icons/fa"; // Font Awesome icons

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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <input
              type="text"
              className="input-field"
              placeholder="Type ID of product"
            />
            <button style={{ height: "55px", borderRadius: "0px" }}>
              <FaSearch />
            </button>
          </div>
        )}
        <button
          className="generic-button"
          onClick={user?.userType === 2 ? handleAddProductClick : undefined}
        >
          {user?.userType === 2 ? (
            <>Add Product</>
          ) : (
            <>
              <FaQrcode style={{ marginRight: "7px", paddingTop: "2px" }} />
              Scan QR
            </>
          )}
        </button>
        {showForm && <ProviderForm />}
      </div>
    </div>
  );
}
