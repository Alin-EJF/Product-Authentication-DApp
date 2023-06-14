export default function About() {
  return (
    <div className="content-container">
      <h1 className="main-header">Welcome to our Product Tracking dApp!</h1>
      <div style={{ marginLeft: "25%", marginRight: "25%" }}>
        <h2>
          Our decentralized application (dApp), a novel solution leveraging
          blockchain technology to authenticate valuable products and combat
          counterfeits. As a consumer, you gain the power to confirm the
          authenticity of a product just by scanning a QR code or an NFC tag
          attached to it. Our dApp provides a detailed history of the product,
          including its manufacturing date, batch, ID, previous owners, and
          more. Manufacturers, Distributors, and Retailers can register as
          providers, making it possible for them to enter product information
          onto the Ethereum blockchain. By utilizing blockchain's immutability
          and transparency, we ensure the information cannot be tampered with,
          thereby establishing trust and authenticity. Experience the
          cutting-edge combination of blockchain, NFC tags, and QR codes to
          secure the authenticity of your products.
        </h2>
        <h2 style={{ marginTop: "15%" }}>
          For more information, feel free to contact us at:
          <span style={{ color: "#0074D9" }}>
            TrackingdApp-support@gmail.com
          </span>
        </h2>
      </div>
    </div>
  );
}
