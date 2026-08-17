import { useState, useEffect } from "react";
import type { IconConfig, DisplayMode } from "@/types";
import { ALL_ICONS } from "@/data/icons";

const ICONS_KEY = "esb-icon-configs";
const DISPLAY_KEY = "esb-display-mode";
const ADMIN_KEY = "esb-admin-unlocked";

function defaultConfig(id: string, idx: number): IconConfig {
  return {
    id,
    enabled: true,
    customSize: "md",
    customShape: "rounded",
    customTexture: "glass",
    sortOrder: idx,
  };
}

export function useAdmin() {
  const [adminUnlocked, setAdminUnlocked] = useState<boolean>(() => {
    return sessionStorage.getItem(ADMIN_KEY) === "true";
  });

  const [iconConfigs, setIconConfigs] = useState<Record<string, IconConfig>>(() => {
    try {
      const stored = localStorage.getItem(ICONS_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    const defaults: Record<string, IconConfig> = {};
    ALL_ICONS.forEach((icon, idx) => {
      defaults[icon.id] = defaultConfig(icon.id, idx);
    });
    return defaults;
  });

  const [displayMode, setDisplayMode] = useState<DisplayMode>(() => {
    return (localStorage.getItem(DISPLAY_KEY) as DisplayMode) || "grid5";
  });

  const unlockAdmin = (password: string): boolean => {
    if (password === "1122") {
      setAdminUnlocked(true);
      sessionStorage.setItem(ADMIN_KEY, "true");
      return true;
    }
    return false;
  };

  const lockAdmin = () => {
    setAdminUnlocked(false);
    sessionStorage.removeItem(ADMIN_KEY);
  };

  const changeAdminPassword = (oldPass: string, newPass: string): boolean => {
    if (oldPass !== "1122") return false;
    // In real app, store hashed password — for demo we store in localStorage
    localStorage.setItem("esb-admin-pass", newPass);
    return true;
  };

  const getAdminPassword = () => localStorage.getItem("esb-admin-pass") || "1122";

  const updateIconConfig = (id: string, updates: Partial<IconConfig>) => {
    setIconConfigs(prev => {
      const updated = {
        ...prev,
        [id]: { ...(prev[id] || defaultConfig(id, 0)), ...updates },
      };
      localStorage.setItem(ICONS_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const resetIconConfig = (id: string) => {
    const idx = ALL_ICONS.findIndex(i => i.id === id);
    updateIconConfig(id, defaultConfig(id, idx >= 0 ? idx : 0));
  };

  const resetAllIcons = () => {
    const defaults: Record<string, IconConfig> = {};
    ALL_ICONS.forEach((icon, idx) => {
      defaults[icon.id] = defaultConfig(icon.id, idx);
    });
    setIconConfigs(defaults);
    localStorage.setItem(ICONS_KEY, JSON.stringify(defaults));
  };

  const changeDisplayMode = (mode: DisplayMode) => {
    setDisplayMode(mode);
    localStorage.setItem(DISPLAY_KEY, mode);
  };

  const getIconConfig = (id: string): IconConfig => {
    return iconConfigs[id] || defaultConfig(id, 0);
  };

  return {
    adminUnlocked, unlockAdmin, lockAdmin,
    iconConfigs, updateIconConfig, resetIconConfig, resetAllIcons, getIconConfig,
    displayMode, changeDisplayMode,
    changeAdminPassword, getAdminPassword,
  };
}
