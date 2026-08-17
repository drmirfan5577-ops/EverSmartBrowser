import { SOCIAL_ICONS } from "@/data/icons";
import type { Theme, Language } from "@/types";

interface SocialTabProps {
  theme: Theme;
  lang: Language;
}

const TRENDING = [
  { tag: "#SmartWorldOrder", count: "24.5K" },
  { tag: "#IslamicAI", count: "18.2K" },
  { tag: "#QuranDaily", count: "55.1K" },
  { tag: "#Pakistan", count: "102K" },
  { tag: "#TechNews", count: "31.7K" },
];

export default function SocialTab({ theme, lang }: SocialTabProps) {
  const isUrdu = lang === "ur" || lang === "ar";

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4" style={{ color: theme.textColor }}>
        {isUrdu ? "سوشل ہب" : "Social Hub"}
      </h2>

      <div className="grid grid-cols-5 gap-3 mb-6">
        {SOCIAL_ICONS.map((icon) => (
          <button
            key={icon.id}
            onClick={() => window.open(icon.url, "_blank")}
            className="flex flex-col items-center justify-center p-3 rounded-2xl aspect-square transition-all duration-200 hover:scale-105 active:scale-95"
            style={{ background: theme.cardBg, border: `1px solid ${theme.borderColor}` }}
          >
            <i
              className={`fab ${icon.icon} text-[24px] mb-1`}
              style={{ color: icon.color }}
            />
            <span className="text-[9px] text-center leading-tight" style={{ color: theme.textColor, opacity: 0.75 }}>
              {lang === "ur" ? icon.name.ur : icon.name.en}
            </span>
          </button>
        ))}
      </div>

      <div className="p-4 rounded-2xl" style={{ background: theme.cardBg, border: `1px solid ${theme.borderColor}` }}>
        <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: theme.accentColor }}>
          <i className="fas fa-fire" />
          {isUrdu ? "ٹرینڈنگ" : "Trending Now"}
        </h3>
        <div className="space-y-2">
          {TRENDING.map((t, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="text-sm font-medium" style={{ color: theme.textColor }}>{t.tag}</span>
              <span className="text-[11px] px-2 py-0.5 rounded-full" style={{ background: `${theme.accentColor}33`, color: theme.accentColor }}>
                {t.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
