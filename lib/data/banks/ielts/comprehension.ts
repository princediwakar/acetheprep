// Path: lib/data/banks/ielts/comprehension.ts
import type { SeedQuestion } from "../../question-bank-seed";

// ============================================================================
// IELTS ACADEMIC READING COMPREHENSION PASSAGES & QUESTIONS (35 items)
// Authentic academic texts (550-750 words) with multi-item task sets:
// True-False-Not Given (TFNG), Headings & Main Idea, Summary Completion,
// Sentence Completion, and Inference/Detail.
// ============================================================================

// ----------------------------------------------------------------------------
// Passage 1: Supercritical Geothermal Energy Systems (620 words)
// ----------------------------------------------------------------------------
const PASSAGE_IELTS_GEOTHERMAL = `Geothermal energy has long been championed as an inexhaustible, baseload alternative to intermittent renewable resources such as solar and wind. Traditional geothermal systems rely on naturally occurring hydrothermal reservoirs, where subterranean water heated by magma chambers is trapped in permeable rock at depths of one to three kilometers. When tapped by production wells, this pressurized fluid flashes into steam to spin electricity-generating turbines. However, conventional hydrothermal energy is geographically constrained to volcanic rift zones and tectonic plate boundaries, currently supplying less than one percent of global electricity demand.

To transcend these geographic limitations, an international consortium of geophysicists is pioneering Enhanced Geothermal Systems (EGS) that target "supercritical" fluids at depths exceeding four kilometers. Under extreme subterranean pressures exceeding 22 megapascals and temperatures above 374°C, water transcends its distinct liquid and vapor phases to enter a supercritical state. In this physical regime, supercritical fluid exhibits the transport properties of a gas alongside the dissolving power and density of a liquid. Most significantly, a single supercritical geothermal well possesses an energy density up to tenfold higher than conventional hydrothermal wells, meaning that a handful of supercritical boreholes could generate power equivalent to a utility-scale nuclear or coal-fired power station.

Despite this extraordinary thermodynamic promise, harnessing supercritical geothermal energy involves immense engineering hurdles. At depths of five kilometers, drilling rigs encounter crystalline granitic rock so intensely hot that standard tungsten carbide drill bits degrade within hours. Furthermore, drilling lubricants and electronic telemetry sensors utilized to guide directional drill strings fail under searing thermal loading. Metallurgists must develop specialized nickel-chromium superalloys capable of resisting both thermal fatigue and the corrosive, mineral-saturated acidic brines that leach from deep volcanic strata.

Beyond mechanical durability, hydraulic stimulation in EGS projects carries acute geophysical risks. Because deep crystalline bedrock typically exhibits low natural permeability, engineers must inject high-pressure cold water into deep boreholes to fracture the rock, creating an artificial subterranean radiator through which circulating water can absorb heat. In 2006, a pioneer EGS project in Basel, Switzerland, was permanently canceled after hydraulic stimulation triggered a series of micro-earthquakes, culminating in a magnitude 3.4 seismic event that rattled the city center and damaged historical masonry buildings. 

To mitigate induced seismicity, contemporary projects utilize real-time seismic traffic-light protocols and cyclic, low-pressure soft stimulation techniques. Furthermore, closed-loop Advanced Geothermal Systems (AGS)—which circulate a sealed working fluid through deep horizontal coaxial pipes without directly fracturing native rock—are emerging as an inherently non-seismic alternative. If ongoing deep-drilling demonstrations in Iceland and the western United States validate technical viability, supercritical geothermal power could transition from an experimental frontier to an ubiquitous, carbon-free baseload energy pillar capable of powering metropolitan grids worldwide.`;

// ----------------------------------------------------------------------------
// Passage 2: Anthropogenic Noise and Marine Bioacoustics (600 words)
// ----------------------------------------------------------------------------
const PASSAGE_IELTS_BIOACOUSTICS = `In the vast oceanic environment, where sunlight attenuates completely within two hundred meters of the surface, sound serves as the primary sensory modality for marine organisms. Cetaceans—encompassing both baleen whales (Mysticeti) and toothed whales (Odontoceti)—rely on acoustic signals across vast distances to navigate abyssal trenches, coordinate cooperative foraging, establish reproductive territory, and maintain lifelong maternal bonds. Toothed whales emit ultrasonic high-frequency echolocation clicks to construct three-dimensional mental maps and pinpoint individual prey, whereas baleen whales generate low-frequency vocalizations (between 10 Hz and 1 kHz) that propagate across hundreds of kilometers of ocean via the deep SOFAR (Sound Fixing and Ranging) channel.

Over the past seven decades, however, human industrial activity has transformed the marine acoustic landscape from a tranquil natural soundscape into an acoustic cacophony. The primary contributor to chronic low-frequency marine noise is the global commercial shipping fleet. Propeller cavitation—the rapid collapse of microscopic vacuum bubbles generated by rotating propeller blades—radiates intense low-frequency noise (50 to 300 Hz) that coincides precisely with the auditory and vocal frequencies utilized by blue, fin, and humpback whales. Oceanographers estimate that background ambient low-frequency noise along major transoceanic shipping corridors has doubled every decade since the 1960s.

The biological consequences of this chronic acoustic fog are profound. Marine biologists have documented pervasive "acoustic masking," wherein ambient ship noise drowns out whale calls, shrinking the effective communication range of endangered North Atlantic right whales by more than eighty percent. To overcome masking, several whale populations exhibit the Lombard effect: they expend valuable metabolic energy elevating the amplitude and pitch of their vocalizations, or cease calling altogether. Chronic exposure to elevated noise also induces physiological endocrine stress; analyses of whale fecal samples collected in the Bay of Fundy revealed that stress-related glucocorticoid hormone levels plummeted dramatically when commercial shipping traffic ceased immediately following the events of September 2001.

Even more catastrophic are acute, high-intensity sound pulses generated by marine seismic airgun surveys and military mid-frequency active sonar. Airgun arrays deployed in offshore petroleum exploration fire pressurized acoustic blasts exceeding 250 decibels every ten seconds for months at a time, devastating zooplankton populations and destroying the hair cells of fish inner ears. Military tactical sonar exercises have been conclusively linked to mass stranding events of Cuvier's beaked whales. In attempting to flee terrifying acoustic pulses, panic-stricken beaked whales execute rapid, uncontrolled ascents from depths exceeding one thousand meters, suffering lethal decompression sickness and gas-bubble lesions in vital organs. In response, international maritime regulators are piloting voluntary vessel slowdown zones and retrofitting container ships with wake-equalizing ducts to dampen acoustic pollution.`;

// ----------------------------------------------------------------------------
// Passage 3: Vertical Farming and Urban Agroecology (610 words)
// ----------------------------------------------------------------------------
const PASSAGE_IELTS_VERTICAL_FARMING = `By the year 2050, the global human population is projected to reach nearly ten billion, requiring an estimated sixty percent increase in global food production. Traditional arable agriculture, which already occupies thirty-eight percent of the planet's ice-free land surface and accounts for seventy percent of global freshwater withdrawals, faces catastrophic ecological headwinds: accelerating topsoil erosion, depleted aquifers, and increasingly erratic weather extremes driven by planetary climate change. In response, agricultural innovators are pioneering commercial vertical farming—the practice of cultivating crops in vertically stacked layers within climate-controlled urban indoor facilities.

Vertical farms utilize Controlled Environment Agriculture (CEA), integrating automated hydroponic (nutrient-enriched water) or aeroponic (misted air) irrigation systems that deliver precise dosages of mineral solutions directly to plant roots. By operating within sealed, recirculating closed-loop architectures, vertical farms recycle evaporated plant transpiration through industrial dehumidifiers, reducing water consumption by up to ninety-five percent compared to conventional open-field farming. Furthermore, because indoor environments completely exclude insect pests, diseases, and fungal spores, vertical farms eliminate the need for chemical synthetic pesticides and herbicides, producing clean harvests that require no post-harvest washing.

A critical technological breakthrough powering modern vertical farms is the spectral optimization of light-emitting diode (LED) fixtures. Rather than replicating the full spectrum of natural sunlight, growers calibrate "light recipes" targeting specific blue (450 nm) and red (660 nm) wavelengths that correspond precisely to the absorption peaks of chlorophyll $a$ and chlorophyll $b$. By fine-tuning light intensity, photoperiod duration, and ambient carbon dioxide concentrations (often enriched to 1,200 parts per million), vertical farm operators can accelerate photosynthetic growth cycles, harvesting crops up to five times faster than outdoor agricultural schedules and yielding dozens of harvest rotations annually.

Despite these extraordinary agronomic efficiencies, vertical farming confronts severe economic and thermodynamic criticisms. The most glaring liability is operational energy consumption. Replacing the free thermonuclear energy of the sun with artificial LED luminaires and maintaining energy-intensive heating, ventilation, and air-conditioning (HVAC) systems requires colossal electrical inputs. If a vertical farm draws electricity from a regional utility grid powered by fossil fuels, its carbon footprint per kilogram of produce can exceed that of field-grown crops transported across continents by freight truck.

Consequently, commercial vertical farming remains economically restricted to high-value, fast-growing, perishable leafy greens (such as lettuce, kale, and basil) and culinary herbs, which boast high surface-area-to-weight ratios and command premium prices in affluent urban grocery markets. Cultivating caloric staple crops—such as wheat, rice, corn, and potatoes, which provide the bulk of global human caloric intake—remains thermodynamically and financially unfeasible in vertical facilities due to the exorbitant electricity cost of providing artificial light for long maturation periods. Unless next-generation farms achieve direct integration with dedicated zero-carbon nuclear or renewable microgrids, vertical agriculture will remain a specialized boutique supplement to, rather than a replacement for, traditional terrestrial agriculture.`;

