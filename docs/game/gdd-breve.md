# Documento de Diseño de Juego — PONG clásico

## 1. Resumen y alcance

Juego competitivo local para dos personas que recrea las mecánicas esenciales de PONG: cada jugador controla una paleta vertical y devuelve una pelota hacia el campo contrario. El primer jugador en alcanzar **3 puntos** gana.

**Requisitos definidos:** modalidad 1 vs 1, dos jugadores en el mismo teclado y victoria a los 3 puntos.

Los controles, tiempos y parámetros de balance de este documento son propuestas de diseño ajustables durante las pruebas. Este GDD define el comportamiento esperado; no representa una implementación ya realizada.

## 2. Público y experiencia buscada

- **Público:** personas que buscan partidas breves, accesibles y competitivas frente a un rival presencial.
- **Fantasía del jugador:** superar al oponente mediante reflejos, anticipación y colocación de la pelota.
- **Experiencia:** reglas comprensibles de inmediato, intercambios tensos y revancha rápida.
- **Pilares:** simplicidad, igualdad de condiciones, respuesta inmediata y legibilidad visual.

## 3. Bucle principal y dinámicas

1. Ambos jugadores se preparan para el saque.
2. Mueven sus paletas para interceptar la pelota.
3. El punto de impacto en la paleta permite dirigir la devolución.
4. El rival intenta anticipar la trayectoria y cubrir su lado.
5. Cuando alguien falla, su oponente suma un punto.
6. Se repite el saque hasta que uno alcanza 3 puntos.
7. Se anuncia el ganador y se ofrece una revancha.

Los rebotes angulados generan cambios de posición y obligan a decidir entre cubrir el centro o perseguir una trayectoria extrema. La aceleración gradual de la pelota aumenta la presión durante los intercambios largos. No hay azar durante un intercambio: ambos jugadores compiten con las mismas capacidades.

## 4. Modalidad y controles

Solo hay modo **1 vs 1 local**, sin inteligencia artificial ni conexión de red.

| Acción | Tecla propuesta |
| --- | --- |
| Jugador 1, paleta izquierda: subir / bajar | W / S |
| Jugador 2, paleta derecha: subir / bajar | Flecha arriba / flecha abajo |
| Iniciar partida desde la pantalla inicial | Espacio |
| Pausar / reanudar durante una partida | P |
| Iniciar revancha desde el resultado | Espacio |

- Mantener una tecla mueve la paleta a velocidad constante; soltarla la detiene de inmediato.
- Cada jugador puede moverse de forma simultánea e independiente.
- Si un jugador mantiene subir y bajar a la vez, su paleta permanece inmóvil.
- Las paletas no pueden salir de los límites superior e inferior ni desplazarse horizontalmente.
- Las flechas y Espacio no deben desplazar la página mientras el juego tiene el foco.

## 5. Campo y elementos

- Campo rectangular horizontal, con dos paletas y una pelota.
- Paletas simétricas: mismo tamaño, velocidad y distancia a su borde lateral.
- Línea central discontinua, únicamente decorativa.
- Bordes superior e inferior sólidos: hacen rebotar la pelota.
- Laterales izquierdo y derecho abiertos: funcionan como zonas de gol.
- Marcador visible en la parte superior, con el puntaje de cada jugador.

### Parámetros iniciales propuestos

Valores en unidades lógicas; el escalado visual no modifica las reglas.

| Parámetro | Valor inicial |
| --- | --- |
| Resolución lógica | 800 × 600 |
| Tamaño de cada paleta | 16 × 100 |
| Separación entre borde exterior de paleta y lateral | 32 |
| Radio de la pelota | 8 |
| Velocidad de paletas | 420 unidades/s |
| Velocidad inicial de la pelota | 320 unidades/s |
| Aceleración tras impacto en paleta | +5 %, hasta 650 unidades/s |
| Ángulo máximo de devolución | 60° respecto de la horizontal |
| Ángulo de saque | 15° respecto de la horizontal |
| Cuenta regresiva de saque | 3 segundos |
| Puntaje para ganar | 3, sin diferencia mínima |

