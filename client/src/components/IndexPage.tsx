export default function IndexPage() {
  return (
    <div>
      <div className="content-container">
        <h1 className="main-header">Product Authentication</h1>
        <h2 className="sub-header">Type ID or scan QR code</h2>
        <input
          type="text"
          className="input-field"
          placeholder="Type ID of product"
        />
        <button className="scan-button">Scan QR</button>
      </div>
    </div>
  );
}
