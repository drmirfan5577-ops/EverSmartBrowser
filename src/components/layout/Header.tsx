import { useClock } from "@/hooks/useClock";
import type { Theme, Language } from "@/types";

interface HeaderProps {
  theme: Theme;
  lang: Language;
}

export default function Header({ theme, lang }: HeaderProps) {
  const { time, seconds, date, islamicDate, period } = useClock();

  return (
    <div
      className="relative z-10 px-3 py-2 flex items-center justify-between"
      style={{
        background: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${theme.borderColor}`,
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 min-w-0">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${theme.accentColor}, #1e40af, #7c3aed)`,
            boxShadow: `0 0 15px ${theme.accentColor}55`,
          }}
        >
          <span className="text-[7px] font-bold leading-tight text-center font-orbitron">SMART<br />WORLD</span>
        </div>
        <div className="min-w-0">
          <div className="font-bold text-[11px] tracking-wider font-orbitron truncate" style={{ color: theme.textColor }}>
            SMART WORLD ORDER
          </div>
          <div className="text-[9px] opacity-60" style={{ color: theme.textColor }}>ES OneWorld</div>
        </div>
      </div>

      {/* Weather (center, hidden on small) */}
      <div className="hidden sm:flex flex-col items-center text-center">
        <div className="text-[11px] font-semibold" style={{ color: theme.accentColor }}>
          ☀️ 75°F · Sunny
        </div>
        <div className="text-[9px] opacity-50" style={{ color: theme.textColor }}>
          1 USD = 0.92 EUR
        </div>
      </div>

      {/* Clock */}
      <div className="text-right flex-shrink-0">
        <div className="flex items-baseline gap-1">
          <span
            className="text-xl font-bold tracking-widest font-orbitron"
            style={{ color: theme.textColor }}
          >
            {time}
          </span>
          <span
            className="text-xs font-mono opacity-60"
            style={{ color: theme.accentColor }}
          >
            :{seconds}
          </span>
          <span className="text-[9px] font-bold" style={{ color: theme.accentColor }}>{period}</span>
        </div>
        <div className="text-[9px] opacity-60 leading-tight" style={{ color: theme.textColor }}>
          {islamicDate}
        </div>
        <div className="text-[9px] opacity-50" style={{ color: theme.textColor }}>
          {date}
        </div>
      </div>
    </div>
  );
}
