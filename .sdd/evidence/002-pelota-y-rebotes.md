# Evidencia: 002 — Pelota y rebotes

## Registros fuente

- [Spec aprobada](../specs/002-pelota-y-rebotes.md).
- [Plan](../plans/002-pelota-y-rebotes.md).

## Archivos modificados

- `src/game/ball.js`: estado inicial, constantes y avance puro con colisiones por tiempo de impacto.
- `src/game/scenes/Game.js`: círculo blanco, estado lógico y actualización conjunta de paletas y pelota en subpasos de hasta 1/120 s.
- `tests/ball.test.js`: 24 pruebas de física sin Phaser ni navegador.
- `.sdd/specs/002-pelota-y-rebotes.md`, `.sdd/specs/README.md`: aprobación y seguimiento.
- Plan y este registro de evidencia.

## Verificación ejecutada

- `node --test tests/paddles.test.js tests/ball.test.js`: **31 aprobadas, 0 fallidas** (24 de pelota y 7 de regresión de paletas).
- `node --check src/game/scenes/Game.js`: terminó sin errores de sintaxis.
- La primera corrida encontró un valor esperado incorrecto en la prueba de múltiples rebotes de pared (se había escrito y=14). Se recalculó la trayectoria: 292 unidades hasta el suelo, dos recorridos de 584 y 490 hacia arriba dejan y=102. Se corrigió la expectativa y se añadieron comparaciones a 30, 60 y 120 pasos/s para ambas direcciones. La corrida final aprobó todas las pruebas.
- Tolerancia de comparación numérica: 1e-8.
- **No se ejecutó build ni se utilizó agent-browser**, respetando la restricción del usuario.

## Verificación por criterio

| Criterio | Prueba y resultado observado | Limitaciones |
| --- | --- | --- |
| AC-002-01 | Radio 8, centro (400, 300), rapidez 320 y ángulo inicial de −15° verificados | Apariencia del círculo pendiente de revisión visual |
| AC-002-02 | Techo y suelo conservan rapidez y vx e invierten vy; trayectoria dentro de [8, 592] | Verificado en física pura |
| AC-002-03 | Ambas paletas devuelven al rival; centro horizontal, contactos superiores hacia arriba e inferiores hacia abajo | Integración visual pendiente |
| AC-002-04 | Desplazamientos ±10, ±25, ±50 y ±57 producen ángulos crecientes hasta ±60° | Política arcade de caras frontales con margen de radio, no simulación exacta de esquinas circulares |
| AC-002-05 | Primer contacto a 320 resulta en 336; 25 contactos controlados verifican multiplicación y tope 650 | Se recrea cada contacto en tests, sin controles de prueba en el juego |
| AC-002-06 | Solapamiento entrante se separa y acelera una vez; pasos siguientes no repiten impacto; pelota saliente no acelera | Pruebas deterministas con paletas estáticas |
| AC-002-07 | Ambas paletas a 650, centro y extremos, a 30/60/120 pasos/s; paredes durante tres segundos y un paso de 3000 ms; contacto simultáneo junto al techo sin atasco | No se midieron FPS ni se probó interacción humana con paletas móviles |
| AC-002-08 | Salidas completas por izquierda y derecha desactivan el intercambio sin invertir vx, reponer ni envolver; salida parcial conserva actividad | No incluye puntuación ni próximo saque, reservados para 003 |

## Comportamiento de este incremento

Al crear la escena, la pelota comienza desde el centro hacia la derecha y arriba a 320 unidades/s. Las paletas conservan W/S y flechas. No hay cuenta regresiva. Tras salir completamente por un lateral, la pelota se oculta y deja de avanzar; las paletas siguen siendo controlables. No se agregó reinicio, menú de pruebas ni nuevas teclas.

## Resultado y seguimiento

Implementación y pruebas de física completadas. Los criterios de la spec se conservan sin marcar como aceptación final hasta revisar el juego integrado. Faltan captura o video, comprobación visual de trayectorias y juego con dos personas. No se afirma que compila ni que la escena haya sido validada en navegador durante esta entrega.

Próximo incremento previsto: spec 003 para inicio, cuenta regresiva, puntos, victoria a 3 y revancha; requiere autorización del usuario. Sin dependencias nuevas ni cambios en configuración de entrega.
