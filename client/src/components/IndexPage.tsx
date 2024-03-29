import { useContext, useState, useRef, useEffect } from "react";
import { UserContext } from "../UserContext";
import { FaSearch, FaTimes, FaQrcode } from "react-icons/fa";
import { contractAbi, contractAddress } from "./Blockchain/productReg";
import { ToastContainer, toast } from "react-toastify";
import {
  useWeb3,
  encodeIdToBase36,
  decodeStringId,
} from "./Blockchain/useWeb3";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

type ProductData = {
  id: string;
  Name: string;
  Description: string;
  "Date of registration": number;
  "Location of registration": string;
  "Locations of updates": string[];
  "Date of update": number;
  Batch: string;
  "Price history": number[];
  "Certification/s": string[];
  Manufacturer: string;
  Distributor: string;
  Retailer: string;
  "Owner/s": string[];
} | null;

enum ReportType {
  Provider = "provider-report",
  Product = "product-report",
}

export default function IndexPage() {
  const { user } = useContext(UserContext);
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState<ProductData>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [reportDetails, setReportDetails] = useState("");
  const reportDialogRef = useRef<HTMLDialogElement>(null);
  const [reportType, setReportType] = useState<ReportType>(ReportType.Provider);

  const { web3, contract } = useWeb3(contractAbi, contractAddress);

  const navigate = useNavigate();
  const params = useParams();

  const fetchProductData = async (id: string) => {
    try {
      const product = await contract.methods
        .getProduct(decodeStringId(id))
        .call();

      const productMapped = {
        id: encodeIdToBase36(product[0]),
        Name: product[1],
        Description: product[2],
        "Date of registration": new Date(product[3] * 1000).toLocaleString(),
        "Location of registration": product[4],
        "Locations of updates": product[5].length > 0 ? product[5] : null,
        "Date of update":
          product[6] > 0 ? new Date(product[6] * 1000).toLocaleString() : null,
        Batch: product[7],
        "Price history": product[8],
        "Certification/s": product[9],
        Manufacturer: product[10],
        Distributor: product[11],
        Retailer: product[12],
        "Owner/s addresses": product[13],
      };

      setProduct(productMapped);
      toast.success("Product Found in the blockchain");
      dialogRef?.current?.showModal();
    } catch (error) {
      toast.error("Product not found in the blockchain");
      navigate("/");
    }
  };

  useEffect(() => {
    if (params.id && web3 && contract) {
      fetchProductData(params.id);
    }
  }, [params.id, web3, contract, navigate]);

  const handleReportProduct = (type: ReportType) => {
    setReportType(type);
    reportDialogRef?.current?.showModal();
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (web3 && contract) {
      fetchProductData(productId);
    }
  };

  const handleAddOwner = async () => {
    if (!web3 || !contract) {
      alert(
        "Web3 or the contract is not initialized. Please check MetaMask connection."
      );
      return;
    }

    try {
      const accounts = await web3.eth.getAccounts();

      await contract.methods
        .addOwner(decodeStringId(productId))
        .send({ from: accounts[0] });
      toast.success("Successfully added as an owner");
    } catch (error) {
      toast.error("An error occurred while adding as an owner");
    }
  };

  const submitReport = async () => {
    if (!product) {
      toast.error("No product data available to submit a report.");
      return;
    }

    try {
      await axios.post("/auth/product-report", {
        email: user?.email,
        reportDetails: reportDetails,
        reportType: reportType,
        productId: product.id,
        productName: product.Name,
        manufacturer: product.Manufacturer,
      });

      toast.success("Report successfully submitted");
    } catch (error) {
      toast.error("An error occurred while submitting the report");
    }

    reportDialogRef?.current?.close();
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
          onSubmit={handleSearch}
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
                Object.entries(product).map(([key, value]) =>
                  value !== null ? (
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
                  ) : null
                )}
            </div>

            {user?.userType === 1 && (
              <>
                <button
                  className="submit-button"
                  formMethod="dialog"
                  value="submit"
                  onClick={handleAddOwner}
                >
                  Add me as owner
                </button>
                <button
                  className="submit-button"
                  formMethod="dialog"
                  value="submit"
                  onClick={() => handleReportProduct(ReportType.Provider)}
                >
                  Report provider
                </button>
                <button
                  className="submit-button"
                  formMethod="dialog"
                  value="submit"
                  onClick={() => handleReportProduct(ReportType.Product)}
                >
                  Report product
                </button>
              </>
            )}
          </form>
        </dialog>

        <dialog
          ref={reportDialogRef}
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
              onClick={() => reportDialogRef?.current?.close()}
            >
              <FaTimes />
            </button>

            <h2 className="h2provider">
              Add details about{" "}
              {reportType === ReportType.Provider ? "provider" : "product"}{" "}
              report
            </h2>
            <textarea
              style={{ width: "80%", height: "90px" }}
              onChange={(e) => setReportDetails(e.target.value)}
            />

            <button
              className="submit-button"
              formMethod="dialog"
              value="submit"
              onClick={submitReport}
            >
              Submit Report
            </button>
          </form>
        </dialog>
      </div>
    </div>
  );
}
