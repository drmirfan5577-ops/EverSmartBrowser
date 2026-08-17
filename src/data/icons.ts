import type { AppIcon } from "@/types";

export const ALL_ICONS: AppIcon[] = [
  // Row 1 — Islamic
  { id: "quran", name: { en: "Quran Paak", ur: "قرآن پاک", ar: "القرآن" }, icon: "fa-book-quran", color: "#1e40af", type: "quran" },
  { id: "ahadees", name: { en: "Ahaadees", ur: "احادیث", ar: "الأحاديث" }, icon: "fa-book", color: "#0f766e", type: "hadith" },
  { id: "azkar", name: { en: "Prayers & Azkaars", ur: "اذکار", ar: "الأذكار" }, icon: "fa-hands-praying", color: "#7c3aed", url: "https://hisnulmuslim.com" },
  { id: "tafsir", name: { en: "Smart Tafsir", ur: "سمارٹ تفسیر", ar: "التفسير" }, icon: "fa-lightbulb", color: "#d97706", url: "https://tafsir.app" },
  { id: "quran-science", name: { en: "Quran & Science", ur: "قرآن و سائنس", ar: "القرآن والعلم" }, icon: "fa-atom", color: "#1d4ed8", url: "https://quran.com" },

  // Row 2 — Social
  { id: "facebook", name: { en: "Facebook", ur: "فیس بک", ar: "فيسبوك" }, icon: "fa-facebook", color: "#1877f2", url: "https://facebook.com", fab: true },
  { id: "instagram", name: { en: "Instagram", ur: "انسٹاگرام", ar: "انستغرام" }, icon: "fa-instagram", color: "#e4405f", url: "https://instagram.com", fab: true },
  { id: "youtube", name: { en: "YouTube", ur: "یوٹیوب", ar: "يوتيوب" }, icon: "fa-youtube", color: "#ff0000", url: "https://youtube.com", fab: true },
  { id: "appstore", name: { en: "App Store", ur: "ایپ سٹور", ar: "متجر التطبيقات" }, icon: "fa-apple", color: "#555", url: "https://apps.apple.com", fab: true },
  { id: "ai-hub-1", name: { en: "A.I Hub", ur: "اے آئی ہب", ar: "مركز الذكاء" }, icon: "fa-brain", color: "#7c3aed", type: "tab-ai" },

  // Row 3 — Hubs
  { id: "islamic-hub", name: { en: "Islamic Hub", ur: "اسلامی ہب", ar: "المركز الإسلامي" }, icon: "fa-star-and-crescent", color: "#0d9488", type: "tab-islamic" },
  { id: "social-hub", name: { en: "Social Hub", ur: "سوشل ہب", ar: "المركز الاجتماعي" }, icon: "fa-share-nodes", color: "#8b5cf6", type: "tab-social" },
  { id: "news-hub", name: { en: "News Hub", ur: "نیوز ہب", ar: "مركز الأخبار" }, icon: "fa-newspaper", color: "#dc2626", type: "tab-news" },
  { id: "ai-hub-2", name: { en: "A.I Hub", ur: "اے آئی ہب", ar: "مركز الذكاء" }, icon: "fa-robot", color: "#6366f1", type: "tab-ai" },
  { id: "smart-series", name: { en: "SMART Series", ur: "سمارٹ سیریز", ar: "السلسلة الذكية" }, icon: "fa-microchip", color: "#db2777", type: "smart-series" },

  // Row 4 — News
  { id: "bbc", name: { en: "BBC", ur: "بی بی سی", ar: "بي بي سي" }, icon: "fa-broadcast-tower", color: "#fff", url: "https://www.bbc.com/news" },
  { id: "bbc-urdu", name: { en: "BBC Urdu", ur: "بی بی سی اردو", ar: "بي بي سي أردو" }, icon: "fa-satellite-dish", color: "#aaa", url: "https://www.bbc.com/urdu" },
  { id: "world-news", name: { en: "World News", ur: "ورلڈ نیوز", ar: "أخبار العالم" }, icon: "fa-globe", color: "#2563eb", url: "https://www.reuters.com" },
  { id: "aljazeera", name: { en: "Al Jazeera", ur: "الجزیرہ", ar: "الجزيرة" }, icon: "fa-globe", color: "#b91c1c", url: "https://www.aljazeera.com" },
  { id: "aljazeera-ur", name: { en: "Al Jazeera Urdu", ur: "الجزیرہ اردو", ar: "الجزيرة أردو" }, icon: "fa-globe", color: "#1e40af", url: "https://www.aljazeera.net/urdu" },

  // Row 5 — Tools
  { id: "gmail", name: { en: "Gmail", ur: "جی میل", ar: "جي ميل" }, icon: "fa-envelope", color: "#ea4335", url: "https://mail.google.com" },
  { id: "quran2", name: { en: "Quran Paak", ur: "قرآن پاک", ar: "القرآن" }, icon: "fa-book-quran", color: "#1e3a8a", type: "quran" },
  { id: "ahadees2", name: { en: "Ahaadees", ur: "احادیث", ar: "الأحاديث" }, icon: "fa-book", color: "#0f766e", type: "hadith" },
  { id: "azkar2", name: { en: "Prayers & Azkaars", ur: "اذکار", ar: "الأذكار" }, icon: "fa-hands-praying", color: "#6d28d9", url: "https://hisnulmuslim.com" },
  { id: "gallery", name: { en: "Gallery", ur: "گیلری", ar: "المعرض" }, icon: "fa-images", color: "#0891b2", type: "gallery" },

  // Row 6 — Productivity
  { id: "office", name: { en: "OfficeSuite", ur: "آفس سوٹ", ar: "أوفيس" }, icon: "fa-file-word", color: "#2563eb", url: "https://www.office.com" },
  { id: "media", name: { en: "Media Player", ur: "میڈیا پلیئر", ar: "مشغل الوسائط" }, icon: "fa-play", color: "#7c3aed", type: "tab-media" },
  { id: "smart-news", name: { en: "SMART News", ur: "سمارٹ نیوز", ar: "الأخبار الذكية" }, icon: "fa-satellite-dish", color: "#0ea5e9", type: "news-smart" },
  { id: "ever-most", name: { en: "THE EVER MOST", ur: "دی ایور موسٹ", ar: "الأعظم" }, icon: "fa-tv", color: "#dc2626", type: "news-ever" },
  { id: "settings", name: { en: "Settings", ur: "سیٹنگز", ar: "الإعدادات" }, icon: "fa-gear", color: "#94a3b8", type: "settings" },
];

