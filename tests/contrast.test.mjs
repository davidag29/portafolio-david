import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const css = await readFile(new URL("../src/app/globals.css", import.meta.url), "utf8");
const light = css.match(/:root\s*\{([^}]+)\}/)[1];
const dark = css.match(/\[data-theme="dark"\]\s*\{([^}]+)\}/)[1];
const value = (block, name) => block.match(new RegExp(`--${name}:\\s*([^;]+);`))[1].trim();
function luminance(hex) {
  const rgb = hex
    .replace("#", "")
    .match(/../g)
    .map((channel) => parseInt(channel, 16) / 255);
  const linear = rgb.map((channel) =>
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
  );
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
}
function contrast(first, second) {
  const a = luminance(first);
  const b = luminance(second);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}
for (const color of ["green", "orange"]) {
  test(`${color} text meets AA on both light backgrounds`, () => {
    const text = value(light, `${color}-text`);
    for (const background of ["paper", "surface"]) {
      const ratio = contrast(text, value(light, background));
      assert.ok(ratio >= 4.5, `${text} on ${background}: ${ratio}`);
      console.log(`${color}-text ${text} on ${background}: ${ratio.toFixed(3)}:1`);
    }
    assert.equal(value(dark, `${color}-text`), `var(--${color})`);
  });
}
