import { useState } from "react";
import type { Theme, Language, IconConfig, DisplayMode } from "@/types";
import { ALL_ICONS } from "@/data/icons";

interface AdminPanelProps {
  theme: Theme;
  lang: Language;
  onClose: () => void;
  iconConfigs: Record<string, IconConfig>;
  onUpdateIconConfig: (id: string, updates: Partial<IconConfig>) => void;
  onResetIconConfig: (id: string) => void;
  onResetAllIcons: () => void;
  displayMode: DisplayMode;
  onChangeDisplayMode: (mode: DisplayMode) => void;
  onOpenThemeBuilder: () => void;
  onLockAdmin: () => void;
  onChangePassword: (oldPass: string, newPass: string) => boolean;
}

type Section = "dashboard" | "icons" | "display" | "security" | "system" | "content";

const SECTIONS = [
  { id: "dashboard" as Section, icon: "fa-gauge-high", label: "Dashboard", labelUr: "ڈیش بورڈ", color: "#3b82f6" },
  { id: "icons" as Section, icon: "fa-th-large", label: "Icon Manager", labelUr: "آئیکن مینیجر", color: "#10b981" },
  { id: "display" as Section, icon: "fa-display", label: "Display Modes", labelUr: "ڈسپلے موڈ", color: "#f59e0b" },
  { id: "content" as Section, icon: "fa-pen-to-square", label: "Content Control", labelUr: "مواد کنٹرول", color: "#a855f7" },
  { id: "security" as Section, icon: "fa-shield-halved", label: "Security", labelUr: "سیکیورٹی", color: "#ef4444" },
  { id: "system" as Section, icon: "fa-microchip", label: "System Info", labelUr: "سسٹم معلومات", color: "#06b6d4" },
];

const DISPLAY_MODES: { id: DisplayMode; icon: string; label: string; labelUr: string; desc: string }[] = [
  { id: "grid5", icon: "fa-th", label: "5-Col Grid", labelUr: "5 کالم گرڈ", desc: "Classic 5×6 layout" },
  { id: "grid4", icon: "fa-th-large", label: "4-Col Grid", labelUr: "4 کالم گرڈ", desc: "Larger icons 4×7" },
  { id: "grid3", icon: "fa-square", label: "3-Col Grid", labelUr: "3 کالم گرڈ", desc: "Big icon mode 3×10" },
  { id: "list", icon: "fa-list", label: "List View", labelUr: "فہرست موڈ", desc: "Scrollable list with chevrons" },
  { id: "minimal", icon: "fa-circle-dot", label: "Minimal Dots", labelUr: "مینیمل", desc: "Icons only, no labels" },
  { id: "3d", icon: "fa-cube", label: "3D Perspective", labelUr: "تھری ڈی", desc: "3D tilted card effects" },
  { id: "4d", icon: "fa-cubes", label: "4D Holographic", labelUr: "فور ڈی", desc: "Animated holographic tiles" },
];

const SHAPES: { id: IconConfig["customShape"]; label: string; preview: string }[] = [
  { id: "rounded", label: "Rounded", preview: "rounded-2xl" },
  { id: "circle", label: "Circle", preview: "rounded-full" },
  { id: "square", label: "Square", preview: "rounded-lg" },
  { id: "diamond", label: "Diamond", preview: "rounded-lg rotate-45" },
  { id: "hexagon", label: "Hexagon", preview: "rounded-none" },
];

const TEXTURES: { id: IconConfig["customTexture"]; label: string; labelUr: string }[] = [
  { id: "glass", label: "Glass", labelUr: "گلاس" },
  { id: "solid", label: "Solid", labelUr: "سالڈ" },
  { id: "gradient", label: "Gradient", labelUr: "گریڈیئنٹ" },
  { id: "crystal", label: "Crystal", labelUr: "کرسٹل" },
  { id: "neon", label: "Neon", labelUr: "نیون" },
  { id: "3d", label: "3D", labelUr: "3D" },
];

const SIZES: { id: IconConfig["customSize"]; label: string }[] = [
  { id: "sm", label: "Small" },
  { id: "md", label: "Medium" },
  { id: "lg", label: "Large" },
  { id: "xl", label: "XL" },
];

