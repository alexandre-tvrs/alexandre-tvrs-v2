import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import type { TerminalLine } from "./types";
import type { Locale } from "../../data/i18n";
import { COMMANDS, resolveCommand } from "./commands";
import { buildOutput } from "./output";
import { ASCII_LOGO } from "./ascii";

interface TerminalProps {
  lang: Locale;
  setLang: (lang: Locale) => void;
  theme: string;
  setTheme: (theme: string) => void;
  mode: string;
  onExit: (() => void) | null;
  embed?: "hero";
}

function PromptLabel() {
  return (
    <span className="ps1">
      <span>alex</span>
      <span className="at">@</span>
      <span className="host">at.dev</span>
      <span className="path">:~</span>
      <span className="arrow"> ▶</span>
    </span>
  );
}

function Line({ line, lang: _lang }: { line: TerminalLine; lang: Locale }) {
  if (line.type === "spacer") return <div style={{ height: 8 }} />;
  if (line.type === "divider") return <pre className="term-line divider">{line.text}</pre>;
  if (line.type === "heading") return <div className="term-line heading">{line.text}</div>;
  if (line.type === "muted") return <pre className="term-line muted">{line.text}</pre>;
  if (line.type === "accent") return <pre className="term-line accent">{line.text}</pre>;
  if (line.type === "cyan") return <pre className="term-line cyan">{line.text}</pre>;
  if (line.type === "error") return <pre className="term-line error">{line.text}</pre>;
  if (line.type === "success") return <pre className="term-line success">{line.text}</pre>;
  if (line.type === "ascii") return <pre className="term-ascii">{line.text}</pre>;
  if (line.type === "table") {
    return (
      <div className="term-table">
        <span className="k">{line.k}</span>
        <span className="v">{line.v}</span>
      </div>
    );
  }
  if (line.type === "project") {
    return (
      <div className="term-card">
        <div className="name">
          /{line.name}{" "}
          {line.status === "archived"
            ? <span style={{ color: "var(--fg-mute)", fontSize: 11 }}>· archived</span>
            : <span style={{ color: "var(--green)", fontSize: 11 }}>· live</span>}
        </div>
        <div className="desc">{line.desc}</div>
        <div className="stack">{line.stack}</div>
      </div>
    );
  }
  if (line.type === "prompt") {
    return (
      <div className="term-line prompt">
        <PromptLabel />
        <span className="cmd">{line.text}</span>
      </div>
    );
  }
  return <pre className="term-line">{line.text}</pre>;
}

export function Terminal({ lang, setLang, theme, setTheme, mode, onExit, embed }: TerminalProps) {
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [booted, setBooted] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const ctx = useMemo(
    () => ({
      lang,
      setLang,
      toggleTheme: () => setTheme(theme === "dark" ? "light" : "dark"),
      clear: () => setHistory([]),
      onExit,
    }),
    [lang, setLang, theme, setTheme, onExit]
  );

  useEffect(() => {
    if (booted) return;
    setBooted(true);
    const bootLines: TerminalLine[] = [
      { type: "muted", text: lang === "pt" ? "iniciando shell · at.dev · v3.0.0" : "starting shell · at.dev · v3.0.0" },
      { type: "muted", text: lang === "pt" ? "carregando ambiente..." : "loading environment..." },
      { type: "success", text: lang === "pt" ? "✓ sessão segura · você está conectado" : "✓ secure session · you are connected" },
      { type: "ascii", text: ASCII_LOGO },
      { type: "muted", text: lang === "pt" ? "digite /ajuda para listar comandos · /lang muda idioma" : "type /help to list commands · /lang switches language" },
      ...(mode === "pure" ? [{ type: "accent" as const, text: lang === "pt" ? "→ digite /entrar para abrir o site visual" : "→ type /enter to open the visual site" }] : []),
      { type: "spacer" },
    ];
    bootLines.forEach((line, i) => {
      setTimeout(() => {
        setHistory((h) => [...h, line]);
      }, 120 * i);
    });
  }, []);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [history]);

  const runCommand = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      if (!trimmed) return;
      const stripped = trimmed.startsWith("/") ? trimmed.slice(1) : trimmed;
      const parts = stripped.split(/\s+/);
      const head = parts[0] ?? "";
      const args = parts.slice(1);
      const cmd = resolveCommand(head);

      setHistory((h) => [...h, { type: "prompt", text: trimmed }]);
      setCmdHistory((ch) => [trimmed, ...ch].slice(0, 30));
      setHistIdx(-1);

      if (cmd === null) {
        setHistory((h) => [
          ...h,
          { type: "error", text: (lang === "pt" ? "comando não encontrado: " : "command not found: ") + head },
          { type: "muted", text: lang === "pt" ? "digite /ajuda" : "type /help" },
          { type: "spacer" },
        ]);
        return;
      }

      const out = buildOutput(cmd, args, ctx);
      if (out) {
        setHistory((h) => [...h, ...out, { type: "spacer" }]);
      }
    },
    [ctx, lang]
  );

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length) {
        const ni = Math.min(histIdx + 1, cmdHistory.length - 1);
        setHistIdx(ni);
        setInput(cmdHistory[ni] ?? "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx <= 0) {
        setHistIdx(-1);
        setInput("");
      } else {
        setHistIdx(histIdx - 1);
        setInput(cmdHistory[histIdx - 1] ?? "");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const q = input.replace(/^\//, "").toLowerCase();
      if (!q) return;
      const all: string[] = [];
      Object.values(COMMANDS).forEach((c) => {
        if (c.hidden) return;
        c.aliases.forEach((a) => { if (a.startsWith(q)) all.push(a); });
      });
      if (all.length === 1) {
        setInput("/" + all[0]);
      } else if (all.length > 1) {
        setHistory((h) => [
          ...h,
          { type: "prompt", text: input },
          { type: "muted", text: all.map((a) => "/" + a).join("  ") },
          { type: "spacer" },
        ]);
      }
    } else if (e.key === "Escape" && onExit) {
      onExit();
    } else if (e.key === "l" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setHistory([]);
    }
  };

  const focusInput = () => inputRef.current?.focus();

  return (
    <div className="terminal" onClick={focusInput} style={embed === "hero" ? { minHeight: 520 } : undefined}>
      <div className="term-head">
        <div className="dots"><span /><span /><span /></div>
        <div className="title">— alex@at.dev : ~/portfolio —</div>
        <div className="badge">● ONLINE</div>
      </div>
      <div className="term-body" ref={bodyRef}>
        {history.map((line, i) => (
          <Line key={i} line={line} lang={lang} />
        ))}
      </div>
      <div className="term-input" onClick={focusInput}>
        <PromptLabel />
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          spellCheck={false}
          autoComplete="off"
          autoFocus
          placeholder={lang === "pt" ? "/ajuda" : "/help"}
        />
      </div>
    </div>
  );
}
