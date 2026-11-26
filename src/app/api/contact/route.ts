import { portfolioCopy } from "@/content/portfolio";

export async function POST(request: Request) {
  let data: unknown;
  try {
    data = await request.json();
  } catch {
    return Response.json({ error: "invalid_request" }, { status: 400 });
  }
  if (!data || typeof data !== "object" || Array.isArray(data))
    return Response.json({ error: "invalid_request" }, { status: 400 });
  const fields = data as Record<string, unknown>;
  if (fields.website !== undefined && (typeof fields.website !== "string" || fields.website !== ""))
    return Response.json({ error: "invalid_request" }, { status: 400 });
  const name = typeof fields.name === "string" ? fields.name.trim() : "";
  const email = typeof fields.email === "string" ? fields.email.trim() : "";
  const message = typeof fields.message === "string" ? fields.message.trim() : "";
  const reason = portfolioCopy.es.contact.reasons.find((item) => item.value === fields.reason);
  if (
    name.length < 1 ||
    name.length > 100 ||
    /[\r\n]/.test(name) ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !reason ||
    message.length < 10 ||
    message.length > 4000
  )
    return Response.json({ error: "invalid_fields" }, { status: 400 });
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!key || !to) return Response.json({ error: "not_configured" }, { status: 503 });
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev",
        to: [to],
        reply_to: email,
        subject: `${reason.label} · ${name}`,
        text: `${portfolioCopy.es.contact.name}: ${name}\n${portfolioCopy.es.contact.reason}: ${reason.label}\n\n${message}`,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) return Response.json({ error: "send_failed" }, { status: 502 });
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "send_failed" }, { status: 502 });
  }
}
