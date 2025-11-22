import "./LoanTable.css";

export default function LoanTable({ loans, loading, onReturn }) {
  if (loading) {
    return <p>Cargando préstamos...</p>;
  }

  return (
    <div className="loan-table-container">
      <table className="loan-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Código Usuario</th>
            <th>Nombre</th>
            <th>Libro</th>
            <th>Fecha Préstamo</th>
            <th>Fecha Devolución</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>

        <tbody>
          {loans.length > 0 ? (
            loans.map((loan) => (
              <tr key={loan.id}>
                <td>{loan.id}</td>
                <td>{loan.userCode}</td>
                <td>{loan.userFullName}</td>
                <td>{loan.bookTitle}</td>
                <td>{loan.loanDate}</td>
                <td>{loan.returnDate}</td>
                <td>{loan.status}</td>
                <td>
                  {loan.status === "PRESTADO" ? (
                    <button
                      className="btn-devolver"
                      onClick={() => onReturn(loan.id)}
                    >
                      Devolver
                    </button>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                No hay préstamos registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
