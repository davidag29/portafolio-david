"use client";

import { useState, type MouseEvent } from "react";

type NavbarProps = {
  availability: string;
  localeLabel: string;
  nav: {
    projects: string;
    stack: string;
    experience: string;
    contact: string;
  };
  onToggleLocale: () => void;
  theme: "dark" | "light";
  onToggleTheme: (event: MouseEvent<HTMLButtonElement>) => void;
};

export function Navbar({
  availability,
  localeLabel,
  nav,
  onToggleLocale,
  theme,
  onToggleTheme,
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "#projects", label: nav.projects },
    { href: "#stack", label: nav.stack },
    { href: "#experience", label: nav.experience },
    { href: "#contact", label: nav.contact },
  ];

  return (
    <header className="relative z-20 border-b border-[var(--line)] bg-[var(--nav-backdrop)] backdrop-blur">
      <nav className="mx-auto grid h-20 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-5 sm:px-8">
        <span aria-hidden="true" />

        <div className="justify-self-center">
          <div className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="tech-display text-xs font-black uppercase text-[var(--foreground)] transition hover:text-[var(--red-hot)]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            className="flex h-10 w-10 items-center justify-center border border-[var(--line-strong)] text-[var(--foreground)] transition active:scale-90 hover:border-[var(--red-hot)] hover:bg-[var(--red-root)] md:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>

        <div className="flex items-center justify-self-end gap-4">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            className="flex h-10 w-10 items-center justify-center border border-[var(--line-strong)] text-[var(--foreground)] transition active:scale-90 hover:border-[var(--red-hot)] hover:bg-[var(--red-root)]"
          >
            {theme === "dark" ? (
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
          <button
            type="button"
            onClick={onToggleLocale}
            aria-label="Cambiar idioma"
            className="tech-display h-10 min-w-12 border border-[var(--line-strong)] px-3 text-xs font-black text-[var(--foreground)] transition active:scale-90 hover:border-[var(--red-hot)] hover:bg-[var(--red-root)]"
          >
            {localeLabel}
          </button>
          <p className="hidden w-60 items-center gap-2 whitespace-nowrap text-xs text-[var(--muted)] lg:flex">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--red-hot)]" />
            {availability}
          </p>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-[var(--line)] bg-[var(--nav-backdrop)] backdrop-blur md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col divide-y divide-[var(--line)] px-5">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="tech-display py-4 text-sm font-black uppercase text-[var(--foreground)] transition hover:text-[var(--red-hot)]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
