import type { TerminalLine } from "./types";
import type { CommandKey } from "./commands";
import { COMMANDS } from "./commands";
import type { Locale } from "../../data/i18n";
import { content } from "../../data/content";
import { ARCH_DIAGRAM } from "./ascii";

export interface CommandContext {
  lang: Locale;
  setLang: (lang: Locale) => void;
  toggleTheme: () => void;
  clear: () => void;
  onExit: (() => void) | null;
}

const tr = <T>(obj: T | { pt: T; en: T }, lang: Locale): T =>
  obj && typeof obj === "object" && "pt" in (obj as object)
    ? (obj as { pt: T; en: T })[lang]
    : (obj as T);

export function buildOutput(
  cmd: CommandKey,
  args: string[],
  ctx: CommandContext
): TerminalLine[] | null {
  const L = ctx.lang;

  switch (cmd) {
    case "help": {
      const lines: TerminalLine[] = [
        { type: "muted", text: L === "pt" ? "comandos disponíveis · use / ou prefixo simples" : "available commands · use / or plain prefix" },
        { type: "spacer" },
      ];
      Object.entries(COMMANDS)
        .filter(([, def]) => !def.hidden)
        .forEach(([, def]) => {
          const aliases = def.aliases.slice(0, 3).map((a) => `/${a}`).join(" · ");
          lines.push({ type: "table", k: aliases, v: tr(def.desc, L) });
        });
      lines.push({ type: "spacer" });
      lines.push({
        type: "muted",
        text: L === "pt"
          ? "dica: ↑ histórico · TAB autocomplete · Esc fecha (modo flutuante)"
          : "tip: ↑ history · TAB autocomplete · Esc closes (floating mode)",
      });
      return lines;
    }
    case "about": {
      const paras = content.about.paragraphs[L];
      const lines: TerminalLine[] = [
        { type: "heading", text: L === "pt" ? "// sobre" : "// about" },
        { type: "divider", text: "─".repeat(48) },
      ];
      paras.forEach((p) => {
        lines.push({ type: "text", text: p.replace(/\{([^}]+)\}/g, (_, m: string) => m) });
        lines.push({ type: "spacer" });
      });
      lines.push({ type: "muted", text: L === "pt" ? "→ scroll para a seção /sobre para ver detalhes" : "→ scroll to /about for full details" });
      return lines;
    }
    case "skills": {
      const lines: TerminalLine[] = [
        { type: "heading", text: "// stack" },
        { type: "divider", text: "─".repeat(48) },
      ];
      content.skills.forEach((g) => {
        lines.push({ type: "accent", text: `${tr(g.cat, L)} — ${tr(g.title, L)}` });
        const items = g.items.map((i) => (i.level === 3 ? `●${i.name}` : `○${i.name}`)).join("  ");
        lines.push({ type: "text", text: "  " + items });
        lines.push({ type: "spacer" });
      });
      lines.push({ type: "muted", text: L === "pt" ? "● core · ○ proficiente" : "● core · ○ proficient" });
      return lines;
    }
    case "projects": {
      const lines: TerminalLine[] = [
        { type: "heading", text: L === "pt" ? "// projetos" : "// projects" },
        { type: "divider", text: "─".repeat(48) },
      ];
      content.projects.forEach((p) => {
        lines.push({
          type: "project",
          name: p.name,
          desc: tr(p.desc, L),
          stack: p.stack.join(" · "),
          status: p.status,
        });
      });
      return lines;
    }
    case "experience": {
      const lines: TerminalLine[] = [
        { type: "heading", text: L === "pt" ? "// carreira" : "// career" },
        { type: "divider", text: "─".repeat(48) },
      ];
      content.experience.forEach((e) => {
        lines.push({ type: "accent", text: `[${e.year}]  ${tr(e.role, L)}` });
        lines.push({ type: "muted", text: "  " + tr(e.co, L).replace(/\{([^}]+)\}/g, (_, m: string) => m) });
        lines.push({ type: "text", text: "  " + tr(e.desc, L) });
        tr(e.bullets, L).forEach((b) => lines.push({ type: "cyan", text: "  ▸ " + b }));
        lines.push({ type: "spacer" });
      });
      return lines;
    }
    case "arch": {
      const lines: TerminalLine[] = [
        { type: "heading", text: L === "pt" ? "// arquitetura típica" : "// typical architecture" },
        { type: "divider", text: "─".repeat(48) },
        { type: "ascii", text: ARCH_DIAGRAM },
      ];
      content.architecture.meta.forEach((m) => {
        lines.push({ type: "table", k: tr(m.k, L), v: tr(m.v, L) });
      });
      return lines;
    }
    case "contact": {
      const lines: TerminalLine[] = [
        { type: "heading", text: L === "pt" ? "// contato" : "// contact" },
        { type: "divider", text: "─".repeat(48) },
      ];
      content.contact.channels.forEach((c) => {
        lines.push({ type: "table", k: c.k, v: c.v });
      });
      lines.push({ type: "spacer" });
      lines.push({ type: "muted", text: tr(content.contact.sub, L) });
      return lines;
    }
    case "social":
      return [
        { type: "accent", text: "GitHub   github.com/alexandre-tvrs" },
        { type: "accent", text: "LinkedIn linkedin.com/in/dev-alexandre-tavares" },
        { type: "accent", text: "Email    alexandre@datadev.tech" },
      ];
    case "lang":
      ctx.setLang(L === "pt" ? "en" : "pt");
      return [{ type: "success", text: L === "pt" ? "→ language: english" : "→ idioma: português" }];
    case "theme":
      ctx.toggleTheme();
      return [{ type: "success", text: L === "pt" ? "→ tema alternado" : "→ theme toggled" }];
    case "clear":
      ctx.clear();
      return null;
    case "echo":
      return [{ type: "text", text: args.join(" ") || " " }];
    case "date":
      return [{ type: "muted", text: new Date().toString() }];
    case "matrix":
      return [
        { type: "accent", text: "wake up, Neo..." },
        { type: "ascii", text: "01001000 01100101 01101100 01101100 01101111\n01010111 01101111 01110010 01101100 01100100" },
      ];
    case "sudo":
      return [{ type: "error", text: L === "pt" ? "permission denied · você não está na sudoers (mas tente /contato)" : "permission denied · you're not in sudoers (try /contact)" }];
    case "exit":
      if (ctx.onExit) ctx.onExit();
      return [{ type: "success", text: L === "pt" ? "→ carregando interface visual..." : "→ loading visual interface..." }];
    default:
      return [
        { type: "error", text: (L === "pt" ? "comando não encontrado: " : "command not found: ") + (args[0] ? args.join(" ") : cmd) },
        { type: "muted", text: L === "pt" ? "digite /ajuda para ver comandos" : "type /help to see commands" },
      ];
  }
}
