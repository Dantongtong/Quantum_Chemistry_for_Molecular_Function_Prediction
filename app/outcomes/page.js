import Disclaimer from "@/components/Disclaimer";
import Tbd from "@/components/Tbd";
import {
  news,
  deliverables,
  researchTopics,
  outcomes,
  testimonials,
  completion,
} from "@/data/site";

export const metadata = {
  title: "Student work",
  description:
    "What students produce: weekly computational lab notebooks, a journal paper presentation, a project proposal, and a capstone poster and talk.",
};

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
                <div className="newsitem-meta">
                  <span className="newsitem-tag">{item.tag}</span>
                  <span className="newsitem-date">
                    <Tbd value={item.date} />
                  </span>
                </div>
                <div>
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

      <section className="band">
        <div className="shell">
          <div className="factrow">
            {outcomes.map((item) => (
              <div key={item.label}>
                <span className="fact-value">
                  <Tbd value={item.value} />
                </span>
                <span className="fact-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band band--raised">
        <div className="shell">
          <div className="band-head">
            <span className="eyebrow">Deliverables</span>
            <h2>What students finish with</h2>
          </div>
          <div className="grid grid--2">
            {deliverables.map((item) => (
              <article className="card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
          <p className="footnote">{completion.note}</p>
        </div>
      </section>

      <section className="band">
        <div className="shell">
          <div className="band-head">
            <span className="eyebrow">Research topics</span>
            <h2>What students investigated</h2>
            <p className="prose">
              Every project starts from a paper in the current literature, but
              reading it is only the entry point. Students work the same
              question with their own calculations — which means understanding
              why the original authors chose the methods they did, and what the
              numbers were actually evidence for.
            </p>
          </div>

          <article className="topic topic--shared">
            <span className="card-tag">{researchTopics.shared.tag}</span>
            <h3>{researchTopics.shared.title}</h3>
            <p>{researchTopics.shared.body}</p>
            <ul className="taglist">
              {researchTopics.shared.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </article>

          <div className="topics">
            {researchTopics.projects.map((topic) => (
              <article className="topic" key={topic.title}>
                <span className="card-tag">{topic.tag}</span>
                <h3>{topic.title}</h3>
                <p>{topic.body}</p>
                <ul className="taglist">
                  {topic.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
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
