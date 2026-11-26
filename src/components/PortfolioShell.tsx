"use client";

import { useSyncExternalStore } from "react";
import { portfolioCopy, type Locale } from "@/content/portfolio";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { ProjectShowcase } from "./ProjectShowcase";
import { ExperienceSection } from "./ExperienceSection";
import { StackSection } from "./StackSection";
import { PersonalSection } from "./PersonalSection";
import { ContactSection } from "./ContactSection";

function subscribe(callback: () => void) {
  function onStorage(event: StorageEvent) {
    if (event.key !== "locale" && event.key !== null) return;
    document.documentElement.lang = event.newValue === "en" ? "en" : "es";
    callback();
  }
  window.addEventListener("portfolio-locale", callback);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener("portfolio-locale", callback);
    window.removeEventListener("storage", onStorage);
  };
}

// The layout's synchronous script restores the saved language before hydration.
const getLocale = (): Locale => (document.documentElement.lang === "en" ? "en" : "es");
const serverLocale = (): Locale => "es";

export function PortfolioShell() {
  const locale = useSyncExternalStore(subscribe, getLocale, serverLocale);
  const copy = portfolioCopy[locale];

  function changeLocale(next: Locale) {
    document.documentElement.lang = next;
    try {
      localStorage.setItem("locale", next);
    } catch {}
    window.dispatchEvent(new Event("portfolio-locale"));
  }

  return (
    <>
      <a className="skip-link" href="#contenido">
        {copy.ui.skip}
      </a>
      <Navbar copy={copy} locale={locale} onLocale={changeLocale} />
      <main id="contenido" tabIndex={-1}>
        <div className="container">
          <Hero copy={copy} />
          <ProjectShowcase copy={copy.work} />
          <ExperienceSection copy={copy.career} />
          <StackSection copy={copy.stack} />
          <PersonalSection copy={copy.personal} />
        </div>
        <ContactSection copy={copy.contact} />
      </main>
    </>
  );
}
