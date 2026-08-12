import { Resend } from "resend";

function getResendClient() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export async function sendConfirmationEmail(params: {
  to: string;
  nombre: string;
  ruta: string;
  qrDataUrl: string;
}) {
  const resend = getResendClient();
  if (!resend) {
    console.warn("RESEND_API_KEY not configured — skipping email");
    return;
  }

  const base64Data = params.qrDataUrl.replace(
    /^data:image\/png;base64,/,
    ""
  );

  const { error } = await resend.emails.send({
    from: process.env.EMAIL_FROM || "Zítara Social Run <noreply@resend.dev>",
    to: params.to,
    subject: "Tu registro para Zítara Social Run está confirmado",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin:0;padding:0;background-color:#f5f5f5;font-family:Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background-color:#ffffff;">
          <tr>
            <td style="background-color:#1a1a2e;padding:40px 30px;text-align:center;">
              <h1 style="color:#ffffff;margin:0;font-size:28px;">Zítara Social Run</h1>
              <p style="color:#e94560;margin:8px 0 0;font-size:14px;letter-spacing:2px;">2DO ANIVERSARIO DE LA PRIMERA PIEDRA</p>
            </td>
          </tr>
          <tr>
            <td style="padding:40px 30px;">
              <h2 style="color:#1a1a2e;margin:0 0 16px;">¡Hola, ${params.nombre}!</h2>
              <p style="color:#444;font-size:16px;line-height:1.6;">
                Tu registro para el <strong>Zítara Social Run</strong> ha sido confirmado exitosamente.
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f9fa;border-radius:12px;margin:24px 0;">
                <tr>
                  <td style="padding:24px;">
                    <p style="margin:0 0 8px;color:#666;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Ruta seleccionada</p>
                    <p style="margin:0;color:#1a1a2e;font-size:24px;font-weight:bold;">${params.ruta.toUpperCase()}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 24px 24px;">
                    <p style="margin:0 0 8px;color:#666;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Horario</p>
                    <p style="margin:0;color:#1a1a2e;font-size:16px;"><strong>6:20 AM</strong> — Registro y calentamiento</p>
                    <p style="margin:4px 0 0;color:#1a1a2e;font-size:16px;"><strong>7:00 AM</strong> — Inicio de la carrera</p>
                  </td>
                </tr>
              </table>

              <div style="text-align:center;margin:32px 0;">
                <p style="color:#1a1a2e;font-size:16px;font-weight:bold;margin:0 0 8px;">Tu código QR de acceso</p>
                <p style="color:#666;font-size:14px;margin:0 0 16px;">Presenta este código el día del evento</p>
                <img src="cid:qr-code" alt="Código QR" style="width:250px;height:250px;" />
              </div>

              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#fff8f0;border-left:4px solid #f5a623;border-radius:0 8px 8px 0;margin:24px 0;">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0;color:#1a1a2e;font-size:14px;">
                      <strong>Recuerda:</strong> Llega puntual a las 6:20 AM para el registro y calentamiento. El entrenamiento inicia a las 7:00 AM.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background-color:#1a1a2e;padding:24px 30px;text-align:center;">
              <p style="color:#888;font-size:12px;margin:0;">
                Zítara Social Run — 2° Aniversario de la Primera Piedra
              </p>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
    attachments: [
      {
        filename: "codigo-qr.png",
        content: base64Data,
        contentType: "image/png",
      },
    ],
  });

  if (error) {
    console.error("Error sending email:", error);
    throw new Error("No se pudo enviar el correo de confirmación");
  }
}
