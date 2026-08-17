import type { Theme, Language } from "@/types";

interface BismillahBannerProps {
  theme: Theme;
  lang: Language;
}

export default function BismillahBanner({ theme, lang }: BismillahBannerProps) {
  const showUrdu = lang === "ur";
  const showArabic = lang === "ar" || lang === "en";

  return (
    <div className="text-center py-4 px-4">
      <div
        className="text-3xl sm:text-4xl font-bold glow-pulse font-amiri leading-relaxed"
        style={{
          color: theme.bismillahColor,
          textShadow: `0 0 15px ${theme.bismillahColor}80, 0 0 30px ${theme.bismillahColor}40`,
          fontFamily: "'Amiri', serif",
          direction: "rtl",
        }}
      >
        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
      </div>
      {showUrdu ? (
        <p
          className="text-sm mt-1 opacity-70 font-urdu"
          style={{ color: theme.textColor, direction: "rtl", fontFamily: "'Noto Nastaliq Urdu', serif" }}
        >
          اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے
        </p>
      ) : (
        <p
          className="text-xs mt-1 opacity-60 tracking-wide"
          style={{ color: theme.textColor }}
        >
          In the name of Allah, the Most Gracious, the Most Merciful
        </p>
      )}
    </div>
  );
}
