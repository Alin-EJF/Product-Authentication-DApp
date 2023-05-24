import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header() {
  const { user } = useContext(UserContext);
  return (
    <div className="Header">
      <header className="header">
        <Link to={"/"} className="logo">
          Home page
        </Link>
        <Link to={user ? "/account" : "/login"} className="login-button">
          {(!!user && <div>{user.email}</div>) || <div>Login</div>}
        </Link>
      </header>
    </div>
  );
}
