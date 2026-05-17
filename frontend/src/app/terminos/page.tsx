import Link from 'next/link';

export default function Terminos() {
  return (
    <div className="min-h-screen bg-[#f8f9fb] text-gray-800 font-sans py-16 px-4">
      <main className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-sm">
        <Link href="/" className="inline-flex min-h-12 items-center gap-2 rounded-xl px-4 text-xs font-black text-blue-600 uppercase tracking-widest mb-8 hover:text-blue-700 hover:bg-blue-50/50 transition-all group">
          <span className="transform group-hover:-translate-x-1 transition-transform" aria-hidden="true">←</span> Volver al inicio
        </Link>

        <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Términos y Condiciones de Uso del Servicio</h1>
        <p className="text-sm font-bold text-gray-400 mb-8 uppercase tracking-widest">Última actualización: 17 de Mayo de 2026</p>
        
        <div className="text-gray-600 space-y-6 leading-relaxed text-sm sm:text-base">
          <p>Bienvenido a <strong>TuBolo</strong>. Al acceder, explorar o utilizar de cualquier manera interactiva las utilidades y contenidos alojados en esta plataforma web, usted declara bajo su propia responsabilidad haber leído, comprendido y aceptado someterse con rigurosidad a los presentes Términos y Condiciones de Uso del Servicio.</p>
          
          <h2 className="text-lg font-black text-gray-900 mt-8 mb-2 uppercase tracking-wide">1. Naturaleza del Servicio y Propósito Recreativo</h2>
          <p>TuBolo opera estrictamente como una plataforma web independiente de divulgación informativa, análisis folclórico-histórico y desarrollo de herramientas de cálculo analítico aplicadas al estudio estadístico de sucesos aleatorios. No somos un operador de apuestas oficiales, no vendemos tickets ni boletos de lotería, no recaudamos dinero para jugadas y no poseemos vinculación jurídica ni comercial de ningún tipo con la Lotería Nacional, Leidsa ni ninguna concesionaria de azar privada en la República Dominicana.</p>

          <h2 className="text-lg font-black text-gray-900 mt-8 mb-2 uppercase tracking-wide">2. Exención de Responsabilidad y Garantía Cero</h2>
          <p>Las utilidades dispuestas en el portal (Generador de la Suerte, Pirámide Numérica, Diccionario de Sueños, Tabla Jaladora y el Simulador de Sorteos) se fundamentan en leyes matemáticas de dispersión probabilística y en la tradición folclórica numerológica caribeña. <strong>Bajo ninguna circunstancia garantizan el acierto, la salida o la obtención de premios económicos en sorteos reales.</strong></p>
          <p>El azar por definición es un evento limpio, independiente y sin memoria. Cada extracción es un suceso aislado. Por lo tanto, el uso de las estrategias presentadas en el blog o los resultados arrojados por los algoritmos analíticos locales corren bajo el riesgo exclusivo del usuario. TuBolo, sus desarrolladores y administradores no asumen responsabilidad legal alguna por pérdidas financieras directas o indirectas, deudas contraídas, afectación de presupuestos familiares o frustración emocional derivada de apuestas realizadas en bancas físicas basándose en la información de este sitio web. Se exhorta con firmeza a los usuarios a mantener una disciplina de gasto estricta, establecer límites económicos no críticos y tratar la plataforma únicamente como un pasatiempo de entretenimiento recreativo.</p>

          <h2 className="text-lg font-black text-gray-900 mt-8 mb-2 uppercase tracking-wide">3. Propiedad Intelectual y Restricciones</h2>
          <p>El código fuente desarrollado en Next.js, las hojas de estilo Tailwind CSS, la arquitectura interactiva de los componentes de frontend y los artículos de investigación estadística profunda alojados en el sitio web constituyen propiedad intelectual protegida. Queda terminantemente prohibido el raspado de datos (scraping) no autorizado, la clonación del portal o la redistribución comercial de sus contenidos sin el consentimiento previo por escrito de los titulares de la suite.</p>
        </div>
      </main>
    </div>
  );
}
