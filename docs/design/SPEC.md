# Portafolio v4 · "Mapa de rutas" — especificación de implementación

Implementa este rediseño completo del portafolio (una sola página, `/`) sobre el código actual de este repositorio.
El diseño ya está aprobado: **respétalo**. Las referencias visuales exactas (1440 px de ancho) son:

- `docs/design/v4-claro.png` — tema claro (el principal)
- `docs/design/v4-oscuro.png` — tema oscuro

Ábrelas antes de escribir código y vuelve a ellas al terminar cada sección. Si esta especificación y la imagen
discrepan en un detalle visual, manda la imagen; si discrepan en un texto, manda esta especificación.

## 0. Reglas del trabajo

- Lee `AGENTS.md`: es Next.js 16 con cambios incompatibles; consulta `node_modules/next/dist/docs/` antes de usar una API.
- Stack: Next.js 16 (App Router), React 19, TypeScript estricto, Tailwind CSS 4. Ya están instalados `simple-icons` y
  `lucide-react`; **no agregues más dependencias** (nada de librerías de animación ni de formularios).
- Trabaja solo dentro de este directorio. No hagas commits ni push; deja los cambios en el árbol de trabajo.
- Puedes borrar los componentes viejos que queden sin uso (`EventFlowDiagram`, `ProjectDemoToggle`, `MailtoButton`, etc.).
- Todo el texto visible vive en `src/content/portfolio.ts` (ES y EN). Los componentes no llevan textos incrustados.
- Al terminar deben pasar: `npm run lint`, `npx tsc --noEmit` y `npm run build`.
- Tu mensaje final: lista de archivos tocados, resultado de los tres comandos y cualquier punto donde no pudiste
  seguir el diseño.

## 1. Idea del diseño

El sitio se dibuja como un mapa de líneas de transporte, porque el trabajo de David consiste en mover información de
un punto a otro. Reglas que no se rompen:

- **El color significa categoría**: azul = IA, verde = integración/backend, naranja = datos, tinta = agentes/trayectoria.
- **Las líneas con estaciones solo aparecen en tres lugares**: el mapa del hero, el diagrama de notificaciones y la
  trayectoria. En ningún otro sitio.
- Sin estética de terminal, sin gradientes, sin sombras, sin tarjetas con blur. Superficies planas, filetes finos.
- Nada de círculos con siglas tipo avatar (se quitaron a propósito). El único es el "DA" del logotipo.

## 2. Tokens

### Color (variables CSS en `:root`, redefinidas para `[data-theme="dark"]`)

| Token | Claro | Oscuro | Uso |
|---|---|---|---|
| `--paper` | `#F1F3EF` | `#0B1620` | fondo de página |
| `--surface` | `#FFFFFF` | `#101F2B` | tarjetas de Stack |
| `--station` | `#FFFFFF` | `#0B1620` | relleno de estaciones |
| `--ink` | `#0F1B24` | `#EAF0F2` | texto, filetes fuertes, bordes de estación |
| `--muted` | `#55636E` | `#8FA0AA` | texto secundario |
| `--rule` | `#C5CED2` | `#24343F` | filetes finos, bordes de tarjeta |
| `--off` | `#B4BEC4` | `#3A4B57` | barra "antes", tramo fuera de servicio |
| `--blue` | `#2450E0` | `#6C8CFF` | línea IA |
| `--blue-standby` | `#A9B9F2` | `#2A3B80` | ramal en espera |
| `--green` | `#0C9B6A` | `#2CC38D` | línea integración |
| `--orange` | `#F0760F` | `#FF9438` | línea datos |
| `--red` | `#D92D20` | `#FF5A4D` | proveedor caído (solo estado) |
| `--on-color` | `#FFFFFF` | `#0B1620` | texto y logos sobre bloques de color y sobre `--ink` |
| `--contact-bg` | `#0F1B24` | `#13232F` | bloque de contacto |

El bloque de contacto usa siempre colores "sobre oscuro" en ambos temas: título `#FFFFFF`, texto `#C9D2D6`,
etiquetas y líneas de campo `#8FA0AA`, placeholders `#6F808B`, botón de envío `#2450E0` con texto blanco,
píldora seleccionada blanca con texto `#0F1B24`.

### Tipografía (con `next/font/google`)

