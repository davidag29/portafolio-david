import type { Copy } from "@/content/portfolio";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { EventFlowDiagram } from "./EventFlowDiagram";
export function ProjectShowcase({ copy }: { copy: Copy["work"] }) {
  return (
    <section id="trabajo" className="section work-section" aria-labelledby="work-title">
      <SectionHeading id="work-title" title={copy.title} intro={copy.intro} />
      <div className="work-cases">
        {copy.cases.map((item) => (
          <article className={`work-case category-${item.color}`} key={item.title}>
            <div className="case-copy">
              <div className="case-context mono">
                <span className="category-pill">{item.tag}</span>
                <span>{item.context}</span>
              </div>
              <h3>{item.title}</h3>
              <p className="case-body">{item.body}</p>
              <p className="case-tech mono">{item.tech}</p>
            </div>
            {item.metric ? (
              <Reveal className="metric">
                <div className="metric-label">
                  <span className="mono">{item.metric.before}</span>
                  <b>{item.metric.value}</b>
                </div>
                <div className="metric-bar before" />
                <div className="metric-label after-label mono">{item.metric.after}</div>
                <div
                  className="metric-bar after"
                  style={{ width: `${item.metric.ratio * 100}%` }}
                />
                <p className="metric-result">{item.metric.result}</p>
                <p className="metric-note mono">{item.metric.note}</p>
              </Reveal>
            ) : (
              <EventFlowDiagram copy={copy.diagram} />
            )}
          </article>
        ))}
      </div>
      <div className="contributions">
        <h3 className="mono">{copy.other}</h3>
        <ul>
          {copy.contributions.map((item) => (
            <li className={`category-${item.color}`} key={item.name}>
              <div className="contribution-name">
                <span className="contribution-dot" aria-hidden="true" />
                <h4>{item.name}</h4>
              </div>
              <p>{item.summary}</p>
              <span className="contribution-detail mono">{item.detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
