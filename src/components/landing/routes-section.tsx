import { EVENT } from "@/lib/constants";
import Link from "next/link";

const routeStyles: Record<string, { gradient: string; badge: string }> = {
  emerald: {
    gradient: "from-emerald-500/10 to-emerald-500/5",
    badge: "bg-emerald-600 text-white",
  },
  blue: {
    gradient: "from-zitara-gold/10 to-zitara-gold/5",
    badge: "bg-zitara-gold text-white",
  },
};

export default function RoutesSection() {
  return (
    <section id="rutas" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-zitara-gold text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Elige tu distancia
          </p>
          <h2 className="text-4xl sm:text-5xl font-heading font-black text-zitara-olive uppercase tracking-tight">
            Rutas para todos
          </h2>
          <p className="mt-4 text-lg text-zitara-gray max-w-2xl mx-auto">
            Diseñadas para disfrutar el entorno natural de Zítara mientras
            conoces de cerca la evolución del proyecto
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {EVENT.routes.map((route) => {
            const style = routeStyles[route.color];
            return (
              <div
                key={route.distance}
                className={`relative bg-gradient-to-b ${style.gradient} rounded-2xl p-8 text-center border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1`}
              >
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${style.badge} mb-6`}>
                  <span className="text-2xl font-bold">{route.label}</span>
                </div>
                <h3 className="text-xl font-bold text-zitara-olive mb-2">
                  Ruta de {route.label}
                </h3>
                <p className="text-zitara-gray">{route.description}</p>
                <Link
                  href="/registro"
                  className={`inline-block mt-6 px-6 py-2.5 rounded-full text-sm font-semibold ${style.badge} hover:opacity-90 transition-opacity`}
                >
                  Elegir esta ruta
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
