import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="py-24 bg-zitara-navy relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-20 w-64 h-64 bg-zitara-coral rounded-full blur-[80px]" />
        <div className="absolute bottom-10 left-20 w-80 h-80 bg-zitara-gold rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
          Vive los avances, conecta
          <br />
          con la naturaleza
        </h2>
        <p className="mt-6 text-lg text-white/60 max-w-2xl mx-auto">
          Celebra con nosotros dos años de historia y crecimiento en Zítara.
          Evento gratuito con registro previo.
        </p>
        <Link
          href="/registro"
          className="inline-block mt-10 bg-zitara-coral hover:bg-zitara-coral-light text-white font-semibold px-12 py-4 rounded-full text-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-zitara-coral/25"
        >
          Registrarme Ahora
        </Link>
      </div>
    </section>
  );
}
