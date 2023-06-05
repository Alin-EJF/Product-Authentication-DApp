import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { FaSearch, FaQrcode } from "react-icons/fa";
import { contractAbi } from "./Blockchain/productRegAbi";
import { ToastContainer, toast } from "react-toastify";
import { useWeb3 } from "./Blockchain/useWeb3";
import QRCode from "qrcode.react"; // Importing the QRCode component

export default function IndexPage() {
  const { user } = useContext(UserContext);
  const [productId, setProductId] = useState("");
  const [showQR, setShowQR] = useState(false); // Add a new state variable for controlling QR code visibility

  const contractAddress = "0x1c33DE250bBD36B580Ccf4785473F495D861B663";
  const { web3, contract } = useWeb3(contractAbi, contractAddress);

  const handleClick: React.FormEventHandler<HTMLFormElement> = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();
    setShowQR(true); // Show QR code when the button is clicked

    if (!web3 || !contract) {
      alert(
        "Web3 or the contract is not initialized. Please check MetaMask connection."
      );
      return;
    }

    const product = await contract.methods.getProduct(productId).call();
    console.log(product);
    toast.success("Product Found in the blockchain");
  };

  return (
    <div>
      <ToastContainer />
      <div className="content-container">
        <h1 className="main-header">
          {user?.userType === 2
            ? "Check Product Tracking"
            : "Product Authentication"}
        </h1>
        <h2 className="sub-header">Type ID or scan QR code</h2>
        <form
          onSubmit={handleClick}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <input
            type="text"
            className="input-field"
            placeholder="Type ID of product"
            onChange={(e) => setProductId(e.target.value)}
          />
          <button style={{ height: "55px", borderRadius: "0px" }} type="submit">
            <FaSearch />
          </button>
        </form>
        {/* Conditionally render QR code if showQR is true */}
        {showQR && <QRCode value={productId} />}
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
