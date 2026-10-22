// Path: lib/data/banks/toefl/comprehension.ts
import type { SeedQuestion } from "../../question-bank-seed";

// ============================================================================
// TOEFL iBT READING COMPREHENSION PASSAGES & QUESTIONS (35 items)
// Long academic reading passages (600-750 words) with multi-question task sets:
// Factual Information, Negative Factual, Inference & Rhetorical Purpose,
// Sentence Simplification, and Insert Text [■] placement.
// ============================================================================

// ----------------------------------------------------------------------------
// Passage 1: Subduction Zones and Mantle Dynamics (640 words)
// ----------------------------------------------------------------------------
const PASSAGE_TOEFL_SUBDUCTION = `Plate tectonics fundamentally governs the terrestrial rock cycle, orchestrating the continuous creation, deformation, and destruction of Earth's lithosphere. While seafloor spreading at divergent mid-ocean ridges generates juvenile oceanic crust, convergent plate boundaries serve as planetary recycling zones where dense oceanic lithosphere descends into the asthenosphere along subduction zones. [■ A] These convergent zones are the primary engines of planetary volcanism, generating colossal volcanic island arcs—such as the Japanese archipelago and the Aleutian Islands—alongside devastating megathrust earthquakes.

The primary mechanical driver of subduction is "slab pull." As young oceanic crust travels away from spreading centers, it steadily cools, accreting dense peridotite rock from the uppermost mantle onto its underside. Over tens of millions of years, the cooling oceanic plate thickens and densifies until its aggregate density exceeds that of the underlying hotter asthenosphere. Once the leading edge of this chilled, dense slab bends and descends into a subduction trench, negative buoyancy exerts a gravitational dragging force that pulls the remainder of the oceanic plate behind it. Geodynamic simulations indicate that slab pull accounts for up to ninety percent of total plate tectonic driving forces, dwarfing the secondary contributions of mid-ocean "ridge push."

As the hydrated oceanic slab descends into the searing mantle, it experiences escalating temperatures and hydrostatic pressures. These extreme conditions trigger metamorphic dehydration reactions: hydrous minerals within the marine basalt—such as serpentinite and chlorite—break down, releasing superheated water and volatile gases into the overlying wedge of mantle peridotite. [■ B] Crucially, the introduction of volatile water lowers the melting point of the mantle rock through a process known as flux melting. Rather than heating the rock further, the water acts as a chemical flux, inducing partial melting of the peridotite at temperatures far below its dry solidus.

The resulting basaltic magma, possessing lower density than the surrounding solid mantle rock, ascends buoyantly through the overlying lithosphere. As the magma rises, it pools in subterranean magma chambers beneath the crust, undergoing fractional crystallization and assimilating silica-rich continental rock. This differentiation transforms the primitive basaltic melt into explosive, silica-rich andesitic and dacitic magmas that feed violent stratovolcanoes at the surface. 

Seismologists trace the precise trajectory of descending slabs using Wadati-Benioff zones—inclined planes of seismic hypocenters that extend from shallow ocean trenches down to depths of roughly seven hundred kilometers. [■ C] Shallow earthquakes along the plate boundary result from brittle friction between the overriding and underthrusting plates, producing the planet's most energetic megathrust quakes. Below three hundred kilometers, however, crushing pressures should theoretically prevent brittle shear fracturing. Seismologists hypothesize that deep-focus earthquakes are instead triggered by transformational faulting: under immense pressure, metastable olivine within the cold core of the descending slab abruptly collapses into a denser spinel crystal structure, inducing localized shear instability and acoustic shockwaves.

At depths exceeding seven hundred kilometers, the descending slab encounters the transition zone between the upper and lower mantle. Here, seismic tomography reveals that some slabs flatten out and stall, pooling horizontally along the 660-kilometer discontinuity due to phase-change buoyancy resistance. Other slabs, having achieved sufficient mass, penetrate into the lower mantle, descending over hundreds of millions of years all the way to the core-mantle boundary (the D″ layer), where their thermal remnants stimulate rising mantle plumes that drive hot-spot volcanism elsewhere on the globe. [■ D]`;

// ----------------------------------------------------------------------------
// Passage 2: Hydraulic Engineering of the Ancient Maya (620 words)
// ----------------------------------------------------------------------------
const PASSAGE_TOEFL_MAYA = `The flourishing of Classic Maya civilization (250–900 CE) across the tropical lowlands of the Yucatán Peninsula presents a profound hydrological paradox. The southern Maya lowlands—where monumental urban centers like Tikal, Calakmul, and Caracol supported millions of inhabitants—are characterized by a karst geological landscape composed of highly porous limestone bedrock. Surface rainfall percolates almost instantaneously through the permeable limestone into subterranean caves and deep groundwater aquifers, leaving the surface landscape devoid of permanent rivers, freshwater lakes, or perennial streams. [■ A]

Compounding this hydrogeological deficit was a fiercely seasonal climate. The Maya lowlands experience a pronounced annual drought lasting from January through May, during which rainfall ceases almost entirely. To sustain massive urban populations and extensive agricultural production through these five-month dry spells, Maya city-states engineered sophisticated, large-scale rainwater harvesting, filtration, and storage systems that represented masterworks of pre-industrial hydraulic engineering.

At the epicenter of urban water management were monumental civic reservoirs. In Tikal, engineers quarrying limestone blocks to build ceremonial pyramids and palaces strategically converted the resulting quarry depressions into sealed municipal reservoirs. They coated the reservoir beds with thick layers of impermeable plaster and mortared stones to prevent subterranean seepage. Furthermore, urban planners paved vast public plazas and causeways with sloping gradients that funneled seasonal torrential rainfall into sophisticated filtration basins. [■ B] Archaeological excavations at Tikal's Corriental reservoir revealed that the Maya constructed sand and zeolite filtration beds at reservoir intake points. Zeolite, a microporous volcanic mineral with natural molecular-sieving and cation-exchange properties, removed harmful heavy metals, cyanobacterial toxins, and waterborne pathogens, providing thousands of citizens with remarkably clean drinking water.

In residential sectors, households collected rainwater from rooftops, channeling runoff into bell-shaped subterranean cisterns known as *chultuns*. Plastered internally with impervious stucco, a single *chultun* could store up to thirty thousand liters of freshwater, supplying a domestic family throughout the prolonged dry season. [■ C]

Beyond municipal drinking supplies, Maya engineers transformed wetland ecology to sustain intensive agriculture. In swampy, seasonally inundated depressions called *bajos*, farmers excavated extensive networks of drainage canals and piled nutrient-rich organic sediment into elevated agricultural platforms known as raised fields (*chinampas*). These canals performed multiple symbiotic functions: they drained waterlogged soils during the rainy season, conserved moisture for irrigation during droughts, and fostered thriving populations of fish and freshwater mollusks whose waste provided natural nitrogenous fertilizer for crops of maize, beans, and squash.

However, this sophisticated hydraulic infrastructure created acute systemic vulnerability. Because the immense reservoirs depended entirely on seasonal rainfall for annual replenishment, the civilization was dangerously exposed to multidecadal megadroughts. [■ D] Terminal Classic paleoclimatological data—derived from stalagmites and lake sediment cores—reveal that prolonged megadroughts struck the region in the ninth and tenth centuries. When consecutive rainy seasons failed, the reservoirs desiccated, triggering widespread agricultural collapse, municipal social unrest, and the eventual abandonment of monumental Classic Maya urban centers.`;

// ----------------------------------------------------------------------------
// Passage 3: Deep-Sea Bioluminescence and Photobiology (630 words)
// ----------------------------------------------------------------------------
const PASSAGE_TOEFL_BIOLUMINESCENCE = `Below a depth of one thousand meters, the ocean enters the bathypelagic zone, a vast, pitch-black realm permanently devoid of solar illumination. Under crushing hydrostatic pressures and temperatures hovering near freezing, life has evolved extraordinary sensory adaptations. Chief among these is bioluminescence—the biological production and emission of light through chemical reactions within living organisms. Marine biologists estimate that over seventy-five percent of deep-sea pelagic organisms, ranging from dinoflagellates and jellyfish to crustaceans and cephalopods, possess the capacity to emit bioluminescent light. [■ A]

The biochemical mechanism of marine bioluminescence relies on the enzymatic oxidation of an organic substrate called luciferin, catalyzed by an enzyme termed luciferase. In the presence of molecular oxygen and, in certain species, chemical cofactors such as adenosine triphosphate (ATP) or calcium ions, luciferase oxidizes luciferin into an unstable, electronically excited intermediate. As this intermediate decays back to its electronic ground state, it releases energy in the form of cold, visible photons. Because blue-green light (wavelengths around 470 to 490 nanometers) exhibits the lowest absorption and scattering coefficients in clear seawater, the vast majority of marine bioluminescent emissions are blue-green, maximizing visibility in the aquatic medium.

Bioluminescent emissions serve diverse behavioral and ecological functions, which biologists categorize into predation, defense, and intraspecific signaling. [■ B] For predatory purposes, deep-sea anglerfish (*Ceratiidae*) dangle a modified dorsal fin spine—the illicium—tipped with a glowing bulbous organ called the esca. The esca is populated by millions of symbiotic bioluminescent bacteria (*Photobacterium*), which the anglerfish nourishes with blood nutrients. Lured by the glowing beacon in the pitch-black void, curious fish approach the lure, only to be snapped up by the anglerfish's cavernous jaws.

In defensive contexts, bioluminescence provides remarkable camouflage through counter-illumination. Many mesopelagic animals, including lanternfish and hatchetfish, dwell in the twilight zone (200 to 1,000 meters) where dim, downwelling daylight creates sharp silhouettes against the illuminated surface. To disguise their presence from upward-looking apex predators, these fish utilize ventral photophores—light-emitting organs aligned along their bellies. By dynamically modulating the intensity and wavelength of their ventral luminescence to match downwelling sunlight, the fish effectively erase their ventral silhouettes, rendering themselves virtually invisible from below. [■ C]

Other marine species employ bioluminescence as an evasive diversion. When attacked by predators, deep-sea ostracods and decapods squirt luminous bioluminescent clouds into the water. The brilliant flash temporarily blinds the predator's dark-adapted retinas and creates a phantom target, allowing the prey to escape into the surrounding darkness. Furthermore, this glowing plume can attract secondary apex predators to attack the primary attacker, a defensive strategy known as the "burglar alarm" hypothesis.

Finally, bioluminescence facilitates species-specific communication and mate recognition. Many deep-sea squids and polychaete worms flash complex, rhythmic photophore patterns to identify conspecifics and attract reproductive mates across the vast, sparsely populated oceanic abyss. [■ D]`;

