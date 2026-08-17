import type { Language, Theme } from "@/types";

interface LangToggleProps {
  lang: Language;
  onToggle: () => void;
  theme: Theme;
}

const LABELS: Record<Language, string> = { en: "EN", ur: "UR", ar: "AR" };

export default function LangToggle({ lang, onToggle, theme }: LangToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="fixed top-24 right-3 z-50 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shadow-lg transition-all duration-200 hover:scale-110 active:scale-95"
      style={{
        background: `linear-gradient(135deg, ${theme.accentColor}cc, ${theme.accentColor}66)`,
        border: `1px solid ${theme.accentColor}`,
        color: theme.mode === "light" ? "#000" : "#fff",
        boxShadow: `0 0 12px ${theme.accentColor}44`,
        fontFamily: "'Orbitron', monospace",
      }}
    >
      {LABELS[lang]}
    </button>
  );
}
