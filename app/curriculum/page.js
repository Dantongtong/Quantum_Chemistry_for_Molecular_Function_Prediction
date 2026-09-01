import Link from "next/link";
import Disclaimer from "@/components/Disclaimer";
import Tbd from "@/components/Tbd";
import {
  program,
  stage1,
  stage1Weeks,
  stage2,
  stages,
  designNotes,
} from "@/data/site";

export const metadata = {
  title: "Stages",
  description:
    "Stage 1 is six weeks of shared foundation ending in a capstone poster. Stage 2 is five weeks of individual research and an ACS abstract submission.",
};

export default function CurriculumPage() {
  return (
    <>
      <section className="shell hero">
        <span className="eyebrow">The program</span>
        <h1 className="hero-short">Two stages, one question</h1>
        <p className="lede hero-lede">
          Stage 1 builds a shared foundation and ends with a capstone
          presentation. Stage 2 turns that foundation into an individual
          research project and an abstract submitted to the American Chemical
          Society.
        </p>
        <div className="hero-meta">
          <span>{program.weeklyLoad}</span>
          <span>Aligned to NGSS HS-PS1-1</span>
        </div>
      </section>

      <section className="band">
        <div className="shell">
          <div className="band-head">
            <span className="eyebrow">The arc</span>
            <h2>Shared inquiry, then ownership</h2>
          </div>
          <div className="grid grid--3">
            {stages.map((stage) => (
              <article className="card" key={stage.n}>
                <span className="card-tag">{stage.meta}</span>
                <h3>{stage.label}</h3>
                <p>{stage.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* STAGE 1                                                           */}
      {/* ---------------------------------------------------------------- */}
      <section className="band band--raised" id="stage-1">
        <div className="shell">
          <div className="band-head">
            <div className="stage-head">
              <span className="stage-badge">{stage1.name}</span>
              <span className="stage-meta">
                {stage1.length} · {stage1.format}
              </span>
            </div>
            <h2>{stage1.title}</h2>
            <p className="prose">{stage1.lede}</p>
            <p className="stage-meta">
              Next cohort: <Tbd value={stage1.dates} /> · First cohort ran{" "}
              {stage1.ran}
            </p>
          </div>

          {stage1Weeks.map((week) => (
            <article className="week" key={week.n}>
              <span className="week-n">Week {week.n}</span>
              <div>
                <h3>{week.title}</h3>
                <span className="week-theme">{week.theme}</span>
                <p className="week-body">{week.body}</p>
                <ul className="taglist">
                  {week.concepts.map((concept) => (
                    <li key={concept}>{concept}</li>
                  ))}
                </ul>
                <dl className="week-foot">
                  <div>
                    <dt>Deliverable</dt>
                    <dd>{week.deliverable}</dd>
                  </div>
                  <div>
                    <dt>Independent work</dt>
                    <dd>{week.hours}</dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* STAGE 2                                                           */}
      {/* ---------------------------------------------------------------- */}
      <section className="band" id="stage-2">
        <div className="shell">
          <div className="band-head">
            <div className="stage-head">
              <span className="stage-badge">{stage2.name}</span>
              <span className="stage-meta">{stage2.length}</span>
            </div>
            <h2>{stage2.title}</h2>
            <p className="prose">{stage2.lede}</p>
            <p className="stage-meta">
              Next cohort: <Tbd value={stage2.dates} /> · First cohort ran{" "}
              {stage2.ran} · {stage2.meeting}
            </p>
          </div>

          <div className="grid grid--3">
            {stage2.focus.map((item) => (
              <article className="card" key={item}>
                <p>{item}</p>
              </article>
            ))}
          </div>

          <p className="prose" style={{ marginTop: "2.5rem" }}>
            {stage2.arc}
          </p>

          <dl className="milestones" style={{ marginTop: "2rem" }}>
            {stage2.milestones.map((m) => (
              <div className="milestone" key={m.when}>
                <dt>{m.when}</dt>
                <dd>{m.what}</dd>
              </div>
            ))}
          </dl>

          <p className="prose" style={{ marginTop: "2.5rem" }}>
            {stage2.platform} {stage2.entry}
          </p>
          <p className="prose">
            <Tbd value={stage2.entryNote} />
          </p>
        </div>
      </section>

      <section className="band">
        <div className="shell">
          <div className="note-band">
            <span className="eyebrow">{designNotes.eyebrow}</span>
            <h2>{designNotes.heading}</h2>
            <p className="prose">{designNotes.body}</p>
            <p>
              <Link className="btn btn--ghost" href="/outcomes">
                See what students produce
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Disclaimer />
    </>
  );
}