// ----------------------------------------------------------------------------
// Passage 4: Pterosaur Aerodynamics and Skeletal Pneumatization (640 words)
// ----------------------------------------------------------------------------
const PASSAGE_TOEFL_PTEROSAURS = `Pterosaurs, the formidable flying reptiles of the Mesozoic Era, were the first vertebrates to achieve powered, flapping flight, dominating prehistoric skies for over one hundred and fifty million years before perishing in the end-Cretaceous mass extinction. Spanning an astonishing evolutionary spectrum—from early Jurassic species no larger than a sparrow to gargantuan late Cretaceous azhdarchids like *Quetzalcoatlus northropi*, which possessed wingspans exceeding ten meters and stood as tall as a giraffe—pterosaurs achieved aerodynamic performance that long bewildered biomechanical engineers. [■ A]

Central to the aerodynamic success of giant pterosaurs was the radical structural adaptation of their flight membrane, known as the patagium. Unlike bird wings, which consist of overlapping keratin feathers supported by forelimb bones, the pterosaur wing was an organic composite membrane stretching from the elongated fourth manual digit (the ring finger) all the way to the hind limbs. Far from being a flimsy sheet of skin, histological analyses reveal that the patagium was a sophisticated multi-layered tissue containing an external epidermis, blood vessels, a bed of striated muscle fibers, and an internal structural grid of closely spaced, non-collapsible fibers known as actinofibrils. These stiffened keratinous actinofibrils prevented the wing membrane from ballooning or fluttering uncontrollably under aerodynamic lift, allowing pterosaurs to dynamically adjust wing camber and span during complex maneuvers.

Equally transformative was the extreme structural optimization of the pterosaur skeleton. To minimize weight without sacrificing mechanical strength, pterosaur bones underwent intense evolutionary pneumatization. [■ B] The interior of their long bones and vertebrae was hollowed out by an invasive pulmonary air sac system, identical to that found in modern birds. Cross-sectional micro-tomography reveals that the walls of large pterosaur wing bones were as thin as a millimeter, reinforced internally by delicate, strut-like trabecular trusses. This tubular, foam-like internal architecture conferred exceptional torsional rigidity and resistance to bending stress, keeping the total body mass of giant azhdarchids surprisingly low—estimated at between two hundred and two hundred and fifty kilograms.

For decades, paleontologists debated how giant azhdarchids, burdened with immense wingspans, could physically launch themselves into the air. Early aerodynamic models assumed pterosaurs launched bipedally, running downhill like albatrosses or leaping with their hind legs. Biomechanical analysis by Michael Habib, however, demonstrated that bipedal launching was physically impossible for animals weighing over two hundred kilograms, as hindlimb bones lacked the fracture resistance required to generate sufficient vertical takeoff velocity. [■ C]

Instead, Habib proved that pterosaurs executed a quadrupedal vault launch. Utilizing their colossal forelimbs—which bore the powerful pectoral and deltoid flight musculature—pterosaurs rocked back onto their hind legs before vaulting explosively forward, vaulting off the ground with a massive downward push from their forelimb knuckles. Because the forelimbs were far sturdier than the hindlimbs and housed the primary flight muscles, this quadrupedal leap generated immense upward thrust, catapulting the creature several meters into the air and allowing its giant wings to achieve instantaneous aerodynamic clearance. [■ D]`;

// ----------------------------------------------------------------------------
// Passage 5: The Chemistry and Technique of Italian Renaissance Fresco (610 words)
// ----------------------------------------------------------------------------
const PASSAGE_TOEFL_FRESCO = `During the Italian Renaissance, fresco painting—the technique of executing monumental wall murals on wet lime plaster—stood as the supreme medium for civic and ecclesiastical artistic commissions. Celebrated masterworks, such as Giotto's Arena Chapel in Padua and Michelangelo's Sistine Chapel ceiling in Rome, owe their enduring brilliance to the unique chemical reaction that permanently binds mineral pigments directly into the building's architectural fabric. [■ A]

The fundamental chemistry of authentic fresco, known historically as *buon fresco* ("true fresco"), relies on the transformation of limestone (calcium carbonate, $\\text{CaCO}_3$). To manufacture fresco plaster, limestone is first quarried and heated in industrial kilns to over 900°C, driving off carbon dioxide gas to produce caustic quicklime (calcium oxide, $\\text{CaO}$). The quicklime is subsequently slaked by immersion in water, an intensely exothermic chemical reaction that yields hydrated lime (calcium hydroxide, $\\text{Ca(OH)}_2$), a smooth, pasty white putty that is aged for months or years in subterranean vats.

To prepare a masonry wall for painting, masons apply multiple successive coats of plaster. First, a rough preparatory coat called the *arriccio*—composed of slaked lime mixed with coarse volcanic sand—is troweled onto the bare stone or brick wall to absorb moisture and create a level surface. Once the *arriccio* dries, artists transfer their preliminary compositional drawings, often executed in reddish-brown pigment (*sinopia*) or transferred from full-scale perforated paper cartoons dusted with charcoal powder.

Immediately prior to painting, the mason applies the final, ultra-smooth painting plaster coat, the *intonaco*, consisting of fine slaked lime and crushed river sand or marble dust. [■ B] Crucially, the *intonaco* must be applied only in patches sized for a single day's work, a unit known as a *giornata* (derived from the Italian word for "day"). The artist must paint rapidly upon the moist *intonaco* using ground mineral pigments suspended purely in distilled water.

The permanence of *buon fresco* does not rely on glue, egg yolk, or oil binders. Rather, as the moist *intonaco* dries, the calcium hydroxide in the plaster absorbs carbon dioxide ($\\text{CO}_2$) directly from ambient air. This chemical carbonation reaction reconstitutes the calcium hydroxide into solid calcium carbonate (limestone):
$$\\text{Ca(OH)}_2 + \\text{CO}_2 \\rightarrow \\text{CaCO}_3 + \\text{H}_2\\text{O}$$
As the calcium carbonate crystal lattice forms, it physically encapsulates the microscopic pigment particles within an impermeable, glassy crystalline limestone matrix. The painting is no longer an applied surface layer of paint; it has literally become part of the stone wall.

However, the unforgiving nature of *buon fresco* imposed severe artistic constraints. Because wet plaster chemically reacts with and discolors certain organic and metallic pigments, artists could not use azurite blue, malachite green, or lead white in *buon fresco*. [■ C] These volatile pigments had to be applied *a secco* ("on dry plaster") after the wall had dried, utilizing egg tempera or animal glue binders. Unfortunately, because *secco* paint layers sit loosely on the wall surface rather than being encapsulated within crystalline limestone, they are acutely vulnerable to moisture degradation, frequently flaking off over centuries and leaving only the underlying *buon fresco* intact. [■ D]`;

// ----------------------------------------------------------------------------
// Passage 6: Physiological Adaptations of Desert Xerophytes (620 words)
// ----------------------------------------------------------------------------
const PASSAGE_TOEFL_XEROPHYTES = `In arid and hyper-arid desert biomes, where annual precipitation regularly falls below two hundred millimeters and vapor pressure deficits drive extreme evaporation rates, terrestrial plants confront a life-or-death physiological trade-off. To harvest solar photons for photosynthesis, a plant must open its microscopic leaf pores—the stomata—to absorb atmospheric carbon dioxide ($\\text{CO}_2$). However, for every single molecule of carbon dioxide that diffuses into the leaf, hundreds of water molecules evaporate outward into the desiccating ambient air through transpiration. [■ A] To survive this severe dehydrating gradient, specialized desert plants known as xerophytes have evolved a suite of morphological, anatomical, and biochemical adaptations that maximize water-use efficiency.

The most transformative evolutionary innovation among succulent xerophytes—such as cacti, agaves, and crassulas—is Crassulacean Acid Metabolism (CAM), a specialized photosynthetic pathway that temporally segregates carbon assimilation from the light reactions of photosynthesis. Conventional plants open their stomata during the daytime, when sunlight is available to generate ATP and NADPH. In stark contrast, CAM plants invert this circadian cycle: they keep their stomata tightly sealed during the scorching daytime hours, opening them exclusively during the cool night, when ambient temperatures drop and relative humidity rises.

At night, CAM xerophytes absorb carbon dioxide and fix it into a four-carbon organic acid, primarily malate, using the specialized enzyme phosphoenolpyruvate (PEP) carboxylase. The malate is subsequently pumped into large cellular central vacuoles, where it is stored safely as malic acid throughout the night. [■ B] When dawn breaks, the plant closes its stomata completely to forestall water transpiration. Throughout the sunlit day, the stored malic acid is transported out of the vacuoles into chloroplasts, where it is decarboxylated to release concentrated carbon dioxide internally. This internal pool of carbon dioxide is then fed directly to the enzyme Rubisco and converted into sugars via the Calvin cycle, utilizing sunlight without opening stomatal pores to the desert atmosphere. By shifting gas exchange to the cool night, CAM plants reduce daytime transpirational water loss by up to eighty percent compared to standard C3 vegetation.

Beyond biochemical pathways, xerophytes exhibit profound morphological adaptations to minimize thermal loading and conserve water. Many species possess micro-grooved, reflective cuticles coated with thick, hydrophobic epicuticular waxes that seal epidermal cells against non-stomatal water evaporation. [■ C] Others develop dense coverings of microscopic silver-white hairs known as trichomes. These reflective trichomes scatter intense solar radiation, lowering internal leaf temperatures, while simultaneously trapping a microscopic boundary layer of humid air against the leaf surface to reduce the transpirational vapor pressure gradient.

To store precious water during rare deluge events, succulents develop expanded cortical parenchyma tissue containing large, mucilaginous water-storage cells. Furthermore, desert xerophytes typically exhibit bimodal root architectures: extensive, shallow lateral roots fan out mere centimeters beneath the soil surface to intercept fleeting morning dew and brief desert flash rains, while a deep, vertical taproot drills meters downward into subterranean bedrock fractures to access deep groundwater reservoirs. [■ D]`;

