// Path: scripts/build-jee-chem.ts
import * as fs from "fs";
import * as path from "path";
import type { SeedQuestion } from "../lib/data/question-bank-seed";

function q(
  dom: string,
  text: string,
  A: string,
  B: string,
  C: string,
  D: string,
  ans: "A" | "B" | "C" | "D",
  exp: string,
  trap: string,
  time: number = 60
): SeedQuestion {
  const letters = ["A", "B", "C", "D"] as const;
  const dist: Record<string, string> = {};
  for (const l of letters) {
    if (l === ans) {
      dist[l] = `Correct. ${exp.slice(0, 80)}`;
    } else {
      dist[l] = `Incorrect. Common distractor based on: ${trap.slice(0, 60)}`;
    }
  }
  return {
    exam_name: "JEE Main",
    subject: "Chemistry",
    skill_domain: dom,
    difficulty_tier: 3,
    question_text: text,
    options: { A, B, C, D },
    correct_option: ans,
    explanation: exp,
    distractor_analysis: dist as any,
    misconception: trap,
    time_estimate_seconds: time,
  };
}

const chemQuestions: SeedQuestion[] = [
  // -------------------------------------------------------------
  // Atomic Structure (11)
  // -------------------------------------------------------------
  q(
    "Atomic Structure",
    "What is the total number of radial and angular nodes respectively in a 4d orbital?",
    "Radial = 1, Angular = 2",
    "Radial = 2, Angular = 1",
    "Radial = 2, Angular = 2",
    "Radial = 0, Angular = 2",
    "A",
    "For any orbital, radial nodes = n - l - 1 and angular nodes = l. For 4d: n = 4, l = 2. Radial nodes = 4 - 2 - 1 = 1. Angular nodes = 2. Total nodes = 3.",
    "Confusing radial node formula (n - l - 1) with total principal quantum number n.",
    45
  ),
  q(
    "Atomic Structure",
    "What is the ratio of the de Broglie wavelength of an alpha particle to that of a proton if both are accelerated from rest through the same potential difference V?",
    "1 : (2 * sqrt(2))",
    "1 : 2",
    "1 : 4",
    "2 * sqrt(2) : 1",
    "A",
    "lambda = h / sqrt(2 m q V). Ratio lambda_alpha / lambda_p = sqrt((m_p * q_p) / (m_alpha * q_alpha)) = sqrt((m * e) / (4m * 2e)) = sqrt(1/8) = 1 / (2 * sqrt(2)).",
    "Forgetting that alpha particle has both 4 times proton mass and 2 times proton charge.",
    50
  ),
  q(
    "Atomic Structure",
    "According to the Bohr model, the radius of the second orbit of Li^2+ is:",
    "(4/3) * a0",
    "(2/3) * a0",
    "(9/4) * a0",
    "(3/2) * a0",
    "A",
    "Bohr radius r_n = a0 * n^2 / Z. For Li^2+: Z = 3, n = 2. r_2 = a0 * (2^2 / 3) = (4/3) * a0.",
    "Multiplying by Z instead of dividing by Z (r proportional to n^2 / Z).",
    40
  ),
  q(
    "Atomic Structure",
    "If the uncertainty in position of an electron is equal to its de Broglie wavelength, what is the minimum fractional uncertainty in its velocity (Delta v / v)?",
    "1 / (4 pi)",
    "1 / (2 pi)",
    "2 pi",
    "4 pi",
    "A",
    "By Heisenberg's principle: Delta x * Delta p >= h / (4 pi). Since Delta x = lambda = h / p, (h / p) * Delta p >= h / (4 pi) -> Delta p / p >= 1 / (4 pi). Since Delta p / p = Delta v / v, min fractional uncertainty = 1 / (4 pi).",
    "Using h-bar instead of h in Heisenberg relation or forgetting lambda = h/p cancellation.",
    55
  ),
  q(
    "Atomic Structure",
    "Which of the following electronic transitions in a hydrogen atom emits a photon of the highest frequency?",
    "n = 2 to n = 1",
    "n = 3 to n = 2",
    "n = 4 to n = 3",
    "n = 5 to n = 4",
    "A",
    "Delta E = 13.6 * (1/n1^2 - 1/n2^2) eV. For 2 -> 1: Delta E = 13.6 * (1 - 1/4) = 10.2 eV. All other transitions involve higher levels where energy spacing is much narrower.",
    "Assuming higher quantum numbers (e.g., 5 -> 4) correspond to higher transition energy.",
    40
  ),
  q(
    "Atomic Structure",
    "What is the orbital angular momentum of an electron in a 3p orbital?",
    "sqrt(2) * h-bar",
    "sqrt(6) * h-bar",
    "h-bar",
    "0",
    "A",
    "Orbital angular momentum L = sqrt(l * (l + 1)) * h-bar. For a p orbital, l = 1. L = sqrt(1 * 2) * h-bar = sqrt(2) * h-bar.",
    "Confusing orbital angular momentum (depends on l) with spin angular momentum or principal n.",
    40
  ),
  q(
    "Atomic Structure",
    "The first ionization enthalpy of Nitrogen is higher than that of Oxygen because:",
    "Nitrogen has a half-filled, extra stable 2p subshell",
    "Oxygen has higher nuclear charge than Nitrogen",
    "Nitrogen has a smaller atomic radius than Oxygen",
    "Oxygen has greater shielding effect than Nitrogen",
    "A",
    "Nitrogen has electronic configuration [He] 2s^2 2p^3 (half-filled p-subshell, extra exchange energy stabilization). Oxygen is 2p^4, where pairing in one p-orbital causes electron-electron repulsion, making ionization easier.",
    "Assuming ionization enthalpy increases strictly monotonically across a period.",
    40
  ),
  q(
    "Atomic Structure",
    "What is the maximum number of electrons that can be accommodated in an atom with principal quantum number n = 4 and spin quantum number ms = -1/2?",
    "16",
    "32",
    "8",
    "64",
    "A",
    "Total electrons in n = 4 shell is 2n^2 = 2(4^2) = 32. Exactly half of these have ms = +1/2 and half have ms = -1/2. Thus, max electrons with ms = -1/2 is 16.",
    "Providing total electrons in the shell (32) without filtering by spin quantum number.",
    45
  ),
  q(
    "Atomic Structure",
    "A light source of wavelength 310 nm ejects photoelectrons with maximum kinetic energy 1.5 eV from a metal. What is the work function of the metal? (hc = 1240 eV*nm)",
    "2.5 eV",
    "1.5 eV",
    "4.0 eV",
    "0.5 eV",
    "A",
    "Photon energy E = hc / lambda = 1240 / 310 = 4.0 eV. Photoelectric equation: KE_max = E - phi -> 1.5 = 4.0 - phi -> phi = 2.5 eV.",
    "Adding KE to photon energy rather than subtracting.",
    45
  ),
  q(
    "Atomic Structure",
    "The wave number of the first line in the Balmer series of hydrogen is nu_bar. What is the wave number of the first line of the Balmer series for Li^2+?",
    "9 * nu_bar",
    "3 * nu_bar",
    "nu_bar / 9",
    "nu_bar / 3",
    "A",
    "Rydberg equation: nu_bar = R_H * Z^2 * (1/n1^2 - 1/n2^2). For Li^2+, Z = 3. Since transition (n1, n2) is identical, nu_bar' = Z^2 * nu_bar = 3^2 * nu_bar = 9 * nu_bar.",
    "Using Z instead of Z^2 in the Rydberg relation.",
    40
  ),
  q(
    "Atomic Structure",
    "Which set of quantum numbers (n, l, ml, ms) is not permissible for an electron in an atom?",
    "n = 3, l = 3, ml = 0, ms = +1/2",
    "n = 4, l = 2, ml = -1, ms = -1/2",
    "n = 2, l = 1, ml = -1, ms = +1/2",
    "n = 5, l = 0, ml = 0, ms = -1/2",
    "A",
    "Azimuthal quantum number l can only take integer values from 0 to n - 1. For n = 3, max l is 2. Therefore l = 3 is forbidden.",
    "Allowing l = n.",
    35
  ),

  // -------------------------------------------------------------
  // Chemical Bonding (11)
  // -------------------------------------------------------------
  q(
    "Chemical Bonding",
    "What is the molecular geometry and hybridization of the central atom in XeF4?",
    "Square planar, sp^3d^2",
    "Tetrahedral, sp^3",
    "See-saw, sp^3d",
    "Square pyramidal, sp^3d^2",
    "A",
    "Xe has 8 valence electrons. With 4 F atoms, it forms 4 bonding pairs and has 2 lone pairs. Steric number = 6 -> sp^3d^2 hybridization with octahedral electron geometry. The two lone pairs occupy trans axial positions, giving square planar molecular geometry.",
    "Confusing electron-group octahedral geometry with molecular square planar geometry.",
    45
  ),
  q(
    "Chemical Bonding",
    "According to Molecular Orbital Theory, which of the following species is diamagnetic?",
    "C2",
    "O2",
    "B2",
    "NO",
    "A",
    "C2 has 12 electrons: sigma1s^2 sigma*1s^2 sigma2s^2 sigma*2s^2 pi2px^2 pi2py^2. All electrons are fully paired, so C2 is diamagnetic. O2 and B2 have unpaired electrons in pi* and pi orbitals respectively; NO has an odd electron.",
    "Assuming C2 has unpaired electrons by confusing its orbital filling order with O2.",
    50
  ),
  q(
    "Chemical Bonding",
    "What is the correct order of bond dissociation enthalpy for halogens?",
    "Cl2 > Br2 > F2 > I2",
    "F2 > Cl2 > Br2 > I2",
    "Cl2 > F2 > Br2 > I2",
    "Br2 > Cl2 > F2 > I2",
    "A",
    "Due to the extremely small size of Fluorine, intense inter-electronic repulsion between lone pairs in the F-F bond significantly weakens it. Thus Cl2 (242 kJ/mol) > Br2 (193) > F2 (158) > I2 (151 kJ/mol).",
    "Assuming bond energy follows periodic size trend strictly (predicting F2 > Cl2).",
    45
  ),
  q(
    "Chemical Bonding",
    "Which of the following molecules has a non-zero dipole moment?",
    "NF3",
    "BF3",
    "CCl4",
    "PF5",
    "A",
    "NF3 is trigonal pyramidal with a lone pair. In BF3 (trigonal planar), CCl4 (tetrahedral), and PF5 (trigonal bipyramidal), bond dipoles cancel out completely due to high symmetry.",
    "Assuming NF3 dipoles cancel out completely like BF3.",
    40
  ),
  q(
    "Chemical Bonding",
    "According to Fajan's rules, which compound exhibits the highest degree of covalent character?",
    "AlCl3",
    "NaCl",
    "MgCl2",
    "CaCl2",
    "A",
    "Covalent character increases with smaller cation size and higher positive charge (high polarizing power). Al^3+ has the highest charge (+3) and smallest ionic radius, polarizing Cl^- most strongly.",
    "Selecting larger or lower-valent cations like Na+ or Ca2+.",
    45
  ),
  q(
    "Chemical Bonding",
    "What is the bond order and magnetic property of the superoxide ion (O2^-)?",
    "Bond order = 1.5, Paramagnetic",
    "Bond order = 2.0, Diamagnetic",
    "Bond order = 1.0, Diamagnetic",
    "Bond order = 2.5, Paramagnetic",
    "A",
    "O2^- has 17 electrons. Electronic configuration has (pi*2px)^2 (pi*2py)^1. Bond order = (10 - 7)/2 = 1.5. Due to 1 unpaired electron in pi*2py, it is paramagnetic.",
    "Confusing superoxide (O2^-) with peroxide (O2^2-) which has bond order 1.0 and is diamagnetic.",
    50
  ),
  q(
    "Chemical Bonding",
    "The correct order of bond angles in NH3, H2O, and CH4 is:",
    "CH4 (109.5 deg) > NH3 (107 deg) > H2O (104.5 deg)",
    "H2O > NH3 > CH4",
    "NH3 > CH4 > H2O",
    "CH4 > H2O > NH3",
    "A",
    "All have sp^3 hybridized central atoms. By VSEPR, lone pair-lone pair repulsion > lone pair-bond pair > bond pair-bond pair. CH4 has 0 lone pairs (109.5), NH3 has 1 lone pair (107), H2O has 2 lone pairs (104.5).",
    "Ignoring the repulsive effect of non-bonding lone pairs on bond angles.",
    40
  ),
  q(
    "Chemical Bonding",
    "In the molecule ClF3, how many lone pairs are present on the central chlorine atom, and what is its shape?",
    "2 lone pairs, T-shaped",
    "1 lone pair, Trigonal planar",
    "2 lone pairs, Trigonal pyramidal",
    "3 lone pairs, Linear",
    "A",
    "Cl has 7 valence electrons. Forming 3 single bonds with F leaves 4 non-bonding electrons (2 lone pairs). Steric number = 5 (sp^3d). Lone pairs occupy equatorial positions to minimize 90-degree repulsions, resulting in a T-shape.",
    "Placing lone pairs in axial positions rather than equatorial positions in trigonal bipyramidal geometry.",
    45
  ),
  q(
    "Chemical Bonding",
    "Which of the following pairs is isostructural (same molecular shape)?",
    "NH3 and H3O^+",
    "CO2 and SO2",
    "BF3 and NF3",
    "PCl5 and IF5",
    "A",
    "Both NH3 and H3O^+ have 3 bond pairs and 1 lone pair on the central atom (steric number 4, sp^3), giving a trigonal pyramidal shape. CO2 is linear while SO2 is bent.",
    "Confusing valence electrons of carbon and sulfur in CO2 vs SO2.",
    45
  ),
  q(
    "Chemical Bonding",
    "Why does o-nitrophenol have a lower boiling point and higher steam volatility than p-nitrophenol?",
    "o-nitrophenol forms intramolecular hydrogen bonds, reducing intermolecular association",
    "p-nitrophenol has higher molecular weight",
    "o-nitrophenol forms stronger intermolecular hydrogen bonds",
    "The nitro group in o-nitrophenol is completely non-polar",
    "A",
    "In o-nitrophenol, the proximity of -OH and -NO2 allows chelation via intramolecular hydrogen bonding, preventing association with neighboring molecules. In p-nitrophenol, extensive intermolecular hydrogen bonding leads to polymeric association and higher boiling point.",
    "Confusing intramolecular with intermolecular hydrogen bonding.",
    45
  ),
  q(
    "Chemical Bonding",
    "What is the hybridization and number of coordinate covalent bonds in the ammonium ion (NH4^+)?",
    "sp^3, 1 coordinate bond",
    "sp^2, 1 coordinate bond",
    "sp^3, 0 coordinate bonds",
    "dsp^2, 2 coordinate bonds",
    "A",
    "In NH4^+, nitrogen donates its lone pair to an incoming H^+ ion, forming 1 coordinate bond. With 4 equivalent N-H bonds and no lone pairs, steric number is 4, giving sp^3 hybridization (regular tetrahedral).",
    "Assuming all bonds in NH4+ are purely standard covalent without coordinate origin.",
    40
  ),

  // -------------------------------------------------------------
  // Thermodynamics (11)
  // -------------------------------------------------------------
  q(
    "Thermodynamics",
    "For the reaction N2(g) + 3H2(g) <=> 2NH3(g) at 298 K, what is the relation between Delta H and Delta U?",
    "Delta H = Delta U - 2RT",
    "Delta H = Delta U + 2RT",
    "Delta H = Delta U - RT",
    "Delta H = Delta U",
    "A",
    "Delta H = Delta U + Delta n_g * RT. Here Delta n_g = moles of gaseous products - moles of gaseous reactants = 2 - (1 + 3) = -2. Therefore Delta H = Delta U - 2RT.",
    "Adding 2RT instead of subtracting due to incorrect sign in Delta n_g.",
    45
  ),
  q(
    "Thermodynamics",
    "One mole of an ideal gas expands reversibly and isothermally at 300 K from 10 L to 100 L. What is the work done by the gas? (R = 8.314 J/mol*K, ln 10 = 2.303)",
    "5744 J",
    "-5744 J",
    "2494 J",
    "0 J",
    "A",
    "W_rev = -nRT ln(V2/V1) (IUPAC sign convention: work done BY the gas is positive in physics, negative in IUPAC chemistry). Work done by the gas = nRT ln(V2/V1) = 1 * 8.314 * 300 * 2.303 = 5744 J.",
    "Neglecting temperature or using common logarithm without 2.303 multiplier.",
    50
  ),
  q(
    "Thermodynamics",
    "For a process to be spontaneous at all temperatures, the required thermodynamic conditions are:",
    "Delta H < 0 and Delta S > 0",
    "Delta H > 0 and Delta S < 0",
    "Delta H < 0 and Delta S < 0",
    "Delta H > 0 and Delta S > 0",
    "A",
    "Gibbs free energy change Delta G = Delta H - T * Delta S. If Delta H < 0 (exothermic) and Delta S > 0 (entropy increase), Delta G is strictly negative at all positive absolute temperatures T.",
    "Confusing enthalpy and entropy signs for spontaneity.",
    40
  ),
  q(
    "Thermodynamics",
    "The standard enthalpy of formation of H2O(l) is -286 kJ/mol. What is the enthalpy change for the decomposition of 36 g of liquid water into H2(g) and O2(g)?",
    "+572 kJ",
    "-572 kJ",
    "+286 kJ",
    "-286 kJ",
    "A",
    "36 g of water corresponds to 2 moles of H2O. Decomposition is the exact reverse of formation: Delta H_decomp = -Delta H_f = +286 kJ/mol. For 2 moles: Delta H = 2 * (+286) = +572 kJ.",
    "Calculating for 1 mole (18 g) instead of 36 g, or getting the sign wrong.",
    45
  ),
  q(
    "Thermodynamics",
    "Which of the following is an intensive property?",
    "Density",
    "Internal energy",
    "Entropy",
    "Enthalpy",
    "A",
    "An intensive property does not depend on the quantity of matter present. Density (= mass / volume, ratio of two extensive properties) is intensive. Internal energy, entropy, and enthalpy scale with system size (extensive).",
    "Confusing extensive thermal state functions with intensive intensive properties.",
    35
  ),
  q(
    "Thermodynamics",
    "In an adiabatic expansion of an ideal gas, the work done W is related to change in internal energy Delta U by:",
    "W = -Delta U",
    "W = Delta U",
    "W = 0",
    "W = q + Delta U",
    "A",
    "First Law of Thermodynamics: Delta U = q + W. In an adiabatic process, heat exchange q = 0. Therefore Delta U = W (IUPAC: work done on system), or work done by system W_by = -Delta U.",
    "Assuming work done in an adiabatic process is zero.",
    40
  ),
  q(
    "Thermodynamics",
    "The standard Gibbs free energy change Delta G^\circ for a reaction is related to the equilibrium constant K by:",
    "Delta G^\circ = -RT ln K",
    "Delta G^\circ = RT ln K",
    "Delta G^\circ = -R ln K",
    "Delta G^\circ = -T ln K",
    "A",
    "By van 't Hoff reaction isotherm, Delta G = Delta G^\circ + RT ln Q. At equilibrium, Delta G = 0 and Q = K, yielding Delta G^\circ = -RT ln K.",
    "Omitting the negative sign or temperature factor T.",
    35
  ),
  q(
    "Thermodynamics",
    "What is the entropy change (Delta S) when 1 mole of ice melts reversibly at 0 deg C? (Enthalpy of fusion = 6.0 kJ/mol)",
    "22.0 J/(mol*K)",
    "16.1 J/(mol*K)",
    "60.0 J/(mol*K)",
    "0 J/(mol*K)",
    "A",
    "Delta S_fus = Delta H_fus / T_fus = 6000 J/mol / 273.15 K = 21.97 J/(mol*K) approx 22.0 J/(mol*K).",
    "Dividing by 0 deg C instead of converting to absolute temperature in Kelvin (273 K).",
    45
  ),
  q(
    "Thermodynamics",
    "For an isolated system undergoing an irreversible spontaneous process, which statement is strictly true?",
    "Delta U = 0, Delta S_system > 0",
    "Delta U < 0, Delta S_system = 0",
    "Delta U > 0, Delta S_system > 0",
    "Delta U = 0, Delta S_system = 0",
    "A",
    "An isolated system exchanges neither mass nor energy with surroundings, so Delta U = 0. By the Second Law of Thermodynamics, any spontaneous irreversible process inside an isolated system increases its entropy: Delta S > 0.",
    "Assuming entropy remains constant for an isolated system in an irreversible process.",
    40
  ),
  q(
    "Thermodynamics",
    "Bond dissociation enthalpies of H-H, Cl-Cl, and H-Cl are 434, 242, and 431 kJ/mol respectively. What is the standard enthalpy of formation of HCl(g)?",
    "-93 kJ/mol",
    "+93 kJ/mol",
    "-186 kJ/mol",
    "+186 kJ/mol",
    "A",
    "Formation reaction: 1/2 H2(g) + 1/2 Cl2(g) -> HCl(g). Delta H_f = 0.5 * D(H-H) + 0.5 * D(Cl-Cl) - D(H-Cl) = 0.5(434) + 0.5(242) - 431 = 217 + 121 - 431 = 338 - 431 = -93 kJ/mol.",
    "Calculating for 2 moles of HCl (-186 kJ/mol) instead of 1 mole standard formation.",
    50
  ),
  q(
    "Thermodynamics",
    "What is the work done when 2 moles of an ideal gas expands into a vacuum (free expansion)?",
    "Zero",
    "-nRT ln(V2/V1)",
    "P_ext * (V2 - V1)",
    "n Cv Delta T",
    "A",
    "Free expansion occurs against zero external opposing pressure (P_ext = 0). Since work W = -int P_ext dV, W = 0.",
    "Using reversible isothermal work formula for an irreversible free expansion into vacuum.",
    35
  ),

  // -------------------------------------------------------------
  // Chemical Equilibrium (11)
  // -------------------------------------------------------------
  q(
    "Chemical Equilibrium",
    "For the reaction PCl5(g) <=> PCl3(g) + Cl2(g), what is the relation between Kp and Kc?",
    "Kp = Kc * (RT)",
    "Kp = Kc / (RT)",
    "Kp = Kc * (RT)^2",
    "Kp = Kc",
    "A",
    "Kp = Kc * (RT)^Delta n_g. Delta n_g = moles of gaseous products - moles of gaseous reactants = (1 + 1) - 1 = 1. Therefore Kp = Kc * (RT).",
    "Inverting the RT term or setting Delta n_g = 0.",
    40
  ),
  q(
    "Chemical Equilibrium",
    "In the Haber process, N2(g) + 3H2(g) <=> 2NH3(g) (Delta H < 0), which condition maximizes the equilibrium yield of ammonia?",
    "High pressure and low temperature",
    "Low pressure and high temperature",
    "High pressure and high temperature",
    "Low pressure and low temperature",
    "A",
    "The forward reaction reduces gaseous moles (4 -> 2), so increasing pressure shifts equilibrium forward. Forward reaction is exothermic (Delta H < 0), so lowering temperature shifts equilibrium forward (Le Chatelier).",
    "Confusing equilibrium yield (favored by low T) with kinetic reaction rate (favored by high T).",
    40
  ),
  q(
    "Chemical Equilibrium",
    "What is the pH of a 10^-8 M aqueous solution of HCl at 25 deg C?",
    "Between 6.95 and 7.00",
    "8.00",
    "6.00",
    "7.00",
    "A",
    "In extremely dilute acid, H^+ from auto-ionization of water cannot be neglected. Total [H^+] = [H^+]_HCl + [H^+]_water = 10^-8 + x. Since (10^-8 + x)(x) = 10^-14 -> x = 9.5 x 10^-8 M. Total [H^+] = 1.05 x 10^-7 M -> pH = -log(1.05 x 10^-7) approx 6.98.",
    "Reporting pH = 8 for an acidic solution.",
    45
  ),
  q(
    "Chemical Equilibrium",
    "If the solubility product Ksp of Ag2CrO4 is 1.1 x 10^-12, what is its molar solubility S in pure water?",
    "(Ksp / 4)^(1/3)",
    "sqrt(Ksp)",
    "(Ksp / 27)^(1/4)",
    "Ksp / 2",
    "A",
    "Ag2CrO4(s) <=> 2 Ag^+ + CrO4^2-. If solubility is S, [Ag^+] = 2S and [CrO4^2-] = S. Ksp = (2S)^2 * (S) = 4 S^3 -> S = (Ksp / 4)^(1/3).",
    "Using Ksp = S^2 (confusing 1:1 salt with 2:1 salt).",
    45
  ),
  q(
    "Chemical Equilibrium",
    "What is the pH of an aqueous buffer containing 0.1 M CH3COOH and 0.1 M CH3COONa? (Ka of acetic acid = 1.8 x 10^-5, pKa = 4.74)",
    "4.74",
    "5.74",
    "3.74",
    "7.00",
    "A",
    "Henderson-Hasselbalch equation: pH = pKa + log([Salt]/[Acid]) = 4.74 + log(0.1/0.1) = 4.74 + 0 = 4.74.",
    "Applying salt hydrolysis formula instead of Henderson-Hasselbalch buffer equation.",
    40
  ),
  q(
    "Chemical Equilibrium",
    "When an inert gas is added to the equilibrium system N2O4(g) <=> 2 NO2(g) at constant volume, what happens to the equilibrium position?",
    "Remains unaffected",
    "Shifts to the right",
    "Shifts to the left",
    "Kp increases",
    "A",
    "Adding inert gas at constant volume increases total pressure, but partial pressures of reacting gases remain unchanged because their concentrations (moles/volume) do not change. Equilibrium is unaffected.",
    "Assuming adding inert gas at constant volume shifts equilibrium toward fewer moles.",
    45
  ),
  q(
    "Chemical Equilibrium",
    "What is the degree of dissociation alpha of PCl5 vapor if its initial vapor density is D and equilibrium vapor density is d?",
    "alpha = (D - d) / d",
    "alpha = (d - D) / D",
    "alpha = (D - d) / (2d)",
    "alpha = D / d",
    "A",
    "General formula for A <=> n B: alpha = (D - d) / ((n - 1) * d). For PCl5 <=> PCl3 + Cl2, n = 2. Thus alpha = (D - d) / ((2 - 1) * d) = (D - d) / d.",
    "Inverting numerator or dividing by D instead of d.",
    50
  ),
  q(
    "Chemical Equilibrium",
    "Which of the following salts hydrolyzes to produce an acidic aqueous solution (pH < 7)?",
    "NH4Cl",
    "CH3COONa",
    "NaCl",
    "KNO3",
    "A",
    "NH4Cl is the salt of a weak base (NH4OH) and a strong acid (HCl). The cation NH4^+ undergoes hydrolysis: NH4^+ + H2O <=> NH3 + H3O^+, releasing excess hydronium ions and lowering pH below 7.",
    "Confusing salts of weak acid/strong base with salts of weak base/strong acid.",
    40
  ),
  q(
    "Chemical Equilibrium",
    "For an endothermic reaction, how does the equilibrium constant K vary with temperature?",
    "K increases with increasing temperature",
    "K decreases with increasing temperature",
    "K remains constant",
    "K first increases then decreases",
    "A",
    "By van 't Hoff equation: d(ln K)/dT = Delta H^\circ / (R T^2). For an endothermic reaction (Delta H^\circ > 0), the slope is positive, so K increases with temperature.",
    "Confusing endothermic with exothermic behavior.",
    35
  ),
  q(
    "Chemical Equilibrium",
    "What is the solubility of AgCl in 0.1 M NaCl solution compared to that in pure water? (Common ion effect)",
    "Significantly lower in NaCl solution",
    "Significantly higher in NaCl solution",
    "Exactly the same",
    "Dependent on atmospheric pressure",
    "A",
    "NaCl completely dissociates to provide 0.1 M Cl^- ions. By Le Chatelier's principle and Ksp = [Ag^+][Cl^-], the high concentration of common ion Cl^- shifts AgCl(s) <=> Ag^+ + Cl^- to the left, drastically suppressing solubility.",
    "Assuming ionic salts have constant solubility independent of common ions.",
    35
  ),
  q(
    "Chemical Equilibrium",
    "What is the conjugate base of HSO4^-?",
    "SO4^2-",
    "H2SO4",
    "H3SO4^+",
    "SO3^2-",
    "A",
    "A conjugate base is formed when a Bronsted-Lowry acid loses one proton (H^+). HSO4^- minus H^+ gives SO4^2-.",
    "Selecting H2SO4 (which is the conjugate acid of HSO4^-).",
    35
  ),

  // -------------------------------------------------------------
  // Coordination Compounds (11)
  // -------------------------------------------------------------
  q(
    "Coordination Compounds",
    "What is the crystal field stabilization energy (CFSE) for a high-spin d6 octahedral complex?",
    "-0.4 Delta_o",
    "-2.4 Delta_o + 2P",
    "-0.6 Delta_o",
    "0 Delta_o",
    "A",
    "In high-spin octahedral d6, pairing energy P is greater than Delta_o. Configuration is t2g^4 eg^2. CFSE = [4 * (-0.4) + 2 * (+0.6)] Delta_o = [-1.6 + 1.2] Delta_o = -0.4 Delta_o.",
    "Confusing high-spin configuration (t2g^4 eg^2) with low-spin configuration (t2g^6).",
    50
  ),
  q(
    "Coordination Compounds",
    "What is the spin-only magnetic moment of [Fe(CN)6]^3-? (Atomic number of Fe = 26)",
    "1.73 BM",
    "5.92 BM",
    "4.90 BM",
    "2.83 BM",
    "A",
    "In [Fe(CN)6]^3-, iron is in +3 oxidation state: Fe^3+ is 3d^5. CN^- is a strong field ligand, forcing pairing to form a low-spin complex: t2g^5 eg^0. Number of unpaired electrons n = 1. Spin-only magnetic moment mu = sqrt(n(n+2)) = sqrt(1 * 3) = sqrt(3) = 1.73 BM.",
    "Treating CN^- as a weak field ligand, yielding 5 unpaired electrons (5.92 BM).",
    50
  ),
  q(
    "Coordination Compounds",
    "Which of the following complex ions exhibits optical isomerism (is chiral)?",
    "[Co(en)3]^3+",
    "trans-[Co(en)2Cl2]^+",
    "[Pt(NH3)2Cl2]",
    "[Co(NH3)4Cl2]^+",
    "A",
    "[Co(en)3]^3+ possesses D3 symmetry with no plane of symmetry or center of inversion, existing as non-superimposable d- and l-enantiomers. Trans-[Co(en)2Cl2]^+ has an inversion center and is optically inactive.",
    "Assuming trans-[Co(en)2Cl2]^+ is chiral.",
    45
  ),
  q(
    "Coordination Compounds",
    "What type of isomerism is shown by the pair [Co(NH3)5(SO4)]Br and [Co(NH3)5Br]SO4?",
    "Ionization isomerism",
    "Linkage isomerism",
    "Coordination isomerism",
    "Hydrate isomerism",
    "A",
    "Ionization isomerism occurs when a ligand inside the coordination sphere interchanges with a counter-ion outside the coordination sphere, producing different ions in aqueous solution (one yields Br^-, the other SO4^2-).",
    "Confusing ionization isomerism with linkage isomerism.",
    40
  ),
  q(
    "Coordination Compounds",
    "What is the correct IUPAC name for [Pt(NH3)2Cl(NO2)]?",
    "Diamminechloridonitrito-N-platinum(II)",
    "Diamminechloronitroplatinum(IV)",
    "Chloridodiamminenitritoplatinum(II)",
    "Diammineplatinum(II) chloronitrite",
    "A",
    "Ligands are listed alphabetically: ammine before chlorido before nitrito-N. Pt is in +2 oxidation state (Cl is -1, NO2 is -1). Name: Diamminechloridonitrito-N-platinum(II).",
    "Using outdated ligand names or failing alphabetical ordering.",
    45
  ),
  q(
    "Coordination Compounds",
    "According to Werner's coordination theory, secondary valencies correspond to:",
    "Coordination number and are directional in space",
    "Oxidation state and are non-directional",
    "Ionizable ionic charges",
    "Only counter-ions outside the coordination sphere",
    "A",
    "Primary valencies correspond to oxidation state, are ionizable, and non-directional. Secondary valencies correspond to coordination number, are non-ionizable, directional in space, and determine molecular stereochemistry.",
    "Swapping primary and secondary valencies.",
    40
  ),
  q(
    "Coordination Compounds",
    "What is the relationship between crystal field splitting in octahedral (Delta_o) and tetrahedral (Delta_t) complexes?",
    "Delta_t = (4/9) * Delta_o",
    "Delta_t = (9/4) * Delta_o",
    "Delta_t = (1/2) * Delta_o",
    "Delta_t = Delta_o",
    "A",
    "In tetrahedral geometry, there are only 4 ligands instead of 6, and none point directly at the d-orbitals. Geometric calculation shows Delta_t = (2/3) * (2/3) * Delta_o = (4/9) * Delta_o.",
    "Inverting the ratio or using 1/2.",
    40
  ),
  q(
    "Coordination Compounds",
    "In metal carbonyls like [Ni(CO)4] and [Fe(CO)5], synergic bonding involves:",
    "Sigma donation from CO to metal and pi back-bonding from metal d-orbitals to pi* of CO",
    "Only pure electrostatic ionic attractions",
    "Pi donation from CO and sigma back-bonding from metal",
    "Only sigma donation with no back-bonding",
    "A",
    "Synergic bonding consists of a sigma bond formed by donation of lone pair from carbonyl carbon into vacant metal d-orbital, reinforced by pi back-bonding where filled metal d-electrons are back-donated into empty pi* antibonding orbitals of CO.",
    "Inverting the donor and acceptor roles in synergic bonding.",
    45
  ),
  q(
    "Coordination Compounds",
    "The compound [Cr(H2O)6]Cl3 is violet, while [Cr(H2O)5Cl]Cl2*H2O is blue-green. This is an example of:",
    "Hydrate (solvate) isomerism",
    "Coordination isomerism",
    "Linkage isomerism",
    "Geometrical isomerism",
    "A",
    "Hydrate isomerism occurs when water molecules interchange between the coordination sphere (as aqua ligands) and the crystal lattice (as water of crystallization).",
    "Confusing hydrate isomerism with linkage isomerism.",
    40
  ),
  q(
    "Coordination Compounds",
    "Which of the following ligands is ambidentate?",
    "SCN^-",
    "en (ethylenediamine)",
    "ox^2- (oxalate)",
    "NH3",
    "A",
    "An ambidentate ligand has two different coordinating donor atoms but binds through only one at a time. Thiocyanate can bind via sulfur (thiocyanato, S-bonded) or nitrogen (isothiocyanato, N-bonded).",
    "Confusing bidentate chelating ligands like en with ambidentate ligands.",
    40
  ),
  q(
    "Coordination Compounds",
    "The geometry and hybridization of the nickel complex in [Ni(CN)4]^2- is:",
    "Square planar, dsp^2",
    "Tetrahedral, sp^3",
    "Octahedral, sp^3d^2",
    "Trigonal bipyramidal, sp^3d",
    "A",
    "Ni^2+ is 3d^8. CN^- is a strong field ligand, forcing pairing of the two unpaired 3d electrons into a single orbital. This vacates one 3d orbital, enabling dsp^2 hybridization and square planar diamagnetic geometry.",
    "Assuming tetrahedral geometry by treating CN^- as weak field.",
    45
  ),

  // -------------------------------------------------------------
  // Organic Chemistry Basics (11)
  // -------------------------------------------------------------
  q(
    "Organic Chemistry Basics",
    "Which of the following carbocations is the most stable?",
    "(C6H5)3C^+ (Triphenylmethyl cation)",
    "(CH3)3C^+ (tert-Butyl cation)",
    "(CH3)2CH^+ (Isopropyl cation)",
    "CH3-CH2^+ (Ethyl cation)",
    "A",
    "Triphenylmethyl carbocation (trityl) is stabilized by extensive resonance delocalization across 3 benzene rings (10 resonance contributing structures), far exceeding hyperconjugative stabilization in tert-butyl.",
    "Selecting tert-butyl based on hyperconjugation alone while overlooking triaryl resonance.",
    45
  ),
  q(
    "Organic Chemistry Basics",
    "Which of the following compounds obeys Huckel's rule and is aromatic?",
    "Cyclopentadienyl anion",
    "Cyclooctatetraene",
    "Cyclopentadienyl cation",
    "Cyclobutadiene",
    "A",
    "Cyclopentadienyl anion is planar, fully conjugated, and has 6 pi electrons (4 from two double bonds + 2 from carbanion lone pair), satisfying 4n + 2 rule with n = 1. Cyclooctatetraene is non-planar tub-shaped; cyclobutadiene is anti-aromatic (4 pi electrons).",
    "Confusing cyclopentadienyl anion (aromatic, 6 pi) with cation (anti-aromatic, 4 pi).",
    45
  ),
  q(
    "Organic Chemistry Basics",
    "What is the correct order of basicity of methylamines in aqueous solution?",
    "(CH3)2NH > CH3NH2 > (CH3)3N > NH3",
    "(CH3)3N > (CH3)2NH > CH3NH2 > NH3",
    "CH3NH2 > (CH3)2NH > (CH3)3N > NH3",
    "(CH3)2NH > (CH3)3N > CH3NH2 > NH3",
    "A",
    "In aqueous solution, basicity is governed by a balance of inductive effect (+I), steric hindrance, and hydration of conjugate cation. For methyl substituent, order is 2 deg > 1 deg > 3 deg > NH3 (2130 rule). For ethyl, it is 2 deg > 3 deg > 1 deg > NH3 (2310 rule).",
    "Using gas-phase basicity order (3 deg > 2 deg > 1 deg > NH3) which considers only inductive effect.",
    50
  ),
  q(
    "Organic Chemistry Basics",
    "Which of the following carboxylic acids has the lowest pKa (highest acidity)?",
    "Trifluoroacetic acid (CF3COOH)",
    "Trichloroacetic acid (CCl3COOH)",
    "Acetic acid (CH3COOH)",
    "Formic acid (HCOOH)",
    "A",
    "Fluorine is the most electronegative halogen. Three fluorine atoms exert powerful -I inductive withdrawal, stabilizing the conjugate carboxylate anion (CF3COO^-) and making CF3COOH the strongest acid.",
    "Selecting trichloroacetic acid or acetic acid.",
    35
  ),
  q(
    "Organic Chemistry Basics",
    "What is the stereochemical relationship between (2R, 3R)-tartaric acid and (2S, 3S)-tartaric acid?",
    "Enantiomers",
    "Diastereomers",
    "Identical (meso)",
    "Constitutional isomers",
    "A",
    "(2R, 3R) and (2S, 3S) have inverted configurations at all chiral centers, making them non-superimposable mirror images (enantiomers). (2R, 3S) is the meso diastereomer.",
    "Confusing enantiomeric pairs with meso isomers.",
    40
  ),
  q(
    "Organic Chemistry Basics",
    "What is the most stable conformation of cyclohexane?",
    "Chair",
    "Boat",
    "Twist-boat",
    "Half-chair",
    "A",
    "The chair conformation is completely free of angle strain (all C-C-C angles are 109.5 deg) and torsional strain (all adjacent C-H bonds are staggered).",
    "Selecting boat conformation which suffers from flagpole hydrogen steric clash.",
    35
  ),
  q(
    "Organic Chemistry Basics",
    "Which of the following intermediate species has a sextet of valence electrons and no formal charge?",
    "Free radical",
    "Carbocation",
    "Carbene",
    "Carbanion",
    "C",
    "A carbene (:CR2) has 6 valence electrons around carbon (two C-R single bonds + one non-bonding lone pair) and zero formal charge. Carbocation has a sextet with +1 charge; radical has 7 electrons.",
    "Confusing carbene with carbocation (+1 charge) or radical (septet of electrons).",
    45
  ),
  q(
    "Organic Chemistry Basics",
    "Why is hyperconjugation also known as 'no-bond resonance'?",
    "It involves delocalization of sigma electrons of C-H bond into adjacent vacant or partially filled p-orbital",
    "It occurs only in the absence of chemical bonds",
    "It involves complete dissociation of protons into solution",
    "It involves delocalization of pi electrons only",
    "A",
    "Hyperconjugation involves overlap of sigma(C-H) electrons with an adjacent empty or unhybridized p-orbital (Baker-Nathan effect), creating resonance canonical structures with no covalent bond between C and H.",
    "Assuming hyperconjugation is identical to ordinary pi-pi resonance.",
    40
  ),
  q(
    "Organic Chemistry Basics",
    "Which isomer of cresol (methylphenol) is the least acidic due to steric hindrance and +I effect?",
    "o-cresol",
    "m-cresol",
    "p-cresol",
    "All have identical acidity",
    "A",
    "In o-cresol, the methyl group is adjacent to the -OH group. The electron-donating +I effect destabilizes the phenoxide anion, and steric hindrance hampers solvation of the phenoxide oxygen, making o-cresol less acidic than m-cresol.",
    "Assuming meta-substituted phenols are least acidic.",
    45
  ),
  q(
    "Organic Chemistry Basics",
    "How many stereoisomers exist for 2,3-dichlorobutane?",
    "3",
    "2",
    "4",
    "8",
    "A",
    "2,3-dichlorobutane has 2 pseudo-identical chiral centers. Total isomers = 2^(n-1) + 2^((n/2)-1) = 2^1 + 2^0 = 2 + 1 = 3 stereoisomers (one pair of enantiomers (2R,3R and 2S,3S) and one achiral meso compound (2R,3S)).",
    "Using 2^n = 4 for molecules with symmetric stereocenters.",
    45
  ),
  q(
    "Organic Chemistry Basics",
    "In electrophilic aromatic substitution, which of the following substituents is deactivating yet ortho/para-directing?",
    "-Cl (Chloro)",
    "-NO2 (Nitro)",
    "-OCH3 (Methoxy)",
    "-CH3 (Methyl)",
    "A",
    "Halogens (-Cl, -Br) have a strong -I electron-withdrawing effect that decreases overall electron density on the benzene ring (deactivating). However, their lone pairs participate in resonance (+M), which specifically stabilizes carbocation intermediates at ortho and para positions.",
    "Assuming all deactivating groups are strictly meta-directing.",
    45
  ),

  // -------------------------------------------------------------
  // Hydrocarbons (11)
  // -------------------------------------------------------------
  q(
    "Hydrocarbons",
    "What is the major product obtained when propene reacts with HBr in the presence of benzoyl peroxide?",
    "1-bromopropane",
    "2-bromopropane",
    "1,2-dibromopropane",
    "2,2-dibromopropane",
    "A",
    "In the presence of peroxides, HBr adds via a free radical chain mechanism (Kharasch / peroxide effect). The bromine radical adds to the terminal carbon to form the more stable secondary carbon radical, yielding 1-bromopropane as the anti-Markovnikov major product.",
    "Applying standard Markovnikov addition (yielding 2-bromopropane) by ignoring the peroxide catalyst.",
    45
  ),
  q(
    "Hydrocarbons",
    "Ozonolysis of an alkene followed by reductive workup with Zn/H2O produces acetone and formaldehyde. What is the alkene?",
    "2-methylpropene (isobutylene)",
    "2-butene",
    "1-butene",
    "2-methyl-2-butene",
    "A",
    "Reductive ozonolysis cleaves the C=C double bond, capping each end with =O. Acetone is (CH3)2C=O and formaldehyde is H2C=O. Combining them gives (CH3)2C=CH2, which is 2-methylpropene.",
    "Confusing isobutylene with 2-methyl-2-butene (which yields acetone and acetaldehyde).",
    45
  ),
  q(
    "Hydrocarbons",
    "Reduction of 2-butyne with sodium in liquid ammonia (Birch reduction) produces:",
    "trans-2-butene",
    "cis-2-butene",
    "butane",
    "1-butene",
    "A",
    "Birch reduction (Na in liquid NH3) reduces internal alkynes stereoselectively to trans-alkenes via radical anion intermediates. Lindlar's catalyst (Pd/CaCO3/quinoline) reduces to cis-alkenes.",
    "Confusing Birch reduction (trans) with Lindlar catalyst hydrogenation (cis).",
    45
  ),
  q(
    "Hydrocarbons",
    "Which of the following hydrocarbons reacts with ammoniacal silver nitrate (Tollens' reagent) to form a white precipitate?",
    "Propyne",
    "2-butyne",
    "Propene",
    "Ethane",
    "A",
    "Terminal alkynes possess acidic sp-hybridized C-H bonds (pKa approx 25). Propyne (CH3-C#CH) reacts with ammoniacal AgNO3 to form silver propynide precipitate. 2-butyne is an internal alkyne with no terminal acidic hydrogen.",
    "Assuming internal alkynes also form silver acetylides.",
    40
  ),
  q(
    "Hydrocarbons",
    "What is the major product of the Friedel-Crafts alkylation of benzene with 1-chloropropane in the presence of anhydrous AlCl3?",
    "Cumene (isopropylbenzene)",
    "n-propylbenzene",
    "Toluene",
    "Ethylbenzene",
    "A",
    "AlCl3 abstracts chloride to form a primary carbocation (CH3-CH2-CH2^+), which rapidly undergoes a 1,2-hydride shift to form the more stable secondary carbocation (CH3-CH^+-CH3). Electrophilic attack on benzene yields isopropylbenzene (cumene).",
    "Assuming un-rearranged primary alkylation product (n-propylbenzene).",
    50
  ),
  q(
    "Hydrocarbons",
    "During free radical chlorination of methane, which step represents a chain termination step?",
    "CH3* + Cl* -> CH3Cl",
    "Cl* + CH4 -> CH3* + HCl",
    "CH3* + Cl2 -> CH3Cl + Cl*",
    "Cl2 -> 2 Cl* (under UV light)",
    "A",
    "Chain termination involves the combination of two free radicals to form a stable non-radical molecule (CH3* + Cl* -> CH3Cl or 2 CH3* -> C2H6). Photolysis of Cl2 is initiation; reactions between radical and molecule are propagation.",
    "Confusing propagation steps with chain termination.",
    35
  ),
  q(
    "Hydrocarbons",
    "What reagent is used to convert benzene to hexachlorocyclohexane (BHC / Lindane)?",
    "Cl2 / UV light",
    "Cl2 / anhydrous FeCl3",
    "HCl / AlCl3",
    "SO2Cl2 / heat",
    "A",
    "Under UV light at high temperature, benzene undergoes addition of 3 molecules of chlorine via a free radical pathway to form 1,2,3,4,5,6-hexachlorocyclohexane (BHC). With anhydrous FeCl3, electrophilic substitution occurs yielding chlorobenzene.",
    "Confusing electrophilic substitution (FeCl3) with radical addition (UV light).",
    40
  ),
  q(
    "Hydrocarbons",
    "What is the major product obtained when 2-bromobutane is heated with alcoholic KOH?",
    "trans-2-butene",
    "cis-2-butene",
    "1-butene",
    "2-butanol",
    "A",
    "Alcoholic KOH promotes E2 elimination. By Saytzeff's rule, the more substituted and thermally stable alkene is favored (2-butene over 1-butene). Among stereoisomers, trans-2-butene is more stable than cis-2-butene due to reduced steric clash.",
    "Applying Hofmann elimination or substituting with OH to form alcohol.",
    45
  ),
  q(
    "Hydrocarbons",
    "Hydroboration-oxidation of 1-methylcyclopentene yields:",
    "trans-2-methylcyclopentanol",
    "cis-2-methylcyclopentanol",
    "1-methylcyclopentanol",
    "2-methylcyclopentanone",
    "A",
    "Hydroboration-oxidation proceeds with syn-addition of H and OH across the double bond with anti-Markovnikov regiochemistry. In 1-methylcyclopentene, H adds to C1 and OH to C2 from the same face, placing the methyl and hydroxyl groups trans to each other.",
    "Applying Markovnikov addition (yielding 1-methylcyclopentanol).",
    55
  ),
  q(
    "Hydrocarbons",
    "What is the catalyst used in the Ziegler-Natta polymerization of ethylene to produce high-density polyethylene (HDPE)?",
    "TiCl4 + (C2H5)3Al",
    "V2O5",
    "Fe + Mo",
    "PdCl2 + CuCl2",
    "A",
    "The Ziegler-Natta catalyst is a coordination complex typically composed of titanium tetrachloride (TiCl4) and triethylaluminium (Al(C2H5)3), allowing stereospecific coordination polymerization at low temperature and pressure.",
    "Confusing with Wacker process catalyst or Haber catalyst.",
    40
  ),
  q(
    "Hydrocarbons",
    "When propyne is passed through dilute H2SO4 in the presence of HgSO4 at 60 deg C (Kucherov reaction), the product is:",
    "Acetone (propan-2-one)",
    "Propanal",
    "Propanoic acid",
    "Propan-2-ol",
    "A",
    "Kucherov hydration follows Markovnikov's rule: water adds across the triple bond to form the enol intermediate CH3-C(OH)=CH2, which rapidly tautomerizes to the more stable ketone (acetone, CH3-CO-CH3).",
    "Predicting an aldehyde product (propanal) by mistaking Markovnikov for anti-Markovnikov hydration.",
    45
  ),
];

console.log("Total Chemistry questions prepared:", chemQuestions.length);

const chemTsContent = `// Path: lib/data/banks/jee-main/chemistry.ts
import type { SeedQuestion } from "../../question-bank-seed";

export const JEE_MAIN_CHEMISTRY_QUESTIONS: SeedQuestion[] = ${JSON.stringify(chemQuestions, null, 2)};
`;

fs.mkdirSync(path.resolve(process.cwd(), "lib/data/banks/jee-main"), { recursive: true });
fs.writeFileSync(path.resolve(process.cwd(), "lib/data/banks/jee-main/chemistry.ts"), chemTsContent);
console.log("Wrote lib/data/banks/jee-main/chemistry.ts successfully!");
