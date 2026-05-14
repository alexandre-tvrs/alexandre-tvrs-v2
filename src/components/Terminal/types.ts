export type TerminalLine =
  | { type: "muted" | "accent" | "cyan" | "error" | "success" | "text" | "heading" | "divider" | "ascii"; text: string }
  | { type: "spacer" }
  | { type: "table"; k: string; v: string }
  | { type: "project"; name: string; desc: string; stack: string; status: "live" | "archived" }
  | { type: "prompt"; text: string };
