# Especificaciones de PONG

Fuente de diseño: [GDD confirmado](../../docs/game/gdd-breve.md). El usuario confirmó el GDD en la conversación y autorizó crear estas specs; la aprobación del diseño no implica aprobación automática de cada spec ni autorización para implementar.

## Orden de entrega propuesto

| ID | Spec | Depende de | Estado |
| --- | --- | --- | --- |
| 001 | [Campo y controles locales](001-campo-y-controles.md) | — | Aprobada para implementación |
| 002 | [Pelota y rebotes](002-pelota-y-rebotes.md) | 001 | Aprobada para implementación |
| 003 | [Puntuación y flujo de partida](003-puntuacion-y-partida.md) | 001, 002 | Borrador |
| 004 | [Pausa y gestión del foco](004-pausa-y-foco.md) | 003 | Borrador |

Las dos primeras entregas son incrementos verificables, no una versión final completa. La primera versión jugable del GDD queda cubierta al completar las cuatro. Los sonidos quedan para una iteración posterior, como permite el GDD.

## Cobertura del GDD

| Criterio del GDD | Spec responsable |
| --- | --- |
| GDD-01: inicio y saque | 003 |
| GDD-02 y GDD-03: controles y límites | 001 |
| GDD-04 y GDD-05: devolución y rebotes | 002 |
| GDD-06, GDD-07 y GDD-08: puntos, victoria y revancha | 003 |
| GDD-09: pausa y foco | 004 |
| GDD-10: escalado y teclas sin desplazamiento | 001 |

## Convenciones y revisión

- Se usa la estructura de `.sdd/templates/game-spec.md`, sin modificar la plantilla.
- Los valores del GDD se toman como valores iniciales de aceptación; cualquier ajuste posterior debe documentarse antes de cambiar los criterios.
- Los criterios permanecen sin marcar hasta obtener evidencia de implementación.
- Después de aprobar cada spec, crear su plan con el mismo identificador en `.sdd/plans/` y registrar resultados en `.sdd/evidence/`.
- Las specs 001 y 002 tienen implementación y evidencia parcial: [001](../evidence/001-campo-y-controles.md), [002](../evidence/002-pelota-y-rebotes.md). Las specs 003 y 004 siguen en revisión documental. La validación visual y con teclado físico permanece pendiente.
