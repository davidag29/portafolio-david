"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type KeyboardEvent } from "react";
import type { Copy } from "@/content/portfolio";

type RouteGeometry = {
  viewBox: string;
  main: string[];
  branches: string[];
  routes: string[];
  stations: { x: number; y: number; labelX: number; labelY: number }[];
  providers: { x: number; y: number; labelX: number; labelY: number }[];
  stopped: string;
  resting: string;
  diversion: { x: number; y: number };
};

const horizontalGeometry: RouteGeometry = {
  viewBox: "0 0 1248 300",
  main: ["M64 150 H604", "M874 150 H1184"],
  branches: ["M604 150 L684 70 H794 L874 150", "M604 150 H874", "M604 150 L684 230 H794 L874 150"],
  routes: [
    "M64 150 H604 L684 70 H794 L874 150 H1184",
    "M64 150 H1184",
    "M64 150 H604 L684 230 H794 L874 150 H1184",
  ],
  stations: [
    { x: 64, y: 150, labelX: 52, labelY: 190 },
    { x: 304, y: 150, labelX: 292, labelY: 190 },
    { x: 544, y: 150, labelX: 470, labelY: 108 },
    { x: 960, y: 150, labelX: 948, labelY: 190 },
    { x: 1184, y: 150, labelX: 1120, labelY: 190 },
  ],
  providers: [
    { x: 739, y: 70, labelX: 727, labelY: 30 },
    { x: 739, y: 150, labelX: 727, labelY: 110 },
    { x: 739, y: 230, labelX: 727, labelY: 266 },
  ],
  stopped: "translate(544 150)",
  resting: "translate(664 150)",
  diversion: { x: 661, y: 184 },
};

const verticalGeometry: RouteGeometry = {
  viewBox: "0 0 360 700",
  main: ["M180 40 V290", "M180 480 V660"],
  // The outer diagonals are 45°. The center return skirts its label block.
  branches: [
    "M180 290 L85 385 H70 L165 480 H180",
    "M180 290 V385 L214 419 V446 L180 480",
    "M180 290 L275 385 H290 L195 480 H180",
  ],
  routes: [
    "M180 40 V290 L85 385 H70 L165 480 H180 V660",
    "M180 40 V385 L214 419 V446 L180 480 V660",
    "M180 40 V290 L275 385 H290 L195 480 H180 V660",
  ],
  stations: [
    { x: 180, y: 40, labelX: 206, labelY: 35 },
    { x: 180, y: 140, labelX: 206, labelY: 135 },
    { x: 180, y: 240, labelX: 206, labelY: 225 },
    { x: 180, y: 560, labelX: 206, labelY: 550 },
    { x: 180, y: 660, labelX: 206, labelY: 650 },
  ],
  providers: [
    { x: 70, y: 385, labelX: 41, labelY: 411 },
    { x: 180, y: 385, labelX: 185, labelY: 411 },
    { x: 290, y: 385, labelX: 319, labelY: 411 },
  ],
  stopped: "translate(180 240)",
  resting: "translate(180 275)",
  diversion: { x: 160, y: 515 },
};

