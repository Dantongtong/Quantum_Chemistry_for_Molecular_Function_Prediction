import Disclaimer from "@/components/Disclaimer";
import Tbd from "@/components/Tbd";
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
    "Eligibility, the application process, participation expectations, and notes for parents.",
};

export default function ApplyPage() {

  return (
    <>
      <section className="shell hero">
        <span className="eyebrow">Admissions</span>
        <h1 className="hero-short">Apply</h1>
        <p className="lede hero-lede">
          We are not simply looking for students with strong grades. We are
          looking for students who are genuinely curious, willing to think
          deeply, and prepared to engage seriously with the program.
        </p>
        <div className="hero-meta">
          <span>
            <Tbd value={program.cohortDates} />
          </span>
          <span>{program.format}</span>
        </div>
        {!program.applicationsOpen && (
          <p className="notice">{program.applicationsClosedNote}</p>
        )}
        <div className="actions">
          <a className={program.applicationsOpen ? "btn" : "btn btn--ghost"} href={program.applyUrl}>
            {program.applicationsOpen
              ? "Open the application form"
              : "View the application form"}
          </a>
          <a className="btn btn--ghost" href={`mailto:${program.contact.email}`}>
            Ask to be notified
          </a>
        </div>
      </section>

      <section className="band">
        <div className="shell">
          <div className="band-head">
            <span className="eyebrow">Who should apply</span>
            <h2>Who should apply</h2>
          </div>
          <ul className="ticklist">
            {whoShouldApply.map((item) => (
              <li key={item}>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band band--raised">
        <div className="shell">
          <div className="band-head">
            <span className="eyebrow">Requirements</span>
            <h2>What you need</h2>
            <p className="prose">{eligibility.who}</p>
          </div>
          <div className="grid grid--2">
            {eligibility.required.map((item) => (
              <article className="card" key={item.label}>
                <span className="card-tag">{item.label}</span>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
          <div style={{ marginTop: "2.5rem" }}>
            <span className="eyebrow">Preferred, but not required</span>
            <ul className="ticklist">
              {eligibility.preferred.map((item) => (
                <li key={item}>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="shell">
          <div className="band-head">
            <span className="eyebrow">What we expect</span>
            <h2>{expectations.heading}</h2>
            <p className="prose">{expectations.body}</p>
          </div>
          <ul className="ticklist">
            {expectations.items.map((item) => (
              <li key={item}>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="prose" style={{ marginTop: "1.75rem" }}>
            {expectations.policy}
          </p>
        </div>
      </section>

      <section className="band band--raised">
        <div className="shell">
          <div className="note-band">
            <span className="eyebrow">Notes for parents</span>
            <h2>Notes for parents</h2>
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

      <section className="band">
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
          <div className="callout">
            <h2>Still deciding?</h2>
            <p>
              Email the program contact. Parents are welcome to write on a
              student&rsquo;s behalf.
            </p>
            <p>
              {program.contact.name} —{" "}
              <a href={`mailto:${program.contact.email}`}>
                {program.contact.email}
              </a>
            </p>
          </div>
        </div>
      </section>

      <Disclaimer />
    </>
  );
}
