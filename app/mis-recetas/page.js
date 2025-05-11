'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '../../lib/axios';

export default function MisRecetas() {
  const [recetas, setRecetas] = useState([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('usuario') || '{}');

    if (!token || !user?.id) {
      setMensaje('Debes iniciar sesión para ver tus recetas.');
      return;
    }

    //Axios con token y user.id
    api.get(`/recipes/usuario/${user.id}`, {
      headers: { Authorization: token }
    })
    .then(res => setRecetas(res.data))
    .catch(err => {
      console.error(err);
      setMensaje('Error al cargar tus recetas');
    });
  }, []);

  return (
    <div className="container mt-4">
      <h2>Mis Recetas</h2>

      {mensaje && <p>{mensaje}</p>}

      {recetas.length > 0 ? (
        <ul className="list-group">
          {recetas.map(receta => (
            <li key={receta._id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5>{receta.nombre}</h5>
                  <p><strong>Calorías:</strong> {receta.calorias}</p>
                  <p><strong>Ingredientes:</strong> {receta.ingredientes.join(', ')}</p>
                  <p><strong>Procedimiento:</strong> {receta.procedimiento.join(' → ')}</p>
                </div>

                <Link href={`/mis-recetas/editar/${receta._id}`} className="btn btn-sm btn-outline-primary">
                  Editar
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        !mensaje && <p>No tienes recetas registradas.</p>
      )}
    </div>
  );
}