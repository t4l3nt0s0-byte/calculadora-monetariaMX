# Caja MXN — App sin internet e instalable (versión corregida v18)

## ¿Por qué antes no abría sin internet?

Casi siempre por una de dos razones:
1. **Se quedó pegada la versión vieja** del "guardado offline" en el teléfono, o
2. **Algún archivo no subió bien** (sobre todo la carpeta `lib/`), y el guardado falló completo.

Esta versión lo corrige: se **limpia sola** la versión vieja, guarda archivo por archivo (si uno falla no se cae todo), te muestra en pantalla **"✓ Lista para usar sin internet"** cuando ya quedó guardada, y te aparece un **botón "Instalar"** solo.

## Archivos (súbelos TODOS, con la carpeta `lib`)

```
index.html
manifest.webmanifest
sw.js
icon-192.png
icon-512.png
icon-180.png
lib/chart.umd.js
lib/jspdf.umd.min.js
lib/jspdf.plugin.autotable.min.js
```

## Pasos (hazlos en orden)

### 1) En GitHub
- **Add file → Upload files**, arrastra todos los archivos **y la carpeta `lib`**, acepta reemplazar, **Commit changes**.
- Verifica que en tu repo quede la carpeta **`lib`** al lado de `index.html` (ábrela: deben verse 3 archivos).

### 2) En el teléfono — BORRA lo viejo primero
- Si ya tenías el ícono instalado, **desinstálalo** (mantén presionado → quitar/desinstalar).
- Abre tu liga en el navegador y **borra los datos del sitio**:
  - **Android (Chrome):** candado ⓘ junto a la dirección → *Permisos/Datos del sitio* → *Borrar y restablecer* (o Configuración → Privacidad → Borrar datos de navegación).
  - **iPhone (Safari):** Ajustes → Safari → Avanzado → Datos de sitios web → busca tu página → eliminar.

### 3) Instalar
- Abre la liga **con internet**. Espera a ver abajo el aviso verde **"✓ Lista para usar sin internet"**.
- Aparecerá un botón **"Instalar"** (o en iPhone: **Compartir → Agregar a inicio**). Tócalo.

### 4) Probar
- Cierra, **quita el internet** y abre el ícono. Debe cargar.

## Comprobar que `lib` subió bien
Con internet, entra a **Reportes**: si ves las gráficas y "Exportar PDF" funciona, `lib` quedó bien. Si no, la carpeta `lib` no está junto a `index.html`.

## Si actualizas la app en el futuro
Sube el `sw.js` cambiando su versión (`cajamxn-v18` → `v19`) para forzar que el teléfono tome la nueva.
