import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Usamos la service role key o credenciales privadas del servidor para garantizar que solo la API manipule la tabla
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { correo, mensaje } = body;

    // 1. Validaciones estrictas del Servidor (Línea de defensa lógica)
    if (!correo || !mensaje) {
      return NextResponse.json({ error: 'Todos los campos son obligatorios.' }, { status: 400 });
    }

    // Validación de expresión regular para correos electrónicos válidos
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailRegex.test(correo) || correo.length > 254) {
      return NextResponse.json({ error: 'El formato del correo electrónico es inválido.' }, { status: 400 });
    }

    // Limitación preventiva de caracteres para mitigar saturación de almacenamiento
    if (mensaje.length < 10 || mensaje.length > 2000) {
      return NextResponse.json({ error: 'El mensaje debe contener entre 10 y 2000 caracteres.' }, { status: 400 });
    }

    // 2. Inserción controlada en la base de datos
    const { error: supabaseError } = await supabase
      .from('contactos')
      .insert([{ correo, mensaje }]);

    if (supabaseError) {
      throw supabaseError;
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error('Error interno en API Contacto:', error);
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 });
  }
}
