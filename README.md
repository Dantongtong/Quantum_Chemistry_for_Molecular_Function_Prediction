# Quantum Chemistry for Molecular Function Prediction — program site

Next.js 15 (App Router) + React 19. No CSS framework — the whole visual system
is one stylesheet of CSS variables in `app/globals.css`, themed from the
Catalyst Society poster (forest green `#236240`, gold `#edb21a`).

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## The one file you edit

**`data/site.js`** holds every piece of copy on the site. The pages only render
it. Anything still unknown is wrapped in `TBD("...")` and shows on the page as
an orange dashed chip, so unfinished content is visible rather than silently
missing. To fill one in, delete the wrapper:

```js
cohortDates: TBD("Next cohort dates"),   // before
cohortDates: "June 10 – July 21, 2027",  // after
```

只改 `data/site.js`。`TBD("...")` 会显示成橙色虚线标记，确认信息后换成普通字符串即可。

Every fact in that file is annotated at the top with the project document it
came from, so it can be re-checked.

## Pages

| Route | What it covers |
|---|---|
| `/` | Structure → computed-charge hero, five-molecule gallery with a toggle, energy profile, what students gain, advisors |
| `/curriculum` | Stage 1 week by week, each with a figure or chart; Stage 2 as a Sunday-session timeline |
| `/instructors` | Three portrait cards (photos pending) |
| `/outcomes` | News board, research topics as image cards, deliverables, student feedback |
| `/apply` | Program flyer, who should apply, requirements, expectations and parent notes, FAQ |

The program-status disclaimer appears at the foot of **every** page via
`components/Disclaimer.js`, in the exact wording from the poster.

## Figures and how they were made

Every molecule picture and chart on the site is generated from real data, not
drawn by hand. The pipeline lives in `scripts/` and can be re-run:

```bash
pip install rdkit pyscf pyberny
python3 scripts/geometries.py   # 3D structures (RDKit, MMFF)
python3 scripts/qm.py           # B3LYP/6-31G* for the 5 shared molecules (~3 min)
python3 scripts/opt_trace.py    # step-by-step optimization of acetone, HF and DFT
python3 scripts/render.py       # writes public/figures/*.svg and data/computed.json
```

- **Ball-and-stick images** (`public/figures/<name>.svg`) use computed 3D
  geometries.
- **Electrostatic potential maps** (`<name>-esp.svg`) are the ESP computed at
  B3LYP/6-31G* on each molecule's van der Waals surface. Red is electron-rich,
  blue electron-poor, on one fixed scale for all five molecules.
- **Charts** on the Stages page read `data/computed.json`: HOMO/LUMO energies,
  dipole moments, and the energy at each step of a real geometry optimization.
  Values match known results (benzene dipole exactly 0; acetone 2.81 D vs 2.88 D
  measured).
- **Research-topic scenes** (PFAS, CO₂ capture, CH₂F + NO₂, OH + phenol,
  phenol with three waters, PET + phenol) are computed fragment structures
  placed together at chemically sensible distances to show the system each
  project studied. They are illustrations, not reproductions of any figure in
  the source papers, so there is no copyright concern.
- Computed with PySCF. Students use Psi4, which gives the same numbers at the
  same level of theory.

`public/brand/` holds the Catalyst Society mark and logo and the program flyer,
all cropped from `ProgramPoster.png`.

## Photos

Drop files in `public/instructors/`, then set `photo` in `data/site.js` to the
filename (e.g. `photo: "yang.jpg"`). Until then the site shows an initials
block, which reads as intentional rather than broken.

## Sections that were removed on request

Three modules were taken out of the pages but their data is still in
`data/site.js`, so any of them can be put back by re-adding the JSX block:

- **"Evidence, not attendance"** (was the `/outcomes` page opener) — replaced
  by the news board, which is now the page's lead.
- **"Everything runs in a browser"** (was on `/curriculum`) — `tools` is still
  exported and still renders on the home page under "Beyond the flask".
