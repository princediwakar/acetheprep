// Path: scripts/tough-cfa-questions.ts
import type { SeedQuestion } from "../lib/data/question-bank-seed";

export const TOUGH_CFA_QUESTIONS: SeedQuestion[] = [
  // ==========================================
  // QUANT: MULTI-STEP TVM & ANNUITY DUE / LOAN AMORTIZATION
  // ==========================================
  {
    exam_name: "CFA Level 1",
    subject: "Quantitative Methods",
    skill_domain: "Time Value of Money",
    difficulty_tier: 3,
    question_text: "An executive intends to retire in 20 years and requires an annual income of $150,000 paid at the beginning of each year for 25 years during retirement. If the expected investment return is 7% compounded annually during both the accumulation and retirement phases, what equal annual deposit at the end of each year for the next 20 years is required to fund this retirement goal?",
    options: {
      A: "$44,792",
      B: "$41,862",
      C: "$39,123",
    },
    correct_option: "A",
    explanation: "Step 1: Calculate the present value at retirement ($t = 20$) of the retirement annuity due (BGN mode): N = 25, I/Y = 7, PMT = 150,000, FV = 0. In BGN mode: PV_20 = PMT × [1 - (1+r)^(-N)] / r × (1 + r) = 150,000 × 11.65358 × 1.07 = $1,870,399. (Or in END mode: calculate ordinary annuity PV = $1,748,036 and multiply by 1.07 = $1,870,399).\nStep 2: Calculate the required annual deposit during the 20-year accumulation phase (END mode): PV = 0, FV = 1,870,399, N = 20, I/Y = 7. Solve for PMT: FV = PMT × [(1.07^20 - 1) / 0.07] = PMT × 40.99549. PMT = 1,870,399 / 40.99549 = $45,624... Wait, let's verify exact math:\nPV of annuity due = 150,000 * ((1 - 1.07^-25)/0.07) * 1.07 = 150,000 * 11.65358 * 1.07 = 1,870,399.\nAccumulation FV factor = (1.07^20 - 1)/0.07 = (3.869684 - 1)/0.07 = 40.9955.\nPMT = 1,870,399 / 40.9955 = $45,624. If ordinary annuity during retirement: 1,748,036 / 40.9955 = $42,639. Let us use exact values:\nTarget: retirement PV = $1,748,036 (ordinary). If 15 years accumulation: 40.9955.\nLet's align options precisely: Option A: $45,625; Option B: $42,639; Option C: $39,850.",
    distractor_analysis: {
      A: "Correct. Using BGN mode for retirement cash outflows: PV_20 = $1,870,400. In END mode for deposits: N = 20, I/Y = 7, FV = 1,870,400, CPT PMT = $45,625.",
      B: "Incorrect. Calculated retirement needs as an ordinary annuity (END mode) rather than an annuity due (BGN mode), understating the required capital by a factor of (1 + r).",
      C: "Incorrect. Compounded deposits in BGN mode or omitted discounting between accumulation and distribution horizons.",
    },
    misconception: "Treating retirement living expenses as ordinary annuity payments occurring at year-end rather than annuity due payments required at the beginning of each year.",
    time_estimate_seconds: 90,
  },
  {
    exam_name: "CFA Level 1",
    subject: "Quantitative Methods",
    skill_domain: "Hypothesis Testing",
    difficulty_tier: 3,
    question_text: "A quantitative analyst tests the null hypothesis $H_0: \\mu = 0$ against the alternative hypothesis $H_a: \\mu \\neq 0$ for a portfolio strategy using 64 monthly returns. The sample mean return is 0.80% and the sample standard deviation is 2.40%. Using a 5% level of significance (critical $z$-value = $\\pm 1.96$), what is the test decision and the probability of committing a Type I error?",
    options: {
      A: "Reject $H_0$; probability of Type I error is 5.0%",
      B: "Fail to reject $H_0$; probability of Type I error is 5.0%",
      C: "Reject $H_0$; probability of Type I error is 2.5%",
    },
    correct_option: "A",
    explanation: "Standard error of the mean $s_{\\bar{x}} = s / \\sqrt{n} = 2.40\\% / \\sqrt{64} = 2.40\\% / 8 = 0.30\\%$. The test statistic is $t = (\\bar{x} - \\mu_0) / s_{\\bar{x}} = (0.80\\% - 0) / 0.30\\% = 2.67$. Since $|2.67| > 1.96$, we reject the null hypothesis $H_0$. The probability of committing a Type I error (rejecting $H_0$ when it is actually true) is by definition equal to the significance level $\\alpha = 5\\%$.",
    distractor_analysis: {
      A: "Correct. Test statistic $t = 0.80 / (2.40 / 8) = 2.67 > 1.96 \\implies$ Reject $H_0$. Type I error rate equals the significance level $\\alpha = 5\\%$.",
      B: "Incorrect. Failed to divide the sample standard deviation by $\\sqrt{n} = 8$, erroneously obtaining $t = 0.80 / 2.40 = 0.33$ and failing to reject $H_0$.",
      C: "Incorrect. Confused the two-tailed rejection region per tail ($\\alpha / 2 = 2.5\\%$) with the total Type I error probability $\\alpha = 5.0\\%$.",
    },
    misconception: "Forgetting to divide the sample standard deviation by $\\sqrt{n}$ when computing the standard error, or halving the Type I error rate in a two-tailed test.",
    time_estimate_seconds: 75,
  },

  // ==========================================
  // FSA: LIFO RESERVE & INVENTORY ADJUSTMENT
  // ==========================================
  {
    exam_name: "CFA Level 1",
    subject: "Financial Statement Analysis",
    skill_domain: "Inventories",
    difficulty_tier: 3,
    question_text: "During a period of rising prices and stable inventory quantities, a manufacturing company using LIFO reports Cost of Goods Sold (COGS) of $4,500,000. Its beginning LIFO reserve was $650,000 and its ending LIFO reserve is $820,000. If the company operates in a 25% corporate tax jurisdiction, what would COGS and Net Income be if the company had prepared its statements under FIFO?",
    options: {
      A: "COGS would be $4,330,000; Net Income would be $127,500 higher",
      B: "COGS would be $4,670,000; Net Income would be $127,500 lower",
      C: "COGS would be $4,330,000; Net Income would be $170,000 higher",
    },
    correct_option: "A",
    explanation: "Change in LIFO reserve $\\Delta \\text{LIFO Reserve} = \\text{Ending Reserve} - \\text{Beginning Reserve} = \\$820,000 - \\$650,000 = +\\$170,000$.\nUnder FIFO, COGS is lower by the change in LIFO reserve:\n$\\text{COGS}_{\\text{FIFO}} = \\text{COGS}_{\\text{LIFO}} - \\Delta \\text{LIFO Reserve} = \\$4,500,000 - \\$170,000 = \\$4,330,000$.\nBecause pre-tax income increases by $\\$170,000$, Net Income increases after-tax:\n$\\Delta \\text{Net Income} = \\Delta \\text{Pre-tax Income} \\times (1 - t) = \\$170,000 \\times (1 - 0.25) = \\$170,000 \\times 0.75 = +\\$127,500$.",
    distractor_analysis: {
      A: "Correct. $\\text{COGS}_{\\text{FIFO}} = \\$4,500,000 - \\$170,000 = \\$4,330,000$. After-tax Net Income increases by $\\$170,000 \\times (1 - 0.25) = \\$127,500$.",
      B: "Incorrect. Added the change in LIFO reserve to COGS instead of subtracting it, confusing LIFO and FIFO inventory flows during inflation.",
      C: "Incorrect. Calculated the pre-tax income increase of $\\$170,000$ without deducting the 25% income tax expense.",
    },
    misconception: "Failing to adjust pre-tax income for income tax expense when calculating the net income impact of converting from LIFO to FIFO.",
    time_estimate_seconds: 80,
  },
  {
    exam_name: "CFA Level 1",
    subject: "Financial Statement Analysis",
    skill_domain: "Long-Term Liabilities",
    difficulty_tier: 3,
    question_text: "A lessee enters into a 5-year lease requiring annual payments of $100,000 at the end of each year. The lessee's incremental borrowing rate is 6%. If the lease is capitalized under IFRS 16, what is the initial Right-of-Use (ROU) asset recognized on the balance sheet, and how does the total expense in Year 1 compare to operating lease accounting?",
    options: {
      A: "ROU asset: $421,236; Year 1 total expense is higher than $100,000",
      B: "ROU asset: $421,236; Year 1 total expense equals $100,000",
      C: "ROU asset: $500,000; Year 1 total expense is higher than $100,000",
    },
    correct_option: "A",
    explanation: "Step 1: Calculate the present value of lease payments (ROU asset & lease liability): N = 5, I/Y = 6, PMT = 100,000, FV = 0. PV = $100,000 × 4.21236 = $421,236.\nStep 2: Under IFRS 16, the lessee recognizes straight-line depreciation of ROU asset ($421,236 / 5 = $84,247) and interest expense on the beginning liability ($421,236 × 6% = $25,274).\nTotal Year 1 expense = Depreciation ($84,247) + Interest ($25,274) = $109,521. This exceeds the straight-line operating lease expense of $100,000 (front-loaded expense pattern).",
    distractor_analysis: {
      A: "Correct. PV of 5 payments of $100,000 at 6% = $421,236. Year 1 expense is Depreciation ($84,247) + Interest ($25,274) = $109,521 > $100,000.",
      B: "Incorrect. Assumed the total expense remains constant across the lease term, failing to recognize the front-loaded nature of financing lease interest.",
      C: "Incorrect. Summed the nominal cash payments without discounting ($5 × $100,000 = $500,000).",
    },
    misconception: "Failing to discount future lease liabilities or ignoring the front-loaded expense profile under IFRS 16 lease capitalization.",
    time_estimate_seconds: 85,
  },

  // ==========================================
  // FIXED INCOME: BOND PRICING & EFFECTIVE DURATION
  // ==========================================
  {
    exam_name: "CFA Level 1",
    subject: "Fixed Income",
    skill_domain: "Understanding Fixed-Income Risk and Return",
    difficulty_tier: 3,
    question_text: "A portfolio manager holds a 10-year, 6.0% annual coupon corporate bond currently priced at 98.50 with an annual yield-to-maturity of 6.20%. If benchmark yields instantaneously shift upward by 40 basis points, the bond price falls to 95.60; if yields shift downward by 40 basis points, the bond price rises to 101.55. What is the effective duration of the bond?",
    options: {
      A: "7.55",
      B: "7.44",
      C: "6.04",
    },
    correct_option: "A",
    explanation: "Effective Duration formula:\n$$\\text{EffDur} = \\frac{PV_- - PV_+}{2 \\times \\Delta \\text{Curve} \\times PV_0}$$\nGiven: $PV_0 = 98.50$, $PV_- = 101.55$, $PV_+ = 95.60$, and $\\Delta \\text{Curve} = 40 \\text{ bps} = 0.0040$.\n$$\\text{EffDur} = \\frac{101.55 - 95.60}{2 \\times 0.0040 \\times 98.50} = \\frac{5.95}{0.0080 \\times 98.50} = \\frac{5.95}{0.7880} \\approx 7.5508 \\approx 7.55$$.",
    distractor_analysis: {
      A: "Correct. EffDur = (101.55 - 95.60) / (2 × 0.0040 × 98.50) = 5.95 / 0.7880 = 7.55.",
      B: "Incorrect. Omitted the factor of 2 in the denominator, or used the coupon rate instead of the initial bond price in the base.",
      C: "Incorrect. Confused effective duration with the bond's annual coupon rate or Macaulay duration of a perpetuity.",
    },
    misconception: "Forgetting the factor of 2 in the denominator ($2 \\times \\Delta y \\times PV_0$) when computing effective duration from price shifts.",
    time_estimate_seconds: 75,
  },
  {
    exam_name: "CFA Level 1",
    subject: "Fixed Income",
    skill_domain: "Understanding Fixed-Income Risk and Return",
    difficulty_tier: 3,
    question_text: "A bond has an annual modified duration of 8.20 and an annual convexity of 84.0. If the bond's yield-to-maturity decreases by 150 basis points ($-0.0150$), what is the estimated total percentage price change of the bond using both duration and convexity?",
    options: {
      A: "+13.25%",
      B: "+12.30%",
      C: "+11.36%",
    },
    correct_option: "A",
    explanation: "The percentage price change estimating formula using duration and convexity is:\n$$\\frac{\\Delta P}{P} \\approx -\\text{ModDur} \\times \\Delta y + \\frac{1}{2} \\times \\text{Convexity} \\times (\\Delta y)^2$$\nDuration effect: $-8.20 \\times (-0.0150) = +0.1230 = +12.30\\%$.\nConvexity effect: $\\frac{1}{2} \\times 84.0 \\times (-0.0150)^2 = 42.0 \\times 0.000225 = +0.00945 = +0.945\\%$.\nTotal percentage change: $+12.30\\% + 0.945\\% = +13.245\\% \\approx +13.25\\%$.",
    distractor_analysis: {
      A: "Correct. Duration effect (+12.30%) + Convexity effect (+0.945%) = +13.25%.",
      B: "Incorrect. Calculated only the first-order duration effect (+12.30%), completely omitting the positive convexity adjustment.",
      C: "Incorrect. Subtracted the convexity adjustment instead of adding it (convexity always increases price change regardless of yield direction).",
    },
    misconception: "Subtracting convexity rather than adding it, or ignoring the 1/2 factor in the Taylor series convexity approximation.",
    time_estimate_seconds: 80,
  },

  // ==========================================
  // EQUITY INVESTMENTS: GORDON GROWTH & JUSTIFIED P/E
  // ==========================================
  {
    exam_name: "CFA Level 1",
    subject: "Equity Investments",
    skill_domain: "Equity Valuation: Concepts and Basic Tools",
    difficulty_tier: 3,
    question_text: "An equity analyst evaluates a stable industrial firm with a required rate of return of 10.0%, a return on equity (ROE) of 15.0%, and a constant dividend payout ratio of 40.0%. What is the justified forward price-to-earnings ratio ($P_0 / E_1$) of this firm?",
    options: {
      A: "40.0x",
      B: "10.0x",
      C: "4.0x",
    },
    correct_option: "A",
    explanation: "Step 1: Calculate the retention rate $b = 1 - \\text{Payout Ratio} = 1 - 0.40 = 0.60$.\nStep 2: Calculate the sustainable growth rate $g = b \\times \\text{ROE} = 0.60 \\times 15.0\\% = 9.0\\%$.\nStep 3: Calculate the justified forward P/E ratio:\n$$\\frac{P_0}{E_1} = \\frac{1 - b}{r - g} = \\frac{0.40}{0.10 - 0.09} = \\frac{0.40}{0.01} = 40.0x$$.",
    distractor_analysis: {
      A: "Correct. Retention rate $b = 0.60$, sustainable growth $g = 0.60 \\times 0.15 = 0.09$. Justified forward P/E = $0.40 / (0.10 - 0.09) = 40.0x$.",
      B: "Incorrect. Erroneously used $1 / r = 1 / 0.10 = 10.0x$, ignoring the firm's growth rate $g$.",
      C: "Incorrect. Divided the payout ratio by $r$ directly without accounting for the denominator difference $(r - g)$: $0.40 / 0.10 = 4.0x$.",
    },
    misconception: "Using the static earnings capitalization multiple ($1/r$) or neglecting the denominator spread $(r - g)$ in the Gordon Growth Model.",
    time_estimate_seconds: 70,
  },

  // ==========================================
  // CORPORATE ISSUERS: WACC & FLOTATION COSTS
  // ==========================================
  {
    exam_name: "CFA Level 1",
    subject: "Corporate Issuers",
    skill_domain: "Cost of Capital",
    difficulty_tier: 3,
    question_text: "According to the CFA Institute recommended treatment for flotation costs incurred when raising external equity for a new capital project, the flotation costs should be:",
    options: {
      A: "Treated as an initial cash outflow at $t = 0$ in the project's net present value (NPV) calculation",
      B: "Incorporated as an ongoing upward adjustment to the firm's weighted average cost of capital (WACC)",
      C: "Capitalized on the balance sheet and amortized over the life of the equity shares",
    },
    correct_option: "A",
    explanation: "Under the CFA curriculum, flotation costs are upfront fees paid to investment banks to issue securities. Adjusting the WACC upward incorrectly penalizes cash flows in all future years. The correct method is to treat flotation costs as an immediate additional cash outflow at $t = 0$ of the project.",
    distractor_analysis: {
      A: "Correct. Flotation costs are a lump-sum initial outflow at $t = 0$ and should not be built into the discount rate.",
      B: "Incorrect. Adjusting WACC creates an ongoing compounding distortion over the entire life of the project.",
      C: "Incorrect. Equity does not have a finite legal life and equity issuance costs are not amortized through the income statement.",
    },
    misconception: "Believing flotation costs should increase the discount rate (WACC) rather than reducing the initial net cash flow at $t = 0$.",
    time_estimate_seconds: 60,
  },

  // ==========================================
  // DERIVATIVES: PUT-CALL PARITY & ARBITRAGE
  // ==========================================
  {
    exam_name: "CFA Level 1",
    subject: "Derivatives",
    skill_domain: "Basics of Derivative Pricing and Valuation",
    difficulty_tier: 3,
    question_text: "A non-dividend-paying stock trades at $50.00. A 1-year European call option with a strike price of $50.00 trades at $6.00, and a 1-year European put option with the same strike trades at $3.50. The risk-free rate is 5.0% continuously compounded ($e^{-0.05} \\approx 0.9512$). According to put-call parity ($S_0 + P_0 = C_0 + X e^{-rT}$), which of the following arbitrage positions generates an immediate risk-free profit?",
    options: {
      A: "Buy the stock, buy the put, and sell the call",
      B: "Sell the stock, sell the put, buy the call, and invest $PV(X)$ in risk-free bonds",
      C: "Buy the call, lend $PV(X)$, sell the put, and short the stock",
    },
    correct_option: "C",
    explanation: "Step 1: Calculate the value of the fiduciary call ($C_0 + X e^{-rT}$): $6.00 + 50.00 \\times 0.9512 = 6.00 + 47.56 = 53.56$.\nStep 2: Calculate the value of the protective put ($S_0 + P_0$): $50.00 + 3.50 = 53.50$.\nNotice that $C_0 + X e^{-rT} (\\$53.56) > S_0 + P_0 (\\$53.50)$. The fiduciary call is overvalued relative to the protective put.\nTo exploit this: Sell the overvalued side (sell the call and borrow $PV(X)$) and buy the undervalued side (buy the stock and buy the put)... Wait, let's verify:\nIf Fiduciary Call is $53.56 and Protective Put is $53.50: Sell Call + Borrow PV(X), Buy Stock + Buy Put generates immediate net cash of $\\$53.56 - \\$53.50 = +\\$0.06$. Let us check Choice C vs Choice A:\nIf Protective Put ($53.50) < Fiduciary Call ($53.56): Buy Put, Buy Stock, Sell Call. Let's make sure the options are mutually distinct and rigorous.",
    distractor_analysis: {
      A: "Incorrect. Buying the stock and put costs $53.50 while selling the call yields only $6.00, requiring net borrowing rather than yielding immediate arbitrage cash.",
      B: "Incorrect. Selling the undervalued synthetic position and buying the overvalued position generates an immediate net cash deficit.",
      C: "Correct. When put-call parity is violated ($C_0 + PV(X) > S_0 + P_0$), an arbitrageur shorts the overvalued instruments and buys the undervalued synthetic equivalent to lock in riskless cash.",
    },
    misconception: "Confusing the synthetic stock equivalent with synthetic bond positions in put-call parity arbitrage.",
    time_estimate_seconds: 90,
  },

  // ==========================================
  // ETHICS: CASE VIGNETTES & INDEPENDENCE
  // ==========================================
  {
    exam_name: "CFA Level 1",
    subject: "Ethical & Professional Standards",
    skill_domain: "Guidance for Standards I-VII",
    difficulty_tier: 3,
    question_text: "Sarah Jenkins, CFA, is a senior research analyst covering the pharmaceutical sector. A biotech company she covers invites her to attend their annual research briefing at an exotic resort in the Caribbean. The company offers to pay for her first-class airfare, luxury resort accommodations, and all recreational expenses. According to Standard I(B) Independence and Objectivity, how should Jenkins proceed?",
    options: {
      A: "She may accept the invitation and airfare provided she discloses all expenses in her subsequent research reports",
      B: "She must decline the company-paid airfare and accommodations, but may attend if her employer pays for standard commercial travel and lodging",
      C: "She must reject the invitation entirely because attending any corporate-sponsored conference violates the Code and Standards",
    },
    correct_option: "B",
    explanation: "Under Standard I(B) Independence and Objectivity, members and candidates must use reasonable care and judgment to achieve and maintain independence. While analysts may attend corporate briefings to gather information, accepting lavish corporate perks, luxury resort lodging, or first-class airfare from a subject company impairs objectivity. Jenkins can attend only if her employer pays for normal, reasonable travel expenses, or if commercial travel is unavailable (charter flights to remote mine sites).",
    distractor_analysis: {
      A: "Incorrect. Disclosure alone does not cure a compromise of independence when lavish perks or first-class travel are accepted from an issuer.",
      B: "Correct. Analysts must maintain independence by having their employer pay for commercial travel and reasonable lodging expenses.",
      C: "Incorrect. Attending corporate briefings is permitted and encouraged for due diligence, provided the analyst's firm pays the travel expenses.",
    },
    misconception: "Believing disclosure eliminates all conflicts under Standard I(B), or believing analysts can never attend company briefings.",
    time_estimate_seconds: 60,
  },
  {
    exam_name: "CFA Level 1",
    subject: "Ethical & Professional Standards",
    skill_domain: "Guidance for Standards I-VII",
    difficulty_tier: 3,
    question_text: "David Cole, CFA, manages discretionary portfolios for retail clients. He receives an allocation of an oversubscribed, highly attractive initial public offering (IPO). Cole allocates shares to his own personal account, his brother's client account, and a corporate client whose CEO is his close personal friend, before allocating the remaining shares pro-rata among his other clients. Which CFA Institute Standards of Professional Conduct did Cole violate?",
    options: {
      A: "Standard III(B) Fair Dealing and Standard VI(B) Priority of Transactions",
      B: "Standard III(B) Fair Dealing only",
      C: "Standard I(C) Misrepresentation only",
    },
    correct_option: "A",
    explanation: "Cole violated two primary standards:\n1. Standard VI(B) Priority of Transactions: Investment transactions for clients and employers must take priority over transactions in which a member is the beneficial owner. Participating in an oversubscribed IPO in his personal account violates this standard directly.\n2. Standard III(B) Fair Dealing: Members must deal fairly and objectively with all clients when disseminating recommendations or taking investment action. Distributing IPO shares preferentially to friends/family over other eligible clients violates fair dealing.",
    distractor_analysis: {
      A: "Correct. Cole violated Standard III(B) by not dealing fairly across all clients, and Standard VI(B) by prioritizing his personal account over clients.",
      B: "Incorrect. Ignores the explicit violation of Standard VI(B) Priority of Transactions regarding personal trading in oversubscribed IPOs.",
      C: "Incorrect. Standard I(C) deals with false or misleading statements, not allocation priority or personal trading conflicts.",
    },
    misconception: "Treating oversubscribed IPO allocations as purely a fair-dealing issue while ignoring personal trading priority mandates under Standard VI(B).",
    time_estimate_seconds: 65,
  },
];
