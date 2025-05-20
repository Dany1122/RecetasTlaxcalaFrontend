'use client';

import { useEffect, useState } from 'react';
import api from '../lib/axios';
import CardReceta from '../components/CardReceta';

export default function Page() {
  const [recetas, setRecetas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [expandida, setExpandida] = useState(null);

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

    const toggleExpandir = (id) => {
    setExpandida(expandida === id ? null : id);
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

      <h1 className="mb-4">Recetas Tlaxcaltecas</h1>

      {loading && <p>Cargando recetas...</p>}
      {error && <p className="text-danger">{error}</p>}

      {/* Tarjetas de recetas */}
      <div className="row g-4">
        {recetas.map((receta) => (
          <div className="col-sm-12 col-md-6 col-lg-4" key={receta._id}>
            <CardReceta receta={receta} />
          </div>
        ))}
      </div>
    </main>
  );
}