- **"From application to Week 1"** (was on `/apply`) — the `admissionSteps`
  export is intact but nothing renders it. The site no longer describes the
  application process anywhere; the poster's two steps are the only public
  account of it now.
- **Group size, duration and upcoming dates** — also removed everywhere (Sep
  2026): "Small-group", every week count ("6 weeks", "5 weeks", "6 + 5"),
  and every "Next cohort" date placeholder. The Week 1–6 headings and the
  Stage 2 session timeline stay, since they are the curriculum itself. The
  flyer image was edited to match: the "Small-group | 6 weeks" banner line and
  the "6-week authentic research training experience" bullet are gone, and the
  right column was re-spaced.
- **All cost and funding wording** — by decision in Sep 2026 the site says
  nothing about cost, price, or funding: the "$0" fact, the funding paragraph,
  "NSF-funded", and the FAQ "Is there a cost?" are gone, and the data strings
  were deleted rather than hidden. The flyer image (`public/brand/program-flyer.jpg`)
  was edited to match: the "A Fully Funded Opportunity" paragraph is blanked,
  "| NSF-funded" is cut from the banner, and the "NSF-funded for admitted
  students" bullet is removed. The original poster is unchanged in the project files.

## Design notes

- **Signature element:** the hero diagram draws the six weeks as a catalysed
  reaction — a dashed high-barrier path against a solid lowered-barrier path,
  with the three phases marked as stationary points. It is the same kind of
  figure students learn to read in Week 3, and the catalyst reading is not
  accidental given the organiser's name. See `components/ReactionCoordinate.js`.
- **Type:** Archivo (display), IBM Plex Sans (body), IBM Plex Mono (labels and
  data). Loaded via a stylesheet `<link>` in `app/layout.js` so the project
  builds without network access.
- **Colour:** gold appears in exactly three roles — the energy barrier, the
  active nav underline, and the primary action. Keep it rationed and it keeps
  meaning something.
- Responsive to 390px, visible keyboard focus, and the diagram animation
  respects `prefers-reduced-motion`.

## The news board

`/outcomes` opens with a news board driven by the `news` array in
`data/site.js`. Add an item by adding an object: `date`, `tag`, `title`, `body`,
and `attribution` (use `null` when there is no student to credit).

The IChO item is anonymised. Competition results are public record, but naming
a student here and tying them to the program is a separate permission, and a
guardian signs for anyone under 18. Replace the TBD chip once you have it.

Keep the framing honest. The wording says a student *in the cohort* won the
medal, not that the program produced it. A reader who notices the difference
will trust everything else on the page more.

## Research topics

The `researchTopics` export in `data/site.js` describes each project by the
question investigated rather than by paper title, so a parent reading the page
sees what a student actually did instead of a citation list. Every description
was written from the source paper's abstract and can be fact-checked against
the PDFs in the project folder — the CO₂ binding comparison, the barrierless
first step in the radical reaction, the six-pKa-unit solvation error, and the
hydrogen-bonding-over-π-stacking result on PET are all from those abstracts.

The section is worded as students working the question with their own
calculations. If some of these were presentation-only rather than a full
investigation, soften "This project" to "The paper" in the affected entries.

## Privacy — read before publishing student material

**No student names, emails, schools, or photos appear anywhere on this site,
and they should not be added.** The paper-selection spreadsheet in the project
contains four students' real names and email addresses; none of it is on the
site and none of it should be.

The recording-consent form covers recording during the program. It is **not**
permission to publish a named student's work, quote, or poster on a public
marketing page — that needs separate written consent, and a parent or guardian
signs for anyone under 18. The placeholders on `/outcomes` are worded to push
toward anonymised attribution by default.

Faculty email addresses are also deliberately not published; inquiries route
through the coordinator.

## Still needed — added with the image redesign

- [ ] **Three advisor photos.** The Advisors page is now built around portraits
      and shows "Photo needed" until you add them (square crop works best).
