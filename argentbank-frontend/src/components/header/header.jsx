import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { logout, setUser } from "../../store/userSlice";
import ApiService from "../../services/apiServices";

import logo from "../../assets/argentBankLogo.png";
import "./header.scss";

function Header() {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);

  const isLoggedIn = !!token;

  // Récupération du profil si token présent
  useEffect(() => {
    const fetchProfile = async () => {
      if (token && !user) {
        try {
          const profile = await ApiService.getProfile(token);
          dispatch(setUser(profile));
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
    };

    fetchProfile();
  }, [token, user, dispatch]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    dispatch(logout());
  };

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
              {user?.firstName || "User"}
            </NavLink>

            <NavLink to="/" className="main-nav-item" onClick={handleLogout}>
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
