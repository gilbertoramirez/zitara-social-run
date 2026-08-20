import nodemailer from "nodemailer";

function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return null;

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

export async function sendConfirmationEmail(params: {
  to: string;
  nombre: string;
  ruta: string;
  qrDataUrl: string;
}) {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn("GMAIL_USER / GMAIL_APP_PASSWORD not configured — skipping email");
    return;
  }

  const base64Data = params.qrDataUrl.replace(
    /^data:image\/png;base64,/,
    ""
  );

  await transporter.sendMail({
    from: `Zítara Social Run <${process.env.GMAIL_USER}>`,
    to: params.to,
    subject: "Tu registro para Zítara Social Run está confirmado",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin:0;padding:0;background-color:#faf5ed;font-family:Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background-color:#ffffff;">
          <tr>
            <td style="background-color:#313323;padding:40px 30px;text-align:center;">
              <h1 style="color:#ffffff;margin:0;font-size:28px;">Zítara Social Run</h1>
              <p style="color:#BF7634;margin:8px 0 0;font-size:14px;letter-spacing:2px;">2DO ANIVERSARIO DE LA PRIMERA PIEDRA</p>
            </td>
          </tr>
          <tr>
            <td style="padding:40px 30px;">
              <h2 style="color:#313323;margin:0 0 16px;">¡Hola, ${params.nombre}!</h2>
              <p style="color:#444;font-size:16px;line-height:1.6;">
                Tu registro para el <strong>Zítara Social Run</strong> ha sido confirmado exitosamente.
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#faf5ed;border-radius:12px;margin:24px 0;">
                <tr>
                  <td style="padding:24px;">
                    <p style="margin:0 0 8px;color:#666;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Ruta seleccionada</p>
                    <p style="margin:0;color:#313323;font-size:24px;font-weight:bold;">${params.ruta.toUpperCase()}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 24px 24px;">
                    <p style="margin:0 0 8px;color:#666;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Horario</p>
                    <p style="margin:0;color:#313323;font-size:16px;"><strong>6:25 AM</strong> — Registro, entrega de calcetas y salida</p>
                    <p style="margin:4px 0 0;color:#313323;font-size:16px;"><strong>Lugar:</strong> Blvd. Luis Adolfo Ruiz, Salida Calvillo</p>
                  </td>
                </tr>
              </table>

              <div style="text-align:center;margin:32px 0;">
                <p style="color:#313323;font-size:16px;font-weight:bold;margin:0 0 8px;">Tu código QR de acceso</p>
                <p style="color:#666;font-size:14px;margin:0 0 16px;">Presenta este código el día del evento</p>
                <img src="cid:qr-code" alt="Código QR" style="width:250px;height:250px;" />
              </div>

              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F4E6D0;border-left:4px solid #BF7634;border-radius:0 8px 8px 0;margin:24px 0;">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0;color:#313323;font-size:14px;">
                      <strong>Recuerda:</strong> Llega puntual a las 6:25 AM para el registro, entrega de calcetas y salida. Evento Pet Friendly. Después de la carrera: Body Combat, Body Balance, Zumba y desayuno.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background-color:#313323;padding:24px 30px;text-align:center;">
              <p style="color:#BF7634;font-size:12px;margin:0;">
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
        content: Buffer.from(base64Data, "base64"),
        cid: "qr-code",
      },
    ],
  });
}
