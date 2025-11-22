import React from "react";
import "./UserDashboard.css";
import { logout } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import HeaderUser from "../../components/HeaderUser/HeaderUser";
import { Link } from "react-router-dom";
import { FaBook, FaUserCog, FaHistory ,FaDoorOpen} from "react-icons/fa";

export default function UserDashboard() {
  const navigate = useNavigate();

  return (
    
    <div className="user-container">
      <aside className="column">
        <h2>Panel de Usuario</h2>
        <div className="buttons-group">
          <ul className="menu">
            <li>
              <span className="icon"><FaBook/></span>
              <Link to="/search-book">CATOLOGO DE LIBROS</Link>
            </li>
            <li>
              <span className="icon"><FaHistory/></span>
              <Link to="/mis-prestamos">MIS PRESTAMOS</Link>
            </li>
            <li>
              <span className="icon"><FaUserCog/></span>
              <Link to="#">AJUSTES DE CUENTA</Link>
            </li>
          </ul>
        </div>
        <span className="logout-icon"
                        onClick={() => {
                          logout();
                          navigate("/")
                          ;
                        }}
                      >
                        <FaDoorOpen />
          </span>
      </aside>
      <main className="main">
        <h2 className="title">Bienvenido a tu Biblioteca Digital</h2>
        <p>Explora el catálogo, consulta tus préstamos o administra tu cuenta.</p>
        <div className="sections">
          <section>
             <h2>Catalogo de libros</h2>
             <p>Explora todos los libros disponibles en la biblioteca y encuentra tu próxima lectura</p>
          </section>
          <section>
              <h2>Mis prestamos</h2>
              <p>Revisa los libros que has solicitado, los que tienes pendientes por devolver y su estado actual.</p>
          </section>
          <section>
              <h2>Ajustes de cuenta</h2>
              <p>Actualiza tu información personal, cambia tu contraseña y gestiona la configuración de tu perfil.</p>
          </section>
        </div>
      </main>
      {/* <h2 className="user-title">Panel de Usuario</h2>

      <div className="user-buttons">

        <button
          className="user-btn"
          onClick={() => navigate("/change-password")}
        >
          Cambiar Contraseña
        </button>

        <button
          className="user-btn"
          onClick={() => {
            logout();
            navigate("/buscar");
          }}
        >
          BUSCAR LIBROS
        </button>

        <button
          className="user-btn logout-btn"
          onClick={() => {
            logout();
            navigate("/");

          }}
        >
          Cerrar Sesión
        </button>

      </div> */}
    </div>
  );
}
