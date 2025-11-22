
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
    console.error("❌ Headers enviados:", error.config?.headers);
    throw error;
  }
};

const obtenerMisPrestamos = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/mis-prestamos`, {
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error obteniendo préstamos:", error.response?.data);
    throw error;
  }
};

const obtenerTodosPrestamos = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/prestamos`, {
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error obteniendo todos los préstamos:", error.response?.data);
    throw error;
  }
};

const aprobarPrestamo = async (prestamoId, token) => {
  try {
    const response = await axios.put(
      `${API_URL}/aprobar/${prestamoId}`,
      {},
      {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("❌ Error aprobando préstamo:", error.response?.data);
    throw error;
  }
};

const rechazarPrestamo = async (prestamoId, token) => {
  try {
    const response = await axios.put(
      `${API_URL}/rechazar/${prestamoId}`,
      {},
      {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("❌ Error rechazando préstamo:", error.response?.data);
    throw error;
  }
};

const devolverLibro = async (prestamoId, token) => {
  try {
    const response = await axios.put(
      `${API_URL}/devolver-libro/${prestamoId}`,
      {},
      {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("❌ Error devolviendo libro:", error.response?.data);
    throw error;
  }
};

export default {
  solicitarPrestamo,
  obtenerMisPrestamos,
  obtenerTodosPrestamos,
  aprobarPrestamo,
  rechazarPrestamo,
  devolverLibro
}