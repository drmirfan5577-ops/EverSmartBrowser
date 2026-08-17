import { useState } from "react";
import { THEMES } from "@/data/themes";
import type { Theme, Language, CustomTheme } from "@/types";
import ThemeBuilder from "@/components/features/ThemeBuilder";

interface ThemesTabProps {
  theme: Theme;
  currentThemeId: string;
  onThemeChange: (id: string) => void;
  lang: Language;
  customThemes?: CustomTheme[];
  onSaveCustomTheme?: (ct: CustomTheme) => void;
  onDeleteCustomTheme?: (id: string) => void;
  onExportTheme?: (t: Theme) => void;
}

export default function ThemesTab({
  theme, currentThemeId, onThemeChange, lang,
  customThemes = [], onSaveCustomTheme, onDeleteCustomTheme, onExportTheme,
}: ThemesTabProps) {
  const isUrdu = lang !== "en";
  const [filter, setFilter] = useState<"all" | "light" | "dark" | "custom">("all");
  const [showBuilder, setShowBuilder] = useState(false);
  const [editTheme, setEditTheme] = useState<CustomTheme | null>(null);

  const allThemes = [...THEMES, ...customThemes];

  const filtered = allThemes.filter(t => {
    if (filter === "custom") return (t as CustomTheme).isCustom;
    if (filter === "light") return t.mode === "light";
    if (filter === "dark") return t.mode === "dark";
    return true;
  });

  const FILTERS = [
    { id: "all", label: isUrdu ? "سب" : "All", labelShort: `${allThemes.length}` },
    { id: "dark", label: isUrdu ? "تاریک 🌙" : "Dark 🌙", labelShort: `${allThemes.filter(t => t.mode === "dark").length}` },
    { id: "light", label: isUrdu ? "روشن ☀️" : "Light ☀️", labelShort: `${allThemes.filter(t => t.mode === "light").length}` },
    { id: "custom", label: isUrdu ? "کسٹم 🎨" : "Custom 🎨", labelShort: `${customThemes.length}` },
  ];

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold" style={{ color: theme.textColor }}>
            {isUrdu ? "تھیمز اور فلٹرز" : "Themes & Filters"}
          </h2>
          <p className="text-xs opacity-50 mt-0.5" style={{ color: theme.textColor }}>
            {allThemes.length} {isUrdu ? "تھیمز" : "themes"} · {customThemes.length} {isUrdu ? "کسٹم" : "custom"}
          </p>
        </div>
        <button
          onClick={() => { setEditTheme(null); setShowBuilder(true); }}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold"
          style={{ background: `${theme.accentColor}33`, border: `1px solid ${theme.accentColor}66`, color: theme.accentColor }}>
          <i className="fas fa-plus" />
          {isUrdu ? "نئی تھیم" : "New Theme"}
        </button>
      </div>

      {/* Filter Pills */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {FILTERS.map(f => (
          <button key={f.id} onClick={() => setFilter(f.id as typeof filter)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap flex-shrink-0 transition-all"
            style={{
              background: filter === f.id ? theme.accentColor : theme.cardBg,
              color: filter === f.id ? (theme.mode === "light" ? "#000" : "#fff") : theme.textColor,
              border: `1px solid ${filter === f.id ? theme.accentColor : theme.borderColor}`,
            }}>
            {f.label}
            <span className="text-[9px] opacity-60 ml-0.5">({f.labelShort})</span>
          </button>
        ))}
      </div>

      {/* Theme List */}
      <div className="space-y-2">
        {filtered.map((t) => {
          const isActive = t.id === currentThemeId;
          const isCustom = (t as CustomTheme).isCustom;

          return (
            <div key={t.id} className="relative rounded-2xl overflow-hidden">
              <button
                onClick={() => onThemeChange(t.id)}
                className="w-full flex items-center justify-between p-4 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
                style={{
                  background: t.bgGradient,
                  border: isActive ? `2px solid ${t.accentColor}` : `1px solid ${t.borderColor}`,
                  boxShadow: isActive ? `0 0 20px ${t.accentColor}44` : "none",
                }}>
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
                  {isCustom && (
                    <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-white/20 text-white">CUSTOM</span>
                  )}
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                    style={{ background: t.mode === "dark" ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.5)", color: t.textColor }}>
                    {t.mode}
                  </span>
                  {isActive && (
                    <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: t.accentColor }}>
                      <i className="fas fa-check text-[9px] text-white" />
                    </div>
                  )}
                </div>
              </button>

              {/* Custom theme actions */}
              {isCustom && (
                <div className="absolute top-2 right-12 flex gap-1">
                  <button
                    onClick={e => { e.stopPropagation(); setEditTheme(t as CustomTheme); setShowBuilder(true); }}
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] bg-white/20 text-white hover:bg-white/30">
                    <i className="fas fa-pen" />
                  </button>
                  {onExportTheme && (
                    <button
                      onClick={e => { e.stopPropagation(); onExportTheme(t); }}
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] bg-white/20 text-white hover:bg-white/30">
                      <i className="fas fa-download" />
                    </button>
                  )}
                  {onDeleteCustomTheme && (
                    <button
                      onClick={e => { e.stopPropagation(); onDeleteCustomTheme(t.id); }}
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] bg-red-500/40 text-white hover:bg-red-500/60">
                      <i className="fas fa-trash" />
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty custom state */}
      {filter === "custom" && customThemes.length === 0 && (
        <div className="text-center py-10">
          <div className="text-4xl mb-3">🎨</div>
          <p className="text-sm opacity-50" style={{ color: theme.textColor }}>
            {isUrdu ? "ابھی تک کوئی کسٹم تھیم نہیں" : "No custom themes yet"}
          </p>
          <button onClick={() => { setEditTheme(null); setShowBuilder(true); }}
            className="mt-3 px-4 py-2 rounded-xl text-sm font-bold"
            style={{ background: theme.accentColor, color: theme.mode === "light" ? "#000" : "#fff" }}>
            {isUrdu ? "پہلی تھیم بنائیں" : "Create First Theme"}
          </button>
        </div>
      )}

      {/* Theme Builder */}
      {showBuilder && onSaveCustomTheme && (
        <ThemeBuilder
          theme={theme}
          lang={lang}
          onSave={onSaveCustomTheme}
          onClose={() => { setShowBuilder(false); setEditTheme(null); }}
          editTheme={editTheme}
        />
      )}
    </div>
  );
}
