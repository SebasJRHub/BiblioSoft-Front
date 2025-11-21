import React, { useEffect, useState } from "react";
import LibroService from "../../services/LibroService";
import LibroCard from "../../components/BookCard/BookCard";
import "./Buscar.css";

export default function Buscar() {
  const [libros, setLibros] = useState([]);
  const [search, setSearch] = useState("");
  const [filtrados, setFiltrados] = useState([]);

  const userId = localStorage.getItem("userId"); // o como manejes el login

  useEffect(() => {
    async function fetchLibros() {
      try {
        const res = await LibroService.getAllBooks();
        setLibros(res.data);
        setFiltrados(res.data);
      } catch (e) {
        console.error("Error cargando libros:", e);
      }
    }
    fetchLibros();
  }, []);

  useEffect(() => {
    if (search.trim() === "") {
      setFiltrados(libros);
      return;
    }

    const filtro = libros.filter((libro) =>
      libro.titulo.toLowerCase().includes(search.toLowerCase()) ||
      libro.autor.toLowerCase().includes(search.toLowerCase()) ||
      libro.editorial.toLowerCase().includes(search.toLowerCase())
    );

    setFiltrados(filtro);
  }, [search, libros]);

  return (
    <div className="catalogo-container">
      <h2 className="titulo">Catálogo de Libros</h2>

      <div className="catalogo-buscador">
        <h2>Busca tu libro...</h2>
        <input
          type="text"
          placeholder="Buscar por título, autor o editorial..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="lista-libros">
        {filtrados.length > 0 ? (
          filtrados.map((libro) => (
            <LibroCard key={libro.id} libro={libro} userId={userId} />
          ))
        ) : (
          <p className="sin-resultados">⚠️ No se encontraron libros.</p>
        )}
      </div>
    </div>
  );
}