export const SOCIAL_ICONS: AppIcon[] = [
  { id: "s-fb", name: { en: "Facebook", ur: "فیس بک" }, icon: "fa-facebook", color: "#1877f2", url: "https://facebook.com", fab: true },
  { id: "s-ig", name: { en: "Instagram", ur: "انسٹاگرام" }, icon: "fa-instagram", color: "#e4405f", url: "https://instagram.com", fab: true },
  { id: "s-yt", name: { en: "YouTube", ur: "یوٹیوب" }, icon: "fa-youtube", color: "#ff0000", url: "https://youtube.com", fab: true },
  { id: "s-wa", name: { en: "WhatsApp", ur: "واٹس ایپ" }, icon: "fa-whatsapp", color: "#25d366", url: "https://web.whatsapp.com", fab: true },
  { id: "s-tw", name: { en: "X (Twitter)", ur: "ایکس" }, icon: "fa-x-twitter", color: "#fff", url: "https://x.com", fab: true },
  { id: "s-tg", name: { en: "Telegram", ur: "ٹیلیگرام" }, icon: "fa-telegram", color: "#0088cc", url: "https://telegram.org", fab: true },
  { id: "s-tk", name: { en: "TikTok", ur: "ٹک ٹاک" }, icon: "fa-tiktok", color: "#ff0050", url: "https://tiktok.com", fab: true },
  { id: "s-li", name: { en: "LinkedIn", ur: "لنکڈإن" }, icon: "fa-linkedin", color: "#0077b5", url: "https://linkedin.com", fab: true },
  { id: "s-pi", name: { en: "Pinterest", ur: "پنٹریسٹ" }, icon: "fa-pinterest", color: "#e60023", url: "https://pinterest.com", fab: true },
  { id: "s-rd", name: { en: "Reddit", ur: "ریڈٹ" }, icon: "fa-reddit", color: "#ff4500", url: "https://reddit.com", fab: true },
];

export const AI_ICONS: AppIcon[] = [
  { id: "ai-chatgpt", name: { en: "ChatGPT", ur: "چیٹ جی پی ٹی" }, icon: "fa-robot", color: "#10a37f", url: "https://chat.openai.com" },
  { id: "ai-gemini", name: { en: "Google Gemini", ur: "گوگل جیمنی" }, icon: "fa-google", color: "#4285f4", url: "https://gemini.google.com", fab: true },
  { id: "ai-claude", name: { en: "Claude AI", ur: "کلاڈ اے آئی" }, icon: "fa-brain", color: "#a855f7", url: "https://claude.ai" },
  { id: "ai-copilot", name: { en: "MS Copilot", ur: "کوپائلٹ" }, icon: "fa-microchip", color: "#0078d4", url: "https://copilot.microsoft.com" },
  { id: "ai-perplexity", name: { en: "Perplexity", ur: "پرپلیکسیٹی" }, icon: "fa-magnifying-glass", color: "#20b2aa", url: "https://perplexity.ai" },
  { id: "ai-midjourney", name: { en: "Midjourney", ur: "مڈجرنی" }, icon: "fa-image", color: "#9b59b6", url: "https://midjourney.com" },
  { id: "ai-sora", name: { en: "Sora Video", ur: "سورا ویڈیو" }, icon: "fa-video", color: "#e74c3c", url: "https://sora.com" },
  { id: "ai-elevenlabs", name: { en: "ElevenLabs", ur: "الیون لیبز" }, icon: "fa-microphone", color: "#00bfff", url: "https://elevenlabs.io" },
  { id: "ai-stable", name: { en: "Stable Diffusion", ur: "اسٹیبل ڈفیوژن" }, icon: "fa-wand-magic-sparkles", color: "#ff6b6b", url: "https://stability.ai" },
  { id: "ai-hugging", name: { en: "Hugging Face", ur: "ہگنگ فیس" }, icon: "fa-smile", color: "#ffd21e", url: "https://huggingface.co" },
];
