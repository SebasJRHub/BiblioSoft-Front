import { useEffect, useState } from "react";
import "./LoanRequestsTable.css";

export default function LoanRequestsTable() {
  const [requests, setRequests] = useState([]);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    fetchRequests();
  }, []);

  async function fetchRequests() {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${import.meta.env.VITE_API_URL}/loans/requesteds`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        setMensaje("Error al cargar solicitudes.");
        return;
      }

      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.error(err);
      setMensaje("Error de conexión con el servidor.");
    }
  }

  async function aprobarPrestamo(id) {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${import.meta.env.VITE_API_URL}/loans/approve/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.message || "Error al aprobar el préstamo.");
        return;
      }

      setMensaje("Préstamo aprobado correctamente.");
      fetchRequests();
    } catch (err) {
      console.error(err);
      setMensaje("Error al conectar con el servidor.");
    }
  }

  return (
    <div>
      <h1>Solicitudes de Préstamo</h1>
      {mensaje && <p className="info-msg">{mensaje}</p>}

      <table className="loan-requests-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Código Usuario</th>
            <th>Nombre</th>
            <th>Libro</th>
            <th>Fecha Solicitud</th>
            <th>Acción</th>
          </tr>
        </thead>

        <tbody>
          {requests.length > 0 ? (
            requests.map((req) => (
              <tr key={req.id}>
                <td>{req.id}</td>
                <td>{req.userCode}</td>
                <td>{req.userFullName}</td>
                <td>{req.bookTitle}</td>
                <td>{req.loanDate}</td>
                <td>
                  <button
                    className="btn-aprobar"
                    onClick={() => aprobarPrestamo(req.id)}
                  >
                    Aprobar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="empty">
                No hay solicitudes pendientes.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
