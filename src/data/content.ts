import type { Translatable } from "./i18n";

export interface Project {
  name: string;
  status: "live" | "archived";
  desc: Translatable;
  stack: string[];
  meta: { stars: string; year: string };
  href?: string;
}

export interface ExperienceItem {
  year: string;
  role: Translatable;
  co: Translatable;
  desc: Translatable;
  bullets: Translatable<string[]>;
}

export interface SkillGroup {
  cat: Translatable;
  title: Translatable;
  items: { name: string; level: 1 | 2 | 3 }[];
}

export interface ArchLayer {
  name: Translatable;
  svc: string;
  ico: string;
}

export interface Content {
  identity: {
    name: string;
    handle: string;
    domain: string;
    location: Translatable;
    role: Translatable;
    short: Translatable;
  };
  hero: {
    tag: Translatable;
    title: Translatable<string[]>;
    sub: Translatable;
    stats: { num: string; lbl: Translatable }[];
  };
  about: {
    paragraphs: Translatable<string[]>;
    facts: { k: string; v: string | Translatable }[];
  };
  skills: SkillGroup[];
  projects: Project[];
  experience: ExperienceItem[];
  architecture: {
    layers: ArchLayer[];
    meta: { k: string | Translatable; v: string | Translatable }[];
  };
  contact: {
    title: Translatable<string[]>;
    sub: Translatable;
    channels: { k: string; v: string; href: string }[];
  };
  signal: Translatable<string[]>;
}

