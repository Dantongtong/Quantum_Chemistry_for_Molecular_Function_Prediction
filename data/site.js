// ---------------------------------------------------------------------------
// EDIT THIS FILE, NOT THE PAGES.
//
// Every piece of copy on the site lives here. Anything wrapped in TBD("...")
// renders as an orange dashed chip in the browser, so unfinished content is
// impossible to miss. Replace it with a plain string when you have the value.
//
// 只改这个文件就够了。TBD("...") 会在页面上显示成橙色虚线标记。
//
// OFFICIAL WORDING: the disclaimer, funding paragraph, program highlights,
// "who should apply", "what students gain", and the application steps are
// copied from the Catalyst Society program poster and should stay in sync with
// it. If the poster changes, change these strings — not the pages.
//
// WHERE THE FACTS COME FROM:
//   ProgramPoster.png ................ official public wording, funding,
//                                      disclaimer, application steps
//   Stage 2 announcement email ....... Stage 2 dates, meeting time, ACS deadline
//   QCMFP_6Week_Map.docx ............. Stage 1 week-by-week arc
//   Week1/2/3 assignment docs ........ software, molecules, methods
//   QCMFP_DesignPrinciples.docx ...... anchor question, pedagogy
//   Proposal_Edits.docx .............. eligibility, participation policy
// ---------------------------------------------------------------------------

export const TBD_PREFIX = "__TBD__";
export const TBD = (label) => `${TBD_PREFIX}${label}`;

export const program = {
  name: "Quantum Chemistry for Molecular Function Prediction",
  shortName: "Quantum Chemistry for Molecular Function Prediction",
  // Poster wording.
  subtitle: "A research opportunity for highly motivated high school students",
  guidedBy:
    "Guided by Prof. Zhongyue John Yang, Vanderbilt University, Department of Chemistry",
  badge: "Small-group · 6 weeks · NSF-funded",
  host: "Catalyst Society",
  lede:
    "In this program, students explore a key idea: a molecule's function often follows from its electronic structure — and computation is now a core tool for working that out.",
  anchorQuestion:
    "How does electronic structure shape what a molecule does?",
  // Poster: "Explore How Molecules Work".
  explore:
    "Why are some molecules more stable than others? Why do some molecules bind more strongly to biological targets? Why do certain materials behave differently under the same conditions?",
  format: "Small-group · virtual",
  weeklyLoad: "About 5–6 hours of independent work per week",
  priorCohort: "Stage 1 of the first cohort ran June 11 – July 22, 2026.",
  cohortDates: "September, 2026",

  applyUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSemPMUWtIvbjtGYWgEUC_WvzhkeEgFC6A0i69FteCrPMG35AQ/closedform",
  // The URL above ends in /closedform, which is what Google serves when a form
  // has stopped accepting responses. Set this to true and swap in the live
  // /viewform URL when applications reopen.
  applicationsOpen: true,
  applicationsClosedNote:
    "Applications for the next cohort are not open yet. The form below shows the most recent application; check back or email us to be notified when it reopens.",

  contact: {
    name: "Emma Liu",
    email: "emma@bravodium.com",
    role: TBD("Emma's title for the public site — 'Program Contact'?"),
  },

  // Poster wording, verbatim. Do not paraphrase.
  disclaimer:
    "This is not an official Vanderbilt University program and does not constitute Vanderbilt University sponsorship, certification, academic credit, or admissions endorsement.",

  funding: {
    headline: "A fully funded opportunity",
    body:
      "Program value is approximately $8,000 per student. Admitted students participate at no cost through NSF funding.",
  },
};

// Poster: "Program Highlights".
export const highlights = [
  "Guided by a Vanderbilt University professor",
  "6-week authentic research training experience",
  "A pathway to further research mentorship",
];

// Poster: "Who Should Apply".
export const whoShouldApply = [
  "Strongly interested in chemistry, biomedicine, materials science, computation, or related STEM areas",
  "Ready for meaningful academic challenge",
  "Willing to participate actively in a group-based learning environment",
  "Interested in authentic research exposure rather than résumé padding",
];

