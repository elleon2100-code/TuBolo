"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type TipoApuesta = "quiniela" | "pale" | "tripleta";

export default function SimuladorJugadas() {
  const [tipo, setTipo] = useState<TipoApuesta>("quiniela");
  const [monto, setMonto] = useState("50");
  const [n1, setN1] = useState("");
  const [n2, setN2] = useState("");
  const [n3, setN3] = useState("");
  const [resultado, setResultado] = useState<{ gano: boolean; mensaje: string; premio: number } | null>(null);
  const [calculando, setCalculando] = useState(false);

  const procesarSimulacion = (e: React.FormEvent) => {
    e.preventDefault();
    setCalculando(true);
    setResultado(null);

    setTimeout(() => {
      const valorMonto = Number(monto) || 0;
      
      // Simulación de tómbola local altamente realista con los bolos introducidos
      // En un flujo real esto se cruzaría con el array del estado o Supabase
      const tómbolaSimulada = [
        String(Math.floor(Math.random() * 100)).padStart(2, "0"),
        String(Math.floor(Math.random() * 100)).padStart(2, "0"),
        String(Math.floor(Math.random() * 100)).padStart(2, "0")
      ];

      let gano = false;
      let premio = 0;
      let mensaje = "";

      if (tipo === "quiniela") {
        if (!n1) {
          setResultado({ gano: false, mensaje: "Introduce el número para tu quiniela.", premio: 0 });
          setCalculando(false);
          return;
        }
        const pos1 = tómbolaSimulada.indexOf(n1.padStart(2, "0"));
        if (pos1 === 0) { premio = valorMonto * 60; gano = true; mensaje = `¡Felicidades! Pegaste en 1ra con el ${n1}.`; }
        else if (pos1 === 1) { premio = valorMonto * 8; gano = true; mensaje = `¡Bien! Pegaste en 2da con el ${n1}.`; }
        else if (pos1 === 2) { premio = valorMonto * 2; gano = true; mensaje = `Pegaste en 3ra con el ${n1}.`; }
        else { mensaje = `No saliste premiado. Los bolos ganadores fueron: ${tómbolaSimulada.join(" - ")}`; }
      } 
      else if (tipo === "pale") {
        if (!n1 || !n2) {
          setResultado({ gano: false, mensaje: "Introduce ambos números para el Palé.", premio: 0 });
          setCalculando(false);
          return;
        }
        const tieneN1 = tómbolaSimulada.includes(n1.padStart(2, "0"));
        const tieneN2 = tómbolaSimulada.includes(n2.padStart(2, "0"));
        
        if (tieneN1 && tieneN2) {
          premio = valorMonto * 1000;
          gano = true;
          mensaje = `¡Increíble! Rompiste la tómbola con ese Palé: ${n1} y ${n2}.`;
        } else {
          mensaje = `Palé no agraciado. La tómbola tiró: ${tómbolaSimulada.join(" - ")}`;
        }
      }
      else if (tipo === "tripleta") {
        if (!n1 || !n2 || !n3) {
          setResultado({ gano: false, mensaje: "Introduce los tres números para tu Tripleta.", premio: 0 });
          setCalculando(false);
          return;
        }
        const aciertos = [n1, n2, n3].filter(n => tómbolaSimulada.includes(n.padStart(2, "0"))).length;
        if (aciertos === 3) {
          premio = valorMonto * 20000; gano = true; mensaje = "¡Histórico! Pegaste la tripleta completa.";
        } else if (aciertos === 2) {
          premio = valorMonto * 100; gano = true; mensaje = "¡Excelente! Pegaste dos números de la tripleta.";
        } else {
          mensaje = `Tripleta no agraciada. Cayeron los bolos: ${tómbolaSimulada.join(" - ")}`;
        }
      }

      setResultado({ gano, mensaje, premio });
      setCalculando(false);
    }, 800);
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
            Simulador de <span className="text-blue-600">Jugadas</span>
          </h1>
          <p className="text-gray-500 font-medium max-w-lg mx-auto">
            Pon a prueba tu suerte sin arriesgar un solo peso. Configura tu jugada imaginaria y compárala contra el flujo de la tómbola.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.08)] border border-gray-100 max-w-2xl mx-auto">
          <form onSubmit={procesarSimulacion} className="space-y-6">
            {/* Selección de Tipo */}
            <div className="grid grid-cols-3 gap-2 p-1.5 bg-gray-100 rounded-2xl">
              {(["quiniela", "pale", "tripleta"] as TipoApuesta[]).map((t) => (
                <button key={t} type="button" onClick={() => { setTipo(t); setResultado(null); }} className={`py-2 text-xs sm:text-sm font-black rounded-xl capitalize transition-all ${tipo === t ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-900"}`}>
                  {t}
                </button>
              ))}
            </div>

            {/* Inputs de Números */}
            <div className="flex justify-center gap-4 py-4">
              <input type="text" maxLength={2} placeholder="00" value={n1} onChange={(e) => setN1(e.target.value.replace(/\D/g, ""))} className="w-16 h-16 text-2xl font-black text-center rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors text-blue-600 bg-gray-50 shadow-inner tabular-nums" />
              {tipo !== "quiniela" && <input type="text" maxLength={2} placeholder="00" value={n2} onChange={(e) => setN2(e.target.value.replace(/\D/g, ""))} className="w-16 h-16 text-2xl font-black text-center rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors text-blue-600 bg-gray-50 shadow-inner tabular-nums" />}
              {tipo === "tripleta" && <input type="text" maxLength={2} placeholder="00" value={n3} onChange={(e) => setN3(e.target.value.replace(/\D/g, ""))} className="w-16 h-16 text-2xl font-black text-center rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors text-blue-600 bg-gray-50 shadow-inner tabular-nums" />}
            </div>

            {/* Monto de la apuesta */}
            <div className="flex flex-col items-center gap-2 max-w-xs mx-auto">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Monto a simular (RD$)</label>
              <div className="relative w-full">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-gray-400 text-lg">$</span>
                <input type="text" value={monto} onChange={(e) => setMonto(e.target.value.replace(/\D/g, ""))} className="w-full pl-8 pr-4 py-3 font-black text-center text-lg rounded-xl border-2 border-gray-100 bg-gray-50 text-gray-700 focus:outline-none focus:border-blue-400 transition-colors" />
              </div>
            </div>

            {/* Botón */}
            <div className="text-center pt-4">
              <button type="submit" disabled={calculando} className="w-full sm:w-auto px-8 py-4 bg-gray-900 text-white font-black rounded-2xl hover:bg-gray-800 transition-colors shadow-md disabled:opacity-50">
                {calculando ? "Corriendo Tómbola..." : "🎰 Correr Sorteo Simulador"}
              </button>
            </div>
          </form>

          {/* Resultado de la simulación */}
          <AnimatePresence>
            {resultado && (
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className={`mt-8 p-6 rounded-2xl border text-center ${resultado.gano ? "bg-emerald-50 border-emerald-100 text-emerald-900" : "bg-gray-50 border-gray-100 text-gray-600"}`}>
                <span className="text-3xl block mb-2">{resultado.gano ? "🎉 ¡GANASTE!" : "❌"}</span>
                <p className="font-bold text-base mb-1">{resultado.mensaje}</p>
                {resultado.gano && (
                  <p className="text-2xl font-black text-emerald-600 mt-2">
                    Ganancia Ficticia: RD$ {resultado.premio.toLocaleString()}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
