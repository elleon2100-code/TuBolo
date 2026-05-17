import Link from 'next/link';

export default function Cookies() {
  return (
    <div className="min-h-screen bg-[#f8f9fb] text-gray-800 font-sans py-16 px-4">
      <main className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-sm">
        <Link href="/" className="inline-flex min-h-12 items-center gap-2 rounded-xl px-4 text-xs font-black text-blue-600 uppercase tracking-widest mb-8 hover:text-blue-700 hover:bg-blue-50/50 transition-all group">
          <span className="transform group-hover:-translate-x-1 transition-transform" aria-hidden="true">←</span> Volver al inicio
        </Link>

        <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Política de Cookies Detallada</h1>
        <p className="text-sm font-bold text-gray-400 mb-8 uppercase tracking-widest">Última actualización: 17 de Mayo de 2026</p>
        
        <div className="text-gray-600 space-y-6 leading-relaxed text-sm sm:text-base">
          <p>Este documento describe minuciosamente cómo y por qué <strong>TuBolo</strong> utiliza cookies y tecnologías de seguimiento similares en cumplimiento estricto con las directrices internacionales de transparencia de datos y los requisitos técnicos exigidos para la monetización web organizada.</p>
          
          <h2 className="text-lg font-black text-gray-900 mt-8 mb-2 uppercase tracking-wide">¿Qué son las Cookies?</h2>
          <p>Las cookies son pequeños archivos de texto que las plataformas web almacenan de manera local en el disco duro o en la memoria caché de su dispositivo móvil u ordenador al momento de cargar una página. Permiten que el sitio recuerde información clave sobre su sesión y sus patrones de navegación para ofrecer una experiencia interactiva mucho más fluida.</p>

          <h2 className="text-lg font-black text-gray-900 mt-8 mb-2 uppercase tracking-wide">Tipos de Cookies Utilizadas en TuBolo</h2>
          <div className="space-y-4">
            <p><strong>A. Cookies Técnicas y Esenciales:</strong> Son estrictamente necesarias para permitir la navegación interna y la ejecución de la suite de herramientas. Sin ellas, el simulador de jugadas y el generador numérico no podrían retener las variables seleccionadas por el usuario al actualizar la pantalla en Next.js.</p>
            <p><strong>B. Cookies de Rendimiento y Análisis:</strong> Administradas principalmente a través de scripts analíticos. Nos permiten medir de forma completamente anónima el volumen de visitas, el tiempo de permanencia en las guías informativas de estrategias y saber qué herramientas interactivas registran mayor tasa de interacción.</p>
            <p><strong>C. Cookies Publicitarias de Terceros (Google AdSense):</strong> Estas cookies recopilan información sobre sus hábitos de navegación para permitir que la red de anuncios de Google le muestre banners publicitarios adaptados a sus gustos específicos, limitando la repetición del mismo anuncio y midiendo la efectividad de las campañas.</p>
          </div>

          <h2 className="text-lg font-black text-gray-900 mt-8 mb-2 uppercase tracking-wide">Desactivación y Gestión de Cookies</h2>
          <p>Usted conserva en todo momento el derecho inalienable de aceptar, limitar o rechazar por completo la instalación de estas cookies. Puede ejercer este control modificando los parámetros de seguridad y cookies de su navegador de internet. Tenga en cuenta que si desactiva de forma absoluta las cookies esenciales, el rendimiento de los simuladores matemáticos locales de TuBolo podría verse significativamente mermado o presentar comportamientos erráticos.</p>
        </div>
      </main>
    </div>
  );
}