// ----------------------------------------------------------------------------
// Passage 4: Paleogenomics and the Medieval Silk Road Plague (590 words)
// ----------------------------------------------------------------------------
const PASSAGE_IELTS_SILK_ROAD = `Between 1346 and 1353, the second plague pandemic, historically known as the Black Death, swept across Eurasia and North Africa, killing an estimated thirty to sixty percent of the European population and permanently reshaping the demographic, religious, and economic trajectories of Western civilization. For centuries, historians and epidemiologists debated the geographic origins and evolutionary timeline of the bacterium responsible for the pandemic, *Yersinia pestis*. While early twentieth-century scholars speculated that the outbreak originated in central China or India, direct archaeological and genomic confirmation remained frustratingly elusive due to the absence of well-preserved physical evidence.

The resolution of this historical enigma was achieved in 2022 through breakthroughs in ancient DNA (aDNA) sequencing conducted by an international team of paleogeneticists and historians led by Maria Spyrou and Johannes Krause. The researchers extracted dental pulp from human skeletal remains exhumed from two fourteenth-century burial sites near Lake Issyk-Kul in the Chüy Valley of northern Kyrgyzstan. Historical gravestones written in the ancient Syriac script recorded that an abnormally large number of Christian Nestorian community members perished in the years 1338 and 1339 from an unspecified pestilence.

High-throughput genomic sequencing of the dental pulp confirmed the presence of authentic *Yersinia pestis* ancient DNA in several excavated skeletons. Crucially, phylogenetic evolutionary analysis revealed that the ancient Kyrgyz bacterial strain sat at the root of a massive evolutionary diversification event—often referred to as the "Big Bang" of plague diversity. This genetic divergence produced the ancestral lineage that spawned the Black Death in Europe, alongside modern plague lineages currently circulating in wild rodent reservoirs across the world today.

Furthermore, paleoclimatologists and ecologists demonstrated that Lake Issyk-Kul was not an arbitrary point of infection, but rather a vital nexus along the medieval Silk Road caravan network. Dense trade routes crossed the Tian Shan mountains, where local populations of marmots, ground squirrels, and gerbils maintained persistent, endemic plague reservoirs. Researchers hypothesize that a sudden climatic shift—specifically an episode of elevated precipitation that caused rodent populations to boom, followed by an abrupt drought that collapsed their wild food supplies—forced flea vectors to abandon starving rodents and jump to domestic camels, packhorses, and human merchants traveling along commercial trading routes. Carried westward in grain sacks and merchant luggage, the pathogen traveled along Silk Road arteries to the Black Sea port of Caffa, where Genoese merchant ships subsequently carried the contagion to Mediterranean harbors.`;

// ----------------------------------------------------------------------------
// Passage 5: Biomimetic Architecture and Passive Thermoregulation (600 words)
// ----------------------------------------------------------------------------
const PASSAGE_IELTS_BIOMIMETICS = `Modern commercial architecture in tropical and subtropical urban centers relies almost universally on energy-intensive mechanical air conditioning systems to maintain comfortable indoor temperatures. Heating, ventilation, and air conditioning (HVAC) systems account for roughly forty percent of total building energy consumption, contributing substantially to global greenhouse gas emissions and straining municipal electric power grids during heat waves. To develop sustainable alternatives, visionary architects have turned to biomimicry—the practice of emulating biological structures and ecosystem strategies to solve human engineering challenges.

The preeminent global prototype of biomimetic architecture is the Eastgate Centre, a mid-rise shopping and office complex constructed in 1996 in Harare, Zimbabwe. Designed by architect Mick Pearce in collaboration with engineering firm Arup, the building completely dispenses with conventional mechanical refrigeration chillers, using instead a passive thermoregulation system inspired by the subterranean architecture of African fungus-farming termites (*Macrotermes michaelseni*). 

Termite mounds are renowned for maintaining a nearly constant internal temperature of 30°C and ninety percent relative humidity, despite outside ambient temperatures fluctuating from below 2°C at night to over 40°C during the day. Termites achieve this homeostatic stability by cultivating an underground fungus garden that requires strict climatic regulation. The mound acts as a giant natural lung: metabolic heat generated by the millions of termites and their fungal combs warms internal air, causing it to rise buoyantly through a central vertical chimney flue and vent to the exterior through surface porous holes. This rising warm air creates a low-pressure draft that draws cooler, fresh ambient air through an extensive subterranean network of peripheral tunnels.

Pearce translated these termite principles into the Eastgate Centre using passive thermal mass and diurnal night-purge ventilation. The complex is constructed primarily from locally sourced porous concrete and masonry blocks, which possess high thermal inertia. During hot daytime hours, the building's dense masonry walls absorb solar heat, preventing the interior office suites from warming rapidly. At night, when outdoor air temperatures plummet, high-volume electrical fans pull cool ambient air through deep subterranean basement plenums, circulating it through hollow concrete floors to flush out absorbed heat and cool the building's structural fabric.

The thermal results of this biomimetic approach are extraordinary. The Eastgate Centre consumes less than ten percent of the energy of an equivalent conventionally air-conditioned office building in Harare, saving building owners millions of dollars in electricity expenses while providing exceptional natural airflow. Inspired by the Eastgate prototype, architects globally are applying passive biomimetic principles to educational campuses, hospitals, and residential towers, proving that nature's evolutionary blueprints can guide twenty-first-century sustainable urban engineering.`;

// ----------------------------------------------------------------------------
// Passage 6: Glacial Hydrology and Subglacial Meltwater Dynamics (610 words)
// ----------------------------------------------------------------------------
const PASSAGE_IELTS_GLACIAL = `The Antarctic and Greenland ice sheets contain enough frozen freshwater to elevate global mean sea levels by more than sixty-five meters if melted completely. In early numerical climate models, ice sheet melt was treated primarily as a slow, surface-mediated thermodynamic process: atmospheric warming would melt ice at the surface, with runoff gradually trickling into the oceans. Over the past two decades, however, satellite radar altimetry, subglacial borehole drilling, and airborne ice-penetrating radar have dismantled this simplistic model, revealing that dynamic basal hydrology—the behavior of pressurized liquid water beneath kilometers of glacial ice—exerts a far more decisive control over the velocity of catastrophic ice loss.

Subglacial meltwater is generated beneath massive ice sheets by two primary mechanisms: geothermal heat flux radiating from Earth's mantle, and frictional heat produced by the colossal overburden pressure and internal deformation of flowing ice. Trapped under immense hydrostatic pressure, this meltwater cannot easily escape, collecting into vast networks of subglacial rivers and subglacial lakes. When subglacial water accumulates at the ice-bedrock interface, it decouples the glacier from its underlying substrate, acting as a high-pressure hydraulic lubricant that reduces basal shear resistance to near zero and allowing entire continental ice streams to surge seaward at velocities of several kilometers per year.

The most acute point of dynamic vulnerability occurs at the "grounding line"—the critical boundary where a land-based ice sheet lifts off the bedrock substrate and transitions into a floating ice shelf over the ocean. In West Antarctica, vast marine-terminating glaciers such as Thwaites and Pine Island rest on bedrock that slopes downward toward the interior of the continent, a geological configuration known as retrograde bed slope. As relatively warm, dense Circumpolar Deep Water intrudes into sub-ice shelf cavities, it accelerates basal melting at the grounding line.

Because the bedrock deepens inland, melting causes the grounding line to retreat into progressively thicker ice. Under marine ice sheet instability (MISI) theory, the flux of ice discharged into the ocean is directly proportional to the thickness of the ice at the grounding line. Consequently, once a retreat is initiated across a retrograde bed slope, the process becomes self-sustaining and irreversible: deeper water leads to faster melting, which thins the ice and drives further grounding line retreat, even without additional atmospheric warming. Understanding the nonlinear feedback loops between subglacial meltwater channels and grounding line retreat represents the foremost frontier in reducing uncertainties in twenty-first-century global sea level projections.`;

