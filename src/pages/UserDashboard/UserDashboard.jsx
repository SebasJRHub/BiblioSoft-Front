import React from "react";
import "./UserDashboard.css";
import { logout } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const navigate = useNavigate();

  return (
    <div className="user-container">
      <h2 className="user-title">Panel de Usuario</h2>

      <div className="user-buttons">

        <button
          className="user-btn"
          onClick={() => navigate("/change-password")}
        >
          Cambiar Contraseña
        </button>

        <button
          className="user-btn"
          onClick={() => {
            logout();
            navigate("/buscar");
          }}
        >
          BUSCAR LIBROS
        </button>

        <button
          className="user-btn logout-btn"
          onClick={() => {
            logout();
            navigate("/");

          }}
        >
          Cerrar Sesión
        </button>

      </div>
    </div>
  );
}
