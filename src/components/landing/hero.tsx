import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-zitara-olive overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-zitara-olive via-zitara-olive/95 to-zitara-olive" />

      <div className="absolute inset-0 opacity-[0.07]">
        <div className="absolute top-20 left-10 w-72 h-72 bg-zitara-gold rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-zitara-cream rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="animate-fade-in-up flex justify-center mb-8">
          <Image
            src="/images/logo-gc-olive.png"
            alt="Zítara Golf Club"
            width={280}
            height={280}
            className="h-48 sm:h-56 lg:h-64 w-auto"
            priority
          />
        </div>

        <div className="animate-fade-in-up">
          <p className="text-zitara-gold text-sm sm:text-base font-medium tracking-[0.3em] uppercase mb-6">
            2do Aniversario de la Primera Piedra
          </p>
        </div>

        <h1 className="animate-fade-in-up animate-delay-100">
          <span className="block text-5xl sm:text-7xl lg:text-8xl font-heading font-black text-white tracking-tight leading-none uppercase">
            Social Run
          </span>
        </h1>

        <p className="animate-fade-in-up animate-delay-200 mt-8 text-lg sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
          Vive una experiencia única recorriendo los espacios que reflejan dos
          años de crecimiento. Elige tu ruta, conecta con la naturaleza y
          celebra con nosotros.
        </p>

        <div className="animate-fade-in-up animate-delay-300 mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/registro"
            className="bg-zitara-gold hover:bg-zitara-gold-light text-white font-semibold px-10 py-4 rounded-full text-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-zitara-gold/25"
          >
            Registrarme Gratis
          </Link>
          <a
            href="#rutas"
            className="border-2 border-white/20 hover:border-zitara-gold/40 text-white font-semibold px-10 py-4 rounded-full text-lg transition-all hover:bg-white/5"
          >
            Ver Rutas
          </a>
        </div>

        <div className="animate-fade-in-up animate-delay-400 mt-16 flex flex-wrap justify-center gap-8 sm:gap-16">
          <div className="text-center">
            <p className="text-3xl sm:text-4xl font-heading font-bold text-white">3</p>
            <p className="text-sm text-white/50 mt-1">Rutas</p>
          </div>
          <div className="text-center">
            <p className="text-3xl sm:text-4xl font-heading font-bold text-white">
              3-8 <span className="text-lg">km</span>
            </p>
            <p className="text-sm text-white/50 mt-1">Distancias</p>
          </div>
          <div className="text-center">
            <p className="text-3xl sm:text-4xl font-heading font-bold text-zitara-gold">
              $0
            </p>
            <p className="text-sm text-white/50 mt-1">Gratuito</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#rutas" aria-label="Scroll down">
          <svg className="w-6 h-6 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
}
