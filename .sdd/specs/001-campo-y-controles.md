# Game spec: 001 — Campo y controles locales

## Intención del jugador

Dos personas pueden reconocer su lado y mover sus paletas simultáneamente desde un mismo teclado, en igualdad de condiciones.

## GDD relacionado y pilar de diseño

[GDD](../../docs/game/gdd-breve.md), secciones 4, 5, 8 y 10. Pilares: igualdad de condiciones, respuesta inmediata y legibilidad. Cobertura: GDD-02, GDD-03 y GDD-10.

## Comportamiento jugable actual y esperado

Actual: existe un proyecto Phaser/Vite/JavaScript; el comportamiento jugable del código no fue auditado al redactar esta spec.

Esperado: campo arcade proporcional con dos paletas simétricas, controles independientes y límites sólidos para las paletas. Este incremento no incluye una partida completa.

## Alcance jugable

- Campo lógico de 800 × 600, fondo negro y línea central discontinua decorativa.
- Dos paletas blancas de 16 × 100, centradas verticalmente al entrar al campo.
- Borde exterior de cada paleta separado 32 unidades del lateral correspondiente.
- Jugador 1: W/S. Jugador 2: flechas arriba/abajo.
- Velocidad constante de 420 unidades/s, independiente de la tasa de cuadros.
- Indicaciones visibles de jugador y controles.
- Escalado proporcional al redimensionar la ventana; se permiten márgenes.
- Evitar el desplazamiento de página por flechas y Espacio mientras el juego tiene el foco.

## Fuera de alcance

Pelota, colisiones de pelota, marcador funcional, saques, victoria, pausa y sonidos. No se agregan pantallas de prueba permanentes al producto.

## Reglas y restricciones

- Cada paleta solo se desplaza verticalmente y su geometría completa permanece dentro del campo.
- Soltar la dirección detiene el movimiento; pulsar ambas direcciones del mismo jugador produce velocidad cero.
- Las teclas de un jugador no alteran la paleta contraria.
- Conservar Phaser, Vite y JavaScript y la configuración existente. No instalar dependencias sin aprobación explícita.
- La comprobación del control simultáneo debe realizarse también con un teclado físico: el ghosting es una limitación del hardware que no debe ocultarse.

## Criterios de aceptación

- [ ] AC-001-01: al mostrar el campo, ambas paletas tienen iguales dimensiones, separación lateral y posición vertical inicial de 300 unidades en su centro.
- [ ] AC-001-02: W y S mueven únicamente la paleta izquierda en la dirección correspondiente; las flechas hacen lo mismo con la derecha.
- [ ] AC-001-03: las cuatro combinaciones entre una dirección de cada jugador responden simultáneamente; se registra el teclado utilizado y cualquier limitación física.
- [ ] AC-001-04: mantener direcciones opuestas de un jugador detiene solo su paleta; al soltar una, responde la dirección restante.
- [ ] AC-001-05: mantener una dirección contra cada borde no permite que ninguna parte de la paleta salga del campo.
- [ ] AC-001-06: en una prueba controlada sin alcanzar bordes, un segundo de movimiento desplaza la paleta 420 unidades, con tolerancia de un paso de actualización; repetir con tasas de actualización distintas produce el mismo resultado dentro de esa tolerancia.
- [ ] AC-001-07: al redimensionar, el campo conserva relación 4:3 y no se alteran posiciones o velocidades lógicas.
- [ ] AC-001-08: con foco en el juego, flechas y Espacio no desplazan la página.

## Evidencia esperada

- Captura del campo y registro de tamaños de ventana probados.
- Registro de movimiento, límites y combinaciones simultáneas, con revisión de dos personas en el equipo objetivo.
- Resultado de `npm run build-nolog`; la compilación no sustituye las pruebas de interacción.
- Plan y evidencia futuros: `.sdd/plans/001-campo-y-controles.md` y `.sdd/evidence/001-campo-y-controles.md`.

## Preguntas abiertas y supuestos

Sin bloqueos de diseño. Los valores confirmados en el GDD son el punto de partida; el balance sigue sujeto a pruebas. El mecanismo de prueba de este incremento se definirá en el plan, tras inspeccionar el código.

## Aprobación humana

- Estado: aprobada para implementación.
- Aprobado por: usuario, mediante instrucción explícita en la conversación.
- Fecha: 2026-10-26.
- Referencia: «aprobame la spec 001 — implementarla».
