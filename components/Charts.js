import computed from "@/data/computed.json";

/**
 * Small charts drawn from data/computed.json — real B3LYP/6-31G* results for
 * the five Stage 1 molecules (see scripts/qm.py and scripts/opt_trace.py).
 *
 * Series colours (validated for colour-vision deficiency): green #2a8a52 and
 * gold #c98a06. Every series is also direct-labelled, and the second line is
 * dashed, so identity never depends on colour alone. Native <title> elements
 * give each mark a hover tooltip.
 */

const SHORT = {
  water: "Water",
  ethanol: "Ethanol",
  acetone: "Acetone",
  benzene: "Benzene",
  trifluoroethanol: "TFE",
};

/* ------------------------------------------------ HOMO / LUMO level diagram */
export function OrbitalChart() {
  const mols = computed.molecules;
  const W = 380, H = 230;
  const m = { l: 40, r: 12, t: 16, b: 38 };
  const lo = -10.5, hi = 3;
  const y = (e) => m.t + ((hi - e) / (hi - lo)) * (H - m.t - m.b);
  const col = (W - m.l - m.r) / mols.length;
  const x = (i) => m.l + col * i + col / 2;
  const half = col * 0.3;

  return (
    <figure className="chart">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="HOMO and LUMO energies of the five shared molecules">
        {[-8, -4, 0].map((t) => (
          <g key={t}>
            <line className="chart-grid" x1={m.l} x2={W - m.r} y1={y(t)} y2={y(t)} />
            <text className="chart-tick" x={m.l - 6} y={y(t) + 3.5} textAnchor="end">{t}</text>
          </g>
        ))}
        <text className="chart-tick" x={4} y={m.t + 2}>eV</text>
        {mols.map((mo, i) => (
          <g key={mo.key}>
            <line className="chart-gap" x1={x(i)} x2={x(i)} y1={y(mo.homo_ev)} y2={y(mo.lumo_ev)} />
            <line x1={x(i) - half} x2={x(i) + half} y1={y(mo.lumo_ev)} y2={y(mo.lumo_ev)}
              stroke="var(--chart-gold)" strokeWidth="3" strokeLinecap="round">
              <title>{`${mo.name} LUMO ${mo.lumo_ev.toFixed(2)} eV`}</title>
            </line>
            <line x1={x(i) - half} x2={x(i) + half} y1={y(mo.homo_ev)} y2={y(mo.homo_ev)}
              stroke="var(--chart-green)" strokeWidth="3" strokeLinecap="round">
              <title>{`${mo.name} HOMO ${mo.homo_ev.toFixed(2)} eV`}</title>
            </line>
            <text className="chart-value" x={x(i) + 5} y={(y(mo.homo_ev) + y(mo.lumo_ev)) / 2 + 3}>
              {mo.gap_ev.toFixed(1)}
            </text>
            <text className="chart-cat" x={x(i)} y={H - m.b + 16} textAnchor="middle">{SHORT[mo.key]}</text>
          </g>
        ))}
        <text className="chart-label" x={x(0) - half} y={y(mols[0].lumo_ev) - 7}>LUMO</text>
        <text className="chart-label" x={x(0) - half} y={y(mols[0].homo_ev) + 16}>HOMO</text>
      </svg>
      <figcaption>Orbital energies and the gap between them, in eV</figcaption>
    </figure>
  );
}

/* ------------------------------------------- geometry optimization trace */
export function OptimizationChart() {
  const tr = computed.optimization.traces_kcal;
  const W = 380, H = 230;
  const m = { l: 40, r: 64, t: 16, b: 38 };
  const steps = Math.max(tr.HF.length, tr.B3LYP.length) - 1;
  const lo = -2.4, hi = 0.2;
  const x = (i) => m.l + (i / steps) * (W - m.l - m.r);
  const y = (e) => m.t + ((hi - e) / (hi - lo)) * (H - m.t - m.b);
  const series = [
    { key: "B3LYP", label: "DFT", color: "var(--chart-green)", dash: null, data: tr.B3LYP },
    { key: "HF", label: "HF", color: "var(--chart-gold)", dash: "5 4", data: tr.HF },
  ];

  return (
    <figure className="chart">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Energy of acetone at each optimization step, HF and DFT">
        {[0, -1, -2].map((t) => (
          <g key={t}>
            <line className="chart-grid" x1={m.l} x2={W - m.r} y1={y(t)} y2={y(t)} />
            <text className="chart-tick" x={m.l - 6} y={y(t) + 3.5} textAnchor="end">{t}</text>
          </g>
        ))}
        {Array.from({ length: steps + 1 }, (_, i) => (
          <text key={i} className="chart-tick" x={x(i)} y={H - m.b + 16} textAnchor="middle">{i}</text>
        ))}
        <text className="chart-tick" x={(m.l + W - m.r) / 2} y={H - 4} textAnchor="middle">optimizer step</text>
        <text className="chart-tick" x={4} y={m.t + 2}>kcal/mol</text>
        {series.map((s) => (
          <g key={s.key}>
            <polyline fill="none" stroke={s.color} strokeWidth="2" strokeDasharray={s.dash || undefined}
              strokeLinejoin="round" points={s.data.map((e, i) => `${x(i)},${y(e)}`).join(" ")} />
            {s.data.map((e, i) => (
              <circle key={i} cx={x(i)} cy={y(e)} r="4" fill={s.color} stroke="var(--paper-raised)" strokeWidth="2">
                <title>{`${s.label}, step ${i}: ${e.toFixed(2)} kcal/mol`}</title>
              </circle>
            ))}
            <text className="chart-label" x={x(s.data.length - 1) + 8} y={y(s.data[s.data.length - 1]) + 4}>
              {s.label} {s.data[s.data.length - 1].toFixed(1)}
            </text>
          </g>
        ))}
      </svg>
      <figcaption>Acetone relaxing from its starting structure, energy per step</figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------ dipole bars */
export function DipoleChart() {
  const mols = computed.molecules;
  const W = 380, H = 230;
  const m = { l: 74, r: 44, t: 12, b: 24 };
  const max = 3;
  const row = (H - m.t - m.b) / mols.length;
  const x = (v) => m.l + (v / max) * (W - m.l - m.r);

  return (
    <figure className="chart">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Dipole moments of the five shared molecules">
        <line className="chart-grid" x1={m.l} x2={m.l} y1={m.t} y2={H - m.b} />
        {mols.map((mo, i) => {
          const cy = m.t + row * i + row / 2;
          const w = Math.max(0, x(mo.dipole_debye) - m.l);
          return (
            <g key={mo.key}>
              <text className="chart-cat" x={m.l - 8} y={cy + 4} textAnchor="end">{SHORT[mo.key]}</text>
              {w > 0 && (
                <rect x={m.l} y={cy - 7} width={w} height="14" rx="4" fill="var(--chart-green)">
                  <title>{`${mo.name}: ${mo.dipole_debye.toFixed(2)} D`}</title>
                </rect>
              )}
              <text className="chart-value" x={m.l + w + 6} y={cy + 4}>{mo.dipole_debye.toFixed(2)} D</text>
            </g>
          );
        })}
      </svg>
      <figcaption>How polar each molecule is: dipole moment in debye</figcaption>
    </figure>
  );
}
