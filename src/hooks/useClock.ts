import { useState, useEffect } from "react";

interface ClockData {
  time: string;
  seconds: string;
  date: string;
  islamicDate: string;
  period: string;
}

// Simplified Islamic date calculation (approximation)
function getIslamicDate(date: Date): string {
  // Islamic months
  const islamicMonths = [
    "Muharram", "Safar", "Rabi al-Awwal", "Rabi al-Thani",
    "Jumada al-Awwal", "Jumada al-Thani", "Rajab", "Sha'ban",
    "Ramadan", "Shawwal", "Dhu al-Qa'dah", "Dhu al-Hijjah"
  ];
  const islamicMonthsUr = [
    "محرم", "صفر", "ربیع الاول", "ربیع الثانی",
    "جمادی الاول", "جمادی الثانی", "رجب", "شعبان",
    "رمضان", "شوال", "ذو القعدہ", "ذو الحجہ"
  ];

  // Julian Day Number
  const jd = Math.floor(date.getTime() / 86400000) + 2440588;
  
  // Convert JDN to Islamic calendar (approximate)
  const l = jd - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  const l2 = l - 10631 * n + 354;
  const j = Math.floor((10985 - l2) / 5316) * Math.floor(50 * l2 / 17719) +
             Math.floor(l2 / 5670) * Math.floor(43 * l2 / 15238);
  const l3 = l2 - Math.floor((30 - j) / 15) * Math.floor(17719 * j / 50) -
              Math.floor(j / 16) * Math.floor(15238 * j / 43) + 29;
  const month = Math.floor(24 * l3 / 709);
  const day = l3 - Math.floor(709 * month / 24);
  const year = 30 * n + j - 30;

  const monthIdx = Math.max(0, Math.min(11, month - 1));
  return `${day} ${islamicMonthsUr[monthIdx]} ${year} ھ`;
}

export function useClock(): ClockData {
  const [clockData, setClockData] = useState<ClockData>({
    time: "00:00",
    seconds: "00",
    date: "",
    islamicDate: "",
    period: "AM",
  });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = now.getHours();
      const m = now.getMinutes().toString().padStart(2, "0");
      const s = now.getSeconds().toString().padStart(2, "0");
      const period = h >= 12 ? "PM" : "AM";
      const h12 = (h % 12 || 12).toString().padStart(2, "0");

      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const dateStr = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

      setClockData({
        time: `${h12}:${m}`,
        seconds: s,
        date: dateStr,
        islamicDate: getIslamicDate(now),
        period,
      });
    };

    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return clockData;
}
