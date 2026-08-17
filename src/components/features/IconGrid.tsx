import type { IconConfig, Theme, Language } from "@/types";
import type { AppIcon, MultiLangText } from "@/types";

interface IconGridProps {
  icons: AppIcon[];
  theme: Theme;
  lang: Language;
  onIconPress: (icon: AppIcon) => void;
  iconConfigs?: Record<string, IconConfig>;
  displayMode?: string;
}

function getLabel(name: MultiLangText, lang: Language): string {
  if (lang === "ur") return name.ur;
  if (lang === "ar" && name.ar) return name.ar;
  return name.en;
}

function getShapeStyle(shape: string): React.CSSProperties {
  switch (shape) {
    case "circle": return { borderRadius: "50%" };
    case "square": return { borderRadius: "8px" };
    case "diamond": return { borderRadius: "8px", transform: "rotate(45deg)" };
    case "hexagon": return { borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%", clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" };
    default: return { borderRadius: "18px" };
  }
}

function getTextureStyle(texture: string, color: string, cardBg: string, borderColor: string): React.CSSProperties {
  switch (texture) {
    case "solid": return { background: `${color}33`, border: `1px solid ${color}55` };
    case "gradient": return { background: `linear-gradient(135deg, ${color}44, ${color}11)`, border: `1px solid ${color}44` };
    case "crystal": return {
      background: `linear-gradient(145deg, rgba(255,255,255,0.22), rgba(255,255,255,0.04))`,
      backdropFilter: "blur(16px)",
      border: `1px solid rgba(255,255,255,0.3)`,
      boxShadow: `0 4px 15px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.35)`,
    };
    case "neon": return {
      background: `rgba(0,0,0,0.6)`,
      border: `1px solid ${color}`,
      boxShadow: `0 0 10px ${color}55, 0 0 20px ${color}22, inset 0 0 10px ${color}11`,
    };
    case "3d": return {
      background: `linear-gradient(145deg, ${color}55, ${color}22)`,
      border: `2px solid ${color}77`,
      boxShadow: `4px 4px 8px rgba(0,0,0,0.5), -2px -2px 4px rgba(255,255,255,0.1), inset 1px 1px 2px rgba(255,255,255,0.2)`,
      transform: "perspective(200px) rotateX(6deg)",
    };
    default: return {
      background: cardBg,
      backdropFilter: "blur(12px)",
      border: `1px solid ${borderColor}`,
      boxShadow: "0 4px 15px rgba(0,0,0,0.25), inset 0 1px 1px rgba(255,255,255,0.1)",
    };
  }
}

function getSizeStyle(size: string): { container: React.CSSProperties; icon: string; label: string } {
  switch (size) {
    case "sm": return { container: { padding: "6px" }, icon: "text-[18px]", label: "text-[8px]" };
    case "lg": return { container: { padding: "14px" }, icon: "text-[34px]", label: "text-[10px]" };
    case "xl": return { container: { padding: "18px" }, icon: "text-[40px]", label: "text-[11px]" };
    default:   return { container: { padding: "10px" }, icon: "text-[26px]", label: "text-[9px]" };
  }
}

function getColsClass(mode: string) {
  switch (mode) {
    case "grid4": return "grid-cols-4";
    case "grid3": return "grid-cols-3";
    case "list":  return "grid-cols-1";
    case "minimal": return "grid-cols-5";
    case "3d":    return "grid-cols-4";
    case "4d":    return "grid-cols-4";
    default:      return "grid-cols-5";
  }
}

function getGridWrapperClass(mode: string) {
  if (mode === "3d") return "display-3d-grid";
  if (mode === "4d") return "display-4d-grid";
  return "";
}

