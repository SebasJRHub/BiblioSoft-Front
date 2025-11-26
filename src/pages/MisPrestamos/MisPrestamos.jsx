import React, { useState, useEffect, useRef } from 'react';
import './MisPrestamos.css';

function MisPrestamos() {
  const [prestamos, setPrestamos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('TODOS');
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [prestamoSeleccionado, setPrestamoSeleccionado] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    cargarMisPrestamos();
  }, []);

  const renovarPrestamo = async (prestamoId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:8080/api/prestamo/renovar/${prestamoId}`,
      {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      }
    );

    if (!response.ok) {
      throw new Error("Error al renovar el préstamo");
    }

    const data = await response.json();

    setPrestamos(prev =>
      prev.map(p => p.id === prestamoId ? data : p)
    );

    alert("Préstamo renovado con éxito");
  } catch (error) {
    alert("No se pudo renovar el préstamo");
  }
}
  const cargarMisPrestamos = async () => {
    try {
      setLoading(true);
      setError('');

      const token = localStorage.getItem('token');

      if (!token) {
        setError('Debes iniciar sesión para ver tus préstamos');
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:8080/api/prestamo/mis-prestamos', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Error al cargar los préstamos');
      }

      const data = await response.json();
      setPrestamos(data);
    } catch (err) {
      console.error('Error:', err);
      setError('No se pudieron cargar tus préstamos. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };
  const abrirConfirmacion = (prestamoId) => {
    setPrestamoSeleccionado(prestamoId);
    setMostrarConfirmacion(true);
  };

  const cancelarConfirmacion = () => {
    setPrestamoSeleccionado(null);
    setMostrarConfirmacion(false);
  };

  const confirmarRenovacion = () => {
    renovarPrestamo(prestamoSeleccionado);
    setMostrarConfirmacion(false);
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 360;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const getEstadoColor = (estado) => {
    const colores = {
      SOLICITADO: '#FFA500',
      PRESTADO: '#4CAF50',
      DEVUELTO: '#2196F3',
      RECHAZADO: '#F44336'
    };
    return colores[estado] || '#757575';
  };

  const getEstadoTexto = (estado) => {
    const textos = {
      SOLICITADO: 'Solicitado',
      PRESTADO: 'Prestado',
      DEVUELTO: 'Devuelto',
      RECHAZADO: 'Rechazado'
    };
    return textos[estado] || estado;
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return 'N/A';
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const prestamosFiltrados =
    filtroEstado === 'TODOS'
      ? prestamos
      : prestamos.filter((p) => p.estado === filtroEstado);

  const contarPorEstado = (estado) => {
    return prestamos.filter((p) => p.estado === estado).length;
  };

  if (loading) {
    return (
      <div className="mis-prestamos-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Cargando tus préstamos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mis-prestamos-container">
      <div className="header">
        <h1>Mis Préstamos</h1>
        <button onClick={cargarMisPrestamos} className="btn-refresh">
          Actualizar
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}


      <div className="resumen-estados">
        <div className="estado-card solicitado">
          <span className="numero">{contarPorEstado('SOLICITADO')}</span>
          <span className="label">Solicitados</span>
        </div>
        <div className="estado-card prestado">
          <span className="numero">{contarPorEstado('PRESTADO')}</span>
          <span className="label">Prestados</span>
        </div>
        <div className="estado-card devuelto">
          <span className="numero">{contarPorEstado('DEVUELTO')}</span>
          <span className="label">Devueltos</span>
        </div>
        <div className="estado-card rechazado">
          <span className="numero">{contarPorEstado('RECHAZADO')}</span>
          <span className="label">Rechazados</span>
        </div>
      </div>


      <div className="filtros">
        <button
          className={filtroEstado === 'TODOS' ? 'filtro-btn active' : 'filtro-btn'}
          onClick={() => setFiltroEstado('TODOS')}
        >
          Todos ({prestamos.length})
        </button>
        <button
          className={filtroEstado === 'SOLICITADO' ? 'filtro-btn active' : 'filtro-btn'}
          onClick={() => setFiltroEstado('SOLICITADO')}
        >
          Solicitados
        </button>
        <button
          className={filtroEstado === 'PRESTADO' ? 'filtro-btn active' : 'filtro-btn'}
          onClick={() => setFiltroEstado('PRESTADO')}
        >
          Prestados
        </button>
        <button
          className={filtroEstado === 'DEVUELTO' ? 'filtro-btn active' : 'filtro-btn'}
          onClick={() => setFiltroEstado('DEVUELTO')}
        >
          Devueltos
        </button>
        <button
          className={filtroEstado === 'RECHAZADO' ? 'filtro-btn active' : 'filtro-btn'}
          onClick={() => setFiltroEstado('RECHAZADO')}
        >
          Rechazados
        </button>
      </div>

      <div className="carousel-container">
        {prestamosFiltrados.length > 0 && (
          <>
            <button
              className="carousel-btn left"
              onClick={() => scroll('left')}
              aria-label="Anterior"
            >
              ‹
            </button>
            <button
              className="carousel-btn right"
              onClick={() => scroll('right')}
              aria-label="Siguiente"
            >
              ›
            </button>
          </>
        )}

        <div className="prestamos-lista" ref={scrollRef}>
          {prestamosFiltrados.length === 0 ? (
            <div className="no-prestamos">
              <p>No tienes préstamos {filtroEstado !== 'TODOS' ? `en estado ${filtroEstado}` : ''}</p>
            </div>
          ) : (
            prestamosFiltrados.map((prestamo) => (
              <div key={prestamo.id} className="prestamo-card">
                <div className="prestamo-header">
                  <h3>{prestamo.libro?.titulo || 'Libro desconocido'}</h3>
                  <span
                    className="estado-badge"
                    style={{ backgroundColor: getEstadoColor(prestamo.estado) }}
                  >
                    {getEstadoTexto(prestamo.estado)}
                  </span>
                </div>

                <div className="prestamo-body">
                  <div className="info-row">
                    <span className="label">Autor:</span>
                    <span className="value">{prestamo.libro?.autor || 'N/A'}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Editorial:</span>
                    <span className="value">{prestamo.libro?.editorial || 'N/A'}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Código de préstamo:</span>
                    <span className="value">{prestamo.usuarioCode}</span>
                  </div>
                </div>

                <div className="prestamo-fechas">
                  <div className="fecha-item">
                    <span className="fecha-label">Solicitado:</span>
                    <span className="fecha-value">{formatearFecha(prestamo.fechaSolicitud)}</span>
                  </div>

                  {prestamo.fechaPrestamo && prestamo.estado !== 'SOLICITADO' && (
                    <div className="fecha-item">
                      <span className="fecha-label">Prestado:</span>
                      <span className="fecha-value">{formatearFecha(prestamo.fechaPrestamo)}</span>
                    </div>
                  )}

                  {prestamo.estado === 'PRESTADO' && (
                    <div className="fecha-item">
                      <span className="fecha-label">Vence:</span>
                      <span className="fecha-value">
                        {formatearFecha(prestamo.fechaDevolucion)}
                      </span>
                    </div>
                  )}

                  {prestamo.estado === 'DEVUELTO' && (
                    <div className="fecha-item">
                      <span className="fecha-label">Devuelto:</span>
                      <span className="fecha-value">
                        {formatearFecha(prestamo.fechaDevolucion)}
                      </span>
                    </div>
                  )}

                </div>
                {prestamo.estado === 'PRESTADO' && (
                <div className="prestamo-actions">
                  <button className={`renovar-btn ${prestamo.renovaciones >= 1 ? "btn-disabled" : ""}`}
                  onClick={()=> abrirConfirmacion(prestamo.id)}
                  disabled={prestamo.renovaciones >= 1}
                  
                  >{prestamo.renovaciones >= 1 ? "Renovación agotada" : "Renovar préstamo"}</button>
                </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      {mostrarConfirmacion && (
        <div className="modal-overlay">
          <div className="modal-contenido">
            <h3>Confirmar renovación</h3>
            <p>¿Estás seguro de que quieres renovar este préstamo?</p>

            <div className="modal-botones">
              <button className="modal-confirmar" onClick={confirmarRenovacion}>
                Renovar
              </button>
              <button className="modal-cancelar" onClick={cancelarConfirmacion}>
                Cancelar
              </button>

              
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MisPrestamos;