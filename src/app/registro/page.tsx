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
              src="/images/z-mark.png"
              alt="Zítara"
              width={40}
              height={40}
              className="h-9 w-auto"
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
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
            <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-xl font-heading font-bold text-zitara-olive mb-2">
              Registro cerrado
            </h2>
            <p className="text-zitara-gray">
              Lo sentimos, los {EVENT.maxCapacity} lugares disponibles ya fueron
              ocupados. Gracias por tu interés.
            </p>
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
