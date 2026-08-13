"use client";

import { useState, useEffect, useCallback } from "react";

interface SpotsData {
  registered: number;
  max: number;
  available: number;
  closed: boolean;
}

export default function SpotsCounter() {
  const [data, setData] = useState<SpotsData | null>(null);

  const fetchSpots = useCallback(async () => {
    try {
      const res = await fetch("/api/spots");
      if (res.ok) setData(await res.json());
    } catch { /* silent */ }
  }, []);

  useEffect(() => {
    fetchSpots();
    const id = setInterval(fetchSpots, 30000);
    return () => clearInterval(id);
  }, [fetchSpots]);

  if (!data) return null;

  const pct = Math.min(100, (data.registered / data.max) * 100);
  const urgency = pct >= 90;

  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-3xl sm:text-4xl font-heading font-black text-white">
          {data.registered}
        </span>
        <span className="text-sm text-white/50">
          de {data.max} lugares
        </span>
      </div>
      <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${
            data.closed
              ? "bg-red-400"
              : urgency
                ? "bg-amber-400"
                : "bg-zitara-gold"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {data.closed ? (
        <p className="text-center text-sm text-red-300 mt-2 font-medium">
          Registro cerrado — cupo lleno
        </p>
      ) : data.available <= 20 ? (
        <p className="text-center text-sm text-amber-300 mt-2 font-medium">
          Últimos {data.available} lugares
        </p>
      ) : null}
    </div>
  );
}
