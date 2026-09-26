// ---------------------------------------------------------------------------
// EDIT THIS FILE, NOT THE PAGES.
//
// Every piece of copy on the site lives here. Anything wrapped in TBD("...")
// renders as an orange dashed chip in the browser, so unfinished content is
// impossible to miss. Replace it with a plain string when you have the value.
//
// 只改这个文件就够了。TBD("...") 会在页面上显示成橙色虚线标记。
//
// OFFICIAL WORDING: the disclaimer, program highlights,
// "who should apply", "what students gain", and the application steps are
// copied from the Catalyst Society program poster and should stay in sync with
// it. If the poster changes, change these strings — not the pages.
//
// WHERE THE FACTS COME FROM:
//   ProgramPoster.png ................ official public wording,
//                                      disclaimer, application steps
//   Stage 2 announcement email ....... Stage 2 dates, meeting time, ACS deadline
//   QCMFP_6Week_Map.docx ............. Stage 1 week-by-week arc
//   Week1/2/3 assignment docs ........ software, molecules, methods
//   QCMFP_DesignPrinciples.docx ...... anchor question, pedagogy
//   Proposal_Edits.docx .............. eligibility, participation policy
// ---------------------------------------------------------------------------

// COST: by decision (Sep 2026), the site says nothing about cost, price, or
// funding. The flyer image in public/brand/ has its funding paragraph covered.
// Don't reintroduce cost wording without checking with the program team.

export const TBD_PREFIX = "__TBD__";
export const TBD = (label) => `${TBD_PREFIX}${label}`;

export const program = {
  name: "Quantum Chemistry for Molecular Function Prediction",
  shortName: "Quantum Chemistry for Molecular Function Prediction",
  // Poster wording.
  subtitle: "A research opportunity for highly motivated high school students",
  guidedBy:
    "Guided by Prof. Zhongyue John Yang, Vanderbilt University, Department of Chemistry",
  host: "Catalyst Society",
  lede:
    "This program introduces students to the idea that molecular function can often be understood and predicted from electronic structure — and that computation plays a central role in modern chemistry.",
  anchorQuestion:
    "How does electronic structure help explain and predict molecular function?",
  // Poster: "Explore How Molecules Work".
  explore:
    "Why are some molecules more stable than others? Why do some molecules bind more strongly to biological targets? Why do certain materials behave differently under the same conditions?",
  weeklyLoad: "About 5–6 hours of independent work per week",
  priorCohort: "Stage 1 of the first cohort ran June 11 – July 22, 2026.",

  applyUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSemPMUWtIvbjtGYWgEUC_WvzhkeEgFC6A0i69FteCrPMG35AQ/closedform",
  // The URL above ends in /closedform, which is what Google serves when a form
  // has stopped accepting responses. Set this to true and swap in the live
  // /viewform URL when applications reopen.
  applicationsOpen: false,
  applicationsClosedNote: "Applications for the next cohort are not open yet.",

  contact: {
    name: "Emma Liu",
    email: "emma@bravodium.com",
    role: TBD("Emma's title for the public site — 'Program Contact'?"),
  },

  // Poster wording, verbatim. Do not paraphrase.
  disclaimer:
    "This is not an official Vanderbilt University program and does not constitute Vanderbilt University sponsorship, certification, academic credit, or admissions endorsement.",

};

