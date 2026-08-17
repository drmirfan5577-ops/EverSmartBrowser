import { AI_ICONS } from "@/data/icons";
import IconGrid from "@/components/features/IconGrid";
import type { Theme, Language, AppIcon } from "@/types";

interface AITabProps {
  theme: Theme;
  lang: Language;
}

const AI_CATEGORIES = [
  { icon: "fa-comments", label: "Chat AI", labelUr: "چیٹ اے آئی", color: "#10a37f" },
  { icon: "fa-image", label: "Image AI", labelUr: "تصویر اے آئی", color: "#a855f7" },
  { icon: "fa-video", label: "Video AI", labelUr: "ویڈیو اے آئی", color: "#e74c3c" },
  { icon: "fa-code", label: "Code AI", labelUr: "کوڈ اے آئی", color: "#0ea5e9" },
  { icon: "fa-microphone", label: "Voice AI", labelUr: "آواز اے آئی", color: "#f59e0b" },
  { icon: "fa-wand-magic-sparkles", label: "Creative AI", labelUr: "تخلیقی اے آئی", color: "#ec4899" },
];

export default function AITab({ theme, lang }: AITabProps) {
  const isUrdu = lang === "ur" || lang === "ar";

  const handleIconPress = (icon: AppIcon) => {
    if (icon.url) window.open(icon.url, "_blank");
  };

  return (
    <div className="p-4">
      <div className="text-center mb-5">
        <div className="text-2xl font-bold mb-1" style={{ color: theme.accentColor }}>
          <i className="fas fa-robot mr-2" />
          {isUrdu ? "اے آئی ہب" : "A.I. Hub"}
        </div>
        <p className="text-xs opacity-60" style={{ color: theme.textColor }}>
          {isUrdu ? "مستقبل کے اے آئی ٹولز" : "Cutting-edge AI tools at your fingertips"}
        </p>
      </div>

      {/* AI Categories */}
      <div className="grid grid-cols-3 gap-2 mb-5">
        {AI_CATEGORIES.map((cat) => (
          <div
            key={cat.label}
            className="flex flex-col items-center justify-center p-3 rounded-2xl gap-1.5"
            style={{ background: theme.cardBg, border: `1px solid ${theme.borderColor}` }}
          >
            <i className={`fas ${cat.icon} text-xl`} style={{ color: cat.color }} />
            <span className="text-[10px] font-medium text-center leading-tight" style={{ color: theme.textColor }}>
              {isUrdu ? cat.labelUr : cat.label}
            </span>
          </div>
        ))}
      </div>

      <h3 className="text-sm font-semibold mb-3 opacity-70" style={{ color: theme.textColor }}>
        {isUrdu ? "سرفہرست اے آئی ٹولز" : "Top AI Tools"}
      </h3>
      <IconGrid icons={AI_ICONS} theme={theme} lang={lang} onIconPress={handleIconPress} />
    </div>
  );
}
