import { useContext, useState, useEffect } from "react";
import { UserContext } from "../UserContext";
import { FaSearch, FaQrcode } from "react-icons/fa";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { contractAbi } from "./contractsAbi/productRegAbi";
import { ToastContainer, toast } from "react-toastify";

declare global {
  interface Window {
    ethereum: any;
  }
}

export default function IndexPage() {
  const { user } = useContext(UserContext);
  const [productId, setProductId] = useState("");
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);

  // Contract setup
  const abi = contractAbi;
  const contractAddress = "0x1c33DE250bBD36B580Ccf4785473F495D861B663";

  // This function initializes web3 and the contract instance
  async function initWeb3() {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
      } catch (err) {
        console.log("User cancelled");
        console.log(err);
      }
      const contractInstance = new web3Instance.eth.Contract(
        abi,
        contractAddress
      );
      setWeb3(web3Instance);
      setContract(contractInstance);
    } else {
      alert("Please install MetaMask to use this dApp!");
    }
  }

  // This function handles the button click event
  const handleClick: React.MouseEventHandler = async (e: React.FormEvent) => {
    e.preventDefault();
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

  // Call initWeb3 when the component mounts
  useEffect(() => {
    initWeb3();
  }, []);

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
