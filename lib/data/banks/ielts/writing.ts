// Path: lib/data/banks/ielts/writing.ts
import type { SeedQuestion } from "../../question-bank-seed";

export const IELTS_WRITING_QUESTIONS: SeedQuestion[] = [
  // =============================================================
  // IELTS ACADEMIC WRITING TASK 1 (Report - 150+ words)
  // =============================================================
  {
    exam_name: "IELTS Academic",
    subject: "Writing",
    skill_domain: "Task 1: Academic Report",
    difficulty_tier: 2,
    question_text: "You should spend about 20 minutes on this task.\n\nThe chart below displays the proportion of renewable electricity generation across four OECD nations (Germany, United Kingdom, Denmark, Spain) between 2010 and 2024.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
    passage: "Data Summary for Visual Reference:\n- Denmark: Rose consistently from 35% in 2010 to 52% in 2017, and peaked at 74% in 2024, maintaining the highest proportion throughout the entire period.\n- Germany: Climbed steadily from 17% in 2010 to 36% in 2017, reaching 52% by 2024 (a threefold overall increase).\n- United Kingdom: Recorded the most rapid acceleration, starting lowest at 7% in 2010, surpassing Spain in 2018 (32%), and concluding at 46% in 2024.\n- Spain: Began at 31% in 2010, plateaued between 2013 and 2018 around 38%, before rising moderately to finish at 48% in 2024.\n- Overall Trend: All four nations experienced substantial net growth in renewable electricity generation, with Denmark dominating throughout and the UK exhibiting the steepest trajectory.",
    options: {
      A: "Report Overview Included",
      B: "Key Comparisons Made",
      C: "Data Accuracy Verified",
    },
    correct_option: "A",
    explanation: "An authentic IELTS Band 8.0+ Task 1 report requires: 1) A clear paraphrase of the prompt in the introduction; 2) An overview paragraph highlighting the general upward trajectory and Denmark's persistent leadership alongside the UK's steepest surge; 3) Two detailed body paragraphs reporting specific milestones (2010, 2017/2018 crossover, 2024) with precise data units (percentages); 4) Varied comparative syntax ('surpassing', 'threefold increase', 'plateaued'). Minimum 150 words.",
    distractor_analysis: {
      A: "Essential. Without a clear overview, Task Achievement cannot exceed Band 5.0.",
      B: "Essential. Candidate must draw contrasts, such as the UK surpassing Spain.",
      C: "Essential. Factual inaccuracies or extrapolations outside the dataset penalize Task Achievement.",
    },
    misconception: "Speculating on reasons for the trends (e.g. government subsidies) or omitting an overarching summary overview.",
    time_estimate_seconds: 1200, // 20 minutes
  },
  {
    exam_name: "IELTS Academic",
    subject: "Writing",
    skill_domain: "Task 1: Academic Report",
    difficulty_tier: 3,
    question_text: "You should spend about 20 minutes on this task.\n\nThe diagrams illustrate the changes that occurred in the industrial port area of Southford between 1995 and the present day.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
    passage: "Map Layout Data Summary:\n- 1995 Infrastructure: Dominated by heavy industrial facilities. The northern riverbank housed two large commercial cargo docks and an active coal-fired power station. The southern riverbank contained extensive railway freight yards and redundant warehouses. Green space was negligible.\n- Present Day Redevelopment: The coal power station was demolished and replaced by an eco-tech business park. The northern cargo docks were converted into a luxury marina and waterside dining promenade. On the southern bank, railway freight yards were dismantled to construct high-density residential apartments and a central public park. A pedestrian suspension footbridge was constructed across the river, linking the north and south sectors.\n- Overall: The port transformed from an industrial, logistics-centered zone into a commercial, recreational, and residential waterfront.",
    options: {
      A: "Map Transformation Overview",
      B: "Directional & Spatial Lexis",
      C: "Passive Voice Structures",
    },
    correct_option: "A",
    explanation: "Map summary tasks demand specialized spatial prepositions ('adjacent to', 'flanking the riverbank', 'converted into') and passive verb forms ('was redeveloped', 'were dismantled'). A Band 8+ response provides an immediate overview stating that Southford underwent comprehensive deindustrialization and urban revitalization, followed by systematic comparisons of the northern and southern waterfronts.",
    distractor_analysis: {
      A: "Required: Overview capturing the macro shift from industrial to recreational/residential.",
      B: "Required: Use of directional markers (northern, southern, west of).",
      C: "Required: Correct use of past passive for structural modifications.",
    },
    misconception: "Listing isolated building changes without grouping them logically by riverbank or functional purpose.",
    time_estimate_seconds: 1200,
  },

  // =============================================================
  // IELTS ACADEMIC WRITING TASK 2 (Discursive Essay - 250+ words)
  // =============================================================
  {
    exam_name: "IELTS Academic",
    subject: "Writing",
    skill_domain: "Task 2: Discursive Essay",
    difficulty_tier: 2,
    question_text: "You should spend about 40 minutes on this task.\n\nWrite about the following topic:\n\nSome people argue that technological automation will inevitably eliminate more jobs than it creates, leading to widespread economic hardship. Others believe that automation historically generates new industries and higher-value employment opportunities.\n\nDiscuss both views and give your own opinion.\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
    passage: "Task 2 Essay Prompt Guidelines:\n- Format: 'Discuss Both Views and Give Opinion' (Balanced discursive argument).\n- Minimum word count: 250 words.\n- Structure:\n  1. Introduction: Paraphrase the prompt + explicitly state your nuanced thesis/position.\n  2. Body Paragraph 1: Discuss the displacement argument (routine cognitive & manual labour automation, transitional frictions).\n  3. Body Paragraph 2: Discuss the generational expansion argument (creation of ancillary tech roles, productivity gains spurring demand).\n  4. Conclusion: Re-affirm your synthesized position (e.g., short-term structural dislocation vs. long-term macroeconomic expansion requiring state-sponsored reskilling).",
    options: {
      A: "Balanced Discussion of Both Sides",
      B: "Clear Position Throughout",
      C: "Complex Paragraph Development",
    },
    correct_option: "B",
    explanation: "For Task Response Band 7+, the candidate must present a 'clear position throughout the response'. For Band 8+, each main idea must be well-extended and supported with evidence. The candidate must avoid informal register ('kids', 'stuff', 'a lot of') and demonstrate academic cohesive devices ('Consequently', 'Notwithstanding this trend', 'Conversely').",
    distractor_analysis: {
      A: "Required. Both views must receive substantial treatment.",
      B: "Crucial. Failing to present a definitive personal stance caps Task Response at Band 6.0.",
      C: "Required. Paragraphs must have distinct topic sentences and supportive elaboration.",
    },
    misconception: "Only giving the candidate's personal view without objectively examining why proponents of the opposing view hold their stance.",
    time_estimate_seconds: 2400, // 40 minutes
  },
  {
    exam_name: "IELTS Academic",
    subject: "Writing",
    skill_domain: "Task 2: Discursive Essay",
    difficulty_tier: 3,
    question_text: "You should spend about 40 minutes on this task.\n\nWrite about the following topic:\n\nIn many parts of the world, indigenous languages are disappearing at an alarming rate. Some argue that public funds should be heavily invested in revitalizing endangered languages, while others assert that linguistic homogenization fosters global trade and unity, making state intervention wasteful.\n\nTo what extent do you agree or disagree?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
    passage: "Task 2 Opinion Essay Structure:\n- Prompt Type: 'To what extent do you agree or disagree?'\n- Evaluation Threshold: Requires a consistent, calibrated stance (strongly agree, strongly disagree, or qualified concession).\n- Key Vocabulary: 'linguistic biodiversity', 'intangible cultural heritage', 'lingua franca', 'cognitive epistemologies', 'intergenerational transmission'.",
    options: {
      A: "Consistent Argumentative Stance",
      B: "Sophisticated Lexical Resource",
      C: "Complex Subordination and Relative Clauses",
    },
    correct_option: "A",
    explanation: "Band 8/9 performance requires deep conceptual engagement with cultural preservation versus communicative efficiency. Arguments must be substantiated with precise examples (e.g., Maori Kohanga Reo immersion or Welsh language acts) and seamless paragraph transitions.",
    distractor_analysis: {
      A: "Critical: The writer's stance must be unequivocal from paragraph 1 to 4.",
      B: "Required: Academic collocations and precise terminology.",
      C: "Required: Demonstration of diverse grammatical structures.",
    },
    misconception: "Switching sides halfway through without a clear qualifying framework.",
    time_estimate_seconds: 2400,
  },
];