- **Display: Barlow Condensed** (pesos 700 y 800). Siempre en mayúsculas en títulos.
- **Texto: Overpass** (400, 600, 700).
- **Datos: Overpass Mono** (400, 600, 700). Solo para fechas, contexto, etiquetas y notas.

| Elemento | Fuente | Peso | Tamaño a 1440 px |
|---|---|---|---|
| Nombre del hero | Barlow Condensed | 800 | 230 px, interlineado 0.9, llena los 1248 px del contenedor |
| "Escríbeme" (contacto) | Barlow Condensed | 800 | 150 px |
| Títulos de sección | Barlow Condensed | 800 | 96 px |
| Cifra de resultado ("< 1 min") | Barlow Condensed | 800 | 76 px |
| Bloques de Stack "Principal" | Barlow Condensed | 800 | 26 px, mayúsculas |
| Título de caso | Overpass | 700 | 30 px |
| Frase del hero | Overpass | 400 | 24 px, interlineado 1.4 |
| Entradilla de sección (derecha) | Overpass | 400 | 18 px, color `--muted` |
| Texto de caso | Overpass | 400 | 16 px, interlineado 1.6 |
| Nombre de estación | Overpass | 700 | 15 px |
| Navegación | Overpass | 600 | 15 px |
| Etiquetas mono | Overpass Mono | 400–700 | 11–13 px, a menudo mayúsculas con tracking 1–1.5 px |

El nombre del hero debe escalar con el ancho (usa `clamp` + unidades `vw`/`cqw`) para ocupar siempre el ancho del
contenedor en una línea en escritorio.

### Retícula

- Contenedor de 1248 px máximo, con 96 px de margen lateral a 1440 px (24 px en móvil).
- Cada sección empieza con un filete de 1.5 px en `--ink` a todo el ancho del contenedor.
- Cabecera de sección: título display a la izquierda; entradilla de 18 px a la derecha, en una columna que empieza
  en x = 800 (ancho 544).
- Casos y cabeceras usan dos columnas: texto de x = 96 a ~680, visual de x = 800 a 1344.

## 3. Estructura de la página (de arriba abajo)

1. Barra de navegación
2. Hero + mapa "Ruta de un CV"
3. Trabajo (3 casos + "Otras contribuciones")
4. Trayectoria
5. Stack
6. Por mi cuenta
7. Contacto (bloque oscuro) + pie

### 3.1 Navegación

- Izquierda: círculo de 36 px relleno `--ink` con "DA" (Barlow Condensed 700, 17 px, `--on-color`). Enlaza a `#top`.
- Centro: Trabajo · Trayectoria · Stack · Contacto (anclas).
- Derecha, en este orden:
  - Píldora con borde de 1.5 px `--ink`, alto 36, radio 18: **"CV ↓"** → descarga `/cv/David_Aguilar_CV.pdf`
    (el archivo ya está en `public/cv/`). **Es el único enlace al CV en toda la página.**
  - Selector de idioma en mono: "ES / EN", el activo en negrita.
  - Botón de tema: círculo de 36 px con borde de 1.5 px y un icono de círculo medio relleno.
- Debajo, filete de 1.5 px `--ink`.
- En móvil: logotipo + CV + tema + idioma visibles; los enlaces de sección en un menú desplegable.

### 3.2 Hero

- Antetítulo mono 13 px `--muted`: `Full Stack & Applied AI Engineer · Ciudad Madero, México`
- Nombre: `DAVID AGUILAR` (un `h1`).
- Debajo, en una fila: a la izquierda la frase (ancho máx. ~940 px); a la derecha un único botón-píldora relleno
  `--ink` con texto `--on-color`, 188×54, radio 27: **"Escríbeme →"** → `#contacto`.
- Frase: `Construyo los sistemas por donde viaja la información de una empresa: APIs, colas y bases de datos. Y pongo IA en el tramo donde ahorra tiempo.`
- No hay más botones ni chips en el hero.

#### Mapa "Ruta de un CV" (la pieza central; componente cliente con SVG en línea)

Cabecera del mapa (una línea, mono 12 px), con filete `--rule` debajo:
- Izquierda: `RUTA DE UN CV` (700, `--blue`, tracking 1.5) + `Registro de candidatos · portal de RRHH Ingenia` (`--muted`)
- Derecha: `de ~3 min a menos de 1 min por alta` (700, `--ink`)

