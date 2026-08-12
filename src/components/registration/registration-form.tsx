"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { EVENT } from "@/lib/constants";
import WaiverModal from "./waiver-modal";

type RouteOption = "3km" | "5km" | "8km";

interface FormErrors {
  nombre?: string;
  email?: string;
  telefono?: string;
  ruta?: string;
  aceptoResponsabilidad?: string;
  general?: string;
}

const routeCardStyles: Record<string, { ring: string; bg: string; badge: string }> = {
  emerald: {
    ring: "ring-emerald-500",
    bg: "bg-emerald-50",
    badge: "bg-emerald-500 text-white",
  },
  blue: {
    ring: "ring-blue-500",
    bg: "bg-blue-50",
    badge: "bg-blue-500 text-white",
  },
  violet: {
    ring: "ring-violet-500",
    bg: "bg-violet-50",
    badge: "bg-violet-500 text-white",
  },
};

export default function RegistrationForm() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [ruta, setRuta] = useState<RouteOption | "">("");
  const [acepto, setAcepto] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!nombre || nombre.length < 2) errs.nombre = "El nombre es requerido";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "Correo electrónico inválido";
    if (!telefono || telefono.replace(/\D/g, "").length < 10)
      errs.telefono = "El teléfono debe tener al menos 10 dígitos";
    if (!ruta) errs.ruta = "Selecciona una ruta";
    if (!acepto)
      errs.aceptoResponsabilidad = "Debes aceptar el deslinde de responsabilidad";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          email,
          telefono,
          ruta,
          aceptoResponsabilidad: acepto,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors({ general: data.error || "Error al registrarse" });
        return;
      }

      router.push(`/confirmacion?codigo=${data.codigo}`);
    } catch {
      setErrors({ general: "Error de conexión. Intenta de nuevo." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {errors.general && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
          {errors.general}
        </div>
      )}

      <div>
        <label htmlFor="nombre" className="block text-sm font-semibold text-zitara-navy mb-2">
          Nombre completo
        </label>
        <input
          id="nombre"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Tu nombre completo"
          className={`w-full px-4 py-3 rounded-xl border ${
            errors.nombre ? "border-red-400" : "border-gray-200"
          } focus:outline-none focus:ring-2 focus:ring-zitara-coral/50 focus:border-zitara-coral transition-colors text-gray-900 placeholder:text-gray-400`}
        />
        {errors.nombre && (
          <p className="mt-1 text-sm text-red-500">{errors.nombre}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-zitara-navy mb-2">
          Correo electrónico
        </label>
        <input
          id="email"
          type="email"
          inputMode="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@correo.com"
          className={`w-full px-4 py-3 rounded-xl border ${
            errors.email ? "border-red-400" : "border-gray-200"
          } focus:outline-none focus:ring-2 focus:ring-zitara-coral/50 focus:border-zitara-coral transition-colors text-gray-900 placeholder:text-gray-400`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="telefono" className="block text-sm font-semibold text-zitara-navy mb-2">
          Teléfono
        </label>
        <input
          id="telefono"
          type="tel"
          inputMode="tel"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          placeholder="10 dígitos"
          className={`w-full px-4 py-3 rounded-xl border ${
            errors.telefono ? "border-red-400" : "border-gray-200"
          } focus:outline-none focus:ring-2 focus:ring-zitara-coral/50 focus:border-zitara-coral transition-colors text-gray-900 placeholder:text-gray-400`}
        />
        {errors.telefono && (
          <p className="mt-1 text-sm text-red-500">{errors.telefono}</p>
        )}
      </div>

      <div>
        <p className="block text-sm font-semibold text-zitara-navy mb-4">
          Selecciona tu ruta
        </p>
        {errors.ruta && (
          <p className="mb-2 text-sm text-red-500">{errors.ruta}</p>
        )}
        <div className="grid grid-cols-3 gap-4">
          {EVENT.routes.map((route) => {
            const style = routeCardStyles[route.color];
            const selected = ruta === route.distance;
            return (
              <button
                key={route.distance}
                type="button"
                onClick={() => setRuta(route.distance as RouteOption)}
                className={`relative p-4 rounded-xl border-2 transition-all text-center ${
                  selected
                    ? `${style.bg} ${style.ring} ring-2 border-transparent`
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <span
                  className={`inline-block text-xl font-bold mb-1 ${
                    selected ? "" : "text-zitara-navy"
                  }`}
                >
                  {route.label}
                </span>
                <span className="block text-xs text-zitara-gray">
                  {route.description}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-zitara-cream rounded-xl p-6">
        <div className="flex items-start gap-3">
          <input
            id="acepto"
            type="checkbox"
            checked={acepto}
            onChange={(e) => setAcepto(e.target.checked)}
            className="mt-1 h-5 w-5 rounded border-gray-300 text-zitara-coral focus:ring-zitara-coral cursor-pointer accent-[#e94560]"
          />
          <div>
            <label
              htmlFor="acepto"
              className="text-sm text-zitara-navy font-medium cursor-pointer"
            >
              He leído y acepto el deslinde de responsabilidad
            </label>
            <div className="mt-1">
              <WaiverModal />
            </div>
          </div>
        </div>
        {errors.aceptoResponsabilidad && (
          <p className="mt-2 text-sm text-red-500">
            {errors.aceptoResponsabilidad}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-zitara-coral hover:bg-zitara-coral-light disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-full text-lg transition-all hover:shadow-lg hover:shadow-zitara-coral/25"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Registrando...
          </span>
        ) : (
          "Completar Registro"
        )}
      </button>
    </form>
  );
}
