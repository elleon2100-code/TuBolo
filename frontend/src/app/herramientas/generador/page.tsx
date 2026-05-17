"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type TipoJugada = "quiniela" | "loto";

export default function GeneradorSuerte() {
  const [numeros, setNumeros] = useState<string[]>(["00", "00", "00"]);
  const [tipo, setTipo] = useState<TipoJugada>("quiniela");
  const [isGenerating, setIsGenerating] = useState(false);

  // Lógica de generación de números aleatorios
  const generarNumeros = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      let nuevosNumeros: string[] = [];
      if (tipo === "quiniela") {
        // 3 números del 00 al 99 (pueden repetirse)
        for (let i = 0; i < 3; i++) {
          const random = Math.floor(Math.random() * 100);
          nuevosNumeros.push(String(random).padStart(2, "0"));
        }
      } else {
        // 6 números del 01 al 38 (sin repetirse, ordenados)
        const pool = Array.from({ length: 38 }, (_, i) => i + 1);
        for (let i = 0; i < 6; i++) {
          const randomIndex = Math.floor(Math.random() * pool.length);
          nuevosNumeros.push(String(pool.splice(randomIndex, 1)[0]).padStart(2, "0"));
        }
        nuevosNumeros.sort((a, b) => Number(a) - Number(b));
      }
      setNumeros(nuevosNumeros);
      setIsGenerating(false);
    }, 600); // Simulamos un tiempo de "pensamiento" para la animación
  };

  // Generar la primera vez que carga
  useEffect(() => {
    generarNumeros();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tipo]);

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-gray-900 font-sans pb-20">
      {/* Header simple para navegación */}
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
            Generador de <span className="text-blue-600">La Suerte</span>
          </h1>
          <p className="text-gray-500 font-medium max-w-lg mx-auto">
            Deja que el algoritmo elija tu próxima jugada. Selecciona el tipo de sorteo y genera tus números al instante.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.08)] border border-gray-100 max-w-2xl mx-auto">
          {/* Controles */}
          <div className="flex justify-center gap-3 mb-10">
            <button 
              onClick={() => setTipo("quiniela")}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${tipo === "quiniela" ? "bg-blue-600 text-white shadow-md shadow-blue-500/30" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              Quiniela / Palé (00-99)
            </button>
            <button 
              onClick={() => setTipo("loto")}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${tipo === "loto" ? "bg-blue-600 text-white shadow-md shadow-blue-500/30" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              Loto (01-38)
            </button>
          </div>

          {/* Área de Bolos */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10 min-h-[80px]">
            <AnimatePresence mode="popLayout">
              {numeros.map((num, idx) => (
                <motion.div
                  key={`${tipo}-${idx}-${num}-${isGenerating}`}
                  initial={{ opacity: 0, y: -20, scale: 0.8, rotateX: 90 }}
                  animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                  exit={{ opacity: 0, y: 20, scale: 0.8 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: isGenerating ? 0 : idx * 0.08,
                    type: "spring",
                    stiffness: 200
                  }}
                  className={`flex items-center justify-center font-black tabular-nums shadow-inner border-b-4 border-blue-700
                    ${tipo === "quiniela" ? "w-20 h-20 text-4xl rounded-2xl bg-blue-600 text-white" : "w-16 h-16 text-2xl rounded-full bg-blue-600 text-white"}
                  `}
                >
                  {isGenerating ? "??" : num}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Botón de Acción */}
          <div className="text-center">
            <button
              onClick={generarNumeros}
              disabled={isGenerating}
              className="group relative px-8 py-4 bg-gray-900 text-white rounded-2xl font-black text-lg overflow-hidden transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:hover:scale-100"
            >
              <span className="relative z-10">{isGenerating ? "Generando..." : "🎲 Generar Nueva Jugada"}</span>
              <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
