import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/argentBankLogo.png";
import "./header.scss";

function Header() {
  const location = useLocation();

  const isLoggedIn = location.pathname === "/user";

  return (
    <nav className="main-nav">
      <NavLink to="/" className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>

      <div className={isLoggedIn ? "nav-user logged-in" : "nav-user"}>
        {isLoggedIn ? (
          <>
            <NavLink to="/user" className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              Tony
            </NavLink>

            <NavLink to="/" className="main-nav-item">
              <i className="fa fa-sign-out"></i>
              Sign Out
            </NavLink>
          </>
        ) : (
          <NavLink to="/signin" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            Sign In
          </NavLink>
        )}
      </div>
    </nav>
  );
}

export default Header;
