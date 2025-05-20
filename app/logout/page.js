'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Registro() {
  const [form, setForm] = useState({ nombre: '', email: '', password: '' });
  const [mensaje, setMensaje] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) router.push('/');
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');

    try {
      const res = await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.mensaje || 'Error al registrar');

      setMensaje('✅ Registro exitoso. Ahora puedes iniciar sesión.');
      setForm({ nombre: '', email: '', password: '' });
    } catch (err) {
      setMensaje(`❌ ${err.message}`);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ maxWidth: '450px', width: '100%' }}>
        <div className="text-center mb-3">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1828/1828490.png"
            alt="Nuevo usuario"
            width="64"
            className="mb-2"
          />
          <h3 className="mb-0">Crear cuenta</h3>
        </div>

        {mensaje && (
          <div className={`alert mt-2 ${mensaje.startsWith('✅') ? 'alert-success' : 'alert-danger'}`}>
            {mensaje}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Registrarme</button>
        </form>
      </div>
    </div>
  );
}