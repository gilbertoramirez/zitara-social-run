"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-zitara-navy/95 backdrop-blur-sm">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-white tracking-tight">
              ZÍTARA
            </span>
            <span className="text-xs text-zitara-coral font-medium tracking-widest uppercase">
              Social Run
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#rutas"
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              Rutas
            </a>
            <a
              href="#horario"
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              Horario
            </a>
            <a
              href="#amenidades"
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              Amenidades
            </a>
            <Link
              href="/registro"
              className="bg-zitara-coral hover:bg-zitara-coral-light text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-colors"
            >
              Registrarme
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <a href="#rutas" onClick={() => setMenuOpen(false)} className="block py-2 text-white/70 hover:text-white transition-colors">Rutas</a>
            <a href="#horario" onClick={() => setMenuOpen(false)} className="block py-2 text-white/70 hover:text-white transition-colors">Horario</a>
            <a href="#amenidades" onClick={() => setMenuOpen(false)} className="block py-2 text-white/70 hover:text-white transition-colors">Amenidades</a>
            <Link href="/registro" onClick={() => setMenuOpen(false)} className="block bg-zitara-coral hover:bg-zitara-coral-light text-white text-center font-semibold px-6 py-2.5 rounded-full transition-colors mt-2">
              Registrarme
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
