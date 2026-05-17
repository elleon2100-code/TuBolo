"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function TablaJaladora() {
  const [numeroInput, setNumeroInput] = useState("");
  const [jalados, setJalados] = useState<string[]>([]);
  const [error, setError] = useState("");

  const calcularJalados = (numStr: string) => {
    setError("");
    const limpio = numStr.trim();
    
    if (!limpio || isNaN(Number(limpio)) || limpio.length > 2) {
      setError("Introduce un número válido de 1 o 2 dígitos (00-99).");
      setJalados([]);
      return;
    }

    const num = Number(limpio);
    if (num < 0 || num > 99) {
      setError("El número debe estar entre 00 y 99.");
      setJalados([]);
      return;
    }

    // Algoritmo tradicional de Jale (Reglas fijas populares de numerología)
    // Jale 1: +25 (si pasa de 100, se resta 100)
    // Jale 2: +50 (si pasa de 100, se resta 100)
    // Jale 3: +75 (si pasa de 100, se resta 100)
    // Nota: Si el número es 0, suele jalar 25, 50, 75 de forma limpia.
    const j1 = (num + 25) % 100;
    const j2 = (num + 50) % 100;
    const j3 = (num + 75) % 100;

    setJalados([
      String(j1).padStart(2, "0"),
      String(j2).padStart(2, "0"),
      String(j3).padStart(2, "0")
    ]);
  };

  const handleInputChange = (val: string) => {
    // Permitir solo números y máximo 2 caracteres
    const limpia = val.replace(/\D/g, "").slice(0, 2);
    setNumeroInput(limpia);
    if (limpia.length === 2 || limpia.length === 1) {
      calcularJalados(limpia);
    } else {
      setJalados([]);
    }
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
            La Tabla <span className="text-blue-600">Jaladora</span>
          </h1>
          <p className="text-gray-500 font-medium max-w-lg mx-auto">
            ¿Salió un número fuerte hoy? Introduce el número ganador para descubrir cuáles tres números tiene tendencia a &quot;jalar&quot; en los próximos sorteos.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.08)] border border-gray-100 max-w-xl mx-auto">
          <div className="flex flex-col items-center gap-4 mb-8">
            <label className="text-sm font-bold text-gray-400 uppercase tracking-widest text-center">
              Número que salió
            </label>
            <input 
              type="text" 
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="00" 
              value={numeroInput}
              onChange={(e) => handleInputChange(e.target.value)}
              className="w-28 py-4 text-4xl font-black rounded-2xl border-2 border-gray-200 bg-gray-50 text-center focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-400 transition-all text-blue-600 tabular-nums shadow-inner"
            />
            {error && <p className="text-xs font-semibold text-red-500 mt-1">{error}</p>}
          </div>

          <div className="h-px bg-gray-100 mb-8" />

          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest text-center mb-6">
            Números que Jala Automáticamente
          </h3>

          <div className="flex justify-center gap-4 min-h-[100px] items-center">
            {jalados.length > 0 ? (
              jalados.map((num, i) => (
                <motion.div
                  key={`${numeroInput}-${num}`}
                  initial={{ scale: 0.6, opacity: 0, y: 15 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, type: "spring", stiffness: 260, damping: 20 }}
                  className="flex flex-col items-center gap-2"
                >
                  <span className="text-[10px] font-black tracking-widest uppercase text-gray-400">JALE {i+1}</span>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 text-3xl sm:text-4xl font-black rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 text-blue-600 border border-blue-100 flex items-center justify-center shadow-sm tabular-nums">
                    {num}
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-sm text-gray-400 font-medium text-center italic py-4">
                Ingresa un número arriba para ver la tripleta jaladora.
              </p>
            )}
          </div>

          <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl mt-10">
            <p className="text-xs text-amber-800 font-medium leading-relaxed">
              💡 <strong>¿Cómo funciona?</strong> Tradicionalmente en la lotería dominicana, cada número pertenece a una línea de equivalencia numérica separada por 25 unidades. Cuando un número sale, sus equivalentes aumentan su probabilidad de salida.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
