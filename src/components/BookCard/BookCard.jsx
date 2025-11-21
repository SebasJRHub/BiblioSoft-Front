import React, { useState } from "react";
import PrestamoService from "../../services/PrestamoService";
import "./BookCard.css";

export default function BookCard({ libro }) {

  // --- CORRECCIÓN: evitar JSON.parse en "undefined" ---
  let rawUser = localStorage.getItem("user");

  if (rawUser === "undefined" || rawUser === "null") {
    localStorage.removeItem("user");
    rawUser = null;
  }

  const user = rawUser ? JSON.parse(rawUser) : null;

  const token = localStorage.getItem("token");
  console.log("TOKEN QUE SE ENVÍA AL BACK:", token);

  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const solicitarPrestamo = async () => {
    if (!user) {
      setMensaje("Debes iniciar sesión para solicitar un préstamo.");
      return;
    }

    try {
      setLoading(true);
      setMensaje("");

      await PrestamoService.solicitarPrestamo(libro.id, token);


      setMensaje("Solicitud enviada correctamente");
    } catch (e) {
      console.error("ERROR:", e);

      if (e.response?.status === 403) {
        setMensaje("No tienes permiso. Inicia sesión nuevamente.");
      } else {
        setMensaje("Error al solicitar el préstamo");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="libro-card">
      <h3>{libro.titulo}</h3>
      <p><strong>Autor:</strong> {libro.autor}</p>
      <p><strong>Editorial:</strong> {libro.editorial}</p>

      {libro.cantidadDisponible > 0 ? (
        <button
          className="btn"
          onClick={solicitarPrestamo}
          disabled={loading || !user}
        >
          {loading
            ? "Procesando..."
            : !user
              ? "Inicia sesión para prestar"
              : "Solicitar Préstamo"}
        </button>
      ) : (
        <span className="nodispo">No disponible</span>
      )}

      {mensaje && <p className="mensaje">{mensaje}</p>}
    </div>
  );
}
