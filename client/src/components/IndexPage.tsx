import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { FaSearch, FaQrcode } from "react-icons/fa";

export default function IndexPage() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <div className="content-container">
        <h1 className="main-header">
          {user?.userType === 2
            ? "Check Product Tracking"
            : "Product Authentication"}
        </h1>
        <h2 className="sub-header">"Type ID or scan QR code"</h2>
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
        <button className="generic-button">
          <>
            <FaQrcode style={{ marginRight: "7px", paddingTop: "2px" }} />
            Scan QR
          </>
        </button>
      </div>
    </div>
  );
}
