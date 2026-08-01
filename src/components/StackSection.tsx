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
      <div>
        <p className="tech-display text-sm font-black text-[var(--red-hot)]">
          &gt; {copy.title}
        </p>
        <h2 className="mt-4 max-w-xl text-3xl font-semibold text-[var(--foreground)]">
          {copy.body}
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {copy.groups.map((group) => (
          <div key={group.label} className="border-l border-[var(--line-strong)] pl-5">
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
          </div>
        ))}
      </div>
    </section>
  );
}
