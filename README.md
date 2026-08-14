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

- Email: [daglr029@gmail.com](mailto:daglr029@gmail.com)
- GitHub: [github.com/davidag29](https://github.com/davidag29)
- LinkedIn: [linkedin.com/in/davidaguilar-rdz](https://www.linkedin.com/in/davidaguilar-rdz)
