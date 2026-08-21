import {
  pgTable,
  serial,
  varchar,
  timestamp,
  boolean,
  text,
} from "drizzle-orm/pg-core";

export const registrations = pgTable("registrations", {
  id: serial("id").primaryKey(),
  nombre: varchar("nombre", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  telefono: varchar("telefono", { length: 20 }).notNull(),
  ruta: varchar("ruta", { length: 10 }).notNull(),
  aceptoResponsabilidad: boolean("acepto_responsabilidad")
    .notNull()
    .default(false),
  llevaraMascota: boolean("llevara_mascota").default(false),
  nombreMascota: varchar("nombre_mascota", { length: 255 }),
  codigoQr: text("codigo_qr").notNull().unique(),
  verificado: boolean("verificado").default(false),
  creadoEn: timestamp("creado_en").defaultNow().notNull(),
});

export type Registration = typeof registrations.$inferSelect;
export type NewRegistration = typeof registrations.$inferInsert;
