import Disclaimer from "@/components/Disclaimer";
import Tbd from "@/components/Tbd";
import { instructors, program, TBD } from "@/data/site";

const PHOTO_TBD = TBD("Photo needed");

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
      </section>

      <section className="band band--plain">
        <div className="shell">
          <ul className="portraits">
            {instructors.map((person) => (
              <li className="portrait" key={person.slug}>
                <div className="portrait-img">
                  {person.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={`/instructors/${person.photo}`} alt={person.name} />
                  ) : (
                    <>
                      <span className="person-initials" aria-hidden="true">
                        {initials(person.name)}
                      </span>
                      <span className="portrait-tbd">
                        <Tbd value={PHOTO_TBD} />
                      </span>
                    </>
                  )}
                </div>
                <span className="person-role">{person.role}</span>
                <h2>{person.name}</h2>
                <p className="portrait-aff">{person.affiliation}</p>
                <p>{person.bio}</p>
                <ul className="taglist">
                  {person.focus.map((tag, i) => (
                    <li key={i}>
                      <Tbd value={tag} />
                    </li>
                  ))}
                </ul>
                <p className="portrait-cred">
                  <Tbd value={person.credentials} />
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band band--raised">
        <div className="shell">
          <div className="band-head">
            <span className="eyebrow">Contacting the team</span>
            <h2>Who to email</h2>
            <p className="prose">
              All questions go to {program.contact.name},{" "}
              <a href={`mailto:${program.contact.email}`}>{program.contact.email}</a>.
            </p>
          </div>
        </div>
      </section>

      <Disclaimer />
    </>
  );
}
