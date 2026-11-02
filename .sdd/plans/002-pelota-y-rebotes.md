# Plan: 002 — Pelota y rebotes

## Spec fuente

- [Spec 002](../specs/002-pelota-y-rebotes.md), autorizada por el usuario mediante «implementa la spec 002».
- Se mantiene la prohibición de ejecutar builds y usar agent-browser. No instalar dependencias.

## Evidencia del repositorio

- `src/game/scenes/Game.js`: campo y dos rectángulos con posiciones centrales, controles y actualización por delta.
- `src/game/paddles.js`: constantes del campo y movimiento puro; patrón a conservar para física independiente de Phaser.
- `tests/paddles.test.js`: ejecutor nativo `node:test`, sin dependencias adicionales.
- La aceptación visual y física de 001 permanece pendiente; no se presupone que esté validada por personas.

## Pasos propuestos

1. Crear `src/game/ball.js` con estado inicial y avance puro. Radio 8, rapidez 320 y dirección inicial de 15° hacia derecha/arriba, según el GDD. Sin cuenta regresiva ni lógica de saque.
2. Resolver colisiones por tiempo de impacto, no solo solapamiento final, para evitar atravesar paletas o paredes en un paso grande. Las caras de juego son las interiores de las paletas, con margen vertical de radio de pelota; contactos extremos se limitan a ±60°.
3. Separar contactos iniciales solapados hacia el campo solo cuando la pelota se aproxima. Tras devolver, la dirección saliente impide repetir el impacto. Rapidez multiplicada por 1,05, con tope 650.
4. Integrar un círculo blanco en la escena. Actualizar paletas y pelota en subpasos de hasta 1/120 s para reducir saltos relativos de paletas móviles. La pelota comienza a moverse al crear la escena y queda fuera del intercambio al salir completamente del campo; no se añaden reinicios ni controles temporales.
5. Añadir pruebas de radio, rapidez, paredes, ambas paletas, ángulos, aceleración, solapamientos, extremos, delta grande y salidas. Ejecutar también regresión de 001.

## Archivos y símbolos

- `src/game/ball.js`: `createBall`, `advanceBall`, constantes de radio y velocidades.
- `src/game/scenes/Game.js`: creación y sincronización de pelota con estado lógico.
- `tests/ball.test.js`: pruebas deterministas sin navegador.
- Spec, índice y `.sdd/evidence/002-pelota-y-rebotes.md`: aprobación y resultados.

## Verificación

- `node --test tests/paddles.test.js tests/ball.test.js`.
- `node --check src/game/scenes/Game.js` para sintaxis, sin compilar.
- Tolerancia numérica 1e-8 para rapidez, posiciones y ángulos en pruebas controladas. Comparar 30, 60 y 120 pasos/s y pasos grandes con paletas estáticas.
- No se ejecutarán builds, capturas ni automatización de navegador. Registrar revisión visual como pendiente.

## Condiciones de detención

Detener ante necesidad de dependencias o cambios de configuración. No introducir marcador, cuenta regresiva, revancha, pausa o audio. La prueba de intercambio se repite recreando el estado puro en tests; no se agrega una pantalla o tecla de pruebas al producto.
