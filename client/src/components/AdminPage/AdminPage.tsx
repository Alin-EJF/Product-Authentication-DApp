import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import "./AdminPage.css";

export default function AdminPage() {
  const [productReports, setProductReports] = useState([]);
  const [providerReports, setProviderReports] = useState([]);
  const [providerRegistrationRequests, setProviderRegistrationRequests] =
    useState([]);

  const fetchReports = async (reportType) => {
    try {
      const response = await axios.get(`/auth/${reportType}-report`);
      if (reportType === "product") {
        setProductReports(response.data);
      } else if (reportType === "provider") {
        setProviderReports(response.data);
      } else {
        setProviderRegistrationRequests(response.data);
      }
    } catch (error) {
      toast.error(`Failed to fetch ${reportType} reports`);
    }
  };

  useEffect(() => {
    fetchReports("product");
    fetchReports("provider");
    fetchReports("provider-registration");
  }, []);

  return (
    <div style={{ paddingBottom: "6%" }} className="content-container">
      <h1 className="main-header">Admin panel</h1>

      <h2 className="sub-header">Provider Registration Requests</h2>
      {providerRegistrationRequests.map((request) => (
        <div key={request.email} className="report-container">
          <p>Email: {request.email}</p>
          <p>CIF: {request.CIF}</p>
          <p>Trade Register Number: {request.trade_register_number}</p>
          <p>Legal Name: {request.legal_name}</p>
          <p>Phone Number: {request.phone_number}</p>
          <button
            onClick={() =>
              console.log(`Accepting registration request: ${request.email}`)
            }
          >
            Accept
          </button>
        </div>
      ))}

      <h2 className="sub-header">Product Reports</h2>
      {productReports.map((report) => (
        <div key={report.report_id} className="report-container">
          <p>User Email: {report.user_email}</p>
          <p>Report Details: {report.report_details}</p>
          <p>Product ID: {report.product_id}</p>
          <p>Product Name: {report.product_name}</p>
          <p>Manufacturer: {report.manufacturer}</p>
          <button
            onClick={() =>
              console.log(`Taking action on report: ${report.report_id}`)
            }
          >
            Take action
          </button>
        </div>
      ))}

      <h2 className="sub-header">Provider Reports</h2>
      {providerReports.map((report) => (
        <div key={report.report_id} className="report-container">
          <p>User Email: {report.user_email}</p>
          <p>Report Details: {report.report_details}</p>
          <p>Product ID: {report.product_id}</p>
          <p>Product Name: {report.product_name}</p>
          <p>Manufacturer: {report.manufacturer}</p>
          <button
            onClick={() =>
              console.log(`Taking action on report: ${report.report_id}`)
            }
          >
            Take action
          </button>
        </div>
      ))}
    </div>
  );
}
