# Caja MXN — App sin internet e instalable en el teléfono

Esta versión funciona **100% sin conexión** (no depende de internet) y se puede **instalar en tu teléfono** como una app.

## Archivos (súbelos TODOS juntos, respetando la carpeta `lib`)

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

> Importante: `sw.js`, `manifest.webmanifest` y la carpeta `lib/` deben quedar **junto a** `index.html` (en la misma carpeta/raíz).

## Subir a GitHub Pages

1. Sube todos los archivos a tu repositorio (arrastra la carpeta completa).
2. En **Settings → Pages**, elige la rama `main` y carpeta `/root`.
3. Abre tu liga `https://<tu-usuario>.github.io/<tu-repo>/` en el teléfono **una vez con internet** (para que se guarde en el teléfono).

## Instalar en el teléfono

**Android (Chrome):** abre la liga → menú ⋮ → **“Instalar aplicación”** o **“Agregar a pantalla de inicio”**.

**iPhone (Safari):** abre la liga → botón **Compartir** (cuadro con flecha) → **“Agregar a inicio”**.

Queda un ícono en tu pantalla. Al abrirlo se ve como app (pantalla completa) y **funciona sin señal**.

## ¿Cómo funciona sin internet?

- Todos tus datos se guardan en el propio teléfono (no se envían a ningún lado).
- Las librerías de gráficas y PDF van **incluidas** en los archivos (carpeta `lib`), no se descargan de internet.
- Un *service worker* (`sw.js`) guarda la app en el teléfono la primera vez que la abres con internet; después abre aunque no tengas señal.

## Notas

- La primera carga necesita internet **una sola vez** (para guardar la app). Después, offline.
- Si actualizas la app, vuelve a abrirla con internet una vez para que tome la nueva versión (el `sw.js` usa versión `cajamxn-v16`; súbela con número nuevo cuando cambies algo).
- También puedes abrir `index.html` directo desde los Archivos del teléfono y funciona, pero instalarla desde GitHub Pages da la mejor experiencia.
