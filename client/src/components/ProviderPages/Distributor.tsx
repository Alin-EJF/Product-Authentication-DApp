import { useContext, useRef, useState } from "react";
import { UserContext } from "../../UserContext";
import { FaSearch, FaTimes, FaQrcode } from "react-icons/fa";
import { contractAbi, contractAddress } from "../Blockchain/productReg";
import { ToastContainer } from "react-toastify";
import { useWeb3 } from "../Blockchain/useWeb3";
import { handleRegisterSubmit } from "./Manufacturer";
import { handleClick, handleUpdate } from "./Retailer";
import "./Provider.css";
import { useGeolocation } from "./useGeolocation";
import QRCode from "qrcode.react";

function DialogForm({ title, children, dialogRef, onSubmit }) {
  return (
    <dialog
      ref={dialogRef}
      onSubmit={onSubmit}
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
        <h2 className="h2provider"> {title} </h2>
        <h6 className="h2provider italic-text">
          * Location, ownership and date are extracted automatically
        </h6>
        {children}
      </form>
    </dialog>
  );
}

export default function Distributor() {
  const { user } = useContext(UserContext);
  const updateDialogRef = useRef<HTMLDialogElement>(null);
  const registerDialogRef = useRef<HTMLDialogElement>(null);
  const qrDialogRef = useRef<HTMLDialogElement>(null);
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
          onSubmit={(e) =>
            handleClick(e, web3, contract, productId, updateDialogRef)
          }
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

        <DialogForm
          title="Update product fields"
          dialogRef={updateDialogRef}
          onSubmit={(e) =>
            handleUpdate(
              e,
              web3,
              updateDialogRef,
              contract,
              productId,
              geoLocation,
              user.legal_name,
              ""
            )
          }
        >
          <input name="price" placeholder="Current price" />
          <input name="certifications" placeholder="Certifications" />
          <input type="hidden" name="geoLocation" value={geoLocation} />
          <button className="submit-button" formMethod="dialog" value="submit">
            Update product
          </button>
        </DialogForm>

        <h1 className="main-header">Product Registration</h1>
        <h3 className="sub-header">
          Add a new product, complete it's data and generate tracking
          information
        </h3>

        <button
          className="generic-button"
          style={{ marginBottom: "20%" }}
          onClick={() => registerDialogRef?.current?.showModal()}
        >
          Add product
        </button>

        <DialogForm
          title="Add product details"
          dialogRef={registerDialogRef}
          onSubmit={(ev) =>
            handleRegisterSubmit(
              ev,
              web3,
              contract,
              setProductId,
              qrDialogRef,
              user.legal_name,
              user.legal_name,
              "N/A"
            )
          }
        >
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
        </DialogForm>

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
                size={250}
              />
            )}
            <button onClick={() => qrDialogRef?.current?.close()}>Close</button>
          </div>
        </dialog>
      </div>
    </div>
  );
}
