'use client';
import { useState } from 'react';

export default function NuevaReceta() {
  const [form, setForm] = useState({
    nombre: '',
    ingredientes: '',
    procedimiento: '',
    calorias: '',
    historia: ''
  });
  const [imagen, setImagen] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = e => {
    setImagen(e.target.files[0]); // Solo una por ahora
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    const token = localStorage.getItem('token');
    const formData = new FormData();

    // Agregar campos de texto
    formData.append('nombre', form.nombre);
    formData.append('historia', form.historia);
    formData.append('calorias', form.calorias);
    formData.append('ingredientes', form.ingredientes.split(',').map(i => i.trim()));
    formData.append('procedimiento', form.procedimiento.split(',').map(p => p.trim()));

    // Agregar imagen (nombre del campo debe coincidir con .array('imagenes'))
    if (imagen) {
      formData.append('imagenes', imagen); // puedes agregar más si cambias a múltiples
    }

    try {
      const res = await fetch('http://localhost:4000/api/recipes', {
        method: 'POST',
        headers: {
          Authorization: token
        },
        body: formData
      });

      if (!res.ok) throw new Error('Error al guardar receta');

      setMensaje('✅ Receta guardada con imagen');
      setForm({ nombre: '', ingredientes: '', procedimiento: '', calorias: '', historia: '' });
      setImagen(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Registrar Nueva Receta</h2>

      {mensaje && <div className="alert alert-success">{mensaje}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input type="text" name="nombre" className="form-control" value={form.nombre} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Ingredientes (coma separados)</label>
          <input type="text" name="ingredientes" className="form-control" value={form.ingredientes} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Procedimiento (coma separados)</label>
          <textarea name="procedimiento" className="form-control" rows="3" value={form.procedimiento} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Historia</label>
          <textarea name="historia" className="form-control" rows="3" value={form.historia} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Calorías</label>
          <input type="number" name="calorias" className="form-control" value={form.calorias} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Imagen</label>
          <input type="file" name="imagenes" className="form-control" accept="image/*" onChange={handleImageChange} />
        </div>

        <button type="submit" className="btn btn-success">Guardar Receta</button>
      </form>
    </div>
  );
}