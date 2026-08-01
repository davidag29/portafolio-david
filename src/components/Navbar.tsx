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
};

export function Navbar({ availability, localeLabel, nav, onToggleLocale }: NavbarProps) {
  const links = [
    { href: "#projects", label: nav.projects },
    { href: "#stack", label: nav.stack },
    { href: "#experience", label: nav.experience },
    { href: "#contact", label: nav.contact },
  ];

  return (
    <header className="relative z-20 border-b border-[var(--line)] bg-black/82 backdrop-blur">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a
          href="#top"
          className="tech-display text-lg font-black text-[var(--red-hot)] transition hover:text-[var(--foreground)]"
          aria-label="David Aguilar"
        >
          DA://
        </a>

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

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onToggleLocale}
            className="tech-display h-10 min-w-12 border border-[var(--line-strong)] px-3 text-xs font-black text-[var(--foreground)] transition hover:border-[var(--red-hot)] hover:bg-[var(--red-root)]"
          >
            {localeLabel}
          </button>
          <p className="hidden items-center gap-2 text-xs text-[var(--muted)] lg:flex">
            <span className="h-2 w-2 rounded-full bg-[var(--red-hot)]" />
            {availability}
          </p>
        </div>
      </nav>
    </header>
  );
}
