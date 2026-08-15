import { MailtoButton } from "./MailtoButton";
import { Reveal } from "./Reveal";

type ContactSectionProps = {
  copy: {
    kicker: string;
    title: string;
    body: string;
    response: string;
    cta: string;
    links: { label: string; value: string; href: string }[];
  };
};

export function ContactSection({ copy }: ContactSectionProps) {
  const emailLink = copy.links.find((link) => link.label === "Email")?.href ?? "#";

  return (
    <section
      id="contact"
      className="relative z-10 border-t border-[var(--line)] bg-[var(--background)] px-5 py-16 sm:px-8"
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr]">
        <Reveal>
          <p className="tech-display text-sm font-black text-[var(--red-hot)]">
            &gt; {copy.kicker}
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight text-[var(--foreground)] sm:text-5xl">
            {copy.title}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted)]">
            {copy.body}
          </p>
          <MailtoButton href={emailLink} label={copy.cta} />
        </Reveal>

        <Reveal delay={100} className="border-y border-[var(--line)]">
          <p className="tech-display border-b border-[var(--line)] py-4 text-xs font-black uppercase text-[var(--dim)]">
            ~/contact.channels
          </p>
          <ul className="divide-y divide-[var(--line)]">
            {copy.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  className="grid gap-2 py-5 transition hover:bg-[var(--panel-soft)] sm:grid-cols-[120px_1fr_auto]"
                >
                  <span className="tech-display text-xs font-black uppercase text-[var(--red-hot)]">
                    {link.label}
                  </span>
                  <span className="text-sm text-[var(--muted)]">{link.value}</span>
                  <span className="tech-display text-xs font-black text-[var(--red-hot)]">
                    open -&gt;
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="tech-display border-t border-[var(--line)] py-4 text-xs text-[var(--dim)]">
            {copy.response}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
