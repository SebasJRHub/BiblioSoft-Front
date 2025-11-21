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
             <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus numquam consequatur ipsa nesciunt inventore blanditiis qui vitae culpa.
               Quis iusto nemo nesciunt molestiae assumenda labore magnam quo aliquam iste in!</p>
          </section>
          <section>
              <h2>Mis prestamos</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate facere aliquid praesentium minus explicabo quisquam impedit!
                 Non nam quos omnis, ratione, aliquid doloremque iste eligendi sequi consectetur quo minima ex.</p>
          </section>
          <section>
              <h2>Ajustes de cuenta</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi doloribus incidunt omnis nam repudiandae. Minus voluptatem molestiae
                 quod doloribus, deserunt earum ut ducimus debitis? Nesciunt harum laborum aliquam natus ex.</p>
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
