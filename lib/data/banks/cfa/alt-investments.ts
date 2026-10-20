// Path: lib/data/banks/cfa/alt-investments.ts
import type { SeedQuestion } from "../../question-bank-seed";

export const CFA_ALT_INVESTMENTS_QUESTIONS: SeedQuestion[] = [
  {
    "exam_name": "CFA Level 1",
    "subject": "Alternative Investments",
    "skill_domain": "Real Estate",
    "difficulty_tier": 2,
    "question_text": "A commercial property generates Net Operating Income (NOI) of $600,000. If the market capitalization rate for comparable properties is 8%, what is the estimated property value?",
    "options": {
      "A": "$7,500,000",
      "B": "$4,800,000",
      "C": "$6,000,000",
      "D": "$9,000,000"
    },
    "correct_option": "A",
    "explanation": "Value = NOI / Capitalization Rate = $600,000 / 0.08 = $7,500,000.",
    "distractor_analysis": {
      "A": "Correct. Value = NOI / Capitalization Rate = $600,000 / 0.08 = $7,500,000.",
      "B": "Incorrect. Common distractor based on: Multiplying NOI by cap rate ($600,000 * 0.08 = $48,000) or d",
      "C": "Incorrect. Common distractor based on: Multiplying NOI by cap rate ($600,000 * 0.08 = $48,000) or d",
      "D": "Incorrect. Common distractor based on: Multiplying NOI by cap rate ($600,000 * 0.08 = $48,000) or d"
    },
    "misconception": "Multiplying NOI by cap rate ($600,000 * 0.08 = $48,000) or dividing incorrectly.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Alternative Investments",
    "skill_domain": "Real Estate",
    "difficulty_tier": 2,
    "question_text": "In real estate appraisal, Net Operating Income (NOI) is calculated as:",
    "options": {
      "A": "Potential Gross Income minus vacancy and collection losses minus property operating expenses",
      "B": "Gross revenues minus mortgage debt service payments",
      "C": "Net income after income taxes and depreciation",
      "D": "Total rental receipts minus capital expenditures"
    },
    "correct_option": "A",
    "explanation": "NOI = Potential Gross Income - Vacancy/Credit Loss + Other Income - Operating Expenses (property taxes, insurance, maintenance). NOI excludes debt service and income taxes.",
    "distractor_analysis": {
      "A": "Correct. NOI = Potential Gross Income - Vacancy/Credit Loss + Other Income - Operating Ex",
      "B": "Incorrect. Common distractor based on: Deducting mortgage debt payments from NOI.",
      "C": "Incorrect. Common distractor based on: Deducting mortgage debt payments from NOI.",
      "D": "Incorrect. Common distractor based on: Deducting mortgage debt payments from NOI."
    },
    "misconception": "Deducting mortgage debt payments from NOI.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Alternative Investments",
    "skill_domain": "Real Estate",
    "difficulty_tier": 2,
    "question_text": "How do Real Estate Investment Trusts (REITs) differ from direct real estate ownership regarding liquidity?",
    "options": {
      "A": "REITs trade publicly on stock exchanges, providing high liquidity compared to illiquid private direct property transactions",
      "B": "Direct property ownership is substantially more liquid than REITs",
      "C": "REITs cannot be bought or sold by retail investors",
      "D": "Both REITs and direct real estate are completely illiquid"
    },
    "correct_option": "A",
    "explanation": "Publicly traded REITs trade continuously with high liquidity on stock exchanges, whereas physical real estate transactions take months with high transaction fees and appraisals.",
    "distractor_analysis": {
      "A": "Correct. Publicly traded REITs trade continuously with high liquidity on stock exchanges,",
      "B": "Incorrect. Common distractor based on: Thinking direct real estate is more liquid than exchange-tra",
      "C": "Incorrect. Common distractor based on: Thinking direct real estate is more liquid than exchange-tra",
      "D": "Incorrect. Common distractor based on: Thinking direct real estate is more liquid than exchange-tra"
    },
    "misconception": "Thinking direct real estate is more liquid than exchange-traded REITs.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Alternative Investments",
    "skill_domain": "Real Estate",
    "difficulty_tier": 2,
    "question_text": "In real estate performance measurement, an appraisal-based index tends to:",
    "options": {
      "A": "Lag actual market values and understate return volatility due to appraisal smoothing",
      "B": "Exaggerate short-term price volatility compared to REITs",
      "C": "Accurately reflect daily transaction clearing prices",
      "D": "Lead the broader public equity markets by several months"
    },
    "correct_option": "A",
    "explanation": "Appraisal-based indexes rely on infrequent subjective appraisals, which smooth returns over time, understating true volatility and correlation with other asset classes.",
    "distractor_analysis": {
      "A": "Correct. Appraisal-based indexes rely on infrequent subjective appraisals, which smooth r",
      "B": "Incorrect. Common distractor based on: Assuming appraisal indexes overstate volatility.",
      "C": "Incorrect. Common distractor based on: Assuming appraisal indexes overstate volatility.",
      "D": "Incorrect. Common distractor based on: Assuming appraisal indexes overstate volatility."
    },
    "misconception": "Assuming appraisal indexes overstate volatility.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Alternative Investments",
    "skill_domain": "Real Estate",
    "difficulty_tier": 2,
    "question_text": "Which real estate valuation approach estimates property value by adding estimated land value to the reproduction cost of improvements minus depreciation?",
    "options": {
      "A": "Cost approach",
      "B": "Sales comparison approach",
      "C": "Income capitalization approach",
      "D": "Discounted cash flow approach"
    },
    "correct_option": "A",
    "explanation": "The Cost Approach values a property as: Estimated Land Value + (Cost to Reconstruct Building New - Accrued Physical/Functional Depreciation). Useful for specialized properties (schools, hospitals).",
    "distractor_analysis": {
      "A": "Correct. The Cost Approach values a property as: Estimated Land Value + (Cost to Reconstr",
      "B": "Incorrect. Common distractor based on: Confusing the cost approach with sales comparison approach.",
      "C": "Incorrect. Common distractor based on: Confusing the cost approach with sales comparison approach.",
      "D": "Incorrect. Common distractor based on: Confusing the cost approach with sales comparison approach."
    },
    "misconception": "Confusing the cost approach with sales comparison approach.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Alternative Investments",
    "skill_domain": "Real Estate",
    "difficulty_tier": 2,
    "question_text": "A retail shopping mall lease that requires tenants to pay a base rent plus a percentage of gross sales is known as a:",
    "options": {
      "A": "Percentage lease",
      "B": "Gross lease",
      "C": "Triple net lease",
      "D": "Ground lease"
    },
    "correct_option": "A",
    "explanation": "A percentage lease specifies a base minimum rent supplemented by percentage overage rent once tenant sales surpass a threshold breakpoint, aligning landlord and tenant incentives.",
    "distractor_analysis": {
      "A": "Correct. A percentage lease specifies a base minimum rent supplemented by percentage over",
      "B": "Incorrect. Common distractor based on: Confusing percentage lease with triple net lease.",
      "C": "Incorrect. Common distractor based on: Confusing percentage lease with triple net lease.",
      "D": "Incorrect. Common distractor based on: Confusing percentage lease with triple net lease."
    },
    "misconception": "Confusing percentage lease with triple net lease.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Alternative Investments",
    "skill_domain": "Real Estate",
    "difficulty_tier": 2,
    "question_text": "In a 'triple net lease' (NNN), the commercial tenant is responsible for paying:",
    "options": {
      "A": "Property real estate taxes, building insurance, and structural/common maintenance costs in addition to base rent",
      "B": "Only the base rent, with landlord covering all operating expenses",
      "C": "Mortgage principal payments of the landlord",
      "D": "Corporate income taxes on the landlord's rental profit"
    },
    "correct_option": "A",
    "explanation": "In a triple net lease, the tenant pays all operational property expenses (taxes, insurance, and maintenance/utilities) directly, passing operating expense risk from landlord to tenant.",
    "distractor_analysis": {
      "A": "Correct. In a triple net lease, the tenant pays all operational property expenses (taxes,",
      "B": "Incorrect. Common distractor based on: Assuming landlords pay maintenance in a triple net lease.",
      "C": "Incorrect. Common distractor based on: Assuming landlords pay maintenance in a triple net lease.",
      "D": "Incorrect. Common distractor based on: Assuming landlords pay maintenance in a triple net lease."
    },
    "misconception": "Assuming landlords pay maintenance in a triple net lease.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Alternative Investments",
    "skill_domain": "Real Estate",
    "difficulty_tier": 2,
    "question_text": "The capitalization rate (cap rate) in commercial real estate is mathematically analogous to:",
    "options": {
      "A": "The dividend yield (current yield) of a stock with zero immediate growth adjustment",
      "B": "The coupon rate of a zero-coupon bond",
      "C": "The Price-to-Earnings multiple",
      "D": "The internal rate of return of an LBO fund"
    },
    "correct_option": "A",
    "explanation": "Cap rate = NOI / Value. In the Gordon growth model P = D / (r - g), D / P = r - g. Cap rate reflects the current operating income yield required by investors (r - g).",
    "distractor_analysis": {
      "A": "Correct. Cap rate = NOI / Value. In the Gordon growth model P = D / (r - g), D / P = r - ",
      "B": "Incorrect. Common distractor based on: Confusing cap rate with equity P/E multiple.",
      "C": "Incorrect. Common distractor based on: Confusing cap rate with equity P/E multiple.",
      "D": "Incorrect. Common distractor based on: Confusing cap rate with equity P/E multiple."
    },
    "misconception": "Confusing cap rate with equity P/E multiple.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Alternative Investments",
    "skill_domain": "Real Estate",
    "difficulty_tier": 2,
    "question_text": "Real estate investments offer institutional portfolios several structural advantages, primarily:",
    "options": {
      "A": "Income generation, inflation hedging capability, and diversification benefits against public equities",
      "B": "Zero capital expenditure requirements",
      "C": "Exemption from all local property regulations",
      "D": "Guaranteed liquidity during severe financial crises"
    },
    "correct_option": "A",
    "explanation": "Real estate provides steady rental income, capital appreciation, inflation protection (leases adjust with inflation), and diversification via moderate correlation with equities.",
    "distractor_analysis": {
      "A": "Correct. Real estate provides steady rental income, capital appreciation, inflation prote",
      "B": "Incorrect. Common distractor based on: Assuming real estate requires zero capital maintenance.",
      "C": "Incorrect. Common distractor based on: Assuming real estate requires zero capital maintenance.",
      "D": "Incorrect. Common distractor based on: Assuming real estate requires zero capital maintenance."
    },
    "misconception": "Assuming real estate requires zero capital maintenance.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Alternative Investments",
    "skill_domain": "Real Estate",
    "difficulty_tier": 2,
    "question_text": "A real estate debt investment (such as a senior commercial mortgage) is positioned in the capital stack:",
    "options": {
      "A": "Senior to equity claims, receiving priority debt service payments and backed by property collateral",
      "B": "Subordinated to common equity dividends",
      "C": "Equal in priority to unsecured corporate commercial paper",
      "D": "Junior to preferred equity dividends"
    },
    "correct_option": "A",
    "explanation": "Senior mortgage debt sits at the bottom/base of the capital stack, holding first-priority legal claims on property operating cash flows and physical collateral before any equity distributions.",
    "distractor_analysis": {
      "A": "Correct. Senior mortgage debt sits at the bottom/base of the capital stack, holding first",
      "B": "Incorrect. Common distractor based on: Placing debt junior to equity.",
      "C": "Incorrect. Common distractor based on: Placing debt junior to equity.",
      "D": "Incorrect. Common distractor based on: Placing debt junior to equity."
    },
    "misconception": "Placing debt junior to equity.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Alternative Investments",
    "skill_domain": "Real Estate",
    "difficulty_tier": 2,
    "question_text": "Repeat-sales real estate indexes measure price changes by:",
    "options": {
      "A": "Tracking transaction sale prices of the exact same physical properties over repeated sales transactions",
      "B": "Surveying local real estate brokers on hypothetical valuations",
      "C": "Calculating reproduction costs of new housing starts",
      "D": "Tracking changes in commercial mortgage interest rates"
    },
    "correct_option": "A",
    "explanation": "Repeat-sales indexes (such as Case-Shiller) evaluate price changes solely on properties that have sold at least twice, controlling for physical property characteristics and quality.",
    "distractor_analysis": {
      "A": "Correct. Repeat-sales indexes (such as Case-Shiller) evaluate price changes solely on pro",
      "B": "Incorrect. Common distractor based on: Confusing repeat-sales with appraisal-based indexes.",
      "C": "Incorrect. Common distractor based on: Confusing repeat-sales with appraisal-based indexes.",
      "D": "Incorrect. Common distractor based on: Confusing repeat-sales with appraisal-based indexes."
    },
    "misconception": "Confusing repeat-sales with appraisal-based indexes.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Alternative Investments",
    "skill_domain": "Private Equity",
    "difficulty_tier": 2,
    "question_text": "In a Leveraged Buyout (LBO), the acquisition of a target company is financed primarily with:",
    "options": {
      "A": "A high proportion of debt (e.g. 60-80%) and a small equity contribution from the PE sponsor",
      "B": "100% newly issued common stock from public markets",
      "C": "Direct cash grants from international development agencies",
      "D": "Venture capital convertible preferred equity"
    },
    "correct_option": "A",
    "explanation": "LBOs utilize high financial leverage (typically 60-80% debt via senior secured bank loans and high-yield junk bonds) backed by target company cash flows and assets.",
    "distractor_analysis": {
      "A": "Correct. LBOs utilize high financial leverage (typically 60-80% debt via senior secured b",
      "B": "Incorrect. Common distractor based on: Assuming LBOs are financed mostly with cash equity.",
      "C": "Incorrect. Common distractor based on: Assuming LBOs are financed mostly with cash equity.",
      "D": "Incorrect. Common distractor based on: Assuming LBOs are financed mostly with cash equity."
    },
    "misconception": "Assuming LBOs are financed mostly with cash equity.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Alternative Investments",
    "skill_domain": "Private Equity",
    "difficulty_tier": 2,
    "question_text": "Venture capital investing differs fundamentally from buyout (LBO) investing in that venture capital:",
    "options": {
      "A": "Invests in early-stage start-ups with high technological risk and negative cash flows, using equity rather than heavy debt",
      "B": "Focuses exclusively on mature, stable cash-flow-generating companies",
      "C": "Employs financial leverage ratios exceeding 80%",
      "D": "Involves hostile takeovers of public corporations"
    },
    "correct_option": "A",
    "explanation": "VC funds early-stage innovation companies with high growth potential but negative earnings and zero debt capacity. Buyouts target mature firms with predictable cash flows to service heavy debt.",
    "distractor_analysis": {
      "A": "Correct. VC funds early-stage innovation companies with high growth potential but negativ",
      "B": "Incorrect. Common distractor based on: Confusing early-stage VC with mature debt-heavy LBOs.",
      "C": "Incorrect. Common distractor based on: Confusing early-stage VC with mature debt-heavy LBOs.",
      "D": "Incorrect. Common distractor based on: Confusing early-stage VC with mature debt-heavy LBOs."
    },
    "misconception": "Confusing early-stage VC with mature debt-heavy LBOs.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Alternative Investments",
    "skill_domain": "Private Equity",
    "difficulty_tier": 2,
    "question_text": "In a private equity fund structure, the 'carried interest' represents:",
    "options": {
      "A": "The performance fee (typically 20%) paid to the General Partner on profits exceeding a hurdle rate",
      "B": "The annual 2% management fee charged on committed capital",
      "C": "The interest paid to commercial banks on LBO debt",
      "D": "The legal expenses reimbursed to fund investors"
    },
    "correct_option": "A",
    "explanation": "Carried interest is the GP's incentive share of net capital profits (traditionally 20%), distributed only after returning capital and achieving a predetermined hurdle rate (e.g. 8%).",
    "distractor_analysis": {
      "A": "Correct. Carried interest is the GP's incentive share of net capital profits (traditional",
      "B": "Incorrect. Common distractor based on: Confusing carried interest with management fees.",
      "C": "Incorrect. Common distractor based on: Confusing carried interest with management fees.",
      "D": "Incorrect. Common distractor based on: Confusing carried interest with management fees."
    },
    "misconception": "Confusing carried interest with management fees.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Alternative Investments",
    "skill_domain": "Private Equity",
    "difficulty_tier": 2,
    "question_text": "What is the primary function of a 'clawback provision' in a private equity partnership agreement?",
    "options": {
      "A": "It requires the General Partner to return previously received carried interest distributions if later portfolio investments generate losses",
      "B": "It allows limited partners to withdraw committed capital early without penalty",
      "C": "It prohibits portfolio companies from declaring bankruptcy",
      "D": "It guarantees a minimum annual return of 15% to investors"
    },
    "correct_option": "A",
    "explanation": "A clawback protects LPs by obligating the GP to refund excess carried interest if subsequent investment write-offs drag lifetime fund performance below the agreed profit-split threshold.",
    "distractor_analysis": {
      "A": "Correct. A clawback protects LPs by obligating the GP to refund excess carried interest i",
      "B": "Incorrect. Common distractor based on: Confusing clawbacks with capital call notices.",
      "C": "Incorrect. Common distractor based on: Confusing clawbacks with capital call notices.",
      "D": "Incorrect. Common distractor based on: Confusing clawbacks with capital call notices."
    },
    "misconception": "Confusing clawbacks with capital call notices.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Alternative Investments",
    "skill_domain": "Private Equity",
    "difficulty_tier": 2,
    "question_text": "In private equity terminology, what does 'committed capital' refer to?",
    "options": {
      "A": "The total contractual capital amount pledged by Limited Partners to the fund to be drawn down over time",
      "B": "The cash currently held in the fund's bank account",
      "C": "The market value of acquired portfolio companies",
      "D": "The management fees paid to the general partner to date"
    },
    "correct_option": "A",
    "explanation": "Committed capital is the legal sum pledged by LPs. During the investment period, the GP issues capital calls (drawdowns) to request portions of committed capital to fund acquisitions.",
    "distractor_analysis": {
      "A": "Correct. Committed capital is the legal sum pledged by LPs. During the investment period,",
      "B": "Incorrect. Common distractor based on: Confusing committed capital with paid-in capital.",
      "C": "Incorrect. Common distractor based on: Confusing committed capital with paid-in capital.",
      "D": "Incorrect. Common distractor based on: Confusing committed capital with paid-in capital."
    },
    "misconception": "Confusing committed capital with paid-in capital.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Alternative Investments",
    "skill_domain": "Private Equity",
    "difficulty_tier": 2,
    "question_text": "Which exit strategy for a private equity portfolio company involves selling the business to a strategic corporate buyer?",
    "options": {
      "A": "Trade sale (M&A sale)",
      "B": "Initial Public Offering (IPO)",
      "C": "Secondary buyout (sale to another PE sponsor)",
      "D": "Dividend recapitalization"
    },
    "correct_option": "A",
    "explanation": "A trade sale involves selling the portfolio company to an operating corporate competitor or strategic peer, often yielding synergies and immediate 100% cash liquidation.",
    "distractor_analysis": {
      "A": "Correct. A trade sale involves selling the portfolio company to an operating corporate co",
      "B": "Incorrect. Common distractor based on: Confusing trade sale with an IPO or secondary buyout.",
      "C": "Incorrect. Common distractor based on: Confusing trade sale with an IPO or secondary buyout.",
      "D": "Incorrect. Common distractor based on: Confusing trade sale with an IPO or secondary buyout."
    },
    "misconception": "Confusing trade sale with an IPO or secondary buyout.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Alternative Investments",
    "skill_domain": "Private Equity",
    "difficulty_tier": 2,
    "question_text": "What is a 'dividend recapitalization' in private equity?",
    "options": {
      "A": "The portfolio company issues new debt to fund an immediate special cash dividend to the PE sponsor",
      "B": "The fund converts debt into common shares to eliminate interest expense",
      "C": "The GP foregoes management fees in exchange for higher carry",
      "D": "The company pays dividends using federal tax refunds"
    },
    "correct_option": "A",
    "explanation": "A dividend recap leverages the portfolio company further by borrowing additional debt to extract cash dividends for the PE sponsor, recovering equity investment prior to an ultimate exit.",
    "distractor_analysis": {
      "A": "Correct. A dividend recap leverages the portfolio company further by borrowing additional",
      "B": "Incorrect. Common distractor based on: Assuming dividend recaps reduce company debt.",
      "C": "Incorrect. Common distractor based on: Assuming dividend recaps reduce company debt.",
      "D": "Incorrect. Common distractor based on: Assuming dividend recaps reduce company debt."
    },
    "misconception": "Assuming dividend recaps reduce company debt.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Alternative Investments",
    "skill_domain": "Private Equity",
    "difficulty_tier": 2,
    "question_text": "Development capital (growth equity) is best described as private equity capital provided to:",
    "options": {
      "A": "Established companies with proven business models seeking expansion capital without changing majority ownership control",
      "B": "Early-stage start-ups in seed conceptual phases",
      "C": "Distressed corporations entering formal bankruptcy liquidation",
      "D": "Governments funding municipal public infrastructure"
    },
    "correct_option": "A",
    "explanation": "Growth equity provides expansion capital for proven, revenue-generating companies seeking to scale operations, enter new markets, or make acquisitions, typically as minority equity investments.",
    "distractor_analysis": {
      "A": "Correct. Growth equity provides expansion capital for proven, revenue-generating companie",
      "B": "Incorrect. Common distractor based on: Confusing growth equity with distressed debt investing.",
      "C": "Incorrect. Common distractor based on: Confusing growth equity with distressed debt investing.",
      "D": "Incorrect. Common distractor based on: Confusing growth equity with distressed debt investing."
    },
    "misconception": "Confusing growth equity with distressed debt investing.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Alternative Investments",
    "skill_domain": "Private Equity",
    "difficulty_tier": 2,
    "question_text": "Why is the J-Curve effect observed in private equity fund returns?",
    "options": {
      "A": "Net returns are negative in early years due to management fees and upfront acquisition costs before portfolio companies mature and generate exits",
      "B": "Fund returns follow an inverted parabolic cycle",
      "C": "Interest rates rise in early investment years",
      "D": "Private equity returns replicate the letter J on currency markets"
    },
    "correct_option": "A",
    "explanation": "In early fund years, cash outflows for investments, transaction fees, and management fees exceed cash distributions, creating negative early returns before harvesting occurs in later years.",
    "distractor_analysis": {
      "A": "Correct. In early fund years, cash outflows for investments, transaction fees, and manage",
      "B": "Incorrect. Common distractor based on: Assuming private equity funds generate positive cash distrib",
      "C": "Incorrect. Common distractor based on: Assuming private equity funds generate positive cash distrib",
      "D": "Incorrect. Common distractor based on: Assuming private equity funds generate positive cash distrib"
    },
    "misconception": "Assuming private equity funds generate positive cash distributions immediately in Year 1.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Alternative Investments",
    "skill_domain": "Private Equity",
    "difficulty_tier": 2,
    "question_text": "In a management buyout (MBO), the existing executive management team of the target company:",
    "options": {
      "A": "Partners with private equity financing to purchase the business from existing parent owners",
      "B": "Is fired and replaced by turnaround consulting specialists",
      "C": "Sells personal shares to public retail investors",
      "D": "Liquidates the company's operating assets"
    },
    "correct_option": "A",
    "explanation": "An MBO occurs when incumbent corporate managers acquire substantial equity ownership and partner with a PE firm to take the enterprise private from its public or corporate parent.",
    "distractor_analysis": {
      "A": "Correct. An MBO occurs when incumbent corporate managers acquire substantial equity owner",
      "B": "Incorrect. Common distractor based on: Confusing MBO with management buyin (MBI), where outside man",
      "C": "Incorrect. Common distractor based on: Confusing MBO with management buyin (MBI), where outside man",
      "D": "Incorrect. Common distractor based on: Confusing MBO with management buyin (MBI), where outside man"
    },
    "misconception": "Confusing MBO with management buyin (MBI), where outside managers take over.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Alternative Investments",
    "skill_domain": "Private Equity",
    "difficulty_tier": 2,
    "question_text": "Tag-along rights in a private equity shareholder agreement protect minority shareholders by:",
    "options": {
      "A": "Allowing minority shareholders to sell their shares on identical terms if the majority shareholder sells their stake",
      "B": "Forcing minority shareholders to sell their shares when an acquirer emerges",
      "C": "Granting the GP the right to cancel minority shares",
      "D": "Restricting minority shareholders from transferring shares forever"
    },
    "correct_option": "A",
    "explanation": "Tag-along (co-sale) rights allow minority investors to participate in a sale on the same terms as the majority seller. Drag-along rights force minority investors to participate.",
    "distractor_analysis": {
      "A": "Correct. Tag-along (co-sale) rights allow minority investors to participate in a sale on ",
      "B": "Incorrect. Common distractor based on: Confusing tag-along rights with drag-along rights.",
      "C": "Incorrect. Common distractor based on: Confusing tag-along rights with drag-along rights.",
      "D": "Incorrect. Common distractor based on: Confusing tag-along rights with drag-along rights."
    },
    "misconception": "Confusing tag-along rights with drag-along rights.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Alternative Investments",
    "skill_domain": "Hedge Funds",
    "difficulty_tier": 2,
    "question_text": "In a hedge fund fee structure quoted as '2 and 20 with a high-water mark', the high-water mark provision ensures that:",
    "options": {
      "A": "Performance fees are charged only on net asset value increases that exceed the fund's highest historical peak valuation",
      "B": "Management fees double whenever the fund exceeds benchmark returns",
      "C": "Investors are guaranteed a minimum 20% annual return",
      "D": "Performance fees are paid to investors rather than managers"
    },
    "correct_option": "A",
    "explanation": "A high-water mark ensures the manager does not collect 20% performance fees on simply recovering past portfolio losses: incentive fees are paid only on new net profits above previous peak NAV.",
    "distractor_analysis": {
      "A": "Correct. A high-water mark ensures the manager does not collect 20% performance fees on s",
      "B": "Incorrect. Common distractor based on: Thinking high-water marks allow managers to collect fees on ",
      "C": "Incorrect. Common distractor based on: Thinking high-water marks allow managers to collect fees on ",
      "D": "Incorrect. Common distractor based on: Thinking high-water marks allow managers to collect fees on "
    },
    "misconception": "Thinking high-water marks allow managers to collect fees on rebounding from losses.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Alternative Investments",
    "skill_domain": "Hedge Funds",
    "difficulty_tier": 2,
    "question_text": "Which hedge fund strategy seeks to profit from corporate reorganizations, spin-offs, restructurings, and mergers?",
    "options": {
      "A": "Event-driven strategy",
      "B": "Global macro strategy",
      "C": "Quantitative market neutral strategy",
      "D": "Trend-following CTA strategy"
    },
    "correct_option": "A",
    "explanation": "Event-driven hedge funds capitalize on anticipated pricing discrepancies surrounding corporate events (merger arbitrage, distressed debt, spin-offs, proxy battles).",
    "distractor_analysis": {
      "A": "Correct. Event-driven hedge funds capitalize on anticipated pricing discrepancies surroun",
      "B": "Incorrect. Common distractor based on: Confusing event-driven with global macro.",
      "C": "Incorrect. Common distractor based on: Confusing event-driven with global macro.",
      "D": "Incorrect. Common distractor based on: Confusing event-driven with global macro."
    },
    "misconception": "Confusing event-driven with global macro.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Alternative Investments",
    "skill_domain": "Hedge Funds",
    "difficulty_tier": 2,
    "question_text": "A hedge fund with $100M AUM at year start grows to $120M at year end. Under a 2% management fee (based on end-of-year AUM) and 20% performance fee (independent of hurdle), what are total fees?",
    "options": {
      "A": "$6.4M",
      "B": "$4.0M",
      "C": "$6.0M",
      "D": "$8.0M"
    },
    "correct_option": "A",
    "explanation": "Management fee = 2% * $120M = $2.4M. Net gain before incentive fee = $120M - $100M = $20M. Incentive fee = 20% * $20M = $4.0M. Total fees = $2.4M + $4.0M = $6.4M.",
    "distractor_analysis": {
      "A": "Correct. Management fee = 2% * $120M = $2.4M. Net gain before incentive fee = $120M - $10",
      "B": "Incorrect. Common distractor based on: Calculating fees on starting AUM only ($6.0M) or miscalculat",
      "C": "Incorrect. Common distractor based on: Calculating fees on starting AUM only ($6.0M) or miscalculat",
      "D": "Incorrect. Common distractor based on: Calculating fees on starting AUM only ($6.0M) or miscalculat"
    },
    "misconception": "Calculating fees on starting AUM only ($6.0M) or miscalculating the incentive split.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Alternative Investments",
    "skill_domain": "Hedge Funds",
    "difficulty_tier": 2,
    "question_text": "An equity market neutral hedge fund strategy aims to:",
    "options": {
      "A": "Eliminate systematic market exposure (beta approx 0) by taking offsetting long and short positions within the same sector",
      "B": "Invest exclusively in zero-volatility sovereign cash instruments",
      "C": "Maximize beta to 2.0 to capture bullish bull market rallies",
      "D": "Hold long positions in public equities with zero short selling"
    },
    "correct_option": "A",
    "explanation": "Equity market neutral funds match long undervalued stocks with short overvalued stocks to achieve zero net beta exposure, generating alpha purely from individual security selection.",
    "distractor_analysis": {
      "A": "Correct. Equity market neutral funds match long undervalued stocks with short overvalued ",
      "B": "Incorrect. Common distractor based on: Assuming market neutral funds hold only cash.",
      "C": "Incorrect. Common distractor based on: Assuming market neutral funds hold only cash.",
      "D": "Incorrect. Common distractor based on: Assuming market neutral funds hold only cash."
    },
    "misconception": "Assuming market neutral funds hold only cash.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Alternative Investments",
    "skill_domain": "Hedge Funds",
    "difficulty_tier": 2,
    "question_text": "A 'lock-up period' in a hedge fund agreement refers to:",
    "options": {
      "A": "The initial time window (e.g. 1-2 years) during which an investor is legally prohibited from withdrawing invested capital",
      "B": "The daily trading halt triggered when market volatility surges",
      "C": "The time required for clearinghouse trade settlement",
      "D": "The mandatory holding period for restricted insider equity shares"
    },
    "correct_option": "A",
    "explanation": "A lock-up period restricts LP redemptions for an initial period after investing, giving the manager time to deploy capital into illiquid or complex positions without run-on-the-bank risks.",
    "distractor_analysis": {
      "A": "Correct. A lock-up period restricts LP redemptions for an initial period after investing,",
      "B": "Incorrect. Common distractor based on: Confusing lock-up periods with trading halts.",
      "C": "Incorrect. Common distractor based on: Confusing lock-up periods with trading halts.",
      "D": "Incorrect. Common distractor based on: Confusing lock-up periods with trading halts."
    },
    "misconception": "Confusing lock-up periods with trading halts.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Alternative Investments",
    "skill_domain": "Hedge Funds",
    "difficulty_tier": 2,
    "question_text": "A 'gate' provision in a hedge fund partnership agreement allows the fund manager to:",
    "options": {
      "A": "Limit the aggregate percentage of total fund capital that can be redeemed on any single redemption date",
      "B": "Prevent new investors from entering the fund",
      "C": "Halt all electronic trading during extreme volatility",
      "D": "Confiscate investor capital permanently upon insolvency"
    },
    "correct_option": "A",
    "explanation": "A gate limits total fund-level withdrawals (e.g. max 10% or 15% of fund AUM per quarter), preventing fire-sale liquidation of illiquid assets during market panic.",
    "distractor_analysis": {
      "A": "Correct. A gate limits total fund-level withdrawals (e.g. max 10% or 15% of fund AUM per ",
      "B": "Incorrect. Common distractor based on: Thinking gates allow permanent confiscation of client funds.",
      "C": "Incorrect. Common distractor based on: Thinking gates allow permanent confiscation of client funds.",
      "D": "Incorrect. Common distractor based on: Thinking gates allow permanent confiscation of client funds."
    },
    "misconception": "Thinking gates allow permanent confiscation of client funds.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Alternative Investments",
    "skill_domain": "Hedge Funds",
    "difficulty_tier": 2,
    "question_text": "Global macro hedge fund strategies generate returns primarily by:",
    "options": {
      "A": "Trading long and short positions across currencies, interest rates, equity indexes, and commodities based on top-down macroeconomic analysis",
      "B": "Selecting micro-cap individual common stocks based on factory visits",
      "C": "Providing mortgage debt financing to real estate developers",
      "D": "Purchasing royalty streams from pharmaceutical drug patents"
    },
    "correct_option": "A",
    "explanation": "Global macro funds employ top-down macroeconomic analysis of central bank policies, sovereign debt, currency dynamics, and geopolitical trends to trade liquid macro instruments worldwide.",
    "distractor_analysis": {
      "A": "Correct. Global macro funds employ top-down macroeconomic analysis of central bank polici",
      "B": "Incorrect. Common distractor based on: Confusing top-down global macro with bottom-up micro-cap sto",
      "C": "Incorrect. Common distractor based on: Confusing top-down global macro with bottom-up micro-cap sto",
      "D": "Incorrect. Common distractor based on: Confusing top-down global macro with bottom-up micro-cap sto"
    },
    "misconception": "Confusing top-down global macro with bottom-up micro-cap stock picking.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Alternative Investments",
    "skill_domain": "Hedge Funds",
    "difficulty_tier": 2,
    "question_text": "Hedge fund performance reporting databases frequently suffer from survivorship bias because:",
    "options": {
      "A": "Failed or liquidated funds are removed from historical database records, artificially inflating reported historical industry returns",
      "B": "Only winning funds are legally permitted to operate",
      "C": "Fund managers report audited returns every 24 hours",
      "D": "Databases track only closed private equity partnerships"
    },
    "correct_option": "A",
    "explanation": "Survivorship bias occurs when closed or failed funds drop out of the database, leaving behind only successful surviving funds, biasing average reported returns upward by 1.5% to 3.0% annually.",
    "distractor_analysis": {
      "A": "Correct. Survivorship bias occurs when closed or failed funds drop out of the database, l",
      "B": "Incorrect. Common distractor based on: Assuming hedge fund databases include all terminated histori",
      "C": "Incorrect. Common distractor based on: Assuming hedge fund databases include all terminated histori",
      "D": "Incorrect. Common distractor based on: Assuming hedge fund databases include all terminated histori"
    },
    "misconception": "Assuming hedge fund databases include all terminated historical funds.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Alternative Investments",
    "skill_domain": "Hedge Funds",
    "difficulty_tier": 2,
    "question_text": "What is a 'soft hurdle rate' in a hedge fund incentive fee calculation?",
    "options": {
      "A": "Once the hurdle return is exceeded, incentive fees are calculated on the entire net return from zero",
      "B": "Incentive fees are charged only on returns in excess of the hurdle rate",
      "C": "The hurdle rate adjusts with consumer price inflation",
      "D": "The manager receives a flat bonus regardless of performance"
    },
    "correct_option": "A",
    "explanation": "Under a soft hurdle rate, once the fund crosses the hurdle threshold, the manager earns incentive fees on the entire profit (back to dollar zero). Under a hard hurdle, fees apply only to returns above the hurdle.",
    "distractor_analysis": {
      "A": "Correct. Under a soft hurdle rate, once the fund crosses the hurdle threshold, the manage",
      "B": "Incorrect. Common distractor based on: Confusing soft hurdle with hard hurdle.",
      "C": "Incorrect. Common distractor based on: Confusing soft hurdle with hard hurdle.",
      "D": "Incorrect. Common distractor based on: Confusing soft hurdle with hard hurdle."
    },
    "misconception": "Confusing soft hurdle with hard hurdle.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Alternative Investments",
    "skill_domain": "Hedge Funds",
    "difficulty_tier": 2,
    "question_text": "Convertible arbitrage hedge funds seek to exploit mispricings by:",
    "options": {
      "A": "Purchasing undervalued convertible bonds while hedging equity risk by short selling the underlying common stock",
      "B": "Buying long call options and selling short put options",
      "C": "Investing exclusively in distressed sovereign debt",
      "D": "Selling physical commodities and buying futures"
    },
    "correct_option": "A",
    "explanation": "Convertible arbitrage buys undervalued convertible bonds (which contain embedded call options) and shorts the underlying equity in the delta-hedged ratio, capturing cheap volatility and cash yield.",
    "distractor_analysis": {
      "A": "Correct. Convertible arbitrage buys undervalued convertible bonds (which contain embedded",
      "B": "Incorrect. Common distractor based on: Thinking convertible arbitrage takes unhedged directional eq",
      "C": "Incorrect. Common distractor based on: Thinking convertible arbitrage takes unhedged directional eq",
      "D": "Incorrect. Common distractor based on: Thinking convertible arbitrage takes unhedged directional eq"
    },
    "misconception": "Thinking convertible arbitrage takes unhedged directional equity bets.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Alternative Investments",
    "skill_domain": "Hedge Funds",
    "difficulty_tier": 2,
    "question_text": "Backfill (instant history) bias in hedge fund databases occurs when:",
    "options": {
      "A": "A new fund that has established a successful incubation track record joins a database and its past winning performance is backfilled into history",
      "B": "Liquidated funds re-enter the database under new corporate names",
      "C": "Hedge funds back-test quantitative models using synthetic data",
      "D": "Auditors revise prior-year financial statements retroactively"
    },
    "correct_option": "A",
    "explanation": "Managers only choose to report to databases when their incubation performance has been exceptionally strong; including these past pre-reporting track records creates an artificial upward bias.",
    "distractor_analysis": {
      "A": "Correct. Managers only choose to report to databases when their incubation performance ha",
      "B": "Incorrect. Common distractor based on: Confusing backfill bias with survivorship bias.",
      "C": "Incorrect. Common distractor based on: Confusing backfill bias with survivorship bias.",
      "D": "Incorrect. Common distractor based on: Confusing backfill bias with survivorship bias."
    },
    "misconception": "Confusing backfill bias with survivorship bias.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Alternative Investments",
    "skill_domain": "Commodities",
    "difficulty_tier": 2,
    "question_text": "In commodity futures investing, the total return consists of which three fundamental components?",
    "options": {
      "A": "Spot price return, Roll yield, and Collateral yield (risk-free interest on cash margin)",
      "B": "Capital gain yield, dividend yield, and currency appreciation",
      "C": "Carried interest, management fee yield, and inflation premium",
      "D": "Convenience yield, basis spread, and option gamma"
    },
    "correct_option": "A",
    "explanation": "Total return on a fully collateralized commodity futures investment = Spot Return (change in spot price) + Roll Yield (gain/loss from rolling futures) + Collateral Yield (interest earned on Treasury collateral).",
    "distractor_analysis": {
      "A": "Correct. Total return on a fully collateralized commodity futures investment = Spot Retur",
      "B": "Incorrect. Common distractor based on: Confusing commodity return components with equity stock retu",
      "C": "Incorrect. Common distractor based on: Confusing commodity return components with equity stock retu",
      "D": "Incorrect. Common distractor based on: Confusing commodity return components with equity stock retu"
    },
    "misconception": "Confusing commodity return components with equity stock returns.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Alternative Investments",
    "skill_domain": "Commodities",
    "difficulty_tier": 2,
    "question_text": "Roll yield in a commodity futures position is positive when the futures curve is in:",
    "options": {
      "A": "Backwardation (futures price < spot price)",
      "B": "Contango (futures price > spot price)",
      "C": "Flat parity where all maturities trade at identical prices",
      "D": "Extreme upward-sloping carry"
    },
    "correct_option": "A",
    "explanation": "In backwardation (downward-sloping curve), futures trade at a discount to spot. As an expiring long contract approaches maturity, its price converges upward toward the higher spot price, generating positive roll yield.",
    "distractor_analysis": {
      "A": "Correct. In backwardation (downward-sloping curve), futures trade at a discount to spot. ",
      "B": "Incorrect. Common distractor based on: Assuming contango produces positive roll yield.",
      "C": "Incorrect. Common distractor based on: Assuming contango produces positive roll yield.",
      "D": "Incorrect. Common distractor based on: Assuming contango produces positive roll yield."
    },
    "misconception": "Assuming contango produces positive roll yield.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Alternative Investments",
    "skill_domain": "Commodities",
    "difficulty_tier": 2,
    "question_text": "According to the Theory of Storage, the basis in commodity futures is determined by:",
    "options": {
      "A": "Futures Price = Spot Price + Storage Costs + Financing Costs - Convenience Yield",
      "B": "Futures Price = Spot Price - Storage Costs - Financing Costs",
      "C": "Futures Price = Spot Price / (1 + r)",
      "D": "Futures Price = Spot Price * Convenience Yield"
    },
    "correct_option": "A",
    "explanation": "Net cost of carry includes physical warehousing/insurance costs and financing interest, offset by convenience yield (the benefit of having physical inventory immediately available).",
    "distractor_analysis": {
      "A": "Correct. Net cost of carry includes physical warehousing/insurance costs and financing in",
      "B": "Incorrect. Common distractor based on: Adding convenience yield and subtracting storage costs.",
      "C": "Incorrect. Common distractor based on: Adding convenience yield and subtracting storage costs.",
      "D": "Incorrect. Common distractor based on: Adding convenience yield and subtracting storage costs."
    },
    "misconception": "Adding convenience yield and subtracting storage costs.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Alternative Investments",
    "skill_domain": "Commodities",
    "difficulty_tier": 2,
    "question_text": "Physical commodities differ fundamentally from traditional financial assets (stocks and bonds) because commodities:",
    "options": {
      "A": "Do not generate contractual cash flows (dividends, interest) and incur ongoing physical storage, insurance, and spoilage costs",
      "B": "Have legally guaranteed redemption par values at maturity",
      "C": "Trade exclusively during daytime business hours in London",
      "D": "Are completely immune to macroeconomic supply-demand shocks"
    },
    "correct_option": "A",
    "explanation": "Unlike stocks (which pay dividends) or bonds (which pay interest), physical commodities produce zero cash income and consume carrying costs (storage, insurance, transportation).",
    "distractor_analysis": {
      "A": "Correct. Unlike stocks (which pay dividends) or bonds (which pay interest), physical comm",
      "B": "Incorrect. Common distractor based on: Assuming physical commodities pay periodic dividends.",
      "C": "Incorrect. Common distractor based on: Assuming physical commodities pay periodic dividends.",
      "D": "Incorrect. Common distractor based on: Assuming physical commodities pay periodic dividends."
    },
    "misconception": "Assuming physical commodities pay periodic dividends.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Alternative Investments",
    "skill_domain": "Commodities",
    "difficulty_tier": 2,
    "question_text": "In commodity markets, which sector is typically characterized by seasonal supply production cycles combined with non-cyclical, continuous consumer demand?",
    "options": {
      "A": "Agricultural commodities (grains and livestock)",
      "B": "Industrial metals (copper and aluminum)",
      "C": "Precious metals (gold and platinum)",
      "D": "Energy commodities (crude oil and natural gas)"
    },
    "correct_option": "A",
    "explanation": "Agricultural softs and grains are harvested during discrete seasonal periods, yet human consumption is steady year-round, creating pronounced seasonal inventory and futures pricing cycles.",
    "distractor_analysis": {
      "A": "Correct. Agricultural softs and grains are harvested during discrete seasonal periods, ye",
      "B": "Incorrect. Common distractor based on: Selecting industrial metals as seasonally harvested commodit",
      "C": "Incorrect. Common distractor based on: Selecting industrial metals as seasonally harvested commodit",
      "D": "Incorrect. Common distractor based on: Selecting industrial metals as seasonally harvested commodit"
    },
    "misconception": "Selecting industrial metals as seasonally harvested commodities.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Alternative Investments",
    "skill_domain": "Commodities",
    "difficulty_tier": 2,
    "question_text": "Collateral yield in a commodity futures portfolio represents:",
    "options": {
      "A": "The interest earned on the cash or short-term Treasury bills posted as margin collateral to back the futures contracts",
      "B": "The cash dividend distributed by commodity storage facilities",
      "C": "The profit realized by closing out winning futures positions",
      "D": "The physical rent paid to store crude oil barrels"
    },
    "correct_option": "A",
    "explanation": "Commodity futures require only fractional margin; the remaining unencumbered cash is invested in risk-free Treasury bills, generating a steady collateral interest yield for the portfolio.",
    "distractor_analysis": {
      "A": "Correct. Commodity futures require only fractional margin; the remaining unencumbered cas",
      "B": "Incorrect. Common distractor based on: Confusing collateral yield with roll yield.",
      "C": "Incorrect. Common distractor based on: Confusing collateral yield with roll yield.",
      "D": "Incorrect. Common distractor based on: Confusing collateral yield with roll yield."
    },
    "misconception": "Confusing collateral yield with roll yield.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Alternative Investments",
    "skill_domain": "Commodities",
    "difficulty_tier": 2,
    "question_text": "When a commodity futures market is in severe contango, an investor holding a rolling long position will:",
    "options": {
      "A": "Experience a substantial negative roll yield as near-term contracts are sold at lower prices to purchase higher-priced longer-dated contracts",
      "B": "Earn large positive roll yields automatically",
      "C": "Eliminate all price volatility",
      "D": "Receive physical delivery of the commodity at zero cost"
    },
    "correct_option": "A",
    "explanation": "In contango, distant futures trade above near futures. An investor rolling contracts must sell the cheaper expiring contract and buy a more expensive deferred contract, bleeding value (negative roll yield).",
    "distractor_analysis": {
      "A": "Correct. In contango, distant futures trade above near futures. An investor rolling contr",
      "B": "Incorrect. Common distractor based on: Thinking contango provides a positive boost to long returns.",
      "C": "Incorrect. Common distractor based on: Thinking contango provides a positive boost to long returns.",
      "D": "Incorrect. Common distractor based on: Thinking contango provides a positive boost to long returns."
    },
    "misconception": "Thinking contango provides a positive boost to long returns.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Alternative Investments",
    "skill_domain": "Commodities",
    "difficulty_tier": 2,
    "question_text": "Which commodity is widely regarded as a 'safe-haven' store of value and monetary reserve asset during geopolitical crises and currency debasement?",
    "options": {
      "A": "Gold",
      "B": "Crude oil",
      "C": "Wheat",
      "D": "Lean hogs"
    },
    "correct_option": "A",
    "explanation": "Gold possesses high monetary density, durability, and a multi-millennia history as a non-fiat store of value and inflation hedge, functioning as a primary safe-haven asset during crises.",
    "distractor_analysis": {
      "A": "Correct. Gold possesses high monetary density, durability, and a multi-millennia history ",
      "B": "Incorrect. Common distractor based on: Selecting perishable commodities as safe-haven reserves.",
      "C": "Incorrect. Common distractor based on: Selecting perishable commodities as safe-haven reserves.",
      "D": "Incorrect. Common distractor based on: Selecting perishable commodities as safe-haven reserves."
    },
    "misconception": "Selecting perishable commodities as safe-haven reserves.",
    "time_estimate_seconds": 30
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Alternative Investments",
    "skill_domain": "Commodities",
    "difficulty_tier": 2,
    "question_text": "A commodity trading advisor (CTA) managing a managed futures account typically employs:",
    "options": {
      "A": "Systematic quantitative trend-following strategies trading liquid exchange-traded futures contracts across multiple asset classes",
      "B": "Fundamental equity bottom-up stock picking",
      "C": "Direct acquisitions of oil refineries and grain silos",
      "D": "High-yield corporate bond credit arbitrage"
    },
    "correct_option": "A",
    "explanation": "CTAs utilize systematic rule-based momentum and trend-following algorithms trading futures across commodities, currencies, interest rates, and equity indexes with strict risk parameters.",
    "distractor_analysis": {
      "A": "Correct. CTAs utilize systematic rule-based momentum and trend-following algorithms tradi",
      "B": "Incorrect. Common distractor based on: Confusing CTAs with physical commodity producers.",
      "C": "Incorrect. Common distractor based on: Confusing CTAs with physical commodity producers.",
      "D": "Incorrect. Common distractor based on: Confusing CTAs with physical commodity producers."
    },
    "misconception": "Confusing CTAs with physical commodity producers.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Alternative Investments",
    "skill_domain": "Commodities",
    "difficulty_tier": 2,
    "question_text": "Commodity swap agreements typically involve exchanging:",
    "options": {
      "A": "A floating commodity market price (or index) for a pre-agreed fixed price over multiple settlement periods",
      "B": "Physical barrels of crude oil for bushels of corn",
      "C": "Long-term corporate debt for gold bullion",
      "D": "Commodity futures for corporate equity options"
    },
    "correct_option": "A",
    "explanation": "A commodity swap enables consumers (e.g. airlines buying jet fuel) to lock in a fixed cost by exchanging floating index payments for fixed cash obligations without physical delivery.",
    "distractor_analysis": {
      "A": "Correct. A commodity swap enables consumers (e.g. airlines buying jet fuel) to lock in a ",
      "B": "Incorrect. Common distractor based on: Assuming commodity swaps require physical delivery of goods.",
      "C": "Incorrect. Common distractor based on: Assuming commodity swaps require physical delivery of goods.",
      "D": "Incorrect. Common distractor based on: Assuming commodity swaps require physical delivery of goods."
    },
    "misconception": "Assuming commodity swaps require physical delivery of goods.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Alternative Investments",
    "skill_domain": "Commodities",
    "difficulty_tier": 2,
    "question_text": "Why does investing in commodities provide diversification benefits to an equity-heavy institutional portfolio?",
    "options": {
      "A": "Commodity returns are driven by supply-demand fundamentals and inflation shocks, resulting in historically low correlations with public equities and fixed income",
      "B": "Commodities guarantee a fixed annual dividend yield",
      "C": "Commodities have zero standard deviation of returns",
      "D": "Commodity prices are legally fixed by international treaties"
    },
    "correct_option": "A",
    "explanation": "Commodity prices react positively to unexpected inflation and real economic supply bottlenecks, providing a robust inflation hedge and low historical correlation with financial assets.",
    "distractor_analysis": {
      "A": "Correct. Commodity prices react positively to unexpected inflation and real economic supp",
      "B": "Incorrect. Common distractor based on: Believing commodities have low volatility.",
      "C": "Incorrect. Common distractor based on: Believing commodities have low volatility.",
      "D": "Incorrect. Common distractor based on: Believing commodities have low volatility."
    },
    "misconception": "Believing commodities have low volatility.",
    "time_estimate_seconds": 40
  }
];
