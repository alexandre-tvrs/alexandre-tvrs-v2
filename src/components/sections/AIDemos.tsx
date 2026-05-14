import type { Locale } from "../../data/i18n";

const SERVICES = [
  {
    ico: "▣",
    label: { pt: "Engenharia de Dados",       en: "Data Engineering" },
    desc:  { pt: "Pipelines, ETL, warehousing e arquiteturas de dados escaláveis.", en: "Pipelines, ETL, warehousing and scalable data architectures." },
  },
  {
    ico: "✦",
    label: { pt: "Machine Learning / IA",      en: "Machine Learning / AI" },
    desc:  { pt: "Modelos, MLOps, LLMs e automações com IA generativa.",            en: "Models, MLOps, LLMs and generative AI automations." },
  },
  {
    ico: "◉",
    label: { pt: "DevOps / Cloud",             en: "DevOps / Cloud" },
    desc:  { pt: "Infra, CI/CD, Kubernetes e ambientes multi-cloud.",               en: "Infra, CI/CD, Kubernetes and multi-cloud environments." },
  },
  {
    ico: "◆",
    label: { pt: "Desenvolvimento de Software", en: "Software Development" },
    desc:  { pt: "APIs, sistemas web e aplicações full-stack.",                      en: "APIs, web systems and full-stack applications." },
  },
] as const;

const STACK = ["Python", "Azure", "K8s", "FastAPI", "ML", "React", "C#"];

export function AIDemos({ lang }: { lang: Locale }) {
  return (
    <section data-screen-label="06 DATA&DEV">
      <div className="container">
        <div className="sec-head">
          <span className="idx">05 / 07</span>
          <h3>DATA&amp;DEV</h3>
          <span className="desc">
            {lang === "pt"
              ? "Minha empresa — tecnologia que resolve problemas reais."
              : "My company — technology that solves real problems."}
          </span>
        </div>

        <div className="ai-demos">
          {/* Card institucional */}
          <div className="demo">
            <div className="head">
              <div className="name">
                <span className="slash">/</span>data<span style={{ color: "var(--neon)" }}>&amp;</span>dev
              </div>
              <div className="tag">● LIVE · datadev.tech</div>
            </div>
            <div className="body">
              <div style={{ marginBottom: 20 }}>
                <div style={{ color: "var(--neon)", fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 8 }}>
                  {lang === "pt" ? "MISSÃO" : "MISSION"}
                </div>
                <div style={{ color: "var(--fg)", fontSize: 14, lineHeight: 1.75, fontFamily: "var(--font-display)" }}>
                  {lang === "pt"
                    ? "Construímos sistemas que aprendem, escalam e entregam valor real — da engenharia de dados ao modelo em produção."
                    : "We build systems that learn, scale and deliver real value — from data engineering to production models."}
                </div>
              </div>

              <div style={{ paddingTop: 16, borderTop: "1px dashed var(--line-bright)", marginBottom: 20 }}>
                <div style={{ color: "var(--fg-mute)", fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 10 }}>
                  STACK
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {STACK.map((s) => (
                    <span key={s} style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10.5,
                      color: "var(--cyan)",
                      border: "1px solid var(--line-bright)",
                      padding: "2px 8px",
                    }}>{s}</span>
                  ))}
                </div>
              </div>

              <a
                href="https://datadev.tech"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  color: "var(--neon)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  textDecoration: "none",
                  borderBottom: "1px solid var(--neon-soft)",
                  paddingBottom: 2,
                  transition: "border-color 0.2s",
                }}
              >
                datadev.tech <span>↗</span>
              </a>
            </div>
          </div>

          {/* Card de serviços */}
          <div className="demo">
            <div className="head">
              <div className="name">
                <span className="slash">/</span>
                {lang === "pt" ? "serviços" : "services"}
              </div>
              <div className="tag">4 {lang === "pt" ? "ÁREAS" : "AREAS"}</div>
            </div>
            <div className="body" style={{ padding: "20px 24px" }}>
              {SERVICES.map((svc, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 14,
                    paddingBottom: 14,
                    marginBottom: i < SERVICES.length - 1 ? 14 : 0,
                    borderBottom: i < SERVICES.length - 1 ? "1px dashed var(--line)" : "none",
                  }}
                >
                  <span style={{ color: "var(--neon)", fontSize: 18, flexShrink: 0, lineHeight: 1.3 }}>
                    {svc.ico}
                  </span>
                  <div>
                    <div style={{
                      color: "var(--fg)",
                      fontFamily: "var(--font-display)",
                      fontSize: 13,
                      fontWeight: 600,
                      marginBottom: 3,
                    }}>
                      {svc.label[lang]}
                    </div>
                    <div style={{
                      color: "var(--fg-dim)",
                      fontFamily: "var(--font-mono)",
                      fontSize: 11.5,
                      lineHeight: 1.65,
                    }}>
                      {svc.desc[lang]}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
