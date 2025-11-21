import { useEffect, useState } from "react";
import LoanTable from "../../components/Prestamos/LoanTable";

export default function AdminPrestamos() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    fetchLoans();
  }, []);

  async function fetchLoans() {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:8080/loans/all", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setLoans(data);
    } catch (err) {
      console.error(err);
      setMensaje("Error al cargar préstamos.");
    }
    setLoading(false);
  }

  async function handleReturnLoan(id) {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:8080/loans/return/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.message || "Error al devolver préstamo");
        return;
      }

      setMensaje("Préstamo devuelto correctamente.");
      fetchLoans();
    } catch (err) {
      console.error(err);
      setMensaje("Error al conectar con el servidor.");
    }
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>Gestión de Préstamos</h1>
      {mensaje && <p style={{ color: "#007bff" }}>{mensaje}</p>}

      <LoanTable
        loans={loans}
        loading={loading}
        onReturn={handleReturnLoan}
      />
    </div>
  );
}
