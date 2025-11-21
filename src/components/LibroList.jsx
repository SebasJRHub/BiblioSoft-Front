import React, { useEffect, useState } from "react";
import LibroService from "../services/LibroService";

const LibroList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    LibroService.getAllBooks()
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar libros:", error);
      });
  }, []);

  return (
    <div>
      <h2>📚 Lista de Libros</h2>
      {books.length === 0 ? (
        <p>No hay libros disponibles</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              {book.title} — {book.author} ({book.year})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LibroList;