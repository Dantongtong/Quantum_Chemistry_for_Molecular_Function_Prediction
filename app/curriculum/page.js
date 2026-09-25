import Disclaimer from "@/components/Disclaimer";
import Tbd from "@/components/Tbd";
import WeekFigure from "@/components/WeekFigure";
import Stage2Timeline from "@/components/Stage2Timeline";
import Icon from "@/components/Icon";
import { program, stage1, stage1Weeks, stage2, stages } from "@/data/site";

export const metadata = {
  title: "Stages",
  description:
    "Stage 1: a shared foundation ending in a capstone poster. Stage 2: individual research and an ACS abstract.",
};

export default function CurriculumPage() {
  return (
    <>
      <section className="shell hero">
        <span className="eyebrow">The program</span>
        <h1 className="hero-short">Two stages, one question</h1>
        <ol className="stage-strip">
          {stages.map((s) => (
            <li key={s.n}>
              {s.meta && <span className="stage-strip-meta">{s.meta}</span>}
              <strong>{s.label}</strong>
              <span>{s.body}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="band band--raised" id="stage-1">
        <div className="shell">
          <div className="band-head">
            <div className="stage-head">
              <span className="stage-badge">{stage1.name}</span>
              <span className="stage-meta">{program.weeklyLoad}</span>
            </div>
            <h2>{stage1.title}</h2>
            <p className="stage-meta">{stage1.lede}</p>
          </div>

          <ol className="weeks-visual">
            {stage1Weeks.map((week) => (
              <li className="wv" key={week.n}>
                <div className="wv-text">
                  <span className="week-n">Week {week.n}</span>
                  <h3>{week.title}</h3>
                  <p>{week.body}</p>
                  <ul className="taglist">
                    {week.concepts.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                  <span className="wv-deliverable">
                    <Icon name="check" size={16} /> {week.deliverable}
                  </span>
                </div>
                <div className="wv-figure">
                  <WeekFigure name={week.figure} />
                </div>
              </li>
            ))}
          </ol>
          <p className="footnote">
            Charts and molecular surfaces on this page are real B3LYP/6-31G*
            results for the shared molecules — the same setup students use.
          </p>
        </div>
      </section>

      <section className="band" id="stage-2">
        <div className="shell">
          <div className="band-head">
            <div className="stage-head">
              <span className="stage-badge">{stage2.name}</span>
            </div>
            <h2>{stage2.title}</h2>
            <p className="prose">{stage2.lede}</p>
          </div>
          <Stage2Timeline />
          <p className="stage-meta" style={{ marginTop: "1.5rem" }}>
            First cohort: {stage2.ran}
          </p>
          <p className="stage-meta">
            {stage2.entry}
          </p>
        </div>
      </section>

      <Disclaimer />
    </>
  );
}
