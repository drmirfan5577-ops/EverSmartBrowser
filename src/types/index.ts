export type Language = "en" | "ur" | "ar";

export interface MultiLangText {
  en: string;
  ur: string;
  ar?: string;
}

export interface AppIcon {
  id: string;
  name: MultiLangText;
  icon: string;
  color: string;
  url?: string;
  type?: string;
  fab?: boolean;
  // Admin customization fields
  enabled?: boolean;
  customLabel?: string;
  customColor?: string;
  customSize?: "sm" | "md" | "lg" | "xl";
  customShape?: "rounded" | "circle" | "square" | "diamond" | "hexagon";
  customTexture?: "glass" | "solid" | "gradient" | "crystal" | "neon" | "3d";
  customBg?: string;
  sortOrder?: number;
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
  isCustom?: boolean;
  createdAt?: number;
}

export type TabId = "home" | "browser" | "islamic" | "news" | "ai" | "social" | "themes" | "media" | "settings";

export interface ViewState {
  activeTab: TabId;
  subView: string | null;
  theme: string;
  language: Language;
}

export interface AdminState {
  unlocked: boolean;
  section: AdminSection;
}

export type AdminSection =
  | "dashboard"
  | "icons"
  | "themes"
  | "display"
  | "content"
  | "security"
  | "system"
  | "theme-builder";

export interface IconConfig {
  id: string;
  enabled: boolean;
  customLabel?: string;
  customColor?: string;
  customSize: "sm" | "md" | "lg" | "xl";
  customShape: "rounded" | "circle" | "square" | "diamond" | "hexagon";
  customTexture: "glass" | "solid" | "gradient" | "crystal" | "neon" | "3d";
  customBg?: string;
  sortOrder: number;
}

export interface CustomTheme extends Theme {
  isCustom: true;
  createdAt: number;
  bg1: string;
  bg2: string;
  bg3: string;
  glassOpacity: number;
  glowIntensity: number;
}

export type DisplayMode = "grid5" | "grid4" | "grid3" | "list" | "minimal" | "3d" | "4d";
