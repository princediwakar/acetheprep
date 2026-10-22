// Path: lib/data/banks/gre/comprehension.ts
import type { SeedQuestion } from "../../question-bank-seed";

// ============================================================================
// GRE GENERAL READING COMPREHENSION PASSAGES (Institutional Quality)
// Challenging prose, sophisticated lexicon, multi-layered philosophical,
// scientific, and historical arguments.
// ============================================================================

// ----------------------------------------------------------------------------
// Passage 1: Kuhnian Incommensurability & Scientific Revolutions (350 words)
// ----------------------------------------------------------------------------
const PASSAGE_GRE_KUHN = `Few twentieth-century epistemological treatises provoked as virulent a reaction from philosophers of science as Thomas Kuhn's 1962 monograph, *The Structure of Scientific Revolutions*. Kuhn radically subverted the dominant logical positivist narrative, which envisioned scientific inquiry as a teleological, cumulative accretion of objective empirical facts. Positivists maintained that successively adopted theories represent closer approximations of ontologically objective reality, with predecessor models smoothly subsumed as special limiting cases of their successors—as Newtonian classical mechanics was purportedly subsumed under Einsteinian general relativity.

Kuhn countered that normal science operates within communal "paradigms"—unquestioned constellations of shared assumptions, symbolic generalizations, instrumentation standards, and exemplary problem-solutions that dictate what constitutes a legitimate scientific puzzle. When intractable anomalies accumulate beyond the paradigm's explanatory elasticity, a crisis ensues, culminating in a paradigm shift. Crucially, Kuhn insisted on the thesis of "incommensurability": competing paradigms cannot be adjudicated by appeal to an overarching, neutral observational language. Because observational data are inherently theory-laden—the very meaning of concepts such as "mass" or "space" undergoes discontinuous semantic transformation across paradigms—scientists working under divergent frameworks inhabit cognitively disparate perceptual worlds. Consequently, paradigm conversion resembles a Gestalt psychological shift rather than a compelling algorithmic proof derived from pure formal logic.

Philosophical critics immediately denounced Kuhn's incommensurability thesis as an invitation to cognitive relativism and irrationalism, charging that it reduced scientific consensus to mere sociological fashion or mob psychology. In later postscripts, Kuhn strove to attenuate these charges, clarifying that while objective, algorithmic cross-paradigm comparisons are impossible, scientific communities nonetheless evaluate competing frameworks against shared epistemic values: predictive accuracy, internal consistency, broad scope, theoretical parsimony, and fruitfulness. However, because individual practitioners inevitably weight these subjective values differently, theoretical choice remains an inherently value-laden deliberation rather than an unassailable mechanical calculation.`;

// ----------------------------------------------------------------------------
// Passage 2: The Annales School & Historiographical Longue Durée (370 words)
// ----------------------------------------------------------------------------
const PASSAGE_GRE_ANNALES = `For the greater part of the nineteenth century, European historiography was dominated by the methodological positivism of Leopold von Ranke, whose dictum *wie es eigentlich gewesen* ("as it actually happened") demanded an austere, document-driven reconstruction of high diplomacy, political treaties, and military battles. Rankean historiography was unapologetically event-centric (*histoire événementielle*), viewing historical causation through the deliberate actions of sovereign statesmen, monarchs, and military commanders, reconstructed through the forensic dissection of archival state papers.

In the 1920s, French historians Marc Bloch and Lucien Febvre founded the journal *Annales*, mounting a radical epistemological revolt against this episodic, individualistic paradigm. Under the subsequent leadership of Fernand Braudel, the Annales School formulated a stratified tripartite model of historical time that inverted traditional Rankean hierarchies. At the surface level lay traditional political events—*courte durée*—which Braudel famously dismissed as mere "surface agitation," crests of foam tossed upon the deep waves of time, possessing minimal explanatory power for long-run structural transformations.

Beneath this superficial froth, Braudel identified the *conjonctures*: cyclical economic fluctuations, demographic trends, and price shifts unfolding over decades or centuries. Deepest of all lay the *longue durée*: the subterranean, almost immobile temporal layer governed by geography, geomorphology, climate regimes, and entrenched cognitive mentalities (*histoire des mentalités*). In his magisterial study of the Mediterranean world in the age of Philip II, Braudel relegated the king's political maneuvering and the naval clash at Lepanto to peripheral epiphenomena, arguing instead that the agrarian ecology of mountainous hinterlands, transhumance migratory patterns, and maritime trade winds exerted the true governing constraints upon Mediterranean civilizations.

While the Annales paradigm liberated historiography from naive political hagiography and pioneered fruitful cross-pollination with geography, economics, and anthropology, it encountered sharp critique from social historians. Skeptics contended that by privileging glacial structural determinism, Braudel effectively erased human agency and ethical contingency from the historical record. If geographic constraints and demographic waves dictate human outcomes with inexorable necessity, the deliberate moral choices, resistance movements, and ideological revolts of human historical actors are reduced to impotent theatrical illusions.`;

// ----------------------------------------------------------------------------
// Passage 3: Chemosynthetic Symbiosis & Prebiotic Hydrothermal Vents (360 words)
// ----------------------------------------------------------------------------
const PASSAGE_GRE_HYDROTHERMAL = `Prior to the 1977 submersible exploration of the Galápagos Rift, biological orthodoxy assumed that all terrestrial and marine ecosystems ultimately depend upon solar photons driving oxygenic photosynthesis at the base of the trophic pyramid. The startling discovery of flourishing benthic communities surrounding deep-sea hydrothermal vents—dwelling kilometers below the photic zone under crushing hydrostatic pressures and searing fluid emissions exceeding 350°C—shattered this solar-dependent paradigm, revealing an autonomous biosphere fueled entirely by chemosynthesis.

In these abyssal volcanic systems, the primary trophic engine is driven by chemolithoautotrophic bacteria and archaea. Rather than harvesting radiant solar energy, these extremophiles oxidize reduced inorganic sulfur compounds—primarily hydrogen sulfide (H₂S)—leaching from geothermal fissures, coupling this oxidation with the reduction of dissolved inorganic carbon into organic carbohydrates. Giant vestimentiferan tube worms (*Riftia pachyptila*), completely lacking mouth, gut, or digestive tracts, host billions of these endosymbiotic bacteria within a specialized vascularized organ called the trophosome. The worm's modified extracellular hemoglobin binds hydrogen sulfide, oxygen, and carbon dioxide simultaneously, delivering toxic sulfides directly to its internal bacterial symbionts while preventing the chemical asphyxiation of its own respiratory enzymes.

Beyond revolutionizing trophic ecology, hydrothermal vent fields have profoundly reoriented origin-of-life research. Classical prebiotic models, rooted in the Miller-Urey experiment, postulated an organic "primordial soup" catalyzed by electrical discharges within a reducing subaerial atmosphere. However, atmospheric geochemists increasingly suggest that early Earth possessed a neutral, carbon dioxide-dominated atmosphere unsuited to spontaneous amino acid synthesis. In contrast, alkaline hydrothermal vents present ideal geochemical conditions for abiogenesis: porous iron-sulfur mineral chimneys create continuous proton gradients across inorganic semi-permeable membranes, mimicking the electrochemical transmembrane potentials of living cells. These geothermal chimneys provided catalytic micro-compartments where primitive metabolic cycles and ribonucleic polymers could assemble protected from the catastrophic ultraviolet radiation and meteoritic bombardments afflicting early Earth's planetary surface.`;

// ----------------------------------------------------------------------------
// Passage 4: Kantian Disinterestedness & Aesthetic Autonomy (375 words)
// ----------------------------------------------------------------------------
const PASSAGE_GRE_KANT_AESTHETICS = `In the *Critique of Judgment* (1790), Immanuel Kant sought to establish an objective philosophical foundation for aesthetic evaluation, steering a perilous course between empirical relativism (which reduced beauty to idiosyncrasies of sensory gratification) and rationalist dogmatism (which treated beauty as an intellectual concept of perfection). Central to Kant's architectural solution was the doctrine of "disinterested pleasure" (*interesseloses Wohlgefallen*). For Kant, an aesthetic judgment is validly characterized as a judgment of taste only if the spectator's pleasure is completely divorced from both sensory desire (*the agreeable*) and moral, utilitarian, or practical purpose (*the good*). 

To contemplate an artwork or natural object aesthetically, the subject must suspend all appetitive longing, commercial acquisitiveness, and instrumental considerations. When viewing a depiction of succulent fruit, for example, genuine aesthetic appreciation focuses purely on formal qualities—composition, chromatic harmony, and geometric balance—rather than the culinary appetite for consumption. Because the judgment of taste is unburdened by private personal interest, the judging subject legitimately demands "universal communicability" (*Gemeinsinn*): one does not merely state "this pleases me personally," but imputes that every rational observer possessing shared cognitive faculties ought to experience the identical harmony between imagination and understanding.

Throughout the late nineteenth and twentieth centuries, Kant's doctrine of disinterestedness provided the philosophical charter for formalist aesthetic theories and the modernist doctrine of "art for art's sake" (*l'art pour l'art*). Yet this Kantian severance of art from instrumental reality has drawn fierce ideological critique from Marxist, feminist, and postcolonial theorists. Marxist critics, notably Walter Benjamin and Pierre Bourdieu, argue that "disinterestedness" is an ideological mystification—a bourgeois illusion that masks the sociological reality that taste is a cultivated badge of class distinction (*habitus*) deployed to naturalize social hierarchy. 

Furthermore, feminist and postcolonial theorists point out that the purportedly "universal" disinterested spectator is an abstract fiction coded with the Eurocentric, male gaze. By demanding that art be stripped of social utility, historical context, and ethical resonance, Kantian formalism effectively depoliticizes artistic production, disarming art's radical potential to critique structural injustice, interrogate imperial conquest, or effect transformative social change.`;

