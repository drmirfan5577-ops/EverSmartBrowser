import { useState } from "react";
import type { Theme, Language, IconConfig, DisplayMode, CustomTheme } from "@/types";
import AdminPanel from "@/components/features/AdminPanel";
import ThemeBuilder from "@/components/features/ThemeBuilder";

interface SettingsViewProps {
  theme: Theme;
  lang: Language;
  onClose: () => void;
  // Admin props
  iconConfigs: Record<string, IconConfig>;
  onUpdateIconConfig: (id: string, updates: Partial<IconConfig>) => void;
  onResetIconConfig: (id: string) => void;
  onResetAllIcons: () => void;
  displayMode: DisplayMode;
  onChangeDisplayMode: (mode: DisplayMode) => void;
  onSaveCustomTheme: (ct: CustomTheme) => void;
  onLockAdmin: () => void;
  onChangePassword: (oldPass: string, newPass: string) => boolean;
  adminUnlocked: boolean;
  onUnlockAdmin: (pass: string) => boolean;
}

export default function SettingsView({
  theme, lang, onClose,
  iconConfigs, onUpdateIconConfig, onResetIconConfig, onResetAllIcons,
  displayMode, onChangeDisplayMode,
  onSaveCustomTheme, onLockAdmin, onChangePassword,
  adminUnlocked, onUnlockAdmin,
}: SettingsViewProps) {
  const [adminPass, setAdminPass] = useState("");
  const [passError, setPassError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showAdmin, setShowAdmin] = useState(adminUnlocked);
  const [showThemeBuilder, setShowThemeBuilder] = useState(false);

  const isUrdu = lang !== "en";

  const handleLogin = () => {
    const ok = onUnlockAdmin(adminPass);
    if (ok) {
      setShowAdmin(true);
      setPassError(false);
      setAttempts(0);
    } else {
      setPassError(true);
      setAdminPass("");
      setAttempts(a => a + 1);
    }
  };

  if (showAdmin) {
    return (
      <>
        <AdminPanel
          theme={theme}
          lang={lang}
          onClose={onClose}
          iconConfigs={iconConfigs}
          onUpdateIconConfig={onUpdateIconConfig}
          onResetIconConfig={onResetIconConfig}
          onResetAllIcons={onResetAllIcons}
          displayMode={displayMode}
          onChangeDisplayMode={onChangeDisplayMode}
          onOpenThemeBuilder={() => setShowThemeBuilder(true)}
          onLockAdmin={() => { onLockAdmin(); setShowAdmin(false); }}
          onChangePassword={onChangePassword}
        />
        {showThemeBuilder && (
          <ThemeBuilder
            theme={theme}
            lang={lang}
            onSave={(ct) => { onSaveCustomTheme(ct); setShowThemeBuilder(false); }}
            onClose={() => setShowThemeBuilder(false)}
          />
        )}
      </>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col overflow-y-auto"
      style={{ background: "rgba(0,0,0,0.96)", backdropFilter: "blur(20px)" }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 p-4 sticky top-0 z-10"
        style={{ background: "rgba(0,0,0,0.8)", borderBottom: `1px solid ${theme.borderColor}` }}
      >
        <button onClick={onClose}
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: theme.cardBg }}>
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
              <div className="text-xs font-bold" style={{ color: theme.accentColor }}>v2.0.0 Admin Edition</div>
            </div>
          </div>
          <p className="text-xs opacity-70 leading-relaxed" style={{ color: theme.textColor }}>
            {isUrdu
              ? "ایک مکمل اسلامی سمارٹ براؤزر جو قرآن، احادیث، خبریں، اے آئی اور سوشل میڈیا کو یکجا کرتا ہے۔"
              : "A complete Islamic smart browser uniting Quran, Hadith, global news, AI tools & social media in one powerful experience."}
          </p>
        </div>

        {/* Admin Login Panel */}
        <div
          className="p-4 rounded-2xl"
          style={{
            background: theme.cardBg,
            border: `2px solid ${passError ? "#ef4444" : theme.accentColor}55`,
            boxShadow: `0 0 20px ${theme.accentColor}22`,
          }}
        >
          <h3 className="font-bold mb-1 flex items-center gap-2" style={{ color: theme.textColor }}>
            <i className="fas fa-shield-halved text-sm" style={{ color: theme.accentColor }} />
            {isUrdu ? "ایڈمن کنٹرول پینل" : "Admin Control Panel"}
          </h3>
          <p className="text-[11px] opacity-50 mb-4" style={{ color: theme.textColor }}>
            {isUrdu
              ? "مکمل کنٹرول کے لیے ایڈمن پاس ورڈ درج کریں"
              : "Enter admin password for full system control"}
          </p>

          <div className="space-y-3">
            <div className="relative">
              <input
                type="password"
                value={adminPass}
                onChange={e => { setAdminPass(e.target.value); setPassError(false); }}
                onKeyDown={e => e.key === "Enter" && handleLogin()}
                placeholder={isUrdu ? "پاس ورڈ درج کریں..." : "Enter admin password..."}
                className="w-full p-3 pr-10 rounded-xl bg-transparent outline-none text-sm"
                style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${passError ? "#ef4444" : theme.borderColor}`, color: theme.textColor }}
                disabled={attempts >= 5}
              />
              <i className="fas fa-lock absolute right-3 top-1/2 -translate-y-1/2 text-sm opacity-30" style={{ color: theme.textColor }} />
            </div>

            {passError && (
              <div className="flex items-center gap-2 p-2 rounded-lg" style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)" }}>
                <i className="fas fa-exclamation-triangle text-red-400 text-xs" />
                <p className="text-[11px] text-red-400">
                  {isUrdu ? "غلط پاس ورڈ" : "Incorrect password"}
                  {attempts >= 3 && ` · ${5 - attempts} ${isUrdu ? "کوششیں باقی" : "attempts remaining"}`}
                </p>
              </div>
            )}

            {attempts >= 5 ? (
              <div className="p-3 rounded-xl text-center" style={{ background: "rgba(239,68,68,0.15)" }}>
                <i className="fas fa-lock text-red-400 block text-xl mb-1" />
                <p className="text-xs text-red-400">{isUrdu ? "اکاؤنٹ عارضی طور پر بند" : "Account temporarily locked"}</p>
              </div>
            ) : (
              <button onClick={handleLogin}
                className="w-full p-3 rounded-xl text-sm font-bold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: `linear-gradient(135deg, ${theme.accentColor}, ${theme.accentColor}99)`,
                  color: theme.mode === "light" ? "#000" : "#fff",
                  boxShadow: `0 4px 15px ${theme.accentColor}44`,
                }}>
                <i className="fas fa-lock-open mr-2" />
                {isUrdu ? "ایڈمن پینل کھولیں" : "Access Admin Panel"}
              </button>
            )}
          </div>

          {/* Feature Preview */}
          <div className="mt-4 pt-3 border-t" style={{ borderColor: theme.borderColor }}>
            <p className="text-[10px] opacity-40 mb-2" style={{ color: theme.textColor }}>
              {isUrdu ? "ایڈمن پینل میں شامل:" : "Admin Panel includes:"}
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { icon: "fa-th-large", label: isUrdu ? "آئیکن مینیجر" : "Icon Manager" },
                { icon: "fa-palette", label: isUrdu ? "تھیم بلڈر" : "Theme Builder" },
                { icon: "fa-display", label: isUrdu ? "ڈسپلے موڈز" : "Display Modes" },
                { icon: "fa-shield-halved", label: isUrdu ? "سیکیورٹی" : "Security" },
              ].map(f => (
                <div key={f.label} className="flex items-center gap-1.5 p-2 rounded-lg"
                  style={{ background: `${theme.accentColor}11`, border: `1px solid ${theme.accentColor}22` }}>
                  <i className={`fas ${f.icon} text-[10px]`} style={{ color: theme.accentColor }} />
                  <span className="text-[10px] opacity-70" style={{ color: theme.textColor }}>{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* App Info */}
        <div className="p-4 rounded-2xl" style={{ background: theme.cardBg, border: `1px solid ${theme.borderColor}` }}>
          <h3 className="font-bold mb-2" style={{ color: theme.textColor }}>{isUrdu ? "ایپ معلومات" : "App Info"}</h3>
          {[
            { label: "Developer", value: "Smart World Order" },
            { label: "Platform", value: "ES OneWorld" },
            { label: "Languages", value: "EN / UR / AR" },
            { label: "Built-in Themes", value: "18 Themes" },
            { label: "Display Modes", value: "7 Modes" },
            { label: "Build", value: "2026.08.17" },
          ].map(row => (
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
