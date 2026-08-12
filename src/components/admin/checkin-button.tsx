"use client";

import { useState } from "react";

export default function CheckinButton({ id }: { id: number }) {
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  async function handleCheckin() {
    setStatus("loading");
    try {
      const res = await fetch("/api/admin/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setStatus("done");
      } else {
        const data = await res.json();
        alert(data.error || "Error");
        setStatus("idle");
      }
    } catch {
      alert("Error de conexión");
      setStatus("idle");
    }
  }

  if (status === "done") {
    return <span className="text-emerald-600 font-medium">Check-in</span>;
  }

  return (
    <button
      onClick={handleCheckin}
      disabled={status === "loading"}
      className="px-3 py-1 bg-zitara-gold text-white text-xs font-semibold rounded-full hover:bg-zitara-gold-light transition-colors disabled:opacity-50"
    >
      {status === "loading" ? "..." : "Check-in"}
    </button>
  );
}
