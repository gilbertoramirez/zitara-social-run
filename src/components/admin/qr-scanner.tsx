"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Html5Qrcode } from "html5-qrcode";

type ScanResult = {
  type: "success" | "error" | "duplicate";
  nombre?: string;
  ruta?: string;
  message: string;
};

export default function QrScanner() {
  const [open, setOpen] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const processingRef = useRef(false);

  function extractCodigo(text: string): string | null {
    try {
      const url = new URL(text);
      return url.searchParams.get("codigo");
    } catch {
      return text.match(/^[0-9a-f-]{36}$/i) ? text : null;
    }
  }

  const stopScanner = useCallback(async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
      } catch {}
      scannerRef.current = null;
    }
    setScanning(false);
  }, []);

  async function doCheckin(codigo: string) {
    const res = await fetch("/api/admin/checkin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ codigo }),
    });
    const data = await res.json();

    if (res.ok) {
      return {
        type: "success" as const,
        nombre: data.nombre,
        ruta: data.ruta,
        message: `Check-in exitoso`,
      };
    }
    if (res.status === 409) {
      return {
        type: "duplicate" as const,
        nombre: data.nombre,
        ruta: data.ruta,
        message: "Ya tiene check-in",
      };
    }
    return {
      type: "error" as const,
      message: data.error || "Error desconocido",
    };
  }

  async function startScanner() {
    setResult(null);
    processingRef.current = false;

    const scanner = new Html5Qrcode("qr-reader");
    scannerRef.current = scanner;
    setScanning(true);

    try {
      await scanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        async (decodedText) => {
          if (processingRef.current) return;
          processingRef.current = true;

          const codigo = extractCodigo(decodedText);
          if (!codigo) {
            setResult({ type: "error", message: "QR no válido" });
            processingRef.current = false;
            return;
          }

          await stopScanner();
          const checkinResult = await doCheckin(codigo);
          setResult(checkinResult);
        },
        () => {}
      );
    } catch {
      setResult({ type: "error", message: "No se pudo acceder a la cámara" });
      setScanning(false);
    }
  }

  function handleClose() {
    stopScanner();
    setOpen(false);
    setResult(null);
  }

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, [stopScanner]);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 bg-zitara-gold text-white font-semibold px-6 py-3 rounded-xl hover:bg-zitara-gold-light transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
        </svg>
        Escanear QR
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="font-bold text-zitara-olive">Escanear QR</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        <div className="p-5">
          <div id="qr-reader" className="rounded-xl overflow-hidden" />

          {result && (
            <div
              className={`mt-4 p-4 rounded-xl text-center ${
                result.type === "success"
                  ? "bg-emerald-50 border border-emerald-200"
                  : result.type === "duplicate"
                    ? "bg-amber-50 border border-amber-200"
                    : "bg-red-50 border border-red-200"
              }`}
            >
              <p
                className={`text-lg font-bold ${
                  result.type === "success"
                    ? "text-emerald-700"
                    : result.type === "duplicate"
                      ? "text-amber-700"
                      : "text-red-700"
                }`}
              >
                {result.message}
              </p>
              {result.nombre && (
                <p className="text-gray-700 mt-1 font-medium">
                  {result.nombre}
                </p>
              )}
              {result.ruta && (
                <span className="inline-block mt-2 px-3 py-1 bg-zitara-gold text-white text-sm font-semibold rounded-full">
                  {result.ruta.toUpperCase()}
                </span>
              )}
            </div>
          )}

          <div className="mt-4 flex gap-3">
            {!scanning && (
              <button
                onClick={startScanner}
                className="flex-1 bg-zitara-olive text-white font-semibold py-3 rounded-xl hover:bg-zitara-olive/90 transition-colors"
              >
                {result ? "Escanear otro" : "Iniciar cámara"}
              </button>
            )}
            <button
              onClick={handleClose}
              className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-200 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
