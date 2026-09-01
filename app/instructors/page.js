import Disclaimer from "@/components/Disclaimer";
import Tbd from "@/components/Tbd";
import { instructors, program } from "@/data/site";

export const metadata = {
  title: "Advisors",
  description:
    "The Vanderbilt University, Department of Chemistry advisors who guide the program, and the coordinator who runs it.",
};

function initials(name) {
  const parts = name.replace(/^(Prof\.|Dr\.|Ms\.|Mr\.)\s*/, "").split(" ");
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function InstructorsPage() {
  return (
    <>
      <section className="shell hero">
        <span className="eyebrow">Advisors</span>
        <h1 className="hero-short">Who guides the work</h1>
        <p className="lede hero-lede">
          Academic design, research training, and milestone feedback come from
          Vanderbilt University, Department of Chemistry. Scheduling, check-ins,
          and mentoring come from the program coordinator, so you always know who to
          ask.
        </p>
      </section>

      <section className="band">
        <div className="shell">
          {instructors.map((person) => (
            <article className="person" key={person.slug}>
              <div className="person-portrait">
                {person.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={`/instructors/${person.photo}`} alt={person.name} />
                ) : (
                  <span className="person-initials" aria-hidden="true">
                    {initials(person.name)}
                  </span>
                )}
              </div>
              <div>
                <h2>{person.name}</h2>
                <span className="person-role">
                  {person.role} · {person.affiliation}
                </span>
                <div className="person-body">
                  <p>{person.bio}</p>
                  <p style={{ color: "var(--slate)" }}>
                    <Tbd value={person.credentials} />
                  </p>
                  <ul className="taglist">
                    {person.focus.map((tag, i) => (
                      <li key={i}>
                        <Tbd value={tag} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="band band--raised">
        <div className="shell">
          <div className="band-head">
            <span className="eyebrow">Contacting the team</span>
            <h2>Who to email</h2>
            <p className="prose">
              Advisors do not field admissions or scheduling email directly.
              Send anything about applications, timing, or coursework to{" "}
              {program.contact.name} at{" "}
              <a href={`mailto:${program.contact.email}`}>
                {program.contact.email}
              </a>
              , and it will reach the right person.
            </p>
          </div>
        </div>
      </section>

      <Disclaimer />
    </>
  );
}
