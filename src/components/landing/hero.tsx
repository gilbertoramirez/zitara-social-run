import Link from "next/link";
import Image from "next/image";
import { EVENT } from "@/lib/constants";
import Countdown from "./countdown";
import SpotsCounter from "./spots-counter";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-zitara-olive overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-zitara-olive via-zitara-olive/95 to-zitara-olive" />

      <div className="absolute inset-0 opacity-[0.07]">
        <div className="absolute top-20 left-10 w-72 h-72 bg-zitara-gold rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-zitara-cream rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto pt-20">
        <div className="animate-fade-in-up flex justify-center mb-8">
          <Image
            src="/images/evento-2do-aniversario.jpeg"
            alt="Zitara 2do Aniversario"
            width={500}
            height={100}
            className="h-20 sm:h-28 lg:h-32 w-auto"
            priority
          />
        </div>

        <h1 className="animate-fade-in-up animate-delay-100">
          <span className="block text-5xl sm:text-7xl lg:text-8xl font-heading font-black text-white tracking-tight leading-none uppercase">
            Workout Zitara
          </span>
          <span className="block text-lg sm:text-xl text-zitara-gold font-medium tracking-[0.2em] uppercase mt-4">
            Pampering Runners Day
          </span>
        </h1>

        <p className="animate-fade-in-up animate-delay-100 mt-4 text-lg text-white/40 font-medium">
          {EVENT.date}
        </p>

        <div className="animate-fade-in-up animate-delay-200 mt-8">
          <Countdown targetDate={EVENT.eventDate} />
        </div>

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

        <div className="animate-fade-in-up animate-delay-400 mt-16 mb-12">
          <SpotsCounter />
        </div>
      </div>
    </section>
  );
}
