import { useState, useEffect, useCallback } from "react";
import type { Locale } from "../data/i18n";

interface Prefs {
  mode: "pure" | "hybrid";
  theme: "dark" | "light";
  lang: Locale;
  fxIntensity: number;
  showSignal: boolean;
}

const DEFAULTS: Prefs = {
  mode: "pure",
  theme: "dark",
  lang: "pt",
  fxIntensity: 1,
  showSignal: true,
};

const KEY = "at_prefs";

function load(): Prefs {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {}
  return { ...DEFAULTS };
}

export function usePrefs() {
  const [prefs, setPrefs] = useState<Prefs>(load);

  const setPref = useCallback(<K extends keyof Prefs>(key: K, val: Prefs[K]) => {
    setPrefs((p) => {
      const next = { ...p, [key]: val };
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", prefs.theme);
  }, [prefs.theme]);

  useEffect(() => {
    document.documentElement.style.setProperty("--fx", String(prefs.fxIntensity));
  }, [prefs.fxIntensity]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const saved = localStorage.getItem(KEY);
    if (!saved) {
      setPref("theme", mq.matches ? "dark" : "light");
    }
  }, []);

  return { prefs, setPref };
}
