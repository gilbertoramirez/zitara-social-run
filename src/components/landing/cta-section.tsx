import Link from "next/link";
import Image from "next/image";

export default function CtaSection() {
  return (
    <section className="py-24 bg-zitara-olive relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.07]">
        <div className="absolute top-10 right-20 w-64 h-64 bg-zitara-gold rounded-full blur-[80px]" />
        <div className="absolute bottom-10 left-20 w-80 h-80 bg-zitara-cream rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-8">
          <Image
            src="/images/logo-gc-olive.png"
            alt="Zítara Golf Club"
            width={120}
            height={120}
            className="h-24 sm:h-28 w-auto opacity-60"
          />
        </div>
        <h2 className="text-4xl sm:text-5xl font-heading font-black text-white leading-tight uppercase tracking-tight">
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
          className="inline-block mt-10 bg-zitara-gold hover:bg-zitara-gold-light text-white font-semibold px-12 py-4 rounded-full text-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-zitara-gold/25"
        >
          Registrarme Ahora
        </Link>
      </div>
    </section>
  );
}
