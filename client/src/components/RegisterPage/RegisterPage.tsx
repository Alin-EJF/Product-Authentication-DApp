import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./RegisterPage.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState(1);
  const [CIF, setCIF] = useState("");
  const [tradeRegisterNumber, setTradeRegisterNumber] = useState("");
  const [legalNameOfTheCompany, setLegalNameOfTheCompany] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const fileSelectHandler = (event: any) => {
    setSelectedFile(event.target.files[0].name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    axios
      .post("/auth/register", {
        email: email,
        password: password,
        userType: userType,
        CIF: CIF,
        trade_register_number: tradeRegisterNumber,
        legal_name: legalNameOfTheCompany,
        phone_number: phoneNumber,
      })
      .then((response) => {
        console.log(response.data);
        toast.success("Registration successful! You can now login.");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Registration failed. Please try again.");
      });
  };

  return (
    <div>
      <ToastContainer />
      <div className="content-container">
        <h1 className="main-header">Register</h1>
        <div className={styles.toggle_container}>
          <button
            className={userType === 1 ? styles.active : ""}
            onClick={() => setUserType(1)}
          >
            Register as User
          </button>
          <button
            className={userType === 2 ? styles.active : ""}
            onClick={() => setUserType(2)}
          >
            Register as Provider
          </button>
        </div>
        <p className="note">Fields marked with * are compulsory</p>
        <form onSubmit={handleSubmit} className="form-container">
          <label htmlFor="email">Email*</label>
          <input
            type="email"
            id="email"
            className="input-field"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Password*</label>
          <input
            type="password"
            id="password"
            className="input-field"
            placeholder="password123"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="confirmPassword">Confirm Password*</label>
          <input
            type="password"
            id="confirmPassword"
            className="input-field"
            placeholder="password123"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {userType === 2 && (
            <>
              <label htmlFor="CIF">CIF*</label>
              <input
                type="text"
                id="CIF"
                className="input-field"
                placeholder="RO12345678"
                value={CIF}
                onChange={(e) => setCIF(e.target.value)}
                required
              />
              <label htmlFor="tradeRegisterNumber">
                Trade Register Number*
              </label>
              <input
                type="text"
                id="tradeRegisterNumber"
                className="input-field"
                placeholder="J40/372/2002"
                value={tradeRegisterNumber}
                onChange={(e) => setTradeRegisterNumber(e.target.value)}
                required
              />
              <label htmlFor="legalNameOfTheCompany">
                Legal Name of the Company*
              </label>
              <input
                type="text"
                id="legalNameOfTheCompany"
                className="input-field"
                placeholder="Blue Ribbon Sports, Inc."
                value={legalNameOfTheCompany}
                onChange={(e) => setLegalNameOfTheCompany(e.target.value)}
                required
              />
              <label htmlFor="phoneNumber">Phone Number*</label>
              <input
                type="tel"
                id="phoneNumber"
                className="input-field"
                placeholder="+40-0751-123-123"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
              <label htmlFor="fileUpload">Upload Company's certificate*</label>
              <input
                type="file"
                id="fileUpload"
                className="input-field"
                onChange={fileSelectHandler}
                required
              />
              {selectedFile && <p>File selected: {selectedFile}</p>}
            </>
          )}
          <button className="generic-button" type="submit">
            Register
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <Link to="/login" className="login-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