// ----------------------------------------------------------------------------
// Passage 5: The Sapir-Whorf Hypothesis & Neo-Whorfian Cognitive Relativism (365 words)
// ----------------------------------------------------------------------------
const PASSAGE_GRE_WHORF = `The thesis that human cognition and worldviews are fundamentally constrained or directed by the grammatical structures and semantic categories of one's native language—popularly known as the Sapir-Whorf hypothesis, or linguistic relativity—provoked intense intellectual polarization across mid-twentieth-century linguistics and anthropology. Formulated by Edward Sapir and popularized by his protégé Benjamin Lee Whorf, the hypothesis suggested, for example, that the Hopi language's lack of tense-based grammatical inflections fostered a cyclical, metaphysical conception of time fundamentally distinct from Western rectilinear, spatialized temporality.

With the advent of Noam Chomsky's cognitive revolution in the late 1950s, Whorfian relativity was comprehensively banished to the scientific margins. Chomsky's Universal Grammar paradigm posited that human language is governed by an innate, biologically determined computational module common to all *Homo sapiens*. Under this universalist view, surface linguistic disparities are trivial variations of invariant deep structures, and human thought proceeds through an unarticulated internal "language of thought" (mentalese) that operates prior to, and independent of, vocalized linguistic articulation.

Over the past three decades, however, an empirical resurgence dubbed "Neo-Whorfianism" has reopened this cognitive divide. Departing from Whorf's extreme linguistic determinism (which asserted that language strictly limits what humans *can* think), contemporary researchers investigate subtle linguistic relativity (how language habits influence what humans *routinely* attend to). Rigorous psycholinguistic experiments on spatial orientation, grammatical gender, and color perception provide robust empirical support for this qualified relativity.

For instance, speakers of languages that encode space using absolute cardinal coordinates (e.g., Guugu Yimithirr, which utilizes "north" and "south" exclusively) maintain an uncanny, continuous mental compass and perform spatial reasoning tasks radically differently from speakers of relative-coordinate languages (e.g., English, which relies on "left" and "right"). Similarly, cross-cultural color discrimination tests demonstrate that speakers of languages with discrete linguistic boundaries for specific shades (such as Russian, which grammatically distinguishes light blue *goluboy* from dark blue *siniy*) exhibit measurable, millisecond-level reaction advantages in neurophysiological categorical perception tasks. While language may not construct an inescapable cognitive prison, it indisputably acts as a pervasive cognitive lens that selectively directs attention, biases memory retrieval, and shapes conceptual categorization.`;

// ----------------------------------------------------------------------------
// Passage 6: Quantum Decoherence & the Measurement Problem (360 words)
// ----------------------------------------------------------------------------
const PASSAGE_GRE_DECOHERENCE = `Since the formulation of quantum mechanics in the 1920s, the "measurement problem" has remained the primary conceptual fissure separating quantum mathematical formalism from classical macroscopic reality. Under the Schrödinger wave equation, an isolated quantum system evolves deterministically and linearly, existing in a coherent superposition of mutually exclusive physical states. Yet whenever a macroscopic observer or measurement apparatus interacts with the system, the superposition abruptly vanishes: the observer registers a single, definite eigenvalue, governed probabilistically by the Born rule.

To bridge this ontological abyss, the Copenhagen interpretation, spearheaded by Niels Bohr and Werner Heisenberg, invoked the ad hoc postulate of "wave-function collapse." Under this standard model, the act of measurement causes the linear wave function to instantaneously and non-unitarily collapse into a single classical outcome. Copenhagen pragmatically accepted a dualistic physics: an indeterminate quantum microscopic realm governed by Schrödinger evolution, and a determinate classical macroscopic realm where measuring instruments reside. For decades, foundational physicists such as Albert Einstein and John Bell protested that Copenhagen failed to specify what physically constitutes a "measurement" or where the boundary between quantum micro-systems and classical macro-instruments lies.

In recent decades, the theoretical framework of quantum decoherence, pioneered by Heinz-Dieter Zeh and Wojciech Zurek, has offered an elegant resolution that dispenses with magical wave-function collapses. Decoherence theorists point out that no macroscopic object is ever truly isolated from its surrounding environment; it continuously interacts with an ambient sea of thermal photons, atmospheric gas molecules, and cosmic rays. Through relentless environmental entanglements, the quantum phase coherence that sustains interference between alternative states is dispersed into unobservable environmental degrees of freedom in infinitesimal fractions of a second ($10^{-20}$ seconds). 

Crucially, decoherence explains the appearance of classical reality without violating unitary quantum evolution. When combined with Hugh Everett's Many-Worlds interpretation, decoherence shows that all potential measurement outcomes continue to physically exist in an ever-branching, non-collapsing universal wave function. Macroscopic observers perceive a single deterministic reality simply because their own brain states have become entangled with a single decohered environmental branch, rendering all alternative branches quantum-mechanically inaccessible.`;

// ----------------------------------------------------------------------------
// Passage 7: Kin Selection, Eusociality, and Multi-Level Selection (370 words)
// ----------------------------------------------------------------------------
const PASSAGE_GRE_KIN_SELECTION = `For Charles Darwin, the existence of sterile worker castes in eusocial insect colonies—such as ants, bees, and termites—posed an agonizing theoretical paradox that threatened to be "fatal" to his entire theory of natural selection. If natural selection operates strictly through the differential reproductive success of individual organisms, how could a biological caste evolve that permanently surrenders all individual reproductive output to labor selflessly on behalf of a fertile queen?

The theoretical resolution of this evolutionary conundrum arrived in 1964 with William Hamilton's formulation of kin selection and inclusive fitness theory. Hamilton mathematically demonstrated that an organism can propagate its genetic heritage not only through personal offspring, but also by promoting the survival and reproduction of biological relatives who share identical alleles by common descent. Formalized as Hamilton's Rule ($rB > C$), an altruistic trait will be favored by natural selection whenever the genetic relatedness between the altruist and recipient ($r$), multiplied by the fitness benefit conferred upon the recipient ($B$), exceeds the reproductive cost incurred by the altruist ($C$). In haplodiploid insects (such as Hymenoptera), sisters share 75% of their genes, making female workers more genetically related to their sisters than to their own hypothetical offspring (50%), providing a mathematically elegant genetic explanation for sterile worker altruism.

For nearly half a century, kin selection stood as the undisputed cornerstone of behavioral sociobiology. In 2010, however, an incendiary critique authored by mathematical biologist Martin Nowak, Corina Tarnita, and veteran sociobiologist Edward O. Wilson reignited an acrimonious ideological civil war within evolutionary biology. Wilson and his co-authors asserted that haplodiploidy is neither necessary nor sufficient for the evolution of eusociality, arguing that Hamilton's inclusive fitness metric is an unmeasurable mathematical artifact with severe mathematical limitations.

In place of kin selection, Wilson championed multi-level selection theory (group selection). Under this framework, natural selection operates concurrently at multiple biological tiers: within-group selection favors selfish individuals who outcompete altruists, but between-group selection favors cohesive social groups whose altruistic members cooperate to outcompete rival colonies. While orthodox evolutionary biologists issued sweeping rebuttals reaffirming kin selection's mathematical validity, the controversy highlighted a profound conceptual divide over whether cooperative biological complexity emerges from gene-centric genetic kinship or emergent social group dynamics.`;

// ----------------------------------------------------------------------------
// Passage 8: Surrealist Automatism & the Psychoanalytic Unconscious (360 words)
// ----------------------------------------------------------------------------
const PASSAGE_GRE_SURREALISM = `In the 1924 *Manifesto of Surrealism*, French writer André Breton formulated the foundational definition of Surrealism as "pure psychic automatism, by which it is intended to express... the real process of thought... in the absence of all control exercised by reason and outside all moral or aesthetic preoccupations." Traumatized by the mechanized slaughter of the First World War—which Surrealists viewed as the monstrous, logical culmination of bourgeois rationalism and Enlightenment instrumentalism—the movement sought nothing less than the radical liberation of the human mind through the unchaining of the unconscious.

Breton and his circle drew direct inspiration from Sigmund Freud's pioneering psychoanalytic discoveries, particularly his theories of dreams, free association, and repressed libido. Surrealists believed that by engaging in automatic writing, spontaneous drawing, and collaborative juxtaposition games (such as the *cadavre exquis*), artists could bypass the conscious ego's repressive censorship, allowing the raw, uncensored desires of the Id to erupt directly onto canvas and paper.

However, the Surrealist appropriation of psychoanalysis was fraught with profound epistemological contradictions that Freud himself regarded with acute skepticism. While Freud conceived of the unconscious as a subterranean reservoir of primal drives and traumatic neuroses that required therapeutic taming through rational analysis (*"Where Id was, there Ego shall be"*), Breton and the Surrealists romanticized the unconscious as a magical, revolutionary fountainhead of poetic clairvoyance and emancipatory beauty. Freud cautioned that automatic writing did not reveal the unconscious in its unvarnished purity; rather, any creative production necessarily undergoes secondary psychic elaboration, aesthetic filtering, and symbolic compromise.

Furthermore, internal ideological fractures rapidly splintered the Surrealist movement. While Breton attempted to reconcile psychic automatism with orthodox Marxist dialectical materialism, dissidents like Georges Bataille mocked Breton's high-minded idealism, proposing a darker, "base materialism" obsessed with bodily abjection, transgression, and the grotesque. Ultimately, Surrealism's struggle to bridge the psychic interiority of the Freudian dreamscape with the external political imperatives of proletarian revolution exposed the volatile, unresolved tensions at the core of early twentieth-century avant-garde modernism.`;

// ----------------------------------------------------------------------------
// Passage 9: Milankovitch Orbital Forcing & Paleoclimatic Oscillations (365 words)
// ----------------------------------------------------------------------------
const PASSAGE_GRE_MILANKOVITCH = `During the 1920s and 1930s, Serbian geophysicist and astronomer Milutin Milankovitch formulated a rigorous mathematical hypothesis asserting that quaternary glacial-interglacial cycles are paced by quasi-periodic variations in the geometry of Earth's solar orbit. Milankovitch identified three astronomical orbital parameters: eccentricity (the varying elliptical shape of Earth's orbit, cycling roughly every 100,000 and 413,000 years); obliquity (the cyclic tilting of Earth's rotational axis relative to the orbital plane between 22.1° and 24.5°, with a 41,000-year periodicity); and precession (the wobble of Earth's axis of rotation, cycling approximately every 23,000 years). Milankovitch argued that the critical determinant of continental glaciation was not harsh winter cold, but rather cool summer insolation at high northern latitudes (around 65°N), which prevented accumulated winter snowpacks from melting during the brief Arctic summer, allowing perennial ice sheets to expand year over year.

For decades, Milankovitch's astronomical theory was dismissed by mainstream geologists, who cited chaotic terrestrial sediment records and the apparent brevity of astronomical thermal perturbations. The dramatic vindication of the Milankovitch hypothesis came in 1976 with the publication of the seminal "Pacemaker of the Ice Ages" study by James Hays, John Imbrie, and Nicholas Shackleton. Analyzing oxygen isotope ratios ($^{18}\\text{O}/^{16}\\text{O}$) preserved in the calcitic shells of benthic foraminifera extracted from deep-sea sediment cores, the researchers documented clear spectral peaks at 23,000, 41,000, and 100,000 years, providing irrefutable empirical evidence that orbital forcing paced Pleistocene glaciation.

Nevertheless, modern paleoclimatologists recognize that orbital forcing alone is insufficient to explain the magnitude of Pleistocene climate swings. Insolation changes caused by orbital wobble are subtle, requiring powerful non-linear internal feedback mechanisms within the Earth system to amplify the astronomical pacing. The most prominent amplifier is the global carbon cycle: during glacial inception, enhanced biological marine pumping, expanded ocean stratification, and increased iron fertilization by continental dust sequester hundreds of gigatons of carbon dioxide from the atmosphere into deep-sea reservoirs, plunging global temperatures far below what orbital variations alone could produce. Orbital pacing provides the rhythmic metronome, but terrestrial biogeochemical feedbacks compose the dramatic climatic symphony.`;

