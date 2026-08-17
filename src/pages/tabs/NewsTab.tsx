import type { Theme, Language } from "@/types";

interface NewsTabProps {
  theme: Theme;
  lang: Language;
}

const NEWS_SOURCES = [
  { name: "BBC News", nameUr: "بی بی سی نیوز", icon: "fa-broadcast-tower", color: "#e11d48", url: "https://www.bbc.com/news" },
  { name: "BBC Urdu", nameUr: "بی بی سی اردو", icon: "fa-broadcast-tower", color: "#1e40af", url: "https://www.bbc.com/urdu" },
  { name: "Al Jazeera", nameUr: "الجزیرہ", icon: "fa-globe", color: "#dc2626", url: "https://www.aljazeera.com" },
  { name: "Al Jazeera Urdu", nameUr: "الجزیرہ اردو", icon: "fa-globe", color: "#7c3aed", url: "https://www.aljazeera.net/urdu" },
  { name: "Reuters", nameUr: "رائٹرز", icon: "fa-newspaper", color: "#ff6600", url: "https://www.reuters.com" },
  { name: "Dawn News", nameUr: "ڈان نیوز", icon: "fa-sun", color: "#e2a800", url: "https://www.dawn.com" },
  { name: "Geo News", nameUr: "جیو نیوز", icon: "fa-satellite-dish", color: "#00a651", url: "https://www.geo.tv" },
  { name: "ARY News", nameUr: "اے آر وائی", icon: "fa-tv", color: "#1877f2", url: "https://arynews.tv" },
];

const HEADLINES = [
  { cat: "World", catUr: "دنیا", title: "Global Leaders Meet at UN Summit 2026", titleUr: "اقوام متحدہ سربراہی اجلاس 2026 میں عالمی قائدین" },
  { cat: "Technology", catUr: "ٹیکنالوجی", title: "AI surpasses human performance on key benchmarks", titleUr: "اے آئی نے اہم بینچ مارکس پر انسانی کارکردگی کو پیچھے چھوڑ دیا" },
  { cat: "Islamic", catUr: "اسلامی", title: "OIC Summit discusses Muslim world unity", titleUr: "او آئی سی سربراہی اجلاس میں مسلم دنیا کے اتحاد پر بحث" },
  { cat: "Economy", catUr: "معیشت", title: "Emerging markets show strong Q3 growth", titleUr: "ابھرتی ہوئی مارکیٹوں نے تیسری سہ ماہی میں مضبوط ترقی دکھائی" },
  { cat: "Science", catUr: "سائنس", title: "James Webb Telescope discovers new exoplanet", titleUr: "جیمز ویب ٹیلی سکوپ نے نئے سیارے کو دریافت کیا" },
];

export default function NewsTab({ theme, lang }: NewsTabProps) {
  const isUrdu = lang === "ur" || lang === "ar";

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold" style={{ color: theme.textColor }}>
          {isUrdu ? "خبریں" : "News Hub"}
        </h2>
        <div
          className="flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold text-white animate-pulse"
          style={{ background: "#dc2626" }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-white" />
          LIVE
        </div>
      </div>

      {/* Headlines */}
      <div className="space-y-2 mb-5">
        {HEADLINES.map((h, i) => (
          <div
            key={i}
            className="p-3 rounded-2xl flex gap-3 items-start"
            style={{ background: theme.cardBg, border: `1px solid ${theme.borderColor}` }}
          >
            <span
              className="px-2 py-0.5 rounded-full text-[9px] font-bold whitespace-nowrap flex-shrink-0 mt-0.5"
              style={{ background: `${theme.accentColor}33`, color: theme.accentColor }}
            >
              {isUrdu ? h.catUr : h.cat}
            </span>
            <p
              className="text-[12px] leading-snug flex-1"
              style={{
                color: theme.textColor,
                direction: isUrdu ? "rtl" : "ltr",
                fontFamily: isUrdu ? "'Noto Nastaliq Urdu', serif" : "inherit",
              }}
            >
              {isUrdu ? h.titleUr : h.title}
            </p>
          </div>
        ))}
      </div>

      {/* News Sources */}
      <h3 className="text-sm font-semibold mb-3 opacity-70" style={{ color: theme.textColor }}>
        {isUrdu ? "خبروں کے ذرائع" : "News Sources"}
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {NEWS_SOURCES.map((src) => (
          <button
            key={src.name}
            onClick={() => window.open(src.url, "_blank")}
            className="flex items-center gap-3 p-3 rounded-2xl transition-all duration-200 hover:scale-[1.02] active:scale-95"
            style={{ background: theme.cardBg, border: `1px solid ${theme.borderColor}` }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: `${src.color}22` }}
            >
              <i className={`fas ${src.icon} text-sm`} style={{ color: src.color }} />
            </div>
            <span
              className="text-[11px] font-medium text-left leading-tight"
              style={{
                color: theme.textColor,
                direction: isUrdu ? "rtl" : "ltr",
                fontFamily: isUrdu ? "'Noto Nastaliq Urdu', serif" : "inherit",
              }}
            >
              {isUrdu ? src.nameUr : src.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
