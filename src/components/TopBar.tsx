import { useState, useEffect } from "react";
import type { Locale } from "../data/i18n";

interface TopBarProps {
  lang: Locale;
  setLang: (lang: Locale) => void;
  theme: string;
  setTheme: (theme: string) => void;
  mode: string;
  setMode: (mode: "pure" | "hybrid") => void;
}

function getUTCTime() {
  const now = new Date();
  return `${String(now.getUTCHours()).padStart(2, "0")}:${String(now.getUTCMinutes()).padStart(2, "0")} UTC`;
}

const NAV_ITEMS = {
  pt: [
    { id: "about", label: "sobre" },
    { id: "skills", label: "stack" },
    { id: "projects", label: "projetos" },
    { id: "experience", label: "carreira" },
    { id: "demos", label: "data&dev" },
    { id: "arch", label: "cloud" },
    { id: "contact", label: "contato" },
  ],
  en: [
    { id: "about", label: "about" },
    { id: "skills", label: "stack" },
    { id: "projects", label: "projects" },
    { id: "experience", label: "career" },
    { id: "demos", label: "data&dev" },
    { id: "arch", label: "cloud" },
    { id: "contact", label: "contact" },
  ],
};

export function TopBar({ lang, setLang, theme, setTheme, mode, setMode }: TopBarProps) {
  const [time, setTime] = useState(getUTCTime);

  useEffect(() => {
    const id = setInterval(() => setTime(getUTCTime()), 60_000);
    return () => clearInterval(id);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="topbar">
      <div className="logo">
        <span className="dot" />
        <span>at.dev</span>
      </div>
      <div className="meta">
        <b>SP</b> · <b>UTC-3</b> · {lang === "pt" ? "disponível para colabs" : "open to collabs"}
      </div>
      <div className="spacer" />
      {mode === "hybrid" && (
        <div className="nav">
          {NAV_ITEMS[lang].map((n) => (
            <button key={n.id} onClick={() => scrollTo(n.id)}>{n.label}</button>
          ))}
        </div>
      )}
      <div className="ctrl">
        <button onClick={() => setLang(lang === "pt" ? "en" : "pt")}>
          {lang === "pt" ? "PT · EN" : "EN · PT"}
        </button>
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? "◐" : "◑"}
        </button>
        <button onClick={() => setMode(mode === "hybrid" ? "pure" : "hybrid")}>
          {mode === "hybrid" ? "[hybrid]" : "[pure cli]"}
        </button>
      </div>
      <div className="status">
        <span className="live" />
        <span>{time}</span>
      </div>
    </div>
  );
}
