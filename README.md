# David Aguilar — Portfolio

Portafolio personal construido con Next.js. Presenta proyectos destacados, stack técnico y datos de contacto, con soporte bilingüe (ES/EN).

🔗 **Live demo:** _agrega aquí la URL de Vercel una vez desplegado_

## Stack

- [Next.js](https://nextjs.org) 16 (App Router, Turbopack)
- [React](https://react.dev) 19
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com) 4

## Estructura

```
src/
├── app/                  # Rutas, layout y estilos globales
├── components/           # Hero, Navbar, ProjectShowcase, StackSection, ContactSection...
└── content/portfolio.ts  # Contenido del portafolio (copy ES/EN, proyectos, links)
```

Todo el texto visible (proyectos, bio, links de contacto) vive en [`src/content/portfolio.ts`](src/content/portfolio.ts), separado de los componentes visuales — para actualizar el contenido no hace falta tocar el diseño.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando         | Descripción                        |
| --------------- | ----------------------------------- |
| `npm run dev`   | Servidor de desarrollo               |
| `npm run build` | Build de producción                  |
| `npm run start` | Sirve el build de producción         |
| `npm run lint`  | Linter (ESLint)                      |

## Deploy

Desplegado en [Vercel](https://vercel.com). Cada push a `main` dispara un nuevo deploy automáticamente.

## Contacto

[![GitHub](https://img.shields.io/badge/GitHub-davidag29-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/davidag29)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-davidaguilar--rdz-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/davidaguilar-rdz)

## Formulario de contacto

Copia `.env.example` a `.env.local` y configura `RESEND_API_KEY`, `CONTACT_TO_EMAIL`
y, opcionalmente, `CONTACT_FROM_EMAIL` (por defecto `onboarding@resend.dev`). En producción,
usa un remitente de un dominio verificado en Resend y configura las mismas variables en el hosting.
El formulario envía a `POST /api/contact`, valida los campos en el servidor y utiliza la API HTTP de Resend.
El destinatario permanece en el servidor. Sin clave o destinatario, la ruta devuelve 503
`not_configured` y ofrece el enlace de LinkedIn; nunca muestra un envío exitoso ficticio.

Los textos ES/EN se editan en `src/content/portfolio.ts`. El tema sigue la preferencia del sistema
hasta que se elige uno; tema e idioma se guardan en el navegador. Las animaciones respetan
`prefers-reduced-motion`.

Para comprobar la validación y la integración de correo sin realizar envíos reales:

```bash
node --test tests/contact.test.mjs
```
