import { useContext, useRef, useState } from "react";
import axios from "axios";
import { UserContext } from "../../UserContext";
import { FaTimes } from "react-icons/fa";
import { contractAbi, contractAddress } from "../Blockchain/productReg";
import { ToastContainer, toast } from "react-toastify";
import { useWeb3 } from "../Blockchain/useWeb3";
import "./Provider.css";
import { useGeolocation } from "./useGeolocation";
import QRCode from "qrcode.react";

async function writeNfc(productId: string) {
  try {
    const res = await axios.post("/auth/write-nfc", { productId });
    console.log("NFC write response: ", res.data);
  } catch (err) {
    console.error("Error writing NFC: ", err);
  }
}

export async function handleRegisterSubmit(
  e: React.FormEvent,
  web3: any,
  contract: any,
  setProductId: any,
  qrDialogRef: any,
  manufacturer: any,
  distributor: any,
  retailer: any
) {
  e.preventDefault();

  const formData = new FormData(e.target as HTMLFormElement);
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
    const certification = formData.get("certifications")?.toString() || "";

    const accounts = await web3.eth.getAccounts();

    await contract.methods
      .registerProduct(
        productName,
        productDescription,
        geoLocation,
        batch,
        price,
        certification,
        manufacturer,
        distributor,
        retailer
      )
      .send({ from: accounts[0] })
      .on("receipt", (receipt: any) => {
        console.log("Product registered");
        toast.success("Product registered in the blockchain");

        // Extract the id
        let Id = receipt.events.ProductRegistered.returnValues[0];
        console.log("Product Id is: ", Id);
        setProductId(Id);
        qrDialogRef.current.showModal();

        // Send productId to backend to be written to NFC
        //writeNfc(productId);
      })
      .on("error", (error: any) => {
        console.error(error);
      });
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
}

export default function Manufacturer() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const qrDialogRef = useRef<HTMLDialogElement>(null);
  const geoLocation = useGeolocation();
  const { user } = useContext(UserContext);

  const [productId, setProductId] = useState(null);

  const abi = contractAbi;
  const { web3, contract } = useWeb3(abi, contractAddress);

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
          onSubmit={(ev) =>
            handleRegisterSubmit(
              ev,
              web3,
              contract,
              setProductId,
              qrDialogRef,
              user.legal_name,
              "N/A",
              "N/A"
            )
          }
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
              type="button"
              className="cancel-button"
              value="cancel"
              onClick={() => dialogRef?.current?.close()}
            >
              <FaTimes />
            </button>
            <h2 className="h2provider"> Add product details</h2>
            <h6 className="h2provider">
              fields marked with ' * ', are compulsory
            </h6>
            <h6 style={{ marginLeft: "7%" }} className="h2provider italic-text">
              location, company name, ownership and date are automatically
              extracted
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

        <dialog
          className="qrDialog"
          ref={qrDialogRef}
          onClose={() => qrDialogRef?.current?.close()}
        >
          <div className="form-container">
            <h2 className="h2provider">Product Id from blockchain</h2>
            {productId && (
              <QRCode
                style={{ marginBottom: "7%", marginTop: "7%" }}
                value={productId}
                size={350}
              />
            )}
            <button onClick={() => qrDialogRef?.current?.close()}>Close</button>
          </div>
        </dialog>
      </div>
    </div>
  );
}
