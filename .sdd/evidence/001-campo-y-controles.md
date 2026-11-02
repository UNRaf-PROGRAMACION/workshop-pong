# Evidencia: 001 — Campo y controles locales

## Registros fuente

- [Spec aprobada](../specs/001-campo-y-controles.md).
- [Plan](../plans/001-campo-y-controles.md).

## Cambios realizados

- `src/game/paddles.js`: constantes y función pura de movimiento con delta temporal y límites.
- `src/game/scenes/Game.js`: campo, línea central, paletas, textos y controles de teclado locales al canvas, con limpieza de eventos y teclas retenidas.
- `src/game/main.js`: 800 × 600, fondo negro; conserva FIT y centrado existentes.
- `public/style.css`: contenedor de juego ocupa el espacio disponible e indicador de foco de teclado.
- `index.html`: idioma español y título de PONG.
- `tests/paddles.test.js`: siete pruebas con el ejecutor nativo de Node, sin dependencias nuevas.
- `.sdd/specs/001-campo-y-controles.md` y `.sdd/specs/README.md`: aprobación y seguimiento.

## Verificación por criterio de aceptación

Comando ejecutado: `node --test tests/paddles.test.js`.
Resultado: **7 pruebas aprobadas, 0 fallidas**.

| Criterio | Verificación realizada | Resultado observado | Limitaciones |
| --- | --- | --- | --- |
| AC-001-01 | Prueba de constantes y simetría; revisión de creación de paletas | Campo 800 × 600, paletas 16 × 100, margen calculado 32; escena inicializa centros en y=300 | Falta revisión visual de la escena |
| AC-001-02 | Prueba de dirección en `movePaddle` y revisión del mapeo de teclas | Subir resta 42 y bajar suma 42 en 100 ms; teclas separadas por jugador | Falta interacción real con teclado |
| AC-001-03 | Cuatro combinaciones de direcciones en el cálculo puro | Las dos posiciones se calculan de forma independiente | No demuestra entrega de eventos del navegador ni ausencia de ghosting; falta revisión de dos personas |
| AC-001-04 | Prueba de direcciones opuestas y dirección restante | Con ambas direcciones no hay desplazamiento; una dirección restante vuelve a mover | Falta prueba de pulsación y liberación en navegador |
| AC-001-05 | Pruebas contra extremos con delta normal y grande | Centro limitado a [50, 550], sin geometría fuera del campo | Validación del cálculo, no visual |
| AC-001-06 | Simulación de un segundo a 30, 60 y 120 actualizaciones/s desde y=50 | Posición final y=470 en las tres tasas, error menor a 1e-8 | No es medición de FPS ni rendimiento del navegador |
| AC-001-07 | Revisión de FIT y dimensiones; inspección DOM inicial limitada | Canvas con proporción aproximada 4:3 en la inspección inicial | No se completó prueba de redimensionado ni captura de evidencia dentro del repositorio |
| AC-001-08 | Revisión de listeners en canvas y `preventDefault` para flechas y Espacio | Implementación restringida al elemento enfocado | Pendiente comprobar scroll y foco con interacción real |

## Otras comprobaciones y restricción posterior

- Antes de la indicación posterior del usuario se ejecutó `npm run build-nolog`: terminó correctamente, con advertencia de chunks mayores de 500 kB. No se ajustó la configuración para silenciarla.
- Antes de esa indicación también se abrió el juego con `agent-browser`. El navegador informó título «PONG — Dos jugadores» y Phaser 4/WebGL, sin errores reportados por el comando de consulta de errores. Los intentos de inspeccionar las paletas mediante instrumentación de la escena no obtuvieron sus datos; no se consideran pruebas aprobadas de interacción.
- Una captura se guardó en el directorio temporal externo de la herramienta, no en la ruta solicitada del repositorio. No se usa como evidencia visual revisada.
- El usuario indicó después: **«no hagas build / no utilizes agent browser»**. Desde esa instrucción no se ejecutaron más builds ni llamadas a esa herramienta. No repetir estas verificaciones sin nueva autorización.

## Resultado y seguimiento

Implementación de 001 realizada, con validación automatizada del cálculo de movimiento. No se marca como aceptación final: quedan pendientes la revisión visual, redimensionado, comportamiento de scroll y la prueba presencial de las cuatro combinaciones de teclado.

### Comprobación manual pendiente para el usuario

1. Abrir el servidor local y hacer clic en el campo o enfocarlo mediante Tab.
2. Verificar W/S y flechas; probar W+arriba, W+abajo, S+arriba y S+abajo con dos personas. Registrar modelo de teclado y posibles bloqueos.
3. Pulsar ambas direcciones del mismo jugador y soltar una; comprobar respuesta y límites superior/inferior.
4. Redimensionar la ventana; verificar que el campo no se deforma.
5. Con el juego enfocado, probar flechas y Espacio sin desplazamiento de página. Cambiar el foco y confirmar que las paletas no continúan por teclas retenidas.

No se agregaron pelota, puntos, saques, pausa ni sonidos. No se instalaron dependencias ni se cambió la configuración de entrega.
