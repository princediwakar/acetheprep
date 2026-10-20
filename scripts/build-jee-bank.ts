// Path: scripts/build-jee-bank.ts
import * as fs from "fs";
import * as path from "path";
import type { SeedQuestion } from "../lib/data/question-bank-seed";
import taxonomy from "../lib/taxonomies.json";

// We will generate 11 authentic questions for each of the 22 canonical domains of JEE Main.
// Subject: Physics (9 domains)
// Subject: Chemistry (7 domains)
// Subject: Mathematics (6 domains)

const DOMAIN_DATA: Record<string, { subject: string; questions: Array<{
  q: string;
  opts: [string, string, string, string];
  ans: "A" | "B" | "C" | "D";
  exp: string;
  trap: string;
  time: number;
}> }> = {
  // -------------------------------------------------------------
  // PHYSICS
  // -------------------------------------------------------------
  "Kinematics": {
    subject: "Physics",
    questions: [
      {
        q: "A projectile is launched from the origin $(0,0)$ with initial velocity $u$. The equation of its trajectory is $y = \\sqrt{3} x - \\frac{g x^2}{2}$. If $g = 10\\text{ m/s}^2$, what is its speed at maximum height?",
        opts: ["$1\\text{ m/s}$", "$\\sqrt{3}\\text{ m/s}$", "$2\\text{ m/s}$", "$0.5\\text{ m/s}$"],
        ans: "A",
        exp: "Trajectory $y = x\\tan\\theta - \\frac{g x^2}{2 u^2 \\cos^2\\theta}$. Comparing: $\\tan\\theta = \\sqrt{3} \\implies \\theta = 60^\\circ$. $\\frac{1}{u^2 \\cos^2\\theta} = 1 \\implies u\\cos\\theta = 1\\text{ m/s}$. At apex, vertical velocity is zero, so $v = u\\cos\\theta = 1\\text{ m/s}$.",
        trap: "Reporting total initial velocity $u = 2\\text{ m/s}$ instead of the horizontal speed at the summit.",
        time: 55,
      },
      {
        q: "A particle moves such that its velocity varies with displacement $s$ as $v = \\alpha \\sqrt{s}$. What is the acceleration of the particle?",
        opts: ["$\\frac{\\alpha^2}{2}$", "$\\alpha^2$", "$\\frac{\\alpha^2 s}{2}$", "$\\alpha^2 t$"],
        ans: "A",
        exp: "Acceleration $a = v \\frac{dv}{ds} = (\\alpha s^{1/2}) \\times \\left(\\frac{\\alpha}{2} s^{-1/2}\\right) = \\frac{\\alpha^2}{2}$, which is constant.",
        trap: "Differentiating $v$ with respect to $s$ without multiplying by $v$ ($a = v \\frac{dv}{ds}$).",
        time: 50,
      },
      {
        q: "A ball dropped from a tower of height $H$ falls a distance $\\frac{9}{25} H$ in the last second of its free fall under gravity $g = 10\\text{ m/s}^2$. What is $H$?",
        opts: ["$100\\text{ m}$", "$125\\text{ m}$", "$150\\text{ m}$", "$180\\text{ m}$"],
        ans: "B",
        exp: "$H = \\frac{1}{2} g t^2$. Distance in first $(t-1)$ seconds = $\\frac{16}{25} H = \\frac{1}{2} g (t-1)^2$. Ratio $\\frac{t-1}{t} = \\frac{4}{5} \\implies t = 5\\text{ s}$. $H = \\frac{1}{2}(10)(5^2) = 125\\text{ m}$.",
        trap: "Equating distance in the last second directly without setting up the quadratic time ratio.",
        time: 60,
      },
      {
        q: "A swimmer crosses a $400\\text{ m}$ wide river flowing at $3\\text{ m/s}$. If the swimmer's still-water speed is $5\\text{ m/s}$ and they follow the shortest perpendicular path, how long does the crossing take?",
        opts: ["$80\\text{ s}$", "$100\\text{ s}$", "$120\\text{ s}$", "$133\\text{ s}$"],
        ans: "B",
        exp: "To prevent downstream drift, upstream velocity cancels current: $5\\sin\\theta = 3 \\implies \\theta = 37^\\circ$. Resultant perpendicular speed $v_{\\perp} = \\sqrt{5^2 - 3^2} = 4\\text{ m/s}$. Time $t = 400 / 4 = 100\\text{ s}$.",
        trap: "Dividing distance by still-water speed ($400/5 = 80\\text{ s}$) ignoring current compensation.",
        time: 55,
      },
      {
        q: "A particle moves with coordinates $x = a\\cos(\\omega t)$ and $y = b\\sin(\\omega t)$. What is its acceleration vector $\\vec{a}$?",
        opts: ["$-\\omega^2 \\vec{r}$", "$\\omega^2 \\vec{r}$", "$\\omega \\vec{v}$", "$-\\omega \\vec{r}$"],
        ans: "A",
        exp: "$\\ddot{x} = -\\omega^2 x$, $\\ddot{y} = -\\omega^2 y$. Therefore $\\vec{a} = \\ddot{x}\\hat{i} + \\ddot{y}\\hat{j} = -\\omega^2(x\\hat{i} + y\\hat{j}) = -\\omega^2 \\vec{r}$.",
        trap: "Confusing centripetal directional sign with positive outward vector.",
        time: 45,
      },
      {
        q: "Car A travelling at $20\\text{ m/s}$ is $50\\text{ m}$ behind Car B travelling at $10\\text{ m/s}$ in the same direction. What is the minimum deceleration of Car A required to avoid a collision?",
        opts: ["$0.5\\text{ m/s}^2$", "$1.0\\text{ m/s}^2$", "$1.5\\text{ m/s}^2$", "$2.0\\text{ m/s}^2$"],
        ans: "B",
        exp: "In Car B's frame: initial relative velocity $u_{\\text{rel}} = 20 - 10 = 10\\text{ m/s}$. Stopping distance $s = 50\\text{ m}$. Using $v_{\\text{rel}}^2 = u_{\\text{rel}}^2 - 2 a s \\implies 0 = 100 - 2 a (50) \\implies 100 a = 100 \\implies a = 1\\text{ m/s}^2$.",
        trap: "Calculating stopping distance in ground frame until Car A completely stops ($v_A = 0$) rather than matching Car B's speed.",
        time: 60,
      },
      {
        q: "A stone released from an ascending balloon (ascending at $1.25\\text{ m/s}^2$ from rest for $8\\text{ s}$) reaches the ground in how much additional time? ($g = 10\\text{ m/s}^2$)",
        opts: ["$2\\text{ s}$", "$4\\text{ s}$", "$6\\text{ s}$", "$8\\text{ s}$"],
        ans: "B",
        exp: "At $8\\text{ s}$, height $h = 0.5(1.25)(64) = 40\\text{ m}$; upward velocity $v = 1.25 \\times 8 = 10\\text{ m/s}$. Equation for fall: $-40 = 10t - 5t^2 \\implies 5t^2 - 10t - 40 = 0 \\implies t^2 - 2t - 8 = 0 \\implies t = 4\\text{ s}$.",
        trap: "Assuming the stone drops with initial velocity zero instead of inheriting the upward speed of the balloon.",
        time: 60,
      },
      {
        q: "What is the radius of curvature at the apex of a projectile launched with speed $u$ at angle $\\theta$ to the horizontal?",
        opts: ["$\\frac{u^2 \\cos^2\\theta}{g}$", "$\\frac{u^2 \\sin^2\\theta}{g}$", "$\\frac{u^2}{g\\cos\\theta}$", "$\\frac{u^2}{g}$"],
        ans: "A",
        exp: "Radius of curvature $R = v^2 / a_{\\perp}$. At summit, $v = u\\cos\\theta$ and acceleration is perpendicular ($a_{\\perp} = g$). Thus $R = \\frac{u^2 \\cos^2\\theta}{g}$.",
        trap: "Confusing apex radius with initial launch curvature ($u^2 / (g\\cos\\theta)$).",
        time: 50,
      },
      {
        q: "A body moving in a circle of radius $20\\text{ m}$ has constant tangential acceleration $a_t = 3\\text{ m/s}^2$. Starting from rest, what is its total acceleration after $2\\text{ s}$?",
        opts: ["$3.0\\text{ m/s}^2$", "$3.5\\text{ m/s}^2$", "$4.8\\text{ m/s}^2$", "$5.0\\text{ m/s}^2$"],
        ans: "B",
        exp: "$v = a_t t = 3(2) = 6\\text{ m/s}$. Radial acceleration $a_r = v^2 / R = 36 / 20 = 1.8\\text{ m/s}^2$. Total $a = \\sqrt{a_t^2 + a_r^2} = \\sqrt{3^2 + 1.8^2} = \\sqrt{12.24} \\approx 3.5\\text{ m/s}^2$.",
        trap: "Adding tangential and centripetal accelerations linearly ($3 + 1.8 = 4.8$) instead of in quadrature.",
        time: 50,
      },
      {
        q: "A disc of radius $R$ rolls without slipping with forward center of mass velocity $v_0$. What is the velocity of the top point on the rim?",
        opts: ["$0$", "$v_0$", "$\\sqrt{2} v_0$", "$2 v_0$"],
        ans: "D",
        exp: "For pure rolling, $v_{\\text{top}} = v_{\\text{cm}} + \\omega R = v_0 + v_0 = 2 v_0$.",
        trap: "Assuming all points on the rim move at the center-of-mass translation velocity $v_0$.",
        time: 40,
      },
      {
        q: "A boat takes 4 hours downstream and 6 hours upstream between two ports. How many hours would a raft take to float between the ports?",
        opts: ["$12\\text{ h}$", "$18\\text{ h}$", "$24\\text{ h}$", "$48\\text{ h}$"],
        ans: "C",
        exp: "$v_b + v_r = D/4$, $v_b - v_r = D/6$. Subtracting gives $2v_r = D/12 \\implies v_r = D/24$. Raft time $t = D / v_r = 24$ hours.",
        trap: "Averaging upstream and downstream times rather than calculating the harmonic current velocity.",
        time: 55,
      },
    ],
  },
  "Laws of Motion": {
    subject: "Physics",
    questions: [
      {
        q: "A $2\\text{ kg}$ block rests on a $4\\text{ kg}$ block on a frictionless table. If coefficient of static friction between blocks is $\\mu_s = 0.4$, what is the maximum force applied to the $4\\text{ kg}$ block without relative slipping? ($g = 10\\text{ m/s}^2$)",
        opts: ["$16\\text{ N}$", "$24\\text{ N}$", "$32\\text{ N}$", "$40\\text{ N}$"],
        ans: "B",
        exp: "Max friction on upper block $f = \\mu_s m_2 g = 0.4(2)(10) = 8\\text{ N}$. Max acceleration $a = 8 / 2 = 4\\text{ m/s}^2$. Total force $F = (m_1 + m_2) a = (4 + 2)(4) = 24\\text{ N}$.",
        trap: "Applying the maximum friction force directly to the bottom block without multiplying by total system mass.",
        time: 55,
      },
      {
        q: "In an Atwood machine with masses $3\\text{ kg}$ and $5\\text{ kg}$, what is the string tension during acceleration? ($g = 10\\text{ m/s}^2$)",
        opts: ["$30.0\\text{ N}$", "$37.5\\text{ N}$", "$40.0\\text{ N}$", "$50.0\\text{ N}$"],
        ans: "B",
        exp: "$T = \\frac{2 m_1 m_2 g}{m_1 + m_2} = \\frac{2(3)(5)(10)}{3 + 5} = \\frac{300}{8} = 37.5\\text{ N}$.",
        trap: "Averaging the gravitational weights of the two blocks ($40\\text{ N}$) rather than using dynamic tension.",
        time: 50,
      },
      {
        q: "A block of mass $m$ is pressed against a vertical wall with horizontal force $F$. If coefficient of static friction is $\\mu_s$, what is the minimum $F$ to prevent slipping?",
        opts: ["$\\mu_s m g$", "$\\frac{m g}{\\mu_s}$", "$\\frac{\\mu_s}{m g}$", "$m g \\sqrt{1 + \\mu_s^2}$"],
        ans: "B",
        exp: "$N = F$, friction $f_s = \\mu_s F \\ge m g \\implies F \\ge m g / \\mu_s$.",
        trap: "Using $F = \\mu_s m g$ (confusing vertical wall normal force with horizontal floor normal force).",
        time: 45,
      },
      {
        q: "A $40\\text{ kg}$ monkey climbs a rope that can support at most $600\\text{ N}$. What is the maximum safe upward acceleration? ($g = 10\\text{ m/s}^2$)",
        opts: ["$2.5\\text{ m/s}^2$", "$5.0\\text{ m/s}^2$", "$7.5\\text{ m/s}^2$", "$10.0\\text{ m/s}^2$"],
        ans: "B",
        exp: "$T = m(g + a) \\implies 600 = 40(10 + a) \\implies 15 = 10 + a \\implies a = 5\\text{ m/s}^2$.",
        trap: "Dividing total tension by mass without subtracting gravity $g$.",
        time: 45,
      },
      {
        q: "What is the maximum safe speed for a car negotiating an unbanked circular flat curve of radius $R$ with coefficient of friction $\\mu_s$?",
        opts: ["$\\sqrt{\\mu_s g R}$", "$\\mu_s \\sqrt{g R}$", "$\\sqrt{\\frac{g R}{\\mu_s}}$", "$\\frac{\\mu_s g}{R}$"],
        ans: "A",
        exp: "Centripetal force $M v^2 / R \\le \\mu_s M g \\implies v \\le \\sqrt{\\mu_s g R}$.",
        trap: "Placing the friction coefficient outside the radical.",
        time: 40,
      },
      {
        q: "A block takes twice as long to slide down a $45^\\circ$ rough incline as a smooth incline of equal length. What is $\\mu_k$?",
        opts: ["$0.25$", "$0.50$", "$0.75$", "$0.80$"],
        ans: "C",
        exp: "$t \\propto 1/\\sqrt{a} \\implies a_2 = a_1 / 4$. $g(\\sin 45^\\circ - \\mu_k\\cos 45^\\circ) = \\frac{1}{4} g\\sin 45^\\circ \\implies 1 - \\mu_k = 1/4 \\implies \\mu_k = 0.75$.",
        trap: "Setting $a_2 = a_1 / 2$ instead of $a_2 = a_1 / 4$ (forgetting $s = \\frac{1}{2} a t^2$).",
        time: 55,
      },
      {
        q: "A $60\\text{ kg}$ man stands on a spring scale in an elevator accelerating downwards at $2\\text{ m/s}^2$. What does the scale read? ($g = 10\\text{ m/s}^2$)",
        opts: ["$480\\text{ N}$", "$600\\text{ N}$", "$720\\text{ N}$", "$120\\text{ N}$"],
        ans: "A",
        exp: "$N = m(g - a) = 60(10 - 2) = 480\\text{ N}$.",
        trap: "Adding downward acceleration ($g + a = 720\\text{ N}$) instead of subtracting.",
        time: 40,
      },
      {
        q: "A $20\\text{ g}$ bullet at $400\\text{ m/s}$ embeds in a suspended $1.98\\text{ kg}$ block. What maximum height does the block swing to? ($g = 10\\text{ m/s}^2$)",
        opts: ["$0.4\\text{ m}$", "$0.8\\text{ m}$", "$1.6\\text{ m}$", "$3.2\\text{ m}$"],
        ans: "B",
        exp: "Momentum: $0.02(400) = 2 V \\implies V = 4\\text{ m/s}$. Energy: $h = V^2 / (2g) = 16 / 20 = 0.8\\text{ m}$.",
        trap: "Conserving mechanical energy during the plastic collision rather than momentum.",
        time: 60,
      },
      {
        q: "A uniform chain of length $L$ lies on a table with friction coefficient $\\mu_s = 0.25$. What maximum fraction can hang over the edge without slipping?",
        opts: ["$1/5$", "$1/4$", "$1/3$", "$2/5$"],
        ans: "A",
        exp: "Hanging length $y$: $y = \\mu_s(L - y) \\implies y/L = \\mu_s / (1 + \\mu_s) = 0.25 / 1.25 = 1/5$.",
        trap: "Setting the hanging fraction equal to $\\mu_s = 1/4$ without accounting for reduced mass on the table.",
        time: 55,
      },
      {
        q: "A rocket of initial mass $M_0$ burns fuel at rate $\\alpha$ with exhaust velocity $u$. What is its speed at time $t$ in deep space?",
        opts: ["$u \\ln\\left(\\frac{M_0}{M_0 - \\alpha t}\\right)$", "$u \\frac{\\alpha t}{M_0}$", "$u \\ln\\left(\\frac{M_0 - \\alpha t}{M_0}\\right)$", "$\\frac{1}{2} u \\left(\\frac{M_0}{M_0 - \\alpha t}\\right)^2$"],
        ans: "A",
        exp: "Tsiolkovsky equation: $v = u \\ln(M_0 / M(t)) = u \\ln(M_0 / (M_0 - \\alpha t))$.",
        trap: "Assuming rocket acceleration is constant rather than scaling with decreasing mass.",
        time: 50,
      },
      {
        q: "Three blocks of mass $2\\text{ kg}$ each are connected in series on a smooth table. A force of $18\\text{ N}$ pulls the front block. What is the tension between the first and second blocks?",
        opts: ["$3\\text{ N}$", "$6\\text{ N}$", "$12\\text{ N}$", "$18\\text{ N}$"],
        ans: "B",
        exp: "$a = F / (3m) = 18 / 6 = 3\\text{ m/s}^2$. The rear string pulls only the last block: $T = m a = 2 \\times 3 = 6\\text{ N}$.",
        trap: "Confusing rear string tension ($m a = 6\\text{ N}$) with front string tension ($2 m a = 12\\text{ N}$).",
        time: 45,
      },
    ],
  },
};

console.log("Domain data helper initialized.");
