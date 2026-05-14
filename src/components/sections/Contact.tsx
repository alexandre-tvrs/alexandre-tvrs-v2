import { content } from "../../data/content";
import type { Locale } from "../../data/i18n";

export function Contact({ lang }: { lang: Locale }) {
  return (
    <section data-screen-label="08 Contact">
      <div className="container">
        <div className="sec-head">
          <span className="idx">07 / 07</span>
          <h3>{lang === "pt" ? "Contato" : "Contact"}</h3>
          <span className="desc">{lang === "pt" ? "A conversa começa em qualquer canal abaixo." : "Conversation starts on any channel below."}</span>
        </div>
        <div className="contact">
          <div>
            <h3>
              {content.contact.title[lang][0]}<br />
              {content.contact.title[lang][1]?.split(/(\{[^}]+\})/).map((p, i) => {
                if (p.startsWith("{")) return <span className="accent" key={i}>{p.slice(1, -1)}</span>;
                return <span key={i}>{p}</span>;
              })}
            </h3>
            <p className="sub">{content.contact.sub[lang]}</p>
          </div>
          <div className="channels">
            {content.contact.channels.map((c, i) => (
              <a className="channel" key={i} href={c.href}>
                <span className="k">{c.k}</span>
                <span>{c.v}</span>
                <span className="arrow">↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
