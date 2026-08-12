import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { registrations } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const codigo = request.nextUrl.searchParams.get("codigo");

  if (!codigo) {
    return new NextResponse(renderHtml("Error", "Código no proporcionado", "error"), {
      status: 400,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  try {
    const [registration] = await db
      .select()
      .from(registrations)
      .where(eq(registrations.codigoQr, codigo))
      .limit(1);

    if (!registration) {
      return new NextResponse(
        renderHtml("No encontrado", "Este código QR no es válido", "error"),
        { status: 404, headers: { "Content-Type": "text/html; charset=utf-8" } }
      );
    }

    if (registration.verificado) {
      return new NextResponse(
        renderHtml(
          "Ya verificado",
          `${registration.nombre} ya realizó check-in previamente.`,
          "warning",
          registration.ruta
        ),
        { headers: { "Content-Type": "text/html; charset=utf-8" } }
      );
    }

    await db
      .update(registrations)
      .set({ verificado: true })
      .where(eq(registrations.codigoQr, codigo));

    return new NextResponse(
      renderHtml(
        "Check-in exitoso",
        `¡Bienvenido/a, ${registration.nombre}!`,
        "success",
        registration.ruta
      ),
      { headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  } catch (error) {
    console.error("Verification error:", error);
    return new NextResponse(
      renderHtml("Error", "Error al verificar el código", "error"),
      { status: 500, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }
}

function renderHtml(
  title: string,
  message: string,
  type: "success" | "warning" | "error",
  ruta?: string
): string {
  const colors = {
    success: { bg: "#ecfdf5", border: "#10b981", text: "#065f46", icon: "&#10003;" },
    warning: { bg: "#fffbeb", border: "#f59e0b", text: "#92400e", icon: "&#9888;" },
    error: { bg: "#fef2f2", border: "#ef4444", text: "#991b1b", icon: "&#10007;" },
  };
  const c = colors[type];

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — Zítara Social Run</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #1a1a2e; padding: 20px; }
    .card { background: #fff; border-radius: 16px; padding: 48px 32px; text-align: center; max-width: 400px; width: 100%; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
    .icon { width: 64px; height: 64px; border-radius: 50%; background: ${c.bg}; border: 3px solid ${c.border}; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; font-size: 28px; color: ${c.text}; }
    h1 { font-size: 24px; color: #1a1a2e; margin-bottom: 8px; }
    p { font-size: 16px; color: #666; line-height: 1.5; }
    .route { display: inline-block; background: #1a1a2e; color: #fff; padding: 8px 24px; border-radius: 50px; font-size: 18px; font-weight: bold; margin-top: 16px; }
    .brand { margin-top: 32px; font-size: 12px; color: #aaa; letter-spacing: 2px; text-transform: uppercase; }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">${c.icon}</div>
    <h1>${title}</h1>
    <p>${message}</p>
    ${ruta ? `<div class="route">Ruta ${ruta.toUpperCase()}</div>` : ""}
    <p class="brand">Zítara Social Run</p>
  </div>
</body>
</html>`;
}
