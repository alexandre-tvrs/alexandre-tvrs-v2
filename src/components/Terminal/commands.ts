import type { Translatable } from "../../data/i18n";

export type CommandKey =
  | "help" | "about" | "skills" | "projects" | "experience"
  | "arch" | "contact" | "social" | "lang" | "theme"
  | "clear" | "echo" | "date" | "matrix" | "sudo" | "exit";

export interface CommandDef {
  aliases: string[];
  desc: Translatable;
  hidden?: boolean;
}

export const COMMANDS: Record<CommandKey, CommandDef> = {
  help:       { aliases: ["help", "ajuda", "?", "h"], desc: { pt: "lista comandos", en: "list commands" } },
  about:      { aliases: ["about", "sobre", "whoami"], desc: { pt: "quem é Alexandre", en: "who is Alexandre" } },
  skills:     { aliases: ["skills", "habilidades", "stack"], desc: { pt: "stack técnico", en: "tech stack" } },
  projects:   { aliases: ["projects", "projetos", "ls"], desc: { pt: "projetos em destaque", en: "featured projects" } },
  experience: { aliases: ["experience", "experiencia", "exp", "cv"], desc: { pt: "carreira & timeline", en: "career & timeline" } },
  arch:       { aliases: ["arch", "architecture", "arquitetura", "cloud"], desc: { pt: "arquitetura cloud típica", en: "typical cloud architecture" } },
  contact:    { aliases: ["contact", "contato", "mail"], desc: { pt: "canais de contato", en: "contact channels" } },
  social:     { aliases: ["social", "github", "linkedin"], desc: { pt: "redes sociais", en: "social profiles" } },
  lang:       { aliases: ["lang", "idioma", "i18n"], desc: { pt: "alterna PT ↔ EN", en: "toggle PT ↔ EN" } },
  theme:      { aliases: ["theme", "tema", "mode"], desc: { pt: "alterna dark / light", en: "toggle dark / light" } },
  clear:      { aliases: ["clear", "limpar", "cls"], desc: { pt: "limpa o terminal", en: "clear terminal" } },
  echo:       { aliases: ["echo"], desc: { pt: "ecoa o input", en: "echo input back" }, hidden: true },
  date:       { aliases: ["date", "now"], desc: { pt: "hora atual", en: "current time" }, hidden: true },
  matrix:     { aliases: ["matrix"], desc: { pt: "easter egg", en: "easter egg" }, hidden: true },
  sudo:       { aliases: ["sudo"], desc: { pt: "ah, esperto", en: "nice try" }, hidden: true },
  exit:       { aliases: ["exit", "quit", "sair", "enter", "entrar", "site", "visual"],
                desc: { pt: "abrir site visual (modo hybrid)", en: "open visual site (hybrid mode)" } },
};

export const resolveCommand = (input: string): CommandKey | null => {
  const cmd = input.trim().toLowerCase().replace(/^\//, "").split(/\s+/)[0] ?? "";
  for (const key in COMMANDS) {
    if (COMMANDS[key as CommandKey].aliases.includes(cmd)) return key as CommandKey;
  }
  return null;
};