export const content: Content = {
  identity: {
    name: "Alexandre Tavares",
    handle: "alexandre-tvrs",
    domain: "alexandretavares.dev",
    location: { pt: "São Paulo, BR", en: "São Paulo, BR" },
    role: {
      pt: "Engenheiro de Software · DevOps · Machine Learning",
      en: "Software · DevOps · Machine Learning Engineer",
    },
    short: {
      pt: "Sistemas que aprendem, escalam e respiram nuvem.",
      en: "Systems that learn, scale and breathe cloud.",
    },
  },

  hero: {
    tag: { pt: "PORTFOLIO · v3.0 · 2026", en: "PORTFOLIO · v3.0 · 2026" },
    title: { pt: ["Construo", "infra & inteligência."], en: ["I build", "infra & intelligence."] },
    sub: {
      pt: "Full-stack do pipeline ao deploy. Do {pyTorch} ao {kubernetes}, da {feature} ao {modelo em produção}.",
      en: "Full-stack from pipeline to deploy. From {pyTorch} to {kubernetes}, from {feature} to {model in production}.",
    },
    stats: [
      { num: "5+",  lbl: { pt: "ANOS · TECH",        en: "YEARS · TECH" } },
      { num: "AZ",  lbl: { pt: "AZURE · CERTIFIED",  en: "AZURE · CERTIFIED" } },
      { num: "4",   lbl: { pt: "EMPRESAS",            en: "COMPANIES" } },
    ],
  },

  about: {
    paragraphs: {
      pt: [
        "Desenvolvedor full-stack com foco em {cloud} e {machine learning} — construo APIs de alta disponibilidade, ambientes Kubernetes e automações inteligentes. Python, C# e TypeScript no dia a dia, sempre com olho na observabilidade.",
        "Nos últimos anos trabalhei com {Azure DevOps}, pipelines de CI/CD e microsserviços distribuídos em Azure, GCP e AWS. Recentemente venho aplicando {ML e visão computacional} com Azure OpenAI Services para automação de processos complexos.",
        "Formado em Desenvolvimento de Sistemas pelo IFSP e pós-graduando em {Machine Learning} pela FIAP. Azure Fundamentals certificado — e sempre estudando o próximo nível.",
      ],
      en: [
        "Full-stack developer focused on {cloud} and {machine learning} — I build high-availability APIs, Kubernetes environments and intelligent automations. Python, C# and TypeScript daily, always with an eye on observability.",
        "Over the last few years I've worked with {Azure DevOps}, CI/CD pipelines and distributed microservices across Azure, GCP and AWS. Lately I've been applying {ML and computer vision} with Azure OpenAI Services for complex process automation.",
        "Graduated in Systems Development at IFSP, finishing a postgraduate in {Machine Learning} at FIAP. Azure Fundamentals certified — always leveling up.",
      ],
    },
    facts: [
      { k: "NAME",   v: "Alexandre Tavares" },
      { k: "ROLE",   v: { pt: "Software Developer II · DevOps", en: "Software Developer II · DevOps" } },
      { k: "BASE",   v: "São Paulo, BR · UTC-3" },
      { k: "FOCUS",  v: { pt: "Cloud · ML · DevOps", en: "Cloud · ML · DevOps" } },
      { k: "STATUS", v: { pt: "Aberto a colabs", en: "Open to collabs" } },
      { k: "STACK",  v: "Python · C# · TypeScript · Azure" },
    ],
  },

  skills: [
    {
      cat:   { pt: "LINGUAGENS & FRAMEWORKS", en: "LANGUAGES & FRAMEWORKS" },
      title: { pt: "Falo com máquinas",       en: "I talk to machines" },
      items: [
        { name: "Python",     level: 3 },
        { name: "TypeScript", level: 3 },
        { name: "C#",         level: 3 },
        { name: "Django",     level: 3 },
        { name: "FastAPI",    level: 3 },
        { name: "JavaScript", level: 2 },
        { name: "SQL",        level: 2 },
        { name: "Bash / PS",  level: 2 },
      ],
    },
    {
      cat:   { pt: "CLOUD & PLATAFORMA", en: "CLOUD & PLATFORM" },
      title: { pt: "Onde a infra vive",  en: "Where infra lives" },
      items: [
        { name: "Azure",         level: 3 },
        { name: "Kubernetes",    level: 3 },
        { name: "Docker",        level: 3 },
        { name: "Azure DevOps",  level: 3 },
        { name: "CI/CD",         level: 3 },
        { name: "GCP",           level: 2 },
        { name: "AWS",           level: 2 },
        { name: "Azure Functions", level: 2 },
        { name: "GitHub Actions",  level: 2 },
      ],
    },
    {
      cat:   { pt: "DADOS & ML", en: "DATA & ML" },
      title: { pt: "Modelos que decidem", en: "Models that decide" },
      items: [
        { name: "Machine Learning", level: 3 },
        { name: "Pandas",           level: 3 },
        { name: "Azure OpenAI",     level: 2 },
        { name: "Scikit-learn",     level: 2 },
        { name: "Selenium",         level: 2 },
        { name: "OCR / CV",         level: 2 },
        { name: "Go",               level: 2 },
        { name: "Rust",             level: 2 },
        { name: "PyTorch",          level: 1 },
      ],
    },
  ],

  projects: [
    {
      name: "Project.ENV",
      status: "live",
      desc: {
        pt: "Aplicação Python + React para configurar ambientes locais (minikube) ou cloud via integração de APIs. Automatiza todo o setup de infra para desenvolvedores.",
        en: "Python + React app to configure local (minikube) or cloud environments via API integration. Automates full infra setup for developers.",
      },
      stack: ["Python", "FastAPI", "React", "Minikube", "K8s"],
      meta: { stars: "—", year: "2023" },
      href: "https://github.com/alexandre-tvrs",
    },
    {
      name: "ChatTCC",
      status: "live",
      desc: {
        pt: "Sistema web que auxilia alunos e professores no processo de TCC — organização de orientações, entregas e feedbacks. Backend Django REST + frontend React.",
        en: "Web system that helps students and teachers with the thesis process — guidance sessions, submissions and feedback. Django REST backend + React frontend.",
      },
      stack: ["Python", "Django", "React", "PostgreSQL"],
      meta: { stars: "—", year: "2023" },
      href: "https://github.com/alexandre-tvrs",
    },
    {
      name: "TargonApp",
      status: "live",
      desc: {
        pt: "Aplicação desktop Python para geração de relatórios Excel com dashboards e filtros dinâmicos. Desenvolvida com Pandas, NumPy e Tkinter.",
        en: "Python desktop app for generating Excel reports with dashboards and dynamic filters. Built with Pandas, NumPy and Tkinter.",
      },
      stack: ["Python", "Pandas", "NumPy", "Tkinter"],
      meta: { stars: "—", year: "2022" },
      href: "https://github.com/alexandre-tvrs",
    },
    {
      name: "KotaroBOT",
      status: "archived",
      desc: {
        pt: "Bot para Discord desenvolvido em Python com função principal de importar e tocar músicas nos servidores. Suporte a filas, comandos de voz e integração com APIs de áudio.",
        en: "Discord bot built in Python whose main function is to import and play music on servers. Queue support, voice commands and audio API integration.",
      },
      stack: ["Python", "Discord.py"],
      meta: { stars: "—", year: "2022" },
      href: "https://github.com/alexandre-tvrs",
    },
    {
      name: "WrathOfElements",
      status: "archived",
      desc: {
        pt: "Jogo educacional desenvolvido em Game Maker para ajudar alunos com problemas matemáticos. Projeto de conclusão de curso da ETEC, com lógica desenvolvida em C#.",
        en: "Educational game built in Game Maker to help students with math problems. ETEC final paper project, with game logic developed in C#.",
      },
      stack: ["C#", "Game Maker"],
      meta: { stars: "—", year: "2021" },
    },
    {
      name: "azure-scripts",
      status: "archived",
      desc: {
        pt: "Coleção de scripts Python e PowerShell para automação de processos manuais no Azure DevOps — usando Azure DevOps REST API, MS Graph API e outros serviços Microsoft.",
        en: "Collection of Python and PowerShell scripts for automating manual processes in Azure DevOps — using Azure DevOps REST API, MS Graph API and other Microsoft services.",
      },
      stack: ["Python", "PowerShell", "Azure DevOps", "MS Graph"],
      meta: { stars: "—", year: "2022" },
    },
  ],

  experience: [
    {
      year: "2024 — NOW",
      role: { pt: "Software Developer II",    en: "Software Developer II" },
      co:   { pt: "Kuará Capital · São Paulo", en: "Kuará Capital · São Paulo" },
      desc: {
        pt: "Liderando o desenvolvimento de ambientes Kubernetes para APIs Python com FastAPI e MySQL. Atuando no desenvolvimento de aplicações com Python e Electron e na configuração da infraestrutura cloud multi-cloud (GCP + Azure).",
        en: "Leading the development of Kubernetes environments for Python APIs with FastAPI and MySQL. Working on Python and Electron applications and multi-cloud infrastructure setup (GCP + Azure).",
      },
      bullets: {
        pt: [
          "Kubernetes environments para APIs FastAPI + MySQL em produção",
          "Aplicação desktop Python + Electron",
          "Infraestrutura cloud: GCP e Azure",
        ],
        en: [
          "Kubernetes environments for FastAPI + MySQL APIs in production",
          "Python + Electron desktop application",
          "Cloud infrastructure: GCP and Azure",
        ],
      },
    },
    {
      year: "2023 — 2024",
      role: { pt: "Software Developer I", en: "Software Developer I" },
      co:   { pt: "KONIA · Remote",        en: "KONIA · Remote" },
      desc: {
        pt: "Liderou o desenvolvimento de projeto de Machine Learning com OCR usando Azure OpenAI Services e Python (Pyppeteer e Selenium). Projetou e implementou aplicações enterprise com Azure, C# e Python.",
        en: "Led the development of a Machine Learning project with OCR using Azure OpenAI Services and Python (Pyppeteer and Selenium). Designed and implemented enterprise applications with Azure, C# and Python.",
      },
      bullets: {
        pt: [
          "ML com OCR, Azure OpenAI Services, Pyppeteer e Selenium",
          "Apps enterprise com Azure, C# e Python",
          "Melhorias em sistemas legados C# / ASP.NET",
        ],
        en: [
          "ML with OCR, Azure OpenAI Services, Pyppeteer and Selenium",
          "Enterprise apps with Azure, C# and Python",
          "Legacy C# / ASP.NET system improvements",
        ],
      },
    },
    {
      year: "2022 — 2023",
      role: { pt: "DevOps Consulting",  en: "DevOps Consulting" },
      co:   { pt: "KONIA · Remote",      en: "KONIA · Remote" },
      desc: {
        pt: "Projetou e desenvolveu pipelines e microsserviços com Azure, Python, .NET, Azure Functions e Key Vault. Liderou a implementação de pipelines no Azure DevOps com Kubernetes/AKS e Lambda na AWS.",
        en: "Designed and developed pipelines and microservices using Azure, Python, .NET, Azure Functions and Key Vault. Led CI/CD pipeline implementation in Azure DevOps with Kubernetes/AKS and AWS Lambda.",
      },
      bullets: {
        pt: [
          "Scripts para Azure DevOps com REST API, MS Graph, Python e PowerShell",
          "Pipelines com Kubernetes / AKS e AWS Lambda",
          "CI/CD, code reviews, testes de carga e integração (e2e)",
        ],
        en: [
          "Scripts for Azure DevOps using REST API, MS Graph, Python and PowerShell",
          "Pipelines with Kubernetes / AKS and AWS Lambda",
          "CI/CD, code reviews, load testing and integration (e2e) testing",
        ],
      },
    },
    {
      year: "2021 — 2022",
      role: { pt: "SAM Consultant, Estagiário", en: "SAM Consultant, Intern" },
      co:   { pt: "SoftwareONE · São Paulo",    en: "SoftwareONE · São Paulo" },
      desc: {
        pt: "Consultoria em licenciamento de software com ferramentas de asset management (FLEXERA, SNOW). Desenvolveu sistema de automação de agendamentos e coleta de dados com Pandas e Python.",
        en: "Software licensing consulting using asset management tools (FLEXERA, SNOW). Developed work schedule automation and data collection system with Pandas and Python.",
      },
      bullets: {
        pt: [
          "Consultoria com FLEXERA e SNOW para gestão de licenças corporativas",
          "Automação de agendamentos e dados com Pandas (Python)",
          "Certificações: Get Licensing Ready (Microsoft) e ITIL",
        ],
        en: [
          "Consulting with FLEXERA and SNOW for corporate license management",
          "Work schedule and asset data automation with Pandas (Python)",
          "Certifications: Get Licensing Ready (Microsoft) and ITIL",
        ],
      },
    },
  ],

  architecture: {
    layers: [
      { name: { pt: "Borda",      en: "Edge" },      svc: "CDN · WAF",              ico: "▲" },
      { name: { pt: "Gateway",    en: "Gateway" },    svc: "Azure API Mgmt",         ico: "◆" },
      { name: { pt: "Compute",    en: "Compute" },    svc: "AKS · Azure Functions",  ico: "◉" },
      { name: { pt: "Dados",      en: "Data" },       svc: "MySQL · PostgreSQL",     ico: "▣" },
      { name: { pt: "Inferência", en: "Inference" },  svc: "Azure OpenAI · OCR",     ico: "✦" },
    ],
    meta: [
      { k: "UPTIME",                                       v: "99.9%" },
      { k: { pt: "LATÊNCIA P99",  en: "P99 LATENCY" },    v: "< 200ms" },
      { k: { pt: "NUVENS",        en: "CLOUDS" },          v: "3x" },
      { k: { pt: "PIPELINES",     en: "PIPELINES" },       v: "10+" },
    ],
  },

  contact: {
    title: {
      pt: ["vamos construir", "algo {real}"],
      en: ["let's ship",      "something {real}"],
    },
    sub: {
      pt: "Aberto para conversas sobre engenharia de software, cloud, MLOps, DevOps e oportunidades de colaboração.",
      en: "Open for conversations on software engineering, cloud, MLOps, DevOps and collaboration opportunities.",
    },
    channels: [
      { k: "EMAIL",    v: "alexandre@datadev.tech",            href: "mailto:alexandre@datadev.tech" },
      { k: "GITHUB",   v: "@alexandre-tvrs",                   href: "https://github.com/alexandre-tvrs" },
      { k: "LINKEDIN", v: "in/dev-alexandre-tavares",          href: "https://www.linkedin.com/in/dev-alexandre-tavares/" },
      { k: "SITE",     v: "alexandretavares.dev",              href: "https://alexandretavares.dev" },
    ],
  },

  signal: {
    pt: ["DEPLOY · azure", "BUILD · passed", "uptime · 99.9%", "k8s · em prod", "azure · certified", "gcp · live", "ocr · ml", "ci/cd · ativo", "clouds · 3x"],
    en: ["DEPLOY · azure", "BUILD · passed", "uptime · 99.9%", "k8s · in prod", "azure · certified", "gcp · live", "ocr · ml", "ci/cd · active", "clouds · 3x"],
  },
};
