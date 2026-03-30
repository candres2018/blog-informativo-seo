import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { JSX } from "react";

/**
 * Configuración de fuentes optimizadas de Google.
 * Se utiliza 'display: swap' para evitar el bloqueo del renderizado por fuentes.
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  adjustFontFallback: false,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Metadatos globales de la aplicación.
 * metadataBase es esencial para generar URLs absolutas en Open Graph y Canonical tags.
 */
export const metadata: Metadata = {
  metadataBase: new URL('https://blog-informativo-seo.app'),
  title: "App Store - Blog de Noticias",
  description: "Artículos de actualidad sobre política, economía y tecnología",
  alternates: {
    canonical: '/', // Evita contenido duplicado para los motores de búsqueda
  },
  icons: {
    icon: '/favicon.ico',
  },
};

/**
 * RootLayout: El componente de más alto nivel de la aplicación.
 * Define la estructura base del HTML compartida por todas las rutas.
 * * @param {React.ReactNode} children - Representa la página activa que se renderizará.
 * @returns {JSX.Element} El esqueleto HTML de la aplicación.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html
      lang="es" // Define el idioma principal para accesibilidad y SEO
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Optimización de red: Pre-conexión al dominio de imágenes externo */}
        <link rel="preconnect" href="https://picsum.photos" />
      </head>
      <body 
        className="min-h-full flex flex-col bg-background text-foreground" 
        suppressHydrationWarning // Evita avisos de hidratación por extensiones del navegador
      >
        {children}
      </body>
    </html>
  );
}