"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { EVENT } from "@/lib/constants";
import WaiverModal from "./waiver-modal";

type RouteOption = "3km" | "6km";

interface FormErrors {
  nombre?: string;
  email?: string;
  telefono?: string;
  ruta?: string;
  aceptoResponsabilidad?: string;
  general?: string;
}

const routeCardStyles: Record<string, { ring: string; bg: string }> = {
  emerald: {
    ring: "ring-emerald-600",
    bg: "bg-emerald-50",
  },
  blue: {
    ring: "ring-zitara-gold",
    bg: "bg-amber-50",
  },
};

export default function RegistrationForm() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [ruta, setRuta] = useState<RouteOption | "">("");
  const [llevaraMascota, setLlevaraMascota] = useState(false);
  const [nombreMascota, setNombreMascota] = useState("");
  const [acepto, setAcepto] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!nombre || nombre.trim().length < 2) errs.nombre = "El nombre es requerido";
    if (!email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
      errs.email = "Ingresa un correo electrónico válido";
    const digits = telefono.replace(/\D/g, "");
    if (digits.length !== 10)
      errs.telefono = "El teléfono debe tener exactamente 10 dígitos";
    if (!ruta) errs.ruta = "Selecciona una ruta";
    if (!acepto)
      errs.aceptoResponsabilidad = "Debes aceptar el deslinde de responsabilidad";
    return errs;
  }

  function handleTelefonoChange(value: string) {
    setTelefono(value.replace(/\D/g, "").slice(0, 10));
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
          llevaraMascota,
          nombreMascota: llevaraMascota ? nombreMascota : "",
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
        <label htmlFor="nombre" className="block text-sm font-semibold text-zitara-olive mb-2">
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
          } focus:outline-none focus:ring-2 focus:ring-zitara-gold/50 focus:border-zitara-gold transition-colors text-gray-900 placeholder:text-gray-400`}
        />
        {errors.nombre && (
          <p className="mt-1 text-sm text-red-500">{errors.nombre}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-zitara-olive mb-2">
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
          } focus:outline-none focus:ring-2 focus:ring-zitara-gold/50 focus:border-zitara-gold transition-colors text-gray-900 placeholder:text-gray-400`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="telefono" className="block text-sm font-semibold text-zitara-olive mb-2">
          Teléfono
        </label>
        <input
          id="telefono"
          type="tel"
          inputMode="tel"
          value={telefono}
          onChange={(e) => handleTelefonoChange(e.target.value)}
          maxLength={10}
          placeholder="10 dígitos"
          className={`w-full px-4 py-3 rounded-xl border ${
            errors.telefono ? "border-red-400" : "border-gray-200"
          } focus:outline-none focus:ring-2 focus:ring-zitara-gold/50 focus:border-zitara-gold transition-colors text-gray-900 placeholder:text-gray-400`}
        />
        {errors.telefono && (
          <p className="mt-1 text-sm text-red-500">{errors.telefono}</p>
        )}
      </div>

      <div>
        <p className="block text-sm font-semibold text-zitara-olive mb-4">
          Selecciona tu ruta
        </p>
        {errors.ruta && (
          <p className="mb-2 text-sm text-red-500">{errors.ruta}</p>
        )}
        <div className="grid grid-cols-2 gap-4">
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
                    selected ? "text-zitara-olive" : "text-zitara-olive"
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

      <div>
        <p className="block text-sm font-semibold text-zitara-olive mb-4">
          ¿Llevarás mascota?
        </p>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => {
              setLlevaraMascota(false);
              setNombreMascota("");
            }}
            className={`p-4 rounded-xl border-2 transition-all text-center ${
              !llevaraMascota
                ? "bg-amber-50 ring-2 ring-zitara-gold border-transparent"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <span className="block text-xl mb-1">Sin mascota</span>
            <span className="block text-xs text-zitara-gray">Iré solo/a</span>
          </button>
          <button
            type="button"
            onClick={() => setLlevaraMascota(true)}
            className={`p-4 rounded-xl border-2 transition-all text-center ${
              llevaraMascota
                ? "bg-amber-50 ring-2 ring-zitara-gold border-transparent"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <span className="block text-xl mb-1">Con mascota</span>
            <span className="block text-xs text-zitara-gray">Pet friendly</span>
          </button>
        </div>

        {llevaraMascota && (
          <div className="mt-4">
            <label htmlFor="nombreMascota" className="block text-sm font-semibold text-zitara-olive mb-2">
              Nombre de tu mascota
            </label>
            <input
              id="nombreMascota"
              type="text"
              value={nombreMascota}
              onChange={(e) => setNombreMascota(e.target.value)}
              placeholder="¿Cómo se llama tu mascota?"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-zitara-gold/50 focus:border-zitara-gold transition-colors text-gray-900 placeholder:text-gray-400"
            />
          </div>
        )}
      </div>

      <div className="bg-zitara-cream rounded-xl p-6">
        <div className="flex items-start gap-3">
          <input
            id="acepto"
            type="checkbox"
            checked={acepto}
            onChange={(e) => setAcepto(e.target.checked)}
            className="mt-1 h-5 w-5 rounded border-gray-300 text-zitara-gold focus:ring-zitara-gold cursor-pointer accent-[#BF7634]"
          />
          <div>
            <label
              htmlFor="acepto"
              className="text-sm text-zitara-olive font-medium cursor-pointer"
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
        className="w-full bg-zitara-gold hover:bg-zitara-gold-light disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-full text-lg transition-all hover:shadow-lg hover:shadow-zitara-gold/25"
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