// Poster: "What Students Gain".
export const studentGains = [
  "A stronger understanding of computational chemistry and interdisciplinary STEM research",
  "Exposure to how scientific questions are framed and investigated",
  "A clearly defined research question and a preliminary set of findings",
  "A poster or equivalent research presentation",
  "Stronger habits in scientific thinking, communication, and execution",
];

// ---------------------------------------------------------------------------
// THE TWO STAGES
//
// Stage 1 is the 6-week program on the poster. Stage 2 is the "pathway to
// further research mentorship" that poster line refers to: students who
// complete Stage 1 continue into individual research and an ACS abstract.
// ---------------------------------------------------------------------------

// Drives the hero energy diagram. Three stationary points: the Stage 1 climb,
// the point between stages, and Stage 2.
export const stages = [
  {
    n: 1,
    label: "Stage 1 · Foundations",
    body:
      "Six weeks of shared inquiry. Everyone works the same molecule set, learns the same software workflow, and builds the common language a research conversation needs.",
    meta: "6 weeks",
  },
  {
    n: 2,
    label: "Between stages",
    body:
      "Stage 1 ends with a capstone presentation. Students who complete it and show the potential and commitment to go further continue into Stage 2.",
    meta: "By invitation",
  },
  {
    n: 3,
    label: "Stage 2 · Research",
    body:
      "Five weeks developing an individual research project, preparing an ACS abstract submission, and beginning the transition into conducting the research itself.",
    meta: "5 weeks",
  },
];

export const stage1 = {
  name: "Stage 1",
  title: "Foundations and shared inquiry",
  length: "6 weeks",
  format: "Small-group, virtual",
  lede:
    "Everyone starts in the same place, on the same five molecules, with the same software. Weeks 1–3 build the shared foundation. Weeks 4–5 are the project phase. Week 6 is the capstone.",
  dates: TBD("Stage 1 dates for the next cohort"),
  ran: "June 11 – July 22, 2026",
  outcome: "A research poster, an oral presentation, and a written summary.",
};

export const stage1Weeks = [
  {
    n: 1,
    title: "Foundations",
    theme: "Structure gives clues, but computation gives deeper evidence",
    body:
      "Atoms, orbitals, and the periodic table through a quantum lens. Build and look up the five shared molecules in WebMO, clean them up, inspect them in 3D, log bond lengths, angles, and dihedrals, and export XYZ coordinates. Then review Psi4 snapshots of 2,2,2-trifluoroethanol to see what a calculation shows that a static structure cannot.",
    concepts: [
      "Molecular representations",
      "Functional groups",
      "Bond polarity vs. molecular polarity",
      "Why structural models are incomplete",
    ],
    deliverable: "Shared comparison checkpoint and Psi4 preview notes",
    hours: "About 5–6 hours",
  },
  {
    n: 2,
    title: "The quantum chemistry toolbox",
    theme: "Computation refines structure and produces evidence",
    body:
      "What a calculation actually does: the Schrödinger equation, basis sets, and DFT in plain language. Run your first geometry optimizations — one Hartree–Fock and one DFT calculation per molecule, with the method and basis set chosen on purpose — then compare starting, optimized, and experimental geometries.",
    concepts: [
      "HF vs. DFT",
      "STO-3G, 6-31G, 6-31G*",
      "Geometry optimization",
      "Comparing to experiment",
    ],
    deliverable: "Computational lab notebook",
    hours: "About 5–6 hours",
  },
  {
    n: 3,
    title: "Interpreting results",
    theme: "Computational outputs as evidence for chemical interpretation",
    body:
      "Extract chemical meaning from output: HOMO and LUMO energies, the HOMO–LUMO gap, Mulliken partial charges, dipole moments, and electrostatic potential maps. The setup is fixed at B3LYP/6-31G* for every molecule, so differences between molecules are differences in chemistry, not in settings.",
    concepts: [
      "Frontier orbitals",
      "Partial charges",
      "Electrostatic potential maps",
      "Interpreting output as evidence",
    ],
    deliverable: "Descriptor comparison checkpoint",
    hours: "About 5–6 hours",
  },
  {
    n: 4,
    title: "From descriptors to prediction",
    theme: "Project launch",
    body:
      "The shared phase ends and the project begins. Narrow a researchable question, choose a focal molecule or molecular family and one or two comparison molecules, and decide which computational outputs will actually serve as evidence for the question you picked.",
    concepts: [
      "Scoping a question",
      "Choosing comparison sets",
      "Selecting evidence",
    ],
    deliverable: "Project proposal",
    hours: "About 5–6 hours",
  },
  {
    n: 5,
    title: "Analysis and interpretation",
    theme: "Evidence supports a focused claim",
    body:
      "Sustained project time. Run the calculations, interpret the outputs, compare focal and comparison molecules, draft the figures, build a claim from the evidence, and be honest about limitations and remaining questions. Revising scope is allowed and often correct.",
    concepts: [
      "Claim, evidence, reasoning",
      "Selecting the strongest outputs",
      "Limitations and uncertainty",
    ],
    deliverable: "Project analysis draft",
    hours: "About 5–6 hours",
  },
  {
    n: 6,
    title: "Capstone and presentation",
    theme: "Work is not finished until it is communicated",
    body:
      "Organize a focused argument, select the evidence that carries it, and present the question, findings, limitations, and next steps. Stage 1 ends with a real performance task rather than a final content quiz.",
    concepts: [
      "Scientific storytelling",
      "Organizing an argument",
      "Communicating limits and next steps",
    ],
    deliverable: "Research poster, oral presentation, and written summary",
    hours: "About 5 hours",
  },
];

