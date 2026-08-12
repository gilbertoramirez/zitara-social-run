"use client";

import { useState } from "react";
import { WAIVER_TEXT } from "@/lib/constants";

export default function WaiverModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="text-zitara-coral hover:text-zitara-coral-light underline underline-offset-2 text-sm font-medium transition-colors"
      >
        Leer deslinde completo
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-zitara-navy">
                Deslinde de Responsabilidad
              </h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed font-sans">
                {WAIVER_TEXT}
              </pre>
            </div>
            <div className="p-6 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full bg-zitara-navy hover:bg-zitara-navy-light text-white font-semibold py-3 rounded-xl transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
