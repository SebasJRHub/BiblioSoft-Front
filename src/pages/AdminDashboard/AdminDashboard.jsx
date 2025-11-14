import React from "react";
import "./AdminDashboard.css";
import { logout } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="admin-container">
      <h2 className="admin-title">Panel Admin</h2>

      <div className="admin-buttons">
        <button
          className="admin-btn"
          onClick={() => navigate("/search-user")}
        >
          Buscar Usuario por Código
        </button>

        <button
          className="admin-btn logout-btn"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