export const stage2 = {
  name: "Stage 2",
  title: "Research and the ACS abstract",
  length: "5 weeks",
  lede:
    "Stage 2 moves from the foundational work of Stage 1 into developing your own research project. Sunday sessions combine live workshops, research discussions, and project development, with research tasks to work on between meetings as the project takes shape.",
  meeting: "Sundays, 1:00–2:00 PM PST / 3:00–4:00 PM CST, on Zoom",
  ran: "September 6 – October 4, 2026",
  dates: TBD("Stage 2 dates for the next cohort"),
  platform: "Materials and resources are posted in a Stage 2 Google Classroom.",
  focus: [
    "Developing your individual research project",
    "Preparing the ACS abstract submission",
    "Beginning the transition into conducting your research",
  ],
  arc:
    "The first meeting starts with literature searching and research idea generation: how to search the scientific literature, identify areas that interest you, recognize possible research questions, and narrow those ideas into project directions. The first four weeks focus heavily on developing and refining the research question, the proposed approach, and the abstract. The final meeting reviews where each project stands after submission and discusses the next phase of the research.",
  milestones: [
    {
      when: "Week 1",
      what: "Literature searching and research idea generation",
    },
    {
      when: "Weeks 1–4",
      what: "Refining the research question, the proposed approach, and the abstract",
    },
    { when: "Week 4", what: "ACS abstract submission deadline" },
    {
      when: "Week 5",
      what: "Review of where projects stand after submission, and the next phase of research",
    },
  ],
  entry:
    "Stage 2 is not a separate application. Students advance from Stage 1.",
  entryNote: TBD(
    "How advancement is decided — is every Stage 1 completer invited, or is it selective? State it plainly here"
  ),
};

export const tools = [
  {
    name: "WebMO",
    body:
      "Week 1. Look up and build molecules, clean up structures, measure bond lengths, angles, and dihedrals, and export XYZ coordinates.",
  },
  {
    name: "Psi4, in Google Colab",
    body:
      "Weeks 2 onward. The quantum chemistry engine behind every optimization and property calculation, run from guided notebooks so nothing needs installing.",
  },
  {
    name: "A browser",
    body:
      "That is the whole hardware requirement. A reliable computer and an internet connection are enough.",
  },
];