// Poster: "Program Highlights".
export const highlights = [
  "Guided by a Vanderbilt University professor",
  "Authentic research training experience",
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
// Stage 1 is the foundational program on the poster. Stage 2 is the "pathway to
// further research mentorship" that poster line refers to: students who
// complete Stage 1 continue into individual research and an ACS abstract.
// ---------------------------------------------------------------------------

// Drives the hero energy diagram. Three stationary points: the Stage 1 climb,
// the point between stages, and Stage 2.
export const stages = [
  { n: 1, label: "Stage 1 · Foundations", body: "Shared molecules, shared tools, a capstone poster." },
  { n: 2, label: "Between stages", body: "By invitation: students who show potential and commitment continue." },
  { n: 3, label: "Stage 2 · Research", body: "An individual project and an ACS abstract." },
];

export const stage1 = {
  name: "Stage 1",
  title: "Foundations and shared inquiry",
  lede: "Weeks 1–3 shared foundation · Weeks 4–5 project · Week 6 capstone",
  ran: "June 11 – July 22, 2026",
  outcome: "A research poster, an oral presentation, and a written summary.",
};

// `figure` names the image shown beside each week (see components/WeekFigure.js).
export const stage1Weeks = [
  {
    n: 1,
    title: "Foundations",
    body: "Build the five shared molecules in WebMO, measure them, and make first predictions from structure alone.",
    concepts: ["Molecular structure", "Polarity", "WebMO"],
    deliverable: "Comparison checkpoint",
    figure: "molecules",
  },
  {
    n: 2,
    title: "The quantum chemistry toolbox",
    body: "Run your first Hartree–Fock and DFT geometry optimizations and compare them with experiment.",
    concepts: ["HF vs. DFT", "Basis sets", "Optimization"],
    deliverable: "Lab notebook",
    figure: "optimization",
  },
  {
    n: 3,
    title: "Interpreting results",
    body: "Read orbitals, charges, dipoles, and electrostatic potential maps as chemical evidence.",
    concepts: ["HOMO / LUMO", "Partial charges", "ESP maps"],
    deliverable: "Descriptor checkpoint",
    figure: "orbitals",
  },
  {
    n: 4,
    title: "From descriptors to prediction",
    body: "Choose a focal molecule and comparison molecules, and frame a research question.",
    concepts: ["Comparison sets", "Research question"],
    deliverable: "Project proposal",
    figure: "comparison",
  },
  {
    n: 5,
    title: "Analysis and interpretation",
    body: "Run your own calculations and build a claim the evidence can support.",
    concepts: ["Claim · evidence · reasoning", "Limitations"],
    deliverable: "Analysis draft",
    figure: "dipoles",
  },
  {
    n: 6,
    title: "Capstone and presentation",
    body: "Present the question, the evidence, and its limits.",
    concepts: ["Poster", "Oral presentation"],
    deliverable: "Poster, talk, and written summary",
    figure: "poster",
  },
];

export const stage2 = {
  name: "Stage 2",
  title: "Research and the ACS abstract",
  lede: "Weekly Sunday workshops that turn Stage 1 skills into your own research project.",
  meeting: "Sundays, 1:00–2:00 PM PST / 3:00–4:00 PM CST, on Zoom",
  ran: "September 6 – October 4, 2026",
  platform: "Materials and resources are posted in a Stage 2 Google Classroom.",
  focus: [
    "Developing your individual research project",
    "Preparing the ACS abstract submission",
    "Beginning the transition into conducting your research",
  ],
  arc:
    "The first meeting starts with literature searching and research idea generation: how to search the scientific literature, identify areas that interest you, recognize possible research questions, and narrow those ideas into project directions. The early sessions focus heavily on developing and refining the research question, the proposed approach, and the abstract. The final meeting reviews where each project stands after submission and discusses the next phase of the research.",
  // One entry per Sunday session, drawn as a timeline. First cohort dates.
  sessions: [
    { date: "Sep 6", label: "Literature search and research ideas" },
    { date: "Sep 13", label: "Narrowing to a research question" },
    { date: "Sep 20", label: "Proposed approach" },
    { date: "Sep 27", label: "Abstract final draft" },
    { date: "Oct 4", label: "Review and next phase" },
  ],
  deadline: { date: "Sep 28", label: "ACS abstract deadline", after: 3 },
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
    "Anchored in one chemical question throughout",
    "Comparison sets, not isolated example molecules",
    "Increasing student choice: shared work first, individual inquiry later",
    "Aligned to NGSS HS-PS1-1",
    "Assessed on explanation and prediction, not recall or software steps",
    "High ceiling with scaffolding, because the cohort is strong but unevenly prepared",
  ],
};

export const facts = [
  { value: "5–6 hrs", label: "Independent work per week" },
  { value: "5", label: "Shared molecules everyone analyzes" },
];

// ---------------------------------------------------------------------------
// PEOPLE
// Photos live in /public/instructors/; `photo` is the filename. Supplied by
// the program team, Sep 2026. `link` is optional: an external page for that
// person, shown as a link under their profile.
// Advisor emails are deliberately not published — inquiries route to the
// program contact above.
// ---------------------------------------------------------------------------
export const instructors = [
  {
    slug: "yang",
    name: "Prof. Zhongyue John Yang",
    role: "Academic Advisor",
    affiliation: "Vanderbilt University, Department of Chemistry",
    photo: "yang.jpg",
    focus: [
      "Computational chemistry",
      "Protein engineering",
      "Molecular function prediction",
    ],
    bio:
      "Leads the academic design, research training, and milestone feedback.",
    // From the lab site: the group builds Mutexa, a physics-informed AI
    // platform for protein engineering. Check with him before expanding this.
    credentials:
      "Principal investigator of the ZJYang Lab, which develops physics-informed AI for protein engineering and enzyme design.",
    link: { label: "ZJYang Lab", href: "https://lab.vanderbilt.edu/zyang-lab/" },
  },
  {
    slug: "cunningham",
    name: "Ms. Kendra Cunningham",
    role: "Academic Advisor",
    affiliation: "Vanderbilt University, Department of Chemistry",
    photo: "cunningham.jpg",
    focus: [
      "Curriculum design",
      "Chemistry education",
      "Scientific reading and writing",
    ],
    bio:
      "Designs the weekly curriculum and reading guides, and leads the Stage 2 workshops.",
    credentials: "PhD student at ZJYang Lab",
  },
  {
    slug: "zhu",
    name: "Dantong Zhu",
    role: "Program Coordinator",
    affiliation: "",
    photo: "zhu.jpg",
    focus: ["Student mentoring", "Check-in sessions", "Applicant interviews"],
    bio:
      "Runs weekly check-ins, applicant interviews, and one-on-one mentoring.",
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
    date: "IChO 2026, Tashkent, Uzbekistan",
    tag: "Cohort news",
    icon: "medal",
    title: "A student won an IChO gold medal",
    body:
      "A 2026 cohort member won gold at the International Chemistry Olympiad in Uzbekistan, 13th by total score — then presented their paper on schedule the same week.",
  },
  {
    date: "July 2026",
    tag: "Stage 1",
    icon: "poster",
    title: "The first cohort finished Stage 1",
    body:
      "Every student presented an individual research project.",
    attribution: null,
  },
  {
    date: "September 2026",
    tag: "Stage 2",
    icon: "flask",
    title: "Stage 2 began, aimed at an ACS abstract",
    body:
      "Individual research, working toward an ACS abstract.",
    attribution: null,
  },
];

