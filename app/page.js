import Link from "next/link";
import ReactionCoordinate from "@/components/ReactionCoordinate";
import MoleculeGallery from "@/components/MoleculeGallery";
import EspLegend from "@/components/EspLegend";
import Disclaimer from "@/components/Disclaimer";
import Icon from "@/components/Icon";
import Tbd from "@/components/Tbd";
import { program, facts, studentGains, pullQuote, instructors } from "@/data/site";

const GAIN_ICONS = ["flask", "target", "abstract", "poster", "check"];

function initials(name) {
  const parts = name.replace(/^(Prof\.|Dr\.|Ms\.|Mr\.)\s*/, "").split(" ");
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function HomePage() {
  return (
    <>
      <section className="shell hero">
        <span className="eyebrow">
          {program.host} · Vanderbilt University, Department of Chemistry
        </span>
        <h1 className="hero-short">Explore how molecules work</h1>
        <div className="hero--split">
        <div>
          <p className="lede hero-lede">{program.anchorQuestion}</p>
          <div className="actions">
            <Link className="btn" href="/apply">
              Apply to the program
            </Link>
            <Link className="btn btn--ghost" href="/curriculum">
              See both stages
            </Link>
          </div>
        </div>

        <figure className="hero-figure">
          <div className="hero-pair">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/figures/trifluoroethanol.svg" alt="Trifluoroethanol structure" />
              <span>What you build</span>
            </div>
            <span className="hero-arrow" aria-hidden="true">→</span>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/figures/trifluoroethanol-esp.svg" alt="Trifluoroethanol electrostatic potential" />
              <span>What you compute</span>
            </div>
          </div>
          <figcaption>
            2,2,2-Trifluoroethanol <EspLegend />
          </figcaption>
        </figure>
        </div>
      </section>

      <section className="band band--raised">
        <div className="shell">
          <div className="band-head">
            <span className="eyebrow">Five shared molecules</span>
            <h2>Where every student starts</h2>
          </div>
          <MoleculeGallery />
        </div>
      </section>

      <section className="band">
        <div className="shell">
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
          <ReactionCoordinate />
        </div>
      </section>

      <section className="band band--raised">
        <div className="shell">
          <div className="band-head">
            <span className="eyebrow">What students gain</span>
            <h2>What students gain</h2>
          </div>
          <ul className="icon-grid">
            {studentGains.map((gain, i) => (
              <li key={gain}>
                <Icon name={GAIN_ICONS[i]} size={28} />
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
          <ul className="people">
            {instructors.map((person) => (
              <li key={person.slug}>
                <Link href="/instructors" className="person-chip">
                  <span className="avatar" aria-hidden="true">
                    {person.photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={`/instructors/${person.photo}`} alt="" />
                    ) : (
                      initials(person.name)
                    )}
                  </span>
                  <span>
                    <strong>{person.name}</strong>
                    <small>{person.role}</small>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band band--plain">
        <div className="shell">
          <div className="callout callout--image">
            <div>
              <span className="eyebrow" style={{ color: "rgba(238,241,236,0.65)" }}>
                Admissions
              </span>
              <h2>Applications for the next cohort</h2>
              <p>A short form and a required interview.</p>
              <div className="actions">
                <Link className="btn" href="/apply">
                  Start an application
                </Link>
              </div>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figures/benzene-esp.svg" alt="" aria-hidden="true" />
          </div>
        </div>
      </section>

      <Disclaimer />
    </>
  );
}
