import Link from "next/link";
import RegistrationForm from "@/components/registration/registration-form";

export const metadata = {
  title: "Registro — Zítara Social Run",
  description: "Regístrate para el Zítara Social Run. Evento gratuito.",
};

export default function RegistroPage() {
  return (
    <div className="min-h-screen bg-zitara-cream">
      <div className="bg-zitara-navy py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-white tracking-tight">
              ZÍTARA
            </span>
            <span className="text-xs text-zitara-coral font-medium tracking-widest uppercase">
              Social Run
            </span>
          </Link>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-zitara-navy">
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
          <Link href="/" className="text-zitara-coral hover:underline">
            &larr; Volver al inicio
          </Link>
        </p>
      </div>
    </div>
  );
}
