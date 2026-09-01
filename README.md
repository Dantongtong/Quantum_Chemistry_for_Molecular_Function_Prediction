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
| `/` | Anchor question, energy-profile diagram, software, design approach, what students gain, advisors, funding |
| `/curriculum` | Stage 1 week by week, then Stage 2 with its meeting time and ACS milestones, design principles |
| `/instructors` | Advisor and coordinator profiles |
| `/outcomes` | News board, weekly deliverables, research topics, student feedback |
| `/apply` | Who should apply, requirements, participation expectations and removal policy, notes for parents, FAQ |

The program-status disclaimer appears at the foot of **every** page via
`components/Disclaimer.js`, in the exact wording from the poster.

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
- **"Admitted students participate at no cost"** (was on `/apply`, and the
  funding wording was also removed from the home-page call to action) — the
  `program.funding` strings are intact. Note that the FAQ still answers "Is
  there a cost?" with the full NSF funding explanation, so the claim has not
  left the site entirely. Remove that FAQ entry too if the intent was to stop
  advertising the funding.

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

## Still needed

**Blocking — the site cannot launch without these**
- [ ] **The application form link is a closed form.** The URL on file ends in
      `/closedform`, which is what Google serves once a form stops accepting
      responses. `/apply` currently says so honestly and offers an email
      instead. When applications reopen, set `program.applyUrl` to the live
      `/viewform` URL and `program.applicationsOpen` to `true`.
- [ ] Next cohort dates for Stage 1 and Stage 2
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
- [ ] Funding caveat — is there genuinely no cost at all to admitted students?
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
