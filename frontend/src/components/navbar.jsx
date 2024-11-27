import {
  IoExitOutline,
  IoPersonOutline,
  IoMenuOutline,
  IoCloseOutline,
} from "react-icons/io5";
import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import LoginStatus from "./authentication/loginStatus";
import Logo from "../assets/logo.png";
import Swal from "sweetalert2";
import "./style.css";

const Navbar = ({ LoginModal, RegisterModal, isScrolled, ProfileModal }) => {
  const [loggedin, setLoggedin] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar
  const Navigate = useNavigate();
  const Location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await LoginStatus();
        if (result.loggedIn) {
          setLoggedin(true);
        } else {
          setLoggedin(false);
        }
      } catch (error) {
        console.error("Error fetching user status:", error);
      }
    };

    fetchUser();
  }, [Location]);

  const handleProfile = () => {
    ProfileModal();
  };

  const handleLogin = () => {
    LoginModal();
  };

  const handleRegister = () => {
    RegisterModal();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    Swal.fire({
      title: "Logged Out!",
      text: "You have been logged out successfully.",
      icon: "success",
      confirmButtonText: "OK",
    });

    Navigate("/");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? "blurred" : ""}`}>
        <img src={Logo} alt="Company Logo"></img>

        {/* Hamburger icon for small screens */}
        <IoMenuOutline className="hamburger-icon" onClick={toggleSidebar} />

        {loggedin ? (
          <ul className="list-items">
            <h2>Author Dashboard</h2>
          </ul>
        ) : (
          <ul className="list-items">
            <NavLink to="/">
              <li>Home</li>
            </NavLink>
            <NavLink to="/blogs">
              <li>Blogs</li>
            </NavLink>
            <NavLink to="/authors">
              <li>Authors</li>
            </NavLink>
          </ul>
        )}

        <div className="login">
          {loggedin ? (
            <div className="author-profile">
              <IoPersonOutline
                className="user-icon"
                title="profile"
                onClick={handleProfile}
              />
              <IoExitOutline
                className="user-icon"
                onClick={handleLogout}
                title="logout"
              />
            </div>
          ) : (
            <>
              <button type="button" title="Author Login" onClick={handleLogin}>
                Login
              </button>
              <button
                type="button"
                title="Author Registration"
                onClick={handleRegister}
              >
                Register
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Sidebar */}
      {sidebarOpen && (
        <div className="sidebar">
          <IoCloseOutline className="close-icon" onClick={toggleSidebar} />
          <ul className="sidebar-items">
            <NavLink to="/" onClick={toggleSidebar}>
              <li>Home</li>
            </NavLink>
            <NavLink to="/blogs" onClick={toggleSidebar}>
              <li>Blogs</li>
            </NavLink>
            <NavLink to="/authors" onClick={toggleSidebar}>
              <li>Authors</li>
            </NavLink>
            {!loggedin && (
              <>
                <li>
                  <button
                    type="button"
                    onClick={handleLogin}
                    className="sidebar-btn"
                  >
                    Login
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={handleRegister}
                    className="sidebar-btn"
                  >
                    Register
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
