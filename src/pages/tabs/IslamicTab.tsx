import { useState } from "react";
import type { Theme, Language } from "@/types";

interface IslamicTabProps {
  theme: Theme;
  lang: Language;
}

const HADITHS = [
  {
    arabic: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ",
    urdu: "اعمال کا دارومدار نیتوں پر ہے",
    english: "Actions are judged by intentions",
    source: "Bukhari & Muslim",
  },
  {
    arabic: "الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ",
    urdu: "مسلمان وہ ہے جس کی زبان اور ہاتھ سے دوسرے مسلمان محفوظ ہوں",
    english: "A Muslim is one from whose tongue and hands Muslims are safe",
    source: "Bukhari",
  },
  {
    arabic: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
    urdu: "تم میں سے بہترین وہ ہے جو قرآن سیکھے اور سکھائے",
    english: "The best of you are those who learn the Quran and teach it",
    source: "Bukhari",
  },
];

const QURAN_SURAHS = [
  { num: 1, name: "Al-Fatihah", nameUr: "الفاتحہ", ayahs: 7, desc: "The Opening" },
  { num: 2, name: "Al-Baqarah", nameUr: "البقرہ", ayahs: 286, desc: "The Cow" },
  { num: 3, name: "Al-Imran", nameUr: "آل عمران", ayahs: 200, desc: "Family of Imran" },
  { num: 36, name: "Ya-Sin", nameUr: "یس", ayahs: 83, desc: "Heart of the Quran" },
  { num: 55, name: "Ar-Rahman", nameUr: "الرحمن", ayahs: 78, desc: "The Beneficent" },
  { num: 67, name: "Al-Mulk", nameUr: "الملک", ayahs: 30, desc: "The Sovereignty" },
  { num: 112, name: "Al-Ikhlas", nameUr: "الاخلاص", ayahs: 4, desc: "Sincerity" },
  { num: 113, name: "Al-Falaq", nameUr: "الفلق", ayahs: 5, desc: "The Daybreak" },
  { num: 114, name: "An-Nas", nameUr: "الناس", ayahs: 6, desc: "Mankind" },
];

const HADITH_BOOKS = ["صحیح بخاری", "صحیح مسلم", "سنن ابو داؤد", "جامع ترمذی", "سنن نسائی", "سنن ابن ماجہ"];

type SubView = "quran" | "hadith" | "azkar" | null;

