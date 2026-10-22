// Path: lib/data/banks/gmat/comprehension.ts
import type { SeedQuestion } from "../../question-bank-seed";

// ============================================================================
// GMAT FOCUS READING COMPREHENSION PASSAGES (Institutional Quality)
// Diverse domains: Behavioral Economics, Quantitative Finance, Neuroscience,
// Macroeconomics, Antitrust Law, Evolutionary Biology, Neolithic Archaeology
// ============================================================================

// ----------------------------------------------------------------------------
// Passage 1: Post-Quantum Cryptography & Lattice-Based Reductions (360 words)
// ----------------------------------------------------------------------------
const PASSAGE_GMAT_PQC = `For nearly half a century, the architectural backbone of modern public-key cryptography—securing sovereign military communications, international interbank clearing networks, and consumer digital identities—has rested on the mathematical difficulty of two number-theoretic problems: prime integer factorization (underpinning the RSA protocol) and discrete logarithms over finite fields and elliptic curves. These algorithms derive their asymmetric security from a fundamental asymmetry in classical computing complexity: while computing the product of two large primes requires negligible central processing cycles, reversing the operation by factoring a composite integer of several thousand bits requires sub-exponential time that renders classical brute-force decryption functionally impossible.

However, the theoretical maturation of quantum information processing has abruptly invalidated this foundational security premise. Under Peter Shor's 1994 quantum algorithm, both integer factorization and discrete logarithms collapse from sub-exponential hardness to polynomial time $\\mathcal{O}((\\log N)^3)$. Consequently, an operational quantum computer possessing several thousand fault-tolerant physical qubits could execute Shor's algorithm to dismantle global cryptographic protocols in a matter of minutes, decrypting legacy transmissions retroactively captured by adversarial intelligence agencies under "store-now, decrypt-later" interception doctrines.

In response, cryptographers have pivoted toward post-quantum cryptography (PQC), with lattice-based cryptography emerging as the leading mathematical paradigm. Unlike classical public-key schemes based on one-dimensional algebraic structures, lattice schemes embed cryptographic keys within high-dimensional geometric spaces, typically lattices spanning hundreds or thousands of dimensions. Security guarantees rest on the worst-case hardness of high-dimensional geometric shortest vector problems (SVP) and the Learning With Errors (LWE) problem. Even when subjected to quantum search heuristics or quantum Fourier transforms, lattice-based problems exhibit no known periodic or hidden subgroup structures that Shor's algorithm can exploit. Nevertheless, the transition to lattice architectures introduces significant physical trade-offs: public keys and digital signatures expand from mere dozens of bytes to several kilobytes, imposing severe latency, memory overhead, and transmission bandwidth bottlenecks on resource-constrained embedded systems and ultra-low-latency financial trading exchanges.`;

// ----------------------------------------------------------------------------
// Passage 2: Central Bank Repo Facilities & Shadow Banking Liquidity (380 words)
// ----------------------------------------------------------------------------
const PASSAGE_GMAT_REPO = `The global financial crisis of 2008 and the acute Treasury market dislocation of March 2020 fundamentally reconstituted central banking doctrine regarding the transmission of monetary policy and the role of the lender of last resort. For decades, the dominant monetarist paradigm assumed that open market operations conducted through a select cohort of primary dealer banks would fluidly transmit liquidity throughout the broader real economy. By adjusting the federal funds rate and intervening in short-term overnight money markets, central banks presumed that private arbitrage by dealer institutions would effortlessly eliminate liquidity disparities between sovereign debt, corporate paper, and secured wholesale funding markets.

This classical transmission model, however, critically overlooked the structural shift in wholesale funding: the rise of the shadow banking system, characterized by non-bank financial intermediaries (NBFIs) including hedge funds, money market funds, and asset-backed commercial paper conduits. These entities do not hold reserves at the central bank and rely almost exclusively on short-term collateralized borrowing, predominantly repurchase agreements (repo). In a typical repo transaction, an NBFI deposits ultra-safe collateral—such as sovereign Treasury bonds—in exchange for short-term cash, agreeing to repurchase the securities at a premium on the following day.

During episodes of systemic stress, this market architecture exhibits destabilizing pro-cyclical fragility. Because primary dealers operate under strict post-crisis regulatory leverage ratios (such as the Supplementary Leverage Ratio), their balance sheets are structurally constrained. When market volatility surges, foreign central banks and institutional funds simultaneously liquidate sovereign debt to hoard cash reserves. Primary dealers, constrained by capital rules, cannot expand their balance sheets to intermediate this influx of sellers, causing bid-ask spreads to blow out and repo rates to spike unpredictably. Rather than stabilizing the market, arbitrageurs pull back to preserve their own solvency margins. This breakdown forced central banks to establish standing repo facilities and emergency credit lines that bypass traditional banking conduits entirely, directly backstopping non-bank clearing houses and effectively transforming the central bank into the "dealer of last resort."`;

// ----------------------------------------------------------------------------
// Passage 3: Epigenetic Inheritance & the Extended Evolutionary Synthesis (370 words)
// ----------------------------------------------------------------------------
const PASSAGE_GMAT_EPIGENETICS = `Throughout the twentieth century, the Modern Synthesis served as the inviolable orthodoxy of evolutionary biology. Integrating Mendelian genetics with Darwinian natural selection, the synthesis posited that phenotypic evolution proceeds exclusively through random genetic mutations occurring within nucleotide sequences, which are subsequently sorted by differential reproductive success. Central to this architecture was the Weismann barrier: the strict developmental segregation between mortal somatic cells and immortal germline cells, which theoretically precluded environmental experiences acquired during an organism's lifetime from being transmitted to subsequent generations.

Over the last two decades, however, advances in molecular epigenetics have challenged this strictly reductionist framework, catalyzing calls for an Extended Evolutionary Synthesis (EES). Researchers have demonstrated that environmental exposures—such as acute caloric deprivation, toxicant exposure, and severe psychological distress—can induce chemical modifications to chromatin architecture without altering the underlying DNA sequence. These epigenetic tags, primarily DNA methylation and post-translational histone modifications, regulate whether specific genes are transcriptionally accessible or silenced. 

The pivotal theoretical controversy centers on whether these epigenetic marks can bypass the comprehensive epigenetic reprogramming that occurs during mammalian gametogenesis and early embryogenesis. While classical embryologists maintained that germline erasure wipes all ancestral epigenetic memory clean, empirical investigations have identified "escapee" loci in mammalian genomes that retain parental methylation patterns across generations. In rodent models, ancestral dietary shock has been shown to induce metabolic dysfunction and glucose intolerance in third-generation progeny that never encountered the original environmental stressor. 

Critics of the EES concede that transgenerational epigenetic inheritance occurs in plants and nematodes, which lack sequestered germlines, but remain deeply skeptical of its evolutionary significance in mammals. They argue that inherited epigenetic variations are unstable epimutations that revert to baseline within several generations, lacking the high fidelity and longevity required to drive sustained natural selection. Epigenetics, in this view, functions merely as a transient physiological plasticity mechanism rather than an autonomous driver of macroevolutionary divergence.`;

// ----------------------------------------------------------------------------
// Passage 4: Platform Antitrust & the Two-Sided Market Conundrum (375 words)
// ----------------------------------------------------------------------------
const PASSAGE_GMAT_ANTITRUST = `For over a century, judicial enforcement of antitrust jurisprudence under the Sherman and Clayton Acts has been governed by the Consumer Welfare Standard (CWS), formalized by Robert Bork and the Chicago School in the late 1970s. Under this prevailing standard, anticompetitive conduct is defined almost exclusively by demonstrable consumer harm, typically evidenced by output restriction, quality degradation, or supra-competitive price inflation in a relevant market. If a corporate merger or commercial practice generates measurable productive efficiencies without elevating nominal consumer prices, courts have traditionally presumed the behavior to be pro-competitive or competitively benign.

The meteoric rise of digital multi-sided platform conglomerates—operating in search, social networking, e-commerce, and operating systems—has exposed deep structural inadequacies in this traditional antitrust paradigm. Modern tech platforms differ fundamentally from traditional single-market manufacturing corporations because they operate as zero-price or subsidized two-sided markets. By providing consumer-facing services (such as search queries, navigation maps, or social communication) free of nominal monetary charge, platforms attract immense user bases. These user networks generate massive troves of behavioral data and user attention, which the platform monetizes on the opposite side of its ecosystem through hyper-targeted digital advertising or third-party seller commissions.

Under the orthodox Consumer Welfare Standard, these platform practices appear invulnerable to antitrust prosecution: because consumers pay zero dollars for search or messaging services, plaintiffs struggle to prove immediate economic injury via price gouging. Yet critics, spearheaded by the "New Brandeis" movement, argue that this metric is dangerously myopic. Monopolistic digital platforms leverage cross-side network effects, predatory interoperability restrictions, and deep data moats to preemptively acquire nascent competitors (a tactic known as "killer acquisitions") long before they can develop into viable threats. Furthermore, platforms exploit informational asymmetries by self-preferencing their proprietary products in algorithmic search rankings over those of third-party merchants who rely on the platform's infrastructure. By framing anticompetitive harm solely in terms of short-run retail consumer prices, conventional antitrust jurisprudence ignores systemic long-term threats to innovation, algorithmic neutrality, and market contestability.`;

// ----------------------------------------------------------------------------
// Passage 5: The Younger Dryas & the Pleistocene Megafaunal Debate (360 words)
// ----------------------------------------------------------------------------
const PASSAGE_GMAT_MEGAFAUNA = `The abrupt extinction of approximately thirty-five genera of large mammalian megafauna across North America at the terminal Pleistocene (approximately 12,800 calendar years before present)—including mammoths, mastodons, saber-toothed cats, and giant ground sloths—remains one of the most vigorously contested debates in quaternary paleoecology. For decades, the dominant theoretical model was Paul Martin's "Blitzkrieg" or Overkill Hypothesis, which asserted that the arrival of Clovis paleo-hunters, armed with advanced fluted projectile points, decimated naive megafaunal populations that had evolved in the absence of hominin predation pressure and were biologically ill-equipped to sustain high anthropogenic mortality rates due to their prolonged gestational periods.

Over the past two decades, high-resolution stratigraphy, radiocarbon calibration, and fossil spatial mapping have mounted formidable empirical challenges to the Overkill model. Archaeological excavations across hundreds of terminal Pleistocene sites have yielded remarkably scant evidence of kill sites: Clovis hunting implements have been conclusively associated with only two genera—mammoths and mastodons—leaving the rapid disappearance of the remaining thirty-three genera entirely uncorroborated by direct taphonomic or hunting evidence. Moreover, paleogenomic ancient DNA analyses indicate that populations of several megafaunal species, such as the steppe bison and horse, had initiated precipitous demographic declines thousands of years prior to the appearance of Clovis material culture.

In place of single-cause human overkill, contemporary paleoecologists emphasize the catastrophic climatic instability of the Younger Dryas: a sudden, century-scale reversal to near-glacial temperatures triggered by the catastrophic drainage of glacial Lake Agassiz into the North Atlantic, which disrupted the Atlantic Meridional Overturning Circulation (AMOC). This abrupt climatic shock shattered established floral biomes, transforming homogeneous productive steppe-tundra into fragmented, nutrient-poor boreal forests and arid scrublands. Incapable of migrating rapidly across disrupted ecological corridors, specialized megafaunal herbivores suffered nutritional starvation and population collapse, which subsequently cascading into the extinction of apex carnivores. While human hunting undoubtedly exerted localized terminal pressures on dwindling relic populations, the primary macroscopic driver was ecological uncoupling driven by rapid planetary climate oscillation.`;

