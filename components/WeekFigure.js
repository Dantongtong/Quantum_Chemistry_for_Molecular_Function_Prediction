import { OrbitalChart, OptimizationChart, DipoleChart } from "./Charts";
import EspLegend from "./EspLegend";

/** The picture shown beside each Stage 1 week. Keyed by `figure` in data/site.js. */

function Img({ src, alt, label }) {
  return (
    <div className="wf-img">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} />
      {label && <span>{label}</span>}
    </div>
  );
}

function Molecules() {
  return (
    <figure className="wf wf--row">
      <Img src="/figures/water.svg" alt="Water" label="Water" />
      <Img src="/figures/acetone.svg" alt="Acetone" label="Acetone" />
      <Img src="/figures/benzene.svg" alt="Benzene" label="Benzene" />
      <figcaption>Three of the five shared molecules</figcaption>
    </figure>
  );
}

function Comparison() {
  return (
    <figure className="wf">
      <div className="wf--row">
        <Img src="/figures/ethanol-esp.svg" alt="Ethanol electrostatic potential" label="Ethanol" />
        <span className="wf-vs">vs</span>
        <Img src="/figures/trifluoroethanol-esp.svg" alt="Trifluoroethanol electrostatic potential" label="Trifluoroethanol" />
      </div>
      <figcaption>
        One change, three fluorines: a comparison pair <EspLegend />
      </figcaption>
    </figure>
  );
}

function Poster() {
  return (
    <figure className="wf">
      <svg className="poster-glyph" viewBox="0 0 320 210" role="img" aria-label="A research poster">
        <rect x="8" y="8" width="304" height="194" rx="6" className="pg-board" />
        <rect x="8" y="8" width="304" height="34" rx="6" className="pg-head" />
        <rect x="8" y="30" width="304" height="12" className="pg-head" />
        <rect x="24" y="19" width="150" height="7" rx="3.5" className="pg-title" />
        <rect x="24" y="56" width="84" height="5" rx="2.5" className="pg-line" />
        <rect x="24" y="66" width="72" height="5" rx="2.5" className="pg-line" />
        <rect x="24" y="76" width="80" height="5" rx="2.5" className="pg-line" />
        <image href="/figures/acetone-esp.svg" x="118" y="52" width="86" height="72" />
        <image href="/figures/pfas.svg" x="214" y="56" width="86" height="60" />
        <rect x="24" y="136" width="84" height="5" rx="2.5" className="pg-line" />
        <rect x="24" y="146" width="66" height="5" rx="2.5" className="pg-line" />
        <rect x="124" y="136" width="176" height="5" rx="2.5" className="pg-line" />
        <rect x="124" y="146" width="150" height="5" rx="2.5" className="pg-line" />
        <rect x="124" y="156" width="164" height="5" rx="2.5" className="pg-line" />
        <rect x="24" y="176" width="42" height="12" rx="3" className="pg-tag" />
      </svg>
      <figcaption>Question, evidence, limits — on one poster</figcaption>
    </figure>
  );
}

export default function WeekFigure({ name }) {
  switch (name) {
    case "molecules":
      return <Molecules />;
    case "optimization":
      return <OptimizationChart />;
    case "orbitals":
      return <OrbitalChart />;
    case "comparison":
      return <Comparison />;
    case "dipoles":
      return <DipoleChart />;
    case "poster":
      return <Poster />;
    default:
      return null;
  }
}
