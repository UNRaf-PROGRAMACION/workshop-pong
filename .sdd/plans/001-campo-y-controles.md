# Plan: 001 — Campo y controles locales

## Spec fuente

- [001](../specs/001-campo-y-controles.md), aprobada explícitamente por el usuario el 2026-10-26.

## Evidencia del repositorio

- `src/game/scenes/Game.js`: escena mínima con imágenes y texto de ejemplo; no hay controles existentes.
- `src/game/main.js`: instancia Phaser, escala FIT y centrado ya existentes; resolución actual 1024 × 768.
- `public/style.css`: página negra y contenedor flex; `index.html` conserva título de plantilla.
- `package.json`: Phaser 4, Vite 6, JavaScript ESM, comando `npm run build-nolog`; sin suite de tests declarada.
- Sin índice CodeGraph: inspección directa. No se instalarán dependencias ni cambiará configuración de entrega.

## Pasos propuestos

1. Ajustar dimensiones lógicas y color manteniendo FIT y centrado. Crear campo y textos en la escena existente (AC-01 y AC-07).
2. Separar constantes y cálculo de movimiento en un módulo puro, con límites y delta temporal (AC-02 a AC-06).
3. Manejar teclas por código en el canvas enfocable, prevenir comportamiento de navegador solo con foco y limpiar entradas al perderlo, sin implementar pausa (AC-02 a AC-04 y AC-08).
4. Añadir pruebas con `node:test`, disponible sin dependencias, y comprobar build. Probar en navegador usando `agent-browser` si está disponible; registrar límites de evidencia física.

## Archivos y símbolos

- `src/game/scenes/Game.js`: `create`, `update`, campo, paletas y eventos de teclado.
- `src/game/paddles.js`: constantes y cálculo puro de desplazamiento.
- `src/game/main.js`: tamaño lógico y fondo.
- `public/style.css`, `index.html`: contenedor proporcional y metadatos de idioma/título.
- `tests/paddles.test.js`: pruebas de desplazamiento, límites y direcciones.
- `.sdd/evidence/001-campo-y-controles.md`: resultados y pendientes.

## Verificación

- `node --test tests/paddles.test.js` y `npm run build-nolog`.
- Navegador: captura, controles, direcciones opuestas, combinaciones entre jugadores, foco y redimensionado. La automatización no demuestra ausencia de ghosting del teclado físico.
- AC-06: iniciar en y=50 y mover hacia abajo durante un segundo para medir 420 unidades sin llegar al límite de 550; comparar 30, 60 y 120 actualizaciones/s.

## Condiciones de detención

Detener ante necesidad de dependencias nuevas, cambios de entrega o ambigüedad que altere el GDD. No agregar pelota, puntuación, saques ni pausa. No declarar revisión física o medición de FPS sin haberlas realizado.