export const designNotes = {
  eyebrow: "How it is built",
  heading: "A research progression",
  body:
    "The curriculum is designed backward from what students should be able to do at the end, and organized around one anchor question rather than a sequence of software tutorials. Molecules are taught in comparison sets, because function is rarely visible in a single structure — it shows up in what changes when one substituent changes. Every computational tool is introduced to answer a chemical question, not as a skill to acquire.",
  points: [
    "Anchored in one chemical question for all six weeks",
    "Comparison sets, not isolated example molecules",
    "Increasing student choice: shared work first, individual inquiry later",
    "Aligned to NGSS HS-PS1-1",
    "Assessed on explanation and prediction, not recall or software steps",
    "High ceiling with scaffolding, because the cohort is strong but unevenly prepared",
  ],
};

export const facts = [
  { value: "6 + 5", label: "Weeks across Stage 1 and Stage 2" },
  { value: "5–6 hrs", label: "Independent work per week" },
  { value: "5", label: "Shared molecules everyone analyzes" },
];

// ---------------------------------------------------------------------------
// PEOPLE
// Photos: drop files in /public/instructors/ and set `photo` to the filename.
// Advisor emails are deliberately not published — inquiries route to the
// program contact above.
// ---------------------------------------------------------------------------
export const instructors = [
  {
    slug: "yang",
    name: "Prof. Zhongyue John Yang",
    role: "Academic Advisor",
    affiliation: "Vanderbilt University, Department of Chemistry",
    photo: null,
    focus: [
      "Computational chemistry",
      "Molecular function prediction",
      "Research training",
    ],
    bio:
      "Professor Yang is directly involved in the academic design of the program, research training, and milestone feedback, guiding students through the study of quantum chemistry and molecular function prediction.",
    credentials: TBD(
      "Lab name, research area, notable work — confirm wording with him before publishing"
    ),
  },
  {
    slug: "cunningham",
    name: "Ms. Kendra Cunningham",
    role: "Academic Advisor",
    affiliation: "Vanderbilt University, Department of Chemistry",
    photo: null,
    focus: [
      "Curriculum design",
      "Chemistry education",
      "Scientific reading and writing",
    ],
    bio:
      "Ms. Cunningham shapes the week-by-week curriculum and the assignments students actually work through, including the reading guides that teach students to read a research paper in purposeful passes rather than straight through. She leads the Stage 2 research workshops.",
    credentials: TBD("Title and background — confirm wording with her"),
  },
  {
    slug: "zhu",
    name: "Ms. Dantong Zhu",
    role: "Program Coordinator",
    affiliation: "Catalyst Society",
    photo: null,
    focus: ["Student mentoring", "Check-in sessions", "Applicant interviews"],
    bio:
      "Runs the day-to-day program: scheduling, weekly check-ins, applicant interviews, and one-on-one mentoring across both stages.",
    credentials: TBD("Background / affiliation detail"),
  },
];

// ---------------------------------------------------------------------------
// STUDENT WORK
//
// PRIVACY GATE — no student names, emails, schools, or photos on this site.
// The recording-consent form covers program recordings; publishing a named
// student's work publicly is a separate permission, and for anyone under 18 it
// needs a parent or guardian's written consent.
//
// 隐私红线：网站上不要出现学生姓名、邮箱、学校、照片。
// ---------------------------------------------------------------------------

export const outcomes = [
  { value: "6", label: "Weekly deliverables, each revised after feedback" },
  { value: "1", label: "Independent research question per student" },
  { value: "1", label: "ACS abstract submission in Stage 2" },
];

