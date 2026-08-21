import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!);

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

    await sql`
      ALTER TABLE registrations
      DROP CONSTRAINT IF EXISTS registrations_email_telefono_key
    `;

    await sql`
      DO $$ BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'registrations_email_key'
        ) THEN
          ALTER TABLE registrations
          ADD CONSTRAINT registrations_email_key UNIQUE (email);
        END IF;
      END $$
    `;

    await sql`
      DO $$ BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_name = 'registrations' AND column_name = 'llevara_mascota'
        ) THEN
          ALTER TABLE registrations ADD COLUMN llevara_mascota BOOLEAN DEFAULT false;
        END IF;
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_name = 'registrations' AND column_name = 'nombre_mascota'
        ) THEN
          ALTER TABLE registrations ADD COLUMN nombre_mascota VARCHAR(255);
        END IF;
      END $$
    `;

    return NextResponse.json({
      success: true,
      message: "Tabla de registros actualizada exitosamente",
    });
  } catch (error) {
    console.error("Setup error:", error);
    return NextResponse.json(
      { error: "Error al crear las tablas" },
      { status: 500 }
    );
  }
}
