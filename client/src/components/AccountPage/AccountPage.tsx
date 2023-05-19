import React, { useContext } from "react";
import styles from "./AccountPage.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";

export default function AccountPage() {
  const navigate = useNavigate();
  const { ready, user, setUser } = useContext(UserContext);

  if (!ready) {
    return <div>Loading...</div>;
  }

  if (ready && !user) {
    navigate("/login");
  }

  const handleLogout = () => {
    // Perform logout logic here
    setUser(null); // Set the user to null or perform any other necessary action
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <h2>Account Page</h2>
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
