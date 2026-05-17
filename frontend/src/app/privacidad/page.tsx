import Link from 'next/link';

export default function Privacidad() {
  return (
    <div className="min-h-screen bg-[#f8f9fb] text-gray-800 font-sans py-16 px-4">
      <main className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-sm">
        {/* Botón con Accesibilidad Táctil de 48px */}
        <Link href="/" className="inline-flex min-h-12 items-center gap-2 rounded-xl px-4 text-xs font-black text-blue-600 uppercase tracking-widest mb-8 hover:text-blue-700 hover:bg-blue-50/50 transition-all group">
          <span className="transform group-hover:-translate-x-1 transition-transform" aria-hidden="true">←</span> Volver al inicio
        </Link>
        
        <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Política de Privacidad Integral</h1>
        <p className="text-sm font-bold text-gray-400 mb-8 uppercase tracking-widest">Última actualización: Mayo 2026</p>
        
        <div className="text-gray-600 space-y-6 leading-relaxed text-sm sm:text-base">
          <p>En <strong>TuBolo</strong>, la privacidad y seguridad de los datos es una prioridad absoluta. Esta Política detalla los tipos de información que recopilamos, procesamos y almacenamos de manera automatizada para garantizar el funcionamiento técnico de nuestras herramientas de análisis probabilístico.</p>
          <h2 className="text-lg font-black text-gray-900 mt-8 mb-2 uppercase tracking-wide">1. Archivos de Registro y Datos Técnicos</h2>
          <p>TuBolo sigue el procedimiento estándar de archivos de registro (Log Files), los cuales recopilan de forma transparente direcciones IP anonimizadas, tipo de navegador, proveedor de servicios de internet (ISP) y marcas de tiempo para optimizar el rendimiento técnico de la plataforma.</p>
          <h2 className="text-lg font-black text-gray-900 mt-8 mb-2 uppercase tracking-wide">2. Cookies de Terceros (Google AdSense)</h2>
          <p>Google, como proveedor externo, utiliza cookies de DART para servir anuncios personalizados orientados a los intereses generales del usuario. Usted puede inhabilitar este rastreo mediante la configuración de anuncios de Google.</p>
        </div>
      </main>
    </div>
  );
}
