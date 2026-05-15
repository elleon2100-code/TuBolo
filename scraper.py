import os
import requests
from bs4 import BeautifulSoup
from supabase import create_client, Client

# === CONFIGURACIÓN DE SUPABASE ===
# Leemos las credenciales desde las variables de entorno para no exponerlas
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

url = "https://loteriasdominicanas.com/"

def guardar_en_supabase(loteria, sorteo, premios):
    try:
        data = {
            "loteria": loteria,
            "sorteo": sorteo,
            "primer_premio": int(premios[0]),
            "segundo_premio": int(premios[1]),
            "tercer_premio": int(premios[2])
        }
        
        # Usamos upsert para que si el sorteo ya existe hoy, solo se actualice y no se duplique
        response = supabase.table("sorteos_resultados").upsert(
            data, on_conflict="fecha,loteria,sorteo"
        ).execute()
        return True
    except Exception as e:
        print(f"Error guardando {sorteo}: {e}")
        return False

try:
    print("Iniciando Scraper con conexión a Supabase...")
    response = requests.get(url, headers=headers, timeout=10)
    
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        bloques = soup.find_all('div', class_='game-block')
        
        ultima_compania_valida = "Genérica"
        exitos = 0

        for bloque in bloques:
            # Extraer compañía
            comp_div = bloque.find('div', class_='company-title')
            compania_actual = comp_div.find('a').text.strip() if comp_div and comp_div.find('a') else ""
            if compania_actual:
                ultima_compania_valida = compania_actual
            
            # Extraer sorteo
            sorteo_link = bloque.find('a', class_='game-title')
            sorteo_nombre = sorteo_link.text.strip() if sorteo_link else "Sorteo"
            
            # Extraer premios
            scores_div = bloque.find('div', class_='game-scores')
            if scores_div:
                elementos_bolos = scores_div.find_all('span', class_='score')
                bolos = [b.text.strip() for b in elementos_bolos if b.text.strip().isdigit()]
                
                if len(bolos) >= 3:
                    if guardar_en_supabase(ultima_compania_valida, sorteo_nombre, bolos):
                        print(f"✅ Sincronizado: {ultima_compania_valida} - {sorteo_nombre}")
                        exitos += 1
        
        print(f"\nPROCESO FINALIZADO. Se sincronizaron {exitos} sorteos con Supabase.")
            
    else:
        print(f"ERROR HTTP: {response.status_code}")

except Exception as e:
    print(f"EXCEPCIÓN: {str(e)}")
