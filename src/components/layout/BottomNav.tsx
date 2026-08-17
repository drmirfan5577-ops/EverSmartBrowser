import type { TabId } from "@/types";
import type { Theme } from "@/types";

interface NavItem {
  id: TabId;
  labelEn: string;
  labelUr: string;
  icon: string;
  live?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { id: "home",     labelEn: "Home",    labelUr: "ہوم",      icon: "fa-house" },
  { id: "browser",  labelEn: "Browser", labelUr: "براؤزر",   icon: "fa-globe" },
  { id: "islamic",  labelEn: "Islamic", labelUr: "اسلامی",   icon: "fa-star-and-crescent" },
  { id: "news",     labelEn: "News",    labelUr: "خبریں",    icon: "fa-newspaper", live: true },
  { id: "ai",       labelEn: "AI Hub",  labelUr: "اے آئی",   icon: "fa-robot" },
  { id: "social",   labelEn: "Social",  labelUr: "سوشل",     icon: "fa-share-nodes" },
  { id: "themes",   labelEn: "Themes",  labelUr: "تھیمز",    icon: "fa-palette" },
  { id: "media",    labelEn: "Media",   labelUr: "میڈیا",    icon: "fa-play-circle" },
];

interface BottomNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  theme: Theme;
  isRTL: boolean;
  lang: string;
}

export default function BottomNav({ activeTab, onTabChange, theme, isRTL, lang }: BottomNavProps) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center"
      style={{
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(20px)",
        borderTop: `1px solid ${theme.borderColor}`,
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      {NAV_ITEMS.map((item) => {
        const isActive = activeTab === item.id;
        const label = lang === "ur" || lang === "ar" ? item.labelUr : item.labelEn;
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5 relative transition-all duration-200"
            style={{
              color: isActive ? theme.accentColor : `${theme.textColor}80`,
              background: isActive ? `${theme.accentColor}15` : "transparent",
            }}
          >
            <div className="relative">
              <i className={`fas ${item.icon} text-[14px]`} />
              {item.live && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[7px] font-bold px-1 rounded-full leading-tight">
                  LIVE
                </span>
              )}
            </div>
            <span className="text-[9px] font-medium leading-tight truncate max-w-[48px] text-center">
              {label}
            </span>
            {isActive && (
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px] rounded-full"
                style={{ background: theme.accentColor }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
