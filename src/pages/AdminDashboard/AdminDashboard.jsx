import React, { useState } from "react";
import "./AdminDashboard.css";
import { logout } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

import AdminPrestamos from "../Prestamos/AdminPrestamos";
import BuscarPorCodigo from "../BuscarPorCodigo/BuscarPorCodigo";
import LoanRequestsTable from "../../components/Prestamos/LoanRequestsTable";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("solicitados");

  return (
    <div className="dashboard-container">

      <div className="sidebar">
        <h2 className="sidebar-title">PANEL ADMIN</h2>

        <button
          className="sidebar-btn"
          onClick={() => setSelectedOption("buscar")}
        >
          Buscar Usuario
        </button>
        <button
          className="sidebar-btn"
          onClick={() => navigate("/add-book")}
        >
          Agregar Libro
        </button>

        <button
          className="sidebar-btn"
          onClick={() => setSelectedOption("solicitados")}
        >
          Solicitudes
        </button>

        <button
          className="sidebar-btn"
          onClick={() => setSelectedOption("prestamos")}
        >
          Préstamos
        </button>

        <button
          className="sidebar-btn logout-btn"
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          Cerrar Sesión
        </button>
      </div>

      <div className="content">
        {selectedOption === "buscar" && <BuscarPorCodigo />}
        {selectedOption === "prestamos" && <AdminPrestamos />}
        {selectedOption === "solicitados" && <LoanRequestsTable />}
      </div>

    </div>
  );
}
