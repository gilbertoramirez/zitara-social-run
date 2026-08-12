import { sql } from "@vercel/postgres";

async function createTables() {
  await sql`
    CREATE TABLE IF NOT EXISTS registrations (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      telefono VARCHAR(20) NOT NULL,
      ruta VARCHAR(10) NOT NULL,
      acepto_responsabilidad BOOLEAN NOT NULL DEFAULT false,
      codigo_qr TEXT NOT NULL UNIQUE,
      verificado BOOLEAN DEFAULT false,
      creado_en TIMESTAMP DEFAULT NOW() NOT NULL
    )
  `;
  console.log("Tables created successfully");
}

createTables().catch(console.error);
