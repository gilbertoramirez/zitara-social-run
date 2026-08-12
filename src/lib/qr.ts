import QRCode from "qrcode";

export async function generateQrDataUrl(
  verificationUrl: string
): Promise<string> {
  return QRCode.toDataURL(verificationUrl, {
    width: 400,
    margin: 2,
    color: { dark: "#313323", light: "#ffffff" },
    errorCorrectionLevel: "H",
  });
}

export async function generateQrBuffer(
  verificationUrl: string
): Promise<Buffer> {
  return QRCode.toBuffer(verificationUrl, {
    width: 400,
    margin: 2,
    color: { dark: "#313323", light: "#ffffff" },
    errorCorrectionLevel: "H",
  });
}
