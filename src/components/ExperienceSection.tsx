import type { ExperienceItem } from "@/content/portfolio";
import { Reveal } from "./Reveal";

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
      className="relative z-10 border-t border-[var(--line)] bg-[var(--background)] px-5 py-16 sm:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="tech-display text-sm font-black text-[var(--red-hot)]">
            &gt; {copy.kicker}
          </p>
          <h2 className="mt-4 max-w-3xl text-2xl font-semibold text-[var(--foreground)] sm:text-4xl">
            {copy.title}
          </h2>
        </Reveal>

        <div className="relative mt-10 pl-8">
          <div
            className="absolute bottom-2 left-0 top-2 w-px bg-[var(--line-strong)]"
            aria-hidden="true"
          />
          {copy.items.map((item, index) => (
            <Reveal
              key={`${item.company}-${item.period}`}
              delay={index * 80}
              className={`relative grid gap-3 md:grid-cols-[1fr_2fr] md:items-start ${
                index === copy.items.length - 1 ? "" : "pb-10"
              }`}
            >
              <span
                className="absolute -left-8 top-1.5 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-[var(--background)] bg-[var(--red-hot)]"
                aria-hidden="true"
              />
              <div>
                <h3 className="tech-display text-lg font-black text-[var(--foreground)]">
                  {item.role}
                </h3>
                <p className="mt-1 text-sm text-[var(--red-hot)]">{item.company}</p>
                <p className="tech-display mt-2 text-xs text-[var(--dim)]">{item.period}</p>
              </div>
              <p className="text-sm leading-6 text-[var(--muted)]">{item.highlight}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
