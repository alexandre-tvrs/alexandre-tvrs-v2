import { content } from "../../data/content";
import type { Locale } from "../../data/i18n";
import { t } from "../../data/i18n";

function renderInline(text: string) {
  const parts = text.split(/(\{[^}]+\})/);
  return parts.map((p, i) => {
    if (p.startsWith("{") && p.endsWith("}")) {
      return <span className="hl" key={i}>{p.slice(1, -1)}</span>;
    }
    return <span key={i}>{p}</span>;
  });
}

export function About({ lang }: { lang: Locale }) {
  return (
    <section data-screen-label="02 About">
      <div className="container">
        <div className="sec-head">
          <span className="idx">01 / 07</span>
          <h3>{lang === "pt" ? "Sobre" : "About"}</h3>
          <span className="desc">{lang === "pt" ? "Engenheiro full-cycle, três mundos, zero silos." : "Full-cycle engineer, three worlds, zero silos."}</span>
        </div>
        <div className="about-grid">
          <div className="about-card">
            <div className="label">{lang === "pt" ? "// identidade" : "// identity"}</div>
            <div style={{ marginTop: 12 }}>
              {content.about.facts.map((f, i) => (
                <div className="field" key={i}>
                  <span className="k">{f.k}</span>
                  <span className="v">{t(f.v, lang)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="about-text">
            {content.about.paragraphs[lang].map((p, i) => (
              <p key={i}>{renderInline(p)}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
