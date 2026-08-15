import { Reveal } from "./Reveal";

type HeroProps = {
  copy: {
    eyebrow: string;
    name: string;
    role: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
    specs: string[];
  };
};

export function Hero({ copy }: HeroProps) {
  const [firstName, ...restName] = copy.name.split(" ");
  const lastName = restName.join(" ");

  return (
    <section
      id="top"
      className="relative z-10 mx-auto flex min-h-[58vh] max-w-7xl flex-col items-center justify-center px-5 py-16 text-center sm:px-8 lg:min-h-[64vh]"
    >
      <Reveal className="flex flex-col items-center">
        <p className="tech-display mb-8 text-xs font-bold text-[var(--red-hot)] sm:text-sm">
          &gt; {copy.eyebrow}
        </p>
        <h1
          className="hero-frame hero-name max-w-5xl text-[clamp(4rem,11vw,9.6rem)] font-bold uppercase leading-[0.78] text-[var(--foreground)]"
          aria-label={copy.name}
        >
          <span className="hero-name-line">{firstName}</span>
          <span className="hero-name-line hero-name-accent">
            {lastName}
          </span>
        </h1>
        <p className="tech-display mt-7 text-base font-black uppercase text-[var(--red-hot)] sm:text-xl">
          {copy.role}
        </p>
        <div className="mt-6 h-px w-12 bg-[var(--red-active)]" />
        <p className="mt-7 max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">
          {copy.body}
        </p>

        <div className="mt-10 flex w-full max-w-md flex-col gap-3 sm:flex-row">
          <a
            href="#projects"
            className="tech-display flex h-12 flex-1 items-center justify-center border border-[var(--red-active)] bg-[var(--red-root)] px-5 text-sm font-black text-[var(--foreground)] transition active:scale-95 hover:bg-[var(--red-active)]"
          >
            {copy.primaryCta} <span className="ml-3">-&gt;</span>
          </a>
          <a
            href="#contact"
            className="tech-display flex h-12 flex-1 items-center justify-center border border-[var(--line-strong)] px-5 text-sm font-black text-[var(--foreground)] transition active:scale-95 hover:border-[var(--red-hot)] hover:text-[var(--red-hot)]"
          >
            {copy.secondaryCta} <span className="ml-3">-&gt;</span>
          </a>
        </div>

        <div className="tech-display mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-[var(--dim)]">
          {copy.specs.map((spec) => (
            <span key={spec} className="flex items-center gap-2">
              <span className="h-2 border-l border-[var(--line-strong)]" aria-hidden="true" />
              {spec}
              <span className="h-2 border-r border-[var(--line-strong)]" aria-hidden="true" />
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
