import Disclaimer from "@/components/Disclaimer";
import Tbd from "@/components/Tbd";
import Icon from "@/components/Icon";
import {
  news,
  deliverables,
  researchTopics,
  testimonials,
  completion,
} from "@/data/site";

export const metadata = {
  title: "Student work",
  description:
    "Cohort news, the research topics students investigated, and what every student finishes with.",
};

function TopicCard({ topic, featured = false }) {
  return (
    <article className={featured ? "tcard tcard--featured" : "tcard"}>
      <div className="tcard-img">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/figures/${topic.figure}.svg`} alt="" aria-hidden="true" />
      </div>
      <div className="tcard-body">
        <span className="card-tag">{topic.tag}</span>
        <h3>{topic.title}</h3>
        <p>{topic.body}</p>
        <ul className="taglist">
          {topic.skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function OutcomesPage() {
  return (
    <>
      <section className="shell hero">
        <span className="eyebrow">Student work</span>
        <h1 className="hero-short">News from the cohort</h1>
      </section>

      <section className="band band--plain">
        <div className="shell">
          <ol className="newsboard">
            {news.map((item) => (
              <li className="newsitem" key={item.title}>
                <span className="newsitem-icon">
                  <Icon name={item.icon} size={30} />
                </span>
                <div>
                  <div className="newsitem-meta">
                    <span className="newsitem-tag">{item.tag}</span>
                    <span className="newsitem-date">
                      <Tbd value={item.date} />
                    </span>
                  </div>
                  <h2>{item.title}</h2>
                  <p>{item.body}</p>
                  {item.attribution && (
                    <p className="newsitem-attr">
                      <Tbd value={item.attribution} />
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="band band--raised">
        <div className="shell">
          <div className="band-head">
            <span className="eyebrow">Research topics</span>
            <h2>What students investigated</h2>
            <p className="prose">
              Each project starts from a current research paper and is worked
              through with the students&rsquo; own calculations.
            </p>
          </div>
          <div className="tgrid">
            <TopicCard topic={researchTopics.shared} featured />
            {researchTopics.projects.map((topic) => (
              <TopicCard topic={topic} key={topic.title} />
            ))}
          </div>
          <p className="footnote">
            Molecules drawn from computed 3D structures of each system studied.
            Gold dashes mark the interaction at the heart of each project.
          </p>
        </div>
      </section>

      <section className="band">
        <div className="shell">
          <div className="band-head">
            <span className="eyebrow">Deliverables</span>
            <h2>What students finish with</h2>
          </div>
          <ul className="icon-grid icon-grid--4">
            {deliverables.map((item) => (
              <li key={item.title}>
                <Icon name={item.icon} size={30} />
                <strong>{item.title}</strong>
                <span>{item.body}</span>
              </li>
            ))}
          </ul>
          <p className="footnote">{completion.note}</p>
        </div>
      </section>

      <section className="band band--raised">
        <div className="shell">
          <div className="band-head">
            <span className="eyebrow">In their words</span>
            <h2>Student feedback</h2>
          </div>
          <div className="grid grid--2">
            {testimonials.map((item, i) => (
              <blockquote className="quote" key={i}>
                <p>
                  <Tbd value={item.quote} />
                </p>
                <cite>
                  <Tbd value={item.attribution} />
                </cite>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <Disclaimer />
    </>
  );
}
