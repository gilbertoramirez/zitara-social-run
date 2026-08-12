import { z } from "zod";

export const registrationSchema = z.object({
  nombre: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(255, "El nombre es demasiado largo"),
  email: z.string().email("Correo electrónico inválido"),
  telefono: z
    .string()
    .min(10, "El teléfono debe tener al menos 10 dígitos")
    .max(20, "El teléfono es demasiado largo")
    .regex(/^[0-9+\-\s()]+$/, "Formato de teléfono inválido"),
  ruta: z.enum(["3km", "5km", "8km"], {
    error: "Selecciona una ruta",
  }),
  aceptoResponsabilidad: z.literal(true, {
    error: "Debes aceptar el deslinde de responsabilidad",
  }),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;
