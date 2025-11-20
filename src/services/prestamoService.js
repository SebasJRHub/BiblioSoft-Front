const API_URL = 'https://api.example.com/prestamos';

export const devolverPRestamo = async (idPrestamo) => {
    const response = await fetch(`${API_URL}/devolver/${idPrestamo}`, {
    method: 'PUT',
    headers: {
    "Content-Type": "application/json",
    },
    });
    const data = await response.json();

    if (!response.ok) {
    throw new Error(data.message || 'Error al devolver el préstamo');
    }

    return data;
};