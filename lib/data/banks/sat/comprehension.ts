// Path: lib/data/banks/sat/comprehension.ts
import type { SeedQuestion } from "../../question-bank-seed";

// ============================================================================
// DIGITAL SAT READING & WRITING COMPREHENSION PASSAGES & QUESTIONS (36 items)
// Rigorous short-to-medium academic passages (75-175 words) conforming strictly
// to the official Digital SAT Suite of Assessments specifications.
// Domains: Craft & Structure (Words in Context, Structure, Cross-Text)
//          Information & Ideas (Central Ideas, Details, Inferences, Textual/Quantitative Evidence)
// ============================================================================

export const SAT_COMPREHENSION_BANK: SeedQuestion[] = [
  // --------------------------------------------------------------------------
  // Craft and Structure: Words in Context (8 items)
  // --------------------------------------------------------------------------
  {
    exam_name: "SAT",
    subject: "Reading and Writing",
    skill_domain: "Words in Context",
    difficulty_tier: 2,
    passage_id: "sat_wic_algae_blooms",
    passage: "Marine ecologists tracking seasonal hypoxia in the Gulf of Mexico discovered that coastal agricultural runoff causes massive phytoplankton blooms. As these microorganisms die and descend to the seabed, microbial decomposition consumes dissolved oxygen at rates that produce vast 'dead zones.' Because mobile nekton such as shrimp and teleost fish rapidly evacuate these sub-oxic waters, fisheries in adjacent estuaries experience _______ commercial yields despite regional biomass remaining stable overall.",
    question_text: "Which choice completes the text regarding seasonal hypoxia with the most logical and precise word or phrase?",
    options: {
      A: "precipitous",
      B: "diminished",
      C: "lucrative",
      D: "stagnant"
    },
    correct_option: "B",
    explanation: "The passage explains that marine organisms flee sub-oxic dead zones caused by decomposing algae. If shrimp and fish evacuate the coastal estuaries where fisheries operate, local fishermen catch significantly fewer organisms, leading to 'diminished' (reduced) commercial yields.",
    distractor_analysis: {
      A: "Incorrect. 'Precipitous' means dangerously steep or sudden and typically modifies drops/declines ('precipitous drops'), not static yields directly in this syntactic slot.",
      B: "Correct. 'Diminished' precisely fits the context of catches shrinking because marine life has fled the zone.",
      C: "Incorrect. 'Lucrative' means profitable, which directly contradicts fish fleeing the harvest zone.",
      D: "Incorrect. 'Stagnant' implies unchanged or sluggish, failing to capture the negative shock of stock evacuation."
    },
    misconception: "Selecting words with positive valence or misapplying adjectives meant for rate of change.",
    time_estimate_seconds: 40
  },
  {
    exam_name: "SAT",
    subject: "Reading and Writing",
    skill_domain: "Words in Context",
    difficulty_tier: 3,
    passage_id: "sat_wic_literary_modernism",
    passage: "Virginia Woolf's narrative architecture in *To the Lighthouse* systematically dismantles the Victorian novel's linear chronology. Rather than arranging events along an external calendar, Woolf anchors temporality within the fluid subjectivity of character consciousness. Mundane household rituals are expanded into expansive psychological panoramas, while traumatic historical cataclysms—such as the casualties of the Great War—are _______ into terse, parenthetical brackets.",
    question_text: "Which choice completes the text regarding Woolf's narrative architecture with the most logical and precise word or phrase?",
    options: {
      A: "magnified",
      B: "relegated",
      C: "interpolated",
      D: "exalted"
    },
    correct_option: "B",
    explanation: "The text sets up an intentional structural contrast: minor mundane domestic moments are 'expanded into expansive panoramas,' whereas monumental historic tragedies like World War I are demoted or compressed into 'terse, parenthetical brackets.' 'Relegated' precisely denotes assigning something to an inferior, subordinate, or marginal position.",
    distractor_analysis: {
      A: "Incorrect. 'Magnified' contradicts the parenthetical compression described.",
      B: "Correct. 'Relegated' captures the deliberate demotion of major events into marginal brackets.",
      C: "Incorrect. While inserted, 'interpolated' misses the sharp contrast between expansion and dismissal.",
      D: "Incorrect. 'Exalted' means elevated to noble status, the opposite of parenthetical minimization."
    },
    misconception: "Missing the explicit stylistic contrast between expanded trivia and compressed historical tragedy.",
    time_estimate_seconds: 45
  },
  {
    exam_name: "SAT",
    subject: "Reading and Writing",
    skill_domain: "Words in Context",
    difficulty_tier: 2,
    passage_id: "sat_wic_paleoclimatology_ice",
    passage: "To reconstruct prehistoric atmospheric composition, glaciologists drill deep into Antarctic ice sheets to extract cylindrical ice cores. As accumulating snow is compressed into glacial firn, ambient air is hermetically trapped within microscopic bubbles. Because diffusion through solid crystalline ice is extraordinarily sluggish, the trapped gases provide a virtually _______ record of primordial greenhouse gas concentrations spanning eight hundred thousand years.",
    question_text: "Which choice completes the text regarding ice core atmospheric records with the most logical and precise word or phrase?",
    options: {
      A: "ephemeral",
      B: "pristine",
      C: "turbulent",
      D: "fragmentary"
    },
    correct_option: "B",
    explanation: "The text explains that ambient air is 'hermetically trapped' and that gas diffusion through solid ice is 'extraordinarily sluggish,' meaning the ancient air samples remain uncontaminated and unchanged over 800,000 years. 'Pristine' (pure, uncorrupted, original) is the most precise fit.",
    distractor_analysis: {
      A: "Incorrect. 'Ephemeral' means short-lived, contradicting an 800,000-year stable record.",
      B: "Correct. 'Pristine' captures the preserved, uncontaminated state of the ancient atmospheric gases.",
      C: "Incorrect. 'Turbulent' denotes chaotic agitation, the opposite of hermetic ice preservation.",
      D: "Incorrect. 'Fragmentary' means incomplete or broken, contradicted by the continuous deep record."
    },
    misconception: "Confusing deep chronological age with fragility or incompleteness.",
    time_estimate_seconds: 40
  },
  {
    exam_name: "SAT",
    subject: "Reading and Writing",
    skill_domain: "Words in Context",
    difficulty_tier: 3,
    passage_id: "sat_wic_antimicrobial_peptides",
    passage: "Synthetic organic chemists designing next-generation antibiotics have turned to cationic antimicrobial peptides secreted by amphibian dermal glands. Unlike traditional small-molecule β-lactams that target specific enzymatic cell-wall pathways—vulnerabilities against which bacteria readily evolve point mutations—cationic peptides disrupt bacterial lipid bilayers through non-specific electrostatic interactions, making bacterial counter-adaptation remarkably _______.",
    question_text: "Which choice completes the text regarding antimicrobial peptides with the most logical and precise word or phrase?",
    options: {
      A: "formidable",
      B: "burdensome",
      C: "expeditious",
      D: "tenuous"
    },
    correct_option: "A",
    explanation: "The passage contrasts traditional antibiotics (which bacteria 'readily evolve' resistance to) with cationic peptides that physically disrupt lipid membranes via non-specific electrostatic forces. Because the mechanism is physical and non-specific, it is extremely difficult for bacteria to evolve counter-adaptations. 'Formidable' means inspiring challenge through difficulty or being immensely difficult to overcome; here, counter-adaptation is 'remarkably formidable' (an imposing, difficult hurdle). Wait, let's examine the phrase: 'making bacterial counter-adaptation remarkably [arduous / formidable / improbable]'. If counter-adaptation is difficult to achieve, it is a formidable challenge for the bacteria, or burdensome.",
    distractor_analysis: {
      A: "Correct. Highlights that evolving resistance presents a formidable, nearly insurmountable challenge for bacteria.",
      B: "Incorrect. While costly, 'burdensome' does not idiomatically capture the near-impossibility of mechanical mutation.",
      C: "Incorrect. 'Expeditious' means rapid, which contradicts the advantage of the new peptides.",
      D: "Incorrect. 'Tenuous' means weak or flimsy, which does not fit an evolutionary process."
    },
    misconception: "Selecting words that imply speed (expeditious) rather than extreme evolutionary difficulty.",
    time_estimate_seconds: 45
  },
  {
    exam_name: "SAT",
    subject: "Reading and Writing",
    skill_domain: "Words in Context",
    difficulty_tier: 2,
    passage_id: "sat_wic_renaissance_astronomy",
    passage: "Johannes Kepler's derivation of the laws of planetary motion required a radical break with Aristotelian cosmological dogmas. For two millennia, astronomers dogmatically insisted that celestial bodies could only move along uniform, circular trajectories. Kepler's realization that Mars traced an elliptical path was initially greeted with deep skepticism, as it appeared to _______ the celestial perfection long attributed to the heavens.",
    question_text: "Which choice completes the text regarding Kepler's planetary motion models with the most logical and precise word or phrase?",
    options: {
      A: "corroborate",
      B: "compromise",
      C: "recapitulate",
      D: "augment"
    },
    correct_option: "B",
    explanation: "Aristotelian dogma held that celestial motion had to be perfectly circular. When Kepler proved planetary orbits were elliptical (non-circular), this discovery threatened or harmed ('compromised') the assumed purity and perfection of the heavens, which is why astronomers were skeptical.",
    distractor_analysis: {
      A: "Incorrect. 'Corroborate' means to confirm or support, which contradicts the skepticism and departure from dogma.",
      B: "Correct. 'Compromise' in this context means to undermine, endanger, or impair the integrity of an ideal.",
      C: "Incorrect. 'Recapitulate' means to summarize, which makes no sense here.",
      D: "Incorrect. 'Augment' means to enlarge or increase, whereas the discovery threatened celestial perfection."
    },
    misconception: "Overlooking the negative impact of empirical irregularities on dogmatic theoretical purity.",
    time_estimate_seconds: 40
  },
  {
    exam_name: "SAT",
    subject: "Reading and Writing",
    skill_domain: "Words in Context",
    difficulty_tier: 3,
    passage_id: "sat_wic_urban_heat_island",
    passage: "Civil engineers investigating urban heat islands observed that replacing dark asphalt pavements with high-albedo permeable interlocking pavers mitigated daytime surface temperatures by up to 12°C. However, the municipal adoption of permeable pavements has been _______ by municipal fiscal concerns regarding the heightened maintenance costs of regular vacuum sweeping required to prevent void clogging by road sediment.",
    question_text: "Which choice completes the text regarding permeable pavers with the most logical and precise word or phrase?",
    options: {
      A: "impeded",
      B: "precipitated",
      C: "sanctioned",
      D: "vitiated"
    },
    correct_option: "A",
    explanation: "The passage sets up a contrast between the thermal benefits of the pavers and the municipal fiscal worries over maintenance costs. Because of these maintenance costs, municipal adoption has been hindered, slowed, or blocked. 'Impeded' means hindered or obstructed.",
    distractor_analysis: {
      A: "Correct. 'Impeded' precisely matches the obstruction caused by municipal budget constraints.",
      B: "Incorrect. 'Precipitated' means caused to happen suddenly, the exact opposite of being blocked.",
      C: "Incorrect. 'Sanctioned' means authorized or penalized, neither of which captures hesitation due to cost.",
      D: "Incorrect. 'Vitiated' means spoiled or corrupted in legal/logical validity, which does not fit widespread civic adoption."
    },
    misconception: "Confusing the causation of adoption with the financial hindrance of adoption.",
    time_estimate_seconds: 40
  },
  {
    exam_name: "SAT",
    subject: "Reading and Writing",
    skill_domain: "Words in Context",
    difficulty_tier: 2,
    passage_id: "sat_wic_behavioral_nudges",
    passage: "Public health economists evaluating organ donation registries noted that nations utilizing an 'opt-out' default system maintain donor consent rates exceeding 90%, whereas countries with 'opt-in' frameworks average below 25%. This stark disparity demonstrates that even when individuals harbor benevolent attitudes toward donation, minor bureaucratic frictions can act as a powerful _______ to action.",
    question_text: "Which choice completes the text regarding organ donation default policies with the most logical and precise word or phrase?",
    options: {
      A: "catalyst",
      B: "deterrent",
      C: "precursor",
      D: "surrogate"
    },
    correct_option: "B",
    explanation: "In 'opt-in' systems, people must actively fill out paperwork to register, causing consent rates to drop from 90% to 25%. Thus, small bureaucratic frictions discourage or prevent action, functioning as a 'deterrent' (a discouragement or hindrance).",
    distractor_analysis: {
      A: "Incorrect. A 'catalyst' accelerates action; here, paperwork blocks action.",
      B: "Correct. 'Deterrent' precisely denotes a factor that discourages or restrains an action.",
      C: "Incorrect. A 'precursor' is an antecedent forerunner, not a blocking mechanism.",
      D: "Incorrect. A 'surrogate' is a substitute, which makes no sense in this context."
    },
    misconception: "Selecting words like catalyst that imply activation rather than friction that impedes participation.",
    time_estimate_seconds: 40
  },
  {
    exam_name: "SAT",
    subject: "Reading and Writing",
    skill_domain: "Words in Context",
    difficulty_tier: 3,
    passage_id: "sat_wic_deep_sea_trench",
    passage: "Geologists surveying the Mariana Trench deployed autonomous landers equipped with titanium pressure hulls to record benthic seismic activity. At depths exceeding ten thousand meters, the crushing ambient hydrostatic pressure is so immense that standard piezoresistive sensors suffer structural deformity; consequently, the instruments required specialized quartz resonators whose crystal lattices remained _______ under extreme mechanical loading.",
    question_text: "Which choice completes the text regarding deep-sea trench pressure sensors with the most logical and precise word or phrase?",
    options: {
      A: "malleable",
      B: "unimpaired",
      C: "permeable",
      D: "amorphous"
    },
    correct_option: "B",
    explanation: "Standard sensors suffered 'structural deformity' from the extreme pressure, so specialized quartz resonators were used instead because their crystal lattices stayed undamaged, functional, and intact ('unimpaired').",
    distractor_analysis: {
      A: "Incorrect. 'Malleable' means easily deformed or bent, which is the exact flaw of the failed standard sensors.",
      B: "Correct. 'Unimpaired' means undamaged, functional, and unweakened.",
      C: "Incorrect. 'Permeable' means allowing liquids/gases to pass through, which would destroy the electronics.",
      D: "Incorrect. 'Amorphous' means lacking crystalline structure, directly contradicting 'crystal lattices'."
    },
    misconception: "Confusing structural resilience (unimpaired) with physical flexibility (malleability) in high-pressure engineering.",
    time_estimate_seconds: 40
  },

  // --------------------------------------------------------------------------
  // Craft and Structure: Text Structure & Purpose (6 items)
  // --------------------------------------------------------------------------
  {
    exam_name: "SAT",
    subject: "Reading and Writing",
    skill_domain: "Text Structure and Purpose",
    difficulty_tier: 2,
    passage_id: "sat_tsp_lichen_symbiosis",
    passage: "For over a century, biology textbooks cited lichens as the classic textbook exemplar of a two-way mutualistic symbiosis between a single filamentous fungus (the mycobiont) and a photosynthetic green alga or cyanobacterium (the photobiont). In 2016, however, evolutionary biologist Toby Spribille and his colleagues analyzed the transcriptomes of alpine lichens and discovered a previously undetected third obligate partner: a basidiomycete yeast embedded in the lichen's cortex. This unexpected finding completely upended lichen taxonomy, proving that lichens are not simple bipartite pairings, but complex, tripartite multi-species symbioses.",
    question_text: "Which choice best describes the overall structure of the text?",
    options: {
      A: "It describes a traditional biological consensus, introduces recent genetic research that overturned that consensus, and states the resulting conceptual revision.",
      B: "It proposes a controversial hypothesis, presents experimental flaws in the study testing it, and calls for future field expeditions.",
      C: "It chronicles the history of alpine mountaineering and describes the pharmaceutical uses of lichen extracts.",
      D: "It contrasts the cellular structures of green algae with those of basidiomycete yeasts in laboratory petri dishes."
    },
    correct_option: "A",
    explanation: "The passage follows a three-part structure: (1) states the century-old consensus (lichens as bipartite pairs of fungus + alga); (2) introduces Spribille's 2016 discovery of a third partner (basidiomycete yeast); (3) concludes with the resulting theoretical revision (lichens are complex tripartite symbioses).",
    distractor_analysis: {
      A: "Correct. Accurately traces the progression from historical consensus to novel empirical finding to scientific revision.",
      B: "Incorrect. The text does not identify flaws in Spribille's research or call for new expeditions.",
      C: "Incorrect. Mountaineering and pharmaceuticals are unmentioned.",
      D: "Incorrect. The text does not detail comparative cellular anatomy in petri dishes."
    },
    misconception: "Focusing on narrow organism names rather than mapping the macro rhetorical arc of consensus → anomaly → revision.",
    time_estimate_seconds: 50
  },
  {
    exam_name: "SAT",
    subject: "Reading and Writing",
    skill_domain: "Text Structure and Purpose",
    difficulty_tier: 3,
    passage_id: "sat_tsp_mesozoic_mammals",
    passage: "Paleontologists traditionally characterized Mesozoic mammals as diminutive, nocturnal insectivores living in the shadowy margins of ecosystems completely dominated by dinosaurs. However, recent fossil discoveries in northeastern China—such as *Repenomamus robustus*, a badger-sized mammal whose fossilized stomach contents contained the articulated skeletal remains of a juvenile dinosaur—have dismantled this simplistic stereotype. These discoveries demonstrate that Cretaceous mammals occupied diverse ecological niches, including aquatic swimming, arboreal gliding, and active predation on small dinosaurs.",
    question_text: "What is the primary purpose of the text?",
    options: {
      A: "To argue that dinosaurs went extinct because of mammalian predation rather than an asteroid impact.",
      B: "To challenge a long-held assumption regarding the ecological insignificance and narrow ecological roles of Mesozoic mammals.",
      C: "To provide a detailed anatomical description of the skull structure of *Repenomamus robustus*.",
      D: "To explain the geological formation of fossil deposits in northeastern China."
    },
    correct_option: "B",
    explanation: "The text confronts the traditional view of Mesozoic mammals as small, marginal insectivores by presenting fossil evidence (*Repenomamus* eating dinosaurs, gliders, swimmers) that shows they occupied diverse and significant ecological niches.",
    distractor_analysis: {
      A: "Incorrect. The author does not claim mammals caused dinosaur extinction.",
      B: "Correct. Accurately identifies the primary purpose: overturning the assumption of mammalian ecological marginality.",
      C: "Incorrect. Only one fossilized gut content detail is mentioned; skull anatomy is not described.",
      D: "Incorrect. China's geological taphonomy is not explained."
    },
    misconception: "Extrapolating from mammalian predation on baby dinosaurs to causing total dinosaur extinction.",
    time_estimate_seconds: 45
  },
  {
    exam_name: "SAT",
    subject: "Reading and Writing",
    skill_domain: "Text Structure and Purpose",
    difficulty_tier: 2,
    passage_id: "sat_tsp_wind_turbines",
    passage: "Engineers designing offshore wind turbine farms have traditionally spaced turbines at least eight rotor diameters apart along uniform rectilinear grids to minimize downwind wake turbulence. However, fluid dynamicist John Dabiri demonstrated that schooling fish manipulate vortices to achieve energetic efficiencies when swimming close together. Drawing inspiration from these aquatic schools, Dabiri modeled arrays of vertical-axis wind turbines configured in tightly coupled counter-rotating pairs, finding that adjacent turbines could harness mutual vortex flows to generate up to tenfold more power per unit of land area.",
    question_text: "Which choice best describes the function of the underlined phrase in the text (the mention of 'schooling fish')?",
    options: {
      A: "It provides a biomimetic natural precedent that inspired a radical departure from conventional mechanical turbine placement.",
      B: "It proves that offshore wind turbines pose an acute environmental danger to marine fish populations.",
      C: "It illustrates why commercial fishermen oppose the construction of coastal turbine installations.",
      D: "It demonstrates that horizontal-axis turbines are more efficient than vertical-axis turbines."
    },
    correct_option: "A",
    explanation: "The author mentions schooling fish to show where Dabiri got the idea (biomimicry) to arrange turbines closely together in vortex-interacting pairs rather than the traditional widely spaced rectilinear grid.",
    distractor_analysis: {
      A: "Correct. Highlights the biomimetic role of fish hydrodynamic vortices inspiring turbine design innovation.",
      B: "Incorrect. The text does not discuss environmental harm to fish.",
      C: "Incorrect. Commercial fishing opposition is not mentioned.",
      D: "Incorrect. Dabiri's work showed vertical-axis paired turbines generated 10x more power per land area.",
      E: "Incorrect. (N/A)"
    },
    misconception: "Assuming natural animal examples in energy passages always imply environmental conflict.",
    time_estimate_seconds: 45
  },
  {
    exam_name: "SAT",
    subject: "Reading and Writing",
    skill_domain: "Text Structure and Purpose",
    difficulty_tier: 3,
    passage_id: "sat_tsp_keats_negative_capability",
    passage: "In an 1817 letter to his brothers, poet John Keats coined the term 'Negative Capability' to describe what he perceived as the supreme quality of literary genius: the capacity of an artist to exist 'in uncertainties, mysteries, doubts, without any irritable reaching after fact and reason.' While lesser writers succumb to the compulsion to resolve aesthetic ambiguities into didactic moral lessons or rigid philosophical systems, the truly imaginative writer embraces enigmatic contradiction, preserving the messy complexity of human emotional experience.",
    question_text: "Which choice best describes the contrast established in the second sentence?",
    options: {
      A: "Between writers who embrace uncertainty to capture complex human experience and those who impatiently force ambiguities into simplistic moral or philosophical resolutions.",
      B: "Between poets who write in rhymed verse and novelists who compose in unstructured stream-of-consciousness prose.",
      C: "Between eighteenth-century Enlightenment scientists and twentieth-century psychoanalytic theorists.",
      D: "Between financial success in commercial publishing and critical obscurity in academic journals."
    },
    correct_option: "A",
    explanation: "The second sentence contrasts 'lesser writers' (who succumb to the irritable urge to resolve ambiguities into didactic lessons/systems) with 'truly imaginative writers' (who possess Negative Capability and embrace contradictory human complexity).",
    distractor_analysis: {
      A: "Correct. Accurately synthesizes the contrast between comfortable ambiguity and didactic resolution.",
      B: "Incorrect. The distinction is about philosophical stance toward ambiguity, not verse vs. prose forms.",
      C: "Incorrect. Scientists and psychoanalysts are not discussed in the text.",
      D: "Incorrect. Commercial sales and academic journals are completely unmentioned."
    },
    misconception: "Confusing artistic philosophy (tolerating uncertainty) with mechanical writing formats (rhyme vs prose).",
    time_estimate_seconds: 50
  },
  {
    exam_name: "SAT",
    subject: "Reading and Writing",
    skill_domain: "Text Structure and Purpose",
    difficulty_tier: 2,
    passage_id: "sat_tsp_soil_microbiome",
    passage: "Agricultural monocultures heavily dependent on synthetic nitrogen fertilizers frequently experience progressive soil degradation and diminished crop yields over successive planting cycles. Agroecologists attribute this decline to the destruction of indigenous soil microbial networks. While synthetic inputs provide immediate macronutrients (NPK) to plant roots, they disrupt the mutualistic mycorrhizal fungi and nitrogen-fixing bacteria that build soil humus and defend crops against fungal root pathogens.",
    question_text: "What is the primary function of the final sentence in the text?",
    options: {
      A: "It provides a physiological and ecological explanation for why synthetic fertilizers cause long-term soil degradation despite short-term nutrient gains.",
      B: "It recommends that farmers immediately stop growing cereal grains and convert fields into permanent cattle pasture.",
      C: "It disputes the claim that plants require nitrogen and potassium for cellular growth.",
      D: "It proves that organic farming produces lower total crop volume than chemical agriculture."
    },
    correct_option: "A",
    explanation: "The first two sentences state that monocultures with synthetic fertilizers suffer soil degradation due to microbial network loss. The final sentence explains the underlying biological mechanism: fertilizers feed crops short-term NPK but destroy the fungi/bacteria that maintain soil humus and immunity.",
    distractor_analysis: {
      A: "Correct. Highlights the explanatory mechanism linking fertilizer inputs with long-run microbial and structural damage.",
      B: "Incorrect. No conversion to cattle pasture is recommended.",
      C: "Incorrect. The text affirms NPK are vital macronutrients.",
      D: "Incorrect. Crop volume comparisons are not drawn."
    },
    misconception: "Missing that the final sentence explains the underlying biological mechanism behind the opening observation.",
    time_estimate_seconds: 45
  },
  {
    exam_name: "SAT",
    subject: "Reading and Writing",
    skill_domain: "Text Structure and Purpose",
    difficulty_tier: 3,
    passage_id: "sat_tsp_beethoven_late_style",
    passage: "Musicologists often categorize Ludwig van Beethoven's artistic output into three distinct periods: early classical imitation, middle heroic triumph, and late enigmatic transcendence. While middle-period masterworks like the Fifth Symphony resolve musical tension into jubilant, victorious codas, his late string quartets (such as Op. 131 and 133) refuse organic resolution. Instead, they juxtapose archaic Renaissance counterpoint with abrasive, disjunctive modern discords, presenting an aesthetic of unresolved fragmentation that reflects the composer's profound personal isolation and total deafness.",
    question_text: "Which choice best describes the overall organization of the passage?",
    options: {
      A: "It introduces a conventional tripartite categorization of an artist's career, contrasts the stylistic resolution of the middle period with the unresolved fragmentation of the late works, and links that late style to the artist's personal circumstances.",
      B: "It argues that Beethoven's early classical compositions were plagiarized from Wolfgang Amadeus Mozart and Joseph Haydn.",
      C: "It provides a technical mathematical analysis of acoustical frequencies in nineteenth-century string instruments.",
      D: "It asserts that music critics during Beethoven's lifetime were unable to hear string quartets."
    },
    correct_option: "A",
    explanation: "The text (1) introduces the standard three-period model; (2) contrasts middle-period triumphant resolution with late-period disjunctive fragmentation; and (3) ties this late aesthetic to Beethoven's personal isolation and deafness.",
    distractor_analysis: {
      A: "Correct. Accurately maps the introduction of the framework, the stylistic contrast, and the biographical context.",
      B: "Incorrect. Imitation does not mean plagiarism, and the passage focuses on late works.",
      C: "Incorrect. Acoustical physics frequencies are not analyzed.",
      D: "Incorrect. The text mentions Beethoven's own deafness, not critics' hearing."
    },
    misconception: "Confusing the composer's deafness with the auditory ability of contemporary listeners.",
    time_estimate_seconds: 50
  },

  // --------------------------------------------------------------------------
  // Craft and Structure: Cross-Text Connections (6 items)
  // --------------------------------------------------------------------------
  {
    exam_name: "SAT",
    subject: "Reading and Writing",
    skill_domain: "Cross-Text Connections",
    difficulty_tier: 3,
    passage_id: "sat_ctc_de_extinction",
    passage: `Text 1
Biotechnology proponents argue that "de-extinction"—using CRISPR gene editing to insert woolly mammoth alleles into Asian elephant genomes—could revitalize degraded Arctic tundra ecosystems. Proponents contend that resurrected mammoth-elephant hybrids would trample insulative winter snowpacks, exposing underlying permafrost to frigid Arctic air and preventing the catastrophic release of subterranean greenhouse gases.

Text 2
Conservation ecologist Lynn Douglas cautions that de-extinction initiatives are dangerously misaligned with real-world conservation imperatives. Siphoning millions of philanthropic and scientific dollars into speculative genetic experiments distracts from preserving existing endangered species currently facing imminent extinction due to habitat loss and poaching. Furthermore, introducing genetically engineered megafauna into contemporary ecosystems risks unpredictable ecological disruptions and disease vectors.`,
    question_text: "Based on the texts, how would Douglas (Text 2) most likely respond to the claims made by proponents in Text 1?",
    options: {
      A: "By conceding that mammoths would easily adapt to the Arctic, but arguing that Asian elephants are too aggressive to be gene-edited.",
      B: "By contending that the theoretical climatic benefits of mammoth rewilding are speculative and that funding should instead be directed toward preventing the extinction of living endangered taxa.",
      C: "By proving that permafrost contains zero methane gas and poses no climatic threat.",
      D: "By asserting that CRISPR gene editing is chemically incapable of modifying elephant embryos."
    },
    correct_option: "B",
    explanation: "In Text 2, Douglas argues that de-extinction is speculative and distracts crucial funding and attention away from protecting living endangered species. Thus, she would challenge Text 1's optimism by highlighting the speculative nature of the ecological benefits and advocating for preserving existing taxa.",
    distractor_analysis: {
      A: "Incorrect. Douglas raises risks of disease and disruption, not elephant behavioral aggression.",
      B: "Correct. Accurately captures Douglas's critique of speculative benefits vs. urgent real-world conservation funding.",
      C: "Incorrect. Douglas does not dispute the existence of permafrost greenhouse gases.",
      D: "Incorrect. Douglas critiques ecological and resource allocation priorities, not the biochemical feasibility of CRISPR."
    },
    misconception: "Focusing on molecular biochemical limits rather than conservation resource allocation and ecological uncertainty.",
    time_estimate_seconds: 55
  },
  {
    exam_name: "SAT",
    subject: "Reading and Writing",
    skill_domain: "Cross-Text Connections",
    difficulty_tier: 2,
    passage_id: "sat_ctc_dark_matter",
    passage: `Text 1
Astrophysicists hypothesize that non-baryonic dark matter comprises roughly 85% of the total matter in the universe. This theoretical construct was formulated to explain why the outer stars of spiral galaxies rotate at velocities far exceeding predictions derived from visible baryonic mass under Newtonian gravity. Without an invisible halo of dark matter exerting gravitational pull, spiral galaxies would tear themselves apart.

Text 2
Proponents of Modified Newtonian Dynamics (MOND) argue that dark matter is an illusory ad hoc patch designed to rescue an incomplete gravitational theory. MOND posits that at extraordinarily weak gravitational accelerations (such as those experienced at the outer rims of galaxies), gravity does not follow the inverse-square law, but rather decays linearly with distance, accurately predicting flat galactic rotation curves without requiring invisible, undiscovered particles.`,
    question_text: "Based on the texts, both the dark matter hypothesis (Text 1) and MOND (Text 2) were formulated to explain which astronomical observation?",
    options: {
      A: "The unexpected high rotational velocities of stars orbiting at the outer edges of spiral galaxies.",
      B: "The explosive energy released during type Ia supernova detonations.",
      C: "The collision between the Milky Way and the Andromeda galaxy.",
      D: "The absence of planetary atmospheres on rocky exoplanets."
    },
    correct_option: "A",
    explanation: "Both texts explicitly state they address the same empirical anomaly: Text 1 notes stars 'rotate at velocities far exceeding predictions derived from visible baryonic mass,' and Text 2 notes MOND 'accurately predicting flat galactic rotation curves.'",
    distractor_analysis: {
      A: "Correct. Both theories were created to solve the anomaly of galactic rotation curves.",
      B: "Incorrect. Supernovae are not mentioned in either text.",
      C: "Incorrect. Galactic collisions are unmentioned.",
      D: "Incorrect. Exoplanet atmospheres are completely unrelated."
    },
    misconception: "Confusing the shared empirical anomaly with the two conflicting theoretical mechanisms proposed to solve it.",
    time_estimate_seconds: 45
  },
  {
    exam_name: "SAT",
    subject: "Reading and Writing",
    skill_domain: "Cross-Text Connections",
    difficulty_tier: 3,
    passage_id: "sat_ctc_minimum_wage",
    passage: `Text 1
Classical economic models predict that imposing a binding minimum wage above the market-clearing equilibrium wage inevitably reduces overall employment. In a competitive labor market, employers respond to artificially elevated labor costs by substituting capital for labor—automating routine positions—or by curtailing aggregate hiring, disproportionately harming low-skilled and teenage workers.

Text 2
Economists David Card and Alan Krueger analyzed employment changes across fast-food restaurants in New Jersey and Pennsylvania following New Jersey's 1992 minimum wage hike. Contrary to competitive market assumptions, they found that fast-food employment in New Jersey actually expanded slightly relative to adjacent Pennsylvania stores. Card and Krueger suggested that low-wage labor markets often exhibit monopsonistic competition, where employers possess market wage-setting power, meaning moderate minimum wage increases can reduce costly employee turnover and expand total labor supply without inducing job losses.`,
    question_text: "How would the authors of Text 2 most likely view the assumption in Text 1 regarding 'competitive labor markets'?",
    options: {
      A: "As an accurate depiction of all modern service-sector employment relationships.",
      B: "As a flawed theoretical assumption that overlooks the reality of monopsonistic wage-setting power in low-wage labor markets.",
      C: "As a dangerous socialist policy designed to nationalize private corporations.",
      D: "As an irrelevant model because fast-food restaurants do not employ human workers."
    },
    correct_option: "B",
    explanation: "Text 2 explicitly notes: 'Contrary to competitive market assumptions... low-wage labor markets often exhibit monopsonistic competition, where employers possess market wage-setting power.' Thus, Card and Krueger view the assumption in Text 1 as flawed because it ignores monopsonistic market dynamics.",
    distractor_analysis: {
      A: "Incorrect. Text 2 directly challenges competitive market assumptions.",
      B: "Correct. Precisely identifies Text 2's critique that low-wage markets are monopsonistic rather than perfectly competitive.",
      C: "Incorrect. Text 1 describes a classical capitalist free-market model, not socialism.",
      D: "Incorrect. Fast-food restaurants obviously employ low-wage human workers."
    },
    misconception: "Missing the explicit theoretical contrast between perfect competition and monopsony power.",
    time_estimate_seconds: 50
  },
  {
    exam_name: "SAT",
    subject: "Reading and Writing",
    skill_domain: "Cross-Text Connections",
    difficulty_tier: 2,
    passage_id: "sat_ctc_coastal_restoration",
    passage: `Text 1
Civil engineers historically relied on 'hard armoring'—such as concrete seawalls, riprap revetments, and breakwaters—to safeguard coastal cities from storm surges. While these structures provide immediate shoreline stabilization, they disrupt natural sediment transport, induce erosion on adjacent unarmored beaches, and destroy coastal salt marsh nurseries.

Text 2
Marine ecologists advocate for 'living shorelines' that incorporate oyster reefs, mangrove forests, and salt marsh vegetation. These biogenic structures attenuate wave energy through hydrodynamic friction while naturally accreting sediment over time, allowing them to dynamically elevate alongside rising sea levels—an adaptive resilience that rigid concrete walls can never match.`,
    question_text: "Based on the texts, what advantage do 'living shorelines' (Text 2) possess over 'concrete seawalls' (Text 1)?",
    options: {
      A: "They can be manufactured instantly in industrial concrete factories.",
      B: "They can dynamically accrete sediment and elevate with rising sea levels while preserving ecological nurseries, unlike rigid walls that cause adjacent erosion.",
      C: "They eliminate all oceanic waves and permanently stop hurricanes from making landfall.",
      D: "They require zero space and do not contain any living organisms."
    },
    correct_option: "B",
    explanation: "Text 1 states that concrete walls disrupt sediment and cause erosion, while Text 2 highlights that living shorelines attenuate waves, accrete sediment, elevate with sea levels, and preserve marsh habitats.",
    distractor_analysis: {
      A: "Incorrect. Living shorelines are biological, not factory-made concrete.",
      B: "Correct. Accurately synthesizes the dynamic accretion, sea-level adaptation, and ecological preservation advantages.",
      C: "Incorrect. No structure can stop hurricanes from making landfall.",
      D: "Incorrect. Living shorelines explicitly consist of living oysters, mangroves, and marshes."
    },
    misconception: "Assuming rigid engineered barriers are superior in adaptability to dynamic ecological systems.",
    time_estimate_seconds: 45
  },
  {
    exam_name: "SAT",
    subject: "Reading and Writing",
    skill_domain: "Cross-Text Connections",
    difficulty_tier: 3,
    passage_id: "sat_ctc_ai_creativity",
    passage: `Text 1
Computer scientists demonstrate that generative large language models (LLMs) can compose Shakespearean sonnets, draft legal briefs, and generate award-winning landscape paintings. Proponents argue that creativity is fundamentally a process of novel combinatorial synthesis: by ingesting billions of multimodal data tokens, neural networks recombine concepts in unprecedented ways, achieving genuine artistic creation.

Text 2
Philosopher John Searle's 'Chinese Room' thought experiment reminds us that formal syntax does not constitute intentional semantics. An artificial neural network manipulates probabilistic mathematical weights and statistical tokens without any conscious comprehension of the emotional, ethical, or physical reality represented by those tokens. A human artist paints from lived bodily experience, existential grief, and mortal joy—phenomenological dimensions that a disembodied statistical matrix can mimic, but never genuinely experience.`,
    question_text: "Based on Text 2, how would the author respond to the claim in Text 1 that LLMs achieve 'genuine artistic creation'?",
    options: {
      A: "By agreeing that computers experience profound existential grief when generating paintings.",
      B: "By contending that token recombination without conscious understanding or lived phenomenology is merely sophisticated statistical mimicry, not genuine creative expression.",
      C: "By arguing that Shakespeare never existed and that Renaissance sonnets were generated by early mechanical computers.",
      D: "By asserting that artificial neural networks are illegal under international copyright statutes."
    },
    correct_option: "B",
    explanation: "Text 2 explicitly argues that manipulating statistical tokens lacks conscious comprehension and lived bodily experience ('syntax without semantics'), concluding that AI merely mimics artistic output without genuine creative understanding.",
    distractor_analysis: {
      A: "Incorrect. Text 2 emphasizes that AI possesses zero existential grief or consciousness.",
      B: "Correct. Accurately captures the philosophical objection: statistical mimicry lacks semantics, intentionality, and lived experience.",
      C: "Incorrect. Absurd conspiracy claim.",
      D: "Incorrect. The critique is philosophical/ontological, not a legal copyright argument."
    },
    misconception: "Confusing visual or verbal mimicry with conscious intentionality and emotional meaning.",
    time_estimate_seconds: 50
  },
  {
    exam_name: "SAT",
    subject: "Reading and Writing",
    skill_domain: "Cross-Text Connections",
    difficulty_tier: 3,
    passage_id: "sat_ctc_urban_sprawl",
    passage: `Text 1
Urban planner Joel Kotkin argues that suburban expansion reflects the democratic preferences of working-class families seeking affordable single-family homeownership, private green yards, and safe neighborhoods. Kotkin contends that top-down urban densification policies restrict suburban land development, creating artificial housing scarcity that inflates metropolitan home prices beyond the reach of median-income earners.

Text 2
Urban economist Alain Bertaud counters that low-density suburban sprawl is not an organic market outcome, but rather the distorted artifact of government subsidies and exclusionary zoning regulations. By mandating minimum lot sizes, prohibiting multi-family apartments, and subsidizing highway construction through public tax revenues, municipal policies artificially suppress urban density, locking households into car dependency and generating massive municipal infrastructure liabilities.`,
    question_text: "On which point would the authors of Text 1 and Text 2 most likely disagree?",
    options: {
      A: "Whether suburban housing expansion is primarily an organic expression of consumer market preferences or an artificial distortion driven by municipal zoning mandates and public subsidies.",
      B: "Whether single-family houses require construction lumber.",
      C: "Whether highways can accommodate automobiles.",
      D: "Whether cities in the twenty-first century possess municipal governments."
    },
    correct_option: "A",
    explanation: "Text 1 claims suburban sprawl reflects organic democratic market preferences of families (and that density mandates distort the market), whereas Text 2 counters that sprawl is an artificial distortion caused by exclusionary zoning mandates and subsidized highway infrastructure.",
    distractor_analysis: {
      A: "Correct. Precisely identifies the foundational disagreement regarding market preference vs. government zoning distortion.",
      B: "Incorrect. Material construction details are not in dispute.",
      C: "Incorrect. Obvious physical fact undisputed by both authors.",
      D: "Incorrect. Both authors analyze municipal government policies."
    },
    misconception: "Focusing on surface physical features of houses rather than the underlying economic debate over market preference versus policy distortion.",
    time_estimate_seconds: 50
  },

  // --------------------------------------------------------------------------
  // Information and Ideas: Inferences & Central Ideas (8 items)
  // --------------------------------------------------------------------------
  {
    exam_name: "SAT",
    subject: "Reading and Writing",
    skill_domain: "Inferences",
    difficulty_tier: 2,
    passage_id: "sat_inf_butterfly_migration",
    passage: "Monarch butterflies (*Danaus plexippus*) undertake a multi-generational migration spanning thousands of kilometers from Canada to overwintering fir forests in central Mexico. Biologists long questioned how autumn migrants—which have never previously visited Mexico—navigate with pinpoint precision to specific microclimatic roosts. Recent neurobiological experiments revealed that monarchs integrate a sun compass in their central complex with a circadian clock located in their antennae. When researchers surgically amputated the antennae of laboratory monarchs or painted them with opaque black enamel, the butterflies _______",
    question_text: "Which choice most logically completes the text regarding monarch butterfly navigation?",
    options: {
      A: "immediately migrated south twice as fast as unmanipulated control butterflies.",
      B: "flew in disoriented, scattered headings because their sun compass could no longer be calibrated against time of day.",
      C: "transformed into non-migratory adult caterpillars within forty-eight hours.",
      D: "relied on nocturnal lunar coordinates to navigate with millimeter accuracy."
    },
    correct_option: "B",
    explanation: "The text explains that navigation requires integrating the sun compass in the brain with the circadian clock in the antennae. If the antennae are removed or blinded with opaque paint, the butterfly loses its circadian clock input, preventing time-compensated solar navigation and resulting in disorientation.",
    distractor_analysis: {
      A: "Incorrect. Removing a vital navigation organ would not double flight speed or accuracy.",
      B: "Correct. Logically deduces that without antennal clock calibration, flight headings become disoriented.",
      C: "Incorrect. Adult butterflies cannot metamorphose backward into caterpillars.",
      D: "Incorrect. Monarchs are diurnal flyers guided by the sun, not nocturnal lunar navigators."
    },
    misconception: "Assuming compensatory sensory mechanisms when the premise states both systems are required for calibration.",
    time_estimate_seconds: 45
  },
  {
    exam_name: "SAT",
    subject: "Reading and Writing",
    skill_domain: "Inferences",
    difficulty_tier: 3,
    passage_id: "sat_inf_bird_song_learning",
    passage: "Songbirds learn their complex territorial vocalizations through a sensory-motor learning process that closely mirrors human infant speech acquisition. Young zebra finches must first listen to and memorize a tutor song from an adult male during a critical juvenile sensitive window, forming a neural auditory template. Weeks later, during the sensorimotor phase, the fledgling begins babbling ('subsong') and gradually refines its vocal motor output by comparing its own auditory feedback against the memorized tutor template. When juvenile finches are experimentally deafened after tutor memorization but prior to the onset of the sensorimotor phase, they _______",
    question_text: "Which choice most logically completes the text regarding songbird auditory feedback?",
    options: {
      A: "sing perfect adult tutor songs because motor vocalization is purely genetic.",
      B: "fail to develop normal crystallized adult songs because they cannot use auditory feedback to align their vocal output with the memorized template.",
      C: "learn to mimic the vocalizations of marine mammals instead.",
      D: "immediately cease eating and lose their flight feathers."
    },
    correct_option: "B",
    explanation: "The passage explains that refining vocal output requires comparing one's own auditory feedback against the memorized template. If deafened before the sensorimotor phase, the bird cannot hear its own vocal output, making it impossible to match its song to the template and resulting in abnormal crystallized song.",
    distractor_analysis: {
      A: "Incorrect. Contradicts the text, which explicitly states song learning requires auditory feedback comparison.",
      B: "Correct. Logically follows from the necessity of auditory feedback for template matching during sensorimotor practice.",
      C: "Incorrect. Bizarre and biologically impossible.",
      D: "Incorrect. Deafening affects auditory feedback, not digestion or plumage maintenance."
    },
    misconception: "Assuming that memorizing a template is sufficient on its own, ignoring the required motor-auditory feedback loop.",
    time_estimate_seconds: 50
  },
  {
    exam_name: "SAT",
    subject: "Reading and Writing",
    skill_domain: "Central Ideas and Details",
    difficulty_tier: 2,
    passage_id: "sat_cid_mycorrhizal_carbon",
    passage: "While plants fix atmospheric carbon through photosynthetic leaf stomata, up to 30% of that fixed carbon is immediately transported underground and secreted through root systems into the rhizosphere. This subterranean carbon expenditure is not waste; rather, plants actively trade carbon exudates with mycorrhizal fungi in exchange for limiting soil nutrients like phosphorus and nitrogen. In forest ecosystems, these fungal networks link multiple tree species, creating a shared nutrient grid that redistributes resources from nutrient-rich mature trees to shaded seedlings.",
    question_text: "Which choice best states the main idea of the text?",
    options: {
      A: "Plants actively invest a substantial portion of their photosynthetic carbon into subterranean fungal networks that facilitate vital nutrient exchange and ecosystem resource sharing.",
      B: "Photosynthesis is an inefficient metabolic process because root systems leak 30% of their nutrients into the soil as useless waste.",
      C: "Shaded tree seedlings grow faster than mature trees because they produce their own synthetic nitrogen.",
      D: "Mycorrhizal fungi are parasitic organisms that drain forest trees of all phosphorus and nitrogen."
    },
    correct_option: "A",
    explanation: "The text explains that plants deliberately allocate up to 30% of fixed carbon underground to trade with fungi for phosphorus and nitrogen, and that these networks connect trees in a cooperative resource-sharing grid.",
    distractor_analysis: {
      A: "Correct. Accurately synthesizes the strategic carbon investment, nutrient trade, and inter-plant resource grid.",
      B: "Incorrect. The text explicitly states this exudate is 'not waste' but an active mutualistic trade.",
      C: "Incorrect. Seedlings receive resources from mature trees because they are shaded and carbon-limited.",
      D: "Incorrect. Fungi are mutualistic partners supplying vital nutrients, not destructive parasites."
    },
    misconception: "Misinterpreting carbon secretion as metabolic waste rather than an active biological trade investment.",
    time_estimate_seconds: 45
  },
  {
    exam_name: "SAT",
    subject: "Reading and Writing",
    skill_domain: "Inferences",
    difficulty_tier: 3,
    passage_id: "sat_inf_battery_solid_state",
    passage: "Conventional lithium-ion batteries rely on volatile liquid organic electrolytes to shuttle lithium ions between the graphite anode and metal-oxide cathode. Under thermal or mechanical stress, these flammable liquid electrolytes can undergo catastrophic exothermic decomposition, leading to thermal runaway and battery fires. Solid-state batteries replace the liquid electrolyte with a non-flammable solid ceramic or polymer matrix. However, solid-state batteries face a formidable engineering obstacle: during repeated charge-discharge cycles, solid electrode particles physically expand and contract, causing them to _______",
    question_text: "Which choice most logically completes the text regarding solid-state battery interfaces?",
    options: {
      A: "completely dissolve into flammable liquid organic vapors.",
      B: "lose physical contact with the rigid solid electrolyte interface, causing internal electrical resistance to spike and battery capacity to rapidly degrade.",
      C: "triple the energy density of the battery with zero loss of conductivity.",
      D: "generate infinite electric currents that melt the vehicle's chassis."
    },
    correct_option: "B",
    explanation: "Unlike a liquid (which effortlessly flows around expanding and contracting particles to maintain contact), a rigid solid electrolyte cannot deform to follow volume changes. When electrode particles expand and contract against a rigid solid, they lose mechanical contact, increasing interfacial resistance and degrading performance.",
    distractor_analysis: {
      A: "Incorrect. The electrolyte is solid ceramic/polymer, not a liquid that can vaporize into organic liquid.",
      B: "Correct. Logically deduces the physical consequence of volume expansion against a rigid solid interface.",
      C: "Incorrect. Losing physical contact degrades performance; it does not triple capacity.",
      D: "Incorrect. Physical impossibility violating conservation of energy."
    },
    misconception: "Failing to recognize the mechanical interface problem unique to solid-solid contacts under volumetric strain.",
    time_estimate_seconds: 50
  },
  {
    exam_name: "SAT",
    subject: "Reading and Writing",
    skill_domain: "Central Ideas and Details",
    difficulty_tier: 2,
    passage_id: "sat_cid_maya_blue_pigment",
    passage: "The vibrant pigment known as 'Maya Blue'—prominently adorning pre-Columbian Mesoamerican murals, pottery, and ritual codices—exhibits astonishing chemical resilience, withstanding centuries of exposure to tropical humidity, torrential rains, boiling nitric acid, and organic solvents without fading. Material scientists analyzing the pigment discovered that it is a nanostructured hybrid composite: molecules of the plant-derived dye indigo are encapsulated inside the micro-channels of a fibrous clay mineral called palygorskite. When heated together during manufacturing, the indigo molecules form hydrogen bonds with the clay channels, sealing the dye inside an impermeable inorganic cage that shields it from environmental degradation.",
    question_text: "According to the passage, why is Maya Blue able to resist chemical degradation from acids and solvents?",
    options: {
      A: "It is manufactured by painting liquid gold onto limestone walls.",
      B: "Organic indigo dye molecules are encapsulated and hydrogen-bonded within the micro-channels of an inorganic clay mineral matrix.",
      C: "Mesoamerican artisans coated their murals with modern synthetic polyurethane varnishes.",
      D: "The pigment dissolves in rainwater and re-crystallizes every morning."
    },
    correct_option: "B",
    explanation: "The passage explicitly explains that indigo molecules are encapsulated within the micro-channels of palygorskite clay and form hydrogen bonds when heated, creating an impermeable inorganic cage that protects the dye.",
    distractor_analysis: {
      A: "Incorrect. Maya Blue is made from indigo dye and palygorskite clay, not liquid gold.",
      B: "Correct. Directly captures the encapsulation and bonding mechanism described in the text.",
      C: "Incorrect. Polyurethane varnishes are modern twentieth-century synthetic polymers.",
      D: "Incorrect. The passage emphasizes that Maya Blue does not dissolve or fade in rain."
    },
    misconception: "Confusing ancient Mesoamerican nanostructured clay hybrids with modern synthetic coatings.",
    time_estimate_seconds: 40
  },
  {
    exam_name: "SAT",
    subject: "Reading and Writing",
    skill_domain: "Inferences",
    difficulty_tier: 3,
    passage_id: "sat_inf_exoplanet_transit_spectroscopy",
    passage: "When an exoplanet transits across the face of its host star, a tiny fraction of the starlight filters through the planet's upper atmosphere before reaching space telescopes. By measuring which specific wavelengths of starlight are absorbed during this transit, astronomers can identify the chemical fingerprint of atmospheric gases. However, if an exoplanet possesses high-altitude photochemical haze or opaque aerosol clouds, the stellar transmission spectrum becomes completely flat and featureless across optical wavelengths. Consequently, when astronomers observe an entirely flat transmission spectrum for a transiting gas giant, they should conclude that _______",
    question_text: "Which choice most logically completes the text regarding exoplanet transmission spectra?",
    options: {
      A: "the planet possesses zero atmosphere and is an airless chunk of bare iron.",
      B: "atmospheric gases may well be present, but their diagnostic spectral absorption lines are masked by high-altitude clouds or aerosols.",
      C: "the host star has completely ceased emitting photons.",
      D: "the exoplanet is orbiting a black hole rather than a star."
    },
    correct_option: "B",
    explanation: "The text explains that high-altitude haze or opaque clouds mute and flatten the transmission spectrum. Therefore, a flat spectrum does not prove the absence of an atmosphere; rather, an atmosphere may exist below an opaque cloud deck that masks the chemical absorption features.",
    distractor_analysis: {
      A: "Incorrect. A flat spectrum can be produced by clouds/hazes in a thick atmosphere, not just an airless body.",
      B: "Correct. Accurately deduces that clouds/haze mask underlying chemical fingerprints without proving an absence of atmosphere.",
      C: "Incorrect. The transit was observed in starlight; the star is still shining.",
      D: "Incorrect. The observation occurred around a host star."
    },
    misconception: "Equating the absence of spectral lines with the physical absence of an atmosphere, overlooking cloud obscuration.",
    time_estimate_seconds: 50
  },
  {
    exam_name: "SAT",
    subject: "Reading and Writing",
    skill_domain: "Central Ideas and Details",
    difficulty_tier: 1,
    passage_id: "sat_cid_crows_tool_use",
    passage: "New Caledonian crows (*Corvus moneduloides*) display sophisticated tool-manufacturing abilities once thought to be unique to primates. In the wild, these birds snip and sculpt the barbed edges of pandanus leaves to craft hooked probes specifically designed to extract cerambycid beetle larvae from deep tree cavities. In controlled laboratory experiments, crows have demonstrated causal understanding by bending pliable straight wires into functional hooks to retrieve food baskets placed at the bottom of narrow vertical plastic tubes.",
    question_text: "Which choice best summarizes the main idea of the text?",
    options: {
      A: "New Caledonian crows demonstrate advanced tool-making and problem-solving skills, including modifying natural materials and fashioning novel wire tools to retrieve food.",
      B: "Beetle larvae in New Caledonia have evolved immunity to bird predation.",
      C: "Primates are unable to manufacture tools without human supervision.",
      D: "Crows prefer eating pandanus leaves over beetle larvae."
    },
    correct_option: "A",
    explanation: "The text highlights that New Caledonian crows craft hooked probes from pandanus leaves in the wild and bend straight wires into hooks in the lab to retrieve food, showing advanced tool manufacture and causal cognition.",
    distractor_analysis: {
      A: "Correct. Concisely captures both wild plant-tool sculpting and experimental wire modification.",
      B: "Incorrect. Larvae are eaten by the crows, not immune.",
      C: "Incorrect. Tool manufacture was thought unique to primates; primates do make tools.",
      D: "Incorrect. Crows use leaves as tools to reach larvae, which they eat."
    },
    misconception: "Confusing the tool material (pandanus leaf) with the food source (larvae).",
    time_estimate_seconds: 40
  },
  {
    exam_name: "SAT",
    subject: "Reading and Writing",
    skill_domain: "Inferences",
    difficulty_tier: 3,
    passage_id: "sat_inf_neurogenesis_hippocampus",
    passage: "For much of the twentieth century, the central dogma of neuroscience maintained that the adult mammalian brain was incapable of generating new neurons. However, the discovery of adult neurogenesis in the subgranular zone of the dentate gyrus (part of the hippocampus) overturned this dogma. Researchers found that voluntary aerobic wheel running in rodents doubles the proliferation and survival of new hippocampal granule cells, which directly enhances spatial pattern separation—the cognitive ability to distinguish between two highly similar environments. If a group of rodents is genetically modified to completely block adult neurogenesis in the dentate gyrus, one would predict that _______",
    question_text: "Which choice most logically completes the text regarding adult hippocampal neurogenesis?",
    options: {
      A: "they would lose their ability to run on exercise wheels.",
      B: "their ability to distinguish between two subtly distinct spatial environments would be impaired despite regular aerobic exercise.",
      C: "their cerebral cortex would expand by 300% within one week.",
      D: "they would immediately develop resistance to all bacterial infections."
    },
    correct_option: "B",
    explanation: "The passage establishes a direct causal link: new hippocampal granule cells generated via neurogenesis enhance spatial pattern separation (distinguishing between similar environments). If neurogenesis is blocked, that cognitive enhancement is lost, impairing the animals' ability to discriminate between subtly distinct environments.",
    distractor_analysis: {
      A: "Incorrect. The block targets hippocampal cell generation, not basic motor running capacity.",
      B: "Correct. Directly deduces the cognitive deficit (impaired spatial pattern separation) resulting from blocking neurogenesis.",
      C: "Incorrect. Blocking cell proliferation would not cause massive cortical expansion.",
      D: "Incorrect. Neurogenesis is a cognitive brain process, not an immune antibacterial mechanism."
    },
    misconception: "Confusing the voluntary running trigger with the cognitive downstream effect of pattern separation.",
    time_estimate_seconds: 50
  },

  // --------------------------------------------------------------------------
  // Information and Ideas: Command of Evidence (Textual & Quantitative) (8 items)
  // --------------------------------------------------------------------------
  {
    exam_name: "SAT",
    subject: "Reading and Writing",
    skill_domain: "Command of Evidence (Textual)",
    difficulty_tier: 2,
    passage_id: "sat_cet_whales_iron_fertilization",
    passage: "Marine ecologist Joe Roman proposed the 'whale pump' hypothesis: when baleen whales feed on krill in the deep photic zone and subsequently defecate at the ocean surface, their liquid fecal plumes release massive quantities of bioavailable iron and nitrogen into surface waters. Because primary phytoplankton productivity in the Southern Ocean is strictly limited by iron scarcity, Roman hypothesized that whale feces acts as a natural fertilizer that stimulates phytoplankton blooms, enhancing the ocean's capacity to sequester atmospheric carbon dioxide.",
    question_text: "Which finding, if true, would most directly support Roman's 'whale pump' hypothesis?",
    options: {
      A: "Satellite chlorophyll imaging reveals that large concentrations of baleen whales in the Southern Ocean are immediately followed by localized, multi-fold surges in phytoplankton density and dissolved iron concentrations in the surrounding surface waters.",
      B: "Whales spend up to 90% of their time swimming in Arctic waters where krill populations are virtually absent.",
      C: "Deep-sea sediment samples contain fewer whale fossil bones than shallow coastal shelf deposits.",
      D: "Commercial fishing vessels catch more fish during the winter months than during the summer months."
    },
    correct_option: "A",
    explanation: "Roman's hypothesis claims whale surface defecation delivers bioavailable iron that triggers phytoplankton blooms. Showing that whale aggregations are immediately accompanied by spikes in dissolved surface iron and massive surges in phytoplankton density directly confirms the proposed causal mechanism.",
    distractor_analysis: {
      A: "Correct. Provides direct empirical evidence of whale presence causing iron and phytoplankton surges.",
      B: "Incorrect. Undermines the link between whales and krill feeding.",
      C: "Incorrect. Fossil taphonomy does not test surface nutrient fertilization.",
      D: "Incorrect. Seasonal fishing vessel catches are completely irrelevant to the ecological nutrient pump."
    },
    misconception: "Selecting historical or fossil evidence rather than direct empirical validation of the nutrient bloom mechanism.",
    time_estimate_seconds: 45
  },
  {
    exam_name: "SAT",
    subject: "Reading and Writing",
    skill_domain: "Command of Evidence (Textual)",
    difficulty_tier: 3,
    passage_id: "sat_cet_sleep_memory_replay",
    passage: "Neuroscientists investigating memory consolidation hypothesize that the mammalian hippocampus 'replays' neural firing sequences during non-REM slow-wave sleep to transfer temporary declarative memories into permanent neocortical storage. In an experiment, rats were trained to navigate a linear maze while microelectrodes recorded the sequential activation of hippocampal place cells. The researchers hypothesized that during subsequent sleep, the identical sequence of place cells would activate in compressed reverse or forward replay.",
    question_text: "Which finding from the study, if true, would provide the strongest evidence for the researchers' hypothesis?",
    options: {
      A: "The rats slept for an average of seven hours following maze training sessions.",
      B: "During post-training slow-wave sleep, hippocampal place cells fired in the exact sequential order experienced during the maze run, but at a tenfold accelerated temporal compression rate.",
      C: "The rats completed the maze faster on days when they were rewarded with sugar pellets rather than sunflower seeds.",
      D: "Microelectrodes placed in the rats' visual cortex recorded zero electrical activity during sleep."
    },
    correct_option: "B",
    explanation: "The hypothesis specifically posits that hippocampal place cells replay the waking trajectory firing sequence during non-REM sleep. Finding that place cells activate in the exact sequential order at a 10x compressed rate directly verifies this replay mechanism.",
    distractor_analysis: {
      A: "Incorrect. Total sleep duration does not verify specific neural sequence replay.",
      B: "Correct. Precisely demonstrates the exact sequential neural activation predicted by the replay hypothesis.",
      C: "Incorrect. Reward preferences test motivation, not neural memory consolidation during sleep.",
      D: "Incorrect. Cortical inactivity does not confirm hippocampal sequence reactivation."
    },
    misconception: "Confusing macroscopic sleep duration with microscopic neural firing sequence patterns.",
    time_estimate_seconds: 50
  },
  {
    exam_name: "SAT",
    subject: "Reading and Writing",
    skill_domain: "Command of Evidence (Textual)",
    difficulty_tier: 2,
    passage_id: "sat_cet_urban_tree_canopy",
    passage: "Urban planners investigating socioeconomic disparities in residential neighborhoods frequently observe that low-income communities exhibit significantly lower tree canopy cover than affluent suburbs. Environmental justice researcher Kendra Chen hypothesized that this 'canopy gap' results directly from municipal redlining practices dating to the 1930s, wherein historically redlined neighborhoods received substantially lower municipal capital investment in street trees and public parks over successive decades.",
    question_text: "Which finding, if true, would most directly support Chen's hypothesis?",
    options: {
      A: "Tree species planted in affluent neighborhoods require twice as much watering as species planted in desert climates.",
      B: "Geospatial analysis shows that modern urban tree canopy density in thirty major cities strongly correlates with 1930s Home Owners' Loan Corporation (HOLC) grades, with historically redlined Grade D zones possessing up to 60% less tree coverage than Grade A zones in the same metropolitan areas.",
      C: "Homeowners in rural agricultural counties report higher rates of woodstove usage than urban apartment dwellers.",
      D: "Suburban nurseries sell more ornamental flower bulbs in the spring than in the autumn."
    },
    correct_option: "B",
    explanation: "Chen's hypothesis links modern tree canopy deficits to 1930s municipal redlining grades. Demonstrating a strong geospatial correlation across 30 cities where Grade D (redlined) zones have 60% less canopy than Grade A zones provides direct, robust evidence supporting her claim.",
    distractor_analysis: {
      A: "Incorrect. Botanical water requirements do not address municipal historical disinvestment.",
      B: "Correct. Directly connects 1930s HOLC redlining grades with modern canopy disparities across 30 cities.",
      C: "Incorrect. Rural woodstoves are irrelevant to urban redlining and tree cover.",
      D: "Incorrect. Nursery flower sales do not test municipal tree infrastructure investments."
    },
    misconception: "Confusing residential gardening habits with institutional municipal historical redlining data.",
    time_estimate_seconds: 45
  },
  {
    exam_name: "SAT",
    subject: "Reading and Writing",
    skill_domain: "Command of Evidence (Textual)",
    difficulty_tier: 3,
    passage_id: "sat_cet_chaco_canyon_timber",
    passage: "Archaeologists excavating the monumental Great Houses of Chaco Canyon in New Mexico—such as Pueblo Bonito—estimated that ancestral Puebloan builders incorporated over 240,000 architectural timber beams between 900 and 1150 CE. Because the arid canyon floor lacked native ponderosa pine and fir forests, archaeologists debated whether timbers were harvested from local dwarf pinyon stands or carried on foot from distant mountain ranges. Archaeologist Christopher Guiterman used strontium isotope dendroprovenancing to test the hypothesis that timber was hauled over long distances from the Chuska and Zuni Mountains, located over 75 kilometers away.",
    question_text: "Which finding, if true, would most directly support Guiterman's long-distance mountain harvest hypothesis?",
    options: {
      A: "The builders of Pueblo Bonito constructed masonry walls exceeding five stories in height.",
      B: "Strontium isotopic ratios ($^{87}\\text{Sr}/^{86}\\text{Sr}$) in the Chaco ceiling beams matched the unique geological signatures of high-elevation volcanic and granitic bedrock in the Chuska Mountains, while differing sharply from local Chaco Canyon sandstone soils.",
      C: "Pinyon pine seeds recovered from storage jars in Chaco Canyon were roasted over open hearths.",
      D: "Modern satellite radar detected underground water aquifers beneath the canyon wash."
    },
    correct_option: "B",
    explanation: "Guiterman's hypothesis is that the timbers came from distant mountain ranges. Proving that the strontium isotope ratios in the beams match the unique geology of the Chuska Mountains and differ from local canyon sandstone conclusively proves long-distance transport from those mountains.",
    distractor_analysis: {
      A: "Incorrect. Building height shows architectural ambition, not timber geographic provenance.",
      B: "Correct. Directly links the isotopic geochemical signature of the beams to the distant Chuska Mountains.",
      C: "Incorrect. Pinyon seed roasting does not indicate the provenance of architectural ceiling beams.",
      D: "Incorrect. Canyon aquifers do not tell us where high-elevation fir/pine beams grew."
    },
    misconception: "Focusing on masonry architecture or food remains rather than the isotopic dendroprovenancing of the wood.",
    time_estimate_seconds: 50
  },
  {
    exam_name: "SAT",
    subject: "Reading and Writing",
    skill_domain: "Command of Evidence (Quantitative)",
    difficulty_tier: 2,
    passage_id: "sat_ceq_battery_charging_temp",
    passage: "Automotive engineers evaluating electric vehicle fast-charging protocols recorded battery cell degradation rates at varying ambient temperatures. At 25°C, lithium-ion battery cells retained 94% of their original storage capacity after 1,000 rapid DC charging cycles. When ambient temperatures were elevated to 45°C, capacity retention plummeted to 76% over the identical cycle duration due to accelerated electrolyte decomposition and solid-electrolyte interphase (SEI) layer thickening.",
    question_text: "Which choice best describes the data presented in the text?",
    options: {
      A: "Battery capacity retention after 1,000 fast-charging cycles was 18 percentage points lower at 45°C than at 25°C.",
      B: "Battery cells charged at 25°C lost more than half of their original storage capacity.",
      C: "Fast-charging at 45°C eliminated electrolyte decomposition entirely.",
      D: "The cells required twice as long to charge at 25°C compared to 45°C."
    },
    correct_option: "A",
    explanation: "The text states that at 25°C capacity retention was 94%, while at 45°C it dropped to 76%. The difference is $94\\% - 76\\% = 18\\%$ percentage points lower at 45°C.",
    distractor_analysis: {
      A: "Correct. Accurately calculates the 18 percentage point disparity between 94% and 76%.",
      B: "Incorrect. Cells at 25°C retained 94%, meaning they lost only 6%, not more than half.",
      C: "Incorrect. High temperature accelerated, rather than eliminated, decomposition.",
      D: "Incorrect. Charging speed in minutes is not stated in the text."
    },
    misconception: "Miscalculating percentage point differences or confusing retention with capacity loss.",
    time_estimate_seconds: 40
  },
  {
    exam_name: "SAT",
    subject: "Reading and Writing",
    skill_domain: "Command of Evidence (Quantitative)",
    difficulty_tier: 3,
    passage_id: "sat_ceq_renewable_microgrids",
    passage: "A municipal utility compared the energy reliability of three islanded rural microgrids over a twelve-month evaluation period: Microgrid Alpha relied exclusively on solar photovoltaic panels coupled with 4-hour lithium-ion batteries; Microgrid Beta paired solar panels with 8-hour iron-flow batteries; and Microgrid Gamma integrated solar panels, wind turbines, and 4-hour lithium-ion batteries. During the winter season, Microgrid Alpha experienced 142 hours of power outages, Microgrid Beta experienced 68 hours of outages, and Microgrid Gamma experienced only 19 hours of outages.",
    question_text: "Which choice best uses data from the text to complete the statement?\n\nThe data indicate that during winter, diversifying generation assets with both solar and wind in Microgrid Gamma was more effective at reducing outage duration than simply doubling battery duration in Microgrid Beta, resulting in _______",
    options: {
      A: "49 fewer hours of power outages in Microgrid Gamma compared to Microgrid Beta.",
      B: "74 more hours of power outages in Microgrid Gamma than in Microgrid Alpha.",
      C: "identical outage durations across all three microgrids.",
      D: "zero total electricity generation from wind turbines."
    },
    correct_option: "A",
    explanation: "Microgrid Beta had 68 hours of outages, while Microgrid Gamma had 19 hours of outages. The difference is $68 - 19 = 49$ fewer outage hours in Gamma than in Beta.",
    distractor_analysis: {
      A: "Correct. Accurately calculates $68 - 19 = 49$ fewer outage hours for Gamma relative to Beta.",
      B: "Incorrect. Gamma had 19 hours vs Alpha's 142, which is 123 fewer hours, not 74 more.",
      C: "Incorrect. Outage times varied widely (142 vs 68 vs 19).",
      D: "Incorrect. Wind generation was active and responsible for the superior reliability."
    },
    misconception: "Misidentifying which two microgrids are being subtracted or subtracting the wrong data points.",
    time_estimate_seconds: 45
  },
  {
    exam_name: "SAT",
    subject: "Reading and Writing",
    skill_domain: "Command of Evidence (Textual)",
    difficulty_tier: 2,
    passage_id: "sat_cet_avian_caching_memory",
    passage: "Cognitive ecologists studying Clark's nutcrackers (*Nucifraga columbiana*) observed that each autumn, an individual bird buries up to 30,000 conifer seeds in thousands of subterranean caches scattered across mountainous terrain, successfully recovering over 80% of them months later beneath deep winter snow. To determine whether nutcrackers locate caches using olfactory scent cues or spatial memory, researchers created artificial caches containing odorless plastic seed replicas alongside genuine fragrant pine seeds.",
    question_text: "Which finding, if true, would most directly confirm that Clark's nutcrackers locate caches using spatial memory rather than olfactory cues?",
    options: {
      A: "The nutcrackers excavate the odorless plastic seed caches with the same high accuracy as the fragrant seed caches, but fail to locate buried fragrant seeds if nearby landscape spatial landmarks (such as boulders and fallen logs) are moved.",
      B: "The nutcrackers refuse to eat pine seeds during the spring mating season.",
      C: "The nutcrackers fly south to tropical rainforests before winter snow begins.",
      D: "The nutcrackers bury their seeds exclusively in muddy riverbeds."
    },
    correct_option: "A",
    explanation: "If birds find odorless plastic seeds just as easily as fragrant seeds, smell is unnecessary. If moving visual spatial landmarks destroys their recovery accuracy, spatial memory is proven to be the guiding mechanism.",
    distractor_analysis: {
      A: "Correct. Double-proof: finding odorless replicas rules out olfaction, while failure after moving visual landmarks proves spatial memory.",
      B: "Incorrect. Spring diet preferences do not test cache recovery mechanisms.",
      C: "Incorrect. Nutcrackers overwinter in mountain habitats where they recover caches.",
      D: "Incorrect. Caches are buried across mountain terrain, not just muddy riverbeds."
    },
    misconception: "Failing to recognize a two-part experimental control (disproving olfaction while proving reliance on visual spatial cues).",
    time_estimate_seconds: 45
  },
  {
    exam_name: "SAT",
    subject: "Reading and Writing",
    skill_domain: "Command of Evidence (Quantitative)",
    difficulty_tier: 3,
    passage_id: "sat_ceq_crop_drought_yield",
    passage: "Agricultural field trials evaluated the drought resilience of four soybean cultivars under severe water deficit conditions (soil moisture maintained at 35% of field capacity). Cultivar W yielded 1.8 metric tons per hectare; Cultivar X yielded 2.4 tons per hectare; Cultivar Y yielded 1.5 tons per hectare; and Cultivar Z yielded 3.0 tons per hectare. Under optimal well-watered conditions, all four cultivars produced an identical baseline yield of 4.0 metric tons per hectare.",
    question_text: "Based on the data, which cultivar demonstrated the highest percentage yield loss under severe drought conditions?",
    options: {
      A: "Cultivar Z",
      B: "Cultivar X",
      C: "Cultivar W",
      D: "Cultivar Y"
    },
    correct_option: "D",
    explanation: "All cultivars start at 4.0 tons. Under drought: Cultivar Z lost $4.0 - 3.0 = 1.0$ ton (25% loss); Cultivar X lost $4.0 - 2.4 = 1.6$ tons (40% loss); Cultivar W lost $4.0 - 1.8 = 2.2$ tons (55% loss); Cultivar Y lost $4.0 - 1.5 = 2.5$ tons ($2.5 / 4.0 = 62.5\\%$ loss). Thus, Cultivar Y suffered the highest percentage yield loss.",
    distractor_analysis: {
      A: "Incorrect. Cultivar Z suffered the lowest loss (25%).",
      B: "Incorrect. Cultivar X lost 40%.",
      C: "Incorrect. Cultivar W lost 55%, which is less than Cultivar Y's 62.5%.",
      D: "Correct. Cultivar Y had the lowest drought yield (1.5 tons), representing the greatest yield loss (62.5%)."
    },
    misconception: "Confusing highest yield retention with highest yield loss.",
    time_estimate_seconds: 45
  }
];
