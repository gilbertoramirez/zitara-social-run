import Link from "next/link";
import Image from "next/image";
import RegistrationForm from "@/components/registration/registration-form";

export const metadata = {
  title: "Registro — Zítara Social Run",
  description: "Regístrate para el Zítara Social Run. Evento gratuito.",
};

export default function RegistroPage() {
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
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <RegistrationForm />
        </div>

        <p className="text-center text-sm text-zitara-gray mt-6">
          <Link href="/" className="text-zitara-gold hover:underline">
            &larr; Volver al inicio
          </Link>
        </p>
      </div>
    </div>
  );
}
