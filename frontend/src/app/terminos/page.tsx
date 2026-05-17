import Link from 'next/link';

export default function Terminos() {
  return (
    <div className="min-h-screen bg-[#f8f9fb] text-gray-800 font-sans py-16 px-4">
      <main className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-sm">
        <Link href="/" className="inline-flex min-h-12 items-center gap-2 rounded-xl px-4 text-xs font-black text-blue-600 uppercase tracking-widest mb-8 hover:text-blue-700 hover:bg-blue-50/50 transition-all group">
          <span className="transform group-hover:-translate-x-1 transition-transform" aria-hidden="true">←</span> Volver al inicio
        </Link>

        <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Términos y Condiciones de Uso del Servicio</h1>
        <p className="text-sm font-bold text-gray-400 mb-8 uppercase tracking-widest">Última actualización: Mayo 2026</p>
        
        <div className="text-gray-600 space-y-6 leading-relaxed text-sm sm:text-base">
          <p>Al explorar o utilizar de cualquier manera las utilidades de esta plataforma web, usted declara bajo su propia responsabilidad aceptar los presentes Términos y Condiciones de Uso.</p>
          <h2 className="text-lg font-black text-gray-900 mt-8 mb-2 uppercase tracking-wide">Exención de Responsabilidad Recreativa</h2>
          <p>Las utilidades dispuestas en el portal (Simuladores, Tablas, Generadores) se fundamentan en leyes estadísticas y tradiciones populares. <strong>Bajo ninguna circunstancia garantizan el acierto ni la obtención de premios económicos en sorteos reales.</strong> El uso de la información corre bajo el riesgo exclusivo del jugador.</p>
        </div>
      </main>
    </div>
  );
}
