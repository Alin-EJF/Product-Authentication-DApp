import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../UserContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/auth/login", {
        email: email,
        password: password,
      });
      const userInfo = response.data;
      setUser(userInfo);

      toast.success("Login succeeded.");
      setTimeout(() => {
        navigate("/");
      }, 1500); // Delay 1.5s
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please check your email and password.");
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="content-container">
        <h1 className="main-header">Login</h1>
        <p className="note">Fields marked with * are compulsory</p>
        <form onSubmit={handleSubmit} className="form-container">
          <label htmlFor="email">Email*</label>
          <input
            type="email"
            id="email"
            className="input-field"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Password*</label>
          <input
            type="password"
            id="password"
            className="input-field"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="generic-button" type="submit">
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
