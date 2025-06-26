import type { Metadata } from "next";
import localFont from "next/font/local";
import { Providers } from "@/components/Providers";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Metadatos del proyecto para SEO y compartición en redes sociales.
export const metadata: Metadata = {
  title: "Pokémon Explorer | Desafío Técnico",
  description:
    "Explorador de Pokémon de la primera generación construido con Next.js y Zustand.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Se utiliza el idioma español y se suprime el warning de hidratación de Next.js/React.
    // Esto es necesario al usar extensiones o temas que pueden causar discrepancias.
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
