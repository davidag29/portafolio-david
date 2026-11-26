import type { Copy } from "@/content/portfolio";
import { CvRouteMap } from "./CvRouteMap";
export function Hero({ copy }: { copy: Copy }) {
  return (
    <section className="hero" aria-labelledby="hero-name">
      <p className="eyebrow mono">{copy.hero.eyebrow}</p>
      <h1 id="hero-name">{copy.hero.name}</h1>
      <div className="hero-intro">
        <p>{copy.hero.body}</p>
        <a className="hero-cta" href="#contacto">
          {copy.hero.cta}
        </a>
      </div>
      <CvRouteMap copy={copy.map} />
    </section>
  );
}
