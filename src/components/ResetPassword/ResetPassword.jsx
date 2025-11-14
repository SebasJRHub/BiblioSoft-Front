import React, { useState, useEffect } from 'react';
import './ResetPassword.css';
import { FaLock } from "react-icons/fa";
import { Link } from 'react-router-dom';

function ResetPassword() {
    const [tokenValido, setTokenValido] = useState(false);
    const [loading, setLoading] = useState(true);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [mostrarPassword, setMostrarPassword] = useState(false);

 
    const token = new URLSearchParams(window.location.search).get("token");
    

    useEffect(() => {
        if (!token) {
            setTokenValido(false);
            setLoading(false);
            return;
        }

        fetch(`http://localhost:8080/auth/validate-token?token=${token}`)
            .then((res) => {
                setTokenValido(res.ok);
            })
            .catch(() => setTokenValido(false))
            .finally(() => setLoading(false));
    }, [token]);

    const validarPassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.,;:?¡¿_+\-=])[A-Za-z0-9!@#$%^&*.,;:?¡¿_+\-=]{8,30}$/;
    return regex.test(password);
  };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");
        setSubmitting(true);

        if (password !== confirmPassword) {
            setErrorMsg("Las contraseñas no coinciden.");
            setSubmitting(false);
            return;
        }
        if (!validarPassword(password)) {
        setErrorMsg("La contraseña debe tener entre 8 y 30 caracteres, incluir al menos una letra mayúscula, un número y un carácter especial.");
        return;
    }

        try {
            const response = await fetch("http://localhost:8080/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password }),
            });

            const data = await response.text(); 

            if (response.ok) {
                setSuccessMsg(data);
                setPassword("");
                setConfirmPassword("");
            } else {
                setErrorMsg(data);
            }
        } catch (error) {
            setErrorMsg("Error de conexión con el servidor.");
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <h2>Validando enlace...</h2>;
    }

    if (!tokenValido) {
        return <h2>El enlace no es válido o ha expirado.</h2>;
    }

    return (
        <div className='rp-container'>
            <form onSubmit={handleSubmit}>
                <h2 className='rp-titulo'>Recuperar Contraseña</h2>
                <p>Ingrese su nueva contraseña</p>
                <div className='rp-input'>
                    <input 
                        type={mostrarPassword ? "text" : "password"}
                        value={password}
                        placeholder='Nueva contraseña'
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                    <FaLock className="rp-icono" />
                </div>
                <div className="rp-input">
                    <input
                        type={mostrarPassword ? "text" : "password"}
                        value={confirmPassword}
                        placeholder="Confirmar contraseña"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required />
                    <FaLock className="rp-icono" />
                </div>
                 <div className='rp-show-password'>
                    <input
                        type="checkbox"
                        id="mostrarPassword"
                        checked={mostrarPassword}
                       onChange={(e) => setMostrarPassword(e.target.checked)}
                    />
                    <label htmlFor="mostra|rPassword">Mostrar contraseña</label>
                </div>
                <div className='rp-botones'>
                    <button type='submit' className='rp-boton' disabled={submitting}>
                        {submitting ? "Enviando..." : "Enviar"}
                    </button>
                    <Link to={"/forgot-password"} className='rp-boton'><button type='reset' className='rp-boton'>Cancelar</button></Link>
                </div>
                {errorMsg && <p className="rp-error">{errorMsg}</p>}
                {successMsg && <p className="rp-exito">{successMsg}</p>}
            </form>
        </div>
    );
}

export default ResetPassword;