Geometría en un `viewBox="0 0 1248 300"`:
- Línea principal: y = 150, de x = 64 a x = 1184. Trazo 10 px, extremos redondeados, color `--blue`.
- Estaciones sobre la línea principal: **CV** (64), **OCR** (304), **LLM** (544, transbordo), **Campos** (960),
  **Historial** (1184, terminal).
- Entre x = 604 y x = 874 la línea se abre en tres ramales, uno por proveedor, con quiebres a 45°:
  - superior: `M604 150 L684 70 H794 L874 150` → **OpenAI**, estación en (739, 70)
  - central: `M604 150 H874` → **Gemini**, estación en (739, 150)
  - inferior: `M604 150 L684 230 H794 L874 150` → **DeepSeek**, estación en (739, 230)
- Estación normal: círculo r = 12, relleno `--station`, borde 4 px `--ink`. Transbordo/terminal (LLM, Historial):
  r = 17, borde 5 px.
- Estados de un ramal:
  - **en servicio** (por donde pasa el flujo): trazo sólido `--blue` 10 px.
  - **en espera**: trazo sólido `--blue-standby` 10 px; borde de su estación en un azul intermedio.
  - **fuera de servicio**: trazo punteado `--off` (`stroke-dasharray="1 18"`, extremos redondos); estación con borde
    `--red` y una X roja dentro; nombre y subtítulo en `--red`.
- Punto viajero (el CV): círculo r = 9 relleno `--ink`, con un halo r = 20 `--blue` al 18 %.
- Etiquetas (nombre Overpass 700 15 px + subtítulo Overpass Mono 11 px `--muted`), alineadas a la izquierda:
  - CV — `PDF o imagen` (debajo de la estación)
  - OCR — `extrae el texto` (debajo)
  - LLM — `analiza y resume` (arriba a la izquierda de la estación, sin tocar los ramales)
  - OpenAI — `sin créditos` cuando está caída / `en servicio` / `en espera` (encima de su estación)
  - Gemini — igual (encima de su estación, entre el ramal superior y el central)
  - DeepSeek — igual (debajo de su estación)
  - Campos — `validados en backend` (debajo)
  - Historial — `perfil + CV` (debajo)
  - Dentro del trapecio inferior, mono 11 px 700 `--blue`: `desvío automático` (solo cuando el flujo no va por el
    proveedor con mayor prioridad).
- Pie del mapa: filete `--rule` y, en mono 12 px `--muted`: `Toca una estación para apagarla y ver cómo se desvía el flujo.`

Comportamiento:
- Prioridad de proveedores: OpenAI → Gemini → DeepSeek. El flujo usa el primero que esté encendido.
- **Estado inicial: OpenAI apagado** ("sin créditos"), Gemini en servicio, DeepSeek en espera (tal como en la imagen).
- Cada estación de proveedor es un `<button>` (o tiene rol/teclado equivalentes) que alterna encendido/apagado, con
  `aria-pressed` y un nombre accesible claro ("Apagar OpenAI" / "Encender OpenAI").
- Si los tres están apagados: el punto se detiene en LLM y la nota del pie cambia a
  `Sin proveedores disponibles: el alta vuelve a la captura manual.`
- Una región `aria-live="polite"` anuncia el cambio ("OpenAI fuera de servicio. El flujo pasa por Gemini.").

Animación (ver §4): la línea se traza al cargar y el punto recorre la ruta activa en bucle.

En pantallas angostas (< 768 px) el mapa no debe quedar ilegible: dibuja una variante vertical (la línea baja de CV a
Historial, con los tres proveedores lado a lado a media altura) o, como mínimo, un contenedor con scroll horizontal
y un ancho mínimo de 760 px. Se prefiere la variante vertical.

### 3.3 Trabajo

Cabecera: título `TRABAJO`; entradilla `Código privado. De cada sistema cuento qué era, qué hice yo y qué cambió.`

Tres casos, separados por filetes `--rule`. Cada caso (alto ~340 px a 1440):

Columna izquierda:
1. Una línea con: **píldora de categoría** (rellena con el color de la línea, texto `--on-color`, Overpass Mono 700
   11 px en mayúsculas, alto 24, radio 12) + **contexto** en mono 12 px `--muted`, mayúsculas.
2. Título (Overpass 700, 30 px).
3. Párrafo (16 px, ancho ~580).
4. Tecnologías en mono 12 px 600, en el color de la línea, separadas por ` · `.

