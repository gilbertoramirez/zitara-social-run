import ZitaraIcon from "@/components/ui/zitara-icon";

export default function Footer() {
  return (
    <footer className="bg-zitara-olive text-white/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <ZitaraIcon className="h-10 w-auto" color="#BF7634" />
            <div>
              <p className="text-white font-extrabold text-lg tracking-tight uppercase">
                Zítara{" "}
                <span className="text-zitara-gold text-sm font-medium tracking-[0.15em]">
                  Social Run
                </span>
              </p>
              <p className="text-sm mt-1">
                2° Aniversario de la Primera Piedra
              </p>
            </div>
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