// ----------------------------------------------------------------------------
// Passage 6: Algorithmic Collusion & Dynamic Pricing Coordination (350 words)
// ----------------------------------------------------------------------------
const PASSAGE_GMAT_PRICING = `Under classical industrial organization theory, price-fixing cartels and collusive pricing arrangements are considered inherently unstable economic structures. In an oligopolistic market characterized by repeated interactions, each participating firm faces a perpetual prisoner's dilemma: while joint profit maximization dictates holding prices at supra-competitive monopoly levels, each individual firm possesses a dominant short-run economic incentive to secretly undercut its rivals, stealing market share before competitors can detect the deviation and retaliate. Consequently, sustained collusion traditionally requires explicit inter-firm communication, conspiratorial meetings, and costly monitoring mechanisms—conduct that leaves evidentiary breadcrumbs readily prosecutable under federal antitrust statutes.

The rapid migration of modern commercial pricing to autonomous reinforcement learning algorithms, however, has profoundly altered the structural mechanics of market equilibrium. Operating across public cloud architectures, deep Q-learning algorithms are tasked with a singular, unconstrained mathematical mandate: maximize long-run cumulative revenues through real-time dynamic price adjustments based on continuous monitoring of competitor pricing, inventory levels, and consumer demand elasticity. 

Alarmingly, computer simulations and experimental economics have demonstrated that multi-agent pricing algorithms deployed in simulated oligopolies can converge on stable supra-competitive price equilibria without any human programming directing them to collude, and without exchanging a single line of explicit communication. Through millions of iterative game-theoretic iterations, the algorithms independently discover that mutual price elevation yields superior long-run reward payoffs compared to destructive price wars. More critically, they learn to operationalize instant retaliatory price drops within milliseconds of a competitor's undercutting action, effectively enforcing punishment strategies that deter defection.

This phenomenon of "autonomous tacit algorithmic collusion" creates a profound regulatory vacuum. Section 1 of the Sherman Act explicitly requires proof of an agreement, contract, or conspiracy between two or more independent economic entities to establish antitrust liability. Because algorithmic coordination occurs organically through decentralized machine learning weights and autonomous policy discovery, there is no conspiratorial intent, human agreement, or inter-firm communication. Regulators cannot easily prove that algorithmic behavior constitutes an unlawful meeting of the minds rather than hyper-efficient, independent competitive reaction.`;

// ----------------------------------------------------------------------------
// Passage 7: Intertemporal Choice & Dual-System Neuroeconomics (340 words)
// ----------------------------------------------------------------------------
const PASSAGE_GMAT_NEURO = `Neoclassical economic models of intertemporal choice rest on the discounted utility framework formulated by Paul Samuelson in 1937. Under this model, rational decision-makers evaluate prospective intertemporal payoffs by discounting future utility at a constant, invariant rate across all time horizons. An individual who prefers receiving $100 today over $110 tomorrow should logically maintain the identical relative preference between $100 in 365 days and $110 in 366 days, as the one-day delay remains mathematically equivalent. This property—known as exponential discounting—ensures that an agent's economic choices remain dynamically consistent across time.

Decades of behavioral experiments, however, have decisively revealed that human intertemporal valuation systematically violates exponential consistency, exhibiting instead hyperbolic or quasi-hyperbolic discounting. Human beings disproportionately overvalue immediate consumption relative to any delayed reward—a phenomenon known as the "present bias." When faced with choices involving the immediate present, individuals display exorbitantly high discount rates, impulsively opting for smaller immediate gratification. Yet when identical delays are placed far into the future, their discount rates decline dramatically, reflecting patient, long-term normative valuations.

Neuroeconomists have grounded this behavioral anomaly in the anatomical architecture of the human brain. Using functional magnetic resonance imaging (fMRI) during intertemporal monetary choices, researchers identified two distinct, competing neural valuation systems. Decisions involving immediate rewards trigger robust activation within the limbic and paralimbic structures—specifically the ventral striatum and the medial prefrontal cortex—evolutionarily ancient brain regions rich in dopaminergic innervation that govern visceral, impulsive appetitive drives. Conversely, intertemporal choices involving delays—regardless of whether immediate options are present—uniformly engage the lateral prefrontal cortex and posterior parietal cortex, evolutionary newer structures associated with executive function, working memory, and deliberative calculative control. Present bias, therefore, does not represent a computational calculation error, but rather the evolutionary tug-of-war between ancient dopaminergic neural circuits primed for immediate survival and advanced cortical circuitry mediating abstract future planning.`;

// ----------------------------------------------------------------------------
// Passage 8: Agglomeration Economies & Spatial Knowledge Spillovers (350 words)
// ----------------------------------------------------------------------------
const PASSAGE_GMAT_AGGLOMERATION = `The enduring geographic concentration of economic activity and specialized human capital in dense metropolitan clusters—such as biotechnology in Kendall Square or advanced software in Silicon Valley—presents a fundamental conundrum for classical trade theory. Standard neoclassical trade models predict that in an era of instantaneous digital telecommunications, high-speed fiber-optic data transmission, and plummeting transport costs, economic activity should disperse outward toward geographic peripheries to exploit lower land rents, reduced labor costs, and the absence of urban congestion.

Yet contemporary economic geography confirms the opposite: spatial concentration has intensified rather than diminished. Urban economists explain this paradox through agglomeration economies, first conceptualized by Alfred Marshall in 1890 and refined by modern spatial equilibrium theory. Marshallian agglomeration generates economic value through three distinct external scale advantages: labor pooling, input sharing, and localized knowledge spillovers.

While deep labor pools and specialized supply-chain vendors provide substantial efficiencies, modern research identifies localized knowledge spillovers—the rapid, informal exchange of tacit knowledge—as the supreme driver of high-tech agglomeration. Unlike codified knowledge (which can be formalized into patents, academic publications, or digital code and transmitted globally at zero marginal cost), tacit knowledge consists of uncodified procedural insights, experimental instincts, and cutting-edge craft techniques that are transmitted almost exclusively through face-to-face interaction, spontaneous collaborative encounters, and labor mobility between competing regional firms.

Empirical studies tracing patent citation patterns demonstrate that the probability of a firm citing a local inventor's patent within the first two years of issuance is up to ten times higher than citing an identical quality patent from a distant metropolitan region, even after controlling for corporate branch networks and prior co-authorship. As spatial clustering accelerates, positive feedback loops take hold: top talent migrates to regions with thick job markets to minimize career risk, which in turn attracts capital investment from venture funds, further expanding local productivity advantages and cementing metropolitan dominance.`;

// ----------------------------------------------------------------------------
// Passage 9: Archaeoastronomy & Megalithic Landscape Archaeology (360 words)
// ----------------------------------------------------------------------------
const PASSAGE_GMAT_ARCHAEO = `During the mid-twentieth century, the nascent discipline of archaeoastronomy was ignited by claims that European Neolithic megalithic monuments—most famously Stonehenge and the stone circles of the British Isles—functioned as sophisticated prehistoric astronomical observatories and calculative calendar computers. Proponents of this "astro-archaeological" paradigm, notably astronomer Gerald Hawkins and engineering professor Alexander Thom, argued that the orientation of stone alignments, trilithons, and outlying sighting stones were engineered with millimeter-level precision to track extreme solstitial horizons, equinoctial sunrises, and complex nineteen-year lunar standstill azimuth cycles. Under Thom's formulation, Neolithic builders possessed advanced geometric knowledge, utilizing a standardized measurement unit dubbed the "megalithic yard" to calibrate planetary alignments.

In recent decades, however, professional prehistoric archaeologists have methodically dismantled the core assumptions of Thom's astronomical calculator hypothesis. First, landscape archaeologists demonstrated that Thom's celestial alignments suffered from acute confirmation bias and statistical cherry-picking: given dozens of randomly placed standing stones across an open landscape, an investigator can discover dozens of lines linking arbitrary stones to any arbitrary celestial azimuth within a margin of several degrees purely by mathematical chance.

Second, modern contextual archaeology emphasizes that monument construction must be understood within the social, spiritual, and ritual landscapes of Neolithic pastoralist communities, rather than through the anachronistic lens of modern empirical astrophysics. While major solstitial alignments—such as the alignment of Stonehenge's Avenue with the midwinter sunset and midsummer sunrise—are undeniable cultural features, their primary societal purpose was cosmological and ritualistic rather than observational. Megalithic structures served as sacred conduits connecting cyclical agricultural rhythms, ancestral burial rites, and monumental architecture. Rather than operating as solitary predictive observatories for calculating eclipse cycles, these ceremonial landscapes functioned as communal gathering theaters where dispersed pastoralist clans coalesced during seasonal solstices to reaffirm tribal social cohesion, feast on sacrificial livestock, and bury elite ancestral remains.`;

// ============================================================================
// GMAT READING COMPREHENSION QUESTIONS (36 High-Rigor Questions)
// ============================================================================

