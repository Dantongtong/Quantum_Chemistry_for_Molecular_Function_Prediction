import { stages } from "@/data/site";

/**
 * The signature element.
 *
 * The six-week arc drawn as what the program actually teaches students to
 * read: an energy profile. The dashed curve is the barrier between a curious
 * high school student and a defensible research claim when they attempt it
 * alone. The solid curve is the same path with a catalyst — which is, not
 * coincidentally, the name of the organisation running this.
 *
 * The three numbered stationary points are the three phases in
 * data/site.js: Weeks 1–3, Weeks 4–5, Week 6.
 */
export default function ReactionCoordinate() {
  const nodes = [
    { n: 1, x: 330, y: 148 },
    { n: 2, x: 470, y: 193 },
    { n: 3, x: 800, y: 300 },
  ];

  return (
    <section className="rxn" aria-labelledby="rxn-heading">
      <h2 id="rxn-heading" className="eyebrow">
        Six weeks, as an energy profile
      </h2>

      <div className="rxn-frame">
        <svg
          viewBox="0 0 900 360"
          role="img"
          aria-label="An energy profile diagram. A dashed curve shows a high barrier between a curious student and a defensible research claim. A solid curve shows the same path with a much lower barrier, marked with three numbered phases: shared foundation in weeks one to three, focused project in weeks four and five, and capstone in week six."
        >
          <line className="rxn-axis" x1="48" y1="24" x2="48" y2="332" />
          <line className="rxn-axis" x1="48" y1="332" x2="884" y2="332" />
          <text className="rxn-tick" x="10" y="150" transform="rotate(-90 10 150)">
            Effort
          </text>
          <text className="rxn-tick" x="48" y="352">
            Week 1
          </text>
          <text className="rxn-tick" x="884" y="352" textAnchor="end">
            Poster + presentation
          </text>

          {/* the barrier without structured guidance */}
          <path
            className="rxn-uncat"
            d="M 60 260 H 150 C 260 260, 280 55, 400 55 C 520 55, 560 300, 700 300 H 880"
          />

          {/* what the program removes */}
          <g className="rxn-fade">
            <line className="rxn-barrier" x1="400" y1="55" x2="400" y2="148" />
            <line className="rxn-barrier" x1="360" y1="55" x2="430" y2="55" />
            <line className="rxn-barrier" x1="360" y1="148" x2="430" y2="148" />
          </g>

          {/* the guided path */}
          <path
            className="rxn-cat rxn-draw"
            d="M 60 260 H 150 C 240 260, 250 150, 330 148 C 400 146, 405 195, 470 193 C 545 191, 550 128, 630 130 C 715 132, 720 300, 800 300 H 880"
          />

          <g className="rxn-fade">
            {nodes.map((node) => (
              <g className="rxn-node" key={node.n}>
                <circle cx={node.x} cy={node.y} r="15" />
                <text x={node.x} y={node.y}>
                  {node.n}
                </text>
              </g>
            ))}
          </g>
        </svg>

        <div className="rxn-legend">
          {stages.map((stage) => (
            <div className="rxn-legend-item" key={stage.n}>
              <h3>
                <span className="rxn-legend-num" aria-hidden="true">
                  {stage.n}
                </span>
                {stage.title}
              </h3>
              <p>{stage.body}</p>
              <span className="rxn-legend-meta">{stage.meta}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="prose" style={{ marginTop: "1.25rem", fontSize: "0.9rem" }}>
        <div>Dashed line: researchon your own | Solid line: research in the program</div>
        <div style={{ whiteSpace: "nowrap" }}>The gap between them is what a catalyst does — it does not change the destination, it lowers what it costs to get there.</div>
        <br/>
      </div>
    </section>
  );
}
