import { content } from "../../data/content";
import type { Locale } from "../../data/i18n";

export function SignalStrip({ lang }: { lang: Locale }) {
  const items = content.signal[lang];
  const dup = [...items, ...items, ...items];
  return (
    <div className="signal-strip">
      <div className="track">
        {dup.map((it, i) => (
          <span key={i}>
            <span className="sep">◆</span> {it}
          </span>
        ))}
      </div>
    </div>
  );
}
