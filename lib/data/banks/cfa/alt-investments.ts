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
      "A": "$4,800,000",
      "B": "$7,500,000",
      "C": "$6,000,000"
    },
    "correct_option": "B",
    "explanation": "Value = NOI / Capitalization Rate = $600,000 / 0.08 = $7,500,000.",
    "distractor_analysis": {
      "A": "Incorrect. \"$4,800,000\" is an inaccurate assessment: multiplying noi by cap rate ($600,000 * 0.08 = $48,000) or dividing incorrectly.",
      "B": "Correct. Value = NOI / Capitalization Rate = $600,000 / 0.08 = $7,500,000.",
      "C": "Incorrect. \"$6,000,000\" is an inaccurate assessment: multiplying noi by cap rate ($600,000 * 0.08 = $48,000) or dividing incorrectly."
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
      "A": "Net income after income taxes and depreciation",
      "B": "Gross revenues minus mortgage debt service payments",
      "C": "Potential Gross Income minus vacancy and collection losses minus property operating expenses"
    },
    "correct_option": "C",
    "explanation": "NOI = Potential Gross Income - Vacancy/Credit Loss + Other Income - Operating Expenses (property taxes, insurance, maintenance). NOI excludes debt service and income taxes.",
    "distractor_analysis": {
      "A": "Incorrect. \"Net income after income taxes and depreciation\" is an inaccurate assessment: deducting mortgage debt payments from noi.",
      "B": "Incorrect. \"Gross revenues minus mortgage debt service payments\" is an inaccurate assessment: deducting mortgage debt payments from noi.",
      "C": "Correct. NOI = Potential Gross Income - Vacancy/Credit Loss + Other Income - Operating Expenses (property taxes, insurance, maintenance). NOI excludes debt service and income taxes."
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
      "C": "REITs cannot be bought or sold by retail investors"
    },
    "correct_option": "A",
    "explanation": "Publicly traded REITs trade continuously with high liquidity on stock exchanges, whereas physical real estate transactions take months with high transaction fees and appraisals.",
    "distractor_analysis": {
      "A": "Correct. Publicly traded REITs trade continuously with high liquidity on stock exchanges, whereas physical real estate transactions take months with high transaction fees and appraisals.",
      "B": "Incorrect. \"Direct property ownership is substantially more liquid than REITs\" is an inaccurate assessment: thinking direct real estate is more liquid than exchange-traded reits.",
      "C": "Incorrect. \"REITs cannot be bought or sold by retail investors\" is an inaccurate assessment: thinking direct real estate is more liquid than exchange-traded reits."
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
      "A": "Accurately reflect daily transaction clearing prices",
      "B": "Lag actual market values and understate return volatility due to appraisal smoothing",
      "C": "Exaggerate short-term price volatility compared to REITs"
    },
    "correct_option": "B",
    "explanation": "Appraisal-based indexes rely on infrequent subjective appraisals, which smooth returns over time, understating true volatility and correlation with other asset classes.",
    "distractor_analysis": {
      "A": "Incorrect. \"Accurately reflect daily transaction clearing prices\" is an inaccurate assessment: assuming appraisal indexes overstate volatility.",
      "B": "Correct. Appraisal-based indexes rely on infrequent subjective appraisals, which smooth returns over time, understating true volatility and correlation with other asset classes.",
      "C": "Incorrect. \"Exaggerate short-term price volatility compared to REITs\" is an inaccurate assessment: assuming appraisal indexes overstate volatility."
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
      "A": "Sales comparison approach",
      "B": "Income capitalization approach",
      "C": "Cost approach"
    },
    "correct_option": "C",
    "explanation": "The Cost Approach values a property as: Estimated Land Value + (Cost to Reconstruct Building New - Accrued Physical/Functional Depreciation). Useful for specialized properties (schools, hospitals).",
    "distractor_analysis": {
      "A": "Incorrect. \"Sales comparison approach\" is an inaccurate assessment: confusing the cost approach with sales comparison approach.",
      "B": "Incorrect. \"Income capitalization approach\" is an inaccurate assessment: confusing the cost approach with sales comparison approach.",
      "C": "Correct. The Cost Approach values a property as: Estimated Land Value + (Cost to Reconstruct Building New - Accrued Physical/Functional Depreciation). Useful for specialized properties (schools, hospitals)."
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
      "B": "Triple net lease",
      "C": "Gross lease"
    },
    "correct_option": "A",
    "explanation": "A percentage lease specifies a base minimum rent supplemented by percentage overage rent once tenant sales surpass a threshold breakpoint, aligning landlord and tenant incentives.",
    "distractor_analysis": {
      "A": "Correct. A percentage lease specifies a base minimum rent supplemented by percentage overage rent once tenant sales surpass a threshold breakpoint, aligning landlord and tenant incentives.",
      "B": "Incorrect. \"Triple net lease\" is an inaccurate assessment: confusing percentage lease with triple net lease.",
      "C": "Incorrect. \"Gross lease\" is an inaccurate assessment: confusing percentage lease with triple net lease."
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
      "A": "Only the base rent, with landlord covering all operating expenses",
      "B": "Property real estate taxes, building insurance, and structural/common maintenance costs in addition to base rent",
      "C": "Mortgage principal payments of the landlord"
    },
    "correct_option": "B",
    "explanation": "In a triple net lease, the tenant pays all operational property expenses (taxes, insurance, and maintenance/utilities) directly, passing operating expense risk from landlord to tenant.",
    "distractor_analysis": {
      "A": "Incorrect. \"Only the base rent, with landlord covering all operating expenses\" is an inaccurate assessment: assuming landlords pay maintenance in a triple net lease.",
      "B": "Correct. In a triple net lease, the tenant pays all operational property expenses (taxes, insurance, and maintenance/utilities) directly, passing operating expense risk from landlord to tenant.",
      "C": "Incorrect. \"Mortgage principal payments of the landlord\" is an inaccurate assessment: assuming landlords pay maintenance in a triple net lease."
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
      "A": "The Price-to-Earnings multiple",
      "B": "The coupon rate of a zero-coupon bond",
      "C": "The dividend yield (current yield) of a stock with zero immediate growth adjustment"
    },
    "correct_option": "C",
    "explanation": "Cap rate = NOI / Value. In the Gordon growth model P = D / (r - g), D / P = r - g. Cap rate reflects the current operating income yield required by investors (r - g).",
    "distractor_analysis": {
      "A": "Incorrect. \"The Price-to-Earnings multiple\" is an inaccurate assessment: confusing cap rate with equity p/e multiple.",
      "B": "Incorrect. \"The coupon rate of a zero-coupon bond\" is an inaccurate assessment: confusing cap rate with equity p/e multiple.",
      "C": "Correct. Cap rate = NOI / Value. In the Gordon growth model P = D / (r - g), D / P = r - g. Cap rate reflects the current operating income yield required by investors (r - g)."
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
      "C": "Exemption from all local property regulations"
    },
    "correct_option": "A",
    "explanation": "Real estate provides steady rental income, capital appreciation, inflation protection (leases adjust with inflation), and diversification via moderate correlation with equities.",
    "distractor_analysis": {
      "A": "Correct. Real estate provides steady rental income, capital appreciation, inflation protection (leases adjust with inflation), and diversification via moderate correlation with equities.",
      "B": "Incorrect. \"Zero capital expenditure requirements\" is an inaccurate assessment: assuming real estate requires zero capital maintenance.",
      "C": "Incorrect. \"Exemption from all local property regulations\" is an inaccurate assessment: assuming real estate requires zero capital maintenance."
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
      "A": "Equal in priority to unsecured corporate commercial paper",
      "B": "Senior to equity claims, receiving priority debt service payments and backed by property collateral",
      "C": "Subordinated to common equity dividends"
    },
    "correct_option": "B",
    "explanation": "Senior mortgage debt sits at the bottom/base of the capital stack, holding first-priority legal claims on property operating cash flows and physical collateral before any equity distributions.",
    "distractor_analysis": {
      "A": "Incorrect. \"Equal in priority to unsecured corporate commercial paper\" is an inaccurate assessment: placing debt junior to equity.",
      "B": "Correct. Senior mortgage debt sits at the bottom/base of the capital stack, holding first-priority legal claims on property operating cash flows and physical collateral before any equity distributions.",
      "C": "Incorrect. \"Subordinated to common equity dividends\" is an inaccurate assessment: placing debt junior to equity."
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
      "A": "Surveying local real estate brokers on hypothetical valuations",
      "B": "Calculating reproduction costs of new housing starts",
      "C": "Tracking transaction sale prices of the exact same physical properties over repeated sales transactions"
    },
    "correct_option": "C",
    "explanation": "Repeat-sales indexes (such as Case-Shiller) evaluate price changes solely on properties that have sold at least twice, controlling for physical property characteristics and quality.",
    "distractor_analysis": {
      "A": "Incorrect. \"Surveying local real estate brokers on hypothetical valuations\" is an inaccurate assessment: confusing repeat-sales with appraisal-based indexes.",
      "B": "Incorrect. \"Calculating reproduction costs of new housing starts\" is an inaccurate assessment: confusing repeat-sales with appraisal-based indexes.",
      "C": "Correct. Repeat-sales indexes (such as Case-Shiller) evaluate price changes solely on properties that have sold at least twice, controlling for physical property characteristics and quality."
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
      "B": "Direct cash grants from international development agencies",
      "C": "100% newly issued common stock from public markets"
    },
    "correct_option": "A",
    "explanation": "LBOs utilize high financial leverage (typically 60-80% debt via senior secured bank loans and high-yield junk bonds) backed by target company cash flows and assets.",
    "distractor_analysis": {
      "A": "Correct. LBOs utilize high financial leverage (typically 60-80% debt via senior secured bank loans and high-yield junk bonds) backed by target company cash flows and assets.",
      "B": "Incorrect. \"Direct cash grants from international development agencies\" is an inaccurate assessment: assuming lbos are financed mostly with cash equity.",
      "C": "Incorrect. \"100% newly issued common stock from public markets\" is an inaccurate assessment: assuming lbos are financed mostly with cash equity."
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
      "A": "Focuses exclusively on mature, stable cash-flow-generating companies",
      "B": "Invests in early-stage start-ups with high technological risk and negative cash flows, using equity rather than heavy debt",
      "C": "Employs financial leverage ratios exceeding 80%"
    },
    "correct_option": "B",
    "explanation": "VC funds early-stage innovation companies with high growth potential but negative earnings and zero debt capacity. Buyouts target mature firms with predictable cash flows to service heavy debt.",
    "distractor_analysis": {
      "A": "Incorrect. \"Focuses exclusively on mature, stable cash-flow-generating companies\" is an inaccurate assessment: confusing early-stage vc with mature debt-heavy lbos.",
      "B": "Correct. VC funds early-stage innovation companies with high growth potential but negative earnings and zero debt capacity. Buyouts target mature firms with predictable cash flows to service heavy debt.",
      "C": "Incorrect. \"Employs financial leverage ratios exceeding 80%\" is an inaccurate assessment: confusing early-stage vc with mature debt-heavy lbos."
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
      "A": "The interest paid to commercial banks on LBO debt",
      "B": "The annual 2% management fee charged on committed capital",
      "C": "The performance fee (typically 20%) paid to the General Partner on profits exceeding a hurdle rate"
    },
    "correct_option": "C",
    "explanation": "Carried interest is the GP's incentive share of net capital profits (traditionally 20%), distributed only after returning capital and achieving a predetermined hurdle rate (e.g. 8%).",
    "distractor_analysis": {
      "A": "Incorrect. \"The interest paid to commercial banks on LBO debt\" is an inaccurate assessment: confusing carried interest with management fees.",
      "B": "Incorrect. \"The annual 2% management fee charged on committed capital\" is an inaccurate assessment: confusing carried interest with management fees.",
      "C": "Correct. Carried interest is the GP's incentive share of net capital profits (traditionally 20%), distributed only after returning capital and achieving a predetermined hurdle rate (e.g. 8%)."
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
      "C": "It prohibits portfolio companies from declaring bankruptcy"
    },
    "correct_option": "A",
    "explanation": "A clawback protects LPs by obligating the GP to refund excess carried interest if subsequent investment write-offs drag lifetime fund performance below the agreed profit-split threshold.",
    "distractor_analysis": {
      "A": "Correct. A clawback protects LPs by obligating the GP to refund excess carried interest if subsequent investment write-offs drag lifetime fund performance below the agreed profit-split threshold.",
      "B": "Incorrect. \"It allows limited partners to withdraw committed capital early without penalty\" is an inaccurate assessment: confusing clawbacks with capital call notices.",
      "C": "Incorrect. \"It prohibits portfolio companies from declaring bankruptcy\" is an inaccurate assessment: confusing clawbacks with capital call notices."
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
      "A": "The market value of acquired portfolio companies",
      "B": "The total contractual capital amount pledged by Limited Partners to the fund to be drawn down over time",
      "C": "The cash currently held in the fund's bank account"
    },
    "correct_option": "B",
    "explanation": "Committed capital is the legal sum pledged by LPs. During the investment period, the GP issues capital calls (drawdowns) to request portions of committed capital to fund acquisitions.",
    "distractor_analysis": {
      "A": "Incorrect. \"The market value of acquired portfolio companies\" is an inaccurate assessment: confusing committed capital with paid-in capital.",
      "B": "Correct. Committed capital is the legal sum pledged by LPs. During the investment period, the GP issues capital calls (drawdowns) to request portions of committed capital to fund acquisitions.",
      "C": "Incorrect. \"The cash currently held in the fund's bank account\" is an inaccurate assessment: confusing committed capital with paid-in capital."
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
      "A": "Initial Public Offering (IPO)",
      "B": "Secondary buyout (sale to another PE sponsor)",
      "C": "Trade sale (M&A sale)"
    },
    "correct_option": "C",
    "explanation": "A trade sale involves selling the portfolio company to an operating corporate competitor or strategic peer, often yielding synergies and immediate 100% cash liquidation.",
    "distractor_analysis": {
      "A": "Incorrect. \"Initial Public Offering (IPO)\" is an inaccurate assessment: confusing trade sale with an ipo or secondary buyout.",
      "B": "Incorrect. \"Secondary buyout (sale to another PE sponsor)\" is an inaccurate assessment: confusing trade sale with an ipo or secondary buyout.",
      "C": "Correct. A trade sale involves selling the portfolio company to an operating corporate competitor or strategic peer, often yielding synergies and immediate 100% cash liquidation."
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
      "B": "The GP foregoes management fees in exchange for higher carry",
      "C": "The fund converts debt into common shares to eliminate interest expense"
    },
    "correct_option": "A",
    "explanation": "A dividend recap leverages the portfolio company further by borrowing additional debt to extract cash dividends for the PE sponsor, recovering equity investment prior to an ultimate exit.",
    "distractor_analysis": {
      "A": "Correct. A dividend recap leverages the portfolio company further by borrowing additional debt to extract cash dividends for the PE sponsor, recovering equity investment prior to an ultimate exit.",
      "B": "Incorrect. \"The GP foregoes management fees in exchange for higher carry\" is an inaccurate assessment: assuming dividend recaps reduce company debt.",
      "C": "Incorrect. \"The fund converts debt into common shares to eliminate interest expense\" is an inaccurate assessment: assuming dividend recaps reduce company debt."
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
      "A": "Early-stage start-ups in seed conceptual phases",
      "B": "Established companies with proven business models seeking expansion capital without changing majority ownership control",
      "C": "Distressed corporations entering formal bankruptcy liquidation"
    },
    "correct_option": "B",
    "explanation": "Growth equity provides expansion capital for proven, revenue-generating companies seeking to scale operations, enter new markets, or make acquisitions, typically as minority equity investments.",
    "distractor_analysis": {
      "A": "Incorrect. \"Early-stage start-ups in seed conceptual phases\" is an inaccurate assessment: confusing growth equity with distressed debt investing.",
      "B": "Correct. Growth equity provides expansion capital for proven, revenue-generating companies seeking to scale operations, enter new markets, or make acquisitions, typically as minority equity investments.",
      "C": "Incorrect. \"Distressed corporations entering formal bankruptcy liquidation\" is an inaccurate assessment: confusing growth equity with distressed debt investing."
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
      "A": "Interest rates rise in early investment years",
      "B": "Fund returns follow an inverted parabolic cycle",
      "C": "Net returns are negative in early years due to management fees and upfront acquisition costs before portfolio companies mature and generate exits"
    },
    "correct_option": "C",
    "explanation": "In early fund years, cash outflows for investments, transaction fees, and management fees exceed cash distributions, creating negative early returns before harvesting occurs in later years.",
    "distractor_analysis": {
      "A": "Incorrect. \"Interest rates rise in early investment years\" is an inaccurate assessment: assuming private equity funds generate positive cash distributions immediately in year 1.",
      "B": "Incorrect. \"Fund returns follow an inverted parabolic cycle\" is an inaccurate assessment: assuming private equity funds generate positive cash distributions immediately in year 1.",
      "C": "Correct. In early fund years, cash outflows for investments, transaction fees, and management fees exceed cash distributions, creating negative early returns before harvesting occurs in later years."
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
      "C": "Sells personal shares to public retail investors"
    },
    "correct_option": "A",
    "explanation": "An MBO occurs when incumbent corporate managers acquire substantial equity ownership and partner with a PE firm to take the enterprise private from its public or corporate parent.",
    "distractor_analysis": {
      "A": "Correct. An MBO occurs when incumbent corporate managers acquire substantial equity ownership and partner with a PE firm to take the enterprise private from its public or corporate parent.",
      "B": "Incorrect. \"Is fired and replaced by turnaround consulting specialists\" is an inaccurate assessment: confusing mbo with management buyin (mbi), where outside managers take over.",
      "C": "Incorrect. \"Sells personal shares to public retail investors\" is an inaccurate assessment: confusing mbo with management buyin (mbi), where outside managers take over."
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
      "A": "Granting the GP the right to cancel minority shares",
      "B": "Allowing minority shareholders to sell their shares on identical terms if the majority shareholder sells their stake",
      "C": "Forcing minority shareholders to sell their shares when an acquirer emerges"
    },
    "correct_option": "B",
    "explanation": "Tag-along (co-sale) rights allow minority investors to participate in a sale on the same terms as the majority seller. Drag-along rights force minority investors to participate.",
    "distractor_analysis": {
      "A": "Incorrect. \"Granting the GP the right to cancel minority shares\" is an inaccurate assessment: confusing tag-along rights with drag-along rights.",
      "B": "Correct. Tag-along (co-sale) rights allow minority investors to participate in a sale on the same terms as the majority seller. Drag-along rights force minority investors to participate.",
      "C": "Incorrect. \"Forcing minority shareholders to sell their shares when an acquirer emerges\" is an inaccurate assessment: confusing tag-along rights with drag-along rights."
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
      "A": "Management fees double whenever the fund exceeds benchmark returns",
      "B": "Investors are guaranteed a minimum 20% annual return",
      "C": "Performance fees are charged only on net asset value increases that exceed the fund's highest historical peak valuation"
    },
    "correct_option": "C",
    "explanation": "A high-water mark ensures the manager does not collect 20% performance fees on simply recovering past portfolio losses: incentive fees are paid only on new net profits above previous peak NAV.",
    "distractor_analysis": {
      "A": "Incorrect. \"Management fees double whenever the fund exceeds benchmark returns\" is an inaccurate assessment: thinking high-water marks allow managers to collect fees on rebounding from losses.",
      "B": "Incorrect. \"Investors are guaranteed a minimum 20% annual return\" is an inaccurate assessment: thinking high-water marks allow managers to collect fees on rebounding from losses.",
      "C": "Correct. A high-water mark ensures the manager does not collect 20% performance fees on simply recovering past portfolio losses: incentive fees are paid only on new net profits above previous peak NAV."
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
      "B": "Quantitative market neutral strategy",
      "C": "Global macro strategy"
    },
    "correct_option": "A",
    "explanation": "Event-driven hedge funds capitalize on anticipated pricing discrepancies surrounding corporate events (merger arbitrage, distressed debt, spin-offs, proxy battles).",
    "distractor_analysis": {
      "A": "Correct. Event-driven hedge funds capitalize on anticipated pricing discrepancies surrounding corporate events (merger arbitrage, distressed debt, spin-offs, proxy battles).",
      "B": "Incorrect. \"Quantitative market neutral strategy\" is an inaccurate assessment: confusing event-driven with global macro.",
      "C": "Incorrect. \"Global macro strategy\" is an inaccurate assessment: confusing event-driven with global macro."
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
      "A": "$4.0M",
      "B": "$6.4M",
      "C": "$6.0M"
    },
    "correct_option": "B",
    "explanation": "Management fee = 2% * $120M = $2.4M. Net gain before incentive fee = $120M - $100M = $20M. Incentive fee = 20% * $20M = $4.0M. Total fees = $2.4M + $4.0M = $6.4M.",
    "distractor_analysis": {
      "A": "Incorrect. \"$4.0M\" is an inaccurate assessment: calculating fees on starting aum only ($6.0m) or miscalculating the incentive split.",
      "B": "Correct. Management fee = 2% * $120M = $2.4M. Net gain before incentive fee = $120M - $100M = $20M. Incentive fee = 20% * $20M = $4.0M. Total fees = $2.4M + $4.0M = $6.4M.",
      "C": "Incorrect. \"$6.0M\" is an inaccurate assessment: calculating fees on starting aum only ($6.0m) or miscalculating the incentive split."
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
      "A": "Maximize beta to 2.0 to capture bullish bull market rallies",
      "B": "Invest exclusively in zero-volatility sovereign cash instruments",
      "C": "Eliminate systematic market exposure (beta approx 0) by taking offsetting long and short positions within the same sector"
    },
    "correct_option": "C",
    "explanation": "Equity market neutral funds match long undervalued stocks with short overvalued stocks to achieve zero net beta exposure, generating alpha purely from individual security selection.",
    "distractor_analysis": {
      "A": "Incorrect. \"Maximize beta to 2.0 to capture bullish bull market rallies\" is an inaccurate assessment: assuming market neutral funds hold only cash.",
      "B": "Incorrect. \"Invest exclusively in zero-volatility sovereign cash instruments\" is an inaccurate assessment: assuming market neutral funds hold only cash.",
      "C": "Correct. Equity market neutral funds match long undervalued stocks with short overvalued stocks to achieve zero net beta exposure, generating alpha purely from individual security selection."
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
      "C": "The time required for clearinghouse trade settlement"
    },
    "correct_option": "A",
    "explanation": "A lock-up period restricts LP redemptions for an initial period after investing, giving the manager time to deploy capital into illiquid or complex positions without run-on-the-bank risks.",
    "distractor_analysis": {
      "A": "Correct. A lock-up period restricts LP redemptions for an initial period after investing, giving the manager time to deploy capital into illiquid or complex positions without run-on-the-bank risks.",
      "B": "Incorrect. \"The daily trading halt triggered when market volatility surges\" is an inaccurate assessment: confusing lock-up periods with trading halts.",
      "C": "Incorrect. \"The time required for clearinghouse trade settlement\" is an inaccurate assessment: confusing lock-up periods with trading halts."
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
      "A": "Halt all electronic trading during extreme volatility",
      "B": "Limit the aggregate percentage of total fund capital that can be redeemed on any single redemption date",
      "C": "Prevent new investors from entering the fund"
    },
    "correct_option": "B",
    "explanation": "A gate limits total fund-level withdrawals (e.g. max 10% or 15% of fund AUM per quarter), preventing fire-sale liquidation of illiquid assets during market panic.",
    "distractor_analysis": {
      "A": "Incorrect. \"Halt all electronic trading during extreme volatility\" is an inaccurate assessment: thinking gates allow permanent confiscation of client funds.",
      "B": "Correct. A gate limits total fund-level withdrawals (e.g. max 10% or 15% of fund AUM per quarter), preventing fire-sale liquidation of illiquid assets during market panic.",
      "C": "Incorrect. \"Prevent new investors from entering the fund\" is an inaccurate assessment: thinking gates allow permanent confiscation of client funds."
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
      "A": "Selecting micro-cap individual common stocks based on factory visits",
      "B": "Providing mortgage debt financing to real estate developers",
      "C": "Trading long and short positions across currencies, interest rates, equity indexes, and commodities based on top-down macroeconomic analysis"
    },
    "correct_option": "C",
    "explanation": "Global macro funds employ top-down macroeconomic analysis of central bank policies, sovereign debt, currency dynamics, and geopolitical trends to trade liquid macro instruments worldwide.",
    "distractor_analysis": {
      "A": "Incorrect. \"Selecting micro-cap individual common stocks based on factory visits\" is an inaccurate assessment: confusing top-down global macro with bottom-up micro-cap stock picking.",
      "B": "Incorrect. \"Providing mortgage debt financing to real estate developers\" is an inaccurate assessment: confusing top-down global macro with bottom-up micro-cap stock picking.",
      "C": "Correct. Global macro funds employ top-down macroeconomic analysis of central bank policies, sovereign debt, currency dynamics, and geopolitical trends to trade liquid macro instruments worldwide."
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
      "B": "Fund managers report audited returns every 24 hours",
      "C": "Only winning funds are legally permitted to operate"
    },
    "correct_option": "A",
    "explanation": "Survivorship bias occurs when closed or failed funds drop out of the database, leaving behind only successful surviving funds, biasing average reported returns upward by 1.5% to 3.0% annually.",
    "distractor_analysis": {
      "A": "Correct. Survivorship bias occurs when closed or failed funds drop out of the database, leaving behind only successful surviving funds, biasing average reported returns upward by 1.5% to 3.0% annually.",
      "B": "Incorrect. \"Fund managers report audited returns every 24 hours\" is an inaccurate assessment: assuming hedge fund databases include all terminated historical funds.",
      "C": "Incorrect. \"Only winning funds are legally permitted to operate\" is an inaccurate assessment: assuming hedge fund databases include all terminated historical funds."
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
      "A": "Incentive fees are charged only on returns in excess of the hurdle rate",
      "B": "Once the hurdle return is exceeded, incentive fees are calculated on the entire net return from zero",
      "C": "The hurdle rate adjusts with consumer price inflation"
    },
    "correct_option": "B",
    "explanation": "Under a soft hurdle rate, once the fund crosses the hurdle threshold, the manager earns incentive fees on the entire profit (back to dollar zero). Under a hard hurdle, fees apply only to returns above the hurdle.",
    "distractor_analysis": {
      "A": "Incorrect. \"Incentive fees are charged only on returns in excess of the hurdle rate\" is an inaccurate assessment: confusing soft hurdle with hard hurdle.",
      "B": "Correct. Under a soft hurdle rate, once the fund crosses the hurdle threshold, the manager earns incentive fees on the entire profit (back to dollar zero). Under a hard hurdle, fees apply only to returns above the hurdle.",
      "C": "Incorrect. \"The hurdle rate adjusts with consumer price inflation\" is an inaccurate assessment: confusing soft hurdle with hard hurdle."
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
      "A": "Investing exclusively in distressed sovereign debt",
      "B": "Buying long call options and selling short put options",
      "C": "Purchasing undervalued convertible bonds while hedging equity risk by short selling the underlying common stock"
    },
    "correct_option": "C",
    "explanation": "Convertible arbitrage buys undervalued convertible bonds (which contain embedded call options) and shorts the underlying equity in the delta-hedged ratio, capturing cheap volatility and cash yield.",
    "distractor_analysis": {
      "A": "Incorrect. \"Investing exclusively in distressed sovereign debt\" is an inaccurate assessment: thinking convertible arbitrage takes unhedged directional equity bets.",
      "B": "Incorrect. \"Buying long call options and selling short put options\" is an inaccurate assessment: thinking convertible arbitrage takes unhedged directional equity bets.",
      "C": "Correct. Convertible arbitrage buys undervalued convertible bonds (which contain embedded call options) and shorts the underlying equity in the delta-hedged ratio, capturing cheap volatility and cash yield."
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
      "C": "Hedge funds back-test quantitative models using synthetic data"
    },
    "correct_option": "A",
    "explanation": "Managers only choose to report to databases when their incubation performance has been exceptionally strong; including these past pre-reporting track records creates an artificial upward bias.",
    "distractor_analysis": {
      "A": "Correct. Managers only choose to report to databases when their incubation performance has been exceptionally strong; including these past pre-reporting track records creates an artificial upward bias.",
      "B": "Incorrect. \"Liquidated funds re-enter the database under new corporate names\" is an inaccurate assessment: confusing backfill bias with survivorship bias.",
      "C": "Incorrect. \"Hedge funds back-test quantitative models using synthetic data\" is an inaccurate assessment: confusing backfill bias with survivorship bias."
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
      "A": "Carried interest, management fee yield, and inflation premium",
      "B": "Spot price return, Roll yield, and Collateral yield (risk-free interest on cash margin)",
      "C": "Capital gain yield, dividend yield, and currency appreciation"
    },
    "correct_option": "B",
    "explanation": "Total return on a fully collateralized commodity futures investment = Spot Return (change in spot price) + Roll Yield (gain/loss from rolling futures) + Collateral Yield (interest earned on Treasury collateral).",
    "distractor_analysis": {
      "A": "Incorrect. \"Carried interest, management fee yield, and inflation premium\" is an inaccurate assessment: confusing commodity return components with equity stock returns.",
      "B": "Correct. Total return on a fully collateralized commodity futures investment = Spot Return (change in spot price) + Roll Yield (gain/loss from rolling futures) + Collateral Yield (interest earned on Treasury collateral).",
      "C": "Incorrect. \"Capital gain yield, dividend yield, and currency appreciation\" is an inaccurate assessment: confusing commodity return components with equity stock returns."
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
      "A": "Contango (futures price > spot price)",
      "B": "Flat parity where all maturities trade at identical prices",
      "C": "Backwardation (futures price < spot price)"
    },
    "correct_option": "C",
    "explanation": "In backwardation (downward-sloping curve), futures trade at a discount to spot. As an expiring long contract approaches maturity, its price converges upward toward the higher spot price, generating positive roll yield.",
    "distractor_analysis": {
      "A": "Incorrect. \"Contango (futures price > spot price)\" is an inaccurate assessment: assuming contango produces positive roll yield.",
      "B": "Incorrect. \"Flat parity where all maturities trade at identical prices\" is an inaccurate assessment: assuming contango produces positive roll yield.",
      "C": "Correct. In backwardation (downward-sloping curve), futures trade at a discount to spot. As an expiring long contract approaches maturity, its price converges upward toward the higher spot price, generating positive roll yield."
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
      "B": "Futures Price = Spot Price / (1 + r)",
      "C": "Futures Price = Spot Price - Storage Costs - Financing Costs"
    },
    "correct_option": "A",
    "explanation": "Net cost of carry includes physical warehousing/insurance costs and financing interest, offset by convenience yield (the benefit of having physical inventory immediately available).",
    "distractor_analysis": {
      "A": "Correct. Net cost of carry includes physical warehousing/insurance costs and financing interest, offset by convenience yield (the benefit of having physical inventory immediately available).",
      "B": "Incorrect. \"Futures Price = Spot Price / (1 + r)\" is an inaccurate assessment: adding convenience yield and subtracting storage costs.",
      "C": "Incorrect. \"Futures Price = Spot Price - Storage Costs - Financing Costs\" is an inaccurate assessment: adding convenience yield and subtracting storage costs."
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
      "A": "Have legally guaranteed redemption par values at maturity",
      "B": "Do not generate contractual cash flows (dividends, interest) and incur ongoing physical storage, insurance, and spoilage costs",
      "C": "Trade exclusively during daytime business hours in London"
    },
    "correct_option": "B",
    "explanation": "Unlike stocks (which pay dividends) or bonds (which pay interest), physical commodities produce zero cash income and consume carrying costs (storage, insurance, transportation).",
    "distractor_analysis": {
      "A": "Incorrect. \"Have legally guaranteed redemption par values at maturity\" is an inaccurate assessment: assuming physical commodities pay periodic dividends.",
      "B": "Correct. Unlike stocks (which pay dividends) or bonds (which pay interest), physical commodities produce zero cash income and consume carrying costs (storage, insurance, transportation).",
      "C": "Incorrect. \"Trade exclusively during daytime business hours in London\" is an inaccurate assessment: assuming physical commodities pay periodic dividends."
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
      "A": "Precious metals (gold and platinum)",
      "B": "Industrial metals (copper and aluminum)",
      "C": "Agricultural commodities (grains and livestock)"
    },
    "correct_option": "C",
    "explanation": "Agricultural softs and grains are harvested during discrete seasonal periods, yet human consumption is steady year-round, creating pronounced seasonal inventory and futures pricing cycles.",
    "distractor_analysis": {
      "A": "Incorrect. \"Precious metals (gold and platinum)\" is an inaccurate assessment: selecting industrial metals as seasonally harvested commodities.",
      "B": "Incorrect. \"Industrial metals (copper and aluminum)\" is an inaccurate assessment: selecting industrial metals as seasonally harvested commodities.",
      "C": "Correct. Agricultural softs and grains are harvested during discrete seasonal periods, yet human consumption is steady year-round, creating pronounced seasonal inventory and futures pricing cycles."
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
      "C": "The profit realized by closing out winning futures positions"
    },
    "correct_option": "A",
    "explanation": "Commodity futures require only fractional margin; the remaining unencumbered cash is invested in risk-free Treasury bills, generating a steady collateral interest yield for the portfolio.",
    "distractor_analysis": {
      "A": "Correct. Commodity futures require only fractional margin; the remaining unencumbered cash is invested in risk-free Treasury bills, generating a steady collateral interest yield for the portfolio.",
      "B": "Incorrect. \"The cash dividend distributed by commodity storage facilities\" is an inaccurate assessment: confusing collateral yield with roll yield.",
      "C": "Incorrect. \"The profit realized by closing out winning futures positions\" is an inaccurate assessment: confusing collateral yield with roll yield."
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
      "A": "Eliminate all price volatility",
      "B": "Experience a substantial negative roll yield as near-term contracts are sold at lower prices to purchase higher-priced longer-dated contracts",
      "C": "Earn large positive roll yields automatically"
    },
    "correct_option": "B",
    "explanation": "In contango, distant futures trade above near futures. An investor rolling contracts must sell the cheaper expiring contract and buy a more expensive deferred contract, bleeding value (negative roll yield).",
    "distractor_analysis": {
      "A": "Incorrect. \"Eliminate all price volatility\" is an inaccurate assessment: thinking contango provides a positive boost to long returns.",
      "B": "Correct. In contango, distant futures trade above near futures. An investor rolling contracts must sell the cheaper expiring contract and buy a more expensive deferred contract, bleeding value (negative roll yield).",
      "C": "Incorrect. \"Earn large positive roll yields automatically\" is an inaccurate assessment: thinking contango provides a positive boost to long returns."
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
      "A": "Crude oil",
      "B": "Wheat",
      "C": "Gold"
    },
    "correct_option": "C",
    "explanation": "Gold possesses high monetary density, durability, and a multi-millennia history as a non-fiat store of value and inflation hedge, functioning as a primary safe-haven asset during crises.",
    "distractor_analysis": {
      "A": "Incorrect. \"Crude oil\" is an inaccurate assessment: selecting perishable commodities as safe-haven reserves.",
      "B": "Incorrect. \"Wheat\" is an inaccurate assessment: selecting perishable commodities as safe-haven reserves.",
      "C": "Correct. Gold possesses high monetary density, durability, and a multi-millennia history as a non-fiat store of value and inflation hedge, functioning as a primary safe-haven asset during crises."
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
      "B": "Direct acquisitions of oil refineries and grain silos",
      "C": "Fundamental equity bottom-up stock picking"
    },
    "correct_option": "A",
    "explanation": "CTAs utilize systematic rule-based momentum and trend-following algorithms trading futures across commodities, currencies, interest rates, and equity indexes with strict risk parameters.",
    "distractor_analysis": {
      "A": "Correct. CTAs utilize systematic rule-based momentum and trend-following algorithms trading futures across commodities, currencies, interest rates, and equity indexes with strict risk parameters.",
      "B": "Incorrect. \"Direct acquisitions of oil refineries and grain silos\" is an inaccurate assessment: confusing ctas with physical commodity producers.",
      "C": "Incorrect. \"Fundamental equity bottom-up stock picking\" is an inaccurate assessment: confusing ctas with physical commodity producers."
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
      "A": "Physical barrels of crude oil for bushels of corn",
      "B": "A floating commodity market price (or index) for a pre-agreed fixed price over multiple settlement periods",
      "C": "Long-term corporate debt for gold bullion"
    },
    "correct_option": "B",
    "explanation": "A commodity swap enables consumers (e.g. airlines buying jet fuel) to lock in a fixed cost by exchanging floating index payments for fixed cash obligations without physical delivery.",
    "distractor_analysis": {
      "A": "Incorrect. \"Physical barrels of crude oil for bushels of corn\" is an inaccurate assessment: assuming commodity swaps require physical delivery of goods.",
      "B": "Correct. A commodity swap enables consumers (e.g. airlines buying jet fuel) to lock in a fixed cost by exchanging floating index payments for fixed cash obligations without physical delivery.",
      "C": "Incorrect. \"Long-term corporate debt for gold bullion\" is an inaccurate assessment: assuming commodity swaps require physical delivery of goods."
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
      "A": "Commodities have zero standard deviation of returns",
      "B": "Commodities guarantee a fixed annual dividend yield",
      "C": "Commodity returns are driven by supply-demand fundamentals and inflation shocks, resulting in historically low correlations with public equities and fixed income"
    },
    "correct_option": "C",
    "explanation": "Commodity prices react positively to unexpected inflation and real economic supply bottlenecks, providing a robust inflation hedge and low historical correlation with financial assets.",
    "distractor_analysis": {
      "A": "Incorrect. \"Commodities have zero standard deviation of returns\" is an inaccurate assessment: believing commodities have low volatility.",
      "B": "Incorrect. \"Commodities guarantee a fixed annual dividend yield\" is an inaccurate assessment: believing commodities have low volatility.",
      "C": "Correct. Commodity prices react positively to unexpected inflation and real economic supply bottlenecks, providing a robust inflation hedge and low historical correlation with financial assets."
    },
    "misconception": "Believing commodities have low volatility.",
    "time_estimate_seconds": 40
  }
];
