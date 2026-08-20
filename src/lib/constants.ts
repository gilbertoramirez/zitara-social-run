export const EVENT = {
  name: "Zítara Social Run",
  tagline: "2do Aniversario de la Primera Piedra",
  subtitle: "Celebra con nosotros dos años de historia y crecimiento",
  date: "5 de septiembre, 2026",
  eventDate: "2026-09-05T06:25:00-06:00",
  maxCapacity: 150,
  location: "Zítara",
  address: "Blvd. Luis Adolfo Ruiz, Salida Calvillo",
  registrationTime: "6:25 AM",
  startTime: "6:25 AM",
  price: "Gratuito",
  petFriendly: true,
  routes: [
    {
      distance: "3km",
      label: "3 KM",
      description: "Ideal para principiantes y familias",
      color: "emerald",
    },
    {
      distance: "6km",
      label: "6 KM",
      description: "Para los más aventureros",
      color: "blue",
    },
  ],
  amenities: [
    { icon: "breakfast", label: "Desayuno", desc: "Rico desayuno incluido para todos los participantes" },
    { icon: "rehab", label: "Rehabilitación", desc: "Zona de rehabilitación con atención profesional" },
    { icon: "picnic", label: "Zona de picnic", desc: "Espacio para relajarte, convivir y disfrutar en familia" },
    { icon: "pet", label: "Pet Friendly", desc: "Trae a tu mascota y disfruten juntos del evento" },
    { icon: "socks", label: "Calcetas", desc: "Entrega de calcetas para los participantes registrados" },
    { icon: "surprise", label: "Sorpresas", desc: "Premios, sorpresas y mucha diversión durante todo el evento" },
  ],
  schedule: [
    { time: "6:25 AM", title: "Registro, calcetas y ¡Salida!", description: "Recepción, entrega de calcetas y banderazo de salida para 3K y 6K" },
    { time: "8:00 AM", title: "Body Combat", description: "Clase con Valeria Padilla" },
    { time: "9:00 AM", title: "Body Balance", description: "Clase con Rosita Gonzales" },
    { time: "10:00 AM", title: "Zumba", description: "Clase con Joselin Huerta" },
    { time: "11:00 AM", title: "Fin del evento", description: "Desayuno, zona de picnic, rehabilitación y sorpresas" },
  ],
} as const;

export const WAIVER_TEXT = `DESLINDE DE RESPONSABILIDAD

Al registrarme y participar en el evento "Zítara Social Run", organizado como parte de la celebración del 2° Aniversario de la Primera Piedra de Zítara, declaro y acepto lo siguiente:

1. PARTICIPACIÓN VOLUNTARIA
Mi participación en este evento es completamente voluntaria. He decidido participar por mi propia voluntad y sin ningún tipo de coacción.

2. CONDICIÓN FÍSICA
Declaro que me encuentro en condiciones físicas adecuadas para realizar la actividad deportiva seleccionada (3 km o 6 km). Reconozco que es mi responsabilidad consultar a un médico antes de participar si tengo alguna condición de salud preexistente.

3. ACEPTACIÓN DE RIESGOS
Reconozco que la práctica de actividades deportivas al aire libre conlleva riesgos inherentes, incluyendo pero no limitados a: caídas, lesiones musculares, deshidratación, golpes de calor, y otros incidentes propios de la actividad física. Acepto estos riesgos de manera consciente y voluntaria.

4. DESLINDE DE RESPONSABILIDAD
Eximo de toda responsabilidad civil, penal y/o administrativa a los organizadores del evento, a Zítara, sus directivos, empleados, voluntarios y patrocinadores, por cualquier lesión, daño, pérdida o perjuicio que pudiera sufrir durante mi participación en el evento, salvo en casos de negligencia grave o dolo comprobado.

5. AUTORIZACIÓN MÉDICA DE EMERGENCIA
En caso de emergencia médica durante el evento, autorizo a los organizadores a proporcionar o gestionar la atención médica de primeros auxilios que consideren necesaria.

6. USO DE IMAGEN
Autorizo el uso de fotografías, videos y cualquier material audiovisual captado durante el evento para fines promocionales, informativos y de difusión por parte de los organizadores, sin derecho a compensación alguna.

7. PROTECCIÓN DE DATOS PERSONALES
Los datos personales proporcionados en el registro serán utilizados exclusivamente para la gestión del evento y no serán compartidos con terceros sin mi consentimiento, en cumplimiento con la legislación aplicable en materia de protección de datos personales.

Al marcar la casilla de aceptación, confirmo que he leído, entendido y acepto todas las condiciones establecidas en este deslinde de responsabilidad.`;
