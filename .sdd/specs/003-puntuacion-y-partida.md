# Game spec: 003 — Puntuación y flujo de partida

## Intención del jugador

Jugar una partida local completa, identificar quién gana cada punto y disputar una revancha cuando alguien llega a 3.

## GDD relacionado y pilar de diseño

[GDD](../../docs/game/gdd-breve.md), secciones 6, 7, 8 y 9. Pilares: simplicidad y legibilidad. Cobertura: GDD-01, GDD-06, GDD-07 y GDD-08.

## Comportamiento jugable actual y esperado

Actual: el flujo del código no fue auditado; esta spec presupone campo, controles y pelota de 001 y 002.

Esperado: estados de inicio, preparación de saque, intercambio y resultado, con marcador visible y victoria inmediata al alcanzar 3 puntos. La pausa se integra en 004.

## Alcance jugable

- Inicio con título, controles y «Espacio para jugar».
- Marcador con «Jugador 1», «Jugador 2» y «Primero a 3».
- Inicio en 0–0, paletas centradas y pelota en el centro lógico (400, 300).
- Cuenta regresiva visible de 3 segundos antes de cada saque.
- Detección de salida completa de pelota y asignación de un punto.
- Reposición entre puntos y elección determinista de la dirección del saque.
- Resultado con ganador, marcador final y «Espacio para revancha».

## Fuera de alcance

Pausa y pérdida de foco, que incorpora 004; audio, persistencia, IA, juego en línea y reglas de diferencia de dos puntos.

## Reglas y restricciones

- Durante la cuenta regresiva se pueden mover las paletas, pero la pelota permanece inmóvil.
- Cada saque usa rapidez 320 y ángulo de 15° respecto de la horizontal.
- Primer saque hacia el jugador 2 y hacia arriba; los siguientes apuntan hacia quien recibió el punto en contra y alternan su componente vertical arriba/abajo.
- Un punto no definitivo repone paletas y pelota, restablece la rapidez inicial y comienza otra cuenta regresiva.
- La pelota debe cruzar completamente el lateral: mientras parte de ella permanezca dentro no se concede el punto.
- Salida por izquierda: punto del jugador 2. Salida por derecha: punto del jugador 1. La salida se procesa una sola vez.
- El tercer punto termina inmediatamente la partida. No hay empate, prórroga, diferencia mínima ni límite de tiempo.
- En resultado, pelota y paletas permanecen detenidas y no se inicia otro saque.
- Espacio solo inicia desde inicio o resultado; mantenerlo presionado no debe encadenar reinicios.

## Criterios de aceptación

- [ ] AC-003-01: el inicio muestra título, controles y la instrucción; Espacio inicia en 0–0 con posiciones iniciales y cuenta regresiva visible.
- [ ] AC-003-02: durante los 3 segundos de preparación la pelota está quieta y ambos jugadores pueden mover sus paletas; después sale a rapidez 320, hacia la derecha y arriba en el primer saque.
- [ ] AC-003-03: una pelota parcialmente fuera no concede puntos; al salir por completo concede exactamente uno al rival y deja de procesar ese intercambio.
- [ ] AC-003-04: después de cada punto no definitivo, ambas paletas se centran y la pelota vuelve al centro; el siguiente saque ocurre tras 3 segundos, a rapidez inicial y hacia el jugador que recibió el punto en contra.
- [ ] AC-003-05: los componentes verticales de saques consecutivos alternan arriba, abajo, arriba, incluso si cambia el jugador receptor.
- [ ] AC-003-06: verificar para ambos ganadores resultados 3–0, 3–1 y 3–2. En todos, el tercer punto muestra el resultado y detiene pelota y paletas sin otro saque ni puntos adicionales.
- [ ] AC-003-07: desde resultado, una nueva pulsación de Espacio reinicia puntajes, posiciones, rapidez y secuencia de saque; el primer saque vuelve a dirigirse al jugador 2 y arriba.
- [ ] AC-003-08: Espacio durante un intercambio o una cuenta regresiva no reinicia ni altera la partida; mantenerlo no genera transiciones repetidas.
- [ ] AC-003-09: marcador, identidad del ganador e instrucciones son legibles y se comunican mediante texto, sin depender de audio o color.

## Evidencia esperada

- Registro de resultados para ambos jugadores y de la secuencia de saques.
- Captura del resultado final y video o secuencia de capturas del inicio, punto y revancha.
- Pruebas de asignación de puntos y bloqueo al finalizar, más `npm run build-nolog`.
- Plan y evidencia futuros: `.sdd/plans/003-puntuacion-y-partida.md` y `.sdd/evidence/003-puntuacion-y-partida.md`.

## Preguntas abiertas y supuestos

Depende de 001 y 002. La continuidad segura ante pérdida de foco no se considera terminada hasta integrar 004. No se requieren nuevas decisiones de diseño para este alcance.

## Aprobación humana

- Estado: borrador, pendiente de revisión de esta spec.
- Aprobado por: pendiente.
- Fecha: pendiente.
