# Frames dinámicos

Convierte un video en frames con duración variable según el movimiento. Todo corre en el navegador, sin servidor ni build.

## Archivos
- `index.html`: interfaz
- `style.css`: estilos
- `state.js`: variables compartidas
- `io.js`: guardado de archivos
- `analyze.js`: lectura del video y detección de movimiento
- `timeline.js`: selección, duraciones y cuadrícula de edición
- `preview.js`: reproducción
- `sheet.js`: exportar spritesheet PNG y .txt
- `apng.js`: exportar APNG con transparencia
- `importer.js`: importar spritesheet y .txt editados

## Publicar con GitHub Pages
1. Crea un repositorio nuevo en github.com.
2. Add file > Upload files y sube todos los archivos de esta carpeta (sin subcarpetas, así funciona desde el celular).
3. Settings > Pages > Source: Deploy from a branch > main / (root) > Save.
4. En un minuto tendrás el enlace `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.
