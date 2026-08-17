import { useState } from "react";
import type { Theme, Language } from "@/types";

interface SettingsViewProps {
  theme: Theme;
  lang: Language;
  onClose: () => void;
}

export default function SettingsView({ theme, lang, onClose }: SettingsViewProps) {
  const [adminPass, setAdminPass] = useState("");
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [passError, setPassError] = useState(false);

  const isUrdu = lang === "ur" || lang === "ar";

  const handleAdmin = () => {
    if (adminPass === "1122") {
      setAdminUnlocked(true);
      setPassError(false);
    } else {
      setPassError(true);
      setAdminPass("");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col overflow-y-auto"
      style={{ background: "rgba(0,0,0,0.95)", backdropFilter: "blur(20px)" }}
    >
      <div
        className="flex items-center gap-3 p-4 sticky top-0 z-10"
        style={{ background: "rgba(0,0,0,0.8)", borderBottom: `1px solid ${theme.borderColor}` }}
      >
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: theme.cardBg }}
        >
          <i className="fas fa-times text-sm" style={{ color: theme.textColor }} />
        </button>
        <h2 className="text-lg font-bold" style={{ color: theme.textColor }}>
          {isUrdu ? "سیٹنگز" : "Settings"}
        </h2>
      </div>

      <div className="p-4 space-y-4">
        {/* About */}
        <div className="p-4 rounded-2xl" style={{ background: theme.cardBg, border: `1px solid ${theme.borderColor}` }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: `${theme.accentColor}33` }}>
              <i className="fas fa-globe text-xl" style={{ color: theme.accentColor }} />
            </div>
            <div>
              <div className="font-bold" style={{ color: theme.textColor }}>EvEr SmArT BrOwSeR</div>
              <div className="text-xs opacity-60" style={{ color: theme.textColor }}>Smart World Order · ES OneWorld</div>
              <div className="text-xs" style={{ color: theme.accentColor }}>Version 2.0.0</div>
            </div>
          </div>
          <p className="text-xs opacity-70 leading-relaxed" style={{ color: theme.textColor }}>
            {isUrdu
              ? "ایک مکمل اسلامی سمارٹ براؤزر جو قرآن، احادیث، خبریں، اے آئی اور سوشل میڈیا کو یکجا کرتا ہے۔"
              : "A complete Islamic smart browser uniting Quran, Hadith, global news, AI tools, and social media in one elegant experience."}
          </p>
        </div>

        {/* Admin Panel */}
        <div className="p-4 rounded-2xl" style={{ background: theme.cardBg, border: `1px solid ${theme.borderColor}` }}>
          <h3 className="font-bold mb-3 flex items-center gap-2" style={{ color: theme.textColor }}>
            <i className="fas fa-lock text-sm" style={{ color: theme.accentColor }} />
            {isUrdu ? "ایڈمن پینل" : "Admin Panel"}
          </h3>
          {adminUnlocked ? (
            <div className="space-y-2">
              <div className="p-3 rounded-xl text-center" style={{ background: `${theme.accentColor}22` }}>
                <i className="fas fa-check-circle text-2xl mb-1" style={{ color: theme.accentColor }} />
                <div className="text-sm font-bold" style={{ color: theme.textColor }}>{isUrdu ? "ایڈمن موڈ فعال" : "Admin Mode Active"}</div>
              </div>
              {["Manage Icons", "Edit Content", "Theme Config", "Analytics", "Deploy Update"].map((item) => (
                <button key={item} className="w-full p-3 rounded-xl text-left text-sm flex items-center justify-between" style={{ background: theme.cardBg, border: `1px solid ${theme.borderColor}`, color: theme.textColor }}>
                  {item} <i className="fas fa-chevron-right text-xs opacity-50" />
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              <input
                type="password"
                value={adminPass}
                onChange={(e) => { setAdminPass(e.target.value); setPassError(false); }}
                onKeyDown={(e) => e.key === "Enter" && handleAdmin()}
                placeholder={isUrdu ? "پاس ورڈ درج کریں..." : "Enter admin password..."}
                className="w-full p-3 rounded-xl bg-transparent outline-none text-sm"
                style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${passError ? "#ef4444" : theme.borderColor}`, color: theme.textColor }}
              />
              {passError && <p className="text-[11px] text-red-400">{isUrdu ? "غلط پاس ورڈ" : "Incorrect password"}</p>}
              <button onClick={handleAdmin} className="w-full p-3 rounded-xl text-sm font-bold text-white" style={{ background: theme.accentColor }}>
                {isUrdu ? "داخل ہوں" : "Login"}
              </button>
            </div>
          )}
        </div>

        {/* App Info */}
        <div className="p-4 rounded-2xl" style={{ background: theme.cardBg, border: `1px solid ${theme.borderColor}` }}>
          <h3 className="font-bold mb-2" style={{ color: theme.textColor }}>{isUrdu ? "معلومات" : "App Info"}</h3>
          {[
            { label: "Developer", value: "Smart World Order" },
            { label: "Platform", value: "ES OneWorld" },
            { label: "Language", value: "EN / UR / AR" },
            { label: "Themes", value: "18 Themes" },
            { label: "Build", value: "2026.08.15" },
          ].map((row) => (
            <div key={row.label} className="flex justify-between py-1.5 border-b last:border-0" style={{ borderColor: theme.borderColor }}>
              <span className="text-xs opacity-60" style={{ color: theme.textColor }}>{row.label}</span>
              <span className="text-xs font-medium" style={{ color: theme.accentColor }}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
