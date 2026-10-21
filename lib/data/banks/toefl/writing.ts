// Path: lib/data/banks/toefl/writing.ts
import type { SeedQuestion } from "../../question-bank-seed";

export const TOEFL_WRITING_QUESTIONS: SeedQuestion[] = [
  // =============================================================
  // TOEFL iBT INTEGRATED WRITING TASK (Reading + Lecture + Essay)
  // =============================================================
  {
    exam_name: "TOEFL iBT",
    subject: "Writing",
    skill_domain: "Integrated Writing",
    difficulty_tier: 2,
    question_text: "You should spend 20 minutes on this task.\n\nSummarize the points made in the lecture, being sure to explain how they cast doubt on the specific points made in the reading passage.\n\nSuggested length: 150–225 words.",
    passage: "READING PASSAGE:\nMarine biologists have proposed deploying large-scale artificial iron fertilization in open-ocean regions to combat atmospheric carbon accumulation. Proponents advance three central justifications. First, introducing soluble iron stimulates massive blooms of phytoplankton, which photosynthetically absorb megatons of carbon dioxide before dying and sequestering that carbon permanently on the abyssal seafloor. Second, the proliferation of phytoplankton dramatically enlarges the bottom tier of the marine trophic pyramid, boosting commercial fish stocks and alleviating global seafood shortages. Third, computational climate models project that ocean fertilization is substantially more cost-effective than terrestrial reforestation or direct air carbon capture facilities, requiring only modest merchant vessel fleets to disperse iron sulfate.\n\nLECTURE AUDIO TRANSCRIPT:\nProfessor: The proposals for open-ocean iron fertilization in the reading sound appealing on paper, but empirical oceanic trials reveal that none of these three claims hold up under scrutiny.\nFirst, consider carbon sequestration. While iron spikes do trigger immediate phytoplankton blooms, subsequent deep-sea sediment traps proved that less than two percent of that biomass ever reaches the deep ocean bed. Instead, tiny marine organisms and bacteria consume the dead plankton near the surface, rapidly respiring and releasing the captured CO2 right back into the atmosphere.\nSecond, iron fertilization does not foster healthy fishery ecosystems. Instead, it overwhelmingly favors harmful toxic dinoflagellate species—such as Pseudo-nitzschia—which produce lethal neurotoxins like domoic acid. Rather than nourishing commercial fish, these toxic red tides cause mass fish kills and poison marine mammals.\nAnd third, the economic viability calculation is deeply flawed. When massive plankton die-offs decay near the surface, they create hypoxic dead zones devoid of dissolved oxygen. Remedying the ecological collapse of vital coastal fisheries and coastal water quality would cost billions of dollars, completely wiping out any theoretical savings over direct air capture.",
    options: {
      A: "Point-by-Point Counter-Argument Mapping",
      B: "Accurate Representation of Lecture Refutations",
      C: "Objective Academic Synthesis (No Personal Opinion)",
    },
    correct_option: "A",
    explanation: "An ETS high-scoring (score 4.5–5.0 / 28–30) Integrated Writing essay must systematically synthesize the 3 lecture counter-arguments against the reading claims:\n1. Carbon Sequestration: Reading claims permanent abyssal storage; Lecture reveals <2% sinks, while surface bacteria consume plankton and re-release CO2 via respiration.\n2. Fisheries: Reading claims expanded trophic food chain; Lecture proves toxic red tides (Pseudo-nitzschia/domoic acid) kill fish.\n3. Cost-effectiveness: Reading claims economical dispersal; Lecture demonstrates hypoxic dead zones impose billions in remediation costs.",
    distractor_analysis: {
      A: "Required: Structural organization mapping reading assertion to lecture rebuttal.",
      B: "Crucial: Candidate must attribute points accurately to 'the lecturer' and 'the reading'.",
      C: "Required: Personal opinions are strictly penalized in the Integrated Task.",
    },
    misconception: "Stating personal opinions or agreeing with the reading passage instead of focusing entirely on how the lecture refutes the reading.",
    time_estimate_seconds: 1200, // 20 minutes
  },

  // =============================================================
  // TOEFL iBT WRITING FOR AN ACADEMIC DISCUSSION (10-minute task)
  // =============================================================
  {
    exam_name: "TOEFL iBT",
    subject: "Writing",
    skill_domain: "Writing for an Academic Discussion",
    difficulty_tier: 2,
    question_text: "Your professor is teaching a class on public policy. Write a post responding to the professor's question.\n\nIn your response, you should:\n- Express and support your personal opinion\n- Make a contribution to the online discussion in your own words\n\nAn effective response will contain at least 100 words.\n\nTime limit: 10 minutes.",
    passage: "ACADEMIC DISCUSSION BOARD:\n\nProfessor Dr. Marcus Alvarez:\nWelcome to this week's discussion forum. As municipal governments struggle to achieve carbon neutrality, many cities face a difficult financial decision: should they direct their limited transit budgets toward subsidizing electric vehicles (EVs) for individual citizens, or should they invest entirely in expanding and modernizing municipal public transit networks (buses, subways, and light rail)? What do you think, and why?\n\nClaire:\nI strongly believe funds should go toward electric vehicle subsidies. Most modern urban dwellers require the flexibility of personal transportation for irregular working hours and suburban commuting where fixed train lines simply cannot reach. By lowering the purchase threshold for middle-class families through tax rebates, we accelerate the direct phase-out of internal combustion engines much faster than building decade-long rail infrastructure.\n\nPaul:\nI completely disagree with Claire. EV subsidies primarily benefit affluent homeowners who can afford garages and private chargers, while doing absolutely nothing to alleviate traffic gridlock. Investing in high-frequency electric bus lanes and subway expansions democratizes clean transit for all socioeconomic strata, removes hundreds of cars from the road per train, and radically slashes emissions per passenger-kilometer.",
    options: {
      A: "Distinct Personal Position with Novel Argument",
      B: "Explicit Engagement with Classmates (Claire/Paul)",
      C: "Grammatical Complexity and Precision",
    },
    correct_option: "A",
    explanation: "To score a 5 (maximum ETS rubric) on Academic Discussion:\n1. Express a clear personal stance (agreeing with Claire, Paul, or presenting a synthesized perspective like transit-oriented micro-mobility).\n2. Add a NOVEL reason not already stated by Claire or Paul (e.g., urban land use efficiency, asphalt heat island mitigation, battery lifecycle mineral constraints).\n3. Demonstrate syntactic sophistication (adverbial clauses, conditionals) and accurate vocabulary with minimal grammatical slips. Minimum 100 words.",
    distractor_analysis: {
      A: "Crucial: Merely restating Paul's words caps the score at 3.",
      B: "Effective: Direct attribution ('While Claire raises a valid point regarding transit deserts...') enhances coherence.",
      C: "Required: Demonstration of diverse sentence structures.",
    },
    misconception: "Merely copying phrases from Claire or Paul without providing a new, independent perspective or concrete personal elaboration.",
    time_estimate_seconds: 600, // 10 minutes
  },
  {
    exam_name: "TOEFL iBT",
    subject: "Writing",
    skill_domain: "Writing for an Academic Discussion",
    difficulty_tier: 3,
    question_text: "Your professor is teaching a class on economics. Write a post responding to the professor's question.\n\nIn your response, you should:\n- Express and support your personal opinion\n- Make a contribution to the online discussion in your own words\n\nAn effective response will contain at least 100 words.\n\nTime limit: 10 minutes.",
    passage: "ACADEMIC DISCUSSION BOARD:\n\nProfessor Dr. Evelyn Reed:\nTechnological disruption has enabled a four-day work week in several trial jurisdictions across Europe and North America. Today, we consider whether national governments should mandate a 32-hour standard work week with no reduction in pay. Some argue this dramatically enhances employee mental health and societal well-being, while others warn it severely impairs national economic productivity and small business survival. Where do you stand?\n\nAndrew:\nI think a mandatory 32-hour work week is overdue. Chronic burnout in white-collar industries leads to cognitive exhaustion, absenteeism, and soaring healthcare costs. When workers are well-rested, hourly productivity actually rises, which offsets the lost four hours. Better mental health yields happier families and vibrant local communities.\n\nSarah:\nWhile that sounds noble, Andrew overlooks the reality of service, manufacturing, and healthcare sectors. A hospital nurse, assembly line worker, or restaurant cook cannot compress five days of physical presence into four without hiring twenty percent more staff. Small businesses operating on razor-thin margins would be driven into bankruptcy by mandated wage premiums.",
    options: {
      A: "Original Contribution with Sectoral Nuance",
      B: "Syntactic Variety and Academic Register",
      C: "Cohesive Progression within 100+ Words",
    },
    correct_option: "A",
    explanation: "ETS Rubric Level 5 requires a well-elaborated response that adds fresh analytical value. High-scoring candidates might propose a phased or sector-specific regulatory framework, highlight consumer spending increases during 3-day weekends, or analyze automation readiness across differing industries.",
    distractor_analysis: {
      A: "Essential: Developing an authentic insight beyond what Andrew and Sarah provided.",
      B: "Required: High lexical range and syntactic flexibility.",
      C: "Required: Concise, well-organized paragraph exceeding 100 words.",
    },
    misconception: "Writing less than 100 words or repeating the prompt's instructions.",
    time_estimate_seconds: 600,
  },
];
