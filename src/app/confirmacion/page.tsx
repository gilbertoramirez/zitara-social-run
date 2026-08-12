import Link from "next/link";
import { db } from "@/lib/db";
import { registrations } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { generateQrDataUrl } from "@/lib/qr";
import QrDisplay from "@/components/confirmation/qr-display";
import Image from "next/image";

export const metadata = {
  title: "Confirmación — Zítara Social Run",
};

export default async function ConfirmacionPage({
  searchParams,
}: {
  searchParams: Promise<{ codigo?: string }>;
}) {
  const params = await searchParams;
  const codigo = params.codigo;

  if (!codigo) {
    return (
      <div className="min-h-screen bg-zitara-cream-light flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zitara-olive mb-4">
            Código no proporcionado
          </h1>
          <Link href="/registro" className="text-zitara-gold hover:underline">
            Ir al registro
          </Link>
        </div>
      </div>
    );
  }

  let registration;
  let qrDataUrl = "";

  try {
    const [result] = await db
      .select()
      .from(registrations)
      .where(eq(registrations.codigoQr, codigo))
      .limit(1);

    registration = result;

    if (registration) {
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      const verificationUrl = `${baseUrl}/confirmacion?codigo=${codigo}`;
      qrDataUrl = await generateQrDataUrl(verificationUrl);
    }
  } catch (error) {
    console.error("Error loading confirmation:", error);
  }

  if (!registration) {
    return (
      <div className="min-h-screen bg-zitara-cream-light flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zitara-olive mb-4">
            Registro no encontrado
          </h1>
          <p className="text-zitara-gray mb-6">
            El código proporcionado no corresponde a ningún registro.
          </p>
          <Link href="/registro" className="text-zitara-gold hover:underline">
            Registrarme
          </Link>
        </div>
      </div>
    );
  }

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

      <div className="max-w-lg mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-zitara-olive uppercase tracking-tight">
            Registro exitoso
          </h1>
          <p className="mt-2 text-zitara-gray">
            Tu lugar está reservado, {registration.nombre}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <p className="text-xs text-zitara-gray uppercase tracking-wider mb-1">
                  Nombre
                </p>
                <p className="font-semibold text-zitara-olive">
                  {registration.nombre}
                </p>
              </div>
              <div>
                <p className="text-xs text-zitara-gray uppercase tracking-wider mb-1">
                  Ruta
                </p>
                <p className="font-semibold text-zitara-olive">
                  {registration.ruta.toUpperCase()}
                </p>
              </div>
              <div>
                <p className="text-xs text-zitara-gray uppercase tracking-wider mb-1">
                  Registro
                </p>
                <p className="font-semibold text-zitara-olive">6:20 AM</p>
              </div>
              <div>
                <p className="text-xs text-zitara-gray uppercase tracking-wider mb-1">
                  Salida
                </p>
                <p className="font-semibold text-zitara-olive">7:00 AM</p>
              </div>
            </div>

            <QrDisplay qrDataUrl={qrDataUrl} />
          </div>

          <div className="bg-zitara-cream border-t border-zitara-gold/20 px-6 py-4">
            <p className="text-sm text-zitara-olive">
              <strong>Importante:</strong> Guarda o captura este código QR. Es
              tu entrada al evento. También se envió a tu correo electrónico.
            </p>
          </div>
        </div>

        <p className="text-center text-sm text-zitara-gray mt-8">
          <Link href="/" className="text-zitara-gold hover:underline">
            &larr; Volver al inicio
          </Link>
        </p>
      </div>
    </div>
  );
}