// ---------------------------------------------------------------------------
// NEWS BOARD
//
// Same privacy gate as the quotes below: competition results are public record,
// but naming a student on this site and tying them to the program is a separate
// permission — and a parent or guardian signs for anyone under 18. Items are
// anonymised until that permission is on file.
//
// Keep the framing honest: the program did not produce these results, it has
// students who achieve them. Claiming credit for an IChO medal would be a
// stretch no one who reads carefully will miss.
//
// 新闻板同样适用隐私红线：竞赛成绩虽是公开记录，但在网站上具名并与项目关联
// 需要单独许可，未成年需家长签字。
// ---------------------------------------------------------------------------
export const news = [
  {
    date: TBD("Exact date — IChO 2026, Tashkent, Uzbekistan"),
    tag: "Cohort news",
    title: "A student won an IChO gold medal",
    body:
      "A member of the 2026 cohort competed at the International Chemistry Olympiad in Uzbekistan and came home with a gold medal, finishing 13th by total score. They rejoined the program the same week and presented their paper on schedule.",
    attribution: TBD(
      "Confirm written permission before naming the student — guardian signs if under 18. Otherwise leave this anonymised"
    ),
  },
  {
    date: "July 2026",
    tag: "Stage 1",
    title: "The first cohort finished Stage 1",
    body:
      "Six weeks after starting on the same five molecules, every student presented an individual project: the question, the evidence, the interpretation, and the limitations.",
    attribution: null,
  },
  {
    date: "September 2026",
    tag: "Stage 2",
    title: "Stage 2 began, aimed at an ACS abstract",
    body:
      "Students advancing from Stage 1 started five weeks of individual research development, working toward an abstract submitted to the American Chemical Society.",
    attribution: null,
  },
];

export const deliverables = [
  {
    title: "Weekly computational lab notebooks",
    body:
      "Not worksheets. Students record which method and basis set they chose and why, what actually ran, what failed, what surprised them, and which questions they want to return to. It is the habit a working computational chemist keeps.",
  },
  {
    title: "A journal paper presentation",
    body:
      "Each student picks one paper from the current literature, works through it in passes with a reading guide, and presents it to the group — including the parts they had to go and look up.",
  },
  {
    title: "A Stage 1 poster, talk, and written summary",
    body:
      "The Stage 1 capstone. The question, the evidence, the interpretation, and — required, not optional — the limitations and what would come next.",
  },
  {
    title: "A Stage 2 research abstract",
    body:
      "In Stage 2, each student develops an individual research project and prepares an abstract for submission to the American Chemical Society.",
  },
];

// Research topics students worked on. Deliberately described by the question
// investigated rather than by paper title — a parent reading this page should
// see what the student did, not a citation list. Every description below is
// drawn from the actual source paper's abstract, so it can be fact-checked.
export const researchTopics = {
  shared: {
    tag: "Whole cohort",
    title: "Why PFAS refuse to break down",
    body:
      "PFAS are called forever chemicals because the carbon–fluorine bonds holding them together resist almost everything the environment throws at them. The cohort worked through a study that computed 550 of those bond strengths at a high level of theory, then used them to test whether faster, cheaper methods get the same answer. The uncomfortable finding students had to sit with: the errors grow as molecules become more fluorinated and larger, so a method validated on small ordinary molecules cannot simply be trusted on PFAS.",
    skills: ["Bond dissociation energies", "Benchmarking", "Method selection"],
  },
  projects: [
    {
      tag: "Carbon capture",
      title: "Which molecules can pull CO₂ out of the air",
      body:
        "Direct air capture needs molecules that grip CO₂ firmly enough to catch it from a very dilute atmosphere. This project screened amino-functionalized molecules and compared how strongly each binds CO₂ against how strongly it binds water — because in real air, water is the competition. The work traced why nitrogen-containing groups attract CO₂ at all: the electron-rich nitrogen meets the electron-poor carbon at the centre of the CO₂ molecule.",
      skills: ["Binding energies", "Screening candidates", "Competing interactions"],
    },
    {
      tag: "Reaction mechanisms",
      title: "What happens when a radical meets a pollutant",
      body:
        "A fluorinated methyl radical collides with nitrogen dioxide. What comes out? This project mapped the full energy landscape: a first step with no barrier at all, an intermediate that rearranges, and several competing routes that fall apart into different products. Because the slowest step sits essentially level with the starting materials, the reaction is fast — which is exactly why it matters for removing NO₂ from combustion exhaust.",
      skills: ["Potential energy surfaces", "Transition states", "Competing pathways"],
    },
    {
      tag: "Method validation",
      title: "Whether the method itself can be trusted",
      body:
        "Before believing a computed number, you have to know how the method behaves on cases where the answer is already known. This project compared how a range of DFT functionals handle OH radicals attacking aromatic pollutants — the reaction that begins breaking those pollutants down in the atmosphere — and found that methods agreeing on the overall trend can still disagree on the barrier heights that set the rate.",
      skills: ["Benchmarking", "Kinetics", "Reading error bars"],
    },
    {
      tag: "Property prediction",
      title: "Predicting how readily a molecule gives up a proton",
      body:
        "A molecule's pKa decides whether it carries a charge at a given pH, which in turn governs how it dissolves, binds, and reacts. This project worked through pKa predictions for alcohols, phenols, and hydroperoxides and ran straight into the solvent problem: modelling water as a smooth background leaves errors of more than six pKa units, while placing three actual water molecules around the reacting site brings predictions to within about half a unit.",
      skills: ["Solvation models", "Acid–base chemistry", "Comparing to experiment"],
    },
    {
      tag: "Microplastics",
      title: "Why pollutants stick to microplastics",
      body:
        "Microplastics are a concern partly because they ferry other pollutants around with them. This project examined how small organic pollutants attach to a PET surface. The binding turned out to be mostly weak hydrogen bonding rather than the ring-stacking you might expect from an aromatic polymer — and where on the surface a pollutant lands matters far more than how large the plastic particle is.",
      skills: ["Intermolecular forces", "Surface adsorption", "Hydrogen bonding"],
    },
  ],
};

