import { useContext, useRef } from "react";
import { UserContext } from "../../UserContext";
import { FaTimes } from "react-icons/fa";
import { contractAbi } from "../Blockchain/productRegAbi";
import { ToastContainer, toast } from "react-toastify";
import { useWeb3 } from "../Blockchain/useWeb3";
import "./Provider.css";
import { useGeolocation } from "./useGeolocation";

export default function Distributor() {
  const { user } = useContext(UserContext);
  const geoLocation = useGeolocation();

  const abi = contractAbi;
  const contractAddress = "0x1c33DE250bBD36B580Ccf4785473F495D861B663";
  const { web3, contract } = useWeb3(abi, contractAddress);

  return (
    <div>
      <ToastContainer />
      <div className="content-container">
        <h1 className="main-header">Update Product</h1>

        <h3 className="sub-header">
          Keep information about an existing product up to date
        </h3>

        <ProductDialog
          buttonText="Update product"
          geoLocation={geoLocation}
          web3={web3}
          contract={contract}
        />

        <h1 style={{ marginTop: "10%" }} className="main-header">
          Product Registration
        </h1>

        <h3 className="sub-header">
          Add a new product, complete it's data and generate tracking
          information
        </h3>

        <ProductDialog
          buttonText="Add product"
          geoLocation={geoLocation}
          web3={web3}
          contract={contract}
        />
      </div>
    </div>
  );
}

const ProductDialog = ({ buttonText, geoLocation, web3, contract }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        className="generic-button"
        onClick={() => dialogRef?.current?.showModal()}
      >
        {buttonText}
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
          <button className="submit-button" formMethod="dialog" value="submit">
            Submit product
          </button>
        </form>
      </dialog>
    </>
  );
};
