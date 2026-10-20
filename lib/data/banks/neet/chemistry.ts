// Path: lib/data/banks/neet/chemistry.ts
import type { SeedQuestion } from "../../question-bank-seed";

export const NEET_CHEMISTRY_QUESTIONS: SeedQuestion[] = [
  {
    "exam_name": "NEET",
    "subject": "Chemistry",
    "skill_domain": "Physical Chemistry",
    "difficulty_tier": 2,
    "question_text": "What is the molarity of an aqueous solution containing 4.0 g of NaOH dissolved in 250 mL of solution? (Molar mass of NaOH = 40 g/mol)",
    "options": {
      "A": "0.4 M",
      "B": "0.1 M",
      "C": "0.2 M",
      "D": "1.0 M"
    },
    "correct_option": "A",
    "explanation": "Moles of NaOH = 4.0 / 40 = 0.10 mol. Volume of solution = 250 mL = 0.250 L. Molarity M = moles / volume = 0.10 / 0.250 = 0.40 M.",
    "distractor_analysis": {
      "A": "Correct. Moles of NaOH = 4.0 / 40 = 0.10 mol. Volume of solution = 250 mL = 0.250 L. Mola",
      "B": "Incorrect. Common distractor based on: Neglecting mL to L conversion (calculating 0.1 / 250).",
      "C": "Incorrect. Common distractor based on: Neglecting mL to L conversion (calculating 0.1 / 250).",
      "D": "Incorrect. Common distractor based on: Neglecting mL to L conversion (calculating 0.1 / 250)."
    },
    "misconception": "Neglecting mL to L conversion (calculating 0.1 / 250).",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "NEET",
    "subject": "Chemistry",
    "skill_domain": "Physical Chemistry",
    "difficulty_tier": 2,
    "question_text": "For a first-order chemical reaction, what is the half-life t_1/2 in terms of rate constant k?",
    "options": {
      "A": "0.693 / k",
      "B": "1 / (k [A]0)",
      "C": "[A]0 / (2k)",
      "D": "2.303 / k"
    },
    "correct_option": "A",
    "explanation": "For a first-order reaction, integrated rate law gives t_1/2 = ln(2) / k = 0.693 / k, which is strictly independent of initial reactant concentration.",
    "distractor_analysis": {
      "A": "Correct. For a first-order reaction, integrated rate law gives t_1/2 = ln(2) / k = 0.693 ",
      "B": "Incorrect. Common distractor based on: Confusing first-order half-life with zero-order ([A]0/2k) or",
      "C": "Incorrect. Common distractor based on: Confusing first-order half-life with zero-order ([A]0/2k) or",
      "D": "Incorrect. Common distractor based on: Confusing first-order half-life with zero-order ([A]0/2k) or"
    },
    "misconception": "Confusing first-order half-life with zero-order ([A]0/2k) or second-order (1/k[A]0).",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "NEET",
    "subject": "Chemistry",
    "skill_domain": "Physical Chemistry",
    "difficulty_tier": 2,
    "question_text": "What is the oxidation state of Chromium in K2Cr2O7?",
    "options": {
      "A": "+6",
      "B": "+3",
      "C": "+7",
      "D": "+4"
    },
    "correct_option": "A",
    "explanation": "Let oxidation state of Cr be x. 2(+1) + 2(x) + 7(-2) = 0 -> 2 + 2x - 14 = 0 -> 2x = 12 -> x = +6.",
    "distractor_analysis": {
      "A": "Correct. Let oxidation state of Cr be x. 2(+1) + 2(x) + 7(-2) = 0 -> 2 + 2x - 14 = 0 -> 2",
      "B": "Incorrect. Common distractor based on: Confusing with Cr^3+ reduction product.",
      "C": "Incorrect. Common distractor based on: Confusing with Cr^3+ reduction product.",
      "D": "Incorrect. Common distractor based on: Confusing with Cr^3+ reduction product."
    },
    "misconception": "Confusing with Cr^3+ reduction product.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "NEET",
    "subject": "Chemistry",
    "skill_domain": "Physical Chemistry",
    "difficulty_tier": 2,
    "question_text": "Which of the following aqueous solutions will have the highest boiling point elevation? (Assuming complete dissociation)",
    "options": {
      "A": "0.1 M Al2(SO4)3",
      "B": "0.1 M NaCl",
      "C": "0.1 M BaCl2",
      "D": "0.1 M Glucose"
    },
    "correct_option": "A",
    "explanation": "Boiling point elevation Delta T_b = i * K_b * m. Al2(SO4)3 dissociates into 2 Al^3+ + 3 SO4^2-, giving van 't Hoff factor i = 5. NaCl has i = 2, BaCl2 has i = 3, Glucose has i = 1. Highest i produces highest boiling point.",
    "distractor_analysis": {
      "A": "Correct. Boiling point elevation Delta T_b = i * K_b * m. Al2(SO4)3 dissociates into 2 Al",
      "B": "Incorrect. Common distractor based on: Ignoring van 't Hoff dissociation factor i.",
      "C": "Incorrect. Common distractor based on: Ignoring van 't Hoff dissociation factor i.",
      "D": "Incorrect. Common distractor based on: Ignoring van 't Hoff dissociation factor i."
    },
    "misconception": "Ignoring van 't Hoff dissociation factor i.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "NEET",
    "subject": "Chemistry",
    "skill_domain": "Physical Chemistry",
    "difficulty_tier": 2,
    "question_text": "According to Le Chatelier's principle, for the exothermic reaction N2 + 3H2 <=> 2NH3 + heat, yield of NH3 increases with:",
    "options": {
      "A": "Decreasing temperature and increasing pressure",
      "B": "Increasing temperature and decreasing pressure",
      "C": "Increasing temperature and increasing pressure",
      "D": "Decreasing temperature and decreasing pressure"
    },
    "correct_option": "A",
    "explanation": "Exothermic reaction is favored by lower temperature. Gaseous mole decrease (4 -> 2) is favored by higher pressure.",
    "distractor_analysis": {
      "A": "Correct. Exothermic reaction is favored by lower temperature. Gaseous mole decrease (4 ->",
      "B": "Incorrect. Common distractor based on: Confusing temperature effect on exothermic equilibrium.",
      "C": "Incorrect. Common distractor based on: Confusing temperature effect on exothermic equilibrium.",
      "D": "Incorrect. Common distractor based on: Confusing temperature effect on exothermic equilibrium."
    },
    "misconception": "Confusing temperature effect on exothermic equilibrium.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "NEET",
    "subject": "Chemistry",
    "skill_domain": "Physical Chemistry",
    "difficulty_tier": 2,
    "question_text": "What is the pH of a 0.001 M HCl solution at 25 deg C?",
    "options": {
      "A": "3",
      "B": "1",
      "C": "11",
      "D": "7"
    },
    "correct_option": "A",
    "explanation": "HCl is a strong monoprotic acid: [H^+] = 0.001 M = 10^-3 M. pH = -log[H^+] = -log(10^-3) = 3.",
    "distractor_analysis": {
      "A": "Correct. HCl is a strong monoprotic acid: [H^+] = 0.001 M = 10^-3 M. pH = -log[H^+] = -lo",
      "B": "Incorrect. Common distractor based on: Reporting pOH or calculating incorrectly.",
      "C": "Incorrect. Common distractor based on: Reporting pOH or calculating incorrectly.",
      "D": "Incorrect. Common distractor based on: Reporting pOH or calculating incorrectly."
    },
    "misconception": "Reporting pOH or calculating incorrectly.",
    "time_estimate_seconds": 30
  },
  {
    "exam_name": "NEET",
    "subject": "Chemistry",
    "skill_domain": "Physical Chemistry",
    "difficulty_tier": 2,
    "question_text": "In the electrochemical cell Zn | Zn^2+ || Cu^2+ | Cu, what is the standard cell potential E^circ_cell if E^circ(Zn^2+/Zn) = -0.76 V and E^circ(Cu^2+/Cu) = +0.34 V?",
    "options": {
      "A": "+1.10 V",
      "B": "+0.42 V",
      "C": "-1.10 V",
      "D": "-0.42 V"
    },
    "correct_option": "A",
    "explanation": "E^circ_cell = E^circ_cathode - E^circ_anode = E^circ(Cu^2+/Cu) - E^circ(Zn^2+/Zn) = +0.34 - (-0.76) = +0.34 + 0.76 = +1.10 V.",
    "distractor_analysis": {
      "A": "Correct. E^circ_cell = E^circ_cathode - E^circ_anode = E^circ(Cu^2+/Cu) - E^circ(Zn^2+/Zn",
      "B": "Incorrect. Common distractor based on: Subtracting standard potentials with incorrect sign.",
      "C": "Incorrect. Common distractor based on: Subtracting standard potentials with incorrect sign.",
      "D": "Incorrect. Common distractor based on: Subtracting standard potentials with incorrect sign."
    },
    "misconception": "Subtracting standard potentials with incorrect sign.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "NEET",
    "subject": "Chemistry",
    "skill_domain": "Physical Chemistry",
    "difficulty_tier": 2,
    "question_text": "According to Raoult's law, the relative lowering of vapor pressure of a dilute solution containing a non-volatile solute is equal to:",
    "options": {
      "A": "Mole fraction of solute",
      "B": "Mole fraction of solvent",
      "C": "Molality of solute",
      "D": "Molarity of solution"
    },
    "correct_option": "A",
    "explanation": "Raoult's law states (P0 - P) / P0 = x_solute: relative lowering of vapor pressure equals mole fraction of non-volatile solute.",
    "distractor_analysis": {
      "A": "Correct. Raoult's law states (P0 - P) / P0 = x_solute: relative lowering of vapor pressur",
      "B": "Incorrect. Common distractor based on: Confusing mole fraction of solute with solvent.",
      "C": "Incorrect. Common distractor based on: Confusing mole fraction of solute with solvent.",
      "D": "Incorrect. Common distractor based on: Confusing mole fraction of solute with solvent."
    },
    "misconception": "Confusing mole fraction of solute with solvent.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "NEET",
    "subject": "Chemistry",
    "skill_domain": "Physical Chemistry",
    "difficulty_tier": 2,
    "question_text": "What is the unit of the rate constant k for a second-order reaction?",
    "options": {
      "A": "L mol^-1 s^-1",
      "B": "s^-1",
      "C": "mol L^-1 s^-1",
      "D": "L^2 mol^-2 s^-1"
    },
    "correct_option": "A",
    "explanation": "Rate = k [A]^2 -> mol L^-1 s^-1 = k (mol L^-1)^2 -> k = (mol L^-1 s^-1) / (mol^2 L^-2) = L mol^-1 s^-1.",
    "distractor_analysis": {
      "A": "Correct. Rate = k [A]^2 -> mol L^-1 s^-1 = k (mol L^-1)^2 -> k = (mol L^-1 s^-1) / (mol^2",
      "B": "Incorrect. Common distractor based on: Confusing with first-order unit (s^-1).",
      "C": "Incorrect. Common distractor based on: Confusing with first-order unit (s^-1).",
      "D": "Incorrect. Common distractor based on: Confusing with first-order unit (s^-1)."
    },
    "misconception": "Confusing with first-order unit (s^-1).",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "NEET",
    "subject": "Chemistry",
    "skill_domain": "Physical Chemistry",
    "difficulty_tier": 2,
    "question_text": "The total number of atoms in 1 mole of nitrogen gas (N2) is: (N_A = 6.022 x 10^23)",
    "options": {
      "A": "1.204 x 10^24 atoms",
      "B": "6.022 x 10^23 atoms",
      "C": "3.011 x 10^23 atoms",
      "D": "2.408 x 10^24 atoms"
    },
    "correct_option": "A",
    "explanation": "1 mole of N2 contains N_A molecules of N2. Since nitrogen is diatomic, each molecule contains 2 atoms: total atoms = 2 * 6.022 x 10^23 = 1.204 x 10^24 atoms.",
    "distractor_analysis": {
      "A": "Correct. 1 mole of N2 contains N_A molecules of N2. Since nitrogen is diatomic, each mole",
      "B": "Incorrect. Common distractor based on: Reporting number of molecules instead of number of constitue",
      "C": "Incorrect. Common distractor based on: Reporting number of molecules instead of number of constitue",
      "D": "Incorrect. Common distractor based on: Reporting number of molecules instead of number of constitue"
    },
    "misconception": "Reporting number of molecules instead of number of constituent atoms.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "NEET",
    "subject": "Chemistry",
    "skill_domain": "Physical Chemistry",
    "difficulty_tier": 2,
    "question_text": "For an ideal gas undergoing isothermal reversible expansion, the change in internal energy Delta U is:",
    "options": {
      "A": "0",
      "B": "Positive",
      "C": "Negative",
      "D": "Equal to work done"
    },
    "correct_option": "A",
    "explanation": "For an ideal gas, internal energy depends solely on temperature: U = n Cv T. In an isothermal process, Delta T = 0, so Delta U = 0.",
    "distractor_analysis": {
      "A": "Correct. For an ideal gas, internal energy depends solely on temperature: U = n Cv T. In ",
      "B": "Incorrect. Common distractor based on: Confusing isothermal with adiabatic.",
      "C": "Incorrect. Common distractor based on: Confusing isothermal with adiabatic.",
      "D": "Incorrect. Common distractor based on: Confusing isothermal with adiabatic."
    },
    "misconception": "Confusing isothermal with adiabatic.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "NEET",
    "subject": "Chemistry",
    "skill_domain": "Inorganic Chemistry",
    "difficulty_tier": 2,
    "question_text": "Which of the following alkali metal ions has the highest hydration enthalpy?",
    "options": {
      "A": "Li^+",
      "B": "Na^+",
      "C": "K^+",
      "D": "Cs^+"
    },
    "correct_option": "A",
    "explanation": "Hydration enthalpy is inversely proportional to ionic radius (charge density). Li^+ has the smallest ionic size among alkali metals, giving it the highest charge density and greatest hydration enthalpy.",
    "distractor_analysis": {
      "A": "Correct. Hydration enthalpy is inversely proportional to ionic radius (charge density). L",
      "B": "Incorrect. Common distractor based on: Assuming larger ions have greater hydration enthalpy.",
      "C": "Incorrect. Common distractor based on: Assuming larger ions have greater hydration enthalpy.",
      "D": "Incorrect. Common distractor based on: Assuming larger ions have greater hydration enthalpy."
    },
    "misconception": "Assuming larger ions have greater hydration enthalpy.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "NEET",
    "subject": "Chemistry",
    "skill_domain": "Inorganic Chemistry",
    "difficulty_tier": 2,
    "question_text": "What is the shape and hybridization of the central atom in ammonia (NH3)?",
    "options": {
      "A": "Trigonal pyramidal, sp^3",
      "B": "Tetrahedral, sp^3",
      "C": "Trigonal planar, sp^2",
      "D": "T-shaped, sp^3d"
    },
    "correct_option": "A",
    "explanation": "Nitrogen has 5 valence electrons, forming 3 bond pairs with hydrogen and 1 lone pair. Steric number = 4 -> sp^3 hybridization. The lone pair distorts the tetrahedral electron geometry into a trigonal pyramidal shape.",
    "distractor_analysis": {
      "A": "Correct. Nitrogen has 5 valence electrons, forming 3 bond pairs with hydrogen and 1 lone ",
      "B": "Incorrect. Common distractor based on: Confusing electron geometry (tetrahedral) with molecular sha",
      "C": "Incorrect. Common distractor based on: Confusing electron geometry (tetrahedral) with molecular sha",
      "D": "Incorrect. Common distractor based on: Confusing electron geometry (tetrahedral) with molecular sha"
    },
    "misconception": "Confusing electron geometry (tetrahedral) with molecular shape (trigonal pyramidal).",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "NEET",
    "subject": "Chemistry",
    "skill_domain": "Inorganic Chemistry",
    "difficulty_tier": 2,
    "question_text": "Why do transition metals readily form colored compounds and complexes?",
    "options": {
      "A": "d-d electronic transitions in split d-orbitals",
      "B": "High electrical conductivity",
      "C": "Presence of completely filled d-subshells",
      "D": "Strong metallic bonding"
    },
    "correct_option": "A",
    "explanation": "In coordination complexes, ligand field splits degenerated d-orbitals into lower and higher energy sets. Absorption of visible light promotes an electron between these split d-levels (d-d transition), imparting complementary color.",
    "distractor_analysis": {
      "A": "Correct. In coordination complexes, ligand field splits degenerated d-orbitals into lower",
      "B": "Incorrect. Common distractor based on: Attributing color to metallic bonding or full d-subshells.",
      "C": "Incorrect. Common distractor based on: Attributing color to metallic bonding or full d-subshells.",
      "D": "Incorrect. Common distractor based on: Attributing color to metallic bonding or full d-subshells."
    },
    "misconception": "Attributing color to metallic bonding or full d-subshells.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "NEET",
    "subject": "Chemistry",
    "skill_domain": "Inorganic Chemistry",
    "difficulty_tier": 2,
    "question_text": "The correct order of increasing electronegativity among C, N, O, and F is:",
    "options": {
      "A": "C < N < O < F",
      "B": "F < O < N < C",
      "C": "N < C < O < F",
      "D": "C < O < N < F"
    },
    "correct_option": "A",
    "explanation": "Electronegativity increases across a period from left to right due to increasing effective nuclear charge and decreasing atomic size: C (2.5) < N (3.0) < O (3.5) < F (4.0).",
    "distractor_analysis": {
      "A": "Correct. Electronegativity increases across a period from left to right due to increasing",
      "B": "Incorrect. Common distractor based on: Inverting periodic electronegativity trend.",
      "C": "Incorrect. Common distractor based on: Inverting periodic electronegativity trend.",
      "D": "Incorrect. Common distractor based on: Inverting periodic electronegativity trend."
    },
    "misconception": "Inverting periodic electronegativity trend.",
    "time_estimate_seconds": 30
  },
  {
    "exam_name": "NEET",
    "subject": "Chemistry",
    "skill_domain": "Inorganic Chemistry",
    "difficulty_tier": 2,
    "question_text": "Lanthanoid contraction is primarily caused by:",
    "options": {
      "A": "Poor shielding effect of 4f electrons",
      "B": "High shielding effect of 5d electrons",
      "C": "Relativistic mass increase of core electrons",
      "D": "Complete filling of 6s subshell"
    },
    "correct_option": "A",
    "explanation": "4f orbitals have diffused, non-spherical shapes, providing extremely poor shielding for outer electrons against increasing nuclear charge. As a result, effective nuclear charge increases steadily, causing contraction in atomic and ionic radii.",
    "distractor_analysis": {
      "A": "Correct. 4f orbitals have diffused, non-spherical shapes, providing extremely poor shield",
      "B": "Incorrect. Common distractor based on: Attributing contraction to high shielding instead of poor sh",
      "C": "Incorrect. Common distractor based on: Attributing contraction to high shielding instead of poor sh",
      "D": "Incorrect. Common distractor based on: Attributing contraction to high shielding instead of poor sh"
    },
    "misconception": "Attributing contraction to high shielding instead of poor shielding.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "NEET",
    "subject": "Chemistry",
    "skill_domain": "Inorganic Chemistry",
    "difficulty_tier": 2,
    "question_text": "What is the oxidation state of iron in brown ring complex [Fe(H2O)5(NO)]SO4?",
    "options": {
      "A": "+1",
      "B": "+2",
      "C": "+3",
      "D": "0"
    },
    "correct_option": "A",
    "explanation": "In the brown ring complex, NO acts as a nitrosonium ion (NO^+), transferring one electron to Fe^2+ to form Fe^+ (d^7, high spin). Fe is in +1 oxidation state.",
    "distractor_analysis": {
      "A": "Correct. In the brown ring complex, NO acts as a nitrosonium ion (NO^+), transferring one",
      "B": "Incorrect. Common distractor based on: Assuming Fe is in standard +2 or +3 oxidation state.",
      "C": "Incorrect. Common distractor based on: Assuming Fe is in standard +2 or +3 oxidation state.",
      "D": "Incorrect. Common distractor based on: Assuming Fe is in standard +2 or +3 oxidation state."
    },
    "misconception": "Assuming Fe is in standard +2 or +3 oxidation state.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "NEET",
    "subject": "Chemistry",
    "skill_domain": "Inorganic Chemistry",
    "difficulty_tier": 2,
    "question_text": "Which of the following noble gases does NOT form chemical compounds under normal laboratory conditions?",
    "options": {
      "A": "Helium (He)",
      "B": "Xenon (Xe)",
      "C": "Krypton (Kr)",
      "D": "Radon (Rn)"
    },
    "correct_option": "A",
    "explanation": "Helium has the highest ionization energy of all elements and an extremely small, tightly held 1s^2 duet, preventing chemical bond formation under normal conditions. Xenon forms numerous fluorides and oxides.",
    "distractor_analysis": {
      "A": "Correct. Helium has the highest ionization energy of all elements and an extremely small,",
      "B": "Incorrect. Common distractor based on: Selecting Xenon which forms well-known compounds like XeF4.",
      "C": "Incorrect. Common distractor based on: Selecting Xenon which forms well-known compounds like XeF4.",
      "D": "Incorrect. Common distractor based on: Selecting Xenon which forms well-known compounds like XeF4."
    },
    "misconception": "Selecting Xenon which forms well-known compounds like XeF4.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "NEET",
    "subject": "Chemistry",
    "skill_domain": "Inorganic Chemistry",
    "difficulty_tier": 2,
    "question_text": "What is the basicity of orthophosphoric acid (H3PO4)?",
    "options": {
      "A": "3",
      "B": "1",
      "C": "2",
      "D": "4"
    },
    "correct_option": "A",
    "explanation": "H3PO4 has three ionizable P-OH hydroxyl groups bonded to phosphorus (O=P(OH)3). It can donate 3 protons, making it a tribasic acid.",
    "distractor_analysis": {
      "A": "Correct. H3PO4 has three ionizable P-OH hydroxyl groups bonded to phosphorus (O=P(OH)3). ",
      "B": "Incorrect. Common distractor based on: Confusing with H3PO3 (dibasic) or H3PO2 (monobasic).",
      "C": "Incorrect. Common distractor based on: Confusing with H3PO3 (dibasic) or H3PO2 (monobasic).",
      "D": "Incorrect. Common distractor based on: Confusing with H3PO3 (dibasic) or H3PO2 (monobasic)."
    },
    "misconception": "Confusing with H3PO3 (dibasic) or H3PO2 (monobasic).",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "NEET",
    "subject": "Chemistry",
    "skill_domain": "Inorganic Chemistry",
    "difficulty_tier": 2,
    "question_text": "Which halogen has the highest negative electron gain enthalpy?",
    "options": {
      "A": "Chlorine",
      "B": "Fluorine",
      "C": "Bromine",
      "D": "Iodine"
    },
    "correct_option": "A",
    "explanation": "Fluorine's 2p subshell is extremely compact, causing significant inter-electronic repulsion when an electron is added. Chlorine's larger 3p subshell accommodates the incoming electron with less repulsion, giving Chlorine the most exothermic electron gain enthalpy (-349 kJ/mol vs -328 kJ/mol for F).",
    "distractor_analysis": {
      "A": "Correct. Fluorine's 2p subshell is extremely compact, causing significant inter-electroni",
      "B": "Incorrect. Common distractor based on: Assuming Fluorine has the highest electron gain enthalpy due",
      "C": "Incorrect. Common distractor based on: Assuming Fluorine has the highest electron gain enthalpy due",
      "D": "Incorrect. Common distractor based on: Assuming Fluorine has the highest electron gain enthalpy due"
    },
    "misconception": "Assuming Fluorine has the highest electron gain enthalpy due to highest electronegativity.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "NEET",
    "subject": "Chemistry",
    "skill_domain": "Inorganic Chemistry",
    "difficulty_tier": 2,
    "question_text": "What type of bonding exists between adjacent layers of carbon atoms in graphite?",
    "options": {
      "A": "Weak van der Waals forces",
      "B": "Strong covalent sigma bonds",
      "C": "Metallic bonds",
      "D": "Ionic bonds"
    },
    "correct_option": "A",
    "explanation": "In graphite, carbon atoms within a hexagonal planar sheet are held by strong sp^2 covalent bonds. Adjacent parallel layers are held together loosely by weak van der Waals forces, allowing them to slide easily.",
    "distractor_analysis": {
      "A": "Correct. In graphite, carbon atoms within a hexagonal planar sheet are held by strong sp^",
      "B": "Incorrect. Common distractor based on: Thinking layers are linked by covalent bonds.",
      "C": "Incorrect. Common distractor based on: Thinking layers are linked by covalent bonds.",
      "D": "Incorrect. Common distractor based on: Thinking layers are linked by covalent bonds."
    },
    "misconception": "Thinking layers are linked by covalent bonds.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "NEET",
    "subject": "Chemistry",
    "skill_domain": "Inorganic Chemistry",
    "difficulty_tier": 2,
    "question_text": "In the coordination complex K4[Fe(CN)6], how many ions are produced per formula unit when dissolved in water?",
    "options": {
      "A": "5",
      "B": "6",
      "C": "4",
      "D": "2"
    },
    "correct_option": "A",
    "explanation": "K4[Fe(CN)6] dissociates into 4 K^+ cations and 1 complex anion [Fe(CN)6]^4-, producing a total of 4 + 1 = 5 ions in aqueous solution.",
    "distractor_analysis": {
      "A": "Correct. K4[Fe(CN)6] dissociates into 4 K^+ cations and 1 complex anion [Fe(CN)6]^4-, pro",
      "B": "Incorrect. Common distractor based on: Assuming cyanide ligands dissociate in water.",
      "C": "Incorrect. Common distractor based on: Assuming cyanide ligands dissociate in water.",
      "D": "Incorrect. Common distractor based on: Assuming cyanide ligands dissociate in water."
    },
    "misconception": "Assuming cyanide ligands dissociate in water.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "NEET",
    "subject": "Chemistry",
    "skill_domain": "Organic Chemistry",
    "difficulty_tier": 2,
    "question_text": "Which reaction mechanism proceeds via a planar carbocation intermediate with potential racemization of configuration?",
    "options": {
      "A": "SN1 mechanism",
      "B": "SN2 mechanism",
      "C": "E2 elimination",
      "D": "Electrophilic addition"
    },
    "correct_option": "A",
    "explanation": "SN1 proceeds in two steps: loss of leaving group creates a flat, planar sp^2 carbocation. Nucleophilic attack can occur with equal probability from either face, producing a racemic mixture.",
    "distractor_analysis": {
      "A": "Correct. SN1 proceeds in two steps: loss of leaving group creates a flat, planar sp^2 car",
      "B": "Incorrect. Common distractor based on: Confusing SN1 (carbocation, racemization) with SN2 (backside",
      "C": "Incorrect. Common distractor based on: Confusing SN1 (carbocation, racemization) with SN2 (backside",
      "D": "Incorrect. Common distractor based on: Confusing SN1 (carbocation, racemization) with SN2 (backside"
    },
    "misconception": "Confusing SN1 (carbocation, racemization) with SN2 (backside attack, Walden inversion).",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "NEET",
    "subject": "Chemistry",
    "skill_domain": "Organic Chemistry",
    "difficulty_tier": 2,
    "question_text": "What is the major organic product of the reaction between benzaldehyde and concentrated NaOH (Cannizzaro reaction)?",
    "options": {
      "A": "Benzyl alcohol and sodium benzoate",
      "B": "Benzoic acid and benzophenone",
      "C": "Hydrobenzamide",
      "D": "Benzoin"
    },
    "correct_option": "A",
    "explanation": "Benzaldehyde lacks alpha-hydrogens. In concentrated alkali, it undergoes disproportionation (Cannizzaro reaction): one molecule is reduced to benzyl alcohol, while the other is oxidized to sodium benzoate.",
    "distractor_analysis": {
      "A": "Correct. Benzaldehyde lacks alpha-hydrogens. In concentrated alkali, it undergoes disprop",
      "B": "Incorrect. Common distractor based on: Expecting aldol condensation with an aldehyde lacking alpha-",
      "C": "Incorrect. Common distractor based on: Expecting aldol condensation with an aldehyde lacking alpha-",
      "D": "Incorrect. Common distractor based on: Expecting aldol condensation with an aldehyde lacking alpha-"
    },
    "misconception": "Expecting aldol condensation with an aldehyde lacking alpha-hydrogens.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "NEET",
    "subject": "Chemistry",
    "skill_domain": "Organic Chemistry",
    "difficulty_tier": 2,
    "question_text": "Which test is used to specifically distinguish primary aliphatic and aromatic amines by producing an offensive-smelling isocyanide?",
    "options": {
      "A": "Carbylamine test (Hofmann's isocyanide test)",
      "B": "Tollens' test",
      "C": "Lucas test",
      "D": "Fehling's test"
    },
    "correct_option": "A",
    "explanation": "Primary amines when heated with chloroform (CHCl3) and alcoholic KOH form foul-smelling isocyanides (carbylamines). Secondary and tertiary amines do not show this reaction.",
    "distractor_analysis": {
      "A": "Correct. Primary amines when heated with chloroform (CHCl3) and alcoholic KOH form foul-s",
      "B": "Incorrect. Common distractor based on: Confusing carbylamine test with Lucas test (for alcohols).",
      "C": "Incorrect. Common distractor based on: Confusing carbylamine test with Lucas test (for alcohols).",
      "D": "Incorrect. Common distractor based on: Confusing carbylamine test with Lucas test (for alcohols)."
    },
    "misconception": "Confusing carbylamine test with Lucas test (for alcohols).",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "NEET",
    "subject": "Chemistry",
    "skill_domain": "Organic Chemistry",
    "difficulty_tier": 2,
    "question_text": "What is the product obtained when propene is treated with HBr in the presence of organic peroxides?",
    "options": {
      "A": "1-bromopropane",
      "B": "2-bromopropane",
      "C": "1,2-dibromopropane",
      "D": "2-bromopropene"
    },
    "correct_option": "A",
    "explanation": "Peroxides initiate a free radical addition mechanism (anti-Markovnikov / Kharasch effect), directing the bromine radical to the terminal carbon to yield 1-bromopropane.",
    "distractor_analysis": {
      "A": "Correct. Peroxides initiate a free radical addition mechanism (anti-Markovnikov / Kharasc",
      "B": "Incorrect. Common distractor based on: Applying standard Markovnikov addition (yielding 2-bromoprop",
      "C": "Incorrect. Common distractor based on: Applying standard Markovnikov addition (yielding 2-bromoprop",
      "D": "Incorrect. Common distractor based on: Applying standard Markovnikov addition (yielding 2-bromoprop"
    },
    "misconception": "Applying standard Markovnikov addition (yielding 2-bromopropane).",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "NEET",
    "subject": "Chemistry",
    "skill_domain": "Organic Chemistry",
    "difficulty_tier": 2,
    "question_text": "What reagents constitute the Lucas reagent used to distinguish primary, secondary, and tertiary alcohols?",
    "options": {
      "A": "Anhydrous ZnCl2 + concentrated HCl",
      "B": "Dilute HCl + Zn",
      "C": "Concentrated H2SO4 + KMnO4",
      "D": "Pyridine + SOCl2"
    },
    "correct_option": "A",
    "explanation": "Lucas reagent is an equimolar solution of anhydrous zinc chloride (ZnCl2) in concentrated hydrochloric acid (HCl). Tertiary alcohols react immediately with cloudiness; secondary alcohols react in 5 minutes; primary alcohols do not react at room temperature.",
    "distractor_analysis": {
      "A": "Correct. Lucas reagent is an equimolar solution of anhydrous zinc chloride (ZnCl2) in con",
      "B": "Incorrect. Common distractor based on: Confusing Lucas reagent with Tollens' or Fehling's reagents.",
      "C": "Incorrect. Common distractor based on: Confusing Lucas reagent with Tollens' or Fehling's reagents.",
      "D": "Incorrect. Common distractor based on: Confusing Lucas reagent with Tollens' or Fehling's reagents."
    },
    "misconception": "Confusing Lucas reagent with Tollens' or Fehling's reagents.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "NEET",
    "subject": "Chemistry",
    "skill_domain": "Organic Chemistry",
    "difficulty_tier": 2,
    "question_text": "Phenol reacts with chloroform and aqueous NaOH followed by acidification to give salicylaldehyde. This reaction is known as:",
    "options": {
      "A": "Reimer-Tiemann reaction",
      "B": "Kolbe's reaction",
      "C": "Friedel-Crafts reaction",
      "D": "Rosenmund reduction"
    },
    "correct_option": "A",
    "explanation": "The Reimer-Tiemann reaction involves electrophilic attack of dichlorocarbene (:CCl2) on phenoxide ion, introducing a formyl group (-CHO) predominantly ortho to the phenolic -OH to yield salicylaldehyde.",
    "distractor_analysis": {
      "A": "Correct. The Reimer-Tiemann reaction involves electrophilic attack of dichlorocarbene (:C",
      "B": "Incorrect. Common distractor based on: Confusing Reimer-Tiemann (formylation) with Kolbe's reaction",
      "C": "Incorrect. Common distractor based on: Confusing Reimer-Tiemann (formylation) with Kolbe's reaction",
      "D": "Incorrect. Common distractor based on: Confusing Reimer-Tiemann (formylation) with Kolbe's reaction"
    },
    "misconception": "Confusing Reimer-Tiemann (formylation) with Kolbe's reaction (carboxylation to salicylic acid).",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "NEET",
    "subject": "Chemistry",
    "skill_domain": "Organic Chemistry",
    "difficulty_tier": 2,
    "question_text": "Which carbohydrate is a non-reducing disaccharide?",
    "options": {
      "A": "Sucrose",
      "B": "Maltose",
      "C": "Lactose",
      "D": "Glucose"
    },
    "correct_option": "A",
    "explanation": "In sucrose, the glycosidic bond links the anomeric carbon C1 of glucose to anomeric carbon C2 of fructose. With both hemiacetal/hemiketal groups tied up in the linkage, it cannot open into a free aldehyde/ketone, making it non-reducing.",
    "distractor_analysis": {
      "A": "Correct. In sucrose, the glycosidic bond links the anomeric carbon C1 of glucose to anome",
      "B": "Incorrect. Common distractor based on: Assuming all disaccharides are reducing sugars.",
      "C": "Incorrect. Common distractor based on: Assuming all disaccharides are reducing sugars.",
      "D": "Incorrect. Common distractor based on: Assuming all disaccharides are reducing sugars."
    },
    "misconception": "Assuming all disaccharides are reducing sugars.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "NEET",
    "subject": "Chemistry",
    "skill_domain": "Organic Chemistry",
    "difficulty_tier": 2,
    "question_text": "What functional group is formed by the condensation of two amino acids during protein synthesis?",
    "options": {
      "A": "Peptide (amide) bond (-CO-NH-)",
      "B": "Ester bond (-COO-)",
      "C": "Glycosidic bond (-O-)",
      "D": "Phosphodiester bond"
    },
    "correct_option": "A",
    "explanation": "Condensation of the alpha-amino group (-NH2) of one amino acid with the alpha-carboxyl group (-COOH) of another eliminates water to form an amide linkage, specifically called a peptide bond (-CO-NH-).",
    "distractor_analysis": {
      "A": "Correct. Condensation of the alpha-amino group (-NH2) of one amino acid with the alpha-ca",
      "B": "Incorrect. Common distractor based on: Confusing peptide bond with glycosidic or ester bond.",
      "C": "Incorrect. Common distractor based on: Confusing peptide bond with glycosidic or ester bond.",
      "D": "Incorrect. Common distractor based on: Confusing peptide bond with glycosidic or ester bond."
    },
    "misconception": "Confusing peptide bond with glycosidic or ester bond.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "NEET",
    "subject": "Chemistry",
    "skill_domain": "Organic Chemistry",
    "difficulty_tier": 2,
    "question_text": "Which of the following compounds exhibits optical isomerism (enantiomerism)?",
    "options": {
      "A": "Lactic acid (2-hydroxypropanoic acid)",
      "B": "Acetic acid",
      "C": "Propanoic acid",
      "D": "Acetone"
    },
    "correct_option": "A",
    "explanation": "Lactic acid (CH3-C*H(OH)-COOH) has a central chiral carbon atom bonded to four distinct groups (-H, -OH, -CH3, -COOH), making it asymmetric and optically active.",
    "distractor_analysis": {
      "A": "Correct. Lactic acid (CH3-C*H(OH)-COOH) has a central chiral carbon atom bonded to four d",
      "B": "Incorrect. Common distractor based on: Selecting symmetric achiral carboxylic acids.",
      "C": "Incorrect. Common distractor based on: Selecting symmetric achiral carboxylic acids.",
      "D": "Incorrect. Common distractor based on: Selecting symmetric achiral carboxylic acids."
    },
    "misconception": "Selecting symmetric achiral carboxylic acids.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "NEET",
    "subject": "Chemistry",
    "skill_domain": "Organic Chemistry",
    "difficulty_tier": 2,
    "question_text": "What is the major product of the Hoffmann bromamide degradation of acetamide (CH3CONH2)?",
    "options": {
      "A": "Methanamine (methylamine)",
      "B": "Ethanamine (ethylamine)",
      "C": "Methanenitrile",
      "D": "Formamide"
    },
    "correct_option": "A",
    "explanation": "Hoffmann bromamide degradation converts a primary amide into a primary amine with one less carbon atom: CH3CONH2 + Br2 + 4 NaOH -> CH3NH2 + Na2CO3 + 2 NaBr + 2 H2O.",
    "distractor_analysis": {
      "A": "Correct. Hoffmann bromamide degradation converts a primary amide into a primary amine wit",
      "B": "Incorrect. Common distractor based on: Assuming the amine retains the original number of carbon ato",
      "C": "Incorrect. Common distractor based on: Assuming the amine retains the original number of carbon ato",
      "D": "Incorrect. Common distractor based on: Assuming the amine retains the original number of carbon ato"
    },
    "misconception": "Assuming the amine retains the original number of carbon atoms (expecting ethylamine).",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "NEET",
    "subject": "Chemistry",
    "skill_domain": "Organic Chemistry",
    "difficulty_tier": 2,
    "question_text": "Which nitrogenous base is present in RNA but absent in DNA?",
    "options": {
      "A": "Uracil",
      "B": "Thymine",
      "C": "Cytosine",
      "D": "Adenine"
    },
    "correct_option": "A",
    "explanation": "RNA contains the pyrimidine base Uracil instead of Thymine. DNA contains Adenine, Guanine, Cytosine, and Thymine.",
    "distractor_analysis": {
      "A": "Correct. RNA contains the pyrimidine base Uracil instead of Thymine. DNA contains Adenine",
      "B": "Incorrect. Common distractor based on: Confusing Uracil (RNA) with Thymine (DNA).",
      "C": "Incorrect. Common distractor based on: Confusing Uracil (RNA) with Thymine (DNA).",
      "D": "Incorrect. Common distractor based on: Confusing Uracil (RNA) with Thymine (DNA)."
    },
    "misconception": "Confusing Uracil (RNA) with Thymine (DNA).",
    "time_estimate_seconds": 30
  }
];
