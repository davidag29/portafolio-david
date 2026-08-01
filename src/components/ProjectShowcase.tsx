import type { Project } from "@/content/portfolio";

type ProjectShowcaseProps = {
  copy: {
    kicker: string;
    title: string;
    allLabel: string;
    problemLabel: string;
    solutionLabel: string;
    items: Project[];
  };
};

export function ProjectShowcase({ copy }: ProjectShowcaseProps) {
  return (
    <section
      id="projects"
      className="relative z-10 border-y border-[var(--line)] bg-black px-5 py-14 sm:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="tech-display text-sm font-black text-[var(--red-hot)]">
              &gt; {copy.kicker}
            </p>
            <h2 className="mt-3 max-w-3xl text-2xl font-semibold text-[var(--foreground)] sm:text-4xl">
              {copy.title}
            </h2>
          </div>
          <a
            href="#contact"
            className="tech-display text-xs font-black uppercase text-[var(--red-hot)] hover:text-[var(--foreground)]"
          >
            {copy.allLabel} -&gt;
          </a>
        </div>

        <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {copy.items.map((project) => (
            <article
              key={project.id}
              className="grid gap-5 py-7 md:grid-cols-[72px_1fr_1.2fr_1fr_auto] md:items-center"
            >
              <p className="tech-display text-sm font-black text-[var(--red-hot)]">
                [{project.id}]
              </p>
              <h3 className="tech-display text-2xl font-black text-[var(--foreground)]">
                {project.name}
              </h3>
              <div>
                <p className="tech-display mb-2 text-xs font-black uppercase text-[var(--amber)]">
                  {copy.problemLabel}
                </p>
                <p className="text-sm leading-6 text-[var(--muted)]">{project.problem}</p>
              </div>
              <div>
                <p className="tech-display mb-2 text-xs font-black uppercase text-[var(--red-hot)]">
                  {copy.solutionLabel}
                </p>
                <p className="text-sm leading-6 text-[var(--muted)]">{project.solution}</p>
              </div>
              <a
                href="#contact"
                className="tech-display text-xs font-black uppercase text-[var(--red-hot)] transition hover:text-[var(--foreground)]"
              >
                {project.demoLabel} -&gt;
              </a>
              <div className="md:col-start-2 md:col-end-6">
                <ul className="flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <li
                      key={item}
                      className="tech-display border border-[var(--line)] px-2 py-1 text-[10px] font-bold uppercase text-[var(--muted)]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
