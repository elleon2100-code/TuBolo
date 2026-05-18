"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import LotteryCard, { LotteryResult } from "@/components/LotteryCard";
import AdBanner from "@/components/AdBanner";
import { supabase } from "@/lib/supabase";

// Lista actualizada con los nombres exactos del scraper
const loteriasFiltro = [
  "Todas", 
  "Nacional", 
  "Leidsa", 
  "Loteria Real", 
  "La Primera", 
  "La Suerte", 
  "Loteka", 
  "LoteDom", 
  "Anguila", 
  "Americanas", 
  "King Lottery"
];

// Asignación de colores para las nuevas categorías
const getCategoria = (loteria: string): any => {
  const l = loteria.toLowerCase();
  if (l.includes("nacional")) return "nacional";
  if (l.includes("leidsa")) return "leidsa";
  if (l.includes("real")) return "real";
  if (l.includes("primera")) return "primera";
  if (l.includes("suerte")) return "suerte";
  if (l.includes("loteka")) return "quiniela";
  if (l.includes("lotedom")) return "suerte";
  if (l.includes("anguila")) return "primera";
  if (l.includes("americanas")) return "nacional";
  return "quiniela";
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [filtro, setFiltro] = useState("Todas");
  const [fechaHistorial, setFechaHistorial] = useState(""); 
  const [resultados, setResultados] = useState<LotteryResult[]>([]);
  const [cargando, setCargando] = useState(true);
  const [menuAbierto, setMenuAbierto] = useState(false);

  const today = new Date().toLocaleDateString("es-DO", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  useEffect(() => {
    async function fetchSorteos() {
      setCargando(true);
      
      let query = supabase.from('sorteos_resultados').select('*').order('fecha', { ascending: false });
      
      if (fechaHistorial) {
        query = query.eq('fecha', fechaHistorial);
      } else {
        query = query.limit(40); 
      }

      const { data, error } = await query;
      
      if (data) {
        const formattedData: LotteryResult[] = data.map((item, index) => {
          let premiosExtraidos = item.premios_arreglo;
          if (!premiosExtraidos || premiosExtraidos.length === 0) {
            premiosExtraidos = [item.primer_premio, item.segundo_premio, item.tercer_premio].filter(Boolean);
          }

          return {
            id: item.id || index,
            loteria: item.loteria,
            sorteo: item.sorteo,
            premios: premiosExtraidos,
            fecha: item.fecha,
            categoria: getCategoria(item.loteria)
          };
        });
        setResultados(formattedData);
      }
      setCargando(false);
    }
    fetchSorteos();
  }, [fechaHistorial]);

  const filtered = resultados.filter((r) => {
    // Comparación segura: minúsculas y sin espacios extra
    const matchFiltro = filtro === "Todas" || r.loteria.toLowerCase().trim() === filtro.toLowerCase().trim();
    const matchSearch = r.sorteo.toLowerCase().includes(search.toLowerCase()) || r.loteria.toLowerCase().includes(search.toLowerCase());
    return matchFiltro && matchSearch;
  });

  const firstSlice  = filtered.slice(0, 6);
  const secondSlice = filtered.slice(6);

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-gray-900 font-sans">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center justify-between sm:justify-start gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image 
                src="/logo.png" 
                alt="TuBolo Logo" 
                width={300} 
                height={100} 
                className="object-contain min-w-[180px] h-auto max-h-[80px]"
                priority 
              />
            </Link>
            <span className="text-[11px] text-gray-400 capitalize hidden md:block">{today}</span>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            
            {/* ENLACE AL BLOG / NOTICIAS */}
            <a href="/articulos" className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors whitespace-nowrap">
              📰 Noticias
            </a>

            {/* MENÚ DESPLEGABLE MAESTRO DE HERRAMIENTAS */}
            <div className="relative">
              <button 
                onClick={() => setMenuAbierto(!menuAbierto)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors whitespace-nowrap"
              >
                🎲 Utilities <span className="text-[10px] transition-transform duration-200" style={{ transform: menuAbierto ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
              </button>

              <AnimatePresence>
                {menuAbierto && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setMenuAbierto(false)} />
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-56 max-w-[90vw] bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 overflow-hidden origin-top-left sm:origin-top-right"
                    >
                      <p className="px-4 py-1.5 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 mb-1">Herramientas</p>
                      <a href="/herramientas/generador" className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 transition-colors">
                        <span>🎲</span> Generador de la Suerte
                      </a>
                      <a href="/herramientas/piramide" className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 transition-colors">
                        <span>🔺</span> La Pirámide Numérica
                      </a>
                      <a href="/herramientas/suenos" className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 transition-colors">
                        <span>☁️</span> Diccionario de Sueños
                      </a>
                      <a href="/herramientas/jaladora" className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 transition-colors">
                        <span>🧲</span> La Tabla Jaladora
                      </a>
                      <a href="/herramientas/termometro" className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 transition-colors">
                        <span>🔥</span> Termómetro de Bolos
                      </a>
                      <a href="/herramientas/simulador" className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 transition-colors">
                        <span>🎰</span> Simulador de Sorteos
                      </a>
                      <div className="border-t border-gray-50 mt-1 sm:hidden">
                         <a href="/articulos" className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 transition-colors">
                          <span>📰</span> Noticias y Estrategias
                        </a>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            
            <input 
              type="date" 
              value={fechaHistorial}
              onChange={(e) => setFechaHistorial(e.target.value)}
              className="px-3 py-2 text-sm rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 text-gray-600 shrink-0"
              title="Ver resultados anteriores"
            />
            <div className="relative w-full sm:max-w-[180px]">
              <input type="search" placeholder="Buscar..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-3 pr-3 py-2 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition placeholder:text-gray-400" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 pt-4"><AdBanner slot="1234567890" size="leaderboard" /></div>

      <section className="max-w-6xl mx-auto px-4 pt-10 pb-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-2 h-2 rounded-full animate-pulse ${fechaHistorial ? 'bg-amber-400' : 'bg-emerald-400'}`} />
            <span className={`text-xs font-semibold tracking-wide uppercase ${fechaHistorial ? 'text-amber-600' : 'text-emerald-600'}`}>
              {fechaHistorial ? `Historial: ${fechaHistorial}` : 'Resultados en vivo'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight tracking-tight mb-2">Resultados de Loterías<br className="hidden sm:block" /><span className="text-blue-600"> República Dominicana</span></h1>
        </motion.div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-6">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {loteriasFiltro.map((l) => (
            <button key={l} onClick={() => setFiltro(l)} className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${filtro === l ? "bg-blue-600 text-white border-blue-600 shadow-sm" : "bg-white text-gray-600 border-gray-200"}`}>{l}</button>
          ))}
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 pb-20">
        {cargando ? (
          <div className="text-center py-20 animate-pulse text-gray-400">Consultando base de datos...</div>
        ) : (
          <>
            <AnimatePresence mode="popLayout">
              {firstSlice.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
                  {firstSlice.map((result, i) => <LotteryCard key={result.id} data={result} index={i} />)}
                </div>
              )}
            </AnimatePresence>
            {filtered.length > 6 && <div className="mb-6"><AdBanner slot="0987654321" size="infeed" /></div>}
            <AnimatePresence mode="popLayout">
              {secondSlice.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {secondSlice.map((result, i) => <LotteryCard key={result.id} data={result} index={i + 6} />)}
                </div>
              )}
            </AnimatePresence>
            
            {filtered.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                <p className="text-4xl mb-3">📭</p>
                <p className="text-gray-500 font-medium">No hay registros para esta fecha o filtro</p>
              </motion.div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
