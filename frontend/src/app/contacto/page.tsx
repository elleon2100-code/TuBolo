"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Contacto() {
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);
  const [exito, setExito] = useState(false);
  const [error, setError] = useState('');

  const enviarMensaje = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setError('');
    setExito(false);

    try {
      // Petición segura enviada directamente a nuestra API Route interna
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, mensaje }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Hubo un error al procesar el mensaje.');
      }

      setExito(true);
      setCorreo('');
      setMensaje('');
    } catch (err: any) {
      setError(err.message || 'Hubo un problema al enviar tu mensaje. Inténtalo de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-gray-800 font-sans py-16 px-4 flex items-center justify-center">
      <main className="max-w-xl w-full bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-sm">
        <Link href="/" className="inline-flex min-h-12 items-center gap-2 rounded-xl px-4 text-xs font-black text-blue-600 uppercase tracking-widest mb-6 hover:text-blue-700 hover:bg-blue-50/50 transition-all group">
          <span className="transform group-hover:-translate-x-1 transition-transform" aria-hidden="true">←</span> Volver al inicio
        </Link>

        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-xl mx-auto mb-4">
            ✉️
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Bandeja de Contacto</h1>
          <p className="text-sm text-gray-400 font-medium max-w-sm mx-auto leading-relaxed">
            ¿Tienes alguna sugerencia para la suite o has detectado alguna anomalía estadística? Déjanos un mensaje.
          </p>
        </div>

        <form onSubmit={enviarMensaje} className="space-y-6">
          <div>
            <label htmlFor="correo" className="block text-xs font-black text-gray-900 uppercase tracking-widest mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              disabled={cargando}
              placeholder="ejemplo@correo.com"
              className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 bg-gray-50/50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              required
            />
          </div>

          <div>
            <label htmlFor="mensaje" className="block text-xs font-black text-gray-900 uppercase tracking-widest mb-2">
              Tu Mensaje
            </label>
            <textarea
              id="mensaje"
              rows={5}
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              disabled={cargando}
              placeholder="Escribe detalladamente tu consulta aquí (Mínimo 10 caracteres)..."
              className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 bg-gray-50/50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
              required
            ></textarea>
          </div>

          {error && <div className="p-4 bg-red-50 text-red-600 text-sm font-semibold rounded-2xl border border-red-100">⚠️ {error}</div>}
          {exito && <div className="p-4 bg-green-50 text-green-600 text-sm font-semibold rounded-2xl border border-green-100">✅ ¡Mensaje enviado con éxito! Analizaremos tu reporte a la brevedad.</div>}

          <button
            type="submit"
            disabled={cargando}
            className="w-full py-4 bg-blue-600 text-white font-black text-sm rounded-2xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20 flex items-center justify-center disabled:opacity-50"
          >
            {cargando ? 'Enviando reporte...' : '🚀 Enviar Mensaje'}
          </button>
        </form>
      </main>
    </div>
  );
}
