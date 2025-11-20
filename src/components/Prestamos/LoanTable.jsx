import "./LoanTable.css";

export default function LoanTable({ loans, loading, onReturn }) {
  if (loading) return <p>Cargando préstamos...</p>;

  return (
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
        {loans.map((loan) => (
          <tr key={loan.id}>
            <td>{loan.id}</td>
            <td>{loan.userCode}</td>
            <td>{loan.userFullName}</td>
            <td>{loan.bookTitle}</td>
            <td>{loan.loanDate}</td>
            <td>{loan.returnDate || "—"}</td>
            <td>{loan.status}</td>
            <td>
              {loan.status === "PRESTADO" ? (
                <button
                  className="btn-return"
                  onClick={() => onReturn(loan.id)}
                >
                  Devolver
                </button>
              ) : (
                "—"
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
