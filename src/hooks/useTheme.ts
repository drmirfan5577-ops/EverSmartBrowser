import { useState, useEffect } from "react";
import { getThemeById } from "@/data/themes";
import type { Theme } from "@/types";

const STORAGE_KEY = "esb-theme";

export function useTheme() {
  const [themeId, setThemeId] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY) || "emerald";
  });

  const theme = getThemeById(themeId);

  const applyTheme = (t: Theme) => {
    const root = document.documentElement;
    // Apply CSS variables based on theme
    document.body.style.background = t.bgGradient;
    document.body.style.minHeight = "100dvh";
    root.style.setProperty("--active-accent", t.accentColor);
    root.style.setProperty("--active-card-bg", t.cardBg);
    root.style.setProperty("--active-text", t.textColor);
    root.style.setProperty("--active-border", t.borderColor);
    root.style.setProperty("--active-bismillah", t.bismillahColor);
  };

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem(STORAGE_KEY, themeId);
  }, [themeId]);

  const changeTheme = (id: string) => {
    setThemeId(id);
  };

  return { theme, themeId, changeTheme };
}