// ----------------------------------------------------------------------------
// Passage 7: The Steam Engine and Industrial Geography (630 words)
// ----------------------------------------------------------------------------
const PASSAGE_TOEFL_STEAM_POWER = `Throughout human history prior to the eighteenth century, manufacturing and industrial production were strictly tethered to organic and somatic energy sources: human muscle, draft animals, wind, and flowing water. In early modern Britain, the flourishing wool and cotton textile trades relied almost exclusively on watermills. Consequently, proto-industrial manufacturing was geographically restricted to rural river valleys, particularly in the Pennine hills of northern England and the Scottish Lowlands, where fast-flowing upland streams could turn massive timber and iron waterwheels. [■ A]

While watermills provided renewable mechanical kinetic energy, they suffered from crippling operational constraints. Mill power was hostage to seasonal weather: during summer droughts, streams ran dry, halting factory machinery for weeks; during winter freezes, ice locked waterwheels in place, idling mill workers. Furthermore, rivers possessed fixed geographical sites with finite energy capacities; once all suitable mill sites along a river basin were claimed, regional industrial expansion reached a hard thermodynamic ceiling.

The invention and systematic refinement of the steam engine broke this thermodynamic bottleneck, initiating the modern fossil-fuel energy regime. The earliest commercial steam engine, developed by Thomas Newcomen in 1712, was an "atmospheric engine" designed specifically to pump floodwaters out of deep underground coal mines. [■ B] The Newcomen engine operated by filling a large vertical cylinder with steam and then injecting a spray of cold water directly into the cylinder. The rapid condensation of the steam created a vacuum beneath the piston, allowing atmospheric air pressure to push the piston downward, driving a subterranean pump arm. While the Newcomen engine was wildly inefficient—wasting over ninety-nine percent of its thermal energy by repeatedly cooling and reheating the massive iron cylinder—it proved economically viable at coal pitheads, where low-grade, unsellable "slack" coal was abundantly available at zero transport cost.

The revolutionary leap forward occurred in 1765 when Scottish instrument maker James Watt recognized the thermal inefficiency of the Newcomen design. Watt introduced the separate condenser: a dedicated condensation chamber kept continuously cold with cooling water, while the primary working cylinder was maintained at the temperature of boiling steam by an insulating steam jacket. By eliminating the ruinous cycle of repeatedly heating and cooling the primary cylinder, Watt's separate condenser slashed fuel consumption by over seventy-five percent. Collaborating with Birmingham industrialist Matthew Boulton, Watt subsequently adapted the engine's reciprocating up-and-down motion into continuous rotary motion using the ingenious "sun-and-planet" gear system, allowing steam power to drive spinning and weaving factory machinery directly. [■ C]

The spatial and economic consequences of Watt's rotary steam engine were monumental. By liberating factories from their rural riverbank tethers, steam power enabled industrialists to relocate manufacturing operations directly into urban centers where deep labor pools, transportation canals, and commercial financial markets converged. Rapidly industrializing cities such as Manchester, Leeds, and Birmingham transformed from modest regional market towns into sprawling metropolitan manufacturing hubs. Furthermore, the steam engine established a powerful self-reinforcing feedback loop: steam pumps enabled deeper coal extraction; coal fueled metallurgical blast furnaces to forge stronger iron and steel; and cheaper steel enabled the fabrication of larger, high-pressure steam boilers and locomotives that knit continental freight transportation networks together. [■ D]`;

// ============================================================================
// TOEFL READING COMPREHENSION QUESTIONS (35 Items: 7 Passages x 5 Questions)
// Questions conform to TOEFL iBT task formats: Factual Information,
// Negative Factual, Inference & Rhetorical Purpose, Sentence Simplification,
// and Insert Text [■].
// ============================================================================

