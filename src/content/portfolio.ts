export type Locale = "es" | "en";

export type Project = {
  id: string;
  name: string;
  problem: string;
  solution: string;
  stack: string[];
  demoLabel: string;
};

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  highlight: string;
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
  experience: {
    kicker: string;
    title: string;
    items: ExperienceItem[];
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
      role: "Full Stack · Laravel/Node.js · IA aplicada",
      body: "5+ anos construyendo aplicaciones web, APIs y sistemas empresariales con PHP/Laravel y Node.js. Aplico IA (MCP, agentes, OCR) bajo reglas de arquitectura, seguridad y calidad, no como moda.",
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
          name: "Sistema de notificaciones end-to-end",
          problem: "Cada producto del ecosistema (LISET, MIRA, EVIA, AURA, Servicios de Apoyo) necesitaba notificar a usuarios sin duplicar logica.",
          solution: "Disene el sistema de notificaciones de Core desde cero (catalogo de eventos, colas de trabajo, deduplicacion idempotente, tiempo real via websockets, blacklist) y lo integre de forma transversal en los 5 productos.",
          stack: ["Laravel", "WebSockets", "Colas de trabajo"],
          demoLabel: "Detalles",
        },
        {
          id: "02",
          name: "Mensajeria multi-app (WhatsApp)",
          problem: "Cada producto necesitaba su propio chat con clientes/candidatos, duplicando esfuerzo de desarrollo.",
          solution: "Generalice el chat de Servicios de Apoyo en una arquitectura de mensajeria reutilizable, con bandeja unificada de contactos, adjuntos (audio, imagenes, archivos), y la integre en MIRA y LISET.",
          stack: ["Laravel", "React", "WebSockets"],
          demoLabel: "Detalles",
        },
        {
          id: "03",
          name: "Auth con OCR e IA (LISET-MIRA)",
          problem: "El registro manual de candidatos en el portal era lento y propenso a errores de captura.",
          solution: "Construi el login/registro del portal de candidatos con recuperacion de contrasena y registro semi-automatico: el CV se procesa con OCR via IA para prellenar los datos.",
          stack: ["Laravel", "OpenAI", "OCR"],
          demoLabel: "Detalles",
        },
      ],
    },
    stack: {
      title: "Stack base",
      body: "Base preparada para cambiar contenido sin tocar el sistema visual.",
      groups: [
        { label: "Backend", items: ["PHP", "Laravel", "Blade", "Node.js", "Express", "PostgreSQL", "MySQL", "SQL Server"] },
        { label: "Arquitectura", items: ["APIs REST", "Microservicios", "Multi-tenant", "Colas de trabajo", "Tiempo real", "Redis", "Docker"] },
        { label: "IA & Agentes", items: ["OpenAI", "DeepSeek", "MCP", "Sistemas multiagente", "OCR", "Ingenieria asistida por IA"] },
      ],
    },
    experience: {
      kicker: "Experiencia",
      title: "Trayectoria en desarrollo Full Stack y sistemas empresariales.",
      items: [
        {
          role: "Desarrollador Full Stack",
          company: "RRHH Ingenia",
          period: "11/2025 - Actualidad",
          highlight: "Dueno de facto del sistema de notificaciones end-to-end de Core (colas, tiempo real, deduplicacion) integrado en 5 productos; generalice la mensajeria multi-app y desarrolle el modulo de acceso/comercial (paquetes, creditos, precios).",
        },
        {
          role: "Desarrollador",
          company: "NextGen Technologies",
          period: "05/2022 - 05/2025",
          highlight: "ERP contable con API RESTful multi-tenant en Node.js/Express; sistema de gestion para gasolinera con facturacion automatica.",
        },
        {
          role: "Desarrollador Junior",
          company: "DC Prosoft S.A. de C.V.",
          period: "01/2021 - 04/2022",
          highlight: "Sistema de certificacion educativa con JSF y sistema de gestion de citas para clinica de radiologia (RIS).",
        },
        {
          role: "Soporte tecnico",
          company: "DC Prosoft S.A. de C.V.",
          period: "03/2019 - 01/2021",
          highlight: "Atencion a usuarios, capacitacion funcional y seguimiento de incidencias operativas.",
        },
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
      role: "Full Stack · Laravel/Node.js · Applied AI",
      body: "5+ years building web applications, APIs, and enterprise systems with PHP/Laravel and Node.js. I apply AI (MCP, agents, OCR) under architecture, security, and quality rules, not as a trend.",
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
          name: "End-to-end notification system",
          problem: "Every product in the ecosystem (LISET, MIRA, EVIA, AURA, Support Services) needed to notify users without duplicating logic.",
          solution: "Designed Core's notification system from scratch (event catalog, job queues, idempotent deduplication, real-time via websockets, blacklist) and integrated it transversally across 5 products.",
          stack: ["Laravel", "WebSockets", "Job queues"],
          demoLabel: "Details",
        },
        {
          id: "02",
          name: "Multi-app messaging (WhatsApp)",
          problem: "Each product needed its own chat with clients/candidates, duplicating development effort.",
          solution: "Generalized the Support Services chat into a reusable multi-messaging architecture, with a unified contact inbox, attachments (audio, images, files), and integrated it into MIRA and LISET.",
          stack: ["Laravel", "React", "WebSockets"],
          demoLabel: "Details",
        },
        {
          id: "03",
          name: "Auth with OCR & AI (LISET-MIRA)",
          problem: "Manual candidate registration on the portal was slow and error-prone.",
          solution: "Built the candidate portal's login/registration with password recovery and semi-automatic registration: the resume is processed with AI-powered OCR to pre-fill the form.",
          stack: ["Laravel", "OpenAI", "OCR"],
          demoLabel: "Details",
        },
      ],
    },
    stack: {
      title: "Core stack",
      body: "A base prepared to swap content without touching the visual system.",
      groups: [
        { label: "Backend", items: ["PHP", "Laravel", "Blade", "Node.js", "Express", "PostgreSQL", "MySQL", "SQL Server"] },
        { label: "Architecture", items: ["REST APIs", "Microservices", "Multi-tenant", "Job queues", "Real-time", "Redis", "Docker"] },
        { label: "AI & Agents", items: ["OpenAI", "DeepSeek", "MCP", "Multi-agent systems", "OCR", "AI-assisted engineering"] },
      ],
    },
    experience: {
      kicker: "Experience",
      title: "Track record in Full Stack development and enterprise systems.",
      items: [
        {
          role: "Full Stack Developer",
          company: "RRHH Ingenia",
          period: "11/2025 - Present",
          highlight: "De facto owner of Core's end-to-end notification system (queues, real-time, deduplication) integrated across 5 products; generalized the multi-app messaging layer and built the access/commercial module (packages, credits, pricing).",
        },
        {
          role: "Developer",
          company: "NextGen Technologies",
          period: "05/2022 - 05/2025",
          highlight: "Accounting ERP with multi-tenant RESTful API in Node.js/Express; gas station management system with automated invoicing.",
        },
        {
          role: "Junior Developer",
          company: "DC Prosoft S.A. de C.V.",
          period: "01/2021 - 04/2022",
          highlight: "Educational certification system with JSF and appointment management system for a radiology clinic (RIS).",
        },
        {
          role: "Technical Support",
          company: "DC Prosoft S.A. de C.V.",
          period: "03/2019 - 01/2021",
          highlight: "User support, functional training, and follow-up on operational incidents.",
        },
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
