import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import { FaHome } from "react-icons/fa";

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
              <Link to={"/"} className="header_link">
                Manufacturer
              </Link>
              <Link to={"/"} className="header_link">
                Distributor
              </Link>
              <Link to={"/"} className="header_link">
                Retailer
              </Link>
            </>
          )}
        </div>
        <Link to={user ? "/account" : "/login"} className="generic-button">
          {(!!user && <div>{user.email}</div>) || <div>Login</div>}
        </Link>
      </header>
    </div>
  );
}
