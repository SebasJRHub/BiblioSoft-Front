import { useEffect, useState } from "react";
import "./FinesPage.css";

export default function FinesPage() {
  const [fines, setFines] = useState([]);
  const [filteredFines, setFilteredFines] = useState([]);
  const [selectedFine, setSelectedFine] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [justification, setJustification] = useState("");

  const [codigo, setCodigo] = useState("");
  const [mensaje, setMensaje] = useState("");

  const token = localStorage.getItem("token");

  // === CARGAR MULTAS ===
  const loadFines = async () => {
    if (!token) {
      alert("No hay token. Debe iniciar sesión.");
      return;
    }

    const res = await fetch(`${import.meta.env.VITE_API_URL}/fines/all-fines`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.error("Error cargando multas");
      return;
    }

    const data = await res.json();
    setFines(data);
    setFilteredFines(data);
  };

  // === EXONERAR MULTA ===
  const handleExonerate = async () => {
    const text = justification.trim();

    const body = {
      fineId: selectedFine.id,
      justification: text,
    };

    await fetch(`${import.meta.env.VITE_API_URL}/fines/exone-fine`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    setSelectedFine(null);
    setJustification("");
    loadFines();
  };

  // === FILTRO EN VIVO ===
  useEffect(() => {
    const value = codigo.trim().toLowerCase();

    if (value === "") {
      setMensaje("");
      setFilteredFines(fines);
      return;
    }

    const results = fines.filter((fine) =>
      fine.userCode.toLowerCase().includes(value)
    );

    setFilteredFines(results);
    setMensaje(results.length === 0 ? "Usuario no encontrado" : "");
  }, [codigo, fines]);

  // CARGAR DATOS AL INICIAR
  useEffect(() => {
    loadFines();
  }, []);

  return (
    <div>
      <h1>Gestión de Multas</h1>

      {/* === BUSCADOR === */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar por código de usuario"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          className="search-input"
        />
      </div>

      {mensaje && <p className="msg-error">{mensaje}</p>}

      {/* === TABLA === */}
      <div className="fines-table-container">
        <table className="fines-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>CÓDIGO</th>
              <th>NOMBRE</th>
              <th>PRÉSTAMO</th>
              <th>LIBRO</th>
              <th>VALOR</th>
              <th>DÍAS RETRASO</th>
              <th>ESTADO</th>
              <th>ACCIÓN</th>
            </tr>
          </thead>

          <tbody>
            {filteredFines.length > 0 ? (
              filteredFines.map((fine) => (
                <tr key={fine.id}>
                  <td>{fine.id}</td>
                  <td>{fine.userCode}</td>
                  <td>{fine.userName}</td>
                  <td>{fine.idPrestamo}</td>
                  <td>{fine.bookTitle}</td>
                  <td>${fine.valor}</td>
                  <td>{fine.diasAtraso}</td>

                  <td>
                    {fine.justificacion === null ? (
                      <span className="status-pendiente">PENDIENTE</span>
                    ) : (
                      <span className="status-exonerada">EXONERADA</span>
                    )}
                  </td>

                  <td>
                    {fine.justificacion === null ? (
                      <button
                        className="btn-exonerar"
                        onClick={() => setSelectedFine(fine)}
                      >
                        Exonerar
                      </button>
                    ) : (
                      <button
                        className="btn-detalles"
                        onClick={() => setSelectedDetail(fine)}
                      >
                        Detalles
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="no-data">
                  No hay resultados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* === MODAL EXONERAR === */}
      {selectedFine && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Exonerar Multa</h2>

            <textarea
              placeholder="Justificación (10 - 200 caracteres)"
              value={justification}
              maxLength={200}
              onChange={(e) => setJustification(e.target.value)}
              className="textarea-justification"
            />

            {justification.trim().length > 0 &&
              justification.trim().length < 10 && (
                <p className="msg-error">
                  La justificación debe tener al menos 10 caracteres
                </p>
              )}

            <p className="char-counter">{justification.length}/200</p>

            <div className="modal-buttons">
              <button
                className="btn-exonerar"
                onClick={handleExonerate}
                disabled={justification.trim().length < 10}
                style={{
                  opacity: justification.trim().length < 10 ? 0.5 : 1,
                  cursor:
                    justification.trim().length < 10
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                Confirmar
              </button>

              <button
                className="btn-cancelar"
                onClick={() => setSelectedFine(null)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* === MODAL DETALLES (BONITO) === */}
      {selectedDetail && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ width: "500px" }}>
            <h2>Detalles de Exoneración</h2>

            <div
              style={{
                background: "#fff5f5",
                border: "1px solid #e2b4b4",
                padding: "15px",
                borderRadius: "10px",
                marginBottom: "15px",
              }}
            >
              <p>
                <strong>Usuario:</strong> {selectedDetail.userName}
              </p>
              <p>
                <strong>Libro:</strong> {selectedDetail.bookTitle}
              </p>
              <p>
                <strong>Días de atraso:</strong> {selectedDetail.diasAtraso}
              </p>
              <p>
                <strong>Valor:</strong> ${selectedDetail.valor}
              </p>
            </div>

            <h3 style={{ marginBottom: "8px", color: "#7e0d0d" }}>
              Justificación
            </h3>

            <div
              style={{
                maxHeight: "200px",
                overflowY: "auto",
                padding: "14px",
                border: "1px solid #ccc",
                borderRadius: "10px",
                background: "#fafafa",
                fontSize: "15px",
                lineHeight: "1.5",
                textAlign: "justify",
              }}
            >
              {selectedDetail.justificacion}
            </div>

            <div className="modal-buttons" style={{ marginTop: "20px" }}>
              <button
                className="btn-cancelar"
                onClick={() => setSelectedDetail(null)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