// Excerpts from a thank-you letter written by a student in the 2026 cohort,
// lightly condensed. Two permissions are needed before this goes live:
//   1. the student agrees to the quote being published, and
//   2. the student agrees to THIS edited version, not just the original letter,
// with a parent or guardian signing for anyone under 18. Until then the
// attribution stays a TBD chip so the page cannot quietly ship.
//
// 这段引文出自 2026 届学生的感谢信，已做删节。上线前需要：
// (1) 学生同意公开引用，(2) 学生确认删节后的版本；未成年需家长签字。
export const testimonials = [
  {
    quote:
      "Rather than simply running the provided code, I took the time to look through the lines of code and understand how each section works. When I encountered an error, I tried to trace the source of the issue and understand why it arose. This process helped me link the chemical concepts with the computational methods.",
    attribution: TBD(
      "Confirm written permission, then set to 'Student, 2026 cohort' — or the student's name if they and their guardian agree to be named"
    ),
  },
  {
    quote:
      "I had already developed an interest in PFAS molecules before the program began, so I was ecstatic when a paper on PFAS was incorporated into it. Seeing different computational methods tested on chemicals like PFAS reinforced my belief that quantum chemistry has tremendous potential for understanding environmentally relevant chemical processes.",
    attribution: TBD("Same permission as above"),
  },
];

// Short pull quote used on the home page. Same permission gate.
export const pullQuote = {
  text:
    "Before this program I had little exposure to computational methods and how they applied to chemistry. It has given me newfound motivation to continue pursuing quantum chemistry research.",
  attribution: TBD("Confirm written permission before publishing"),
};

// One line, shown quietly under the deliverables list rather than as its own
// section. The certificate question below is still open but is no longer
// rendered anywhere on the site — it is tracked in the README instead.
export const completion = {
  note:
    "Completion recognition reflects actual participation and the quality of the work, not attendance alone.",
  certificate: TBD(
    "Certificate format, issuer wording, and whether advisor signatures appear — NOT rendered on the site"
  ),
};

// ---------------------------------------------------------------------------
// ADMISSIONS — steps follow the poster: form with a short statement of
// interest, then a required interview.
// ---------------------------------------------------------------------------
export const admissionSteps = [
  {
    title: "Submit an application form",
    body: "The form includes a short statement of interest.",
    meta: TBD("Application deadline"),
  },
  {
    title: "Attend a required interview",
    body:
      "The interview assesses academic interest, readiness, communication, willingness to commit, and overall fit.",
    meta: TBD("Interview length and format"),
  },
  {
    title: "Decision",
    body: "Admitted students are notified and confirm their place.",
    meta: TBD("Decision timeline"),
  },
  {
    title: "Consent form",
    body:
      "Sessions are recorded, so a signed recording-consent form must be returned before the first session. A parent or legal guardian signs for students under 18.",
    meta: "Before session 1",
  },
  {
    title: "Stage 1 begins",
    body: "Orientation, then Week 1.",
    meta: TBD("Kickoff date"),
  },
];

