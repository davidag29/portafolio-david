import type { Copy } from "@/content/portfolio";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
export function ExperienceSection({ copy }: { copy: Copy["career"] }) {
  return (
    <section id="trayectoria" className="section career-section" aria-labelledby="career-title">
      <SectionHeading id="career-title" title={copy.title} intro={copy.intro} />
      <Reveal className="career-reveal">
        <ol className="career-list">
          {copy.items.map((item, i) => (
            <li className={i === copy.items.length - 1 ? "current" : ""} key={item.period}>
              <span className="career-station" aria-hidden="true" />
              <p className="career-period mono">{item.period}</p>
              <h3>{item.role}</h3>
              <p className="career-company mono">{item.company}</p>
              <p className="career-body">{item.body}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
