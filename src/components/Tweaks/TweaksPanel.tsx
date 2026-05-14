import { useState, useRef, useCallback, useEffect } from "react";
import type { Locale } from "../../data/i18n";

interface TweaksPanelProps {
  lang: Locale;
  mode: string;
  setMode: (v: "pure" | "hybrid") => void;
  langVal: Locale;
  setLang: (v: Locale) => void;
  theme: string;
  setTheme: (v: string) => void;
  fxIntensity: number;
  setFxIntensity: (v: number) => void;
  showSignal: boolean;
  setShowSignal: (v: boolean) => void;
}

export function TweaksPanel({
  lang,
  mode, setMode,
  langVal, setLang,
  theme, setTheme,
  fxIntensity, setFxIntensity,
  showSignal, setShowSignal,
}: TweaksPanelProps) {
  const [open, setOpen] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef({ x: 16, y: 72 });
  const PAD = 16;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "t" && !(e.target as HTMLElement).closest("input, textarea")) {
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const clamp = useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth, h = panel.offsetHeight;
    offsetRef.current = {
      x: Math.min(Math.max(PAD, offsetRef.current.x), Math.max(PAD, window.innerWidth - w - PAD)),
      y: Math.min(Math.max(PAD, offsetRef.current.y), Math.max(PAD, window.innerHeight - h - PAD)),
    };
    panel.style.right = offsetRef.current.x + "px";
    panel.style.bottom = offsetRef.current.y + "px";
  }, []);

  useEffect(() => {
    if (!open) return;
    clamp();
    const ro = new ResizeObserver(clamp);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clamp]);

  const onDragStart = (e: React.MouseEvent) => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX, sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = (ev: MouseEvent) => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy),
      };
      clamp();
    };
    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          position: "fixed",
          bottom: 24,
          left: 24,
          zIndex: 60,
          background: "var(--bg-card)",
          border: "1px solid var(--line-bright)",
          color: "var(--fg-dim)",
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          padding: "6px 12px",
          cursor: "pointer",
          letterSpacing: "0.06em",
        }}
        title={lang === "pt" ? "Tweaks (t)" : "Tweaks (t)"}
      >
        ⚙ tweaks
      </button>

      {open && (
        <div
          ref={dragRef}
          style={{
            position: "fixed",
            right: offsetRef.current.x,
            bottom: offsetRef.current.y,
            zIndex: 80,
            width: 280,
            maxHeight: "calc(100vh - 32px)",
            display: "flex",
            flexDirection: "column",
            background: "rgba(13,13,14,0.92)",
            border: "1px solid var(--line-bright)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: "var(--fg)",
            overflowY: "auto",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderBottom: "1px solid var(--line)", cursor: "move", userSelect: "none" }}
            onMouseDown={onDragStart}
          >
            <b style={{ color: "var(--neon)", letterSpacing: "0.1em" }}>TWEAKS</b>
            <button
              style={{ background: "transparent", border: "none", color: "var(--fg-mute)", cursor: "pointer", fontSize: 14, padding: "0 4px" }}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={() => setOpen(false)}
            >✕</button>
          </div>

          <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: 14 }}>
            <Section label={lang === "pt" ? "MODO & IDIOMA" : "MODE & LANGUAGE"}>
              <RadioRow
                label={lang === "pt" ? "Layout" : "Layout"}
                value={mode}
                options={[{ v: "hybrid", l: "Hybrid" }, { v: "pure", l: "Pure CLI" }]}
                onChange={(v) => setMode(v as "pure" | "hybrid")}
              />
              <RadioRow
                label={lang === "pt" ? "Idioma" : "Language"}
                value={langVal}
                options={[{ v: "pt", l: "PT" }, { v: "en", l: "EN" }]}
                onChange={(v) => setLang(v as Locale)}
              />
              <RadioRow
                label={lang === "pt" ? "Tema" : "Theme"}
                value={theme}
                options={[{ v: "dark", l: "Dark" }, { v: "light", l: "Light" }]}
                onChange={setTheme}
              />
            </Section>

            <Section label={lang === "pt" ? "EFEITOS VISUAIS" : "VISUAL EFFECTS"}>
              <SliderRow
                label={lang === "pt" ? "Intensidade FX" : "FX Intensity"}
                value={fxIntensity}
                min={0}
                max={1.5}
                step={0.05}
                onChange={setFxIntensity}
              />
              <ToggleRow
                label={lang === "pt" ? "Faixa de sinal" : "Signal strip"}
                value={showSignal}
                onChange={setShowSignal}
              />
            </Section>

            <Section label={lang === "pt" ? "ATALHOS" : "SHORTCUTS"}>
              <div style={{ fontSize: 11, color: "var(--fg-dim)", lineHeight: 1.7 }}>
                <div><b style={{ color: "var(--neon)" }}>~</b> · {lang === "pt" ? "abrir terminal flutuante" : "open floating terminal"}</div>
                <div><b style={{ color: "var(--neon)" }}>Esc</b> · {lang === "pt" ? "fechar terminal" : "close terminal"}</div>
                <div><b style={{ color: "var(--neon)" }}>t</b> · {lang === "pt" ? "abrir/fechar tweaks" : "open/close tweaks"}</div>
                <div><b style={{ color: "var(--neon)" }}>/help</b> · {lang === "pt" ? "ver comandos" : "see commands"}</div>
              </div>
            </Section>
          </div>
        </div>
      )}
    </>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ fontSize: 10, letterSpacing: "0.1em", color: "var(--fg-mute)", marginBottom: 8, textTransform: "uppercase" }}>{label}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{children}</div>
    </div>
  );
}

function RadioRow({ label, value, options, onChange }: { label: string; value: string; options: { v: string; l: string }[]; onChange: (v: string) => void }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
      <span style={{ color: "var(--fg-dim)", fontSize: 11, flexShrink: 0 }}>{label}</span>
      <div style={{ display: "flex", gap: 4 }}>
        {options.map((o) => (
          <button
            key={o.v}
            onClick={() => onChange(o.v)}
            style={{
              background: value === o.v ? "var(--neon)" : "transparent",
              color: value === o.v ? "var(--bg)" : "var(--fg-dim)",
              border: "1px solid " + (value === o.v ? "var(--neon)" : "var(--line-bright)"),
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              padding: "3px 8px",
              cursor: "pointer",
              letterSpacing: "0.05em",
            }}
          >
            {o.l}
          </button>
        ))}
      </div>
    </div>
  );
}

function SliderRow({ label, value, min, max, step, onChange }: { label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", color: "var(--fg-dim)", fontSize: 11, marginBottom: 4 }}>
        <span>{label}</span>
        <span style={{ color: "var(--neon)" }}>{value.toFixed(2)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: "100%", accentColor: "var(--neon)" }}
      />
    </div>
  );
}

function ToggleRow({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <span style={{ color: "var(--fg-dim)", fontSize: 11 }}>{label}</span>
      <button
        onClick={() => onChange(!value)}
        style={{
          width: 32,
          height: 18,
          borderRadius: 999,
          background: value ? "var(--green)" : "var(--line-bright)",
          border: "none",
          cursor: "pointer",
          position: "relative",
          transition: "background 0.15s",
        }}
      >
        <span style={{
          position: "absolute",
          top: 2,
          left: value ? 14 : 2,
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: "#fff",
          transition: "left 0.15s",
        }} />
      </button>
    </div>
  );
}
