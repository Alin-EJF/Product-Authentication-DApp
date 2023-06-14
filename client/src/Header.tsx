import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import { FaHome, FaIdBadge } from "react-icons/fa";

export default function Header() {
  const { user } = useContext(UserContext);
  return (
    <div className="Header">
      <header className="header">
        <div className="header_links">
          <Link to={"/"} className="header_link">
            <FaHome
              style={{
                fontSize: "36px",
                marginLeft: "18px",
                marginRight: "40px",
              }}
            />
          </Link>
          {user?.userType === 2 && (
            <>
              <Link to={"/manufacturer"} className="header_link">
                Manufacturer
              </Link>
              <Link to={"/distributor"} className="header_link">
                Distributor
              </Link>
              <Link to={"/retailer"} className="header_link">
                Retailer
              </Link>
              <Link to={"/about"} className="header_link">
                About
              </Link>
            </>
          )}
        </div>
        <Link to={user ? "/account" : "/login"} className="generic-button">
          {(!!user && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <FaIdBadge style={{ fontSize: "27px", marginRight: "8px" }} />
              <div>{user.email}</div>
            </div>
          )) || <div>Login</div>}
        </Link>
      </header>
    </div>
  );
}
