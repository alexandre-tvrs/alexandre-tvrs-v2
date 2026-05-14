import { content } from "../../data/content";
import type { Locale } from "../../data/i18n";

function renderInline(text: string) {
  const parts = text.split(/(\{[^}]+\})/);
  return parts.map((p, i) => {
    if (p.startsWith("{") && p.endsWith("}")) {
      return <b style={{ color: "var(--cyan)", fontWeight: 400 }} key={i}>{p.slice(1, -1)}</b>;
    }
    return <span key={i}>{p}</span>;
  });
}

export function Experience({ lang }: { lang: Locale }) {
  return (
    <section data-screen-label="05 Experience">
      <div className="container">
        <div className="sec-head">
          <span className="idx">04 / 07</span>
          <h3>{lang === "pt" ? "Carreira" : "Career"}</h3>
          <span className="desc">{lang === "pt" ? "Do junior ao senior ML platform — 8+ anos." : "Junior to senior ML platform — 8+ years."}</span>
        </div>
        <div className="timeline">
          {content.experience.map((e, i) => (
            <div className="tl-item" key={i}>
              <div className="year">{e.year}</div>
              <h4>{e.role[lang]}</h4>
              <div className="co">{renderInline(e.co[lang])}</div>
              <p>{e.desc[lang]}</p>
              {e.bullets[lang].length > 0 && (
                <ul className="achievements">
                  {e.bullets[lang].map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
