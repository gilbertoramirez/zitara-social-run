import type { Metadata } from "next";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Zítara Social Run — 2do Aniversario",
  description:
    "Celebra el 2° Aniversario de la Primera Piedra de Zítara con una carrera social. Rutas de 3, 5 y 8 km. Evento gratuito con registro previo.",
  openGraph: {
    title: "Zítara Social Run — 2do Aniversario",
    description:
      "Vive una experiencia única corriendo por Zítara. Rutas de 3, 5 y 8 km. Evento gratuito.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${dmSans.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
