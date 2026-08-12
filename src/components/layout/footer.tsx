import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-zitara-olive text-white/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Image
              src="/images/logo-gc-horizontal-olive.png"
              alt="Zítara Golf Club"
              width={160}
              height={44}
              className="h-11 w-auto"
            />
          </div>
          <div className="text-sm text-center md:text-right">
            <p>Evento gratuito con registro previo</p>
            <p className="mt-1">&copy; {new Date().getFullYear()} Zítara Golf Club. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
