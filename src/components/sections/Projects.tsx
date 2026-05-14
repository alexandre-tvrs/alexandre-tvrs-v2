import { content } from "../../data/content";
import type { Locale } from "../../data/i18n";

export function Projects({ lang }: { lang: Locale }) {
  return (
    <section data-screen-label="04 Projects">
      <div className="container">
        <div className="sec-head">
          <span className="idx">03 / 07</span>
          <h3>{lang === "pt" ? "Projetos" : "Projects"}</h3>
          <span className="desc">{lang === "pt" ? "Open-source · ML · plataforma. Tudo público no GitHub." : "Open-source · ML · platform. All public on GitHub."}</span>
        </div>
        <div className="projects-grid">
          {content.projects.map((p, i) => (
            <div className="project" key={i}>
              <div className="top">
                <div className="name"><span className="slash">/</span>{p.name}</div>
                <div className={"status " + (p.status === "archived" ? "archived" : "")}>
                  {p.status === "archived"
                    ? (lang === "pt" ? "ARQUIVADO" : "ARCHIVED")
                    : "● LIVE"}
                </div>
              </div>
              <p>{p.desc[lang]}</p>
              <div className="stack">
                {p.stack.map((s, j) => <span key={j}>{s}</span>)}
              </div>
              <div className="meta">
                <span>★ <b>{p.meta.stars}</b></span>
                <span>{lang === "pt" ? "ANO" : "YEAR"} <b>{p.meta.year}</b></span>
              </div>
              <div className="ascii">{"</>"}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
