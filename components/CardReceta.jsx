'use client';
import { useState } from 'react';

export default function CardRecetaBootstrap({ receta }) {
  const [expandida, setExpandida] = useState(false);

  const toggleExpandir = () => setExpandida(!expandida);

  return (
    <div className="card h-100 shadow-sm">
      {/* Imagen o mensaje */}
      {receta.imagenes?.length > 0 ? (
        <img
          src={`http://localhost:4000${receta.imagenes[0]}`}
          className="card-img-top"
          alt={receta.nombre}
          style={{ height: '200px', objectFit: 'cover' }}
        />
      ) : (
        <div className="d-flex align-items-center justify-content-center bg-light text-muted" style={{ height: '200px' }}>
          No existe imagen para esta receta
        </div>
      )}

      {/* Contenido */}
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title">{receta.nombre}</h5>
          <p className="card-text">
            ⏱ 30 min
          </p>
        </div>

        <button className="btn btn-outline-success mt-2" onClick={toggleExpandir}>
          {expandida ? 'Cerrar' : 'Ver más'}
        </button>
      </div>

      {/* Expansión */}
      {expandida && (
        <div className="card-footer bg-light">
          <p><strong>Historia:</strong> {receta.historia}</p>
          <p><strong>Ingredientes:</strong> {receta.ingredientes?.join(', ')}</p>
          <p><strong>Pasos:</strong> {receta.procedimiento?.join(' → ')}</p>
        </div>
      )}
    </div>
  );
}