## 6. Mecánicas y reglas

### Movimiento y colisiones

- La pelota se mueve automáticamente durante el intercambio.
- Al tocar el techo o el suelo, invierte su dirección vertical y conserva su velocidad.
- Al impactar en una paleta, sale hacia el campo contrario. Un golpe central produce una trayectoria horizontal; cuanto más cerca de un extremo sea el contacto, mayor será el ángulo vertical, hasta el máximo establecido.
- La posición relativa de contacto determina el ángulo: extremo superior devuelve hacia arriba; extremo inferior, hacia abajo.
- Cada impacto válido en una paleta aumenta la rapidez un 5 %, sin superar el límite. El efecto se aplica una sola vez por contacto.
- Los contactos deben resolverse sin atravesar paletas, quedar atrapados en ellas ni provocar rebotes repetidos por un único impacto.

### Saque y reposición

- Al comenzar, el marcador está en 0–0, las paletas están centradas verticalmente y la pelota está inmóvil en el centro.
- Una cuenta regresiva de 3 segundos precede a cada saque. Durante ella las paletas pueden moverse, pero la pelota no.
- El primer saque se dirige hacia el jugador 2; los saques posteriores se dirigen hacia quien recibió el punto en contra.
- El componente vertical del saque alterna arriba y abajo entre saques, empezando hacia arriba. Cada nueva partida reinicia esta secuencia.
- Después de cada punto no definitivo, ambas paletas y la pelota vuelven a sus posiciones iniciales; la pelota recupera su velocidad inicial.

### Puntuación

- Si la pelota cruza completamente el lateral izquierdo, el jugador 2 suma un punto.
- Si cruza completamente el lateral derecho, el jugador 1 suma un punto.
- Cada salida concede exactamente un punto e interrumpe el intercambio inmediatamente.
- Los rebotes en paletas, techo o suelo no dan puntos.

### Victoria y derrota

- Gana quien alcanza primero **3 puntos**: son válidos los resultados 3–0, 3–1 y 3–2, o sus equivalentes a favor del jugador 2.
- No se exige ganar por dos puntos ni hay prórroga, empate o límite de tiempo.
- Al otorgar el tercer punto, termina la partida sin iniciar otro saque. La pelota y las paletas se detienen y se muestra al ganador.

## 7. Estados y flujo de partida

| Estado | Comportamiento y salida |
| --- | --- |
| Inicio | Muestra título, controles y «Espacio para jugar». Espacio inicia una partida en 0–0. |
| Preparación de saque | Muestra cuenta regresiva, mantiene inmóvil la pelota y permite mover las paletas. Al finalizar comienza el intercambio. |
| Intercambio | Movimiento, colisiones y detección de gol activos. Un gol lleva a otro saque o al resultado final. |
| Pausa | Congela pelota, paletas y cuenta regresiva. P reanuda exactamente el estado anterior. |
| Resultado | Muestra marcador final, ganador y «Espacio para revancha». Espacio reinicia puntajes, posiciones, velocidad y secuencia de saque. |

Si la ventana pierde el foco durante la preparación o el intercambio, el juego se pausa automáticamente y limpia las teclas retenidas. Recuperar el foco no lo reanuda: se solicita P para evitar movimientos inesperados.

## 8. Arte, interfaz y sonido

- Estética arcade minimalista: fondo negro, paletas y pelota blancas, marcador de alto contraste y línea central tenue.
- Sin texturas complejas, cámara móvil ni efectos que dificulten seguir la pelota.
- El marcador identifica claramente «Jugador 1» y «Jugador 2», además de indicar «Primero a 3».
- La pausa y el resultado se comunican con texto, sin depender únicamente de colores o sonido.
- Sonidos breves y distinguibles para impacto en paleta, rebote en pared, punto y victoria; no condicionan la comprensión de las reglas.
- Sin música como requisito de la primera versión.
- El campo conserva su proporción al adaptar el tamaño de la ventana; se admiten márgenes para evitar deformaciones.

