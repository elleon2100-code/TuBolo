import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import DOMPurify from 'isomorphic-dompurify'; // Sanitizador seguro para Server Components

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  
  const { data: articulo } = await supabase
    .from('articulos')
    .select('titulo, contenido, imagen_url')
    .eq('slug', resolvedParams.slug)
    .single();

  if (!articulo) return { title: 'Artículo no encontrado | TuBolo' };

  return {
    title: `${articulo.titulo} | TuBolo`,
    description: articulo.contenido.replace(/<[^>]+>/g, '').substring(0, 160) + '...',
    openGraph: {
      title: articulo.titulo,
      description: articulo.contenido.replace(/<[^>]+>/g, '').substring(0, 160) + '...',
      images: [articulo.imagen_url || ''],
    },
  };
}

export default async function ArticuloDetalle({ params }: Props) {
  const resolvedParams = await params;

  const { data: articulo } = await supabase
    .from('articulos')
    .select('*')
    .eq('slug', resolvedParams.slug)
    .single();

  if (!articulo) {
    notFound();
  }

  // LINEA DE DEFENSA CRÍTICA: Sanitización estricta del HTML en el servidor
  const contenidoSanitizado = DOMPurify.sanitize(articulo.contenido, {
    ALLOWED_TAGS: ['p', 'b', 'i', 'em', 'strong', 'h1', 'h2', 'h3', 'ul', 'ol', 'li', 'span', 'br'],
    ALLOWED_ATTR: ['class', 'id']
  });

  const fechaFormateada = new Date(articulo.created_at).toLocaleDateString('es-DO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans pb-20">
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/articulos" className="inline-flex min-h-12 items-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors">
            ← Volver a Noticias
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 pt-10 sm:pt-16">
        <div className="mb-10 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 font-black text-xs uppercase tracking-widest mb-6">
            {articulo.categoria}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
            {articulo.titulo}
          </h1>
          <time className="text-sm font-bold text-gray-400 uppercase tracking-widest">
            {fechaFormateada}
          </time>
        </div>

        {articulo.imagen_url && (
          <div className="w-full aspect-video bg-gray-100 rounded-3xl overflow-hidden mb-12 shadow-sm border border-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={articulo.imagen_url} alt={articulo.titulo} className="w-full h-full object-cover" />
          </div>
        )}

        {/* CLASES DEFENSIVAS DE NAVEGACIÓN: Evitan desbordamiento u overflow en pantallas móviles */}
        <article 
          className="prose prose-lg sm:prose-xl prose-blue max-w-none text-gray-600 leading-relaxed max-w-none overflow-hidden break-words
                     prose-headings:font-black prose-headings:text-gray-900 prose-headings:tracking-tight
                     prose-p:mb-6 prose-table:block prose-table:w-full prose-table:overflow-x-auto
                     prose-pre:overflow-x-auto prose-img:max-w-full prose-a:break-words"
          dangerouslySetInnerHTML={{ __html: contenidoSanitizado }}
        />

        <div className="mt-16 pt-10 border-t border-gray-100 text-center">
          <p className="text-gray-500 font-medium mb-6">¿Inspirado por este artículo?</p>
          <Link href="/herramientas/simulador" className="inline-flex min-h-12 items-center justify-center px-8 py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/30">
            🎰 Pon a prueba tus números en el Simulador
          </Link>
        </div>
      </main>
    </div>
  );
}
