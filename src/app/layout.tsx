import type { Metadata } from "next";
import { Chakra_Petch, Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const chakraPetch = Chakra_Petch({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "David Aguilar | Desarrollador Full Stack",
  description:
    "Portafolio de David Aguilar, desarrollador Full Stack enfocado en productos web rapidos, mantenibles y orientados a problemas reales.",
  openGraph: {
    title: "David Aguilar | Desarrollador Full Stack",
    description:
      "Portafolio de David Aguilar, desarrollador Full Stack con experiencia en PHP/Laravel, Node.js e IA aplicada.",
    type: "website",
    locale: "es_MX",
  },
  twitter: {
    card: "summary_large_image",
    title: "David Aguilar | Desarrollador Full Stack",
    description:
      "Portafolio de David Aguilar, desarrollador Full Stack con experiencia en PHP/Laravel, Node.js e IA aplicada.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${chakraPetch.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t)document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
