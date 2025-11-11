import axios from "axios";

const API_URL = "http://localhost:8080/api/book"; // tu backend local

class LibroService {
  getAllBooks() {
    return axios.get(`${API_URL}/allBooks`);
  }

  saveBook(book) {
    return axios.post(`${API_URL}/save`, book);
  }

  editBook(book) {
    return axios.put(`${API_URL}/edit`, book);
  }

  deleteBook(id) {
    return axios.delete(`${API_URL}/deleteBook/${id}`);
  }
  buscarLibros(query) {
      return axios.get(`${API_URL}/search?query=${query}`);
    }
}

export default new LibroService();
