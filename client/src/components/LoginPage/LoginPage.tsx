import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform authentication logic here
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div>
      <div className="content-container">
        <h1 className="main-header">Login or Register</h1>
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
          <button className="scan-button" type="submit">
            Login
          </button>
        </form>
        <p>
          Don't have an account?{" "}
          <Link to="/register" className="register-link">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
