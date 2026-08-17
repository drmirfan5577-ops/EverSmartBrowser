import { useState } from "react";
import type { Theme, Language } from "@/types";

interface BrowserTabProps {
  theme: Theme;
  lang: Language;
}

const BOOKMARKS = [
  { name: "Google", nameUr: "گوگل", icon: "fa-google", color: "#4285f4", url: "https://google.com", fab: true },
  { name: "Wikipedia", nameUr: "ویکیپیڈیا", icon: "fa-wikipedia-w", color: "#fff", url: "https://wikipedia.org", fab: true },
  { name: "Office 365", nameUr: "آفس 365", icon: "fa-microsoft", color: "#0078d4", url: "https://office.com", fab: true },
  { name: "Drive", nameUr: "ڈرائیو", icon: "fa-google-drive", color: "#34a853", url: "https://drive.google.com", fab: true },
  { name: "Gmail", nameUr: "جی میل", icon: "fa-envelope", color: "#ea4335", url: "https://mail.google.com" },
  { name: "Maps", nameUr: "نقشے", icon: "fa-map-location-dot", color: "#0f9d58", url: "https://maps.google.com" },
  { name: "Amazon", nameUr: "ایمیزون", icon: "fa-amazon", color: "#ff9900", url: "https://amazon.com", fab: true },
  { name: "GitHub", nameUr: "گٹ ہب", icon: "fa-github", color: "#fff", url: "https://github.com", fab: true },
];

export default function BrowserTab({ theme, lang }: BrowserTabProps) {
  const [url, setUrl] = useState("");
  const isUrdu = lang === "ur" || lang === "ar";

  const navigate = () => {
    if (!url.trim()) return;
    const full = url.startsWith("http") ? url : `https://${url}`;
    window.open(full, "_blank");
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4" style={{ color: theme.textColor }}>
        {isUrdu ? "سمارٹ براؤزر" : "Smart Browser"}
      </h2>

      {/* URL Bar */}
      <div
        className="flex items-center gap-2 p-3 rounded-2xl mb-5"
        style={{ background: theme.cardBg, border: `1px solid ${theme.borderColor}` }}
      >
        <i className="fas fa-lock text-xs opacity-50" style={{ color: theme.textColor }} />
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && navigate()}
          placeholder={isUrdu ? "ویب سائٹ کا پتہ درج کریں..." : "Enter website address..."}
          className="flex-1 bg-transparent outline-none text-sm"
          style={{ color: theme.textColor, direction: isUrdu ? "rtl" : "ltr" }}
        />
        <button onClick={navigate}>
          <i className="fas fa-arrow-right text-sm" style={{ color: theme.accentColor }} />
        </button>
      </div>

      {/* Quick Access */}
      <h3 className="text-sm font-semibold mb-3 opacity-70" style={{ color: theme.textColor }}>
        {isUrdu ? "فوری رسائی" : "Quick Access"}
      </h3>
      <div className="grid grid-cols-4 gap-3 mb-5">
        {BOOKMARKS.map((bm) => (
          <button
            key={bm.name}
            onClick={() => window.open(bm.url, "_blank")}
            className="flex flex-col items-center justify-center p-3 rounded-2xl gap-1.5 transition-all duration-200 hover:scale-105 active:scale-95 aspect-square"
            style={{ background: theme.cardBg, border: `1px solid ${theme.borderColor}` }}
          >
            <i
              className={`${bm.fab ? "fab" : "fas"} ${bm.icon} text-2xl`}
              style={{ color: bm.color }}
            />
            <span className="text-[9px] text-center leading-tight" style={{ color: theme.textColor, opacity: 0.75 }}>
              {isUrdu ? bm.nameUr : bm.name}
            </span>
          </button>
        ))}
      </div>

      <div
        className="p-4 rounded-2xl text-center"
        style={{ background: theme.cardBg, border: `1px solid ${theme.borderColor}` }}
      >
        <i className="fas fa-shield-halved text-2xl mb-2" style={{ color: theme.accentColor }} />
        <div className="text-sm font-medium" style={{ color: theme.textColor }}>
          {isUrdu ? "محفوظ براؤزنگ فعال" : "Safe Browsing Active"}
        </div>
        <div className="text-[11px] opacity-60 mt-1" style={{ color: theme.textColor }}>
          {isUrdu ? "آپ کا ڈیٹا محفوظ ہے" : "Your data is protected"}
        </div>
      </div>
    </div>
  );
}
