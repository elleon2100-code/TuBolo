import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-12 pb-8 font-sans text-gray-500">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Columna Branding */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 select-none">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
              <span className="text-white font-black text-xs">TB</span>
            </div>
            <span className="text-lg font-black tracking-tight text-gray-900">Tu<span className="text-blue-600">Bolo</span></span>
          </div>
          <p className="text-sm leading-relaxed max-w-xs text-gray-400">
            Estadísticas, utilidades de entretenimiento y análisis de loterías dominicanas de forma analítica y responsable.
          </p>
        </div>

        {/* Columna Herramientas */}
        <div className="space-y-3">
          <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest">Herramientas</h4>
          <div className="flex flex-col gap-2 text-sm font-semibold">
            <Link href="/herramientas/generador" className="hover:text-blue-600 transition-colors">Generador de la Suerte</Link>
            <Link href="/herramientas/suenos" className="hover:text-blue-600 transition-colors">Diccionario de Sueños</Link>
            <Link href="/herramientas/simulador" className="hover:text-blue-600 transition-colors">Simulador de Sorteos</Link>
            <Link href="/articulos" className="hover:text-blue-600 transition-colors">Noticias y Estrategias</Link>
          </div>
        </div>

        {/* Columna Legal */}
        <div className="space-y-3">
          <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest">Legal</h4>
          <div className="flex flex-col gap-2 text-sm font-semibold">
            <Link href="/privacidad" className="hover:text-blue-600 transition-colors">Privacidad</Link>
            <Link href="/cookies" className="hover:text-blue-600 transition-colors">Cookies</Link>
            <Link href="/terminos" className="hover:text-blue-600 transition-colors">Términos de Uso</Link>
            <Link href="/contacto" className="hover:text-blue-600 transition-colors">Contacto</Link>
          </div>
        </div>
      </div>

      {/* Franja de Derechos y Descargo */}
      <div className="max-w-6xl mx-auto px-4 pt-6 border-t border-gray-50 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-gray-400">
        <p>© 2026 TuBolo. Todos los derechos reservados.</p>
        <p className="text-center md:text-right max-w-md italic">
          Los cálculos y simulaciones son orientativos y con fines lúdicos. No constituyen asesoría financiera profesional.
        </p>
      </div>
    </footer>
  );
}
