type EventFlowDiagramProps = {
  externalLabel: string;
  externalSystems: string[];
  internalLabel?: string;
  queueLabel: string;
  hub: string;
  channels: string[];
};

function wrapLabel(label: string, maxChars = 14): string[] {
  const words = label.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function NodeLabel({ lines, y }: { lines: string[]; y: number }) {
  const lineHeight = 13;
  const startDy = -((lines.length - 1) * lineHeight) / 2;
  return (
    <text
      x={0}
      y={y}
      textAnchor="middle"
      className="tech-display fill-[var(--foreground)]"
      fontSize="11"
      fontWeight="700"
    >
      {lines.map((line, i) => (
        <tspan key={line} x={0} dy={i === 0 ? startDy : lineHeight}>
          {line}
        </tspan>
      ))}
    </text>
  );
}

export function EventFlowDiagram({
  externalLabel,
  externalSystems,
  internalLabel,
  queueLabel,
  hub,
  channels,
}: EventFlowDiagramProps) {
  const sourceX = 95;
  const sourceHalfW = 85;
  const queueX = 350;
  const hubX = 610;
  const channelX = 895;

  const hasInternal = Boolean(internalLabel);
  const externalYs = hasInternal ? [40, 128, 216, 304] : [60, 154, 248, 342];
  const internalY = 362;
  const centerY = 176;
  const channelSpacing = 88;
  const channelYs =
    channels.length === 1
      ? [centerY]
      : channels.map((_, i) => centerY - ((channels.length - 1) * channelSpacing) / 2 + i * channelSpacing);

  return (
    <div className="blueprint-corner border border-[var(--line)] bg-[var(--panel-soft)] p-4">
      <div className="corner-br" />
      <svg
        viewBox="0 0 1010 410"
        className="mx-auto w-full max-w-4xl"
        role="img"
        aria-label={`${externalLabel}: ${externalSystems.join(", ")}${internalLabel ? ` + ${internalLabel}` : ""} → ${queueLabel} → ${hub} → ${channels.join(", ")}`}
      >
        <text
          x={sourceX - sourceHalfW}
          y={14}
          className="tech-display fill-[var(--red-hot)]"
          fontSize="10"
          fontWeight="700"
        >
          {externalLabel}
        </text>

        {externalYs.map((y) => (
          <path
            key={`ext-line-${y}`}
            d={`M ${sourceX + sourceHalfW} ${y} L ${queueX - 70} ${centerY}`}
            className="event-flow-line stroke-[var(--line-strong)]"
            fill="none"
            strokeWidth="1.5"
          />
        ))}
        {hasInternal && (
          <path
            d={`M ${sourceX + sourceHalfW} ${internalY} L ${queueX - 70} ${centerY}`}
            className="event-flow-line stroke-[var(--line-strong)]"
            fill="none"
            strokeWidth="1.5"
          />
        )}
        <path
          d={`M ${queueX + 70} ${centerY} L ${hubX - 46} ${centerY}`}
          className="event-flow-line stroke-[var(--line-strong)]"
          fill="none"
          strokeWidth="1.5"
        />
        {channelYs.map((y) => (
          <path
            key={`chn-${y}`}
            d={`M ${hubX + 46} ${centerY} L ${channelX - 75} ${y}`}
            className="event-flow-line stroke-[var(--line-strong)]"
            fill="none"
            strokeWidth="1.5"
          />
        ))}

        {externalSystems.map((label, i) => (
          <g key={label} transform={`translate(${sourceX}, ${externalYs[i]})`}>
            <rect
              x={-sourceHalfW}
              y={-22}
              width={sourceHalfW * 2}
              height={44}
              className="fill-[var(--panel)] stroke-[var(--line-strong)]"
              strokeWidth="1"
            />
            <NodeLabel lines={wrapLabel(label)} y={0} />
          </g>
        ))}

        {hasInternal && (
          <g transform={`translate(${sourceX}, ${internalY})`}>
            <rect
              x={-sourceHalfW}
              y={-20}
              width={sourceHalfW * 2}
              height={40}
              className="fill-[var(--panel)] stroke-[var(--line-strong)]"
              strokeWidth="1"
            />
            <NodeLabel lines={wrapLabel(internalLabel as string)} y={0} />
          </g>
        )}

        <g transform={`translate(${queueX}, ${centerY})`}>
          <rect
            x={-70}
            y={-30}
            width={140}
            height={60}
            className="fill-[var(--panel)] stroke-[var(--amber)]"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <NodeLabel lines={wrapLabel(queueLabel)} y={0} />
        </g>

        <g transform={`translate(${hubX}, ${centerY})`}>
          <circle
            r={46}
            className="fill-[var(--red-root)] stroke-[var(--red-active)]"
            strokeWidth="1.5"
          />
          <NodeLabel lines={wrapLabel(hub)} y={0} />
        </g>

        {channels.map((label, i) => (
          <g key={label} transform={`translate(${channelX}, ${channelYs[i]})`}>
            <rect
              x={-75}
              y={-22}
              width={150}
              height={44}
              className="fill-[var(--panel)] stroke-[var(--line-strong)]"
              strokeWidth="1"
            />
            <NodeLabel lines={wrapLabel(label)} y={0} />
          </g>
        ))}
      </svg>
    </div>
  );
}
