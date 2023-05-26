import React, { useContext, useEffect } from "react";
import styles from "./AccountPage.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";

export default function AccountPage() {
  const navigate = useNavigate();
  const { ready, user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (ready && !user) {
      navigate("/login");
    }
  }, [ready, user, navigate]);

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
      {ready ? (
        <>
          <div className={styles.field}>
            <label>Email:</label>
            <input type="email" value={user?.email || ""} readOnly={true} />
          </div>
          {user?.userType === 2 && (
            <>
              <div className={styles.field}>
                <label>CIF:</label>
                <input type="text" value={user?.CIF || ""} readOnly={true} />
              </div>
              <div className={styles.field}>
                <label>Numar registru:</label>
                <input
                  type="text"
                  value={user?.numar_registru || ""}
                  readOnly={true}
                />
              </div>
              <div className={styles.field}>
                <label>Denumire legala:</label>
                <input
                  type="text"
                  value={user?.denumire_legala || ""}
                  readOnly={true}
                />
              </div>
              <div className={styles.field}>
                <label>Phone Number:</label>
                <input
                  type="text"
                  value={user?.phone_number || ""}
                  readOnly={true}
                />
              </div>
            </>
          )}
          <div className={styles.field}>
            <label>Language:</label>
            <select disabled={!user} defaultValue={user?.language || "ro"}>
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
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
