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
        <p className="text-sm font-bold text-gray-400 mb-8 uppercase tracking-widest">Última actualización: 17 de Mayo de 2026</p>
        
        <div className="text-gray-600 space-y-6 leading-relaxed text-sm sm:text-base">
          <p>En <strong>TuBolo</strong>, accesible desde nuestra plataforma web, la privacidad y seguridad de los datos de nuestros usuarios es una prioridad absoluta y estricta. Esta Política de Privacidad detalla de forma exhaustiva los tipos de información que recopilamos, procesamos y almacenamos de manera automatizada, así como el uso legítimo que hacemos de ella para garantizar el correcto funcionamiento de nuestras herramientas de análisis probabilístico y simulación.</p>
          
          <h2 className="text-lg font-black text-gray-900 mt-8 mb-2 uppercase tracking-wide">1. Recopilación de Información y Datos Técnicos</h2>
          <p>TuBolo sigue rigurosamente el procedimiento estándar de uso de archivos de registro (Log Files). Estos archivos registran de forma automática a los visitantes cuando interactúan con las herramientas de la suite. La información recopilada por estos archivos técnicos incluye de manera transparente:</p>
          <ul className="list-disc pl-6 space-y-2 font-medium">
            <li>Direcciones de Protocolo de Internet (IP) anonimizadas.</li>
            <li>Tipo y versión del navegador web utilizado por el usuario.</li>
            <li>Proveedor de Servicios de Internet (ISP) correspondiente.</li>
            <li>Marca de fecha, hora exacta y zona horaria de la consulta realizada.</li>
            <li>Páginas de procedencia (referencia) y páginas de salida dentro de la suite.</li>
            <li>Número total de clics ejecutados dentro de los simuladores matemáticos.</li>
          </ul>
          <p>Es fundamental aclarar que ninguno de estos datos técnicos está vinculado de forma directa a información que sea personalmente identificable en el mundo real. El único propósito de esta recopilación automatizada es el análisis estadístico del tráfico, el mantenimiento de la seguridad interna del servidor, la optimización de los tiempos de respuesta de Next.js y el diagnóstico de errores de red.</p>

          <h2 className="text-lg font-black text-gray-900 mt-8 mb-2 uppercase tracking-wide">2. Cookies de Terceros y Redes de Anuncios (Google AdSense)</h2>
          <p>Nuestra plataforma web utiliza cookies técnicas para almacenar las preferencias de los usuarios respecto al guardado de jugadas en el simulador local y para personalizar las consultas en el diccionario. Asimismo, este sitio web muestra anuncios publicitarios gestionados a través de proveedores externos, principalmente <strong>Google AdSense</strong>.</p>
          <p>Google, como proveedor de servicios de terceros, utiliza cookies conocidas como cookies de DART (Dynamic Advertising Reporting Target) para servir anuncios personalizados a los usuarios que visitan TuBolo. Este sistema evalúa los intereses y el historial de navegación general del usuario en internet para mostrar publicidad relevante. Los usuarios pueden optar por inhabilitar el uso de la cookie de DART visitando la Política de Privacidad de la red de anuncios y contenido de Google en el panel oficial de control de anuncios de su cuenta.</p>

          <h2 className="text-lg font-black text-gray-900 mt-8 mb-2 uppercase tracking-wide">3. Consentimiento y Control del Usuario</h2>
          <p>Al utilizar activamente cualquiera de nuestras herramientas interactivas, usted acepta de forma implícita los términos descritos en esta Política de Privacidad. Si desea bloquear o eliminar el rastreo de cookies analíticas, puede configurar de forma manual los permisos de privacidad directamente en las opciones de configuración de su navegador web (Google Chrome, Safari, Mozilla Firefox o Microsoft Edge).</p>
        </div>
      </main>
    </div>
  );
}
