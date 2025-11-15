import React, { useState } from "react";
import "./ChangePasswordForm.css";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validarPassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.,;:?¡¿_+\-=])[A-Za-z0-9!@#$%^&*.,;:?¡¿_+\-=]{8,30}$/;
    return regex.test(password);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas nuevas no coinciden");
      setMessage("");
      return;
    }

    if (!validarPassword(newPassword)) {
      setError(
        "La nueva contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial"
      );
      setMessage("");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/auth/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      });

      const text = await response.text();

      if (!response.ok) {
        setError(text || "Error al cambiar la contraseña");
        setMessage("");
        return;
      }

      setMessage(text || "Contraseña actualizada correctamente");
      setError("");
      setoldPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setError("Error de conexión con el servidor");
      setMessage("");
    }
  };

  const handleCancel = () => {
    setoldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    setMessage("");
  };

  return (
    <div className="cp-container">
      <h2 className="cp-titulo">Cambiar Contraseña</h2>
      <form onSubmit={handleChangePassword}>
        <div className="cp-input-group">
          <input
            type={showPasswords ? "text" : "password"}
            placeholder="Contraseña actual"
            value={oldPassword}
            onChange={(e) => setoldPassword(e.target.value)}
            required
          />
        </div>
        <div className="cp-input-group">
          <input
            type={showPasswords ? "text" : "password"}
            placeholder="Nueva contraseña"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="cp-input-group">
          <input
            type={showPasswords ? "text" : "password"}
            placeholder="Confirmar nueva contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <label className="cp-show-password">
          <input
            type="checkbox"
            checked={showPasswords}
            onChange={() => setShowPasswords(!showPasswords)}
          />
          Mostrar contraseñas
        </label>

        <div className="cp-botones">
          <button type="submit" className="cp-boton cp-boton-confirmar">
            Confirmar
          </button>
          <button
            type="button"
            className="cp-boton cp-boton-cancelar"
            onClick={() => navigate("/dashboard-user")}
          >
            Cancelar
          </button>
        </div>

        {error && <p className="cp-error">{error}</p>}
        {message && <p className="cp-success">{message}</p>}
      </form>
    </div>
  );
};

export default ChangePassword;
