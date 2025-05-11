'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.mensaje || 'Error');

      // ✅ Guardar datos y redirigir
      localStorage.setItem('token', data.token);
      localStorage.setItem('usuario', JSON.stringify(data.user));
      localStorage.setItem('mensaje_inicio', `¡Bienvenido, ${data.user.nombre}!`);
      window.location.href = '/';
    } catch (err) {
      setMensaje(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow p-4 rounded mt-4">
      <h2 className="text-xl font-bold mb-4">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo"
          className="form-control mb-2"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="form-control mb-3"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-danger w-100">Entrar</button>
        {mensaje && <p className="text-muted mt-3">{mensaje}</p>}
      </form>
    </div>
  );
}