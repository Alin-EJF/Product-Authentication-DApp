import React, { useContext } from "react";
import styles from "./AccountPage.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";

export default function AccountPage() {
  const navigate = useNavigate();
  const { ready, user, setUser } = useContext(UserContext);

  if (!ready) {
    return <div>Loading...</div>;
  }

  if (ready && !user) {
    // setTimeout(() => {
    //   console.log("Two seconds have passed.");
    // }, 2000);
    navigate("/login");
  }

  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout");
      setUser(null);
      toast.success("Logout succeeded.");
    } catch (error) {
      console.log("Failed to log out", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Account Page</h1>
      <div className={styles.field}>
        <label>Username:</label>
        <input type="text" value={user?.username || ""} disabled={!user} />
      </div>
      <div className={styles.field}>
        <label>Email:</label>
        <input type="email" value={user?.email || ""} disabled={!user} />
      </div>
      <div className={styles.field}>
        <label>Language:</label>
        <select disabled={!user} value={user?.language || "ro"}>
          <option value="ro">Romanian</option>
          <option value="us">English</option>
          <option value="ca">French</option>
          <option value="uk">Spanish</option>
        </select>
      </div>
      <div className={styles.field}>
        <label>Country:</label>
        <select disabled={!user} defaultValue="ro">
          <option value="ro">Romania</option>
          <option value="us">United States</option>
          <option value="ca">Canada</option>
          <option value="uk">United Kingdom</option>
        </select>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
