# Game spec: 002 — Pelota y rebotes

## Intención del jugador

Interceptar la pelota y dirigir su devolución para superar al rival, con trayectorias predecibles y presión creciente durante intercambios largos.

## GDD relacionado y pilar de diseño

[GDD](../../docs/game/gdd-breve.md), secciones 3, 5 y 6, movimiento y colisiones. Pilares: respuesta inmediata e igualdad de condiciones. Cobertura: GDD-04 y GDD-05.

## Comportamiento jugable actual y esperado

Actual: no se verificó una implementación de pelota; esta spec presupone la entrega 001 completada.

Esperado: pelota con rebotes fiables, devolución según la altura de impacto y aceleración limitada. El ciclo de saques y puntos corresponde a 003.

## Alcance jugable

- Pelota blanca de radio 8 y rapidez inicial de 320 unidades/s.
- Rebote en techo y suelo conservando rapidez.
- Rebote en ambas paletas según la posición relativa del contacto.
- Aumento de rapidez del 5 % por contacto válido con paleta, con máximo de 650 unidades/s.
- Laterales abiertos, sin rebote ni envolvimiento al otro lado.
- Movimiento independiente de la tasa de cuadros.

## Fuera de alcance

Marcador, cuentas regresivas, elección del próximo saque, victoria, revancha, pausa y audio. Los controles y el campo se heredan de 001.

## Reglas y restricciones

- Un golpe central devuelve la pelota horizontalmente hacia el rival.
- Por encima del centro devuelve hacia arriba; por debajo, hacia abajo. El ángulo crece con la distancia relativa al centro hasta 60° respecto de la horizontal.
- La velocidad de la paleta no añade efectos ni modifica el ángulo: depende de la posición de contacto.
- Cada contacto físico cuenta una sola vez; no puede provocar aceleraciones o inversiones repetidas por solapamiento.
- Las colisiones no deben atravesar paletas ni paredes hasta la rapidez máxima prevista.
- Los rebotes de pared solo invierten el componente vertical; no aceleran la pelota.
- La política exacta de detección y resolución se definirá en el plan sin cambiar estas reglas.

## Criterios de aceptación

- [ ] AC-002-01: la pelota tiene radio lógico 8 y comienza una prueba de intercambio con rapidez 320 unidades/s.
- [ ] AC-002-02: al tocar cada pared horizontal rebota hacia el interior, conserva el componente horizontal y no cambia su rapidez más allá de tolerancias numéricas.
- [ ] AC-002-03: un impacto centrado en cada paleta devuelve hacia el rival sin componente vertical; los contactos superiores e inferiores producen la dirección vertical correspondiente.
- [ ] AC-002-04: probar contactos próximos al centro y a ambos extremos produce ángulos crecientes en magnitud, nunca superiores a 60°.
- [ ] AC-002-05: el primer impacto válido a rapidez 320 produce rapidez 336; los posteriores siguen multiplicando por 1,05 sin superar 650.
- [ ] AC-002-06: un único contacto prolongado o solapado no produce múltiples aumentos de rapidez ni mantiene la pelota atrapada.
- [ ] AC-002-07: a rapidez 650, probar ambas paletas, paredes y contactos cercanos a los extremos sin atravesamientos ni rebotes repetidos. Registrar condiciones y tasas de actualización probadas.
- [ ] AC-002-08: sin paleta en la trayectoria, la pelota puede salir por ambos laterales y no rebota en ellos.

## Evidencia esperada

- Registro de velocidades y ángulos antes y después de los contactos, con tolerancia numérica declarada en el plan.
- Captura o video breve de un intercambio y de pruebas a rapidez máxima.
- Pruebas controladas de colisión y resultado de `npm run build-nolog`; indicar qué pruebas son manuales y cuáles automatizadas.
- Plan y evidencia futuros: `.sdd/plans/002-pelota-y-rebotes.md` y `.sdd/evidence/002-pelota-y-rebotes.md`.

## Preguntas abiertas y supuestos

Depende de 001. No hay bloqueos de diseño; el plan deberá definir cómo disparar y repetir pruebas de pelota antes de integrar el flujo de 003, sin incorporar mecánicas temporales al producto final.

## Aprobación humana

- Estado: aprobada para implementación.
- Aprobado por: usuario, mediante «implementa la spec 002» en la conversación.
- Fecha: 2026-10-26.
