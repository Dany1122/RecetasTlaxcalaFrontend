'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '../../lib/axios';

export default function MisRecetas() {
  const [recetas, setRecetas] = useState([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const usuarioGuardado = localStorage.getItem('usuario');
    const user = usuarioGuardado ? JSON.parse(usuarioGuardado) : null;

    if (!token || !user?.id) {
      setMensaje('Debes iniciar sesión para ver tus recetas.');
      return;
    }

    api.get(`/recipes/usuario/${user.id}`, {
      headers: { Authorization: token }
    })
      .then(res => setRecetas(res.data))
      .catch(err => {
        console.error(err);
        setMensaje('Error al cargar tus recetas.');
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Mis Recetas</h2>

      {mensaje && (
        <div className="alert alert-warning" role="alert">
          {mensaje}
        </div>
      )}

      {!mensaje && recetas.length === 0 && (
        <div className="alert alert-info" role="alert">
          No tienes recetas registradas.
        </div>
      )}

      <div className="row g-4">
        {recetas.map((receta) => (
          <div className="col-sm-12 col-md-6 col-lg-4" key={receta._id}>
            <div className="card h-100 shadow-sm">
              {/* Imagen */}
              {receta.imagenes?.length > 0 ? (
                <img
                  src={`http://localhost:4000${receta.imagenes[0]}`}
                  className="card-img-top"
                  alt={receta.nombre}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              ) : (
                <div
                  className="d-flex align-items-center justify-content-center bg-light text-muted"
                  style={{ height: '200px' }}
                >
                  No existe imagen para esta receta
                </div>
              )}

              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title">{receta.nombre}</h5>
                  <p className="card-text">
                    <strong>Calorías:</strong> {receta.calorias}
                  </p>
                  <p className="card-text">
                    <strong>Ingredientes:</strong> {receta.ingredientes.join(', ')}
                  </p>
                  <p className="card-text">
                    <strong>Procedimiento:</strong> {receta.procedimiento.join(' → ')}
                  </p>
                </div>
                <Link
                  href={`/mis-recetas/editar/${receta._id}`}
                  className="btn btn-outline-primary btn-sm mt-3"
                >
                  Editar
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}