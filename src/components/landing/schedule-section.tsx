import { EVENT } from "@/lib/constants";

export default function ScheduleSection() {
  return (
    <section id="horario" className="py-24 bg-zitara-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-zitara-coral text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Programa del día
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-zitara-navy">
            Horario
          </h2>
        </div>

        <div className="max-w-2xl mx-auto">
          {EVENT.schedule.map((item, i) => (
            <div key={i} className="flex gap-6 mb-12 last:mb-0">
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-zitara-navy flex items-center justify-center shrink-0">
                  <span className="text-white text-xs font-bold">{item.time}</span>
                </div>
                {i < EVENT.schedule.length - 1 && (
                  <div className="w-0.5 h-full bg-zitara-navy/20 mt-2" />
                )}
              </div>
              <div className="pt-2">
                <h3 className="text-xl font-bold text-zitara-navy">
                  {item.title}
                </h3>
                <p className="text-zitara-gray mt-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
