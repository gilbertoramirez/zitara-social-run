import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const atGambit = localFont({
  src: [
    { path: "../../public/fonts/AtGambit-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/AtGambit-RegularItalic.ttf", weight: "400", style: "italic" },
    { path: "../../public/fonts/AtGambit-Semibold.ttf", weight: "600", style: "normal" },
    { path: "../../public/fonts/AtGambit-SemiboldItalic.ttf", weight: "600", style: "italic" },
    { path: "../../public/fonts/AtGambit-Bold.ttf", weight: "700", style: "normal" },
    { path: "../../public/fonts/AtGambit-BoldItalic.ttf", weight: "700", style: "italic" },
    { path: "../../public/fonts/AtGambit-Black.ttf", weight: "900", style: "normal" },
    { path: "../../public/fonts/AtGambit-BlackItalic.ttf", weight: "900", style: "italic" },
  ],
  variable: "--font-at-gambit",
  display: "swap",
});

const telka = localFont({
  src: [
    { path: "../../public/fonts/Telka-Light.otf", weight: "300", style: "normal" },
    { path: "../../public/fonts/Telka-Regular.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/Telka-Medium.otf", weight: "500", style: "normal" },
    { path: "../../public/fonts/Telka-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-telka",
  display: "swap",
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
      className={`${atGambit.variable} ${telka.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
