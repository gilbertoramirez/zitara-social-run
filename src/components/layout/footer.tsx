export default function Footer() {
  return (
    <footer className="bg-zitara-navy text-white/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white font-bold text-lg tracking-tight">
              ZÍTARA <span className="text-zitara-coral text-sm">Social Run</span>
            </p>
            <p className="text-sm mt-1">
              2° Aniversario de la Primera Piedra
            </p>
          </div>
          <div className="text-sm text-center md:text-right">
            <p>Evento gratuito con registro previo</p>
            <p className="mt-1">&copy; {new Date().getFullYear()} Zítara. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