export default function IconGrid({ icons, theme, lang, onIconPress, iconConfigs, displayMode = "grid5" }: IconGridProps) {
  const filteredIcons = icons
    .filter(icon => {
      const cfg = iconConfigs?.[icon.id];
      return cfg ? cfg.enabled !== false : true;
    })
    .sort((a, b) => {
      const ca = iconConfigs?.[a.id]?.sortOrder ?? 999;
      const cb = iconConfigs?.[b.id]?.sortOrder ?? 999;
      return ca - cb;
    });

  const isList = displayMode === "list";
  const isMinimal = displayMode === "minimal";
  const is4D = displayMode === "4d";

  if (isList) {
    return (
      <div className="px-3 pb-2 space-y-1.5">
        {filteredIcons.map((icon) => {
          const cfg = iconConfigs?.[icon.id];
          const texture = cfg?.customTexture || "glass";
          const color = cfg?.customColor || icon.color;
          const textureStyle = getTextureStyle(texture, color, theme.cardBg, theme.borderColor);

          return (
            <button
              key={icon.id}
              onClick={() => onIconPress(icon)}
              className="w-full flex items-center gap-3 p-3 rounded-2xl transition-all duration-200 hover:scale-[1.01] active:scale-[0.98]"
              style={textureStyle}
            >
              <i className={`${icon.fab ? "fab" : "fas"} ${icon.icon} text-[22px] w-8 flex-shrink-0`} style={{ color }} />
              <span className="text-sm font-medium flex-1 text-left" style={{ color: theme.textColor, direction: lang !== "en" ? "rtl" : "ltr" }}>
                {cfg?.customLabel || getLabel(icon.name, lang)}
              </span>
              <i className="fas fa-chevron-right text-xs opacity-30" style={{ color: theme.textColor }} />
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={`grid ${getColsClass(displayMode)} gap-2 px-3 pb-2 ${getGridWrapperClass(displayMode)}`}
      style={
        isMinimal
          ? { gap: "4px" }
          : displayMode === "3d" || is4D
          ? { gap: "10px", perspective: "600px" }
          : {}
      }
    >
      {filteredIcons.map((icon, idx) => {
        const cfg = iconConfigs?.[icon.id];
        const shape = cfg?.customShape || "rounded";
        const texture = cfg?.customTexture || "glass";
        const size = cfg?.customSize || "md";
        const color = cfg?.customColor || icon.color;

        const shapeStyle = getShapeStyle(shape);
        const textureStyle = getTextureStyle(texture, color, theme.cardBg, theme.borderColor);
        const sizeInfo = getSizeStyle(size);
        const isDiamond = shape === "diamond";

        // 4D holographic style override
        const holographicStyle: React.CSSProperties = is4D ? {
          background: `linear-gradient(135deg, ${color}33, rgba(0,200,255,0.1), ${color}22)`,
          border: `1px solid ${color}66`,
          boxShadow: `0 0 15px ${color}33, inset 0 0 10px rgba(255,255,255,0.05)`,
          animationDelay: `${(idx % 5) * 0.2}s`,
        } : {};

        return (
          <button
            key={icon.id}
            onClick={() => onIconPress(icon)}
            className={`flex flex-col items-center justify-center aspect-square transition-all duration-200 hover:scale-105 active:scale-95 ${is4D ? "icon-tile" : ""}`}
            style={{
              ...shapeStyle,
              ...(is4D ? holographicStyle : textureStyle),
              ...sizeInfo.container,
            }}
          >
            <div
              className={`${sizeInfo.icon} mb-1 leading-none`}
              style={isDiamond ? { transform: "rotate(-45deg)" } : {}}
            >
              <i
                className={`${icon.fab ? "fab" : "fas"} ${icon.icon}`}
                style={{ color, filter: texture === "neon" ? `drop-shadow(0 0 6px ${color})` : undefined }}
              />
            </div>
            {!isMinimal && (
              <span
                className={`${sizeInfo.label} font-medium text-center leading-tight line-clamp-2`}
                style={{
                  color: theme.textColor,
                  opacity: 0.85,
                  direction: lang !== "en" ? "rtl" : "ltr",
                  fontFamily: lang === "ur" ? "'Noto Nastaliq Urdu', serif" : "inherit",
                  ...(isDiamond ? { transform: "rotate(-45deg)" } : {}),
                }}
              >
                {cfg?.customLabel || getLabel(icon.name, lang)}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
