import { useContext, useState, useRef } from "react";
import { UserContext } from "../UserContext";
import { FaSearch, FaTimes, FaQrcode } from "react-icons/fa";
import { contractAbi, contractAddress } from "./Blockchain/productReg";
import { ToastContainer, toast } from "react-toastify";
import { useWeb3 } from "./Blockchain/useWeb3";

type ProductData = {
  id: string;
  Name: string;
  Description: string;
  "Date of registration": number;
  "Location of registration": string;
  Batch: string;
  "Price history": number[];
  "Certification/s": string[];
  Manufacturer: string;
  Distributor: string;
  Retailer: string;
  "Owner/s": string[];
} | null;

export default function IndexPage() {
  const { user } = useContext(UserContext);
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState<ProductData>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const { web3, contract } = useWeb3(contractAbi, contractAddress);

  const handleClick: React.FormEventHandler<HTMLFormElement> = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!web3 || !contract) {
      alert(
        "Web3 or the contract is not initialized. Please check MetaMask connection."
      );
      return;
    }

    try {
      const product = await contract.methods.getProduct(productId).call();

      const productMapped = {
        id: product[0],
        Name: product[1],
        Description: product[2],
        "Date of registration": new Date(product[3] * 1000).toLocaleString(),
        "Location of registration": product[4],
        Batch: product[5],
        "Price history": product[6], // Now an array
        "Certification/s": product[7],
        Manufacturer: product[8],
        Distributor: product[9],
        Retailer: product[10],
        "Owner/s addresses": product[11],
      };
      setProduct(productMapped);
      toast.success("Product Found in the blockchain");
      dialogRef?.current?.showModal();
    } catch (error) {
      toast.error("Product not found in the blockchain");
    }
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
        <button className="generic-button">
          <FaQrcode style={{ marginRight: "7px", paddingTop: "2px" }} />
          Scan QR
        </button>

        <dialog
          ref={dialogRef}
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

            <h2 className="h2provider">Product details</h2>
            <div className="product-details">
              {product &&
                Object.entries(product).map(([key, value]) => (
                  <div key={key} className="key-value-container">
                    <div className="key" style={{ color: "white" }}>
                      <strong>{key}:</strong>
                    </div>
                    <div
                      className="value"
                      style={{
                        color: "limegreen",
                        wordWrap: "break-word",
                        maxWidth: "400px",
                      }}
                    >
                      {Array.isArray(value) ? value.join(", ") : value}
                    </div>
                  </div>
                ))}
            </div>

            {user?.userType === 1 && (
              <button
                className="submit-button"
                formMethod="dialog"
                value="submit"
              >
                Add owner
              </button>
            )}
          </form>
        </dialog>
      </div>
    </div>
  );
}
