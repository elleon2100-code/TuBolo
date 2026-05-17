import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

// Configuración directa del cliente de Supabase para el componente de servidor
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Forzamos que la página se regenere en el servidor para el SEO
export const revalidate = 60; 

export default async function ArticulosIndex() {
  // Extraemos los artículos de la tabla que acabamos de crear
  const { data: articulos, error } = await supabase
    .from('articulos')
    .select('*')
    .eq('publicado', true)
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-gray-900 font-sans pb-20">
      {/* Header simple para navegación */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors">
            ← Volver a TuBolo
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pt-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            Noticias y <span className="text-blue-600">Estrategias</span>
          </h1>
          <p className="text-gray-500 font-medium max-w-xl mx-auto text-lg">
            Mantente al día con los mejores análisis, pronósticos y consejos para mejorar tus jugadas en la lotería dominicana.
          </p>
        </div>

        {error && (
          <div className="text-center text-red-500 p-4 bg-red-50 rounded-xl max-w-2xl mx-auto">
            Hubo un error cargando los artículos. Verifica las credenciales de Supabase.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articulos && articulos.map((articulo) => (
            <Link href={`/articulos/${articulo.slug}`} key={articulo.id} className="group flex flex-col bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 overflow-hidden hover:-translate-y-1">
              {/* Imagen del Artículo */}
              <div className="w-full h-56 bg-gray-200 relative overflow-hidden">
                {articulo.imagen_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img 
                    src={articulo.imagen_url} 
                    alt={articulo.titulo} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-200 text-4xl">
                    📰
                  </div>
                )}
                {/* Etiqueta de Categoría */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-black text-blue-600 uppercase tracking-widest shadow-sm">
                  {articulo.categoria}
                </div>
              </div>

              {/* Contenido de la Tarjeta */}
              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-xl font-black text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                  {articulo.titulo}
                </h2>
                
                {/* Mostramos un extracto limpiando las etiquetas HTML */}
                <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed flex-1"
                   dangerouslySetInnerHTML={{ __html: articulo.contenido.replace(/<[^>]+>/g, '').substring(0, 150) + '...' }}
                />
                
                <div className="flex items-center text-blue-600 font-bold text-sm mt-auto">
                  Leer artículo completo <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {articulos && articulos.length === 0 && (
          <div className="text-center py-20">
            <span className="text-5xl block mb-4">✍️</span>
            <h3 className="text-xl font-bold text-gray-400">Aún no hay artículos publicados</h3>
          </div>
        )}
      </main>
    </div>
  );
}
