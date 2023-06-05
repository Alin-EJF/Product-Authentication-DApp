import { useContext, useRef } from "react";
import { UserContext } from "../../UserContext";
import { FaTimes } from "react-icons/fa";
import "./Provider.css";

export default function Retailer() {
  const { user } = useContext(UserContext);
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <div>
      <div className="content-container">
        <h1 className="main-header">Update Product</h1>
        <h3 className="sub-header">
          Keep information about an existing product up to date
        </h3>

        <button
          className="generic-button"
          onClick={() => dialogRef?.current?.showModal()}
        >
          Update product
        </button>

        <dialog
          ref={dialogRef}
          onSubmit={(ev) => {
            const formData = new FormData(ev.target as HTMLFormElement);
            console.log(formData.get("productOrigin"));
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

            <h2 className="h2provider"> Modify product details</h2>
            <input name="productOrigin" placeholder="Product Origin" />
            <input name="manufacturingDate" placeholder="Manufacturing Date" />
            <input name="batchNumber" placeholder="Batch Number" />
            <input
              name="supplyChainJourney"
              placeholder="Supply Chain Journey"
            />
            <input name="storageConditions" placeholder="Storage Conditions" />
            <input
              name="productSpecifications"
              placeholder="Product Specifications"
            />
            <input name="certifications" placeholder="Certifications" />
            <input
              name="thirdPartyTestResults"
              placeholder="Third-Party Test Results"
            />
            <input name="sellerInformation" placeholder="Seller Information" />
            <input
              name="productOwnershipHistory"
              placeholder="Product Ownership History"
            />

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
