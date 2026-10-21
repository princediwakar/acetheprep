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
      "A": "Correct. Portfolio variance sigma_p^2 = w1^2 sigma1^2 + w2^2 sigma2^2 + 2 w1 w2 rho sigma1 sigma2 = (0.5)^2 (0.2)^2 + (0.5)^2 (0.2)^2 + 2(0.5)(0.5)(-1)(0.2)(0.2) = 0.01 + 0.01 - 0.02 = 0. Standard deviation is 0.0%.",
      "B": "Incorrect. \"10.0%\" is flawed: assuming standard deviation is the average of the two assets (20%) or 10%.",
      "C": "Incorrect. \"20.0%\" is flawed: assuming standard deviation is the average of the two assets (20%) or 10%."
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
      "A": "Include every publicly traded security in equal weights",
      "B": "Maximize expected return for a given level of risk, or minimize risk for a given level of expected return",
      "C": "Contain only risk-free assets"
    },
    "correct_option": "B",
    "explanation": "The Markowitz efficient frontier consists of mean-variance optimized portfolios offering the highest achievable expected return for each unit of risk (standard deviation).",
    "distractor_analysis": {
      "A": "Incorrect. \"Include every publicly traded security in equal weights\" is flawed: confusing the efficient frontier with equal-weighted portfolios.",
      "B": "Correct. The Markowitz efficient frontier consists of mean-variance optimized portfolios offering the highest achievable expected return for each unit of risk (standard deviation).",
      "C": "Incorrect. \"Contain only risk-free assets\" is flawed: confusing the efficient frontier with equal-weighted portfolios."
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
      "A": "Unsystematic (firm-specific) risk only",
      "B": "Total risk (standard deviation)",
      "C": "Systematic (market) risk only"
    },
    "correct_option": "C",
    "explanation": "In competitive capital markets, unsystematic (firm-specific) risk can be eliminated costlessly through diversification. Therefore, investors are compensated only for bearing non-diversifiable systematic risk (beta).",
    "distractor_analysis": {
      "A": "Incorrect. \"Unsystematic (firm-specific) risk only\" is flawed: believing investors are compensated for unsystematic diversifiable risk.",
      "B": "Incorrect. \"Total risk (standard deviation)\" is flawed: believing investors are compensated for unsystematic diversifiable risk.",
      "C": "Correct. In competitive capital markets, unsystematic (firm-specific) risk can be eliminated costlessly through diversification. Therefore, investors are compensated only for bearing non-diversifiable systematic risk (beta)."
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
      "B": "Different classes of corporate bonds",
      "C": "All individual stocks on an electronic exchange"
    },
    "correct_option": "A",
    "explanation": "The CAL is a straight line drawn from the risk-free rate on the y-axis through the optimal tangency portfolio of risky assets on the efficient frontier.",
    "distractor_analysis": {
      "A": "Correct. The CAL is a straight line drawn from the risk-free rate on the y-axis through the optimal tangency portfolio of risky assets on the efficient frontier.",
      "B": "Incorrect. \"Different classes of corporate bonds\" is flawed: confusing the capital allocation line with the markowitz curved frontier.",
      "C": "Incorrect. \"All individual stocks on an electronic exchange\" is flawed: confusing the capital allocation line with the markowitz curved frontier."
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
      "A": "Expected return against systematic risk (beta) for all individual securities",
      "B": "Expected return against total risk (standard deviation) for efficient portfolios combining the risk-free asset and market portfolio",
      "C": "Dividend yield against debt-to-equity ratio"
    },
    "correct_option": "B",
    "explanation": "The CML applies exclusively to efficient portfolios, plotting Expected Return on the y-axis against Total Risk (Standard Deviation) on the x-axis. The SML plots return against Beta.",
    "distractor_analysis": {
      "A": "Incorrect. \"Expected return against systematic risk (beta) for all individual securities\" is flawed: confusing the capital market line (cml, uses sigma) with the security market line (sml, uses beta).",
      "B": "Correct. The CML applies exclusively to efficient portfolios, plotting Expected Return on the y-axis against Total Risk (Standard Deviation) on the x-axis. The SML plots return against Beta.",
      "C": "Incorrect. \"Dividend yield against debt-to-equity ratio\" is flawed: confusing the capital market line (cml, uses sigma) with the security market line (sml, uses beta)."
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
      "A": "8.6%",
      "B": "9.6%",
      "C": "9.0%"
    },
    "correct_option": "C",
    "explanation": "Market risk premium ERP = E(R_m) - R_f = 8% - 3% = 5%. Expected return E(R_i) = R_f + beta * ERP = 3% + 1.2 * (5%) = 3% + 6.0% = 9.0%.",
    "distractor_analysis": {
      "A": "Incorrect. \"8.6%\" is flawed: multiplying beta by market return directly (1.2 * 8% = 9.6%) without subtracting the risk-free rate.",
      "B": "Incorrect. \"9.6%\" is flawed: multiplying beta by market return directly (1.2 * 8% = 9.6%) without subtracting the risk-free rate.",
      "C": "Correct. Market risk premium ERP = E(R_m) - R_f = 8% - 3% = 5%. Expected return E(R_i) = R_f + beta * ERP = 3% + 1.2 * (5%) = 3% + 6.0% = 9.0%."
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
      "A": "Correct. The SML depicts required returns for any given beta. If a security's expected return lies above the SML, it generates positive alpha (excess return over required return), indicating it is undervalued.",
      "B": "Incorrect. \"Overvalued, offering an expected return lower than required\" is flawed: thinking stocks above the sml are overvalued.",
      "C": "Incorrect. \"Correctly priced in equilibrium\" is flawed: thinking stocks above the sml are overvalued."
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
      "A": "Var(R_i) / Var(R_m)",
      "B": "Cov(R_i, R_m) / Var(R_m)",
      "C": "Cov(R_i, R_m) / Var(R_i)"
    },
    "correct_option": "B",
    "explanation": "Beta = Cov(R_i, R_m) / Var(R_m) = [rho_i,m * sigma_i * sigma_m] / sigma_m^2 = rho_i,m * (sigma_i / sigma_m).",
    "distractor_analysis": {
      "A": "Incorrect. \"Var(R_i) / Var(R_m)\" is flawed: inverting variance in the denominator.",
      "B": "Correct. Beta = Cov(R_i, R_m) / Var(R_m) = [rho_i,m * sigma_i * sigma_m] / sigma_m^2 = rho_i,m * (sigma_i / sigma_m).",
      "C": "Incorrect. \"Cov(R_i, R_m) / Var(R_i)\" is flawed: inverting variance in the denominator."
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
      "A": "Strictly negative (< 0.0)",
      "B": "Strictly equal to -1.0",
      "C": "Less than +1.0"
    },
    "correct_option": "C",
    "explanation": "Any correlation less than perfectly positive (rho < +1.0) provides diversification benefits, reducing portfolio standard deviation below the weighted average of individual asset standard deviations.",
    "distractor_analysis": {
      "A": "Incorrect. \"Strictly negative (< 0.0)\" is flawed: believing negative correlation is required for diversification (any rho < +1.0 helps).",
      "B": "Incorrect. \"Strictly equal to -1.0\" is flawed: believing negative correlation is required for diversification (any rho < +1.0 helps).",
      "C": "Correct. Any correlation less than perfectly positive (rho < +1.0) provides diversification benefits, reducing portfolio standard deviation below the weighted average of individual asset standard deviations."
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
      "B": "The market risk premium divided by beta",
      "C": "The Treynor ratio of the market portfolio"
    },
    "correct_option": "A",
    "explanation": "Slope of CML = [E(R_m) - R_f] / sigma_m, which is exactly the Sharpe ratio of the market portfolio.",
    "distractor_analysis": {
      "A": "Correct. Slope of CML = [E(R_m) - R_f] / sigma_m, which is exactly the Sharpe ratio of the market portfolio.",
      "B": "Incorrect. \"The market risk premium divided by beta\" is flawed: confusing cml slope (sharpe ratio) with sml slope (market risk premium).",
      "C": "Incorrect. \"The Treynor ratio of the market portfolio\" is flawed: confusing cml slope (sharpe ratio) with sml slope (market risk premium)."
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
      "A": "Purchasing put options on the market index",
      "B": "Holding a well-diversified portfolio of approximately 30 or more securities across diverse industries",
      "C": "Investing 100% in high-beta technology equities"
    },
    "correct_option": "B",
    "explanation": "Empirical portfolio theory shows that combining 30-40 uncorrelated stocks across diverse industries diversifies away virtually all firm-specific unsystematic variance.",
    "distractor_analysis": {
      "A": "Incorrect. \"Purchasing put options on the market index\" is flawed: assuming unsystematic risk cannot be diversified away.",
      "B": "Correct. Empirical portfolio theory shows that combining 30-40 uncorrelated stocks across diverse industries diversifies away virtually all firm-specific unsystematic variance.",
      "C": "Incorrect. \"Investing 100% in high-beta technology equities\" is flawed: assuming unsystematic risk cannot be diversified away."
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
      "A": "Macroeconomic GDP growth rate",
      "B": "Risk tolerance and Target return",
      "C": "Liquidity requirements and Time horizon"
    },
    "correct_option": "C",
    "explanation": "RRTTLLU framework separates Objectives (Risk, Return) from Constraints: Time horizon, Taxes, Liquidity, Legal/Regulatory, and Unique circumstances.",
    "distractor_analysis": {
      "A": "Incorrect. \"Macroeconomic GDP growth rate\" is flawed: confusing investment objectives (risk, return) with constraints.",
      "B": "Incorrect. \"Risk tolerance and Target return\" is flawed: confusing investment objectives (risk, return) with constraints.",
      "C": "Correct. RRTTLLU framework separates Objectives (Risk, Return) from Constraints: Time horizon, Taxes, Liquidity, Legal/Regulatory, and Unique circumstances."
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
      "A": "Correct. Strategic Asset Allocation (SAA) sets the long-term baseline asset mix (e.g. 60% equities / 40% bonds) reflecting client IPS goals. Tactical Asset Allocation (TAA) makes short-term tactical tilts.",
      "B": "Incorrect. \"Short-term deviations from target weights to exploit temporary market mispricings\" is flawed: confusing strategic asset allocation (long-term) with tactical asset allocation (short-term).",
      "C": "Incorrect. \"Daily intraday momentum stock trading signals\" is flawed: confusing strategic asset allocation (long-term) with tactical asset allocation (short-term)."
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
      "A": "Rebalancing back to original baseline weights after price movements",
      "B": "Short-term, active deviations from strategic asset allocation weights to capitalize on temporary relative asset mispricings",
      "C": "Permanent revisions to a client's core risk tolerance profile"
    },
    "correct_option": "B",
    "explanation": "TAA allows portfolio managers to temporarily overweight or underweight specific asset classes relative to the long-term SAA target based on medium-term macro or valuation expectations.",
    "distractor_analysis": {
      "A": "Incorrect. \"Rebalancing back to original baseline weights after price movements\" is flawed: confusing tactical allocation with passive rebalancing.",
      "B": "Correct. TAA allows portfolio managers to temporarily overweight or underweight specific asset classes relative to the long-term SAA target based on medium-term macro or valuation expectations.",
      "C": "Incorrect. \"Permanent revisions to a client's core risk tolerance profile\" is flawed: confusing tactical allocation with passive rebalancing."
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
      "A": "Low ability to take risk due to age",
      "B": "High willingness but low ability to take risk",
      "C": "High ability and high willingness to take risk"
    },
    "correct_option": "C",
    "explanation": "Long time horizons, secure employment, and large asset cushions create high financial ability to absorb risk. If psychological attitude is also comfortable with volatility, both ability and willingness are high.",
    "distractor_analysis": {
      "A": "Incorrect. \"Low ability to take risk due to age\" is flawed: confusing ability to take risk (financial capacity) with willingness (psychological comfort).",
      "B": "Incorrect. \"High willingness but low ability to take risk\" is flawed: confusing ability to take risk (financial capacity) with willingness (psychological comfort).",
      "C": "Correct. Long time horizons, secure employment, and large asset cushions create high financial ability to absorb risk. If psychological attitude is also comfortable with volatility, both ability and willingness are high."
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
      "B": "Disregard the IPS and invest in speculative venture capital",
      "C": "Adopt an aggressive high-beta growth strategy to satisfy willingness"
    },
    "correct_option": "A",
    "explanation": "When ability and willingness conflict, ability (objective financial reality) must always take precedence over subjective psychological willingness to safeguard the client from ruin.",
    "distractor_analysis": {
      "A": "Correct. When ability and willingness conflict, ability (objective financial reality) must always take precedence over subjective psychological willingness to safeguard the client from ruin.",
      "B": "Incorrect. \"Disregard the IPS and invest in speculative venture capital\" is flawed: prioritizing psychological willingness over financial inability to bear losses.",
      "C": "Incorrect. \"Adopt an aggressive high-beta growth strategy to satisfy willingness\" is flawed: prioritizing psychological willingness over financial inability to bear losses."
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
      "A": "Limits total dollar losses to zero in all calendar quarters",
      "B": "Allocates total permissible portfolio risk across different asset classes, strategies, and active managers",
      "C": "Calculates historical standard deviations without forward forecasts"
    },
    "correct_option": "B",
    "explanation": "Risk budgeting decomposes and allocates total allowable portfolio risk (variance or tracking error) across asset classes and active management mandates to maximize risk-adjusted return.",
    "distractor_analysis": {
      "A": "Incorrect. \"Limits total dollar losses to zero in all calendar quarters\" is flawed: confusing risk budgeting with zero-loss guarantees.",
      "B": "Correct. Risk budgeting decomposes and allocates total allowable portfolio risk (variance or tracking error) across asset classes and active management mandates to maximize risk-adjusted return.",
      "C": "Incorrect. \"Calculates historical standard deviations without forward forecasts\" is flawed: confusing risk budgeting with zero-loss guarantees."
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
      "A": "A pure active stock picking strategy with zero index funds",
      "B": "100% investment in space exploration technology stocks",
      "C": "A passive, low-cost core portfolio tracking broad benchmarks with active 'satellite' specialized strategies seeking alpha"
    },
    "correct_option": "C",
    "explanation": "Core-satellite blends a large, low-cost passive core (providing efficient beta exposure) with smaller satellite allocations to specialized active managers seeking uncorrelated alpha.",
    "distractor_analysis": {
      "A": "Incorrect. \"A pure active stock picking strategy with zero index funds\" is flawed: thinking core-satellite refers to aerospace sector investing.",
      "B": "Incorrect. \"100% investment in space exploration technology stocks\" is flawed: thinking core-satellite refers to aerospace sector investing.",
      "C": "Correct. Core-satellite blends a large, low-cost passive core (providing efficient beta exposure) with smaller satellite allocations to specialized active managers seeking uncorrelated alpha."
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
      "A": "Correct. Proper asset classes must be mutually exclusive and internally homogeneous, exhibiting high internal correlation but low correlation across different classes to maximize diversification power.",
      "B": "Incorrect. \"To make individual security selection impossible\" is flawed: assuming asset classes should be highly correlated with each other.",
      "C": "Incorrect. \"To reduce trading liquidity across exchanges\" is flawed: assuming asset classes should be highly correlated with each other."
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
      "A": "Legal and regulatory compliance preamble",
      "B": "Performance evaluation and review guidelines",
      "C": "Taxation constraints section"
    },
    "correct_option": "B",
    "explanation": "The performance review section outlines benchmark selection, evaluation frequency, rebalancing thresholds, and criteria for reviewing and replacing investment managers.",
    "distractor_analysis": {
      "A": "Incorrect. \"Legal and regulatory compliance preamble\" is flawed: confusing performance review with tax constraints.",
      "B": "Correct. The performance review section outlines benchmark selection, evaluation frequency, rebalancing thresholds, and criteria for reviewing and replacing investment managers.",
      "C": "Incorrect. \"Taxation constraints section\" is flawed: confusing performance review with tax constraints."
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
      "A": "Selling all lagging assets and doubling down on recent winners",
      "B": "Liquidating the portfolio into cash every December 31",
      "C": "Selling appreciated asset classes that have grown above target weights and buying underperforming classes that have fallen below target"
    },
    "correct_option": "C",
    "explanation": "Rebalancing maintains the intended risk profile of the IPS by systematically taking profits from outperforming asset classes and redeploying cash into underperforming classes.",
    "distractor_analysis": {
      "A": "Incorrect. \"Selling all lagging assets and doubling down on recent winners\" is flawed: assuming rebalancing involves chasing momentum winners.",
      "B": "Incorrect. \"Liquidating the portfolio into cash every December 31\" is flawed: assuming rebalancing involves chasing momentum winners.",
      "C": "Correct. Rebalancing maintains the intended risk profile of the IPS by systematically taking profits from outperforming asset classes and redeploying cash into underperforming classes."
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
      "B": "Completely unconstrained by beneficiary demographics",
      "C": "Expanding indefinitely across 50 years"
    },
    "correct_option": "A",
    "explanation": "As beneficiaries age and retire, cash outflow obligations accelerate, shortening the plan's effective time horizon and elevating liquidity constraints, requiring shifts from equities to fixed income.",
    "distractor_analysis": {
      "A": "Correct. As beneficiaries age and retire, cash outflow obligations accelerate, shortening the plan's effective time horizon and elevating liquidity constraints, requiring shifts from equities to fixed income.",
      "B": "Incorrect. \"Completely unconstrained by beneficiary demographics\" is flawed: assuming all pension plans have perpetual long-term time horizons.",
      "C": "Incorrect. \"Expanding indefinitely across 50 years\" is flawed: assuming all pension plans have perpetual long-term time horizons."
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
      "A": "Overconfidence bias",
      "B": "The disposition effect (driven by loss aversion and mental accounting)",
      "C": "Conservatism bias"
    },
    "correct_option": "B",
    "explanation": "The disposition effect is the tendency to realize gains prematurely ('lock in a win') while holding depreciated losing positions to avoid acknowledging regret and realizing a painful loss.",
    "distractor_analysis": {
      "A": "Incorrect. \"Overconfidence bias\" is flawed: confusing the disposition effect with overconfidence.",
      "B": "Correct. The disposition effect is the tendency to realize gains prematurely ('lock in a win') while holding depreciated losing positions to avoid acknowledging regret and realizing a painful loss.",
      "C": "Incorrect. \"Conservatism bias\" is flawed: confusing the disposition effect with overconfidence."
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
      "A": "Confirms existing hypotheses by seeking only supportive news",
      "B": "Invests only in maritime shipping company stocks",
      "C": "Over-relies on an initial piece of information (such as original purchase price) and makes insufficient adjustments as new data arrives"
    },
    "correct_option": "C",
    "explanation": "Anchoring occurs when an individual fixates on an initial psychological reference point (like purchase price or an analyst target) and fails to adjust expectations adequately when fundamentals change.",
    "distractor_analysis": {
      "A": "Incorrect. \"Confirms existing hypotheses by seeking only supportive news\" is flawed: thinking anchoring relates to maritime investments.",
      "B": "Incorrect. \"Invests only in maritime shipping company stocks\" is flawed: thinking anchoring relates to maritime investments.",
      "C": "Correct. Anchoring occurs when an individual fixates on an initial psychological reference point (like purchase price or an analyst target) and fails to adjust expectations adequately when fundamentals change."
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
      "A": "Correct. Confirmation bias is the cognitive error of seeking, valuing, and remembering only information that confirms existing beliefs while actively ignoring or dismissing contradicting evidence.",
      "B": "Incorrect. \"Availability bias\" is flawed: confusing confirmation bias with availability bias.",
      "C": "Incorrect. \"Gambler's fallacy\" is flawed: confusing confirmation bias with availability bias."
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
      "A": "Evaluate all investments strictly on total after-tax wealth impact",
      "B": "Treat money differently depending on its source or intended purpose (e.g. spending an unexpected bonus recklessly while hoarding salary)",
      "C": "Combine all assets into a single comprehensive risk-return optimization model"
    },
    "correct_option": "B",
    "explanation": "Mental accounting violates the economic fungibility of money by compartmentalizing funds into separate mental buckets (e.g. 'safe money', 'gambling money', 'house money') with inconsistent risk tolerances.",
    "distractor_analysis": {
      "A": "Incorrect. \"Evaluate all investments strictly on total after-tax wealth impact\" is flawed: assuming mental accounting optimizes total portfolio wealth.",
      "B": "Correct. Mental accounting violates the economic fungibility of money by compartmentalizing funds into separate mental buckets (e.g. 'safe money', 'gambling money', 'house money') with inconsistent risk tolerances.",
      "C": "Incorrect. \"Combine all assets into a single comprehensive risk-return optimization model\" is flawed: assuming mental accounting optimizes total portfolio wealth."
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
      "A": "Representativeness bias",
      "B": "Self-control bias",
      "C": "Hindsight bias"
    },
    "correct_option": "C",
    "explanation": "Hindsight bias is the cognitive tendency to perceive past events as having been predictable ('I knew it all along') after they have already occurred, creating unwarranted overconfidence in future forecasting.",
    "distractor_analysis": {
      "A": "Incorrect. \"Representativeness bias\" is flawed: confusing hindsight bias with representativeness.",
      "B": "Incorrect. \"Self-control bias\" is flawed: confusing hindsight bias with representativeness.",
      "C": "Correct. Hindsight bias is the cognitive tendency to perceive past events as having been predictable ('I knew it all along') after they have already occurred, creating unwarranted overconfidence in future forecasting."
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
      "B": "Relying strictly on low-cost passive index funds",
      "C": "Holding 100% of wealth in risk-free Treasury bills"
    },
    "correct_option": "A",
    "explanation": "Overconfidence leads investors to overestimate the precision of their knowledge and control over outcomes, resulting in high portfolio turnover, excessive risk-taking, and inadequate diversification.",
    "distractor_analysis": {
      "A": "Correct. Overconfidence leads investors to overestimate the precision of their knowledge and control over outcomes, resulting in high portfolio turnover, excessive risk-taking, and inadequate diversification.",
      "B": "Incorrect. \"Relying strictly on low-cost passive index funds\" is flawed: believing overconfidence causes excessive risk aversion.",
      "C": "Incorrect. \"Holding 100% of wealth in risk-free Treasury bills\" is flawed: believing overconfidence causes excessive risk aversion."
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
      "A": "Donate entire investment portfolios to charitable endowments",
      "B": "Value an asset more highly simply because they currently own it compared to what they would pay to acquire it",
      "C": "Prefer high-dividend yield endowments over growth equities"
    },
    "correct_option": "B",
    "explanation": "Endowment bias causes owners to demand a significantly higher price to sell an asset they own than they would be willing to pay to buy the exact same asset if they did not own it (attachment to status quo).",
    "distractor_analysis": {
      "A": "Incorrect. \"Donate entire investment portfolios to charitable endowments\" is flawed: confusing endowment bias with university endowment funds.",
      "B": "Correct. Endowment bias causes owners to demand a significantly higher price to sell an asset they own than they would be willing to pay to buy the exact same asset if they did not own it (attachment to status quo).",
      "C": "Incorrect. \"Prefer high-dividend yield endowments over growth equities\" is flawed: confusing endowment bias with university endowment funds."
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
      "A": "Represent minority shareholders on the board of directors",
      "B": "Diversify equally across all 11 market sectors",
      "C": "Classify new investments based on superficial resemblance to past successful prototypes (e.g. assuming a 'good company' is automatically a 'good stock')"
    },
    "correct_option": "C",
    "explanation": "Representativeness relies on cognitive shortcuts (heuristics), judging an investment based on how closely it matches a stereotype (e.g. assuming strong recent company earnings mean the stock is a bargain).",
    "distractor_analysis": {
      "A": "Incorrect. \"Represent minority shareholders on the board of directors\" is flawed: confusing corporate quality with equity stock attractiveness.",
      "B": "Incorrect. \"Diversify equally across all 11 market sectors\" is flawed: confusing corporate quality with equity stock attractiveness.",
      "C": "Correct. Representativeness relies on cognitive shortcuts (heuristics), judging an investment based on how closely it matches a stereotype (e.g. assuming strong recent company earnings mean the stock is a bargain)."
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
      "A": "Correct. Availability bias occurs when probability assessments are distorted by how easily examples come to mind, leading investors to overreact to recent headlines (plane crashes, market flash crashes).",
      "B": "Incorrect. \"Invest only in securities available on domestic exchanges\" is flawed: confusing availability bias with cash liquidity availability.",
      "C": "Incorrect. \"Keep 100% of portfolio assets in immediately available cash checking accounts\" is flawed: confusing availability bias with cash liquidity availability."
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
      "A": "Cognitive errors cannot be altered by advice",
      "B": "Cognitive errors stem from faulty reasoning and can often be corrected with education; emotional biases arise from feelings and must typically be accommodated in portfolio design",
      "C": "Emotional biases can be eliminated with simple mathematical spreadsheets"
    },
    "correct_option": "B",
    "explanation": "Cognitive errors (informational/reasoning flaws) can often be mitigated through education and disciplined analysis. Emotional biases (instinctive feelings) are deeply ingrained and must usually be adapted to in the IPS.",
    "distractor_analysis": {
      "A": "Incorrect. \"Cognitive errors cannot be altered by advice\" is flawed: assuming emotional biases can be easily corrected with lectures.",
      "B": "Correct. Cognitive errors (informational/reasoning flaws) can often be mitigated through education and disciplined analysis. Emotional biases (instinctive feelings) are deeply ingrained and must usually be adapted to in the IPS.",
      "C": "Incorrect. \"Emotional biases can be eliminated with simple mathematical spreadsheets\" is flawed: assuming emotional biases can be easily corrected with lectures."
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
      "A": "Attributes all portfolio results to advice received from financial analysts",
      "B": "Acknowledges personal analytical mistakes openly to clients",
      "C": "Attributes successful investment outcomes to their own superior analytical skill, while blaming losses on bad luck or external market manipulation"
    },
    "correct_option": "C",
    "explanation": "Self-attribution bias leads individuals to take personal credit for favorable outcomes (internal attribution) while externalizing blame for unfavorable outcomes onto market anomalies or external actors.",
    "distractor_analysis": {
      "A": "Incorrect. \"Attributes all portfolio results to advice received from financial analysts\" is flawed: confusing self-attribution with objective performance attribution.",
      "B": "Incorrect. \"Acknowledges personal analytical mistakes openly to clients\" is flawed: confusing self-attribution with objective performance attribution.",
      "C": "Correct. Self-attribution bias leads individuals to take personal credit for favorable outcomes (internal attribution) while externalizing blame for unfavorable outcomes onto market anomalies or external actors."
    },
    "misconception": "Confusing self-attribution with objective performance attribution.",
    "time_estimate_seconds": 40
  }
];