Columna derecha: un visual propio.

| # | Color | Píldora | Contexto | Título |
|---|---|---|---|---|
| 1 | azul | IA aplicada | Portal de candidatos · RRHH Ingenia · 2025 – hoy | Registro de candidatos con OCR e IA |
| 2 | verde | Integración | Servicio core · ~5 sistemas · RRHH Ingenia | Centro de notificaciones |
| 3 | naranja | Datos | NextGen Technologies · 5–6 empresas · 2022 – 2025 | ERP contable y API multi-tenant |

Párrafos:
1. `El alta de un candidato se capturaba a mano. Diseñé e implementé el flujo que lee el CV, lo resume con un LLM, llena los campos y guarda el documento en el historial. Hoy lo reutilizan todos los módulos que cargan candidatos.`
2. `Cada producto avisaba a sus usuarios por su cuenta. Propuse y diseñé un servicio central: los sistemas publican un evento y el motor decide canal y plantilla, sin duplicar avisos. Cada usuario recibe entre 10 y 40 al día.`
3. `Un ERP con facturación, inventarios y reportes fiscales, más una API REST multi-tenant en Node.js con roles y permisos. Un reporte financiero tardaba unos 5 minutos; lo dejé en 30 segundos.`

Tecnologías:
1. `Laravel · OCR · OpenAI · Gemini · DeepSeek`
2. `Laravel · colas · Reverb · WhatsApp · correo`
3. `Node.js · Express · SQL Server · Laravel`

Visual de los casos 1 y 3 — **barras de antes y después** (ancho de columna 544):
- Etiqueta mono 12 px mayúsculas `--muted` + valor a la derecha (Overpass 700 15 px).
- Barra "antes": 544×20, radio 10, `--off`.
- Etiqueta "ahora"; barra "ahora": 20 de alto, radio 10, color de la línea, ancho proporcional.
- Debajo, la cifra en display 76 px en el color de la línea y una nota mono 12 px `--muted`.

| Caso | Antes | Valor | Ahora | Ancho barra | Cifra | Nota |
|---|---|---|---|---|---|---|
| 1 | `Antes · captura manual` | `~3 min` | `Ahora · CV + IA` | 172 px | `< 1 min` | `por alta de candidato` |
| 3 | `Antes · reporte financiero` | `~5 min` | `Ahora · consulta optimizada` | 54 px | `~30 s` | `10 veces más rápido` |

Visual del caso 2 — **diagrama de abanico** (SVG, `viewBox="0 0 544 220"`, trazo `--green` 7 px, extremos redondos):
- Orígenes en x = 160, y = 35, 85, 135, 185. Cada uno: `M160 y H(250 − |110 − y|) L250 110`.
- Tronco: `M250 110 H370`.
- Salidas: `M370 110 L(370 + |110 − y|) y H450` para los mismos cuatro valores de y.
- Estaciones r = 9, relleno `--station`, borde 3.5 px `--ink`, en cada origen (160, y) y cada salida (450, y).
- "Cola": estación r = 9 en (282, 110). "Motor": estación r = 14, borde 4.5 px, en (340, 110).
- Etiquetas de origen (Overpass 600 13 px, alineadas a la derecha, terminan en x = 142):
  `Portal de candidatos`, `Evaluaciones`, `Verificaciones`, `Soporte`.
- Etiquetas de salida (desde x = 470): `In-app`, `Correo`, `WhatsApp`, `Web push`.
- Bajo el tronco, mono 11 px: `Cola` (`--muted`) y `Motor` (700).
- Nota bajo el diagrama, mono 12 px `--muted`: `4 productos publican eventos · 4 canales de salida`

**Otras contribuciones** — título mono 12 px 700 en mayúsculas; cinco filas de 56 px separadas por filetes `--rule`:
punto de color de 12 px · nombre (Overpass 700 15 px) · resumen (14 px `--muted`, empieza en x = 440) · dato a la
derecha (mono 12 px, alineado al margen derecho).

