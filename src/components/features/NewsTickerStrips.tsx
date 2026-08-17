import type { Theme, Language } from "@/types";

interface NewsTickerStripsProps {
  theme: Theme;
  lang: Language;
}

const NEWS_EN = [
  "🌍 Global markets rise amid tech sector growth",
  "🕌 Islamic Finance Summit 2026 opens in Riyadh",
  "🚀 SpaceX launches new satellite constellation",
  "📱 AI models reach new performance milestones",
  "🌿 Record renewable energy adoption worldwide",
  "✈️ International travel fully recovers post-pandemic",
];

const NEWS_UR = [
  "🌍 عالمی منڈیوں میں ٹیکنالوجی سیکٹر کی وجہ سے اضافہ",
  "🕌 ریاض میں اسلامی فنانس سمٹ 2026 کا افتتاح",
  "🚀 اسپیس ایکس نے نئے سیٹلائٹ لانچ کیے",
  "📱 اے آئی ماڈلز نے نئے ریکارڈ قائم کیے",
  "🌿 دنیا بھر میں قابل تجدید توانائی کا ریکارڈ",
  "✈️ بین الاقوامی سفر مکمل طور پر بحال",
];

const STATUS_EN = [
  "✅ System Status: All features operational",
  "🔄 Auto-update: Last synced 2 min ago",
  "📡 Live news feed: Active",
  "🌐 Smart World Order platform: Online",
  "⚡ Performance: Optimal",
];

const STATUS_UR = [
  "✅ سسٹم کی حالت: تمام فیچرز فعال",
  "🔄 آٹو اپڈیٹ: 2 منٹ پہلے",
  "📡 لائیو نیوز فیڈ: فعال",
  "🌐 سمارٹ ورلڈ آرڈر: آن لائن",
  "⚡ کارکردگی: بہترین",
];

export default function NewsTickerStrips({ theme, lang }: NewsTickerStripsProps) {
  const isUrdu = lang === "ur" || lang === "ar";
  const news = isUrdu ? NEWS_UR : NEWS_EN;
  const status = isUrdu ? STATUS_UR : STATUS_EN;

  const newsText = news.join("   •   ");
  const statusText = status.join("   •   ");

  return (
    <div className="fixed bottom-14 left-0 right-0 z-40">
      {/* News Ticker */}
      <div
        className="ticker-wrap py-1.5 overflow-hidden"
        style={{
          background: "linear-gradient(90deg, #0284c7, #4f46e5, #7c3aed)",
        }}
      >
        <div className="ticker-content text-white text-[11px] font-medium tracking-wide px-4">
          {newsText}
        </div>
      </div>
      {/* Status Bar */}
      <div
        className="ticker-wrap py-1.5 overflow-hidden"
        style={{
          background: "linear-gradient(90deg, #7c3aed, #db2777, #e11d48)",
          animationDelay: "-20s",
        }}
      >
        <div
          className="ticker-content text-white text-[11px] font-medium tracking-wide px-4"
          style={{ animationDuration: "30s", animationDelay: "-15s" }}
        >
          {statusText}
        </div>
      </div>
    </div>
  );
}
