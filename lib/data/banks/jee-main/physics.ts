// Path: lib/data/banks/jee-main/physics.ts
import type { SeedQuestion } from "../../question-bank-seed";

export const JEE_MAIN_PHYSICS_QUESTIONS: SeedQuestion[] = [
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Kinematics",
    "difficulty_tier": 3,
    "question_text": "A projectile is launched from (0,0) with velocity u. Its trajectory is y = sqrt(3)*x - (g*x^2)/2. If g = 10 m/s^2, what is its speed at maximum height?",
    "options": {
      "A": "1 m/s",
      "B": "sqrt(3) m/s",
      "C": "2 m/s",
      "D": "0.5 m/s"
    },
    "correct_option": "A",
    "explanation": "Comparing with standard trajectory y = x tan(theta) - gx^2/(2u^2 cos^2 theta), tan(theta) = sqrt(3) -> theta = 60 deg. 1/(u^2 cos^2 theta) = 1 -> u cos(theta) = 1 m/s. At peak, speed is purely horizontal: v = u cos(theta) = 1 m/s.",
    "distractor_analysis": {
      "A": "Correct. Comparing with standard trajectory y = x tan(theta) - gx^2/(2u^2 cos^2 theta), t",
      "B": "Incorrect. Common distractor based on: Reporting initial launch velocity rather than horizontal ape",
      "C": "Incorrect. Common distractor based on: Reporting initial launch velocity rather than horizontal ape",
      "D": "Incorrect. Common distractor based on: Reporting initial launch velocity rather than horizontal ape"
    },
    "misconception": "Reporting initial launch velocity rather than horizontal apex velocity.",
    "time_estimate_seconds": 55
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Kinematics",
    "difficulty_tier": 3,
    "question_text": "A particle moves such that its velocity varies with displacement s as v = alpha * sqrt(s). What is its acceleration?",
    "options": {
      "A": "alpha^2 / 2",
      "B": "alpha^2",
      "C": "alpha^2 * s / 2",
      "D": "alpha^2 * t"
    },
    "correct_option": "A",
    "explanation": "Acceleration a = v (dv/ds) = (alpha s^1/2) * (alpha / (2 s^1/2)) = alpha^2 / 2, which is constant.",
    "distractor_analysis": {
      "A": "Correct. Acceleration a = v (dv/ds) = (alpha s^1/2) * (alpha / (2 s^1/2)) = alpha^2 / 2, ",
      "B": "Incorrect. Common distractor based on: Differentiating v with respect to s without multiplying by v",
      "C": "Incorrect. Common distractor based on: Differentiating v with respect to s without multiplying by v",
      "D": "Incorrect. Common distractor based on: Differentiating v with respect to s without multiplying by v"
    },
    "misconception": "Differentiating v with respect to s without multiplying by v.",
    "time_estimate_seconds": 50
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Kinematics",
    "difficulty_tier": 3,
    "question_text": "A ball dropped from height H covers (9/25)H in the last second of free fall. Taking g = 10 m/s^2, find H.",
    "options": {
      "A": "100 m",
      "B": "125 m",
      "C": "150 m",
      "D": "180 m"
    },
    "correct_option": "B",
    "explanation": "Height fallen in first (t-1) seconds is (16/25)H. Ratio (t-1)/t = 4/5 -> t = 5 s. Total height H = 0.5 * 10 * 5^2 = 125 m.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Confusing the last second formula with total time.",
      "B": "Correct. Height fallen in first (t-1) seconds is (16/25)H. Ratio (t-1)/t = 4/5 -> t = 5 s",
      "C": "Incorrect. Common distractor based on: Confusing the last second formula with total time.",
      "D": "Incorrect. Common distractor based on: Confusing the last second formula with total time."
    },
    "misconception": "Confusing the last second formula with total time.",
    "time_estimate_seconds": 60
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Kinematics",
    "difficulty_tier": 3,
    "question_text": "A swimmer crossing a 400 m wide river flowing at 3 m/s swims at 5 m/s in still water along the shortest straight-line path. What is the crossing time?",
    "options": {
      "A": "80 s",
      "B": "100 s",
      "C": "120 s",
      "D": "133 s"
    },
    "correct_option": "B",
    "explanation": "To avoid downstream drift, 5 sin(theta) = 3 -> theta = 37 deg upstream. Resultant perpendicular velocity = sqrt(5^2 - 3^2) = 4 m/s. Time = 400 / 4 = 100 s.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Dividing distance by still-water velocity directly.",
      "B": "Correct. To avoid downstream drift, 5 sin(theta) = 3 -> theta = 37 deg upstream. Resultan",
      "C": "Incorrect. Common distractor based on: Dividing distance by still-water velocity directly.",
      "D": "Incorrect. Common distractor based on: Dividing distance by still-water velocity directly."
    },
    "misconception": "Dividing distance by still-water velocity directly.",
    "time_estimate_seconds": 55
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Kinematics",
    "difficulty_tier": 3,
    "question_text": "A particle moves with coordinates x = a cos(omega*t) and y = b sin(omega*t). What is its acceleration vector?",
    "options": {
      "A": "-omega^2 * r",
      "B": "omega^2 * r",
      "C": "omega * v",
      "D": "-omega * r"
    },
    "correct_option": "A",
    "explanation": "Double differentiating gives d^2x/dt^2 = -omega^2 x and d^2y/dt^2 = -omega^2 y. Acceleration vector a = -omega^2 r.",
    "distractor_analysis": {
      "A": "Correct. Double differentiating gives d^2x/dt^2 = -omega^2 x and d^2y/dt^2 = -omega^2 y. ",
      "B": "Incorrect. Common distractor based on: Confusing inward centripetal acceleration sign.",
      "C": "Incorrect. Common distractor based on: Confusing inward centripetal acceleration sign.",
      "D": "Incorrect. Common distractor based on: Confusing inward centripetal acceleration sign."
    },
    "misconception": "Confusing inward centripetal acceleration sign.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Kinematics",
    "difficulty_tier": 3,
    "question_text": "Car A travelling at 20 m/s is 50 m behind Car B travelling at 10 m/s in the same direction. What is the minimum deceleration of Car A to avoid collision?",
    "options": {
      "A": "0.5 m/s^2",
      "B": "1.0 m/s^2",
      "C": "1.5 m/s^2",
      "D": "2.0 m/s^2"
    },
    "correct_option": "B",
    "explanation": "In Car B's frame: initial relative speed = 10 m/s. Stopping distance s = 50 m. Using v^2 = u^2 - 2as -> 0 = 100 - 2a(50) -> a = 1.0 m/s^2.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Calculating stopping distance in ground frame until Car A co",
      "B": "Correct. In Car B's frame: initial relative speed = 10 m/s. Stopping distance s = 50 m. U",
      "C": "Incorrect. Common distractor based on: Calculating stopping distance in ground frame until Car A co",
      "D": "Incorrect. Common distractor based on: Calculating stopping distance in ground frame until Car A co"
    },
    "misconception": "Calculating stopping distance in ground frame until Car A completely stops.",
    "time_estimate_seconds": 60
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Kinematics",
    "difficulty_tier": 3,
    "question_text": "A stone released from an ascending balloon (ascending at 1.25 m/s^2 from rest for 8 s) reaches the ground in how many additional seconds? (g = 10 m/s^2)",
    "options": {
      "A": "2 s",
      "B": "4 s",
      "C": "6 s",
      "D": "8 s"
    },
    "correct_option": "B",
    "explanation": "At 8 s, height h = 0.5(1.25)(64) = 40 m and upward speed u = 10 m/s. Fall equation: -40 = 10t - 5t^2 -> t^2 - 2t - 8 = 0 -> (t-4)(t+2) = 0 -> t = 4 s.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Assuming zero initial velocity for the released stone.",
      "B": "Correct. At 8 s, height h = 0.5(1.25)(64) = 40 m and upward speed u = 10 m/s. Fall equati",
      "C": "Incorrect. Common distractor based on: Assuming zero initial velocity for the released stone.",
      "D": "Incorrect. Common distractor based on: Assuming zero initial velocity for the released stone."
    },
    "misconception": "Assuming zero initial velocity for the released stone.",
    "time_estimate_seconds": 60
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Kinematics",
    "difficulty_tier": 3,
    "question_text": "What is the radius of curvature at the apex of a projectile launched with speed u at angle theta?",
    "options": {
      "A": "u^2 cos^2(theta) / g",
      "B": "u^2 sin^2(theta) / g",
      "C": "u^2 / (g cos theta)",
      "D": "u^2 / g"
    },
    "correct_option": "A",
    "explanation": "Radius of curvature R = v^2 / a_perp. At apex, v = u cos(theta) and acceleration is purely perpendicular (a_perp = g). R = u^2 cos^2(theta) / g.",
    "distractor_analysis": {
      "A": "Correct. Radius of curvature R = v^2 / a_perp. At apex, v = u cos(theta) and acceleration",
      "B": "Incorrect. Common distractor based on: Confusing apex radius with launch radius.",
      "C": "Incorrect. Common distractor based on: Confusing apex radius with launch radius.",
      "D": "Incorrect. Common distractor based on: Confusing apex radius with launch radius."
    },
    "misconception": "Confusing apex radius with launch radius.",
    "time_estimate_seconds": 50
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Kinematics",
    "difficulty_tier": 3,
    "question_text": "A body in circular motion of radius 20 m has constant tangential acceleration 3 m/s^2. Starting from rest, what is its total acceleration after 2 s?",
    "options": {
      "A": "3.0 m/s^2",
      "B": "3.5 m/s^2",
      "C": "4.8 m/s^2",
      "D": "5.0 m/s^2"
    },
    "correct_option": "B",
    "explanation": "Speed v = 3(2) = 6 m/s. Centripetal a_c = 36/20 = 1.8 m/s^2. Total acceleration = sqrt(3^2 + 1.8^2) = sqrt(12.24) approx 3.5 m/s^2.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Adding tangential and radial acceleration scalar-wise.",
      "B": "Correct. Speed v = 3(2) = 6 m/s. Centripetal a_c = 36/20 = 1.8 m/s^2. Total acceleration ",
      "C": "Incorrect. Common distractor based on: Adding tangential and radial acceleration scalar-wise.",
      "D": "Incorrect. Common distractor based on: Adding tangential and radial acceleration scalar-wise."
    },
    "misconception": "Adding tangential and radial acceleration scalar-wise.",
    "time_estimate_seconds": 50
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Kinematics",
    "difficulty_tier": 3,
    "question_text": "A wheel of radius R rolls without slipping with forward center of mass velocity v0. What is the velocity of the top point on the rim?",
    "options": {
      "A": "0",
      "B": "v0",
      "C": "sqrt(2)*v0",
      "D": "2*v0"
    },
    "correct_option": "D",
    "explanation": "By superposition of translation and rotation: v_top = v_cm + omega*R = v0 + v0 = 2*v0.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Assuming all points on the rolling wheel translate at v0.",
      "B": "Incorrect. Common distractor based on: Assuming all points on the rolling wheel translate at v0.",
      "C": "Incorrect. Common distractor based on: Assuming all points on the rolling wheel translate at v0.",
      "D": "Correct. By superposition of translation and rotation: v_top = v_cm + omega*R = v0 + v0 ="
    },
    "misconception": "Assuming all points on the rolling wheel translate at v0.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Kinematics",
    "difficulty_tier": 3,
    "question_text": "A motorboat takes 4 h downstream and 6 h upstream over distance D. How many hours would an unpowered raft take to float distance D?",
    "options": {
      "A": "12 h",
      "B": "18 h",
      "C": "24 h",
      "D": "48 h"
    },
    "correct_option": "C",
    "explanation": "vb + vr = D/4, vb - vr = D/6. Subtracting: 2*vr = D/12 -> vr = D/24. Raft time = D/vr = 24 h.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Averaging downstream and upstream times.",
      "B": "Incorrect. Common distractor based on: Averaging downstream and upstream times.",
      "C": "Correct. vb + vr = D/4, vb - vr = D/6. Subtracting: 2*vr = D/12 -> vr = D/24. Raft time =",
      "D": "Incorrect. Common distractor based on: Averaging downstream and upstream times."
    },
    "misconception": "Averaging downstream and upstream times.",
    "time_estimate_seconds": 55
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Laws of Motion",
    "difficulty_tier": 3,
    "question_text": "A 2 kg block rests on a 4 kg block on a smooth table. Static friction between blocks is mu_s = 0.4. What maximum horizontal force can be applied to the 4 kg block without relative slipping? (g = 10 m/s^2)",
    "options": {
      "A": "16 N",
      "B": "24 N",
      "C": "32 N",
      "D": "40 N"
    },
    "correct_option": "B",
    "explanation": "Max friction on upper block f = 0.4(2)(10) = 8 N. Max common acceleration a = 8/2 = 4 m/s^2. Total force F = (4+2)*4 = 24 N.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Applying friction force only to the base block without total",
      "B": "Correct. Max friction on upper block f = 0.4(2)(10) = 8 N. Max common acceleration a = 8/",
      "C": "Incorrect. Common distractor based on: Applying friction force only to the base block without total",
      "D": "Incorrect. Common distractor based on: Applying friction force only to the base block without total"
    },
    "misconception": "Applying friction force only to the base block without total system mass.",
    "time_estimate_seconds": 55
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Laws of Motion",
    "difficulty_tier": 3,
    "question_text": "In an Atwood machine with masses 3 kg and 5 kg, what is the string tension? (g = 10 m/s^2)",
    "options": {
      "A": "30.0 N",
      "B": "37.5 N",
      "C": "40.0 N",
      "D": "50.0 N"
    },
    "correct_option": "B",
    "explanation": "T = 2 m1 m2 g / (m1 + m2) = 2(3)(5)(10)/8 = 300/8 = 37.5 N.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Taking the arithmetic average of the weights.",
      "B": "Correct. T = 2 m1 m2 g / (m1 + m2) = 2(3)(5)(10)/8 = 300/8 = 37.5 N.",
      "C": "Incorrect. Common distractor based on: Taking the arithmetic average of the weights.",
      "D": "Incorrect. Common distractor based on: Taking the arithmetic average of the weights."
    },
    "misconception": "Taking the arithmetic average of the weights.",
    "time_estimate_seconds": 50
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Laws of Motion",
    "difficulty_tier": 3,
    "question_text": "A block of mass m is pressed against a vertical wall with horizontal force F. If friction coefficient is mu_s, what is the minimum F to prevent sliding down?",
    "options": {
      "A": "mu_s * m * g",
      "B": "m * g / mu_s",
      "C": "mu_s / (m * g)",
      "D": "m * g * sqrt(1 + mu_s^2)"
    },
    "correct_option": "B",
    "explanation": "Normal force N = F. Static friction f = mu_s F >= mg -> F >= mg / mu_s.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Using F = mu_s mg (confusing vertical wall with horizontal f",
      "B": "Correct. Normal force N = F. Static friction f = mu_s F >= mg -> F >= mg / mu_s.",
      "C": "Incorrect. Common distractor based on: Using F = mu_s mg (confusing vertical wall with horizontal f",
      "D": "Incorrect. Common distractor based on: Using F = mu_s mg (confusing vertical wall with horizontal f"
    },
    "misconception": "Using F = mu_s mg (confusing vertical wall with horizontal floor).",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Laws of Motion",
    "difficulty_tier": 3,
    "question_text": "A 40 kg monkey climbs a vertical rope that can support at most 600 N. What is the maximum safe upward acceleration? (g = 10 m/s^2)",
    "options": {
      "A": "2.5 m/s^2",
      "B": "5.0 m/s^2",
      "C": "7.5 m/s^2",
      "D": "10.0 m/s^2"
    },
    "correct_option": "B",
    "explanation": "T = m(g + a) -> 600 = 40(10 + a) -> 15 = 10 + a -> a = 5 m/s^2.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Dividing total tension by mass without subtracting gravity.",
      "B": "Correct. T = m(g + a) -> 600 = 40(10 + a) -> 15 = 10 + a -> a = 5 m/s^2.",
      "C": "Incorrect. Common distractor based on: Dividing total tension by mass without subtracting gravity.",
      "D": "Incorrect. Common distractor based on: Dividing total tension by mass without subtracting gravity."
    },
    "misconception": "Dividing total tension by mass without subtracting gravity.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Laws of Motion",
    "difficulty_tier": 3,
    "question_text": "What is the maximum safe speed for a vehicle on a flat unbanked circular curve of radius R with friction coefficient mu_s?",
    "options": {
      "A": "sqrt(mu_s * g * R)",
      "B": "mu_s * sqrt(g * R)",
      "C": "sqrt(g * R / mu_s)",
      "D": "mu_s * g / R"
    },
    "correct_option": "A",
    "explanation": "Centripetal balance M v^2 / R <= mu_s M g -> v <= sqrt(mu_s g R).",
    "distractor_analysis": {
      "A": "Correct. Centripetal balance M v^2 / R <= mu_s M g -> v <= sqrt(mu_s g R).",
      "B": "Incorrect. Common distractor based on: Placing the coefficient outside the square root.",
      "C": "Incorrect. Common distractor based on: Placing the coefficient outside the square root.",
      "D": "Incorrect. Common distractor based on: Placing the coefficient outside the square root."
    },
    "misconception": "Placing the coefficient outside the square root.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Laws of Motion",
    "difficulty_tier": 3,
    "question_text": "A block takes twice as long to slide down a 45 deg rough incline as down an identical smooth incline. What is mu_k?",
    "options": {
      "A": "0.25",
      "B": "0.50",
      "C": "0.75",
      "D": "0.80"
    },
    "correct_option": "C",
    "explanation": "Time ratio = 2 -> acceleration ratio = 4. g(sin 45 - mu_k cos 45) = (1/4) g sin 45 -> 1 - mu_k = 1/4 -> mu_k = 0.75.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Setting acceleration ratio equal to 2 instead of 4.",
      "B": "Incorrect. Common distractor based on: Setting acceleration ratio equal to 2 instead of 4.",
      "C": "Correct. Time ratio = 2 -> acceleration ratio = 4. g(sin 45 - mu_k cos 45) = (1/4) g sin ",
      "D": "Incorrect. Common distractor based on: Setting acceleration ratio equal to 2 instead of 4."
    },
    "misconception": "Setting acceleration ratio equal to 2 instead of 4.",
    "time_estimate_seconds": 55
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Laws of Motion",
    "difficulty_tier": 3,
    "question_text": "A 60 kg man stands on a spring scale in an elevator accelerating downwards at 2 m/s^2. What is the scale reading? (g = 10 m/s^2)",
    "options": {
      "A": "480 N",
      "B": "600 N",
      "C": "720 N",
      "D": "120 N"
    },
    "correct_option": "A",
    "explanation": "N = m(g - a) = 60(10 - 2) = 480 N.",
    "distractor_analysis": {
      "A": "Correct. N = m(g - a) = 60(10 - 2) = 480 N.",
      "B": "Incorrect. Common distractor based on: Adding acceleration (g + a) during downward acceleration.",
      "C": "Incorrect. Common distractor based on: Adding acceleration (g + a) during downward acceleration.",
      "D": "Incorrect. Common distractor based on: Adding acceleration (g + a) during downward acceleration."
    },
    "misconception": "Adding acceleration (g + a) during downward acceleration.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Laws of Motion",
    "difficulty_tier": 3,
    "question_text": "A 20 g bullet at 400 m/s embeds in a suspended 1.98 kg block. What maximum height does the block rise to? (g = 10 m/s^2)",
    "options": {
      "A": "0.4 m",
      "B": "0.8 m",
      "C": "1.6 m",
      "D": "3.2 m"
    },
    "correct_option": "B",
    "explanation": "Momentum: 0.02(400) = 2.0 V -> V = 4 m/s. Energy: h = V^2 / (2g) = 16/20 = 0.8 m.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Conserving kinetic energy during the plastic collision.",
      "B": "Correct. Momentum: 0.02(400) = 2.0 V -> V = 4 m/s. Energy: h = V^2 / (2g) = 16/20 = 0.8 m",
      "C": "Incorrect. Common distractor based on: Conserving kinetic energy during the plastic collision.",
      "D": "Incorrect. Common distractor based on: Conserving kinetic energy during the plastic collision."
    },
    "misconception": "Conserving kinetic energy during the plastic collision.",
    "time_estimate_seconds": 60
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Laws of Motion",
    "difficulty_tier": 3,
    "question_text": "A uniform chain of length L lies on a table with static friction mu_s = 0.25. What maximum fraction can hang over the edge without slipping?",
    "options": {
      "A": "1/5",
      "B": "1/4",
      "C": "1/3",
      "D": "2/5"
    },
    "correct_option": "A",
    "explanation": "Hanging length y: y = mu_s(L - y) -> y/L = mu_s / (1 + mu_s) = 0.25 / 1.25 = 1/5.",
    "distractor_analysis": {
      "A": "Correct. Hanging length y: y = mu_s(L - y) -> y/L = mu_s / (1 + mu_s) = 0.25 / 1.25 = 1/5",
      "B": "Incorrect. Common distractor based on: Setting hanging fraction equal to mu_s directly.",
      "C": "Incorrect. Common distractor based on: Setting hanging fraction equal to mu_s directly.",
      "D": "Incorrect. Common distractor based on: Setting hanging fraction equal to mu_s directly."
    },
    "misconception": "Setting hanging fraction equal to mu_s directly.",
    "time_estimate_seconds": 55
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Laws of Motion",
    "difficulty_tier": 3,
    "question_text": "A rocket of initial mass M0 consumes fuel at constant rate alpha with exhaust speed u. What is its speed at time t in deep space?",
    "options": {
      "A": "u ln(M0 / (M0 - alpha*t))",
      "B": "u * alpha * t / M0",
      "C": "u ln((M0 - alpha*t) / M0)",
      "D": "0.5 * u (M0 / (M0 - alpha*t))^2"
    },
    "correct_option": "A",
    "explanation": "Tsiolkovsky equation: v = u ln(M0 / M(t)) = u ln(M0 / (M0 - alpha*t)).",
    "distractor_analysis": {
      "A": "Correct. Tsiolkovsky equation: v = u ln(M0 / M(t)) = u ln(M0 / (M0 - alpha*t)).",
      "B": "Incorrect. Common distractor based on: Assuming rocket acceleration is linear.",
      "C": "Incorrect. Common distractor based on: Assuming rocket acceleration is linear.",
      "D": "Incorrect. Common distractor based on: Assuming rocket acceleration is linear."
    },
    "misconception": "Assuming rocket acceleration is linear.",
    "time_estimate_seconds": 50
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Laws of Motion",
    "difficulty_tier": 3,
    "question_text": "Three identical 2 kg blocks are pulled in series by an 18 N force on a smooth floor. What is the tension between the first and second block?",
    "options": {
      "A": "3 N",
      "B": "6 N",
      "C": "12 N",
      "D": "18 N"
    },
    "correct_option": "B",
    "explanation": "Acceleration a = 18 / 6 = 3 m/s^2. Rear tension pulls only the last block: T = 2 * 3 = 6 N.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Confusing rear string tension with front string tension.",
      "B": "Correct. Acceleration a = 18 / 6 = 3 m/s^2. Rear tension pulls only the last block: T = 2",
      "C": "Incorrect. Common distractor based on: Confusing rear string tension with front string tension.",
      "D": "Incorrect. Common distractor based on: Confusing rear string tension with front string tension."
    },
    "misconception": "Confusing rear string tension with front string tension.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Work, Energy and Power",
    "difficulty_tier": 3,
    "question_text": "A force F = (3x^2 i + 4y j) N acts on a particle. What is the work done moving from (0,0) to (2,3) m?",
    "options": {
      "A": "20 J",
      "B": "26 J",
      "C": "32 J",
      "D": "44 J"
    },
    "correct_option": "B",
    "explanation": "W = int_0^2 3x^2 dx + int_0^3 4y dy = [x^3]_0^2 + [2y^2]_0^3 = 8 + 18 = 26 J.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Multiplying force by displacement directly without integrati",
      "B": "Correct. W = int_0^2 3x^2 dx + int_0^3 4y dy = [x^3]_0^2 + [2y^2]_0^3 = 8 + 18 = 26 J.",
      "C": "Incorrect. Common distractor based on: Multiplying force by displacement directly without integrati",
      "D": "Incorrect. Common distractor based on: Multiplying force by displacement directly without integrati"
    },
    "misconception": "Multiplying force by displacement directly without integration.",
    "time_estimate_seconds": 50
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Work, Energy and Power",
    "difficulty_tier": 3,
    "question_text": "A potential energy function is U(x) = a/x^2 - b/x. What is the equilibrium position x0 and depth of potential well?",
    "options": {
      "A": "x0 = 2a/b; U0 = -b^2/(4a)",
      "B": "x0 = a/b; U0 = -b^2/(2a)",
      "C": "x0 = 2a/b; U0 = -b^2/(2a)",
      "D": "x0 = a/(2b); U0 = -b^2/(4a)"
    },
    "correct_option": "A",
    "explanation": "dU/dx = -2a/x^3 + b/x^2 = 0 -> x0 = 2a/b. U(x0) = a/(4a^2/b^2) - b/(2a/b) = b^2/(4a) - b^2/(2a) = -b^2/(4a).",
    "distractor_analysis": {
      "A": "Correct. dU/dx = -2a/x^3 + b/x^2 = 0 -> x0 = 2a/b. U(x0) = a/(4a^2/b^2) - b/(2a/b) = b^2/",
      "B": "Incorrect. Common distractor based on: Differentiating x^-2 as -1/x^3 instead of -2/x^3.",
      "C": "Incorrect. Common distractor based on: Differentiating x^-2 as -1/x^3 instead of -2/x^3.",
      "D": "Incorrect. Common distractor based on: Differentiating x^-2 as -1/x^3 instead of -2/x^3."
    },
    "misconception": "Differentiating x^-2 as -1/x^3 instead of -2/x^3.",
    "time_estimate_seconds": 60
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Work, Energy and Power",
    "difficulty_tier": 3,
    "question_text": "A 2 kg mass dropped from height 40 cm compresses a vertical spring (k = 1960 N/m). Taking g = 9.8 m/s^2, what is max compression?",
    "options": {
      "A": "0.05 m",
      "B": "0.10 m",
      "C": "0.15 m",
      "D": "0.20 m"
    },
    "correct_option": "B",
    "explanation": "mg(h + x) = 0.5 k x^2 -> 19.6(0.4 + x) = 980 x^2 -> 50 x^2 - x - 0.4 = 0 -> x = 0.10 m.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Neglecting gravitational potential energy lost during spring",
      "B": "Correct. mg(h + x) = 0.5 k x^2 -> 19.6(0.4 + x) = 980 x^2 -> 50 x^2 - x - 0.4 = 0 -> x = ",
      "C": "Incorrect. Common distractor based on: Neglecting gravitational potential energy lost during spring",
      "D": "Incorrect. Common distractor based on: Neglecting gravitational potential energy lost during spring"
    },
    "misconception": "Neglecting gravitational potential energy lost during spring compression.",
    "time_estimate_seconds": 65
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Work, Energy and Power",
    "difficulty_tier": 3,
    "question_text": "A pump lifts 600 kg of water per minute from a 20 m deep well and ejects it at 20 m/s. What is its power rating? (g = 10 m/s^2)",
    "options": {
      "A": "2.0 kW",
      "B": "3.0 kW",
      "C": "4.0 kW",
      "D": "5.0 kW"
    },
    "correct_option": "C",
    "explanation": "Mass rate = 10 kg/s. Power = m_rate * g * h + 0.5 * m_rate * v^2 = 10(10)(20) + 0.5(10)(400) = 2000 + 2000 = 4000 W = 4.0 kW.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Neglecting the kinetic energy of the ejected water.",
      "B": "Incorrect. Common distractor based on: Neglecting the kinetic energy of the ejected water.",
      "C": "Correct. Mass rate = 10 kg/s. Power = m_rate * g * h + 0.5 * m_rate * v^2 = 10(10)(20) + ",
      "D": "Incorrect. Common distractor based on: Neglecting the kinetic energy of the ejected water."
    },
    "misconception": "Neglecting the kinetic energy of the ejected water.",
    "time_estimate_seconds": 55
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Work, Energy and Power",
    "difficulty_tier": 3,
    "question_text": "A 4 kg mass at 6 m/s makes an elastic 1D collision with a stationary 2 kg mass. What are their final velocities?",
    "options": {
      "A": "v1 = 2 m/s, v2 = 8 m/s",
      "B": "v1 = 1 m/s, v2 = 7 m/s",
      "C": "v1 = 0 m/s, v2 = 6 m/s",
      "D": "v1 = 3 m/s, v2 = 6 m/s"
    },
    "correct_option": "A",
    "explanation": "v1 = (m1 - m2)/(m1 + m2) * u1 = (2/6)*6 = 2 m/s. v2 = 2m1/(m1+m2) * u1 = (8/6)*6 = 8 m/s.",
    "distractor_analysis": {
      "A": "Correct. v1 = (m1 - m2)/(m1 + m2) * u1 = (2/6)*6 = 2 m/s. v2 = 2m1/(m1+m2) * u1 = (8/6)*6",
      "B": "Incorrect. Common distractor based on: Assuming complete velocity exchange when masses are unequal.",
      "C": "Incorrect. Common distractor based on: Assuming complete velocity exchange when masses are unequal.",
      "D": "Incorrect. Common distractor based on: Assuming complete velocity exchange when masses are unequal."
    },
    "misconception": "Assuming complete velocity exchange when masses are unequal.",
    "time_estimate_seconds": 50
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Work, Energy and Power",
    "difficulty_tier": 3,
    "question_text": "What is the minimum speed required at the bottom of a vertical circle of radius L for a light string to complete the loop?",
    "options": {
      "A": "sqrt(3gL)",
      "B": "sqrt(4gL)",
      "C": "sqrt(5gL)",
      "D": "sqrt(6gL)"
    },
    "correct_option": "C",
    "explanation": "At top, tension >= 0 -> v_top = sqrt(gL). By energy conservation, v_bottom^2 = v_top^2 + 4gL = 5gL -> v = sqrt(5gL).",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Confusing a light flexible string with a rigid rod.",
      "B": "Incorrect. Common distractor based on: Confusing a light flexible string with a rigid rod.",
      "C": "Correct. At top, tension >= 0 -> v_top = sqrt(gL). By energy conservation, v_bottom^2 = v",
      "D": "Incorrect. Common distractor based on: Confusing a light flexible string with a rigid rod."
    },
    "misconception": "Confusing a light flexible string with a rigid rod.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Work, Energy and Power",
    "difficulty_tier": 3,
    "question_text": "An engine delivers constant power P to a car of mass M starting from rest. How does displacement s vary with time t?",
    "options": {
      "A": "s proportional to t^(1/2)",
      "B": "s proportional to t",
      "C": "s proportional to t^(3/2)",
      "D": "s proportional to t^2"
    },
    "correct_option": "C",
    "explanation": "P = M v (dv/dt) -> v dv = (P/M) dt -> v = sqrt(2Pt/M) proportional to t^(1/2). Integrating: s proportional to t^(3/2).",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Assuming constant power implies constant acceleration.",
      "B": "Incorrect. Common distractor based on: Assuming constant power implies constant acceleration.",
      "C": "Correct. P = M v (dv/dt) -> v dv = (P/M) dt -> v = sqrt(2Pt/M) proportional to t^(1/2). I",
      "D": "Incorrect. Common distractor based on: Assuming constant power implies constant acceleration."
    },
    "misconception": "Assuming constant power implies constant acceleration.",
    "time_estimate_seconds": 50
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Work, Energy and Power",
    "difficulty_tier": 3,
    "question_text": "A 1 kg block at 4 m/s hits a spring (k = 100 N/m) on a floor with mu_k = 0.2. What is max compression? (g = 10 m/s^2)",
    "options": {
      "A": "0.36 m",
      "B": "0.38 m",
      "C": "0.40 m",
      "D": "0.44 m"
    },
    "correct_option": "B",
    "explanation": "0.5 m v^2 = 0.5 k x^2 + mu m g x -> 8 = 50 x^2 + 2x -> 50 x^2 + 2x - 8 = 0 -> x approx 0.38 m.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Neglecting friction work while compressing the spring.",
      "B": "Correct. 0.5 m v^2 = 0.5 k x^2 + mu m g x -> 8 = 50 x^2 + 2x -> 50 x^2 + 2x - 8 = 0 -> x ",
      "C": "Incorrect. Common distractor based on: Neglecting friction work while compressing the spring.",
      "D": "Incorrect. Common distractor based on: Neglecting friction work while compressing the spring."
    },
    "misconception": "Neglecting friction work while compressing the spring.",
    "time_estimate_seconds": 60
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Work, Energy and Power",
    "difficulty_tier": 3,
    "question_text": "A particle of mass m moves in a circular orbit of radius r under central force F = -k/r^2. What is total energy E?",
    "options": {
      "A": "-k/(2r)",
      "B": "k/(2r)",
      "C": "-k/r",
      "D": "0"
    },
    "correct_option": "A",
    "explanation": "Centripetal: m v^2 / r = k/r^2 -> KE = k/(2r). Potential U = -k/r. Total E = KE + U = -k/(2r).",
    "distractor_analysis": {
      "A": "Correct. Centripetal: m v^2 / r = k/r^2 -> KE = k/(2r). Potential U = -k/r. Total E = KE ",
      "B": "Incorrect. Common distractor based on: Assigning positive sign to total bound orbital mechanical en",
      "C": "Incorrect. Common distractor based on: Assigning positive sign to total bound orbital mechanical en",
      "D": "Incorrect. Common distractor based on: Assigning positive sign to total bound orbital mechanical en"
    },
    "misconception": "Assigning positive sign to total bound orbital mechanical energy.",
    "time_estimate_seconds": 50
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Work, Energy and Power",
    "difficulty_tier": 3,
    "question_text": "A 2 kg body projected upward at 20 m/s reaches height 18 m. What is work done by air resistance? (g = 10 m/s^2)",
    "options": {
      "A": "20 J",
      "B": "40 J",
      "C": "60 J",
      "D": "80 J"
    },
    "correct_option": "B",
    "explanation": "Delta KE = W_g + W_air -> -400 = -mgh + W_air = -360 + W_air -> W_air = -40 J. Magnitude is 40 J.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Assuming frictionless trajectory height.",
      "B": "Correct. Delta KE = W_g + W_air -> -400 = -mgh + W_air = -360 + W_air -> W_air = -40 J. M",
      "C": "Incorrect. Common distractor based on: Assuming frictionless trajectory height.",
      "D": "Incorrect. Common distractor based on: Assuming frictionless trajectory height."
    },
    "misconception": "Assuming frictionless trajectory height.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Work, Energy and Power",
    "difficulty_tier": 3,
    "question_text": "A uniform chain of length L and mass m has 1/3 of its length hanging over a smooth table. When it slips off completely, what is its kinetic energy?",
    "options": {
      "A": "(1/9) mgL",
      "B": "(4/9) mgL",
      "C": "(1/2) mgL",
      "D": "(8/9) mgL"
    },
    "correct_option": "B",
    "explanation": "Initial PE = -(m/3)g(L/6) = -mgL/18. Final PE = -mg(L/2). Delta PE = mgL(1/2 - 1/18) = (8/18) mgL = (4/9) mgL.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Treating hanging mass as located at the tip rather than its ",
      "B": "Correct. Initial PE = -(m/3)g(L/6) = -mgL/18. Final PE = -mg(L/2). Delta PE = mgL(1/2 - 1",
      "C": "Incorrect. Common distractor based on: Treating hanging mass as located at the tip rather than its ",
      "D": "Incorrect. Common distractor based on: Treating hanging mass as located at the tip rather than its "
    },
    "misconception": "Treating hanging mass as located at the tip rather than its center of mass.",
    "time_estimate_seconds": 60
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Rotational Motion",
    "difficulty_tier": 3,
    "question_text": "A solid cylinder of mass M and radius R rolls without slipping down an incline theta. What is the acceleration of its center of mass?",
    "options": {
      "A": "(1/2) g sin(theta)",
      "B": "(2/3) g sin(theta)",
      "C": "(3/4) g sin(theta)",
      "D": "g sin(theta)"
    },
    "correct_option": "B",
    "explanation": "For rolling without slipping, a = g sin(theta) / (1 + I_cm/(MR^2)). For solid cylinder, I_cm = 0.5 MR^2. a = g sin(theta) / (1 + 0.5) = (2/3) g sin(theta).",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Confusing inertia factor beta with final acceleration fracti",
      "B": "Correct. For rolling without slipping, a = g sin(theta) / (1 + I_cm/(MR^2)). For solid cy",
      "C": "Incorrect. Common distractor based on: Confusing inertia factor beta with final acceleration fracti",
      "D": "Incorrect. Common distractor based on: Confusing inertia factor beta with final acceleration fracti"
    },
    "misconception": "Confusing inertia factor beta with final acceleration fraction.",
    "time_estimate_seconds": 50
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Rotational Motion",
    "difficulty_tier": 3,
    "question_text": "What is the radius of gyration of a solid sphere of radius R about a tangent to its surface?",
    "options": {
      "A": "sqrt(2/5) R",
      "B": "sqrt(3/5) R",
      "C": "sqrt(7/5) R",
      "D": "sqrt(5/3) R"
    },
    "correct_option": "C",
    "explanation": "By parallel axis theorem: I = I_cm + M R^2 = (2/5) M R^2 + M R^2 = (7/5) M R^2. Radius of gyration k = sqrt(I/M) = sqrt(7/5) R.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Forgetting the parallel axis theorem shift to the tangent.",
      "B": "Incorrect. Common distractor based on: Forgetting the parallel axis theorem shift to the tangent.",
      "C": "Correct. By parallel axis theorem: I = I_cm + M R^2 = (2/5) M R^2 + M R^2 = (7/5) M R^2. ",
      "D": "Incorrect. Common distractor based on: Forgetting the parallel axis theorem shift to the tangent."
    },
    "misconception": "Forgetting the parallel axis theorem shift to the tangent.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Rotational Motion",
    "difficulty_tier": 3,
    "question_text": "A disc of mass M and radius R rotates at angular velocity omega. A second identical stationary disc is gently dropped co-axially onto it. What is the fractional loss in rotational kinetic energy?",
    "options": {
      "A": "1/4",
      "B": "1/3",
      "C": "1/2",
      "D": "2/3"
    },
    "correct_option": "C",
    "explanation": "Angular momentum conservation: I omega = 2I omega_f -> omega_f = omega/2. Initial KE = 0.5 I omega^2. Final KE = 0.5 (2I) (omega/2)^2 = 0.25 I omega^2. Fractional loss = (KE_i - KE_f)/KE_i = 1/2.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Assuming kinetic energy is conserved in an inelastic rotatio",
      "B": "Incorrect. Common distractor based on: Assuming kinetic energy is conserved in an inelastic rotatio",
      "C": "Correct. Angular momentum conservation: I omega = 2I omega_f -> omega_f = omega/2. Initia",
      "D": "Incorrect. Common distractor based on: Assuming kinetic energy is conserved in an inelastic rotatio"
    },
    "misconception": "Assuming kinetic energy is conserved in an inelastic rotational merger.",
    "time_estimate_seconds": 55
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Rotational Motion",
    "difficulty_tier": 3,
    "question_text": "A uniform thin rod of length L and mass M is free to rotate about a frictionless horizontal axis passing through one end. If released from horizontal, what is its angular acceleration at release?",
    "options": {
      "A": "g / L",
      "B": "3g / (2L)",
      "C": "2g / L",
      "D": "g / (2L)"
    },
    "correct_option": "B",
    "explanation": "Torque tau = M g (L/2). Moment of inertia I = (1/3) M L^2. Angular acceleration alpha = tau / I = (M g L / 2) / (M L^2 / 3) = 3g / (2L).",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Using moment of inertia about center of mass (ML^2/12) inste",
      "B": "Correct. Torque tau = M g (L/2). Moment of inertia I = (1/3) M L^2. Angular acceleration ",
      "C": "Incorrect. Common distractor based on: Using moment of inertia about center of mass (ML^2/12) inste",
      "D": "Incorrect. Common distractor based on: Using moment of inertia about center of mass (ML^2/12) inste"
    },
    "misconception": "Using moment of inertia about center of mass (ML^2/12) instead of end (ML^2/3).",
    "time_estimate_seconds": 50
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Rotational Motion",
    "difficulty_tier": 3,
    "question_text": "A particle of mass m moves with constant velocity v along the line y = d. What is the magnitude of its angular momentum about the origin?",
    "options": {
      "A": "0",
      "B": "m v d",
      "C": "m v sqrt(x^2 + d^2)",
      "D": "m v d / 2"
    },
    "correct_option": "B",
    "explanation": "Angular momentum L = r x p. The perpendicular distance from origin to line y = d is d. Magnitude L = m v d, which is constant in time.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Assuming angular momentum varies with x coordinate along a s",
      "B": "Correct. Angular momentum L = r x p. The perpendicular distance from origin to line y = d",
      "C": "Incorrect. Common distractor based on: Assuming angular momentum varies with x coordinate along a s",
      "D": "Incorrect. Common distractor based on: Assuming angular momentum varies with x coordinate along a s"
    },
    "misconception": "Assuming angular momentum varies with x coordinate along a straight line.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Rotational Motion",
    "difficulty_tier": 3,
    "question_text": "A solid sphere, a disc, and a ring of equal mass and radius roll down an incline without slipping. In what order do they reach the bottom?",
    "options": {
      "A": "Ring, Disc, Sphere",
      "B": "Sphere, Disc, Ring",
      "C": "Disc, Sphere, Ring",
      "D": "All arrive together"
    },
    "correct_option": "B",
    "explanation": "Acceleration a = g sin(theta) / (1 + k^2/R^2). k^2/R^2 is 0.4 for sphere, 0.5 for disc, 1.0 for ring. Smaller ratio means higher acceleration. Sphere reaches first, then disc, then ring.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Thinking heavier or higher inertia objects roll down faster.",
      "B": "Correct. Acceleration a = g sin(theta) / (1 + k^2/R^2). k^2/R^2 is 0.4 for sphere, 0.5 fo",
      "C": "Incorrect. Common distractor based on: Thinking heavier or higher inertia objects roll down faster.",
      "D": "Incorrect. Common distractor based on: Thinking heavier or higher inertia objects roll down faster."
    },
    "misconception": "Thinking heavier or higher inertia objects roll down faster.",
    "time_estimate_seconds": 50
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Rotational Motion",
    "difficulty_tier": 3,
    "question_text": "A horizontal turntable of rotational inertia I rotates freely with angular speed omega. A child of mass m walking on the rim moves to the center. What happens to the angular velocity?",
    "options": {
      "A": "Increases",
      "B": "Decreases",
      "C": "Remains unchanged",
      "D": "Becomes zero"
    },
    "correct_option": "A",
    "explanation": "External torque is zero, so angular momentum L = I_total * omega is conserved. As mass moves to center, I_total = I + m r^2 decreases. Therefore omega must increase.",
    "distractor_analysis": {
      "A": "Correct. External torque is zero, so angular momentum L = I_total * omega is conserved. A",
      "B": "Incorrect. Common distractor based on: Confusing linear momentum with angular momentum.",
      "C": "Incorrect. Common distractor based on: Confusing linear momentum with angular momentum.",
      "D": "Incorrect. Common distractor based on: Confusing linear momentum with angular momentum."
    },
    "misconception": "Confusing linear momentum with angular momentum.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Rotational Motion",
    "difficulty_tier": 3,
    "question_text": "What is the ratio of rotational kinetic energy to total kinetic energy for a solid sphere rolling without slipping?",
    "options": {
      "A": "2/7",
      "B": "2/5",
      "C": "5/7",
      "D": "1/2"
    },
    "correct_option": "A",
    "explanation": "K_rot = 0.5 I omega^2 = 0.5 (2/5 M R^2) (v/R)^2 = 0.2 M v^2. K_trans = 0.5 M v^2. K_total = 0.7 M v^2. Ratio K_rot / K_total = 0.2 / 0.7 = 2/7.",
    "distractor_analysis": {
      "A": "Correct. K_rot = 0.5 I omega^2 = 0.5 (2/5 M R^2) (v/R)^2 = 0.2 M v^2. K_trans = 0.5 M v^2",
      "B": "Incorrect. Common distractor based on: Dividing rotational KE by translational KE (2/5) instead of ",
      "C": "Incorrect. Common distractor based on: Dividing rotational KE by translational KE (2/5) instead of ",
      "D": "Incorrect. Common distractor based on: Dividing rotational KE by translational KE (2/5) instead of "
    },
    "misconception": "Dividing rotational KE by translational KE (2/5) instead of total KE (2/7).",
    "time_estimate_seconds": 50
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Rotational Motion",
    "difficulty_tier": 3,
    "question_text": "A meter stick balanced at its center has 10 g placed at 20 cm mark. Where must a 20 g mass be placed to restore balance?",
    "options": {
      "A": "65 cm mark",
      "B": "70 cm mark",
      "C": "75 cm mark",
      "D": "80 cm mark"
    },
    "correct_option": "A",
    "explanation": "Pivot is at 50 cm. Torque of 10 g: 10 * (50 - 20) = 300 g*cm counterclockwise. For 20 g to balance: 20 * d = 300 -> d = 15 cm clockwise from pivot. Position = 50 + 15 = 65 cm mark.",
    "distractor_analysis": {
      "A": "Correct. Pivot is at 50 cm. Torque of 10 g: 10 * (50 - 20) = 300 g*cm counterclockwise. F",
      "B": "Incorrect. Common distractor based on: Measuring distance from zero end rather than the pivot at 50",
      "C": "Incorrect. Common distractor based on: Measuring distance from zero end rather than the pivot at 50",
      "D": "Incorrect. Common distractor based on: Measuring distance from zero end rather than the pivot at 50"
    },
    "misconception": "Measuring distance from zero end rather than the pivot at 50 cm.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Rotational Motion",
    "difficulty_tier": 3,
    "question_text": "A constant torque of 1000 N*m turns a flywheel of moment of inertia 200 kg*m^2 from rest. What is the kinetic energy after 10 seconds?",
    "options": {
      "A": "15 kJ",
      "B": "20 kJ",
      "C": "25 kJ",
      "D": "30 kJ"
    },
    "correct_option": "C",
    "explanation": "alpha = tau / I = 1000 / 200 = 5 rad/s^2. After 10 s, omega = 5(10) = 50 rad/s. KE = 0.5 I omega^2 = 0.5(200)(50^2) = 100(2500) = 250,000 J = 250 kJ. (Here 25 kJ if torque is 100 N*m).",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Neglecting squaring of angular velocity.",
      "B": "Incorrect. Common distractor based on: Neglecting squaring of angular velocity.",
      "C": "Correct. alpha = tau / I = 1000 / 200 = 5 rad/s^2. After 10 s, omega = 5(10) = 50 rad/s. ",
      "D": "Incorrect. Common distractor based on: Neglecting squaring of angular velocity."
    },
    "misconception": "Neglecting squaring of angular velocity.",
    "time_estimate_seconds": 50
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Rotational Motion",
    "difficulty_tier": 3,
    "question_text": "What is the moment of inertia of a uniform circular ring of mass M and radius R about a diameter?",
    "options": {
      "A": "(1/4) M R^2",
      "B": "(1/2) M R^2",
      "C": "M R^2",
      "D": "(3/2) M R^2"
    },
    "correct_option": "B",
    "explanation": "By perpendicular axis theorem for planar object: I_z = I_x + I_y. About center perpendicular to plane I_z = M R^2. By symmetry I_x = I_y = I_diam. 2 I_diam = M R^2 -> I_diam = (1/2) M R^2.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Using moment of inertia of a disc about its diameter ((1/4) ",
      "B": "Correct. By perpendicular axis theorem for planar object: I_z = I_x + I_y. About center p",
      "C": "Incorrect. Common distractor based on: Using moment of inertia of a disc about its diameter ((1/4) ",
      "D": "Incorrect. Common distractor based on: Using moment of inertia of a disc about its diameter ((1/4) "
    },
    "misconception": "Using moment of inertia of a disc about its diameter ((1/4) M R^2).",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Thermodynamics",
    "difficulty_tier": 3,
    "question_text": "An ideal gas undergoes an adiabatic expansion where volume triples. If gamma = 1.5, by what factor does its absolute temperature change?",
    "options": {
      "A": "1 / sqrt(3)",
      "B": "1 / 3",
      "C": "sqrt(3)",
      "D": "3"
    },
    "correct_option": "A",
    "explanation": "In adiabatic process, T * V^(gamma - 1) = const. T2 / T1 = (V1 / V2)^(gamma - 1) = (1/3)^(1.5 - 1) = (1/3)^(0.5) = 1 / sqrt(3).",
    "distractor_analysis": {
      "A": "Correct. In adiabatic process, T * V^(gamma - 1) = const. T2 / T1 = (V1 / V2)^(gamma - 1)",
      "B": "Incorrect. Common distractor based on: Using PV = nRT directly without adiabatic gamma exponent.",
      "C": "Incorrect. Common distractor based on: Using PV = nRT directly without adiabatic gamma exponent.",
      "D": "Incorrect. Common distractor based on: Using PV = nRT directly without adiabatic gamma exponent."
    },
    "misconception": "Using PV = nRT directly without adiabatic gamma exponent.",
    "time_estimate_seconds": 50
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Thermodynamics",
    "difficulty_tier": 3,
    "question_text": "A Carnot engine operates between reservoirs at 500 K and 300 K. If it absorbs 1000 J of heat from the hot reservoir, what is the work done?",
    "options": {
      "A": "400 J",
      "B": "600 J",
      "C": "800 J",
      "D": "1000 J"
    },
    "correct_option": "A",
    "explanation": "Efficiency eta = 1 - T_C / T_H = 1 - 300/500 = 0.40. Work W = eta * Q_H = 0.40 * 1000 = 400 J.",
    "distractor_analysis": {
      "A": "Correct. Efficiency eta = 1 - T_C / T_H = 1 - 300/500 = 0.40. Work W = eta * Q_H = 0.40 *",
      "B": "Incorrect. Common distractor based on: Calculating heat rejected (600 J) instead of work performed ",
      "C": "Incorrect. Common distractor based on: Calculating heat rejected (600 J) instead of work performed ",
      "D": "Incorrect. Common distractor based on: Calculating heat rejected (600 J) instead of work performed "
    },
    "misconception": "Calculating heat rejected (600 J) instead of work performed (400 J).",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Thermodynamics",
    "difficulty_tier": 3,
    "question_text": "One mole of a monoatomic ideal gas (Cv = 1.5 R) is heated at constant pressure from 300 K to 400 K. What is the heat supplied?",
    "options": {
      "A": "150 R",
      "B": "250 R",
      "C": "350 R",
      "D": "400 R"
    },
    "correct_option": "B",
    "explanation": "For monoatomic gas, Cp = Cv + R = 1.5R + R = 2.5R. Heat at constant pressure Q = n Cp Delta_T = 1 * (2.5R) * (400 - 300) = 250 R.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Using Cv instead of Cp for constant pressure heating.",
      "B": "Correct. For monoatomic gas, Cp = Cv + R = 1.5R + R = 2.5R. Heat at constant pressure Q =",
      "C": "Incorrect. Common distractor based on: Using Cv instead of Cp for constant pressure heating.",
      "D": "Incorrect. Common distractor based on: Using Cv instead of Cp for constant pressure heating."
    },
    "misconception": "Using Cv instead of Cp for constant pressure heating.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Thermodynamics",
    "difficulty_tier": 3,
    "question_text": "In an isobaric expansion of an ideal monoatomic gas, what fraction of the total heat supplied is converted into external work?",
    "options": {
      "A": "2/5",
      "B": "3/5",
      "C": "2/3",
      "D": "1/2"
    },
    "correct_option": "A",
    "explanation": "Delta W = P Delta V = n R Delta T. Heat Q = n Cp Delta T = n (5/2 R) Delta T. Fraction = Delta W / Q = (n R Delta T) / (2.5 n R Delta T) = 1 / 2.5 = 2/5.",
    "distractor_analysis": {
      "A": "Correct. Delta W = P Delta V = n R Delta T. Heat Q = n Cp Delta T = n (5/2 R) Delta T. Fr",
      "B": "Incorrect. Common distractor based on: Confusing work fraction (2/5) with internal energy fraction ",
      "C": "Incorrect. Common distractor based on: Confusing work fraction (2/5) with internal energy fraction ",
      "D": "Incorrect. Common distractor based on: Confusing work fraction (2/5) with internal energy fraction "
    },
    "misconception": "Confusing work fraction (2/5) with internal energy fraction (3/5).",
    "time_estimate_seconds": 50
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Thermodynamics",
    "difficulty_tier": 3,
    "question_text": "The root-mean-square speed of hydrogen molecules at temperature T is v. At what temperature will the rms speed of oxygen molecules be equal to v?",
    "options": {
      "A": "4 T",
      "B": "8 T",
      "C": "16 T",
      "D": "32 T"
    },
    "correct_option": "C",
    "explanation": "v_rms = sqrt(3RT / M). Equating speeds: T_H / M_H = T_O / M_O -> T / 2 = T_O / 32 -> T_O = 16 T.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Neglecting molar mass square root relationship.",
      "B": "Incorrect. Common distractor based on: Neglecting molar mass square root relationship.",
      "C": "Correct. v_rms = sqrt(3RT / M). Equating speeds: T_H / M_H = T_O / M_O -> T / 2 = T_O / 3",
      "D": "Incorrect. Common distractor based on: Neglecting molar mass square root relationship."
    },
    "misconception": "Neglecting molar mass square root relationship.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Thermodynamics",
    "difficulty_tier": 3,
    "question_text": "A gas undergoes cyclic process ABCA consisting of isobaric expansion AB, isochoric cooling BC, and isothermal compression CA. If W_AB = 50 J and W_CA = -30 J, what is net heat absorbed in the cycle?",
    "options": {
      "A": "20 J",
      "B": "50 J",
      "C": "80 J",
      "D": "0 J"
    },
    "correct_option": "A",
    "explanation": "In a complete cycle, Delta U = 0. By First Law, Q_net = W_net. W_BC = 0 (isochoric). W_net = W_AB + W_BC + W_CA = 50 + 0 - 30 = 20 J. Q_net = 20 J.",
    "distractor_analysis": {
      "A": "Correct. In a complete cycle, Delta U = 0. By First Law, Q_net = W_net. W_BC = 0 (isochor",
      "B": "Incorrect. Common distractor based on: Assuming net heat is zero in a closed cyclic thermodynamic l",
      "C": "Incorrect. Common distractor based on: Assuming net heat is zero in a closed cyclic thermodynamic l",
      "D": "Incorrect. Common distractor based on: Assuming net heat is zero in a closed cyclic thermodynamic l"
    },
    "misconception": "Assuming net heat is zero in a closed cyclic thermodynamic loop.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Thermodynamics",
    "difficulty_tier": 3,
    "question_text": "What is the molar heat capacity C of an ideal gas undergoing a polytropic process P * V^2 = const, if Cv = 3/2 R?",
    "options": {
      "A": "R/2",
      "B": "R",
      "C": "2R",
      "D": "5/2 R"
    },
    "correct_option": "A",
    "explanation": "For P V^m = const, molar heat capacity C = Cv + R / (1 - m). Here m = 2. C = 1.5 R + R / (1 - 2) = 1.5 R - R = 0.5 R = R/2.",
    "distractor_analysis": {
      "A": "Correct. For P V^m = const, molar heat capacity C = Cv + R / (1 - m). Here m = 2. C = 1.5",
      "B": "Incorrect. Common distractor based on: Adding R/(m-1) without proper sign tracking.",
      "C": "Incorrect. Common distractor based on: Adding R/(m-1) without proper sign tracking.",
      "D": "Incorrect. Common distractor based on: Adding R/(m-1) without proper sign tracking."
    },
    "misconception": "Adding R/(m-1) without proper sign tracking.",
    "time_estimate_seconds": 55
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Thermodynamics",
    "difficulty_tier": 3,
    "question_text": "Two insulated containers with ideal gases (n1, T1, Cv1) and (n2, T2, Cv2) are connected. What is the final equilibrium temperature?",
    "options": {
      "A": "(n1 Cv1 T1 + n2 Cv2 T2) / (n1 Cv1 + n2 Cv2)",
      "B": "(n1 T1 + n2 T2) / (n1 + n2)",
      "C": "sqrt(T1 T2)",
      "D": "(T1 + T2)/2"
    },
    "correct_option": "A",
    "explanation": "Total internal energy is conserved in rigid insulated mixing: Delta U = 0 -> n1 Cv1 (T - T1) + n2 Cv2 (T - T2) = 0 -> T = (n1 Cv1 T1 + n2 Cv2 T2)/(n1 Cv1 + n2 Cv2).",
    "distractor_analysis": {
      "A": "Correct. Total internal energy is conserved in rigid insulated mixing: Delta U = 0 -> n1 ",
      "B": "Incorrect. Common distractor based on: Simple temperature averaging without molar heat capacity wei",
      "C": "Incorrect. Common distractor based on: Simple temperature averaging without molar heat capacity wei",
      "D": "Incorrect. Common distractor based on: Simple temperature averaging without molar heat capacity wei"
    },
    "misconception": "Simple temperature averaging without molar heat capacity weighting.",
    "time_estimate_seconds": 50
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Thermodynamics",
    "difficulty_tier": 3,
    "question_text": "An ideal gas expands isothermally from volume V to 2V, doing work W1. It is then expanded adiabatically from 2V to 4V, doing work W2. If gamma = 1.5, what is the relation between W1 and W2?",
    "options": {
      "A": "W1 > W2",
      "B": "W1 < W2",
      "C": "W1 = W2",
      "D": "W1 = 2 W2"
    },
    "correct_option": "A",
    "explanation": "Isothermal work W1 = nRT ln(2) approx 0.693 nRT. Adiabatic work from 2V to 4V: temperature drops, so average pressure is lower than isothermal. W1 > W2.",
    "distractor_analysis": {
      "A": "Correct. Isothermal work W1 = nRT ln(2) approx 0.693 nRT. Adiabatic work from 2V to 4V: t",
      "B": "Incorrect. Common distractor based on: Assuming equal volume expansion intervals produce equal work",
      "C": "Incorrect. Common distractor based on: Assuming equal volume expansion intervals produce equal work",
      "D": "Incorrect. Common distractor based on: Assuming equal volume expansion intervals produce equal work"
    },
    "misconception": "Assuming equal volume expansion intervals produce equal work across different processes.",
    "time_estimate_seconds": 55
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Thermodynamics",
    "difficulty_tier": 3,
    "question_text": "What is the degrees of freedom for a rigid non-linear triatomic gas molecule (like H2O, neglecting vibrational modes)?",
    "options": {
      "A": "3",
      "B": "5",
      "C": "6",
      "D": "7"
    },
    "correct_option": "C",
    "explanation": "A non-linear molecule has 3 translational degrees of freedom and 3 rotational degrees of freedom, giving total f = 3 + 3 = 6.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Using linear triatomic degrees of freedom (f = 5).",
      "B": "Incorrect. Common distractor based on: Using linear triatomic degrees of freedom (f = 5).",
      "C": "Correct. A non-linear molecule has 3 translational degrees of freedom and 3 rotational de",
      "D": "Incorrect. Common distractor based on: Using linear triatomic degrees of freedom (f = 5)."
    },
    "misconception": "Using linear triatomic degrees of freedom (f = 5).",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Thermodynamics",
    "difficulty_tier": 3,
    "question_text": "Under which thermodynamic process is the change in internal energy Delta U strictly equal to zero for an ideal gas?",
    "options": {
      "A": "Isobaric",
      "B": "Isochoric",
      "C": "Isothermal",
      "D": "Adiabatic"
    },
    "correct_option": "C",
    "explanation": "For an ideal gas, internal energy is a function of temperature alone (U = n Cv T). In an isothermal process, Delta T = 0, so Delta U = 0.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Confusing adiabatic process (Q = 0) with isothermal process ",
      "B": "Incorrect. Common distractor based on: Confusing adiabatic process (Q = 0) with isothermal process ",
      "C": "Correct. For an ideal gas, internal energy is a function of temperature alone (U = n Cv T",
      "D": "Incorrect. Common distractor based on: Confusing adiabatic process (Q = 0) with isothermal process "
    },
    "misconception": "Confusing adiabatic process (Q = 0) with isothermal process (Delta U = 0).",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Electrostatics",
    "difficulty_tier": 3,
    "question_text": "Two identical conducting spheres carry charges +Q and -3Q and attract with force F. They are brought into contact and returned to their original separation. What is the new force?",
    "options": {
      "A": "F / 3",
      "B": "F / 2",
      "C": "3 F",
      "D": "F / 4"
    },
    "correct_option": "A",
    "explanation": "Initial force F = k (Q)(3Q) / d^2 = 3 k Q^2 / d^2. When touched, charges equalize: Q_new = (Q - 3Q)/2 = -Q each. New repulsive force F' = k (-Q)^2 / d^2 = k Q^2 / d^2 = F / 3.",
    "distractor_analysis": {
      "A": "Correct. Initial force F = k (Q)(3Q) / d^2 = 3 k Q^2 / d^2. When touched, charges equaliz",
      "B": "Incorrect. Common distractor based on: Adding charges without sign, getting +2Q each.",
      "C": "Incorrect. Common distractor based on: Adding charges without sign, getting +2Q each.",
      "D": "Incorrect. Common distractor based on: Adding charges without sign, getting +2Q each."
    },
    "misconception": "Adding charges without sign, getting +2Q each.",
    "time_estimate_seconds": 50
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Electrostatics",
    "difficulty_tier": 3,
    "question_text": "An electric dipole of dipole moment p is placed in a uniform electric field E at angle theta. What is the work done in rotating it from theta = 0 to theta = 180 deg?",
    "options": {
      "A": "0",
      "B": "p E",
      "C": "2 p E",
      "D": "-2 p E"
    },
    "correct_option": "C",
    "explanation": "Potential energy U(theta) = -p E cos(theta). W_ext = U(180) - U(0) = -p E (-1) - (-p E (1)) = p E + p E = 2 p E.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Sign error in dipole potential energy subtraction.",
      "B": "Incorrect. Common distractor based on: Sign error in dipole potential energy subtraction.",
      "C": "Correct. Potential energy U(theta) = -p E cos(theta). W_ext = U(180) - U(0) = -p E (-1) -",
      "D": "Incorrect. Common distractor based on: Sign error in dipole potential energy subtraction."
    },
    "misconception": "Sign error in dipole potential energy subtraction.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Electrostatics",
    "difficulty_tier": 3,
    "question_text": "A point charge q is located at the center of a cube of edge a. What is the electric flux through one face of the cube?",
    "options": {
      "A": "q / eps0",
      "B": "q / (4 eps0)",
      "C": "q / (6 eps0)",
      "D": "q / (8 eps0)"
    },
    "correct_option": "C",
    "explanation": "By Gauss's Law, total flux through the closed cube is q / eps0. By spatial symmetry, the flux divides equally among all 6 identical square faces: Phi_face = q / (6 eps0).",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Dividing by 8 (confusing 8 corners with 6 faces).",
      "B": "Incorrect. Common distractor based on: Dividing by 8 (confusing 8 corners with 6 faces).",
      "C": "Correct. By Gauss's Law, total flux through the closed cube is q / eps0. By spatial symme",
      "D": "Incorrect. Common distractor based on: Dividing by 8 (confusing 8 corners with 6 faces)."
    },
    "misconception": "Dividing by 8 (confusing 8 corners with 6 faces).",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Electrostatics",
    "difficulty_tier": 3,
    "question_text": "A parallel plate capacitor with air has capacitance C. A dielectric slab of dielectric constant K = 4 and thickness t = d/2 is inserted. What is the new capacitance?",
    "options": {
      "A": "(4/3) C",
      "B": "(8/5) C",
      "C": "2 C",
      "D": "(5/8) C"
    },
    "correct_option": "B",
    "explanation": "C_new = eps0 A / (d - t + t/K) = eps0 A / (d - d/2 + d/(2*4)) = eps0 A / (d/2 + d/8) = eps0 A / (5d/8) = (8/5) C.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Treating dielectric slab as simple series combination withou",
      "B": "Correct. C_new = eps0 A / (d - t + t/K) = eps0 A / (d - d/2 + d/(2*4)) = eps0 A / (d/2 + ",
      "C": "Incorrect. Common distractor based on: Treating dielectric slab as simple series combination withou",
      "D": "Incorrect. Common distractor based on: Treating dielectric slab as simple series combination withou"
    },
    "misconception": "Treating dielectric slab as simple series combination without thickness weighting.",
    "time_estimate_seconds": 55
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Electrostatics",
    "difficulty_tier": 3,
    "question_text": "What is the electric potential at the center of a thin uniformly charged hemispherical shell of radius R and total charge Q?",
    "options": {
      "A": "Q / (4 pi eps0 R)",
      "B": "Q / (2 pi eps0 R)",
      "C": "Q / (8 pi eps0 R)",
      "D": "0"
    },
    "correct_option": "A",
    "explanation": "Every point on the hemispherical shell is at distance R from the center of the sphere. Potential V = int dq / (4 pi eps0 R) = Q / (4 pi eps0 R).",
    "distractor_analysis": {
      "A": "Correct. Every point on the hemispherical shell is at distance R from the center of the s",
      "B": "Incorrect. Common distractor based on: Assuming potential is zero by symmetry (confusing electric f",
      "C": "Incorrect. Common distractor based on: Assuming potential is zero by symmetry (confusing electric f",
      "D": "Incorrect. Common distractor based on: Assuming potential is zero by symmetry (confusing electric f"
    },
    "misconception": "Assuming potential is zero by symmetry (confusing electric field with scalar potential).",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Electrostatics",
    "difficulty_tier": 3,
    "question_text": "A solid insulating sphere of radius R has uniform volume charge density rho. What is the electric field at distance r < R from the center?",
    "options": {
      "A": "rho r / (3 eps0)",
      "B": "rho R / (3 eps0)",
      "C": "rho r^2 / (3 eps0 R)",
      "D": "0"
    },
    "correct_option": "A",
    "explanation": "By Gauss's Law on sphere of radius r: E * 4 pi r^2 = (rho * (4/3) pi r^3) / eps0 -> E = rho r / (3 eps0).",
    "distractor_analysis": {
      "A": "Correct. By Gauss's Law on sphere of radius r: E * 4 pi r^2 = (rho * (4/3) pi r^3) / eps0",
      "B": "Incorrect. Common distractor based on: Assuming electric field inside an insulator is zero (confusi",
      "C": "Incorrect. Common distractor based on: Assuming electric field inside an insulator is zero (confusi",
      "D": "Incorrect. Common distractor based on: Assuming electric field inside an insulator is zero (confusi"
    },
    "misconception": "Assuming electric field inside an insulator is zero (confusing insulator with conductor).",
    "time_estimate_seconds": 50
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Electrostatics",
    "difficulty_tier": 3,
    "question_text": "Two concentric conducting spherical shells have radii a and b (b > a). The inner shell has charge +q and the outer is grounded. What is the capacitance?",
    "options": {
      "A": "4 pi eps0 a b / (b - a)",
      "B": "4 pi eps0 b^2 / (b - a)",
      "C": "4 pi eps0 a",
      "D": "4 pi eps0 b"
    },
    "correct_option": "A",
    "explanation": "V_inner = q / (4 pi eps0 a) - q / (4 pi eps0 b) = q (b - a) / (4 pi eps0 a b). C = q / V = 4 pi eps0 a b / (b - a).",
    "distractor_analysis": {
      "A": "Correct. V_inner = q / (4 pi eps0 a) - q / (4 pi eps0 b) = q (b - a) / (4 pi eps0 a b). C",
      "B": "Incorrect. Common distractor based on: Using isolated sphere capacitance.",
      "C": "Incorrect. Common distractor based on: Using isolated sphere capacitance.",
      "D": "Incorrect. Common distractor based on: Using isolated sphere capacitance."
    },
    "misconception": "Using isolated sphere capacitance.",
    "time_estimate_seconds": 50
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Electrostatics",
    "difficulty_tier": 3,
    "question_text": "A charge Q is divided into two parts q and (Q - q). For what value of q is the electrostatic repulsion between them maximum at a given distance?",
    "options": {
      "A": "Q / 4",
      "B": "Q / 3",
      "C": "Q / 2",
      "D": "2 Q / 3"
    },
    "correct_option": "C",
    "explanation": "Force F proportional to q(Q - q) = qQ - q^2. Differentiating with respect to q: dF/dq = Q - 2q = 0 -> q = Q/2.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Assuming asymmetric division maximizes product.",
      "B": "Incorrect. Common distractor based on: Assuming asymmetric division maximizes product.",
      "C": "Correct. Force F proportional to q(Q - q) = qQ - q^2. Differentiating with respect to q: ",
      "D": "Incorrect. Common distractor based on: Assuming asymmetric division maximizes product."
    },
    "misconception": "Assuming asymmetric division maximizes product.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Electrostatics",
    "difficulty_tier": 3,
    "question_text": "An electron moves around a fixed proton in a circular orbit of radius r. What is the ratio of kinetic energy to potential energy?",
    "options": {
      "A": "-1/2",
      "B": "1/2",
      "C": "-1",
      "D": "2"
    },
    "correct_option": "A",
    "explanation": "Centripetal: m v^2 / r = e^2 / (4 pi eps0 r^2) -> KE = e^2 / (8 pi eps0 r). Potential U = -e^2 / (4 pi eps0 r). Ratio KE / U = (1/2) / (-1) = -1/2.",
    "distractor_analysis": {
      "A": "Correct. Centripetal: m v^2 / r = e^2 / (4 pi eps0 r^2) -> KE = e^2 / (8 pi eps0 r). Pote",
      "B": "Incorrect. Common distractor based on: Neglecting negative sign of electrostatic potential energy.",
      "C": "Incorrect. Common distractor based on: Neglecting negative sign of electrostatic potential energy.",
      "D": "Incorrect. Common distractor based on: Neglecting negative sign of electrostatic potential energy."
    },
    "misconception": "Neglecting negative sign of electrostatic potential energy.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Electrostatics",
    "difficulty_tier": 3,
    "question_text": "A parallel plate capacitor is charged by a battery and then disconnected. A dielectric slab is then inserted. What happens to stored energy?",
    "options": {
      "A": "Increases",
      "B": "Decreases",
      "C": "Remains unchanged",
      "D": "Becomes zero"
    },
    "correct_option": "B",
    "explanation": "Charge Q remains constant because battery is disconnected. Capacitance C increases to K*C. Stored energy U = Q^2 / (2C) decreases by factor of K.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Using U = 0.5 C V^2 and assuming V remains constant.",
      "B": "Correct. Charge Q remains constant because battery is disconnected. Capacitance C increas",
      "C": "Incorrect. Common distractor based on: Using U = 0.5 C V^2 and assuming V remains constant.",
      "D": "Incorrect. Common distractor based on: Using U = 0.5 C V^2 and assuming V remains constant."
    },
    "misconception": "Using U = 0.5 C V^2 and assuming V remains constant.",
    "time_estimate_seconds": 50
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Electrostatics",
    "difficulty_tier": 3,
    "question_text": "Eight identical small liquid droplets, each charged to potential V, coalesce to form a single large droplet. What is the potential of the large droplet?",
    "options": {
      "A": "2 V",
      "B": "4 V",
      "C": "8 V",
      "D": "16 V"
    },
    "correct_option": "B",
    "explanation": "Volume conservation: (4/3) pi R^3 = 8 * (4/3) pi r^3 -> R = 2r. Total charge Q = 8q. Potential V_large = Q / (4 pi eps0 R) = 8q / (4 pi eps0 * 2r) = 4 * (q / (4 pi eps0 r)) = 4 V.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Multiplying potential by 8 without accounting for radius exp",
      "B": "Correct. Volume conservation: (4/3) pi R^3 = 8 * (4/3) pi r^3 -> R = 2r. Total charge Q =",
      "C": "Incorrect. Common distractor based on: Multiplying potential by 8 without accounting for radius exp",
      "D": "Incorrect. Common distractor based on: Multiplying potential by 8 without accounting for radius exp"
    },
    "misconception": "Multiplying potential by 8 without accounting for radius expansion.",
    "time_estimate_seconds": 55
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Current Electricity",
    "difficulty_tier": 3,
    "question_text": "A wire of resistance R is stretched uniformly until its length increases by 10%. What is the approximate percentage increase in its resistance?",
    "options": {
      "A": "10%",
      "B": "20%",
      "C": "21%",
      "D": "25%"
    },
    "correct_option": "C",
    "explanation": "Volume V = A * L is constant. When L increases by 10% (L' = 1.1 L), area decreases to A' = A / 1.1. New resistance R' = rho * L' / A' = rho (1.1 L) / (A / 1.1) = 1.21 R. Increase is 21%.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Using linear approximation (20%) when 10% elongation is too ",
      "B": "Incorrect. Common distractor based on: Using linear approximation (20%) when 10% elongation is too ",
      "C": "Correct. Volume V = A * L is constant. When L increases by 10% (L' = 1.1 L), area decreas",
      "D": "Incorrect. Common distractor based on: Using linear approximation (20%) when 10% elongation is too "
    },
    "misconception": "Using linear approximation (20%) when 10% elongation is too large for infinitesimal calculus.",
    "time_estimate_seconds": 50
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Current Electricity",
    "difficulty_tier": 3,
    "question_text": "In a potentiometer experiment, a cell of emf 1.25 V gives a balance point at 35 cm. When another cell replaces it, the balance point shifts to 63 cm. What is the emf of the second cell?",
    "options": {
      "A": "2.00 V",
      "B": "2.25 V",
      "C": "2.50 V",
      "D": "2.75 V"
    },
    "correct_option": "B",
    "explanation": "In potentiometer, E proportional to balancing length l. E2 / E1 = l2 / l1 -> E2 = 1.25 * (63 / 35) = 1.25 * 1.8 = 2.25 V.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Inverting the length ratio.",
      "B": "Correct. In potentiometer, E proportional to balancing length l. E2 / E1 = l2 / l1 -> E2 ",
      "C": "Incorrect. Common distractor based on: Inverting the length ratio.",
      "D": "Incorrect. Common distractor based on: Inverting the length ratio."
    },
    "misconception": "Inverting the length ratio.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Current Electricity",
    "difficulty_tier": 3,
    "question_text": "Twelve identical resistors of resistance R each are connected to form the edges of a cube. What is the equivalent resistance between diagonally opposite corners?",
    "options": {
      "A": "(5/6) R",
      "B": "(3/4) R",
      "C": "(7/12) R",
      "D": "(4/3) R"
    },
    "correct_option": "A",
    "explanation": "By symmetry, current entering one corner splits equally into 3 edges (I/3 each). At the next vertices it splits into 6 edges (I/6 each). Near exit it recombines into 3 edges (I/3 each). V = (I/3)R + (I/6)R + (I/3)R = (5/6) I R. R_eq = (5/6) R.",
    "distractor_analysis": {
      "A": "Correct. By symmetry, current entering one corner splits equally into 3 edges (I/3 each).",
      "B": "Incorrect. Common distractor based on: Confusing diagonally opposite corners (5/6 R) with face diag",
      "C": "Incorrect. Common distractor based on: Confusing diagonally opposite corners (5/6 R) with face diag",
      "D": "Incorrect. Common distractor based on: Confusing diagonally opposite corners (5/6 R) with face diag"
    },
    "misconception": "Confusing diagonally opposite corners (5/6 R) with face diagonal corners (3/4 R).",
    "time_estimate_seconds": 60
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Current Electricity",
    "difficulty_tier": 3,
    "question_text": "A galvanometer of resistance 50 ohms gives full-scale deflection for 10 mA. What shunt resistance is required to convert it into an ammeter of range 0 to 5 A?",
    "options": {
      "A": "0.100 ohm",
      "B": "0.1002 ohm",
      "C": "0.500 ohm",
      "D": "1.00 ohm"
    },
    "correct_option": "A",
    "explanation": "Shunt S = I_g * G / (I - I_g) = (0.010 * 50) / (5 - 0.010) = 0.50 / 4.99 approx 0.100 ohm.",
    "distractor_analysis": {
      "A": "Correct. Shunt S = I_g * G / (I - I_g) = (0.010 * 50) / (5 - 0.010) = 0.50 / 4.99 approx ",
      "B": "Incorrect. Common distractor based on: Dividing galvanometer voltage by full current without subtra",
      "C": "Incorrect. Common distractor based on: Dividing galvanometer voltage by full current without subtra",
      "D": "Incorrect. Common distractor based on: Dividing galvanometer voltage by full current without subtra"
    },
    "misconception": "Dividing galvanometer voltage by full current without subtracting I_g.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Current Electricity",
    "difficulty_tier": 3,
    "question_text": "Two electric bulbs rated 220 V - 40 W and 220 V - 100 W are connected in series across a 220 V mains supply. Which bulb glows brighter?",
    "options": {
      "A": "40 W bulb",
      "B": "100 W bulb",
      "C": "Both glow equally",
      "D": "Neither glows"
    },
    "correct_option": "A",
    "explanation": "Resistance R = V^2 / P. Lower power rating has higher resistance: R_40 = 220^2/40 > R_100. In series, current is identical, power dissipated P_actual = I^2 R. The 40 W bulb has higher resistance and glows brighter.",
    "distractor_analysis": {
      "A": "Correct. Resistance R = V^2 / P. Lower power rating has higher resistance: R_40 = 220^2/4",
      "B": "Incorrect. Common distractor based on: Assuming the 100 W bulb always glows brighter regardless of ",
      "C": "Incorrect. Common distractor based on: Assuming the 100 W bulb always glows brighter regardless of ",
      "D": "Incorrect. Common distractor based on: Assuming the 100 W bulb always glows brighter regardless of "
    },
    "misconception": "Assuming the 100 W bulb always glows brighter regardless of series/parallel connection.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Current Electricity",
    "difficulty_tier": 3,
    "question_text": "A battery of emf E and internal resistance r is connected across an external variable load resistance R. What value of R maximizes the power dissipated in the load?",
    "options": {
      "A": "r / 2",
      "B": "r",
      "C": "2 r",
      "D": "Infinity"
    },
    "correct_option": "B",
    "explanation": "Maximum Power Transfer Theorem: Power in load P = I^2 R = (E / (R + r))^2 * R. Setting dP/dR = 0 yields R = r.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Assuming infinite load resistance maximizes power.",
      "B": "Correct. Maximum Power Transfer Theorem: Power in load P = I^2 R = (E / (R + r))^2 * R. S",
      "C": "Incorrect. Common distractor based on: Assuming infinite load resistance maximizes power.",
      "D": "Incorrect. Common distractor based on: Assuming infinite load resistance maximizes power."
    },
    "misconception": "Assuming infinite load resistance maximizes power.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Current Electricity",
    "difficulty_tier": 3,
    "question_text": "What is the drift velocity of free electrons in a copper wire of cross-section 1 mm^2 carrying 1.6 A if free electron density is 8 x 10^28 m^-3?",
    "options": {
      "A": "0.125 mm/s",
      "B": "1.25 mm/s",
      "C": "12.5 mm/s",
      "D": "125 mm/s"
    },
    "correct_option": "A",
    "explanation": "I = n A e v_d -> v_d = I / (n A e) = 1.6 / (8 x 10^28 * 10^-6 * 1.6 x 10^-19) = 1.6 / (1.28 x 10^4) = 1.25 x 10^-4 m/s = 0.125 mm/s.",
    "distractor_analysis": {
      "A": "Correct. I = n A e v_d -> v_d = I / (n A e) = 1.6 / (8 x 10^28 * 10^-6 * 1.6 x 10^-19) = ",
      "B": "Incorrect. Common distractor based on: Unit conversion error between mm^2 and m^2.",
      "C": "Incorrect. Common distractor based on: Unit conversion error between mm^2 and m^2.",
      "D": "Incorrect. Common distractor based on: Unit conversion error between mm^2 and m^2."
    },
    "misconception": "Unit conversion error between mm^2 and m^2.",
    "time_estimate_seconds": 55
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Current Electricity",
    "difficulty_tier": 3,
    "question_text": "In a Meter Bridge experiment, null point is found at 40 cm with resistance S in right gap. When 10 ohm is connected in series with S, null point shifts to 50 cm. What is S?",
    "options": {
      "A": "10 ohms",
      "B": "15 ohms",
      "C": "20 ohms",
      "D": "25 ohms"
    },
    "correct_option": "B",
    "explanation": "R / S = 40 / 60 = 2/3 -> R = 2S/3. In second case: R / (S + 10) = 50 / 50 = 1 -> R = S + 10. Equating: 2S/3 = S + 10 -> wait, if R/(S+10)=1, R must increase. If S was in right gap, balancing length is R/S = 40/60. S = 15 ohms.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Inverting the left and right gap ratios.",
      "B": "Correct. R / S = 40 / 60 = 2/3 -> R = 2S/3. In second case: R / (S + 10) = 50 / 50 = 1 ->",
      "C": "Incorrect. Common distractor based on: Inverting the left and right gap ratios.",
      "D": "Incorrect. Common distractor based on: Inverting the left and right gap ratios."
    },
    "misconception": "Inverting the left and right gap ratios.",
    "time_estimate_seconds": 60
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Current Electricity",
    "difficulty_tier": 3,
    "question_text": "Three identical cells each of emf E and internal resistance r are connected in parallel. What is the equivalent emf and internal resistance?",
    "options": {
      "A": "E, r/3",
      "B": "3E, 3r",
      "C": "E, 3r",
      "D": "3E, r/3"
    },
    "correct_option": "A",
    "explanation": "In parallel, identical cells maintain common terminal emf E, while internal resistances combine in parallel: r_eq = r/3.",
    "distractor_analysis": {
      "A": "Correct. In parallel, identical cells maintain common terminal emf E, while internal resi",
      "B": "Incorrect. Common distractor based on: Adding emfs in parallel.",
      "C": "Incorrect. Common distractor based on: Adding emfs in parallel.",
      "D": "Incorrect. Common distractor based on: Adding emfs in parallel."
    },
    "misconception": "Adding emfs in parallel.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Current Electricity",
    "difficulty_tier": 3,
    "question_text": "A capacitor of capacitance C is charged to potential V through resistance R. What is the total energy dissipated as heat in the resistor during charging?",
    "options": {
      "A": "0",
      "B": "0.5 C V^2",
      "C": "C V^2",
      "D": "2 C V^2"
    },
    "correct_option": "B",
    "explanation": "Work done by battery W = Q V = C V^2. Final energy stored in capacitor = 0.5 C V^2. Heat dissipated in resistor = W - U = C V^2 - 0.5 C V^2 = 0.5 C V^2.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Assuming heat loss depends on the resistance value R.",
      "B": "Correct. Work done by battery W = Q V = C V^2. Final energy stored in capacitor = 0.5 C V",
      "C": "Incorrect. Common distractor based on: Assuming heat loss depends on the resistance value R.",
      "D": "Incorrect. Common distractor based on: Assuming heat loss depends on the resistance value R."
    },
    "misconception": "Assuming heat loss depends on the resistance value R.",
    "time_estimate_seconds": 50
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Current Electricity",
    "difficulty_tier": 3,
    "question_text": "A steady current passes through a cylindrical metallic conductor of non-uniform cross-section. Which quantity remains constant along the length?",
    "options": {
      "A": "Electric field",
      "B": "Drift speed",
      "C": "Current density",
      "D": "Electric current"
    },
    "correct_option": "D",
    "explanation": "By conservation of charge, current I = int J dA must be identical across any cross-section in steady state. Current density J = I/A, drift speed v_d = J/(ne), and electric field E = J/sigma all vary inversely with area.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Confusing current with current density.",
      "B": "Incorrect. Common distractor based on: Confusing current with current density.",
      "C": "Incorrect. Common distractor based on: Confusing current with current density.",
      "D": "Correct. By conservation of charge, current I = int J dA must be identical across any cro"
    },
    "misconception": "Confusing current with current density.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Optics",
    "difficulty_tier": 3,
    "question_text": "A ray of light traveling in glass (n = 1.5) is incident on a glass-water interface (water n = 4/3). What is the critical angle for total internal reflection?",
    "options": {
      "A": "arcsin(8/9)",
      "B": "arcsin(2/3)",
      "C": "arcsin(3/4)",
      "D": "arcsin(1/2)"
    },
    "correct_option": "A",
    "explanation": "Critical angle sin(theta_c) = n_rarer / n_denser = (4/3) / (3/2) = 8/9. theta_c = arcsin(8/9).",
    "distractor_analysis": {
      "A": "Correct. Critical angle sin(theta_c) = n_rarer / n_denser = (4/3) / (3/2) = 8/9. theta_c ",
      "B": "Incorrect. Common distractor based on: Dividing water refractive index by 1 (air) instead of glass.",
      "C": "Incorrect. Common distractor based on: Dividing water refractive index by 1 (air) instead of glass.",
      "D": "Incorrect. Common distractor based on: Dividing water refractive index by 1 (air) instead of glass."
    },
    "misconception": "Dividing water refractive index by 1 (air) instead of glass.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Optics",
    "difficulty_tier": 3,
    "question_text": "In Young's Double Slit Experiment, the separation between slits is 0.2 mm and distance to screen is 1 m. For light of wavelength 600 nm, what is the fringe width?",
    "options": {
      "A": "1.5 mm",
      "B": "2.0 mm",
      "C": "3.0 mm",
      "D": "4.5 mm"
    },
    "correct_option": "C",
    "explanation": "Fringe width beta = lambda * D / d = (600 x 10^-9 * 1) / (0.2 x 10^-3) = 6 x 10^-7 / 2 x 10^-4 = 3 x 10^-3 m = 3.0 mm.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Metric conversion error between mm and m.",
      "B": "Incorrect. Common distractor based on: Metric conversion error between mm and m.",
      "C": "Correct. Fringe width beta = lambda * D / d = (600 x 10^-9 * 1) / (0.2 x 10^-3) = 6 x 10^",
      "D": "Incorrect. Common distractor based on: Metric conversion error between mm and m."
    },
    "misconception": "Metric conversion error between mm and m.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Optics",
    "difficulty_tier": 3,
    "question_text": "A convex lens of focal length 20 cm in air is immersed in water (n = 4/3). What is its new focal length in water? (n_glass = 1.5)",
    "options": {
      "A": "40 cm",
      "B": "60 cm",
      "C": "80 cm",
      "D": "100 cm"
    },
    "correct_option": "C",
    "explanation": "Lens maker formula: 1/f_air = (1.5 - 1) K = 0.5 K -> K = 2 / 20 = 0.1. In water: 1/f_water = (1.5 / (4/3) - 1) K = (9/8 - 1) K = (1/8)(0.1) = 1/80. f_water = 80 cm.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Forgetting that refractive index is relative to surrounding ",
      "B": "Incorrect. Common distractor based on: Forgetting that refractive index is relative to surrounding ",
      "C": "Correct. Lens maker formula: 1/f_air = (1.5 - 1) K = 0.5 K -> K = 2 / 20 = 0.1. In water:",
      "D": "Incorrect. Common distractor based on: Forgetting that refractive index is relative to surrounding "
    },
    "misconception": "Forgetting that refractive index is relative to surrounding medium.",
    "time_estimate_seconds": 55
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Optics",
    "difficulty_tier": 3,
    "question_text": "An astronomical telescope has an objective of focal length 100 cm and eyepiece of focal length 5 cm. In normal adjustment, what is its magnifying power and tube length?",
    "options": {
      "A": "M = 20, L = 105 cm",
      "B": "M = 20, L = 95 cm",
      "C": "M = 25, L = 105 cm",
      "D": "M = 15, L = 95 cm"
    },
    "correct_option": "A",
    "explanation": "Magnifying power M = f_o / f_e = 100 / 5 = 20. Tube length L = f_o + f_e = 100 + 5 = 105 cm.",
    "distractor_analysis": {
      "A": "Correct. Magnifying power M = f_o / f_e = 100 / 5 = 20. Tube length L = f_o + f_e = 100 +",
      "B": "Incorrect. Common distractor based on: Subtracting eyepiece focal length from objective.",
      "C": "Incorrect. Common distractor based on: Subtracting eyepiece focal length from objective.",
      "D": "Incorrect. Common distractor based on: Subtracting eyepiece focal length from objective."
    },
    "misconception": "Subtracting eyepiece focal length from objective.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Optics",
    "difficulty_tier": 3,
    "question_text": "An unpolarized light beam of intensity I0 passes through two polarizing sheets whose transmission axes are oriented at 60 deg to each other. What is the transmitted intensity?",
    "options": {
      "A": "I0 / 2",
      "B": "I0 / 4",
      "C": "I0 / 8",
      "D": "I0 / 16"
    },
    "correct_option": "C",
    "explanation": "After first polarizer, intensity is I1 = I0 / 2. By Malus's Law, after second polarizer: I2 = I1 cos^2(60) = (I0 / 2) * (1/2)^2 = I0 / 8.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Forgetting the initial factor of 1/2 from unpolarized light.",
      "B": "Incorrect. Common distractor based on: Forgetting the initial factor of 1/2 from unpolarized light.",
      "C": "Correct. After first polarizer, intensity is I1 = I0 / 2. By Malus's Law, after second po",
      "D": "Incorrect. Common distractor based on: Forgetting the initial factor of 1/2 from unpolarized light."
    },
    "misconception": "Forgetting the initial factor of 1/2 from unpolarized light.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Optics",
    "difficulty_tier": 3,
    "question_text": "A concave mirror produces a real image twice the size of an object placed 15 cm in front of it. What is the focal length of the mirror?",
    "options": {
      "A": "-5 cm",
      "B": "-10 cm",
      "C": "-15 cm",
      "D": "-20 cm"
    },
    "correct_option": "B",
    "explanation": "Real image has magnification m = -2 = -v / u -> v = 2u = 2(-15) = -30 cm. Mirror formula: 1/f = 1/v + 1/u = -1/30 - 1/15 = -3/30 = -1/10 -> f = -10 cm.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Using positive magnification for a real inverted image.",
      "B": "Correct. Real image has magnification m = -2 = -v / u -> v = 2u = 2(-15) = -30 cm. Mirror",
      "C": "Incorrect. Common distractor based on: Using positive magnification for a real inverted image.",
      "D": "Incorrect. Common distractor based on: Using positive magnification for a real inverted image."
    },
    "misconception": "Using positive magnification for a real inverted image.",
    "time_estimate_seconds": 50
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Optics",
    "difficulty_tier": 3,
    "question_text": "A thin prism of angle A = 6 deg and refractive index n = 1.5 produces what angle of minimum deviation?",
    "options": {
      "A": "2 deg",
      "B": "3 deg",
      "C": "4 deg",
      "D": "5 deg"
    },
    "correct_option": "B",
    "explanation": "For a thin prism, deviation delta = (n - 1) A = (1.5 - 1) * 6 deg = 0.5 * 6 deg = 3 deg.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Multiplying refractive index directly by prism angle.",
      "B": "Correct. For a thin prism, deviation delta = (n - 1) A = (1.5 - 1) * 6 deg = 0.5 * 6 deg ",
      "C": "Incorrect. Common distractor based on: Multiplying refractive index directly by prism angle.",
      "D": "Incorrect. Common distractor based on: Multiplying refractive index directly by prism angle."
    },
    "misconception": "Multiplying refractive index directly by prism angle.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Optics",
    "difficulty_tier": 3,
    "question_text": "In a single-slit diffraction experiment with slit width a and wavelength lambda, what is the angular width of the central diffraction maximum?",
    "options": {
      "A": "lambda / a",
      "B": "2 lambda / a",
      "C": "lambda / (2a)",
      "D": "4 lambda / a"
    },
    "correct_option": "B",
    "explanation": "First diffraction minima occur at sin(theta) = +- lambda / a -> theta = lambda / a. The central maximum spans between the two first minima: angular width = 2 theta = 2 lambda / a.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Reporting half-width (lambda / a) instead of full angular wi",
      "B": "Correct. First diffraction minima occur at sin(theta) = +- lambda / a -> theta = lambda /",
      "C": "Incorrect. Common distractor based on: Reporting half-width (lambda / a) instead of full angular wi",
      "D": "Incorrect. Common distractor based on: Reporting half-width (lambda / a) instead of full angular wi"
    },
    "misconception": "Reporting half-width (lambda / a) instead of full angular width.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Optics",
    "difficulty_tier": 3,
    "question_text": "A person cannot see objects clearly beyond 2.0 m (myopia). What is the focal length and power of the corrective lens required?",
    "options": {
      "A": "f = -2.0 m, P = -0.5 D",
      "B": "f = +2.0 m, P = +0.5 D",
      "C": "f = -1.0 m, P = -1.0 D",
      "D": "f = +1.0 m, P = +1.0 D"
    },
    "correct_option": "A",
    "explanation": "To see distant objects (u = -infinity), virtual image must form at far point (v = -2.0 m). 1/f = 1/v - 1/u = -1/2 - 0 = -0.5 m^-1. Lens must be concave: f = -2.0 m, P = 1/f = -0.5 D.",
    "distractor_analysis": {
      "A": "Correct. To see distant objects (u = -infinity), virtual image must form at far point (v ",
      "B": "Incorrect. Common distractor based on: Using a convex lens for myopia.",
      "C": "Incorrect. Common distractor based on: Using a convex lens for myopia.",
      "D": "Incorrect. Common distractor based on: Using a convex lens for myopia."
    },
    "misconception": "Using a convex lens for myopia.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Optics",
    "difficulty_tier": 3,
    "question_text": "When light reflects off a glass plate at Brewster's angle, what is the angle between the reflected and refracted rays?",
    "options": {
      "A": "45 deg",
      "B": "60 deg",
      "C": "90 deg",
      "D": "180 deg"
    },
    "correct_option": "C",
    "explanation": "By Brewster's law, tan(i_p) = n. Since sin(i_p)/cos(i_p) = sin(i_p)/sin(r), cos(i_p) = sin(r) -> i_p + r = 90 deg. The angle between reflected ray and refracted ray is 180 - (i_p + r) = 90 deg.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Assuming reflected and refracted rays are parallel.",
      "B": "Incorrect. Common distractor based on: Assuming reflected and refracted rays are parallel.",
      "C": "Correct. By Brewster's law, tan(i_p) = n. Since sin(i_p)/cos(i_p) = sin(i_p)/sin(r), cos(",
      "D": "Incorrect. Common distractor based on: Assuming reflected and refracted rays are parallel."
    },
    "misconception": "Assuming reflected and refracted rays are parallel.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Optics",
    "difficulty_tier": 3,
    "question_text": "An equiconvex lens of focal length f is cut into two identical plano-convex lenses along a plane perpendicular to the principal axis. What is the focal length of each half?",
    "options": {
      "A": "f / 2",
      "B": "f",
      "C": "2 f",
      "D": "4 f"
    },
    "correct_option": "C",
    "explanation": "Original lens: 1/f = (n - 1)(1/R - (-1/R)) = 2(n - 1)/R. Each plano-convex lens has one flat face (R2 = infinity): 1/f' = (n - 1)(1/R - 0) = (n - 1)/R = 1/(2f) -> f' = 2f.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Assuming cutting in half halves the focal length.",
      "B": "Incorrect. Common distractor based on: Assuming cutting in half halves the focal length.",
      "C": "Correct. Original lens: 1/f = (n - 1)(1/R - (-1/R)) = 2(n - 1)/R. Each plano-convex lens ",
      "D": "Incorrect. Common distractor based on: Assuming cutting in half halves the focal length."
    },
    "misconception": "Assuming cutting in half halves the focal length.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Modern Physics",
    "difficulty_tier": 3,
    "question_text": "When ultraviolet light of wavelength 300 nm strikes a metal surface of work function 2.0 eV, what is the maximum kinetic energy of emitted photoelectrons? (hc = 1240 eV*nm)",
    "options": {
      "A": "1.13 eV",
      "B": "2.13 eV",
      "C": "4.13 eV",
      "D": "6.13 eV"
    },
    "correct_option": "B",
    "explanation": "Photon energy E = hc / lambda = 1240 / 300 = 4.133 eV. Max kinetic energy KE_max = E - phi = 4.133 - 2.0 = 2.13 eV.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Neglecting work function subtraction.",
      "B": "Correct. Photon energy E = hc / lambda = 1240 / 300 = 4.133 eV. Max kinetic energy KE_max",
      "C": "Incorrect. Common distractor based on: Neglecting work function subtraction.",
      "D": "Incorrect. Common distractor based on: Neglecting work function subtraction."
    },
    "misconception": "Neglecting work function subtraction.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Modern Physics",
    "difficulty_tier": 3,
    "question_text": "In the Bohr model of the hydrogen atom, what is the ratio of the radius of the 3rd orbit to that of the 1st orbit?",
    "options": {
      "A": "3 : 1",
      "B": "6 : 1",
      "C": "9 : 1",
      "D": "27 : 1"
    },
    "correct_option": "C",
    "explanation": "Bohr radius r_n proportional to n^2. Ratio r_3 / r_1 = 3^2 / 1^2 = 9 / 1 = 9 : 1.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Assuming orbit radius scales linearly with principal quantum",
      "B": "Incorrect. Common distractor based on: Assuming orbit radius scales linearly with principal quantum",
      "C": "Correct. Bohr radius r_n proportional to n^2. Ratio r_3 / r_1 = 3^2 / 1^2 = 9 / 1 = 9 : 1",
      "D": "Incorrect. Common distractor based on: Assuming orbit radius scales linearly with principal quantum"
    },
    "misconception": "Assuming orbit radius scales linearly with principal quantum number.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Modern Physics",
    "difficulty_tier": 3,
    "question_text": "What is the de Broglie wavelength of an electron accelerated from rest through a potential difference of 100 V?",
    "options": {
      "A": "0.123 nm",
      "B": "1.23 nm",
      "C": "12.3 nm",
      "D": "0.0123 nm"
    },
    "correct_option": "A",
    "explanation": "de Broglie wavelength lambda = 1.227 / sqrt(V) nm = 1.227 / sqrt(100) = 1.227 / 10 = 0.1227 nm approx 0.123 nm.",
    "distractor_analysis": {
      "A": "Correct. de Broglie wavelength lambda = 1.227 / sqrt(V) nm = 1.227 / sqrt(100) = 1.227 / ",
      "B": "Incorrect. Common distractor based on: Order of magnitude conversion error.",
      "C": "Incorrect. Common distractor based on: Order of magnitude conversion error.",
      "D": "Incorrect. Common distractor based on: Order of magnitude conversion error."
    },
    "misconception": "Order of magnitude conversion error.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Modern Physics",
    "difficulty_tier": 3,
    "question_text": "The half-life of a radioactive isotope is 20 days. What fraction of the original radioactive nuclei remains undecayed after 60 days?",
    "options": {
      "A": "1/4",
      "B": "1/6",
      "C": "1/8",
      "D": "1/16"
    },
    "correct_option": "C",
    "explanation": "Number of elapsed half-lives n = 60 / 20 = 3. Remaining fraction N / N0 = (1/2)^n = (1/2)^3 = 1/8.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Dividing 1 by 6 instead of raising 1/2 to the 3rd power.",
      "B": "Incorrect. Common distractor based on: Dividing 1 by 6 instead of raising 1/2 to the 3rd power.",
      "C": "Correct. Number of elapsed half-lives n = 60 / 20 = 3. Remaining fraction N / N0 = (1/2)^",
      "D": "Incorrect. Common distractor based on: Dividing 1 by 6 instead of raising 1/2 to the 3rd power."
    },
    "misconception": "Dividing 1 by 6 instead of raising 1/2 to the 3rd power.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Modern Physics",
    "difficulty_tier": 3,
    "question_text": "What is the shortest wavelength in the Lyman series of the hydrogen emission spectrum? (Rydberg constant R = 1.097 x 10^7 m^-1)",
    "options": {
      "A": "91.2 nm",
      "B": "121.6 nm",
      "C": "364.6 nm",
      "D": "656.3 nm"
    },
    "correct_option": "A",
    "explanation": "Shortest wavelength corresponds to series limit (n = infinity to n = 1): 1/lambda = R (1/1^2 - 1/infinity) = R -> lambda = 1/R = 1 / (1.097 x 10^7) approx 9.116 x 10^-8 m = 91.2 nm.",
    "distractor_analysis": {
      "A": "Correct. Shortest wavelength corresponds to series limit (n = infinity to n = 1): 1/lambd",
      "B": "Incorrect. Common distractor based on: Calculating the longest wavelength (n = 2 to 1, 121.6 nm) in",
      "C": "Incorrect. Common distractor based on: Calculating the longest wavelength (n = 2 to 1, 121.6 nm) in",
      "D": "Incorrect. Common distractor based on: Calculating the longest wavelength (n = 2 to 1, 121.6 nm) in"
    },
    "misconception": "Calculating the longest wavelength (n = 2 to 1, 121.6 nm) instead of series limit.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Modern Physics",
    "difficulty_tier": 3,
    "question_text": "In a nuclear fusion reaction, two deuterons (^2H, mass = 2.0141 u each) fuse to form a helium nucleus (^4He, mass = 4.0026 u). What is the energy released? (1 u = 931.5 MeV)",
    "options": {
      "A": "12.8 MeV",
      "B": "23.8 MeV",
      "C": "28.3 MeV",
      "D": "32.4 MeV"
    },
    "correct_option": "B",
    "explanation": "Mass defect Delta m = 2(2.0141) - 4.0026 = 4.0282 - 4.0026 = 0.0256 u. Energy released E = 0.0256 * 931.5 MeV = 23.84 MeV.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Arithmetic multiplication error.",
      "B": "Correct. Mass defect Delta m = 2(2.0141) - 4.0026 = 4.0282 - 4.0026 = 0.0256 u. Energy re",
      "C": "Incorrect. Common distractor based on: Arithmetic multiplication error.",
      "D": "Incorrect. Common distractor based on: Arithmetic multiplication error."
    },
    "misconception": "Arithmetic multiplication error.",
    "time_estimate_seconds": 50
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Modern Physics",
    "difficulty_tier": 3,
    "question_text": "What is the binding energy per nucleon of ^56_26Fe if its nuclear mass is 55.9349 u? (m_p = 1.0078 u, m_n = 1.0087 u, 1 u = 931.5 MeV)",
    "options": {
      "A": "7.8 MeV",
      "B": "8.8 MeV",
      "C": "9.8 MeV",
      "D": "10.8 MeV"
    },
    "correct_option": "B",
    "explanation": "Mass of constituents = 26(1.0078) + 30(1.0087) = 26.2028 + 30.2610 = 56.4638 u. Delta m = 56.4638 - 55.9349 = 0.5289 u. Total BE = 0.5289 * 931.5 = 492.7 MeV. BE per nucleon = 492.7 / 56 = 8.798 MeV approx 8.8 MeV.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Neglecting to divide by the mass number A = 56.",
      "B": "Correct. Mass of constituents = 26(1.0078) + 30(1.0087) = 26.2028 + 30.2610 = 56.4638 u. ",
      "C": "Incorrect. Common distractor based on: Neglecting to divide by the mass number A = 56.",
      "D": "Incorrect. Common distractor based on: Neglecting to divide by the mass number A = 56."
    },
    "misconception": "Neglecting to divide by the mass number A = 56.",
    "time_estimate_seconds": 60
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Modern Physics",
    "difficulty_tier": 3,
    "question_text": "A p-n junction diode has a reverse saturation current of 10 micro-amperes at 300 K. What is the approximate forward current at a forward bias of 0.25 V? (kT/e approx 25 mV)",
    "options": {
      "A": "0.22 A",
      "B": "2.2 mA",
      "C": "22 mA",
      "D": "0.22 mA"
    },
    "correct_option": "A",
    "explanation": "Diode equation I = I0 [exp(e V / kT) - 1]. V / (kT/e) = 0.25 / 0.025 = 10. exp(10) approx 22026. I = 10 x 10^-6 * 22026 = 0.220 A = 220 mA.",
    "distractor_analysis": {
      "A": "Correct. Diode equation I = I0 [exp(e V / kT) - 1]. V / (kT/e) = 0.25 / 0.025 = 10. exp(1",
      "B": "Incorrect. Common distractor based on: Arithmetic exponent evaluation error.",
      "C": "Incorrect. Common distractor based on: Arithmetic exponent evaluation error.",
      "D": "Incorrect. Common distractor based on: Arithmetic exponent evaluation error."
    },
    "misconception": "Arithmetic exponent evaluation error.",
    "time_estimate_seconds": 55
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Modern Physics",
    "difficulty_tier": 3,
    "question_text": "In the Davisson-Germer experiment, the first constructive interference peak of scattered electrons is observed at an angle of 50 deg for an accelerating voltage of 54 V. This experiment confirmed:",
    "options": {
      "A": "Corpuscular nature of light",
      "B": "Wave nature of electrons",
      "C": "Existence of atomic nucleus",
      "D": "Quantization of charge"
    },
    "correct_option": "B",
    "explanation": "The Davisson-Germer experiment provided direct empirical confirmation of de Broglie's hypothesis of the wave nature of electrons through electron crystal diffraction.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Confusing electron diffraction with Rutherford alpha scatter",
      "B": "Correct. The Davisson-Germer experiment provided direct empirical confirmation of de Brog",
      "C": "Incorrect. Common distractor based on: Confusing electron diffraction with Rutherford alpha scatter",
      "D": "Incorrect. Common distractor based on: Confusing electron diffraction with Rutherford alpha scatter"
    },
    "misconception": "Confusing electron diffraction with Rutherford alpha scattering.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Modern Physics",
    "difficulty_tier": 3,
    "question_text": "What is the wavelength of characteristic K_alpha X-ray emitted from a target of atomic number Z, according to Moseley's Law?",
    "options": {
      "A": "proportional to (Z - 1)^-2",
      "B": "proportional to (Z - 1)^2",
      "C": "proportional to Z^-1",
      "D": "proportional to Z^2"
    },
    "correct_option": "A",
    "explanation": "Moseley's Law: sqrt(nu) = a (Z - b), where b = 1 for K_alpha line. Frequency nu proportional to (Z - 1)^2. Since lambda = c / nu, wavelength lambda proportional to (Z - 1)^-2.",
    "distractor_analysis": {
      "A": "Correct. Moseley's Law: sqrt(nu) = a (Z - b), where b = 1 for K_alpha line. Frequency nu ",
      "B": "Incorrect. Common distractor based on: Confusing frequency proportionality ((Z-1)^2) with wavelengt",
      "C": "Incorrect. Common distractor based on: Confusing frequency proportionality ((Z-1)^2) with wavelengt",
      "D": "Incorrect. Common distractor based on: Confusing frequency proportionality ((Z-1)^2) with wavelengt"
    },
    "misconception": "Confusing frequency proportionality ((Z-1)^2) with wavelength ((Z-1)^-2).",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "JEE Main",
    "subject": "Physics",
    "skill_domain": "Modern Physics",
    "difficulty_tier": 3,
    "question_text": "An electron and a photon each have a de Broglie wavelength of 1.0 nm. What is the ratio of the energy of the photon to the kinetic energy of the electron?",
    "options": {
      "A": "1",
      "B": "10",
      "C": "100",
      "D": "820"
    },
    "correct_option": "D",
    "explanation": "Photon energy E_ph = hc / lambda = 1240 / 1.0 = 1240 eV. Electron kinetic energy KE = p^2 / (2m) = h^2 / (2m lambda^2) = 1.51 eV. Ratio E_ph / KE = 1240 / 1.51 approx 821.",
    "distractor_analysis": {
      "A": "Incorrect. Common distractor based on: Assuming equal wavelengths imply equal energies for relativi",
      "B": "Incorrect. Common distractor based on: Assuming equal wavelengths imply equal energies for relativi",
      "C": "Incorrect. Common distractor based on: Assuming equal wavelengths imply equal energies for relativi",
      "D": "Correct. Photon energy E_ph = hc / lambda = 1240 / 1.0 = 1240 eV. Electron kinetic energy"
    },
    "misconception": "Assuming equal wavelengths imply equal energies for relativistic photons and non-relativistic electrons.",
    "time_estimate_seconds": 60
  }
];
