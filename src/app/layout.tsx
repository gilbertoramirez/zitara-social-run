import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
