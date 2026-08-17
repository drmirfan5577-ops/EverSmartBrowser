import { useState } from "react";
import type { Theme, Language } from "@/types";

interface SearchBarProps {
  theme: Theme;
  lang: Language;
}

export default function SearchBar({ theme, lang }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const placeholder = lang === "ur"
    ? "گوگل پر تلاش کریں یا URL درج کریں..."
    : lang === "ar"
    ? "ابحث في Google أو أدخل عنوان URL..."
    : "Search Google or enter URL...";

  const handleSearch = () => {
    if (!query.trim()) return;
    const isUrl = query.startsWith("http") || query.includes(".");
    const url = isUrl ? (query.startsWith("http") ? query : `https://${query}`) : `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    window.open(url, "_blank");
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="px-4 mb-4">
      <div
        className="flex items-center px-4 py-3 gap-3 rounded-full max-w-2xl mx-auto"
        style={{
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(20px)",
          border: `1px solid ${theme.borderColor}`,
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        }}
      >
        <button onClick={handleSearch}>
          <i className="fas fa-search text-sm opacity-60" style={{ color: theme.textColor }} />
        </button>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKey}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-[14px] placeholder:opacity-50"
          style={{
            color: theme.textColor,
            direction: lang === "ur" || lang === "ar" ? "rtl" : "ltr",
          }}
        />
        <button className="opacity-60 hover:opacity-100 transition-opacity">
          <i className="fas fa-microphone text-base" style={{ color: theme.textColor }} />
        </button>
        <button
          onClick={handleSearch}
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs"
          style={{ background: `linear-gradient(135deg, ${theme.accentColor}, #3b82f6)` }}
        >
          <i className="fas fa-arrow-right text-[11px]" />
        </button>
      </div>
    </div>
  );
}
