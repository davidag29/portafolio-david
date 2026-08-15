"use client";

import { useEffect, useMemo, useState, type MouseEvent } from "react";
import { portfolioCopy, type Locale } from "@/content/portfolio";
import { ContactSection } from "./ContactSection";
import { ExperienceSection } from "./ExperienceSection";
import { Hero } from "./Hero";
import { Navbar } from "./Navbar";
import { ProjectShowcase } from "./ProjectShowcase";
import { StackSection } from "./StackSection";

type Theme = "dark" | "light";

export function PortfolioShell() {
  const [locale, setLocale] = useState<Locale>("es");
  const [theme, setTheme] = useState<Theme>("dark");
  const copy = useMemo(() => portfolioCopy[locale], [locale]);
  const nextLocale: Locale = locale === "es" ? "en" : "es";

  useEffect(() => {
    if (document.documentElement.dataset.theme === "light") {
      setTheme("light");
    }
  }, []);

  const toggleTheme = (event: MouseEvent<HTMLButtonElement>) => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const applyTheme = () => {
      setTheme(next);
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    };

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || prefersReducedMotion) {
      applyTheme();
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = document.startViewTransition(applyTheme);

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 550,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <div className="scanline" />
      <Navbar
        availability={copy.availability}
        localeLabel={nextLocale.toUpperCase()}
        nav={copy.nav}
        onToggleLocale={() => setLocale(nextLocale)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <Hero copy={copy.hero} />
      <ProjectShowcase
        copy={copy.projects}
        eventFlow={copy.eventFlow}
        messagingFlow={copy.messagingFlow}
      />
      <StackSection copy={copy.stack} />
      <ExperienceSection copy={copy.experience} />
      <ContactSection copy={copy.contact} />
    </main>
  );
}
