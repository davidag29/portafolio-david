import type { Metadata } from "next";
import { Barlow_Condensed, Overpass, Overpass_Mono } from "next/font/google";
import { portfolioCopy } from "@/content/portfolio";
import "./globals.css";

const display = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});
const body = Overpass({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});
const mono = Overpass_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});
const { title, description } = portfolioCopy.es.meta;
export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", locale: "es_MX" },
  twitter: { card: "summary_large_image", title, description },
};

// Runs synchronously before the body is painted, including when storage is unavailable.
const initialize = `(function(){var d=document.documentElement,t,l;try{t=localStorage.getItem('theme');l=localStorage.getItem('locale')}catch(e){}d.dataset.theme=t==='light'||t==='dark'?t:matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';d.lang=l==='en'?'en':'es'})()`;
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: initialize }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
