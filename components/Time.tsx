"use client";

import { useEffect, useState } from "react";

export default function LiveDateTime() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // ordinal suffix (st, nd, rd, th)
  const getOrdinal = (day: number) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const dayName = now.toLocaleDateString("en-GB", { weekday: "long" });
  const day = now.getDate();
  const month = now.toLocaleDateString("en-GB", { month: "long" });
  const year = now.getFullYear();

  const time = now.toLocaleTimeString("en-GB"); // 24hr with seconds

  return (
    <div className="text-green-400 font-mono">
      {dayName}, {day}
      {getOrdinal(day)} of {month} {year} — {time}
    </div>
  );
}
