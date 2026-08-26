"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

export default function RegisterButton({
  label = "Registrarme Gratis",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  const [closed, setClosed] = useState(false);

  const check = useCallback(async () => {
    try {
      const res = await fetch("/api/spots");
      if (res.ok) {
        const data = await res.json();
        setClosed(data.closed);
      }
    } catch { /* silent */ }
  }, []);

  useEffect(() => {
    check();
    const id = setInterval(check, 30000);
    return () => clearInterval(id);
  }, [check]);

  if (closed) {
    return (
      <span
        className={`inline-block bg-white/20 text-white/50 font-semibold px-10 py-4 rounded-full text-lg cursor-not-allowed ${className}`}
      >
        Cupo lleno
      </span>
    );
  }

  return (
    <Link
      href="/registro"
      className={`bg-zitara-gold hover:bg-zitara-gold-light text-white font-semibold px-10 py-4 rounded-full text-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-zitara-gold/25 ${className}`}
    >
      {label}
    </Link>
  );
}
