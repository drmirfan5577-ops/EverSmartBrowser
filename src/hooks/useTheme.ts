import { useState, useEffect } from "react";
import { getThemeById, THEMES } from "@/data/themes";
import type { Theme, CustomTheme } from "@/types";

const STORAGE_KEY = "esb-theme";
const CUSTOM_THEMES_KEY = "esb-custom-themes";

export function useTheme() {
  const [themeId, setThemeId] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY) || "emerald";
  });

  const [customThemes, setCustomThemes] = useState<CustomTheme[]>(() => {
    try {
      const stored = localStorage.getItem(CUSTOM_THEMES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  const getAllThemes = (): Theme[] => [...THEMES, ...customThemes];

  const getTheme = (id: string): Theme => {
    return getAllThemes().find(t => t.id === id) || THEMES[0];
  };

  const theme = getTheme(themeId);

  const applyTheme = (t: Theme) => {
    const root = document.documentElement;
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
  }, [themeId, customThemes]);

  const changeTheme = (id: string) => setThemeId(id);

  const saveCustomTheme = (ct: CustomTheme) => {
    setCustomThemes(prev => {
      const exists = prev.findIndex(t => t.id === ct.id);
      const updated = exists >= 0
        ? prev.map(t => t.id === ct.id ? ct : t)
        : [...prev, ct];
      localStorage.setItem(CUSTOM_THEMES_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const deleteCustomTheme = (id: string) => {
    setCustomThemes(prev => {
      const updated = prev.filter(t => t.id !== id);
      localStorage.setItem(CUSTOM_THEMES_KEY, JSON.stringify(updated));
      return updated;
    });
    if (themeId === id) setThemeId("emerald");
  };

  const exportTheme = (t: Theme) => {
    const json = JSON.stringify(t, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${t.id}-theme.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importTheme = (file: File) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string) as CustomTheme;
          data.id = `custom-${Date.now()}`;
          data.isCustom = true;
          data.createdAt = Date.now();
          saveCustomTheme(data);
          resolve();
        } catch { reject(new Error("Invalid theme file")); }
      };
      reader.readAsText(file);
    });
  };

  return {
    theme, themeId, changeTheme,
    customThemes, saveCustomTheme, deleteCustomTheme,
    exportTheme, importTheme,
    getAllThemes,
  };
}
