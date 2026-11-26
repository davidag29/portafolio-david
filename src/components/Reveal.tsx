"use client";
import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

let observer: IntersectionObserver | undefined;
function observe(element: HTMLElement) {
  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !("IntersectionObserver" in window)
  ) {
    element.dataset.visible = "true";
    return () => {};
  }
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries)
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).dataset.visible = "true";
          observer?.unobserve(entry.target);
        }
    },
    { threshold: 0.15 },
  );
  element.dataset.visible = "false";
  observer.observe(element);
  return () => observer?.unobserve(element);
}
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => (ref.current ? observe(ref.current) : undefined), []);
  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ "--delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
