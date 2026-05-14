import { useState, useEffect } from "react";
import { content } from "../../data/content";
import type { Locale } from "../../data/i18n";
import { Terminal } from "../Terminal/Terminal";

interface HeroProps {
  lang: Locale;
  terminalProps: {
    lang: Locale;
    setLang: (lang: Locale) => void;
    theme: string;
    setTheme: (theme: string) => void;
    mode: string;
    onExit: (() => void) | null;
  };
}

export function Hero({ lang, terminalProps }: HeroProps) {
  const [typed, setTyped] = useState("");
  const target = content.hero.sub[lang];

  useEffect(() => {
    setTyped("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(target.slice(0, i));
      if (i >= target.length) clearInterval(id);
    }, 18);
    return () => clearInterval(id);
  }, [target]);

  const subRendered = (() => {
    const parts = typed.split(/(\{[^}]+\})/);
    return parts.map((p, i) => {
      if (p.startsWith("{") && p.endsWith("}")) {
        return <span className="kw" key={i}>{p.slice(1, -1)}</span>;
      }
      return <span key={i}>{p}</span>;
    });
  })();

  return (
    <section className="hero" data-screen-label="01 Hero">
      <div className="container" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 1fr)", gap: 48, alignItems: "center", width: "100%" }}>
        <div className="hero-left">
          <div className="tag">{content.hero.tag[lang]}</div>
          <h1>
            {content.hero.title[lang][0]}{" "}
            <span className="accent">{content.hero.title[lang][1]}</span>
          </h1>
          <h2>
            {subRendered}
            <span style={{ display: "inline-block", width: 8, height: 18, background: "var(--neon)", marginLeft: 4, verticalAlign: "middle", animation: "blink 1s steps(2) infinite" }} />
          </h2>
          <div className="hero-stats">
            {content.hero.stats.map((s, i) => (
              <div className="stat" key={i}>
                <div className="num">{s.num}</div>
                <div className="lbl">{s.lbl[lang]}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-right" style={{ minWidth: 0 }}>
          <Terminal {...terminalProps} embed="hero" />
        </div>
      </div>
    </section>
  );
}
