import React from "react";
import "./HeaderUser.css"
import { Link } from "react-router-dom";
import { logout } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import { FaDoorOpen } from "react-icons/fa";

function HeaderUser() {
  const navigate = useNavigate();
  return (
    <div>
      <header>
        <div className="header-user">
          <h1 className="title">BIBLIOSOFTWARE</h1>
          <nav className="nav-links">
            <Link to="#" className="links">Profile</Link>
            <Link to="#" className="links">Settings</Link>
            <Link to="#">
              <span className="logout-icon"
                onClick={() => {
                  logout();
                  navigate("/")
                  ;
                }}
              >
                <FaDoorOpen />
              </span>
            </Link>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default HeaderUser;