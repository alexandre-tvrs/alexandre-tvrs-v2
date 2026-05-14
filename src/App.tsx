import { useState, useEffect, useMemo, useCallback } from "react";
import { usePrefs } from "./hooks/usePrefs";
import { BackgroundFX } from "./components/BackgroundFX";
import { TopBar } from "./components/TopBar";
import { Terminal } from "./components/Terminal/Terminal";
import { TweaksPanel } from "./components/Tweaks/TweaksPanel";
import { Hero } from "./components/sections/Hero";
import { SignalStrip } from "./components/sections/SignalStrip";
import { About } from "./components/sections/About";
import { Skills } from "./components/sections/Skills";
import { Projects } from "./components/sections/Projects";
import { Experience } from "./components/sections/Experience";
import { AIDemos } from "./components/sections/AIDemos";
import { Architecture } from "./components/sections/Architecture";
import { Contact } from "./components/sections/Contact";
import type { Locale } from "./data/i18n";

export default function App() {
  const { prefs, setPref } = usePrefs();
  const [floatingOpen, setFloatingOpen] = useState(false);

  const setLang = useCallback((v: Locale) => setPref("lang", v), [setPref]);
  const setTheme = useCallback((v: string) => setPref("theme", v as "dark" | "light"), [setPref]);
  const setMode = useCallback((v: "pure" | "hybrid") => setPref("mode", v), [setPref]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tgt = e.target as HTMLElement;
      const isInput = tgt && (tgt.tagName === "INPUT" || tgt.tagName === "TEXTAREA" || tgt.isContentEditable);
      if ((e.key === "`" || e.key === "~") && !isInput) {
        e.preventDefault();
        setFloatingOpen((o) => !o);
      }
      if (e.key === "Escape" && floatingOpen) setFloatingOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [floatingOpen]);

  const terminalProps = useMemo(
    () => ({
      lang: prefs.lang,
      setLang,
      theme: prefs.theme,
      setTheme,
      mode: prefs.mode,
      onExit: prefs.mode === "pure" ? () => setMode("hybrid") : null,
    }),
    [prefs.lang, prefs.theme, prefs.mode, setLang, setTheme, setMode]
  );

  return (
    <>
      <BackgroundFX />
      <TopBar
        lang={prefs.lang}
        setLang={setLang}
        theme={prefs.theme}
        setTheme={setTheme}
        mode={prefs.mode}
        setMode={setMode}
      />

      <main>
        {prefs.mode === "pure" ? (
          <div className="pure-mode">
            <Terminal {...terminalProps} />
            <button
              className="skip-pure"
              onClick={() => setMode("hybrid")}
              title={prefs.lang === "pt" ? "Pular para o site visual" : "Skip to visual site"}
            >
              {prefs.lang === "pt" ? "pular intro" : "skip intro"} <span>▸</span>
            </button>
          </div>
        ) : (
          <>
            <div id="hero"><Hero lang={prefs.lang} terminalProps={terminalProps} /></div>
            {prefs.showSignal && <SignalStrip lang={prefs.lang} />}
            <div id="about"><About lang={prefs.lang} /></div>
            <div id="skills"><Skills lang={prefs.lang} /></div>
            <div id="projects"><Projects lang={prefs.lang} /></div>
            <div id="experience"><Experience lang={prefs.lang} /></div>
            <div id="demos"><AIDemos lang={prefs.lang} /></div>
            <div id="arch"><Architecture lang={prefs.lang} /></div>
            <div id="contact"><Contact lang={prefs.lang} /></div>
            <footer>
              <div className="left">
                <span>© {new Date().getFullYear()} Alexandre Tavares</span>
                <span>·</span>
                <span>{prefs.lang === "pt" ? "construído com obsessão" : "built with obsession"}</span>
              </div>
              <div>
                <span className="build">● build · passed</span>
                <span style={{ margin: "0 12px" }}>·</span>
                <span>v3.0.0 · {new Date().toISOString().slice(0, 10)}</span>
              </div>
            </footer>
          </>
        )}
      </main>

      {prefs.mode === "hybrid" && !floatingOpen && (
        <button className="term-trigger" onClick={() => setFloatingOpen(true)}>
          <span>▸ terminal</span>
          <span className="kbd">~</span>
        </button>
      )}

      {floatingOpen && prefs.mode === "hybrid" && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(6px)",
            zIndex: 70,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setFloatingOpen(false); }}
        >
          <div style={{ width: "100%", maxWidth: 880, height: "80vh", display: "flex" }}>
            <Terminal {...terminalProps} onExit={() => setFloatingOpen(false)} />
          </div>
        </div>
      )}

      <TweaksPanel
        lang={prefs.lang}
        mode={prefs.mode}
        setMode={setMode}
        langVal={prefs.lang}
        setLang={setLang}
        theme={prefs.theme}
        setTheme={setTheme}
        fxIntensity={prefs.fxIntensity}
        setFxIntensity={(v) => setPref("fxIntensity", v)}
        showSignal={prefs.showSignal}
        setShowSignal={(v) => setPref("showSignal", v)}
      />
    </>
  );
}
