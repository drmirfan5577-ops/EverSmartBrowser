import { useState } from "react";
import type { Theme, Language, CustomTheme } from "@/types";

interface ThemeBuilderProps {
  theme: Theme;
  lang: Language;
  onSave: (ct: CustomTheme) => void;
  onClose: () => void;
  editTheme?: CustomTheme | null;
}

const PRESET_COMBOS = [
  { name: "Midnight Blue", bg1: "#0a0a2e", bg2: "#0d2469", bg3: "#0a0a2e", accent: "#3b82f6", text: "#dbeafe", card: "rgba(30,50,150,0.4)", border: "rgba(59,130,246,0.3)", bismillah: "#fbbf24" },
  { name: "Forest Green", bg1: "#001a0f", bg2: "#003d25", bg3: "#001a0f", accent: "#10b981", text: "#d1fae5", card: "rgba(0,100,50,0.35)", border: "rgba(16,185,129,0.3)", bismillah: "#fcd34d" },
  { name: "Cosmic Purple", bg1: "#0f0c29", bg2: "#302b63", bg3: "#24243e", accent: "#a855f7", text: "#f3e8ff", card: "rgba(50,40,100,0.4)", border: "rgba(168,85,247,0.3)", bismillah: "#fbbf24" },
  { name: "Crimson Night", bg1: "#1a0000", bg2: "#7b0000", bg3: "#1a0000", accent: "#ef4444", text: "#fee2e2", card: "rgba(150,0,0,0.4)", border: "rgba(239,68,68,0.3)", bismillah: "#fbbf24" },
  { name: "Teal Ocean", bg1: "#001a1f", bg2: "#004d5c", bg3: "#001a1f", accent: "#06b6d4", text: "#cffafe", card: "rgba(0,100,120,0.35)", border: "rgba(6,182,212,0.3)", bismillah: "#fbbf24" },
  { name: "Rose Gold", bg1: "#2d0010", bg2: "#8b3a4a", bg3: "#2d0010", accent: "#f472b6", text: "#fce7f3", card: "rgba(150,60,80,0.35)", border: "rgba(244,114,182,0.3)", bismillah: "#fcd34d" },
];

const GRADIENT_TYPES = ["linear-180", "linear-135", "radial-center", "radial-top", "conic"];

