import Image from "next/image";

const sponsors = [
  { src: "/images/sponsors/one-day-running-club-dark.jpeg", alt: "One Day Running Club", height: "h-20" },
  { src: "/images/sponsors/jac.jpeg", alt: "JAC Aguascalientes", height: "h-16" },
  { src: "/images/sponsors/bms.png", alt: "BMS", height: "h-16" },
  { src: "/images/Zitara PNG .png", alt: "Zítara", height: "h-16" },
  { src: "/images/sponsors/zitara-golf-club.png", alt: "Zítara Golf Club", height: "h-16" },
];

export default function Footer() {
  return (
    <footer className="bg-zitara-olive text-white/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="border-b border-white/10 pb-8 mb-8">
          <p className="text-center text-xs text-white/40 uppercase tracking-[0.2em] mb-6">
            Con el apoyo de
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {sponsors.map((s) => (
              <Image
                key={s.alt}
                src={s.src}
                alt={s.alt}
                width={240}
                height={100}
                className={`${s.height} w-auto object-contain rounded`}
              />
            ))}
          </div>
        </div>

        <div className="text-sm text-center">
          <p>Evento gratuito con registro previo</p>
          <p className="mt-1">&copy; {new Date().getFullYear()} Zítara Golf Club. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