export const deliverables = [
  { icon: "notebook", title: "Lab notebooks", body: "Every calculation: the method chosen, what ran, what surprised you." },
  { icon: "paper", title: "Paper presentation", body: "One current research paper, worked through and presented." },
  { icon: "poster", title: "Capstone poster", body: "Stage 1 poster, talk, and written summary." },
  { icon: "abstract", title: "ACS abstract", body: "A Stage 2 research abstract for the American Chemical Society." },
];

// Research topics students worked on. Deliberately described by the question
// investigated rather than by paper title — a parent reading this page should
// see what the student did, not a citation list. Every description below is
// drawn from the actual source paper's abstract, so it can be fact-checked.
export const researchTopics = {
  shared: {
    tag: "Whole cohort",
    title: "Why PFAS refuse to break down",
    body: "550 carbon–fluorine bond strengths computed at high accuracy — and the finding that cheaper methods grow less reliable as molecules get more fluorinated.",
    skills: ["Bond energies", "Benchmarking"],
    figure: "pfas",
  },
  projects: [
    {
      tag: "Carbon capture",
      title: "Pulling CO₂ out of the air",
      body: "Screening amino molecules for how strongly they grab CO₂ — and whether water outcompetes it.",
      skills: ["Binding energies", "Screening"],
      figure: "co2_capture",
    },
    {
      tag: "Reaction mechanisms",
      title: "A radical meets a pollutant",
      body: "Mapping every pathway when CH₂F meets NO₂; the first step has no barrier at all.",
      skills: ["Energy surfaces", "Transition states"],
      figure: "radical",
    },
    {
      tag: "Method validation",
      title: "Can the method be trusted?",
      body: "Testing DFT methods on OH attacking aromatic pollutants, where barrier heights set the rate.",
      skills: ["Benchmarking", "Kinetics"],
      figure: "oh_addition",
    },
    {
      tag: "Property prediction",
      title: "Predicting pKa",
      body: "Three explicit water molecules cut prediction errors from over 6 pKa units to about 0.5.",
      skills: ["Solvation", "Acid–base"],
      figure: "pka",
    },
    {
      tag: "Microplastics",
      title: "Why pollutants stick to plastic",
      body: "Pollutants cling to PET mostly by hydrogen bonds, and the binding site matters more than particle size.",
      skills: ["Hydrogen bonding", "Adsorption"],
      figure: "microplastics",
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
    attribution: 'Student from 2026 cohort'
  },
  {
    quote:
      "I had already developed an interest in PFAS molecules before the program began, so I was ecstatic when a paper on PFAS was incorporated into it. Seeing different computational methods tested on chemicals like PFAS reinforced my belief that quantum chemistry has tremendous potential for understanding environmentally relevant chemical processes.",
    attribution: 'Student from 2026 cohort'
  },
];

// Short pull quote used on the home page. Same permission gate.
export const pullQuote = {
  text:
    "Before this program I had little exposure to computational methods and how they applied to chemistry. It has given me newfound motivation to continue pursuing quantum chemistry research.",
  attribution: "Student from Cohort 2026",
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
  body: "Admitted students are expected to:",
  items: [
    "Attend sessions, discussions, and presentations on time",
    "Complete assigned tasks and project deliverables",
    "Participate responsibly in group collaboration",
    "Respond constructively to academic feedback and revise accordingly",
  ],
  policy:
    "Participation is reviewed throughout. Repeated absences or missed work can end a student's place in the program.",
};

export const parentNotes = [
  "A research training program, not tutoring — students work independently.",
  "Not an enrichment activity or guaranteed credential.",
  "Selective: a required interview and ongoing participation review.",
  "Strong students may be considered for further research support.",
];

export const faqs = [
  {
    q: "What is the difference between Stage 1 and Stage 2?",
    a: "Stage 1 is the foundational program: shared molecules, shared software, and a capstone poster and presentation. Stage 2 moves into individual research projects and an ACS abstract submission. Students advance from Stage 1 into Stage 2 rather than applying separately.",
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
    q: "What if I miss a session?",
    a: "Sessions are recorded, so one missed session does not put you behind. Repeated unexcused absence is a different matter — see the participation expectations above.",
  },
];

export const nav = [
  { href: "/", label: "Program" },
  { href: "/curriculum", label: "Stages" },
  { href: "/instructors", label: "Advisors" },
  { href: "/outcomes", label: "Student work" },
  { href: "/apply", label: "Apply" },
];
