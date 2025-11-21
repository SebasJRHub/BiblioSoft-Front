// src/services/PrestamoService.js
import axios from "axios";

const API_URL = "http://localhost:8080/api/prestamo";

const solicitarPrestamo = async (bookId, token) => {
  console.log("🔍 Token enviado:", token);
  console.log("🔍 BookId:", bookId);
  
  try {
    const response = await axios.post(
      `${API_URL}/solicitar-libro`,
      {}, // body vacío
      {
        params: { bookId },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("❌ Error completo:", error.response?.data);
    console.error("❌ Status:", error.response?.status);
    console.error("❌ Headers enviados:", error.config.headers);
    throw error;
  }
};

const obtenerMisPrestamos = async (token) => {
  const response = await axios.get(`${API_URL}/mis-prestamos`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export default {
  solicitarPrestamo,
  obtenerMisPrestamos,
};