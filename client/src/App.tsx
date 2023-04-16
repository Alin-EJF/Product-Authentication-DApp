import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="logo">Logo</div>
        <button className="login-button">Login</button>
      </header>
      <div className="content-container">
        <h1 className="main-header">Product Authentication</h1>
        <h2 className="sub-header">Input ID or scan QR code</h2>
        <input type="text" className="input-field" placeholder="Input ID of product" />
        <button className="scan-button">Scan QR</button>
      </div>
    </div>
  );
}

export default App;
