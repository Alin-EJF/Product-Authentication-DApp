import { useContext, useRef, useState } from "react";
import { UserContext } from "../../UserContext";
import { FaSearch, FaTimes, FaQrcode } from "react-icons/fa";
import { contractAbi, contractAddress } from "../Blockchain/productReg";
import { ToastContainer, toast } from "react-toastify";
import { useWeb3, decodeStringId } from "../Blockchain/useWeb3";
import "./Provider.css";
import { useGeolocation } from "./useGeolocation";

export async function handleClick(
  e: React.FormEvent,
  web3: any,
  contract: any,
  productId: any,
  dialogRef: any
) {
  e.preventDefault();

  if (!web3 || !contract) {
    alert(
      "Web3 or the contract is not initialized. Please check MetaMask connection."
    );
    return;
  }

  try {
    const product = await contract.methods
      .getProduct(decodeStringId(productId))
      .call();
    if (product != null) {
      toast.success("Product Found in the blockchain");
      dialogRef?.current?.showModal();
    }
  } catch (error) {
    toast.error("Product not found in the blockchain");
  }
}

export async function handleUpdate(
  e: React.FormEvent,
  web3: any,
  dialogRef: any,
  contract: any,
  productId: any,
  geoLocation: any,
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
    const price = Number(formData.get("price") || 0);
    const certification = formData.get("certifications")?.toString() || "";

    const accounts = await web3.eth.getAccounts();
    productId = decodeStringId(productId);

    await contract.methods
      .updateProduct(
        productId,
        geoLocation,
        price,
        certification,
        distributor,
        retailer
      )
      .send({ from: accounts[0] })
      .on("receipt", (receipt: any) => {
        console.log("Product updated");
        toast.success("Product updated in the blockchain");
        dialogRef?.current?.close();
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
      console.error(error);
    }
  }
}

export default function Retailer() {
  const { user } = useContext(UserContext);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const geoLocation = useGeolocation();

  const [productId, setProductId] = useState(null);

  const abi = contractAbi;
  const { web3, contract } = useWeb3(abi, contractAddress);

  return (
    <div>
      <ToastContainer />
      <div className="content-container">
        <h1 className="main-header">Update Product</h1>
        <h3 className="sub-header">
          Maintain accurate details of an existing product by updating the
          information about its location, the current owner, and the date of
          ownership.
        </h3>
        <h3 className="sub-header">
          You may also optionally adjust the current price and update its
          certificates, if applicable.
        </h3>
        <form
          onSubmit={(e) => handleClick(e, web3, contract, productId, dialogRef)}
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
          <FaQrcode style={{ marginRight: "7px", paddingTop: "2px" }} />
          Scan QR
        </button>

        <dialog
          ref={dialogRef}
          onSubmit={(e) =>
            handleUpdate(
              e,
              web3,
              dialogRef,
              contract,
              productId,
              geoLocation,
              "",
              user.legal_name
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
            <h2 className="h2provider"> Update product fields</h2>
            <h6 className="h2provider italic-text">
              fields marked with '*' are compulsory
            </h6>

            <input name="price" placeholder="Current price" />
            <input name="certifications" placeholder="Certifications" />
            <button
              className="submit-button"
              formMethod="dialog"
              value="submit"
            >
              Update product
            </button>
          </form>
        </dialog>
      </div>
    </div>
  );
}
