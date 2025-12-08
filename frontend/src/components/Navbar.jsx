import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiPower } from "react-icons/fi";
import "../styles/navbar.css";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg navbar-custom shadow-sm px-4">
      <div className="container-fluid justify-content-center">

        {/* CENTER NAV ITEMS */}
        <div className="d-flex gap-5 align-items-center">

          <Link
            className={`nav-link ${isActive("/") ? "active-nav" : ""}`}
            to="/"
          >
            HOME
          </Link>

          <Link
            className={`nav-link ${isActive("/products") ? "active-nav" : ""}`}
            to="/products"
          >
            PRODUCTS
          </Link>

          <Link
            className={`nav-link ${isActive("/about") ? "active-nav" : ""}`}
            to="/about"
          >
            ABOUT
          </Link>

          <Link
            className={`nav-link ${isActive("/contact") ? "active-nav" : ""}`}
            to="/contact"
          >
            CONTACT
          </Link>
        </div>

        {/* RIGHT ICONS */}
        <div className="position-absolute end-0 me-4 d-flex align-items-center gap-4">

          {/* CART ICON */}
          <FiShoppingCart className="nav-icon" onClick={() => navigate("/cart")} />

          {/* LOGOUT ICON */}
          <div className="position-relative">
            <FiPower
              className="nav-icon"
              onClick={() => setShowLogout(!showLogout)}
            />

            {showLogout && (
              <div className="logout-menu position-absolute end-0 mt-2 p-2 shadow-sm">
                <button
                  className="btn btn-sm btn-danger w-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}
