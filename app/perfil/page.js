'use client';
import { useEffect, useState } from 'react';

export default function PerfilUsuario() {
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return setError('Debes iniciar sesión.');

    fetch('http://localhost:4000/api/auth/perfil', {
      headers: {
        Authorization: token
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) return setError(data.error);
        setUsuario(data);
      })
      .catch(err => setError('Error al cargar perfil'));
  }, []);

  if (error) {
    return <div className="container mt-5 alert alert-danger text-center">{error}</div>;
  }

  if (!usuario) {
    return <div className="container mt-5 text-center">Cargando perfil...</div>;
  }

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.location.href = '/login';
  };
  
  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="card shadow" style={{ maxWidth: '500px', width: '100%' }}>
        <div className="card-body text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="Perfil"
            className="rounded-circle mb-3"
            width="100"
            height="100"
          />
          <h4 className="card-title mb-3">{usuario.nombre}</h4>
          <p className="text-muted mb-1"><strong>Correo:</strong> {usuario.email}</p>
          <p className="text-muted"><strong>ID de usuario:</strong> {usuario._id}</p>

          <div className="mt-4">
            <button className="btn btn-outline-primary me-2">Editar perfil</button>
            <button onClick={cerrarSesion} className="btn btn-outline-danger">Cerrar sesión</button>
          </div>
        </div>
      </div>
    </div>
  );
}