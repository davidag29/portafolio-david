"use client";

import { useMemo, useState } from "react";
import { portfolioCopy, type Locale } from "@/content/portfolio";
import { CodeCascade } from "./CodeCascade";
import { ContactSection } from "./ContactSection";
import { Hero } from "./Hero";
import { Navbar } from "./Navbar";
import { ProjectShowcase } from "./ProjectShowcase";
import { StackSection } from "./StackSection";

export function PortfolioShell() {
  const [locale, setLocale] = useState<Locale>("es");
  const copy = useMemo(() => portfolioCopy[locale], [locale]);
  const nextLocale: Locale = locale === "es" ? "en" : "es";

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-[var(--foreground)]">
      <div className="scanline" />
      <Navbar
        availability={copy.availability}
        localeLabel={nextLocale.toUpperCase()}
        nav={copy.nav}
        onToggleLocale={() => setLocale(nextLocale)}
      />
      <Hero copy={copy.hero} />
      <CodeCascade columns={copy.codeColumns} />
      <ProjectShowcase copy={copy.projects} />
      <StackSection copy={copy.stack} />
      <ContactSection copy={copy.contact} />
    </main>
  );
}
