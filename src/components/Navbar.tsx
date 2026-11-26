"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import type { Copy, Locale } from "@/content/portfolio";
export function Navbar({
  copy,
  locale,
  onLocale,
}: {
  copy: Copy;
  locale: Locale;
  onLocale: (locale: Locale) => void;
}) {
  const [open, setOpen] = useState(false);
  function toggleTheme() {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }
  return (
    <header id="top" className="container navbar">
      <a className="logo" href="#top" aria-label={copy.ui.home}>
        {copy.ui.logo}
      </a>
      <nav
        aria-label={copy.ui.menu}
        id="section-navigation"
        className={`nav-links ${open ? "is-open" : ""}`}
      >
        {copy.nav.map((item) => (
          <a key={item.id} href={`#${item.id}`} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
      </nav>
      <div className="nav-actions">
        <a className="cv-link" href="/cv/David_Aguilar_CV.pdf" download>
          {copy.ui.cv}
        </a>
        <div className="locale-switch" role="group" aria-label={copy.ui.language}>
          <button lang="es" aria-pressed={locale === "es"} onClick={() => onLocale("es")}>
            {copy.ui.locales[0]}
          </button>
          <span aria-hidden="true">{copy.ui.separator}</span>
          <button lang="en" aria-pressed={locale === "en"} onClick={() => onLocale("en")}>
            {copy.ui.locales[1]}
          </button>
        </div>
        <button className="theme-button" aria-label={copy.ui.theme} onClick={toggleTheme}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.7" />
            <path d="M12 4a8 8 0 0 0 0 16Z" fill="currentColor" />
          </svg>
        </button>
        <button
          className="menu-button"
          aria-label={copy.ui.menu}
          aria-controls="section-navigation"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}
