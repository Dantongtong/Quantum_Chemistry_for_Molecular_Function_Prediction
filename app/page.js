import Link from "next/link";
import ReactionCoordinate from "@/components/ReactionCoordinate";
import Disclaimer from "@/components/Disclaimer";
import Tbd from "@/components/Tbd";
import {
  program,
  facts,
  tools,
  designNotes,
  studentGains,
  highlights,
  pullQuote,
  instructors,
} from "@/data/site";

export default function HomePage() {
  return (
    <>
      <section className="shell hero">
        <span className="eyebrow">
          {program.host} · Vanderbilt University, Department of Chemistry
        </span>
        <h1 className="hero-short">Predict molecular function in Quantum Chemistry</h1>
        <p className="lede hero-lede">{program.anchorQuestion} {program.lede}</p>
        <div className="hero-meta">
          <span>{program.badge}</span>
          <span>
            <Tbd value={program.cohortDates} />
          </span>
        </div>
        <div className="actions">
          <Link className="btn" href="/apply">
            Apply to the program
          </Link>
          <Link className="btn btn--ghost" href="/curriculum">
            See both stages
          </Link>
        </div>
      </section>

      <div className="shell">
        <ReactionCoordinate />
      </div>

      <section className="band">
        <div className="shell">
          <div className="band-head">
            <span className="eyebrow">Program highlights</span>
            <h2>What the program is</h2>
          </div>
          <ul className="ticklist" style={{ marginBottom: "3rem" }}>
            {highlights.map((item) => (
              <li key={item}>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="factrow">
            {facts.map((fact) => (
              <div key={fact.label}>
                <span className="fact-value">
                  <Tbd value={fact.value} />
                </span>
                <span className="fact-label">{fact.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band band--raised">
        <div className="shell">
          <div className="band-head">
            <span className="eyebrow">Why it matters</span>
            <h2>Beyond the flask</h2>
            <p className="prose">
              Computational methods now predict how molecules behave, react, and
              function — often before a single experiment is run. Why are some
              molecules more stable than others? Why do some bind more strongly
              to biological targets? Why do certain materials behave differently
              under the same conditions? This program introduces students to the
              idea that molecular function can often be understood and predicted
              from electronic structure.
            </p>
          </div>
          <div className="grid grid--3">
            {tools.map((tool) => (
              <article className="card" key={tool.name}>
                <span className="card-tag">Tool</span>
                <h3>{tool.name}</h3>
                <p>{tool.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="shell">
          <div className="band-head">
            <span className="eyebrow">{designNotes.eyebrow}</span>
            <h2>{designNotes.heading}</h2>
            <p className="prose">{designNotes.body}</p>
          </div>
          <ul className="ticklist">
            {designNotes.points.map((point) => (
              <li key={point}>
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <p style={{ marginTop: "2rem" }}>
            <Link className="btn btn--ghost" href="/curriculum">
              Read the week-by-week plan
            </Link>
          </p>
        </div>
      </section>

      <section className="band band--raised">
        <div className="shell">
          <div className="band-head">
            <span className="eyebrow">What students gain</span>
            <h2>What students gain</h2>
          </div>
          <ul className="ticklist">
            {studentGains.map((gain) => (
              <li key={gain}>
                <span>{gain}</span>
              </li>
            ))}
          </ul>
          <blockquote className="quote" style={{ marginTop: "3rem" }}>
            <p>{pullQuote.text}</p>
            <cite>
              <Tbd value={pullQuote.attribution} />
            </cite>
          </blockquote>
        </div>
      </section>

      <section className="band">
        <div className="shell">
          <div className="band-head">
            <span className="eyebrow">Who guides it</span>
            <h2>Advised by working chemists</h2>
          </div>
          <div className="grid grid--3">
            {instructors.map((person) => (
              <article className="card" key={person.slug}>
                <span className="card-tag">{person.role}</span>
                <h3>{person.name}</h3>
                <p>{person.affiliation}</p>
                <p>{person.teaches}</p>
              </article>
            ))}
          </div>
          <p style={{ marginTop: "2rem" }}>
            <Link className="btn btn--ghost" href="/instructors">
              Read full profiles
            </Link>
          </p>
        </div>
      </section>

      <section className="band band--plain">
        <div className="shell">
          <div className="callout">
            <span className="eyebrow" style={{ color: "rgba(238,241,236,0.65)" }}>
              Admissions
            </span>
            <h2>Applications for the next cohort</h2>
            <p>
              Every applicant has a required interview before a decision is
              made. We are looking for curiosity and follow-through, not a
              résumé.
            </p>
            <div className="actions">
              <Link className="btn" href="/apply">
                Start an application
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Disclaimer />
    </>
  );
}
