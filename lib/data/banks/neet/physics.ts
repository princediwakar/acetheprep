// Path: lib/data/banks/neet/physics.ts
import type { SeedQuestion } from "../../question-bank-seed";

export const NEET_PHYSICS_QUESTIONS: SeedQuestion[] = [
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Mechanics",
    "difficulty_tier": 2,
    "question_text": "If the dimensional formula of a physical quantity is [M^1 L^-1 T^-2], it corresponds to:",
    "options": {
      "A": "Pressure or stress",
      "B": "Force",
      "C": "Work or energy",
      "D": "Power"
    },
    "correct_option": "A",
    "explanation": "Pressure = Force / Area = [M L T^-2] / [L^2] = [M L^-1 T^-2]. Stress also has identical dimensions. Force is [M L T^-2], Work is [M L^2 T^-2], Power is [M L^2 T^-3].",
    "distractor_analysis": {
      "A": "Correct. Pressure = Force / Area = [M L T^-2] / [L^2] = [M L^-1 T^-2]. Stress also has id",
      "B": "Incorrect. Common distractor based on: Confusing pressure with force or energy.",
      "C": "Incorrect. Common distractor based on: Confusing pressure with force or energy.",
      "D": "Incorrect. Common distractor based on: Confusing pressure with force or energy."
    },
    "misconception": "Confusing pressure with force or energy.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Mechanics",
    "difficulty_tier": 2,
    "question_text": "A body of mass 5 kg is moving in a circle of radius 1 m with an angular velocity of 2 rad/s. What is the centripetal force acting on the body?",
    "options": {
      "A": "20 N",
      "B": "10 N",
      "C": "40 N",
      "D": "5 N"
    },
    "correct_option": "A",
    "explanation": "Centripetal force F = m * omega^2 * r = 5 * (2^2) * 1 = 5 * 4 * 1 = 20 N.",
    "distractor_analysis": {
      "A": "Correct. Centripetal force F = m * omega^2 * r = 5 * (2^2) * 1 = 5 * 4 * 1 = 20 N.",
      "B": "Incorrect. Common distractor based on: Dividing by omega instead of squaring.",
      "C": "Incorrect. Common distractor based on: Dividing by omega instead of squaring.",
      "D": "Incorrect. Common distractor based on: Dividing by omega instead of squaring."
    },
    "misconception": "Dividing by omega instead of squaring.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Mechanics",
    "difficulty_tier": 2,
    "question_text": "What is the escape velocity from the surface of a planet whose mass and radius are both twice those of the Earth? (Escape velocity on Earth = 11.2 km/s)",
    "options": {
      "A": "11.2 km/s",
      "B": "22.4 km/s",
      "C": "5.6 km/s",
      "D": "15.8 km/s"
    },
    "correct_option": "A",
    "explanation": "v_e = sqrt(2 G M / R). For the new planet: v_e' = sqrt(2 G (2M) / (2R)) = sqrt(2 G M / R) = v_e = 11.2 km/s.",
    "distractor_analysis": {
      "A": "Correct. v_e = sqrt(2 G M / R). For the new planet: v_e' = sqrt(2 G (2M) / (2R)) = sqrt(2",
      "B": "Incorrect. Common distractor based on: Assuming escape velocity doubles when mass doubles without a",
      "C": "Incorrect. Common distractor based on: Assuming escape velocity doubles when mass doubles without a",
      "D": "Incorrect. Common distractor based on: Assuming escape velocity doubles when mass doubles without a"
    },
    "misconception": "Assuming escape velocity doubles when mass doubles without accounting for radius.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Mechanics",
    "difficulty_tier": 2,
    "question_text": "A simple pendulum has period T on Earth. If taken to a mine at depth d = R/2 below Earth's surface, its period becomes:",
    "options": {
      "A": "sqrt(2) * T",
      "B": "2 * T",
      "C": "T / sqrt(2)",
      "D": "T / 2"
    },
    "correct_option": "A",
    "explanation": "Acceleration due to gravity at depth d is g' = g (1 - d/R) = g (1 - 0.5) = g/2. Period T = 2 pi sqrt(L/g). T' = 2 pi sqrt(L / (g/2)) = sqrt(2) * T.",
    "distractor_analysis": {
      "A": "Correct. Acceleration due to gravity at depth d is g' = g (1 - d/R) = g (1 - 0.5) = g/2. ",
      "B": "Incorrect. Common distractor based on: Assuming g increases with depth inside the Earth.",
      "C": "Incorrect. Common distractor based on: Assuming g increases with depth inside the Earth.",
      "D": "Incorrect. Common distractor based on: Assuming g increases with depth inside the Earth."
    },
    "misconception": "Assuming g increases with depth inside the Earth.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Mechanics",
    "difficulty_tier": 2,
    "question_text": "According to Bernoulli's theorem, in the streamline horizontal flow of an ideal fluid, which sum remains constant?",
    "options": {
      "A": "P + (1/2) rho v^2",
      "B": "P + rho v^2",
      "C": "P / rho + v",
      "D": "P v + (1/2) rho v^2"
    },
    "correct_option": "A",
    "explanation": "For horizontal streamline flow (constant height h), Bernoulli's equation reduces to P + (1/2) rho v^2 = constant (sum of static pressure and dynamic pressure is constant).",
    "distractor_analysis": {
      "A": "Correct. For horizontal streamline flow (constant height h), Bernoulli's equation reduces",
      "B": "Incorrect. Common distractor based on: Omitting factor of 1/2 in dynamic pressure term.",
      "C": "Incorrect. Common distractor based on: Omitting factor of 1/2 in dynamic pressure term.",
      "D": "Incorrect. Common distractor based on: Omitting factor of 1/2 in dynamic pressure term."
    },
    "misconception": "Omitting factor of 1/2 in dynamic pressure term.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Mechanics",
    "difficulty_tier": 2,
    "question_text": "A block of mass 10 kg is placed on a rough horizontal surface with coefficient of static friction mu_s = 0.5. If a horizontal force of 40 N is applied, what is the friction force? (g = 10 m/s^2)",
    "options": {
      "A": "40 N",
      "B": "50 N",
      "C": "10 N",
      "D": "0 N"
    },
    "correct_option": "A",
    "explanation": "Maximum limiting static friction f_max = mu_s * m * g = 0.5 * 10 * 10 = 50 N. Since applied force F = 40 N < f_max, the block remains stationary and static friction equals applied force: f = 40 N.",
    "distractor_analysis": {
      "A": "Correct. Maximum limiting static friction f_max = mu_s * m * g = 0.5 * 10 * 10 = 50 N. Si",
      "B": "Incorrect. Common distractor based on: Assuming static friction always equals its maximum limiting ",
      "C": "Incorrect. Common distractor based on: Assuming static friction always equals its maximum limiting ",
      "D": "Incorrect. Common distractor based on: Assuming static friction always equals its maximum limiting "
    },
    "misconception": "Assuming static friction always equals its maximum limiting value (50 N).",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Mechanics",
    "difficulty_tier": 2,
    "question_text": "The moment of inertia of a uniform circular disc of mass M and radius R about an axis passing through its center and perpendicular to its plane is:",
    "options": {
      "A": "(1/2) M R^2",
      "B": "M R^2",
      "C": "(1/4) M R^2",
      "D": "(2/5) M R^2"
    },
    "correct_option": "A",
    "explanation": "For a uniform circular flat disc, I_z = (1/2) M R^2. For a thin circular ring it is M R^2; for a solid sphere it is (2/5) M R^2.",
    "distractor_analysis": {
      "A": "Correct. For a uniform circular flat disc, I_z = (1/2) M R^2. For a thin circular ring it",
      "B": "Incorrect. Common distractor based on: Confusing disc inertia with ring or solid sphere inertia.",
      "C": "Incorrect. Common distractor based on: Confusing disc inertia with ring or solid sphere inertia.",
      "D": "Incorrect. Common distractor based on: Confusing disc inertia with ring or solid sphere inertia."
    },
    "misconception": "Confusing disc inertia with ring or solid sphere inertia.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Mechanics",
    "difficulty_tier": 2,
    "question_text": "Two bodies of masses 1 kg and 4 kg have equal kinetic energies. What is the ratio of their linear momenta?",
    "options": {
      "A": "1 : 2",
      "B": "1 : 4",
      "C": "1 : 1",
      "D": "2 : 1"
    },
    "correct_option": "A",
    "explanation": "Linear momentum p = sqrt(2 m KE). Ratio p1 / p2 = sqrt(m1 / m2) = sqrt(1 / 4) = 1/2 = 1 : 2.",
    "distractor_analysis": {
      "A": "Correct. Linear momentum p = sqrt(2 m KE). Ratio p1 / p2 = sqrt(m1 / m2) = sqrt(1 / 4) = ",
      "B": "Incorrect. Common distractor based on: Using p proportional to m (giving 1:4) rather than square ro",
      "C": "Incorrect. Common distractor based on: Using p proportional to m (giving 1:4) rather than square ro",
      "D": "Incorrect. Common distractor based on: Using p proportional to m (giving 1:4) rather than square ro"
    },
    "misconception": "Using p proportional to m (giving 1:4) rather than square root of m.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Mechanics",
    "difficulty_tier": 2,
    "question_text": "What is the excess pressure inside a spherical soap bubble of radius R and surface tension T in air?",
    "options": {
      "A": "4 T / R",
      "B": "2 T / R",
      "C": "T / R",
      "D": "8 T / R"
    },
    "correct_option": "A",
    "explanation": "A soap bubble in air has two liquid-air interfaces (inner and outer surfaces). Excess pressure Delta P = 2 * (2T / R) = 4 T / R. A liquid drop in air has only one interface (Delta P = 2T / R).",
    "distractor_analysis": {
      "A": "Correct. A soap bubble in air has two liquid-air interfaces (inner and outer surfaces). E",
      "B": "Incorrect. Common distractor based on: Confusing a soap bubble (two interfaces, 4T/R) with a liquid",
      "C": "Incorrect. Common distractor based on: Confusing a soap bubble (two interfaces, 4T/R) with a liquid",
      "D": "Incorrect. Common distractor based on: Confusing a soap bubble (two interfaces, 4T/R) with a liquid"
    },
    "misconception": "Confusing a soap bubble (two interfaces, 4T/R) with a liquid drop (one interface, 2T/R).",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Mechanics",
    "difficulty_tier": 2,
    "question_text": "A ball is thrown vertically upward with velocity 20 m/s. What is the maximum height reached? (g = 10 m/s^2)",
    "options": {
      "A": "20 m",
      "B": "40 m",
      "C": "10 m",
      "D": "30 m"
    },
    "correct_option": "A",
    "explanation": "h_max = u^2 / (2g) = (20)^2 / (2 * 10) = 400 / 20 = 20 m.",
    "distractor_analysis": {
      "A": "Correct. h_max = u^2 / (2g) = (20)^2 / (2 * 10) = 400 / 20 = 20 m.",
      "B": "Incorrect. Common distractor based on: Dividing by g instead of 2g (getting 40 m).",
      "C": "Incorrect. Common distractor based on: Dividing by g instead of 2g (getting 40 m).",
      "D": "Incorrect. Common distractor based on: Dividing by g instead of 2g (getting 40 m)."
    },
    "misconception": "Dividing by g instead of 2g (getting 40 m).",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Mechanics",
    "difficulty_tier": 2,
    "question_text": "In simple harmonic motion, at what displacement from the mean position are kinetic energy and potential energy equal?",
    "options": {
      "A": "+- A / sqrt(2)",
      "B": "+- A / 2",
      "C": "+- A / 4",
      "D": "+- A"
    },
    "correct_option": "A",
    "explanation": "KE = 0.5 k (A^2 - x^2), PE = 0.5 k x^2. Equating: A^2 - x^2 = x^2 -> 2 x^2 = A^2 -> x = +- A / sqrt(2).",
    "distractor_analysis": {
      "A": "Correct. KE = 0.5 k (A^2 - x^2), PE = 0.5 k x^2. Equating: A^2 - x^2 = x^2 -> 2 x^2 = A^2",
      "B": "Incorrect. Common distractor based on: Setting x = A/2 (which gives PE = 1/4 total energy, KE = 3/4",
      "C": "Incorrect. Common distractor based on: Setting x = A/2 (which gives PE = 1/4 total energy, KE = 3/4",
      "D": "Incorrect. Common distractor based on: Setting x = A/2 (which gives PE = 1/4 total energy, KE = 3/4"
    },
    "misconception": "Setting x = A/2 (which gives PE = 1/4 total energy, KE = 3/4 total energy).",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Electrodynamics",
    "difficulty_tier": 2,
    "question_text": "Two point charges +q and -q separated by distance 2a form an electric dipole. What is the electric field at distance r >> a on the axial line?",
    "options": {
      "A": "2 p / (4 pi eps0 r^3)",
      "B": "p / (4 pi eps0 r^3)",
      "C": "p / (4 pi eps0 r^2)",
      "D": "2 p / (4 pi eps0 r^2)"
    },
    "correct_option": "A",
    "explanation": "On the axial line of an electric dipole, E_axial = 2 p r / (4 pi eps0 (r^2 - a^2)^2). For r >> a, this simplifies to 2 p / (4 pi eps0 r^3). On the equatorial line it is p / (4 pi eps0 r^3).",
    "distractor_analysis": {
      "A": "Correct. On the axial line of an electric dipole, E_axial = 2 p r / (4 pi eps0 (r^2 - a^2",
      "B": "Incorrect. Common distractor based on: Confusing axial dipole field (2p/r^3) with equatorial field ",
      "C": "Incorrect. Common distractor based on: Confusing axial dipole field (2p/r^3) with equatorial field ",
      "D": "Incorrect. Common distractor based on: Confusing axial dipole field (2p/r^3) with equatorial field "
    },
    "misconception": "Confusing axial dipole field (2p/r^3) with equatorial field (p/r^3) or point charge field (1/r^2).",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Electrodynamics",
    "difficulty_tier": 2,
    "question_text": "A parallel plate capacitor with air has capacitance C0. When the space between plates is completely filled with dielectric of constant K = 5, its capacitance becomes:",
    "options": {
      "A": "5 C0",
      "B": "C0 / 5",
      "C": "C0 + 5",
      "D": "25 C0"
    },
    "correct_option": "A",
    "explanation": "Capacitance with dielectric of constant K is C = K * C0. For K = 5, C = 5 C0.",
    "distractor_analysis": {
      "A": "Correct. Capacitance with dielectric of constant K is C = K * C0. For K = 5, C = 5 C0.",
      "B": "Incorrect. Common distractor based on: Dividing by K instead of multiplying.",
      "C": "Incorrect. Common distractor based on: Dividing by K instead of multiplying.",
      "D": "Incorrect. Common distractor based on: Dividing by K instead of multiplying."
    },
    "misconception": "Dividing by K instead of multiplying.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Electrodynamics",
    "difficulty_tier": 2,
    "question_text": "Three resistors of resistances 2 ohms, 3 ohms, and 6 ohms are connected in parallel. What is their equivalent resistance?",
    "options": {
      "A": "1 ohm",
      "B": "11 ohms",
      "C": "0.5 ohm",
      "D": "2 ohms"
    },
    "correct_option": "A",
    "explanation": "1 / R_eq = 1/2 + 1/3 + 1/6 = 3/6 + 2/6 + 1/6 = 6/6 = 1. R_eq = 1 ohm.",
    "distractor_analysis": {
      "A": "Correct. 1 / R_eq = 1/2 + 1/3 + 1/6 = 3/6 + 2/6 + 1/6 = 6/6 = 1. R_eq = 1 ohm.",
      "B": "Incorrect. Common distractor based on: Adding resistances directly in series (2 + 3 + 6 = 11 ohms).",
      "C": "Incorrect. Common distractor based on: Adding resistances directly in series (2 + 3 + 6 = 11 ohms).",
      "D": "Incorrect. Common distractor based on: Adding resistances directly in series (2 + 3 + 6 = 11 ohms)."
    },
    "misconception": "Adding resistances directly in series (2 + 3 + 6 = 11 ohms).",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Electrodynamics",
    "difficulty_tier": 2,
    "question_text": "A charged particle of charge q and mass m enters a uniform magnetic field B with velocity v perpendicular to B. What is the radius of its circular path?",
    "options": {
      "A": "m v / (q B)",
      "B": "q B / (m v)",
      "C": "q v / (m B)",
      "D": "m B / (q v)"
    },
    "correct_option": "A",
    "explanation": "Magnetic Lorentz force provides centripetal acceleration: q v B = m v^2 / r -> r = m v / (q B).",
    "distractor_analysis": {
      "A": "Correct. Magnetic Lorentz force provides centripetal acceleration: q v B = m v^2 / r -> r",
      "B": "Incorrect. Common distractor based on: Inverting the ratio.",
      "C": "Incorrect. Common distractor based on: Inverting the ratio.",
      "D": "Incorrect. Common distractor based on: Inverting the ratio."
    },
    "misconception": "Inverting the ratio.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Electrodynamics",
    "difficulty_tier": 2,
    "question_text": "According to Lenz's law, the polarity of induced emf in a closed circuit always:",
    "options": {
      "A": "Opposes the change in magnetic flux that produces it",
      "B": "Aids the change in magnetic flux",
      "C": "Acts in the direction of the external magnetic field",
      "D": "Is perpendicular to the magnetic field"
    },
    "correct_option": "A",
    "explanation": "Lenz's law is a consequence of conservation of energy: an induced current flows in a direction such that its magnetic field opposes the change in magnetic flux inducing it.",
    "distractor_analysis": {
      "A": "Correct. Lenz's law is a consequence of conservation of energy: an induced current flows ",
      "B": "Incorrect. Common distractor based on: Assuming induced emf reinforces flux changes.",
      "C": "Incorrect. Common distractor based on: Assuming induced emf reinforces flux changes.",
      "D": "Incorrect. Common distractor based on: Assuming induced emf reinforces flux changes."
    },
    "misconception": "Assuming induced emf reinforces flux changes.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Electrodynamics",
    "difficulty_tier": 2,
    "question_text": "In an AC circuit, current leads voltage by a phase angle of pi/2. The circuit element is a:",
    "options": {
      "A": "Pure capacitor",
      "B": "Pure inductor",
      "C": "Pure resistor",
      "D": "Series L-R combination"
    },
    "correct_option": "A",
    "explanation": "In an alternating circuit with a pure capacitor, current leads alternating voltage by pi/2 (ICE: Current leads in Capacitor). In a pure inductor, voltage leads current by pi/2 (ELI).",
    "distractor_analysis": {
      "A": "Correct. In an alternating circuit with a pure capacitor, current leads alternating volta",
      "B": "Incorrect. Common distractor based on: Confusing capacitor phase lead with inductor phase lag.",
      "C": "Incorrect. Common distractor based on: Confusing capacitor phase lead with inductor phase lag.",
      "D": "Incorrect. Common distractor based on: Confusing capacitor phase lead with inductor phase lag."
    },
    "misconception": "Confusing capacitor phase lead with inductor phase lag.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Electrodynamics",
    "difficulty_tier": 2,
    "question_text": "What is the magnetic field at the center of a circular loop of radius R carrying current I?",
    "options": {
      "A": "mu0 I / (2 R)",
      "B": "mu0 I / (4 pi R)",
      "C": "mu0 I / (2 pi R)",
      "D": "mu0 I R / 2"
    },
    "correct_option": "A",
    "explanation": "By Biot-Savart Law, B at center of a circular current loop of radius R is B = mu0 I / (2 R). For an infinitely long straight wire it is mu0 I / (2 pi R).",
    "distractor_analysis": {
      "A": "Correct. By Biot-Savart Law, B at center of a circular current loop of radius R is B = mu",
      "B": "Incorrect. Common distractor based on: Confusing circular coil center field (mu0 I / 2R) with long ",
      "C": "Incorrect. Common distractor based on: Confusing circular coil center field (mu0 I / 2R) with long ",
      "D": "Incorrect. Common distractor based on: Confusing circular coil center field (mu0 I / 2R) with long "
    },
    "misconception": "Confusing circular coil center field (mu0 I / 2R) with long wire field (mu0 I / 2 pi R).",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Electrodynamics",
    "difficulty_tier": 2,
    "question_text": "What is the power dissipated in an AC circuit with voltage V_rms = 220 V, current I_rms = 2 A, and power factor cos phi = 0.5?",
    "options": {
      "A": "220 W",
      "B": "440 W",
      "C": "110 W",
      "D": "880 W"
    },
    "correct_option": "A",
    "explanation": "Average power P = V_rms * I_rms * cos phi = 220 * 2 * 0.5 = 220 W.",
    "distractor_analysis": {
      "A": "Correct. Average power P = V_rms * I_rms * cos phi = 220 * 2 * 0.5 = 220 W.",
      "B": "Incorrect. Common distractor based on: Neglecting power factor (calculating apparent power 440 W).",
      "C": "Incorrect. Common distractor based on: Neglecting power factor (calculating apparent power 440 W).",
      "D": "Incorrect. Common distractor based on: Neglecting power factor (calculating apparent power 440 W)."
    },
    "misconception": "Neglecting power factor (calculating apparent power 440 W).",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Electrodynamics",
    "difficulty_tier": 2,
    "question_text": "Kirchhoff's first law (Junction rule) is based on the conservation of:",
    "options": {
      "A": "Electric charge",
      "B": "Energy",
      "C": "Linear momentum",
      "D": "Angular momentum"
    },
    "correct_option": "A",
    "explanation": "Kirchhoff's Junction rule (sum of currents entering a junction equals sum of currents leaving) is a direct consequence of conservation of electric charge. The Loop rule is based on conservation of energy.",
    "distractor_analysis": {
      "A": "Correct. Kirchhoff's Junction rule (sum of currents entering a junction equals sum of cur",
      "B": "Incorrect. Common distractor based on: Confusing Junction rule (charge) with Loop rule (energy).",
      "C": "Incorrect. Common distractor based on: Confusing Junction rule (charge) with Loop rule (energy).",
      "D": "Incorrect. Common distractor based on: Confusing Junction rule (charge) with Loop rule (energy)."
    },
    "misconception": "Confusing Junction rule (charge) with Loop rule (energy).",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Electrodynamics",
    "difficulty_tier": 2,
    "question_text": "A step-up transformer has a turns ratio N_s / N_p = 10. If the input AC voltage is 20 V, what is the output voltage?",
    "options": {
      "A": "200 V",
      "B": "2 V",
      "C": "20 V",
      "D": "2000 V"
    },
    "correct_option": "A",
    "explanation": "Transformer equation: V_s / V_p = N_s / N_p = 10 -> V_s = 10 * 20 = 200 V.",
    "distractor_analysis": {
      "A": "Correct. Transformer equation: V_s / V_p = N_s / N_p = 10 -> V_s = 10 * 20 = 200 V.",
      "B": "Incorrect. Common distractor based on: Dividing by turns ratio instead of multiplying.",
      "C": "Incorrect. Common distractor based on: Dividing by turns ratio instead of multiplying.",
      "D": "Incorrect. Common distractor based on: Dividing by turns ratio instead of multiplying."
    },
    "misconception": "Dividing by turns ratio instead of multiplying.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Electrodynamics",
    "difficulty_tier": 2,
    "question_text": "What is the electrostatic potential energy stored in a capacitor of capacitance C charged to potential difference V?",
    "options": {
      "A": "(1/2) C V^2",
      "B": "C V^2",
      "C": "(1/2) C^2 V",
      "D": "2 C V^2"
    },
    "correct_option": "A",
    "explanation": "Energy stored in a capacitor is U = (1/2) C V^2 = (1/2) Q V = Q^2 / (2C).",
    "distractor_analysis": {
      "A": "Correct. Energy stored in a capacitor is U = (1/2) C V^2 = (1/2) Q V = Q^2 / (2C).",
      "B": "Incorrect. Common distractor based on: Omitting the 1/2 factor.",
      "C": "Incorrect. Common distractor based on: Omitting the 1/2 factor.",
      "D": "Incorrect. Common distractor based on: Omitting the 1/2 factor."
    },
    "misconception": "Omitting the 1/2 factor.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Thermodynamics",
    "difficulty_tier": 2,
    "question_text": "What is the efficiency of a Carnot engine operating between a hot reservoir at 500 K and a cold reservoir at 300 K?",
    "options": {
      "A": "40%",
      "B": "60%",
      "C": "20%",
      "D": "66.7%"
    },
    "correct_option": "A",
    "explanation": "Carnot efficiency eta = 1 - T_C / T_H = 1 - 300/500 = 1 - 0.60 = 0.40 = 40%.",
    "distractor_analysis": {
      "A": "Correct. Carnot efficiency eta = 1 - T_C / T_H = 1 - 300/500 = 1 - 0.60 = 0.40 = 40%.",
      "B": "Incorrect. Common distractor based on: Reporting T_C / T_H = 60% as the efficiency.",
      "C": "Incorrect. Common distractor based on: Reporting T_C / T_H = 60% as the efficiency.",
      "D": "Incorrect. Common distractor based on: Reporting T_C / T_H = 60% as the efficiency."
    },
    "misconception": "Reporting T_C / T_H = 60% as the efficiency.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Thermodynamics",
    "difficulty_tier": 2,
    "question_text": "For a monoatomic ideal gas, what is the ratio of specific heats gamma = Cp / Cv?",
    "options": {
      "A": "5/3",
      "B": "7/5",
      "C": "4/3",
      "D": "3/2"
    },
    "correct_option": "A",
    "explanation": "For a monoatomic gas, degrees of freedom f = 3. Cv = (3/2) R, Cp = Cv + R = (5/2) R. gamma = Cp / Cv = (5/2) / (3/2) = 5/3 approx 1.67.",
    "distractor_analysis": {
      "A": "Correct. For a monoatomic gas, degrees of freedom f = 3. Cv = (3/2) R, Cp = Cv + R = (5/2",
      "B": "Incorrect. Common distractor based on: Using diatomic gas ratio (7/5 = 1.4).",
      "C": "Incorrect. Common distractor based on: Using diatomic gas ratio (7/5 = 1.4).",
      "D": "Incorrect. Common distractor based on: Using diatomic gas ratio (7/5 = 1.4)."
    },
    "misconception": "Using diatomic gas ratio (7/5 = 1.4).",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Thermodynamics",
    "difficulty_tier": 2,
    "question_text": "In an adiabatic expansion of an ideal gas, the relationship between pressure P and volume V is:",
    "options": {
      "A": "P * V^gamma = constant",
      "B": "P * V = constant",
      "C": "P / V^gamma = constant",
      "D": "P^gamma * V = constant"
    },
    "correct_option": "A",
    "explanation": "In a reversible adiabatic process for an ideal gas, P * V^gamma = constant, where gamma = Cp/Cv.",
    "distractor_analysis": {
      "A": "Correct. In a reversible adiabatic process for an ideal gas, P * V^gamma = constant, wher",
      "B": "Incorrect. Common distractor based on: Confusing adiabatic (P V^gamma = const) with isothermal (P V",
      "C": "Incorrect. Common distractor based on: Confusing adiabatic (P V^gamma = const) with isothermal (P V",
      "D": "Incorrect. Common distractor based on: Confusing adiabatic (P V^gamma = const) with isothermal (P V"
    },
    "misconception": "Confusing adiabatic (P V^gamma = const) with isothermal (P V = const).",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Thermodynamics",
    "difficulty_tier": 2,
    "question_text": "What is the average translational kinetic energy of a molecule of an ideal gas at absolute temperature T? (k_B = Boltzmann constant)",
    "options": {
      "A": "(3/2) k_B T",
      "B": "(1/2) k_B T",
      "C": "3 k_B T",
      "D": "k_B T"
    },
    "correct_option": "A",
    "explanation": "By the equipartition theorem, each translational degree of freedom contributes (1/2) k_B T. Since there are 3 translational degrees of freedom in 3D space, average translational KE = (3/2) k_B T per molecule.",
    "distractor_analysis": {
      "A": "Correct. By the equipartition theorem, each translational degree of freedom contributes (",
      "B": "Incorrect. Common distractor based on: Reporting energy per degree of freedom ((1/2) k_B T) instead",
      "C": "Incorrect. Common distractor based on: Reporting energy per degree of freedom ((1/2) k_B T) instead",
      "D": "Incorrect. Common distractor based on: Reporting energy per degree of freedom ((1/2) k_B T) instead"
    },
    "misconception": "Reporting energy per degree of freedom ((1/2) k_B T) instead of total translational KE.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Thermodynamics",
    "difficulty_tier": 2,
    "question_text": "A blackbody at 300 K emits radiation of wavelength lambda_max. If its temperature is doubled to 600 K, what is the new peak wavelength?",
    "options": {
      "A": "lambda_max / 2",
      "B": "2 * lambda_max",
      "C": "lambda_max / 4",
      "D": "4 * lambda_max"
    },
    "correct_option": "A",
    "explanation": "By Wien's displacement law, lambda_max * T = constant -> lambda_max' = lambda_max * (T / T') = lambda_max * (300 / 600) = lambda_max / 2.",
    "distractor_analysis": {
      "A": "Correct. By Wien's displacement law, lambda_max * T = constant -> lambda_max' = lambda_ma",
      "B": "Incorrect. Common distractor based on: Assuming peak wavelength increases with temperature.",
      "C": "Incorrect. Common distractor based on: Assuming peak wavelength increases with temperature.",
      "D": "Incorrect. Common distractor based on: Assuming peak wavelength increases with temperature."
    },
    "misconception": "Assuming peak wavelength increases with temperature.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Thermodynamics",
    "difficulty_tier": 2,
    "question_text": "According to Stefan-Boltzmann law, the total radiant energy emitted per second per unit area by a blackbody at absolute temperature T is proportional to:",
    "options": {
      "A": "T^4",
      "B": "T^2",
      "C": "T",
      "D": "T^3"
    },
    "correct_option": "A",
    "explanation": "Stefan-Boltzmann law states E = sigma * T^4, where sigma is the Stefan-Boltzmann constant. Radiant power scales with the fourth power of absolute temperature.",
    "distractor_analysis": {
      "A": "Correct. Stefan-Boltzmann law states E = sigma * T^4, where sigma is the Stefan-Boltzmann",
      "B": "Incorrect. Common distractor based on: Confusing with T^2 or linear T.",
      "C": "Incorrect. Common distractor based on: Confusing with T^2 or linear T.",
      "D": "Incorrect. Common distractor based on: Confusing with T^2 or linear T."
    },
    "misconception": "Confusing with T^2 or linear T.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Thermodynamics",
    "difficulty_tier": 2,
    "question_text": "In an isochoric process, what is the work done by a gas?",
    "options": {
      "A": "0",
      "B": "P * Delta V",
      "C": "n R T ln(V2/V1)",
      "D": "-Delta U"
    },
    "correct_option": "A",
    "explanation": "An isochoric process occurs at constant volume (Delta V = 0). Since work W = int P dV, the work done is strictly zero.",
    "distractor_analysis": {
      "A": "Correct. An isochoric process occurs at constant volume (Delta V = 0). Since work W = int",
      "B": "Incorrect. Common distractor based on: Confusing isochoric (W = 0) with isobaric (W = P Delta V).",
      "C": "Incorrect. Common distractor based on: Confusing isochoric (W = 0) with isobaric (W = P Delta V).",
      "D": "Incorrect. Common distractor based on: Confusing isochoric (W = 0) with isobaric (W = P Delta V)."
    },
    "misconception": "Confusing isochoric (W = 0) with isobaric (W = P Delta V).",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Thermodynamics",
    "difficulty_tier": 2,
    "question_text": "What is the root-mean-square speed of an ideal gas of molar mass M at absolute temperature T?",
    "options": {
      "A": "sqrt(3 R T / M)",
      "B": "sqrt(2 R T / M)",
      "C": "sqrt(8 R T / (pi M))",
      "D": "3 R T / M"
    },
    "correct_option": "A",
    "explanation": "v_rms = sqrt(3 R T / M). Most probable speed is sqrt(2 R T / M), and average speed is sqrt(8 R T / (pi M)).",
    "distractor_analysis": {
      "A": "Correct. v_rms = sqrt(3 R T / M). Most probable speed is sqrt(2 R T / M), and average spe",
      "B": "Incorrect. Common distractor based on: Confusing rms speed with most probable or average speed.",
      "C": "Incorrect. Common distractor based on: Confusing rms speed with most probable or average speed.",
      "D": "Incorrect. Common distractor based on: Confusing rms speed with most probable or average speed."
    },
    "misconception": "Confusing rms speed with most probable or average speed.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Thermodynamics",
    "difficulty_tier": 2,
    "question_text": "According to the First Law of Thermodynamics, in an isothermal expansion of an ideal gas:",
    "options": {
      "A": "Heat absorbed equals work done (Q = W)",
      "B": "Internal energy increases",
      "C": "Work done is zero",
      "D": "Heat absorbed is zero"
    },
    "correct_option": "A",
    "explanation": "In an isothermal process for an ideal gas, Delta T = 0, so Delta U = 0. By First Law Delta U = Q - W (or Q + W), Q = W: all heat absorbed is converted into external work.",
    "distractor_analysis": {
      "A": "Correct. In an isothermal process for an ideal gas, Delta T = 0, so Delta U = 0. By First",
      "B": "Incorrect. Common distractor based on: Assuming heat absorbed must be zero (confusing with adiabati",
      "C": "Incorrect. Common distractor based on: Assuming heat absorbed must be zero (confusing with adiabati",
      "D": "Incorrect. Common distractor based on: Assuming heat absorbed must be zero (confusing with adiabati"
    },
    "misconception": "Assuming heat absorbed must be zero (confusing with adiabatic).",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Thermodynamics",
    "difficulty_tier": 2,
    "question_text": "Two bodies cool from 80 deg C to 70 deg C. By Newton's law of cooling, the rate of cooling is proportional to:",
    "options": {
      "A": "Temperature difference between body and surroundings",
      "B": "Square of temperature of the body",
      "C": "Surrounding temperature only",
      "D": "Fourth power of temperature difference"
    },
    "correct_option": "A",
    "explanation": "Newton's law of cooling states -dT/dt = k (T - T_s): the rate of loss of heat is directly proportional to the temperature difference between the body and its surroundings for small excess temperatures.",
    "distractor_analysis": {
      "A": "Correct. Newton's law of cooling states -dT/dt = k (T - T_s): the rate of loss of heat is",
      "B": "Incorrect. Common distractor based on: Confusing with Stefan-Boltzmann fourth-power radiation law.",
      "C": "Incorrect. Common distractor based on: Confusing with Stefan-Boltzmann fourth-power radiation law.",
      "D": "Incorrect. Common distractor based on: Confusing with Stefan-Boltzmann fourth-power radiation law."
    },
    "misconception": "Confusing with Stefan-Boltzmann fourth-power radiation law.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Thermodynamics",
    "difficulty_tier": 2,
    "question_text": "What is the change in entropy when heat Q is reversibly added to a system at constant absolute temperature T?",
    "options": {
      "A": "Q / T",
      "B": "Q * T",
      "C": "T / Q",
      "D": "0"
    },
    "correct_option": "A",
    "explanation": "By definition of thermodynamic entropy, Delta S = Q_rev / T.",
    "distractor_analysis": {
      "A": "Correct. By definition of thermodynamic entropy, Delta S = Q_rev / T.",
      "B": "Incorrect. Common distractor based on: Multiplying heat by temperature instead of dividing.",
      "C": "Incorrect. Common distractor based on: Multiplying heat by temperature instead of dividing.",
      "D": "Incorrect. Common distractor based on: Multiplying heat by temperature instead of dividing."
    },
    "misconception": "Multiplying heat by temperature instead of dividing.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Modern Physics",
    "difficulty_tier": 2,
    "question_text": "In the photoelectric effect, stopping potential depends on:",
    "options": {
      "A": "Frequency of incident light and work function of emitter",
      "B": "Intensity of incident light only",
      "C": "Distance between source and emitter",
      "D": "Surface area of the emitter"
    },
    "correct_option": "A",
    "explanation": "Einstein's photoelectric equation: e * V_0 = h * nu - phi. Stopping potential V_0 depends strictly on the incident light frequency nu and metal work function phi, independent of light intensity.",
    "distractor_analysis": {
      "A": "Correct. Einstein's photoelectric equation: e * V_0 = h * nu - phi. Stopping potential V_",
      "B": "Incorrect. Common distractor based on: Thinking higher intensity increases stopping potential (inte",
      "C": "Incorrect. Common distractor based on: Thinking higher intensity increases stopping potential (inte",
      "D": "Incorrect. Common distractor based on: Thinking higher intensity increases stopping potential (inte"
    },
    "misconception": "Thinking higher intensity increases stopping potential (intensity only increases saturation current).",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Modern Physics",
    "difficulty_tier": 2,
    "question_text": "What is the radius of the nth Bohr orbit of a hydrogen atom?",
    "options": {
      "A": "proportional to n^2",
      "B": "proportional to n",
      "C": "proportional to 1/n",
      "D": "proportional to n^3"
    },
    "correct_option": "A",
    "explanation": "In Bohr's theory, r_n = (n^2 h^2 eps0) / (pi m e^2) = a0 * n^2. Orbit radius is directly proportional to n^2.",
    "distractor_analysis": {
      "A": "Correct. In Bohr's theory, r_n = (n^2 h^2 eps0) / (pi m e^2) = a0 * n^2. Orbit radius is ",
      "B": "Incorrect. Common distractor based on: Assuming radius scales linearly with n.",
      "C": "Incorrect. Common distractor based on: Assuming radius scales linearly with n.",
      "D": "Incorrect. Common distractor based on: Assuming radius scales linearly with n."
    },
    "misconception": "Assuming radius scales linearly with n.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Modern Physics",
    "difficulty_tier": 2,
    "question_text": "What is the energy of an electron in the ground state (n = 1) of a singly ionized helium ion (He^+, Z = 2)?",
    "options": {
      "A": "-54.4 eV",
      "B": "-13.6 eV",
      "C": "-27.2 eV",
      "D": "-122.4 eV"
    },
    "correct_option": "A",
    "explanation": "Bohr energy E_n = -13.6 * (Z^2 / n^2) eV. For He^+: Z = 2, n = 1. E_1 = -13.6 * (2^2 / 1) = -13.6 * 4 = -54.4 eV.",
    "distractor_analysis": {
      "A": "Correct. Bohr energy E_n = -13.6 * (Z^2 / n^2) eV. For He^+: Z = 2, n = 1. E_1 = -13.6 * ",
      "B": "Incorrect. Common distractor based on: Using Z = 1 (-13.6 eV) or multiplying by Z instead of Z^2.",
      "C": "Incorrect. Common distractor based on: Using Z = 1 (-13.6 eV) or multiplying by Z instead of Z^2.",
      "D": "Incorrect. Common distractor based on: Using Z = 1 (-13.6 eV) or multiplying by Z instead of Z^2."
    },
    "misconception": "Using Z = 1 (-13.6 eV) or multiplying by Z instead of Z^2.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Modern Physics",
    "difficulty_tier": 2,
    "question_text": "If the half-life of a radioactive sample is 10 hours, how much of an initial 100 g sample remains undecayed after 30 hours?",
    "options": {
      "A": "12.5 g",
      "B": "25 g",
      "C": "6.25 g",
      "D": "50 g"
    },
    "correct_option": "A",
    "explanation": "Number of elapsed half-lives n = 30 / 10 = 3. Remaining mass N = N0 * (1/2)^n = 100 * (1/8) = 12.5 g.",
    "distractor_analysis": {
      "A": "Correct. Number of elapsed half-lives n = 30 / 10 = 3. Remaining mass N = N0 * (1/2)^n = ",
      "B": "Incorrect. Common distractor based on: Dividing mass by 3 instead of halving three times.",
      "C": "Incorrect. Common distractor based on: Dividing mass by 3 instead of halving three times.",
      "D": "Incorrect. Common distractor based on: Dividing mass by 3 instead of halving three times."
    },
    "misconception": "Dividing mass by 3 instead of halving three times.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Modern Physics",
    "difficulty_tier": 2,
    "question_text": "The nuclear radius R of an atom with mass number A is proportional to:",
    "options": {
      "A": "A^(1/3)",
      "B": "A",
      "C": "A^2",
      "D": "A^(1/2)"
    },
    "correct_option": "A",
    "explanation": "Empirical nuclear sizing: R = R0 * A^(1/3), where R0 approx 1.2 x 10^-15 m (1.2 fm). Nuclear volume is proportional to A, so radius scales as A^(1/3).",
    "distractor_analysis": {
      "A": "Correct. Empirical nuclear sizing: R = R0 * A^(1/3), where R0 approx 1.2 x 10^-15 m (1.2 ",
      "B": "Incorrect. Common distractor based on: Assuming nuclear radius scales linearly with mass number A.",
      "C": "Incorrect. Common distractor based on: Assuming nuclear radius scales linearly with mass number A.",
      "D": "Incorrect. Common distractor based on: Assuming nuclear radius scales linearly with mass number A."
    },
    "misconception": "Assuming nuclear radius scales linearly with mass number A.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Modern Physics",
    "difficulty_tier": 2,
    "question_text": "In a p-n junction diode under forward bias, the width of the depletion region:",
    "options": {
      "A": "Decreases",
      "B": "Increases",
      "C": "Remains unchanged",
      "D": "Fluctuates randomly"
    },
    "correct_option": "A",
    "explanation": "Forward bias applies positive potential to p-side and negative to n-side, opposing the built-in junction potential. Majority carriers are pushed toward the junction, reducing the width of the depletion layer and barrier height.",
    "distractor_analysis": {
      "A": "Correct. Forward bias applies positive potential to p-side and negative to n-side, opposi",
      "B": "Incorrect. Common distractor based on: Assuming forward bias widens the depletion barrier.",
      "C": "Incorrect. Common distractor based on: Assuming forward bias widens the depletion barrier.",
      "D": "Incorrect. Common distractor based on: Assuming forward bias widens the depletion barrier."
    },
    "misconception": "Assuming forward bias widens the depletion barrier.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Modern Physics",
    "difficulty_tier": 2,
    "question_text": "A Zener diode is primarily operated in:",
    "options": {
      "A": "Reverse breakdown region as a voltage regulator",
      "B": "Forward bias as a rectifier",
      "C": "Unbiased condition as a detector",
      "D": "Photovoltaic mode"
    },
    "correct_option": "A",
    "explanation": "A Zener diode is heavily doped and designed to operate continuously in the reverse breakdown region, where voltage across it remains nearly constant over a wide range of reverse currents, making it an ideal voltage stabilizer.",
    "distractor_analysis": {
      "A": "Correct. A Zener diode is heavily doped and designed to operate continuously in the rever",
      "B": "Incorrect. Common distractor based on: Thinking Zener diodes operate in forward bias.",
      "C": "Incorrect. Common distractor based on: Thinking Zener diodes operate in forward bias.",
      "D": "Incorrect. Common distractor based on: Thinking Zener diodes operate in forward bias."
    },
    "misconception": "Thinking Zener diodes operate in forward bias.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Modern Physics",
    "difficulty_tier": 2,
    "question_text": "Which logic gate produces output 1 only when both of its inputs are 1?",
    "options": {
      "A": "AND gate",
      "B": "OR gate",
      "C": "NAND gate",
      "D": "NOR gate"
    },
    "correct_option": "A",
    "explanation": "The Boolean expression for an AND gate is Y = A . B. It outputs 1 only when both A = 1 and B = 1.",
    "distractor_analysis": {
      "A": "Correct. The Boolean expression for an AND gate is Y = A . B. It outputs 1 only when both",
      "B": "Incorrect. Common distractor based on: Confusing AND gate with OR gate.",
      "C": "Incorrect. Common distractor based on: Confusing AND gate with OR gate.",
      "D": "Incorrect. Common distractor based on: Confusing AND gate with OR gate."
    },
    "misconception": "Confusing AND gate with OR gate.",
    "time_estimate_seconds": 30
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Modern Physics",
    "difficulty_tier": 2,
    "question_text": "What is the de Broglie wavelength of an alpha particle of mass m and charge 2e accelerated through potential difference V?",
    "options": {
      "A": "h / sqrt(4 m e V)",
      "B": "h / sqrt(2 m e V)",
      "C": "h / sqrt(8 m e V)",
      "D": "h / (m e V)"
    },
    "correct_option": "A",
    "explanation": "Kinetic energy KE = q * V = (2e) * V = 2 e V. Momentum p = sqrt(2 m KE) = sqrt(2 m (2 e V)) = sqrt(4 m e V). lambda = h / p = h / sqrt(4 m e V).",
    "distractor_analysis": {
      "A": "Correct. Kinetic energy KE = q * V = (2e) * V = 2 e V. Momentum p = sqrt(2 m KE) = sqrt(2",
      "B": "Incorrect. Common distractor based on: Forgetting the alpha particle carries a charge of +2e.",
      "C": "Incorrect. Common distractor based on: Forgetting the alpha particle carries a charge of +2e.",
      "D": "Incorrect. Common distractor based on: Forgetting the alpha particle carries a charge of +2e."
    },
    "misconception": "Forgetting the alpha particle carries a charge of +2e.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Modern Physics",
    "difficulty_tier": 2,
    "question_text": "Which spectral series of hydrogen atom emission falls in the visible region?",
    "options": {
      "A": "Balmer series",
      "B": "Lyman series",
      "C": "Paschen series",
      "D": "Brackett series"
    },
    "correct_option": "A",
    "explanation": "Balmer series (transitions ending at n = 2) falls in the visible spectrum. Lyman series (ending at n = 1) is in ultraviolet; Paschen, Brackett, and Pfund series are in infrared.",
    "distractor_analysis": {
      "A": "Correct. Balmer series (transitions ending at n = 2) falls in the visible spectrum. Lyman",
      "B": "Incorrect. Common distractor based on: Confusing Balmer (visible) with Lyman (ultraviolet).",
      "C": "Incorrect. Common distractor based on: Confusing Balmer (visible) with Lyman (ultraviolet).",
      "D": "Incorrect. Common distractor based on: Confusing Balmer (visible) with Lyman (ultraviolet)."
    },
    "misconception": "Confusing Balmer (visible) with Lyman (ultraviolet).",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Modern Physics",
    "difficulty_tier": 2,
    "question_text": "When an electron transitions from n = 3 to n = 2 in a hydrogen atom, the emitted photon corresponds to the:",
    "options": {
      "A": "H-alpha line of Balmer series",
      "B": "H-beta line of Balmer series",
      "C": "Lyman series limit",
      "D": "Paschen series alpha line"
    },
    "correct_option": "A",
    "explanation": "In the Balmer series (n_final = 2), the transition from the adjacent higher state n = 3 to n = 2 is the first line, designated as the H-alpha line (wavelength 656.3 nm, red).",
    "distractor_analysis": {
      "A": "Correct. In the Balmer series (n_final = 2), the transition from the adjacent higher stat",
      "B": "Incorrect. Common distractor based on: Confusing H-alpha (3 -> 2) with H-beta (4 -> 2).",
      "C": "Incorrect. Common distractor based on: Confusing H-alpha (3 -> 2) with H-beta (4 -> 2).",
      "D": "Incorrect. Common distractor based on: Confusing H-alpha (3 -> 2) with H-beta (4 -> 2)."
    },
    "misconception": "Confusing H-alpha (3 -> 2) with H-beta (4 -> 2).",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Optics",
    "difficulty_tier": 2,
    "question_text": "What is the critical angle for total internal reflection at a medium-air interface if the medium has refractive index n = 2?",
    "options": {
      "A": "30 deg",
      "B": "45 deg",
      "C": "60 deg",
      "D": "90 deg"
    },
    "correct_option": "A",
    "explanation": "sin(theta_c) = 1 / n = 1 / 2. theta_c = arcsin(1/2) = 30 deg.",
    "distractor_analysis": {
      "A": "Correct. sin(theta_c) = 1 / n = 1 / 2. theta_c = arcsin(1/2) = 30 deg.",
      "B": "Incorrect. Common distractor based on: Confusing arcsin(1/2) = 30 deg with 45 deg or 60 deg.",
      "C": "Incorrect. Common distractor based on: Confusing arcsin(1/2) = 30 deg with 45 deg or 60 deg.",
      "D": "Incorrect. Common distractor based on: Confusing arcsin(1/2) = 30 deg with 45 deg or 60 deg."
    },
    "misconception": "Confusing arcsin(1/2) = 30 deg with 45 deg or 60 deg.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Optics",
    "difficulty_tier": 2,
    "question_text": "A convex lens of focal length 20 cm and a concave lens of focal length 30 cm are placed in contact. What is the power of the combination?",
    "options": {
      "A": "+1.67 D",
      "B": "-1.67 D",
      "C": "+5.0 D",
      "D": "-5.0 D"
    },
    "correct_option": "A",
    "explanation": "P1 = 100/20 = +5 D. P2 = 100/(-30) = -3.33 D. Total power P = P1 + P2 = +5 - 3.33 = +1.67 D.",
    "distractor_analysis": {
      "A": "Correct. P1 = 100/20 = +5 D. P2 = 100/(-30) = -3.33 D. Total power P = P1 + P2 = +5 - 3.3",
      "B": "Incorrect. Common distractor based on: Adding focal lengths directly or getting sign wrong for conc",
      "C": "Incorrect. Common distractor based on: Adding focal lengths directly or getting sign wrong for conc",
      "D": "Incorrect. Common distractor based on: Adding focal lengths directly or getting sign wrong for conc"
    },
    "misconception": "Adding focal lengths directly or getting sign wrong for concave lens.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Optics",
    "difficulty_tier": 2,
    "question_text": "In Young's double-slit experiment, if the entire apparatus is immersed in water (refractive index 4/3), what happens to fringe width?",
    "options": {
      "A": "Decreases by a factor of 4/3",
      "B": "Increases by a factor of 4/3",
      "C": "Remains unchanged",
      "D": "Becomes zero"
    },
    "correct_option": "A",
    "explanation": "Fringe width beta = lambda * D / d. In water, wavelength decreases to lambda' = lambda / n = lambda / (4/3) = 0.75 lambda. Fringe width decreases proportionally by a factor of 4/3.",
    "distractor_analysis": {
      "A": "Correct. Fringe width beta = lambda * D / d. In water, wavelength decreases to lambda' = ",
      "B": "Incorrect. Common distractor based on: Assuming fringe width is independent of medium refractive in",
      "C": "Incorrect. Common distractor based on: Assuming fringe width is independent of medium refractive in",
      "D": "Incorrect. Common distractor based on: Assuming fringe width is independent of medium refractive in"
    },
    "misconception": "Assuming fringe width is independent of medium refractive index.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Optics",
    "difficulty_tier": 2,
    "question_text": "What is the magnifying power of a simple microscope (magnifying glass) of focal length f when the final image forms at least distance of distinct vision D?",
    "options": {
      "A": "1 + D / f",
      "B": "D / f",
      "C": "1 - D / f",
      "D": "f / D"
    },
    "correct_option": "A",
    "explanation": "When the image is formed at the near point (D = 25 cm), angular magnification M = 1 + D / f. When formed at infinity (relaxed eye), M = D / f.",
    "distractor_analysis": {
      "A": "Correct. When the image is formed at the near point (D = 25 cm), angular magnification M ",
      "B": "Incorrect. Common distractor based on: Reporting normal adjustment M = D/f instead of near point 1 ",
      "C": "Incorrect. Common distractor based on: Reporting normal adjustment M = D/f instead of near point 1 ",
      "D": "Incorrect. Common distractor based on: Reporting normal adjustment M = D/f instead of near point 1 "
    },
    "misconception": "Reporting normal adjustment M = D/f instead of near point 1 + D/f.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Optics",
    "difficulty_tier": 2,
    "question_text": "A ray of light strikes a transparent glass plate at Brewster's angle. The reflected ray is:",
    "options": {
      "A": "Completely plane-polarized with electric vector perpendicular to plane of incidence",
      "B": "Unpolarized",
      "C": "Circularly polarized",
      "D": "Partially polarized"
    },
    "correct_option": "A",
    "explanation": "At Brewster's angle of incidence (tan i_p = n), the reflected light is 100% linearly (plane) polarized with its electric field vector vibrating strictly perpendicular to the plane of incidence (parallel to surface).",
    "distractor_analysis": {
      "A": "Correct. At Brewster's angle of incidence (tan i_p = n), the reflected light is 100% line",
      "B": "Incorrect. Common distractor based on: Thinking reflected ray remains unpolarized.",
      "C": "Incorrect. Common distractor based on: Thinking reflected ray remains unpolarized.",
      "D": "Incorrect. Common distractor based on: Thinking reflected ray remains unpolarized."
    },
    "misconception": "Thinking reflected ray remains unpolarized.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Optics",
    "difficulty_tier": 2,
    "question_text": "A real object is placed 20 cm in front of a concave mirror of focal length 15 cm. What is the nature and location of the image?",
    "options": {
      "A": "Real, inverted, at 60 cm in front of mirror",
      "B": "Virtual, erect, at 60 cm behind mirror",
      "C": "Real, inverted, at 30 cm in front of mirror",
      "D": "Virtual, erect, at 30 cm behind mirror"
    },
    "correct_option": "A",
    "explanation": "Mirror formula: 1/f = 1/v + 1/u. Concave mirror: f = -15 cm, u = -20 cm. 1/v = 1/(-15) - 1/(-20) = -1/15 + 1/20 = (-4 + 3)/60 = -1/60 -> v = -60 cm. Negative sign indicates real, inverted image in front of mirror.",
    "distractor_analysis": {
      "A": "Correct. Mirror formula: 1/f = 1/v + 1/u. Concave mirror: f = -15 cm, u = -20 cm. 1/v = 1",
      "B": "Incorrect. Common distractor based on: Sign convention errors in mirror equation.",
      "C": "Incorrect. Common distractor based on: Sign convention errors in mirror equation.",
      "D": "Incorrect. Common distractor based on: Sign convention errors in mirror equation."
    },
    "misconception": "Sign convention errors in mirror equation.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Optics",
    "difficulty_tier": 2,
    "question_text": "Why does the sky appear blue during the daytime?",
    "options": {
      "A": "Rayleigh scattering of light, where scattering intensity is proportional to 1/lambda^4",
      "B": "Absorption of red light by ozone",
      "C": "Total internal reflection in air",
      "D": "Dispersion of sunlight by raindrops"
    },
    "correct_option": "A",
    "explanation": "Rayleigh scattering by atmospheric molecules is inversely proportional to the fourth power of wavelength (I proportional to 1/lambda^4). Shorter blue wavelengths are scattered much more strongly than longer red wavelengths.",
    "distractor_analysis": {
      "A": "Correct. Rayleigh scattering by atmospheric molecules is inversely proportional to the fo",
      "B": "Incorrect. Common distractor based on: Attributing blue sky to reflection or atmospheric absorption",
      "C": "Incorrect. Common distractor based on: Attributing blue sky to reflection or atmospheric absorption",
      "D": "Incorrect. Common distractor based on: Attributing blue sky to reflection or atmospheric absorption"
    },
    "misconception": "Attributing blue sky to reflection or atmospheric absorption.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Optics",
    "difficulty_tier": 2,
    "question_text": "An astronomical telescope in normal adjustment has an objective focal length of 100 cm and eyepiece focal length of 5 cm. What is its tube length?",
    "options": {
      "A": "105 cm",
      "B": "95 cm",
      "C": "20 cm",
      "D": "500 cm"
    },
    "correct_option": "A",
    "explanation": "In normal adjustment (final image at infinity), the tube length of an astronomical telescope equals the sum of focal lengths: L = f_o + f_e = 100 + 5 = 105 cm.",
    "distractor_analysis": {
      "A": "Correct. In normal adjustment (final image at infinity), the tube length of an astronomic",
      "B": "Incorrect. Common distractor based on: Subtracting eyepiece focal length from objective.",
      "C": "Incorrect. Common distractor based on: Subtracting eyepiece focal length from objective.",
      "D": "Incorrect. Common distractor based on: Subtracting eyepiece focal length from objective."
    },
    "misconception": "Subtracting eyepiece focal length from objective.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Optics",
    "difficulty_tier": 2,
    "question_text": "When light passes through a triangular glass prism, the angle between the incident ray and the emergent ray is called:",
    "options": {
      "A": "Angle of deviation",
      "B": "Angle of incidence",
      "C": "Angle of emergence",
      "D": "Critical angle"
    },
    "correct_option": "A",
    "explanation": "The angle between the direction of the incident ray and the emergent ray is defined as the angle of deviation (delta).",
    "distractor_analysis": {
      "A": "Correct. The angle between the direction of the incident ray and the emergent ray is defi",
      "B": "Incorrect. Common distractor based on: Confusing angle of deviation with angle of emergence.",
      "C": "Incorrect. Common distractor based on: Confusing angle of deviation with angle of emergence.",
      "D": "Incorrect. Common distractor based on: Confusing angle of deviation with angle of emergence."
    },
    "misconception": "Confusing angle of deviation with angle of emergence.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Optics",
    "difficulty_tier": 2,
    "question_text": "An equiconvex lens has focal length f. If it is cut into two equal halves along its principal axis, what is the focal length of each half?",
    "options": {
      "A": "f",
      "B": "2 f",
      "C": "f / 2",
      "D": "4 f"
    },
    "correct_option": "A",
    "explanation": "Cutting a lens along its principal axis retains the radius of curvature of both spherical surfaces (R1 and R2 remain unchanged). By lens maker's formula 1/f = (n - 1)(1/R1 - 1/R2), each half retains the exact same focal length f.",
    "distractor_analysis": {
      "A": "Correct. Cutting a lens along its principal axis retains the radius of curvature of both ",
      "B": "Incorrect. Common distractor based on: Assuming cutting along principal axis doubles the focal leng",
      "C": "Incorrect. Common distractor based on: Assuming cutting along principal axis doubles the focal leng",
      "D": "Incorrect. Common distractor based on: Assuming cutting along principal axis doubles the focal leng"
    },
    "misconception": "Assuming cutting along principal axis doubles the focal length (which only happens when cut perpendicular to principal axis).",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "NEET",
    "subject": "Physics",
    "skill_domain": "Optics",
    "difficulty_tier": 2,
    "question_text": "What is the focal length of a plane glass mirror?",
    "options": {
      "A": "Infinity",
      "B": "Zero",
      "C": "1 meter",
      "D": "-1 meter"
    },
    "correct_option": "A",
    "explanation": "A plane mirror has an infinitely large radius of curvature (R = infinity). Since f = R / 2, its focal length is infinity (power P = 0).",
    "distractor_analysis": {
      "A": "Correct. A plane mirror has an infinitely large radius of curvature (R = infinity). Since",
      "B": "Incorrect. Common distractor based on: Confusing infinite focal length with zero power.",
      "C": "Incorrect. Common distractor based on: Confusing infinite focal length with zero power.",
      "D": "Incorrect. Common distractor based on: Confusing infinite focal length with zero power."
    },
    "misconception": "Confusing infinite focal length with zero power.",
    "time_estimate_seconds": 30
  }
];
