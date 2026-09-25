import Disclaimer from "@/components/Disclaimer";
import Tbd from "@/components/Tbd";
import Icon from "@/components/Icon";
import {
  program,
  eligibility,
  whoShouldApply,
  expectations,
  parentNotes,
  faqs,
} from "@/data/site";

export const metadata = {
  title: "Apply",
  description:
    "Who should apply, what you need, participation expectations, and notes for parents.",
};

const WHO_ICONS = ["flask", "target", "people", "book"];
const NEED_ICONS = { Knowledge: "book", Skills: "clock", Tools: "laptop", Attitude: "check" };

export default function ApplyPage() {
  return (
    <>
      <section className="shell hero hero--split">
        <div>
          <span className="eyebrow">Admissions</span>
          <h1 className="hero-short">Apply</h1>
          <p className="lede hero-lede">
            A short form and a required interview. We look for curiosity, not
            just grades.
          </p>
          {!program.applicationsOpen && (
            <p className="notice">{program.applicationsClosedNote}</p>
          )}
          <div className="actions">
            <a className={program.applicationsOpen ? "btn" : "btn btn--ghost"} href={program.applyUrl}>
              {program.applicationsOpen ? "Open the application form" : "View the application form"}
            </a>
            <a className="btn btn--ghost" href={`mailto:${program.contact.email}`}>
              Ask to be notified
            </a>
          </div>
        </div>
        <a className="flyer" href="/brand/program-flyer.jpg" target="_blank" rel="noreferrer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/program-flyer.jpg" alt="Program flyer for Quantum Chemistry for Molecular Function Prediction" />
          <span>Open the program flyer</span>
        </a>
      </section>

      <section className="band band--raised">
        <div className="shell">
          <div className="band-head">
            <span className="eyebrow">Who should apply</span>
            <h2>Who should apply</h2>
          </div>
          <ul className="icon-grid icon-grid--4">
            {whoShouldApply.map((item, i) => (
              <li key={item}>
                <Icon name={WHO_ICONS[i]} size={30} />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="band-head" style={{ marginTop: "3.5rem" }}>
            <span className="eyebrow">Requirements</span>
            <h2>What you need</h2>
          </div>
          <ul className="icon-grid icon-grid--4">
            {eligibility.required.map((item) => (
              <li key={item.label}>
                <Icon name={NEED_ICONS[item.label]} size={30} />
                <strong>{item.label}</strong>
                <span>{item.body}</span>
              </li>
            ))}
          </ul>
          <p className="footnote">
            Preferred, not required: {eligibility.preferred.join(" · ")}.
          </p>
        </div>
      </section>

      <section className="band">
        <div className="shell two-col">
          <div>
            <span className="eyebrow">What we expect</span>
            <h2 className="h2-sm">{expectations.heading}</h2>
            <ul className="ticklist">
              {expectations.items.map((item) => (
                <li key={item}>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="footnote">{expectations.policy}</p>
          </div>
          <div className="note-band">
            <span className="eyebrow">Notes for parents</span>
            <h2 className="h2-sm">Notes for parents</h2>
            <ul className="ticklist">
              {parentNotes.map((note) => (
                <li key={note}>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="band band--raised">
        <div className="shell">
          <div className="band-head">
            <span className="eyebrow">Questions</span>
            <h2>Common questions</h2>
          </div>
          <div className="faq">
            {faqs.map((faq, i) => (
              <details key={i}>
                <summary>{faq.q}</summary>
                <p>
                  <Tbd value={faq.a} />
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="band band--plain">
        <div className="shell">
          <div className="callout callout--image">
            <div>
              <h2>Still deciding?</h2>
              <p>Parents are welcome to write on a student&rsquo;s behalf.</p>
              <p>
                {program.contact.name} —{" "}
                <a href={`mailto:${program.contact.email}`}>{program.contact.email}</a>
              </p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figures/water-esp.svg" alt="" aria-hidden="true" />
          </div>
        </div>
      </section>

      <Disclaimer />
    </>
  );
}