export const eligibility = {
  who: "High school students with strong academic potential and serious interest in STEM inquiry.",
  required: [
    { label: "Knowledge", body: "A basic understanding of chemistry." },
    {
      label: "Skills",
      body: "Good English reading skills and basic time management.",
    },
    { label: "Tools", body: "A reliable computer and internet connection." },
    {
      label: "Attitude",
      body:
        "A commitment to finishing weekly tasks and a deep interest in STEM.",
    },
  ],
  preferred: [
    "Coursework such as Honors or AP Chemistry, AP Biology, AP Calculus, or Python",
    "Prior experience in research, competitions, data analysis, or project-based learning",
    "Strong independent learning habits and intellectual initiative",
  ],
};

export const expectations = {
  heading: "A commitment-based program",
  body:
    "This is a small group. One person coasting changes the experience for everyone else, so admitted students are expected to:",
  items: [
    "Attend sessions, discussions, and presentations on time",
    "Complete assigned tasks and project deliverables",
    "Participate responsibly in group collaboration",
    "Respond constructively to academic feedback and revise accordingly",
  ],
  policy:
    "The program includes an ongoing evaluation process. Repeated unexcused absences, missed assignments, insufficient contribution to group progress, or no meaningful improvement after feedback can lead to a warning, a formal review, and if necessary the end of a student's participation.",
};

export const parentNotes = [
  "This is a research training program, not a conventional tutoring program. Students are expected to participate actively and work independently.",
  "The program emphasizes real engagement and academic discipline. It is not designed as an enrichment activity or a guaranteed credential-building experience.",
  "The program includes selection and accountability. The interview is required, and there are participation review and removal mechanisms to maintain quality.",
  "Students who demonstrate strong potential may later be considered for more advanced or individualized research support.",
];

export const faqs = [
  {
    q: "Is there a cost?",
    a: "No. Program value is approximately $8,000 per student, and admitted students participate at no cost through NSF funding.",
  },
  {
    q: "What is the difference between Stage 1 and Stage 2?",
    a: "Stage 1 is the six-week foundational program: shared molecules, shared software, and a capstone poster and presentation. Stage 2 runs five weeks and moves into individual research projects and an ACS abstract submission. Students advance from Stage 1 into Stage 2 rather than applying separately.",
  },
  {
    q: "Do I need to know how to code?",
    a: "No. Week 1 uses WebMO, which is point-and-click, and the quantum chemistry calculations from Week 2 onward run in guided Google Colab notebooks. Python is listed as preferred, not required.",
  },
  {
    q: "How much time does it take each week?",
    a: "Plan on about 5–6 hours of independent work per week, on top of the live sessions.",
  },
  {
    q: "Is this a Vanderbilt University program?",
    a: "No. It is guided by a professor from Vanderbilt University, Department of Chemistry, but it is not an official Vanderbilt University program and does not constitute Vanderbilt University sponsorship, certification, academic credit, or admissions endorsement.",
  },
  {
    q: "What do I come away with?",
    a: "A clearly defined research question, a preliminary set of findings, a poster or equivalent research presentation, and stronger habits in scientific thinking, communication, and execution.",
  },
  {
    q: "What if I miss a session?",
    a: "Sessions are recorded, so one missed session does not put you behind. Repeated unexcused absence is a different matter — see the participation expectations above.",
  },
  {
    q: "Who can I contact with questions?",
    a: "Email the program contact at the address in the footer. Parents are welcome to write on a student's behalf.",
  },
];

export const nav = [
  { href: "/", label: "Program" },
  { href: "/curriculum", label: "Stages" },
  { href: "/instructors", label: "Advisors" },
  { href: "/outcomes", label: "Student work" },
  { href: "/apply", label: "Apply" },
];
