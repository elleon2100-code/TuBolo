import os
import re
import datetime
import requests
from bs4 import BeautifulSoup
from supabase import create_client, Client
from dotenv import load_dotenv  

load_dotenv()  

# === CONFIGURACIÓN DE SUPABASE ===
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}
url = "https://loteriasdominicanas.com/"

def parsear_fecha(texto):
    """Extrae la fecha del HTML y la convierte a YYYY-MM-DD para Supabase"""
    if not texto: return datetime.datetime.now().strftime("%Y-%m-%d")
    numeros = re.findall(r'\d+', texto)
    if len(numeros) == 3:
        dia, mes, ano = numeros
        if len(ano) == 2: ano = "20" + ano
        return f"{ano}-{mes.zfill(2)}-{dia.zfill(2)}"
    elif len(numeros) == 2:
        dia, mes = numeros
        ano = datetime.datetime.now().year
        return f"{ano}-{mes.zfill(2)}-{dia.zfill(2)}"
    return datetime.datetime.now().strftime("%Y-%m-%d")

def guardar_en_supabase(fecha, loteria, sorteo, premios):
    try:
        data = {
            "fecha": fecha,
            "loteria": loteria,
            "sorteo": sorteo,
            "premios_arreglo": premios
        }
        
        if len(premios) > 0: data["primer_premio"] = int(premios[0])
        if len(premios) > 1: data["segundo_premio"] = int(premios[1])
        if len(premios) > 2: data["tercer_premio"] = int(premios[2])

        response = supabase.table("sorteos_resultados").upsert(
            data, on_conflict="fecha,loteria,sorteo"
        ).execute()
        return True
    except Exception as e:
        print(f"Error guardando {sorteo}: {e}")
        return False

try:
    print("Iniciando Scraper (Corrección de herencia de loterías)...")
    response = requests.get(url, headers=headers, timeout=10)
    
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        bloques = soup.find_all('div', class_='game-block')
        
        ultima_compania_valida = "Genérica"
        exitos = 0

        for bloque in bloques:
            # 1. Extraer compañía (CORRECCIÓN AQUÍ)
            comp_div = bloque.find('div', class_='company-title')
            if comp_div and comp_div.find('a'):
                nombre_ext = comp_div.find('a').text.strip()
                if nombre_ext: # LA MAGIA ESTÁ AQUÍ: Solo hereda si no está vacío
                    ultima_compania_valida = nombre_ext
            
            # 2. Extraer sorteo
            sorteo_link = bloque.find('a', class_='game-title')
            sorteo_nombre = sorteo_link.text.strip() if sorteo_link else "Sorteo"
            
            # 3. Extraer fecha real
            fecha_div = bloque.find('div', class_='session-date')
            fecha_texto = fecha_div.text.strip() if fecha_div else None
            fecha_formateada = parsear_fecha(fecha_texto)
            
            # 4. Extraer TODOS los premios
            scores_div = bloque.find('div', class_='game-scores')
            if scores_div:
                elementos_bolos = scores_div.find_all('span', class_='score')
                bolos = [b.text.strip() for b in elementos_bolos if b.text.strip().isdigit()]
                
                if len(bolos) > 0:
                    if guardar_en_supabase(fecha_formateada, ultima_compania_valida, sorteo_nombre, bolos):
                        print(f"✅ [{fecha_formateada}] {ultima_compania_valida} - {sorteo_nombre} ({len(bolos)} bolos)")
                        exitos += 1
        
        print(f"\nPROCESO FINALIZADO. Se sincronizaron {exitos} sorteos con Supabase.")
            
    else:
        print(f"ERROR HTTP: {response.status_code}")

except Exception as e:
    print(f"EXCEPCIÓN: {str(e)}")
