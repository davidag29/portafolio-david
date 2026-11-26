export type Locale = "es" | "en";
export type Category = "blue" | "green" | "orange" | "ink";
export type WorkCase = {
  color: Category;
  tag: string;
  context: string;
  title: string;
  body: string;
  tech: string;
  metric?: {
    before: string;
    value: string;
    after: string;
    ratio: number;
    result: string;
    note: string;
  };
};
export type StackGroup = {
  color: Category;
  title: string;
  primary: { name: string; logo?: string }[];
  secondary: string[];
  foot: string;
};
export type Copy = {
  meta: { title: string; description: string };
  ui: {
    skip: string;
    logo: string;
    home: string;
    cv: string;
    menu: string;
    theme: string;
    language: string;
    locales: string[];
    separator: string;
  };
  nav: { id: string; label: string }[];
  hero: { eyebrow: string; name: string; body: string; cta: string };
  map: {
    title: string;
    context: string;
    result: string;
    label: string;
    hint: string;
    unavailable: string;
    diverted: string;
    on: string;
    standby: string;
    off: string;
    enable: string;
    disable: string;
    announcement: string;
    flowing: string;
    providers: string[];
    stations: { name: string; note: string }[];
  };
  work: {
    title: string;
    intro: string;
    cases: WorkCase[];
    other: string;
    contributions: { color: Category; name: string; summary: string; detail: string }[];
    diagram: {
      label: string;
      sources: string[];
      channels: string[];
      queue: string;
      engine: string;
      note: string;
    };
  };
  career: {
    title: string;
    intro: string;
    items: { period: string; role: string; company: string; body: string }[];
  };
  stack: {
    title: string;
    intro: string;
    primary: string;
    secondary: string;
    groups: StackGroup[];
    strip: { title: string; body: string }[];
  };
  personal: {
    title: string;
    items: {
      tag: string;
      name: string;
      body: string;
      tech: string;
      link?: { label: string; href: string };
    }[];
  };
  contact: {
    title: string;
    body: string;
    links: { label: string; href: string }[];
    name: string;
    email: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    reason: string;
    reasons: { value: string; label: string }[];
    message: string;
    placeholder: string;
    honeypot: string;
    submit: string;
    sending: string;
    privacy: string;
    success: string;
    error: string;
    notConfigured: string;
    footer: string;
  };
};
const primary = {
  backend: [
    { name: "Laravel", logo: "laravel" },
    { name: "PHP", logo: "php" },
    { name: "Node.js", logo: "node" },
    { name: "Express", logo: "express" },
  ],
  ai: [
    { name: "OpenAI", logo: "openai" },
    { name: "Gemini", logo: "gemini" },
    { name: "DeepSeek", logo: "deepseek" },
  ],
  data: [{ name: "SQL Server" }, { name: "PostgreSQL", logo: "postgresql" }],
  agents: [
    { name: "Claude Code", logo: "claude" },
    { name: "Codex", logo: "openai" },
    { name: "MCP", logo: "mcp" },
  ],
};
const links = [
  { label: "GitHub ↗", href: "https://github.com/davidag29" },
  { label: "LinkedIn ↗", href: "https://www.linkedin.com/in/davidaguilar-rdz" },
];
export const portfolioCopy: Record<Locale, Copy> = {
  es: {
    meta: {
      title: "David Aguilar | Full Stack & Applied AI Engineer",
      description:
        "Construyo los sistemas por donde viaja la información de una empresa: APIs, colas y bases de datos. Y pongo IA en el tramo donde ahorra tiempo.",
    },
    ui: {
      skip: "Saltar al contenido",
      logo: "DA",
      home: "Volver al inicio",
      cv: "CV ↓",
      menu: "Menú de navegación",
      theme: "Cambiar tema claro u oscuro",
      language: "Idioma",
      locales: ["ES", "EN"],
      separator: "/",
    },
    nav: [
      { id: "trabajo", label: "Trabajo" },
      { id: "trayectoria", label: "Trayectoria" },
      { id: "stack", label: "Stack" },
      { id: "contacto", label: "Contacto" },
    ],
    hero: {
      eyebrow: "Full Stack & Applied AI Engineer · Ciudad Madero, México",
      name: "DAVID AGUILAR",
      body: "Construyo los sistemas por donde viaja la información de una empresa: APIs, colas y bases de datos. Y pongo IA en el tramo donde ahorra tiempo.",
      cta: "Escríbeme →",
    },
    map: {
      title: "RUTA DE UN CV",
      context: "Registro de candidatos · portal de RRHH Ingenia",
      result: "de ~3 min a menos de 1 min por alta",
      label: "Ruta de un CV con desvío automático entre proveedores de IA",
      hint: "Toca una estación para apagarla y ver cómo se desvía el flujo.",
      unavailable: "Sin proveedores disponibles: el alta vuelve a la captura manual.",
      diverted: "desvío automático",
      on: "en servicio",
      standby: "en espera",
      off: "sin créditos",
      enable: "Encender",
      disable: "Apagar",
      announcement: "fuera de servicio",
      flowing: "El flujo pasa por",
      providers: ["OpenAI", "Gemini", "DeepSeek"],
      stations: [
        { name: "CV", note: "PDF o imagen" },
        { name: "OCR", note: "extrae el texto" },
        { name: "LLM", note: "analiza y resume" },
        { name: "Campos", note: "validados en backend" },
        { name: "Historial", note: "perfil + CV" },
      ],
    },
    work: {
      title: "TRABAJO",
      intro: "Código privado. De cada sistema cuento qué era, qué hice yo y qué cambió.",
      cases: [
        {
          color: "blue",
          tag: "IA aplicada",
          context: "Portal de candidatos · RRHH Ingenia · 2025 – hoy",
          title: "Registro de candidatos con OCR e IA",
          body: "El alta de un candidato se capturaba a mano. Diseñé e implementé el flujo que lee el CV, lo resume con un LLM, llena los campos y guarda el documento en el historial. Hoy lo reutilizan todos los módulos que cargan candidatos.",
          tech: "Laravel · OCR · OpenAI · Gemini · DeepSeek",
          metric: {
            before: "Antes · captura manual",
            value: "~3 min",
            after: "Ahora · CV + IA",
            ratio: 172 / 544,
            result: "< 1 min",
            note: "por alta de candidato",
          },
        },
        {
          color: "green",
          tag: "Integración",
          context: "Servicio core · ~5 sistemas · RRHH Ingenia",
          title: "Centro de notificaciones",
          body: "Cada producto avisaba a sus usuarios por su cuenta. Propuse y diseñé un servicio central: los sistemas publican un evento y el motor decide canal y plantilla, sin duplicar avisos. Cada usuario recibe entre 10 y 40 al día.",
          tech: "Laravel · colas · Reverb · WhatsApp · correo",
        },
        {
          color: "orange",
          tag: "Datos",
          context: "NextGen Technologies · 5–6 empresas · 2022 – 2025",
          title: "ERP contable y API multi-tenant",
          body: "Un ERP con facturación, inventarios y reportes fiscales, más una API REST multi-tenant en Node.js con roles y permisos. Un reporte financiero tardaba unos 5 minutos; lo dejé en 30 segundos.",
          tech: "Node.js · Express · SQL Server · Laravel",
          metric: {
            before: "Antes · reporte financiero",
            value: "~5 min",
            after: "Ahora · consulta optimizada",
            ratio: 54 / 544,
            result: "~30 s",
            note: "10 veces más rápido",
          },
        },
      ],
      other: "OTRAS CONTRIBUCIONES",
      contributions: [
        {
          color: "green",
          name: "Mensajería multi-app (WhatsApp)",
          summary: "Una sola API de chat para cuatro productos, cada uno con sus reglas de acceso.",
          detail: "4 productos",
        },
        {
          color: "blue",
          name: "Chat de entrevistas con guardrails",
          summary:
            "Controles en backend y frontend contra prompt injection y usos fuera del objetivo.",
          detail: "RRHH Ingenia",
        },
        {
          color: "orange",
          name: "Sistema para gasolineras 24/7",
          summary: "Tickets de venta y servidor conectado al hardware de despacho.",
          detail: "de 6 a 8 estaciones",
        },
        {
          color: "orange",
          name: "Módulo de acceso y comercial",
          summary: "Paquetes, créditos y precios por empresa, cliente, categoría y producto.",
          detail: "Laravel · PostgreSQL",
        },
        {
          color: "ink",
          name: "Citas para radiología (RIS)",
          summary: "Agenda y seguimiento de citas para una clínica de radiología.",
          detail: "DC Prosoft",
        },
      ],
      diagram: {
        label:
          "Cuatro productos envían eventos a una cola y un motor distribuye las notificaciones a cuatro canales",
        sources: ["Portal de candidatos", "Evaluaciones", "Verificaciones", "Soporte"],
        channels: ["In-app", "Correo", "WhatsApp", "Web push"],
        queue: "Cola",
        engine: "Motor",
        note: "4 productos publican eventos · 4 canales de salida",
      },
    },
    career: {
      title: "TRAYECTORIA",
      intro:
        "Empecé en soporte, atendiendo a los usuarios. Hoy construyo los sistemas que ellos operan.",
      items: [
        {
          period: "03/2019 – 01/2021",
          role: "Soporte técnico",
          company: "DC Prosoft",
          body: "Soporte funcional, seguimiento de incidencias y capacitación a clientes.",
        },
        {
          period: "01/2021 – 04/2022",
          role: "Desarrollador Junior",
          company: "DC Prosoft",
          body: "Sistema de citas para radiología (RIS) y plataforma de certificación educativa con JSF.",
        },
        {
          period: "05/2022 – 05/2025",
          role: "Desarrollador",
          company: "NextGen Technologies",
          body: "ERP contable, API multi-tenant, sistema para gasolineras y optimización de reportes SQL.",
        },
        {
          period: "11/2025 – hoy",
          role: "Desarrollador Full Stack e IA aplicada",
          company: "RRHH Ingenia",
          body: "IA aplicada al registro de candidatos, orquestación multi-modelo y centro de notificaciones.",
        },
      ],
    },
    stack: {
      title: "STACK",
      intro: "Lo que uso a diario va en grande; lo que también manejo, en chico.",
      primary: "Principal",
      secondary: "También",
      groups: [
        {
          color: "green",
          title: "Backend",
          primary: primary.backend,
          secondary: ["APIs REST", "Colas", "Redis", "Laravel Reverb", "Java", "Python"],
          foot: "En: centro de notificaciones · portal de candidatos · API multi-tenant",
        },
        {
          color: "blue",
          title: "IA en el producto",
          primary: primary.ai,
          secondary: ["OCR", "Extracción estructurada", "Guardrails", "Tool calling"],
          foot: "En: registro de candidatos · chat de entrevistas",
        },
        {
          color: "orange",
          title: "Datos",
          primary: primary.data,
          secondary: ["MySQL", "Modelado relacional", "Optimización de consultas", "Triggers"],
          foot: "En: ERP contable · módulo comercial · reportes SQL",
        },
        {
          color: "ink",
          title: "Desarrollo con agentes",
          primary: primary.agents,
          secondary: ["Gemini CLI", "Context7", "Skills propias", "Coordinación de agentes"],
          foot: "En: skills de Git y PRs · conector MCP para Penpot",
        },
      ],
      strip: [
        { title: "Interfaz", body: "React · Blade · JavaScript" },
        { title: "Herramientas", body: "Docker · Git · Postman · Jira · Monday.com" },
      ],
    },
    personal: {
      title: "POR MI CUENTA",
      items: [
        {
          tag: "En desarrollo",
          name: "NetMonitor",
          body: "App de escritorio para monitorear la red.",
          tech: "Tauri v2 · Rust · React",
        },
        {
          tag: "Demo",
          name: "MEDICS-DEM",
          body: "Landing de una empresa ficticia de equipo médico, con una secuencia ligada al scroll.",
          tech: "Astro · TypeScript · Tailwind",
        },
        {
          tag: "Personal",
          name: "Este portafolio",
          body: "Sitio bilingüe con tema claro y oscuro.",
          tech: "Next.js · React · TypeScript",
          link: { label: "Ver código →", href: "https://github.com/davidag29/portafolio-david" },
        },
      ],
    },
    contact: {
      title: "ESCRÍBEME",
      body: "Una vacante, un proyecto o una duda. Respondo en 24 a 48 horas.",
      links,
      name: "Nombre",
      email: "Correo",
      namePlaceholder: "Tu nombre",
      emailPlaceholder: "tu@correo.com",
      reason: "Motivo",
      reasons: [
        { value: "vacancy", label: "Vacante" },
        { value: "project", label: "Proyecto" },
        { value: "other", label: "Otro" },
      ],
      message: "Mensaje",
      placeholder: "Cuéntame qué necesitas y para cuándo.",
      honeypot: "Deja este campo vacío",
      submit: "Enviar mensaje →",
      sending: "Enviando…",
      privacy: "Tu correo solo se usa para responderte.",
      success: "Mensaje enviado. Te respondo en 24 a 48 horas.",
      error: "No se pudo enviar. Inténtalo de nuevo o escríbeme por LinkedIn.",
      notConfigured: "El formulario aún no está activo. Escríbeme por LinkedIn.",
      footer: "David Aguilar · 2026",
    },
  },
  en: {
    meta: {
      title: "David Aguilar | Full Stack & Applied AI Engineer",
      description:
        "I build the systems that move a company's information: APIs, queues, and databases. And I add AI where it saves time.",
    },
    ui: {
      skip: "Skip to content",
      logo: "DA",
      home: "Back to top",
      cv: "CV ↓",
      menu: "Navigation menu",
      theme: "Switch light or dark theme",
      language: "Language",
      locales: ["ES", "EN"],
      separator: "/",
    },
    nav: [
      { id: "trabajo", label: "Work" },
      { id: "trayectoria", label: "Career" },
      { id: "stack", label: "Stack" },
      { id: "contacto", label: "Contact" },
    ],
    hero: {
      eyebrow: "Full Stack & Applied AI Engineer · Ciudad Madero, Mexico",
      name: "DAVID AGUILAR",
      body: "I build the systems that move a company's information: APIs, queues, and databases. And I add AI where it saves time.",
      cta: "Write to me →",
    },
    map: {
      title: "A CV'S ROUTE",
      context: "Candidate registration · RRHH Ingenia portal",
      result: "from ~3 min to under 1 min per registration",
      label: "A CV's route with automatic failover between AI providers",
      hint: "Tap a provider station to turn it off and see the flow reroute.",
      unavailable: "No providers available: registration returns to manual entry.",
      diverted: "automatic failover",
      on: "in service",
      standby: "on standby",
      off: "out of credits",
      enable: "Enable",
      disable: "Disable",
      announcement: "out of service",
      flowing: "The flow now uses",
      providers: ["OpenAI", "Gemini", "DeepSeek"],
      stations: [
        { name: "CV", note: "PDF or image" },
        { name: "OCR", note: "extracts the text" },
        { name: "LLM", note: "analyzes and summarizes" },
        { name: "Fields", note: "validated in backend" },
        { name: "History", note: "profile + CV" },
      ],
    },
    work: {
      title: "WORK",
      intro:
        "Private code. For each system, I explain what it was, what I built, and what changed.",
      cases: [
        {
          color: "blue",
          tag: "Applied AI",
          context: "Candidate portal · RRHH Ingenia · 2025 – present",
          title: "Candidate registration with OCR and AI",
          body: "Candidate details used to be entered by hand. I designed and built the flow that reads a CV, summarizes it with an LLM, fills the fields, and saves the document in the candidate's history. Every module that adds candidates now reuses it.",
          tech: "Laravel · OCR · OpenAI · Gemini · DeepSeek",
          metric: {
            before: "Before · manual entry",
            value: "~3 min",
            after: "Now · CV + AI",
            ratio: 172 / 544,
            result: "< 1 min",
            note: "per candidate registration",
          },
        },
        {
          color: "green",
          tag: "Integration",
          context: "Core service · ~5 systems · RRHH Ingenia",
          title: "Notification center",
          body: "Each product used to notify its users independently. I proposed and designed a central service: systems publish an event, and the engine selects the channel and template without duplicate notifications. Each user receives between 10 and 40 a day.",
          tech: "Laravel · queues · Reverb · WhatsApp · email",
        },
        {
          color: "orange",
          tag: "Data",
          context: "NextGen Technologies · 5–6 companies · 2022 – 2025",
          title: "Accounting ERP and multi-tenant API",
          body: "An ERP with invoicing, inventory, and tax reports, plus a multi-tenant REST API in Node.js with roles and permissions. A financial report used to take about 5 minutes; I brought it down to 30 seconds.",
          tech: "Node.js · Express · SQL Server · Laravel",
          metric: {
            before: "Before · financial report",
            value: "~5 min",
            after: "Now · optimized query",
            ratio: 54 / 544,
            result: "~30 s",
            note: "10 times faster",
          },
        },
      ],
      other: "OTHER CONTRIBUTIONS",
      contributions: [
        {
          color: "green",
          name: "Multi-app messaging (WhatsApp)",
          summary: "One chat API for four products, each with its own access rules.",
          detail: "4 products",
        },
        {
          color: "blue",
          name: "Interview chat with guardrails",
          summary: "Backend and frontend controls against prompt injection and off-topic use.",
          detail: "RRHH Ingenia",
        },
        {
          color: "orange",
          name: "24/7 gas station system",
          summary: "Sales tickets and a server connected to dispensing hardware.",
          detail: "6 to 8 stations",
        },
        {
          color: "orange",
          name: "Access and commercial module",
          summary: "Packages, credits, and pricing by company, client, category, and product.",
          detail: "Laravel · PostgreSQL",
        },
        {
          color: "ink",
          name: "Radiology appointments (RIS)",
          summary: "Scheduling and appointment tracking for a radiology clinic.",
          detail: "DC Prosoft",
        },
      ],
      diagram: {
        label:
          "Four products publish events to a queue and an engine sends notifications to four channels",
        sources: ["Candidate portal", "Assessments", "Verifications", "Support"],
        channels: ["In-app", "Email", "WhatsApp", "Web push"],
        queue: "Queue",
        engine: "Engine",
        note: "4 products publish events · 4 delivery channels",
      },
    },
    career: {
      title: "CAREER",
      intro: "I started in support, helping users. Today I build the systems they rely on.",
      items: [
        {
          period: "03/2019 – 01/2021",
          role: "Technical Support",
          company: "DC Prosoft",
          body: "Functional support, incident follow-up, and client training.",
        },
        {
          period: "01/2021 – 04/2022",
          role: "Junior Developer",
          company: "DC Prosoft",
          body: "Radiology appointment system (RIS) and an educational certification platform built with JSF.",
        },
        {
          period: "05/2022 – 05/2025",
          role: "Developer",
          company: "NextGen Technologies",
          body: "Accounting ERP, multi-tenant API, gas station system, and SQL report optimization.",
        },
        {
          period: "11/2025 – present",
          role: "Full Stack & Applied AI Developer",
          company: "RRHH Ingenia",
          body: "AI for candidate registration, multi-model orchestration, and a central notification service.",
        },
      ],
    },
    stack: {
      title: "STACK",
      intro: "What I use every day is prominent; other tools I work with appear smaller.",
      primary: "Primary",
      secondary: "Also",
      groups: [
        {
          color: "green",
          title: "Backend",
          primary: primary.backend,
          secondary: ["REST APIs", "Queues", "Redis", "Laravel Reverb", "Java", "Python"],
          foot: "In: notification center · candidate portal · multi-tenant API",
        },
        {
          color: "blue",
          title: "AI in the product",
          primary: primary.ai,
          secondary: ["OCR", "Structured extraction", "Guardrails", "Tool calling"],
          foot: "In: candidate registration · interview chat",
        },
        {
          color: "orange",
          title: "Data",
          primary: primary.data,
          secondary: ["MySQL", "Relational modeling", "Query optimization", "Triggers"],
          foot: "In: accounting ERP · commercial module · SQL reports",
        },
        {
          color: "ink",
          title: "Development with agents",
          primary: primary.agents,
          secondary: ["Gemini CLI", "Context7", "Custom skills", "Agent coordination"],
          foot: "In: Git and PR skills · MCP connector for Penpot",
        },
      ],
      strip: [
        { title: "Interface", body: "React · Blade · JavaScript" },
        { title: "Tools", body: "Docker · Git · Postman · Jira · Monday.com" },
      ],
    },
    personal: {
      title: "ON MY OWN",
      items: [
        {
          tag: "In development",
          name: "NetMonitor",
          body: "A desktop app for monitoring the network.",
          tech: "Tauri v2 · Rust · React",
        },
        {
          tag: "Demo",
          name: "MEDICS-DEM",
          body: "A landing page for a fictional medical equipment company, with a scroll-driven sequence.",
          tech: "Astro · TypeScript · Tailwind",
        },
        {
          tag: "Personal",
          name: "This portfolio",
          body: "A bilingual site with light and dark themes.",
          tech: "Next.js · React · TypeScript",
          link: { label: "View code →", href: "https://github.com/davidag29/portafolio-david" },
        },
      ],
    },
    contact: {
      title: "WRITE TO ME",
      body: "An open role, a project, or a question. I reply within 24 to 48 hours.",
      links,
      name: "Name",
      email: "Email",
      namePlaceholder: "Your name",
      emailPlaceholder: "you@example.com",
      reason: "Reason",
      reasons: [
        { value: "vacancy", label: "Open role" },
        { value: "project", label: "Project" },
        { value: "other", label: "Other" },
      ],
      message: "Message",
      placeholder: "Tell me what you need and when you need it.",
      honeypot: "Leave this field empty",
      submit: "Send message →",
      sending: "Sending…",
      privacy: "Your email is only used to reply to you.",
      success: "Message sent. I'll reply within 24 to 48 hours.",
      error: "Message could not be sent. Try again or contact me on LinkedIn.",
      notConfigured: "The form isn't active yet. Contact me on LinkedIn.",
      footer: "David Aguilar · 2026",
    },
  },
};
