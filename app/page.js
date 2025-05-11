'use client';

import { useEffect, useState } from 'react';
import api from '../lib/axios';

export default function Page() {
  const [recetas, setRecetas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    // Cargar mensaje de bienvenida si viene del login
    const mensajeGuardado = localStorage.getItem('mensaje_inicio');
    if (mensajeGuardado) {
      setMensaje(mensajeGuardado);
      localStorage.removeItem('mensaje_inicio');
    }

    // Cargar recetas desde la API
    const obtenerRecetas = async () => {
      try {
        const res = await api.get('/recipes');
        setRecetas(res.data);
      } catch (err) {
        setError('No se pudieron cargar las recetas.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    obtenerRecetas();
  }, []);

  return (
    <main className="container mt-4">
      {mensaje && (
        <div className="alert alert-success" role="alert">
          {mensaje}
        </div>
      )}

      <h1>Recetas Tlaxcaltecas</h1>

      {loading && <p>Cargando recetas...</p>}
      {error && <p className="text-danger">{error}</p>}

      <ul className="list-group mt-3">
        {recetas.map((receta) => (
          <li key={receta._id} className="list-group-item">
            <h5>{receta.nombre}</h5>
            <p><strong>Calorías:</strong> {receta.calorias}</p>
            <p><strong>Historia:</strong> {receta.historia}</p>
            <p><strong>Ingredientes:</strong> {receta.ingredientes?.join(', ')}</p>
            <p><strong>Pasos:</strong> {receta.procedimiento?.join(' → ')}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
