import React from "react";
import "./HeaderUser.css"
import { Link } from "react-router-dom";
import { logout } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

function HeaderUser() {
  const navigate = useNavigate();
  return (
    <div>
      <header>
        <div className="header-user">
          <h1 className="title">User Dashboard</h1>
          <nav className="nav-links">
            <Link to="#">Profile</Link>
            <Link to="#">Settings</Link>
            <Link to="#">
              <button
                className="user-btn logout-btn"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                Cerrar Sesión
              </button>
            </Link>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default HeaderUser;