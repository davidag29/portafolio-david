import { Server, Cpu, Database, SquareTerminal } from "lucide-react";
import type { Copy } from "@/content/portfolio";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { BrandLogo } from "./BrandLogo";
const icons = [Server, Cpu, Database, SquareTerminal];
export function StackSection({ copy }: { copy: Copy["stack"] }) {
  return (
    <section id="stack" className="section stack-section" aria-labelledby="stack-title">
      <SectionHeading id="stack-title" title={copy.title} intro={copy.intro} />
      <div className="stack-grid">
        {copy.groups.map((group, i) => {
          const Icon = icons[i];
          return (
            <Reveal
              key={group.title}
              className={`stack-card category-${group.color} stack-card-${i}`}
              delay={i * 90}
            >
              <h3>
                <Icon size={24} strokeWidth={2} aria-hidden="true" />
                {group.title}
              </h3>
              <p className="stack-label mono">{copy.primary}</p>
              <ul className="primary-tools">
                {group.primary.map((tool) => (
                  <li key={tool.name}>
                    {tool.logo ? <BrandLogo name={tool.logo} /> : null}
                    <span>{tool.name}</span>
                  </li>
                ))}
              </ul>
              <p className="stack-label mono">{copy.secondary}</p>
              <ul className="secondary-tools">
                {group.secondary.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
              <p className="stack-foot mono">{group.foot}</p>
            </Reveal>
          );
        })}
      </div>
      <div className="stack-strip">
        {copy.strip.map((item) => (
          <p key={item.title}>
            <strong>{item.title}</strong>
            <span>{item.body}</span>
          </p>
        ))}
      </div>
    </section>
  );
}
