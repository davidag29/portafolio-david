"use client";

import { useRef, useState } from "react";

type MailtoButtonProps = {
  href: string;
  label: string;
};

const COOLDOWN_MS = 5000;

export function MailtoButton({ href, label }: MailtoButtonProps) {
  const [disabled, setDisabled] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = () => {
    if (disabled) return;
    setDisabled(true);
    timeoutRef.current = setTimeout(() => setDisabled(false), COOLDOWN_MS);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      aria-disabled={disabled}
      className={`tech-display mt-9 inline-flex h-12 items-center border border-[var(--red-active)] bg-[var(--red-root)] px-5 text-sm font-black text-[var(--foreground)] transition active:scale-95 ${
        disabled
          ? "pointer-events-none cursor-not-allowed opacity-50"
          : "hover:bg-[var(--red-active)]"
      }`}
    >
      {label} <span className="ml-3">-&gt;</span>
    </a>
  );
}