// ============================================================================
// GRE READING COMPREHENSION QUESTIONS (36 High-Rigor Questions)
// ============================================================================

export const GRE_COMPREHENSION_BANK: SeedQuestion[] = [
  // --------------------------------------------------------------------------
  // Passage 1: Kuhnian Incommensurability (4 items)
  // --------------------------------------------------------------------------
  {
    exam_name: "GRE",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 3,
    passage_id: "gre_rc_kuhn_incommensurability",
    passage: PASSAGE_GRE_KUHN,
    question_text: "Which of the following best describes the primary rhetorical purpose of the passage?",
    options: {
      A: "To argue that logical positivism remains the only epistemologically sound method of scientific investigation.",
      B: "To analyze Thomas Kuhn's critique of cumulative scientific progress, explain the mechanics of his incommensurability thesis, and review the philosophical controversies it generated.",
      C: "To prove that Albert Einstein intentionally plagiarized Newtonian mechanics when developing general relativity.",
      D: "To propose a computational algorithm capable of resolving conflicting scientific paradigms objectively.",
      E: "To dismiss scientific inquiry as indistinguishable from superstitious sociological fashion."
    },
    correct_option: "B",
    explanation: "The passage sets up the logical positivist orthodoxy, details Kuhn's concept of paradigms and incommensurability, recounts the philosophical accusations of relativism, and explains his nuanced later view regarding shared epistemic values. Option B captures this comprehensive trajectory.",
    distractor_analysis: {
      A: "Incorrect. The passage shows how Kuhn fundamentally challenged positivism.",
      B: "Correct. Succinctly captures the analysis of Kuhn's critique, incommensurability, and the philosophical controversies.",
      C: "Incorrect. Bizarre and completely unmentioned in the text.",
      D: "Incorrect. The passage emphasizes that objective computational algorithms for paradigm comparison do not exist.",
      E: "Incorrect. This represents the extreme charge made by critics, which Kuhn explicitly tried to attenuate."
    },
    misconception: "Confusing the hostile accusations of Kuhn's critics with the balanced analytical stance of the author.",
    time_estimate_seconds: 70
  },
  {
    exam_name: "GRE",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 2,
    passage_id: "gre_rc_kuhn_incommensurability",
    passage: PASSAGE_GRE_KUHN,
    question_text: "According to the passage, logical positivists viewed the relationship between Newtonian mechanics and Einsteinian relativity as:",
    options: {
      A: "A sudden and irrational Gestalt conversion driven by sociological fashion.",
      B: "A continuous progression in which the earlier theory was subsumed as a special limiting case of the broader successor theory.",
      C: "An irreconcilable rupture caused by incommensurable linguistic frameworks.",
      D: "An absolute proof that physical reality cannot be measured by human observers.",
      E: "A failure of empirical observation caused by defective scientific instrumentation."
    },
    correct_option: "B",
    explanation: "The first paragraph states that logical positivists maintained that 'predecessor models smoothly subsumed as special limiting cases of their successors—as Newtonian classical mechanics was purportedly subsumed under Einsteinian general relativity.'",
    distractor_analysis: {
      A: "Incorrect. Gestalt conversion is Kuhn's view, the opposite of the positivist view.",
      B: "Correct. Exactly matches the text regarding smooth subsumption as a special limiting case.",
      C: "Incorrect. Incommensurability is Kuhn's thesis, not the positivist model.",
      D: "Incorrect. Positivists believed theories were closer approximations of objective reality.",
      E: "Incorrect. Defective instrumentation is not part of the positivist description."
    },
    misconception: "Attributing Kuhn's revolutionary model to the logical positivists he was refuting.",
    time_estimate_seconds: 55
  },
  {
    exam_name: "GRE",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 3,
    passage_id: "gre_rc_kuhn_incommensurability",
    passage: PASSAGE_GRE_KUHN,
    question_text: "It can be inferred from the passage that Kuhn's incommensurability thesis hinges primarily upon which of the following assertions?",
    options: {
      A: "Scientific terms undergo discontinuous semantic shifts across paradigms, preventing the existence of a theory-neutral observational language.",
      B: "Scientists intentionally conceal experimental anomalies to protect their institutional university tenure.",
      C: "Mathematical equations cannot be solved without relying on theological premises.",
      D: "Predictive accuracy is completely dismissed by practicing physicists as a relevant epistemic criterion.",
      E: "All scientific progress ceased entirely following the publication of Newtonian mechanics."
    },
    correct_option: "A",
    explanation: "Paragraph 2 explains incommensurability: 'Because observational data are inherently theory-laden—the very meaning of concepts such as \"mass\" or \"space\" undergoes discontinuous semantic transformation across paradigms—scientists working under divergent frameworks inhabit cognitively disparate perceptual worlds.'",
    distractor_analysis: {
      A: "Correct. Accurately identifies the semantic discontinuity of concepts and theory-ladenness of observation.",
      B: "Incorrect. Institutional tenure concealment is not an epistemological pillar of incommensurability.",
      C: "Incorrect. Unmentioned and completely alien to Kuhn's thesis.",
      D: "Incorrect. Paragraph 3 affirms predictive accuracy as a shared epistemic value.",
      E: "Incorrect. Ridiculously extreme and factually false."
    },
    misconception: "Viewing incommensurability as a sociological conspiracy rather than an epistemological and semantic issue.",
    time_estimate_seconds: 65
  },
  {
    exam_name: "GRE",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 3,
    passage_id: "gre_rc_kuhn_incommensurability",
    passage: PASSAGE_GRE_KUHN,
    question_text: "In the final paragraph, the author notes that while scientists share epistemic values (such as simplicity and predictive accuracy), theoretical choice remains value-laden primarily because:",
    options: {
      A: "Scientists are forbidden from discussing their experimental findings with international colleagues.",
      B: "Different individual scientists may assign different subjective weights to these competing epistemic criteria.",
      C: "Government funding agencies mandate that all physics experiments yield identical numerical outputs.",
      D: "Predictive accuracy can never be measured in a physical laboratory.",
      E: "Internal consistency is logically incompatible with theoretical parsimony."
    },
    correct_option: "B",
    explanation: "The final sentence states: 'However, because individual practitioners inevitably weight these subjective values differently, theoretical choice remains an inherently value-laden deliberation rather than an unassailable mechanical calculation.'",
    distractor_analysis: {
      A: "Incorrect. Complete fabrication.",
      B: "Correct. Precisely identifies the differential subjective weighting of shared epistemic criteria.",
      C: "Incorrect. Distorted bureaucratic scenario unsupported by the text.",
      D: "Incorrect. Predictive accuracy is routinely tested.",
      E: "Incorrect. The passage does not claim internal consistency and parsimony are logically incompatible."
    },
    misconception: "Assuming shared values imply identical decisions, overlooking that individuals weight values differently.",
    time_estimate_seconds: 60
  },

  // --------------------------------------------------------------------------
  // Passage 2: Annales School & Longue Durée (4 items)
  // --------------------------------------------------------------------------
  {
    exam_name: "GRE",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 2,
    passage_id: "gre_rc_annales_braudel",
    passage: PASSAGE_GRE_ANNALES,
    question_text: "Which of the following contrasts between Leopold von Ranke and Fernand Braudel is directly supported by the passage?",
    options: {
      A: "Ranke prioritized deep environmental and climatic factors, whereas Braudel focused exclusively on royal diplomatic treaties.",
      B: "Ranke viewed historical causation through short-term political and military actions, whereas Braudel relegated such events to superficial epiphenomena governed by deep geographic and demographic structures.",
      C: "Ranke refused to examine archival state documents, whereas Braudel based his entire methodology on royal diaries.",
      D: "Ranke championed Marxist historical materialism, whereas Braudel advocated theological determinism.",
      E: "Ranke argued that human history ended in 1848, whereas Braudel studied only prehistoric civilizations."
    },
    correct_option: "B",
    explanation: "The passage directly contrasts Ranke's event-centric *histoire événementielle* (reconstructing political treaties, wars, and sovereign acts) with Braudel's inversion, which dismissed political events as 'surface agitation' and emphasized the *longue durée* of geography, ecology, and climate.",
    distractor_analysis: {
      A: "Incorrect. This reverses their roles entirely.",
      B: "Correct. Accurately synthesizes the core historiographical contrast between event-centric and structural time.",
      C: "Incorrect. Ranke pioneered archival research; Braudel did not rely solely on royal diaries.",
      D: "Incorrect. Neither historian is characterized by these philosophies.",
      E: "Incorrect. Factually false and wildly absurd."
    },
    misconception: "Inverting the roles of Ranke and Braudel regarding environmental versus political focus.",
    time_estimate_seconds: 55
  },
  {
    exam_name: "GRE",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 3,
    passage_id: "gre_rc_annales_braudel",
    passage: PASSAGE_GRE_ANNALES,
    question_text: "In the context of the passage, Braudel's metaphor of events as 'crests of foam tossed upon the deep waves of time' serves primarily to convey:",
    options: {
      A: "The maritime naval superiority of the Spanish fleet at Lepanto.",
      B: "The superficiality, transience, and explanatory impotence of political events when compared to deep structural transformations.",
      C: "The physical reality that all historical civilizational conflicts occur in coastal waters.",
      D: "The literary elegance of nineteenth-century romantic poetic prose.",
      E: "The uncontrollable emotional volatility of European monarchs."
    },
    correct_option: "B",
    explanation: "Braudel used this metaphor to illustrate *courte durée*—traditional political events—as mere surface agitation that distracts from the massive, slow-moving deep currents of geography, climate, and ecology (*longue durée*).",
    distractor_analysis: {
      A: "Incorrect. The metaphor is a general historiographical critique, not a comment on the fleet's tactical ability.",
      B: "Correct. Highlights the transience and lack of explanatory power of individual episodic events.",
      C: "Incorrect. Literal misinterpretation of a conceptual metaphor.",
      D: "Incorrect. Braudel was a twentieth-century social historian, not a romantic poet.",
      E: "Incorrect. The metaphor critiques event-centric history, not monarchical psychology."
    },
    misconception: "Interpreting an abstract metaphorical critique of historical causation literally as oceanic navigation.",
    time_estimate_seconds: 55
  },
  {
    exam_name: "GRE",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 3,
    passage_id: "gre_rc_annales_braudel",
    passage: PASSAGE_GRE_ANNALES,
    question_text: "According to the final paragraph, why did social historians criticize Braudel's structural historiography?",
    options: {
      A: "He utilized modern quantitative computer databases that were unavailable in sixteenth-century Spain.",
      B: "His insistence on geographical and demographic determinism effectively stripped historical actors of meaningful human agency, moral choice, and resistance.",
      C: "He failed to mention the Mediterranean Sea anywhere in his principal academic monograph.",
      D: "He argued that the Protestant Reformation was the sole cause of the Industrial Revolution.",
      E: "He advocated returning to Leopold von Ranke's exclusive focus on military generals."
    },
    correct_option: "B",
    explanation: "The final paragraph explains the critique: 'Skeptics contended that by privileging glacial structural determinism, Braudel effectively erased human agency and ethical contingency from the historical record. If geographic constraints and demographic waves dictate human outcomes with inexorable necessity, the deliberate moral choices... are reduced to impotent theatrical illusions.'",
    distractor_analysis: {
      A: "Incorrect. Quantitative methods are not the source of the ethical/agency critique.",
      B: "Correct. Accurately articulates the critique of structural determinism erasing human moral agency.",
      C: "Incorrect. His masterpiece was famously about the Mediterranean.",
      D: "Incorrect. Unmentioned thesis associated with Max Weber, not Braudel.",
      E: "Incorrect. Braudel did not advocate returning to Rankean historiography."
    },
    misconception: "Focusing on methodological technicalities rather than the fundamental philosophical issue of human agency versus determinism.",
    time_estimate_seconds: 60
  },
  {
    exam_name: "GRE",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 2,
    passage_id: "gre_rc_annales_braudel",
    passage: PASSAGE_GRE_ANNALES,
    question_text: "The author's tone toward the Annales School in the passage can best be described as:",
    options: {
      A: "Uncritical adulation that ignores all academic detractors.",
      B: "Appreciative of its methodological innovations while cognizant of its vulnerability to deterministic critique.",
      C: "Vigorous hostility toward any departure from traditional political archival history.",
      D: "Baffled confusion regarding the meaning of French terminology.",
      E: "Sarcastic contempt for economic and demographic historical data."
    },
    correct_option: "B",
    explanation: "The author credits the Annales School with liberating historiography from naive political hagiography and pioneering cross-disciplinary fertilization, but also presents the substantive critique that it marginalizes human agency. This is balanced, appreciative, and critically aware.",
    distractor_analysis: {
      A: "Incorrect. The author explicitly discusses the serious critiques raised by social historians.",
      B: "Correct. Captures the balanced scholarly appreciation of Annales' contributions coupled with analysis of its deterministic limits.",
      C: "Incorrect. The author explicitly critiques Ranke's naive political focus.",
      D: "Incorrect. The author employs and explains the French terminology fluently.",
      E: "Incorrect. The author treats demographic and economic history with scholarly seriousness."
    },
    misconception: "Mistaking a balanced critique of determinism for total rejection of the Annales School.",
    time_estimate_seconds: 55
  },

  // --------------------------------------------------------------------------
  // Passage 3: Chemosynthetic Hydrothermal Ecosystems (4 items)
  // --------------------------------------------------------------------------
  {
    exam_name: "GRE",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 3,
    passage_id: "gre_rc_hydrothermal_chemosynthesis",
    passage: PASSAGE_GRE_HYDROTHERMAL,
    question_text: "The discovery of hydrothermal vent ecosystems was fundamentally paradigm-shifting for biological science because it:",
    options: {
      A: "Proved that vertebrates can survive in outer space without oxygen.",
      B: "Disproved the universal assumption that all complex biological ecosystems are fundamentally tethered to solar-powered photosynthesis.",
      C: "Demonstrated that volcanic lava flows consist of living organic carbohydrates.",
      D: "Established that giant tube worms represent the evolutionary ancestors of all terrestrial mammals.",
      E: "Showed that deep-sea water temperatures are identical to equatorial surface waters."
    },
    correct_option: "B",
    explanation: "The first paragraph states: 'biological orthodoxy assumed that all terrestrial and marine ecosystems ultimately depend upon solar photons driving oxygenic photosynthesis at the base of the trophic pyramid. The startling discovery... shattered this solar-dependent paradigm, revealing an autonomous biosphere fueled entirely by chemosynthesis.'",
    distractor_analysis: {
      A: "Incorrect. Outer space survival is completely unrelated.",
      B: "Correct. Precisely identifies the overthrow of the assumption that all ecosystems rely on photosynthetic solar energy.",
      C: "Incorrect. Lava is molten rock, not living carbohydrates.",
      D: "Incorrect. Tube worms are invertebrates, not mammalian ancestors.",
      E: "Incorrect. Vents emit searing fluids up to 350°C into near-freezing abyssal waters."
    },
    misconception: "Assuming the paradigm shift was about deep-sea pressure rather than the fundamental trophic energy source of the biosphere.",
    time_estimate_seconds: 60
  },
  {
    exam_name: "GRE",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 2,
    passage_id: "gre_rc_hydrothermal_chemosynthesis",
    passage: PASSAGE_GRE_HYDROTHERMAL,
    question_text: "According to the passage, the modified extracellular hemoglobin of *Riftia pachyptila* performs which critical physiological function?",
    options: {
      A: "It absorbs sunlight reflected through the deep water column.",
      B: "It simultaneously binds oxygen, carbon dioxide, and toxic hydrogen sulfide, transporting sulfides to symbiotic bacteria while protecting the worm's own respiratory enzymes.",
      C: "It dissolves mineral iron chimneys into digestable amino acids.",
      D: "It generates electrical discharges to paralyze abyssal predator fish.",
      E: "It synthesizes DNA polymers directly from dissolved methane gas."
    },
    correct_option: "B",
    explanation: "Paragraph 2 states: 'The worm's modified extracellular hemoglobin binds hydrogen sulfide, oxygen, and carbon dioxide simultaneously, delivering toxic sulfides directly to its internal bacterial symbionts while preventing the chemical asphyxiation of its own respiratory enzymes.'",
    distractor_analysis: {
      A: "Incorrect. Hydrothermal vents lie kilometers below the photic zone where zero sunlight penetrates.",
      B: "Correct. Accurately details the simultaneous triple-gas binding and sulfide toxicity protection mechanism.",
      C: "Incorrect. Hemoglobin transports gases, not mineral dissolution.",
      D: "Incorrect. Tube worms are sessile filter/symbiotic organisms, not electric predators.",
      E: "Incorrect. Hemoglobin has no enzymatic DNA polymerase activity."
    },
    misconception: "Confusing hemoglobin's gas-transport role with chemical digestion or predatory mechanics.",
    time_estimate_seconds: 55
  },
  {
    exam_name: "GRE",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 3,
    passage_id: "gre_rc_hydrothermal_chemosynthesis",
    passage: PASSAGE_GRE_HYDROTHERMAL,
    question_text: "Based on the third paragraph, why do many geochemists favor alkaline hydrothermal vents over the Miller-Urey 'primordial soup' model as the site of terrestrial abiogenesis?",
    options: {
      A: "The early Earth's atmosphere was likely dominated by carbon dioxide rather than reducing gases, while vents provided continuous electrochemical proton gradients and catalytic mineral chambers.",
      B: "The Miller-Urey experiment was proven to be an intentional scientific fabrication.",
      C: "Early Earth was completely covered in a mile-thick global sheet of permanent ice.",
      D: "Photosynthetic cyanobacteria had already saturated the atmosphere with pure oxygen prior to the origin of life.",
      E: "Organic ribonucleic polymers cannot form in the presence of liquid water."
    },
    correct_option: "A",
    explanation: "Paragraph 3 notes that atmospheric geochemists suggest early Earth had a neutral CO₂-dominated atmosphere unsuited to spontaneous amino acid synthesis. In contrast, alkaline hydrothermal chimneys provided proton gradients across inorganic membranes (mimicking cellular electrochemical potentials) and catalytic iron-sulfur chambers protected from surface UV radiation and asteroid impacts.",
    distractor_analysis: {
      A: "Correct. Synthesizes the geochemical atmospheric critique of Miller-Urey with the electrochemical and physical advantages of alkaline vents.",
      B: "Incorrect. Miller-Urey was legitimate science, though based on atmospheric assumptions now questioned.",
      C: "Incorrect. The 'snowball earth' occurred billions of years later, not during early abiogenesis.",
      D: "Incorrect. Cyanobacteria evolved long after abiogenesis and created the Great Oxidation Event.",
      E: "Incorrect. Life originated in aqueous environments; RNA assembly in water is fundamental."
    },
    misconception: "Assuming the Miller-Urey experiment was fraudulent rather than recognizing that newer atmospheric data shifted geochemical plausibility toward vents.",
    time_estimate_seconds: 65
  },
  {
    exam_name: "GRE",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 3,
    passage_id: "gre_rc_hydrothermal_chemosynthesis",
    passage: PASSAGE_GRE_HYDROTHERMAL,
    question_text: "The author's description of mineral chimneys as 'mimicking the electrochemical transmembrane potentials of living cells' suggests that:",
    options: {
      A: "Prebiotic mineral structures provided a physical template that anticipated the bioenergetic mechanisms of early biological cells.",
      B: "Living cells evolved by ingesting inorganic chimneys whole through phagocytosis.",
      C: "Hydrothermal chimneys are composed of living cell walls rather than crystallized minerals.",
      D: "Modern ocean vents are artificial constructs engineered by ancient hominins.",
      E: "Electrical currents in deep-sea vents prevent chemical molecules from forming bonds."
    },
    correct_option: "A",
    explanation: "The passage notes that continuous proton gradients across inorganic semi-permeable membranes mimicked cellular electrochemical transmembrane potentials, suggesting these geological structures provided natural bioenergetic and catalytic templates for the emergence of cellular metabolism.",
    distractor_analysis: {
      A: "Correct. Accurately interprets the functional correspondence between natural mineral proton gradients and cellular bioenergetics.",
      B: "Incorrect. Cells cannot engulf massive mineral chimneys.",
      C: "Incorrect. Chimneys are inorganic iron-sulfur precipitates, not living cellular tissue.",
      D: "Incorrect. Deep-sea vents are natural geothermal formations millions of years older than humans.",
      E: "Incorrect. The proton gradients catalyzed and facilitated molecular assembly, rather than preventing bonding."
    },
    misconception: "Confusing structural bioenergetic mimicry with literal biological composition.",
    time_estimate_seconds: 60
  },

  // --------------------------------------------------------------------------
  // Passage 4: Kantian Disinterestedness (4 items)
  // --------------------------------------------------------------------------
  {
    exam_name: "GRE",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 3,
    passage_id: "gre_rc_kant_aesthetic_disinterestedness",
    passage: PASSAGE_GRE_KANT_AESTHETICS,
    question_text: "According to Kant's aesthetic formulation as described in the passage, an aesthetic judgment of taste ceases to be valid if the spectator's pleasure:",
    options: {
      A: "Engages both the imagination and the cognitive faculties of the mind.",
      B: "Derives from personal sensual appetites, moral utility, or commercial possessiveness rather than contemplative formal properties.",
      C: "Is communicated to other rational observers through shared human faculties.",
      D: "Focuses on the geometric balance and chromatic harmony of an artistic composition.",
      E: "Is experienced in an art museum rather than in raw wilderness."
    },
    correct_option: "B",
    explanation: "Paragraph 1 and 2 define disinterested pleasure: it must be completely divorced from both sensory desire (*the agreeable*) and practical, moral, or commercial utility (*the good*). If motivated by appetitive longing or possessiveness, it ceases to be a pure judgment of taste.",
    distractor_analysis: {
      A: "Incorrect. Engaging imagination and understanding is precisely what Kant requires.",
      B: "Correct. Directly captures the requirement that aesthetic pleasure must be divorced from appetite, morality, or utility.",
      C: "Incorrect. Demanding universal communicability is a hallmark of valid Kantian taste.",
      D: "Incorrect. Contemplating formal properties is the essence of disinterested judgment.",
      E: "Incorrect. The physical viewing location is irrelevant to Kant's transcendental argument."
    },
    misconception: "Confusing the formal qualities that validate aesthetic judgment with the utilitarian or appetitive interests that invalidate it.",
    time_estimate_seconds: 65
  },
  {
    exam_name: "GRE",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 3,
    passage_id: "gre_rc_kant_aesthetic_disinterestedness",
    passage: PASSAGE_GRE_KANT_AESTHETICS,
    question_text: "Which of the following criticisms of Kantian aesthetic theory would Pierre Bourdieu most likely endorse based on the passage?",
    options: {
      A: "Kantian disinterestedness accurately describes how working-class laborers perceive classical opera.",
      B: "The claim of 'disinterested' universal taste is an ideological fiction that disguises how aesthetic preferences function as cultivated markers of socio-economic class distinction.",
      C: "Kant failed to emphasize the importance of chromatic color harmony in landscape painting.",
      D: "Aesthetic judgments are purely genetic reflexes encoded in the human visual cortex.",
      E: "Art should never be exhibited in public galleries or discussed in academic treatises."
    },
    correct_option: "B",
    explanation: "Paragraph 3 explicitly states: 'Marxist critics, notably Walter Benjamin and Pierre Bourdieu, argue that \"disinterestedness\" is an ideological mystification—a bourgeois illusion that masks the sociological reality that taste is a cultivated badge of class distinction (*habitus*) deployed to naturalize social hierarchy.'",
    distractor_analysis: {
      A: "Incorrect. Bourdieu argues taste is divided by class and that disinterestedness is a bourgeois construct.",
      B: "Correct. Precisely mirrors Bourdieu's critique of taste as class distinction masking as universal objectivity.",
      C: "Incorrect. Bourdieu's critique is sociological, not a technical critique of color harmony.",
      D: "Incorrect. Bourdieu argues taste is socially cultivated (*habitus*), not genetic.",
      E: "Incorrect. Bourdieu does not advocate banning art exhibitions."
    },
    misconception: "Viewing Bourdieu's critique as aesthetic formalism rather than sociological unmasking of class power.",
    time_estimate_seconds: 65
  },
  {
    exam_name: "GRE",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 3,
    passage_id: "gre_rc_kant_aesthetic_disinterestedness",
    passage: PASSAGE_GRE_KANT_AESTHETICS,
    question_text: "The author implies that postcolonial and feminist theorists object to Kantian aesthetic formalism primarily because it:",
    options: {
      A: "Mandates that all paintings depict historical battle scenes.",
      B: "Depoliticizes artistic creation by stripping art of its ethical, social, and political capacity to contest systemic oppression.",
      C: "Requires that female artists use only watercolor paints.",
      D: "Argues that European museums should return artifacts to indigenous communities.",
      E: "Rejects the concept of universal communicability in human language."
    },
    correct_option: "B",
    explanation: "The final sentence states: 'By demanding that art be stripped of social utility, historical context, and ethical resonance, Kantian formalism effectively depoliticizes artistic production, disarming art's radical potential to critique structural injustice, interrogate imperial conquest, or effect transformative social change.'",
    distractor_analysis: {
      A: "Incorrect. Kantian formalism does not mandate battle paintings.",
      B: "Correct. Accurately synthesizes the postcolonial and feminist charge that formalism depoliticizes art and disarms social critique.",
      C: "Incorrect. Pure fabrication.",
      D: "Incorrect. Kantian formalism did not advocate artifact repatriation; in fact, postcolonial critics critique it.",
      E: "Incorrect. Kant championed universal communicability, which critics argued was a false European universal."
    },
    misconception: "Confusing modern postcolonial museum activism with the theoretical critique of aesthetic formalism.",
    time_estimate_seconds: 60
  },
  {
    exam_name: "GRE",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 2,
    passage_id: "gre_rc_kant_aesthetic_disinterestedness",
    passage: PASSAGE_GRE_KANT_AESTHETICS,
    question_text: "In the context of the first paragraph, the phrase 'perilous course' reflects the author's view that Kant was attempting to:",
    options: {
      A: "Escape physical imprisonment by Prussian municipal authorities.",
      B: "Navigate a delicate theoretical balance between subjective sensory relativism and rigid conceptual dogmatism.",
      C: "Reconcile Catholic theology with English maritime colonial law.",
      D: "Prove that aesthetic taste could be quantified using calculus.",
      E: "Defend himself against accusations of artistic forgery."
    },
    correct_option: "B",
    explanation: "The first sentence explains the two theoretical extremes Kant navigated: 'steering a perilous course between empirical relativism (which reduced beauty to idiosyncrasies of sensory gratification) and rationalist dogmatism (which treated beauty as an intellectual concept of perfection).'",
    distractor_analysis: {
      A: "Incorrect. Kant was not facing imprisonment for his aesthetic treatise.",
      B: "Correct. Precisely identifies the dual theoretical hazards of empirical relativism and rationalist dogmatism.",
      C: "Incorrect. Catholic theology and maritime law are completely foreign to the text.",
      D: "Incorrect. Kant explicitly rejected reducing beauty to mathematical concepts.",
      E: "Incorrect. Kant was a philosopher evaluating judgments, not an accused art forger."
    },
    misconception: "Taking 'perilous course' as a physical or political danger rather than a demanding philosophical synthesis.",
    time_estimate_seconds: 50
  },

  // --------------------------------------------------------------------------
  // Passage 5: Sapir-Whorf Hypothesis & Neo-Whorfianism (4 items)
  // --------------------------------------------------------------------------
  {
    exam_name: "GRE",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 3,
    passage_id: "gre_rc_sapir_whorf_relativity",
    passage: PASSAGE_GRE_WHORF,
    question_text: "Which of the following best articulates the primary distinction between Whorf's original hypothesis and modern 'Neo-Whorfianism'?",
    options: {
      A: "Whorf studied Native American languages, whereas Neo-Whorfians study only computer programming syntaxes.",
      B: "Whorf posited a strict linguistic determinism where language constrains what humans are capable of thinking, whereas Neo-Whorfians propose a subtle relativity where language habits bias what humans routinely attend to.",
      C: "Whorf believed language was biological, whereas Neo-Whorfians believe grammar is learned via operant conditioning.",
      D: "Whorf argued all languages share a universal deep structure, whereas Neo-Whorfians reject Universal Grammar entirely.",
      E: "Whorf focused exclusively on color perception, whereas Neo-Whorfians focus exclusively on verb tenses."
    },
    correct_option: "B",
    explanation: "Paragraph 3 explicitly delineates the shift: 'Departing from Whorf's extreme linguistic determinism (which asserted that language strictly limits what humans *can* think), contemporary researchers investigate subtle linguistic relativity (how language habits influence what humans *routinely* attend to).'",
    distractor_analysis: {
      A: "Incorrect. Neo-Whorfians study human natural languages (like Russian and Guugu Yimithirr).",
      B: "Correct. Directly captures the shift from strict cognitive limits (determinism) to habitual attentional biases (relativity).",
      C: "Incorrect. Biological innatism was Chomsky's view, not Whorf's.",
      D: "Incorrect. Chomsky championed Universal Grammar, which dismissed Whorf.",
      E: "Incorrect. Whorf famously focused on Hopi time/grammar, while Neo-Whorfians study space, gender, and color."
    },
    misconception: "Confusing Chomsky's Universal Grammar with Whorfian relativity.",
    time_estimate_seconds: 65
  },
  {
    exam_name: "GRE",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 2,
    passage_id: "gre_rc_sapir_whorf_relativity",
    passage: PASSAGE_GRE_WHORF,
    question_text: "According to the passage, Noam Chomsky's Universal Grammar challenged linguistic relativity by asserting that:",
    options: {
      A: "Every human language was created independently without evolutionary precursors.",
      B: "Surface linguistic differences are trivial variations of an innate, biologically determined mental grammar that operates independently of vocalized speech.",
      C: "The Hopi language possesses the most mathematically sophisticated grammar of any world language.",
      D: "Human children cannot learn language without explicit formal classroom instruction.",
      E: "Color terminology is culturally constructed and varies infinitely across human societies."
    },
    correct_option: "B",
    explanation: "Paragraph 2 states: 'Chomsky's Universal Grammar paradigm posited that human language is governed by an innate, biologically determined computational module common to all *Homo sapiens*. Under this universalist view, surface linguistic disparities are trivial variations of invariant deep structures, and human thought proceeds through an unarticulated internal \"language of thought\" (mentalese)...'",
    distractor_analysis: {
      A: "Incorrect. Chomsky views language as a universal biological trait of *Homo sapiens*.",
      B: "Correct. Accurately synthesizes Chomsky's innate biological module and invariant deep structures.",
      C: "Incorrect. Chomsky minimized the significance of Hopi grammatical peculiarities.",
      D: "Incorrect. Chomsky demonstrated that children acquire language effortlessly without formal instruction due to innate grammar.",
      E: "Incorrect. Universalists believe color perception is biologically constrained, not infinitely variable."
    },
    misconception: "Attributing cultural relativity to Chomsky, who was the preeminent universalist opponent of relativity.",
    time_estimate_seconds: 55
  },
  {
    exam_name: "GRE",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 3,
    passage_id: "gre_rc_sapir_whorf_relativity",
    passage: PASSAGE_GRE_WHORF,
    question_text: "The author mentions Russian speakers' discrimination of light blue (*goluboy*) and dark blue (*siniy*) in the final paragraph primarily to:",
    options: {
      A: "Prove that Russian speakers possess superior ocular anatomy compared to English speakers.",
      B: "Provide concrete empirical evidence that distinct linguistic color categories accelerate neurophysiological perceptual discrimination.",
      C: "Argue that English should adopt separate words for every shade of the visible spectrum.",
      D: "Demonstrate that the Cyrillic alphabet enhances visual memory.",
      E: "Refute the existence of wavelength spectrums in physical optics."
    },
    correct_option: "B",
    explanation: "The author uses the Russian blue study to demonstrate that having distinct lexical labels (*goluboy* vs. *siniy*) yields measurable, millisecond-level reaction advantages in brain-wave categorical perception tasks, providing hard empirical evidence for Neo-Whorfian perceptual tuning.",
    distractor_analysis: {
      A: "Incorrect. The difference is cognitive/lexical, not gross ocular anatomy.",
      B: "Correct. Highlights the empirical demonstration that linguistic lexical categories enhance perceptual discrimination speed.",
      C: "Incorrect. The author provides scientific evidence, not prescriptive language reform advice.",
      D: "Incorrect. The alphabet is irrelevant; the lexical categorization of color words is the operational variable.",
      E: "Incorrect. Physical wavelengths of light remain objective; the brain's categorical perception of them is what is modulated."
    },
    misconception: "Confusing cognitive-linguistic perceptual acceleration with physical anatomical eye differences.",
    time_estimate_seconds: 60
  },
  {
    exam_name: "GRE",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 3,
    passage_id: "gre_rc_sapir_whorf_relativity",
    passage: PASSAGE_GRE_WHORF,
    question_text: "It can be inferred from the passage that speakers of Guugu Yimithirr performing a spatial memory test would be most likely to:",
    options: {
      A: "Become completely disoriented if blindfolded in a windowless room.",
      B: "Rely consistently on geocentric cardinal axes (e.g., North, South) rather than egocentric body axes (e.g., left, right) to memorize and reconstruct spatial arrangements.",
      C: "Refuse to participate in psychological experiments conducted by Western researchers.",
      D: "Forget the location of objects as soon as they turn their heads.",
      E: "Possess no conceptual understanding of distance or physical separation."
    },
    correct_option: "B",
    explanation: "The text explains that Guugu Yimithirr encodes space using absolute cardinal coordinates exclusively, and that speakers 'maintain an uncanny, continuous mental compass and perform spatial reasoning tasks radically differently from speakers of relative-coordinate languages' (which rely on left and right).",
    distractor_analysis: {
      A: "Incorrect. The text notes they maintain an uncanny continuous mental compass.",
      B: "Correct. Deduces the experimental consequence: using absolute cardinal coordinates instead of egocentric left/right references.",
      C: "Incorrect. Completely unsubstantiated behavioral speculation.",
      D: "Incorrect. Their spatial memory is exceptionally robust, not impaired.",
      E: "Incorrect. They understand distance and space with extraordinary geographic precision."
    },
    misconception: "Assuming that a non-Western spatial coordinate system implies spatial confusion or cognitive deficiency.",
    time_estimate_seconds: 60
  },

  // --------------------------------------------------------------------------
  // Passage 6: Quantum Decoherence & Measurement (4 items)
  // --------------------------------------------------------------------------
  {
    exam_name: "GRE",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 3,
    passage_id: "gre_rc_quantum_decoherence",
    passage: PASSAGE_GRE_DECOHERENCE,
    question_text: "The primary theoretical accomplishment of quantum decoherence theory as presented in the passage is that it:",
    options: {
      A: "Proves that Albert Einstein's classical deterministic mechanics was entirely correct in all respects.",
      B: "Explains the emergence of classical macroscopic reality from quantum superpositions through environmental entanglement without requiring ad hoc wave-function collapses.",
      C: "Enables physicists to isolate macroscopic objects from thermal photons indefinitely.",
      D: "Demonstrates that Werner Heisenberg's uncertainty principle was a mathematical error.",
      E: "Eliminates the Schrödinger wave equation from modern quantum electrodynamics."
    },
    correct_option: "B",
    explanation: "Paragraph 3 and 4 explain that decoherence dispenses with magical non-unitary collapses by showing how relentless environmental interactions disperse quantum phase coherence into the environment in fractions of a second, explaining classical appearances while preserving unitary Schrödinger evolution.",
    distractor_analysis: {
      A: "Incorrect. Decoherence operates within quantum mechanics, not by restoring classical Newtonian determinism.",
      B: "Correct. Precisely captures the core achievement: explaining classical outcomes via environmental entanglement without ad hoc collapses.",
      C: "Incorrect. Decoherence proves macroscopic objects can *never* be isolated from ambient environments.",
      D: "Incorrect. The uncertainty principle remains fundamental to quantum physics.",
      E: "Incorrect. Decoherence relies strictly on the unitary Schrödinger equation."
    },
    misconception: "Believing decoherence invalidates quantum mechanics, when it actually explains macroscopic classicality using pure quantum mechanics.",
    time_estimate_seconds: 65
  },
  {
    exam_name: "GRE",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 3,
    passage_id: "gre_rc_quantum_decoherence",
    passage: PASSAGE_GRE_DECOHERENCE,
    question_text: "According to the passage, the Copenhagen interpretation was criticized by physicists like Albert Einstein and John Bell primarily because it:",
    options: {
      A: "Postulated an ad hoc, non-unitary wave-function collapse without specifying what physically constitutes a measurement or defining the micro-macro boundary.",
      B: "Refused to use mathematical symbols when describing atomic orbitals.",
      C: "Claimed that light behaves exclusively as a continuous fluid wave rather than discrete photons.",
      D: "Suggested that thermal photons do not exist in the physical universe.",
      E: "Asserted that all quantum particles possess infinite mass."
    },
    correct_option: "A",
    explanation: "Paragraph 2 states: 'Copenhagen failed to specify what physically constitutes a \"measurement\" or where the boundary between quantum micro-systems and classical macro-instruments lies,' while postulating an ad hoc, instantaneous collapse that broke unitary evolution.",
    distractor_analysis: {
      A: "Correct. Directly captures the classic foundational critique regarding the undefined measurement boundary and ad hoc collapse.",
      B: "Incorrect. Copenhagen was deeply mathematical.",
      C: "Incorrect. Wave-particle duality was central to Copenhagen.",
      D: "Incorrect. Thermal photons are part of decoherence, not denied by Copenhagen.",
      E: "Incorrect. Complete absurdity."
    },
    misconception: "Assuming Einstein disliked Copenhagen for its math rather than its undefined measurement ontology and non-local collapse.",
    time_estimate_seconds: 60
  },
  {
    exam_name: "GRE",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 3,
    passage_id: "gre_rc_quantum_decoherence",
    passage: PASSAGE_GRE_DECOHERENCE,
    question_text: "Under the synthesis of quantum decoherence and the Many-Worlds interpretation described in the final sentence, an observer perceives a single deterministic outcome because:",
    options: {
      A: "All other branches of the wave function are instantaneously destroyed by cosmic rays.",
      B: "The observer's physical brain state has become quantum-mechanically entangled with a single decohered environmental branch, making alternative branches inaccessible.",
      C: "Human sensory organs are physically incapable of registering photons.",
      D: "The Born rule prevents human beings from traveling faster than the speed of light.",
      E: "Quantum computers have replaced biological neural synapses."
    },
    correct_option: "B",
    explanation: "The final sentence states: 'Macroscopic observers perceive a single deterministic reality simply because their own brain states have become entangled with a single decohered environmental branch, rendering all alternative branches quantum-mechanically inaccessible.'",
    distractor_analysis: {
      A: "Incorrect. Many-Worlds explicitly maintains that all alternative branches continue to physically exist, not that they are destroyed.",
      B: "Correct. Exactly matches the text regarding brain entanglement with a single decohered branch.",
      C: "Incorrect. Humans obviously see photons.",
      D: "Incorrect. Irrelevant conflation with special relativity.",
      E: "Incorrect. Sci-fi fabrication unsupported by the text."
    },
    misconception: "Assuming alternative branches vanish or are destroyed rather than recognizing they remain physically real but decohered/inaccessible.",
    time_estimate_seconds: 65
  },
  {
    exam_name: "GRE",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 2,
    passage_id: "gre_rc_quantum_decoherence",
    passage: PASSAGE_GRE_DECOHERENCE,
    question_text: "The author mentions a timescale of '$10^{-20}$ seconds' in the third paragraph primarily to emphasize:",
    options: {
      A: "The extreme slowness with which chemical reactions occur in deep space.",
      B: "The near-instantaneous speed with which environmental interactions disperse quantum phase coherence in macroscopic systems.",
      C: "The duration required for a quantum computer to factor a prime integer.",
      D: "The lifespan of an isolated neutron in a vacuum.",
      E: "The time required for an astronomer to record a supernova."
    },
    correct_option: "B",
    explanation: "The author notes that interactions with environmental photons and molecules disperse phase coherence 'in infinitesimal fractions of a second ($10^{-20}$ seconds),' emphasizing why macroscopic quantum superpositions disappear almost instantaneously.",
    distractor_analysis: {
      A: "Incorrect. $10^{-20}$ is unimaginably fast, not slow.",
      B: "Correct. Highlights the blistering rapidity of environmental decoherence in macroscopic systems.",
      C: "Incorrect. Factoring integers takes polynomial time, not $10^{-20}$ seconds.",
      D: "Incorrect. Neutron decay takes roughly 15 minutes.",
      E: "Incorrect. Supernovae unfold over weeks/months."
    },
    misconception: "Failing to comprehend that $10^{-20}$ seconds represents near-instantaneous rapidity rather than a long duration.",
    time_estimate_seconds: 45
  },

  // --------------------------------------------------------------------------
  // Passage 7: Kin Selection & Multi-Level Selection (4 items)
  // --------------------------------------------------------------------------
  {
    exam_name: "GRE",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 3,
    passage_id: "gre_rc_kin_selection_sociobiology",
    passage: PASSAGE_GRE_KIN_SELECTION,
    question_text: "The primary evolutionary puzzle that sterile worker insect castes presented to Charles Darwin was that:",
    options: {
      A: "Insects have six legs while mammals have four.",
      B: "Sterile workers surrender their own reproductive output, which appears to directly contradict natural selection acting on individual differential reproduction.",
      C: "Insect colonies refuse to consume photosynthetic plants.",
      D: "Queens lay eggs without mating with male drones.",
      E: "Worker ants live longer than queen bees."
    },
    correct_option: "B",
    explanation: "Paragraph 1 explains: 'If natural selection operates strictly through the differential reproductive success of individual organisms, how could a biological caste evolve that permanently surrenders all individual reproductive output to labor selflessly on behalf of a fertile queen?'",
    distractor_analysis: {
      A: "Incorrect. Basic morphology is not an evolutionary contradiction.",
      B: "Correct. Directly captures the fundamental paradox of sterile altruism under individual natural selection.",
      C: "Incorrect. Many social insects are herbivores/fungus farmers.",
      D: "Incorrect. Haplodiploidy involves mating dynamics, but Darwin's problem was the sterility of workers.",
      E: "Incorrect. Queens live significantly longer than workers."
    },
    misconception: "Focusing on insect anatomy rather than the reproductive cost of altruism under individual selection theory.",
    time_estimate_seconds: 55
  },
  {
    exam_name: "GRE",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 2,
    passage_id: "gre_rc_kin_selection_sociobiology",
    passage: PASSAGE_GRE_KIN_SELECTION,
    question_text: "According to Hamilton's Rule ($rB > C$), an altruistic biological behavior will be favored by natural selection whenever:",
    options: {
      A: "The cost to the altruist exceeds the reproductive benefit to all living organisms in the ecosystem.",
      B: "The genetic relatedness between actor and recipient multiplied by the fitness benefit to the recipient is greater than the reproductive cost to the altruist.",
      C: "All organisms in a social group share 100% of their chromosomes.",
      D: "The recipient of the altruistic act is completely unrelated to the donor organism.",
      E: "Predators are completely absent from the local habitat."
    },
    correct_option: "B",
    explanation: "Paragraph 2 states: 'an altruistic trait will be favored by natural selection whenever the genetic relatedness between the altruist and recipient ($r$), multiplied by the fitness benefit conferred upon the recipient ($B$), exceeds the reproductive cost incurred by the altruist ($C$).'",
    distractor_analysis: {
      A: "Incorrect. Reverses the inequality: benefits must exceed costs.",
      B: "Correct. Accurately defines Hamilton's mathematical formulation of inclusive fitness.",
      C: "Incorrect. Identical clones have $r=1$, but Hamilton's rule applies across varying degrees of relatedness.",
      D: "Incorrect. If unrelated ($r=0$), $rB = 0 < C$, so altruism would not be favored.",
      E: "Incorrect. Predator presence is not a parameter in Hamilton's core genetic rule."
    },
    misconception: "Inverting the mathematical inequality of Hamilton's Rule.",
    time_estimate_seconds: 50
  },
  {
    exam_name: "GRE",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 3,
    passage_id: "gre_rc_kin_selection_sociobiology",
    passage: PASSAGE_GRE_KIN_SELECTION,
    question_text: "According to the passage, how does multi-level selection theory (group selection) explain the persistence of altruistic traits within social species?",
    options: {
      A: "Altruistic individuals always reproduce more offspring within their local group than selfish individuals.",
      B: "While selfish individuals outcompete altruists within any single group, cohesive groups with many altruists outcompete and displace rival groups with fewer altruists.",
      C: "Altruism is a cultural invention that has zero genetic basis in nature.",
      D: "Haplodiploid genetics forces all worker insects to mutate their chromosomes into queen chromosomes.",
      E: "Predators selectively prey only on selfish individuals, leaving altruists unharmed."
    },
    correct_option: "B",
    explanation: "Paragraph 4 explains multi-level selection: 'within-group selection favors selfish individuals who outcompete altruists, but between-group selection favors cohesive social groups whose altruistic members cooperate to outcompete rival colonies.'",
    distractor_analysis: {
      A: "Incorrect. Within groups, selfish individuals outcompete altruists.",
      B: "Correct. Precisely mirrors the dual-level dynamic: within-group selfishness vs. between-group cooperative advantage.",
      C: "Incorrect. Group selection models genetic traits, not pure cultural invention.",
      D: "Incorrect. Haplodiploidy does not involve chromosomal mutation into queens.",
      E: "Incorrect. Predators do not make moral distinctions."
    },
    misconception: "Believing that group selection claims altruists win within the group, missing the crucial between-group selection tier.",
    time_estimate_seconds: 65
  },
  {
    exam_name: "GRE",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 3,
    passage_id: "gre_rc_kin_selection_sociobiology",
    passage: PASSAGE_GRE_KIN_SELECTION,
    question_text: "The author's depiction of the debate between kin selectionists and multi-level selectionists in the final paragraph suggests that the controversy is primarily:",
    options: {
      A: "A trivial dispute over laboratory tax accounting that has no scientific relevance.",
      B: "A profound conceptual dispute over the fundamental level at which natural selection operates—whether driven by gene-centric kinship or emergent multi-tiered social dynamics.",
      C: "A settled historical matter in which Charles Darwin was proven wrong on every point.",
      D: "A personal feud between mathematicians who have never studied insects.",
      E: "A unanimous consensus that natural selection does not apply to social insects."
    },
    correct_option: "B",
    explanation: "The final sentence concludes: 'the controversy highlighted a profound conceptual divide over whether cooperative biological complexity emerges from gene-centric genetic kinship or emergent social group dynamics.'",
    distractor_analysis: {
      A: "Incorrect. It is described as an 'acrimonious ideological civil war' over foundational theory.",
      B: "Correct. Accurately synthesizes the core conceptual divide between gene-centric kinship and emergent multi-tiered group dynamics.",
      C: "Incorrect. Both sides build upon Darwin's foundational paradigm.",
      D: "Incorrect. E.O. Wilson was a world-renowned entomologist and naturalist.",
      E: "Incorrect. Both sides adamantly apply natural selection to social insects."
    },
    misconception: "Trivializing a major epistemological divide in evolutionary theory as mere petty infighting.",
    time_estimate_seconds: 60
  },

  // --------------------------------------------------------------------------
  // Passage 8: Surrealist Automatism (4 items)
  // --------------------------------------------------------------------------
  {
    exam_name: "GRE",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 3,
    passage_id: "gre_rc_surrealism_automatism",
    passage: PASSAGE_GRE_SURREALISM,
    question_text: "According to the passage, the Surrealists' romanticization of the unconscious differed fundamentally from Sigmund Freud's psychoanalytic conception in that:",
    options: {
      A: "Freud viewed the unconscious as an unmitigated source of poetic genius, whereas Breton viewed it as a neurological disease.",
      B: "Freud conceptualized the unconscious as a volatile reservoir of primitive drives requiring rational therapeutic taming, whereas Surrealists celebrated it as an emancipatory fountainhead of beauty and clairvoyance.",
      C: "Freud argued that dreams were caused by bad digestion, while Surrealists believed dreams were sent by deities.",
      D: "Freud practiced automatic writing in clinical psychiatric sessions with shell-shocked soldiers.",
      E: "Surrealists believed the conscious ego should permanently dominate and eradicate the Id."
    },
    correct_option: "B",
    explanation: "Paragraph 3 explicitly contrasts them: 'While Freud conceived of the unconscious as a subterranean reservoir of primal drives and traumatic neuroses that required therapeutic taming through rational analysis (\"Where Id was, there Ego shall be\"), Breton and the Surrealists romanticized the unconscious as a magical, revolutionary fountainhead of poetic clairvoyance and emancipatory beauty.'",
    distractor_analysis: {
      A: "Incorrect. Reverses their positions entirely.",
      B: "Correct. Precisely identifies Freud's clinical therapeutic view vs. the Surrealists' celebratory, revolutionary romanticization.",
      C: "Incorrect. Crude trivialization of Freud's dream theory.",
      D: "Incorrect. Freud used free association and dream analysis, not automatic writing poetry.",
      E: "Incorrect. The Surrealists sought to liberate the Id from the ego's repressive censorship."
    },
    misconception: "Assuming Surrealists agreed with Freud in every respect rather than seeing their romantic ideological divergence from his clinical goals.",
    time_estimate_seconds: 65
  },
  {
    exam_name: "GRE",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 2,
    passage_id: "gre_rc_surrealism_automatism",
    passage: PASSAGE_GRE_SURREALISM,
    question_text: "The first paragraph indicates that the historical impetus behind the Surrealist revolt was:",
    options: {
      A: "The introduction of photography which put painters out of work.",
      B: "Profound trauma stemming from the mechanized destruction of World War I, which Surrealists viewed as the bankruptcy of Enlightenment rationalism.",
      C: "A desire to restore the classical academic traditions of the French Royal Academy.",
      D: "An economic recession that bankrupted commercial Parisian art galleries.",
      E: "A religious revival aimed at re-establishing Catholic iconography in modern art."
    },
    correct_option: "B",
    explanation: "Paragraph 1 states: 'Traumatized by the mechanized slaughter of the First World War—which Surrealists viewed as the monstrous, logical culmination of bourgeois rationalism and Enlightenment instrumentalism—the movement sought nothing less than the radical liberation of the human mind...'",
    distractor_analysis: {
      A: "Incorrect. Photography influenced impressionism decades earlier.",
      B: "Correct. Accurately cites WWI trauma and the rejection of bourgeois Enlightenment rationalism.",
      C: "Incorrect. Surrealists violently rejected academic traditionalism.",
      D: "Incorrect. Economic market conditions were not the ideological impetus.",
      E: "Incorrect. Surrealists were ardently anti-clerical, not Catholic revivalists."
    },
    misconception: "Treating Surrealism as a purely aesthetic stylistic whim rather than an existential reaction to the carnage of World War I.",
    time_estimate_seconds: 50
  },
  {
    exam_name: "GRE",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 3,
    passage_id: "gre_rc_surrealism_automatism",
    passage: PASSAGE_GRE_SURREALISM,
    question_text: "Freud's skepticism regarding Surrealist automatic writing was rooted in his conviction that:",
    options: {
      A: "Creative artistic expression inevitably undergoes secondary psychic elaboration and symbolic censorship rather than revealing the pure, unvarnished unconscious.",
      B: "Poetry and painting are biological impossibilities for human beings.",
      C: "French artists possessed smaller cranial volumes than Austrian psychoanalysts.",
      D: "Dreams contain zero psychological significance or repressed memories.",
      E: "Automatic writing caused severe physical damage to the wrist nerves."
    },
    correct_option: "A",
    explanation: "Paragraph 3 notes: 'Freud cautioned that automatic writing did not reveal the unconscious in its unvarnished purity; rather, any creative production necessarily undergoes secondary psychic elaboration, aesthetic filtering, and symbolic compromise.'",
    distractor_analysis: {
      A: "Correct. Accurately details Freud's theoretical critique of secondary elaboration and compromise.",
      B: "Incorrect. Freud was deeply interested in art and literature (e.g., Leonardo da Vinci, Michelangelo).",
      C: "Incorrect. Absurd phrenological claim.",
      D: "Incorrect. Freud authored *The Interpretation of Dreams*.",
      E: "Incorrect. Unrelated physical nerve complaint."
    },
    misconception: "Assuming Freud doubted the sincerity of the artists rather than understanding his theoretical principle of secondary psychic revision.",
    time_estimate_seconds: 60
  },
  {
    exam_name: "GRE",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 3,
    passage_id: "gre_rc_surrealism_automatism",
    passage: PASSAGE_GRE_SURREALISM,
    question_text: "In the final paragraph, the author describes the ideological tensions between André Breton and Georges Bataille to illustrate:",
    options: {
      A: "The harmonious and unanimous consensus that characterized all avant-garde artistic circles.",
      B: "The internal theoretical fractures within Surrealism between high-minded idealism and transgressive materialism.",
      C: "The total victory of Marxist economics over psychoanalytic theory.",
      D: "The legal prosecution of French authors for copyright infringement.",
      E: "The complete abandonment of painting in favor of mechanical textile weaving."
    },
    correct_option: "B",
    explanation: "The final paragraph explains: 'internal ideological fractures rapidly splintered the Surrealist movement. While Breton attempted to reconcile psychic automatism with orthodox Marxist dialectical materialism, dissidents like Georges Bataille mocked Breton's high-minded idealism, proposing a darker, \"base materialism\"...'",
    distractor_analysis: {
      A: "Incorrect. The text describes acute fracturing, not consensus.",
      B: "Correct. Highlights the theoretical split between Breton's poetic idealism and Bataille's transgressive base materialism.",
      C: "Incorrect. The text states the tension between psychology and Marxism was 'volatile' and 'unresolved.'",
      D: "Incorrect. No copyright lawsuits are mentioned.",
      E: "Incorrect. Complete nonsense."
    },
    misconception: "Viewing the avant-garde as a monolithic group rather than a deeply fractured ideological movement.",
    time_estimate_seconds: 55
  },

  // --------------------------------------------------------------------------
  // Passage 9: Milankovitch Orbital Forcing (4 items)
  // --------------------------------------------------------------------------
  {
    exam_name: "GRE",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 2,
    passage_id: "gre_rc_milankovitch_cycles",
    passage: PASSAGE_GRE_MILANKOVITCH,
    question_text: "According to Milutin Milankovitch's astronomical theory, the primary orbital trigger for continental ice sheet glaciation is:",
    options: {
      A: "Exorbitantly cold winter blizzards at the Earth's equator.",
      B: "Cool summer insolation at high northern latitudes that fails to melt accumulated winter snowpacks.",
      C: "A catastrophic reduction in the solar constant caused by sunspots.",
      D: "The sudden reversal of the Earth's magnetic poles every 10,000 years.",
      E: "The total evaporation of the Arctic Ocean during the equinox."
    },
    correct_option: "B",
    explanation: "Paragraph 1 explicitly notes: 'Milankovitch argued that the critical determinant of continental glaciation was not harsh winter cold, but rather cool summer insolation at high northern latitudes (around 65°N), which prevented accumulated winter snowpacks from melting during the brief Arctic summer, allowing perennial ice sheets to expand year over year.'",
    distractor_analysis: {
      A: "Incorrect. Milankovitch explicitly rejected harsh winter cold as the primary determinant.",
      B: "Correct. Directly captures the role of cool summer insolation preventing snowmelt at high northern latitudes.",
      C: "Incorrect. Milankovitch modeled orbital geometry, not solar sunspot variations.",
      D: "Incorrect. Geomagnetic reversals are unmentioned.",
      E: "Incorrect. The Arctic ocean did not evaporate."
    },
    misconception: "Assuming bitterly cold winters cause glaciation, rather than cool summers failing to melt winter snow.",
    time_estimate_seconds: 50
  },
  {
    exam_name: "GRE",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 3,
    passage_id: "gre_rc_milankovitch_cycles",
    passage: PASSAGE_GRE_MILANKOVITCH,
    question_text: "The 1976 'Pacemaker of the Ice Ages' study provided decisive empirical vindication for the Milankovitch hypothesis because it:",
    options: {
      A: "Discovered ancient astronomical telescopes buried under Antarctic ice.",
      B: "Documented oxygen isotope ratio spectral peaks in deep-sea sediment cores that precisely matched astronomical periodicities of 23,000, 41,000, and 100,000 years.",
      C: "Proved that greenhouse gases have zero influence on Earth's climate.",
      D: "Demonstrated that Earth's orbit has remained a perfect, unvarying circle for billions of years.",
      E: "Showed that glacial cycles occur randomly without any periodic regularity."
    },
    correct_option: "B",
    explanation: "Paragraph 2 states: 'Analyzing oxygen isotope ratios ($^{18}\\text{O}/^{16}\\text{O}$) preserved in the calcitic shells of benthic foraminifera extracted from deep-sea sediment cores, the researchers documented clear spectral peaks at 23,000, 41,000, and 100,000 years, providing irrefutable empirical evidence that orbital forcing paced Pleistocene glaciation.'",
    distractor_analysis: {
      A: "Incorrect. Astronomical proof came from deep-sea sediment cores, not ancient telescopes.",
      B: "Correct. Accurately synthesizes the isotopic sediment evidence matching Milankovitch orbital cycles.",
      C: "Incorrect. The final paragraph explains carbon dioxide greenhouse gas feedbacks are essential amplifiers.",
      D: "Incorrect. Eccentricity proves the orbit varies in elliptical shape.",
      E: "Incorrect. The study proved strong periodic regularity."
    },
    misconception: "Confusing isotopic sediment proxies with direct atmospheric or astronomical observational records.",
    time_estimate_seconds: 60
  },
  {
    exam_name: "GRE",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 3,
    passage_id: "gre_rc_milankovitch_cycles",
    passage: PASSAGE_GRE_MILANKOVITCH,
    question_text: "The author's concluding metaphor—'Orbital pacing provides the rhythmic metronome, but terrestrial biogeochemical feedbacks compose the dramatic climatic symphony'—serves primarily to convey that:",
    options: {
      A: "Paleoclimatologists should study classical orchestral music rather than geology.",
      B: "Orbital parameters set the timing and frequency of glacial cycles, but internal terrestrial carbon feedbacks determine the full amplitude and severity of temperature swings.",
      C: "Milankovitch's orbital calculations were mathematically tone-deaf and fundamentally wrong.",
      D: "The global carbon cycle operates completely independently of solar insolation.",
      E: "Earth's orbit emits acoustic sound waves that can be detected by submarine sonar."
    },
    correct_option: "B",
    explanation: "The metaphor synthesizes the two forces: orbital forcing is the 'rhythmic metronome' (dictating timing/periodicity), while terrestrial biogeochemical feedbacks (carbon sequestration, ocean stratification, iron fertilization) compose the 'dramatic climatic symphony' (amplifying the magnitude and depth of glaciation).",
    distractor_analysis: {
      A: "Incorrect. Literal musical distraction.",
      B: "Correct. Accurately interprets the distinction between astronomical pacing (timing) and terrestrial biogeochemical amplification (magnitude).",
      C: "Incorrect. The author explicitly confirms Milankovitch's timing was vindicated.",
      D: "Incorrect. The carbon cycle interacts directly with the orbital pacing.",
      E: "Incorrect. Literal acoustic distortion of an evocative scientific metaphor."
    },
    misconception: "Taking a musical metaphor literally rather than understanding the scientific relationship between timing (metronome) and magnitude (symphony).",
    time_estimate_seconds: 55
  },
  {
    exam_name: "GRE",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 2,
    passage_id: "gre_rc_milankovitch_cycles",
    passage: PASSAGE_GRE_MILANKOVITCH,
    question_text: "According to the passage, the oceanic carbon cycle amplifies glacial inception through which of the following mechanisms?",
    options: {
      A: "Underwater volcanic eruptions releasing billions of tons of methane.",
      B: "Enhanced marine biological pumping, ocean stratification, and continental dust iron fertilization that sequester atmospheric carbon dioxide into deep ocean reservoirs.",
      C: "Massive boiling of surface seawater caused by orbital solar flares.",
      D: "Commercial deep-sea mining operations releasing sulfur.",
      E: "The complete extinction of all calcifying marine plankton species."
    },
    correct_option: "B",
    explanation: "Paragraph 3 explicitly states: 'during glacial inception, enhanced biological marine pumping, expanded ocean stratification, and increased iron fertilization by continental dust sequester hundreds of gigatons of carbon dioxide from the atmosphere into deep-sea reservoirs, plunging global temperatures...'",
    distractor_analysis: {
      A: "Incorrect. Methane release would warm the planet, not cause glaciation.",
      B: "Correct. Matches the passage's explanation of marine pumping, stratification, and iron fertilization sequestering CO₂.",
      C: "Incorrect. Boiling oceans are unmentioned and would prevent glaciation.",
      D: "Incorrect. Prehistoric glaciation was completely unaffected by modern commercial mining.",
      E: "Incorrect. Foraminifera and plankton thrived and their shells preserved the isotopic record."
    },
    misconception: "Confusing warming mechanisms with biological carbon sequestration mechanisms that drop global temperatures.",
    time_estimate_seconds: 50
  }
];