export default function IslamicTab({ theme, lang }: IslamicTabProps) {
  const [subView, setSubView] = useState<SubView>(null);

  if (subView === "quran") {
    return (
      <div className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => setSubView(null)}
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: theme.cardBg, color: theme.textColor }}
          >
            <i className="fas fa-arrow-left text-xs" />
          </button>
          <h2
            className="text-lg font-bold font-amiri"
            style={{ color: theme.bismillahColor, fontFamily: "'Amiri', serif" }}
          >
            القرآن الكريم — قرآن پاک
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {QURAN_SURAHS.map((s) => (
            <button
              key={s.num}
              onClick={() => window.open(`https://quran.com/${s.num}`, "_blank")}
              className="flex items-center gap-3 p-3 rounded-2xl text-left transition-all duration-200 hover:scale-[1.01]"
              style={{ background: theme.cardBg, border: `1px solid ${theme.borderColor}` }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                style={{ background: `${theme.accentColor}33`, color: theme.accentColor }}
              >
                {s.num}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm" style={{ color: theme.textColor }}>{s.name}</span>
                  <span className="font-amiri text-base" style={{ color: theme.bismillahColor, fontFamily: "'Amiri', serif" }}>{s.nameUr}</span>
                </div>
                <div className="text-[11px] opacity-60" style={{ color: theme.textColor }}>
                  {s.desc} · {s.ayahs} Ayahs
                </div>
              </div>
              <i className="fas fa-external-link-alt text-xs opacity-50" style={{ color: theme.textColor }} />
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (subView === "hadith") {
    return (
      <div className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => setSubView(null)} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: theme.cardBg, color: theme.textColor }}>
            <i className="fas fa-arrow-left text-xs" />
          </button>
          <h2 className="text-lg font-bold" style={{ color: theme.textColor }}>احادیث انسائیکلوپیڈیا</h2>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {HADITH_BOOKS.map((b) => (
            <button
              key={b}
              className="p-3 rounded-2xl text-sm font-medium text-center transition-all hover:scale-[1.02]"
              style={{ background: theme.cardBg, border: `1px solid ${theme.borderColor}`, color: theme.textColor, fontFamily: "'Noto Nastaliq Urdu', serif", direction: "rtl" }}
            >
              {b}
            </button>
          ))}
        </div>
        <h3 className="text-sm font-semibold mb-3 opacity-70" style={{ color: theme.textColor }}>Featured Hadiths</h3>
        <div className="space-y-3">
          {HADITHS.map((h, i) => (
            <div key={i} className="p-4 rounded-2xl" style={{ background: theme.cardBg, border: `1px solid ${theme.borderColor}` }}>
              <p className="text-lg font-amiri text-right mb-2" style={{ color: theme.bismillahColor, fontFamily: "'Amiri', serif", direction: "rtl" }}>{h.arabic}</p>
              {lang === "ur" ? (
                <p className="text-sm font-urdu text-right opacity-80 mb-1" style={{ color: theme.textColor, direction: "rtl", fontFamily: "'Noto Nastaliq Urdu', serif" }}>{h.urdu}</p>
              ) : (
                <p className="text-xs opacity-80 mb-1" style={{ color: theme.textColor }}>{h.english}</p>
              )}
              <p className="text-[10px] opacity-50" style={{ color: theme.textColor }}>— {h.source}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="text-center mb-6">
        <div className="text-3xl font-amiri mb-1" style={{ color: theme.bismillahColor, textShadow: `0 0 20px ${theme.bismillahColor}66`, fontFamily: "'Amiri', serif", direction: "rtl" }}>
          اسلامی مرکز
        </div>
        <div className="text-xs opacity-60" style={{ color: theme.textColor }}>Islamic Knowledge Hub</div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { icon: "fa-book-quran", label: "القرآن الكريم", sublabel: "قرآن پاک", color: "#1e40af", action: () => setSubView("quran") },
          { icon: "fa-book", label: "الأحاديث", sublabel: "احادیث", color: "#0f766e", action: () => setSubView("hadith") },
          { icon: "fa-hands-praying", label: "الأذكار", sublabel: "اذکار و دعائیں", color: "#7c3aed", action: () => window.open("https://hisnulmuslim.com", "_blank") },
          { icon: "fa-lightbulb", label: "التفسير", sublabel: "سمارٹ تفسیر", color: "#d97706", action: () => window.open("https://tafsir.app", "_blank") },
          { icon: "fa-clock", label: "Prayer Times", sublabel: "نماز کے اوقات", color: "#dc2626", action: () => window.open("https://islamicfinder.org/prayer-times/", "_blank") },
          { icon: "fa-compass", label: "Qibla", sublabel: "قبلہ کا رخ", color: "#059669", action: () => window.open("https://qiblafinder.withgoogle.com", "_blank") },
        ].map((item, i) => (
          <button
            key={i}
            onClick={item.action}
            className="flex flex-col items-center justify-center p-4 rounded-2xl gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-95"
            style={{ background: theme.cardBg, border: `1px solid ${theme.borderColor}` }}
          >
            <i className={`fas ${item.icon} text-2xl`} style={{ color: item.color }} />
            <div className="text-center">
              <div className="text-[11px] font-bold font-amiri" style={{ color: theme.bismillahColor, fontFamily: "'Amiri', serif" }}>{item.label}</div>
              <div className="text-[10px] opacity-70" style={{ color: theme.textColor, direction: "rtl", fontFamily: "'Noto Nastaliq Urdu', serif" }}>{item.sublabel}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="p-4 rounded-2xl" style={{ background: theme.cardBg, border: `1px solid ${theme.borderColor}` }}>
        <h3 className="text-sm font-bold mb-2" style={{ color: theme.accentColor }}>Hadith of the Day</h3>
        <p className="text-base font-amiri text-right" style={{ color: theme.bismillahColor, fontFamily: "'Amiri', serif", direction: "rtl" }}>
          {HADITHS[0].arabic}
        </p>
        <p className="text-xs mt-1 opacity-70" style={{ color: theme.textColor }}>{HADITHS[0].english}</p>
        <p className="text-[10px] mt-1 opacity-50" style={{ color: theme.textColor }}>— {HADITHS[0].source}</p>
      </div>
    </div>
  );
}