| Punto | Nombre | Resumen | Dato |
|---|---|---|---|
| verde | Mensajería multi-app (WhatsApp) | Una sola API de chat para cuatro productos, cada uno con sus reglas de acceso. | 4 productos |
| azul | Chat de entrevistas con guardrails | Controles en backend y frontend contra prompt injection y usos fuera del objetivo. | RRHH Ingenia |
| naranja | Sistema para gasolineras 24/7 | Tickets de venta y servidor conectado al hardware de despacho. | de 6 a 8 estaciones |
| naranja | Módulo de acceso y comercial | Paquetes, créditos y precios por empresa, cliente, categoría y producto. | Laravel · PostgreSQL |
| tinta | Citas para radiología (RIS) | Agenda y seguimiento de citas para una clínica de radiología. | DC Prosoft |

### 3.4 Trayectoria

Cabecera: título `TRAYECTORIA`; entradilla `Empecé en soporte, atendiendo a los usuarios. Hoy construyo los sistemas que ellos operan.`

Una línea horizontal de 8 px en `--ink` con cuatro estaciones equidistantes (en la imagen: x = 110, 422, 734, 1046).
Las tres primeras: círculo de 24 px, relleno `--station`, borde 4 px `--ink`. La última ("hoy"): 34 px, relleno
`--blue`, borde 5 px `--ink`. Bajo cada estación, alineado a su borde izquierdo (ancho de columna ~272):
periodo (mono 12 px `--muted`) · puesto (Overpass 700 18 px) · empresa (mono 12 px 600 `--blue`) · descripción (14 px `--muted`).

| Periodo | Puesto | Empresa | Descripción |
|---|---|---|---|
| 03/2019 – 01/2021 | Soporte técnico | DC Prosoft | Soporte funcional, seguimiento de incidencias y capacitación a clientes. |
| 01/2021 – 04/2022 | Desarrollador Junior | DC Prosoft | Sistema de citas para radiología (RIS) y plataforma de certificación educativa con JSF. |
| 05/2022 – 05/2025 | Desarrollador | NextGen Technologies | ERP contable, API multi-tenant, sistema para gasolineras y optimización de reportes SQL. |
| 11/2025 – hoy | Desarrollador Full Stack e IA aplicada | RRHH Ingenia | IA aplicada al registro de candidatos, orquestación multi-modelo y centro de notificaciones. |

Márcalo como lista ordenada (`<ol>`). En móvil la línea pasa a vertical, a la izquierda.

### 3.5 Stack

Cabecera: título `STACK`; entradilla `Lo que uso a diario va en grande; lo que también manejo, en chico.`

Cuadrícula tipo bento de cuatro tarjetas (24 px de separación), **sin líneas ni estaciones**:

- Fila 1: **Backend** (720 px de ancho) | **IA en el producto** (504 px)
- Fila 2: **Datos** (504 px) | **Desarrollo con agentes** (720 px)

Tarjeta: fondo `--surface`, borde 1.5 px `--rule`, radio 10, alto ~324, relleno interior 24.
1. Cabecera: icono de Lucide de 24 px con trazo 2 en el color de la categoría + nombre (Overpass 700 19 px).
2. Etiqueta mono 10 px mayúsculas `--muted`: `Principal`.
3. Bloques: rectángulos de 52 px de alto, radio 6, rellenos con el color de la categoría; dentro, el **logo oficial
   en un solo color** (`--on-color`, 22 px) y el nombre en Barlow Condensed 800 26 px mayúsculas (`--on-color`).
   Relleno horizontal 14, separación logo–texto 8, separación entre bloques 10.
4. Etiqueta `También`.
5. Píldoras de contorno: alto 32, radio 16, borde 1.5 px `--ink`, Overpass 600 13 px. Se acomodan en varias filas si no caben.
6. Filete `--rule` y una línea mono 11 px `--muted` con los proyectos.

| Tarjeta | Color | Icono Lucide | Principal (logo) | También | Pie |
|---|---|---|---|---|---|
| Backend | verde | `Server` | Laravel (`siLaravel`), PHP (`siPhp`), Node.js (`siNodedotjs`), Express (`siExpress`) | APIs REST, Colas, Redis, Laravel Reverb, Java, Python | En: centro de notificaciones · portal de candidatos · API multi-tenant |
| IA en el producto | azul | `Cpu` | OpenAI (ver nota), Gemini (`siGooglegemini`), DeepSeek (`siDeepseek`) | OCR, Extracción estructurada, Guardrails, Tool calling | En: registro de candidatos · chat de entrevistas |
| Datos | naranja | `Database` | SQL Server (sin logo, solo texto), PostgreSQL (`siPostgresql`) | MySQL, Modelado relacional, Optimización de consultas, Triggers | En: ERP contable · módulo comercial · reportes SQL |
| Desarrollo con agentes | tinta (`--ink`) | `SquareTerminal` | Claude Code (`siClaude`), Codex (logo de OpenAI), MCP (`siModelcontextprotocol`) | Gemini CLI, Context7, Skills propias, Coordinación de agentes | En: skills de Git y PRs · conector MCP para Penpot |