- [ ] **Stage 2 session topics 2–4.** The timeline labels for Sep 13, 20 and 27
      ("Narrowing to a research question", "Proposed approach", "Abstract final
      draft") are inferred from the email, which only says the first four weeks
      develop the question, approach and abstract. Confirm or correct them in
      `stage2.sessions` in `data/site.js`.

## Still needed

**Blocking — the site cannot launch without these**
- [ ] **The application form link is a closed form.** The URL on file ends in
      `/closedform`, which is what Google serves once a form stops accepting
      responses. `/apply` currently says so honestly and offers an email
      instead. When applications reopen, set `program.applyUrl` to the live
      `/viewform` URL and `program.applicationsOpen` to `true`.
- [ ] Application deadline, decision timeline, kickoff date
- [ ] Emma Liu's title for the public site

**Permission needed before launch**
- [ ] The three student quotes on `/` and `/outcomes` come from a thank-you
      letter a 2026 student sent privately to the advisors. It was not written
      as a testimonial. Get the student's written agreement to publish, and to
      the *edited* wording specifically, with a parent or guardian signing if
      they are under 18. Then decide whether the attribution is anonymised
      ("Student, 2026 cohort") or named, and replace the TBD chips.

**Needs a decision**
- [ ] The recommendation letter is **not** on the site. The poster lists only
      the form and the interview, and the poster is treated as the official
      wording. The proposal still asks for a STEM teacher letter — reconcile
      the two documents.
- [ ] How students advance into Stage 2: is every Stage 1 completer invited,
      or is it selective? `stage2.entryNote` is a placeholder until you say.
- [ ] Stage 1 already ends with a poster and presentation in Week 6, but the
      Stage 2 email describes Stage 1 as "foundational work" and Stage 2 as
      where projects are developed. Worth aligning the two descriptions.
- [ ] Interview length and format
- [ ] Certificate / completion recognition: format, issuer wording, whether
      advisor signatures appear. **This no longer appears anywhere on the
      site** — the recognition module was reduced to a single line under the
      deliverables list, and the certificate placeholder in
      `completion.certificate` is not rendered. Nothing on the page will remind
      you this is open, so it is tracked only here.
- [ ] Does Bravodium appear publicly? It is not on the poster, so the site
      currently credits Catalyst Society alone.
- [x] ~~Funding caveat~~ — moot: cost and funding are no longer on the site.
      If so, delete that placeholder line rather than filling it.

**Would strengthen the site**
- [ ] Advisor bios and titles, confirmed with each of them
- [ ] Advisor photos
- [ ] Journal and year for the five paper-presentation options
- [ ] Poster images or figures from the 2026 cohort, with permission
- [ ] A parent or advisor quote, with permission

## Corrections made from the project documents

The first draft of this site was built before the program documents were
available and got several things wrong. What changed:

| Was | Now |
|---|---|
| Tuition unknown | NSF-funded; ~$8,000 value; **no cost** to admitted students |
| Length unspecified | 6 weeks (poster). Note: the proposal text says both "10 weeks" and "5–6 weeks" — the poster and the 6-week map agree on 6 |
| Colab only | WebMO in Week 1; Psi4 via Colab notebooks from Week 2 |
| "Research paper" capstone | Poster + oral presentation + written summary |
| CH₂F+NO₂ and PFAS as curriculum | They are *reading* papers; the curriculum is the shared molecule set and each student's own project |
| Certificate promised | "Completion recognition based on participation and quality of work" |
| Vanderbilt framing implied endorsement | Explicit disclaimer on every page |
| Bravodium credited publicly | Catalyst Society only, per the poster |
| Indigo/amber palette | Catalyst Society forest green and gold |

Also added: the anchor question as the hero, the six-week map, NGSS HS-PS1-1
alignment, the design principles, participation expectations and the removal
policy, notes for parents, and the paper-presentation reading list.
