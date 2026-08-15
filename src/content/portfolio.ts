export type Locale = "es" | "en";

export type Project = {
  tag: string;
  name: string;
  problem: string;
  solution: string;
  stack: string[];
  demoLabel: string;
  detail?: "eventFlow" | "messagingFlow";
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
    specs: string[];
  };
  eventFlow: {
    kicker: string;
    externalLabel: string;
    externalSystems: string[];
    internalLabel: string;
    queueLabel: string;
    hub: string;
    channels: string[];
  };
  messagingFlow: {
    kicker: string;
    externalLabel: string;
    externalSystems: string[];
    queueLabel: string;
    hub: string;
    channels: string[];
  };
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
      projects: "Trabajo",
      stack: "Stack",
      experience: "Experiencia",
      contact: "Contacto",
    },
    availability: "Disponible para nuevos proyectos",
    hero: {
      eyebrow: "const developer = 'builder'",
      name: "David Aguilar",
      role: "Full Stack · Laravel/Node.js · IA aplicada",
      body: "5+ años construyendo aplicaciones web, APIs y sistemas empresariales con PHP/Laravel y Node.js. Aplico IA (MCP, agentes, OCR) bajo reglas de arquitectura, seguridad y calidad, no como moda.",
      primaryCta: "Ver proyectos",
      secondaryCta: "Hablemos",
      specs: ["5+ años", "PHP · Laravel · Node.js", "Ciudad Madero, Tamaulipas | UTC-6"],
    },
    eventFlow: {
      kicker: "Así funciona",
      externalLabel: "Eventos externos",
      externalSystems: ["Portal de candidatos", "Evaluaciones", "Verificaciones", "Soporte"],
      internalLabel: "Evento interno",
      queueLabel: "Cola de trabajo",
      hub: "Motor de notificaciones",
      channels: ["In-app", "Correo", "WhatsApp", "Web push"],
    },
    messagingFlow: {
      kicker: "Así funciona",
      externalLabel: "Productos",
      externalSystems: ["Portal de candidatos", "Evaluaciones", "Verificaciones", "Soporte"],
      queueLabel: "Registry / Resolver",
      hub: "API MultiMensajería",
      channels: ["Conversación actualizada"],
    },
    projects: {
      kicker: "Lo que he construido",
      title: "Trabajo que se entiende por el problema que resuelve.",
      allLabel: "Ver todos",
      problemLabel: "Problema",
      solutionLabel: "Solución",
      items: [
        {
          tag: "Arquitectura",
          name: "Sistema de notificaciones end-to-end",
          problem: "Cada producto del ecosistema necesitaba avisar a sus usuarios por distintos canales (in-app, correo, WhatsApp, push), sin duplicar notificaciones ni fallar en cascada si un canal no tenía destinatario.",
          solution: "Diseñé un módulo centralizado con dos vías de entrada (eventos internos y externos vía cola), un catálogo dirigido por datos que resuelve canales y plantillas por evento, y un orquestador con idempotencia por hash SHA-256 (más deduplicación por ventana de tiempo para WhatsApp) y degradación por canal sin tumbar la notificación completa.",
          stack: ["Laravel", "WebSockets", "Colas de trabajo"],
          demoLabel: "Detalles",
          detail: "eventFlow",
        },
        {
          tag: "Mensajería",
          name: "Mensajería multi-app (WhatsApp)",
          problem: "Cuatro productos necesitaban chat con sus propios usuarios finales, cada uno con su entidad raíz y reglas de acceso propias — resolviendo el mismo problema de mensajería cuatro veces.",
          solution: "Extraje una única API parametrizada por producto (Strategy + Registry): el controlador no conoce ningún producto, solo delega a través de un contrato común. Agregué contratos opcionales por composición (no herencia) para funcionalidades que no todas las apps necesitan, y errores de negocio tipados con reason codes explícitos (ej. la ventana de 24h de WhatsApp Business).",
          stack: ["Laravel", "React", "WebSockets"],
          demoLabel: "Detalles",
          detail: "messagingFlow",
        },
        {
          tag: "IA & Auth",
          name: "Auth con OCR e IA (portal de candidatos)",
          problem: "El registro manual de candidatos en el portal era lento y propenso a errores de captura.",
          solution: "Construí el login/registro del portal de candidatos con recuperación de contraseña y registro semi-automático: el CV se procesa con OCR vía IA para prellenar los datos.",
          stack: ["Laravel", "OpenAI", "OCR"],
          demoLabel: "Detalles",
        },
        {
          tag: "Comercial",
          name: "Módulo de acceso/comercial",
          problem: "Configurar paquetes, precios y créditos por empresa/sucursal se hacía de forma manual y desordenada.",
          solution: "Construí el CRUD de departamentos, catálogo de servicios, paquetes, plantillas, adquisiciones y créditos, con soporte de precios por empresa, cliente, categoría y producto.",
          stack: ["Laravel", "PostgreSQL"],
          demoLabel: "Detalles",
        },
        {
          tag: "Contable",
          name: "ERP contable multi-tenant",
          problem: "Facturación, inventario y reportes fiscales gestionados de forma manual.",
          solution: "API RESTful multi-tenant con roles y permisos, y reportes financieros automatizados.",
          stack: ["Node.js", "Express", "SQL Server"],
          demoLabel: "Detalles",
        },
        {
          tag: "Salud",
          name: "Sistema de citas RIS",
          problem: "Agenda manual para una clínica de radiología, sin trazabilidad de citas.",
          solution: "Sistema de gestión de citas con seguimiento de estados para el área de radiología.",
          stack: ["JavaServer Faces", "SQL"],
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
        { label: "IA & Agentes", items: ["OpenAI", "DeepSeek", "MCP", "Sistemas multiagente", "OCR", "Ingeniería asistida por IA"] },
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
          highlight: "Responsable principal del sistema de notificaciones end-to-end (colas, tiempo real, deduplicación) integrado en todos los productos del ecosistema; generalicé la mensajería multi-app y desarrollé el módulo de acceso/comercial (paquetes, créditos, precios).",
        },
        {
          role: "Desarrollador",
          company: "NextGen Technologies",
          period: "05/2022 - 05/2025",
          highlight: "ERP contable con API RESTful multi-tenant en Node.js/Express; sistema de gestión para gasolinera con facturación automática.",
        },
        {
          role: "Desarrollador Junior",
          company: "DC Prosoft S.A. de C.V.",
          period: "01/2021 - 04/2022",
          highlight: "Sistema de certificación educativa con JSF y sistema de gestión de citas para clínica de radiología (RIS).",
        },
        {
          role: "Soporte técnico",
          company: "DC Prosoft S.A. de C.V.",
          period: "03/2019 - 01/2021",
          highlight: "Atención a usuarios, capacitación funcional y seguimiento de incidencias operativas.",
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
      projects: "Work",
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
      specs: ["5+ years", "PHP · Laravel · Node.js", "Ciudad Madero, Tamaulipas | UTC-6"],
    },
    eventFlow: {
      kicker: "How it works",
      externalLabel: "External events",
      externalSystems: ["Candidate portal", "Assessments", "Verifications", "Support"],
      internalLabel: "Internal event",
      queueLabel: "Job queue",
      hub: "Notification engine",
      channels: ["In-app", "Email", "WhatsApp", "Web push"],
    },
    messagingFlow: {
      kicker: "How it works",
      externalLabel: "Products",
      externalSystems: ["Candidate portal", "Assessments", "Verifications", "Support"],
      queueLabel: "Registry / Resolver",
      hub: "Multi-messaging API",
      channels: ["Updated conversation"],
    },
    projects: {
      kicker: "What I've built",
      title: "Work explained by the problem it solves.",
      allLabel: "View all",
      problemLabel: "Problem",
      solutionLabel: "Solution",
      items: [
        {
          tag: "Architecture",
          name: "End-to-end notification system",
          problem: "Every product in the ecosystem needed to notify its users across different channels (in-app, email, WhatsApp, push), without duplicating notifications or failing entirely when a channel had no valid recipient.",
          solution: "Designed a centralized module with two entry paths (internal events and external events via queue), a data-driven catalog that resolves channels and templates per event, and an orchestrator with SHA-256 hash idempotency (plus time-window deduplication for WhatsApp) and per-channel degradation that never fails the whole notification.",
          stack: ["Laravel", "WebSockets", "Job queues"],
          demoLabel: "Details",
          detail: "eventFlow",
        },
        {
          tag: "Messaging",
          name: "Multi-app messaging (WhatsApp)",
          problem: "Four products needed chat with their own end users, each with its own root entity and access rules — solving the same messaging problem four times.",
          solution: "Extracted a single API parameterized by product (Strategy + Registry pattern): the controller knows no specific product, it only delegates through a shared contract. Added optional contracts via composition (not inheritance) for features not every app needs, plus typed business exceptions with explicit reason codes (e.g. WhatsApp Business's 24-hour window rule).",
          stack: ["Laravel", "React", "WebSockets"],
          demoLabel: "Details",
          detail: "messagingFlow",
        },
        {
          tag: "AI & Auth",
          name: "Auth with OCR & AI (candidate portal)",
          problem: "Manual candidate registration on the portal was slow and error-prone.",
          solution: "Built the candidate portal's login/registration with password recovery and semi-automatic registration: the resume is processed with AI-powered OCR to pre-fill the form.",
          stack: ["Laravel", "OpenAI", "OCR"],
          demoLabel: "Details",
        },
        {
          tag: "Commercial",
          name: "Access/commercial module",
          problem: "Configuring packages, pricing, and credits per company/branch was manual and disorganized.",
          solution: "Built the CRUD for departments, service catalog, packages, templates, acquisitions, and credits, with pricing support by company, client, category, and product.",
          stack: ["Laravel", "PostgreSQL"],
          demoLabel: "Details",
        },
        {
          tag: "Accounting",
          name: "Multi-tenant accounting ERP",
          problem: "Invoicing, inventory, and tax reporting handled manually.",
          solution: "Multi-tenant RESTful API with roles/permissions and automated financial reporting.",
          stack: ["Node.js", "Express", "SQL Server"],
          demoLabel: "Details",
        },
        {
          tag: "Healthcare",
          name: "RIS appointment system",
          problem: "Manual scheduling for a radiology clinic, with no appointment traceability.",
          solution: "Appointment management system with status tracking for the radiology department.",
          stack: ["JavaServer Faces", "SQL"],
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
          highlight: "Lead developer for the end-to-end notification system (queues, real-time, deduplication) integrated across every product in the ecosystem; generalized the multi-app messaging layer and built the access/commercial module (packages, credits, pricing).",
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
