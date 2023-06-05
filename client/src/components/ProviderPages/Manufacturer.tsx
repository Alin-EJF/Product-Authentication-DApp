import { useContext, useRef, useState, useEffect } from "react";
import { UserContext } from "../../UserContext";
import { FaTimes } from "react-icons/fa";
import { Contract } from "web3-eth-contract";
import { contractAbi } from "../contractsAbi/productRegAbi";
import { ToastContainer, toast } from "react-toastify";
import Web3 from "web3";
import axios from "axios";
import "./Provider.css";

declare global {
  interface Window {
    ethereum: any;
  }
}

export default function Manufacturer() {
  const { user } = useContext(UserContext);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);
  const [geoLocation, setGeoLocation] = useState<string>("");

  const abi = contractAbi;
  const contractAddress = "0x1c33DE250bBD36B580Ccf4785473F495D861B663";

  // Get Geo Location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get(
              `/nominatim/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const address = response.data.address;
            const locationStr = `${
              address.city || address.town || address.village
            }, ${address.country}`;
            setGeoLocation(locationStr);
          } catch (error) {
            console.log(error);
          }
        },
        () => {
          console.log("Unable to retrieve your location");
        }
      );
    } else {
      console.log("Geolocation is not supported by your browser");
    }
  }, []);

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

  // Call initWeb3 when the component mounts
  useEffect(() => {
    initWeb3();
  }, []);

  return (
    <div>
      <ToastContainer />
      <div className="content-container">
        <h1 className="main-header">Product Registration</h1>
        <h3 className="sub-header">
          Add a new product, complete it's data and generate tracking
          information
        </h3>

        <button
          className="generic-button"
          onClick={() => dialogRef?.current?.showModal()}
        >
          Add product
        </button>

        <dialog
          ref={dialogRef}
          onSubmit={async (ev) => {
            ev.preventDefault();
            const formData = new FormData(ev.target as HTMLFormElement);
            if (!web3 || !contract) {
              alert(
                "Web3 or the contract is not initialized. Please check MetaMask connection."
              );
              return;
            }
            try {
              const productName = formData.get("productName")?.toString() || "";
              const productDescription =
                formData.get("productDescription")?.toString() || "";
              const geoLocation = formData.get("geoLocation")?.toString() || "";
              const batch = formData.get("batch")?.toString() || "";
              const price = Number(formData.get("price") || 0);
              const certifications =
                formData.get("certifications")?.toString().split(",") || [];

              const accounts = await web3.eth.getAccounts();

              await contract.methods
                .registerProduct(
                  productName,
                  productDescription,
                  geoLocation,
                  batch,
                  price,
                  certifications
                )
                .send({ from: accounts[0] });
              console.log("Product registered");
              toast.success("Product registered in the blockchain");
              dialogRef?.current?.close();
            } catch (error) {
              if (
                error !== null &&
                typeof error === "object" &&
                "code" in error &&
                error.code === 4001
              ) {
                // User denied transaction signature
                console.log("User denied transaction signature");
                toast.error("User denied transaction signature");
              } else {
                // Handle other errors here
                console.error(error);
              }
            }
          }}
          onClick={(ev) => {
            const target = ev.target as HTMLDialogElement;
            if (target.nodeName === "DIALOG") {
              target.close();
            }
          }}
          onClose={(ev) => {
            const target = ev.target as HTMLDialogElement;
            console.log(target.returnValue);
          }}
        >
          <form method="dialog" className="form-container">
            <button
              className="cancel-button"
              value="cancel"
              onClick={() => dialogRef?.current?.close()}
            >
              <FaTimes />
            </button>
            <h2 className="h2provider"> Add product details</h2>
            <h6 className="h2provider italic-text">
              fields marked with '*'' are compulsory
            </h6>
            <input name="productName" placeholder="Product name  *" />
            <input
              name="productDescription"
              placeholder="Product description  *"
            />
            <input name="batch" placeholder="Batch  *" />
            <input name="price" placeholder="Product price" />
            <input name="certifications" placeholder="Certifications" />
            <input type="hidden" name="geoLocation" value={geoLocation} />
            <button
              className="submit-button"
              formMethod="dialog"
              value="submit"
            >
              Submit product
            </button>
          </form>
        </dialog>
      </div>
    </div>
  );
}
