export type Locale = "es" | "en";

export type Project = {
  id: string;
  name: string;
  problem: string;
  solution: string;
  stack: string[];
  demoLabel: string;
};

type PortfolioCopy = {
  nav: {
    projects: string;
    stack: string;
    experience: string;
    contact: string;
  };
  availability: string;
  hero: {
    eyebrow: string;
    name: string;
    role: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
    location: string;
  };
  codeColumns: {
    title: string;
    lines: string[];
  }[];
  projects: {
    kicker: string;
    title: string;
    allLabel: string;
    problemLabel: string;
    solutionLabel: string;
    items: Project[];
  };
  stack: {
    title: string;
    body: string;
    groups: { label: string; items: string[] }[];
  };
  contact: {
    kicker: string;
    title: string;
    body: string;
    response: string;
    links: { label: string; value: string; href: string }[];
    cta: string;
  };
};

export const portfolioCopy: Record<Locale, PortfolioCopy> = {
  es: {
    nav: {
      projects: "Proyectos",
      stack: "Stack",
      experience: "Experiencia",
      contact: "Contacto",
    },
    availability: "Disponible para nuevos proyectos",
    hero: {
      eyebrow: "const developer = 'builder'",
      name: "David Aguilar",
      role: "Desarrollador Full Stack",
      body: "Construyo productos web rapidos, mantenibles y enfocados en resolver problemas reales.",
      primaryCta: "Ver proyectos",
      secondaryCta: "Hablemos",
      location: "CDMX, Mexico | UTC-6",
    },
    codeColumns: [
      {
        title: "~/repos/portfolio",
        lines: ["src/", "app/", "page.tsx", "components/", "content/", "README.md"],
      },
      {
        title: "~/deploy.log",
        lines: [
          "12:01 iniciando build",
          "12:02 generando estaticos",
          "12:03 lint ok",
          "12:04 deploy exitoso",
        ],
      },
      {
        title: "~/api/endpoints",
        lines: ["GET /api/health", "GET /api/projects", "POST /api/contact", "GET /api/stack"],
      },
      {
        title: "~/git/commits",
        lines: ["feat: nuevo proyecto", "refactor: rutas api", "chore: performance", "docs: actualiza readme"],
      },
    ],
    projects: {
      kicker: "Proyectos destacados",
      title: "Trabajo que se entiende por el problema que resuelve.",
      allLabel: "Ver todos",
      problemLabel: "Problema",
      solutionLabel: "Solucion",
      items: [
        {
          id: "01",
          name: "FinTrack",
          problem: "Control financiero disperso para freelancers.",
          solution: "Dashboard de ingresos, egresos y reportes accionables.",
          stack: ["Next.js", "PostgreSQL", "Tailwind"],
          demoLabel: "Ver demo",
        },
        {
          id: "02",
          name: "Shiply",
          problem: "Gestion manual de envios para e-commerce.",
          solution: "Flujo operativo con estados, alertas y trazabilidad.",
          stack: ["React", "Prisma", "Redis"],
          demoLabel: "Ver demo",
        },
        {
          id: "03",
          name: "Panelly",
          problem: "Metricas sin contexto para equipos pequenos.",
          solution: "Panel de analiticas con filtros y vistas por rol.",
          stack: ["Node.js", "Socket.io", "ClickHouse"],
          demoLabel: "Ver demo",
        },
      ],
    },
    stack: {
      title: "Stack base",
      body: "Base preparada para cambiar contenido sin tocar el sistema visual.",
      groups: [
        { label: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
        { label: "Backend", items: ["Node.js", "APIs REST", "PostgreSQL", "Prisma"] },
        { label: "Deploy", items: ["Vercel", "GitHub Actions", "Observabilidad"] },
      ],
    },
    contact: {
      kicker: "Contacto",
      title: "Si tienes una idea, un producto o una vacante, podemos hablar.",
      body: "Cuéntame qué quieres construir, qué problema estás resolviendo y en qué etapa va el proyecto. Respondo mejor cuando el mensaje incluye contexto, objetivo y tiempos.",
      response: "Respuesta estimada: 24-48h",
      cta: "Enviar correo",
      links: [
        {
          label: "Email",
          value: "daglr029@gmail.com",
          href: "mailto:daglr029@gmail.com",
        },
        {
          label: "GitHub",
          value: "github.com/davidag29",
          href: "https://github.com/davidag29",
        },
        {
          label: "LinkedIn",
          value: "linkedin.com/in/davidaguilar-rdz",
          href: "https://www.linkedin.com/in/davidaguilar-rdz",
        },
      ],
    },
  },
  en: {
    nav: {
      projects: "Projects",
      stack: "Stack",
      experience: "Experience",
      contact: "Contact",
    },
    availability: "Available for new projects",
    hero: {
      eyebrow: "const developer = 'builder'",
      name: "David Aguilar",
      role: "Full Stack Developer",
      body: "I build fast, maintainable web products focused on solving real user problems.",
      primaryCta: "View projects",
      secondaryCta: "Contact",
      location: "Mexico City, Mexico | UTC-6",
    },
    codeColumns: [
      {
        title: "~/repos/portfolio",
        lines: ["src/", "app/", "page.tsx", "components/", "content/", "README.md"],
      },
      {
        title: "~/deploy.log",
        lines: ["12:01 starting build", "12:02 generating static pages", "12:03 lint ok", "12:04 deploy ready"],
      },
      {
        title: "~/api/endpoints",
        lines: ["GET /api/health", "GET /api/projects", "POST /api/contact", "GET /api/stack"],
      },
      {
        title: "~/git/commits",
        lines: ["feat: new project", "refactor: api routes", "chore: performance", "docs: update readme"],
      },
    ],
    projects: {
      kicker: "Featured work",
      title: "Work explained by the problem it solves.",
      allLabel: "View all",
      problemLabel: "Problem",
      solutionLabel: "Solution",
      items: [
        {
          id: "01",
          name: "FinTrack",
          problem: "Scattered financial control for freelancers.",
          solution: "Income, expense, and reporting dashboard.",
          stack: ["Next.js", "PostgreSQL", "Tailwind"],
          demoLabel: "View demo",
        },
        {
          id: "02",
          name: "Shiply",
          problem: "Manual shipping operations for e-commerce.",
          solution: "Operational workflow with status, alerts, and traceability.",
          stack: ["React", "Prisma", "Redis"],
          demoLabel: "View demo",
        },
        {
          id: "03",
          name: "Panelly",
          problem: "Metrics without context for small teams.",
          solution: "Analytics panel with filters and role-based views.",
          stack: ["Node.js", "Socket.io", "ClickHouse"],
          demoLabel: "View demo",
        },
      ],
    },
    stack: {
      title: "Core stack",
      body: "A base prepared to swap content without touching the visual system.",
      groups: [
        { label: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
        { label: "Backend", items: ["Node.js", "REST APIs", "PostgreSQL", "Prisma"] },
        { label: "Deploy", items: ["Vercel", "GitHub Actions", "Observability"] },
      ],
    },
    contact: {
      kicker: "Contact",
      title: "If you have an idea, a product, or an open role, we can talk.",
      body: "Tell me what you want to build, what problem you are solving, and where the project stands. I respond best when the message includes context, goals, and timing.",
      response: "Estimated response: 24-48h",
      cta: "Send email",
      links: [
        {
          label: "Email",
          value: "daglr029@gmail.com",
          href: "mailto:daglr029@gmail.com",
        },
        {
          label: "GitHub",
          value: "github.com/davidag29",
          href: "https://github.com/davidag29",
        },
        {
          label: "LinkedIn",
          value: "linkedin.com/in/davidaguilar-rdz",
          href: "https://www.linkedin.com/in/davidaguilar-rdz",
        },
      ],
    },
  },
};
