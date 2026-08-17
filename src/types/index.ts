export type Language = "en" | "ur" | "ar";

export interface MultiLangText {
  en: string;
  ur: string;
  ar?: string;
}

export interface AppIcon {
  id: string;
  name: MultiLangText;
  icon: string; // font-awesome class
  color: string;
  url?: string;
  type?: string;
  fab?: boolean;
}

export interface Theme {
  id: string;
  name: string;
  nameUr: string;
  emoji: string;
  mode: "light" | "dark";
  cssClass: string;
  accentColor: string;
  bgGradient: string;
  cardBg: string;
  textColor: string;
  borderColor: string;
  bismillahColor: string;
}

export type TabId = "home" | "browser" | "islamic" | "news" | "ai" | "social" | "themes" | "media" | "settings";

export interface ViewState {
  activeTab: TabId;
  subView: string | null;
  theme: string;
  language: Language;
}
