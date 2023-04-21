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
  const navigate = useNavigate();

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
      })
      .then((response) => {
        console.log(response.data);
        toast.success("Registration successful! You can now login."); //more checks maybe not succeeded ?
        setTimeout(() => {
          navigate("/login");
        }, 1500); // Delay 1.5s
      })
      .catch((error) => {
        console.error(error);
        toast.error("Registration failed. Please try again."); //add error in popup ?
      });

    console.log("Email:", email, "Password:", password);
  };

  return (
    <div>
      <ToastContainer />
      <div className="content-container">
        <h1 className="main-header">Register</h1>
        <form onSubmit={handleSubmit} className={styles.form_container}>
          <label htmlFor="email" className="sub-header">
            Email
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
            Password
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
            Confirm Password
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
