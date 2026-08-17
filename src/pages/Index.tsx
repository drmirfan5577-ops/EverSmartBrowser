import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { useLanguage } from "@/hooks/useLanguage";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import LangToggle from "@/components/features/LangToggle";
import NewsTickerStrips from "@/components/features/NewsTickerStrips";
import HomeTab from "@/pages/tabs/HomeTab";
import IslamicTab from "@/pages/tabs/IslamicTab";
import NewsTab from "@/pages/tabs/NewsTab";
import AITab from "@/pages/tabs/AITab";
import SocialTab from "@/pages/tabs/SocialTab";
import ThemesTab from "@/pages/tabs/ThemesTab";
import MediaTab from "@/pages/tabs/MediaTab";
import BrowserTab from "@/pages/tabs/BrowserTab";
import SettingsView from "@/pages/tabs/SettingsView";
import type { TabId, AppIcon } from "@/types";

export default function Index() {
  const { theme, themeId, changeTheme } = useTheme();
  const { lang, toggleLang, t, isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [showSettings, setShowSettings] = useState(false);

  const handleIconPress = (icon: AppIcon) => {
    if (icon.type === "settings") {
      setShowSettings(true);
      return;
    }
    if (icon.type === "tab-islamic") { setActiveTab("islamic"); return; }
    if (icon.type === "tab-news") { setActiveTab("news"); return; }
    if (icon.type === "tab-ai") { setActiveTab("ai"); return; }
    if (icon.type === "tab-social") { setActiveTab("social"); return; }
    if (icon.type === "tab-media") { setActiveTab("media"); return; }
    if (icon.type === "quran") { setActiveTab("islamic"); return; }
    if (icon.type === "hadith") { setActiveTab("islamic"); return; }
    if (icon.type === "news-smart" || icon.type === "news-ever") { setActiveTab("news"); return; }
    if (icon.type === "gallery") { setActiveTab("media"); return; }
    if (icon.type === "smart-series") {
      window.open("https://www.onspace.ai", "_blank");
      return;
    }
    if (icon.url) {
      window.open(icon.url, "_blank");
    }
  };

  const renderTab = () => {
    switch (activeTab) {
      case "home": return <HomeTab theme={theme} lang={lang} onIconPress={handleIconPress} />;
      case "browser": return <BrowserTab theme={theme} lang={lang} />;
      case "islamic": return <IslamicTab theme={theme} lang={lang} />;
      case "news": return <NewsTab theme={theme} lang={lang} />;
      case "ai": return <AITab theme={theme} lang={lang} />;
      case "social": return <SocialTab theme={theme} lang={lang} />;
      case "themes": return <ThemesTab theme={theme} currentThemeId={themeId} onThemeChange={changeTheme} lang={lang} />;
      case "media": return <MediaTab theme={theme} lang={lang} />;
      default: return <HomeTab theme={theme} lang={lang} onIconPress={handleIconPress} />;
    }
  };

  return (
    <div
      className="min-h-dvh relative overflow-x-hidden"
      style={{ background: theme.bgGradient }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Top Motives Strip */}
      <div
        className="text-center py-1.5 text-[10px] font-medium tracking-wider text-white"
        style={{ background: "rgba(0,0,0,0.6)" }}
      >
        <span className="opacity-80">
          Motives • Narratives • Perspectives • Vision & Mission • About Us
        </span>
      </div>

      {/* Header */}
      <Header theme={theme} lang={lang} />

      {/* Language Toggle */}
      <LangToggle lang={lang} onToggle={toggleLang} theme={theme} />

      {/* Main Content */}
      <div
        className="overflow-y-auto"
        style={{ paddingBottom: "9rem" }} // bottom nav + tickers
      >
        {renderTab()}
      </div>

      {/* News Ticker Strips */}
      <NewsTickerStrips theme={theme} lang={lang} />

      {/* Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        theme={theme}
        isRTL={isRTL}
        lang={lang}
      />

      {/* Settings View */}
      {showSettings && (
        <SettingsView
          theme={theme}
          lang={lang}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}
