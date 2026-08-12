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

    return NextResponse.json({
      success: true,
      message: "Tabla de registros creada exitosamente",
    });
  } catch (error) {
    console.error("Setup error:", error);
    return NextResponse.json(
      { error: "Error al crear las tablas" },
      { status: 500 }
    );
  }
}