Nota sobre logos: usa las rutas (`.path`) de `simple-icons` en un `<svg viewBox="0 0 24 24">` con `fill="currentColor"`.
`simple-icons` ya no trae OpenAI ni SQL Server: para OpenAI toma el trazo de `docs/design/openai.svg` y guárdalo como
constante en el código; SQL Server va sin logo. Cada logo lleva `aria-hidden` (el nombre ya está en texto).

Franja inferior (tras un filete `--rule`), en una fila:
`Interfaz` (Overpass 700 15 px) `React · Blade · JavaScript` (14 px `--muted`) — y a la derecha (x = 720)
`Herramientas` `Docker · Git · Postman · Jira · Monday.com`.

En móvil: tarjetas a una columna.

### 3.6 Por mi cuenta

Cabecera: solo el título `POR MI CUENTA` (sin entradilla).

Tres columnas sin tarjeta: etiqueta mono 12 px mayúsculas `--muted` · nombre (Overpass 700 24 px) · resumen
(15 px `--muted`) · tecnologías (mono 12 px) · enlace (Overpass 700 15 px con flecha →).

| Etiqueta | Nombre | Resumen | Tecnologías | Enlace |
|---|---|---|---|---|
| En desarrollo | NetMonitor | App de escritorio para monitorear la red. | Tauri v2 · Rust · React | (sin URL todavía) |
| Demo | MEDICS-DEM | Landing de una empresa ficticia de equipo médico, con una secuencia ligada al scroll. | Astro · TypeScript · Tailwind | (sin URL todavía) |
| Personal | Este portafolio | Sitio bilingüe con tema claro y oscuro. | Next.js · React · TypeScript | `Ver código →` https://github.com/davidag29/portafolio-david |

El enlace es un campo opcional en el contenido: **si no hay URL, no se dibuja el enlace** (no inventes direcciones).

### 3.7 Contacto

Bloque a todo el ancho de la ventana, fondo `--contact-bg`, con el contenido en el contenedor de 1248 px.

