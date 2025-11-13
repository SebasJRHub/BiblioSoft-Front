import React, { useState } from "react";
import "./LoginForm.css";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const validarPassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.,;:?¡¿_+\-=])[A-Za-z0-9!@#$%^&*.,;:?¡¿_+\-=]{8,30}$/;
    return regex.test(password);
  };

  const validarUsuario = (usuario) => {
    return usuario.length > 0 && usuario.length <= 10;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!validarUsuario(username)) {
      setErrorMsg("El usuario es obligatorio y debe tener 10 o menos caracteres");
      return;
    }

    if (!validarPassword(password)) {
      setErrorMsg("La contraseña no es correcta, por favor verifique o ingrese al link de recuperar contraseña");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.token);

      if (response.data.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMsg("El usuario no existe, por favor intente de nuevo o regístrese.");
      } else if (error.response && error.response.status === 401) {
        setErrorMsg("La contraseña no es correcta, por favor verifique o ingrese al link de recuperar contraseña.");
      } else {
        setErrorMsg("Error al iniciar sesión. Verifique sus credenciales.");
      }
    }
  };

  return (
    <div className="lf-container">
      <form onSubmit={handleSubmit}>
        <h2 className="lf-titulo">Bibliosoft</h2>
        <div className="lf-inputs">
          <input
            type="text"
            placeholder="Usuario"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            maxLength={10}
          />
          <FaUser className="lf-icono" />
        </div>
        <div className="lf-inputs">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            maxLength={30}
          />
          <span
            className="lf-iconoOjo"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          <FaLock className="lf-icono" />
        </div>
        <div className="lf-recuperarCon">
          <Link to="/forgot">¿Olvidaste tu contraseña?</Link>
        </div>
        <button type="submit" className="lf-boton">
          Iniciar Sesión
        </button>
        {errorMsg && <p className="lf-error">{errorMsg}</p>}
        <div className="lf-registrar">
          <p>
            ¿No tienes una cuenta? <a href="">Regístrate</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
