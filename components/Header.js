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
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link href="/" className="navbar-brand fw-bold text-white">Recetas Tlaxcaltecas</Link>

      <div className="collapse navbar-collapse justify-content-between">
        <ul className="navbar-nav mb-2 mb-lg-0">
          <li className="nav-item">
            <Link href="/" className="nav-link text-white">Inicio</Link>
          </li>
          {!autenticado ? (
            <>
            <li className="nav-item">
              <Link href="/login" className="nav-link text-white">Iniciar Sesión</Link>
            </li>
            <li className="nav-item">
                  <Link href="/logout" className="nav-link  text-white">Regístrate</Link>
            </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link href="/nueva-receta" className="nav-link text-white">Agregar Receta</Link>
              </li>
              <li className="nav-item">
                <Link href="/mis-recetas" className="nav-link text-white">Mis Recetas</Link>
              </li>
              <li className="nav-item">
                <button onClick={cerrarSesion} className="btn btn-outline-light ms-3">
                  Cerrar sesión
                </button>
              </li>
            </>
          )}
        </ul>

        {autenticado && usuario && (
          <div className="d-flex align-items-center text-white">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="usuario"
              width="32"
              height="32"
              className="me-2 rounded-circle"
            />
             <Link href="/perfil" className="nav-link">
                Bienvenido, {usuario.nombre}
             </Link>
          </div>


        )}

      </div>
    </nav>
  );
}