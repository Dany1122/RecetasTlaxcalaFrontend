'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Header() {
  const [autenticado, setAutenticado] = useState(false);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('usuario');
    setAutenticado(!!token);
    if (userData) {
      try {
        setUsuario(JSON.parse(userData));
      } catch (err) {
        console.error('Error al leer usuario:', err);
      }
    }
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.location.href = '/login';
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
        <Link href="/" className="navbar-brand fw-bold">Recetas Tlaxcaltecas</Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/" className="nav-link">Inicio</Link>
            </li>

            {!autenticado && (
              <li className="nav-item">
                <Link href="/login" className="nav-link">Iniciar Sesión</Link>
              </li>
            )}

            {autenticado && (
              <>
                <li className="nav-item">
                  <Link href="/nueva-receta" className="nav-link">Agregar Receta</Link>
                </li>
                <li className="nav-item">
                  <Link href="/mis-recetas" className="nav-link">Mis Recetas</Link>
                </li>
                <li className="nav-item">
                  <button onClick={cerrarSesion} className="btn btn-outline-danger ms-3">
                    Cerrar sesión
                  </button>
                </li>
              </>
            )}
          </ul>

          {autenticado && usuario && (
            <div className="d-flex align-items-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="usuario"
                width="32"
                height="32"
                className="me-2 rounded-circle"
              />
              <span className="navbar-text">Bienvenido, {usuario.nombre}</span>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}