import type { Copy } from "@/content/portfolio";
import { SectionHeading } from "./SectionHeading";
export function PersonalSection({ copy }: { copy: Copy["personal"] }) {
  return (
    <section className="section personal-section" aria-labelledby="personal-title">
      <SectionHeading id="personal-title" title={copy.title} />
      <div className="personal-grid">
        {copy.items.map((item) => (
          <article key={item.name}>
            <p className="personal-tag mono">{item.tag}</p>
            <h3>{item.name}</h3>
            <p className="personal-body">{item.body}</p>
            <p className="personal-tech mono">{item.tech}</p>
            {item.link ? (
              <a href={item.link.href} target="_blank" rel="noopener noreferrer">
                {item.link.label}
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
