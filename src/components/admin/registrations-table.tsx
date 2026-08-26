"use client";

import { useState } from "react";
import CheckinButton from "./checkin-button";

type Registration = {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  ruta: string;
  llevaraMascota: boolean | null;
  nombreMascota: string | null;
  verificado: boolean | null;
  creadoEn: string;
};

export default function RegistrationsTable({
  registrations,
}: {
  registrations: Registration[];
}) {
  const [query, setQuery] = useState("");

  const filtered = query
    ? registrations.filter((reg) => {
        const q = query.toLowerCase();
        return (
          reg.nombre.toLowerCase().includes(q) ||
          reg.email.toLowerCase().includes(q) ||
          reg.telefono.toLowerCase().includes(q)
        );
      })
    : registrations;

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Buscar por nombre, email o teléfono…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-zitara-gold/40 focus:border-zitara-gold"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        {query && (
          <p className="text-xs text-gray-400 mt-2">
            {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left py-3 px-4 font-semibold text-gray-600">#</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Nombre</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Email</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Teléfono</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Ruta</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Mascota</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Fecha</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Estado</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-8 text-gray-400">
                  {query ? "No se encontraron resultados" : "No hay registros aún"}
                </td>
              </tr>
            ) : (
              filtered.map((reg, i) => (
                <tr key={reg.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-400">{i + 1}</td>
                  <td className="py-3 px-4 font-medium text-gray-900">{reg.nombre}</td>
                  <td className="py-3 px-4 text-gray-600">{reg.email}</td>
                  <td className="py-3 px-4 text-gray-600">{reg.telefono}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                        reg.ruta === "3km"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {reg.ruta.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {reg.llevaraMascota ? (
                      <span className="text-amber-600 font-medium">
                        {reg.nombreMascota || "Sí"}
                      </span>
                    ) : (
                      <span className="text-gray-400">No</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-gray-600">{reg.creadoEn}</td>
                  <td className="py-3 px-4">
                    {reg.verificado ? (
                      <span className="text-emerald-600 font-medium">Check-in</span>
                    ) : (
                      <CheckinButton id={reg.id} />
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