export const TOEFL_COMPREHENSION_BANK: SeedQuestion[] = [
  // --------------------------------------------------------------------------
  // Passage 1: Subduction Zones and Mantle Dynamics (5 items)
  // --------------------------------------------------------------------------
  {
    exam_name: "TOEFL iBT",
    subject: "Reading",
    skill_domain: "Factual Information",
    difficulty_tier: 2,
    passage_id: "toefl_rc_subduction_zones",
    passage: PASSAGE_TOEFL_SUBDUCTION,
    question_text: "According to paragraph 2, why is 'slab pull' considered the dominant driving force of plate tectonics?",
    options: {
      A: "Mid-ocean ridge push generates massive thermal friction that propels continents toward trenches.",
      B: "As oceanic crust cools and accretes dense mantle rock, its aggregate density exceeds that of the hotter asthenosphere, causing negative buoyancy to drag the trailing plate downward.",
      C: "Tectonic plates are pushed from above by the weight of atmospheric pressure.",
      D: "Deep ocean currents drag oceanic trenches along the Earth's magnetic field lines."
    },
    correct_option: "B",
    explanation: "Paragraph 2 explicitly states: 'Over tens of millions of years, the cooling oceanic plate thickens and densifies until its aggregate density exceeds that of the underlying hotter asthenosphere... negative buoyancy exerts a gravitational dragging force that pulls the remainder of the oceanic plate behind it.'",
    distractor_analysis: {
      A: "Incorrect. The text says ridge push is secondary and dwarfed by slab pull.",
      B: "Correct. Precisely mirrors the text regarding cooling, densification exceeding asthenosphere density, and negative buoyancy gravitational dragging.",
      C: "Incorrect. Atmospheric pressure is not a tectonic driving force.",
      D: "Incorrect. Ocean currents and magnetic fields do not drive plate tectonics."
    },
    misconception: "Assuming ridge push from mid-ocean spreading centers is the primary driver rather than gravitational slab pull.",
    time_estimate_seconds: 50
  },
  {
    exam_name: "TOEFL iBT",
    subject: "Reading",
    skill_domain: "Factual Information",
    difficulty_tier: 2,
    passage_id: "toefl_rc_subduction_zones",
    passage: PASSAGE_TOEFL_SUBDUCTION,
    question_text: "According to paragraph 3, how does 'flux melting' produce magma above descending slabs?",
    options: {
      A: "High friction between the plates heats the crust until it turns into diamond crystals.",
      B: "Water and volatiles released from dehydrating minerals lower the melting point of the overlying peridotite mantle wedge, causing partial melting without extra heat.",
      C: "The core of the Earth erupts through volcanic vents directly into the sea.",
      D: "Subterranean lightning strikes melt underground quartz deposits."
    },
    correct_option: "B",
    explanation: "Paragraph 3 explains: 'the introduction of volatile water lowers the melting point of the mantle rock through a process known as flux melting. Rather than heating the rock further, the water acts as a chemical flux, inducing partial melting of the peridotite at temperatures far below its dry solidus.'",
    distractor_analysis: {
      A: "Incorrect. High friction does not generate the primary mantle wedge melt.",
      B: "Correct. Accurately explains that volatiles lower the melting point (solidus) of the peridotite mantle wedge.",
      C: "Incorrect. Magma comes from the mantle wedge, not the Earth's metallic core.",
      D: "Incorrect. Fabricated and unscientific."
    },
    misconception: "Believing that magma forms because the slab becomes hotter, rather than realizing water chemically lowers the melting temperature.",
    time_estimate_seconds: 45
  },
  {
    exam_name: "TOEFL iBT",
    subject: "Reading",
    skill_domain: "Negative Factual Information",
    difficulty_tier: 3,
    passage_id: "toefl_rc_subduction_zones",
    passage: PASSAGE_TOEFL_SUBDUCTION,
    question_text: "According to the passage, all of the following are associated with subduction zones EXCEPT:",
    options: {
      A: "Megathrust earthquakes along shallow brittle plate boundaries",
      B: "The release of water from hydrous minerals like serpentinite and chlorite",
      C: "The continuous creation of new juvenile oceanic crust along divergent rift ridges",
      D: "Deep Wadati-Benioff seismic hypocenter zones extending to depths of 700 kilometers"
    },
    correct_option: "C",
    explanation: "Paragraph 1 explicitly contrasts subduction with mid-ocean ridges: juvenile oceanic crust is generated at 'divergent mid-ocean ridges,' whereas convergent subduction zones are 'planetary recycling zones where dense oceanic lithosphere descends.' Thus, creating juvenile crust at divergent rifts is NOT associated with subduction zones.",
    distractor_analysis: {
      A: "Incorrect. Megathrust quakes are explicitly mentioned in Paragraphs 1 and 5.",
      B: "Incorrect. Mineral dehydration releasing water is detailed in Paragraph 3.",
      C: "Correct. Creation of juvenile crust occurs at divergent mid-ocean ridges, the opposite of subduction zones.",
      D: "Incorrect. Wadati-Benioff zones to 700 km depth are explicitly described in Paragraph 5."
    },
    misconception: "Confusing divergent boundaries (crust creation) with convergent subduction boundaries (crust recycling).",
    time_estimate_seconds: 50
  },
  {
    exam_name: "TOEFL iBT",
    subject: "Reading",
    skill_domain: "Sentence Simplification",
    difficulty_tier: 3,
    passage_id: "toefl_rc_subduction_zones",
    passage: PASSAGE_TOEFL_SUBDUCTION,
    question_text: "Which of the following best expresses the essential information in the highlighted sentence from paragraph 2?\n\n'Once the leading edge of this chilled, dense slab bends and descends into a subduction trench, negative buoyancy exerts a gravitational dragging force that pulls the remainder of the oceanic plate behind it.'",
    options: {
      A: "Subduction trenches bend plates so that volcanic rock can rise above the surface.",
      B: "When a cold, dense oceanic plate begins sinking into a trench, its negative buoyancy pulls the rest of the plate along with it.",
      C: "Gravitational forces prevent oceanic plates from descending into subterranean trenches.",
      D: "Oceanic plates lose their buoyancy and dissolve completely before reaching the trench."
    },
    correct_option: "B",
    explanation: "Option B preserves the essential causal relationship: the leading edge sinks, and because it is cold and dense (negative buoyancy), gravity pulls the remainder of the trailing plate into the trench.",
    distractor_analysis: {
      A: "Incorrect. Ignores the gravitational pull mechanism and inserts unmentioned volcanic rising.",
      B: "Correct. Accurately and concisely captures the core meaning without distorting relationships.",
      C: "Incorrect. Contradicts the text: gravity pulls the plate down, not preventing descent.",
      D: "Incorrect. Plates do not dissolve before reaching trenches."
    },
    misconception: "Choosing options that add extraneous details or invert the gravitational pulling action.",
    time_estimate_seconds: 45
  },
  {
    exam_name: "TOEFL iBT",
    subject: "Reading",
    skill_domain: "Insert Text",
    difficulty_tier: 3,
    passage_id: "toefl_rc_subduction_zones",
    passage: PASSAGE_TOEFL_SUBDUCTION,
    question_text: "Look at the four squares [■ A], [■ B], [■ C], and [■ D] in the passage that indicate where the following sentence could be added:\n\n'These ascending thermal columns can create massive volcanic tracks in the middle of plates, such as the Hawaiian-Emperor seamount chain.'\n\nWhere would the sentence best fit?",
    options: {
      A: "[■ A]",
      B: "[■ B]",
      C: "[■ C]",
      D: "[■ D]"
    },
    correct_option: "D",
    explanation: "The final sentence of the passage ends: '...where their thermal remnants stimulate rising mantle plumes that drive hot-spot volcanism elsewhere on the globe. [■ D]'. The sentence to be inserted begins with 'These ascending thermal columns...', which directly refers back to the 'rising mantle plumes that drive hot-spot volcanism' mentioned in the preceding sentence.",
    distractor_analysis: {
      A: "Incorrect. Paragraph 1 discusses subduction plate boundaries, not intraplate mantle plumes.",
      B: "Incorrect. Paragraph 3 discusses mineral dehydration and flux melting in the mantle wedge.",
      C: "Incorrect. Paragraph 5 discusses Wadati-Benioff earthquake hypocenters.",
      D: "Correct. Seamlessly continues the discussion of mantle plumes and hot-spot volcanism at the core-mantle boundary."
    },
    misconception: "Failing to connect 'These ascending thermal columns' with 'rising mantle plumes' at the end of the passage.",
    time_estimate_seconds: 45
  },

  // --------------------------------------------------------------------------
  // Passage 2: Mayan Hydraulic Engineering (5 items)
  // --------------------------------------------------------------------------
  {
    exam_name: "TOEFL iBT",
    subject: "Reading",
    skill_domain: "Factual Information",
    difficulty_tier: 2,
    passage_id: "toefl_rc_mayan_hydraulics",
    passage: PASSAGE_TOEFL_MAYA,
    question_text: "According to paragraph 1, what natural geological feature made water management critical for Classic Maya cities?",
    options: {
      A: "Vast perennial freshwater rivers that flooded cities every spring.",
      B: "Porous karst limestone bedrock that allowed surface rainwater to drain quickly into deep underground aquifers, leaving the surface without permanent rivers or lakes.",
      C: "Glacial ice sheets that covered the Yucatán Peninsula for nine months of the year.",
      D: "Active volcanic geysers that contaminated all agricultural drinking water with sulfur."
    },
    correct_option: "B",
    explanation: "Paragraph 1 states: 'The southern Maya lowlands... are characterized by a karst geological landscape composed of highly porous limestone bedrock. Surface rainfall percolates almost instantaneously through the permeable limestone into subterranean caves and deep groundwater aquifers, leaving the surface landscape devoid of permanent rivers, freshwater lakes, or perennial streams.'",
    distractor_analysis: {
      A: "Incorrect. The text explicitly says the region lacked permanent rivers.",
      B: "Correct. Accurately details the porous limestone karst landscape and absence of surface freshwater.",
      C: "Incorrect. Glacial ice did not exist in the tropical Yucatán Peninsula.",
      D: "Incorrect. Volcanic geysers are unmentioned."
    },
    misconception: "Assuming tropical rainforests automatically have abundant surface rivers, ignoring karst drainage.",
    time_estimate_seconds: 45
  },
  {
    exam_name: "TOEFL iBT",
    subject: "Reading",
    skill_domain: "Factual Information",
    difficulty_tier: 2,
    passage_id: "toefl_rc_mayan_hydraulics",
    passage: PASSAGE_TOEFL_MAYA,
    question_text: "According to paragraph 3, what was the primary function of the zeolite mineral filtration beds discovered at Tikal?",
    options: {
      A: "To color the reservoir water a sacred ceremonial shade of blue.",
      B: "To filter out heavy metals, cyanobacterial toxins, and waterborne pathogens from municipal drinking water.",
      C: "To dissolve limestone blocks so pyramids could be constructed faster.",
      D: "To warm the reservoir water during winter cold snaps."
    },
    correct_option: "B",
    explanation: "Paragraph 3 states: 'Zeolite, a microporous volcanic mineral with natural molecular-sieving and cation-exchange properties, removed harmful heavy metals, cyanobacterial toxins, and waterborne pathogens, providing thousands of citizens with remarkably clean drinking water.'",
    distractor_analysis: {
      A: "Incorrect. Maya Blue pigment is plant/clay based, not drinking water filtration.",
      B: "Correct. Accurately mirrors the text regarding toxin and pathogen removal.",
      C: "Incorrect. Zeolite was used in water filters, not pyramid masonry dissolution.",
      D: "Incorrect. Zeolite does not heat water."
    },
    misconception: "Confusing water filtration mineral media with decorative architectural or ceremonial pigments.",
    time_estimate_seconds: 40
  },
  {
    exam_name: "TOEFL iBT",
    subject: "Reading",
    skill_domain: "Negative Factual Information",
    difficulty_tier: 3,
    passage_id: "toefl_rc_mayan_hydraulics",
    passage: PASSAGE_TOEFL_MAYA,
    question_text: "All of the following were agricultural functions performed by canal-fed raised fields (*bajos*) EXCEPT:",
    options: {
      A: "Draining waterlogged soils during the rainy season",
      B: "Conserving moisture for crop irrigation during seasonal droughts",
      C: "Providing habitat for fish and mollusks whose waste fertilized crops",
      D: "Pumping boiling mineral water from underground geothermal geysers"
    },
    correct_option: "D",
    explanation: "Paragraph 5 lists the three symbiotic functions of the canals: draining waterlogged soils, conserving moisture for drought irrigation, and rearing fish/mollusks whose waste fertilized crops. Geothermal geyser pumping is completely absent and scientifically absurd in this context.",
    distractor_analysis: {
      A: "Incorrect. Explicitly mentioned in paragraph 5.",
      B: "Incorrect. Explicitly mentioned in paragraph 5.",
      C: "Incorrect. Explicitly mentioned in paragraph 5.",
      D: "Correct. Geothermal boiling water was never used in Maya raised field agriculture."
    },
    misconception: "Conflating geothermal energy concepts from other passages with Maya agricultural wetland techniques.",
    time_estimate_seconds: 45
  },
  {
    exam_name: "TOEFL iBT",
    subject: "Reading",
    skill_domain: "Inference and Rhetorical Purpose",
    difficulty_tier: 3,
    passage_id: "toefl_rc_mayan_hydraulics",
    passage: PASSAGE_TOEFL_MAYA,
    question_text: "The author mentions 'multidecadal megadroughts' in the final paragraph primarily to:",
    options: {
      A: "Explain why Maya architecture was replaced with Roman-style brick aqueducts.",
      B: "Demonstrate that the very hydraulic infrastructure that sustained Maya cities created systemic vulnerability when consecutive annual rainy seasons failed.",
      C: "Argue that the Maya civilization was abandoned due to an asteroid impact.",
      D: "Suggest that ancient farmers preferred living in dry deserts rather than near wetlands."
    },
    correct_option: "B",
    explanation: "The author shows the double-edged sword of Maya water management: because urban survival depended entirely on annual rain replenishing massive reservoirs, prolonged megadroughts caused complete agricultural and municipal collapse.",
    distractor_analysis: {
      A: "Incorrect. Roman aqueducts were never built in the ancient Americas.",
      B: "Correct. Highlights the systemic fragility: dependence on rain-fed reservoirs meant multi-year droughts were catastrophic.",
      C: "Incorrect. Paleoclimate data shows megadroughts, not an asteroid impact.",
      D: "Incorrect. Bizarre and contradicted by the dense wetland cultivation described."
    },
    misconception: "Viewing the collapse as sudden external mystery rather than the systemic failure of rain-dependent storage during megadroughts.",
    time_estimate_seconds: 45
  },
  {
    exam_name: "TOEFL iBT",
    subject: "Reading",
    skill_domain: "Insert Text",
    difficulty_tier: 2,
    passage_id: "toefl_rc_mayan_hydraulics",
    passage: PASSAGE_TOEFL_MAYA,
    question_text: "Look at the four squares [■ A], [■ B], [■ C], and [■ D] in the passage that indicate where the following sentence could be added:\n\n'In addition, settlement surveys show that individual neighborhood clusters maintained their own communal wells and holding tanks.'\n\nWhere would the sentence best fit?",
    options: {
      A: "[■ A]",
      B: "[■ B]",
      C: "[■ C]",
      D: "[■ D]"
    },
    correct_option: "C",
    explanation: "Paragraph 4 discusses domestic and residential water storage: 'In residential sectors, households collected rainwater from rooftops, channeling runoff into bell-shaped subterranean cisterns known as chultuns... [■ C]'. The inserted sentence about neighborhood clusters maintaining communal wells and holding tanks fits naturally right after the household *chultun* discussion.",
    distractor_analysis: {
      A: "Incorrect. Paragraph 1 discusses regional karst geology.",
      B: "Incorrect. Paragraph 3 discusses monumental civic pyramid reservoirs and Corriental zeolite filters.",
      C: "Correct. Directly expands on residential neighborhood water storage after the household cistern discussion.",
      D: "Incorrect. Paragraph 6 discusses climate collapse and megadroughts."
    },
    misconception: "Placing a residential neighborhood storage detail into the large-scale civic reservoir paragraph or the geological introduction.",
    time_estimate_seconds: 40
  },

  // --------------------------------------------------------------------------
  // Passage 3: Deep-Sea Bioluminescence (5 items)
  // --------------------------------------------------------------------------
  {
    exam_name: "TOEFL iBT",
    subject: "Reading",
    skill_domain: "Factual Information",
    difficulty_tier: 2,
    passage_id: "toefl_rc_bioluminescence",
    passage: PASSAGE_TOEFL_BIOLUMINESCENCE,
    question_text: "According to paragraph 2, why is the majority of marine bioluminescent light emitted in the blue-green spectrum?",
    options: {
      A: "Blue-green light travels fastest through air.",
      B: "Blue-green wavelengths experience the lowest absorption and scattering in clear seawater, allowing light to travel farthest.",
      C: "Marine predators are genetically blind to blue and green wavelengths.",
      D: "Deep ocean water contains high concentrations of copper sulfate that tint all photons green."
    },
    correct_option: "B",
    explanation: "Paragraph 2 states: 'Because blue-green light (wavelengths around 470 to 490 nanometers) exhibits the lowest absorption and scattering coefficients in clear seawater, the vast majority of marine bioluminescent emissions are blue-green, maximizing visibility in the aquatic medium.'",
    distractor_analysis: {
      A: "Incorrect. Deep-sea emissions occur in water, not air.",
      B: "Correct. Directly captures the optical physical property: lowest absorption and scattering in seawater.",
      C: "Incorrect. Predators can see blue-green light; that is why it is used for lures and counter-illumination.",
      D: "Incorrect. Complete geochemical fabrication."
    },
    misconception: "Confusing physical transmission in water with animal sensory blindness.",
    time_estimate_seconds: 45
  },
  {
    exam_name: "TOEFL iBT",
    subject: "Reading",
    skill_domain: "Factual Information",
    difficulty_tier: 2,
    passage_id: "toefl_rc_bioluminescence",
    passage: PASSAGE_TOEFL_BIOLUMINESCENCE,
    question_text: "According to paragraph 4, how do mesopelagic fish use ventral photophores for 'counter-illumination'?",
    options: {
      A: "They project concentrated searchlight beams to blind attacking sharks.",
      B: "They emit light from their bellies that matches the intensity and color of downwelling sunlight, effectively erasing their dark silhouettes from predators swimming below.",
      C: "They illuminate seabed caves to find buried worms.",
      D: "They flash red light to signal schooling companions to scatter."
    },
    correct_option: "B",
    explanation: "Paragraph 4 explains: 'By dynamically modulating the intensity and wavelength of their ventral luminescence to match downwelling sunlight, the fish effectively erase their ventral silhouettes, rendering themselves virtually invisible from below.'",
    distractor_analysis: {
      A: "Incorrect. Counter-illumination is camouflage, not a searchlight attack.",
      B: "Correct. Accurately explains matching downwelling sunlight from belly photophores to erase silhouettes.",
      C: "Incorrect. Mesopelagic fish swim in open midwater, not on the seabed.",
      D: "Incorrect. Counter-illumination utilizes blue-green light matching daylight, not red alarm flashes."
    },
    misconception: "Confusing offensive searchlight illumination with passive silhouette-erasing camouflage.",
    time_estimate_seconds: 45
  },
  {
    exam_name: "TOEFL iBT",
    subject: "Reading",
    skill_domain: "Inference and Rhetorical Purpose",
    difficulty_tier: 3,
    passage_id: "toefl_rc_bioluminescence",
    passage: PASSAGE_TOEFL_BIOLUMINESCENCE,
    question_text: "The 'burglar alarm' hypothesis described in paragraph 5 proposes that a bioluminescent flash emitted by a prey organism:",
    options: {
      A: "Alerts human coastal lifeguards to close swimming beaches.",
      B: "Attracts a larger secondary apex predator that attacks or scares away the primary predator threatening the prey.",
      C: "Instantly electrocutes any fish that approaches within three meters.",
      D: "Warms the surrounding seawater to facilitate rapid swimming."
    },
    correct_option: "B",
    explanation: "Paragraph 5 states: 'Furthermore, this glowing plume can attract secondary apex predators to attack the primary attacker, a defensive strategy known as the \"burglar alarm\" hypothesis.'",
    distractor_analysis: {
      A: "Incorrect. Deep-sea animals live kilometers below the surface, far from human lifeguards.",
      B: "Correct. Accurately defines the burglar alarm function: calling in a bigger predator to attack the initial predator.",
      C: "Incorrect. Bioluminescence emits cold light, not electric shocks.",
      D: "Incorrect. Bioluminescence produces cold photons without thermal heating."
    },
    misconception: "Assuming the burglar alarm warns other conspecifics rather than summoning a larger predator to disrupt the attack.",
    time_estimate_seconds: 45
  },
  {
    exam_name: "TOEFL iBT",
    subject: "Reading",
    skill_domain: "Sentence Simplification",
    difficulty_tier: 3,
    passage_id: "toefl_rc_bioluminescence",
    passage: PASSAGE_TOEFL_BIOLUMINESCENCE,
    question_text: "Which of the following best expresses the essential information in the highlighted sentence from paragraph 2?\n\n'In the presence of molecular oxygen and, in certain species, chemical cofactors such as adenosine triphosphate (ATP) or calcium ions, luciferase oxidizes luciferin into an unstable, electronically excited intermediate.'",
    options: {
      A: "Luciferase requires oxygen and sometimes cofactors like ATP to convert luciferin into a short-lived high-energy state.",
      B: "ATP and calcium ions prevent luciferin from emitting photons in dark seawater.",
      C: "Oxygen destroys luciferase enzymes unless high concentrations of intermediate chemicals are present.",
      D: "Electronically excited intermediates cannot decay unless exposed to surface atmospheric sunlight."
    },
    correct_option: "A",
    explanation: "Option A captures the core chemical process: the enzyme luciferase uses oxygen (and sometimes cofactors like ATP/calcium) to oxidize luciferin into an unstable, high-energy (electronically excited) intermediate.",
    distractor_analysis: {
      A: "Correct. Accurately synthesizes the essential biochemical reaction.",
      B: "Incorrect. ATP facilitates, rather than prevents, photon emission.",
      C: "Incorrect. Oxygen is a required reactant, not an enzyme-destroying poison.",
      D: "Incorrect. Decay occurs spontaneously in the abyss without sunlight."
    },
    misconception: "Selecting choices that treat required reactants (oxygen, ATP) as inhibitors.",
    time_estimate_seconds: 45
  },
  {
    exam_name: "TOEFL iBT",
    subject: "Reading",
    skill_domain: "Insert Text",
    difficulty_tier: 2,
    passage_id: "toefl_rc_bioluminescence",
    passage: PASSAGE_TOEFL_BIOLUMINESCENCE,
    question_text: "Look at the four squares [■ A], [■ B], [■ C], and [■ D] in the passage that indicate where the following sentence could be added:\n\n'Indeed, this bacterial symbiosis is so specialized that the anglerfish cannot glow without its microbial partners.'\n\nWhere would the sentence best fit?",
    options: {
      A: "[■ A]",
      B: "[■ B]",
      C: "[■ C]",
      D: "[■ D]"
    },
    correct_option: "B",
    explanation: "Paragraph 3 discusses the anglerfish's glowing esca: 'The esca is populated by millions of symbiotic bioluminescent bacteria (*Photobacterium*), which the anglerfish nourishes with blood nutrients...'. The sentence emphasizing that the anglerfish cannot glow without these microbial partners fits directly within this discussion after [■ B].",
    distractor_analysis: {
      A: "Incorrect. Paragraph 1 discusses the bathypelagic ocean in general.",
      B: "Correct. Directly elaborates on the anglerfish's bacterial symbiosis introduced in Paragraph 3.",
      C: "Incorrect. Paragraph 4 discusses counter-illumination in lanternfish.",
      D: "Incorrect. Paragraph 6 discusses mate signaling in squids."
    },
    misconception: "Placing an anglerfish bacterial symbiosis sentence into the general introduction or the squid communication conclusion.",
    time_estimate_seconds: 40
  },

  // --------------------------------------------------------------------------
  // Passage 4: Pterosaur Aerodynamics (5 items)
  // --------------------------------------------------------------------------
  {
    exam_name: "TOEFL iBT",
    subject: "Reading",
    skill_domain: "Factual Information",
    difficulty_tier: 2,
    passage_id: "toefl_rc_pterosaur_flight",
    passage: PASSAGE_TOEFL_PTEROSAURS,
    question_text: "According to paragraph 2, what was the structural function of 'actinofibrils' in the pterosaur patagium?",
    options: {
      A: "They absorbed solar radiation to warm the animal's blood.",
      B: "These stiffened keratinous fibers prevented the wing membrane from ballooning or fluttering uncontrollably under aerodynamic lift.",
      C: "They injected venom into prey animals during aerial strikes.",
      D: "They secreted feathers during the winter mating season."
    },
    correct_option: "B",
    explanation: "Paragraph 2 explicitly states: 'These stiffened keratinous actinofibrils prevented the wing membrane from ballooning or fluttering uncontrollably under aerodynamic lift, allowing pterosaurs to dynamically adjust wing camber and span during complex maneuvers.'",
    distractor_analysis: {
      A: "Incorrect. Solar warming is not their function.",
      B: "Correct. Exactly matches the text regarding preventing ballooning or fluttering under lift.",
      C: "Incorrect. Pterosaur wings were not venomous weapons.",
      D: "Incorrect. Pterosaurs did not possess avian feathers."
    },
    misconception: "Assuming the pterosaur wing was a loose sheet of skin like a bat wing, ignoring the stiffening actinofibrils.",
    time_estimate_seconds: 45
  },
  {
    exam_name: "TOEFL iBT",
    subject: "Reading",
    skill_domain: "Factual Information",
    difficulty_tier: 3,
    passage_id: "toefl_rc_pterosaur_flight",
    passage: PASSAGE_TOEFL_PTEROSAURS,
    question_text: "According to paragraph 4, why did Michael Habib conclude that giant azhdarchids could NOT launch bipedally like birds?",
    options: {
      A: "Pterosaurs lacked eyes and could not see the ground.",
      B: "A bipedal jump would require hindlimb bones to withstand stresses far exceeding their physical fracture resistance in animals weighing over 200 kilograms.",
      C: "Giant pterosaurs lived exclusively on floating icebergs where running was impossible.",
      D: "Their fourth manual digit dragged on the ground, tripping them during takeoff."
    },
    correct_option: "B",
    explanation: "Paragraph 4 explains: 'Biomechanical analysis by Michael Habib, however, demonstrated that bipedal launching was physically impossible for animals weighing over two hundred kilograms, as hindlimb bones lacked the fracture resistance required to generate sufficient vertical takeoff velocity.'",
    distractor_analysis: {
      A: "Incorrect. Pterosaurs had large, well-developed eyes.",
      B: "Correct. Accurately cites hindlimb bone fracture limits in animals exceeding 200 kilograms.",
      C: "Incorrect. Azhdarchids lived in warm Cretaceous terrestrial floodplains, not icebergs.",
      D: "Incorrect. The fourth digit formed the wing and was folded up when walking."
    },
    misconception: "Assuming that because modern birds launch bipedally, 250-kg pterosaurs must have done the same.",
    time_estimate_seconds: 50
  },
  {
    exam_name: "TOEFL iBT",
    subject: "Reading",
    skill_domain: "Negative Factual Information",
    difficulty_tier: 2,
    passage_id: "toefl_rc_pterosaur_flight",
    passage: PASSAGE_TOEFL_PTEROSAURS,
    question_text: "According to the passage, all of the following characterized the skeletal or aerodynamic anatomy of pterosaurs EXCEPT:",
    options: {
      A: "Thin-walled hollow bones reinforced internally by delicate trabecular struts",
      B: "An invasive pulmonary air sac system that lightened vertebrae and long bones",
      C: "A wing supported primarily by keratinous bird feathers rooted in the ulna",
      D: "A quadrupedal vault launch powered predominantly by massive forelimb flight musculature"
    },
    correct_option: "C",
    explanation: "Paragraph 2 explicitly contrasts pterosaurs with birds: 'Unlike bird wings, which consist of overlapping keratin feathers supported by forelimb bones, the pterosaur wing was an organic composite membrane stretching from the elongated fourth manual digit...'. Pterosaurs did NOT have wings supported by bird feathers.",
    distractor_analysis: {
      A: "Incorrect. Thin-walled hollow bones with trabecular struts are detailed in Paragraph 3.",
      B: "Incorrect. Invasive pulmonary air sacs are explicitly detailed in Paragraph 3.",
      C: "Correct. Pterosaurs had membranous patagia with actinofibrils, not avian feathers rooted in the ulna.",
      D: "Incorrect. Quadrupedal vault launch is detailed in Paragraph 5."
    },
    misconception: "Confusing pterosaur wing anatomy (membranous patagium on fourth digit) with bird wing anatomy (feathers).",
    time_estimate_seconds: 45
  },
  {
    exam_name: "TOEFL iBT",
    subject: "Reading",
    skill_domain: "Inference and Rhetorical Purpose",
    difficulty_tier: 3,
    passage_id: "toefl_rc_pterosaur_flight",
    passage: PASSAGE_TOEFL_PTEROSAURS,
    question_text: "The author describes the internal structure of pterosaur long bones as 'tubular, foam-like internal architecture' in paragraph 3 primarily to explain how:",
    options: {
      A: "Bones could maintain exceptional resistance to bending and torsional stresses while keeping aggregate mass low enough for flight.",
      B: "Water could be absorbed through bone pores during long ocean migrations.",
      C: "Pterosaurs could survive bullet wounds from prehistoric predators.",
      D: "Bone marrow could be transformed into jet fuel."
    },
    correct_option: "A",
    explanation: "Paragraph 3 explains that thin-walled bones with internal trabecular trusses 'conferred exceptional torsional rigidity and resistance to bending stress, keeping the total body mass of giant azhdarchids surprisingly low—estimated at between two hundred and two hundred and fifty kilograms.'",
    distractor_analysis: {
      A: "Correct. Highlights the engineering optimization: maximizing strength and rigidity while minimizing weight.",
      B: "Incorrect. Bone pores were filled with air sacs, not drinking water.",
      C: "Incorrect. Anachronistic and nonsensical.",
      D: "Incorrect. Ridiculous and impossible."
    },
    misconception: "Missing the fundamental biomechanical trade-off between structural rigidity and flight mass reduction.",
    time_estimate_seconds: 45
  },
  {
    exam_name: "TOEFL iBT",
    subject: "Reading",
    skill_domain: "Insert Text",
    difficulty_tier: 3,
    passage_id: "toefl_rc_pterosaur_flight",
    passage: PASSAGE_TOEFL_PTEROSAURS,
    question_text: "Look at the four squares [■ A], [■ B], [■ C], and [■ D] in the passage that indicate where the following sentence could be added:\n\n'This forward catapulting motion closely resembles the pole-vaulting action observed in modern vampire bats.'\n\nWhere would the sentence best fit?",
    options: {
      A: "[■ A]",
      B: "[■ B]",
      C: "[■ C]",
      D: "[■ D]"
    },
    correct_option: "D",
    explanation: "The final paragraph explains Habib's quadrupedal vault launch: 'vaulting off the ground with a massive downward push from their forelimb knuckles... catapulting the creature several meters into the air... [■ D]'. The sentence comparing this forward catapulting motion to the pole-vaulting launch of vampire bats fits perfectly at [■ D].",
    distractor_analysis: {
      A: "Incorrect. Paragraph 1 is an overview of pterosaur sizes across the Mesozoic.",
      B: "Incorrect. Paragraph 3 discusses internal skeletal pneumatization.",
      C: "Incorrect. Paragraph 4 discusses the failure of bipedal launch models.",
      D: "Correct. Concludes the description of the quadrupedal catapult launch mechanism by offering an illuminating modern biological parallel."
    },
    misconception: "Placing a launch mechanic analogy into the bone pneumatization paragraph or the introduction.",
    time_estimate_seconds: 40
  },

  // --------------------------------------------------------------------------
  // Passage 5: Italian Renaissance Fresco (5 items)
  // --------------------------------------------------------------------------
  {
    exam_name: "TOEFL iBT",
    subject: "Reading",
    skill_domain: "Factual Information",
    difficulty_tier: 2,
    passage_id: "toefl_rc_renaissance_fresco",
    passage: PASSAGE_TOEFL_FRESCO,
    question_text: "According to paragraph 5, what chemical reaction permanently binds pigments in *buon fresco*?",
    options: {
      A: "Egg yolk protein denatures when exposed to ultraviolet light.",
      B: "Calcium hydroxide in the wet plaster reacts with atmospheric carbon dioxide, converting into crystalline calcium carbonate (limestone) that encapsulates pigment particles.",
      C: "Linseed oil oxidizes and polymers form a rubberized plastic barrier.",
      D: "Boiling vinegar dissolves the pigments into the bricks."
    },
    correct_option: "B",
    explanation: "Paragraph 5 provides the exact chemical equation and explanation: 'calcium hydroxide in the plaster absorbs carbon dioxide ($\\text{CO}_2$) directly from ambient air. This chemical carbonation reaction reconstitutes the calcium hydroxide into solid calcium carbonate (limestone)... As the calcium carbonate crystal lattice forms, it physically encapsulates the microscopic pigment particles within an impermeable, glassy crystalline limestone matrix.'",
    distractor_analysis: {
      A: "Incorrect. Egg yolk is used in tempera, not *buon fresco*.",
      B: "Correct. Precisely mirrors the chemical carbonation formula and encapsulation in limestone.",
      C: "Incorrect. Linseed oil is used in oil painting, not fresco.",
      D: "Incorrect. Vinegar is acid and would destroy limestone plaster."
    },
    misconception: "Confusing organic paint binders (egg, oil) with the inorganic crystalline carbonation of fresco plaster.",
    time_estimate_seconds: 50
  },
  {
    exam_name: "TOEFL iBT",
    subject: "Reading",
    skill_domain: "Factual Information",
    difficulty_tier: 2,
    passage_id: "toefl_rc_renaissance_fresco",
    passage: PASSAGE_TOEFL_FRESCO,
    question_text: "According to paragraph 6, why did Renaissance artists apply pigments like azurite blue *a secco* ('on dry plaster') rather than in *buon fresco*?",
    options: {
      A: "Azurite blue was too cheap to be used in church commissions.",
      B: "Wet lime plaster chemically reacts with and discolors certain organic and mineral pigments like azurite, requiring them to be applied with binders after the plaster dries.",
      C: "Azurite pigment only dissolved in boiling animal grease.",
      D: "Guild regulations prohibited blue paint on Christian church walls."
    },
    correct_option: "B",
    explanation: "Paragraph 6 states: 'Because wet plaster chemically reacts with and discolors certain organic and metallic pigments, artists could not use azurite blue, malachite green, or lead white in *buon fresco*. These volatile pigments had to be applied *a secco* (\"on dry plaster\") after the wall had dried, utilizing egg tempera or animal glue binders.'",
    distractor_analysis: {
      A: "Incorrect. Azurite was an expensive, prized pigment.",
      B: "Correct. Accurately explains the chemical intolerance between wet alkaline plaster and certain sensitive pigments.",
      C: "Incorrect. Pigments were mixed with egg tempera or glue, not boiling grease.",
      D: "Incorrect. Blue was the most celebrated color for the Virgin Mary's robes."
    },
    misconception: "Assuming artistic style or cost dictated the choice rather than chemical reactivity with wet alkaline lime.",
    time_estimate_seconds: 45
  },
  {
    exam_name: "TOEFL iBT",
    subject: "Reading",
    skill_domain: "Negative Factual Information",
    difficulty_tier: 2,
    passage_id: "toefl_rc_renaissance_fresco",
    passage: PASSAGE_TOEFL_FRESCO,
    question_text: "According to the passage, all of the following are steps in the preparation and execution of *buon fresco* EXCEPT:",
    options: {
      A: "Heating limestone in kilns to produce quicklime, which is then slaked with water",
      B: "Applying a rough preparatory plaster layer called the *arriccio* to bare masonry",
      C: "Applying a waterproof synthetic acrylic sealant over the wet wall before painting",
      D: "Laying down a fresh painting plaster patch called the *intonaco* for a single day's work (*giornata*)"
    },
    correct_option: "C",
    explanation: "Synthetic acrylic polymers were invented in the twentieth century and would prevent the carbonation reaction by blocking carbon dioxide from reaching the calcium hydroxide. All other steps (quicklime slaking, *arriccio*, *intonaco/giornata*) are detailed in paragraphs 2, 3, and 4.",
    distractor_analysis: {
      A: "Incorrect. Detailed in Paragraph 2.",
      B: "Incorrect. Detailed in Paragraph 3.",
      C: "Correct. Synthetic acrylic sealants did not exist in the Renaissance and would prevent carbonation.",
      D: "Incorrect. Detailed in Paragraph 4."
    },
    misconception: "Failing to spot the anachronistic modern chemical material (acrylic sealant).",
    time_estimate_seconds: 40
  },
  {
    exam_name: "TOEFL iBT",
    subject: "Reading",
    skill_domain: "Sentence Simplification",
    difficulty_tier: 3,
    passage_id: "toefl_rc_renaissance_fresco",
    passage: PASSAGE_TOEFL_FRESCO,
    question_text: "Which of the following best expresses the essential information in the highlighted sentence from paragraph 6?\n\n'Unfortunately, because *secco* paint layers sit loosely on the wall surface rather than being encapsulated within crystalline limestone, they are acutely vulnerable to moisture degradation, frequently flaking off over centuries and leaving only the underlying *buon fresco* intact.'",
    options: {
      A: "*Secco* paint layers often flake off over time because they are not trapped inside limestone crystals, leaving only the *buon fresco* behind.",
      B: "Both *secco* and *buon fresco* layers dissolve completely whenever water touches masonry walls.",
      C: "Artists preferred *secco* painting because it was more durable against humidity than limestone plaster.",
      D: "Moisture degradation causes limestone to flake away, exposing the vibrant *secco* paint underneath."
    },
    correct_option: "A",
    explanation: "Option A captures the core contrast and result: *secco* paint sits on the surface without being encapsulated in limestone, so moisture makes it flake off, leaving the durable *buon fresco* intact.",
    distractor_analysis: {
      A: "Correct. Accurately and concisely captures the vulnerability and loss of *secco* vs. survival of *buon fresco*.",
      B: "Incorrect. *Buon fresco* survives intact.",
      C: "Incorrect. Inverts the durability: *secco* was far less durable.",
      D: "Incorrect. Reverses which layer flakes and which layer remains."
    },
    misconception: "Inverting which painting technique survives and which technique flakes away.",
    time_estimate_seconds: 45
  },
  {
    exam_name: "TOEFL iBT",
    subject: "Reading",
    skill_domain: "Insert Text",
    difficulty_tier: 2,
    passage_id: "toefl_rc_renaissance_fresco",
    passage: PASSAGE_TOEFL_FRESCO,
    question_text: "Look at the four squares [■ A], [■ B], [■ C], and [■ D] in the passage that indicate where the following sentence could be added:\n\n'Any plaster left unpainted at the end of the day had to be carefully scraped away and reapplied the next morning.'\n\nWhere would the sentence best fit?",
    options: {
      A: "[■ A]",
      B: "[■ B]",
      C: "[■ C]",
      D: "[■ D]"
    },
    correct_option: "B",
    explanation: "Paragraph 4 explains the *giornata* concept: 'the *intonaco* must be applied only in patches sized for a single day's work, a unit known as a *giornata*... [■ B]'. The sentence explaining what happened to unpainted plaster at the end of the day logically fits right after [■ B].",
    distractor_analysis: {
      A: "Incorrect. Paragraph 1 is an overview of Italian fresco masterpieces.",
      B: "Correct. Directly elaborates on the daily *giornata* time constraint.",
      C: "Incorrect. Paragraph 6 discusses pigment chemical incompatibilities.",
      D: "Incorrect. The end of the passage discusses flaking of *secco* paint."
    },
    misconception: "Placing a plaster application daily routine detail into the pigment chemistry discussion.",
    time_estimate_seconds: 40
  },

  // --------------------------------------------------------------------------
  // Passage 6: Desert Xerophytes (5 items)
  // --------------------------------------------------------------------------
  {
    exam_name: "TOEFL iBT",
    subject: "Reading",
    skill_domain: "Factual Information",
    difficulty_tier: 2,
    passage_id: "toefl_rc_desert_xerophytes",
    passage: PASSAGE_TOEFL_XEROPHYTES,
    question_text: "According to paragraphs 2 and 3, how does Crassulacean Acid Metabolism (CAM) enable desert succulents to minimize daytime water loss?",
    options: {
      A: "By opening stomata exclusively during the cooler, more humid night to absorb and store carbon dioxide as malic acid, keeping stomata sealed during the hot day.",
      B: "By absorbing water vapor directly through root hairs during sandstorms.",
      C: "By converting sand grains into liquid glucose via nuclear fusion.",
      D: "By shedding all leaves every twelve hours."
    },
    correct_option: "A",
    explanation: "Paragraphs 2 and 3 explain that CAM plants invert the normal circadian cycle: stomata open at night to fix CO₂ into malate stored in vacuoles, and close during the day while internal malic acid is decarboxylated for the Calvin cycle, cutting transpirational water loss by up to 80%.",
    distractor_analysis: {
      A: "Correct. Accurately synthesizes nocturnal stomatal opening, malic acid vacuolar storage, and daytime stomatal closure.",
      B: "Incorrect. Leaves absorb CO₂; roots absorb soil water.",
      C: "Incorrect. Biological impossibility.",
      D: "Incorrect. Succulent leaves are retained to store water."
    },
    misconception: "Assuming photosynthesis occurs at night, rather than realizing only carbon fixation occurs at night while light reactions occur during the day.",
    time_estimate_seconds: 45
  },
  {
    exam_name: "TOEFL iBT",
    subject: "Reading",
    skill_domain: "Factual Information",
    difficulty_tier: 2,
    passage_id: "toefl_rc_desert_xerophytes",
    passage: PASSAGE_TOEFL_XEROPHYTES,
    question_text: "According to paragraph 4, what are 'trichomes' and how do they benefit xerophytic desert plants?",
    options: {
      A: "Underground carnivorous traps that catch burrowing insects for nitrogen.",
      B: "Microscopic silver-white hairs that scatter solar radiation, lower leaf temperature, and trap a humid boundary layer of air.",
      C: "Hollow wooden thorns that store pressurized drinking water.",
      D: "Chemical enzymes that decompose synthetic plastic waste."
    },
    correct_option: "B",
    explanation: "Paragraph 4 states: 'Others develop dense coverings of microscopic silver-white hairs known as trichomes. These reflective trichomes scatter intense solar radiation, lowering internal leaf temperatures, while simultaneously trapping a microscopic boundary layer of humid air against the leaf surface to reduce the transpirational vapor pressure gradient.'",
    distractor_analysis: {
      A: "Incorrect. Trichomes are surface hairs, not underground carnivorous traps.",
      B: "Correct. Directly captures solar scattering, cooling, and trapping a humid boundary layer.",
      C: "Incorrect. Thorns are modified leaves/branches, not microscopic trichomes.",
      D: "Incorrect. Completely unrelated."
    },
    misconception: "Confusing microscopic reflective epidermal hairs with protective thorns or spines.",
    time_estimate_seconds: 40
  },
  {
    exam_name: "TOEFL iBT",
    subject: "Reading",
    skill_domain: "Negative Factual Information",
    difficulty_tier: 2,
    passage_id: "toefl_rc_desert_xerophytes",
    passage: PASSAGE_TOEFL_XEROPHYTES,
    question_text: "According to the passage, all of the following are adaptations of desert xerophytes EXCEPT:",
    options: {
      A: "Crassulacean Acid Metabolism separating carbon assimilation temporally",
      B: "Broad, thin leaves with high stomatal densities that maximize daytime water evaporation",
      C: "Thick hydrophobic epicuticular waxes sealing epidermal cells",
      D: "Bimodal root systems featuring shallow lateral networks and deep taproots"
    },
    correct_option: "B",
    explanation: "Paragraph 1 states that evaporation is the life-or-death challenge; broad, thin leaves with high stomatal density that maximize evaporation is the exact opposite of xerophytic adaptation (it describes mesophytes in tropical rainforests). All other adaptations (CAM, waxes, bimodal roots) are explicitly detailed in paragraphs 2, 4, and 5.",
    distractor_analysis: {
      A: "Incorrect. Detailed in Paragraphs 2 and 3.",
      B: "Correct. Broad, thin leaves that maximize evaporation would cause fatal dehydration in deserts.",
      C: "Incorrect. Detailed in Paragraph 4.",
      D: "Incorrect. Detailed in Paragraph 5."
    },
    misconception: "Failing to recognize that maximizing daytime evaporation is the exact vulnerability desert plants evolve to prevent.",
    time_estimate_seconds: 45
  },
  {
    exam_name: "TOEFL iBT",
    subject: "Reading",
    skill_domain: "Inference and Rhetorical Purpose",
    difficulty_tier: 3,
    passage_id: "toefl_rc_desert_xerophytes",
    passage: PASSAGE_TOEFL_XEROPHYTES,
    question_text: "Why does the author describe the root systems of xerophytes as 'bimodal' in the final paragraph?",
    options: {
      A: "Because they operate only two days per calendar year.",
      B: "Because they combine two distinct morphological strategies: shallow lateral roots for fleeting surface water and deep taproots for groundwater.",
      C: "Because roots change color from red to blue depending on soil pH.",
      D: "Because they possess two separate nervous systems."
    },
    correct_option: "B",
    explanation: "Paragraph 5 explicitly defines the bimodal structure: 'succulents typically exhibit bimodal root architectures: extensive, shallow lateral roots fan out mere centimeters beneath the soil surface to intercept fleeting morning dew and brief desert flash rains, while a deep, vertical taproot drills meters downward into subterranean bedrock fractures to access deep groundwater reservoirs.'",
    distractor_analysis: {
      A: "Incorrect. Bimodal refers to two distinct structural modes, not calendar days.",
      B: "Correct. Accurately explains the dual strategy: shallow lateral roots for rain/dew + deep vertical taproot for groundwater.",
      C: "Incorrect. Roots do not change color with pH.",
      D: "Incorrect. Plants do not have nervous systems."
    },
    misconception: "Interpreting 'bimodal' as a temporal schedule rather than a dual physical architecture.",
    time_estimate_seconds: 40
  },
  {
    exam_name: "TOEFL iBT",
    subject: "Reading",
    skill_domain: "Insert Text",
    difficulty_tier: 2,
    passage_id: "toefl_rc_desert_xerophytes",
    passage: PASSAGE_TOEFL_XEROPHYTES,
    question_text: "Look at the four squares [■ A], [■ B], [■ C], and [■ D] in the passage that indicate where the following sentence could be added:\n\n'This protective wax layer gives many desert succulents their characteristic glaucous, powdery blue or gray appearance.'\n\nWhere would the sentence best fit?",
    options: {
      A: "[■ A]",
      B: "[■ B]",
      C: "[■ C]",
      D: "[■ D]"
    },
    correct_option: "C",
    explanation: "Paragraph 4 discusses cuticle waxes: 'Many species possess micro-grooved, reflective cuticles coated with thick, hydrophobic epicuticular waxes that seal epidermal cells against non-stomatal water evaporation. [■ C]'. The sentence describing the visual appearance of this protective wax layer fits directly at [■ C].",
    distractor_analysis: {
      A: "Incorrect. Paragraph 1 discusses global desert biomes and the water-carbon trade-off.",
      B: "Incorrect. Paragraph 3 discusses nocturnal malic acid biochemistry.",
      C: "Correct. Directly follows the sentence explaining the thick hydrophobic epicuticular waxes.",
      D: "Incorrect. Paragraph 5 discusses parenchyma water storage and root architecture."
    },
    misconception: "Placing a cuticle wax sentence into the malic acid biochemistry paragraph or the root architecture paragraph.",
    time_estimate_seconds: 40
  },

  // --------------------------------------------------------------------------
  // Passage 7: The Steam Engine and Industrial Geography (5 items)
  // --------------------------------------------------------------------------
  {
    exam_name: "TOEFL iBT",
    subject: "Reading",
    skill_domain: "Factual Information",
    difficulty_tier: 2,
    passage_id: "toefl_rc_steam_power_geography",
    passage: PASSAGE_TOEFL_STEAM_POWER,
    question_text: "According to paragraph 2, what were the primary operational liabilities of watermills in early manufacturing?",
    options: {
      A: "Waterwheels generated high-voltage electrical shocks that destroyed wool textiles.",
      B: "They were hostage to weather disruptions—summer droughts dried streams while winter freezes halted wheels—and river valleys possessed finite energy capacities.",
      C: "King George III banned watermills across Great Britain.",
      D: "River water dissolved iron gears within twenty-four hours."
    },
    correct_option: "B",
    explanation: "Paragraph 2 states: 'Mill power was hostage to seasonal weather: during summer droughts, streams ran dry, halting factory machinery for weeks; during winter freezes, ice locked waterwheels in place... Furthermore, rivers possessed fixed geographical sites with finite energy capacities...'",
    distractor_analysis: {
      A: "Incorrect. Watermills generated mechanical kinetic motion, not electricity.",
      B: "Correct. Accurately details seasonal weather disruption (drought/freeze) and finite site capacity limits.",
      C: "Incorrect. Watermills were widely used and encouraged.",
      D: "Incorrect. Exaggerated and unscientific."
    },
    misconception: "Assuming watermills were abandoned due to government regulation rather than physical and environmental limits.",
    time_estimate_seconds: 45
  },
  {
    exam_name: "TOEFL iBT",
    subject: "Reading",
    skill_domain: "Factual Information",
    difficulty_tier: 2,
    passage_id: "toefl_rc_steam_power_geography",
    passage: PASSAGE_TOEFL_STEAM_POWER,
    question_text: "According to paragraph 4, what key technical innovation did James Watt introduce to drastically reduce steam engine fuel consumption?",
    options: {
      A: "Using petroleum instead of coal to boil water",
      B: "The separate condenser, which kept the main cylinder hot with an insulating jacket while condensing steam in a dedicated cold chamber",
      C: "Replacing iron pistons with titanium pistons",
      D: "Eliminating pistons completely in favor of modern gas turbines"
    },
    correct_option: "B",
    explanation: "Paragraph 4 states: 'Watt introduced the separate condenser: a dedicated condensation chamber kept continuously cold with cooling water, while the primary working cylinder was maintained at the temperature of boiling steam by an insulating steam jacket. By eliminating the ruinous cycle of repeatedly heating and cooling the primary cylinder, Watt's separate condenser slashed fuel consumption by over seventy-five percent.'",
    distractor_analysis: {
      A: "Incorrect. Coal was used, not petroleum.",
      B: "Correct. Precisely identifies the separate condenser maintaining hot cylinder and cold chamber.",
      C: "Incorrect. Titanium was not manufactured in the eighteenth century.",
      D: "Incorrect. Gas turbines were developed in the twentieth century."
    },
    misconception: "Confusing fuel type (coal) with thermodynamic engine design (separate condenser).",
    time_estimate_seconds: 45
  },
  {
    exam_name: "TOEFL iBT",
    subject: "Reading",
    skill_domain: "Inference and Rhetorical Purpose",
    difficulty_tier: 3,
    passage_id: "toefl_rc_steam_power_geography",
    passage: PASSAGE_TOEFL_STEAM_POWER,
    question_text: "In paragraph 5, why does the author emphasize that the rotary steam engine 'liberated factories from their rural riverbank tethers'?",
    options: {
      A: "To show that factories were physically tied to trees with hemp ropes.",
      B: "To explain how manufacturing was no longer constrained to remote river valleys and could relocate into populous urban centers near labor, canals, and capital markets.",
      C: "To prove that rural mill workers refused to work in cities.",
      D: "To demonstrate that clean rivers were protected from industrial factory pollution."
    },
    correct_option: "B",
    explanation: "The author uses 'liberated from riverbank tethers' as a metaphor for overcoming the geographical constraint of flowing water, enabling factories to relocate into major urban centers where labor, canals, and financial capital were concentrated.",
    distractor_analysis: {
      A: "Incorrect. Literal misinterpretation of 'tethers.'",
      B: "Correct. Accurately synthesizes the spatial liberation enabling urbanization and manufacturing agglomeration.",
      C: "Incorrect. Workers migrated to urban factories.",
      D: "Incorrect. Environmental protection was not the motive; economic concentration was."
    },
    misconception: "Taking the metaphorical word 'tether' literally rather than understanding the spatial relocation of industry.",
    time_estimate_seconds: 45
  },
  {
    exam_name: "TOEFL iBT",
    subject: "Reading",
    skill_domain: "Sentence Simplification",
    difficulty_tier: 3,
    passage_id: "toefl_rc_steam_power_geography",
    passage: PASSAGE_TOEFL_STEAM_POWER,
    question_text: "Which of the following best expresses the essential information in the highlighted sentence from paragraph 3?\n\n'While the Newcomen engine was wildly inefficient—wasting over ninety-nine percent of its thermal energy by repeatedly cooling and reheating the massive iron cylinder—it proved economically viable at coal pitheads, where low-grade, unsellable 'slack' coal was abundantly available at zero transport cost.'",
    options: {
      A: "The Newcomen engine wasted over 99% of its energy, making it a commercial failure everywhere in Great Britain.",
      B: "Although the Newcomen engine was thermally inefficient, it succeeded at coal mines because unusable coal was free and plentiful on site.",
      C: "Coal pitheads closed because iron cylinders cost more than low-grade coal.",
      D: "Transporting slack coal across Great Britain enabled Newcomen engines to achieve high thermal efficiency."
    },
    correct_option: "B",
    explanation: "Option B preserves the central relationship: despite extreme thermal inefficiency (wasting 99%), the engine was commercially viable at coal mines because waste coal was free and transport-free.",
    distractor_analysis: {
      A: "Incorrect. The text says it was economically viable at pitheads, not a total failure.",
      B: "Correct. Accurately synthesizes the trade-off: thermal inefficiency outweighed by free on-site fuel.",
      C: "Incorrect. Coal mines flourished with Newcomen pumps.",
      D: "Incorrect. Slack coal was unsellable and not transported across the country."
    },
    misconception: "Overlooking the economic reality that free fuel nullifies thermal inefficiency.",
    time_estimate_seconds: 45
  },
  {
    exam_name: "TOEFL iBT",
    subject: "Reading",
    skill_domain: "Insert Text",
    difficulty_tier: 2,
    passage_id: "toefl_rc_steam_power_geography",
    passage: PASSAGE_TOEFL_STEAM_POWER,
    question_text: "Look at the four squares [■ A], [■ B], [■ C], and [■ D] in the passage that indicate where the following sentence could be added:\n\n'Without deep drainage pumping, miners could not access the rich coal seams lying hundreds of feet below the water table.'\n\nWhere would the sentence best fit?",
    options: {
      A: "[■ A]",
      B: "[■ B]",
      C: "[■ C]",
      D: "[■ D]"
    },
    correct_option: "B",
    explanation: "Paragraph 3 introduces the Newcomen engine: 'The earliest commercial steam engine, developed by Thomas Newcomen in 1712, was an \"atmospheric engine\" designed specifically to pump floodwaters out of deep underground coal mines. [■ B]'. The sentence explaining why drainage pumping was crucial for mining coal below the water table fits right at [■ B].",
    distractor_analysis: {
      A: "Incorrect. Paragraph 1 discusses early watermills in rural valleys.",
      B: "Correct. Directly elaborates on the problem of flooded coal mines that the Newcomen engine was designed to solve.",
      C: "Incorrect. Paragraph 4 discusses Watt's rotary conversion for textile factories.",
      D: "Incorrect. Paragraph 5 discusses urban manufacturing and locomotives."
    },
    misconception: "Placing a coal mine flooding detail into the urban textile factory paragraph.",
    time_estimate_seconds: 40
  }
];
