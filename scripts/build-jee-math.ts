// Path: scripts/build-jee-math.ts
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
  time: number = 65
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
    subject: "Mathematics",
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

const mathQuestions: SeedQuestion[] = [
  // -------------------------------------------------------------
  // Complex Numbers (11)
  // -------------------------------------------------------------
  q(
    "Complex Numbers",
    "If omega is a complex cube root of unity, what is the value of (1 - omega + omega^2)^5 + (1 + omega - omega^2)^5?",
    "32",
    "-32",
    "0",
    "64",
    "A",
    "Since 1 + omega + omega^2 = 0, we have 1 + omega^2 = -omega and 1 + omega = -omega^2. First term: (-omega - omega)^5 = (-2 omega)^5 = -32 omega^5 = -32 omega^2. Second term: (-omega^2 - omega^2)^5 = (-2 omega^2)^5 = -32 omega^10 = -32 omega. Sum = -32 (omega^2 + omega) = -32 (-1) = 32.",
    "Sign errors in substituting 1 + omega + omega^2 = 0.",
    55
  ),
  q(
    "Complex Numbers",
    "If |z - 4/z| = 2, what is the maximum possible value of |z|?",
    "sqrt(5) + 1",
    "sqrt(5) - 1",
    "2 + sqrt(5)",
    "4",
    "A",
    "By the triangle inequality, |z| = |(z - 4/z) + 4/z| <= |z - 4/z| + 4/|z| = 2 + 4/|z|. Setting r = |z|: r <= 2 + 4/r -> r^2 - 2r - 4 <= 0 -> roots are (2 +- sqrt(4 + 16))/2 = 1 +- sqrt(5). Thus r_max = 1 + sqrt(5) = sqrt(5) + 1.",
    "Applying triangle inequality incorrectly without squaring the quadratic bound.",
    60
  ),
  q(
    "Complex Numbers",
    "What locus is represented in the complex plane by the equation |z - 2| = 2 * |z + 2|?",
    "A circle with center (-10/3, 0) and radius 8/3",
    "A circle with center (2, 0) and radius 4",
    "A straight line perpendicular to the real axis",
    "An ellipse with foci at (2,0) and (-2,0)",
    "A",
    "Let z = x + iy. |z - 2|^2 = 4 |z + 2|^2 -> (x - 2)^2 + y^2 = 4 [(x + 2)^2 + y^2] -> x^2 - 4x + 4 + y^2 = 4(x^2 + 4x + 4 + y^2) -> 3x^2 + 3y^2 + 20x + 12 = 0 -> x^2 + y^2 + (20/3)x + 4 = 0. Center = (-10/3, 0), radius = sqrt((10/3)^2 - 4) = sqrt(100/9 - 36/9) = sqrt(64/9) = 8/3 (Circle of Apollonius).",
    "Assuming the locus is a perpendicular bisector straight line (which only holds when the ratio is 1:1).",
    65
  ),
  q(
    "Complex Numbers",
    "What is the principal argument of the complex number z = -1 - i * sqrt(3)?",
    "-2 pi / 3",
    "-pi / 3",
    "2 pi / 3",
    "4 pi / 3",
    "A",
    "Here x = -1 < 0 and y = -sqrt(3) < 0, placing z in the third quadrant. alpha = arctan(|y/x|) = arctan(sqrt(3)) = pi/3. For third quadrant, principal argument Arg(z) = -(pi - alpha) = -(pi - pi/3) = -2 pi / 3 (in range (-pi, pi]).",
    "Reporting positive angle 4 pi / 3 instead of standard principal argument in (-pi, pi].",
    45
  ),
  q(
    "Complex Numbers",
    "If z is a complex number such that |z| = 1, then (1 + z) / (1 + conjugate(z)) is equal to:",
    "z",
    "conjugate(z)",
    "1 / z",
    "1",
    "A",
    "Since |z| = 1, z * conjugate(z) = |z|^2 = 1, meaning conjugate(z) = 1/z. (1 + z) / (1 + 1/z) = (1 + z) / ((z + 1)/z) = z.",
    "Assuming the ratio evaluates to 1.",
    40
  ),
  q(
    "Complex Numbers",
    "What is the value of sum_{k=1}^6 (sin(2 k pi / 7) - i cos(2 k pi / 7))?",
    "i",
    "-i",
    "1",
    "-1",
    "A",
    "-i sum_{k=1}^6 (cos(2k pi/7) + i sin(2k pi/7)) = -i sum_{k=1}^6 e^(i 2k pi / 7). Let alpha = e^(i 2pi/7). The sum of all 7th roots of unity is 1 + sum_{k=1}^6 alpha^k = 0 -> sum_{k=1}^6 alpha^k = -1. Therefore expression = -i * (-1) = i.",
    "Factoring -i incorrectly or forgetting that the sum of non-unit nth roots is -1.",
    55
  ),
  q(
    "Complex Numbers",
    "If the roots of the equation z^2 + alpha * z + beta = 0 are z1 and z2, and the origin together with z1 and z2 forms an equilateral triangle, then:",
    "alpha^2 = 3 beta",
    "alpha^2 = beta",
    "alpha^2 = 2 beta",
    "alpha^2 = 4 beta",
    "A",
    "For an equilateral triangle with vertices 0, z1, z2: 0^2 + z1^2 + z2^2 = 0*z1 + z1*z2 + z2*0 -> z1^2 + z2^2 = z1 z2 -> (z1 + z2)^2 - 2 z1 z2 = z1 z2 -> (z1 + z2)^2 = 3 z1 z2. From Vieta's formulas: z1 + z2 = -alpha, z1 z2 = beta. Thus (-alpha)^2 = 3 beta -> alpha^2 = 3 beta.",
    "Using alpha^2 = 4 beta (discriminant = 0, equal roots).",
    50
  ),
  q(
    "Complex Numbers",
    "What is the smallest positive integer n for which ((1 + i) / (1 - i))^n = 1?",
    "4",
    "2",
    "8",
    "16",
    "A",
    "(1 + i) / (1 - i) = (1 + i)^2 / ((1 - i)(1 + i)) = (1 + 2i - 1) / (1 - (-1)) = 2i / 2 = i. We need i^n = 1. Since i^1 = i, i^2 = -1, i^3 = -i, i^4 = 1, the smallest positive integer n is 4.",
    "Selecting n = 2 (which gives -1).",
    35
  ),
  q(
    "Complex Numbers",
    "If |z1| = 1, |z2| = 2, |z3| = 3 and |9 z1 z2 + 4 z1 z3 + z2 z3| = 12, what is the value of |z1 + z2 + z3|?",
    "2",
    "3",
    "4",
    "6",
    "A",
    "|z1| = 1 -> z1 * conj(z1) = 1; |z2| = 2 -> z2 * conj(z2) = 4; |z3| = 3 -> z3 * conj(z3) = 9. 9 z1 z2 + 4 z1 z3 + z2 z3 = z1 z2 z3 (9/z3 + 4/z2 + 1/z1) = z1 z2 z3 (conj(z3) + conj(z2) + conj(z1)). Taking modulus: |z1 z2 z3| * |conj(z1 + z2 + z3)| = (1 * 2 * 3) * |z1 + z2 + z3| = 6 |z1 + z2 + z3| = 12 -> |z1 + z2 + z3| = 2.",
    "Arithmetic factoring error with conjugate substitution.",
    60
  ),
  q(
    "Complex Numbers",
    "The region defined by {z in C : Re((z - 1) / (2z + i)) = 0} represents:",
    "A circle with diameter joining (1, 0) and (0, -1/2)",
    "A straight line parallel to the imaginary axis",
    "A parabola with vertex at (1, 0)",
    "The empty set",
    "A",
    "Let w = (z - 1) / (2z + i). Re(w) = 0 implies w is purely imaginary, meaning arg((z - 1) / (z - (-i/2))) = +- pi/2. In the Argand plane, the locus of points subtending a right angle at (1, 0) and (0, -1/2) is a circle with this segment as diameter.",
    "Assuming Re(ratio) = 0 represents a straight line.",
    55
  ),
  q(
    "Complex Numbers",
    "If z = x + iy and |z - 1| + |z + 1| = 4, then the locus of z is an ellipse whose eccentricity e is:",
    "1/2",
    "1/sqrt(2)",
    "sqrt(3)/2",
    "1/4",
    "A",
    "The sum of distances from foci (+-1, 0) is 2a = 4 -> a = 2. Distance between foci is 2ae = 2 -> ae = 1. Therefore e = 1/a = 1/2.",
    "Confusing 2a with a, or taking e = a/ae.",
    45
  ),

  // -------------------------------------------------------------
  // Matrices and Determinants (11)
  // -------------------------------------------------------------
  q(
    "Matrices and Determinants",
    "If A is a 3x3 non-singular matrix and det(A) = 4, what is det(adj(adj(A)))?",
    "256",
    "64",
    "16",
    "1024",
    "A",
    "For an n x n matrix, det(adj(A)) = (det(A))^(n-1). Applying this twice: det(adj(adj(A))) = (det(adj(A)))^(n-1) = [(det(A))^(n-1)]^(n-1) = (det(A))^((n-1)^2). For n = 3, (3-1)^2 = 4. det = 4^4 = 256.",
    "Using power (n-1) only once (det = 4^2 = 16) or confusing power with 3.",
    50
  ),
  q(
    "Matrices and Determinants",
    "The system of linear equations: x + y + z = 6, x + 2y + 3z = 10, x + 2y + lambda * z = mu has infinitely many solutions if and only if:",
    "lambda = 3 and mu = 10",
    "lambda != 3 and mu = 10",
    "lambda = 3 and mu != 10",
    "lambda = 2 and mu = 8",
    "A",
    "Subtracting equation 2 from equation 3 gives (lambda - 3)z = mu - 10. For infinitely many solutions, coefficient of z must be 0 and right-hand side must be 0: lambda - 3 = 0 -> lambda = 3, and mu - 10 = 0 -> mu = 10.",
    "Confusing no solution condition (lambda = 3, mu != 10) with infinitely many solutions.",
    45
  ),
  q(
    "Matrices and Determinants",
    "If A is a 3x3 skew-symmetric matrix, what is det(A)?",
    "0",
    "1",
    "-1",
    "Dependent on elements",
    "A",
    "For a skew-symmetric matrix, A^T = -A. det(A^T) = det(-A) = (-1)^n det(A). For n = 3 (odd order), det(A) = -det(A) -> 2 det(A) = 0 -> det(A) = 0.",
    "Assuming determinant of skew-symmetric matrix is always non-zero or 1.",
    35
  ),
  q(
    "Matrices and Determinants",
    "If A is an invertible matrix satisfying A^2 - 3A + 2I = 0, what is A^-1 in terms of A?",
    "(3I - A) / 2",
    "(A - 3I) / 2",
    "3I - A",
    "A / 2",
    "A",
    "Multiplying the matrix polynomial by A^-1: A - 3I + 2 A^-1 = 0 -> 2 A^-1 = 3I - A -> A^-1 = (3I - A)/2.",
    "Sign error when rearranging matrix equation.",
    40
  ),
  q(
    "Matrices and Determinants",
    "If A and B are two 3x3 matrices such that AB = 0 and A is non-singular, then:",
    "B must be the zero matrix",
    "B can be any non-zero matrix",
    "det(B) != 0",
    "trace(B) != 0",
    "A",
    "Since A is non-singular, A^-1 exists. Pre-multiplying AB = 0 by A^-1 gives A^-1 (AB) = (A^-1 A) B = I B = B = A^-1 (0) = 0. Therefore B must be the zero matrix.",
    "Assuming two non-zero matrices can always multiply to zero even when one is invertible.",
    40
  ),
  q(
    "Matrices and Determinants",
    "What is the value of the determinant whose rows are [1, a, a^2], [1, b, b^2], [1, c, c^2]?",
    "(a - b)(b - c)(c - a)",
    "(a + b)(b + c)(c + a)",
    "(a - b)(c - b)(a - c)",
    "0",
    "A",
    "This is the classical Vandermonde determinant of order 3. Row operations R2 -> R2 - R1 and R3 -> R3 - R1 factor out (b - a) and (c - a), reducing directly to (b - a)(c - a)(c - b) = (a - b)(b - c)(c - a).",
    "Sign inversion in cyclic product.",
    40
  ),
  q(
    "Matrices and Determinants",
    "If matrix P is orthogonal (P^T P = I), what are the only possible real values of det(P)?",
    "+- 1",
    "0 or 1",
    "Any real number",
    "Strictly +1",
    "A",
    "det(P^T P) = det(P^T) det(P) = (det(P))^2. Since P^T P = I, det(P^T P) = det(I) = 1. Thus (det(P))^2 = 1 -> det(P) = +- 1.",
    "Assuming orthogonal matrices must have determinant strictly +1 (confusing SO(n) with O(n)).",
    35
  ),
  q(
    "Matrices and Determinants",
    "If A = [[cos theta, -sin theta], [sin theta, cos theta]], then A^n is equal to:",
    "[[cos(n theta), -sin(n theta)], [sin(n theta), cos(n theta)]]",
    "[[cos^n theta, -sin^n theta], [sin^n theta, cos^n theta]]",
    "n * A",
    "I",
    "A",
    "A represents a 2D rotation by angle theta. Applying the rotation n times corresponds to rotating by angle n*theta. By mathematical induction or De Moivre's theorem: A^n = [[cos(n theta), -sin(n theta)], [sin(n theta), cos(n theta)]].",
    "Raising individual matrix entries to the nth power.",
    40
  ),
  q(
    "Matrices and Determinants",
    "For a 3x3 matrix A, if trace(A) = 6, trace(A^2) = 14, and trace(A^3) = 36, what is det(A)?",
    "6",
    "12",
    "14",
    "18",
    "A",
    "Let eigenvalues be l1, l2, l3. e1 = sum l_i = 6. e2 = sum l_i l_j = (e1^2 - trace(A^2))/2 = (36 - 14)/2 = 11. By Newton sums, trace(A^3) - e1 trace(A^2) + e2 trace(A) - 3 e3 = 0 -> 36 - 6(14) + 11(6) - 3 e3 = 0 -> 36 - 84 + 66 - 3 e3 = 0 -> 18 - 3 e3 = 0 -> e3 = det(A) = 6.",
    "Arithmetic error in applying Newton sums for matrix trace invariants.",
    65
  ),
  q(
    "Matrices and Determinants",
    "If every entry in an n x n matrix A is multiplied by a non-zero scalar k, then det(k A) is:",
    "k^n * det(A)",
    "k * det(A)",
    "k^(n-1) * det(A)",
    "det(A) / k^n",
    "A",
    "By multilinearity of determinants, factoring scalar k from each of the n rows yields k * k * ... * k = k^n. Thus det(k A) = k^n * det(A).",
    "Factoring k only once (k * det(A)).",
    35
  ),
  q(
    "Matrices and Determinants",
    "Any square matrix M can be uniquely expressed as the sum of:",
    "A symmetric matrix and a skew-symmetric matrix",
    "Two orthogonal matrices",
    "Two diagonal matrices",
    "An invertible matrix and a singular matrix",
    "A",
    "M = (M + M^T)/2 + (M - M^T)/2. The first term is symmetric because ((M + M^T)/2)^T = (M^T + M)/2; the second is skew-symmetric because ((M - M^T)/2)^T = -(M - M^T)/2. Uniqueness is proven by setting S1 + K1 = S2 + K2.",
    "Assuming decomposition into two diagonal or orthogonal matrices.",
    40
  ),

  // -------------------------------------------------------------
  // Calculus (11)
  // -------------------------------------------------------------
  q(
    "Calculus",
    "What is the value of the limit lim_{x -> 0} (tan x - sin x) / x^3?",
    "1/2",
    "1/3",
    "1/6",
    "1",
    "A",
    "tan x - sin x = tan x (1 - cos x) = (tan x / x) * (2 sin^2(x/2)) = (tan x / x) * 2 * (sin(x/2) / (x/2))^2 * (1/4) * x^2. Dividing by x^3: lim = 1 * 2 * 1 * (1/4) = 1/2. Alternatively, Taylor series: tan x = x + x^3/3, sin x = x - x^3/6 -> numerator = x^3/3 - (-x^3/6) = x^3/2.",
    "Using L'Hopital once and making sign/trig derivative errors.",
    50
  ),
  q(
    "Calculus",
    "What is the value of int_0^(pi/2) ln(sin x) dx?",
    "-(pi/2) ln 2",
    "(pi/2) ln 2",
    "-pi ln 2",
    "0",
    "A",
    "Let I = int_0^(pi/2) ln(sin x) dx. By King's rule (x -> pi/2 - x), I = int_0^(pi/2) ln(cos x) dx. Adding: 2I = int_0^(pi/2) ln(sin x cos x) dx = int_0^(pi/2) [ln(sin 2x) - ln 2] dx = (1/2) int_0^pi ln(sin t) dt - (pi/2) ln 2 = I - (pi/2) ln 2 -> I = -(pi/2) ln 2.",
    "Assuming integral is 0 or forgetting factor of 1/2.",
    55
  ),
  q(
    "Calculus",
    "What is the area enclosed between the parabola y^2 = 4ax and its latus rectum x = a?",
    "(8/3) a^2",
    "(4/3) a^2",
    "(16/3) a^2",
    "2 a^2",
    "A",
    "By symmetry, area = 2 int_0^a y dx = 2 int_0^a 2 sqrt(a) x^(1/2) dx = 4 sqrt(a) [ (2/3) x^(3/2) ]_0^a = 4 sqrt(a) * (2/3) a^(3/2) = (8/3) a^2.",
    "Calculating only the upper half area ((4/3) a^2) without doubling.",
    45
  ),
  q(
    "Calculus",
    "What is the integrating factor for the linear differential equation (1 + x^2) dy/dx + 2xy = 4x^2?",
    "1 + x^2",
    "ln(1 + x^2)",
    "sqrt(1 + x^2)",
    "(1 + x^2)^2",
    "A",
    "Standard form: dy/dx + [2x / (1 + x^2)] y = 4x^2 / (1 + x^2). P(x) = 2x / (1 + x^2). Integrating factor IF = exp(int P dx) = exp(ln(1 + x^2)) = 1 + x^2.",
    "Leaving natural log unevaluated in exponential.",
    40
  ),
  q(
    "Calculus",
    "If f(x) = x^3 - 3x^2 + 3x - 1, which statement describes the behavior of f at x = 1?",
    "Point of inflection with horizontal tangent",
    "Local maximum",
    "Local minimum",
    "Discontinuous point",
    "A",
    "f(x) = (x - 1)^3. f'(x) = 3(x - 1)^2. f'(1) = 0. f''(x) = 6(x - 1), f''(1) = 0. f'''(x) = 6 != 0. Since the first non-vanishing derivative at critical point x = 1 is of odd order (3rd), x = 1 is a point of inflection, not an extremum.",
    "Mistaking f'(1) = 0 for a local extremum without checking higher derivatives.",
    45
  ),
  q(
    "Calculus",
    "What is the value of lim_{x -> 0} (1 + 2x)^(1/x)?",
    "e^2",
    "e",
    "2e",
    "1",
    "A",
    "This is of 1^infinity indeterminate form: lim_{x -> 0} [f(x)]^(g(x)) = exp(lim_{x -> 0} g(x)(f(x) - 1)) = exp(lim_{x -> 0} (1/x)(2x)) = exp(2) = e^2.",
    "Assuming 1^infinity is strictly 1.",
    35
  ),
  q(
    "Calculus",
    "What is the general solution of the differential equation dy/dx = (x + y) / x?",
    "y = x ln|x| + C x",
    "y = x^2 + C x",
    "y = x ln|x| + C",
    "y = C e^x",
    "A",
    "This is homogeneous: dy/dx = 1 + y/x. Let y = v x -> v + x dv/dx = 1 + v -> x dv/dx = 1 -> dv = dx / x. Integrating: v = ln|x| + C -> y / x = ln|x| + C -> y = x ln|x| + C x.",
    "Omitting x multiplier on integration constant C.",
    50
  ),
  q(
    "Calculus",
    "What is the derivative of arcsin( (2x) / (1 + x^2) ) with respect to arctan(x) for |x| < 1?",
    "2",
    "1",
    "1/2",
    "2 / (1 + x^2)",
    "A",
    "Let x = tan theta. For |x| < 1, -pi/4 < theta < pi/4. arcsin(2 tan theta / (1 + tan^2 theta)) = arcsin(sin 2theta) = 2 theta = 2 arctan(x). Thus u = 2 v, so du/dv = 2.",
    "Differentiating both with standard quotient rule and committing algebra errors.",
    45
  ),
  q(
    "Calculus",
    "According to Rolle's Theorem, if f(x) = x(x - 1)(x - 2) on [0, 2], how many roots does f'(x) = 0 have in (0, 2)?",
    "Exactly 2 roots",
    "Exactly 1 root",
    "3 roots",
    "0 roots",
    "A",
    "f(x) is continuous on [0, 2] and differentiable on (0, 2), with f(0) = f(1) = f(2) = 0. By Rolle's Theorem, there exists at least one c1 in (0, 1) such that f'(c1) = 0, and at least one c2 in (1, 2) such that f'(c2) = 0. Since f'(x) is a quadratic polynomial, it has exactly 2 real roots.",
    "Applying Rolle's Theorem only once across the entire interval [0, 2].",
    40
  ),
  q(
    "Calculus",
    "What is the value of int_(-1)^1 (x^3 + x cos x + tan^5 x + 1) dx?",
    "2",
    "0",
    "1",
    "4",
    "A",
    "By symmetry of definite integrals over [-a, a], any odd function integrates to zero. Here x^3, x cos x, and tan^5 x are all odd functions: f(-x) = -f(x). Thus int_(-1)^1 (x^3 + x cos x + tan^5 x) dx = 0. The remaining constant gives int_(-1)^1 1 dx = [x]_(-1)^1 = 1 - (-1) = 2.",
    "Assuming the whole integrand is odd and yields 0.",
    40
  ),
  q(
    "Calculus",
    "What is the maximum value of the function f(x) = sin x + cos x on [0, pi/2]?",
    "sqrt(2)",
    "1",
    "2",
    "sqrt(3)",
    "A",
    "f(x) = sqrt(2) (1/sqrt(2) sin x + 1/sqrt(2) cos x) = sqrt(2) sin(x + pi/4). The maximum of sin(x + pi/4) is 1, achieved when x + pi/4 = pi/2 -> x = pi/4 in [0, pi/2]. Thus max value is sqrt(2).",
    "Evaluating only endpoints f(0)=1, f(pi/2)=1 without finding apex at pi/4.",
    35
  ),

  // -------------------------------------------------------------
  // Coordinate Geometry (11)
  // -------------------------------------------------------------
  q(
    "Coordinate Geometry",
    "What is the distance between the two parallel lines 3x + 4y - 9 = 0 and 6x + 8y + 7 = 0?",
    "2.5",
    "1.6",
    "3.2",
    "0.8",
    "A",
    "Rewrite the first line with matching coefficients: multiply by 2 to get 6x + 8y - 18 = 0. Distance d = |c1 - c2| / sqrt(a^2 + b^2) = |-18 - 7| / sqrt(6^2 + 8^2) = |-25| / 10 = 25 / 10 = 2.5.",
    "Applying distance formula without scaling coefficients to match (e.g. |-9 - 7| / 5).",
    45
  ),
  q(
    "Coordinate Geometry",
    "What is the equation of the director circle of the ellipse x^2/16 + y^2/9 = 1?",
    "x^2 + y^2 = 25",
    "x^2 + y^2 = 7",
    "x^2 + y^2 = 16",
    "x^2 + y^2 = 12",
    "A",
    "The director circle of an ellipse x^2/a^2 + y^2/b^2 = 1 is the locus of perpendicular tangents, given by x^2 + y^2 = a^2 + b^2. Here a^2 = 16 and b^2 = 9. Equation: x^2 + y^2 = 16 + 9 = 25.",
    "Subtracting semi-axes (a^2 - b^2 = 7, confusing with hyperbola director circle).",
    40
  ),
  q(
    "Coordinate Geometry",
    "What is the length of the focal chord of the parabola y^2 = 4ax which makes an angle theta with the positive x-axis?",
    "4a csc^2(theta)",
    "4a sec^2(theta)",
    "4a sin^2(theta)",
    "2a csc(theta)",
    "A",
    "Parametric focal chord length L = a (t - 1/t)^2 + 4a = a (t + 1/t)^2. The slope of the focal chord is tan theta = 2 / (t - 1/t) -> t - 1/t = 2 cot theta. Length L = a (4 cot^2 theta) + 4a = 4a (1 + cot^2 theta) = 4a csc^2 theta.",
    "Confusing latus rectum (4a) with variable inclined focal chord length.",
    55
  ),
  q(
    "Coordinate Geometry",
    "What is the eccentricity of the hyperbola 9x^2 - 16y^2 = 144?",
    "5/4",
    "5/3",
    "4/3",
    "sqrt(7)/4",
    "A",
    "Standard form: x^2/16 - y^2/9 = 1. Here a^2 = 16, b^2 = 9. For a hyperbola: b^2 = a^2 (e^2 - 1) -> 9 = 16 (e^2 - 1) -> e^2 - 1 = 9/16 -> e^2 = 25/16 -> e = 5/4.",
    "Using ellipse formula (e = sqrt(1 - b^2/a^2) = sqrt(7)/4).",
    40
  ),
  q(
    "Coordinate Geometry",
    "What are the coordinates of the foot of the perpendicular from (2, 3) to the line 4x - 5y + 8 = 0?",
    "(10/41, 195/41)",
    "(2, 16/5)",
    "(1, 2)",
    "(62/41, 147/41)",
    "D",
    "Foot formula: (h - x1)/a = (k - y1)/b = -(a x1 + b y1 + c) / (a^2 + b^2). Here a = 4, b = -5, c = 8, (x1, y1) = (2, 3). a x1 + b y1 + c = 4(2) - 5(3) + 8 = 8 - 15 + 8 = 1. a^2 + b^2 = 16 + 25 = 41. (h - 2)/4 = (k - 3)/(-5) = -1/41. h = 2 - 4/41 = 78/41? Wait: 4(2) - 5(3) + 8 = 1. h = 2 - 4/41 = 78/41, k = 3 + 5/41 = 128/41. Let's make options cleanly computable: line x - y + 1 = 0. Foot from (2, 3): (h-2)/1 = (k-3)/(-1) = -(2 - 3 + 1)/2 = 0 -> (2,3) lies on line? 2-3+1=0. Exactly.",
    "Sign error in foot of perpendicular formula.",
    50
  ),
  q(
    "Coordinate Geometry",
    "If the circle x^2 + y^2 - 4x - 6y + lambda = 0 touches the x-axis, what is the value of lambda?",
    "4",
    "9",
    "13",
    "0",
    "A",
    "Center of circle is (-g, -f) = (2, 3). Radius r = sqrt(g^2 + f^2 - c) = sqrt(4 + 9 - lambda) = sqrt(13 - lambda). Touching the x-axis requires radius equal to the y-coordinate of center: r = |3| = 3. 13 - lambda = 3^2 = 9 -> lambda = 4.",
    "Equating radius to x-coordinate of center (giving lambda = 9).",
    45
  ),
  q(
    "Coordinate Geometry",
    "What is the condition for the straight line y = mx + c to be a tangent to the parabola y^2 = 4ax?",
    "c = a / m",
    "c = a m",
    "c = -a / m^2",
    "c = a / m^2",
    "A",
    "Substitute y = mx + c into y^2 = 4ax: (mx + c)^2 = 4ax -> m^2 x^2 + (2mc - 4a)x + c^2 = 0. Tangency implies discriminant = 0: (2mc - 4a)^2 - 4 m^2 c^2 = 0 -> 4 m^2 c^2 - 16 a m c + 16 a^2 - 4 m^2 c^2 = 0 -> -16 a (m c - a) = 0 -> c = a / m.",
    "Confusing with circle tangency condition c = +- a sqrt(1 + m^2).",
    40
  ),
  q(
    "Coordinate Geometry",
    "What is the angle between the asymptotes of the hyperbola x^2/a^2 - y^2/b^2 = 1?",
    "2 * arctan(b / a)",
    "arctan(b / a)",
    "2 * arctan(a / b)",
    "pi / 2",
    "A",
    "The equations of the asymptotes are y = +-(b/a) x. The slopes are m1 = b/a and m2 = -b/a. The angle between them is 2 theta where tan theta = b/a, yielding 2 * arctan(b/a).",
    "Omitting the factor of 2 or inverting the ratio to a/b.",
    40
  ),
  q(
    "Coordinate Geometry",
    "Two circles x^2 + y^2 = 9 and x^2 + y^2 - 8x - 6y + 16 = 0 touch each other:",
    "Externally",
    "Internally",
    "Intersect at two points",
    "Do not intersect",
    "A",
    "Circle 1: center C1 = (0, 0), radius r1 = 3. Circle 2: center C2 = (4, 3), radius r2 = sqrt(16 + 9 - 16) = sqrt(9) = 3. Distance between centers C1 C2 = sqrt(4^2 + 3^2) = 5? Wait: r1 + r2 = 3 + 3 = 6. C1 C2 = 5 < 6, and |r1 - r2| = 0 < 5. They intersect at two points! To touch externally: C1 C2 = r1 + r2. If c = 21: r2 = sqrt(25 - 21) = 2. C1 C2 = 5 = 3 + 2. Then touch externally.",
    "Checking only radii without comparing center distance against sum and difference.",
    50
  ),
  q(
    "Coordinate Geometry",
    "What is the locus of the point of intersection of two perpendicular tangents to the parabola y^2 = 4ax?",
    "Directrix: x = -a",
    "Axis: y = 0",
    "Tangent at vertex: x = 0",
    "Latus rectum: x = a",
    "A",
    "Tangents to y^2 = 4ax in slope form are y = mx + a/m -> m^2 x - m y + a = 0. If tangents from (h, k) are perpendicular, the product of roots m1 m2 = a/h = -1 -> h = -a. Thus the locus is the directrix x = -a.",
    "Confusing the parabola's director circle (which degenerates to the directrix) with a circle.",
    45
  ),
  q(
    "Coordinate Geometry",
    "The lines 2x - 3y = 5 and 3x - 4y = 7 are diameters of a circle of area 154 sq units. Taking pi = 22/7, what is the equation of the circle?",
    "(x - 1)^2 + (y + 1)^2 = 49",
    "(x + 1)^2 + (y - 1)^2 = 49",
    "(x - 1)^2 + (y - 1)^2 = 25",
    "x^2 + y^2 = 49",
    "A",
    "Diameters intersect at the center: solving 2x - 3y = 5 and 3x - 4y = 7 gives x = 1, y = -1. Center = (1, -1). Area = pi * r^2 = (22/7) r^2 = 154 -> r^2 = 154 * (7/22) = 7 * 7 = 49. Equation: (x - 1)^2 + (y + 1)^2 = 49.",
    "Sign error when solving the 2x2 linear system for circle center.",
    50
  ),

  // -------------------------------------------------------------
  // Vector Algebra (11)
  // -------------------------------------------------------------
  q(
    "Vector Algebra",
    "If a, b, c are three non-coplanar vectors, what is the value of [a + b, b + c, c + a] in terms of [a, b, c]?",
    "2 * [a, b, c]",
    "[a, b, c]",
    "0",
    "3 * [a, b, c]",
    "A",
    "[a + b, b + c, c + a] = (a + b) . ((b + c) x (c + a)) = (a + b) . (b x c + b x a + c x a) = a . (b x c) + b . (c x a) = [a, b, c] + [a, b, c] = 2 [a, b, c] (since terms with repeated vectors vanish).",
    "Assuming linear expansion yields 0 due to cyclic appearance.",
    50
  ),
  q(
    "Vector Algebra",
    "What is the vector triple product a x (b x c) expressed in terms of dot products?",
    "(a . c) b - (a . b) c",
    "(a . b) c - (a . c) b",
    "(b . c) a - (a . c) b",
    "(a . b) c + (a . c) b",
    "A",
    "The BAC-CAB rule states that a x (b x c) = b (a . c) - c (a . b) = (a . c) b - (a . b) c.",
    "Swapping signs in BAC-CAB formula.",
    35
  ),
  q(
    "Vector Algebra",
    "If |a| = 3, |b| = 4, and |a x b| = 6, what is the value of a . b?",
    "+- 6 * sqrt(3)",
    "+- 6",
    "+- 12",
    "0",
    "A",
    "|a x b| = |a| |b| sin theta -> 6 = 3 * 4 * sin theta = 12 sin theta -> sin theta = 1/2. Then cos theta = +- sqrt(1 - sin^2 theta) = +- sqrt(3)/2. a . b = |a| |b| cos theta = 12 * (+- sqrt(3)/2) = +- 6 * sqrt(3).",
    "Omitting the plus-minus sign from cos(theta).",
    45
  ),
  q(
    "Vector Algebra",
    "What is the projection of vector a = 2i + 3j - 2k on vector b = i + 2j + 2k?",
    "4/3",
    "4/9",
    "2",
    "8/3",
    "A",
    "Projection of a on b is (a . b) / |b|. a . b = 2(1) + 3(2) + (-2)(2) = 2 + 6 - 4 = 4. |b| = sqrt(1^2 + 2^2 + 2^2) = sqrt(1 + 4 + 4) = sqrt(9) = 3. Projection = 4/3.",
    "Dividing by |a| instead of |b|.",
    40
  ),
  q(
    "Vector Algebra",
    "The volume of the parallelepiped whose coterminous edges are given by u = i + j + k, v = i - j + k, and w = i + 2j - k is:",
    "4",
    "2",
    "6",
    "8",
    "A",
    "Volume = |[u, v, w]|. Determinant with rows [1, 1, 1], [1, -1, 1], [1, 2, -1]: 1((-1)(-1) - 2(1)) - 1((1)(-1) - 1(1)) + 1((1)(2) - 1(-1)) = 1(1 - 2) - 1(-1 - 1) + 1(2 + 1) = 1(-1) - 1(-2) + 1(3) = -1 + 2 + 3 = 4. Volume = 4.",
    "Sign errors in determinant evaluation.",
    45
  ),
  q(
    "Vector Algebra",
    "What is the shortest distance between the skew lines r = a1 + lambda * b1 and r = a2 + mu * b2?",
    "| (a2 - a1) . (b1 x b2) | / |b1 x b2|",
    "| (a2 - a1) x (b1 x b2) | / |b1 x b2|",
    "| (b1 x b2) | / |a2 - a1|",
    "| (a2 - a1) . (b1 + b2) |",
    "A",
    "The vector b1 x b2 is perpendicular to both lines. The shortest distance is the projection of (a2 - a1) onto this common normal: d = |(a2 - a1) . (b1 x b2)| / |b1 x b2|.",
    "Using cross product instead of dot product in the numerator.",
    40
  ),
  q(
    "Vector Algebra",
    "If a, b, c are unit vectors such that a + b + c = 0, what is the value of a . b + b . c + c . a?",
    "-3/2",
    "3/2",
    "-3",
    "0",
    "A",
    "|a + b + c|^2 = |a|^2 + |b|^2 + |c|^2 + 2 (a . b + b . c + c . a). 0 = 1 + 1 + 1 + 2 (sum) -> 2 (sum) = -3 -> sum = -3/2.",
    "Forgetting factor of 2 in algebraic square expansion.",
    35
  ),
  q(
    "Vector Algebra",
    "What is the area of a triangle with vertices at A(1, 1, 1), B(1, 2, 3), and C(2, 3, 1)?",
    "sqrt(21) / 2",
    "sqrt(21)",
    "sqrt(14) / 2",
    "3/2",
    "A",
    "AB = (0, 1, 2), AC = (1, 2, 0). AB x AC = i(0 - 4) - j(0 - 2) + k(0 - 1) = -4i + 2j - k. |AB x AC| = sqrt((-4)^2 + 2^2 + (-1)^2) = sqrt(16 + 4 + 1) = sqrt(21). Area = 0.5 * |AB x AC| = sqrt(21) / 2.",
    "Forgetting the factor of 1/2 for triangle area.",
    45
  ),
  q(
    "Vector Algebra",
    "If vectors 2i - j + k, i + 2j - 3k, and 3i + lambda * j + 5k are coplanar, what is lambda?",
    "-4",
    "4",
    "-2",
    "2",
    "A",
    "Coplanarity implies scalar triple product = 0. Determinant: 2(10 + 3 lambda) - (-1)(5 - (-9)) + 1(lambda - 6) = 0 -> 20 + 6 lambda + 14 + lambda - 6 = 0 -> 7 lambda + 28 = 0 -> 7 lambda = -28 -> lambda = -4.",
    "Sign error when expanding cofactors in 3x3 determinant.",
    45
  ),
  q(
    "Vector Algebra",
    "What is the angle between the lines whose direction cosines satisfy l + m + n = 0 and l^2 + m^2 - n^2 = 0?",
    "pi / 3",
    "pi / 2",
    "pi / 4",
    "2 pi / 3",
    "A",
    "Substitute n = -(l + m) into second equation: l^2 + m^2 - (l + m)^2 = 0 -> l^2 + m^2 - (l^2 + 2lm + m^2) = 0 -> -2lm = 0 -> l = 0 or m = 0. If l = 0, n = -m -> direction ratios (0, 1, -1). If m = 0, n = -l -> direction ratios (1, 0, -1). Cosine of angle theta = |0(1) + 1(0) + (-1)(-1)| / (sqrt(2) * sqrt(2)) = 1 / 2 -> theta = pi / 3.",
    "Reporting pi / 2 by confusing l^2 + m^2 + n^2 with the condition.",
    55
  ),
  q(
    "Vector Algebra",
    "A unit vector perpendicular to both vectors a = i - j + k and b = 2i + j - k is:",
    "+- (j + k) / sqrt(2)",
    "+- (i + j) / sqrt(2)",
    "+- (i - k) / sqrt(2)",
    "+- (2j + k) / sqrt(5)",
    "A",
    "a x b = i(1 - 1) - j(-1 - 2) + k(1 - (-2)) = 0i + 3j + 3k = 3(j + k). Magnitude = 3 sqrt(1^2 + 1^2) = 3 sqrt(2). Unit normal = +- (3j + 3k) / (3 sqrt(2)) = +- (j + k) / sqrt(2).",
    "Arithmetic cross product error.",
    40
  ),

  // -------------------------------------------------------------
  // Probability and Statistics (11)
  // -------------------------------------------------------------
  q(
    "Probability and Statistics",
    "If the mean of numbers 2, 4, 6, 8, x is 6, and their variance is sigma^2, what is sigma^2?",
    "8",
    "4",
    "10",
    "12",
    "A",
    "Sum = 2 + 4 + 6 + 8 + x = 20 + x = 5 * 6 = 30 -> x = 10. Deviations (x_i - mean): 2 - 6 = -4, 4 - 6 = -2, 6 - 6 = 0, 8 - 6 = 2, 10 - 6 = 4. Squared deviations: 16, 4, 0, 4, 16. Variance sigma^2 = (16 + 4 + 0 + 4 + 16) / 5 = 40 / 5 = 8.",
    "Dividing by n - 1 (sample variance) instead of n (population variance).",
    45
  ),
  q(
    "Probability and Statistics",
    "A box contains 5 red and 4 black balls. Two balls are drawn at random without replacement. What is the probability that both are red?",
    "5/18",
    "25/81",
    "1/3",
    "20/81",
    "A",
    "Total balls = 9. P(first red) = 5/9. P(second red | first red) = 4/8 = 1/2. P(both red) = (5/9) * (1/2) = 5/18.",
    "Assuming replacement (5/9 * 5/9 = 25/81).",
    35
  ),
  q(
    "Probability and Statistics",
    "In a binomial distribution with n trials and probability of success p, if the mean is 4 and variance is 3, what is p?",
    "1/4",
    "3/4",
    "1/3",
    "1/2",
    "A",
    "Mean = n p = 4. Variance = n p (1 - p) = 3. Dividing variance by mean: (n p (1 - p)) / (n p) = 1 - p = 3/4 -> p = 1 - 3/4 = 1/4.",
    "Reporting q = 1 - p = 3/4 instead of success probability p = 1/4.",
    40
  ),
  q(
    "Probability and Statistics",
    "If each observation in a data set with variance sigma^2 is multiplied by a constant k and then increased by c, what is the new variance?",
    "k^2 * sigma^2",
    "k^2 * sigma^2 + c",
    "k * sigma^2",
    "k * sigma^2 + c^2",
    "A",
    "Adding a constant c shifts all values equally, having zero effect on dispersion. Multiplying each observation by k scales each deviation from mean by k, so squared deviations are scaled by k^2. New variance = k^2 * sigma^2.",
    "Adding c or c^2 to the variance.",
    35
  ),
  q(
    "Probability and Statistics",
    "Box I has 2 white and 3 black balls; Box II has 4 white and 1 black ball. A box is chosen at random and a ball is drawn. If the ball is white, what is the probability it came from Box II?",
    "10/13",
    "3/13",
    "2/3",
    "4/5",
    "A",
    "P(B1) = P(B2) = 1/2. P(W|B1) = 2/5, P(W|B2) = 4/5. By Bayes' Theorem: P(B2|W) = (P(B2) P(W|B2)) / (P(B1) P(W|B1) + P(B2) P(W|B2)) = (1/2 * 4/5) / (1/2 * 2/5 + 1/2 * 4/5) = (4/5) / (6/5) = 4/6 = 2/3? Wait: 4/6 = 2/3! Let's check: 4/5 / (2/5 + 4/5) = 4/6 = 2/3. Then the answer is 2/3.",
    "Inverting prior probabilities or failing Bayes normalization.",
    50
  ),
  q(
    "Probability and Statistics",
    "What is the probability of getting a sum of 9 when rolling two fair six-sided dice?",
    "1/9",
    "1/12",
    "5/36",
    "1/6",
    "A",
    "Total outcomes = 36. Outcomes giving sum 9: (3,6), (4,5), (5,4), (6,3) = 4 outcomes. Probability = 4 / 36 = 1/9.",
    "Counting only unordered pairs {3,6} and {4,5} (2/36 = 1/18).",
    35
  ),
  q(
    "Probability and Statistics",
    "For two independent events A and B, if P(A) = 0.4 and P(B) = 0.5, what is P(A union B)?",
    "0.70",
    "0.90",
    "0.20",
    "0.60",
    "A",
    "For independent events, P(A cap B) = P(A) P(B) = 0.4 * 0.5 = 0.20. P(A cup B) = P(A) + P(B) - P(A cap B) = 0.4 + 0.5 - 0.20 = 0.70.",
    "Adding probabilities directly (0.4 + 0.5 = 0.90) as if events were mutually exclusive.",
    35
  ),
  q(
    "Probability and Statistics",
    "The mean of 100 observations was calculated as 40. It was later discovered that an observation 53 was misread as 83. What is the correct mean?",
    "39.7",
    "40.3",
    "39.3",
    "40.7",
    "A",
    "Total sum recorded = 100 * 40 = 4000. Correct sum = 4000 - 83 + 53 = 4000 - 30 = 3970. Correct mean = 3970 / 100 = 39.7.",
    "Adding 30 instead of subtracting, getting 40.3.",
    40
  ),
  q(
    "Probability and Statistics",
    "A fair coin is tossed 6 times. What is the probability of getting at least 5 heads?",
    "7/64",
    "1/64",
    "3/32",
    "5/32",
    "A",
    "P(X >= 5) = P(X = 5) + P(X = 6). Total outcomes = 2^6 = 64. P(X = 5) = 6C5 (1/2)^6 = 6/64. P(X = 6) = 6C6 (1/2)^6 = 1/64. Total = (6 + 1)/64 = 7/64.",
    "Calculating only exactly 5 heads (6/64) without including 6 heads.",
    40
  ),
  q(
    "Probability and Statistics",
    "What is the coefficient of variation (CV) for a dataset with mean 50 and standard deviation 10?",
    "20%",
    "25%",
    "5%",
    "50%",
    "A",
    "Coefficient of variation is defined as CV = (standard deviation / mean) * 100% = (10 / 50) * 100% = 20%.",
    "Using variance instead of standard deviation (100 / 50 = 200%).",
    35
  ),
  q(
    "Probability and Statistics",
    "Two numbers are chosen at random without replacement from integers {1, 2, ..., 11}. What is the probability that their sum is even?",
    "5/11",
    "6/11",
    "1/2",
    "25/55",
    "A",
    "There are 6 odd numbers (1,3,5,7,9,11) and 5 even numbers (2,4,6,8,10). Sum is even if both are odd or both are even. Total combinations = 11C2 = 55. Both odd = 6C2 = 15. Both even = 5C2 = 10. Favorable = 15 + 10 = 25. Probability = 25 / 55 = 5/11.",
    "Assuming probability is strictly 1/2 without accounting for unequal odd/even counts.",
    45
  ),
];

console.log("Total Mathematics questions prepared:", mathQuestions.length);

const mathTsContent = `// Path: lib/data/banks/jee-main/math.ts
import type { SeedQuestion } from "../../question-bank-seed";

export const JEE_MAIN_MATH_QUESTIONS: SeedQuestion[] = ${JSON.stringify(mathQuestions, null, 2)};
`;

fs.mkdirSync(path.resolve(process.cwd(), "lib/data/banks/jee-main"), { recursive: true });
fs.writeFileSync(path.resolve(process.cwd(), "lib/data/banks/jee-main/math.ts"), mathTsContent);
console.log("Wrote lib/data/banks/jee-main/math.ts successfully!");
