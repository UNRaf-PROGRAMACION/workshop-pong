# Game spec: 004 — Pausa y gestión del foco

## Intención del jugador

Interrumpir y continuar una partida sin perder un punto por una pausa o cambio de ventana y sin que queden teclas retenidas.

## GDD relacionado y pilar de diseño

[GDD](../../docs/game/gdd-breve.md), secciones 4, 7 y 8. Pilares: igualdad de condiciones y respuesta inmediata. Cobertura: GDD-09.

## Comportamiento jugable actual y esperado

Actual: no se verificó la gestión de foco del código; se presupone el flujo de partida de 003 completado.

Esperado: P pausa y reanuda tanto un intercambio como una preparación de saque; perder el foco pausa automáticamente sin reanudar al regresar.

## Alcance jugable

- Estado de pausa que recuerda si se interrumpió un intercambio o una preparación de saque.
- Congelación de posiciones, velocidades efectivas, puntuación y temporizador durante la pausa.
- Mensaje visible «Pausa — P para continuar».
- Pausa automática al perder el foco durante el intercambio o la preparación.
- Limpieza de entradas retenidas al perder el foco.

## Fuera de alcance

Menú de opciones, guardado persistente, pausa en red, audio y cambios de reglas o controles existentes.

## Reglas y restricciones

- P alterna pausa/reanudación por una nueva pulsación, no por cada cuadro ni por repetición automática del teclado.
- Recuperar el foco no reanuda. Solo una nueva pulsación de P con el juego enfocado permite continuar.
- Reanudar restaura trayectoria y tiempo restante sin procesar como tiempo de juego el intervalo pausado.
- Durante la pausa no se mueve ninguna paleta ni pelota, no se conceden puntos y Espacio no inicia otra partida.
- Inicio y resultado no se transforman en una partida activa al pulsar P o recuperar el foco.
- Tras perder el foco, ninguna paleta continúa moviéndose por una entrada anterior sin una nueva pulsación direccional.

## Criterios de aceptación

- [ ] AC-004-01: pulsar P durante un intercambio congela posiciones y marcador y muestra el mensaje; otra pulsación continúa con la trayectoria y rapidez previas, sin salto por el tiempo pausado.
- [ ] AC-004-02: pulsar P durante la cuenta regresiva congela también el tiempo restante; reanudar completa solo ese tiempo antes de sacar.
- [ ] AC-004-03: mantener P presionada genera una sola transición; soltarla y volverla a pulsar permite la siguiente.
- [ ] AC-004-04: perder el foco durante preparación o intercambio pausa automáticamente; regresar mantiene la pausa hasta pulsar P.
- [ ] AC-004-05: perder el foco con una dirección retenida y soltarla fuera del juego no deja la paleta moviéndose al reanudar; una nueva pulsación vuelve a controlarla normalmente.
- [ ] AC-004-06: durante la pausa, direcciones y Espacio no cambian posiciones, puntos ni estado de partida.
- [ ] AC-004-07: P y cambios de foco en inicio o resultado no disparan saques, reinicios ni reanudaciones indebidas.
- [ ] AC-004-08: después de varios ciclos de pausa y reanudación se puede completar una partida a 3 y una revancha respetando 003.

## Evidencia esperada

- Registro de pausa durante intercambio y cuenta regresiva, incluyendo tiempo y posiciones antes y después.
- Prueba manual de cambio de ventana con una tecla retenida y captura del mensaje de pausa.
- Prueba de regresión de partida completa y revancha con dos personas; `npm run build-nolog` como comprobación adicional de compilación.
- Plan y evidencia futuros: `.sdd/plans/004-pausa-y-foco.md` y `.sdd/evidence/004-pausa-y-foco.md`.

## Preguntas abiertas y supuestos

Depende de 003. El plan debe comprobar los eventos de foco disponibles en la versión instalada de Phaser y en el navegador objetivo. El objetivo de 60 FPS del GDD requiere medición posterior, no queda demostrado por compilar.

## Aprobación humana

- Estado: borrador, pendiente de revisión de esta spec.
- Aprobado por: pendiente.
- Fecha: pendiente.
