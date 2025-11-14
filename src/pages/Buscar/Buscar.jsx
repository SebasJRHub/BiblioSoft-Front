import React, { useState } from "react";
import LibroService from "../../services/LibroService";
import "./Buscar.css";

function Buscar() {
  const [query, setQuery] = useState("");
  const [resultados, setResultados] = useState([]);

  const handleSearch = async () => {
    if (query.trim() === "") return;

    try {
      const response = await LibroService.buscarLibros(query);
      setResultados(response.data);
    } catch (error) {
      console.error("Error al buscar libros:", error);
    }
  };

  return (
    <div className="buscar-container">
      <h2>Buscar Libros</h2>
      <div className="buscar-barra">
        <input
          type="text"
          placeholder="Escribe el título, autor o editorial..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>

      <div className="resultados">
        {resultados.length > 0 ? (
          <ul>
            {resultados.map((libro) => (
              <li key={libro.id}>
                <strong>{libro.titulo}</strong> — {libro.autor} ({libro.editorial})
              </li>
            ))}
          </ul>
        ) : (
         <p className="sin-resultados">⚠️ No se encontraron libros con esa búsqueda.</p>
        )}
      </div>
    </div>
  );
}

export default Buscar;
