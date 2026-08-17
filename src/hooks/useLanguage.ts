import { useState } from "react";
import type { Language, MultiLangText } from "@/types";

const STORAGE_KEY = "esb-lang";

export function useLanguage() {
  const [lang, setLang] = useState<Language>(() => {
    return (localStorage.getItem(STORAGE_KEY) as Language) || "en";
  });

  const toggleLang = () => {
    const next: Language = lang === "en" ? "ur" : lang === "ur" ? "ar" : "en";
    setLang(next);
    localStorage.setItem(STORAGE_KEY, next);
  };

  const t = (text: MultiLangText): string => {
    if (lang === "ur") return text.ur;
    if (lang === "ar" && text.ar) return text.ar;
    return text.en;
  };

  const isRTL = lang === "ur" || lang === "ar";

  return { lang, toggleLang, t, isRTL };
}
