import type { AppIcon, Theme, Language } from "@/types";
import type { MultiLangText } from "@/types";

interface IconGridProps {
  icons: AppIcon[];
  theme: Theme;
  lang: Language;
  onIconPress: (icon: AppIcon) => void;
}

function getLabel(name: MultiLangText, lang: Language): string {
  if (lang === "ur") return name.ur;
  if (lang === "ar" && name.ar) return name.ar;
  return name.en;
}

export default function IconGrid({ icons, theme, lang, onIconPress }: IconGridProps) {
  return (
    <div className="grid grid-cols-5 gap-2.5 px-3 pb-2">
      {icons.map((icon) => (
        <button
          key={icon.id}
          onClick={() => onIconPress(icon)}
          className="crystal-btn flex flex-col items-center justify-center p-2.5 rounded-2xl aspect-square"
          style={{
            background: theme.cardBg,
            border: `1px solid ${theme.borderColor}`,
          }}
        >
          <div className="text-[26px] mb-1 leading-none">
            <i
              className={`${icon.fab ? "fab" : "fas"} ${icon.icon}`}
              style={{ color: icon.color }}
            />
          </div>
          <span
            className="text-[9px] font-medium text-center leading-tight line-clamp-2"
            style={{
              color: theme.textColor,
              opacity: 0.85,
              direction: lang === "ur" || lang === "ar" ? "rtl" : "ltr",
              fontFamily: lang === "ur" ? "'Noto Nastaliq Urdu', serif" : "inherit",
              fontSize: lang === "ur" ? "8px" : "9px",
            }}
          >
            {getLabel(icon.name, lang)}
          </span>
        </button>
      ))}
    </div>
  );
}
