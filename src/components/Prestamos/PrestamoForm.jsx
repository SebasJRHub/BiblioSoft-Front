import { useState } from "react";
import "./PrestamoForm.css";

export default function PrestamoForm({ onSuccess }) {
  const [codigoUsuario, setCodigoUsuario] = useState("");
  const [codigoLibro, setCodigoLibro] = useState("");
  const [fechaPrestamo, setFechaPrestamo] = useState("");
  const [fechaDevolucion, setFechaDevolucion] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (codigoUsuario.length > 20) {
      return setError("El código de usuario no puede superar 20 caracteres.");
    }

    if (codigoLibro.length > 20) {
      return setError("El código del libro no puede superar 20 caracteres.");
    }

    try {
      const res = await fetch("http://localhost:8080/api/prestamos/crear", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          codigoUsuario,
          codigoLibro,
          fechaPrestamo,
          fechaDevolucion,
        }),
      });

      if (!res.ok) return setError("No se pudo registrar el préstamo.");

      if (onSuccess) onSuccess();

      setCodigoUsuario("");
      setCodigoLibro("");
      setFechaPrestamo("");
      setFechaDevolucion("");

    } catch {
      setError("Error al conectar con el servidor.");
    }
  };

  return (
    <form className="prestamo-form" onSubmit={handleSubmit}>
      <h2>Registrar Préstamo</h2>

      <label>Código Usuario</label>
      <input
        type="text"
        maxLength={20}
        value={codigoUsuario}
        onChange={(e) => setCodigoUsuario(e.target.value)}
      />

      <label>Código Libro</label>
      <input
        type="text"
        maxLength={20}
        value={codigoLibro}
        onChange={(e) => setCodigoLibro(e.target.value)}
      />

      <label>Fecha Préstamo</label>
      <input
        type="date"
        value={fechaPrestamo}
        onChange={(e) => setFechaPrestamo(e.target.value)}
      />

      <label>Fecha Devolución</label>
      <input
        type="date"
        value={fechaDevolucion}
        onChange={(e) => setFechaDevolucion(e.target.value)}
      />

      <button type="submit" className="prestamo-btn">Registrar</button>

      {error && <p className="error">{error}</p>}
    </form>
  );
}
