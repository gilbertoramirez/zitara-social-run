const amenities = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
      </svg>
    ),
    label: "Café y bebidas",
    desc: "Disfruta de café caliente, agua y bebidas para rehidratarte",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.126-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265z" />
      </svg>
    ),
    label: "Snacks y refrigerios",
    desc: "Opciones de refrigerios para recargar energía después de la carrera",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    label: "Fisioterapia gratuita",
    desc: "Zona de recuperación con servicio de fisioterapia profesional",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    label: "Zona de picnic",
    desc: "Espacio para relajarte, convivir y disfrutar en un ambiente familiar",
  },
];

export default function AmenitiesSection() {
  return (
    <section id="amenidades" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-zitara-coral text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Después de la carrera
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-zitara-navy">
            Zona de convivencia
          </h2>
          <p className="mt-4 text-lg text-zitara-gray max-w-2xl mx-auto">
            Al finalizar, disfruta de un espacio pensado para relajarte y
            convivir en la experiencia Zítara
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {amenities.map((item) => (
            <div
              key={item.label}
              className="text-center p-6 rounded-2xl hover:bg-zitara-cream transition-colors"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-zitara-coral/10 flex items-center justify-center text-zitara-coral mb-4">
                {item.icon}
              </div>
              <h3 className="font-bold text-zitara-navy mb-2">{item.label}</h3>
              <p className="text-sm text-zitara-gray">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