## 9. Primera versión jugable y exclusiones

**Incluido:** campo, dos paletas controlables con un teclado, pelota, rebotes, ángulos de devolución, aceleración limitada, marcador, saques, victoria a 3, pausa, resultado y revancha. La presentación se resuelve con formas geométricas y texto; los sonidos pueden incorporarse después de validar las reglas.

**Fuera de alcance:** modo contra la computadora, multijugador en línea, torneos, habilidades especiales, obstáculos, personalización, niveles, controles táctiles o con mando, cuentas y persistencia de resultados.

No hay progresión entre partidas: cada revancha comienza en igualdad de condiciones.

## 10. Contexto y restricciones técnicas

- Proyecto web existente con Phaser, Vite y JavaScript; conservar su configuración salvo una decisión posterior explícita.
- `package.json` declara Phaser `4.0.0` y Vite `^6.3.1`; aunque la descripción de la plantilla menciona Phaser 3, la implementación deberá comprobar la API de la dependencia instalada.
- Movimiento independiente de la tasa de cuadros y colisiones fiables hasta la velocidad máxima prevista.
- Objetivo de fluidez: 60 FPS en navegador de escritorio moderno; pendiente de medición con una implementación jugable.
- Sin servidor ni servicios externos para las mecánicas del juego.
- Algunos teclados limitan combinaciones simultáneas (ghosting): comprobar W/S junto con las flechas en el equipo utilizado para jugar.

## 11. Criterios de aceptación y validación futura

Estos casos describen pruebas pendientes; su inclusión no implica que hayan sido ejecutadas.

| ID | Prueba | Resultado esperado |
| --- | --- | --- |
| GDD-01 | Iniciar con Espacio | Marcador 0–0 y saque después de la cuenta regresiva. |
| GDD-02 | Mantener W mientras el jugador 2 mantiene flecha abajo; repetir las demás combinaciones entre jugadores | Ambas paletas responden simultáneamente y de forma independiente. |
| GDD-03 | Mantener ambas direcciones de una paleta y luego intentar superar los bordes | La combinación opuesta no la mueve; nunca sale del campo. |
| GDD-04 | Devolver por centro y extremos de ambas paletas | La pelota sale hacia el rival con ángulos coherentes con el contacto. |
| GDD-05 | Provocar rebotes superiores e inferiores y un intercambio largo | Rebotes correctos, aceleración solo por paleta y límite de velocidad respetado. |
| GDD-06 | Dejar salir completamente la pelota por cada lateral | El rival suma exactamente un punto y se prepara el siguiente saque. |
| GDD-07 | Completar partidas con cada jugador ganador, incluyendo 3–2 | La partida termina exactamente al alcanzar 3, sin exigir diferencia ni iniciar otro saque. |
| GDD-08 | Pedir revancha | Puntajes, posiciones, velocidad y secuencia de saque se reinician. |
| GDD-09 | Pausar en intercambio y en cuenta regresiva; cambiar de ventana con una tecla retenida | Todo se congela, no quedan entradas retenidas y P permite continuar sin saltos. |
| GDD-10 | Redimensionar la ventana y usar flechas y Espacio con foco en el juego | Campo sin deformaciones y página sin desplazamiento por esos controles. |

**Evidencia prevista para la implementación:** registrar resultados de estas pruebas, una captura del marcador final y una revisión presencial del control simultáneo. Usar `npm run build-nolog` como comprobación de compilación, sin considerarlo sustituto de las pruebas jugables.

## 12. Decisiones de ajuste posteriores

- Validar velocidad, tamaño de paletas y aceleración mediante partidas de prueba antes de fijar el balance final.
- Confirmar comodidad de los controles y respuesta del teclado del equipo objetivo.
- Decidir si los sonidos se incluyen en la primera entrega o en una iteración posterior.
