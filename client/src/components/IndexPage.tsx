import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../UserContext";
import { FaSearch, FaQrcode } from "react-icons/fa";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";

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

  // Contract setup. Replace these with your actual ABI and contract address
  const abi = [
    {
      inputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "string",
          name: "productName",
          type: "string",
        },
        {
          indexed: false,
          internalType: "string",
          name: "productDescription",
          type: "string",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "dateOfRegistration",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "string",
          name: "geoLocation",
          type: "string",
        },
        {
          indexed: false,
          internalType: "string",
          name: "batch",
          type: "string",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "price",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "string[]",
          name: "certifications",
          type: "string[]",
        },
      ],
      name: "ProductRegistered",
      type: "event",
    },
    {
      constant: true,
      inputs: [],
      name: "productCount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "products",
      outputs: [
        {
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "productName",
          type: "string",
        },
        {
          internalType: "string",
          name: "productDescription",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "dateOfRegistration",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "geoLocation",
          type: "string",
        },
        {
          internalType: "string",
          name: "batch",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "price",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "isRegistered",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "string",
          name: "productName",
          type: "string",
        },
        {
          internalType: "string",
          name: "productDescription",
          type: "string",
        },
        {
          internalType: "string",
          name: "geoLocation",
          type: "string",
        },
        {
          internalType: "string",
          name: "batch",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "price",
          type: "uint256",
        },
        {
          internalType: "string[]",
          name: "certifications",
          type: "string[]",
        },
      ],
      name: "registerProduct",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
      ],
      name: "getProduct",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "productName",
              type: "string",
            },
            {
              internalType: "string",
              name: "productDescription",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "dateOfRegistration",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "geoLocation",
              type: "string",
            },
            {
              internalType: "string",
              name: "batch",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "price",
              type: "uint256",
            },
            {
              internalType: "string[]",
              name: "certifications",
              type: "string[]",
            },
            {
              internalType: "bool",
              name: "isRegistered",
              type: "bool",
            },
          ],
          internalType: "struct ProductRegistration.Product",
          name: "",
          type: "tuple",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
  ];
  const contractAddress = "0xB8fEc61fC3b97aA92B72A21434f1858815C25d43";

  // This function initializes web3 and the contract instance
  async function initWeb3() {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      await window.ethereum.enable();
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
  async function handleClick() {
    if (!web3 || !contract) {
      alert(
        "Web3 or the contract is not initialized. Please check MetaMask connection."
      );
      return;
    }

    const product = await contract.methods.getProduct(productId).call();
    console.log(product);
  }

  // Call initWeb3 when the component mounts
  useEffect(() => {
    initWeb3();
  }, []);

  return (
    <div>
      <div className="content-container">
        <h1 className="main-header">
          {user?.userType === 2
            ? "Check Product Tracking"
            : "Product Authentication"}
        </h1>
        <h2 className="sub-header">Type ID or scan QR code</h2>
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
            onChange={(e) => setProductId(e.target.value)}
          />
          <button
            style={{ height: "55px", borderRadius: "0px" }}
            onClick={handleClick}
          >
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
