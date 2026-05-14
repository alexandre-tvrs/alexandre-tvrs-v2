import { content } from "../../data/content";
import type { Locale } from "../../data/i18n";
import { t } from "../../data/i18n";

export function Architecture({ lang }: { lang: Locale }) {
  return (
    <section data-screen-label="07 Architecture">
      <div className="container">
        <div className="sec-head">
          <span className="idx">06 / 07</span>
          <h3>{lang === "pt" ? "Arquitetura" : "Architecture"}</h3>
          <span className="desc">{lang === "pt" ? "Padrão cloud-native que entrego — multi-região, multi-tenant." : "Cloud-native pattern I ship — multi-region, multi-tenant."}</span>
        </div>
        <div className="arch">
          <div className="arch-grid">
            {content.architecture.layers.map((l, i) => (
              <>
                <div className="arch-node" key={i}>
                  <div className="ico">{l.ico}</div>
                  <div className="name">{l.name[lang]}</div>
                  <div className="svc">{l.svc}</div>
                </div>
                {i < content.architecture.layers.length - 1 && (
                  <div className="arch-arrow" key={`a-${i}`}>▶</div>
                )}
              </>
            ))}
          </div>
          <div className="arch-meta">
            {content.architecture.meta.map((m, i) => (
              <div className="m" key={i}>
                <div className="k">{t(m.k, lang)}</div>
                <div className="v">{t(m.v, lang)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