// ----------------------------------------------------------------------------
// Passage 7: Bilingualism, Executive Function, and Cognitive Reserve (580 words)
// ----------------------------------------------------------------------------
const PASSAGE_IELTS_BILINGUALISM = `For much of the twentieth century, educational authorities and developmental psychologists in English-speaking nations cautioned parents against raising children in bilingual households, claiming that simultaneous exposure to two languages would cause cognitive confusion, delay vocabulary acquisition, and impair academic performance. Today, extensive cognitive neuroscience research has decisively refuted this outdated prejudice, establishing instead that lifelong bilingualism confers profound advantages in executive functioning and provides a robust neural buffer against neurodegenerative cognitive decline.

Executive function encompasses a suite of higher-order cognitive control processes mediated by the prefrontal cortex, including inhibitory control, cognitive flexibility, working memory updating, and attentional task-switching. In a bilingual individual, both linguistic systems remain continuously active in the brain, even when the speaker is conversing in only one language. Consequently, whenever a bilingual person speaks, their neural control system must actively suppress intrusive vocabulary and grammatical structures from the competing language while maintaining vigilance on the chosen target tongue.

Over decades of conversational life, this continuous, non-stop linguistic competition functions as an intensive mental workout for the brain's frontoparietal executive control network. Using neuroimaging tools like functional MRI, researchers demonstrated that lifelong bilinguals exhibit greater structural integrity in white matter tracts (such as the corpus callosum and superior longitudinal fasciculus) and display enhanced gray matter volume in the anterior cingulate cortex. When evaluated on non-linguistic task-switching tests (such as the Stroop task or the flanker task), bilingual adults and children consistently demonstrate superior reaction times and lower error rates, ignoring distracting sensory stimuli far more effectively than monolingual peers.

Perhaps the most astonishing clinical discovery regarding bilingualism concerns its impact on aging and dementia. In landmark epidemiological studies led by cognitive psychologist Ellen Bialystok and colleagues in Toronto and Hyderabad, researchers examined medical records of hundreds of patients diagnosed with Alzheimer's disease. The data revealed that lifelong bilingual patients manifested initial clinical symptoms of dementia four to five years later than demographically matched monolingual patients. 

Crucially, post-mortem neuroanatomical examinations revealed that bilingual patients had accrued identical, or even more extensive, amyloid-beta plaques and brain atrophy compared to monolinguals showing the same degree of cognitive impairment. This paradoxical finding provides powerful empirical support for the "cognitive reserve" hypothesis: while bilingualism does not prevent the physical, molecular pathology of neurodegenerative disease, the enhanced neural efficiency and flexible alternative neural circuits developed through decades of bilingual language control allow the brain to compensate for severe physical damage, keeping the individual cognitively intact long after a monolingual brain would have succumbed to severe behavioral impairment.`;

// ============================================================================
// IELTS READING COMPREHENSION QUESTIONS (35 Items: 7 Passages x 5 Questions)
// Question Types: True-False-Not Given (TFNG), Headings Matching,
// Summary Completion, Sentence Completion, and Inference/Detail.
// ============================================================================

