"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Diccionario base (se puede expandir más adelante en la base de datos, por ahora hardcodeado para velocidad)
const diccionarioBase = [
  { palabra: "Agua", numero: "01", descripcion: "Agua limpia, río o lluvia." },
  { palabra: "Zapatos", numero: "04", descripcion: "Calzado nuevo o viejo." },
  { palabra: "Embarazo", numero: "09", descripcion: "Mujer embarazada o dar a luz." },
  { palabra: "Dinero", numero: "10", descripcion: "Billetes, monedas o riqueza." },
  { palabra: "Perro", numero: "14", descripcion: "Perro amigable, ladrando o bravo." },
  { palabra: "Sangre", numero: "18", descripcion: "Heridas, cortaduras o sangre." },
  { palabra: "Culebra", numero: "21", descripcion: "Serpientes vivas o muertas." },
  { palabra: "Borracho", numero: "24", descripcion: "Persona ebria o bebiendo alcohol." },
  { palabra: "Policía", numero: "29", descripcion: "Autoridad, arresto o cárcel." },
  { palabra: "Matrimonio", numero: "31", descripcion: "Boda, iglesia o vestido de novia." },
  { palabra: "Muerto", numero: "47", descripcion: "Alguien fallecido o un ataúd." },
  { palabra: "Bruja", numero: "75", descripcion: "Hechicería o escoba." },
  { palabra: "Flores", numero: "81", descripcion: "Jardín, rosas o arreglos florales." },
  { palabra: "Loco", numero: "22", descripcion: "Persona perdiendo la razón." },
].sort((a, b) => a.palabra.localeCompare(b.palabra));

export default function DiccionarioSuenos() {
  const [busqueda, setBusqueda] = useState("");

  const filtrados = diccionarioBase.filter(item => 
    item.palabra.toLowerCase().includes(busqueda.toLowerCase()) || 
    item.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
    item.numero.includes(busqueda)
  );

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-gray-900 font-sans pb-20">
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <a href="/" className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors">
            ← Volver a Resultados
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pt-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
            Diccionario de <span className="text-blue-600">Sueños</span>
          </h1>
          <p className="text-gray-500 font-medium max-w-lg mx-auto">
            ¿Soñaste con algo extraño anoche? Busca la palabra clave de tu sueño y descubre qué número te está pidiendo la suerte.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl">🔍</span>
            <input 
              type="text" 
              placeholder="Ej. Agua, Dinero, Perro..." 
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-12 pr-6 py-4 text-lg font-bold rounded-2xl border-2 border-gray-100 bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-400 transition-all text-gray-700 shadow-sm"
            />
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AnimatePresence>
              {filtrados.length > 0 ? (
                filtrados.map((item, index) => (
                  <motion.div
                    key={item.palabra}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2, delay: index * 0.03 }}
                    className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex items-center justify-between gap-4"
                  >
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{item.palabra}</h3>
                      <p className="text-sm text-gray-500">{item.descripcion}</p>
                    </div>
                    <div className="w-14 h-14 shrink-0 rounded-xl bg-blue-50 text-blue-600 font-black text-2xl flex items-center justify-center border border-blue-100">
                      {item.numero}
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="col-span-1 sm:col-span-2 text-center py-10 bg-white rounded-2xl border border-gray-100"
                >
                  <span className="text-4xl block mb-2">🤷♂️</span>
                  <p className="text-gray-500 font-medium">No encontramos ese sueño. Intenta con otra palabra.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
