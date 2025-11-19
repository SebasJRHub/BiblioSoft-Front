import React, { useState } from "react";
import "./RegisterForm.css";
import { FaUser, FaLock, FaEnvelope, FaIdBadge, FaUserPlus, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    code: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validarPassword = (password) => {
    const regex =
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.,;:?¡¿_+\-=])[A-Za-z0-9!@#$%^&*.,;:?¡¿_+\-=]{8,30}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Las contraseñas no coinciden.");
      return;
    }

    if (!validarPassword(formData.password)) {
      setErrorMsg("La contraseña no cumple los requisitos de seguridad.");
      return;
    }

    try {
    await axios.post("http://localhost:8080/api/user/register", formData);
    setSuccessMsg("Registro exitoso. Ahora puedes iniciar sesión.");
    setTimeout(() => navigate("/"), 2000);
  } catch (error) {
    if (error.response && error.response.data) {
      
      setErrorMsg(error.response.data.message || "Error en el registro.");
    } else {
      setErrorMsg("Error inesperado al registrar usuario: Puede que el usuario o codigo ya se encuentren registrados");
    }
  }

  };

  return (
    <div className="rf-container">
      <form onSubmit={handleSubmit}>
        <h2 className="rf-titulo">Registro</h2>

        <div className="rf-inputs">
          <input
            type="text"
            name="firstname"
            placeholder="Nombre"
            required
            value={formData.firstname}
            onChange={handleChange}
            pattern="[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+"
            title="Solo son admitidas letras en este campo"
          />
          <FaUser className="rf-icono" />
        </div>

        <div className="rf-inputs">
          <input
            type="text"
            name="lastname"
            placeholder="Apellido"
            required
            value={formData.lastname}
            onChange={handleChange}
            pattern="[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+"
            title="Solo son admitidas letras en este campo"
          />
          <FaUser className="rf-icono" />
        </div>

        <div className="rf-inputs">
          <input
            type="text"
            name="username"
            placeholder="Usuario"
            required
            value={formData.username}
            onChange={handleChange}
            maxLength={10}
            title="Identificacion dentro del sitio web"
          />
          <FaUserPlus className="rf-icono" />
        </div>

        <div className="rf-inputs">
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            required
            value={formData.email}
            onChange={handleChange}
            title="Solo correos electronicos '@' "
          />
          <FaEnvelope className="rf-icono" />
        </div>

        <div className="rf-inputs">
          <input
            type="text"
            name="code"
            placeholder="Código"
            required
            value={formData.code}
            onChange={handleChange}
            minLength={5}
            maxLength={9}
            pattern="[0-9]+"
            title="Solo números, entre 5 y 9 dígitooos"
          />
          <FaIdBadge className="rf-icono" />
        </div>

        <div className="rf-inputs">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Contraseña"
            required
            value={formData.password}
            onChange={handleChange}
            title="Debe contener minimo 1 mayuscula, 1 número y 8 caracteres"
          />
          <span
            className="rf-iconoOjo"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          <FaLock className="rf-icono" />
        </div>

        <div className="rf-inputs">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar Contraseña"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <FaLock className="rf-icono" />
        </div>

        <button type="submit" className="rf-boton">
          Registrarse
        </button>

        {errorMsg && <p className="rf-error">{errorMsg}</p>}
        {successMsg && <p className="rf-exito">{successMsg}</p>}

        <div className="rf-registrar">
          <p>
            ¿Ya tienes cuenta? <a href="/">Inicia sesión</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
