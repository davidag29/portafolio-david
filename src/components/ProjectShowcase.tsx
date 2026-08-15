import type { Project } from "@/content/portfolio";
import { EventFlowDiagram } from "./EventFlowDiagram";
import { ProjectDemoToggle } from "./ProjectDemoToggle";
import { Reveal } from "./Reveal";

type ProjectShowcaseProps = {
  copy: {
    kicker: string;
    title: string;
    allLabel: string;
    problemLabel: string;
    solutionLabel: string;
    items: Project[];
  };
  eventFlow: {
    kicker: string;
    externalLabel: string;
    externalSystems: string[];
    internalLabel: string;
    queueLabel: string;
    hub: string;
    channels: string[];
  };
  messagingFlow: {
    kicker: string;
    externalLabel: string;
    externalSystems: string[];
    queueLabel: string;
    hub: string;
    channels: string[];
  };
};

export function ProjectShowcase({ copy, eventFlow, messagingFlow }: ProjectShowcaseProps) {
  return (
    <section
      id="projects"
      className="relative z-10 border-y border-[var(--line)] bg-[var(--background)] px-5 py-14 sm:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
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
            className="tech-display text-xs font-black uppercase text-[var(--red-hot)] transition active:scale-95 hover:text-[var(--foreground)]"
          >
            {copy.allLabel} -&gt;
          </a>
        </Reveal>

        <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {copy.items.map((project, index) => (
            <Reveal key={project.name} delay={index * 60}>
            <article
              className="grid gap-5 py-7 md:grid-cols-[140px_1fr_1.2fr_1fr_auto] md:items-center"
            >
              <p className="tech-display text-sm font-black uppercase text-[var(--red-hot)]">
                [{project.tag}]
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
              {project.detail === "eventFlow" ? (
                <ProjectDemoToggle label={project.demoLabel}>
                  <p className="tech-display mb-4 text-xs font-black text-[var(--red-hot)]">
                    &gt; {eventFlow.kicker}
                  </p>
                  <EventFlowDiagram
                    externalLabel={eventFlow.externalLabel}
                    externalSystems={eventFlow.externalSystems}
                    internalLabel={eventFlow.internalLabel}
                    queueLabel={eventFlow.queueLabel}
                    hub={eventFlow.hub}
                    channels={eventFlow.channels}
                  />
                </ProjectDemoToggle>
              ) : project.detail === "messagingFlow" ? (
                <ProjectDemoToggle label={project.demoLabel}>
                  <p className="tech-display mb-4 text-xs font-black text-[var(--red-hot)]">
                    &gt; {messagingFlow.kicker}
                  </p>
                  <EventFlowDiagram
                    externalLabel={messagingFlow.externalLabel}
                    externalSystems={messagingFlow.externalSystems}
                    queueLabel={messagingFlow.queueLabel}
                    hub={messagingFlow.hub}
                    channels={messagingFlow.channels}
                  />
                </ProjectDemoToggle>
              ) : (
                <span
                  aria-disabled="true"
                  className="tech-display cursor-not-allowed text-xs font-black uppercase text-[var(--dim)] opacity-60"
                >
                  {project.demoLabel}
                </span>
              )}
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
