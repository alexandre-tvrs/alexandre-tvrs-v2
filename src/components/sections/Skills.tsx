import { content } from "../../data/content";
import type { Locale } from "../../data/i18n";

export function Skills({ lang }: { lang: Locale }) {
  return (
    <section data-screen-label="03 Skills">
      <div className="container">
        <div className="sec-head">
          <span className="idx">02 / 07</span>
          <h3>Stack</h3>
          <span className="desc">{lang === "pt" ? "● core competency  ○ proficiente" : "● core competency  ○ proficient"}</span>
        </div>
        <div className="skills-grid">
          {content.skills.map((g, i) => (
            <div className="skill-cat" key={i}>
              <div className="ico">{String(i + 1).padStart(2, "0")} · {g.cat[lang]}</div>
              <h4>{g.title[lang]}</h4>
              <ul>
                {g.items.map((it, j) => (
                  <li key={j} className={`lvl-${it.level}`}>{it.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
