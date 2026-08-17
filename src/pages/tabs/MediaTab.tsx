import type { Theme, Language } from "@/types";

interface MediaTabProps {
  theme: Theme;
  lang: Language;
}

const MEDIA_CHANNELS = [
  { name: "SMART News", nameUr: "سمارٹ نیوز", icon: "fa-satellite-dish", color: "#0ea5e9", live: true, type: "news" },
  { name: "THE EVER MOST", nameUr: "دی ایور موسٹ", icon: "fa-tv", color: "#dc2626", live: true, type: "ever" },
  { name: "Islamic TV", nameUr: "اسلامی ٹی وی", icon: "fa-star-and-crescent", color: "#10b981", live: false, url: "https://www.islamia.tv" },
  { name: "Quran Radio", nameUr: "قرآن ریڈیو", icon: "fa-radio", color: "#7c3aed", live: true, url: "https://radioislam.org.za" },
  { name: "YouTube", nameUr: "یوٹیوب", icon: "fa-youtube", color: "#ff0000", live: false, url: "https://youtube.com" },
  { name: "Podcast Hub", nameUr: "پوڈکاسٹ ہب", icon: "fa-podcast", color: "#f59e0b", live: false, url: "https://open.spotify.com" },
];

export default function MediaTab({ theme, lang }: MediaTabProps) {
  const isUrdu = lang === "ur" || lang === "ar";

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4" style={{ color: theme.textColor }}>
        {isUrdu ? "میڈیا مرکز" : "Media Center"}
      </h2>

      {/* Live Channels */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <h3 className="text-sm font-semibold" style={{ color: theme.textColor }}>{isUrdu ? "لائیو چینلز" : "Live Channels"}</h3>
        </div>
        <div className="space-y-2">
          {MEDIA_CHANNELS.filter(c => c.live).map((ch) => (
            <button
              key={ch.name}
              onClick={() => ch.url && window.open(ch.url, "_blank")}
              className="w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 hover:scale-[1.01] active:scale-[0.98]"
              style={{ background: theme.cardBg, border: `1px solid ${theme.borderColor}` }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${ch.color}22` }}
              >
                <i className={`fas ${ch.icon} text-xl`} style={{ color: ch.color }} />
              </div>
              <div className="flex-1 text-left">
                <div className="font-bold text-sm flex items-center gap-2" style={{ color: theme.textColor }}>
                  {isUrdu ? ch.nameUr : ch.name}
                  {ch.live && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold text-white bg-red-500 animate-pulse">LIVE</span>
                  )}
                </div>
                <div className="text-[11px] opacity-60" style={{ color: theme.textColor }}>
                  {isUrdu ? "براہ راست نشریات" : "Live Broadcast"}
                </div>
              </div>
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: `${ch.color}33` }}
              >
                <i className="fas fa-play text-sm" style={{ color: ch.color }} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* All Channels */}
      <div className="grid grid-cols-3 gap-2">
        {MEDIA_CHANNELS.map((ch) => (
          <button
            key={ch.name}
            onClick={() => ch.url && window.open(ch.url, "_blank")}
            className="flex flex-col items-center justify-center p-3 rounded-2xl gap-2 transition-all duration-200 hover:scale-105 active:scale-95"
            style={{ background: theme.cardBg, border: `1px solid ${theme.borderColor}` }}
          >
            <i className={`fas ${ch.icon} text-2xl`} style={{ color: ch.color }} />
            <span className="text-[10px] text-center leading-tight" style={{ color: theme.textColor, opacity: 0.8 }}>
              {isUrdu ? ch.nameUr : ch.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