Izquierda:
- Título display `ESCRÍBEME` (150 px, blanco).
- Texto 18 px `#C9D2D6`: `Una vacante, un proyecto o una duda. Respondo en 24 a 48 horas.`
- Enlaces en Overpass 700 16 px blanco: `GitHub ↗` (https://github.com/davidag29) y
  `LinkedIn ↗` (https://www.linkedin.com/in/davidaguilar-rdz).

**El correo de David no aparece en ningún lugar de la página ni del HTML.**

Derecha (ancho 584) — formulario:
- `Nombre` y `Correo` lado a lado: etiqueta mono 11 px mayúsculas, campo sin caja, solo línea inferior de 1.5 px.
  Placeholders: `Tu nombre`, `tu@correo.com`.
- `Motivo`: tres píldoras tipo radio — `Vacante` (seleccionada por defecto), `Proyecto`, `Otro`.
  Seleccionada: fondo blanco, texto `#0F1B24`. Las demás: borde 1.5 px `#8FA0AA`, texto blanco.
- `Mensaje`: área de texto con borde 1.5 px `#8FA0AA`, radio 6, alto ~96. Placeholder `Cuéntame qué necesitas y para cuándo.`
- Botón píldora `--blue` fijo `#2450E0`, 204×52, radio 26, texto blanco 700 16 px: `Enviar mensaje →`.
  A su derecha, mono 12 px: `Tu correo solo se usa para responderte.`

Comportamiento del formulario:
- Etiquetas `<label>` reales, `required`, validación nativa + validación en servidor.
- Campo trampa oculto (honeypot) contra bots.
- Estados del botón: `Enviar mensaje →` → `Enviando…` (deshabilitado) → al éxito el formulario se sustituye por
  `Mensaje enviado. Te respondo en 24 a 48 horas.`
- Errores, sin disculpas y diciendo qué hacer: `No se pudo enviar. Inténtalo de nuevo o escríbeme por LinkedIn.`
- Envío a un Route Handler `POST /api/contact` que:
  - valida nombre (1–100), correo (formato), motivo (uno de los tres), mensaje (10–4000) y rechaza si el honeypot viene lleno;
  - si existen `RESEND_API_KEY` y `CONTACT_TO_EMAIL`, envía el correo con la API HTTP de Resend usando `fetch`
    (sin SDK), con `reply_to` = correo del remitente y remitente `CONTACT_FROM_EMAIL` (por defecto `onboarding@resend.dev`);
  - si faltan las variables, responde 503 `{ "error": "not_configured" }` y la interfaz muestra
    `El formulario aún no está activo. Escríbeme por LinkedIn.` — **nunca finjas un envío exitoso**.
- Añade `.env.example` con las tres variables y una sección corta en el README.

Pie, dentro del mismo bloque: mono 12 px `#8FA0AA`: `David Aguilar · 2026`.

## 4. Animación (solo CSS + JS propio; respeta `prefers-reduced-motion`)

1. **Hero, al cargar**: la línea principal se traza de izquierda a derecha (~1.2 s, `stroke-dashoffset`) y las
   estaciones aparecen una tras otra conforme la línea las alcanza.
2. **Punto viajero**: recorre en bucle lento (~7 s por vuelta, pausa breve al final) la ruta activa
   CV → OCR → LLM → proveedor → Campos → Historial. Al apagar/encender un proveedor, el tramo cambia de estado con
   una transición corta y el punto toma la nueva ruta en la siguiente pasada.
3. **Barras de antes/después**: al entrar en pantalla crecen desde cero, primero la gris y luego la de color.
4. **Diagrama de notificaciones**: al entrar en pantalla las líneas se trazan de los orígenes al motor y del motor a
   los canales.
5. **Trayectoria**: la línea avanza estación por estación; la última queda con un pulso suave.
6. **Stack**: las tarjetas entran con un desplazamiento vertical corto y escalonado (sin rebotes).
7. **Detalles**: en "Otras contribuciones", al pasar el cursor el punto de color se estira a una barra corta; el
   cambio de tema hace una transición de color breve.

Usa un único `IntersectionObserver` reutilizable para lo que se dispara al entrar en pantalla. Con
`prefers-reduced-motion: reduce`: todo aparece ya dibujado, sin bucle ni pulso. Nada más se anima.

## 5. Tema e idioma

- Tema: claro u oscuro con `data-theme` en `<html>`. Primera visita: sigue `prefers-color-scheme`. La elección se guarda
  en `localStorage` y se aplica antes de pintar (script en línea) para que no haya parpadeo.
- Idioma: ES por defecto, EN alternativo; se guarda igual. Actualiza `lang` en `<html>`.
- Traduce todo el contenido al inglés de forma fiel y natural (no literal), conservando cifras y nombres propios.
  Títulos display en inglés: `WORK`, `CAREER`, `STACK`, `ON MY OWN`, `WRITE TO ME`. Navegación: Work · Career · Stack · Contact.

## 6. Calidad mínima

- Responsive hasta 360 px sin scroll horizontal de página. En móvil el nombre puede partirse en dos líneas
  (`DAVID` / `AGUILAR`), los casos pasan a una columna (texto arriba, visual abajo) y el formulario a una columna.
- HTML semántico: un solo `h1`, `h2` por sección, `nav`, `main`, `footer`; enlace "saltar al contenido".
- Foco de teclado visible en todos los controles (incluidas las estaciones del mapa).
- Contraste AA en ambos temas.
- Metadatos: título `David Aguilar | Full Stack & Applied AI Engineer`; descripción acorde al hero; conserva el
  favicon actual (`src/app/icon.svg`).
- Sin errores ni avisos en la consola del navegador.

## 7. Criterios de aceptación

1. A 1440 px, cada sección coincide con `v4-claro.png` en estructura, proporciones, tipografías, colores y textos.
2. Al cambiar de tema coincide con `v4-oscuro.png`.
3. El mapa del hero responde al clic y al teclado según §3.2 y anima según §4.
4. El formulario valida, muestra sus estados y responde 503 sin las variables de entorno.
5. El correo de David no aparece en el HTML generado.
6. `npm run lint`, `npx tsc --noEmit` y `npm run build` terminan sin errores.
