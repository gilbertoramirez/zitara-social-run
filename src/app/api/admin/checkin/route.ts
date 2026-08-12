import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { db } from "@/lib/db";
import { registrations } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const body = await request.json();
  const { id, codigo } = body;

  if (!id && !codigo) {
    return NextResponse.json({ error: "ID o código requerido" }, { status: 400 });
  }

  try {
    const condition = codigo
      ? eq(registrations.codigoQr, codigo)
      : eq(registrations.id, id);

    const [reg] = await db
      .select()
      .from(registrations)
      .where(condition)
      .limit(1);

    if (!reg) {
      return NextResponse.json({ error: "Registro no encontrado" }, { status: 404 });
    }

    if (reg.verificado) {
      return NextResponse.json(
        { error: "Ya tiene check-in", nombre: reg.nombre, ruta: reg.ruta },
        { status: 409 }
      );
    }

    await db
      .update(registrations)
      .set({ verificado: true })
      .where(eq(registrations.id, reg.id));

    return NextResponse.json({
      success: true,
      nombre: reg.nombre,
      ruta: reg.ruta,
    });
  } catch (error) {
    console.error("Checkin error:", error);
    return NextResponse.json({ error: "Error al hacer check-in" }, { status: 500 });
  }
}
