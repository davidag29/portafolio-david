import type { Copy } from "@/content/portfolio";
import { Reveal } from "./Reveal";
const ys = [35, 85, 135, 185];
export function EventFlowDiagram({ copy }: { copy: Copy["work"]["diagram"] }) {
  return (
    <Reveal className="notification-diagram">
      <svg viewBox="0 0 544 220" role="img" aria-label={copy.label}>
        <g
          fill="none"
          stroke="var(--green)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {ys.map((y) => (
            <path
              className="flow-input"
              pathLength="1"
              key={y}
              d={`M160 ${y} H${250 - Math.abs(110 - y)} L250 110`}
            />
          ))}
          <path className="flow-trunk" pathLength="1" d="M250 110 H370" />
          {ys.map((y) => (
            <path
              className="flow-output"
              pathLength="1"
              key={y}
              d={`M370 110 L${370 + Math.abs(110 - y)} ${y} H450`}
            />
          ))}
        </g>
        <g fill="var(--station)" stroke="var(--ink)" strokeWidth="3.5">
          {ys.flatMap((y) => [
            <circle key={`in-${y}`} cx="160" cy={y} r="9" />,
            <circle key={`out-${y}`} cx="450" cy={y} r="9" />,
          ])}
          <circle cx="282" cy="110" r="9" />
          <circle cx="340" cy="110" r="14" strokeWidth="4.5" />
        </g>
        <g className="flow-label">
          {ys.map((y, i) => (
            <g key={y}>
              <text x="142" y={y + 4} textAnchor="end">
                {copy.sources[i]}
              </text>
              <text x="470" y={y + 4}>
                {copy.channels[i]}
              </text>
            </g>
          ))}
        </g>
        <g className="flow-note">
          <text x="282" y="142" textAnchor="middle">
            {copy.queue}
          </text>
          <text x="340" y="142" textAnchor="middle" fontWeight="700">
            {copy.engine}
          </text>
        </g>
      </svg>
      <p className="mono">{copy.note}</p>
    </Reveal>
  );
}
