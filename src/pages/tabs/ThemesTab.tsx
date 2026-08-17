import { THEMES } from "@/data/themes";
import type { Theme, Language } from "@/types";

interface ThemesTabProps {
  theme: Theme;
  currentThemeId: string;
  onThemeChange: (id: string) => void;
  lang: Language;
}

export default function ThemesTab({ theme, currentThemeId, onThemeChange, lang }: ThemesTabProps) {
  const isUrdu = lang === "ur" || lang === "ar";
  const lightThemes = THEMES.filter(t => t.mode === "light");
  const darkThemes = THEMES.filter(t => t.mode === "dark");

  return (
    <div className="p-4">
      <div className="text-center mb-5">
        <h2 className="text-lg font-bold" style={{ color: theme.textColor }}>
          {isUrdu ? "تھیمز اور فلٹرز" : "Themes & Filters"}
        </h2>
        <p className="text-xs opacity-50 mt-1" style={{ color: theme.textColor }}>
          {isUrdu ? `${THEMES.length} تھیمز دستیاب` : `${THEMES.length} themes available`}
        </p>
      </div>

      <div className="flex gap-2 mb-4">
        {["All", "Light", "Dark"].map((filter) => (
          <button
            key={filter}
            className="flex-1 py-2 rounded-full text-xs font-semibold transition-all"
            style={{
              background: filter === "All" ? theme.accentColor : theme.cardBg,
              color: filter === "All" ? (theme.mode === "light" ? "#000" : "#fff") : theme.textColor,
              border: `1px solid ${theme.borderColor}`,
            }}
          >
            {filter === "All" ? (isUrdu ? "سب" : "All") : filter === "Light" ? (isUrdu ? "روشن" : "Light ☀️") : (isUrdu ? "تاریک" : "Dark 🌙")}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {THEMES.map((t) => {
          const isActive = t.id === currentThemeId;
          return (
            <button
              key={t.id}
              onClick={() => onThemeChange(t.id)}
              className="w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
              style={{
                background: t.bgGradient,
                border: isActive ? `2px solid ${t.accentColor}` : `1px solid ${t.borderColor}`,
                boxShadow: isActive ? `0 0 20px ${t.accentColor}44` : "none",
              }}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{t.emoji}</span>
                <div className="text-left">
                  <div className="font-bold text-sm" style={{ color: t.textColor }}>{t.name}</div>
                  <div className="text-[11px] opacity-70" style={{ color: t.textColor, direction: "rtl", fontFamily: "'Noto Nastaliq Urdu', serif" }}>
                    {t.nameUr}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                  style={{
                    background: t.mode === "dark" ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.5)",
                    color: t.textColor,
                  }}
                >
                  {t.mode}
                </span>
                {isActive && (
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: t.accentColor }}
                  >
                    <i className="fas fa-check text-[9px] text-white" />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