export const GMAT_COMPREHENSION_BANK: SeedQuestion[] = [
  // --------------------------------------------------------------------------
  // Passage 1: Post-Quantum Cryptography Questions (4 items)
  // --------------------------------------------------------------------------
  {
    exam_name: "GMAT Focus",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 3,
    passage_id: "gmat_rc_pqc_lattices",
    passage: PASSAGE_GMAT_PQC,
    question_text: "Which of the following best expresses the primary purpose of the passage on post-quantum cryptography?",
    options: {
      A: "To argue that quantum computing hardware will inevitably remain too costly for practical deployment in sovereign security contexts.",
      B: "To explain how quantum computational algorithms threaten traditional public-key cryptography and evaluate the mathematical basis and practical trade-offs of lattice-based alternatives.",
      C: "To prove that the RSA protocol possesses inherent mathematical flaws that could be solved by expanding classical key lengths.",
      D: "To propose an alternative mathematical framework to both Shor's algorithm and lattice-based geometric vectors.",
      E: "To demonstrate that high-dimensional geometric spaces are physically impossible to implement on commercial microprocessors."
    },
    correct_option: "B",
    explanation: "The passage begins by establishing the classical asymmetric security foundations, details how Shor's quantum algorithm dismantles them, introduces lattice-based cryptography as the primary post-quantum alternative, and concludes by discussing the trade-offs (larger key size, latency, bandwidth). Option B accurately synthesizes this full scope.",
    distractor_analysis: {
      A: "Incorrect. The passage never claims quantum hardware is too costly to deploy; it emphasizes the severe threat posed by its maturation.",
      B: "Correct. Succinctly captures the threat of Shor's algorithm, the lattice-based solution, and the resulting engineering trade-offs.",
      C: "Incorrect. The passage states RSA relies on integer factorization which is secure against classical computers, not that it had classical mathematical flaws.",
      D: "Incorrect. The author explains existing developments rather than proposing a novel framework.",
      E: "Incorrect. Extreme and contradicted: the text states lattice cryptography is being transitioned to, though it incurs memory and bandwidth overhead."
    },
    misconception: "Focusing solely on the quantum threat or solely on engineering trade-offs rather than the synthesis of both.",
    time_estimate_seconds: 70
  },
  {
    exam_name: "GMAT Focus",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 2,
    passage_id: "gmat_rc_pqc_lattices",
    passage: PASSAGE_GMAT_PQC,
    question_text: "According to the passage, why does Shor's algorithm fail to dismantle lattice-based cryptography as it does RSA?",
    options: {
      A: "Lattice-based schemes utilize composite prime numbers that exceed the physical register size of quantum processors.",
      B: "Lattice problems do not exhibit the periodic or hidden subgroup structures that Shor's algorithm requires for quantum acceleration.",
      C: "Lattice cryptography relies exclusively on symmetric key algorithms that are physically immune to quantum Fourier transforms.",
      D: "Lattice algorithms require classical supercomputers to run simultaneous decoherence error-correction loops.",
      E: "Shor's algorithm can only be executed on optical quantum processors, whereas lattice cryptography runs on superconducting circuits."
    },
    correct_option: "B",
    explanation: "The third paragraph explicitly states: 'Even when subjected to quantum search heuristics or quantum Fourier transforms, lattice-based problems exhibit no known periodic or hidden subgroup structures that Shor's algorithm can exploit.'",
    distractor_analysis: {
      A: "Incorrect. Lattice cryptography is based on high-dimensional geometric spaces, not prime factorization.",
      B: "Correct. Directly mirrors the passage's explanation regarding the absence of periodic or hidden subgroup structures.",
      C: "Incorrect. Lattice cryptography is public-key (asymmetric), not symmetric.",
      D: "Incorrect. The passage makes no mention of classical supercomputer error-correction loops.",
      E: "Incorrect. Fabricates an unmentioned distinction between optical and superconducting quantum hardware."
    },
    misconception: "Confusing the mathematical properties of lattice geometry with physical hardware constraints.",
    time_estimate_seconds: 65
  },
  {
    exam_name: "GMAT Focus",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 3,
    passage_id: "gmat_rc_pqc_lattices",
    passage: PASSAGE_GMAT_PQC,
    question_text: "It can be inferred from the passage that an intelligence agency adopting a 'store-now, decrypt-later' doctrine is operating under which of the following assumptions?",
    options: {
      A: "Classical brute-force computing will achieve exponential acceleration within the next fiscal cycle.",
      B: "Lattice-based cryptography will soon be proven vulnerable to classical sub-exponential factoring algorithms.",
      C: "Encrypted communications intercepted today may retain high strategic or intelligence value years later when operational quantum computing arrives.",
      D: "Shor's algorithm can only successfully decrypt messages if intercepted simultaneously with their original transmission.",
      E: "Embedded hardware systems will abandon encryption altogether due to memory overhead."
    },
    correct_option: "C",
    explanation: "The text explains that agencies intercept and store encrypted traffic now so they can decrypt it retroactively once a quantum computer running Shor's algorithm is built. This implies that the intercepted data will still have intelligence or strategic value in that future timeframe.",
    distractor_analysis: {
      A: "Incorrect. The doctrine relies on future quantum capabilities, not classical brute-force acceleration.",
      B: "Incorrect. The stored traffic is protected by current classical protocols (like RSA), not lattice cryptography.",
      C: "Correct. Logical necessity: storing data for years only makes strategic sense if its intelligence value persists until quantum machines arrive.",
      D: "Incorrect. This reverses the premise; retroactive decryption means real-time interception is not required.",
      E: "Incorrect. Unrelated to the operational motivations of state intelligence agencies."
    },
    misconception: "Assuming the doctrine applies to future post-quantum ciphertext rather than currently transmitted legacy classical ciphertext.",
    time_estimate_seconds: 70
  },
  {
    exam_name: "GMAT Focus",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 2,
    passage_id: "gmat_rc_pqc_lattices",
    passage: PASSAGE_GMAT_PQC,
    question_text: "The author mentions 'ultra-low-latency financial trading exchanges' in the final sentence primarily in order to:",
    options: {
      A: "Highlight a sector where the physical bandwidth and memory overhead of lattice-based schemes pose concrete operational friction.",
      B: "Demonstrate that high-frequency trading firms are the primary targets of adversarial state intelligence agencies.",
      C: "Argue that financial markets should immediately abandon public-key encryption in favor of unencrypted fiber-optic cables.",
      D: "Suggest that financial institutions have been negligent in upgrading from RSA protocols.",
      E: "Provide an example of an industry that has successfully eliminated quantum decryption risks."
    },
    correct_option: "A",
    explanation: "The passage notes that lattice keys expand from dozens of bytes to kilobytes, imposing latency, memory, and bandwidth bottlenecks on resource-constrained embedded systems and low-latency financial exchanges. The author mentions trading exchanges as a specific operational context sensitive to these trade-offs.",
    distractor_analysis: {
      A: "Correct. Illustrates a concrete operational environment where the data overhead of lattice-based signatures creates tangible friction.",
      B: "Incorrect. The text does not claim trading exchanges are targeted by state intelligence agencies.",
      C: "Incorrect. Distorted and absurd; no recommendation to abandon encryption is made.",
      D: "Incorrect. Accusations of institutional negligence are completely absent from the text.",
      E: "Incorrect. The passage emphasizes the unresolved trade-offs facing such exchanges, not successful elimination of risk."
    },
    misconception: "Interpreting an illustrative engineering bottleneck example as an accusation of security negligence.",
    time_estimate_seconds: 60
  },

  // --------------------------------------------------------------------------
  // Passage 2: Central Bank Repo Facilities & Shadow Banking (4 items)
  // --------------------------------------------------------------------------
  {
    exam_name: "GMAT Focus",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 3,
    passage_id: "gmat_rc_repo_shadow_banking",
    passage: PASSAGE_GMAT_REPO,
    question_text: "Which of the following best describes the primary thesis of the passage?",
    options: {
      A: "The emergence of non-bank wholesale repo markets and regulatory capital constraints has forced central banks to fundamentally alter their operational doctrine from indirect bank mediators to direct market backstops.",
      B: "Primary dealer banks deliberately engineered the March 2020 Treasury crisis to lobby against Supplementary Leverage Ratios.",
      C: "Monetary policy transmission is completely ineffective unless central banks nationalize non-bank financial intermediaries.",
      D: "Repurchase agreements are inherently fraudulent financial contracts that destabilize sovereign debt markets.",
      E: "Central banks should eliminate all capital adequacy requirements on primary dealers to restore classical market efficiency."
    },
    correct_option: "A",
    explanation: "The passage explains why traditional transmission models failed when wholesale funding moved to shadow banking, shows how regulatory constraints on primary dealers caused systemic fragility in 2020, and concludes that central banks had to establish facilities directly backstopping non-banks as 'dealer of last resort.'",
    distractor_analysis: {
      A: "Correct. Thoroughly captures the transformation from traditional bank-mediated transmission to direct non-bank intervention.",
      B: "Incorrect. Conspiratorial claim unsupported by the text.",
      C: "Incorrect. The author never advocates nationalizing non-bank financial intermediaries.",
      D: "Incorrect. The passage describes repo as standard collateralized borrowing, not fraudulent.",
      E: "Incorrect. Normative policy prescription that exceeds the author's descriptive analytical scope."
    },
    misconception: "Focusing on a regulatory critique rather than the structural transformation of the central bank's lender-of-last-resort mandate.",
    time_estimate_seconds: 70
  },
  {
    exam_name: "GMAT Focus",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 2,
    passage_id: "gmat_rc_repo_shadow_banking",
    passage: PASSAGE_GMAT_REPO,
    question_text: "According to the passage, why were primary dealer banks unable to absorb the surge of sovereign debt sales during the March 2020 market dislocation?",
    options: {
      A: "Federal Reserve regulations prohibited primary dealers from holding sovereign Treasury securities on their balance sheets.",
      B: "Post-crisis regulatory leverage ratios strictly constrained the capacity of primary dealers to expand their balance sheets to intermediate market liquidity.",
      C: "Hedge funds and money market funds refused to accept collateral denominated in United States Treasuries.",
      D: "Central banks closed overnight repo facilities, preventing primary dealers from accessing central reserves.",
      E: "Primary dealers suffered catastrophic computer hardware failures due to unexpected transaction volumes."
    },
    correct_option: "B",
    explanation: "The third paragraph explicitly states: 'Because primary dealers operate under strict post-crisis regulatory leverage ratios (such as the Supplementary Leverage Ratio), their balance sheets are structurally constrained... Primary dealers, constrained by capital rules, cannot expand their balance sheets to intermediate this influx of sellers'.",
    distractor_analysis: {
      A: "Incorrect. Dealers routinely hold Treasuries; they were merely constrained from expanding total balance sheet size.",
      B: "Correct. Accurately identifies the regulatory leverage ratio constraint described in the text.",
      C: "Incorrect. The text states institutional funds were liquidating sovereign debt to hoard cash, not that they rejected Treasuries as collateral.",
      D: "Incorrect. Central banks did not close facilities; in fact, they opened new emergency facilities.",
      E: "Incorrect. Pure fabrication unsupported by the text."
    },
    misconception: "Confusing balance sheet regulatory constraints with a legal prohibition on holding sovereign debt.",
    time_estimate_seconds: 60
  },
  {
    exam_name: "GMAT Focus",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 3,
    passage_id: "gmat_rc_repo_shadow_banking",
    passage: PASSAGE_GMAT_REPO,
    question_text: "The author's description of the traditional monetarist transmission model in the first paragraph implies that its proponents:",
    options: {
      A: "Anticipated the rapid emergence of non-bank financial entities and designed primary dealer auctions accordingly.",
      B: "Assumed that private arbitrage by primary dealer banks would frictionlessly equilibrate liquidity conditions across different segments of the financial system.",
      C: "Believed that open market operations should only be conducted using high-risk corporate commercial paper.",
      D: "Warned that capital adequacy rules would inevitably trigger systemic runs in repo clearing houses.",
      E: "Argued that the lender of last resort should bypass commercial banks to deal directly with retail depositors."
    },
    correct_option: "B",
    explanation: "The first paragraph states: 'central banks presumed that private arbitrage by dealer institutions would effortlessly eliminate liquidity disparities between sovereign debt, corporate paper, and secured wholesale funding markets.' This directly aligns with Option B.",
    distractor_analysis: {
      A: "Incorrect. The second paragraph notes the classical model critically overlooked the rise of shadow banking.",
      B: "Correct. Precisely mirrors the text regarding frictionless private arbitrage eliminating liquidity disparities.",
      C: "Incorrect. Open market operations were conducted in short-term overnight money markets and Treasuries, not high-risk paper.",
      D: "Incorrect. Post-crisis capital rules were implemented long after the traditional monetarist model was formed.",
      E: "Incorrect. Retail depositors were never the intended counterparty for lender-of-last-resort facilities."
    },
    misconception: "Projecting modern regulatory debates backward onto classical monetarist assumptions.",
    time_estimate_seconds: 65
  },
  {
    exam_name: "GMAT Focus",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 3,
    passage_id: "gmat_rc_repo_shadow_banking",
    passage: PASSAGE_GMAT_REPO,
    question_text: "Which of the following scenarios is most analogous to the role of the central bank acting as a 'dealer of last resort' as described in the passage?",
    options: {
      A: "A city transportation authority raising subway fares during peak rush hour to encourage commuters to take private taxis.",
      B: "An agricultural cooperative setting up direct emergency grain silos to purchase excess wheat from independent farmers after traditional wholesale grain distributors run out of storage warehouse capacity.",
      C: "A commercial airline canceling flights during a severe winter storm to minimize fuel expenditures.",
      D: "A judicial court appointing a receiver to liquidate the remaining assets of a bankrupt consumer goods distributor.",
      E: "A commercial real estate landlord offering rental discounts to long-term commercial tenants during an economic boom."
    },
    correct_option: "B",
    explanation: "In the passage, traditional intermediaries (dealer banks) are constrained and cannot buy/absorb securities from market participants (NBFIs), so the central authority steps in directly to buy/finance the assets. In Option B, traditional wholesale grain distributors lack warehouse capacity to intermediate, so the central cooperative steps in directly to buy from the farmers.",
    distractor_analysis: {
      A: "Incorrect. Raising prices to divert traffic is dynamic pricing, not a backstop intervention when intermediaries fail.",
      B: "Correct. Captures the structural dynamic: primary middlemen are capacity-constrained, so a central authority directly interfaces with primary producers/holders.",
      C: "Incorrect. Risk avoidance and service curtailment is the opposite of an emergency market backstop.",
      D: "Incorrect. Bankruptcy liquidation is a wind-down procedure, not a market liquidity stabilization facility.",
      E: "Incorrect. Commercial price discrimination during a boom has no correspondence to liquidity intervention during crisis."
    },
    misconception: "Selecting an analogy based on financial keywords rather than matching the underlying structural mechanism of capacity-constrained middlemen.",
    time_estimate_seconds: 75
  },

  // --------------------------------------------------------------------------
  // Passage 3: Epigenetics & Extended Evolutionary Synthesis (4 items)
  // --------------------------------------------------------------------------
  {
    exam_name: "GMAT Focus",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 3,
    passage_id: "gmat_rc_epigenetics_ees",
    passage: PASSAGE_GMAT_EPIGENETICS,
    question_text: "The primary purpose of the passage on epigenetic inheritance is to:",
    options: {
      A: "Definitively prove that the Modern Synthesis is obsolete and that Lamarckian mechanisms govern mammalian evolution.",
      B: "Examine the theoretical controversy surrounding epigenetic inheritance and evaluate its challenge to the Modern Synthesis.",
      C: "Describe the chemical structure of histone modifications and detail their role in pharmaceutical drug discovery.",
      D: "Critique the experimental methodology utilized in rodent dietary shock experiments.",
      E: "Demonstrate that plant gametogenesis is biologically identical to mammalian reproductive embryogenesis."
    },
    correct_option: "B",
    explanation: "The passage introduces the Modern Synthesis orthodoxy, presents the challenge from epigenetic discoveries (EES), outlines evidence of transgenerational inheritance, and contrasts this with the counterarguments of skeptics who view epimutations as transient plasticity. It examines the ongoing debate rather than claiming one side has definitively won.",
    distractor_analysis: {
      A: "Incorrect. Too extreme; the author notes that critics remain deeply skeptical regarding mammalian evolutionary significance.",
      B: "Correct. Balanced and accurate synthesis of the theoretical challenge, empirical evidence, and counterarguments.",
      C: "Incorrect. Pharmaceutical applications are never mentioned.",
      D: "Incorrect. The author cites rodent experiments as empirical evidence, not to critique their methodologies.",
      E: "Incorrect. The passage explicitly distinguishes plants (which lack sequestered germlines) from mammals."
    },
    misconception: "Interpreting an account of a scientific paradigm challenge as a definitive victory for the challenger.",
    time_estimate_seconds: 65
  },
  {
    exam_name: "GMAT Focus",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 2,
    passage_id: "gmat_rc_epigenetics_ees",
    passage: PASSAGE_GMAT_EPIGENETICS,
    question_text: "According to the passage, the 'Weismann barrier' was historically considered essential to the Modern Synthesis because it:",
    options: {
      A: "Facilitated the rapid transmission of acquired environmental traits into egg and sperm cells.",
      B: "Prevented somatic cell modifications acquired during an organism's life from being incorporated into germline heredity.",
      C: "Proved that DNA methylation was the sole driver of speciation in multicellular organisms.",
      D: "Established that plants and nematodes could not undergo Darwinian natural selection.",
      E: "Demonstrated that nucleotide mutations occur exclusively in non-coding junk DNA."
    },
    correct_option: "B",
    explanation: "The first paragraph states: 'Central to this architecture was the Weismann barrier: the strict developmental segregation between mortal somatic cells and immortal germline cells, which theoretically precluded environmental experiences acquired during an organism's lifetime from being transmitted to subsequent generations.'",
    distractor_analysis: {
      A: "Incorrect. The Weismann barrier prevented, rather than facilitated, acquired trait transmission.",
      B: "Correct. Matches the passage's explanation of somatic-germline segregation precluding acquired inheritance.",
      C: "Incorrect. DNA methylation was discovered long after the Weismann barrier was formulated and challenges the barrier.",
      D: "Incorrect. The Weismann barrier applies to multicellular organisms with segregated germlines, not to disprove plant selection.",
      E: "Incorrect. Unrelated to mutations in non-coding DNA."
    },
    misconception: "Confusing the function of a historical theoretical barrier with the modern epigenetic findings that challenge it.",
    time_estimate_seconds: 60
  },
  {
    exam_name: "GMAT Focus",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 3,
    passage_id: "gmat_rc_epigenetics_ees",
    passage: PASSAGE_GMAT_EPIGENETICS,
    question_text: "Based on the passage, critics of the Extended Evolutionary Synthesis would most likely agree with which of the following statements regarding transgenerational epigenetic marks in mammals?",
    options: {
      A: "They represent permanent, high-fidelity genetic mutations that permanently displace classical Mendelian alleles.",
      B: "They are unstable epimutations that lack the intergenerational longevity necessary to serve as substrates for sustained natural selection.",
      C: "They occur exclusively in laboratory rodents that have been genetically modified to disable the Weismann barrier.",
      D: "They provide definitive proof that acquired cultural behaviors can mutate DNA nucleotide base pairs.",
      E: "They operate identically in mammalian embryonic germlines and in plant tissue cuttings."
    },
    correct_option: "B",
    explanation: "The final paragraph explicitly summarizes the critics' view: 'They argue that inherited epigenetic variations are unstable epimutations that revert to baseline within several generations, lacking the high fidelity and longevity required to drive sustained natural selection.'",
    distractor_analysis: {
      A: "Incorrect. This contradicts the critics; critics argue marks revert to baseline and are not permanent mutations.",
      B: "Correct. Accurately reflects the critics' argument regarding epimutation instability and lack of fidelity.",
      C: "Incorrect. Critics concede marks occur in rodents and plants, but challenge their evolutionary permanence.",
      D: "Incorrect. The passage makes no mention of cultural behaviors mutating nucleotide base pairs.",
      E: "Incorrect. Critics explicitly distinguish between plants (lacking sequestered germlines) and mammals."
    },
    misconception: "Conflating the perspective of EES proponents with the skeptical stance of EES critics.",
    time_estimate_seconds: 65
  },
  {
    exam_name: "GMAT Focus",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 3,
    passage_id: "gmat_rc_epigenetics_ees",
    passage: PASSAGE_GMAT_EPIGENETICS,
    question_text: "The author mentions 'escapee loci in mammalian genomes' in the third paragraph primarily in order to:",
    options: {
      A: "Demonstrate that mammalian germline reprogramming does not always achieve 100% erasure of parental epigenetic marks.",
      B: "Refute the existence of DNA methylation in reproductive gametogenesis.",
      C: "Prove that all rodent metabolic diseases are caused by mitochondrial genetic defects.",
      D: "Argue that the Weismann barrier operates with greater rigor in plants than in primates.",
      E: "Illustrate how chemical pollutants permanently mutate the nucleotide sequence of reproductive egg cells."
    },
    correct_option: "A",
    explanation: "In the third paragraph, the author notes that while classical embryologists believed germline reprogramming wiped all ancestral marks clean, empirical studies identified 'escapee loci' that retain parental methylation patterns across generations. Thus, escapee loci show that erasure is not absolute.",
    distractor_analysis: {
      A: "Correct. Directly captures why escapee loci are cited: to show parental marks can survive germline erasure.",
      B: "Incorrect. The passage affirms DNA methylation; escapee loci retain methylation.",
      C: "Incorrect. Mitochondrial defects are not mentioned.",
      D: "Incorrect. Plants do not possess sequestered germlines.",
      E: "Incorrect. Epigenetic marks modify chromatin without altering nucleotide sequences."
    },
    misconception: "Confusing retention of methylation marks across generations with nucleotide mutations.",
    time_estimate_seconds: 60
  },

  // --------------------------------------------------------------------------
  // Passage 4: Platform Antitrust & Two-Sided Markets (4 items)
  // --------------------------------------------------------------------------
  {
    exam_name: "GMAT Focus",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 3,
    passage_id: "gmat_rc_platform_antitrust",
    passage: PASSAGE_GMAT_ANTITRUST,
    question_text: "According to the passage, the Consumer Welfare Standard struggles to address alleged anticompetitive conduct by digital platforms primarily because:",
    options: {
      A: "Federal judges are legally barred from applying the Sherman Act to corporations founded after 1980.",
      B: "Digital platforms operate subsidized or zero-price consumer services, making it difficult to demonstrate consumer harm via short-run retail price increases.",
      C: "Third-party merchants on digital platforms are classified as statutory employees rather than commercial entities.",
      D: "Digital platforms do not generate profits or engage in interstate commerce.",
      E: "The Chicago School framework mandates that any multi-sided market is exempt from Clayton Act merger review."
    },
    correct_option: "B",
    explanation: "Paragraphs 2 and 3 explain that because platforms offer zero-price consumer services (funded by advertising/seller fees on the opposite side), traditional antitrust plaintiffs cannot establish consumer injury through higher prices, leaving zero-price platforms insulated under orthodox CWS metrics.",
    distractor_analysis: {
      A: "Incorrect. No temporal bar exists in federal antitrust statutes.",
      B: "Correct. Precisely identifies the friction between zero-price consumer services and the CWS focus on price gouging.",
      C: "Incorrect. Employment classification is completely irrelevant to the passage.",
      D: "Incorrect. Platforms are immense corporate conglomerates monetizing user data through advertising.",
      E: "Incorrect. Chicago School doctrine does not grant statutory antitrust exemptions to multi-sided platforms."
    },
    misconception: "Assuming antitrust immunity rather than structural mismatch between price-centric legal metrics and zero-price multi-sided business models.",
    time_estimate_seconds: 65
  },
  {
    exam_name: "GMAT Focus",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 2,
    passage_id: "gmat_rc_platform_antitrust",
    passage: PASSAGE_GMAT_ANTITRUST,
    question_text: "As described in the passage, a 'killer acquisition' refers to a commercial transaction in which a dominant platform:",
    options: {
      A: "Acquires a traditional manufacturing company to reduce logistical supply-chain shipping delays.",
      B: "Purchases a promising nascent competitor early in its development to eliminate a potential future competitive threat.",
      C: "Sells off its advertising subsidiary to an offshore private equity fund.",
      D: "Lowers its retail prices below marginal production cost to bankrupt incumbent brick-and-mortar retailers.",
      E: "Merges with an overseas state telecommunications monopoly to evade domestic tax liabilities."
    },
    correct_option: "B",
    explanation: "In paragraph 3, the author defines killer acquisitions as dominant platforms acquiring 'nascent competitors... long before they can develop into viable threats.'",
    distractor_analysis: {
      A: "Incorrect. Relates to vertical supply-chain integration, not preempting nascent software rivals.",
      B: "Correct. Matches the author's explicit definition of acquiring nascent rivals before they mature into competitive threats.",
      C: "Incorrect. Relates to divestiture, the exact opposite of an acquisition.",
      D: "Incorrect. Describes classical predatory pricing, not acquisitions.",
      E: "Incorrect. Involves corporate inversions/tax avoidance, completely outside the passage context."
    },
    misconception: "Confusing predatory pricing behavior with preemptive corporate acquisitions.",
    time_estimate_seconds: 55
  },
  {
    exam_name: "GMAT Focus",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 3,
    passage_id: "gmat_rc_platform_antitrust",
    passage: PASSAGE_GMAT_ANTITRUST,
    question_text: "Which of the following, if true, would provide the strongest support for the 'New Brandeis' critique of digital platform self-preferencing?",
    options: {
      A: "Third-party merchants who sell on digital platforms report higher advertising expenses on television than on internet search engines.",
      B: "Empirical analysis shows that when a platform demotes competing third-party software in search results to favor its own app, consumer switching costs prevent users from discovering functionally superior alternatives, suppressing independent venture funding for competing developers.",
      C: "Consumers universally report higher satisfaction scores when shopping for standardized commodity electronics on large platform websites.",
      D: "The cost of building high-capacity cloud server datacenters has fallen by 12% annually due to advances in microprocessor efficiency.",
      E: "Several European countries have instituted digital services value-added taxes on gross advertising revenues."
    },
    correct_option: "B",
    explanation: "The New Brandeisian critique argues that self-preferencing harms long-term innovation, market contestability, and neutral competition even if retail prices are low. Option B demonstrates that self-preferencing locks consumers into inferior apps, blocks discovery of better products, and chokes off venture capital for independent rivals, directly confirming the critique.",
    distractor_analysis: {
      A: "Incorrect. Television advertising spending is irrelevant to platform algorithmic ranking self-preferencing.",
      B: "Correct. Concretely demonstrates market entrenchment, product quality degradation, and suppression of innovation.",
      C: "Incorrect. This strengthens the Chicago School / CWS argument that consumers benefit from platform scale.",
      D: "Incorrect. Datacenter hardware costs do not address algorithmic competition or self-preferencing.",
      E: "Incorrect. Tax policy does not evaluate whether self-preferencing damages competitive market structures."
    },
    misconception: "Selecting consumer satisfaction data that actually reinforces the opposing Chicago School CWS defense.",
    time_estimate_seconds: 70
  },
  {
    exam_name: "GMAT Focus",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 3,
    passage_id: "gmat_rc_platform_antitrust",
    passage: PASSAGE_GMAT_ANTITRUST,
    question_text: "The author's stance toward the traditional Consumer Welfare Standard when applied to digital platforms can best be described as:",
    options: {
      A: "Uncritical deference to its historical judicial precedent.",
      B: "Analytical skepticism regarding its diagnostic sufficiency in multi-sided, zero-price economic environments.",
      C: "Total condemnation of its application to single-sided industrial manufacturing markets.",
      D: "Enthusiastic endorsement of its ability to measure digital data monetization.",
      E: "Apathetic neutrality stemming from a belief that antitrust regulation is inherently counterproductive."
    },
    correct_option: "B",
    explanation: "The author systematically explains why the CWS worked for traditional markets but is structurally inadequate and 'dangerously myopic' when applied to zero-price multi-sided platforms. The author's tone is analytically critical and questioning of its sufficiency in this new environment.",
    distractor_analysis: {
      A: "Incorrect. The author explicitly details the standard's shortcomings.",
      B: "Correct. Accurately reflects the measured, structural critique of CWS's diagnostic blindness in zero-price markets.",
      C: "Incorrect. The author acknowledges CWS was well-suited for traditional industrial single-market manufacturing.",
      D: "Incorrect. The author argues CWS fails to capture data monetization and network effects.",
      E: "Incorrect. The author is deeply engaged and does not view antitrust enforcement as counterproductive."
    },
    misconception: "Assuming that a critique of a standard in digital markets implies total rejection of the standard in all historical markets.",
    time_estimate_seconds: 60
  },

  // --------------------------------------------------------------------------
  // Passage 5: Younger Dryas & Pleistocene Megafauna (4 items)
  // --------------------------------------------------------------------------
  {
    exam_name: "GMAT Focus",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 2,
    passage_id: "gmat_rc_younger_dryas_megafauna",
    passage: PASSAGE_GMAT_MEGAFAUNA,
    question_text: "According to the passage, which of the following is a key empirical finding that challenges Paul Martin's Overkill Hypothesis?",
    options: {
      A: "Clovis fluted projectile points were manufactured from volcanic obsidian rather than sedimentary chert.",
      B: "Direct archaeological kill-site associations exist for only two of the thirty-five extinct megafaunal genera.",
      C: "Radiocarbon dating shows that North American humans arrived only after the Younger Dryas had completely concluded.",
      D: "Steppe bison and ancient horses experienced massive population increases immediately following Clovis contact.",
      E: "Saber-toothed cats migrated south to South America prior to the arrival of hominins."
    },
    correct_option: "B",
    explanation: "The second paragraph explicitly notes: 'Clovis hunting implements have been conclusively associated with only two genera—mammoths and mastodons—leaving the rapid disappearance of the remaining thirty-three genera entirely uncorroborated by direct taphonomic or hunting evidence.'",
    distractor_analysis: {
      A: "Incorrect. Lithic raw material types are irrelevant to the kill-site frequency.",
      B: "Correct. Directly cites the empirical lack of kill sites for 33 of the 35 extinct genera.",
      C: "Incorrect. The passage notes Clovis hunters were present at the terminal Pleistocene during the Younger Dryas.",
      D: "Incorrect. Ancient DNA showed steep demographic declines before Clovis contact, not population increases.",
      E: "Incorrect. The passage states saber-toothed cats went extinct in North America as apex carnivores."
    },
    misconception: "Confusing demographic decline timing with population surges.",
    time_estimate_seconds: 55
  },
  {
    exam_name: "GMAT Focus",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 3,
    passage_id: "gmat_rc_younger_dryas_megafauna",
    passage: PASSAGE_GMAT_MEGAFAUNA,
    question_text: "Based on the passage, the disruption of the Atlantic Meridional Overturning Circulation (AMOC) resulted directly from:",
    options: {
      A: "The catastrophic drainage of freshwater from glacial Lake Agassiz into the North Atlantic.",
      B: "A prolonged global drought that evaporated northern hemisphere river basins.",
      C: "Intensive agricultural deforestation practiced by terminal Pleistocene foragers.",
      D: "A catastrophic volcanic winter triggered by the eruption of Mount Mazama.",
      E: "Massive thermal heat release caused by a comet impact in the Pacific Ocean."
    },
    correct_option: "A",
    explanation: "The third paragraph states: 'the catastrophic climatic instability of the Younger Dryas: a sudden, century-scale reversal to near-glacial temperatures triggered by the catastrophic drainage of glacial Lake Agassiz into the North Atlantic, which disrupted the Atlantic Meridional Overturning Circulation (AMOC).'",
    distractor_analysis: {
      A: "Correct. Explicitly identified as the trigger for the AMOC disruption.",
      B: "Incorrect. The freshwater pulse came from a massive glacial lake meltwater discharge, not drought.",
      C: "Incorrect. Terminal Pleistocene foragers did not practice agricultural deforestation.",
      D: "Incorrect. Volcanic eruption is unmentioned in this climatic mechanism.",
      E: "Incorrect. Extraterrestrial comet impact hypotheses are not mentioned in the text."
    },
    misconception: "Conflating regional floral aridification with the oceanic freshwater trigger that initiated the cold event.",
    time_estimate_seconds: 55
  },
  {
    exam_name: "GMAT Focus",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 3,
    passage_id: "gmat_rc_younger_dryas_megafauna",
    passage: PASSAGE_GMAT_MEGAFAUNA,
    question_text: "The author's primary purpose in the final paragraph is to:",
    options: {
      A: "Reconcile the Overkill and climate hypotheses by proposing that climate change was caused by Clovis hunting.",
      B: "Present the Younger Dryas climate oscillation and floral uncoupling as the primary causal explanation for megafaunal collapse, while qualifying human hunting as an auxiliary pressure.",
      C: "Argue that Pleistocene megafauna did not actually go extinct but evolved into modern domestic livestock.",
      D: "Demonstrate that ancient human hunting had zero measurable ecological impact on any North American species.",
      E: "Dismiss all radiocarbon dating techniques as unreliable for terminal Pleistocene archaeological deposits."
    },
    correct_option: "B",
    explanation: "The author synthesizes the climate mechanism (Younger Dryas floral biome fragmentation causing herbivore starvation and apex predator collapse) while concluding that while human hunting exerted localized terminal pressures, the primary macroscopic driver was ecological uncoupling driven by rapid climate oscillation.",
    distractor_analysis: {
      A: "Incorrect. Human hunting did not cause climate change.",
      B: "Correct. Accurately synthesizes the climate-driven floral collapse as primary and human hunting as localized/auxiliary.",
      C: "Incorrect. The species suffered genuine extinction; they did not become domestic cattle.",
      D: "Incorrect. The author explicitly states human hunting 'undoubtedly exerted localized terminal pressures on dwindling relic populations.'",
      E: "Incorrect. Radiocarbon dating is utilized to critique Overkill, not dismissed."
    },
    misconception: "Assuming the author completely dismisses human hunting rather than relegating it to a secondary, localized role.",
    time_estimate_seconds: 65
  },
  {
    exam_name: "GMAT Focus",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 3,
    passage_id: "gmat_rc_younger_dryas_megafauna",
    passage: PASSAGE_GMAT_MEGAFAUNA,
    question_text: "It can be inferred from the passage that large herbivores were particularly vulnerable to rapid floral habitat fragmentation because they:",
    options: {
      A: "Required vast, contiguous areas of productive vegetation and could not quickly migrate across ecologically uncoupled barriers.",
      B: "Possessed short gestational cycles that produced unsustainable population explosions.",
      C: "Depended exclusively on agricultural cultivated cereals planted by Clovis hunters.",
      D: "Lacked predatory instincts and were physically incapable of digesting boreal pine needles.",
      E: "Spent the winter hibernating in subterranean caves that flooded during lake drainage."
    },
    correct_option: "A",
    explanation: "The passage notes that the climate shock transformed homogeneous productive steppe-tundra into fragmented, nutrient-poor boreal forests and arid scrublands, and that herbivores were 'incapable of migrating rapidly across disrupted ecological corridors,' leading to starvation.",
    distractor_analysis: {
      A: "Correct. Highlights the herbivores' need for large contiguous grazing ranges and inability to cross fragmented corridors.",
      B: "Incorrect. Paragraph 1 notes megafauna had prolonged gestational periods, not short cycles.",
      C: "Incorrect. Clovis humans were foragers, not cereal crop farmers.",
      D: "Incorrect. Overly narrow and speculative regarding digestive mechanics of pine needles.",
      E: "Incorrect. Megafaunal herbivores (like mammoths and giant sloths) did not hibernate in subterranean caves."
    },
    misconception: "Focusing on physiological digestion details rather than the macroscopic spatial fragmentation of habitat corridors.",
    time_estimate_seconds: 65
  },

  // --------------------------------------------------------------------------
  // Passage 6: Autonomous Algorithmic Collusion (4 items)
  // --------------------------------------------------------------------------
  {
    exam_name: "GMAT Focus",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 3,
    passage_id: "gmat_rc_algorithmic_collusion",
    passage: PASSAGE_GMAT_PRICING,
    question_text: "The central dilemma addressed in the passage is that autonomous dynamic pricing algorithms:",
    options: {
      A: "Frequently suffer software glitches that crash financial exchanges.",
      B: "Can achieve tacit supra-competitive price collusion without the explicit agreements or communications required to establish antitrust liability under current law.",
      C: "Are too computationally expensive for commercial retailers to deploy outside of specialized laboratory simulations.",
      D: "Inevitably drive consumer prices to zero, bankrupting all competing market participants.",
      E: "Require continuous human intervention to prevent algorithmic programmers from stealing trade secrets."
    },
    correct_option: "B",
    explanation: "The passage contrasts the traditional requirement of explicit communication under antitrust law (Section 1 of the Sherman Act) with deep reinforcement learning algorithms that independently discover collusive pricing strategies and instant retaliatory punishments without any human agreement or communication.",
    distractor_analysis: {
      A: "Incorrect. Software crashes are not the subject of the passage.",
      B: "Correct. Identifies the core paradox: effective economic collusion occurring without legal proof of conspiracy or agreement.",
      C: "Incorrect. The passage notes these algorithms are widely deployed across public cloud architectures.",
      D: "Incorrect. The algorithms maintain supra-competitive (high) prices, not zero prices.",
      E: "Incorrect. The problem is autonomous operation without human direction, not employee theft."
    },
    misconception: "Confusing algorithmic market failure (crashes) with algorithmic economic coordination (collusion).",
    time_estimate_seconds: 65
  },
  {
    exam_name: "GMAT Focus",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 2,
    passage_id: "gmat_rc_algorithmic_collusion",
    passage: PASSAGE_GMAT_PRICING,
    question_text: "According to the passage, why are traditional price-fixing cartels considered unstable under classical economic theory?",
    options: {
      A: "Corporate executives lack the mathematical training required to calculate profit margins.",
      B: "Each participating firm faces an incentive to cheat by secretly undercutting cartel prices to gain market share before rivals retaliate.",
      C: "Antitrust enforcement authorities intercept 100% of inter-firm email communications in real time.",
      D: "Consumers immediately cease purchasing commodities whenever prices rise above marginal cost.",
      E: "Oligopoly markets are legally required to dissolve after three operating quarters."
    },
    correct_option: "B",
    explanation: "The first paragraph explains: 'each participating firm faces a perpetual prisoner's dilemma: while joint profit maximization dictates holding prices at supra-competitive monopoly levels, each individual firm possesses a dominant short-run economic incentive to secretly undercut its rivals, stealing market share before competitors can detect the deviation and retaliate.'",
    distractor_analysis: {
      A: "Incorrect. The theory assumes rational profit-maximizing firms, not innumerate executives.",
      B: "Correct. Accurately states the prisoner's dilemma incentive to cheat by undercutting.",
      C: "Incorrect. Exaggerated claim not stated in the passage.",
      D: "Incorrect. The passage assumes demand has some price elasticity, not an instantaneous total boycott.",
      E: "Incorrect. Fabricates an absurd legal requirement."
    },
    misconception: "Believing that laws prevent cartels rather than internal game-theoretic incentives to cheat.",
    time_estimate_seconds: 60
  },
  {
    exam_name: "GMAT Focus",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 3,
    passage_id: "gmat_rc_algorithmic_collusion",
    passage: PASSAGE_GMAT_PRICING,
    question_text: "It can be inferred from the passage that deep Q-learning pricing algorithms are able to enforce collusion primarily because they:",
    options: {
      A: "Bribe human competitors into signing binding price-fixing covenants.",
      B: "Can monitor rival prices in real time and execute retaliatory price drops within milliseconds, effectively neutralizing the payoff of undercutting.",
      C: "Rewrite their own code to delete all competitive objective functions.",
      D: "Predict consumer demand with zero variance by violating consumer privacy statutes.",
      E: "Operate on decentralized blockchain nodes that are legally exempt from government regulation."
    },
    correct_option: "B",
    explanation: "Paragraph 3 explains: 'More critically, they learn to operationalize instant retaliatory price drops within milliseconds of a competitor's undercutting action, effectively enforcing punishment strategies that deter defection.' By instantly punishing defection, the short-run benefit of undercutting is destroyed.",
    distractor_analysis: {
      A: "Incorrect. Algorithms do not execute human bribery.",
      B: "Correct. Highlights the microsecond reaction speed that eliminates the lag necessary to profit from price cuts.",
      C: "Incorrect. The algorithms maximize revenue via reinforcement learning, not by deleting competitive goals.",
      D: "Incorrect. Privacy violations are not cited as the enforcement mechanism.",
      E: "Incorrect. Blockchain technology is not mentioned in the passage."
    },
    misconception: "Assuming collusion enforcement requires human-like coercion rather than automated game-theoretic punishment speed.",
    time_estimate_seconds: 65
  },
  {
    exam_name: "GMAT Focus",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 3,
    passage_id: "gmat_rc_algorithmic_collusion",
    passage: PASSAGE_GMAT_PRICING,
    question_text: "Which of the following legal reforms would most directly address the 'regulatory vacuum' described in the final paragraph?",
    options: {
      A: "Banning the use of computer servers in retail supply chains.",
      B: "Amending antitrust statutes so that liability can be established based on sustained supra-competitive market outcomes resulting from algorithmic coordination, rather than strictly requiring evidence of human conspiratorial agreements.",
      C: "Requiring all software engineers to register with the Federal Trade Commission before coding machine learning models.",
      D: "Mandating that corporate profits be capped at 5% of gross revenue across all industries.",
      E: "Exempting all artificial intelligence systems from judicial oversight to accelerate technological progress."
    },
    correct_option: "B",
    explanation: "The regulatory vacuum exists because current law (Section 1 of the Sherman Act) requires proof of an explicit agreement, contract, or conspiracy ('meeting of the minds'). A reform shifting the standard to outcomes or algorithmic design that facilitates tacit coordination directly closes this loophole.",
    distractor_analysis: {
      A: "Incorrect. Luddite ban on servers is unfeasible and economically destructive.",
      B: "Correct. Directly targets the evidentiary statutory requirement of an explicit human agreement.",
      C: "Incorrect. Professional licensing of engineers does not solve the substantive antitrust doctrine issue.",
      D: "Incorrect. Sweeping profit caps represent command-and-control price regulation, not antitrust reform.",
      E: "Incorrect. Total exemption would worsen the regulatory vacuum rather than addressing it."
    },
    misconception: "Focusing on blunt regulatory bans or engineer licensing rather than updating the statutory definition of concerted action/agreement.",
    time_estimate_seconds: 70
  },

  // --------------------------------------------------------------------------
  // Passage 7: Dual-System Neuroeconomics & Present Bias (4 items)
  // --------------------------------------------------------------------------
  {
    exam_name: "GMAT Focus",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 2,
    passage_id: "gmat_rc_neuroeconomics_discounting",
    passage: PASSAGE_GMAT_NEURO,
    question_text: "According to the passage, Samuelson's exponential discounted utility model assumes that a rational decision-maker will:",
    options: {
      A: "Always select immediate consumption regardless of the magnitude of future returns.",
      B: "Discount prospective future utilities at an invariant, constant rate regardless of whether the choice occurs today or in the distant future.",
      C: "Rely exclusively on dopamine release in the ventral striatum to calculate interest rates.",
      D: "Prefer $100 in 365 days over $110 in 366 days while preferring $110 tomorrow over $100 today.",
      E: "Experience severe emotional anxiety whenever evaluating long-term retirement savings."
    },
    correct_option: "B",
    explanation: "The first paragraph states: 'rational decision-makers evaluate prospective intertemporal payoffs by discounting future utility at a constant, invariant rate across all time horizons... ensuring that an agent's economic choices remain dynamically consistent across time.'",
    distractor_analysis: {
      A: "Incorrect. Samuelson's model does not mandate immediate consumption; it models valuation over time with consistent interest/discount rates.",
      B: "Correct. Directly mirrors the passage's explanation of constant, invariant discount rates ensuring dynamic consistency.",
      C: "Incorrect. Dopamine striatal activation is the neurological mechanism discovered later by neuroeconomists.",
      D: "Incorrect. Reversing preferences over equivalent delays violates exponential discounting (it is an example of hyperbolic discounting).",
      E: "Incorrect. Emotional anxiety is not a component of the neoclassical rational model."
    },
    misconception: "Confusing the neoclassical normative model with the behavioral anomalies that disprove it.",
    time_estimate_seconds: 60
  },
  {
    exam_name: "GMAT Focus",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 3,
    passage_id: "gmat_rc_neuroeconomics_discounting",
    passage: PASSAGE_GMAT_NEURO,
    question_text: "The neuroimaging findings described in the third paragraph suggest that 'present bias' arises biologically because:",
    options: {
      A: "The lateral prefrontal cortex completely shuts down during any monetary transaction.",
      B: "Immediate rewards selectively trigger ancient dopaminergic limbic structures associated with visceral appetites, whereas delayed rewards engage newer executive cortical regions.",
      C: "Human neurons lose their myelin sheaths when evaluating compound interest equations.",
      D: "The ventral striatum is responsible for all abstract mathematical logic and long-term planning.",
      E: "The posterior parietal cortex only operates during rapid eye movement (REM) sleep."
    },
    correct_option: "B",
    explanation: "Paragraph 3 explains: 'Decisions involving immediate rewards trigger robust activation within the limbic and paralimbic structures—specifically the ventral striatum and the medial prefrontal cortex—evolutionarily ancient brain regions rich in dopaminergic innervation that govern visceral, impulsive appetitive drives. Conversely, intertemporal choices involving delays... uniformly engage the lateral prefrontal cortex... associated with executive function...'",
    distractor_analysis: {
      A: "Incorrect. The prefrontal cortex does not shut down; it is engaged when evaluating delays.",
      B: "Correct. Accurately synthesizes the dual-system competition between ancient dopaminergic limbic circuits and newer prefrontal executive circuits.",
      C: "Incorrect. Neurological myelin breakdown is unmentioned.",
      D: "Incorrect. Inverts brain anatomy: the lateral prefrontal cortex handles executive planning, not the striatum.",
      E: "Incorrect. Complete fabrication unsupported by the passage."
    },
    misconception: "Inverting the roles of the ancient limbic system (visceral/immediate) and the lateral prefrontal cortex (executive/delayed).",
    time_estimate_seconds: 65
  },
  {
    exam_name: "GMAT Focus",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 3,
    passage_id: "gmat_rc_neuroeconomics_discounting",
    passage: PASSAGE_GMAT_NEURO,
    question_text: "Which of the following behavioral patterns best illustrates the concept of 'dynamic inconsistency' as described in the passage?",
    options: {
      A: "An investor who consistently deposits 10% of their monthly income into a high-yield retirement bond portfolio without fail for thirty years.",
      B: "A student who firmly resolves on Monday to study all day Saturday instead of attending a party, but then chooses the party when Saturday arrives, prioritizing immediate pleasure.",
      C: "A consumer who refuses to purchase organic vegetables because commercial produce is priced lower.",
      D: "A homeowner who chooses a fixed-rate mortgage over an adjustable-rate mortgage after calculating expected interest rate variances.",
      E: "A chess player who sacrifices a pawn in the opening to achieve a positional advantage in the endgame."
    },
    correct_option: "B",
    explanation: "Dynamic inconsistency occurs when an agent's preferences change as the time of the event draws closer: viewed from a distance on Monday, the student is patient and plans to study, but when the moment of choice becomes immediate on Saturday, present bias takes over and the student chooses immediate gratification.",
    distractor_analysis: {
      A: "Incorrect. This demonstrates perfect dynamic consistency and patience.",
      B: "Correct. Classic textbook illustration of present bias and dynamic inconsistency over time.",
      C: "Incorrect. Price comparison between goods at a single point in time is not an intertemporal trade-off.",
      D: "Incorrect. Rational financial risk management is consistent planning.",
      E: "Incorrect. Strategic delayed gratification in chess shows patience, not impulsivity."
    },
    misconception: "Confusing routine cost-benefit analysis with temporal preference reversals as the payoff date approaches.",
    time_estimate_seconds: 65
  },
  {
    exam_name: "GMAT Focus",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 2,
    passage_id: "gmat_rc_neuroeconomics_discounting",
    passage: PASSAGE_GMAT_NEURO,
    question_text: "The author's conclusion in the final sentence emphasizes that present bias should be understood as:",
    options: {
      A: "An incurable psychiatric pathology that prevents individuals from functioning in modern capital markets.",
      B: "An evolutionary product of competing neural systems rather than a mere computational error in arithmetic logic.",
      C: "A mathematical artifact resulting from flawed experimental survey design.",
      D: "A cultural anomaly unique to contemporary consumerist societies.",
      E: "An evolutionary failure that will be eliminated by natural selection within a generation."
    },
    correct_option: "B",
    explanation: "The final sentence states: 'Present bias, therefore, does not represent a computational calculation error, but rather the evolutionary tug-of-war between ancient dopaminergic neural circuits primed for immediate survival and advanced cortical circuitry mediating abstract future planning.'",
    distractor_analysis: {
      A: "Incorrect. The text frames it as a universal evolutionary architecture, not a psychiatric pathology.",
      B: "Correct. Accurately reflects the author's emphasis on evolutionary neural competition over simple calculative error.",
      C: "Incorrect. The phenomenon has been documented across decades of behavioral and neuroimaging tests, not flawed surveys.",
      D: "Incorrect. It is rooted in invariant evolutionary neuroanatomy, not modern cultural trends.",
      E: "Incorrect. The author does not predict natural selection will eliminate it."
    },
    misconception: "Labeling adaptive evolutionary instincts as cognitive psychiatric defects.",
    time_estimate_seconds: 55
  },

  // --------------------------------------------------------------------------
  // Passage 8: Agglomeration Economies & Tacit Knowledge (4 items)
  // --------------------------------------------------------------------------
  {
    exam_name: "GMAT Focus",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 3,
    passage_id: "gmat_rc_agglomeration_tacit_knowledge",
    passage: PASSAGE_GMAT_AGGLOMERATION,
    question_text: "The primary purpose of the passage on agglomeration economies is to:",
    options: {
      A: "Argue that telecommunications advances will soon cause the complete abandonment of major metropolitan cities.",
      B: "Resolve the apparent contradiction between digital telecommunications and spatial clustering by explaining the role of tacit knowledge spillovers in agglomeration economies.",
      C: "Demonstrate that patent law is ineffective at protecting commercial software inventions in Silicon Valley.",
      D: "Criticize municipal governments for failing to subsidize suburban commercial office parks.",
      E: "Prove that Alfred Marshall's 1890 economic theories were fundamentally flawed when applied to biotechnology."
    },
    correct_option: "B",
    explanation: "The passage opens with the puzzle: why do high-tech firms cluster in expensive cities despite zero-cost global telecommunications? It answers this through modern agglomeration theory, showing that tacit knowledge requires face-to-face contact and cannot be transmitted frictionlessly over digital wires.",
    distractor_analysis: {
      A: "Incorrect. The passage shows that clustering is intensifying, not that cities will be abandoned.",
      B: "Correct. Directly captures the central paradox and its theoretical resolution via tacit knowledge spillovers.",
      C: "Incorrect. The passage notes patents codify knowledge, not that patent law is ineffective.",
      D: "Incorrect. Municipal office park subsidies are completely unmentioned.",
      E: "Incorrect. Modern theorists refined and validated Marshall's insights rather than disproving them."
    },
    misconception: "Confusing the neoclassical prediction of geographic dispersion with the actual empirical reality of spatial clustering.",
    time_estimate_seconds: 65
  },
  {
    exam_name: "GMAT Focus",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 2,
    passage_id: "gmat_rc_agglomeration_tacit_knowledge",
    passage: PASSAGE_GMAT_AGGLOMERATION,
    question_text: "According to the passage, how does 'tacit knowledge' differ fundamentally from 'codified knowledge'?",
    options: {
      A: "Tacit knowledge is legally prohibited from being licensed to foreign corporations.",
      B: "Tacit knowledge consists of unwritten craft insights and experimental heuristics transmitted primarily through direct face-to-face interaction, whereas codified knowledge can be formalized and transmitted digitally at zero marginal cost.",
      C: "Codified knowledge is only generated by academic universities, whereas tacit knowledge is exclusive to venture capital funds.",
      D: "Tacit knowledge expires after twenty years under international intellectual property treaties.",
      E: "Codified knowledge requires physical proximity to be understood by software engineers."
    },
    correct_option: "B",
    explanation: "The third paragraph explicitly distinguishes the two: 'Unlike codified knowledge (which can be formalized into patents, academic publications, or digital code and transmitted globally at zero marginal cost), tacit knowledge consists of uncodified procedural insights, experimental instincts, and cutting-edge craft techniques that are transmitted almost exclusively through face-to-face interaction...'",
    distractor_analysis: {
      A: "Incorrect. Tacit knowledge is informal procedural skill, not legally restricted contraband.",
      B: "Correct. Precisely mirrors the text regarding uncodified heuristics vs. formal digital transmission.",
      C: "Incorrect. Both sectors generate and use both types of knowledge.",
      D: "Incorrect. Patents expire after 20 years, not tacit knowledge.",
      E: "Incorrect. The text states codified knowledge can be transmitted globally without physical proximity."
    },
    misconception: "Conflating formal patent expiration timelines with the intrinsic transmission mechanics of tacit heuristics.",
    time_estimate_seconds: 60
  },
  {
    exam_name: "GMAT Focus",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 3,
    passage_id: "gmat_rc_agglomeration_tacit_knowledge",
    passage: PASSAGE_GMAT_AGGLOMERATION,
    question_text: "The author mentions 'patent citation patterns' in the fourth paragraph primarily in order to:",
    options: {
      A: "Provide empirical evidence demonstrating that geographic proximity significantly accelerates the diffusion of technological knowledge between inventors.",
      B: "Prove that corporate patent attorneys prefer working in suburban office parks rather than downtown metropolitan cores.",
      C: "Argue that the patent system encourages intellectual theft between rival technology firms.",
      D: "Show that distant inventors are more likely to generate high-value technological breakthroughs than local inventors.",
      E: "Suggest that universities should stop filing patent applications to facilitate open-source collaboration."
    },
    correct_option: "A",
    explanation: "Paragraph 4 cites patent studies showing that inventors are up to ten times more likely to cite a local patent in its first two years than an identical patent from a distant city. This empirical metric substantiates the claim that localized knowledge spillovers are real and geographically bounded.",
    distractor_analysis: {
      A: "Correct. Accurately identifies the evidentiary role of patent citation data in demonstrating localized knowledge diffusion.",
      B: "Incorrect. Attorney office preferences are not mentioned.",
      C: "Incorrect. Citations represent legitimate technological attribution, not theft.",
      D: "Incorrect. The passage shows local patents are cited at 10x higher rates early on, contradicting this choice.",
      E: "Incorrect. No policy recommendation against university patenting is made."
    },
    misconception: "Interpreting an empirical indicator of technological diffusion as a critique of intellectual property law.",
    time_estimate_seconds: 65
  },
  {
    exam_name: "GMAT Focus",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 3,
    passage_id: "gmat_rc_agglomeration_tacit_knowledge",
    passage: PASSAGE_GMAT_AGGLOMERATION,
    question_text: "It can be inferred from the passage that if a high-tech startup attempts to operate in complete geographic isolation to minimize office rent, it is most likely to suffer from:",
    options: {
      A: "Immediate legal sanctions from municipal zoning boards.",
      B: "Reduced exposure to informal knowledge spillovers and narrower access to specialized labor pools compared to clustered competitors.",
      C: "An inability to send encrypted emails over international fiber-optic cables.",
      D: "Excessive corporate taxation imposed by regional economic development agencies.",
      E: "Severe supply chain disruptions in basic commodity agricultural inputs."
    },
    correct_option: "B",
    explanation: "Clustering confers Marshallian advantages: labor pooling, input sharing, and tacit knowledge spillovers. An isolated firm saves on rent but forfeits these external scale advantages, placing it at a severe competitive disadvantage relative to clustered peers.",
    distractor_analysis: {
      A: "Incorrect. Operating in isolation does not violate municipal zoning codes.",
      B: "Correct. Accurately deduces the opportunity cost of isolation: missing out on labor pooling and tacit knowledge spillovers.",
      C: "Incorrect. Codified digital communication is accessible anywhere globally at zero marginal cost.",
      D: "Incorrect. Peripheral regions typically offer lower, not higher, taxes.",
      E: "Incorrect. High-tech firms require specialized knowledge, not agricultural commodities."
    },
    misconception: "Assuming the penalties of isolation are regulatory/legal rather than economic and competitive.",
    time_estimate_seconds: 60
  },

  // --------------------------------------------------------------------------
  // Passage 9: Archaeoastronomy & Megalithic Landscape (4 items)
  // --------------------------------------------------------------------------
  {
    exam_name: "GMAT Focus",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 2,
    passage_id: "gmat_rc_megalithic_archaeoastronomy",
    passage: PASSAGE_GMAT_ARCHAEO,
    question_text: "According to the passage, modern archaeologists criticize Alexander Thom's 'megalithic yard' and astronomical calculator hypothesis on which of the following grounds?",
    options: {
      A: "Neolithic Europeans lacked hands or limbs capable of moving stone monuments.",
      B: "Thom's alignments relied on statistical cherry-picking and confirmation bias among numerous stone positions, while projecting anachronistic modern astrophysics onto prehistoric societies.",
      C: "Radiocarbon dating proved that Stonehenge was constructed during the late Roman Empire rather than the Neolithic era.",
      D: "Ancient British stone circles were built exclusively by Egyptian architects following pharaonic blueprints.",
      E: "Prehistoric pastoralists had zero cultural awareness of the summer solstice or seasonal transitions."
    },
    correct_option: "B",
    explanation: "Paragraphs 2 and 3 outline the two main critiques: first, statistical cherry-picking among randomly placed stones (confirmation bias); second, the anachronistic projection of modern empirical astrophysics onto ritual pastoralist cultures.",
    distractor_analysis: {
      A: "Incorrect. Prehistoric humans obviously moved stones.",
      B: "Correct. Accurately synthesizes the statistical and cultural-anachronism critiques detailed in the passage.",
      C: "Incorrect. Stonehenge is universally accepted as Neolithic/Bronze Age, not Roman.",
      D: "Incorrect. Diffusionist theories linking Stonehenge to Egypt are discredited and unmentioned.",
      E: "Incorrect. The author explicitly confirms major solstitial alignments were genuine cultural features."
    },
    misconception: "Assuming that rejecting Thom's complex eclipse calculator hypothesis means denying that Neolithic people noticed the sun and seasons.",
    time_estimate_seconds: 60
  },
  {
    exam_name: "GMAT Focus",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 3,
    passage_id: "gmat_rc_megalithic_archaeoastronomy",
    passage: PASSAGE_GMAT_ARCHAEO,
    question_text: "The author mentions the midwinter sunset and midsummer sunrise alignments at Stonehenge primarily to:",
    options: {
      A: "Concede that authentic astronomical orientations exist, while recontextualizing them as ritual and cosmological landscape features rather than computational calculators.",
      B: "Prove that Gerald Hawkins and Alexander Thom were entirely correct in their astronomical claims.",
      C: "Argue that Neolithic builders worshiped solar eclipses rather than ancestral deities.",
      D: "Demonstrate that the megalithic yard was an internationally recognized metric standard.",
      E: "Suggest that Stonehenge was used as an oceanic navigational beacon for Bronze Age mariners."
    },
    correct_option: "A",
    explanation: "Paragraph 3 notes: 'While major solstitial alignments—such as the alignment of Stonehenge's Avenue with the midwinter sunset and midsummer sunrise—are undeniable cultural features, their primary societal purpose was cosmological and ritualistic rather than observational.' The author acknowledges the real solar orientation while reframing its cultural meaning.",
    distractor_analysis: {
      A: "Correct. Shows the author's nuanced position: acknowledging solar alignments while reframing them as ritual rather than computational.",
      B: "Incorrect. The passage refutes Thom's mathematical calculator claims.",
      C: "Incorrect. Solstice alignment does not imply solar eclipse worship.",
      D: "Incorrect. Thom's megalithic yard hypothesis is rejected in the text.",
      E: "Incorrect. Stonehenge is an inland monument, not a maritime lighthouse."
    },
    misconception: "Treating an argument as all-or-nothing: failing to see that the author accepts solar ritual alignments while rejecting complex computational astronomy.",
    time_estimate_seconds: 65
  },
  {
    exam_name: "GMAT Focus",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 3,
    passage_id: "gmat_rc_megalithic_archaeoastronomy",
    passage: PASSAGE_GMAT_ARCHAEO,
    question_text: "Based on the passage, contextual landscape archaeology conceptualizes European megalithic monuments primarily as:",
    options: {
      A: "Military fortifications designed to repel invading continental pastoralist armies.",
      B: "Sacred communal theaters and ritual spaces where dispersed pastoralist clans gathered to reinforce social bonds, feast, and bury ancestral dead.",
      C: "Grain distribution centers where standardized bushels of barley were weighed and taxed.",
      D: "Astrophysical observatories operated by a specialized caste of mathematical priests who predicted solar flares.",
      E: "Temporary shelter dwellings used exclusively during the peak winter blizzards."
    },
    correct_option: "B",
    explanation: "The final sentence explicitly states: 'these ceremonial landscapes functioned as communal gathering theaters where dispersed pastoralist clans coalesced during seasonal solstices to reaffirm tribal social cohesion, feast on sacrificial livestock, and bury elite ancestral remains.'",
    distractor_analysis: {
      A: "Incorrect. Stone circles were not defensive forts with palisades.",
      B: "Correct. Precisely mirrors the text regarding communal gathering theaters, social cohesion, and ancestral burial.",
      C: "Incorrect. Grain taxation is an anachronistic feature of bureaucratic states, not Neolithic stone circles.",
      D: "Incorrect. This is the debunked Thom/Hawkins view that the author rejects.",
      E: "Incorrect. Monuments were monumental stone ceremonial structures, not domestic winter houses."
    },
    misconception: "Viewing ancient monuments through utilitarian modern lenses (scientific observatories or grain silos) rather than ritual-social landscapes.",
    time_estimate_seconds: 60
  },
  {
    exam_name: "GMAT Focus",
    subject: "Verbal Reasoning",
    skill_domain: "Reading Comprehension",
    difficulty_tier: 2,
    passage_id: "gmat_rc_megalithic_archaeoastronomy",
    passage: PASSAGE_GMAT_ARCHAEO,
    question_text: "The author's tone toward Gerald Hawkins's and Alexander Thom's 'astro-archaeological' theories can best be described as:",
    options: {
      A: "Reverent admiration of their pioneering mathematical precision.",
      B: "Critical skepticism highlighting their methodological confirmation bias and cultural anachronisms.",
      C: "Indifferent disregard stemming from a complete lack of interest in Neolithic archaeology.",
      D: "Uncompromising hostility toward the field of astronomy in general.",
      E: "Cautious optimism that future space telescopes will validate their measurements."
    },
    correct_option: "B",
    explanation: "The author methodically explains how Hawkins and Thom suffered from confirmation bias, statistical cherry-picking, and anachronistic projection of modern astrophysics onto pastoralist cultures. The tone is scholarly, critical, and skeptical.",
    distractor_analysis: {
      A: "Incorrect. The author explicitly disproves their claims of mathematical precision.",
      B: "Correct. Accurately describes the author's scholarly critique of confirmation bias and anachronistic thinking.",
      C: "Incorrect. The author is deeply engaged in archaeological scholarship.",
      D: "Incorrect. The critique targets misapplying astrophysics to Neolithic monuments, not astronomy as a science.",
      E: "Incorrect. Space telescopes study deep space, not prehistoric Earth monuments, and the author does not support the hypothesis."
    },
    misconception: "Confusing a critique of a specific archaeological theory with hostility toward the physical science of astronomy.",
    time_estimate_seconds: 55
  }
];
