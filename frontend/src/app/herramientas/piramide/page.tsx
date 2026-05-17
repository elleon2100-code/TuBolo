"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function PiramideSuerte() {
  // Inicializamos con la fecha actual en formato YYYY-MM-DD
  const [fecha, setFecha] = useState("");
  const [piramide, setPiramide] = useState<string[][]>([]);

  useEffect(() => {
    const hoy = new Date();
    // Ajuste al formato local
    const yyyy = hoy.getFullYear();
    const mm = String(hoy.getMonth() + 1).padStart(2, '0');
    const dd = String(hoy.getDate()).padStart(2, '0');
    setFecha(`${yyyy}-${mm}-${dd}`);
  }, []);

  useEffect(() => {
    if (fecha) generarPiramide(fecha);
  }, [fecha]);

  const generarPiramide = (fechaSeleccionada: string) => {
    // Extraemos solo los números de la fecha (ej. 2026-05-17 -> 20260517)
    const numerosBase = fechaSeleccionada.replace(/\D/g, '').split('').map(Number);
    if (numerosBase.length === 0) return;

    let filas: string[][] = [numerosBase.map(String)];
    let filaActual = numerosBase;

    // Reducción en cascada hasta que quede 1 o 2 números en la punta
    while (filaActual.length > 2) {
      const nuevaFila: number[] = [];
      for (let i = 0; i < filaActual.length - 1; i++) {
        const suma = filaActual[i] + filaActual[i + 1];
        // Si la suma es 10 o más, nos quedamos con el último dígito (ej. 7+5=12 -> 2)
        nuevaFila.push(suma % 10);
      }
      filas.push(nuevaFila.map(String));
      filaActual = nuevaFila;
    }

    setPiramide(filas);
  };

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
            La Pirámide de <span className="text-blue-600">La Suerte</span>
          </h1>
          <p className="text-gray-500 font-medium max-w-lg mx-auto">
            Descubre los números ocultos en la fecha de hoy o cualquier fecha especial. Combina los números adyacentes para armar tu jugada.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.08)] border border-gray-100 max-w-2xl mx-auto">
          {/* Selector de Fecha */}
          <div className="flex flex-col items-center gap-3 mb-10">
            <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Selecciona una fecha</label>
            <input 
              type="date" 
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="px-6 py-3 text-lg font-bold rounded-2xl border-2 border-gray-100 bg-gray-50 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-400 transition-all text-gray-700 text-center"
            />
          </div>

          {/* Renderizado de la Pirámide */}
          <div className="flex flex-col items-center justify-center gap-2 mb-6 min-h-[300px]">
            {piramide.map((fila, indexFila) => (
              <motion.div 
                key={`fila-${indexFila}-${fecha}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: indexFila * 0.08, duration: 0.3 }}
                className="flex items-center gap-1 sm:gap-2"
              >
                {fila.map((num, indexCol) => {
                  // Destacar la base y la punta
                  const esBase = indexFila === 0;
                  const esPunta = indexFila === piramide.length - 1;
                  
                  return (
                    <div 
                      key={`celda-${indexFila}-${indexCol}`}
                      className={`
                        flex items-center justify-center font-black tabular-nums transition-all
                        w-8 h-8 sm:w-12 sm:h-12 text-lg sm:text-2xl rounded-lg sm:rounded-xl
                        ${esPunta ? 'bg-amber-400 text-amber-900 shadow-lg scale-110' : 
                          esBase ? 'bg-gray-100 text-gray-500' : 
                          'bg-blue-50 text-blue-700'}
                      `}
                    >
                      {num}
                    </div>
                  );
                })}
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-8">
             <p className="text-sm text-gray-400 font-medium">💡 Tip: Los jugadores suelen combinar los números de la punta (amarillo) con los de las esquinas.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
