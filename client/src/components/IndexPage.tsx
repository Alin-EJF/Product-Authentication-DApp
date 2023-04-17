import { Link } from "react-router-dom";

export default function IndexPage() {
  return (
    <div className="app">
      <header className="header">
        <div className="logo">Logo</div>
        <Link to={"/login"} className="login-button">
          Login
        </Link>
      </header>
      <div className="content-container">
        <h1 className="main-header">Product Authentication</h1>
        <h2 className="sub-header">Input ID or scan QR code</h2>
        <input
          type="text"
          className="input-field"
          placeholder="Input ID of product"
        />
        <button className="scan-button">Scan QR</button>
      </div>
    </div>
  );
}
