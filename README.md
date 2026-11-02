# PONG — Workshop UNRaf

Recreación jugable del PONG clásico: un juego competitivo local para dos personas, pensado para partidas cortas y revancha inmediata. Cada jugador controla una paleta vertical y devuelve la pelota al campo contrario; gana quien suma **3 puntos** primero.

El proyecto se desarrolla en el workshop de la cátedra de Programación de UNRaf usando **Phaser 4**, **Vite** y **JavaScript**.

La propuesta completa de diseño —reglas, parámetros, estados y criterios de aceptación— está en el [GDD](docs/game/gdd-breve.md). Este README resume lo necesario para jugar y ejecutar el proyecto.

## Estado del proyecto

El GDD está confirmado y dividido en cuatro entregas verificables. La implementación avanza por incrementos; lo que sigue describe el alcance de cada una, no una versión terminada.

| Spec | Alcance | Estado |
| --- | --- | --- |
| [001](.sdd/specs/001-campo-y-controles.md) | Campo, paletas y controles locales | Implementada; validación con teclado físico pendiente |
| [002](.sdd/specs/002-pelota-y-rebotes.md) | Pelota, rebotes y ángulos de devolución | Implementada; evidencia parcial |
| [003](.sdd/specs/003-puntuacion-y-partida.md) | Puntuación, saques, victoria y revancha | En diseño |
| [004](.sdd/specs/004-pausa-y-foco.md) | Pausa y gestión del foco de ventana | En diseño |

Hoy el juego muestra el campo, permite mover ambas paletas y pone la pelota en movimiento con rebotes y devoluciones. El marcador, los saques, la victoria, la pausa y la revancha todavía no forman parte de la build.

## Requisitos

- [Node.js](https://nodejs.org) 20 o superior (verificado con Node 23.8.0).

## Ejecutar

```bash
npm install
npm run dev
```

El servidor de desarrollo queda en `http://localhost:8080`.

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo con recarga automática |
| `npm run build` | Build de producción en `dist/` |
| `npm run dev-nolog` / `npm run build-nolog` | Igual, sin el ping anónimo de la plantilla de Phaser |
| `node --test "tests/*.test.js"` | Tests de las reglas de paletas y pelota |

El build de producción se despliega publicando el contenido de `dist/`.

## Controles

Solo existe el modo **1 vs 1 local**: no hay inteligencia artificial ni juego en red.

| Acción | Tecla |
| --- | --- |
| Jugador 1 — paleta izquierda | `W` / `S` |
| Jugador 2 — paleta derecha | `↑` / `↓` |
| Iniciar partida | `Espacio` |
| Pausar / reanudar | `P` |
| Revancha | `Espacio` |

Hacé clic en el campo para que el juego reciba el teclado; si la ventana pierde el foco, se sueltan las teclas retenidas.

## Reglas

- La pelota se mueve sola y rebota en los bordes superior e inferior conservando su velocidad.
- El punto de contacto en la paleta define el ángulo de devolución: del centro sale horizontal, hacia los extremos hasta 60°.
- Cada impacto válido en una paleta acelera la pelota un 5 %, con un tope de 650 unidades/s.
- Si la pelota cruza el lateral izquierdo suma el jugador 2; si cruza el derecho, suma el jugador 1.
- Antes de cada saque hay 3 segundos de cuenta regresiva; las paletas se pueden mover, la pelota no.
- Gana quien llega a 3 puntos; los resultados 3–0, 3–1 y 3–2 son válidos, sin diferencia mínima.
- La revancha reinicia puntajes, posiciones, velocidad y secuencia de saque.

### Parámetros iniciales

| Parámetro | Valor |
| --- | --- |
| Resolución lógica | 800 × 600 |
| Paleta | 16 × 100, separada 32 del lateral |
| Radio de la pelota | 8 |
| Velocidad de paleta | 420 unidades/s |
| Velocidad inicial de la pelota | 320 unidades/s |
| Aceleración por impacto | +5 %, hasta 650 unidades/s |
| Ángulo máximo de devolución | 60° |
| Cuenta regresiva de saque | 3 s |
| Puntaje para ganar | 3 |

## Estructura

| Ruta | Contenido |
| --- | --- |
| `index.html` | Página que contiene el juego |
| `src/main.js` | Arranque de la aplicación |
| `src/game/main.js` | Configuración de Phaser y escalado del campo |
| `src/game/scenes/Game.js` | Escena principal: campo, entrada y bucle de actualización |
| `src/game/paddles.js` | Constantes del campo y movimiento de paletas |
| `src/game/ball.js` | Estado, avance, rebotes y devoluciones de la pelota |
| `tests/` | Tests de las reglas, ejecutables con Node |
| `public/` | Assets estáticos y estilos globales |
| `vite/` | Configuración de desarrollo y producción |
| `docs/game/` | Idea de juego y GDD |
| `.sdd/` | Specs, planes y evidencia del proceso de diseño |

## Documentación

- [GDD](docs/game/gdd-breve.md) — diseño, reglas, parámetros y criterios de aceptación (GDD-01 a GDD-10).
- [Specs](.sdd/specs/README.md) — entregas, dependencias y cobertura del GDD.
- [Guía del workshop](.agent-ready/workshop/guia-de-inicio.md) y [checklist de progreso](.agent-ready/workshop/checklist-de-progreso.md) — flujo de trabajo esperado.
- [AGENTS.md](AGENTS.md) — acuerdos de trabajo para agentes que editen el repositorio.

## Fuera de alcance

Modo contra la computadora, multijugador en línea, torneos, habilidades especiales, obstáculos, niveles, controles táctiles o con mando y persistencia de resultados. Los sonidos quedan para una iteración posterior a la validación de las reglas.

## Licencia

MIT — ver [LICENSE](LICENSE).
