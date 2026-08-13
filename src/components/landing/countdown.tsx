"use client";

import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(target: string): TimeLeft | null {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Digit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white/10 backdrop-blur-sm rounded-xl w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center border border-white/10">
        <span className="text-2xl sm:text-3xl font-heading font-black text-white tabular-nums">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-[10px] sm:text-xs text-white/50 mt-2 uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}

export default function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calcTimeLeft(targetDate));
    const id = setInterval(() => setTimeLeft(calcTimeLeft(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  if (!mounted) {
    return (
      <div className="flex gap-3 sm:gap-4 justify-center">
        {["Días", "Hrs", "Min", "Seg"].map((l) => (
          <Digit key={l} value={0} label={l} />
        ))}
      </div>
    );
  }

  if (!timeLeft) {
    return (
      <p className="text-xl font-heading font-bold text-zitara-gold">
        El evento ya comenzó
      </p>
    );
  }

  return (
    <div className="flex gap-3 sm:gap-4 justify-center">
      <Digit value={timeLeft.days} label="Días" />
      <div className="flex items-center text-white/30 text-2xl font-bold self-start mt-4 sm:mt-5">:</div>
      <Digit value={timeLeft.hours} label="Hrs" />
      <div className="flex items-center text-white/30 text-2xl font-bold self-start mt-4 sm:mt-5">:</div>
      <Digit value={timeLeft.minutes} label="Min" />
      <div className="flex items-center text-white/30 text-2xl font-bold self-start mt-4 sm:mt-5">:</div>
      <Digit value={timeLeft.seconds} label="Seg" />
    </div>
  );
}