export default function ThemeBuilder({ theme, lang, onSave, onClose, editTheme }: ThemeBuilderProps) {
  const isUrdu = lang !== "en";
  const [step, setStep] = useState(1);
  const [themeName, setThemeName] = useState(editTheme?.name || "");
  const [themeNameUr, setThemeNameUr] = useState(editTheme?.nameUr || "");
  const [emoji, setEmoji] = useState(editTheme?.emoji || "🎨");
  const [mode, setMode] = useState<"dark" | "light">(editTheme?.mode || "dark");
  const [bg1, setBg1] = useState(editTheme?.bg1 || "#001a0f");
  const [bg2, setBg2] = useState(editTheme?.bg2 || "#003d25");
  const [bg3, setBg3] = useState(editTheme?.bg3 || "#001a0f");
  const [gradientType, setGradientType] = useState("linear-180");
  const [accentColor, setAccentColor] = useState(editTheme?.accentColor || "#34d399");
  const [textColor, setTextColor] = useState(editTheme?.textColor || "#e2f8ef");
  const [bismillahColor, setBismillahColor] = useState(editTheme?.bismillahColor || "#fbbf24");
  const [glassOpacity, setGlassOpacity] = useState(editTheme?.glassOpacity ?? 0.35);
  const [glowIntensity, setGlowIntensity] = useState(editTheme?.glowIntensity ?? 0.4);
  const [isSaving, setIsSaving] = useState(false);

  const buildGradient = () => {
    switch (gradientType) {
      case "linear-135": return `linear-gradient(135deg, ${bg1} 0%, ${bg2} 50%, ${bg3} 100%)`;
      case "radial-center": return `radial-gradient(ellipse at center, ${bg2} 0%, ${bg1} 70%, ${bg3} 100%)`;
      case "radial-top": return `radial-gradient(ellipse at 50% 20%, ${bg2} 0%, ${bg1} 60%), linear-gradient(180deg, ${bg1} 0%, ${bg3} 100%)`;
      case "conic": return `conic-gradient(from 180deg at 50% 50%, ${bg1}, ${bg2}, ${bg3}, ${bg1})`;
      default: return `linear-gradient(180deg, ${bg1} 0%, ${bg2} 50%, ${bg3} 100%)`;
    }
  };

  const buildCardBg = () =>
    `rgba(${parseInt(accentColor.slice(1, 3), 16)},${parseInt(accentColor.slice(3, 5), 16)},${parseInt(accentColor.slice(5, 7), 16)},${glassOpacity})`;

  const buildBorderColor = () =>
    `rgba(${parseInt(accentColor.slice(1, 3), 16)},${parseInt(accentColor.slice(3, 5), 16)},${parseInt(accentColor.slice(5, 7), 16)},${glowIntensity})`;

  const preview: CustomTheme = {
    id: editTheme?.id || `custom-${Date.now()}`,
    name: themeName || "Custom Theme",
    nameUr: themeNameUr || "کسٹم تھیم",
    emoji,
    mode,
    cssClass: "theme-custom",
    accentColor,
    bgGradient: buildGradient(),
    cardBg: buildCardBg(),
    textColor,
    borderColor: buildBorderColor(),
    bismillahColor,
    isCustom: true,
    createdAt: editTheme?.createdAt || Date.now(),
    bg1, bg2, bg3,
    glassOpacity,
    glowIntensity,
  };

  const applyPreset = (p: typeof PRESET_COMBOS[0]) => {
    setBg1(p.bg1); setBg2(p.bg2); setBg3(p.bg3);
    setAccentColor(p.accent); setTextColor(p.text);
    setBismillahColor(p.bismillah);
    if (!themeName) setThemeName(p.name);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      onSave(preview);
      setIsSaving(false);
      onClose();
    }, 400);
  };

  const EMOJIS = ["🎨", "🌟", "💎", "🔥", "🌙", "⚡", "🌊", "🏔️", "🌺", "🦋", "🎯", "🚀", "☀️", "🌈", "💫", "🎭", "🌿", "💜"];

  const steps = [
    { n: 1, label: isUrdu ? "نام" : "Name & Mode" },
    { n: 2, label: isUrdu ? "پس منظر" : "Background" },
    { n: 3, label: isUrdu ? "رنگ" : "Colors" },
    { n: 4, label: isUrdu ? "اثرات" : "Effects" },
    { n: 5, label: isUrdu ? "محفوظ" : "Save" },
  ];

  const btn = "flex-1 py-2 rounded-xl text-sm font-bold transition-all duration-200";

  return (
    <div
      className="fixed inset-0 z-[70] flex flex-col"
      style={{ background: preview.bgGradient }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 p-4 sticky top-0 z-10"
        style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${accentColor}33` }}
      >
        <button onClick={onClose} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.1)" }}>
          <i className="fas fa-times text-white text-sm" />
        </button>
        <div>
          <h2 className="text-base font-bold text-white font-orbitron">
            {isUrdu ? "کسٹم تھیم بنائیں" : "Theme Builder Wizard"}
          </h2>
          <p className="text-[10px] opacity-60 text-white">{isUrdu ? "مرحلہ" : "Step"} {step}/5</p>
        </div>
        <div className="ml-auto text-2xl">{emoji}</div>
      </div>

      {/* Step Indicator */}
      <div className="flex gap-1 px-4 pt-3 pb-1">
        {steps.map(s => (
          <button key={s.n} onClick={() => setStep(s.n)} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="w-full h-1.5 rounded-full transition-all duration-300"
              style={{ background: step >= s.n ? accentColor : "rgba(255,255,255,0.15)" }}
            />
            <span className="text-[8px] opacity-60 text-white">{s.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">

        {/* Step 1: Name & Mode */}
        {step === 1 && (
          <div className="space-y-4">
            <div
              className="p-4 rounded-2xl text-center"
              style={{ background: "rgba(255,255,255,0.08)", border: `1px solid ${accentColor}33` }}
            >
              <p className="text-white font-bold text-sm mb-3">{isUrdu ? "ایموجی چنیں" : "Choose Emoji"}</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {EMOJIS.map(e => (
                  <button key={e} onClick={() => setEmoji(e)}
                    className="w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all"
                    style={{ background: emoji === e ? accentColor : "rgba(255,255,255,0.1)", transform: emoji === e ? "scale(1.2)" : "scale(1)" }}>
                    {e}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ background: "rgba(255,255,255,0.08)", border: `1px solid ${accentColor}33` }} className="p-4 rounded-2xl space-y-3">
              <div>
                <label className="text-white text-xs opacity-70 block mb-1">{isUrdu ? "تھیم کا نام (English)" : "Theme Name (English)"}</label>
                <input value={themeName} onChange={e => setThemeName(e.target.value)}
                  className="w-full p-2.5 rounded-xl text-sm bg-transparent outline-none text-white"
                  style={{ border: `1px solid ${accentColor}55` }}
                  placeholder="My Custom Theme" />
              </div>
              <div>
                <label className="text-white text-xs opacity-70 block mb-1">{isUrdu ? "تھیم کا نام (اردو)" : "Theme Name (Urdu)"}</label>
                <input value={themeNameUr} onChange={e => setThemeNameUr(e.target.value)}
                  className="w-full p-2.5 rounded-xl text-sm bg-transparent outline-none text-white text-right"
                  style={{ border: `1px solid ${accentColor}55`, direction: "rtl", fontFamily: "'Noto Nastaliq Urdu', serif" }}
                  placeholder="میری تھیم" />
              </div>
              <div className="flex gap-3">
                {(["dark", "light"] as const).map(m => (
                  <button key={m} onClick={() => setMode(m)}
                    className={`${btn}`}
                    style={{
                      background: mode === m ? accentColor : "rgba(255,255,255,0.1)",
                      color: mode === m ? "#000" : "#fff",
                      border: `1px solid ${mode === m ? accentColor : "rgba(255,255,255,0.2)"}`,
                    }}>
                    {m === "dark" ? "🌙 Dark" : "☀️ Light"}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Presets */}
            <div style={{ background: "rgba(255,255,255,0.08)", border: `1px solid ${accentColor}33` }} className="p-4 rounded-2xl">
              <p className="text-white text-xs font-bold mb-3 opacity-80">⚡ {isUrdu ? "فوری پریسیٹس" : "Quick Presets"}</p>
              <div className="grid grid-cols-3 gap-2">
                {PRESET_COMBOS.map(p => (
                  <button key={p.name} onClick={() => applyPreset(p)}
                    className="p-2 rounded-xl text-[10px] text-white font-medium transition-all hover:scale-105"
                    style={{ background: `linear-gradient(135deg, ${p.bg1}, ${p.bg2})`, border: `1px solid ${p.accent}55` }}>
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Background */}
        {step === 2 && (
          <div className="space-y-4">
            <div style={{ background: "rgba(255,255,255,0.08)", border: `1px solid ${accentColor}33` }} className="p-4 rounded-2xl">
              <p className="text-white text-sm font-bold mb-3">{isUrdu ? "گریڈیئنٹ رنگ" : "Gradient Colors"}</p>
              {[
                { label: isUrdu ? "رنگ 1 (اوپر)" : "Color 1 (Top)", val: bg1, set: setBg1 },
                { label: isUrdu ? "رنگ 2 (درمیان)" : "Color 2 (Middle)", val: bg2, set: setBg2 },
                { label: isUrdu ? "رنگ 3 (نیچے)" : "Color 3 (Bottom)", val: bg3, set: setBg3 },
              ].map(row => (
                <div key={row.label} className="flex items-center gap-3 mb-3">
                  <label className="text-white text-xs w-28 opacity-70 flex-shrink-0">{row.label}</label>
                  <div className="flex items-center gap-2 flex-1">
                    <input type="color" value={row.val} onChange={e => row.set(e.target.value)}
                      className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0.5"
                      style={{ background: "transparent" }} />
                    <input value={row.val} onChange={e => row.set(e.target.value)}
                      className="flex-1 p-2 rounded-lg text-xs bg-transparent outline-none text-white font-mono"
                      style={{ border: `1px solid ${accentColor}44` }} />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: "rgba(255,255,255,0.08)", border: `1px solid ${accentColor}33` }} className="p-4 rounded-2xl">
              <p className="text-white text-sm font-bold mb-3">{isUrdu ? "گریڈیئنٹ قسم" : "Gradient Type"}</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "linear-180", label: "Linear ↓" },
                  { id: "linear-135", label: "Linear ↗" },
                  { id: "radial-center", label: "Radial Center" },
                  { id: "radial-top", label: "Radial Top" },
                  { id: "conic", label: "Conic Spin" },
                ].map(gt => (
                  <button key={gt.id} onClick={() => setGradientType(gt.id)}
                    className="p-2.5 rounded-xl text-xs font-medium text-white transition-all"
                    style={{
                      background: gradientType === gt.id ? accentColor : "rgba(255,255,255,0.08)",
                      border: `1px solid ${gradientType === gt.id ? accentColor : "rgba(255,255,255,0.15)"}`,
                      color: gradientType === gt.id ? "#000" : "#fff",
                    }}>
                    {gt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Preview */}
            <div className="p-3 rounded-2xl" style={{ background: preview.bgGradient, border: `2px solid ${accentColor}55`, minHeight: "80px" }}>
              <p className="text-white text-[10px] opacity-60 text-center">{isUrdu ? "پیش نظارہ" : "Preview"}</p>
            </div>
          </div>
        )}

        {/* Step 3: Colors */}
        {step === 3 && (
          <div className="space-y-4">
            {[
              { label: isUrdu ? "ایکسنٹ رنگ (بنیادی)" : "Accent / Primary Color", val: accentColor, set: setAccentColor },
              { label: isUrdu ? "ٹیکسٹ رنگ" : "Text Color", val: textColor, set: setTextColor },
              { label: isUrdu ? "بسم اللہ رنگ" : "Bismillah Color", val: bismillahColor, set: setBismillahColor },
            ].map(row => (
              <div key={row.label} style={{ background: "rgba(255,255,255,0.08)", border: `1px solid ${accentColor}33` }} className="p-4 rounded-2xl">
                <label className="text-white text-xs opacity-70 block mb-2">{row.label}</label>
                <div className="flex items-center gap-3">
                  <input type="color" value={row.val} onChange={e => row.set(e.target.value)}
                    className="w-12 h-12 rounded-xl cursor-pointer border-0 p-0.5"
                    style={{ background: "transparent" }} />
                  <div className="flex-1">
                    <input value={row.val} onChange={e => row.set(e.target.value)}
                      className="w-full p-2 rounded-lg text-xs bg-transparent outline-none text-white font-mono"
                      style={{ border: `1px solid ${accentColor}44` }} />
                    <div className="mt-2 flex gap-2 flex-wrap">
                      {["#34d399", "#3b82f6", "#f59e0b", "#ef4444", "#a855f7", "#06b6d4", "#f472b6", "#10b981", "#ffffff", "#fbbf24"].map(c => (
                        <button key={c} onClick={() => row.set(c)}
                          className="w-6 h-6 rounded-full border-2 transition-all hover:scale-110"
                          style={{ background: c, borderColor: row.val === c ? "#fff" : "transparent" }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Color Preview Pill */}
            <div className="flex gap-3 p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.08)", border: `1px solid ${accentColor}33` }}>
              <div className="flex-1 p-3 rounded-xl text-center" style={{ background: buildCardBg(), border: `1px solid ${buildBorderColor()}` }}>
                <span className="text-sm font-bold" style={{ color: accentColor }}>Accent</span>
              </div>
              <div className="flex-1 p-3 rounded-xl text-center" style={{ background: buildCardBg() }}>
                <span className="text-sm" style={{ color: textColor }}>Text</span>
              </div>
              <div className="flex-1 p-3 rounded-xl text-center">
                <span className="text-lg font-amiri" style={{ color: bismillahColor }}>بسم اللہ</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Effects */}
        {step === 4 && (
          <div className="space-y-4">
            <div style={{ background: "rgba(255,255,255,0.08)", border: `1px solid ${accentColor}33` }} className="p-4 rounded-2xl">
              <div className="flex items-center justify-between mb-2">
                <label className="text-white text-sm">{isUrdu ? "گلاس شفافیت" : "Glass Card Opacity"}</label>
                <span className="text-xs font-mono" style={{ color: accentColor }}>{Math.round(glassOpacity * 100)}%</span>
              </div>
              <input type="range" min="0.05" max="0.8" step="0.05" value={glassOpacity} onChange={e => setGlassOpacity(parseFloat(e.target.value))}
                className="w-full accent-green-400" style={{ accentColor }} />
              <div className="mt-3 p-3 rounded-xl" style={{ background: buildCardBg(), border: `1px solid ${buildBorderColor()}` }}>
                <span className="text-xs text-white opacity-60">{isUrdu ? "کارڈ کا نمونہ" : "Card Preview"}</span>
              </div>
            </div>

            <div style={{ background: "rgba(255,255,255,0.08)", border: `1px solid ${accentColor}33` }} className="p-4 rounded-2xl">
              <div className="flex items-center justify-between mb-2">
                <label className="text-white text-sm">{isUrdu ? "چمک کی شدت" : "Glow / Border Intensity"}</label>
                <span className="text-xs font-mono" style={{ color: accentColor }}>{Math.round(glowIntensity * 100)}%</span>
              </div>
              <input type="range" min="0.05" max="0.9" step="0.05" value={glowIntensity} onChange={e => setGlowIntensity(parseFloat(e.target.value))}
                className="w-full" style={{ accentColor }} />
            </div>

            {/* Full Preview */}
            <div className="p-4 rounded-2xl overflow-hidden" style={{ background: preview.bgGradient, border: `2px solid ${accentColor}55` }}>
              <div className="text-center mb-3">
                <span className="text-2xl font-amiri glow-gold" style={{ color: preview.bismillahColor }}>بِسْمِ اللَّهِ</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {["i fa-book-quran", "i fa-robot", "i fa-newspaper"].map((ic, idx) => (
                  <div key={idx} className="flex flex-col items-center p-2.5 rounded-2xl"
                    style={{ background: preview.cardBg, border: `1px solid ${preview.borderColor}` }}>
                    <i className={`fas ${ic.split(" ")[1]} text-xl`} style={{ color: preview.accentColor }} />
                    <span className="text-[9px] mt-1 text-white opacity-70">Icon</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Save & Export */}
        {step === 5 && (
          <div className="space-y-4">
            {/* Final Preview Card */}
            <div className="p-5 rounded-2xl" style={{ background: preview.bgGradient, border: `2px solid ${accentColor}55`, boxShadow: `0 0 30px ${accentColor}33` }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{emoji}</span>
                <div>
                  <div className="font-bold text-lg text-white">{themeName || "Custom Theme"}</div>
                  <div className="text-sm opacity-60 text-white" style={{ fontFamily: "'Noto Nastaliq Urdu', serif", direction: "rtl" }}>{themeNameUr || "کسٹم تھیم"}</div>
                </div>
                <span className="ml-auto px-3 py-1 rounded-full text-xs font-bold" style={{ background: accentColor, color: "#000" }}>{mode}</span>
              </div>
              <div className="flex gap-2 mt-3">
                {[accentColor, bg1, bg2, textColor, bismillahColor].map((c, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white/20" style={{ background: c }} />
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full py-4 rounded-2xl font-bold text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}99)`, color: "#000", boxShadow: `0 0 20px ${accentColor}55` }}
              >
                {isSaving
                  ? (isUrdu ? "محفوظ ہو رہا ہے..." : "Saving...")
                  : (isUrdu ? "💾 تھیم محفوظ کریں" : "💾 Save Theme")}
              </button>

              <button
                onClick={() => {
                  const json = JSON.stringify(preview, null, 2);
                  const blob = new Blob([json], { type: "application/json" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `${themeName || "custom"}-theme.json`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="w-full py-3 rounded-2xl font-bold text-sm border transition-all duration-200 hover:scale-[1.01] text-white"
                style={{ background: "rgba(255,255,255,0.08)", border: `1px solid ${accentColor}44` }}
              >
                <i className="fas fa-download mr-2" />
                {isUrdu ? "تھیم ایکسپورٹ کریں" : "Export Theme (.json)"}
              </button>

              <button
                onClick={() => setStep(1)}
                className="w-full py-3 rounded-2xl font-medium text-sm text-white/60 transition-all"
                style={{ background: "rgba(255,255,255,0.05)" }}
              >
                <i className="fas fa-redo mr-2" />
                {isUrdu ? "دوبارہ شروع کریں (ریمکس)" : "Remix / Start Over"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div
        className="flex gap-3 p-4 sticky bottom-0"
        style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(20px)", borderTop: `1px solid ${accentColor}33` }}
      >
        {step > 1 && (
          <button onClick={() => setStep(s => s - 1)}
            className="flex-1 py-3 rounded-2xl font-bold text-sm text-white"
            style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}>
            <i className="fas fa-arrow-left mr-2" />
            {isUrdu ? "پیچھے" : "Back"}
          </button>
        )}
        {step < 5 && (
          <button onClick={() => setStep(s => s + 1)}
            className="flex-1 py-3 rounded-2xl font-bold text-sm"
            style={{ background: accentColor, color: "#000" }}>
            {isUrdu ? "اگلا" : "Next"}
            <i className="fas fa-arrow-right ml-2" />
          </button>
        )}
      </div>
    </div>
  );
}
