import { stage2 } from "@/data/site";

/** Five Sunday sessions on a line, with the ACS deadline marked between them. */
export default function Stage2Timeline() {
  const n = stage2.sessions.length;
  const W = 900, H = 170;
  const pad = 70;
  const x = (i) => pad + (i / (n - 1)) * (W - 2 * pad);
  // Monday Sep 28 falls one day after session 4 (index 3): 1/7 of a week later.
  const deadlineX = x(stage2.deadline.after) + (x(1) - x(0)) / 7;

  return (
    <figure className="timeline">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Stage 2 timeline: five Sunday sessions and the ACS abstract deadline">
        <line x1={x(0)} x2={x(n - 1)} y1="70" y2="70" className="tl-line" />
        {stage2.sessions.map((s, i) => (
          <g key={s.date}>
            <circle cx={x(i)} cy="70" r="11" className="tl-node" />
            <text x={x(i)} y="74.5" textAnchor="middle" className="tl-num">{i + 1}</text>
            <text x={x(i)} y="40" textAnchor="middle" className="tl-date">{s.date}</text>
            {s.label.split(" ").reduce((lines, w) => {
              const last = lines[lines.length - 1];
              if (last && (last + " " + w).length <= 16) lines[lines.length - 1] = last + " " + w;
              else lines.push(w);
              return lines;
            }, []).map((line, k) => (
              <text key={k} x={x(i)} y={106 + k * 17} textAnchor="middle" className="tl-label">{line}</text>
            ))}
          </g>
        ))}
        <g>
          <line x1={deadlineX} x2={deadlineX} y1="52" y2="88" className="tl-deadline" />
          <polygon points={`${deadlineX},46 ${deadlineX + 7},56 ${deadlineX - 7},56`} className="tl-flag" />
          <text x={deadlineX} y="20" textAnchor="middle" className="tl-deadline-text">
            {stage2.deadline.date} · ACS deadline
          </text>
        </g>
      </svg>
    </figure>
  );
}
