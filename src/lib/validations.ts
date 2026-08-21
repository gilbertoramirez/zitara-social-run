import { z } from "zod";

export const registrationSchema = z.object({
  nombre: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(255, "El nombre es demasiado largo"),
  email: z
    .string()
    .email("Correo electrónico inválido")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Correo electrónico inválido"
    ),
  telefono: z
    .string()
    .transform((v) => v.replace(/\D/g, ""))
    .pipe(
      z
        .string()
        .length(10, "El teléfono debe tener exactamente 10 dígitos")
    ),
  ruta: z.enum(["3km", "6km"], {
    error: "Selecciona una ruta",
  }),
  llevaraMascota: z.boolean().default(false),
  nombreMascota: z
    .string()
    .max(255, "El nombre de la mascota es demasiado largo")
    .optional()
    .default(""),
  aceptoResponsabilidad: z.literal(true, {
    error: "Debes aceptar el deslinde de responsabilidad",
  }),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;