const mobileQuery = "(max-width: 767px)";
function subscribeToLayout(callback: () => void) {
  const query = window.matchMedia(mobileQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
const getMobileLayout = () => window.matchMedia(mobileQuery).matches;
const getServerLayout = () => false;

function wrapStationNote(note: string) {
  if (note.length <= 18) return [note];
  const split = note.lastIndexOf(" ", 18);
  return [note.slice(0, split), note.slice(split + 1)];
}

function Station({ x, y, terminal = false }: { x: number; y: number; terminal?: boolean }) {
  return (
    <circle
      cx={x}
      cy={y}
      r={terminal ? 17 : 12}
      fill="var(--station)"
      stroke="var(--ink)"
      strokeWidth={terminal ? 5 : 4}
    />
  );
}

export function CvRouteMap({ copy }: { copy: Copy["map"] }) {
  const vertical = useSyncExternalStore(subscribeToLayout, getMobileLayout, getServerLayout);
  const geometry = vertical ? verticalGeometry : horizontalGeometry;
  const [{ enabled, announcement }, setProviderState] = useState({
    enabled: [false, true, true],
    announcement: "",
  });
  const active = enabled.findIndex(Boolean);
  const activeRef = useRef(active);
  const geometryRef = useRef(geometry);
  const routeRefs = useRef<(SVGPathElement | null)[]>([]);
  const traveler = useRef<SVGGElement>(null);

  useEffect(() => {
    activeRef.current = active;
    geometryRef.current = geometry;
  }, [active, geometry]);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let started = 0;
    let cycle = -1;
    let current = activeRef.current;
    const draw = (time: number) => {
      started ||= time;
      const nextCycle = Math.floor((time - started) / 7800);
      if (cycle !== nextCycle) {
        cycle = nextCycle;
        current = activeRef.current;
      }
      if (activeRef.current < 0) {
        traveler.current?.setAttribute("transform", geometryRef.current.stopped);
      } else if (media.matches) {
        traveler.current?.setAttribute("transform", geometryRef.current.resting);
      } else {
        // Provider changes take effect at the beginning of the next journey.
        const path = routeRefs.current[current < 0 ? activeRef.current : current];
        const progress = Math.min(((time - started) % 7800) / 7000, 1);
        if (path) {
          const point = path.getPointAtLength(progress * path.getTotalLength());
          traveler.current?.setAttribute("transform", `translate(${point.x} ${point.y})`);
        }
      }
      if (!media.matches) frame = requestAnimationFrame(draw);
    };
    const restart = () => {
      cancelAnimationFrame(frame);
      started = 0;
      cycle = -1;
      frame = requestAnimationFrame(draw);
    };
    restart();
    media.addEventListener("change", restart);
    return () => {
      cancelAnimationFrame(frame);
      media.removeEventListener("change", restart);
    };
  }, []);
  useEffect(() => {
    if (active < 0) traveler.current?.setAttribute("transform", geometry.stopped);
    else if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      traveler.current?.setAttribute("transform", geometry.resting);
  }, [active, geometry]);

  function toggle(index: number) {
    setProviderState((prev) => {
      const next = prev.enabled.map((value, i) => (i === index ? !value : value));
      const selected = next.findIndex(Boolean);
      const providerStatus = next[index] ? copy.on : copy.announcement;
      const flowStatus =
        selected < 0 ? copy.unavailable : `${copy.flowing} ${copy.providers[selected]}.`;
      return {
        enabled: next,
        announcement: `${copy.providers[index]} ${providerStatus}. ${flowStatus}`,
      };
    });
  }
  function keyToggle(event: KeyboardEvent<SVGGElement>, index: number) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggle(index);
    }
  }

  return (
    <div className="cv-map">
      <div className="map-heading mono">
        <div>
          <strong>{copy.title}</strong>
          <span>{copy.context}</span>
        </div>
        <b>{copy.result}</b>
      </div>
      <div className="map-scroll" role="region" aria-label={copy.label}>
        <svg className="route-svg" viewBox={geometry.viewBox} aria-label={copy.label}>
          <g
            fill="none"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {geometry.main.map((d, i) => (
              <path
                key={i}
                className={`hero-draw${i === 1 ? " hero-draw-end" : ""}`}
                pathLength="1"
                d={d}
                stroke="var(--blue)"
              />
            ))}
            {geometry.branches.map((d, i) => (
              <path
                key={i}
                d={d}
                className="provider-track"
                stroke={
                  !enabled[i] ? "var(--off)" : active === i ? "var(--blue)" : "var(--blue-standby)"
                }
                strokeDasharray={!enabled[i] ? "1 18" : undefined}
              />
            ))}
          </g>
          <g aria-hidden="true" className="route-labels">
            {geometry.stations.map(({ x, y, labelX, labelY }, i) => (
              <g key={i} className={`map-station map-station-${i}`}>
                <Station x={x} y={y} terminal={i === 2 || i === 4} />
                <text x={labelX} y={labelY} className="station-name">
                  {copy.stations[i].name}
                </text>
                <text
                  x={labelX}
                  y={labelY + (i === 2 && !vertical ? 20 : 19)}
                  className="station-note"
                >
                  {vertical
                    ? wrapStationNote(copy.stations[i].note).map((line, n) => (
                        <tspan key={n} x={labelX} dy={n === 0 ? 0 : 14}>
                          {line}
                        </tspan>
                      ))
                    : copy.stations[i].note}
                </text>
              </g>
            ))}
          </g>
          {copy.providers.map((name, i) => {
            const { x, y, labelX, labelY } = geometry.providers[i];
            const status = !enabled[i] ? copy.off : active === i ? copy.on : copy.standby;
            const statusX = vertical && i === 1 ? labelX + 10 : labelX;
            const lastSpace = status.lastIndexOf(" ");
            const statusLines =
              lastSpace < 0 ? [status] : [status.slice(0, lastSpace), status.slice(lastSpace + 1)];
            return (
              <g
                key={name}
                className={`provider-station ${!enabled[i] ? "is-off" : active === i ? "is-active" : "is-standby"}`}
                role="button"
                tabIndex={0}
                aria-pressed={enabled[i]}
                aria-label={`${enabled[i] ? copy.disable : copy.enable} ${name}`}
                onClick={() => toggle(i)}
                onKeyDown={(event) => keyToggle(event, i)}
              >
                <rect
                  x={vertical ? x - 48 : 715}
                  y={vertical ? y - 24 : Math.min(y - 24, labelY - 16)}
                  width={vertical ? 96 : 160}
                  height="86"
                  fill="transparent"
                />
                <circle className="station-hit" cx={x} cy={y} r="24" fill="transparent" />
                <circle
                  className="provider-circle"
                  cx={x}
                  cy={y}
                  r="12"
                  fill="var(--station)"
                  strokeWidth="4"
                />
                {!enabled[i] ? (
                  <path
                    d={`M${x - 6} ${y - 6} l12 12 m-12 0 l12 -12`}
                    stroke="var(--red)"
                    strokeWidth="3"
                    aria-hidden="true"
                  />
                ) : null}
                <g textAnchor={vertical ? (i === 1 ? "end" : "middle") : "start"}>
                  <text className="station-name" x={labelX} y={labelY}>
                    {name}
                  </text>
                  <text className="station-note" x={statusX} y={vertical ? 425 : labelY + 19}>
                    {vertical
                      ? statusLines.map((line, n) => (
                          <tspan key={n} x={statusX} dy={n === 0 ? 0 : 12}>
                            {line}
                          </tspan>
                        ))
                      : status}
                  </text>
                </g>
              </g>
            );
          })}
          {active > 0 ? (
            <text
              className="divert-note"
              x={geometry.diversion.x}
              y={geometry.diversion.y}
              textAnchor={vertical ? "end" : "start"}
              aria-hidden="true"
            >
              {copy.diverted}
            </text>
          ) : null}
          <g aria-hidden="true" ref={traveler} transform={geometry.resting} className="traveler">
            <circle r="20" fill="var(--blue)" opacity=".18" />
            <circle r="9" fill="var(--ink)" />
          </g>
          <g visibility="hidden" aria-hidden="true">
            {geometry.routes.map((d, i) => (
              <path
                key={i}
                ref={(el) => {
                  routeRefs.current[i] = el;
                }}
                d={d}
              />
            ))}
          </g>
        </svg>
      </div>
      <p className="map-foot mono">{active < 0 ? copy.unavailable : copy.hint}</p>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>
    </div>
  );
}
