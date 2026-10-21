// Path: lib/data/banks/gre/micro-skills.ts
import type { SeedQuestion } from "../../question-bank-seed";

export const GRE_MICRO_SKILLS_BANK: SeedQuestion[] = [
  // =============================================================
  // QUANTITATIVE COMPARISON: Arithmetic & Number Properties
  // =============================================================
  {
    exam_name: "GRE",
    subject: "Quantitative Reasoning",
    skill_domain: "QC: Arithmetic & Number Properties",
    difficulty_tier: 2,
    question_text: "Let p and q be distinct prime numbers such that p > 2 and q > 2.\n\nQuantity A: The remainder when (p^2 + q^2) is divided by 4\nQuantity B: 2",
    options: {
      A: "Quantity A is greater.",
      B: "Quantity B is greater.",
      C: "The two quantities are equal.",
      D: "The relationship cannot be determined from the information given.",
    },
    correct_option: "C",
    explanation: "Every prime greater than 2 is odd. Any odd integer n can be written as 2k + 1, so n^2 = 4k^2 + 4k + 1 = 4(k^2 + k) + 1. Thus, the square of any odd integer is always congruent to 1 modulo 4. Therefore, p^2 ≡ 1 (mod 4) and q^2 ≡ 1 (mod 4). The sum p^2 + q^2 ≡ 1 + 1 = 2 (mod 4). The remainder when divided by 4 is invariant and always exactly 2. Quantity A = 2, so Quantity A equals Quantity B.",
    distractor_analysis: {
      A: "Incorrect. The remainder cannot exceed 2 for the sum of two odd squares modulo 4.",
      B: "Incorrect. Confused odd prime squares with composite squares.",
      C: "Correct. Odd squares modulo 4 always leave remainder 1; 1 + 1 = 2.",
      D: "Incorrect. Trapped by assuming different prime choices (e.g. 3 and 5 vs 7 and 11) yield different remainders.",
    },
    misconception: "Assuming that varying prime values change the modular arithmetic residue.",
    time_estimate_seconds: 45,
  },
  {
    exam_name: "GRE",
    subject: "Quantitative Reasoning",
    skill_domain: "QC: Arithmetic & Number Properties",
    difficulty_tier: 3,
    question_text: "n is a positive integer such that n is divisible by 6 and n is divisible by 9.\n\nQuantity A: The remainder when n is divided by 36\nQuantity B: 18",
    options: {
      A: "Quantity A is greater.",
      B: "Quantity B is greater.",
      C: "The two quantities are equal.",
      D: "The relationship cannot be determined from the information given.",
    },
    correct_option: "D",
    explanation: "If n is divisible by 6 and 9, n must be a multiple of LCM(6, 9) = 18. Case 1: If n = 18, 18 divided by 36 leaves remainder 18. Here Quantity A = Quantity B. Case 2: If n = 36, 36 divided by 36 leaves remainder 0. Here Quantity A (0) < Quantity B (18). Since Quantity A can be equal to or less than Quantity B, the relationship cannot be determined.",
    distractor_analysis: {
      A: "Incorrect. Remainder of a multiple of 18 modulo 36 can only be 0 or 18, never greater than 18.",
      B: "Incorrect. Tested only n = 36 and concluded B is always greater.",
      C: "Incorrect. Tested only the minimal case n = 18 and concluded equality.",
      D: "Correct. n = 18 yields 18 (equal); n = 36 yields 0 (less). Invariant relationship does not hold.",
    },
    misconception: "Testing only the first positive multiple without testing higher multiples.",
    time_estimate_seconds: 50,
  },

  // =============================================================
  // QUANTITATIVE COMPARISON: Algebra & Inequalities
  // =============================================================
  {
    exam_name: "GRE",
    subject: "Quantitative Reasoning",
    skill_domain: "QC: Algebra & Inequalities",
    difficulty_tier: 2,
    question_text: "x and y are real numbers such that x^2 + y^2 = 25 and xy = 12.\n\nQuantity A: (x + y)^2\nQuantity B: (x - y)^2 + 40",
    options: {
      A: "Quantity A is greater.",
      B: "Quantity B is greater.",
      C: "The two quantities are equal.",
      D: "The relationship cannot be determined from the information given.",
    },
    correct_option: "A",
    explanation: "Expand both algebraic identities:\nQuantity A = (x + y)^2 = x^2 + 2xy + y^2 = (x^2 + y^2) + 2xy = 25 + 2(12) = 25 + 24 = 49.\nQuantity B = (x - y)^2 + 40 = (x^2 - 2xy + y^2) + 40 = (25 - 2(12)) + 40 = (25 - 24) + 40 = 1 + 40 = 41.\nComparing the two, 49 > 41, so Quantity A is strictly greater.",
    distractor_analysis: {
      A: "Correct. (x + y)^2 = 49 and (x - y)^2 + 40 = 41. 49 > 41.",
      B: "Incorrect. Arithmetic error in evaluating the difference expansion.",
      C: "Incorrect. Confused the +40 constant with the 4xy identity shift (which would require 48).",
      D: "Incorrect. Believed multiple signs of x and y alter (x+y)^2; but xy = 12 means x and y share the same sign, so 2xy is always +24.",
    },
    misconception: "Assuming sign ambiguity in x and y alters the squared binomial sum.",
    time_estimate_seconds: 40,
  },
  {
    exam_name: "GRE",
    subject: "Quantitative Reasoning",
    skill_domain: "QC: Algebra & Inequalities",
    difficulty_tier: 3,
    question_text: "0 < x < 1 and y > 1.\n\nQuantity A: (x^y) / (y^x)\nQuantity B: 1",
    options: {
      A: "Quantity A is greater.",
      B: "Quantity B is greater.",
      C: "The two quantities are equal.",
      D: "The relationship cannot be determined from the information given.",
    },
    correct_option: "B",
    explanation: "For 0 < x < 1 and y > 1:\nSince x < 1 and y > 1, x^y is raising a number strictly between 0 and 1 to a power greater than 1, so x^y < x < 1. Hence, numerator < 1.\nFor the denominator: y > 1 and x > 0, so y^x > 1^x = 1. Hence, denominator > 1.\nA positive number less than 1 divided by a number strictly greater than 1 must be strictly less than 1. Therefore, Quantity A < 1. Quantity B (1) is strictly greater.",
    distractor_analysis: {
      A: "Incorrect. The numerator is strictly < 1 and denominator > 1, so ratio cannot exceed 1.",
      B: "Correct. Numerator x^y < 1; denominator y^x > 1. Thus (x^y)/(y^x) < 1 < Quantity B.",
      C: "Incorrect. The ratio can never equal 1 under the given constraints.",
      D: "Incorrect. Trapped into thinking numerical substitution is required without analyzing bounding properties.",
    },
    misconception: "Failing to bound numerator and denominator separately relative to 1.",
    time_estimate_seconds: 50,
  },

  // =============================================================
  // QUANTITATIVE COMPARISON: Geometry & Coordinate Traps
  // =============================================================
  {
    exam_name: "GRE",
    subject: "Quantitative Reasoning",
    skill_domain: "QC: Geometry & Coordinate Traps",
    difficulty_tier: 2,
    question_text: "A circle in the xy-plane has its center at (3, -2) and passes through the point (7, 1).\n\nQuantity A: The circumference of the circle\nQuantity B: 10π",
    options: {
      A: "Quantity A is greater.",
      B: "Quantity B is greater.",
      C: "The two quantities are equal.",
      D: "The relationship cannot be determined from the information given.",
    },
    correct_option: "C",
    explanation: "The radius r of the circle is the Euclidean distance from the center (3, -2) to the boundary point (7, 1):\nr = sqrt((7 - 3)^2 + (1 - (-2))^2) = sqrt(4^2 + 3^2) = sqrt(16 + 9) = sqrt(25) = 5.\nThe circumference C = 2 * π * r = 2 * π * 5 = 10π. Therefore, Quantity A equals Quantity B.",
    distractor_analysis: {
      A: "Incorrect. Used diameter formula πd^2 instead of 2πr.",
      B: "Incorrect. Subtracted coordinates incorrectly leading to r < 5.",
      C: "Correct. The 3-4-5 right triangle gives radius = 5, yielding circumference = 10π.",
      D: "Incorrect. Both center and boundary point are fixed, determining the circle uniquely.",
    },
    misconception: "Neglecting signs when computing coordinate distance: 1 - (-2) = 3.",
    time_estimate_seconds: 40,
  },

  // =============================================================
  // QUANTITATIVE: Problem Solving & Micro-Skills (5 Choices A-E)
  // =============================================================
  {
    exam_name: "GRE",
    subject: "Quantitative Reasoning",
    skill_domain: "Number Properties & Divisibility",
    difficulty_tier: 2,
    question_text: "If k is an integer and (3^(k+1) + 3^k) / 4 = 81, what is the value of k?",
    options: {
      A: "2",
      B: "3",
      C: "4",
      D: "5",
      E: "6",
    },
    correct_option: "C",
    explanation: "Factor out 3^k from the numerator:\n3^(k+1) + 3^k = 3^k * (3 + 1) = 3^k * 4.\nSubstitute back into the expression:\n(3^k * 4) / 4 = 3^k.\nSo 3^k = 81. Since 81 = 3^4, k = 4.",
    distractor_analysis: {
      A: "Incorrect. Off-by-two power error.",
      B: "Incorrect. Equated 3^(k-1) = 81.",
      C: "Correct. Factoring 3^k(3 + 1) / 4 leaves 3^k = 81 = 3^4, so k = 4.",
      D: "Incorrect. Confused the exponent addition rule with multiplication.",
      E: "Incorrect. Computed 3^k = 729.",
    },
    misconception: "Adding exponents in a sum: 3^(k+1) + 3^k != 3^(2k+1).",
    time_estimate_seconds: 35,
  },
  {
    exam_name: "GRE",
    subject: "Quantitative Reasoning",
    skill_domain: "Counting Methods & Probability",
    difficulty_tier: 3,
    question_text: "A committee of 4 people is to be selected from a group of 5 men and 4 women. If the committee must include at least one woman, how many distinct committees can be formed?",
    options: {
      A: "120",
      B: "121",
      C: "125",
      D: "126",
      E: "140",
    },
    correct_option: "B",
    explanation: "Use complementary counting:\nTotal possible committees of 4 from 9 people (5 men + 4 women) = C(9, 4) = (9 * 8 * 7 * 6) / (4 * 3 * 2 * 1) = 126.\nCommittees with NO women (i.e. all 4 members chosen strictly from the 5 men) = C(5, 4) = 5.\nCommittees with at least one woman = Total - All Men = 126 - 5 = 121.",
    distractor_analysis: {
      A: "Incorrect. Calculated 4 * C(8, 3) with double counting.",
      B: "Correct. Complementary counting: C(9, 4) - C(5, 4) = 126 - 5 = 121.",
      C: "Incorrect. Subtracted 1 instead of C(5, 4).",
      D: "Incorrect. Calculated total unconstrained committees C(9, 4) = 126, failing to subtract the all-male committee.",
      E: "Incorrect. Arithmetic permutation error.",
    },
    misconception: "Constructive counting without accounting for duplicate committee combinations.",
    time_estimate_seconds: 50,
  },
  {
    exam_name: "GRE",
    subject: "Quantitative Reasoning",
    skill_domain: "Statistics & Data Interpretation",
    difficulty_tier: 2,
    question_text: "A data set of 7 distinct positive integers has a mean of 20 and a median of 22. What is the greatest possible value of the largest integer in the data set?",
    options: {
      A: "65",
      B: "68",
      C: "70",
      D: "71",
      E: "75",
    },
    correct_option: "D",
    explanation: "Let the sorted integers be x1 < x2 < x3 < x4 < x5 < x6 < x7.\nThe sum of all 7 integers = 7 * 20 = 140.\nThe median is the 4th integer, so x4 = 22.\nTo maximize x7, we must minimize all other integers:\nSince all integers are distinct positive integers:\n- x1 must be at least 1\n- x2 must be at least 2\n- x3 must be at least 3\n- x4 is fixed at 22\n- x5 must be greater than x4 (22), so minimal x5 = 23\n- x6 must be greater than x5 (23), so minimal x6 = 24\nSum of minimal x1 through x6 = 1 + 2 + 3 + 22 + 23 + 24 = 69.\nMaximum x7 = Total Sum - 69 = 140 - 69 = 71.",
    distractor_analysis: {
      A: "Incorrect. Assumed x5 and x6 could be 22 or 23 without observing strict distinction.",
      B: "Incorrect. Calculation slip in the prefix sum.",
      C: "Incorrect. Off-by-one error.",
      D: "Correct. Sum is 140. Minimal prefix (1, 2, 3, 22, 23, 24) sums to 69. 140 - 69 = 71.",
      E: "Incorrect. Allowed non-distinct integers (e.g. setting x1=x2=x3=1).",
    },
    misconception: "Overlooking that all integers in the set are distinct, requiring strictly increasing values.",
    time_estimate_seconds: 55,
  },

  // =============================================================
  // VERBAL: Text Completion (5 Choices A-E)
  // =============================================================
  {
    exam_name: "GRE",
    subject: "Verbal Reasoning",
    skill_domain: "TC: Single-Blank Vocabulary",
    difficulty_tier: 2,
    question_text: "The critic observed that the director's latest film was marred by an unearned ______; rather than allowing genuine human grief to emerge organically from the narrative, the script resorted to manipulative musical swells and tearful monologues.",
    options: {
      A: "austerity",
      B: "bathos",
      C: "levity",
      D: "solicitude",
      E: "reticence",
    },
    correct_option: "B",
    explanation: "The clue is 'rather than allowing genuine human grief to emerge organically... resorted to manipulative musical swells.' The word needed describes an insincere, exaggerated, or ludicrous descent into sentimentality: 'bathos'.",
    distractor_analysis: {
      A: "Incorrect. 'Austerity' means severe simplicity or sternness, the opposite of theatrical sentimentality.",
      B: "Correct. 'Bathos' means an abrupt descent from the elevated to the ludicrous, especially overdone pathos/sentimentality.",
      C: "Incorrect. 'Levity' means humor or lack of seriousness.",
      D: "Incorrect. 'Solicitude' means attentive care or concern.",
      E: "Incorrect. 'Reticence' means reserved restraint, antonym of melodrama.",
    },
    misconception: "Confusing bathos (vulgar sentimental excess) with pathos (genuine suffering).",
    time_estimate_seconds: 40,
  },
  {
    exam_name: "GRE",
    subject: "Verbal Reasoning",
    skill_domain: "TC: Two-Blank Contrast & Shift",
    difficulty_tier: 3,
    question_text: "Far from being the ______ visionary depicted in popular hagiographies, the inventor was remarkably ______ in his business dealings, routinely settling for incremental patents that guaranteed safe royalties rather than pursuing groundbreaking leaps.",
    options: {
      A: "audacious",
      B: "pusillanimous",
      C: "pedantic",
      D: "circumspect",
      E: "mercurial",
    },
    correct_option: "A",
    explanation: "'Far from being...' sets up a contrast between the mythical image and reality. The second half explains he was 'routinely settling for incremental patents that guaranteed safe royalties rather than pursuing groundbreaking leaps.' In his public myth he was daring ('audacious'), whereas in reality he was cautious ('circumspect'). Here 'audacious' correctly captures the first blank.",
    distractor_analysis: {
      A: "Correct. 'Audacious' (bold, daring) contrasts directly with settling for safe, minor royalties.",
      B: "Incorrect. 'Pusillanimous' means cowardly, which matches his caution rather than the exalted popular myth.",
      C: "Incorrect. 'Pedantic' means overly concerned with formal rules.",
      D: "Incorrect. 'Circumspect' describes his actual behavior, not the exalted myth that 'Far from being' negates.",
      E: "Incorrect. 'Mercurial' means volatile or unpredictable.",
    },
    misconception: "Selecting the word that describes what the subject actually was rather than the myth negated by 'Far from being'.",
    time_estimate_seconds: 45,
  },

  // =============================================================
  // VERBAL: Sentence Equivalence (6 Choices A-F, Two Correct Synonyms)
  // =============================================================
  {
    exam_name: "GRE",
    subject: "Verbal Reasoning",
    skill_domain: "SE: Synonym Pairs & Secondary Meanings",
    difficulty_tier: 2,
    question_text: "Select the two words that, when substituted into the sentence, produce sentences that are alike in meaning:\n\nThough she had long maintained an unblemished reputation for diplomatic reserve, the ambassador's ______ remarks at the summit stunned observers, revealing a longstanding and bitter resentment toward the treaty.",
    options: {
      A: "acerbic",
      B: "decorous",
      C: "caustic",
      D: "circumspect",
      E: "complaisant",
      F: "measured",
    },
    correct_option: "A",
    explanation: "'Though she had long maintained... diplomatic reserve' signals a direct contrast. Her remarks were sharp, biting, and unreserved, demonstrating 'bitter resentment.' 'Acerbic' and 'caustic' are exact synonyms meaning sharp, biting, and bitterly sarcastic. (On the GRE, the student selects both A and C; here A represents the primary anchor of the synonymous pair).",
    distractor_analysis: {
      A: "Correct. 'Acerbic' means sharp, biting, and harsh in tone.",
      B: "Incorrect. 'Decorous' means polite and restrained, matching her prior reputation rather than the contrast.",
      C: "Correct synonym pair with A. 'Caustic' means biting and bitterly sarcastic.",
      D: "Incorrect. 'Circumspect' means wary and prudent, identical to diplomatic reserve.",
      E: "Incorrect. 'Complaisant' means overly eager to please others.",
      F: "Incorrect. 'Measured' means carefully considered, the opposite of the outburst.",
    },
    misconception: "Failing to recognize that 'acerbic' and 'caustic' form a precise synonym pair matching 'bitter resentment'.",
    time_estimate_seconds: 40,
  },
  {
    exam_name: "GRE",
    subject: "Verbal Reasoning",
    skill_domain: "SE: Synonym Pairs & Secondary Meanings",
    difficulty_tier: 3,
    question_text: "Select the two words that, when substituted into the sentence, produce sentences that are alike in meaning:\n\nThe archivist noted that 18th-century medical treatises were often remarkably ______; rather than setting forth definitive therapeutic protocols, they readily conceded the profound limits of clinical observation.",
    options: {
      A: "presumptuous",
      B: "unpretentious",
      C: "dogmatic",
      D: "modest",
      E: "esoteric",
      F: "imperious",
    },
    correct_option: "B",
    explanation: "The semicolon introduces an explanatory clause: 'rather than setting forth definitive therapeutic protocols, they readily conceded the profound limits of clinical observation.' The authors were humble about their knowledge rather than arrogant. 'Unpretentious' and 'modest' form a synonymous pair expressing humility and absence of boastful certainty.",
    distractor_analysis: {
      A: "Incorrect. 'Presumptuous' means overstepping boundaries or arrogant, the antonym.",
      B: "Correct. 'Unpretentious' means modest and free from ostentation.",
      C: "Incorrect. 'Dogmatic' means asserting opinions arrogantly.",
      D: "Correct synonym pair with B. 'Modest' means humble and aware of one's limitations.",
      E: "Incorrect. 'Esoteric' means understood only by a small, initiated group.",
      F: "Incorrect. 'Imperious' means domineering and dictatorial.",
    },
    misconception: "Selecting words related to obscure or technical knowledge (esoteric) rather than intellectual humility.",
    time_estimate_seconds: 45,
  },

  // =============================================================
  // VERBAL: Reading Comprehension
  // =============================================================
  {
    exam_name: "GRE",
    subject: "Verbal Reasoning",
    skill_domain: "RC: Argument Analysis & Paradox",
    difficulty_tier: 2,
    question_text: "Which of the following, if true, most seriously weakens the ecological economists' conclusion regarding the forest preservation strategy?\n\nEcological economists argue that granting legal timber-harvesting concessions to indigenous Amazonian communities will halt deforestation more effectively than establishing strictly preserved national parks. Their rationale is that local communities with direct economic stakes in sustainable rubber tapping and selective logging will actively police concessions against illegal cattle ranchers and wildcat miners, whereas underfunded state forestry rangers are incapable of patrolling vast park boundaries.",
    options: {
      A: "State forestry rangers in adjacent regions recently received upgraded satellite surveillance technology.",
      B: "Commercial timber syndicates frequently offer indigenous community councils lump-sum cash buyouts that dwarf decades of projected revenue from sustainable harvesting.",
      C: "Some indigenous communities maintain traditional hunting practices that slightly reduce populations of canopy birds.",
      D: "Ecotourism generates higher per-hectare revenues in national parks than in timber concessions.",
      E: "Several neighboring nations have established joint conservation corridors across international borders.",
    },
    correct_option: "B",
    explanation: "The economists' argument relies on a crucial premise: that having an economic stake in sustainable harvesting will motivate communities to protect the land. If commercial syndicates offer huge cash buyouts that dwarf sustainable revenues (B), community members face immense financial incentive to permit industrial clear-cutting rather than sustainable policing, collapsing the central causal mechanism.",
    distractor_analysis: {
      A: "Incorrect. Satellite technology for rangers in adjacent regions does not directly invalidate community enforcement incentives.",
      B: "Correct. Directly breaks the economic alignment premise by providing overwhelming short-term profit for deforestation.",
      C: "Incorrect. Minor hunting of canopy birds is irrelevant to commercial deforestation.",
      D: "Incorrect. Ecotourism in parks does not address the core comparison regarding policing against illegal extractors.",
      E: "Incorrect. Cross-border corridors are out of scope.",
    },
    misconception: "Selecting an answer that talks about park rangers rather than directly attacking the economic incentive structure of the concession holders.",
    time_estimate_seconds: 55,
  },
];
