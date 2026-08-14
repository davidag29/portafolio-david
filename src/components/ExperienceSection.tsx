import type { ExperienceItem } from "@/content/portfolio";

type ExperienceSectionProps = {
  copy: {
    kicker: string;
    title: string;
    items: ExperienceItem[];
  };
};

export function ExperienceSection({ copy }: ExperienceSectionProps) {
  return (
    <section
      id="experience"
      className="relative z-10 border-t border-[var(--line)] bg-black px-5 py-16 sm:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <p className="tech-display text-sm font-black text-[var(--red-hot)]">
          &gt; {copy.kicker}
        </p>
        <h2 className="mt-4 max-w-3xl text-2xl font-semibold text-[var(--foreground)] sm:text-4xl">
          {copy.title}
        </h2>

        <div className="mt-10 divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {copy.items.map((item) => (
            <div
              key={`${item.company}-${item.period}`}
              className="grid gap-3 py-7 md:grid-cols-[1fr_2fr] md:items-start"
            >
              <div>
                <h3 className="tech-display text-lg font-black text-[var(--foreground)]">
                  {item.role}
                </h3>
                <p className="mt-1 text-sm text-[var(--red-hot)]">{item.company}</p>
                <p className="tech-display mt-2 text-xs text-[var(--dim)]">{item.period}</p>
              </div>
              <p className="text-sm leading-6 text-[var(--muted)]">{item.highlight}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
