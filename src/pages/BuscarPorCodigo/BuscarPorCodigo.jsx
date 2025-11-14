import { useState } from "react";
import "./BuscarPorCodigo.css";

export default function BuscarPorCodigo() {
  const [code, setCode] = useState("");
  const [usuario, setUsuario] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const buscarUsuario = async () => {
    if (!code.trim()) {
      setMensaje("Ingrese un código válido.");
      setUsuario(null);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/user/buscar/${code}`
      );

      if (!response.ok) {
        setMensaje("Usuario no encontrado.");
        setUsuario(null);
        return;
      }

      const data = await response.json();
      setUsuario(data);
      setMensaje("");
    } catch (error) {
      setMensaje("Error al conectar con el servidor.");
      setUsuario(null);
    }
  };

  return (
    <div className="login-container">
      <h2>Buscar Usuario por Código</h2>

      <div className="form-group">
        <label>Código del Usuario</label>
        <input
          type="text"
          placeholder="Ingrese código..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>

      <div className="button-group">
        <button className="change-password-button" onClick={buscarUsuario}>
          Buscar
        </button>

        <button
          className="cancel-button"
          onClick={() => {
            setUsuario(null);
            setMensaje("");
            setCode("");
          }}
        >
          Limpiar
        </button>
      </div>

      {mensaje && <div className="message">{mensaje}</div>}

      {usuario && (
        <div className="result-container">
          <h3>Información del Usuario</h3>

          <div className="user-info-card">
            <p><strong>Nombre:</strong> {usuario.nombre}</p>
            <p><strong>Código:</strong> {usuario.codigo}</p>
          </div>

          <h3>Préstamos Realizados</h3>
          <div className="card-grid">
            {usuario.prestamosRealizados.length > 0 ? (
              usuario.prestamosRealizados.map((p, i) => (
                <div className="info-card" key={i}>
                  <p><strong>ID Préstamo:</strong> {p.id}</p>
                  <p><strong>Fecha:</strong> {p.fechaPrestamo}</p>
                  <p><strong>Libro:</strong> {p.libroTitulo}</p>
                </div>
              ))
            ) : (
              <p className="empty">No hay préstamos registrados</p>
            )}
          </div>

          <h3>Libros en Poder</h3>
          <div className="card-grid">
            {usuario.librosEnPoder.length > 0 ? (
              usuario.librosEnPoder.map((l, i) => (
                <div className="info-card" key={i}>
                  <p><strong>Título:</strong> {l.titulo}</p>
                  <p><strong>Autor:</strong> {l.autor}</p>
                  <p><strong>ISBN:</strong> {l.isbn}</p>
                </div>
              ))
            ) : (
              <p className="empty">No tiene libros actualmente</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
