import os
import glob
from rembg import remove
from PIL import Image

def process_directory(directory_path: str):
    """
    Percorre o diretório informado procurando por imagens .png
    e remove o fundo (incluindo fundos quadriculados falsos).
    As imagens originais são sobrescritas.
    """
    if not os.path.exists(directory_path):
        print(f"Diretório não encontrado: {directory_path}")
        return

    pattern = os.path.join(directory_path, "*.png")
    png_files = glob.glob(pattern)

    if not png_files:
        print(f"Nenhum arquivo .png encontrado em: {directory_path}")
        return

    print(f"Encontrados {len(png_files)} arquivos .png. Iniciando o processamento...")

    for file_path in png_files:
        try:
            print(f"Processando: {os.path.basename(file_path)}")
            # Abrir a imagem
            with Image.open(file_path) as input_image:
                # O rembg lida bem com imagens que possuem fundo falso quadriculado
                # Retorna uma imagem com o fundo transparente
                output_image = remove(input_image)
            
            # Sobrescrever a imagem original com a versão com fundo transparente
            output_image.save(file_path, format="PNG")
            print(f"[OK] Fundo removido: {os.path.basename(file_path)}")
        except Exception as e:
            print(f"[ERRO] Falha ao processar {os.path.basename(file_path)}: {e}")

if __name__ == "__main__":
    # Exemplo de uso
    # Considerando que o script está em .tools/ e as imagens em src/assets/characters/
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    target_dir = os.path.join(base_dir, "src", "assets", "characters")
    
    print(f"Iniciando remoção de fundo em: {target_dir}")
    process_directory(target_dir)
