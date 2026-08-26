import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";
import { registrations } from "@/lib/db/schema";
import { sql } from "drizzle-orm";
import { EVENT } from "@/lib/constants";
import RegistrationForm from "@/components/registration/registration-form";

export const metadata = {
  title: "Registro — Zítara Social Run",
  description: "Regístrate para el Zítara Social Run. Evento gratuito.",
};

export const dynamic = "force-dynamic";

export default async function RegistroPage() {
  let registered = 0;
  try {
    const [result] = await db
      .select({ count: sql<number>`count(*)` })
      .from(registrations);
    registered = Number(result.count);
  } catch { /* allow page to render */ }

  const closed = registered >= EVENT.maxCapacity;
  const available = Math.max(0, EVENT.maxCapacity - registered);

  return (
    <div className="min-h-screen bg-zitara-cream-light">
      <div className="bg-zitara-olive py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo-gc-horizontal-olive.png"
              alt="Zítara Golf Club"
              width={160}
              height={44}
              className="h-10 w-auto"
            />
          </Link>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-heading font-black text-zitara-olive uppercase tracking-tight">
            Registro
          </h1>
          <p className="mt-3 text-zitara-gray">
            Completa tus datos para reservar tu lugar en el Zítara Social Run
          </p>
          {!closed && available <= 20 && (
            <p className="mt-2 text-sm font-medium text-amber-600">
              Últimos {available} lugares disponibles
            </p>
          )}
        </div>

        {closed ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
            <div className="text-5xl mb-4">
              🏃‍♂️
            </div>
            <h2 className="text-2xl font-heading font-bold text-zitara-olive mb-3">
              ¡Cupo lleno!
            </h2>
            <p className="text-zitara-gray leading-relaxed">
              Los {EVENT.maxCapacity} lugares se agotaron. Nos encantaría verte en
              el próximo evento.
            </p>
            <p className="text-zitara-gray mt-2 leading-relaxed">
              Síguenos en redes para enterarte primero.
            </p>
            <div className="mt-6">
              <Link
                href="/"
                className="inline-block bg-zitara-gold hover:bg-zitara-gold-light text-white font-semibold px-8 py-3 rounded-full transition-all hover:scale-105"
              >
                Volver al inicio
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <RegistrationForm />
          </div>
        )}

        <p className="text-center text-sm text-zitara-gray mt-6">
          <Link href="/" className="text-zitara-gold hover:underline">
            &larr; Volver al inicio
          </Link>
        </p>
      </div>
    </div>
  );
}
