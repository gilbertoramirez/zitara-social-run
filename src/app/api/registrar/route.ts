import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db";
import { registrations } from "@/lib/db/schema";
import { registrationSchema } from "@/lib/validations";
import { generateQrDataUrl } from "@/lib/qr";
import { sendConfirmationEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = registrationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Datos inválidos", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { nombre, email, telefono, ruta } = parsed.data;
    const codigoQr = uuidv4();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const verificationUrl = `${baseUrl}/confirmacion?codigo=${codigoQr}`;
    const qrDataUrl = await generateQrDataUrl(verificationUrl);

    try {
      await db.insert(registrations).values({
        nombre,
        email,
        telefono,
        ruta,
        aceptoResponsabilidad: true,
        codigoQr,
      });
    } catch (dbError: unknown) {
      const err = dbError as { code?: string; constraint?: string; cause?: { code?: string; constraint?: string } };
      const code = err.code || err.cause?.code;
      const constraint = err.constraint || err.cause?.constraint;
      if (code === "23505") {
        return NextResponse.json(
          { error: "Ya existe un registro con este correo y teléfono" },
          { status: 409 }
        );
      }
      throw dbError;
    }

    try {
      await sendConfirmationEmail({
        to: email,
        nombre,
        ruta,
        qrDataUrl,
      });
    } catch (emailError) {
      console.error("Email send failed (registration still saved):", emailError);
    }

    return NextResponse.json({
      success: true,
      codigo: codigoQr,
      message: "Registro exitoso",
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
