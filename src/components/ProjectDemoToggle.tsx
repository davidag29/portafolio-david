"use client";

import { useState, type ReactNode } from "react";

type ProjectDemoToggleProps = {
  label: string;
  children: ReactNode;
};

export function ProjectDemoToggle({ label, children }: ProjectDemoToggleProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="tech-display flex items-center gap-1 text-xs font-black uppercase text-[var(--red-hot)] transition active:scale-95 hover:text-[var(--foreground)]"
      >
        {label}
        <svg
          viewBox="0 0 24 24"
          width="10"
          height="10"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`shrink-0 transition-transform duration-200 ${open ? "rotate-90" : ""}`}
        >
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>
      <div
        className={`grid transition-all duration-300 ease-out md:col-start-1 md:col-end-6 ${
          open ? "mt-6 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </>
  );
}
