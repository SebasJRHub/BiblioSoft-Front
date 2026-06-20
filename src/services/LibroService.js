import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/book`;

// Función para obtener el token
const authHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

class LibroService {
  getAllBooks() {
    return axios.get(`${API_URL}/allBooks`, {
      headers: authHeader(),
    });
  }

  saveBook(book) {
    return axios.post(`${API_URL}/save`, book, {
      headers: authHeader(),
    });
  }

  editBook(book) {
    return axios.put(`${API_URL}/edit`, book, {
      headers: authHeader(),
    });
  }

  deleteBook(id) {
    return axios.delete(`${API_URL}/deleteBook/${id}`, {
      headers: authHeader(),
    });
  }

  buscarLibros(query) {
    return axios.get(`${API_URL}/search?query=${query}`, {
      headers: authHeader(),
    });
  }

  devolverLibro(idLibro) {
    return axios.put(
      `${API_URL}/devolver/${idLibro}`,
      {},
      {
        headers: authHeader(),
      }
    );
  }
}

export default new LibroService();
