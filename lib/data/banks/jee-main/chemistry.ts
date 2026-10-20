// Path: lib/data/banks/jee-main/chemistry.ts
import type { SeedQuestion } from "../../question-bank-seed";

export const JEE_MAIN_CHEMISTRY_QUESTIONS: SeedQuestion[] = [
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Atomic Structure",
    "difficulty_tier": 3,
    "question_text": "What is the total number of radial and angular nodes respectively in a 4d orbital?",
    "options": {
      "A": "Radial = 1, Angular = 2",
      "B": "Radial = 2, Angular = 1",
      "C": "Radial = 2, Angular = 2",
      "D": "Radial = 0, Angular = 2"
    },
    "correct_option": "A",
    "explanation": "For any orbital, radial nodes = n - l - 1 and angular nodes = l. For 4d: n = 4, l = 2. Radial nodes = 4 - 2 - 1 = 1. Angular nodes = 2. Total nodes = 3.",
    "distractor_analysis": {
      "A": "Correct. For any orbital, radial nodes = n - l - 1 and angular nodes = l. For 4d: n = 4, ",
      "B": "Incorrect. Common distractor based on: Confusing radial node formula (n - l - 1) with total princip",
      "C": "Incorrect. Common distractor based on: Confusing radial node formula (n - l - 1) with total princip",
      "D": "Incorrect. Common distractor based on: Confusing radial node formula (n - l - 1) with total princip"
    },
    "misconception": "Confusing radial node formula (n - l - 1) with total principal quantum number n.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Atomic Structure",
    "difficulty_tier": 3,
    "question_text": "What is the ratio of the de Broglie wavelength of an alpha particle to that of a proton if both are accelerated from rest through the same potential difference V?",
    "options": {
      "A": "1 : (2 * sqrt(2))",
      "B": "1 : 2",
      "C": "1 : 4",
      "D": "2 * sqrt(2) : 1"
    },
    "correct_option": "A",
    "explanation": "lambda = h / sqrt(2 m q V). Ratio lambda_alpha / lambda_p = sqrt((m_p * q_p) / (m_alpha * q_alpha)) = sqrt((m * e) / (4m * 2e)) = sqrt(1/8) = 1 / (2 * sqrt(2)).",
    "distractor_analysis": {
      "A": "Correct. lambda = h / sqrt(2 m q V). Ratio lambda_alpha / lambda_p = sqrt((m_p * q_p) / (",
      "B": "Incorrect. Common distractor based on: Forgetting that alpha particle has both 4 times proton mass ",
      "C": "Incorrect. Common distractor based on: Forgetting that alpha particle has both 4 times proton mass ",
      "D": "Incorrect. Common distractor based on: Forgetting that alpha particle has both 4 times proton mass "
    },
    "misconception": "Forgetting that alpha particle has both 4 times proton mass and 2 times proton charge.",
    "time_estimate_seconds": 50
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Atomic Structure",
    "difficulty_tier": 3,
    "question_text": "According to the Bohr model, the radius of the second orbit of Li^2+ is:",
    "options": {
      "A": "(4/3) * a0",
      "B": "(2/3) * a0",
      "C": "(9/4) * a0",
      "D": "(3/2) * a0"
    },
    "correct_option": "A",
    "explanation": "Bohr radius r_n = a0 * n^2 / Z. For Li^2+: Z = 3, n = 2. r_2 = a0 * (2^2 / 3) = (4/3) * a0.",
    "distractor_analysis": {
      "A": "Correct. Bohr radius r_n = a0 * n^2 / Z. For Li^2+: Z = 3, n = 2. r_2 = a0 * (2^2 / 3) = ",
      "B": "Incorrect. Common distractor based on: Multiplying by Z instead of dividing by Z (r proportional to",
      "C": "Incorrect. Common distractor based on: Multiplying by Z instead of dividing by Z (r proportional to",
      "D": "Incorrect. Common distractor based on: Multiplying by Z instead of dividing by Z (r proportional to"
    },
    "misconception": "Multiplying by Z instead of dividing by Z (r proportional to n^2 / Z).",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Atomic Structure",
    "difficulty_tier": 3,
    "question_text": "If the uncertainty in position of an electron is equal to its de Broglie wavelength, what is the minimum fractional uncertainty in its velocity (Delta v / v)?",
    "options": {
      "A": "1 / (4 pi)",
      "B": "1 / (2 pi)",
      "C": "2 pi",
      "D": "4 pi"
    },
    "correct_option": "A",
    "explanation": "By Heisenberg's principle: Delta x * Delta p >= h / (4 pi). Since Delta x = lambda = h / p, (h / p) * Delta p >= h / (4 pi) -> Delta p / p >= 1 / (4 pi). Since Delta p / p = Delta v / v, min fractional uncertainty = 1 / (4 pi).",
    "distractor_analysis": {
      "A": "Correct. By Heisenberg's principle: Delta x * Delta p >= h / (4 pi). Since Delta x = lamb",
      "B": "Incorrect. Common distractor based on: Using h-bar instead of h in Heisenberg relation or forgettin",
      "C": "Incorrect. Common distractor based on: Using h-bar instead of h in Heisenberg relation or forgettin",
      "D": "Incorrect. Common distractor based on: Using h-bar instead of h in Heisenberg relation or forgettin"
    },
    "misconception": "Using h-bar instead of h in Heisenberg relation or forgetting lambda = h/p cancellation.",
    "time_estimate_seconds": 55
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Atomic Structure",
    "difficulty_tier": 3,
    "question_text": "Which of the following electronic transitions in a hydrogen atom emits a photon of the highest frequency?",
    "options": {
      "A": "n = 2 to n = 1",
      "B": "n = 3 to n = 2",
      "C": "n = 4 to n = 3",
      "D": "n = 5 to n = 4"
    },
    "correct_option": "A",
    "explanation": "Delta E = 13.6 * (1/n1^2 - 1/n2^2) eV. For 2 -> 1: Delta E = 13.6 * (1 - 1/4) = 10.2 eV. All other transitions involve higher levels where energy spacing is much narrower.",
    "distractor_analysis": {
      "A": "Correct. Delta E = 13.6 * (1/n1^2 - 1/n2^2) eV. For 2 -> 1: Delta E = 13.6 * (1 - 1/4) = ",
      "B": "Incorrect. Common distractor based on: Assuming higher quantum numbers (e.g., 5 -> 4) correspond to",
      "C": "Incorrect. Common distractor based on: Assuming higher quantum numbers (e.g., 5 -> 4) correspond to",
      "D": "Incorrect. Common distractor based on: Assuming higher quantum numbers (e.g., 5 -> 4) correspond to"
    },
    "misconception": "Assuming higher quantum numbers (e.g., 5 -> 4) correspond to higher transition energy.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Atomic Structure",
    "difficulty_tier": 3,
    "question_text": "What is the orbital angular momentum of an electron in a 3p orbital?",
    "options": {
      "A": "sqrt(2) * h-bar",
      "B": "sqrt(6) * h-bar",
      "C": "h-bar",
      "D": "0"
    },
    "correct_option": "A",
    "explanation": "Orbital angular momentum L = sqrt(l * (l + 1)) * h-bar. For a p orbital, l = 1. L = sqrt(1 * 2) * h-bar = sqrt(2) * h-bar.",
    "distractor_analysis": {
      "A": "Correct. Orbital angular momentum L = sqrt(l * (l + 1)) * h-bar. For a p orbital, l = 1. ",
      "B": "Incorrect. Common distractor based on: Confusing orbital angular momentum (depends on l) with spin ",
      "C": "Incorrect. Common distractor based on: Confusing orbital angular momentum (depends on l) with spin ",
      "D": "Incorrect. Common distractor based on: Confusing orbital angular momentum (depends on l) with spin "
    },
    "misconception": "Confusing orbital angular momentum (depends on l) with spin angular momentum or principal n.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Atomic Structure",
    "difficulty_tier": 3,
    "question_text": "The first ionization enthalpy of Nitrogen is higher than that of Oxygen because:",
    "options": {
      "A": "Nitrogen has a half-filled, extra stable 2p subshell",
      "B": "Oxygen has higher nuclear charge than Nitrogen",
      "C": "Nitrogen has a smaller atomic radius than Oxygen",
      "D": "Oxygen has greater shielding effect than Nitrogen"
    },
    "correct_option": "A",
    "explanation": "Nitrogen has electronic configuration [He] 2s^2 2p^3 (half-filled p-subshell, extra exchange energy stabilization). Oxygen is 2p^4, where pairing in one p-orbital causes electron-electron repulsion, making ionization easier.",
    "distractor_analysis": {
      "A": "Correct. Nitrogen has electronic configuration [He] 2s^2 2p^3 (half-filled p-subshell, ex",
      "B": "Incorrect. Common distractor based on: Assuming ionization enthalpy increases strictly monotonicall",
      "C": "Incorrect. Common distractor based on: Assuming ionization enthalpy increases strictly monotonicall",
      "D": "Incorrect. Common distractor based on: Assuming ionization enthalpy increases strictly monotonicall"
    },
    "misconception": "Assuming ionization enthalpy increases strictly monotonically across a period.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Atomic Structure",
    "difficulty_tier": 3,
    "question_text": "What is the maximum number of electrons that can be accommodated in an atom with principal quantum number n = 4 and spin quantum number ms = -1/2?",
    "options": {
      "A": "16",
      "B": "32",
      "C": "8",
      "D": "64"
    },
    "correct_option": "A",
    "explanation": "Total electrons in n = 4 shell is 2n^2 = 2(4^2) = 32. Exactly half of these have ms = +1/2 and half have ms = -1/2. Thus, max electrons with ms = -1/2 is 16.",
    "distractor_analysis": {
      "A": "Correct. Total electrons in n = 4 shell is 2n^2 = 2(4^2) = 32. Exactly half of these have",
      "B": "Incorrect. Common distractor based on: Providing total electrons in the shell (32) without filterin",
      "C": "Incorrect. Common distractor based on: Providing total electrons in the shell (32) without filterin",
      "D": "Incorrect. Common distractor based on: Providing total electrons in the shell (32) without filterin"
    },
    "misconception": "Providing total electrons in the shell (32) without filtering by spin quantum number.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Atomic Structure",
    "difficulty_tier": 3,
    "question_text": "A light source of wavelength 310 nm ejects photoelectrons with maximum kinetic energy 1.5 eV from a metal. What is the work function of the metal? (hc = 1240 eV*nm)",
    "options": {
      "A": "2.5 eV",
      "B": "1.5 eV",
      "C": "4.0 eV",
      "D": "0.5 eV"
    },
    "correct_option": "A",
    "explanation": "Photon energy E = hc / lambda = 1240 / 310 = 4.0 eV. Photoelectric equation: KE_max = E - phi -> 1.5 = 4.0 - phi -> phi = 2.5 eV.",
    "distractor_analysis": {
      "A": "Correct. Photon energy E = hc / lambda = 1240 / 310 = 4.0 eV. Photoelectric equation: KE_",
      "B": "Incorrect. Common distractor based on: Adding KE to photon energy rather than subtracting.",
      "C": "Incorrect. Common distractor based on: Adding KE to photon energy rather than subtracting.",
      "D": "Incorrect. Common distractor based on: Adding KE to photon energy rather than subtracting."
    },
    "misconception": "Adding KE to photon energy rather than subtracting.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Atomic Structure",
    "difficulty_tier": 3,
    "question_text": "The wave number of the first line in the Balmer series of hydrogen is nu_bar. What is the wave number of the first line of the Balmer series for Li^2+?",
    "options": {
      "A": "9 * nu_bar",
      "B": "3 * nu_bar",
      "C": "nu_bar / 9",
      "D": "nu_bar / 3"
    },
    "correct_option": "A",
    "explanation": "Rydberg equation: nu_bar = R_H * Z^2 * (1/n1^2 - 1/n2^2). For Li^2+, Z = 3. Since transition (n1, n2) is identical, nu_bar' = Z^2 * nu_bar = 3^2 * nu_bar = 9 * nu_bar.",
    "distractor_analysis": {
      "A": "Correct. Rydberg equation: nu_bar = R_H * Z^2 * (1/n1^2 - 1/n2^2). For Li^2+, Z = 3. Sinc",
      "B": "Incorrect. Common distractor based on: Using Z instead of Z^2 in the Rydberg relation.",
      "C": "Incorrect. Common distractor based on: Using Z instead of Z^2 in the Rydberg relation.",
      "D": "Incorrect. Common distractor based on: Using Z instead of Z^2 in the Rydberg relation."
    },
    "misconception": "Using Z instead of Z^2 in the Rydberg relation.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Atomic Structure",
    "difficulty_tier": 3,
    "question_text": "Which set of quantum numbers (n, l, ml, ms) is not permissible for an electron in an atom?",
    "options": {
      "A": "n = 3, l = 3, ml = 0, ms = +1/2",
      "B": "n = 4, l = 2, ml = -1, ms = -1/2",
      "C": "n = 2, l = 1, ml = -1, ms = +1/2",
      "D": "n = 5, l = 0, ml = 0, ms = -1/2"
    },
    "correct_option": "A",
    "explanation": "Azimuthal quantum number l can only take integer values from 0 to n - 1. For n = 3, max l is 2. Therefore l = 3 is forbidden.",
    "distractor_analysis": {
      "A": "Correct. Azimuthal quantum number l can only take integer values from 0 to n - 1. For n =",
      "B": "Incorrect. Common distractor based on: Allowing l = n.",
      "C": "Incorrect. Common distractor based on: Allowing l = n.",
      "D": "Incorrect. Common distractor based on: Allowing l = n."
    },
    "misconception": "Allowing l = n.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Chemical Bonding",
    "difficulty_tier": 3,
    "question_text": "What is the molecular geometry and hybridization of the central atom in XeF4?",
    "options": {
      "A": "Square planar, sp^3d^2",
      "B": "Tetrahedral, sp^3",
      "C": "See-saw, sp^3d",
      "D": "Square pyramidal, sp^3d^2"
    },
    "correct_option": "A",
    "explanation": "Xe has 8 valence electrons. With 4 F atoms, it forms 4 bonding pairs and has 2 lone pairs. Steric number = 6 -> sp^3d^2 hybridization with octahedral electron geometry. The two lone pairs occupy trans axial positions, giving square planar molecular geometry.",
    "distractor_analysis": {
      "A": "Correct. Xe has 8 valence electrons. With 4 F atoms, it forms 4 bonding pairs and has 2 l",
      "B": "Incorrect. Common distractor based on: Confusing electron-group octahedral geometry with molecular ",
      "C": "Incorrect. Common distractor based on: Confusing electron-group octahedral geometry with molecular ",
      "D": "Incorrect. Common distractor based on: Confusing electron-group octahedral geometry with molecular "
    },
    "misconception": "Confusing electron-group octahedral geometry with molecular square planar geometry.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Chemical Bonding",
    "difficulty_tier": 3,
    "question_text": "According to Molecular Orbital Theory, which of the following species is diamagnetic?",
    "options": {
      "A": "C2",
      "B": "O2",
      "C": "B2",
      "D": "NO"
    },
    "correct_option": "A",
    "explanation": "C2 has 12 electrons: sigma1s^2 sigma*1s^2 sigma2s^2 sigma*2s^2 pi2px^2 pi2py^2. All electrons are fully paired, so C2 is diamagnetic. O2 and B2 have unpaired electrons in pi* and pi orbitals respectively; NO has an odd electron.",
    "distractor_analysis": {
      "A": "Correct. C2 has 12 electrons: sigma1s^2 sigma*1s^2 sigma2s^2 sigma*2s^2 pi2px^2 pi2py^2. ",
      "B": "Incorrect. Common distractor based on: Assuming C2 has unpaired electrons by confusing its orbital ",
      "C": "Incorrect. Common distractor based on: Assuming C2 has unpaired electrons by confusing its orbital ",
      "D": "Incorrect. Common distractor based on: Assuming C2 has unpaired electrons by confusing its orbital "
    },
    "misconception": "Assuming C2 has unpaired electrons by confusing its orbital filling order with O2.",
    "time_estimate_seconds": 50
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Chemical Bonding",
    "difficulty_tier": 3,
    "question_text": "What is the correct order of bond dissociation enthalpy for halogens?",
    "options": {
      "A": "Cl2 > Br2 > F2 > I2",
      "B": "F2 > Cl2 > Br2 > I2",
      "C": "Cl2 > F2 > Br2 > I2",
      "D": "Br2 > Cl2 > F2 > I2"
    },
    "correct_option": "A",
    "explanation": "Due to the extremely small size of Fluorine, intense inter-electronic repulsion between lone pairs in the F-F bond significantly weakens it. Thus Cl2 (242 kJ/mol) > Br2 (193) > F2 (158) > I2 (151 kJ/mol).",
    "distractor_analysis": {
      "A": "Correct. Due to the extremely small size of Fluorine, intense inter-electronic repulsion ",
      "B": "Incorrect. Common distractor based on: Assuming bond energy follows periodic size trend strictly (p",
      "C": "Incorrect. Common distractor based on: Assuming bond energy follows periodic size trend strictly (p",
      "D": "Incorrect. Common distractor based on: Assuming bond energy follows periodic size trend strictly (p"
    },
    "misconception": "Assuming bond energy follows periodic size trend strictly (predicting F2 > Cl2).",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Chemical Bonding",
    "difficulty_tier": 3,
    "question_text": "Which of the following molecules has a non-zero dipole moment?",
    "options": {
      "A": "NF3",
      "B": "BF3",
      "C": "CCl4",
      "D": "PF5"
    },
    "correct_option": "A",
    "explanation": "NF3 is trigonal pyramidal with a lone pair. In BF3 (trigonal planar), CCl4 (tetrahedral), and PF5 (trigonal bipyramidal), bond dipoles cancel out completely due to high symmetry.",
    "distractor_analysis": {
      "A": "Correct. NF3 is trigonal pyramidal with a lone pair. In BF3 (trigonal planar), CCl4 (tetr",
      "B": "Incorrect. Common distractor based on: Assuming NF3 dipoles cancel out completely like BF3.",
      "C": "Incorrect. Common distractor based on: Assuming NF3 dipoles cancel out completely like BF3.",
      "D": "Incorrect. Common distractor based on: Assuming NF3 dipoles cancel out completely like BF3."
    },
    "misconception": "Assuming NF3 dipoles cancel out completely like BF3.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Chemical Bonding",
    "difficulty_tier": 3,
    "question_text": "According to Fajan's rules, which compound exhibits the highest degree of covalent character?",
    "options": {
      "A": "AlCl3",
      "B": "NaCl",
      "C": "MgCl2",
      "D": "CaCl2"
    },
    "correct_option": "A",
    "explanation": "Covalent character increases with smaller cation size and higher positive charge (high polarizing power). Al^3+ has the highest charge (+3) and smallest ionic radius, polarizing Cl^- most strongly.",
    "distractor_analysis": {
      "A": "Correct. Covalent character increases with smaller cation size and higher positive charge",
      "B": "Incorrect. Common distractor based on: Selecting larger or lower-valent cations like Na+ or Ca2+.",
      "C": "Incorrect. Common distractor based on: Selecting larger or lower-valent cations like Na+ or Ca2+.",
      "D": "Incorrect. Common distractor based on: Selecting larger or lower-valent cations like Na+ or Ca2+."
    },
    "misconception": "Selecting larger or lower-valent cations like Na+ or Ca2+.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Chemical Bonding",
    "difficulty_tier": 3,
    "question_text": "What is the bond order and magnetic property of the superoxide ion (O2^-)?",
    "options": {
      "A": "Bond order = 1.5, Paramagnetic",
      "B": "Bond order = 2.0, Diamagnetic",
      "C": "Bond order = 1.0, Diamagnetic",
      "D": "Bond order = 2.5, Paramagnetic"
    },
    "correct_option": "A",
    "explanation": "O2^- has 17 electrons. Electronic configuration has (pi*2px)^2 (pi*2py)^1. Bond order = (10 - 7)/2 = 1.5. Due to 1 unpaired electron in pi*2py, it is paramagnetic.",
    "distractor_analysis": {
      "A": "Correct. O2^- has 17 electrons. Electronic configuration has (pi*2px)^2 (pi*2py)^1. Bond ",
      "B": "Incorrect. Common distractor based on: Confusing superoxide (O2^-) with peroxide (O2^2-) which has ",
      "C": "Incorrect. Common distractor based on: Confusing superoxide (O2^-) with peroxide (O2^2-) which has ",
      "D": "Incorrect. Common distractor based on: Confusing superoxide (O2^-) with peroxide (O2^2-) which has "
    },
    "misconception": "Confusing superoxide (O2^-) with peroxide (O2^2-) which has bond order 1.0 and is diamagnetic.",
    "time_estimate_seconds": 50
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Chemical Bonding",
    "difficulty_tier": 3,
    "question_text": "The correct order of bond angles in NH3, H2O, and CH4 is:",
    "options": {
      "A": "CH4 (109.5 deg) > NH3 (107 deg) > H2O (104.5 deg)",
      "B": "H2O > NH3 > CH4",
      "C": "NH3 > CH4 > H2O",
      "D": "CH4 > H2O > NH3"
    },
    "correct_option": "A",
    "explanation": "All have sp^3 hybridized central atoms. By VSEPR, lone pair-lone pair repulsion > lone pair-bond pair > bond pair-bond pair. CH4 has 0 lone pairs (109.5), NH3 has 1 lone pair (107), H2O has 2 lone pairs (104.5).",
    "distractor_analysis": {
      "A": "Correct. All have sp^3 hybridized central atoms. By VSEPR, lone pair-lone pair repulsion ",
      "B": "Incorrect. Common distractor based on: Ignoring the repulsive effect of non-bonding lone pairs on b",
      "C": "Incorrect. Common distractor based on: Ignoring the repulsive effect of non-bonding lone pairs on b",
      "D": "Incorrect. Common distractor based on: Ignoring the repulsive effect of non-bonding lone pairs on b"
    },
    "misconception": "Ignoring the repulsive effect of non-bonding lone pairs on bond angles.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Chemical Bonding",
    "difficulty_tier": 3,
    "question_text": "In the molecule ClF3, how many lone pairs are present on the central chlorine atom, and what is its shape?",
    "options": {
      "A": "2 lone pairs, T-shaped",
      "B": "1 lone pair, Trigonal planar",
      "C": "2 lone pairs, Trigonal pyramidal",
      "D": "3 lone pairs, Linear"
    },
    "correct_option": "A",
    "explanation": "Cl has 7 valence electrons. Forming 3 single bonds with F leaves 4 non-bonding electrons (2 lone pairs). Steric number = 5 (sp^3d). Lone pairs occupy equatorial positions to minimize 90-degree repulsions, resulting in a T-shape.",
    "distractor_analysis": {
      "A": "Correct. Cl has 7 valence electrons. Forming 3 single bonds with F leaves 4 non-bonding e",
      "B": "Incorrect. Common distractor based on: Placing lone pairs in axial positions rather than equatorial",
      "C": "Incorrect. Common distractor based on: Placing lone pairs in axial positions rather than equatorial",
      "D": "Incorrect. Common distractor based on: Placing lone pairs in axial positions rather than equatorial"
    },
    "misconception": "Placing lone pairs in axial positions rather than equatorial positions in trigonal bipyramidal geometry.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Chemical Bonding",
    "difficulty_tier": 3,
    "question_text": "Which of the following pairs is isostructural (same molecular shape)?",
    "options": {
      "A": "NH3 and H3O^+",
      "B": "CO2 and SO2",
      "C": "BF3 and NF3",
      "D": "PCl5 and IF5"
    },
    "correct_option": "A",
    "explanation": "Both NH3 and H3O^+ have 3 bond pairs and 1 lone pair on the central atom (steric number 4, sp^3), giving a trigonal pyramidal shape. CO2 is linear while SO2 is bent.",
    "distractor_analysis": {
      "A": "Correct. Both NH3 and H3O^+ have 3 bond pairs and 1 lone pair on the central atom (steric",
      "B": "Incorrect. Common distractor based on: Confusing valence electrons of carbon and sulfur in CO2 vs S",
      "C": "Incorrect. Common distractor based on: Confusing valence electrons of carbon and sulfur in CO2 vs S",
      "D": "Incorrect. Common distractor based on: Confusing valence electrons of carbon and sulfur in CO2 vs S"
    },
    "misconception": "Confusing valence electrons of carbon and sulfur in CO2 vs SO2.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Chemical Bonding",
    "difficulty_tier": 3,
    "question_text": "Why does o-nitrophenol have a lower boiling point and higher steam volatility than p-nitrophenol?",
    "options": {
      "A": "o-nitrophenol forms intramolecular hydrogen bonds, reducing intermolecular association",
      "B": "p-nitrophenol has higher molecular weight",
      "C": "o-nitrophenol forms stronger intermolecular hydrogen bonds",
      "D": "The nitro group in o-nitrophenol is completely non-polar"
    },
    "correct_option": "A",
    "explanation": "In o-nitrophenol, the proximity of -OH and -NO2 allows chelation via intramolecular hydrogen bonding, preventing association with neighboring molecules. In p-nitrophenol, extensive intermolecular hydrogen bonding leads to polymeric association and higher boiling point.",
    "distractor_analysis": {
      "A": "Correct. In o-nitrophenol, the proximity of -OH and -NO2 allows chelation via intramolecu",
      "B": "Incorrect. Common distractor based on: Confusing intramolecular with intermolecular hydrogen bondin",
      "C": "Incorrect. Common distractor based on: Confusing intramolecular with intermolecular hydrogen bondin",
      "D": "Incorrect. Common distractor based on: Confusing intramolecular with intermolecular hydrogen bondin"
    },
    "misconception": "Confusing intramolecular with intermolecular hydrogen bonding.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Chemical Bonding",
    "difficulty_tier": 3,
    "question_text": "What is the hybridization and number of coordinate covalent bonds in the ammonium ion (NH4^+)?",
    "options": {
      "A": "sp^3, 1 coordinate bond",
      "B": "sp^2, 1 coordinate bond",
      "C": "sp^3, 0 coordinate bonds",
      "D": "dsp^2, 2 coordinate bonds"
    },
    "correct_option": "A",
    "explanation": "In NH4^+, nitrogen donates its lone pair to an incoming H^+ ion, forming 1 coordinate bond. With 4 equivalent N-H bonds and no lone pairs, steric number is 4, giving sp^3 hybridization (regular tetrahedral).",
    "distractor_analysis": {
      "A": "Correct. In NH4^+, nitrogen donates its lone pair to an incoming H^+ ion, forming 1 coord",
      "B": "Incorrect. Common distractor based on: Assuming all bonds in NH4+ are purely standard covalent with",
      "C": "Incorrect. Common distractor based on: Assuming all bonds in NH4+ are purely standard covalent with",
      "D": "Incorrect. Common distractor based on: Assuming all bonds in NH4+ are purely standard covalent with"
    },
    "misconception": "Assuming all bonds in NH4+ are purely standard covalent without coordinate origin.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Thermodynamics",
    "difficulty_tier": 3,
    "question_text": "For the reaction N2(g) + 3H2(g) <=> 2NH3(g) at 298 K, what is the relation between Delta H and Delta U?",
    "options": {
      "A": "Delta H = Delta U - 2RT",
      "B": "Delta H = Delta U + 2RT",
      "C": "Delta H = Delta U - RT",
      "D": "Delta H = Delta U"
    },
    "correct_option": "A",
    "explanation": "Delta H = Delta U + Delta n_g * RT. Here Delta n_g = moles of gaseous products - moles of gaseous reactants = 2 - (1 + 3) = -2. Therefore Delta H = Delta U - 2RT.",
    "distractor_analysis": {
      "A": "Correct. Delta H = Delta U + Delta n_g * RT. Here Delta n_g = moles of gaseous products -",
      "B": "Incorrect. Common distractor based on: Adding 2RT instead of subtracting due to incorrect sign in D",
      "C": "Incorrect. Common distractor based on: Adding 2RT instead of subtracting due to incorrect sign in D",
      "D": "Incorrect. Common distractor based on: Adding 2RT instead of subtracting due to incorrect sign in D"
    },
    "misconception": "Adding 2RT instead of subtracting due to incorrect sign in Delta n_g.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Thermodynamics",
    "difficulty_tier": 3,
    "question_text": "One mole of an ideal gas expands reversibly and isothermally at 300 K from 10 L to 100 L. What is the work done by the gas? (R = 8.314 J/mol*K, ln 10 = 2.303)",
    "options": {
      "A": "5744 J",
      "B": "-5744 J",
      "C": "2494 J",
      "D": "0 J"
    },
    "correct_option": "A",
    "explanation": "W_rev = -nRT ln(V2/V1) (IUPAC sign convention: work done BY the gas is positive in physics, negative in IUPAC chemistry). Work done by the gas = nRT ln(V2/V1) = 1 * 8.314 * 300 * 2.303 = 5744 J.",
    "distractor_analysis": {
      "A": "Correct. W_rev = -nRT ln(V2/V1) (IUPAC sign convention: work done BY the gas is positive ",
      "B": "Incorrect. Common distractor based on: Neglecting temperature or using common logarithm without 2.3",
      "C": "Incorrect. Common distractor based on: Neglecting temperature or using common logarithm without 2.3",
      "D": "Incorrect. Common distractor based on: Neglecting temperature or using common logarithm without 2.3"
    },
    "misconception": "Neglecting temperature or using common logarithm without 2.303 multiplier.",
    "time_estimate_seconds": 50
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Thermodynamics",
    "difficulty_tier": 3,
    "question_text": "For a process to be spontaneous at all temperatures, the required thermodynamic conditions are:",
    "options": {
      "A": "Delta H < 0 and Delta S > 0",
      "B": "Delta H > 0 and Delta S < 0",
      "C": "Delta H < 0 and Delta S < 0",
      "D": "Delta H > 0 and Delta S > 0"
    },
    "correct_option": "A",
    "explanation": "Gibbs free energy change Delta G = Delta H - T * Delta S. If Delta H < 0 (exothermic) and Delta S > 0 (entropy increase), Delta G is strictly negative at all positive absolute temperatures T.",
    "distractor_analysis": {
      "A": "Correct. Gibbs free energy change Delta G = Delta H - T * Delta S. If Delta H < 0 (exothe",
      "B": "Incorrect. Common distractor based on: Confusing enthalpy and entropy signs for spontaneity.",
      "C": "Incorrect. Common distractor based on: Confusing enthalpy and entropy signs for spontaneity.",
      "D": "Incorrect. Common distractor based on: Confusing enthalpy and entropy signs for spontaneity."
    },
    "misconception": "Confusing enthalpy and entropy signs for spontaneity.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Thermodynamics",
    "difficulty_tier": 3,
    "question_text": "The standard enthalpy of formation of H2O(l) is -286 kJ/mol. What is the enthalpy change for the decomposition of 36 g of liquid water into H2(g) and O2(g)?",
    "options": {
      "A": "+572 kJ",
      "B": "-572 kJ",
      "C": "+286 kJ",
      "D": "-286 kJ"
    },
    "correct_option": "A",
    "explanation": "36 g of water corresponds to 2 moles of H2O. Decomposition is the exact reverse of formation: Delta H_decomp = -Delta H_f = +286 kJ/mol. For 2 moles: Delta H = 2 * (+286) = +572 kJ.",
    "distractor_analysis": {
      "A": "Correct. 36 g of water corresponds to 2 moles of H2O. Decomposition is the exact reverse ",
      "B": "Incorrect. Common distractor based on: Calculating for 1 mole (18 g) instead of 36 g, or getting th",
      "C": "Incorrect. Common distractor based on: Calculating for 1 mole (18 g) instead of 36 g, or getting th",
      "D": "Incorrect. Common distractor based on: Calculating for 1 mole (18 g) instead of 36 g, or getting th"
    },
    "misconception": "Calculating for 1 mole (18 g) instead of 36 g, or getting the sign wrong.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Thermodynamics",
    "difficulty_tier": 3,
    "question_text": "Which of the following is an intensive property?",
    "options": {
      "A": "Density",
      "B": "Internal energy",
      "C": "Entropy",
      "D": "Enthalpy"
    },
    "correct_option": "A",
    "explanation": "An intensive property does not depend on the quantity of matter present. Density (= mass / volume, ratio of two extensive properties) is intensive. Internal energy, entropy, and enthalpy scale with system size (extensive).",
    "distractor_analysis": {
      "A": "Correct. An intensive property does not depend on the quantity of matter present. Density",
      "B": "Incorrect. Common distractor based on: Confusing extensive thermal state functions with intensive i",
      "C": "Incorrect. Common distractor based on: Confusing extensive thermal state functions with intensive i",
      "D": "Incorrect. Common distractor based on: Confusing extensive thermal state functions with intensive i"
    },
    "misconception": "Confusing extensive thermal state functions with intensive intensive properties.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Thermodynamics",
    "difficulty_tier": 3,
    "question_text": "In an adiabatic expansion of an ideal gas, the work done W is related to change in internal energy Delta U by:",
    "options": {
      "A": "W = -Delta U",
      "B": "W = Delta U",
      "C": "W = 0",
      "D": "W = q + Delta U"
    },
    "correct_option": "A",
    "explanation": "First Law of Thermodynamics: Delta U = q + W. In an adiabatic process, heat exchange q = 0. Therefore Delta U = W (IUPAC: work done on system), or work done by system W_by = -Delta U.",
    "distractor_analysis": {
      "A": "Correct. First Law of Thermodynamics: Delta U = q + W. In an adiabatic process, heat exch",
      "B": "Incorrect. Common distractor based on: Assuming work done in an adiabatic process is zero.",
      "C": "Incorrect. Common distractor based on: Assuming work done in an adiabatic process is zero.",
      "D": "Incorrect. Common distractor based on: Assuming work done in an adiabatic process is zero."
    },
    "misconception": "Assuming work done in an adiabatic process is zero.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Thermodynamics",
    "difficulty_tier": 3,
    "question_text": "The standard Gibbs free energy change Delta G^circ for a reaction is related to the equilibrium constant K by:",
    "options": {
      "A": "Delta G^circ = -RT ln K",
      "B": "Delta G^circ = RT ln K",
      "C": "Delta G^circ = -R ln K",
      "D": "Delta G^circ = -T ln K"
    },
    "correct_option": "A",
    "explanation": "By van 't Hoff reaction isotherm, Delta G = Delta G^circ + RT ln Q. At equilibrium, Delta G = 0 and Q = K, yielding Delta G^circ = -RT ln K.",
    "distractor_analysis": {
      "A": "Correct. By van 't Hoff reaction isotherm, Delta G = Delta G^circ + RT ln Q. At equilibri",
      "B": "Incorrect. Common distractor based on: Omitting the negative sign or temperature factor T.",
      "C": "Incorrect. Common distractor based on: Omitting the negative sign or temperature factor T.",
      "D": "Incorrect. Common distractor based on: Omitting the negative sign or temperature factor T."
    },
    "misconception": "Omitting the negative sign or temperature factor T.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Thermodynamics",
    "difficulty_tier": 3,
    "question_text": "What is the entropy change (Delta S) when 1 mole of ice melts reversibly at 0 deg C? (Enthalpy of fusion = 6.0 kJ/mol)",
    "options": {
      "A": "22.0 J/(mol*K)",
      "B": "16.1 J/(mol*K)",
      "C": "60.0 J/(mol*K)",
      "D": "0 J/(mol*K)"
    },
    "correct_option": "A",
    "explanation": "Delta S_fus = Delta H_fus / T_fus = 6000 J/mol / 273.15 K = 21.97 J/(mol*K) approx 22.0 J/(mol*K).",
    "distractor_analysis": {
      "A": "Correct. Delta S_fus = Delta H_fus / T_fus = 6000 J/mol / 273.15 K = 21.97 J/(mol*K) appr",
      "B": "Incorrect. Common distractor based on: Dividing by 0 deg C instead of converting to absolute temper",
      "C": "Incorrect. Common distractor based on: Dividing by 0 deg C instead of converting to absolute temper",
      "D": "Incorrect. Common distractor based on: Dividing by 0 deg C instead of converting to absolute temper"
    },
    "misconception": "Dividing by 0 deg C instead of converting to absolute temperature in Kelvin (273 K).",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Thermodynamics",
    "difficulty_tier": 3,
    "question_text": "For an isolated system undergoing an irreversible spontaneous process, which statement is strictly true?",
    "options": {
      "A": "Delta U = 0, Delta S_system > 0",
      "B": "Delta U < 0, Delta S_system = 0",
      "C": "Delta U > 0, Delta S_system > 0",
      "D": "Delta U = 0, Delta S_system = 0"
    },
    "correct_option": "A",
    "explanation": "An isolated system exchanges neither mass nor energy with surroundings, so Delta U = 0. By the Second Law of Thermodynamics, any spontaneous irreversible process inside an isolated system increases its entropy: Delta S > 0.",
    "distractor_analysis": {
      "A": "Correct. An isolated system exchanges neither mass nor energy with surroundings, so Delta",
      "B": "Incorrect. Common distractor based on: Assuming entropy remains constant for an isolated system in ",
      "C": "Incorrect. Common distractor based on: Assuming entropy remains constant for an isolated system in ",
      "D": "Incorrect. Common distractor based on: Assuming entropy remains constant for an isolated system in "
    },
    "misconception": "Assuming entropy remains constant for an isolated system in an irreversible process.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Thermodynamics",
    "difficulty_tier": 3,
    "question_text": "Bond dissociation enthalpies of H-H, Cl-Cl, and H-Cl are 434, 242, and 431 kJ/mol respectively. What is the standard enthalpy of formation of HCl(g)?",
    "options": {
      "A": "-93 kJ/mol",
      "B": "+93 kJ/mol",
      "C": "-186 kJ/mol",
      "D": "+186 kJ/mol"
    },
    "correct_option": "A",
    "explanation": "Formation reaction: 1/2 H2(g) + 1/2 Cl2(g) -> HCl(g). Delta H_f = 0.5 * D(H-H) + 0.5 * D(Cl-Cl) - D(H-Cl) = 0.5(434) + 0.5(242) - 431 = 217 + 121 - 431 = 338 - 431 = -93 kJ/mol.",
    "distractor_analysis": {
      "A": "Correct. Formation reaction: 1/2 H2(g) + 1/2 Cl2(g) -> HCl(g). Delta H_f = 0.5 * D(H-H) +",
      "B": "Incorrect. Common distractor based on: Calculating for 2 moles of HCl (-186 kJ/mol) instead of 1 mo",
      "C": "Incorrect. Common distractor based on: Calculating for 2 moles of HCl (-186 kJ/mol) instead of 1 mo",
      "D": "Incorrect. Common distractor based on: Calculating for 2 moles of HCl (-186 kJ/mol) instead of 1 mo"
    },
    "misconception": "Calculating for 2 moles of HCl (-186 kJ/mol) instead of 1 mole standard formation.",
    "time_estimate_seconds": 50
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Thermodynamics",
    "difficulty_tier": 3,
    "question_text": "What is the work done when 2 moles of an ideal gas expands into a vacuum (free expansion)?",
    "options": {
      "A": "Zero",
      "B": "-nRT ln(V2/V1)",
      "C": "P_ext * (V2 - V1)",
      "D": "n Cv Delta T"
    },
    "correct_option": "A",
    "explanation": "Free expansion occurs against zero external opposing pressure (P_ext = 0). Since work W = -int P_ext dV, W = 0.",
    "distractor_analysis": {
      "A": "Correct. Free expansion occurs against zero external opposing pressure (P_ext = 0). Since",
      "B": "Incorrect. Common distractor based on: Using reversible isothermal work formula for an irreversible",
      "C": "Incorrect. Common distractor based on: Using reversible isothermal work formula for an irreversible",
      "D": "Incorrect. Common distractor based on: Using reversible isothermal work formula for an irreversible"
    },
    "misconception": "Using reversible isothermal work formula for an irreversible free expansion into vacuum.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Chemical Equilibrium",
    "difficulty_tier": 3,
    "question_text": "For the reaction PCl5(g) <=> PCl3(g) + Cl2(g), what is the relation between Kp and Kc?",
    "options": {
      "A": "Kp = Kc * (RT)",
      "B": "Kp = Kc / (RT)",
      "C": "Kp = Kc * (RT)^2",
      "D": "Kp = Kc"
    },
    "correct_option": "A",
    "explanation": "Kp = Kc * (RT)^Delta n_g. Delta n_g = moles of gaseous products - moles of gaseous reactants = (1 + 1) - 1 = 1. Therefore Kp = Kc * (RT).",
    "distractor_analysis": {
      "A": "Correct. Kp = Kc * (RT)^Delta n_g. Delta n_g = moles of gaseous products - moles of gaseo",
      "B": "Incorrect. Common distractor based on: Inverting the RT term or setting Delta n_g = 0.",
      "C": "Incorrect. Common distractor based on: Inverting the RT term or setting Delta n_g = 0.",
      "D": "Incorrect. Common distractor based on: Inverting the RT term or setting Delta n_g = 0."
    },
    "misconception": "Inverting the RT term or setting Delta n_g = 0.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Chemical Equilibrium",
    "difficulty_tier": 3,
    "question_text": "In the Haber process, N2(g) + 3H2(g) <=> 2NH3(g) (Delta H < 0), which condition maximizes the equilibrium yield of ammonia?",
    "options": {
      "A": "High pressure and low temperature",
      "B": "Low pressure and high temperature",
      "C": "High pressure and high temperature",
      "D": "Low pressure and low temperature"
    },
    "correct_option": "A",
    "explanation": "The forward reaction reduces gaseous moles (4 -> 2), so increasing pressure shifts equilibrium forward. Forward reaction is exothermic (Delta H < 0), so lowering temperature shifts equilibrium forward (Le Chatelier).",
    "distractor_analysis": {
      "A": "Correct. The forward reaction reduces gaseous moles (4 -> 2), so increasing pressure shif",
      "B": "Incorrect. Common distractor based on: Confusing equilibrium yield (favored by low T) with kinetic ",
      "C": "Incorrect. Common distractor based on: Confusing equilibrium yield (favored by low T) with kinetic ",
      "D": "Incorrect. Common distractor based on: Confusing equilibrium yield (favored by low T) with kinetic "
    },
    "misconception": "Confusing equilibrium yield (favored by low T) with kinetic reaction rate (favored by high T).",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Chemical Equilibrium",
    "difficulty_tier": 3,
    "question_text": "What is the pH of a 10^-8 M aqueous solution of HCl at 25 deg C?",
    "options": {
      "A": "Between 6.95 and 7.00",
      "B": "8.00",
      "C": "6.00",
      "D": "7.00"
    },
    "correct_option": "A",
    "explanation": "In extremely dilute acid, H^+ from auto-ionization of water cannot be neglected. Total [H^+] = [H^+]_HCl + [H^+]_water = 10^-8 + x. Since (10^-8 + x)(x) = 10^-14 -> x = 9.5 x 10^-8 M. Total [H^+] = 1.05 x 10^-7 M -> pH = -log(1.05 x 10^-7) approx 6.98.",
    "distractor_analysis": {
      "A": "Correct. In extremely dilute acid, H^+ from auto-ionization of water cannot be neglected.",
      "B": "Incorrect. Common distractor based on: Reporting pH = 8 for an acidic solution.",
      "C": "Incorrect. Common distractor based on: Reporting pH = 8 for an acidic solution.",
      "D": "Incorrect. Common distractor based on: Reporting pH = 8 for an acidic solution."
    },
    "misconception": "Reporting pH = 8 for an acidic solution.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Chemical Equilibrium",
    "difficulty_tier": 3,
    "question_text": "If the solubility product Ksp of Ag2CrO4 is 1.1 x 10^-12, what is its molar solubility S in pure water?",
    "options": {
      "A": "(Ksp / 4)^(1/3)",
      "B": "sqrt(Ksp)",
      "C": "(Ksp / 27)^(1/4)",
      "D": "Ksp / 2"
    },
    "correct_option": "A",
    "explanation": "Ag2CrO4(s) <=> 2 Ag^+ + CrO4^2-. If solubility is S, [Ag^+] = 2S and [CrO4^2-] = S. Ksp = (2S)^2 * (S) = 4 S^3 -> S = (Ksp / 4)^(1/3).",
    "distractor_analysis": {
      "A": "Correct. Ag2CrO4(s) <=> 2 Ag^+ + CrO4^2-. If solubility is S, [Ag^+] = 2S and [CrO4^2-] =",
      "B": "Incorrect. Common distractor based on: Using Ksp = S^2 (confusing 1:1 salt with 2:1 salt).",
      "C": "Incorrect. Common distractor based on: Using Ksp = S^2 (confusing 1:1 salt with 2:1 salt).",
      "D": "Incorrect. Common distractor based on: Using Ksp = S^2 (confusing 1:1 salt with 2:1 salt)."
    },
    "misconception": "Using Ksp = S^2 (confusing 1:1 salt with 2:1 salt).",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Chemical Equilibrium",
    "difficulty_tier": 3,
    "question_text": "What is the pH of an aqueous buffer containing 0.1 M CH3COOH and 0.1 M CH3COONa? (Ka of acetic acid = 1.8 x 10^-5, pKa = 4.74)",
    "options": {
      "A": "4.74",
      "B": "5.74",
      "C": "3.74",
      "D": "7.00"
    },
    "correct_option": "A",
    "explanation": "Henderson-Hasselbalch equation: pH = pKa + log([Salt]/[Acid]) = 4.74 + log(0.1/0.1) = 4.74 + 0 = 4.74.",
    "distractor_analysis": {
      "A": "Correct. Henderson-Hasselbalch equation: pH = pKa + log([Salt]/[Acid]) = 4.74 + log(0.1/0",
      "B": "Incorrect. Common distractor based on: Applying salt hydrolysis formula instead of Henderson-Hassel",
      "C": "Incorrect. Common distractor based on: Applying salt hydrolysis formula instead of Henderson-Hassel",
      "D": "Incorrect. Common distractor based on: Applying salt hydrolysis formula instead of Henderson-Hassel"
    },
    "misconception": "Applying salt hydrolysis formula instead of Henderson-Hasselbalch buffer equation.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Chemical Equilibrium",
    "difficulty_tier": 3,
    "question_text": "When an inert gas is added to the equilibrium system N2O4(g) <=> 2 NO2(g) at constant volume, what happens to the equilibrium position?",
    "options": {
      "A": "Remains unaffected",
      "B": "Shifts to the right",
      "C": "Shifts to the left",
      "D": "Kp increases"
    },
    "correct_option": "A",
    "explanation": "Adding inert gas at constant volume increases total pressure, but partial pressures of reacting gases remain unchanged because their concentrations (moles/volume) do not change. Equilibrium is unaffected.",
    "distractor_analysis": {
      "A": "Correct. Adding inert gas at constant volume increases total pressure, but partial pressu",
      "B": "Incorrect. Common distractor based on: Assuming adding inert gas at constant volume shifts equilibr",
      "C": "Incorrect. Common distractor based on: Assuming adding inert gas at constant volume shifts equilibr",
      "D": "Incorrect. Common distractor based on: Assuming adding inert gas at constant volume shifts equilibr"
    },
    "misconception": "Assuming adding inert gas at constant volume shifts equilibrium toward fewer moles.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Chemical Equilibrium",
    "difficulty_tier": 3,
    "question_text": "What is the degree of dissociation alpha of PCl5 vapor if its initial vapor density is D and equilibrium vapor density is d?",
    "options": {
      "A": "alpha = (D - d) / d",
      "B": "alpha = (d - D) / D",
      "C": "alpha = (D - d) / (2d)",
      "D": "alpha = D / d"
    },
    "correct_option": "A",
    "explanation": "General formula for A <=> n B: alpha = (D - d) / ((n - 1) * d). For PCl5 <=> PCl3 + Cl2, n = 2. Thus alpha = (D - d) / ((2 - 1) * d) = (D - d) / d.",
    "distractor_analysis": {
      "A": "Correct. General formula for A <=> n B: alpha = (D - d) / ((n - 1) * d). For PCl5 <=> PCl",
      "B": "Incorrect. Common distractor based on: Inverting numerator or dividing by D instead of d.",
      "C": "Incorrect. Common distractor based on: Inverting numerator or dividing by D instead of d.",
      "D": "Incorrect. Common distractor based on: Inverting numerator or dividing by D instead of d."
    },
    "misconception": "Inverting numerator or dividing by D instead of d.",
    "time_estimate_seconds": 50
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Chemical Equilibrium",
    "difficulty_tier": 3,
    "question_text": "Which of the following salts hydrolyzes to produce an acidic aqueous solution (pH < 7)?",
    "options": {
      "A": "NH4Cl",
      "B": "CH3COONa",
      "C": "NaCl",
      "D": "KNO3"
    },
    "correct_option": "A",
    "explanation": "NH4Cl is the salt of a weak base (NH4OH) and a strong acid (HCl). The cation NH4^+ undergoes hydrolysis: NH4^+ + H2O <=> NH3 + H3O^+, releasing excess hydronium ions and lowering pH below 7.",
    "distractor_analysis": {
      "A": "Correct. NH4Cl is the salt of a weak base (NH4OH) and a strong acid (HCl). The cation NH4",
      "B": "Incorrect. Common distractor based on: Confusing salts of weak acid/strong base with salts of weak ",
      "C": "Incorrect. Common distractor based on: Confusing salts of weak acid/strong base with salts of weak ",
      "D": "Incorrect. Common distractor based on: Confusing salts of weak acid/strong base with salts of weak "
    },
    "misconception": "Confusing salts of weak acid/strong base with salts of weak base/strong acid.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Chemical Equilibrium",
    "difficulty_tier": 3,
    "question_text": "For an endothermic reaction, how does the equilibrium constant K vary with temperature?",
    "options": {
      "A": "K increases with increasing temperature",
      "B": "K decreases with increasing temperature",
      "C": "K remains constant",
      "D": "K first increases then decreases"
    },
    "correct_option": "A",
    "explanation": "By van 't Hoff equation: d(ln K)/dT = Delta H^circ / (R T^2). For an endothermic reaction (Delta H^circ > 0), the slope is positive, so K increases with temperature.",
    "distractor_analysis": {
      "A": "Correct. By van 't Hoff equation: d(ln K)/dT = Delta H^circ / (R T^2). For an endothermic",
      "B": "Incorrect. Common distractor based on: Confusing endothermic with exothermic behavior.",
      "C": "Incorrect. Common distractor based on: Confusing endothermic with exothermic behavior.",
      "D": "Incorrect. Common distractor based on: Confusing endothermic with exothermic behavior."
    },
    "misconception": "Confusing endothermic with exothermic behavior.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Chemical Equilibrium",
    "difficulty_tier": 3,
    "question_text": "What is the solubility of AgCl in 0.1 M NaCl solution compared to that in pure water? (Common ion effect)",
    "options": {
      "A": "Significantly lower in NaCl solution",
      "B": "Significantly higher in NaCl solution",
      "C": "Exactly the same",
      "D": "Dependent on atmospheric pressure"
    },
    "correct_option": "A",
    "explanation": "NaCl completely dissociates to provide 0.1 M Cl^- ions. By Le Chatelier's principle and Ksp = [Ag^+][Cl^-], the high concentration of common ion Cl^- shifts AgCl(s) <=> Ag^+ + Cl^- to the left, drastically suppressing solubility.",
    "distractor_analysis": {
      "A": "Correct. NaCl completely dissociates to provide 0.1 M Cl^- ions. By Le Chatelier's princi",
      "B": "Incorrect. Common distractor based on: Assuming ionic salts have constant solubility independent of",
      "C": "Incorrect. Common distractor based on: Assuming ionic salts have constant solubility independent of",
      "D": "Incorrect. Common distractor based on: Assuming ionic salts have constant solubility independent of"
    },
    "misconception": "Assuming ionic salts have constant solubility independent of common ions.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Chemical Equilibrium",
    "difficulty_tier": 3,
    "question_text": "What is the conjugate base of HSO4^-?",
    "options": {
      "A": "SO4^2-",
      "B": "H2SO4",
      "C": "H3SO4^+",
      "D": "SO3^2-"
    },
    "correct_option": "A",
    "explanation": "A conjugate base is formed when a Bronsted-Lowry acid loses one proton (H^+). HSO4^- minus H^+ gives SO4^2-.",
    "distractor_analysis": {
      "A": "Correct. A conjugate base is formed when a Bronsted-Lowry acid loses one proton (H^+). HS",
      "B": "Incorrect. Common distractor based on: Selecting H2SO4 (which is the conjugate acid of HSO4^-).",
      "C": "Incorrect. Common distractor based on: Selecting H2SO4 (which is the conjugate acid of HSO4^-).",
      "D": "Incorrect. Common distractor based on: Selecting H2SO4 (which is the conjugate acid of HSO4^-)."
    },
    "misconception": "Selecting H2SO4 (which is the conjugate acid of HSO4^-).",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Coordination Compounds",
    "difficulty_tier": 3,
    "question_text": "What is the crystal field stabilization energy (CFSE) for a high-spin d6 octahedral complex?",
    "options": {
      "A": "-0.4 Delta_o",
      "B": "-2.4 Delta_o + 2P",
      "C": "-0.6 Delta_o",
      "D": "0 Delta_o"
    },
    "correct_option": "A",
    "explanation": "In high-spin octahedral d6, pairing energy P is greater than Delta_o. Configuration is t2g^4 eg^2. CFSE = [4 * (-0.4) + 2 * (+0.6)] Delta_o = [-1.6 + 1.2] Delta_o = -0.4 Delta_o.",
    "distractor_analysis": {
      "A": "Correct. In high-spin octahedral d6, pairing energy P is greater than Delta_o. Configurat",
      "B": "Incorrect. Common distractor based on: Confusing high-spin configuration (t2g^4 eg^2) with low-spin",
      "C": "Incorrect. Common distractor based on: Confusing high-spin configuration (t2g^4 eg^2) with low-spin",
      "D": "Incorrect. Common distractor based on: Confusing high-spin configuration (t2g^4 eg^2) with low-spin"
    },
    "misconception": "Confusing high-spin configuration (t2g^4 eg^2) with low-spin configuration (t2g^6).",
    "time_estimate_seconds": 50
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Coordination Compounds",
    "difficulty_tier": 3,
    "question_text": "What is the spin-only magnetic moment of [Fe(CN)6]^3-? (Atomic number of Fe = 26)",
    "options": {
      "A": "1.73 BM",
      "B": "5.92 BM",
      "C": "4.90 BM",
      "D": "2.83 BM"
    },
    "correct_option": "A",
    "explanation": "In [Fe(CN)6]^3-, iron is in +3 oxidation state: Fe^3+ is 3d^5. CN^- is a strong field ligand, forcing pairing to form a low-spin complex: t2g^5 eg^0. Number of unpaired electrons n = 1. Spin-only magnetic moment mu = sqrt(n(n+2)) = sqrt(1 * 3) = sqrt(3) = 1.73 BM.",
    "distractor_analysis": {
      "A": "Correct. In [Fe(CN)6]^3-, iron is in +3 oxidation state: Fe^3+ is 3d^5. CN^- is a strong ",
      "B": "Incorrect. Common distractor based on: Treating CN^- as a weak field ligand, yielding 5 unpaired el",
      "C": "Incorrect. Common distractor based on: Treating CN^- as a weak field ligand, yielding 5 unpaired el",
      "D": "Incorrect. Common distractor based on: Treating CN^- as a weak field ligand, yielding 5 unpaired el"
    },
    "misconception": "Treating CN^- as a weak field ligand, yielding 5 unpaired electrons (5.92 BM).",
    "time_estimate_seconds": 50
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Coordination Compounds",
    "difficulty_tier": 3,
    "question_text": "Which of the following complex ions exhibits optical isomerism (is chiral)?",
    "options": {
      "A": "[Co(en)3]^3+",
      "B": "trans-[Co(en)2Cl2]^+",
      "C": "[Pt(NH3)2Cl2]",
      "D": "[Co(NH3)4Cl2]^+"
    },
    "correct_option": "A",
    "explanation": "[Co(en)3]^3+ possesses D3 symmetry with no plane of symmetry or center of inversion, existing as non-superimposable d- and l-enantiomers. Trans-[Co(en)2Cl2]^+ has an inversion center and is optically inactive.",
    "distractor_analysis": {
      "A": "Correct. [Co(en)3]^3+ possesses D3 symmetry with no plane of symmetry or center of invers",
      "B": "Incorrect. Common distractor based on: Assuming trans-[Co(en)2Cl2]^+ is chiral.",
      "C": "Incorrect. Common distractor based on: Assuming trans-[Co(en)2Cl2]^+ is chiral.",
      "D": "Incorrect. Common distractor based on: Assuming trans-[Co(en)2Cl2]^+ is chiral."
    },
    "misconception": "Assuming trans-[Co(en)2Cl2]^+ is chiral.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Coordination Compounds",
    "difficulty_tier": 3,
    "question_text": "What type of isomerism is shown by the pair [Co(NH3)5(SO4)]Br and [Co(NH3)5Br]SO4?",
    "options": {
      "A": "Ionization isomerism",
      "B": "Linkage isomerism",
      "C": "Coordination isomerism",
      "D": "Hydrate isomerism"
    },
    "correct_option": "A",
    "explanation": "Ionization isomerism occurs when a ligand inside the coordination sphere interchanges with a counter-ion outside the coordination sphere, producing different ions in aqueous solution (one yields Br^-, the other SO4^2-).",
    "distractor_analysis": {
      "A": "Correct. Ionization isomerism occurs when a ligand inside the coordination sphere interch",
      "B": "Incorrect. Common distractor based on: Confusing ionization isomerism with linkage isomerism.",
      "C": "Incorrect. Common distractor based on: Confusing ionization isomerism with linkage isomerism.",
      "D": "Incorrect. Common distractor based on: Confusing ionization isomerism with linkage isomerism."
    },
    "misconception": "Confusing ionization isomerism with linkage isomerism.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Coordination Compounds",
    "difficulty_tier": 3,
    "question_text": "What is the correct IUPAC name for [Pt(NH3)2Cl(NO2)]?",
    "options": {
      "A": "Diamminechloridonitrito-N-platinum(II)",
      "B": "Diamminechloronitroplatinum(IV)",
      "C": "Chloridodiamminenitritoplatinum(II)",
      "D": "Diammineplatinum(II) chloronitrite"
    },
    "correct_option": "A",
    "explanation": "Ligands are listed alphabetically: ammine before chlorido before nitrito-N. Pt is in +2 oxidation state (Cl is -1, NO2 is -1). Name: Diamminechloridonitrito-N-platinum(II).",
    "distractor_analysis": {
      "A": "Correct. Ligands are listed alphabetically: ammine before chlorido before nitrito-N. Pt i",
      "B": "Incorrect. Common distractor based on: Using outdated ligand names or failing alphabetical ordering",
      "C": "Incorrect. Common distractor based on: Using outdated ligand names or failing alphabetical ordering",
      "D": "Incorrect. Common distractor based on: Using outdated ligand names or failing alphabetical ordering"
    },
    "misconception": "Using outdated ligand names or failing alphabetical ordering.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Coordination Compounds",
    "difficulty_tier": 3,
    "question_text": "According to Werner's coordination theory, secondary valencies correspond to:",
    "options": {
      "A": "Coordination number and are directional in space",
      "B": "Oxidation state and are non-directional",
      "C": "Ionizable ionic charges",
      "D": "Only counter-ions outside the coordination sphere"
    },
    "correct_option": "A",
    "explanation": "Primary valencies correspond to oxidation state, are ionizable, and non-directional. Secondary valencies correspond to coordination number, are non-ionizable, directional in space, and determine molecular stereochemistry.",
    "distractor_analysis": {
      "A": "Correct. Primary valencies correspond to oxidation state, are ionizable, and non-directio",
      "B": "Incorrect. Common distractor based on: Swapping primary and secondary valencies.",
      "C": "Incorrect. Common distractor based on: Swapping primary and secondary valencies.",
      "D": "Incorrect. Common distractor based on: Swapping primary and secondary valencies."
    },
    "misconception": "Swapping primary and secondary valencies.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Coordination Compounds",
    "difficulty_tier": 3,
    "question_text": "What is the relationship between crystal field splitting in octahedral (Delta_o) and tetrahedral (Delta_t) complexes?",
    "options": {
      "A": "Delta_t = (4/9) * Delta_o",
      "B": "Delta_t = (9/4) * Delta_o",
      "C": "Delta_t = (1/2) * Delta_o",
      "D": "Delta_t = Delta_o"
    },
    "correct_option": "A",
    "explanation": "In tetrahedral geometry, there are only 4 ligands instead of 6, and none point directly at the d-orbitals. Geometric calculation shows Delta_t = (2/3) * (2/3) * Delta_o = (4/9) * Delta_o.",
    "distractor_analysis": {
      "A": "Correct. In tetrahedral geometry, there are only 4 ligands instead of 6, and none point d",
      "B": "Incorrect. Common distractor based on: Inverting the ratio or using 1/2.",
      "C": "Incorrect. Common distractor based on: Inverting the ratio or using 1/2.",
      "D": "Incorrect. Common distractor based on: Inverting the ratio or using 1/2."
    },
    "misconception": "Inverting the ratio or using 1/2.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Coordination Compounds",
    "difficulty_tier": 3,
    "question_text": "In metal carbonyls like [Ni(CO)4] and [Fe(CO)5], synergic bonding involves:",
    "options": {
      "A": "Sigma donation from CO to metal and pi back-bonding from metal d-orbitals to pi* of CO",
      "B": "Only pure electrostatic ionic attractions",
      "C": "Pi donation from CO and sigma back-bonding from metal",
      "D": "Only sigma donation with no back-bonding"
    },
    "correct_option": "A",
    "explanation": "Synergic bonding consists of a sigma bond formed by donation of lone pair from carbonyl carbon into vacant metal d-orbital, reinforced by pi back-bonding where filled metal d-electrons are back-donated into empty pi* antibonding orbitals of CO.",
    "distractor_analysis": {
      "A": "Correct. Synergic bonding consists of a sigma bond formed by donation of lone pair from c",
      "B": "Incorrect. Common distractor based on: Inverting the donor and acceptor roles in synergic bonding.",
      "C": "Incorrect. Common distractor based on: Inverting the donor and acceptor roles in synergic bonding.",
      "D": "Incorrect. Common distractor based on: Inverting the donor and acceptor roles in synergic bonding."
    },
    "misconception": "Inverting the donor and acceptor roles in synergic bonding.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Coordination Compounds",
    "difficulty_tier": 3,
    "question_text": "The compound [Cr(H2O)6]Cl3 is violet, while [Cr(H2O)5Cl]Cl2*H2O is blue-green. This is an example of:",
    "options": {
      "A": "Hydrate (solvate) isomerism",
      "B": "Coordination isomerism",
      "C": "Linkage isomerism",
      "D": "Geometrical isomerism"
    },
    "correct_option": "A",
    "explanation": "Hydrate isomerism occurs when water molecules interchange between the coordination sphere (as aqua ligands) and the crystal lattice (as water of crystallization).",
    "distractor_analysis": {
      "A": "Correct. Hydrate isomerism occurs when water molecules interchange between the coordinati",
      "B": "Incorrect. Common distractor based on: Confusing hydrate isomerism with linkage isomerism.",
      "C": "Incorrect. Common distractor based on: Confusing hydrate isomerism with linkage isomerism.",
      "D": "Incorrect. Common distractor based on: Confusing hydrate isomerism with linkage isomerism."
    },
    "misconception": "Confusing hydrate isomerism with linkage isomerism.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Coordination Compounds",
    "difficulty_tier": 3,
    "question_text": "Which of the following ligands is ambidentate?",
    "options": {
      "A": "SCN^-",
      "B": "en (ethylenediamine)",
      "C": "ox^2- (oxalate)",
      "D": "NH3"
    },
    "correct_option": "A",
    "explanation": "An ambidentate ligand has two different coordinating donor atoms but binds through only one at a time. Thiocyanate can bind via sulfur (thiocyanato, S-bonded) or nitrogen (isothiocyanato, N-bonded).",
    "distractor_analysis": {
      "A": "Correct. An ambidentate ligand has two different coordinating donor atoms but binds throu",
      "B": "Incorrect. Common distractor based on: Confusing bidentate chelating ligands like en with ambidenta",
      "C": "Incorrect. Common distractor based on: Confusing bidentate chelating ligands like en with ambidenta",
      "D": "Incorrect. Common distractor based on: Confusing bidentate chelating ligands like en with ambidenta"
    },
    "misconception": "Confusing bidentate chelating ligands like en with ambidentate ligands.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Coordination Compounds",
    "difficulty_tier": 3,
    "question_text": "The geometry and hybridization of the nickel complex in [Ni(CN)4]^2- is:",
    "options": {
      "A": "Square planar, dsp^2",
      "B": "Tetrahedral, sp^3",
      "C": "Octahedral, sp^3d^2",
      "D": "Trigonal bipyramidal, sp^3d"
    },
    "correct_option": "A",
    "explanation": "Ni^2+ is 3d^8. CN^- is a strong field ligand, forcing pairing of the two unpaired 3d electrons into a single orbital. This vacates one 3d orbital, enabling dsp^2 hybridization and square planar diamagnetic geometry.",
    "distractor_analysis": {
      "A": "Correct. Ni^2+ is 3d^8. CN^- is a strong field ligand, forcing pairing of the two unpaire",
      "B": "Incorrect. Common distractor based on: Assuming tetrahedral geometry by treating CN^- as weak field",
      "C": "Incorrect. Common distractor based on: Assuming tetrahedral geometry by treating CN^- as weak field",
      "D": "Incorrect. Common distractor based on: Assuming tetrahedral geometry by treating CN^- as weak field"
    },
    "misconception": "Assuming tetrahedral geometry by treating CN^- as weak field.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Organic Chemistry Basics",
    "difficulty_tier": 3,
    "question_text": "Which of the following carbocations is the most stable?",
    "options": {
      "A": "(C6H5)3C^+ (Triphenylmethyl cation)",
      "B": "(CH3)3C^+ (tert-Butyl cation)",
      "C": "(CH3)2CH^+ (Isopropyl cation)",
      "D": "CH3-CH2^+ (Ethyl cation)"
    },
    "correct_option": "A",
    "explanation": "Triphenylmethyl carbocation (trityl) is stabilized by extensive resonance delocalization across 3 benzene rings (10 resonance contributing structures), far exceeding hyperconjugative stabilization in tert-butyl.",
    "distractor_analysis": {
      "A": "Correct. Triphenylmethyl carbocation (trityl) is stabilized by extensive resonance deloca",
      "B": "Incorrect. Common distractor based on: Selecting tert-butyl based on hyperconjugation alone while o",
      "C": "Incorrect. Common distractor based on: Selecting tert-butyl based on hyperconjugation alone while o",
      "D": "Incorrect. Common distractor based on: Selecting tert-butyl based on hyperconjugation alone while o"
    },
    "misconception": "Selecting tert-butyl based on hyperconjugation alone while overlooking triaryl resonance.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Organic Chemistry Basics",
    "difficulty_tier": 3,
    "question_text": "Which of the following compounds obeys Huckel's rule and is aromatic?",
    "options": {
      "A": "Cyclopentadienyl anion",
      "B": "Cyclooctatetraene",
      "C": "Cyclopentadienyl cation",
      "D": "Cyclobutadiene"
    },
    "correct_option": "A",
    "explanation": "Cyclopentadienyl anion is planar, fully conjugated, and has 6 pi electrons (4 from two double bonds + 2 from carbanion lone pair), satisfying 4n + 2 rule with n = 1. Cyclooctatetraene is non-planar tub-shaped; cyclobutadiene is anti-aromatic (4 pi electrons).",
    "distractor_analysis": {
      "A": "Correct. Cyclopentadienyl anion is planar, fully conjugated, and has 6 pi electrons (4 fr",
      "B": "Incorrect. Common distractor based on: Confusing cyclopentadienyl anion (aromatic, 6 pi) with catio",
      "C": "Incorrect. Common distractor based on: Confusing cyclopentadienyl anion (aromatic, 6 pi) with catio",
      "D": "Incorrect. Common distractor based on: Confusing cyclopentadienyl anion (aromatic, 6 pi) with catio"
    },
    "misconception": "Confusing cyclopentadienyl anion (aromatic, 6 pi) with cation (anti-aromatic, 4 pi).",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Organic Chemistry Basics",
    "difficulty_tier": 3,
    "question_text": "What is the correct order of basicity of methylamines in aqueous solution?",
    "options": {
      "A": "(CH3)2NH > CH3NH2 > (CH3)3N > NH3",
      "B": "(CH3)3N > (CH3)2NH > CH3NH2 > NH3",
      "C": "CH3NH2 > (CH3)2NH > (CH3)3N > NH3",
      "D": "(CH3)2NH > (CH3)3N > CH3NH2 > NH3"
    },
    "correct_option": "A",
    "explanation": "In aqueous solution, basicity is governed by a balance of inductive effect (+I), steric hindrance, and hydration of conjugate cation. For methyl substituent, order is 2 deg > 1 deg > 3 deg > NH3 (2130 rule). For ethyl, it is 2 deg > 3 deg > 1 deg > NH3 (2310 rule).",
    "distractor_analysis": {
      "A": "Correct. In aqueous solution, basicity is governed by a balance of inductive effect (+I),",
      "B": "Incorrect. Common distractor based on: Using gas-phase basicity order (3 deg > 2 deg > 1 deg > NH3)",
      "C": "Incorrect. Common distractor based on: Using gas-phase basicity order (3 deg > 2 deg > 1 deg > NH3)",
      "D": "Incorrect. Common distractor based on: Using gas-phase basicity order (3 deg > 2 deg > 1 deg > NH3)"
    },
    "misconception": "Using gas-phase basicity order (3 deg > 2 deg > 1 deg > NH3) which considers only inductive effect.",
    "time_estimate_seconds": 50
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Organic Chemistry Basics",
    "difficulty_tier": 3,
    "question_text": "Which of the following carboxylic acids has the lowest pKa (highest acidity)?",
    "options": {
      "A": "Trifluoroacetic acid (CF3COOH)",
      "B": "Trichloroacetic acid (CCl3COOH)",
      "C": "Acetic acid (CH3COOH)",
      "D": "Formic acid (HCOOH)"
    },
    "correct_option": "A",
    "explanation": "Fluorine is the most electronegative halogen. Three fluorine atoms exert powerful -I inductive withdrawal, stabilizing the conjugate carboxylate anion (CF3COO^-) and making CF3COOH the strongest acid.",
    "distractor_analysis": {
      "A": "Correct. Fluorine is the most electronegative halogen. Three fluorine atoms exert powerfu",
      "B": "Incorrect. Common distractor based on: Selecting trichloroacetic acid or acetic acid.",
      "C": "Incorrect. Common distractor based on: Selecting trichloroacetic acid or acetic acid.",
      "D": "Incorrect. Common distractor based on: Selecting trichloroacetic acid or acetic acid."
    },
    "misconception": "Selecting trichloroacetic acid or acetic acid.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Organic Chemistry Basics",
    "difficulty_tier": 3,
    "question_text": "What is the stereochemical relationship between (2R, 3R)-tartaric acid and (2S, 3S)-tartaric acid?",
    "options": {
      "A": "Enantiomers",
      "B": "Diastereomers",
      "C": "Identical (meso)",
      "D": "Constitutional isomers"
    },
    "correct_option": "A",
    "explanation": "(2R, 3R) and (2S, 3S) have inverted configurations at all chiral centers, making them non-superimposable mirror images (enantiomers). (2R, 3S) is the meso diastereomer.",
    "distractor_analysis": {
      "A": "Correct. (2R, 3R) and (2S, 3S) have inverted configurations at all chiral centers, making",
      "B": "Incorrect. Common distractor based on: Confusing enantiomeric pairs with meso isomers.",
      "C": "Incorrect. Common distractor based on: Confusing enantiomeric pairs with meso isomers.",
      "D": "Incorrect. Common distractor based on: Confusing enantiomeric pairs with meso isomers."
    },
    "misconception": "Confusing enantiomeric pairs with meso isomers.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Organic Chemistry Basics",
    "difficulty_tier": 3,
    "question_text": "What is the most stable conformation of cyclohexane?",
    "options": {
      "A": "Chair",
      "B": "Boat",
      "C": "Twist-boat",
      "D": "Half-chair"
    },
    "correct_option": "A",
    "explanation": "The chair conformation is completely free of angle strain (all C-C-C angles are 109.5 deg) and torsional strain (all adjacent C-H bonds are staggered).",
    "distractor_analysis": {
      "A": "Correct. The chair conformation is completely free of angle strain (all C-C-C angles are ",
      "B": "Incorrect. Common distractor based on: Selecting boat conformation which suffers from flagpole hydr",
      "C": "Incorrect. Common distractor based on: Selecting boat conformation which suffers from flagpole hydr",
      "D": "Incorrect. Common distractor based on: Selecting boat conformation which suffers from flagpole hydr"
    },
    "misconception": "Selecting boat conformation which suffers from flagpole hydrogen steric clash.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Organic Chemistry Basics",
    "difficulty_tier": 3,
    "question_text": "Which of the following intermediate species has a sextet of valence electrons and no formal charge?",
    "options": {
      "A": "Free radical",
      "B": "Carbocation",
      "C": "Carbene",
      "D": "Carbanion"
    },
    "correct_option": "C",
    "explanation": "A carbene (:CR2) has 6 valence electrons around carbon (two C-R single bonds + one non-bonding lone pair) and zero formal charge. Carbocation has a sextet with +1 charge; radical has 7 electrons.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Confusing carbene with carbocation (+1 charge) or radical (s",
      "B": "Incorrect. Common distractor based on: Confusing carbene with carbocation (+1 charge) or radical (s",
      "C": "Correct. A carbene (:CR2) has 6 valence electrons around carbon (two C-R single bonds + o",
      "D": "Incorrect. Common distractor based on: Confusing carbene with carbocation (+1 charge) or radical (s"
    },
    "misconception": "Confusing carbene with carbocation (+1 charge) or radical (septet of electrons).",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Organic Chemistry Basics",
    "difficulty_tier": 3,
    "question_text": "Why is hyperconjugation also known as 'no-bond resonance'?",
    "options": {
      "A": "It involves delocalization of sigma electrons of C-H bond into adjacent vacant or partially filled p-orbital",
      "B": "It occurs only in the absence of chemical bonds",
      "C": "It involves complete dissociation of protons into solution",
      "D": "It involves delocalization of pi electrons only"
    },
    "correct_option": "A",
    "explanation": "Hyperconjugation involves overlap of sigma(C-H) electrons with an adjacent empty or unhybridized p-orbital (Baker-Nathan effect), creating resonance canonical structures with no covalent bond between C and H.",
    "distractor_analysis": {
      "A": "Correct. Hyperconjugation involves overlap of sigma(C-H) electrons with an adjacent empty",
      "B": "Incorrect. Common distractor based on: Assuming hyperconjugation is identical to ordinary pi-pi res",
      "C": "Incorrect. Common distractor based on: Assuming hyperconjugation is identical to ordinary pi-pi res",
      "D": "Incorrect. Common distractor based on: Assuming hyperconjugation is identical to ordinary pi-pi res"
    },
    "misconception": "Assuming hyperconjugation is identical to ordinary pi-pi resonance.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Organic Chemistry Basics",
    "difficulty_tier": 3,
    "question_text": "Which isomer of cresol (methylphenol) is the least acidic due to steric hindrance and +I effect?",
    "options": {
      "A": "o-cresol",
      "B": "m-cresol",
      "C": "p-cresol",
      "D": "All have identical acidity"
    },
    "correct_option": "A",
    "explanation": "In o-cresol, the methyl group is adjacent to the -OH group. The electron-donating +I effect destabilizes the phenoxide anion, and steric hindrance hampers solvation of the phenoxide oxygen, making o-cresol less acidic than m-cresol.",
    "distractor_analysis": {
      "A": "Correct. In o-cresol, the methyl group is adjacent to the -OH group. The electron-donatin",
      "B": "Incorrect. Common distractor based on: Assuming meta-substituted phenols are least acidic.",
      "C": "Incorrect. Common distractor based on: Assuming meta-substituted phenols are least acidic.",
      "D": "Incorrect. Common distractor based on: Assuming meta-substituted phenols are least acidic."
    },
    "misconception": "Assuming meta-substituted phenols are least acidic.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Organic Chemistry Basics",
    "difficulty_tier": 3,
    "question_text": "How many stereoisomers exist for 2,3-dichlorobutane?",
    "options": {
      "A": "3",
      "B": "2",
      "C": "4",
      "D": "8"
    },
    "correct_option": "A",
    "explanation": "2,3-dichlorobutane has 2 pseudo-identical chiral centers. Total isomers = 2^(n-1) + 2^((n/2)-1) = 2^1 + 2^0 = 2 + 1 = 3 stereoisomers (one pair of enantiomers (2R,3R and 2S,3S) and one achiral meso compound (2R,3S)).",
    "distractor_analysis": {
      "A": "Correct. 2,3-dichlorobutane has 2 pseudo-identical chiral centers. Total isomers = 2^(n-1",
      "B": "Incorrect. Common distractor based on: Using 2^n = 4 for molecules with symmetric stereocenters.",
      "C": "Incorrect. Common distractor based on: Using 2^n = 4 for molecules with symmetric stereocenters.",
      "D": "Incorrect. Common distractor based on: Using 2^n = 4 for molecules with symmetric stereocenters."
    },
    "misconception": "Using 2^n = 4 for molecules with symmetric stereocenters.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Organic Chemistry Basics",
    "difficulty_tier": 3,
    "question_text": "In electrophilic aromatic substitution, which of the following substituents is deactivating yet ortho/para-directing?",
    "options": {
      "A": "-Cl (Chloro)",
      "B": "-NO2 (Nitro)",
      "C": "-OCH3 (Methoxy)",
      "D": "-CH3 (Methyl)"
    },
    "correct_option": "A",
    "explanation": "Halogens (-Cl, -Br) have a strong -I electron-withdrawing effect that decreases overall electron density on the benzene ring (deactivating). However, their lone pairs participate in resonance (+M), which specifically stabilizes carbocation intermediates at ortho and para positions.",
    "distractor_analysis": {
      "A": "Correct. Halogens (-Cl, -Br) have a strong -I electron-withdrawing effect that decreases ",
      "B": "Incorrect. Common distractor based on: Assuming all deactivating groups are strictly meta-directing",
      "C": "Incorrect. Common distractor based on: Assuming all deactivating groups are strictly meta-directing",
      "D": "Incorrect. Common distractor based on: Assuming all deactivating groups are strictly meta-directing"
    },
    "misconception": "Assuming all deactivating groups are strictly meta-directing.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Hydrocarbons",
    "difficulty_tier": 3,
    "question_text": "What is the major product obtained when propene reacts with HBr in the presence of benzoyl peroxide?",
    "options": {
      "A": "1-bromopropane",
      "B": "2-bromopropane",
      "C": "1,2-dibromopropane",
      "D": "2,2-dibromopropane"
    },
    "correct_option": "A",
    "explanation": "In the presence of peroxides, HBr adds via a free radical chain mechanism (Kharasch / peroxide effect). The bromine radical adds to the terminal carbon to form the more stable secondary carbon radical, yielding 1-bromopropane as the anti-Markovnikov major product.",
    "distractor_analysis": {
      "A": "Correct. In the presence of peroxides, HBr adds via a free radical chain mechanism (Khara",
      "B": "Incorrect. Common distractor based on: Applying standard Markovnikov addition (yielding 2-bromoprop",
      "C": "Incorrect. Common distractor based on: Applying standard Markovnikov addition (yielding 2-bromoprop",
      "D": "Incorrect. Common distractor based on: Applying standard Markovnikov addition (yielding 2-bromoprop"
    },
    "misconception": "Applying standard Markovnikov addition (yielding 2-bromopropane) by ignoring the peroxide catalyst.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Hydrocarbons",
    "difficulty_tier": 3,
    "question_text": "Ozonolysis of an alkene followed by reductive workup with Zn/H2O produces acetone and formaldehyde. What is the alkene?",
    "options": {
      "A": "2-methylpropene (isobutylene)",
      "B": "2-butene",
      "C": "1-butene",
      "D": "2-methyl-2-butene"
    },
    "correct_option": "A",
    "explanation": "Reductive ozonolysis cleaves the C=C double bond, capping each end with =O. Acetone is (CH3)2C=O and formaldehyde is H2C=O. Combining them gives (CH3)2C=CH2, which is 2-methylpropene.",
    "distractor_analysis": {
      "A": "Correct. Reductive ozonolysis cleaves the C=C double bond, capping each end with =O. Acet",
      "B": "Incorrect. Common distractor based on: Confusing isobutylene with 2-methyl-2-butene (which yields a",
      "C": "Incorrect. Common distractor based on: Confusing isobutylene with 2-methyl-2-butene (which yields a",
      "D": "Incorrect. Common distractor based on: Confusing isobutylene with 2-methyl-2-butene (which yields a"
    },
    "misconception": "Confusing isobutylene with 2-methyl-2-butene (which yields acetone and acetaldehyde).",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Hydrocarbons",
    "difficulty_tier": 3,
    "question_text": "Reduction of 2-butyne with sodium in liquid ammonia (Birch reduction) produces:",
    "options": {
      "A": "trans-2-butene",
      "B": "cis-2-butene",
      "C": "butane",
      "D": "1-butene"
    },
    "correct_option": "A",
    "explanation": "Birch reduction (Na in liquid NH3) reduces internal alkynes stereoselectively to trans-alkenes via radical anion intermediates. Lindlar's catalyst (Pd/CaCO3/quinoline) reduces to cis-alkenes.",
    "distractor_analysis": {
      "A": "Correct. Birch reduction (Na in liquid NH3) reduces internal alkynes stereoselectively to",
      "B": "Incorrect. Common distractor based on: Confusing Birch reduction (trans) with Lindlar catalyst hydr",
      "C": "Incorrect. Common distractor based on: Confusing Birch reduction (trans) with Lindlar catalyst hydr",
      "D": "Incorrect. Common distractor based on: Confusing Birch reduction (trans) with Lindlar catalyst hydr"
    },
    "misconception": "Confusing Birch reduction (trans) with Lindlar catalyst hydrogenation (cis).",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Hydrocarbons",
    "difficulty_tier": 3,
    "question_text": "Which of the following hydrocarbons reacts with ammoniacal silver nitrate (Tollens' reagent) to form a white precipitate?",
    "options": {
      "A": "Propyne",
      "B": "2-butyne",
      "C": "Propene",
      "D": "Ethane"
    },
    "correct_option": "A",
    "explanation": "Terminal alkynes possess acidic sp-hybridized C-H bonds (pKa approx 25). Propyne (CH3-C#CH) reacts with ammoniacal AgNO3 to form silver propynide precipitate. 2-butyne is an internal alkyne with no terminal acidic hydrogen.",
    "distractor_analysis": {
      "A": "Correct. Terminal alkynes possess acidic sp-hybridized C-H bonds (pKa approx 25). Propyne",
      "B": "Incorrect. Common distractor based on: Assuming internal alkynes also form silver acetylides.",
      "C": "Incorrect. Common distractor based on: Assuming internal alkynes also form silver acetylides.",
      "D": "Incorrect. Common distractor based on: Assuming internal alkynes also form silver acetylides."
    },
    "misconception": "Assuming internal alkynes also form silver acetylides.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Hydrocarbons",
    "difficulty_tier": 3,
    "question_text": "What is the major product of the Friedel-Crafts alkylation of benzene with 1-chloropropane in the presence of anhydrous AlCl3?",
    "options": {
      "A": "Cumene (isopropylbenzene)",
      "B": "n-propylbenzene",
      "C": "Toluene",
      "D": "Ethylbenzene"
    },
    "correct_option": "A",
    "explanation": "AlCl3 abstracts chloride to form a primary carbocation (CH3-CH2-CH2^+), which rapidly undergoes a 1,2-hydride shift to form the more stable secondary carbocation (CH3-CH^+-CH3). Electrophilic attack on benzene yields isopropylbenzene (cumene).",
    "distractor_analysis": {
      "A": "Correct. AlCl3 abstracts chloride to form a primary carbocation (CH3-CH2-CH2^+), which ra",
      "B": "Incorrect. Common distractor based on: Assuming un-rearranged primary alkylation product (n-propylb",
      "C": "Incorrect. Common distractor based on: Assuming un-rearranged primary alkylation product (n-propylb",
      "D": "Incorrect. Common distractor based on: Assuming un-rearranged primary alkylation product (n-propylb"
    },
    "misconception": "Assuming un-rearranged primary alkylation product (n-propylbenzene).",
    "time_estimate_seconds": 50
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Hydrocarbons",
    "difficulty_tier": 3,
    "question_text": "During free radical chlorination of methane, which step represents a chain termination step?",
    "options": {
      "A": "CH3* + Cl* -> CH3Cl",
      "B": "Cl* + CH4 -> CH3* + HCl",
      "C": "CH3* + Cl2 -> CH3Cl + Cl*",
      "D": "Cl2 -> 2 Cl* (under UV light)"
    },
    "correct_option": "A",
    "explanation": "Chain termination involves the combination of two free radicals to form a stable non-radical molecule (CH3* + Cl* -> CH3Cl or 2 CH3* -> C2H6). Photolysis of Cl2 is initiation; reactions between radical and molecule are propagation.",
    "distractor_analysis": {
      "A": "Correct. Chain termination involves the combination of two free radicals to form a stable",
      "B": "Incorrect. Common distractor based on: Confusing propagation steps with chain termination.",
      "C": "Incorrect. Common distractor based on: Confusing propagation steps with chain termination.",
      "D": "Incorrect. Common distractor based on: Confusing propagation steps with chain termination."
    },
    "misconception": "Confusing propagation steps with chain termination.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Hydrocarbons",
    "difficulty_tier": 3,
    "question_text": "What reagent is used to convert benzene to hexachlorocyclohexane (BHC / Lindane)?",
    "options": {
      "A": "Cl2 / UV light",
      "B": "Cl2 / anhydrous FeCl3",
      "C": "HCl / AlCl3",
      "D": "SO2Cl2 / heat"
    },
    "correct_option": "A",
    "explanation": "Under UV light at high temperature, benzene undergoes addition of 3 molecules of chlorine via a free radical pathway to form 1,2,3,4,5,6-hexachlorocyclohexane (BHC). With anhydrous FeCl3, electrophilic substitution occurs yielding chlorobenzene.",
    "distractor_analysis": {
      "A": "Correct. Under UV light at high temperature, benzene undergoes addition of 3 molecules of",
      "B": "Incorrect. Common distractor based on: Confusing electrophilic substitution (FeCl3) with radical ad",
      "C": "Incorrect. Common distractor based on: Confusing electrophilic substitution (FeCl3) with radical ad",
      "D": "Incorrect. Common distractor based on: Confusing electrophilic substitution (FeCl3) with radical ad"
    },
    "misconception": "Confusing electrophilic substitution (FeCl3) with radical addition (UV light).",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Hydrocarbons",
    "difficulty_tier": 3,
    "question_text": "What is the major product obtained when 2-bromobutane is heated with alcoholic KOH?",
    "options": {
      "A": "trans-2-butene",
      "B": "cis-2-butene",
      "C": "1-butene",
      "D": "2-butanol"
    },
    "correct_option": "A",
    "explanation": "Alcoholic KOH promotes E2 elimination. By Saytzeff's rule, the more substituted and thermally stable alkene is favored (2-butene over 1-butene). Among stereoisomers, trans-2-butene is more stable than cis-2-butene due to reduced steric clash.",
    "distractor_analysis": {
      "A": "Correct. Alcoholic KOH promotes E2 elimination. By Saytzeff's rule, the more substituted ",
      "B": "Incorrect. Common distractor based on: Applying Hofmann elimination or substituting with OH to form",
      "C": "Incorrect. Common distractor based on: Applying Hofmann elimination or substituting with OH to form",
      "D": "Incorrect. Common distractor based on: Applying Hofmann elimination or substituting with OH to form"
    },
    "misconception": "Applying Hofmann elimination or substituting with OH to form alcohol.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Hydrocarbons",
    "difficulty_tier": 3,
    "question_text": "Hydroboration-oxidation of 1-methylcyclopentene yields:",
    "options": {
      "A": "trans-2-methylcyclopentanol",
      "B": "cis-2-methylcyclopentanol",
      "C": "1-methylcyclopentanol",
      "D": "2-methylcyclopentanone"
    },
    "correct_option": "A",
    "explanation": "Hydroboration-oxidation proceeds with syn-addition of H and OH across the double bond with anti-Markovnikov regiochemistry. In 1-methylcyclopentene, H adds to C1 and OH to C2 from the same face, placing the methyl and hydroxyl groups trans to each other.",
    "distractor_analysis": {
      "A": "Correct. Hydroboration-oxidation proceeds with syn-addition of H and OH across the double",
      "B": "Incorrect. Common distractor based on: Applying Markovnikov addition (yielding 1-methylcyclopentano",
      "C": "Incorrect. Common distractor based on: Applying Markovnikov addition (yielding 1-methylcyclopentano",
      "D": "Incorrect. Common distractor based on: Applying Markovnikov addition (yielding 1-methylcyclopentano"
    },
    "misconception": "Applying Markovnikov addition (yielding 1-methylcyclopentanol).",
    "time_estimate_seconds": 55
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Hydrocarbons",
    "difficulty_tier": 3,
    "question_text": "What is the catalyst used in the Ziegler-Natta polymerization of ethylene to produce high-density polyethylene (HDPE)?",
    "options": {
      "A": "TiCl4 + (C2H5)3Al",
      "B": "V2O5",
      "C": "Fe + Mo",
      "D": "PdCl2 + CuCl2"
    },
    "correct_option": "A",
    "explanation": "The Ziegler-Natta catalyst is a coordination complex typically composed of titanium tetrachloride (TiCl4) and triethylaluminium (Al(C2H5)3), allowing stereospecific coordination polymerization at low temperature and pressure.",
    "distractor_analysis": {
      "A": "Correct. The Ziegler-Natta catalyst is a coordination complex typically composed of titan",
      "B": "Incorrect. Common distractor based on: Confusing with Wacker process catalyst or Haber catalyst.",
      "C": "Incorrect. Common distractor based on: Confusing with Wacker process catalyst or Haber catalyst.",
      "D": "Incorrect. Common distractor based on: Confusing with Wacker process catalyst or Haber catalyst."
    },
    "misconception": "Confusing with Wacker process catalyst or Haber catalyst.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "JEE Main",
    "subject": "Chemistry",
    "skill_domain": "Hydrocarbons",
    "difficulty_tier": 3,
    "question_text": "When propyne is passed through dilute H2SO4 in the presence of HgSO4 at 60 deg C (Kucherov reaction), the product is:",
    "options": {
      "A": "Acetone (propan-2-one)",
      "B": "Propanal",
      "C": "Propanoic acid",
      "D": "Propan-2-ol"
    },
    "correct_option": "A",
    "explanation": "Kucherov hydration follows Markovnikov's rule: water adds across the triple bond to form the enol intermediate CH3-C(OH)=CH2, which rapidly tautomerizes to the more stable ketone (acetone, CH3-CO-CH3).",
    "distractor_analysis": {
      "A": "Correct. Kucherov hydration follows Markovnikov's rule: water adds across the triple bond",
      "B": "Incorrect. Common distractor based on: Predicting an aldehyde product (propanal) by mistaking Marko",
      "C": "Incorrect. Common distractor based on: Predicting an aldehyde product (propanal) by mistaking Marko",
      "D": "Incorrect. Common distractor based on: Predicting an aldehyde product (propanal) by mistaking Marko"
    },
    "misconception": "Predicting an aldehyde product (propanal) by mistaking Markovnikov for anti-Markovnikov hydration.",
    "time_estimate_seconds": 45
  }
];
