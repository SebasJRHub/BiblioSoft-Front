import { useState } from "react";
import "./BuscarPorCodigo.css";

export default function BuscarPorCodigo() {
  const [code, setCode] = useState("");
  const [usuario, setUsuario] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [errorInput, setErrorInput] = useState("");

  const handleCodeChange = (e) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) {
      setErrorInput("Solo se permiten números.");
    } else if (value.length > 20) {
      setErrorInput("Código inválido, máximo 20 caracteres.");
    } else {
      setErrorInput("");
    }

    setCode(value);
  };

  const buscarUsuario = async () => {
    if (!code.trim()) {
      setMensaje("Ingrese un código válido.");
      setUsuario(null);
      return;
    }

    if (errorInput) {
      setMensaje(errorInput);
      setUsuario(null);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/buscar/${code}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        setMensaje("No se encontró un usuario con ese código.");
        setUsuario(null);
        return;
      }

      const data = await response.json();
      setUsuario(data);
      setMensaje("");
    } catch {
      setMensaje("Error al conectar con el servidor.");
      setUsuario(null);
    }
  };

  return (
    <div className="buscar-container">
      <div className="buscar-card">
        <h2>Buscar Usuario por Código</h2>

        <div className="form-group">
          <label>Código del Usuario</label>
          <input
            type="text"
            placeholder="Ingrese código..."
            value={code}
            onChange={handleCodeChange}
          />
        </div>

        {errorInput && <div className="message">{errorInput}</div>}

        <div className="button-group">
          <button className="change-password-button" onClick={buscarUsuario}>
            Buscar
          </button>

          <button
            className="cancel-button"
            onClick={() => {
              setUsuario(null);
              setMensaje("");
              setErrorInput("");
              setCode("");
            }}
          >
            Limpiar
          </button>
        </div>

        {mensaje && <div className="message">{mensaje}</div>}

        {usuario && (
          <div className="result-box">
            <h3 className="section-title">Información del Usuario</h3>

            <div className="info-box">
              <p><strong>Nombre:</strong> {usuario.nombre}</p>
              <p><strong>Código:</strong> {usuario.codigo}</p>
            </div>

            <h3 className="section-title">Préstamos Realizados</h3>

            {usuario.prestamosRealizados.length > 0 ? (
              <div className="loans-grid">
                {usuario.prestamosRealizados.map((p, i) => (
                  <div key={i} className="loan-card">
                    <p><strong>ID del préstamo:</strong> {p.id}</p>
                    <p><strong>Libro:</strong> {p.libro?.titulo}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty">No hay préstamos registrados</p>
            )}

            <h3 className="section-title">Libros en Poder</h3>

            {usuario.librosEnPoder.length > 0 ? (
              <ul className="books-list">
                {usuario.librosEnPoder.map((l, i) => (
                  <li key={i} className="book-item">
                    {l.titulo} — {l.autor}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty">No tiene libros actualmente</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
