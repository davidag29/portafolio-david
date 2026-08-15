import { Reveal } from "./Reveal";

type StackSectionProps = {
  copy: {
    title: string;
    body: string;
    groups: { label: string; items: string[] }[];
  };
};

export function StackSection({ copy }: StackSectionProps) {
  return (
    <section
      id="stack"
      className="relative z-10 mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]"
    >
      <Reveal>
        <p className="tech-display text-sm font-black text-[var(--red-hot)]">
          &gt; {copy.title}
        </p>
        <h2 className="mt-4 max-w-xl text-3xl font-semibold text-[var(--foreground)]">
          {copy.body}
        </h2>
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {copy.groups.map((group, index) => (
          <Reveal key={group.label} delay={index * 80} className="border-l border-[var(--line-strong)] pl-5">
            <h3 className="tech-display text-sm font-black uppercase text-[var(--red-hot)]">
              {group.label}
            </h3>
            <ul className="mt-4 space-y-3">
              {group.items.map((item) => (
                <li key={item} className="text-sm text-[var(--muted)]">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
