import {
  pgTable,
  serial,
  varchar,
  timestamp,
  boolean,
  text,
  unique,
} from "drizzle-orm/pg-core";

export const registrations = pgTable("registrations", {
  id: serial("id").primaryKey(),
  nombre: varchar("nombre", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  telefono: varchar("telefono", { length: 20 }).notNull(),
  ruta: varchar("ruta", { length: 10 }).notNull(),
  aceptoResponsabilidad: boolean("acepto_responsabilidad")
    .notNull()
    .default(false),
  codigoQr: text("codigo_qr").notNull().unique(),
  verificado: boolean("verificado").default(false),
  creadoEn: timestamp("creado_en").defaultNow().notNull(),
}, (t) => [
  unique("registrations_email_telefono_key").on(t.email, t.telefono),
]);

export type Registration = typeof registrations.$inferSelect;
export type NewRegistration = typeof registrations.$inferInsert;