export default function AdminPanel({
  theme, lang, onClose,
  iconConfigs, onUpdateIconConfig, onResetIconConfig, onResetAllIcons,
  displayMode, onChangeDisplayMode,
  onOpenThemeBuilder, onLockAdmin,
  onChangePassword,
}: AdminPanelProps) {
  const [section, setSection] = useState<Section>("dashboard");
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [iconSearch, setIconSearch] = useState("");
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [passMsg, setPassMsg] = useState("");
  const [showConfirm, setShowConfirm] = useState<string | null>(null);

  const isUrdu = lang !== "en";
  const accent = theme.accentColor;
  const cardStyle = { background: "rgba(255,255,255,0.06)", border: `1px solid ${accent}33`, backdropFilter: "blur(12px)" };

  const filteredIcons = ALL_ICONS.filter(i =>
    i.name.en.toLowerCase().includes(iconSearch.toLowerCase()) ||
    i.name.ur.includes(iconSearch)
  );

  const handlePassChange = () => {
    if (newPass !== confirmPass) { setPassMsg("Passwords don't match!"); return; }
    if (newPass.length < 4) { setPassMsg("Min 4 characters required"); return; }
    const ok = onChangePassword(oldPass, newPass);
    if (ok) { setPassMsg("✅ Password changed successfully!"); setOldPass(""); setNewPass(""); setConfirmPass(""); }
    else setPassMsg("❌ Old password incorrect");
  };

  const enabledCount = Object.values(iconConfigs).filter(c => c.enabled !== false).length;

  return (
    <div className="fixed inset-0 z-[60] flex flex-col" style={{ background: "linear-gradient(180deg, #0a0a1a 0%, #0d1628 50%, #0a0a1a 100%)" }}>
      {/* Header */}
      <div className="flex items-center gap-3 p-4 sticky top-0 z-10" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${accent}33` }}>
        <button onClick={onClose} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.1)" }}>
          <i className="fas fa-arrow-left text-white text-sm" />
        </button>
        <div>
          <h2 className="text-base font-bold text-white font-orbitron flex items-center gap-2">
            <i className="fas fa-lock-open text-xs" style={{ color: accent }} />
            {isUrdu ? "ایڈمن پینل" : "Admin Control Panel"}
          </h2>
          <p className="text-[10px] opacity-50 text-white">EvEr SmArT BrOwSeR v2.0 — Full Control</p>
        </div>
        <button onClick={onLockAdmin} className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold"
          style={{ background: "rgba(239,68,68,0.2)", border: "1px solid rgba(239,68,68,0.4)", color: "#ef4444" }}>
          <i className="fas fa-lock text-[10px]" />
          {isUrdu ? "لاک" : "Lock"}
        </button>
      </div>

      {/* Section Nav (horizontal scroll) */}
      <div className="flex gap-2 px-3 py-2 overflow-x-auto" style={{ borderBottom: `1px solid ${accent}22` }}>
        {SECTIONS.map(s => (
          <button key={s.id} onClick={() => setSection(s.id)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex-shrink-0"
            style={{
              background: section === s.id ? s.color : "rgba(255,255,255,0.06)",
              color: section === s.id ? "#000" : "rgba(255,255,255,0.7)",
              border: `1px solid ${section === s.id ? s.color : "rgba(255,255,255,0.1)"}`,
            }}>
            <i className={`fas ${s.icon} text-[11px]`} />
            {isUrdu ? s.labelUr : s.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">

        {/* ── DASHBOARD ── */}
        {section === "dashboard" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: "fa-grid-2", label: "Total Icons", value: ALL_ICONS.length, color: "#3b82f6" },
                { icon: "fa-circle-check", label: "Enabled", value: enabledCount, color: "#10b981" },
                { icon: "fa-palette", label: "Display Mode", value: displayMode.toUpperCase(), color: "#f59e0b" },
                { icon: "fa-language", label: "Language", value: lang.toUpperCase(), color: "#a855f7" },
              ].map(stat => (
                <div key={stat.label} className="p-4 rounded-2xl" style={cardStyle}>
                  <i className={`fas ${stat.icon} text-xl mb-1`} style={{ color: stat.color }} />
                  <div className="text-lg font-bold text-white">{stat.value}</div>
                  <div className="text-[10px] opacity-50 text-white">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl" style={cardStyle}>
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <i className="fas fa-bolt" style={{ color: accent }} />
                {isUrdu ? "فوری کارروائیاں" : "Quick Actions"}
              </h3>
              <div className="space-y-2">
                {[
                  { label: isUrdu ? "آئیکن مینیجر کھولیں" : "Open Icon Manager", action: () => setSection("icons"), icon: "fa-th-large", color: "#10b981" },
                  { label: isUrdu ? "کسٹم تھیم بنائیں" : "Create Custom Theme", action: onOpenThemeBuilder, icon: "fa-palette", color: "#a855f7" },
                  { label: isUrdu ? "ڈسپلے موڈ تبدیل کریں" : "Change Display Mode", action: () => setSection("display"), icon: "fa-display", color: "#f59e0b" },
                  { label: isUrdu ? "تمام آئیکن ریسیٹ کریں" : "Reset All Icons to Default", action: () => setShowConfirm("reset-all"), icon: "fa-rotate-left", color: "#ef4444" },
                ].map(a => (
                  <button key={a.label} onClick={a.action}
                    className="w-full flex items-center gap-3 p-3 rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99]"
                    style={{ background: "rgba(255,255,255,0.05)", border: `1px solid rgba(255,255,255,0.08)` }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${a.color}22` }}>
                      <i className={`fas ${a.icon} text-sm`} style={{ color: a.color }} />
                    </div>
                    <span className="text-sm text-white flex-1 text-left">{a.label}</span>
                    <i className="fas fa-chevron-right text-xs opacity-30 text-white" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── ICON MANAGER ── */}
        {section === "icons" && (
          <div className="space-y-3">
            <div className="flex gap-2 items-center p-3 rounded-2xl" style={cardStyle}>
              <i className="fas fa-search text-xs opacity-50 text-white" />
              <input value={iconSearch} onChange={e => setIconSearch(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm text-white placeholder:opacity-40"
                placeholder={isUrdu ? "آئیکن تلاش کریں..." : "Search icons..."} />
              {iconSearch && <button onClick={() => setIconSearch("")}><i className="fas fa-times text-xs text-white opacity-50" /></button>}
            </div>

            {/* Bulk Controls */}
            <div className="flex gap-2">
              <button onClick={() => ALL_ICONS.forEach(i => onUpdateIconConfig(i.id, { enabled: true }))}
                className="flex-1 py-2 rounded-xl text-xs font-bold transition-all"
                style={{ background: "#10b98133", border: "1px solid #10b98166", color: "#10b981" }}>
                <i className="fas fa-check-double mr-1" /> {isUrdu ? "سب فعال" : "Enable All"}
              </button>
              <button onClick={() => ALL_ICONS.forEach(i => onUpdateIconConfig(i.id, { enabled: false }))}
                className="flex-1 py-2 rounded-xl text-xs font-bold transition-all"
                style={{ background: "#ef444433", border: "1px solid #ef444466", color: "#ef4444" }}>
                <i className="fas fa-ban mr-1" /> {isUrdu ? "سب غیرفعال" : "Disable All"}
              </button>
            </div>

            {filteredIcons.map(icon => {
              const cfg = iconConfigs[icon.id] || { id: icon.id, enabled: true, customSize: "md", customShape: "rounded", customTexture: "glass", sortOrder: 0 };
              const isSelected = selectedIcon === icon.id;
              const isEnabled = cfg.enabled !== false;

              return (
                <div key={icon.id} className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${isSelected ? accent : "rgba(255,255,255,0.08)"}` }}>
                  {/* Icon Row */}
                  <button
                    onClick={() => setSelectedIcon(isSelected ? null : icon.id)}
                    className="w-full flex items-center gap-3 p-3"
                    style={{ background: isSelected ? `${accent}15` : "rgba(255,255,255,0.04)" }}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${icon.color}22`, opacity: isEnabled ? 1 : 0.4 }}>
                      <i className={`${icon.fab ? "fab" : "fas"} ${icon.icon} text-lg`} style={{ color: icon.color }} />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="text-sm font-medium text-white truncate">{icon.name.en}</div>
                      <div className="text-[10px] opacity-50 text-white truncate"
                        style={{ direction: "rtl", fontFamily: "'Noto Nastaliq Urdu', serif" }}>{icon.name.ur}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); onUpdateIconConfig(icon.id, { enabled: !isEnabled }); }}
                        className="px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all"
                        style={{
                          background: isEnabled ? "#10b98133" : "#ef444433",
                          color: isEnabled ? "#10b981" : "#ef4444",
                          border: `1px solid ${isEnabled ? "#10b98155" : "#ef444455"}`,
                        }}>
                        {isEnabled ? (isUrdu ? "فعال" : "ON") : (isUrdu ? "غیرفعال" : "OFF")}
                      </button>
                      <i className={`fas fa-chevron-${isSelected ? "up" : "down"} text-xs opacity-40 text-white`} />
                    </div>
                  </button>

                  {/* Expanded Config */}
                  {isSelected && (
                    <div className="p-3 space-y-3 border-t" style={{ borderColor: `${accent}22`, background: "rgba(0,0,0,0.3)" }}>
                      {/* Custom Label */}
                      <div>
                        <label className="text-white text-[11px] opacity-60 block mb-1">
                          {isUrdu ? "کسٹم لیبل (اختیاری)" : "Custom Label (optional)"}
                        </label>
                        <input
                          value={cfg.customLabel || ""}
                          onChange={e => onUpdateIconConfig(icon.id, { customLabel: e.target.value || undefined })}
                          placeholder={icon.name.en}
                          className="w-full p-2 rounded-lg text-xs bg-transparent outline-none text-white"
                          style={{ border: `1px solid ${accent}33` }}
                        />
                      </div>

                      {/* Custom Color */}
                      <div>
                        <label className="text-white text-[11px] opacity-60 block mb-1">
                          {isUrdu ? "کسٹم رنگ" : "Custom Color"}
                        </label>
                        <div className="flex items-center gap-2">
                          <input type="color" value={cfg.customColor || icon.color}
                            onChange={e => onUpdateIconConfig(icon.id, { customColor: e.target.value })}
                            className="w-10 h-8 rounded-lg cursor-pointer border-0" style={{ background: "transparent" }} />
                          <input value={cfg.customColor || icon.color}
                            onChange={e => onUpdateIconConfig(icon.id, { customColor: e.target.value })}
                            className="flex-1 p-2 rounded-lg text-xs bg-transparent outline-none text-white font-mono"
                            style={{ border: `1px solid ${accent}33` }} />
                          <button onClick={() => onUpdateIconConfig(icon.id, { customColor: undefined })}
                            className="px-2 py-1.5 rounded-lg text-[10px] text-white/50 border border-white/10">
                            ↩
                          </button>
                        </div>
                      </div>

                      {/* Shape */}
                      <div>
                        <label className="text-white text-[11px] opacity-60 block mb-1.5">
                          {isUrdu ? "شکل" : "Shape"}
                        </label>
                        <div className="flex gap-1.5">
                          {SHAPES.map(s => (
                            <button key={s.id} onClick={() => onUpdateIconConfig(icon.id, { customShape: s.id })}
                              className={`flex-1 py-1.5 text-[10px] font-medium transition-all`}
                              style={{
                                background: cfg.customShape === s.id ? accent : "rgba(255,255,255,0.08)",
                                color: cfg.customShape === s.id ? "#000" : "#fff",
                                borderRadius: s.id === "circle" ? "9999px" : s.id === "square" ? "6px" : "10px",
                                border: `1px solid ${cfg.customShape === s.id ? accent : "rgba(255,255,255,0.1)"}`,
                              }}>
                              {s.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Size */}
                      <div>
                        <label className="text-white text-[11px] opacity-60 block mb-1.5">
                          {isUrdu ? "سائز" : "Size"}
                        </label>
                        <div className="flex gap-1.5">
                          {SIZES.map(s => (
                            <button key={s.id} onClick={() => onUpdateIconConfig(icon.id, { customSize: s.id })}
                              className="flex-1 py-1.5 text-[10px] font-medium rounded-lg transition-all"
                              style={{
                                background: cfg.customSize === s.id ? accent : "rgba(255,255,255,0.08)",
                                color: cfg.customSize === s.id ? "#000" : "#fff",
                                border: `1px solid ${cfg.customSize === s.id ? accent : "rgba(255,255,255,0.1)"}`,
                              }}>
                              {s.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Texture */}
                      <div>
                        <label className="text-white text-[11px] opacity-60 block mb-1.5">
                          {isUrdu ? "ساخت / اثر" : "Texture / Effect"}
                        </label>
                        <div className="grid grid-cols-3 gap-1.5">
                          {TEXTURES.map(t => (
                            <button key={t.id} onClick={() => onUpdateIconConfig(icon.id, { customTexture: t.id })}
                              className="py-1.5 text-[10px] font-medium rounded-lg transition-all"
                              style={{
                                background: cfg.customTexture === t.id ? accent : "rgba(255,255,255,0.08)",
                                color: cfg.customTexture === t.id ? "#000" : "#fff",
                                border: `1px solid ${cfg.customTexture === t.id ? accent : "rgba(255,255,255,0.1)"}`,
                              }}>
                              {isUrdu ? t.labelUr : t.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Sort Order */}
                      <div>
                        <label className="text-white text-[11px] opacity-60 block mb-1">
                          {isUrdu ? "ترتیب نمبر" : "Sort Order"}
                        </label>
                        <input type="number" value={cfg.sortOrder}
                          onChange={e => onUpdateIconConfig(icon.id, { sortOrder: parseInt(e.target.value) || 0 })}
                          className="w-full p-2 rounded-lg text-xs bg-transparent outline-none text-white"
                          style={{ border: `1px solid ${accent}33` }} />
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-1">
                        <button onClick={() => onResetIconConfig(icon.id)}
                          className="flex-1 py-2 rounded-xl text-xs font-bold"
                          style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444" }}>
                          <i className="fas fa-rotate-left mr-1" /> {isUrdu ? "ریسیٹ" : "Reset"}
                        </button>
                        <button onClick={() => setSelectedIcon(null)}
                          className="flex-1 py-2 rounded-xl text-xs font-bold"
                          style={{ background: `${accent}22`, border: `1px solid ${accent}44`, color: accent }}>
                          <i className="fas fa-check mr-1" /> {isUrdu ? "مکمل" : "Done"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ── DISPLAY MODES ── */}
        {section === "display" && (
          <div className="space-y-3">
            <p className="text-xs opacity-50 text-white">
              {isUrdu ? "ہوم اسکرین کا ڈسپلے موڈ منتخب کریں" : "Select display mode for the home screen icon grid"}
            </p>
            {DISPLAY_MODES.map(m => {
              const isActive = displayMode === m.id;
              return (
                <button key={m.id} onClick={() => onChangeDisplayMode(m.id)}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl transition-all hover:scale-[1.01] active:scale-[0.99]"
                  style={{
                    background: isActive ? `${accent}22` : "rgba(255,255,255,0.05)",
                    border: `${isActive ? 2 : 1}px solid ${isActive ? accent : "rgba(255,255,255,0.1)"}`,
                    boxShadow: isActive ? `0 0 20px ${accent}33` : "none",
                  }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: isActive ? `${accent}33` : "rgba(255,255,255,0.08)" }}>
                    <i className={`fas ${m.icon} text-xl`} style={{ color: isActive ? accent : "rgba(255,255,255,0.5)" }} />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-bold text-sm text-white">{isUrdu ? m.labelUr : m.label}</div>
                    <div className="text-[11px] opacity-50 text-white mt-0.5">{m.desc}</div>
                  </div>
                  {isActive && (
                    <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: accent }}>
                      <i className="fas fa-check text-[10px] text-black" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* ── CONTENT CONTROL ── */}
        {section === "content" && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl" style={cardStyle}>
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <i className="fas fa-palette" style={{ color: accent }} />
                {isUrdu ? "تھیم مینیجمنٹ" : "Theme Management"}
              </h3>
              <div className="space-y-2">
                <button onClick={onOpenThemeBuilder}
                  className="w-full flex items-center gap-3 p-3 rounded-xl transition-all hover:scale-[1.01]"
                  style={{ background: `${accent}22`, border: `1px solid ${accent}44` }}>
                  <i className="fas fa-plus text-sm" style={{ color: accent }} />
                  <span className="text-sm font-bold" style={{ color: accent }}>
                    {isUrdu ? "نئی کسٹم تھیم بنائیں" : "Create New Custom Theme"}
                  </span>
                </button>
                <button
                  className="w-full flex items-center gap-3 p-3 rounded-xl transition-all hover:scale-[1.01]"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                  onClick={() => document.getElementById("theme-import")?.click()}>
                  <i className="fas fa-file-import text-sm text-white opacity-60" />
                  <span className="text-sm text-white opacity-70">{isUrdu ? "تھیم امپورٹ کریں (.json)" : "Import Theme (.json)"}</span>
                  <input id="theme-import" type="file" accept=".json" className="hidden" />
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl" style={cardStyle}>
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <i className="fas fa-newspaper" style={{ color: accent }} />
                {isUrdu ? "نیوز ٹکر کنٹرول" : "News Ticker Control"}
              </h3>
              <div className="space-y-2">
                {[
                  { label: isUrdu ? "نیوز ٹکر فعال" : "News Ticker Active", checked: true },
                  { label: isUrdu ? "سٹیٹس بار فعال" : "Status Bar Active", checked: true },
                  { label: isUrdu ? "بسم اللہ بینر" : "Bismillah Banner", checked: true },
                ].map(item => (
                  <label key={item.label} className="flex items-center justify-between p-2.5 rounded-xl cursor-pointer"
                    style={{ background: "rgba(255,255,255,0.04)" }}>
                    <span className="text-sm text-white opacity-70">{item.label}</span>
                    <div className="w-10 h-5 rounded-full relative transition-all"
                      style={{ background: item.checked ? accent : "rgba(255,255,255,0.2)" }}>
                      <div className="absolute top-0.5 right-0.5 w-4 h-4 bg-white rounded-full shadow" />
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl" style={cardStyle}>
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <i className="fas fa-database" style={{ color: accent }} />
                {isUrdu ? "ڈیٹا مینجمنٹ" : "Data Management"}
              </h3>
              <div className="space-y-2">
                {[
                  { label: isUrdu ? "تمام سیٹنگز ایکسپورٹ کریں" : "Export All Settings", icon: "fa-file-export", color: "#10b981" },
                  { label: isUrdu ? "سیٹنگز امپورٹ کریں" : "Import Settings", icon: "fa-file-import", color: "#3b82f6" },
                  { label: isUrdu ? "کیش صاف کریں" : "Clear Cache", icon: "fa-trash-can", color: "#f59e0b" },
                  { label: isUrdu ? "فیکٹری ریسیٹ" : "Factory Reset", icon: "fa-rotate", color: "#ef4444" },
                ].map(item => (
                  <button key={item.label}
                    onClick={item.icon === "fa-rotate" ? () => setShowConfirm("factory-reset") : undefined}
                    className="w-full flex items-center gap-3 p-3 rounded-xl transition-all hover:scale-[1.01]"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <i className={`fas ${item.icon} text-sm`} style={{ color: item.color }} />
                    <span className="text-sm text-white opacity-70 flex-1 text-left">{item.label}</span>
                    <i className="fas fa-chevron-right text-xs opacity-20 text-white" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── SECURITY ── */}
        {section === "security" && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl" style={{ ...cardStyle, border: "1px solid rgba(239,68,68,0.3)" }}>
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <i className="fas fa-key" style={{ color: "#ef4444" }} />
                {isUrdu ? "پاس ورڈ تبدیل کریں" : "Change Admin Password"}
              </h3>
              <div className="space-y-2">
                {[
                  { label: isUrdu ? "پرانا پاس ورڈ" : "Current Password", val: oldPass, set: setOldPass },
                  { label: isUrdu ? "نیا پاس ورڈ" : "New Password", val: newPass, set: setNewPass },
                  { label: isUrdu ? "نیا پاس ورڈ تصدیق" : "Confirm New Password", val: confirmPass, set: setConfirmPass },
                ].map(row => (
                  <div key={row.label}>
                    <label className="text-white text-[11px] opacity-60 block mb-1">{row.label}</label>
                    <input type="password" value={row.val} onChange={e => row.set(e.target.value)}
                      className="w-full p-2.5 rounded-xl text-sm bg-transparent outline-none text-white"
                      style={{ border: "1px solid rgba(239,68,68,0.3)" }} />
                  </div>
                ))}
                {passMsg && (
                  <p className={`text-xs ${passMsg.startsWith("✅") ? "text-green-400" : "text-red-400"}`}>{passMsg}</p>
                )}
                <button onClick={handlePassChange}
                  className="w-full py-2.5 rounded-xl text-sm font-bold transition-all"
                  style={{ background: "rgba(239,68,68,0.25)", border: "1px solid rgba(239,68,68,0.5)", color: "#ef4444" }}>
                  <i className="fas fa-lock mr-2" />
                  {isUrdu ? "پاس ورڈ اپڈیٹ کریں" : "Update Password"}
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl" style={cardStyle}>
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <i className="fas fa-shield-halved" style={{ color: accent }} />
                {isUrdu ? "سیکیورٹی پالیسی" : "Security Policy"}
              </h3>
              {[
                { label: isUrdu ? "سیشن ٹائم آؤٹ: 30 منٹ" : "Session Timeout: 30 min", icon: "fa-clock" },
                { label: isUrdu ? "زیادہ سے زیادہ کوششیں: 5" : "Max Failed Attempts: 5", icon: "fa-ban" },
                { label: isUrdu ? "آٹو لاگ آؤٹ فعال" : "Auto Logout Active", icon: "fa-right-from-bracket" },
              ].map(p => (
                <div key={p.label} className="flex items-center gap-2 py-2 border-b last:border-0" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <i className={`fas ${p.icon} text-sm`} style={{ color: accent }} />
                  <span className="text-xs text-white opacity-60">{p.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── SYSTEM INFO ── */}
        {section === "system" && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl" style={cardStyle}>
              <div className="text-center mb-4">
                <div className="text-3xl mb-2">🌐</div>
                <div className="font-bold text-white text-base font-orbitron">EvEr SmArT BrOwSeR</div>
                <div className="text-xs opacity-50 text-white">Smart World Order · ES OneWorld</div>
              </div>
              {[
                { k: "Version", v: "2.0.0 Admin" },
                { k: "Build Date", v: "2026.08.17" },
                { k: "Framework", v: "React 18 + Vite" },
                { k: "Icons", v: `${ALL_ICONS.length} registered` },
                { k: "Themes", v: "18 built-in + custom" },
                { k: "Languages", v: "EN / UR / AR" },
                { k: "Display Modes", v: "7 modes" },
                { k: "Storage", v: "LocalStorage" },
                { k: "Platform", v: "Progressive Web App" },
              ].map(row => (
                <div key={row.k} className="flex justify-between py-2 border-b last:border-0" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <span className="text-xs opacity-50 text-white">{row.k}</span>
                  <span className="text-xs font-medium" style={{ color: accent }}>{row.v}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Confirm Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(10px)" }}>
          <div className="w-full max-w-sm p-6 rounded-3xl" style={{ background: "#1a1a2e", border: "1px solid rgba(239,68,68,0.4)" }}>
            <div className="text-center mb-4">
              <i className="fas fa-triangle-exclamation text-3xl text-red-400 mb-2 block" />
              <h3 className="font-bold text-white text-base">
                {showConfirm === "factory-reset" ? (isUrdu ? "فیکٹری ریسیٹ؟" : "Factory Reset?") : (isUrdu ? "سب ریسیٹ کریں؟" : "Reset All Icons?")}
              </h3>
              <p className="text-xs text-white opacity-50 mt-1">
                {isUrdu ? "یہ عمل واپس نہیں ہو سکتا" : "This action cannot be undone"}
              </p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowConfirm(null)}
                className="flex-1 py-2.5 rounded-2xl text-sm font-bold text-white"
                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}>
                {isUrdu ? "منسوخ" : "Cancel"}
              </button>
              <button
                onClick={() => {
                  if (showConfirm === "reset-all") { onResetAllIcons(); }
                  if (showConfirm === "factory-reset") { localStorage.clear(); window.location.reload(); }
                  setShowConfirm(null);
                }}
                className="flex-1 py-2.5 rounded-2xl text-sm font-bold"
                style={{ background: "#ef4444", color: "#fff" }}>
                {isUrdu ? "تصدیق کریں" : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
