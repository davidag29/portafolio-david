import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

// Load the real handler and content with the project's existing TypeScript compiler.
// This isolates the HTTP provider so the tests never send email.
const compile = (source) =>
  ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText;
const moduleUrl = (source) =>
  `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`;
const contentUrl = moduleUrl(
  compile(await readFile(new URL("../src/content/portfolio.ts", import.meta.url), "utf8")),
);
const handlerSource = compile(
  await readFile(new URL("../src/app/api/contact/route.ts", import.meta.url), "utf8"),
);
const { POST } = await import(
  moduleUrl(handlerSource.replace('"@/content/portfolio"', JSON.stringify(contentUrl)))
);

const valid = {
  name: "Test visitor",
  email: "visitor@example.com",
  reason: "vacancy",
  message: "A valid message for the contact form.",
  website: "",
};
const request = (data) =>
  new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

test("contact validation, configuration and delivery", async (t) => {
  const originalFetch = globalThis.fetch;
  const names = ["RESEND_API_KEY", "CONTACT_TO_EMAIL", "CONTACT_FROM_EMAIL"];
  const originalEnv = Object.fromEntries(names.map((name) => [name, process.env[name]]));
  let calls = [];
  t.after(() => {
    globalThis.fetch = originalFetch;
    for (const name of names) {
      if (originalEnv[name] === undefined) delete process.env[name];
      else process.env[name] = originalEnv[name];
    }
  });
  for (const name of names) delete process.env[name];
  globalThis.fetch = async (...args) => {
    calls.push(args);
    return Response.json({ id: "test-message" });
  };

  await t.test("returns 503 when configuration is absent", async () => {
    const response = await POST(request(valid));
    assert.equal(response.status, 503);
    assert.deepEqual(await response.json(), { error: "not_configured" });
    assert.equal(calls.length, 0);
  });

  for (const [name, data] of [
    ["empty name", { ...valid, name: "   " }],
    ["long name", { ...valid, name: "a".repeat(101) }],
    ["header injection", { ...valid, name: "Visitor\nBcc: other@example.com" }],
    ["invalid email", { ...valid, email: "invalid-address" }],
    ["invalid reason", { ...valid, reason: "unknown" }],
    ["short message", { ...valid, message: "short" }],
    ["long message", { ...valid, message: "a".repeat(4001) }],
    ["filled honeypot", { ...valid, website: "bot.example" }],
    ["whitespace honeypot", { ...valid, website: " " }],
    ["non-string honeypot", { ...valid, website: 1 }],
    ["null body", null],
    ["array body", []],
  ]) {
    await t.test(`rejects ${name}`, async () => {
      assert.equal((await POST(request(data))).status, 400);
      assert.equal(calls.length, 0);
    });
  }

  await t.test("rejects malformed JSON", async () => {
    const response = await POST(
      new Request("http://localhost/api/contact", { method: "POST", body: "{" }),
    );
    assert.equal(response.status, 400);
  });

  process.env.RESEND_API_KEY = "test-key";
  process.env.CONTACT_TO_EMAIL = "recipient@example.com";
  await t.test("delivers validated data with reply_to and default sender", async () => {
    const response = await POST(
      request({
        ...valid,
        name: " Visitor ",
        email: " visitor@example.com ",
        message: "  A valid contact message.  ",
      }),
    );
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { success: true });
    const [url, options] = calls.at(-1);
    assert.equal(url, "https://api.resend.com/emails");
    assert.equal(options.headers.Authorization, "Bearer test-key");
    assert.equal(options.method, "POST");
    const email = JSON.parse(options.body);
    assert.deepEqual(email.to, ["recipient@example.com"]);
    assert.equal(email.reply_to, "visitor@example.com");
    assert.equal(email.from, "onboarding@resend.dev");
    assert.equal(email.subject, "Vacante · Visitor");
    assert.ok(email.text.endsWith("A valid contact message."));
    assert.ok(options.signal instanceof AbortSignal);
  });

  await t.test("accepts every allowed reason and the configured sender", async () => {
    process.env.CONTACT_FROM_EMAIL = "Portfolio <hello@example.com>";
    for (const reason of ["vacancy", "project", "other"]) {
      assert.equal((await POST(request({ ...valid, reason }))).status, 200);
      assert.equal(JSON.parse(calls.at(-1)[1].body).from, process.env.CONTACT_FROM_EMAIL);
    }
  });

  await t.test("does not claim success when the provider fails", async () => {
    globalThis.fetch = async () => Response.json({ error: "provider_error" }, { status: 429 });
    const response = await POST(request(valid));
    assert.equal(response.status, 502);
    assert.deepEqual(await response.json(), { error: "send_failed" });
  });

  await t.test("handles connection failures", async () => {
    globalThis.fetch = async () => {
      throw new Error("Connection failed");
    };
    assert.equal((await POST(request(valid))).status, 502);
  });
});
