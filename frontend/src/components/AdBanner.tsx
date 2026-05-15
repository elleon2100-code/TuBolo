"use client";
import { motion } from "framer-motion";

interface AdBannerProps {
  slot?: string;
  size?: "leaderboard" | "rectangle" | "infeed";
  className?: string;
}

const sizeConfig = {
  leaderboard: { label: "728×90", height: "h-[90px]", hint: "AdSense Banner — Leaderboard" },
  rectangle:   { label: "300×250", height: "h-[250px]", hint: "AdSense Banner — Medium Rectangle" },
  infeed:      { label: "Responsive", height: "h-[120px]", hint: "AdSense In-Feed Ad" },
};

export default function AdBanner({ slot = "XXXXXXXXXX", size = "leaderboard", className = "" }: AdBannerProps) {
  const cfg = sizeConfig[size];
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
      className={`w-full ${cfg.height} rounded-xl border border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center gap-1.5 ${className}`}
      aria-label="Espacio publicitario"
    >
      <span className="text-[10px] font-semibold tracking-widest uppercase text-gray-300">Publicidad</span>
      <span className="text-[11px] text-gray-400 font-medium">{cfg.hint}</span>
      <span className="text-[10px] text-gray-300 font-mono">{cfg.label} · slot: {slot}</span>
    </motion.div>
  );
}
