type CodeCascadeProps = {
  columns: {
    title: string;
    lines: string[];
  }[];
};

export function CodeCascade({ columns }: CodeCascadeProps) {
  return (
    <section
      aria-label="Technical build traces"
      className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-4 px-5 pb-8 sm:px-8 md:grid-cols-2 xl:grid-cols-4"
    >
      {columns.map((column, index) => (
        <div
          key={column.title}
          className="min-h-44 border-l border-[var(--line-strong)] pl-4 pt-2"
          style={{ transform: `translateY(${index * 14}px)` }}
        >
          <div className="trace-column absolute h-40 w-px -translate-x-5" />
          <p className="tech-display border-b border-[var(--red-root)] pb-2 text-xs font-black text-[var(--red-hot)]">
            {column.title}
          </p>
          <ul className="mt-4 space-y-2">
            {column.lines.map((line) => (
              <li
                key={line}
                className="tech-display text-xs leading-5 text-[var(--muted)]"
              >
                {line}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