export const IELTS_COMPREHENSION_BANK: SeedQuestion[] = [
  // --------------------------------------------------------------------------
  // Passage 1: Supercritical Geothermal (5 items)
  // --------------------------------------------------------------------------
  {
    exam_name: "IELTS Academic",
    subject: "Reading",
    skill_domain: "True-False-Not Given",
    difficulty_tier: 2,
    passage_id: "ielts_rc_geothermal_supercritical",
    passage: PASSAGE_IELTS_GEOTHERMAL,
    question_text: "Do the following statements agree with the information given in the reading passage?\n\nStatement: Conventional hydrothermal power generation is restricted to specific geographic areas associated with volcanic activity and tectonic plate margins.",
    options: {
      A: "TRUE",
      B: "FALSE",
      C: "NOT GIVEN"
    },
    correct_option: "A",
    explanation: "Paragraph 1 states: 'However, conventional hydrothermal energy is geographically constrained to volcanic rift zones and tectonic plate boundaries, currently supplying less than one percent of global electricity demand.' The statement agrees directly with this fact.",
    distractor_analysis: {
      A: "Correct. The passage confirms it is geographically constrained to volcanic rift zones and plate boundaries.",
      B: "Incorrect. The passage directly validates the statement rather than contradicting it.",
      C: "Incorrect. The information is explicitly given in the first paragraph."
    },
    misconception: "Confusing conventional geothermal limits with supercritical geothermal potential.",
    time_estimate_seconds: 45
  },
  {
    exam_name: "IELTS Academic",
    subject: "Reading",
    skill_domain: "True-False-Not Given",
    difficulty_tier: 3,
    passage_id: "ielts_rc_geothermal_supercritical",
    passage: PASSAGE_IELTS_GEOTHERMAL,
    question_text: "Do the following statements agree with the information given in the reading passage?\n\nStatement: Standard drill bits made from tungsten carbide perform reliably in rock temperatures exceeding 400°C.",
    options: {
      A: "TRUE",
      B: "FALSE",
      C: "NOT GIVEN"
    },
    correct_option: "B",
    explanation: "Paragraph 3 explicitly states: 'At depths of five kilometers, drilling rigs encounter crystalline granitic rock so intensely hot that standard tungsten carbide drill bits degrade within hours.' The statement claiming they perform reliably contradicts the passage.",
    distractor_analysis: {
      A: "Incorrect. The text states standard bits degrade within hours under searing heat.",
      B: "Correct. Factual contradiction: bits degrade rapidly rather than performing reliably.",
      C: "Incorrect. The performance of tungsten carbide drill bits under extreme heat is explicitly discussed."
    },
    misconception: "Confusing industrial tungsten carbide durability at normal temperatures with its failure under deep geothermal heat.",
    time_estimate_seconds: 45
  },
  {
    exam_name: "IELTS Academic",
    subject: "Reading",
    skill_domain: "True-False-Not Given",
    difficulty_tier: 2,
    passage_id: "ielts_rc_geothermal_supercritical",
    passage: PASSAGE_IELTS_GEOTHERMAL,
    question_text: "Do the following statements agree with the information given in the reading passage?\n\nStatement: The Swiss government compensated Basel homeowners whose historical buildings suffered cosmetic cracking during the 2006 seismic event.",
    options: {
      A: "TRUE",
      B: "FALSE",
      C: "NOT GIVEN"
    },
    correct_option: "C",
    explanation: "Paragraph 4 mentions the project triggered a magnitude 3.4 earthquake that 'rattled the city center and damaged historical masonry buildings,' but the text gives ZERO information regarding whether the Swiss government compensated homeowners. Therefore, the answer is NOT GIVEN.",
    distractor_analysis: {
      A: "Incorrect. Financial compensation is not stated or confirmed anywhere in the text.",
      B: "Incorrect. The text does not say compensation was denied.",
      C: "Correct. Classic IELTS NOT GIVEN: property damage is mentioned, but government compensation details are absent."
    },
    misconception: "Assuming government compensation took place because property damage occurred, projecting outside assumptions.",
    time_estimate_seconds: 50
  },
  {
    exam_name: "IELTS Academic",
    subject: "Reading",
    skill_domain: "Headings and Main Idea Matching",
    difficulty_tier: 3,
    passage_id: "ielts_rc_geothermal_supercritical",
    passage: PASSAGE_IELTS_GEOTHERMAL,
    question_text: "Which heading best summarizes Paragraph 4 of the passage on geothermal energy?",
    options: {
      A: "The chemical composition of volcanic nickel-chromium alloys",
      B: "Induced seismicity risks associated with hydraulic rock fracturing",
      C: "Commercial retail pricing of geothermal electricity in Switzerland",
      D: "The global geographic distribution of tectonic plate rifts"
    },
    correct_option: "B",
    explanation: "Paragraph 4 focuses on the geophysical hazards of hydraulic stimulation, detailing how injecting high-pressure water to fracture rock triggered earthquakes in Basel, leading to project cancellation.",
    distractor_analysis: {
      A: "Incorrect. Alloys are discussed in Paragraph 3.",
      B: "Correct. Captures the central focus: induced micro-earthquakes and seismic hazards from hydraulic rock fracturing.",
      C: "Incorrect. Retail electricity pricing is unmentioned.",
      D: "Incorrect. Plate rifts are introduced in Paragraph 1."
    },
    misconception: "Selecting headings that correspond to other paragraphs.",
    time_estimate_seconds: 45
  },
  {
    exam_name: "IELTS Academic",
    subject: "Reading",
    skill_domain: "Sentence Completion",
    difficulty_tier: 2,
    passage_id: "ielts_rc_geothermal_supercritical",
    passage: PASSAGE_IELTS_GEOTHERMAL,
    question_text: "Complete the sentence below using NO MORE THAN THREE WORDS from the passage:\n\nUnlike traditional hydraulic fracturing, closed-loop Advanced Geothermal Systems circulate working fluids through _______ without creating fractures in native crystalline bedrock.",
    options: {
      A: "horizontal coaxial pipes",
      B: "magma chambers",
      C: "dehumidified air shafts",
      D: "porous masonry tunnels"
    },
    correct_option: "A",
    explanation: "Paragraph 5 explicitly states: 'closed-loop Advanced Geothermal Systems (AGS)—which circulate a sealed working fluid through deep horizontal coaxial pipes without directly fracturing native rock...'",
    distractor_analysis: {
      A: "Correct. Direct verbatim technical phrase from paragraph 5.",
      B: "Incorrect. Circulating directly through magma chambers is physically impossible and unmentioned.",
      C: "Incorrect. Air shafts are used in building ventilation, not geothermal pipes.",
      D: "Incorrect. Masonry belongs to the architecture passage."
    },
    misconception: "Selecting general geological terms rather than the specific engineered closed-loop pipe system named in the text.",
    time_estimate_seconds: 40
  },

  // --------------------------------------------------------------------------
  // Passage 2: Marine Bioacoustics and Noise (5 items)
  // --------------------------------------------------------------------------
  {
    exam_name: "IELTS Academic",
    subject: "Reading",
    skill_domain: "True-False-Not Given",
    difficulty_tier: 2,
    passage_id: "ielts_rc_marine_bioacoustics",
    passage: PASSAGE_IELTS_BIOACOUSTICS,
    question_text: "Do the following statements agree with the information given in the reading passage?\n\nStatement: Commercial shipping noise overlaps with the acoustic frequency bands utilized by large baleen whales.",
    options: {
      A: "TRUE",
      B: "FALSE",
      C: "NOT GIVEN"
    },
    correct_option: "A",
    explanation: "Paragraph 2 states that propeller cavitation generates low-frequency noise (50 to 300 Hz) that 'coincides precisely with the auditory and vocal frequencies utilized by blue, fin, and humpback whales' (which are baleen whales). The statement is TRUE.",
    distractor_analysis: {
      A: "Correct. Directly confirmed by paragraph 2.",
      B: "Incorrect. The passage affirms the overlap rather than denying it.",
      C: "Incorrect. The frequency overlap is explicitly discussed."
    },
    misconception: "Confusing high-frequency toothed whale echolocation with low-frequency baleen whale calls.",
    time_estimate_seconds: 45
  },
  {
    exam_name: "IELTS Academic",
    subject: "Reading",
    skill_domain: "True-False-Not Given",
    difficulty_tier: 3,
    passage_id: "ielts_rc_marine_bioacoustics",
    passage: PASSAGE_IELTS_BIOACOUSTICS,
    question_text: "Do the following statements agree with the information given in the reading passage?\n\nStatement: Chemical analysis of whale feces in the Bay of Fundy indicated higher levels of stress hormones during the weeks following the September 2001 shipping shutdown.",
    options: {
      A: "TRUE",
      B: "FALSE",
      C: "NOT GIVEN"
    },
    correct_option: "B",
    explanation: "Paragraph 3 states that stress-related glucocorticoid hormone levels 'plummeted dramatically' when shipping traffic ceased after September 2001. The statement claims they were higher, which directly contradicts the text (making it FALSE).",
    distractor_analysis: {
      A: "Incorrect. The hormone levels dropped dramatically, not rose.",
      B: "Correct. Direct factual contradiction: hormone levels plummeted (decreased), not increased.",
      C: "Incorrect. The study data is explicitly cited in the text."
    },
    misconception: "Misinterpreting 'plummeted' as an increase or misreading the direction of the correlation.",
    time_estimate_seconds: 45
  },
  {
    exam_name: "IELTS Academic",
    subject: "Reading",
    skill_domain: "Inference and Implication",
    difficulty_tier: 3,
    passage_id: "ielts_rc_marine_bioacoustics",
    passage: PASSAGE_IELTS_BIOACOUSTICS,
    question_text: "According to the passage, why do Cuvier's beaked whales experience lethal decompression sickness during military active sonar operations?",
    options: {
      A: "Sonar sound pulses heat the surrounding ocean water to boiling temperatures.",
      B: "In attempting to flee terrifying acoustic pulses, the whales perform rapid, uncontrolled ascents from deep depths, causing nitrogen gas bubble lesions.",
      C: "The sonar waves shatter the calcified bones in the whale's flippers.",
      D: "Military naval vessels actively hunt beaked whales with explosive harpoons."
    },
    correct_option: "B",
    explanation: "Paragraph 4 states: 'In attempting to flee terrifying acoustic pulses, panic-stricken beaked whales execute rapid, uncontrolled ascents from depths exceeding one thousand meters, suffering lethal decompression sickness and gas-bubble lesions in vital organs.'",
    distractor_analysis: {
      A: "Incorrect. Sonar does not boil seawater.",
      B: "Correct. Directly captures the panic-driven rapid ascent mechanism causing decompression sickness.",
      C: "Incorrect. Bone shattering is not the pathology described.",
      D: "Incorrect. Naval vessels conduct sonar training, not commercial whaling."
    },
    misconception: "Assuming direct acoustic blast damage rather than behavioral panic causing rapid ascent and decompression sickness.",
    time_estimate_seconds: 50
  },
  {
    exam_name: "IELTS Academic",
    subject: "Reading",
    skill_domain: "Headings and Main Idea Matching",
    difficulty_tier: 2,
    passage_id: "ielts_rc_marine_bioacoustics",
    passage: PASSAGE_IELTS_BIOACOUSTICS,
    question_text: "Which heading best captures the central subject of Paragraph 3?",
    options: {
      A: "The economic profitability of transoceanic container shipping",
      B: "Biological consequences of chronic masking and endocrine stress in cetaceans",
      C: "Evolutionary divergence between baleen and toothed whales",
      D: "Military naval tactics in coastal submarine warfare"
    },
    correct_option: "B",
    explanation: "Paragraph 3 details how chronic noise produces acoustic masking (shrinking communication ranges), triggers the Lombard effect, and elevates glucocorticoid stress hormones.",
    distractor_analysis: {
      A: "Incorrect. Container shipping economics are not addressed.",
      B: "Correct. Accurately synthesizes the biological consequences: acoustic masking, call modifications, and physiological stress.",
      C: "Incorrect. Cetacean evolutionary divergence is covered in Paragraph 1.",
      D: "Incorrect. Military tactics are mentioned in Paragraph 4."
    },
    misconception: "Selecting a heading that focuses on human industry rather than cetacean biological impact.",
    time_estimate_seconds: 40
  },
  {
    exam_name: "IELTS Academic",
    subject: "Reading",
    skill_domain: "Summary Completion",
    difficulty_tier: 2,
    passage_id: "ielts_rc_marine_bioacoustics",
    passage: PASSAGE_IELTS_BIOACOUSTICS,
    question_text: "Complete the summary below using NO MORE THAN TWO WORDS from the passage:\n\nWhen cetaceans find their calls drowned out by background ship noise, they frequently exhibit the _______ by increasing the loudness and pitch of their vocalizations.",
    options: {
      A: "Lombard effect",
      B: "cavitation pulse",
      C: "trophic cascade",
      D: "decompression shift"
    },
    correct_option: "A",
    explanation: "Paragraph 3 explicitly states: 'To overcome masking, several whale populations exhibit the Lombard effect: they expend valuable metabolic energy elevating the amplitude and pitch of their vocalizations...'",
    distractor_analysis: {
      A: "Correct. Verbatim two-word technical scientific term from the text.",
      B: "Incorrect. Cavitation describes propeller bubble collapse.",
      C: "Incorrect. Trophic cascade belongs to ecology, not vocal pitch elevation.",
      D: "Incorrect. Decompression relates to beaked whale ascents."
    },
    misconception: "Confusing the animal vocal behavior (Lombard effect) with the mechanical source of ship noise (cavitation).",
    time_estimate_seconds: 40
  },

  // --------------------------------------------------------------------------
  // Passage 3: Vertical Farming (5 items)
  // --------------------------------------------------------------------------
  {
    exam_name: "IELTS Academic",
    subject: "Reading",
    skill_domain: "True-False-Not Given",
    difficulty_tier: 2,
    passage_id: "ielts_rc_vertical_farming",
    passage: PASSAGE_IELTS_VERTICAL_FARMING,
    question_text: "Do the following statements agree with the information given in the reading passage?\n\nStatement: Vertical farms eliminate the need for chemical synthetic pesticides primarily because their enclosed indoor environments prevent insect pests and diseases from entering.",
    options: {
      A: "TRUE",
      B: "FALSE",
      C: "NOT GIVEN"
    },
    correct_option: "A",
    explanation: "Paragraph 2 states: 'Furthermore, because indoor environments completely exclude insect pests, diseases, and fungal spores, vertical farms eliminate the need for chemical synthetic pesticides and herbicides...'. The statement is TRUE.",
    distractor_analysis: {
      A: "Correct. Directly mirrors the explanation in paragraph 2.",
      B: "Incorrect. The text affirms the statement.",
      C: "Incorrect. The information is explicitly stated in the text."
    },
    misconception: "Assuming pesticides are still used indoors in small amounts.",
    time_estimate_seconds: 40
  },
  {
    exam_name: "IELTS Academic",
    subject: "Reading",
    skill_domain: "True-False-Not Given",
    difficulty_tier: 3,
    passage_id: "ielts_rc_vertical_farming",
    passage: PASSAGE_IELTS_VERTICAL_FARMING,
    question_text: "Do the following statements agree with the information given in the reading passage?\n\nStatement: Commercial vertical farms currently produce more than half of the wheat and rice consumed in North American cities.",
    options: {
      A: "TRUE",
      B: "FALSE",
      C: "NOT GIVEN"
    },
    correct_option: "B",
    explanation: "Paragraph 5 explicitly states that growing caloric staple crops like wheat and rice 'remains thermodynamically and financially unfeasible in vertical facilities' and that vertical farming is economically restricted to leafy greens and herbs. The claim that they produce more than half of urban wheat and rice is FALSE.",
    distractor_analysis: {
      A: "Incorrect. Directly contradicted by the text.",
      B: "Correct. Factual contradiction: staple grain production in vertical farms is unfeasible, not dominant.",
      C: "Incorrect. The feasibility of staple grain production in vertical farms is explicitly addressed."
    },
    misconception: "Assuming vertical farms grow all types of crops rather than recognizing their limitation to leafy greens.",
    time_estimate_seconds: 45
  },
  {
    exam_name: "IELTS Academic",
    subject: "Reading",
    skill_domain: "Headings and Main Idea Matching",
    difficulty_tier: 2,
    passage_id: "ielts_rc_vertical_farming",
    passage: PASSAGE_IELTS_VERTICAL_FARMING,
    question_text: "Which heading best summarizes Paragraph 4 of the passage on vertical farming?",
    options: {
      A: "The carbon footprint and operational energy liabilities of artificial indoor lighting",
      B: "Techniques for harvesting rain run-off in desert cities",
      C: "Nutritional differences between wild and greenhouse-grown kale",
      D: "The history of greenhouse construction in ancient Rome"
    },
    correct_option: "A",
    explanation: "Paragraph 4 analyzes the primary liability of vertical farming: heavy electricity and HVAC consumption replacing free sunlight, which can generate high carbon footprints if grid electricity comes from fossil fuels.",
    distractor_analysis: {
      A: "Correct. Accurately synthesizes the focus on energy consumption, HVAC demands, and carbon footprint liabilities.",
      B: "Incorrect. Rain harvesting is unmentioned.",
      C: "Incorrect. Nutritional comparisons of kale are not discussed.",
      D: "Incorrect. Roman history is unmentioned."
    },
    misconception: "Failing to recognize that Paragraph 4 shifts from agronomic benefits to thermodynamic energy criticisms.",
    time_estimate_seconds: 45
  },
  {
    exam_name: "IELTS Academic",
    subject: "Reading",
    skill_domain: "Summary Completion",
    difficulty_tier: 3,
    passage_id: "ielts_rc_vertical_farming",
    passage: PASSAGE_IELTS_VERTICAL_FARMING,
    question_text: "Complete the summary below using NO MORE THAN TWO WORDS from the passage:\n\nRather than replicating full natural sunlight, vertical farm lighting systems utilize customized _______ that combine specific wavelengths of blue and red light matching chlorophyll absorption peaks.",
    options: {
      A: "light recipes",
      B: "solar panels",
      C: "infrared sensors",
      D: "heating ducts"
    },
    correct_option: "A",
    explanation: "Paragraph 3 explicitly states: 'Rather than replicating the full spectrum of natural sunlight, growers calibrate \"light recipes\" targeting specific blue (450 nm) and red (660 nm) wavelengths...'",
    distractor_analysis: {
      A: "Correct. Verbatim two-word term used in the passage.",
      B: "Incorrect. Solar panels generate power, not artificial spectrum recipes.",
      C: "Incorrect. Infrared sensors are not the lighting fixtures.",
      D: "Incorrect. Heating ducts do not supply light."
    },
    misconception: "Overlooking the explicit quotation term 'light recipes' in paragraph 3.",
    time_estimate_seconds: 40
  },
  {
    exam_name: "IELTS Academic",
    subject: "Reading",
    skill_domain: "Inference and Implication",
    difficulty_tier: 2,
    passage_id: "ielts_rc_vertical_farming",
    passage: PASSAGE_IELTS_VERTICAL_FARMING,
    question_text: "According to the final paragraph, vertical farming is currently restricted to crops like lettuce, kale, and herbs because these plants:",
    options: {
      A: "Possess deep taproots that break through concrete floors.",
      B: "Have fast growth cycles, high surface-area-to-weight ratios, and command premium retail prices that offset high electricity expenses.",
      C: "Cannot survive exposure to natural outdoor sunlight.",
      D: "Are the only vegetables that human beings eat in metropolitan areas."
    },
    correct_option: "B",
    explanation: "Paragraph 5 explains that commercial vertical farming is restricted to leafy greens and culinary herbs 'which boast high surface-area-to-weight ratios and command premium prices in affluent urban grocery markets' while having fast growth cycles that minimize lighting time.",
    distractor_analysis: {
      A: "Incorrect. Hydroponic greens have shallow roots in water gutters.",
      B: "Correct. Accurately details the agronomic and financial reasons: rapid growth, high price per pound, and high light capture.",
      C: "Incorrect. Leafy greens thrive outdoors naturally.",
      D: "Incorrect. Absurd claim; humans consume diverse grains and vegetables."
    },
    misconception: "Assuming botanical inability to grow outdoors rather than economic margins dictating crop selection.",
    time_estimate_seconds: 45
  },

  // --------------------------------------------------------------------------
  // Passage 4: Silk Road Plague (5 items)
  // --------------------------------------------------------------------------
  {
    exam_name: "IELTS Academic",
    subject: "Reading",
    skill_domain: "True-False-Not Given",
    difficulty_tier: 2,
    passage_id: "ielts_rc_silk_road_plague",
    passage: PASSAGE_IELTS_SILK_ROAD,
    question_text: "Do the following statements agree with the information given in the reading passage?\n\nStatement: In 2022, researchers successfully isolated authentic ancient DNA of *Yersinia pestis* from the dental pulp of 14th-century skeletons found near Lake Issyk-Kul.",
    options: {
      A: "TRUE",
      B: "FALSE",
      C: "NOT GIVEN"
    },
    correct_option: "A",
    explanation: "Paragraph 3 states: 'High-throughput genomic sequencing of the dental pulp confirmed the presence of authentic *Yersinia pestis* ancient DNA in several excavated skeletons' from Lake Issyk-Kul in 2022. The statement is TRUE.",
    distractor_analysis: {
      A: "Correct. Matches the explicit finding reported in paragraphs 2 and 3.",
      B: "Incorrect. The text confirms the discovery.",
      C: "Incorrect. The DNA source and location are explicitly detailed."
    },
    misconception: "Overlooking that dental pulp is the standard paleogenomic tissue source for bloodborne pathogens.",
    time_estimate_seconds: 40
  },
  {
    exam_name: "IELTS Academic",
    subject: "Reading",
    skill_domain: "True-False-Not Given",
    difficulty_tier: 3,
    passage_id: "ielts_rc_silk_road_plague",
    passage: PASSAGE_IELTS_SILK_ROAD,
    question_text: "Do the following statements agree with the information given in the reading passage?\n\nStatement: Gravestones at the Issyk-Kul cemetery were inscribed in modern Russian Cyrillic script.",
    options: {
      A: "TRUE",
      B: "FALSE",
      C: "NOT GIVEN"
    },
    correct_option: "B",
    explanation: "Paragraph 2 explicitly states that historical gravestones were 'written in the ancient Syriac script.' The claim that they were in modern Russian Cyrillic is a direct factual contradiction (making it FALSE).",
    distractor_analysis: {
      A: "Incorrect. The text explicitly says Syriac script.",
      B: "Correct. Factual contradiction: Syriac script, not modern Russian Cyrillic.",
      C: "Incorrect. The script type is explicitly described in the text."
    },
    misconception: "Confusing the modern geographic region (Kyrgyzstan/post-Soviet) with the medieval archaeological script (ancient Syriac).",
    time_estimate_seconds: 40
  },
  {
    exam_name: "IELTS Academic",
    subject: "Reading",
    skill_domain: "Headings and Main Idea Matching",
    difficulty_tier: 2,
    passage_id: "ielts_rc_silk_road_plague",
    passage: PASSAGE_IELTS_SILK_ROAD,
    question_text: "Which heading best describes the focus of Paragraph 4?",
    options: {
      A: "Ecological and commercial transmission mechanisms along Silk Road caravan corridors",
      B: "The invention of printing presses in Western Europe",
      C: "Modern vaccine manufacturing against respiratory viruses",
      D: "Religious schisms within Mediterranean Catholic monasteries"
    },
    correct_option: "A",
    explanation: "Paragraph 4 explains how climate shifts triggered rodent population booms and crashes, causing plague-carrying fleas to jump to camels and merchants traveling along Silk Road trade routes to the Black Sea.",
    distractor_analysis: {
      A: "Correct. Accurately synthesizes the ecological (rodents/fleas) and commercial (trade routes/ships) transmission mechanisms.",
      B: "Incorrect. Printing presses are unmentioned.",
      C: "Incorrect. Modern vaccines are unmentioned.",
      D: "Incorrect. Catholic religious schisms are unmentioned."
    },
    misconception: "Selecting general European medieval themes rather than the specific Silk Road transmission dynamics detailed in Paragraph 4.",
    time_estimate_seconds: 45
  },
  {
    exam_name: "IELTS Academic",
    subject: "Reading",
    skill_domain: "Summary Completion",
    difficulty_tier: 3,
    passage_id: "ielts_rc_silk_road_plague",
    passage: PASSAGE_IELTS_SILK_ROAD,
    question_text: "Complete the summary below using NO MORE THAN TWO WORDS from the passage:\n\nPhylogenetic evolutionary analysis revealed that the ancient bacterial strain from Kyrgyzstan was located at the source of a massive evolutionary diversification event known as the _______ of plague diversity.",
    options: {
      A: "Big Bang",
      B: "Golden Age",
      C: "Dark Age",
      D: "Bronze Wave"
    },
    correct_option: "A",
    explanation: "Paragraph 3 states: 'Crucially, phylogenetic evolutionary analysis revealed that the ancient Kyrgyz bacterial strain sat at the root of a massive evolutionary diversification event—often referred to as the \"Big Bang\" of plague diversity.'",
    distractor_analysis: {
      A: "Correct. Verbatim two-word metaphor used in paragraph 3.",
      B: "Incorrect. Unrelated cultural phrase.",
      C: "Incorrect. Unrelated historical trope.",
      D: "Incorrect. Unrelated archaeological term."
    },
    misconception: "Failing to locate the exact quoted metaphorical term in paragraph 3.",
    time_estimate_seconds: 35
  },
  {
    exam_name: "IELTS Academic",
    subject: "Reading",
    skill_domain: "Sentence Completion",
    difficulty_tier: 2,
    passage_id: "ielts_rc_silk_road_plague",
    passage: PASSAGE_IELTS_SILK_ROAD,
    question_text: "Complete the sentence below using NO MORE THAN THREE WORDS from the passage:\n\nPlague-bearing merchants traveled westward along Silk Road corridors to the Black Sea port of _______, where maritime trade ships transported the infection into the Mediterranean.",
    options: {
      A: "Caffa",
      B: "Harare",
      C: "Basel",
      D: "Issyk-Kul"
    },
    correct_option: "A",
    explanation: "Paragraph 4 concludes: 'Carried westward in grain sacks and merchant luggage, the pathogen traveled along Silk Road arteries to the Black Sea port of Caffa, where Genoese merchant ships subsequently carried the contagion...'",
    distractor_analysis: {
      A: "Correct. Caffa was the specific Black Sea port identified in the text.",
      B: "Incorrect. Harare is in Zimbabwe (architecture passage).",
      C: "Incorrect. Basel is in Switzerland (geothermal passage).",
      D: "Incorrect. Issyk-Kul is an inland lake in Kyrgyzstan, not a Black Sea port."
    },
    misconception: "Confusing the origin lake in Central Asia (Issyk-Kul) with the Black Sea port (Caffa).",
    time_estimate_seconds: 40
  },

  // --------------------------------------------------------------------------
  // Passage 5: Biomimetic Architecture (5 items)
  // --------------------------------------------------------------------------
  {
    exam_name: "IELTS Academic",
    subject: "Reading",
    skill_domain: "True-False-Not Given",
    difficulty_tier: 2,
    passage_id: "ielts_rc_biomimetic_architecture",
    passage: PASSAGE_IELTS_BIOMIMETICS,
    question_text: "Do the following statements agree with the information given in the reading passage?\n\nStatement: The Eastgate Centre in Harare relies on high-powered mechanical chillers to air-condition its offices during peak afternoon heat.",
    options: {
      A: "TRUE",
      B: "FALSE",
      C: "NOT GIVEN"
    },
    correct_option: "B",
    explanation: "Paragraph 2 explicitly states: 'the building completely dispenses with conventional mechanical refrigeration chillers, using instead a passive thermoregulation system inspired by the subterranean architecture of African fungus-farming termites.' The statement is FALSE.",
    distractor_analysis: {
      A: "Incorrect. The entire innovation of the building is that it does NOT use mechanical chillers.",
      B: "Correct. Direct factual contradiction of the text.",
      C: "Incorrect. The absence of mechanical chillers is explicitly highlighted."
    },
    misconception: "Believing that all modern commercial mid-rise complexes must possess mechanical refrigeration chillers.",
    time_estimate_seconds: 40
  },
  {
    exam_name: "IELTS Academic",
    subject: "Reading",
    skill_domain: "True-False-Not Given",
    difficulty_tier: 2,
    passage_id: "ielts_rc_biomimetic_architecture",
    passage: PASSAGE_IELTS_BIOMIMETICS,
    question_text: "Do the following statements agree with the information given in the reading passage?\n\nStatement: Termite mounds maintain a steady interior temperature because warm air rises buoyantly through a central chimney and draws cool ambient air through peripheral tunnels.",
    options: {
      A: "TRUE",
      B: "FALSE",
      C: "NOT GIVEN"
    },
    correct_option: "A",
    explanation: "Paragraph 3 explains: 'The mound acts as a giant natural lung: metabolic heat generated by the millions of termites and their fungal combs warms internal air, causing it to rise buoyantly through a central vertical chimney flue... This rising warm air creates a low-pressure draft that draws cooler, fresh ambient air through an extensive subterranean network of peripheral tunnels.' The statement is TRUE.",
    distractor_analysis: {
      A: "Correct. Exactly captures the buoyancy and draft mechanism described in paragraph 3.",
      B: "Incorrect. The text confirms the mechanism.",
      C: "Incorrect. The mechanism is explained in detail."
    },
    misconception: "Assuming termites pump air with their wings rather than relying on thermal convective buoyancy.",
    time_estimate_seconds: 45
  },
  {
    exam_name: "IELTS Academic",
    subject: "Reading",
    skill_domain: "Inference and Implication",
    difficulty_tier: 3,
    passage_id: "ielts_rc_biomimetic_architecture",
    passage: PASSAGE_IELTS_BIOMIMETICS,
    question_text: "According to Paragraph 4, how does the Eastgate Centre utilize 'night-purge ventilation' to regulate temperature?",
    options: {
      A: "By spraying cold refrigerated water onto the roof every midnight.",
      B: "By pulling cool nighttime air through basement plenums and hollow floors to flush out absorbed heat and cool the building's thermal mass for the next day.",
      C: "By opening glass windows during midday rainstorms.",
      D: "By setting fire to underground woodchips to create vacuum pressure."
    },
    correct_option: "B",
    explanation: "Paragraph 4 explains: 'At night, when outdoor air temperatures plummet, high-volume electrical fans pull cool ambient air through deep subterranean basement plenums, circulating it through hollow concrete floors to flush out absorbed heat and cool the building's structural fabric.'",
    distractor_analysis: {
      A: "Incorrect. Water spraying on roofs is unmentioned.",
      B: "Correct. Accurately describes the night-purge mechanism flushing thermal mass with cool night air.",
      C: "Incorrect. Windows are not opened during midday heat.",
      D: "Incorrect. Absurd and destructive."
    },
    misconception: "Confusing passive thermal mass purging with active refrigeration.",
    time_estimate_seconds: 45
  },
  {
    exam_name: "IELTS Academic",
    subject: "Reading",
    skill_domain: "Headings and Main Idea Matching",
    difficulty_tier: 2,
    passage_id: "ielts_rc_biomimetic_architecture",
    passage: PASSAGE_IELTS_BIOMIMETICS,
    question_text: "Which heading best describes the subject of Paragraph 1?",
    options: {
      A: "The biological reproductive cycle of subterranean termites",
      B: "The high energy consumption of conventional HVAC systems and the turn to biomimicry",
      C: "Architectural construction costs in colonial Zimbabwe",
      D: "Manufacturing solar panels from recycled masonry"
    },
    correct_option: "B",
    explanation: "Paragraph 1 outlines the environmental problem: commercial HVAC systems consume 40% of building energy, prompting architects to look toward biomimicry for sustainable climate control.",
    distractor_analysis: {
      A: "Incorrect. Termites are introduced in Paragraph 2 and 3.",
      B: "Correct. Accurately summarizes the problem (HVAC energy burden) and the proposed solution (biomimicry).",
      C: "Incorrect. Colonial history is unmentioned.",
      D: "Incorrect. Solar panels are unmentioned."
    },
    misconception: "Selecting termite biological details that only appear later in the passage.",
    time_estimate_seconds: 40
  },
  {
    exam_name: "IELTS Academic",
    subject: "Reading",
    skill_domain: "Summary Completion",
    difficulty_tier: 2,
    passage_id: "ielts_rc_biomimetic_architecture",
    passage: PASSAGE_IELTS_BIOMIMETICS,
    question_text: "Complete the summary below using NO MORE THAN TWO WORDS from the passage:\n\nBecause of its termite-inspired design, the Eastgate Centre consumes less than _______ of the energy of an equivalent conventionally air-conditioned building in Harare.",
    options: {
      A: "ten percent",
      B: "fifty percent",
      C: "five percent",
      D: "one percent"
    },
    correct_option: "A",
    explanation: "Paragraph 5 states: 'The Eastgate Centre consumes less than ten percent of the energy of an equivalent conventionally air-conditioned office building in Harare...'",
    distractor_analysis: {
      A: "Correct. Exactly matches the quantitative percentage stated in paragraph 5.",
      B: "Incorrect. Overestimates energy consumption.",
      C: "Incorrect. Inaccurate numerical figure.",
      D: "Incorrect. Exaggerates energy savings beyond the stated text."
    },
    misconception: "Misremembering the numerical metric (10%) from paragraph 5.",
    time_estimate_seconds: 35
  },

  // --------------------------------------------------------------------------
  // Passage 6: Glacial Hydrology & Subglacial Meltwater (5 items)
  // --------------------------------------------------------------------------
  {
    exam_name: "IELTS Academic",
    subject: "Reading",
    skill_domain: "True-False-Not Given",
    difficulty_tier: 2,
    passage_id: "ielts_rc_glacial_hydrology",
    passage: PASSAGE_IELTS_GLACIAL,
    question_text: "Do the following statements agree with the information given in the reading passage?\n\nStatement: Subglacial meltwater acting as a hydraulic lubricant can reduce friction between glaciers and bedrock, accelerating ice stream movement toward the sea.",
    options: {
      A: "TRUE",
      B: "FALSE",
      C: "NOT GIVEN"
    },
    correct_option: "A",
    explanation: "Paragraph 2 states: 'When subglacial water accumulates at the ice-bedrock interface, it decouples the glacier from its underlying substrate, acting as a high-pressure hydraulic lubricant that reduces basal shear resistance to near zero and allowing entire continental ice streams to surge seaward at velocities of several kilometers per year.' The statement is TRUE.",
    distractor_analysis: {
      A: "Correct. Precisely confirms the lubrication and acceleration mechanism in paragraph 2.",
      B: "Incorrect. The text affirms this mechanism.",
      C: "Incorrect. The lubrication role of meltwater is explicitly described."
    },
    misconception: "Believing that ice sheets only melt on the surface.",
    time_estimate_seconds: 40
  },
  {
    exam_name: "IELTS Academic",
    subject: "Reading",
    skill_domain: "True-False-Not Given",
    difficulty_tier: 3,
    passage_id: "ielts_rc_glacial_hydrology",
    passage: PASSAGE_IELTS_GLACIAL,
    question_text: "Do the following statements agree with the information given in the reading passage?\n\nStatement: Numerical climate models developed in the 1980s accurately modeled subglacial lakes and basal hydrology.",
    options: {
      A: "TRUE",
      B: "FALSE",
      C: "NOT GIVEN"
    },
    correct_option: "B",
    explanation: "Paragraph 1 states: 'In early numerical climate models, ice sheet melt was treated primarily as a slow, surface-mediated thermodynamic process... Over the past two decades, however, satellite radar... dismantled this simplistic model, revealing that dynamic basal hydrology... exerts a far more decisive control...' The statement claiming early models accurately captured subglacial lakes is FALSE.",
    distractor_analysis: {
      A: "Incorrect. Early models completely overlooked basal hydrology.",
      B: "Correct. Factual contradiction: early models treated melt as simplistic surface runoff.",
      C: "Incorrect. The inadequacy of early models is explicitly described."
    },
    misconception: "Assuming historical climate models were as sophisticated as modern radar-informed models.",
    time_estimate_seconds: 45
  },
  {
    exam_name: "IELTS Academic",
    subject: "Reading",
    skill_domain: "Headings and Main Idea Matching",
    difficulty_tier: 3,
    passage_id: "ielts_rc_glacial_hydrology",
    passage: PASSAGE_IELTS_GLACIAL,
    question_text: "Which heading best describes Paragraph 3?",
    options: {
      A: "The vulnerability of retrograde bed slopes and grounding lines to warm oceanic water intrusion",
      B: "The commercial extraction of freshwater from iceberg calving",
      C: "Submarine fiber-optic cable installation in Antarctica",
      D: "The chemical composition of volcanic basalt under ice"
    },
    correct_option: "A",
    explanation: "Paragraph 3 explains the vulnerability of grounding lines on retrograde bed slopes, where deep bedrock slopes inland and warm Circumpolar Deep Water triggers accelerated melting.",
    distractor_analysis: {
      A: "Correct. Accurately synthesizes the grounding line, retrograde slope, and warm water intrusion dynamics.",
      B: "Incorrect. Commercial iceberg towing is unmentioned.",
      C: "Incorrect. Telecommunications cables are unmentioned.",
      D: "Incorrect. Basalt composition is not the focus of Paragraph 3."
    },
    misconception: "Missing the specific geological hazard of the retrograde bed slope.",
    time_estimate_seconds: 45
  },
  {
    exam_name: "IELTS Academic",
    subject: "Reading",
    skill_domain: "Summary Completion",
    difficulty_tier: 3,
    passage_id: "ielts_rc_glacial_hydrology",
    passage: PASSAGE_IELTS_GLACIAL,
    question_text: "Complete the summary below using NO MORE THAN THREE WORDS from the passage:\n\nUnder Marine Ice Sheet Instability theory, once ice retreat begins across a retrograde bed slope, the discharge of ice into the sea becomes self-sustaining and _______ because ice flux increases as grounding lines retreat into deeper, thicker ice.",
    options: {
      A: "irreversible",
      B: "intermittent",
      C: "negligible",
      D: "symmetric"
    },
    correct_option: "A",
    explanation: "Paragraph 4 explicitly states: 'Consequently, once a retreat is initiated across a retrograde bed slope, the process becomes self-sustaining and irreversible: deeper water leads to faster melting...'",
    distractor_analysis: {
      A: "Correct. Verbatim word from paragraph 4.",
      B: "Incorrect. The text states it is continuous and self-sustaining, not intermittent.",
      C: "Incorrect. The ice flux is colossal, not negligible.",
      D: "Incorrect. Unmentioned mathematical term."
    },
    misconception: "Overlooking the word 'irreversible' in paragraph 4.",
    time_estimate_seconds: 40
  },
  {
    exam_name: "IELTS Academic",
    subject: "Reading",
    skill_domain: "Sentence Completion",
    difficulty_tier: 2,
    passage_id: "ielts_rc_glacial_hydrology",
    passage: PASSAGE_IELTS_GLACIAL,
    question_text: "Complete the sentence below using NO MORE THAN TWO WORDS from the passage:\n\nThe boundary where a grounded ice sheet lifts off bedrock to become a floating ice shelf is called the _______.",
    options: {
      A: "grounding line",
      B: "firn zone",
      C: "calving front",
      D: "shear margin"
    },
    correct_option: "A",
    explanation: "Paragraph 3 explicitly defines: 'the \"grounding line\"—the critical boundary where a land-based ice sheet lifts off the bedrock substrate and transitions into a floating ice shelf over the ocean.'",
    distractor_analysis: {
      A: "Correct. Verbatim two-word technical glaciological term defined in paragraph 3.",
      B: "Incorrect. Firn zone refers to compressed snow on the surface.",
      C: "Incorrect. Calving front is where icebergs break off into open water.",
      D: "Incorrect. Shear margin borders lateral ice streams."
    },
    misconception: "Confusing the grounding line (subsurface lift-off point) with the calving front (outer ocean terminus).",
    time_estimate_seconds: 35
  },

  // --------------------------------------------------------------------------
  // Passage 7: Bilingualism & Cognitive Reserve (5 items)
  // --------------------------------------------------------------------------
  {
    exam_name: "IELTS Academic",
    subject: "Reading",
    skill_domain: "True-False-Not Given",
    difficulty_tier: 2,
    passage_id: "ielts_rc_bilingualism_reserve",
    passage: PASSAGE_IELTS_BILINGUALISM,
    question_text: "Do the following statements agree with the information given in the reading passage?\n\nStatement: In a bilingual individual's brain, both language systems remain active simultaneously even when the person is actively communicating in only one tongue.",
    options: {
      A: "TRUE",
      B: "FALSE",
      C: "NOT GIVEN"
    },
    correct_option: "A",
    explanation: "Paragraph 2 explicitly states: 'In a bilingual individual, both linguistic systems remain continuously active in the brain, even when the speaker is conversing in only one language.' The statement is TRUE.",
    distractor_analysis: {
      A: "Correct. Exactly matches the text in paragraph 2.",
      B: "Incorrect. The text confirms joint activation.",
      C: "Incorrect. The neurological phenomenon is explicitly described."
    },
    misconception: "Assuming that speaking one language completely deactivates the second language in the brain.",
    time_estimate_seconds: 40
  },
  {
    exam_name: "IELTS Academic",
    subject: "Reading",
    skill_domain: "True-False-Not Given",
    difficulty_tier: 3,
    passage_id: "ielts_rc_bilingualism_reserve",
    passage: PASSAGE_IELTS_BILINGUALISM,
    question_text: "Do the following statements agree with the information given in the reading passage?\n\nStatement: Lifelong bilingualism physically prevents the biological accumulation of amyloid-beta plaques in brain tissue.",
    options: {
      A: "TRUE",
      B: "FALSE",
      C: "NOT GIVEN"
    },
    correct_option: "B",
    explanation: "Paragraph 5 explicitly states: 'Crucially, post-mortem neuroanatomical examinations revealed that bilingual patients had accrued identical, or even more extensive, amyloid-beta plaques and brain atrophy compared to monolinguals showing the same degree of cognitive impairment.' Bilingualism does NOT prevent the physical molecular pathology; it compensates for it. The statement is FALSE.",
    distractor_analysis: {
      A: "Incorrect. The text clearly states bilinguals still accumulate identical or greater plaque loads.",
      B: "Correct. Factual contradiction: bilingualism does not stop physical plaque accumulation.",
      C: "Incorrect. Post-mortem amyloid plaque levels are explicitly detailed."
    },
    misconception: "Confusing delaying behavioral dementia symptoms with preventing the physical underlying disease pathology.",
    time_estimate_seconds: 45
  },
  {
    exam_name: "IELTS Academic",
    subject: "Reading",
    skill_domain: "Inference and Implication",
    difficulty_tier: 3,
    passage_id: "ielts_rc_bilingualism_reserve",
    passage: PASSAGE_IELTS_BILINGUALISM,
    question_text: "According to the 'cognitive reserve' hypothesis described in the final paragraph, how does bilingualism protect against dementia?",
    options: {
      A: "By dissolving neurofibrillary tangles using dietary enzymes.",
      B: "By developing flexible alternative neural pathways and heightened neural efficiency through decades of language switching, enabling the brain to compensate for severe physical damage.",
      C: "By causing the brain to grow an extra cerebral hemisphere.",
      D: "By completely restoring youthful hearing and vision in elderly patients."
    },
    correct_option: "B",
    explanation: "The final sentence explains: 'the enhanced neural efficiency and flexible alternative neural circuits developed through decades of bilingual language control allow the brain to compensate for severe physical damage, keeping the individual cognitively intact...'",
    distractor_analysis: {
      A: "Incorrect. Enzymes dissolving tangles is unmentioned.",
      B: "Correct. Accurately synthesizes the compensatory neural efficiency and alternative circuits mechanism.",
      C: "Incorrect. Biological impossibility.",
      D: "Incorrect. Sensory hearing/vision restoration is not part of cognitive reserve."
    },
    misconception: "Assuming biological cure rather than functional cognitive compensation.",
    time_estimate_seconds: 45
  },
  {
    exam_name: "IELTS Academic",
    subject: "Reading",
    skill_domain: "Headings and Main Idea Matching",
    difficulty_tier: 2,
    passage_id: "ielts_rc_bilingualism_reserve",
    passage: PASSAGE_IELTS_BILINGUALISM,
    question_text: "Which heading best summarizes Paragraph 4 of the passage on bilingualism?",
    options: {
      A: "Delayed onset of clinical dementia symptoms in lifelong bilingual patients",
      B: "Techniques for teaching toddlers foreign languages in nurseries",
      C: "Pharmaceutical clinical trials for Alzheimer's vaccines",
      D: "Historical linguistic surveys in eighteenth-century Toronto"
    },
    correct_option: "A",
    explanation: "Paragraph 4 discusses Bialystok's epidemiological research in Toronto and Hyderabad, showing that bilingual patients manifested initial clinical dementia symptoms four to five years later than monolinguals.",
    distractor_analysis: {
      A: "Correct. Directly captures the four-to-five-year delay in dementia symptoms.",
      B: "Incorrect. Toddler nursery education is not in Paragraph 4.",
      C: "Incorrect. Pharmaceutical vaccine trials are unmentioned.",
      D: "Incorrect. 18th-century linguistic history is unmentioned."
    },
    misconception: "Selecting general language learning topics rather than clinical dementia delay.",
    time_estimate_seconds: 40
  },
  {
    exam_name: "IELTS Academic",
    subject: "Reading",
    skill_domain: "Summary Completion",
    difficulty_tier: 2,
    passage_id: "ielts_rc_bilingualism_reserve",
    passage: PASSAGE_IELTS_BILINGUALISM,
    question_text: "Complete the summary below using NO MORE THAN THREE WORDS from the passage:\n\nLifelong bilingual individuals exhibit superior reaction times and lower error rates on non-linguistic tests of _______, such as the Stroop or flanker tasks, due to continuous practice in suppressing linguistic interference.",
    options: {
      A: "attentional task-switching",
      B: "mathematical calculus",
      C: "visual painting ability",
      D: "musical pitch detection"
    },
    correct_option: "A",
    explanation: "Paragraph 2 defines executive function components, highlighting 'attentional task-switching,' and paragraph 3 confirms that bilinguals excel in non-linguistic task-switching tests like the Stroop and flanker tasks.",
    distractor_analysis: {
      A: "Correct. Verbatim phrase from the executive function suite described in the text.",
      B: "Incorrect. Mathematical calculus is not tested by the flanker task.",
      C: "Incorrect. Painting is unrelated.",
      D: "Incorrect. Musical pitch is unrelated to executive task switching."
    },
    misconception: "Confusing general academic intelligence with specific executive function task-switching.",
    time_estimate_seconds: 40
  }
];
