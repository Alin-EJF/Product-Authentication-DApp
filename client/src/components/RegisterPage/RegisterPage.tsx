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
  const [numarulRegistrulComertului, setNumarulRegistrulComertului] =
    useState("");
  const [denumireaLegala, setDenumireaLegala] = useState("");
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
        numarulRegistrulComertului: numarulRegistrulComertului,
        denumireaLegala: denumireaLegala,
        phoneNumber: phoneNumber,
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
        <form onSubmit={handleSubmit} className={styles.form_container}>
          <label htmlFor="email" className="sub-header">
            Email*
          </label>
          <input
            type="email"
            id="email"
            className="input-field"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password" className="sub-header">
            Password*
          </label>
          <input
            type="password"
            id="password"
            className="input-field"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="confirmPassword" className="sub-header">
            Confirm Password*
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="input-field"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {userType === 2 && (
            <>
              <label htmlFor="CIF" className="sub-header">
                CIF*
              </label>
              <input
                type="text"
                id="CIF"
                className="input-field"
                placeholder="Enter your CIF"
                value={CIF}
                onChange={(e) => setCIF(e.target.value)}
                required
              />
              <label
                htmlFor="numarulRegistrulComertului"
                className="sub-header"
              >
                Numarul Registrul Comertului*
              </label>
              <input
                type="text"
                id="numarulRegistrulComertului"
                className="input-field"
                placeholder="Enter your numarul Registrul Comertului"
                value={numarulRegistrulComertului}
                onChange={(e) => setNumarulRegistrulComertului(e.target.value)}
                required
              />
              <label htmlFor="denumireaLegala" className="sub-header">
                Denumirea legala a societatii*
              </label>
              <input
                type="text"
                id="denumireaLegala"
                className="input-field"
                placeholder="Enter your denumirea legala"
                value={denumireaLegala}
                onChange={(e) => setDenumireaLegala(e.target.value)}
                required
              />
              <label htmlFor="phoneNumber" className="sub-header">
                Phone Number*
              </label>
              <input
                type="tel"
                id="phoneNumber"
                className="input-field"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
              <label htmlFor="fileUpload" className="sub-header">
                Upload File*
              </label>
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
          <button className="scan-button" type="submit">
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
