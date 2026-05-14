export const ASCII_LOGO = `
   █████╗ ████████╗
  ██╔══██╗╚══██╔══╝   alexandre tavares
  ███████║   ██║      software · devops · ml
  ██╔══██║   ██║      v3.0 · 2026
  ██║  ██║   ██║      github.com/alexandre-tvrs
  ╚═╝  ╚═╝   ╚═╝      [type /help or /ajuda]
`;

export const ARCH_DIAGRAM = `   ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
   │   EDGE   │ ─▶ │ GATEWAY  │ ─▶ │  COMPUTE │ ─▶ │  DATA    │
   │CloudFront│    │ ALB·Istio│    │ EKS·λ    │    │ RDS·Lake │
   └──────────┘    └──────────┘    └──────────┘    └──────────┘
                                         │
                                         ▼
                                   ┌──────────┐
                                   │ INFERENCE│
                                   │Triton·KSv│
                                   └──────────┘`;
