'use client';
import { useState } from 'react';

export default function NuevaReceta() {
  const [form, setForm] = useState({
    nombre: '', ingredientes: '', procedimiento: '', imagen: '', calorias: '', historia: ''
  });
  const [mensaje, setMensaje] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:4000/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({
          ...form,
          ingredientes: form.ingredientes.split(',').map(i => i.trim()),
          procedimiento: form.procedimiento.split(',').map(p => p.trim()),
          calorias: parseInt(form.calorias)
        })
      });
      if (!res.ok) throw new Error('Error al guardar receta');
      setMensaje('Receta guardada');
      setForm({ nombre: '', ingredientes: '', procedimiento: '', imagen: '', calorias: '', historia: '' });
    } catch (err) {
      setMensaje(err.message);
    }
  };

  return (
    <div>
        <h2>Nueva Receta</h2>
        <form onSubmit={handleSubmit}>
          {["nombre", "ingredientes", "procedimiento", "imagen", "calorias", "historia"].map(campo => (
            <input
              key={campo}
              name={campo}
              value={form[campo]}
              onChange={handleChange}
              placeholder={campo.charAt(0).toUpperCase() + campo.slice(1)}
              required={campo !== "calorias"}
            />
          ))}
          <button type="submit">Guardar</button>
          {mensaje && <p>{mensaje}</p>}
        </form>
    </div>
  );
}
