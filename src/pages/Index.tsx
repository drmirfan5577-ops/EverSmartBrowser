import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { useLanguage } from "@/hooks/useLanguage";
import { useAdmin } from "@/hooks/useAdmin";
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
  const {
    theme, themeId, changeTheme,
    customThemes, saveCustomTheme, deleteCustomTheme, exportTheme, getAllThemes,
  } = useTheme();

  const { lang, toggleLang, isRTL } = useLanguage();

  const {
    adminUnlocked, unlockAdmin, lockAdmin,
    iconConfigs, updateIconConfig, resetIconConfig, resetAllIcons, getIconConfig,
    displayMode, changeDisplayMode,
    changeAdminPassword,
  } = useAdmin();

  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [showSettings, setShowSettings] = useState(false);

  const handleIconPress = (icon: AppIcon) => {
    if (icon.type === "settings") { setShowSettings(true); return; }
    if (icon.type === "tab-islamic") { setActiveTab("islamic"); return; }
    if (icon.type === "tab-news") { setActiveTab("news"); return; }
    if (icon.type === "tab-ai") { setActiveTab("ai"); return; }
    if (icon.type === "tab-social") { setActiveTab("social"); return; }
    if (icon.type === "tab-media") { setActiveTab("media"); return; }
    if (icon.type === "quran" || icon.type === "hadith") { setActiveTab("islamic"); return; }
    if (icon.type === "news-smart" || icon.type === "news-ever") { setActiveTab("news"); return; }
    if (icon.type === "gallery") { setActiveTab("media"); return; }
    if (icon.type === "smart-series") { window.open("https://www.onspace.ai", "_blank"); return; }
    if (icon.url) window.open(icon.url, "_blank");
  };

  const renderTab = () => {
    switch (activeTab) {
      case "home":
        return (
          <HomeTab
            theme={theme}
            lang={lang}
            onIconPress={handleIconPress}
            iconConfigs={iconConfigs}
            displayMode={displayMode}
          />
        );
      case "browser": return <BrowserTab theme={theme} lang={lang} />;
      case "islamic": return <IslamicTab theme={theme} lang={lang} />;
      case "news": return <NewsTab theme={theme} lang={lang} />;
      case "ai": return <AITab theme={theme} lang={lang} />;
      case "social": return <SocialTab theme={theme} lang={lang} />;
      case "themes":
        return (
          <ThemesTab
            theme={theme}
            currentThemeId={themeId}
            onThemeChange={changeTheme}
            lang={lang}
            customThemes={customThemes}
            onSaveCustomTheme={saveCustomTheme}
            onDeleteCustomTheme={deleteCustomTheme}
            onExportTheme={exportTheme}
          />
        );
      case "media": return <MediaTab theme={theme} lang={lang} />;
      default: return <HomeTab theme={theme} lang={lang} onIconPress={handleIconPress} iconConfigs={iconConfigs} displayMode={displayMode} />;
    }
  };

  return (
    <div
      className="min-h-dvh relative overflow-x-hidden"
      style={{ background: theme.bgGradient }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Top Motives Strip */}
      <div className="text-center py-1.5 text-[10px] font-medium tracking-wider text-white" style={{ background: "rgba(0,0,0,0.6)" }}>
        <span className="opacity-80">Motives • Narratives • Perspectives • Vision & Mission • About Us</span>
      </div>

      <Header theme={theme} lang={lang} />
      <LangToggle lang={lang} onToggle={toggleLang} theme={theme} />

      <div className="overflow-y-auto" style={{ paddingBottom: "9rem" }}>
        {renderTab()}
      </div>

      <NewsTickerStrips theme={theme} lang={lang} />

      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        theme={theme}
        isRTL={isRTL}
        lang={lang}
      />

      {showSettings && (
        <SettingsView
          theme={theme}
          lang={lang}
          onClose={() => setShowSettings(false)}
          iconConfigs={iconConfigs}
          onUpdateIconConfig={updateIconConfig}
          onResetIconConfig={resetIconConfig}
          onResetAllIcons={resetAllIcons}
          displayMode={displayMode}
          onChangeDisplayMode={changeDisplayMode}
          onSaveCustomTheme={saveCustomTheme}
          onLockAdmin={lockAdmin}
          onChangePassword={changeAdminPassword}
          adminUnlocked={adminUnlocked}
          onUnlockAdmin={unlockAdmin}
        />
      )}
    </div>
  );
}
