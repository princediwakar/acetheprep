// Path: lib/data/banks/cfa/portfolio.ts
import type { SeedQuestion } from "../../question-bank-seed";

export const CFA_PORTFOLIO_QUESTIONS: SeedQuestion[] = [
  {
    "exam_name": "CFA Level 1",
    "subject": "Portfolio Management",
    "skill_domain": "Portfolio Risk & Return",
    "difficulty_tier": 2,
    "question_text": "Two assets each have standard deviation of 20%. If they are perfectly negatively correlated (correlation rho = -1.0), what portfolio standard deviation is achieved by allocating 50% to each asset?",
    "options": {
      "A": "0.0%",
      "B": "10.0%",
      "C": "20.0%"
    },
    "correct_option": "A",
    "explanation": "Portfolio variance sigma_p^2 = w1^2 sigma1^2 + w2^2 sigma2^2 + 2 w1 w2 rho sigma1 sigma2 = (0.5)^2 (0.2)^2 + (0.5)^2 (0.2)^2 + 2(0.5)(0.5)(-1)(0.2)(0.2) = 0.01 + 0.01 - 0.02 = 0. Standard deviation is 0.0%.",
    "distractor_analysis": {
      "A": "Correct. Portfolio variance sigma_p^2 = w1^2 sigma1^2 + w2^2 sigma2^2 + 2 w1 w2 rho sigma",
      "B": "Incorrect. Common distractor based on: Assuming standard deviation is the average of the two assets",
      "C": "Incorrect. Common distractor based on: Assuming standard deviation is the average of the two assets"
    },
    "misconception": "Assuming standard deviation is the average of the two assets (20%) or 10%.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Portfolio Management",
    "skill_domain": "Portfolio Risk & Return",
    "difficulty_tier": 2,
    "question_text": "The Markowitz efficient frontier represents the set of optimal portfolios that:",
    "options": {
      "A": "Maximize expected return for a given level of risk, or minimize risk for a given level of expected return",
      "B": "Contain only risk-free assets",
      "C": "Include every publicly traded security in equal weights"
    },
    "correct_option": "A",
    "explanation": "The Markowitz efficient frontier consists of mean-variance optimized portfolios offering the highest achievable expected return for each unit of risk (standard deviation).",
    "distractor_analysis": {
      "A": "Correct. The Markowitz efficient frontier consists of mean-variance optimized portfolios ",
      "B": "Incorrect. Common distractor based on: Confusing the efficient frontier with equal-weighted portfol",
      "C": "Incorrect. Common distractor based on: Confusing the efficient frontier with equal-weighted portfol"
    },
    "misconception": "Confusing the efficient frontier with equal-weighted portfolios.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Portfolio Management",
    "skill_domain": "Portfolio Risk & Return",
    "difficulty_tier": 2,
    "question_text": "In the Capital Asset Pricing Model (CAPM), what type of risk is rewarded with an expected return premium?",
    "options": {
      "A": "Systematic (market) risk only",
      "B": "Unsystematic (firm-specific) risk only",
      "C": "Total risk (standard deviation)"
    },
    "correct_option": "A",
    "explanation": "In competitive capital markets, unsystematic (firm-specific) risk can be eliminated costlessly through diversification. Therefore, investors are compensated only for bearing non-diversifiable systematic risk (beta).",
    "distractor_analysis": {
      "A": "Correct. In competitive capital markets, unsystematic (firm-specific) risk can be elimina",
      "B": "Incorrect. Common distractor based on: Believing investors are compensated for unsystematic diversi",
      "C": "Incorrect. Common distractor based on: Believing investors are compensated for unsystematic diversi"
    },
    "misconception": "Believing investors are compensated for unsystematic diversifiable risk.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Portfolio Management",
    "skill_domain": "Portfolio Risk & Return",
    "difficulty_tier": 2,
    "question_text": "The Capital Allocation Line (CAL) depicts the risk-return combinations achievable by combining:",
    "options": {
      "A": "The risk-free asset with a specific risky portfolio (tangency portfolio)",
      "B": "All individual stocks on an electronic exchange",
      "C": "Different classes of corporate bonds"
    },
    "correct_option": "A",
    "explanation": "The CAL is a straight line drawn from the risk-free rate on the y-axis through the optimal tangency portfolio of risky assets on the efficient frontier.",
    "distractor_analysis": {
      "A": "Correct. The CAL is a straight line drawn from the risk-free rate on the y-axis through t",
      "B": "Incorrect. Common distractor based on: Confusing the Capital Allocation Line with the Markowitz cur",
      "C": "Incorrect. Common distractor based on: Confusing the Capital Allocation Line with the Markowitz cur"
    },
    "misconception": "Confusing the Capital Allocation Line with the Markowitz curved frontier.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Portfolio Management",
    "skill_domain": "Portfolio Risk & Return",
    "difficulty_tier": 2,
    "question_text": "What does the Capital Market Line (CML) plot, and what is its measure of risk?",
    "options": {
      "A": "Expected return against total risk (standard deviation) for efficient portfolios combining the risk-free asset and market portfolio",
      "B": "Expected return against systematic risk (beta) for all individual securities",
      "C": "Dividend yield against debt-to-equity ratio"
    },
    "correct_option": "A",
    "explanation": "The CML applies exclusively to efficient portfolios, plotting Expected Return on the y-axis against Total Risk (Standard Deviation) on the x-axis. The SML plots return against Beta.",
    "distractor_analysis": {
      "A": "Correct. The CML applies exclusively to efficient portfolios, plotting Expected Return on",
      "B": "Incorrect. Common distractor based on: Confusing the Capital Market Line (CML, uses sigma) with the",
      "C": "Incorrect. Common distractor based on: Confusing the Capital Market Line (CML, uses sigma) with the"
    },
    "misconception": "Confusing the Capital Market Line (CML, uses sigma) with the Security Market Line (SML, uses beta).",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Portfolio Management",
    "skill_domain": "Portfolio Risk & Return",
    "difficulty_tier": 2,
    "question_text": "If an asset's beta is 1.2, risk-free rate is 3%, and market expected return is 8%, what is the asset's expected return according to the CAPM?",
    "options": {
      "A": "9.0%",
      "B": "9.6%",
      "C": "8.6%"
    },
    "correct_option": "A",
    "explanation": "Market risk premium ERP = E(R_m) - R_f = 8% - 3% = 5%. Expected return E(R_i) = R_f + beta * ERP = 3% + 1.2 * (5%) = 3% + 6.0% = 9.0%.",
    "distractor_analysis": {
      "A": "Correct. Market risk premium ERP = E(R_m) - R_f = 8% - 3% = 5%. Expected return E(R_i) = ",
      "B": "Incorrect. Common distractor based on: Multiplying beta by market return directly (1.2 * 8% = 9.6%)",
      "C": "Incorrect. Common distractor based on: Multiplying beta by market return directly (1.2 * 8% = 9.6%)"
    },
    "misconception": "Multiplying beta by market return directly (1.2 * 8% = 9.6%) without subtracting the risk-free rate.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Portfolio Management",
    "skill_domain": "Portfolio Risk & Return",
    "difficulty_tier": 2,
    "question_text": "According to the Security Market Line (SML), an individual stock plotted ABOVE the SML is:",
    "options": {
      "A": "Undervalued, offering an expected return higher than required for its systematic risk (positive alpha)",
      "B": "Overvalued, offering an expected return lower than required",
      "C": "Correctly priced in equilibrium"
    },
    "correct_option": "A",
    "explanation": "The SML depicts required returns for any given beta. If a security's expected return lies above the SML, it generates positive alpha (excess return over required return), indicating it is undervalued.",
    "distractor_analysis": {
      "A": "Correct. The SML depicts required returns for any given beta. If a security's expected re",
      "B": "Incorrect. Common distractor based on: Thinking stocks above the SML are overvalued.",
      "C": "Incorrect. Common distractor based on: Thinking stocks above the SML are overvalued."
    },
    "misconception": "Thinking stocks above the SML are overvalued.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Portfolio Management",
    "skill_domain": "Portfolio Risk & Return",
    "difficulty_tier": 2,
    "question_text": "Beta of an individual asset i relative to the market portfolio is calculated as:",
    "options": {
      "A": "Cov(R_i, R_m) / Var(R_m)",
      "B": "Cov(R_i, R_m) / Var(R_i)",
      "C": "Var(R_i) / Var(R_m)"
    },
    "correct_option": "A",
    "explanation": "Beta = Cov(R_i, R_m) / Var(R_m) = [rho_i,m * sigma_i * sigma_m] / sigma_m^2 = rho_i,m * (sigma_i / sigma_m).",
    "distractor_analysis": {
      "A": "Correct. Beta = Cov(R_i, R_m) / Var(R_m) = [rho_i,m * sigma_i * sigma_m] / sigma_m^2 = rh",
      "B": "Incorrect. Common distractor based on: Inverting variance in the denominator.",
      "C": "Incorrect. Common distractor based on: Inverting variance in the denominator."
    },
    "misconception": "Inverting variance in the denominator.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Portfolio Management",
    "skill_domain": "Portfolio Risk & Return",
    "difficulty_tier": 2,
    "question_text": "Diversification benefits begin to reduce portfolio variance whenever the correlation coefficient rho between two assets is:",
    "options": {
      "A": "Less than +1.0",
      "B": "Strictly negative (< 0.0)",
      "C": "Strictly equal to -1.0"
    },
    "correct_option": "A",
    "explanation": "Any correlation less than perfectly positive (rho < +1.0) provides diversification benefits, reducing portfolio standard deviation below the weighted average of individual asset standard deviations.",
    "distractor_analysis": {
      "A": "Correct. Any correlation less than perfectly positive (rho < +1.0) provides diversificati",
      "B": "Incorrect. Common distractor based on: Believing negative correlation is required for diversificati",
      "C": "Incorrect. Common distractor based on: Believing negative correlation is required for diversificati"
    },
    "misconception": "Believing negative correlation is required for diversification (any rho < +1.0 helps).",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Portfolio Management",
    "skill_domain": "Portfolio Risk & Return",
    "difficulty_tier": 2,
    "question_text": "The slope of the Capital Market Line (CML) is equal to:",
    "options": {
      "A": "The Sharpe ratio of the market portfolio",
      "B": "The Treynor ratio of the market portfolio",
      "C": "The market risk premium divided by beta"
    },
    "correct_option": "A",
    "explanation": "Slope of CML = [E(R_m) - R_f] / sigma_m, which is exactly the Sharpe ratio of the market portfolio.",
    "distractor_analysis": {
      "A": "Correct. Slope of CML = [E(R_m) - R_f] / sigma_m, which is exactly the Sharpe ratio of th",
      "B": "Incorrect. Common distractor based on: Confusing CML slope (Sharpe ratio) with SML slope (market ri",
      "C": "Incorrect. Common distractor based on: Confusing CML slope (Sharpe ratio) with SML slope (market ri"
    },
    "misconception": "Confusing CML slope (Sharpe ratio) with SML slope (market risk premium).",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Portfolio Management",
    "skill_domain": "Portfolio Risk & Return",
    "difficulty_tier": 2,
    "question_text": "Unsystematic (idiosyncratic) risk of an individual corporate stock can be substantially eliminated by:",
    "options": {
      "A": "Holding a well-diversified portfolio of approximately 30 or more securities across diverse industries",
      "B": "Purchasing put options on the market index",
      "C": "Investing 100% in high-beta technology equities"
    },
    "correct_option": "A",
    "explanation": "Empirical portfolio theory shows that combining 30-40 uncorrelated stocks across diverse industries diversifies away virtually all firm-specific unsystematic variance.",
    "distractor_analysis": {
      "A": "Correct. Empirical portfolio theory shows that combining 30-40 uncorrelated stocks across",
      "B": "Incorrect. Common distractor based on: Assuming unsystematic risk cannot be diversified away.",
      "C": "Incorrect. Common distractor based on: Assuming unsystematic risk cannot be diversified away."
    },
    "misconception": "Assuming unsystematic risk cannot be diversified away.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Portfolio Management",
    "skill_domain": "Portfolio Planning & Construction",
    "difficulty_tier": 2,
    "question_text": "In an Investment Policy Statement (IPS), which of the following is classified as an investment CONSTRAINTS component (under the RRTTLLU framework)?",
    "options": {
      "A": "Liquidity requirements and Time horizon",
      "B": "Risk tolerance and Target return",
      "C": "Macroeconomic GDP growth rate"
    },
    "correct_option": "A",
    "explanation": "RRTTLLU framework separates Objectives (Risk, Return) from Constraints: Time horizon, Taxes, Liquidity, Legal/Regulatory, and Unique circumstances.",
    "distractor_analysis": {
      "A": "Correct. RRTTLLU framework separates Objectives (Risk, Return) from Constraints: Time hor",
      "B": "Incorrect. Common distractor based on: Confusing investment objectives (Risk, Return) with constrai",
      "C": "Incorrect. Common distractor based on: Confusing investment objectives (Risk, Return) with constrai"
    },
    "misconception": "Confusing investment objectives (Risk, Return) with constraints.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Portfolio Management",
    "skill_domain": "Portfolio Planning & Construction",
    "difficulty_tier": 2,
    "question_text": "Strategic Asset Allocation (SAA) establishes:",
    "options": {
      "A": "Long-term target asset class weightings designed to meet client risk and return objectives over their full investment horizon",
      "B": "Short-term deviations from target weights to exploit temporary market mispricings",
      "C": "Daily intraday momentum stock trading signals"
    },
    "correct_option": "A",
    "explanation": "Strategic Asset Allocation (SAA) sets the long-term baseline asset mix (e.g. 60% equities / 40% bonds) reflecting client IPS goals. Tactical Asset Allocation (TAA) makes short-term tactical tilts.",
    "distractor_analysis": {
      "A": "Correct. Strategic Asset Allocation (SAA) sets the long-term baseline asset mix (e.g. 60%",
      "B": "Incorrect. Common distractor based on: Confusing Strategic Asset Allocation (long-term) with Tactic",
      "C": "Incorrect. Common distractor based on: Confusing Strategic Asset Allocation (long-term) with Tactic"
    },
    "misconception": "Confusing Strategic Asset Allocation (long-term) with Tactical Asset Allocation (short-term).",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Portfolio Management",
    "skill_domain": "Portfolio Planning & Construction",
    "difficulty_tier": 2,
    "question_text": "Tactical Asset Allocation (TAA) is best described as:",
    "options": {
      "A": "Short-term, active deviations from strategic asset allocation weights to capitalize on temporary relative asset mispricings",
      "B": "Permanent revisions to a client's core risk tolerance profile",
      "C": "Rebalancing back to original baseline weights after price movements"
    },
    "correct_option": "A",
    "explanation": "TAA allows portfolio managers to temporarily overweight or underweight specific asset classes relative to the long-term SAA target based on medium-term macro or valuation expectations.",
    "distractor_analysis": {
      "A": "Correct. TAA allows portfolio managers to temporarily overweight or underweight specific ",
      "B": "Incorrect. Common distractor based on: Confusing tactical allocation with passive rebalancing.",
      "C": "Incorrect. Common distractor based on: Confusing tactical allocation with passive rebalancing."
    },
    "misconception": "Confusing tactical allocation with passive rebalancing.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Portfolio Management",
    "skill_domain": "Portfolio Planning & Construction",
    "difficulty_tier": 2,
    "question_text": "A client with an investment horizon of 30 years, substantial secure employment income, and high liquid net worth possesses:",
    "options": {
      "A": "High ability and high willingness to take risk",
      "B": "Low ability to take risk due to age",
      "C": "High willingness but low ability to take risk"
    },
    "correct_option": "A",
    "explanation": "Long time horizons, secure employment, and large asset cushions create high financial ability to absorb risk. If psychological attitude is also comfortable with volatility, both ability and willingness are high.",
    "distractor_analysis": {
      "A": "Correct. Long time horizons, secure employment, and large asset cushions create high fina",
      "B": "Incorrect. Common distractor based on: Confusing ability to take risk (financial capacity) with wil",
      "C": "Incorrect. Common distractor based on: Confusing ability to take risk (financial capacity) with wil"
    },
    "misconception": "Confusing ability to take risk (financial capacity) with willingness (psychological comfort).",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Portfolio Management",
    "skill_domain": "Portfolio Planning & Construction",
    "difficulty_tier": 2,
    "question_text": "When an investor's ability to take risk is LOW due to impending retirement and cash liquidity needs, but their psychological willingness to take risk is HIGH, the advisor should:",
    "options": {
      "A": "Base the portfolio asset allocation primarily on the investor's low ability to take risk, to prevent catastrophic lifestyle impairment",
      "B": "Adopt an aggressive high-beta growth strategy to satisfy willingness",
      "C": "Disregard the IPS and invest in speculative venture capital"
    },
    "correct_option": "A",
    "explanation": "When ability and willingness conflict, ability (objective financial reality) must always take precedence over subjective psychological willingness to safeguard the client from ruin.",
    "distractor_analysis": {
      "A": "Correct. When ability and willingness conflict, ability (objective financial reality) mus",
      "B": "Incorrect. Common distractor based on: Prioritizing psychological willingness over financial inabil",
      "C": "Incorrect. Common distractor based on: Prioritizing psychological willingness over financial inabil"
    },
    "misconception": "Prioritizing psychological willingness over financial inability to bear losses.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Portfolio Management",
    "skill_domain": "Portfolio Planning & Construction",
    "difficulty_tier": 2,
    "question_text": "In risk budgeting, an institutional investor:",
    "options": {
      "A": "Allocates total permissible portfolio risk across different asset classes, strategies, and active managers",
      "B": "Limits total dollar losses to zero in all calendar quarters",
      "C": "Calculates historical standard deviations without forward forecasts"
    },
    "correct_option": "A",
    "explanation": "Risk budgeting decomposes and allocates total allowable portfolio risk (variance or tracking error) across asset classes and active management mandates to maximize risk-adjusted return.",
    "distractor_analysis": {
      "A": "Correct. Risk budgeting decomposes and allocates total allowable portfolio risk (variance",
      "B": "Incorrect. Common distractor based on: Confusing risk budgeting with zero-loss guarantees.",
      "C": "Incorrect. Common distractor based on: Confusing risk budgeting with zero-loss guarantees."
    },
    "misconception": "Confusing risk budgeting with zero-loss guarantees.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Portfolio Management",
    "skill_domain": "Portfolio Planning & Construction",
    "difficulty_tier": 2,
    "question_text": "A core-satellite portfolio construction approach combines:",
    "options": {
      "A": "A passive, low-cost core portfolio tracking broad benchmarks with active 'satellite' specialized strategies seeking alpha",
      "B": "100% investment in space exploration technology stocks",
      "C": "A pure active stock picking strategy with zero index funds"
    },
    "correct_option": "A",
    "explanation": "Core-satellite blends a large, low-cost passive core (providing efficient beta exposure) with smaller satellite allocations to specialized active managers seeking uncorrelated alpha.",
    "distractor_analysis": {
      "A": "Correct. Core-satellite blends a large, low-cost passive core (providing efficient beta e",
      "B": "Incorrect. Common distractor based on: Thinking core-satellite refers to aerospace sector investing",
      "C": "Incorrect. Common distractor based on: Thinking core-satellite refers to aerospace sector investing"
    },
    "misconception": "Thinking core-satellite refers to aerospace sector investing.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Portfolio Management",
    "skill_domain": "Portfolio Planning & Construction",
    "difficulty_tier": 2,
    "question_text": "Why are well-defined asset classes in an SAA framework required to have high correlation within the class and low correlation between classes?",
    "options": {
      "A": "To ensure that asset classes represent distinct risk-return drivers and maximize diversification benefits across the portfolio",
      "B": "To make individual security selection impossible",
      "C": "To reduce trading liquidity across exchanges"
    },
    "correct_option": "A",
    "explanation": "Proper asset classes must be mutually exclusive and internally homogeneous, exhibiting high internal correlation but low correlation across different classes to maximize diversification power.",
    "distractor_analysis": {
      "A": "Correct. Proper asset classes must be mutually exclusive and internally homogeneous, exhi",
      "B": "Incorrect. Common distractor based on: Assuming asset classes should be highly correlated with each",
      "C": "Incorrect. Common distractor based on: Assuming asset classes should be highly correlated with each"
    },
    "misconception": "Assuming asset classes should be highly correlated with each other.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Portfolio Management",
    "skill_domain": "Portfolio Planning & Construction",
    "difficulty_tier": 2,
    "question_text": "Which component of an Investment Policy Statement specifies the criteria and benchmarks against which manager performance will be evaluated?",
    "options": {
      "A": "Performance evaluation and review guidelines",
      "B": "Taxation constraints section",
      "C": "Legal and regulatory compliance preamble"
    },
    "correct_option": "A",
    "explanation": "The performance review section outlines benchmark selection, evaluation frequency, rebalancing thresholds, and criteria for reviewing and replacing investment managers.",
    "distractor_analysis": {
      "A": "Correct. The performance review section outlines benchmark selection, evaluation frequenc",
      "B": "Incorrect. Common distractor based on: Confusing performance review with tax constraints.",
      "C": "Incorrect. Common distractor based on: Confusing performance review with tax constraints."
    },
    "misconception": "Confusing performance review with tax constraints.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Portfolio Management",
    "skill_domain": "Portfolio Planning & Construction",
    "difficulty_tier": 2,
    "question_text": "Rebalancing a portfolio back to strategic target weights involves:",
    "options": {
      "A": "Selling appreciated asset classes that have grown above target weights and buying underperforming classes that have fallen below target",
      "B": "Selling all lagging assets and doubling down on recent winners",
      "C": "Liquidating the portfolio into cash every December 31"
    },
    "correct_option": "A",
    "explanation": "Rebalancing maintains the intended risk profile of the IPS by systematically taking profits from outperforming asset classes and redeploying cash into underperforming classes.",
    "distractor_analysis": {
      "A": "Correct. Rebalancing maintains the intended risk profile of the IPS by systematically tak",
      "B": "Incorrect. Common distractor based on: Assuming rebalancing involves chasing momentum winners.",
      "C": "Incorrect. Common distractor based on: Assuming rebalancing involves chasing momentum winners."
    },
    "misconception": "Assuming rebalancing involves chasing momentum winners.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Portfolio Management",
    "skill_domain": "Portfolio Planning & Construction",
    "difficulty_tier": 2,
    "question_text": "A defined benefit pension plan with an aging workforce nearing retirement has an investment time horizon that is:",
    "options": {
      "A": "Shortening, with high liquidity needs to meet near-term contractual pension payout obligations",
      "B": "Expanding indefinitely across 50 years",
      "C": "Completely unconstrained by beneficiary demographics"
    },
    "correct_option": "A",
    "explanation": "As beneficiaries age and retire, cash outflow obligations accelerate, shortening the plan's effective time horizon and elevating liquidity constraints, requiring shifts from equities to fixed income.",
    "distractor_analysis": {
      "A": "Correct. As beneficiaries age and retire, cash outflow obligations accelerate, shortening",
      "B": "Incorrect. Common distractor based on: Assuming all pension plans have perpetual long-term time hor",
      "C": "Incorrect. Common distractor based on: Assuming all pension plans have perpetual long-term time hor"
    },
    "misconception": "Assuming all pension plans have perpetual long-term time horizons.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Portfolio Management",
    "skill_domain": "Behavioral Biases",
    "difficulty_tier": 2,
    "question_text": "An investor who holds onto losing stocks far too long in the hope of breaking even, while quickly selling winning stocks to lock in small gains, is exhibiting:",
    "options": {
      "A": "The disposition effect (driven by loss aversion and mental accounting)",
      "B": "Overconfidence bias",
      "C": "Conservatism bias"
    },
    "correct_option": "A",
    "explanation": "The disposition effect is the tendency to realize gains prematurely ('lock in a win') while holding depreciated losing positions to avoid acknowledging regret and realizing a painful loss.",
    "distractor_analysis": {
      "A": "Correct. The disposition effect is the tendency to realize gains prematurely ('lock in a ",
      "B": "Incorrect. Common distractor based on: Confusing the disposition effect with overconfidence.",
      "C": "Incorrect. Common distractor based on: Confusing the disposition effect with overconfidence."
    },
    "misconception": "Confusing the disposition effect with overconfidence.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Portfolio Management",
    "skill_domain": "Behavioral Biases",
    "difficulty_tier": 2,
    "question_text": "Anchoring and adjustment bias in financial decision-making occurs when an investor:",
    "options": {
      "A": "Over-relies on an initial piece of information (such as original purchase price) and makes insufficient adjustments as new data arrives",
      "B": "Invests only in maritime shipping company stocks",
      "C": "Confirms existing hypotheses by seeking only supportive news"
    },
    "correct_option": "A",
    "explanation": "Anchoring occurs when an individual fixates on an initial psychological reference point (like purchase price or an analyst target) and fails to adjust expectations adequately when fundamentals change.",
    "distractor_analysis": {
      "A": "Correct. Anchoring occurs when an individual fixates on an initial psychological referenc",
      "B": "Incorrect. Common distractor based on: Thinking anchoring relates to maritime investments.",
      "C": "Incorrect. Common distractor based on: Thinking anchoring relates to maritime investments."
    },
    "misconception": "Thinking anchoring relates to maritime investments.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Portfolio Management",
    "skill_domain": "Behavioral Biases",
    "difficulty_tier": 2,
    "question_text": "An analyst who searches exclusively for research reports confirming their positive thesis on a tech stock while ignoring negative customer reviews is exhibiting:",
    "options": {
      "A": "Confirmation bias",
      "B": "Availability bias",
      "C": "Gambler's fallacy"
    },
    "correct_option": "A",
    "explanation": "Confirmation bias is the cognitive error of seeking, valuing, and remembering only information that confirms existing beliefs while actively ignoring or dismissing contradicting evidence.",
    "distractor_analysis": {
      "A": "Correct. Confirmation bias is the cognitive error of seeking, valuing, and remembering on",
      "B": "Incorrect. Common distractor based on: Confusing confirmation bias with availability bias.",
      "C": "Incorrect. Common distractor based on: Confusing confirmation bias with availability bias."
    },
    "misconception": "Confusing confirmation bias with availability bias.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Portfolio Management",
    "skill_domain": "Behavioral Biases",
    "difficulty_tier": 2,
    "question_text": "Mental accounting bias leads investors to:",
    "options": {
      "A": "Treat money differently depending on its source or intended purpose (e.g. spending an unexpected bonus recklessly while hoarding salary)",
      "B": "Combine all assets into a single comprehensive risk-return optimization model",
      "C": "Evaluate all investments strictly on total after-tax wealth impact"
    },
    "correct_option": "A",
    "explanation": "Mental accounting violates the economic fungibility of money by compartmentalizing funds into separate mental buckets (e.g. 'safe money', 'gambling money', 'house money') with inconsistent risk tolerances.",
    "distractor_analysis": {
      "A": "Correct. Mental accounting violates the economic fungibility of money by compartmentalizi",
      "B": "Incorrect. Common distractor based on: Assuming mental accounting optimizes total portfolio wealth.",
      "C": "Incorrect. Common distractor based on: Assuming mental accounting optimizes total portfolio wealth."
    },
    "misconception": "Assuming mental accounting optimizes total portfolio wealth.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Portfolio Management",
    "skill_domain": "Behavioral Biases",
    "difficulty_tier": 2,
    "question_text": "An investor who claims after a market crash that they 'knew it was going to crash all along' despite holding a 100% equity portfolio throughout is displaying:",
    "options": {
      "A": "Hindsight bias",
      "B": "Representativeness bias",
      "C": "Self-control bias"
    },
    "correct_option": "A",
    "explanation": "Hindsight bias is the cognitive tendency to perceive past events as having been predictable ('I knew it all along') after they have already occurred, creating unwarranted overconfidence in future forecasting.",
    "distractor_analysis": {
      "A": "Correct. Hindsight bias is the cognitive tendency to perceive past events as having been ",
      "B": "Incorrect. Common distractor based on: Confusing hindsight bias with representativeness.",
      "C": "Incorrect. Common distractor based on: Confusing hindsight bias with representativeness."
    },
    "misconception": "Confusing hindsight bias with representativeness.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Portfolio Management",
    "skill_domain": "Behavioral Biases",
    "difficulty_tier": 2,
    "question_text": "Overconfidence bias typically manifests in retail investors as:",
    "options": {
      "A": "Underestimating downside risk, overestimating personal forecasting skill, and trading excessively with insufficient diversification",
      "B": "Holding 100% of wealth in risk-free Treasury bills",
      "C": "Relying strictly on low-cost passive index funds"
    },
    "correct_option": "A",
    "explanation": "Overconfidence leads investors to overestimate the precision of their knowledge and control over outcomes, resulting in high portfolio turnover, excessive risk-taking, and inadequate diversification.",
    "distractor_analysis": {
      "A": "Correct. Overconfidence leads investors to overestimate the precision of their knowledge ",
      "B": "Incorrect. Common distractor based on: Believing overconfidence causes excessive risk aversion.",
      "C": "Incorrect. Common distractor based on: Believing overconfidence causes excessive risk aversion."
    },
    "misconception": "Believing overconfidence causes excessive risk aversion.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Portfolio Management",
    "skill_domain": "Behavioral Biases",
    "difficulty_tier": 2,
    "question_text": "The endowment bias refers to the behavioral tendency of individuals to:",
    "options": {
      "A": "Value an asset more highly simply because they currently own it compared to what they would pay to acquire it",
      "B": "Donate entire investment portfolios to charitable endowments",
      "C": "Prefer high-dividend yield endowments over growth equities"
    },
    "correct_option": "A",
    "explanation": "Endowment bias causes owners to demand a significantly higher price to sell an asset they own than they would be willing to pay to buy the exact same asset if they did not own it (attachment to status quo).",
    "distractor_analysis": {
      "A": "Correct. Endowment bias causes owners to demand a significantly higher price to sell an a",
      "B": "Incorrect. Common distractor based on: Confusing endowment bias with university endowment funds.",
      "C": "Incorrect. Common distractor based on: Confusing endowment bias with university endowment funds."
    },
    "misconception": "Confusing endowment bias with university endowment funds.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Portfolio Management",
    "skill_domain": "Behavioral Biases",
    "difficulty_tier": 2,
    "question_text": "Representativeness bias leads investors to:",
    "options": {
      "A": "Classify new investments based on superficial resemblance to past successful prototypes (e.g. assuming a 'good company' is automatically a 'good stock')",
      "B": "Diversify equally across all 11 market sectors",
      "C": "Represent minority shareholders on the board of directors"
    },
    "correct_option": "A",
    "explanation": "Representativeness relies on cognitive shortcuts (heuristics), judging an investment based on how closely it matches a stereotype (e.g. assuming strong recent company earnings mean the stock is a bargain).",
    "distractor_analysis": {
      "A": "Correct. Representativeness relies on cognitive shortcuts (heuristics), judging an invest",
      "B": "Incorrect. Common distractor based on: Confusing corporate quality with equity stock attractiveness",
      "C": "Incorrect. Common distractor based on: Confusing corporate quality with equity stock attractiveness"
    },
    "misconception": "Confusing corporate quality with equity stock attractiveness.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Portfolio Management",
    "skill_domain": "Behavioral Biases",
    "difficulty_tier": 2,
    "question_text": "Availability bias causes decision-makers to:",
    "options": {
      "A": "Overweight the probability of events that are easily recalled from memory (such as dramatic, recent, or emotionally vivid news)",
      "B": "Invest only in securities available on domestic exchanges",
      "C": "Keep 100% of portfolio assets in immediately available cash checking accounts"
    },
    "correct_option": "A",
    "explanation": "Availability bias occurs when probability assessments are distorted by how easily examples come to mind, leading investors to overreact to recent headlines (plane crashes, market flash crashes).",
    "distractor_analysis": {
      "A": "Correct. Availability bias occurs when probability assessments are distorted by how easil",
      "B": "Incorrect. Common distractor based on: Confusing availability bias with cash liquidity availability",
      "C": "Incorrect. Common distractor based on: Confusing availability bias with cash liquidity availability"
    },
    "misconception": "Confusing availability bias with cash liquidity availability.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Portfolio Management",
    "skill_domain": "Behavioral Biases",
    "difficulty_tier": 2,
    "question_text": "How does an investment advisor distinguish cognitive errors from emotional biases when coaching wealth management clients?",
    "options": {
      "A": "Cognitive errors stem from faulty reasoning and can often be corrected with education; emotional biases arise from feelings and must typically be accommodated in portfolio design",
      "B": "Emotional biases can be eliminated with simple mathematical spreadsheets",
      "C": "Cognitive errors cannot be altered by advice"
    },
    "correct_option": "A",
    "explanation": "Cognitive errors (informational/reasoning flaws) can often be mitigated through education and disciplined analysis. Emotional biases (instinctive feelings) are deeply ingrained and must usually be adapted to in the IPS.",
    "distractor_analysis": {
      "A": "Correct. Cognitive errors (informational/reasoning flaws) can often be mitigated through ",
      "B": "Incorrect. Common distractor based on: Assuming emotional biases can be easily corrected with lectu",
      "C": "Incorrect. Common distractor based on: Assuming emotional biases can be easily corrected with lectu"
    },
    "misconception": "Assuming emotional biases can be easily corrected with lectures.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Portfolio Management",
    "skill_domain": "Behavioral Biases",
    "difficulty_tier": 2,
    "question_text": "Self-attribution (self-serving) bias occurs when an investor:",
    "options": {
      "A": "Attributes successful investment outcomes to their own superior analytical skill, while blaming losses on bad luck or external market manipulation",
      "B": "Attributes all portfolio results to advice received from financial analysts",
      "C": "Acknowledges personal analytical mistakes openly to clients"
    },
    "correct_option": "A",
    "explanation": "Self-attribution bias leads individuals to take personal credit for favorable outcomes (internal attribution) while externalizing blame for unfavorable outcomes onto market anomalies or external actors.",
    "distractor_analysis": {
      "A": "Correct. Self-attribution bias leads individuals to take personal credit for favorable ou",
      "B": "Incorrect. Common distractor based on: Confusing self-attribution with objective performance attrib",
      "C": "Incorrect. Common distractor based on: Confusing self-attribution with objective performance attrib"
    },
    "misconception": "Confusing self-attribution with objective performance attribution.",
    "time_estimate_seconds": 40
  }
];
