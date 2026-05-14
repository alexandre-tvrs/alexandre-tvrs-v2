export type Locale = "pt" | "en";

export type Translatable<T = string> = { pt: T; en: T };

export const t = <T>(value: T | Translatable<T>, lang: Locale): T =>
  value && typeof value === "object" && "pt" in (value as object)
    ? (value as Translatable<T>)[lang]
    : (value as T);
