import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { db } from "@/lib/db";
import { registrations } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = await request.json();
  if (!id) {
    return NextResponse.json({ error: "ID requerido" }, { status: 400 });
  }

  try {
    const [reg] = await db
      .select()
      .from(registrations)
      .where(eq(registrations.id, id))
      .limit(1);

    if (!reg) {
      return NextResponse.json({ error: "Registro no encontrado" }, { status: 404 });
    }

    if (reg.verificado) {
      return NextResponse.json({ error: "Ya tiene check-in" }, { status: 409 });
    }

    await db
      .update(registrations)
      .set({ verificado: true })
      .where(eq(registrations.id, id));

    return NextResponse.json({ success: true, nombre: reg.nombre });
  } catch (error) {
    console.error("Checkin error:", error);
    return NextResponse.json({ error: "Error al hacer check-in" }, { status: 500 });
  }
}
