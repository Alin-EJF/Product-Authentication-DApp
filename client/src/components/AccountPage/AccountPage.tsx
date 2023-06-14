import { useContext, useEffect } from "react";
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
    <div className="content-container">
      <h1 className="main-header">Account Page</h1>
      {ready ? (
        <>
          <form className="form-container">
            {/*onSubmit={handleSubmit*/}
            <label>Email:</label>
            <input
              type="email"
              className="input-field"
              value={user?.email || ""}
              readOnly={true}
            />
            {user?.userType === 2 && (
              <>
                <label>CIF:</label>
                <input
                  type="text"
                  className="input-field"
                  value={user?.CIF || ""}
                  readOnly={true}
                />
                <label>Trade registration number:</label>
                <input
                  type="text"
                  className="input-field"
                  value={user?.trade_register_number || ""}
                  readOnly={true}
                />
                <label>Legal name:</label>
                <input
                  type="text"
                  className="input-field"
                  value={user?.legal_name || ""}
                  readOnly={true}
                />
                <label>Phone Number:</label>
                <input
                  type="text"
                  className="input-field"
                  value={user?.phone_number || ""}
                  readOnly={true}
                />
              </>
            )}
            <label>Language:</label>
            <select
              disabled={!user}
              className="input-field"
              defaultValue={user?.language || "ro"}
            >
              <option value="ro">Romanian</option>
              <option value="us">English</option>
              <option value="ca">French</option>
              <option value="uk">Spanish</option>
            </select>
            <label>Country:</label>
            <select disabled={!user} className="input-field" defaultValue="ro">
              <option value="ro">Romania</option>
              <option value="us">United States</option>
              <option value="ca">Canada</option>
              <option value="uk">United Kingdom</option>
            </select>
            <button
              style={{ marginBottom: "15%" }}
              className="generic-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </form>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
