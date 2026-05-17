"use client";
import { motion } from "framer-motion";

export interface LotteryResult {
  id: number;
  loteria: string;
  sorteo: string;
  premios: number[] | string[];
  fecha: string;
  hora?: string;
  categoria?: "nacional" | "quiniela" | "leidsa" | "real" | "primera" | "suerte";
}

const accentMap: Record<string, string> = {
  nacional: "#1a56db", quiniela: "#0e9f6e", leidsa: "#d61f69",
  real: "#7e3af2", primera: "#ff5a1f", suerte: "#c27803",
};
const defaultAccent = "#1a56db";

interface LotteryCardProps { data: LotteryResult; index?: number; }

export default function LotteryCard({ data, index = 0 }: LotteryCardProps) {
  const accent = data.categoria ? accentMap[data.categoria] : defaultAccent;
  const isStandard = data.premios.length === 3;
  const isCompact = data.premios.length > 5;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3, boxShadow: "0 12px 32px -4px rgba(0,0,0,0.10)" }}
      className="relative bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-4 cursor-default overflow-hidden"
      style={{ boxShadow: "0 2px 12px -2px rgba(0,0,0,0.06)" }}
    >
      <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ backgroundColor: accent }} />
      <div className="flex items-start justify-between gap-2 pt-1">
        <div>
          <p className="text-[11px] font-semibold tracking-widest uppercase text-gray-400 mb-0.5">{data.loteria}</p>
          <h3 className="text-[17px] font-bold text-gray-900 leading-tight">{data.sorteo}</h3>
        </div>
        <div className="flex flex-col items-end gap-0.5 shrink-0">
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full" style={{ backgroundColor: `${accent}15`, color: accent }}>{data.fecha}</span>
        </div>
      </div>
      <div className="h-px bg-gray-100" />
      
      {/* Contenedor dinámico para los bolos */}
      <div className={`flex flex-wrap items-center justify-center gap-2 ${isCompact ? 'mt-2' : ''}`}>
        {data.premios.map((num, i) => {
          // Lógica de etiquetas: solo mostramos 1er, 2do, 3er si es un sorteo estándar de 3 premios
          const label = isStandard ? (i === 0 ? "1er" : i === 1 ? "2do" : "3er") : null;
          // Si hay muchos bolos, los hacemos más pequeños
          const ballClasses = isCompact 
            ? "w-9 h-9 text-sm rounded-lg" 
            : "w-14 h-14 text-2xl rounded-xl";

          return (
            <motion.div key={i} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: index * 0.07 + i * 0.03 + 0.15, duration: 0.3, ease: "backOut" }} className="flex flex-col items-center gap-1.5">
              {label && <span className="text-[9px] font-bold tracking-widest uppercase text-gray-400">{label}</span>}
              <div className={`${ballClasses} flex items-center justify-center font-black tabular-nums`} style={{ background: i === 0 && isStandard ? `linear-gradient(135deg, ${accent}, ${accent}cc)` : i === 1 && isStandard ? `${accent}12` : `${accent}08`, color: i === 0 && isStandard ? "#fff" : accent, boxShadow: i === 0 && isStandard ? `0 4px 14px ${accent}40` : "none" }}>
                {String(num).padStart(2, "0")}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.article>
  );
}
