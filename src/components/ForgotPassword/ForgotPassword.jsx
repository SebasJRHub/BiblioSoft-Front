import React, { useState } from 'react';
import './ForgotPassword.css';
import { FaEnvelope } from "react-icons/fa";
import { Link } from 'react-router-dom';

function ForgotPassword() {
   const [email, setEmail] = useState('');
   const [errorMsg, setErrorMsg] = useState('');
   const [successMsg, setSuccessMsg] = useState('');

   const validarCorreo = (correo) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(correo);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setErrorMsg('');
      setSuccessMsg('');
      if (!validarCorreo(email)) {
         setErrorMsg('Por favor ingrese un correo electrónico válido.');
         return;
      }
      try {
         const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/email/send`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
         });

         if (response.ok) {
            setSuccessMsg('Se ha enviado un enlace de recuperación a tu correo.');
            setEmail('');
         } else {
            setErrorMsg('Hubo un error al enviar el correo.');
         }
      } catch (error) {
         setErrorMsg('Error de conexión con el servidor.');
          console.error(error);
      }
   };
   

   return (
      <div className='fp-container'>
         <form onSubmit={handleSubmit}>
            <h2 className='fp-titulo'>¿Olvido su Contraseña?</h2>
            <p>Ingrese su correo electronico...</p>
            <div className='fp-input'>
               <input type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Correo Electrónico'
                  required />
               <FaEnvelope className='fp-icono' />

            </div>
            <div className='fp-botones'>
               <button type='submit' className='fp-boton'>Enviar</button>
               <Link to={"/"} className='fp-boton'><button type='reset' className='fp-boton'>Cancelar</button></Link>
            </div>
            {errorMsg && <p className='fp-error'>{errorMsg}</p>}
            {successMsg && <p className='fp-exito'>{successMsg}</p>}
         </form>
      </div>
   );
}
export default ForgotPassword;