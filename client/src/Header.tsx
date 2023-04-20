import "./App.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="Header">
      <header className="header">
      <Link to={"/"} className="logo">
        Logo  
      </Link>
      <Link to={"/login"} className="login-button">
          Login
      </Link>
      </header>
      </div>
  );
}
