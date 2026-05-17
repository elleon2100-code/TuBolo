import Link from 'next/link';

export default function Cookies() {
  return (
    <div className="min-h-screen bg-[#f8f9fb] text-gray-800 font-sans py-16 px-4">
      <main className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-sm">
        <Link href="/" className="inline-flex min-h-12 items-center gap-2 rounded-xl px-4 text-xs font-black text-blue-600 uppercase tracking-widest mb-8 hover:text-blue-700 hover:bg-blue-50/50 transition-all group">
          <span className="transform group-hover:-translate-x-1 transition-transform" aria-hidden="true">←</span> Volver al inicio
        </Link>

        <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Política de Cookies Detallada</h1>
        <p className="text-sm font-bold text-gray-400 mb-8 uppercase tracking-widest">Última actualización: Mayo 2026</p>
        
        <div className="text-gray-600 space-y-6 leading-relaxed text-sm sm:text-base">
          <p>Este documento describe cómo y por qué <strong>TuBolo</strong> utiliza cookies y tecnologías de seguimiento similares en cumplimiento estricto con las directrices de transparencia.</p>
          <h2 className="text-lg font-black text-gray-900 mt-8 mb-2 uppercase tracking-wide">Uso de Cookies en la Suite</h2>
          <p>Utilizamos cookies técnicas para retener variables en los simuladores locales de Next.js, cookies analíticas de rendimiento anónimas y cookies publicitarias controladas por Google AdSense para desplegar banners relevantes.</p>
        </div>
      </main>
    </div>
  );
}
