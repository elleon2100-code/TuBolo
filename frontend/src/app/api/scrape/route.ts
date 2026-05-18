import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import * as cheerio from 'cheerio';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const maxDuration = 60; // Extiende el límite de tiempo de ejecución en Vercel si es necesario

// Función para obtener la fecha de "Hoy" estrictamente en la Zona Horaria de Santo Domingo
function getSantoDomingoDate() {
  const options: Intl.DateTimeFormatOptions = { 
    timeZone: 'America/Santo_Domingo', 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit' 
  };
  const formatter = new Intl.DateTimeFormat('en-CA', options); // Formato YYYY-MM-DD
  return formatter.format(new Date()); 
}

// Lógica de conversión de fecha replicada de Python a JS
function parseFecha(texto: string): string {
  const today = getSantoDomingoDate();
  if (!texto) return today;
  
  const numeros = texto.match(/\d+/g);
  if (!numeros) return today;

  if (numeros.length === 3) {
    let [dia, mes, ano] = numeros;
    if (ano.length === 2) ano = "20" + ano;
    return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
  } else if (numeros.length === 2) {
    let [dia, mes] = numeros;
    const currentYear = today.split('-')[0];
    return `${currentYear}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
  }
  return today;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const force = searchParams.get('force') === 'true';
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    // LÍNEA DE DEFENSA: Bloquear ejecuciones no autorizadas
    if (!force) {
      if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
         console.warn("⚠️ Intento de ejecución de Scraper sin autorización.");
         return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
      }
    }

    console.log("🚀 Iniciando Scraper de Loterías desde API Route...");
    const url = "https://loteriasdominicanas.com/";
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      next: { revalidate: 0 } // Desactivar caché para obtener datos en tiempo real
    });

    if (!response.ok) {
       console.error("❌ Error HTTP al hacer fetch de la página fuente:", response.status);
       return NextResponse.json({ error: 'Fallo al obtener la página web fuente.' }, { status: response.status });
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    
    let ultimaCompaniaValida = "Genérica";
    let exitos = 0;
    const errores: string[] = [];

    const bloques = $('.game-block').toArray();
    console.log(`📊 Se encontraron ${bloques.length} bloques de juegos en el HTML.`);

    for (const bloque of bloques) {
      const el = $(bloque);
      
      // 1. Extraer compañía (Lógica de herencia)
      const compNode = el.find('.company-title a');
      if (compNode.length > 0) {
        const nombreExt = compNode.text().trim();
        if (nombreExt) {
          ultimaCompaniaValida = nombreExt;
        }
      }

      // 2. Extraer Sorteo
      const sorteoNode = el.find('.game-title');
      const sorteoNombre = sorteoNode.length > 0 ? sorteoNode.text().trim() : "Sorteo";

      // 3. Extraer Fecha Real (Asegurando Timezone correcto)
      const fechaNode = el.find('.session-date');
      const fechaTexto = fechaNode.length > 0 ? fechaNode.text().trim() : "";
      const fechaFormateada = parseFecha(fechaTexto);

      // 4. Extraer Bolos
      const bolos: number[] = [];
      el.find('.game-scores .score').each((i, span) => {
        const txt = $(span).text().trim();
        if (/^\d+$/.test(txt)) {
          bolos.push(parseInt(txt, 10));
        }
      });

      // 5. Upsert en Supabase (Lógica replicada)
      if (bolos.length > 0) {
        const data: any = {
            fecha: fechaFormateada,
            loteria: ultimaCompaniaValida,
            sorteo: sorteoNombre,
            premios_arreglo: bolos
        };
        
        if (bolos.length > 0) data.primer_premio = bolos[0];
        if (bolos.length > 1) data.segundo_premio = bolos[1];
        if (bolos.length > 2) data.tercer_premio = bolos[2];

        const { error } = await supabase.from("sorteos_resultados").upsert(
            data,
            { onConflict: "fecha,loteria,sorteo" }
        );

        if (error) {
           console.error(`❌ Error guardando ${sorteoNombre}:`, error);
           errores.push(`[${fechaFormateada}] ${sorteoNombre}: ${error.message}`);
        } else {
           console.log(`✅ [${fechaFormateada}] ${ultimaCompaniaValida} - ${sorteoNombre} (${bolos.length} bolos)`);
           exitos++;
        }
      }
    }

    console.log(`\n🎉 PROCESO FINALIZADO. Se sincronizaron ${exitos} sorteos con Supabase.`);
    
    return NextResponse.json({ 
       success: true, 
       sincronizados: exitos,
       errores: errores.length > 0 ? errores : undefined
    });

  } catch (error: any) {
    console.error("🔥 Excepción Crítica en Scraper:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
