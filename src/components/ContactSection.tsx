"use client";
import { useRef, useState, type FormEvent } from "react";
import type { Copy } from "@/content/portfolio";
export function ContactSection({ copy }: { copy: Copy["contact"] }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error" | "notConfigured">(
    "idle",
  );
  const feedback = useRef<HTMLParagraphElement>(null);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const data = new FormData(event.currentTarget);
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      const result = await response.json();
      setStatus(
        response.ok
          ? "success"
          : response.status === 503 && result.error === "not_configured"
            ? "notConfigured"
            : "error",
      );
    } catch {
      setStatus("error");
    }
    requestAnimationFrame(() => feedback.current?.focus());
  }
  return (
    <section id="contacto" className="contact-section" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-copy">
            <h2 id="contact-title">{copy.title}</h2>
            <p>{copy.body}</p>
            <div className="social-links">
              {copy.links.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div className="contact-form-area">
            {status === "success" ? (
              <p ref={feedback} tabIndex={-1} role="status" className="form-success">
                {copy.success}
              </p>
            ) : (
              <form onSubmit={submit} aria-busy={status === "sending"}>
                <div className="contact-fields">
                  <div>
                    <label htmlFor="contact-name">{copy.name}</label>
                    <input
                      id="contact-name"
                      name="name"
                      placeholder={copy.namePlaceholder}
                      autoComplete="name"
                      required
                      minLength={1}
                      maxLength={100}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email">{copy.email}</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder={copy.emailPlaceholder}
                      autoComplete="email"
                      required
                      maxLength={254}
                    />
                  </div>
                </div>
                <div className="honeypot" aria-hidden="true">
                  <label htmlFor="contact-website">{copy.honeypot}</label>
                  <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
                </div>
                <fieldset className="reason-field">
                  <legend>{copy.reason}</legend>
                  <div className="reason-options">
                    {copy.reasons.map((reason, i) => (
                      <label key={reason.value}>
                        <input
                          type="radio"
                          name="reason"
                          value={reason.value}
                          defaultChecked={i === 0}
                          required
                        />
                        <span>{reason.label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <label htmlFor="contact-message">{copy.message}</label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder={copy.placeholder}
                  required
                  minLength={10}
                  maxLength={4000}
                  rows={3}
                />
                <div className="form-actions">
                  <button type="submit" disabled={status === "sending"}>
                    {status === "sending" ? copy.sending : copy.submit}
                  </button>
                  <p className="mono">{copy.privacy}</p>
                </div>
                {status === "error" || status === "notConfigured" ? (
                  <p ref={feedback} role="alert" tabIndex={-1} className="form-error">
                    {status === "notConfigured" ? copy.notConfigured : copy.error}{" "}
                    <a href={copy.links[1].href} target="_blank" rel="noopener noreferrer">
                      {copy.links[1].label}
                    </a>
                  </p>
                ) : null}
              </form>
            )}
          </div>
        </div>
        <footer className="mono">{copy.footer}</footer>
      </div>
    </section>
  );
}
