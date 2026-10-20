// Path: lib/data/banks/cfa/fixed-income.ts
import type { SeedQuestion } from "../../question-bank-seed";

export const CFA_FIXED_INCOME_QUESTIONS: SeedQuestion[] = [
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Fixed-Income Securities",
    "difficulty_tier": 2,
    "question_text": "A bond covenant that restricts the issuer from issuing senior debt with higher priority or requires maintaining a minimum interest coverage ratio is classified as a:",
    "options": {
      "A": "Negative covenant",
      "B": "Affirmative covenant",
      "C": "Cross-default provision",
      "D": "Sinking fund requirement"
    },
    "correct_option": "A",
    "explanation": "Negative covenants prohibit or restrict the borrower from specific actions (e.g. issuing senior debt, selling assets, paying excessive dividends). Affirmative covenants mandate actions (e.g. paying taxes, providing timely audits).",
    "distractor_analysis": {
      "A": "Correct. Negative covenants prohibit or restrict the borrower from specific actions (e.g.",
      "B": "Incorrect. Common distractor based on: Confusing negative covenants with affirmative covenants.",
      "C": "Incorrect. Common distractor based on: Confusing negative covenants with affirmative covenants.",
      "D": "Incorrect. Common distractor based on: Confusing negative covenants with affirmative covenants."
    },
    "misconception": "Confusing negative covenants with affirmative covenants.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Fixed-Income Securities",
    "difficulty_tier": 2,
    "question_text": "A dual-currency bond is a debt instrument where:",
    "options": {
      "A": "Coupon payments are denominated in one currency and principal par repayment is made in another currency",
      "B": "Coupons and principal are paid in whichever currency has appreciated most",
      "C": "Interest is paid in both currencies simultaneously every quarter",
      "D": "The issuer can default without legal recourse in either currency"
    },
    "correct_option": "A",
    "explanation": "Dual-currency bonds specify that coupon interest is paid in one designated currency, while final redemption par principal is returned in a different foreign currency.",
    "distractor_analysis": {
      "A": "Correct. Dual-currency bonds specify that coupon interest is paid in one designated curre",
      "B": "Incorrect. Common distractor based on: Confusing dual-currency bonds with multi-currency credit fac",
      "C": "Incorrect. Common distractor based on: Confusing dual-currency bonds with multi-currency credit fac",
      "D": "Incorrect. Common distractor based on: Confusing dual-currency bonds with multi-currency credit fac"
    },
    "misconception": "Confusing dual-currency bonds with multi-currency credit facilities.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Fixed-Income Securities",
    "difficulty_tier": 2,
    "question_text": "Which type of embedded bond option grants the issuer the contractual right to retire the bond prior to scheduled maturity at a specified call price?",
    "options": {
      "A": "Call option",
      "B": "Put option",
      "C": "Conversion option",
      "D": "Prepayment floor option"
    },
    "correct_option": "A",
    "explanation": "A callable bond includes an embedded call option owned by the issuer, allowing the borrower to refinance debt if market interest rates decline. Callable bonds trade at lower prices (higher yields) than non-callable bonds.",
    "distractor_analysis": {
      "A": "Correct. A callable bond includes an embedded call option owned by the issuer, allowing t",
      "B": "Incorrect. Common distractor based on: Confusing a callable bond (issuer option) with a putable bon",
      "C": "Incorrect. Common distractor based on: Confusing a callable bond (issuer option) with a putable bon",
      "D": "Incorrect. Common distractor based on: Confusing a callable bond (issuer option) with a putable bon"
    },
    "misconception": "Confusing a callable bond (issuer option) with a putable bond (investor option).",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Fixed-Income Securities",
    "difficulty_tier": 2,
    "question_text": "A floating-rate note (FRN) has a coupon formula specified as 3-month SOFR + 150 basis points. The 150 basis points addition is known as the:",
    "options": {
      "A": "Quoted margin",
      "B": "Reference rate",
      "C": "Required margin (discount margin)",
      "D": "Maturity premium"
    },
    "correct_option": "A",
    "explanation": "In an FRN, the fixed spread added to the floating reference rate (SOFR) is the quoted margin (QM), determined at issuance to compensate for issuer credit risk.",
    "distractor_analysis": {
      "A": "Correct. In an FRN, the fixed spread added to the floating reference rate (SOFR) is the q",
      "B": "Incorrect. Common distractor based on: Confusing quoted margin with discount margin.",
      "C": "Incorrect. Common distractor based on: Confusing quoted margin with discount margin.",
      "D": "Incorrect. Common distractor based on: Confusing quoted margin with discount margin."
    },
    "misconception": "Confusing quoted margin with discount margin.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Fixed-Income Securities",
    "difficulty_tier": 2,
    "question_text": "In an inflation-linked bond (such as US Treasury TIPS), how is inflation protection implemented?",
    "options": {
      "A": "The principal par value is adjusted semi-annually based on changes in the CPI, and the fixed coupon rate is applied to the adjusted principal",
      "B": "The coupon rate fluctuates while principal par remains strictly fixed at $1,000",
      "C": "The bondholder receives physical gold bullion at maturity",
      "D": "The bond is exempt from all corporate default risk"
    },
    "correct_option": "A",
    "explanation": "Capital-indexed bonds (TIPS) adjust the principal par value periodically by CPI inflation. The fixed coupon percentage is then applied to the inflation-adjusted principal, preserving real purchasing power.",
    "distractor_analysis": {
      "A": "Correct. Capital-indexed bonds (TIPS) adjust the principal par value periodically by CPI ",
      "B": "Incorrect. Common distractor based on: Thinking TIPS adjust the coupon percentage rather than the p",
      "C": "Incorrect. Common distractor based on: Thinking TIPS adjust the coupon percentage rather than the p",
      "D": "Incorrect. Common distractor based on: Thinking TIPS adjust the coupon percentage rather than the p"
    },
    "misconception": "Thinking TIPS adjust the coupon percentage rather than the principal par.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Fixed-Income Securities",
    "difficulty_tier": 2,
    "question_text": "A zero-coupon bond is originally issued at a deep discount to par value and:",
    "options": {
      "A": "Makes zero interim interest payments, paying the entire par face value at maturity",
      "B": "Pays annual coupons equal to prevailing inflation",
      "C": "Can never be redeemed prior to maturity under any circumstance",
      "D": "Has zero duration and zero interest rate price sensitivity"
    },
    "correct_option": "A",
    "explanation": "Zero-coupon bonds pay no intermediate coupons; total return is generated entirely through accretion of the discount to par value at maturity. Its Macaulay duration equals its maturity.",
    "distractor_analysis": {
      "A": "Correct. Zero-coupon bonds pay no intermediate coupons; total return is generated entirel",
      "B": "Incorrect. Common distractor based on: Believing zero-coupon bonds have zero interest rate sensitiv",
      "C": "Incorrect. Common distractor based on: Believing zero-coupon bonds have zero interest rate sensitiv",
      "D": "Incorrect. Common distractor based on: Believing zero-coupon bonds have zero interest rate sensitiv"
    },
    "misconception": "Believing zero-coupon bonds have zero interest rate sensitivity.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Fixed-Income Securities",
    "difficulty_tier": 2,
    "question_text": "A sinking fund arrangement in a bond indenture requires the issuer to:",
    "options": {
      "A": "Retire a designated portion of the bond issue's principal periodically prior to maturity",
      "B": "Deposit annual profits into a high-risk hedge fund equity account",
      "C": "Maintain cash equal to 100% of all future coupon payments in escrow",
      "D": "Convert all outstanding bonds into common equity upon insolvency"
    },
    "correct_option": "A",
    "explanation": "A sinking fund provision mandates periodic scheduled redemption of principal (by lot or open market purchase), reducing credit risk and maturity refinancing pressure.",
    "distractor_analysis": {
      "A": "Correct. A sinking fund provision mandates periodic scheduled redemption of principal (by",
      "B": "Incorrect. Common distractor based on: Confusing sinking funds with ordinary call options.",
      "C": "Incorrect. Common distractor based on: Confusing sinking funds with ordinary call options.",
      "D": "Incorrect. Common distractor based on: Confusing sinking funds with ordinary call options."
    },
    "misconception": "Confusing sinking funds with ordinary call options.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Fixed-Income Securities",
    "difficulty_tier": 2,
    "question_text": "Sovereign government bonds denominated in the issuer's own domestic legal tender typically carry:",
    "options": {
      "A": "Minimal credit default risk because the sovereign possesses taxing authority and money-creation power",
      "B": "Zero interest rate price risk",
      "C": "Zero inflation purchasing power risk",
      "D": "Mandatory subordination behind corporate commercial paper"
    },
    "correct_option": "A",
    "explanation": "Sovereigns borrowing in domestic currency possess ultimate money-printing and taxation powers, giving them the highest credit quality domestically, though they remain exposed to inflation and interest rate risk.",
    "distractor_analysis": {
      "A": "Correct. Sovereigns borrowing in domestic currency possess ultimate money-printing and ta",
      "B": "Incorrect. Common distractor based on: Assuming domestic sovereign bonds are free from inflation ri",
      "C": "Incorrect. Common distractor based on: Assuming domestic sovereign bonds are free from inflation ri",
      "D": "Incorrect. Common distractor based on: Assuming domestic sovereign bonds are free from inflation ri"
    },
    "misconception": "Assuming domestic sovereign bonds are free from inflation risk.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Fixed-Income Securities",
    "difficulty_tier": 2,
    "question_text": "A step-up coupon bond is designed to:",
    "options": {
      "A": "Automatically increase its coupon rate to specified higher levels on predetermined future calendar dates",
      "B": "Increase its coupon rate whenever the issuer's credit rating is upgraded",
      "C": "Pay floating interest indexed directly to crude oil prices",
      "D": "Convert into preferred stock if market rates decline"
    },
    "correct_option": "A",
    "explanation": "Step-up bonds feature predetermined scheduled upward steps in the coupon rate over the life of the bond, providing built-in yield step-ups or incentivizing the issuer to exercise call provisions.",
    "distractor_analysis": {
      "A": "Correct. Step-up bonds feature predetermined scheduled upward steps in the coupon rate ov",
      "B": "Incorrect. Common distractor based on: Thinking step-up bonds increase coupons upon credit upgrades",
      "C": "Incorrect. Common distractor based on: Thinking step-up bonds increase coupons upon credit upgrades",
      "D": "Incorrect. Common distractor based on: Thinking step-up bonds increase coupons upon credit upgrades"
    },
    "misconception": "Thinking step-up bonds increase coupons upon credit upgrades.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Fixed-Income Securities",
    "difficulty_tier": 2,
    "question_text": "What type of bond gives the investor the right, but not obligation, to sell the bond back to the issuer at par on specified dates?",
    "options": {
      "A": "Putable bond",
      "B": "Callable bond",
      "C": "Convertible bond",
      "D": "Perpetual debenture"
    },
    "correct_option": "A",
    "explanation": "A putable bond grants the bondholder the right to sell the bond back to the borrower at par, protecting the investor against rising market interest rates or credit degradation.",
    "distractor_analysis": {
      "A": "Correct. A putable bond grants the bondholder the right to sell the bond back to the borr",
      "B": "Incorrect. Common distractor based on: Confusing putable bond (investor right) with callable bond (",
      "C": "Incorrect. Common distractor based on: Confusing putable bond (investor right) with callable bond (",
      "D": "Incorrect. Common distractor based on: Confusing putable bond (investor right) with callable bond ("
    },
    "misconception": "Confusing putable bond (investor right) with callable bond (issuer right).",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Fixed-Income Securities",
    "difficulty_tier": 2,
    "question_text": "A medium-term note (MTN) program is characterized by:",
    "options": {
      "A": "Shelf registration allowing the issuer to offer debt securities continuously over time on flexible custom terms",
      "B": "Mandatory maturity of exactly 5 years across all tranches",
      "C": "Exemption from all federal securities disclosure laws",
      "D": "Securitized collateral backing by automobile retail receivables"
    },
    "correct_option": "A",
    "explanation": "MTN programs operate under shelf registration, giving corporate issuers flexibility to issue discrete custom debt tranches across various maturities and currencies as funding needs arise.",
    "distractor_analysis": {
      "A": "Correct. MTN programs operate under shelf registration, giving corporate issuers flexibil",
      "B": "Incorrect. Common distractor based on: Assuming MTNs are restricted strictly to 5-year intermediate",
      "C": "Incorrect. Common distractor based on: Assuming MTNs are restricted strictly to 5-year intermediate",
      "D": "Incorrect. Common distractor based on: Assuming MTNs are restricted strictly to 5-year intermediate"
    },
    "misconception": "Assuming MTNs are restricted strictly to 5-year intermediate terms.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Fixed-Income Valuation",
    "difficulty_tier": 2,
    "question_text": "A 3-year annual-pay bond with par value $1,000 has a coupon rate of 6% and Yield to Maturity (YTM) of 8%. The bond will trade at a:",
    "options": {
      "A": "Discount to par value",
      "B": "Premium to par value",
      "C": "Par value of exactly $1,000",
      "D": "Price determined solely by inflation"
    },
    "correct_option": "A",
    "explanation": "When a bond's coupon rate (6%) is lower than its market discount rate / YTM (8%), investors discount cash flows at a higher rate, driving the bond price below par (trading at a discount).",
    "distractor_analysis": {
      "A": "Correct. When a bond's coupon rate (6%) is lower than its market discount rate / YTM (8%)",
      "B": "Incorrect. Common distractor based on: Confusing discount bonds (Coupon < YTM) with premium bonds (",
      "C": "Incorrect. Common distractor based on: Confusing discount bonds (Coupon < YTM) with premium bonds (",
      "D": "Incorrect. Common distractor based on: Confusing discount bonds (Coupon < YTM) with premium bonds ("
    },
    "misconception": "Confusing discount bonds (Coupon < YTM) with premium bonds (Coupon > YTM).",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Fixed-Income Valuation",
    "difficulty_tier": 2,
    "question_text": "What is the price of a 2-year annual coupon bond with $1,000 par, 5% coupon, if spot rates are z1 = 4% and z2 = 6%?",
    "options": {
      "A": "$982.18",
      "B": "$1,000.00",
      "C": "$975.25",
      "D": "$1,019.23"
    },
    "correct_option": "A",
    "explanation": "Discounting each cash flow at its spot rate: Price = $50 / (1.04)^1 + $1,050 / (1.06)^2 = $48.077 + $1,050 / 1.1236 = $48.077 + $934.496 = $982.57 approx $982.18.",
    "distractor_analysis": {
      "A": "Correct. Discounting each cash flow at its spot rate: Price = $50 / (1.04)^1 + $1,050 / (",
      "B": "Incorrect. Common distractor based on: Discounting both cash flows at an unweighted average rate.",
      "C": "Incorrect. Common distractor based on: Discounting both cash flows at an unweighted average rate.",
      "D": "Incorrect. Common distractor based on: Discounting both cash flows at an unweighted average rate."
    },
    "misconception": "Discounting both cash flows at an unweighted average rate.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Fixed-Income Valuation",
    "difficulty_tier": 2,
    "question_text": "The full (dirty) price of a bond equals:",
    "options": {
      "A": "Flat (clean) price + Accrued Interest",
      "B": "Flat price - Accrued Interest",
      "C": "Par value + Coupon Payment",
      "D": "Flat price / (1 + YTM)"
    },
    "correct_option": "A",
    "explanation": "Full (dirty) price represents the actual cash amount paid by the buyer to the seller: Full Price = Flat (clean quoted) Price + Accrued Interest earned since the last coupon date.",
    "distractor_analysis": {
      "A": "Correct. Full (dirty) price represents the actual cash amount paid by the buyer to the se",
      "B": "Incorrect. Common distractor based on: Subtracting accrued interest from flat price.",
      "C": "Incorrect. Common distractor based on: Subtracting accrued interest from flat price.",
      "D": "Incorrect. Common distractor based on: Subtracting accrued interest from flat price."
    },
    "misconception": "Subtracting accrued interest from flat price.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Fixed-Income Valuation",
    "difficulty_tier": 2,
    "question_text": "If the 1-year spot rate is z1 = 3% and the 2-year spot rate is z2 = 5%, what is the 1-year forward rate one year from now (1y1y)?",
    "options": {
      "A": "7.04%",
      "B": "4.00%",
      "C": "2.00%",
      "D": "5.00%"
    },
    "correct_option": "A",
    "explanation": "(1 + z2)^2 = (1 + z1) * (1 + 1y1y) -> (1.05)^2 = (1.03) * (1 + f) -> 1.1025 / 1.03 = 1 + f -> 1 + f = 1.070388 -> f = 7.039% approx 7.04%.",
    "distractor_analysis": {
      "A": "Correct. (1 + z2)^2 = (1 + z1) * (1 + 1y1y) -> (1.05)^2 = (1.03) * (1 + f) -> 1.1025 / 1.",
      "B": "Incorrect. Common distractor based on: Taking simple subtraction (2 * 5% - 3% = 7.0% linear approxi",
      "C": "Incorrect. Common distractor based on: Taking simple subtraction (2 * 5% - 3% = 7.0% linear approxi",
      "D": "Incorrect. Common distractor based on: Taking simple subtraction (2 * 5% - 3% = 7.0% linear approxi"
    },
    "misconception": "Taking simple subtraction (2 * 5% - 3% = 7.0% linear approximation) or simple average.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Fixed-Income Valuation",
    "difficulty_tier": 2,
    "question_text": "A semi-annual coupon bond pays $30 every six months and has a semi-annual discount rate of 4%. Its annualized Yield to Maturity on a bond-equivalent yield (BEY) basis is:",
    "options": {
      "A": "8.0%",
      "B": "8.16%",
      "C": "4.0%",
      "D": "16.0%"
    },
    "correct_option": "A",
    "explanation": "The bond-equivalent yield simply doubles the semi-annual periodic yield: BEY = 2 * r_semi = 2 * 4% = 8.0%. The effective annual rate would be (1.04)^2 - 1 = 8.16%.",
    "distractor_analysis": {
      "A": "Correct. The bond-equivalent yield simply doubles the semi-annual periodic yield: BEY = 2",
      "B": "Incorrect. Common distractor based on: Confusing BEY (nominal annualized: 2 x semi) with EAR (compo",
      "C": "Incorrect. Common distractor based on: Confusing BEY (nominal annualized: 2 x semi) with EAR (compo",
      "D": "Incorrect. Common distractor based on: Confusing BEY (nominal annualized: 2 x semi) with EAR (compo"
    },
    "misconception": "Confusing BEY (nominal annualized: 2 x semi) with EAR (compounded).",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Fixed-Income Valuation",
    "difficulty_tier": 2,
    "question_text": "Matrix pricing is used to value fixed-income securities when:",
    "options": {
      "A": "A bond is illiquid and lacks recent active secondary market trade quotes",
      "B": "The bond has multiple embedded Bermudan call dates",
      "C": "The issuer is in formal sovereign bankruptcy reorganization",
      "D": "The yield curve is completely flat across all maturities"
    },
    "correct_option": "A",
    "explanation": "Matrix pricing estimates market discount rates and prices for thinly traded or unquoted bonds by interpolating yields from comparable liquid benchmark bonds of similar maturity and credit rating.",
    "distractor_analysis": {
      "A": "Correct. Matrix pricing estimates market discount rates and prices for thinly traded or u",
      "B": "Incorrect. Common distractor based on: Applying matrix pricing to highly liquid on-the-run Treasuri",
      "C": "Incorrect. Common distractor based on: Applying matrix pricing to highly liquid on-the-run Treasuri",
      "D": "Incorrect. Common distractor based on: Applying matrix pricing to highly liquid on-the-run Treasuri"
    },
    "misconception": "Applying matrix pricing to highly liquid on-the-run Treasuries.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Fixed-Income Valuation",
    "difficulty_tier": 2,
    "question_text": "As a bond approaches maturity, the price of a bond trading at a premium will:",
    "options": {
      "A": "Decline toward par value (the 'pull-to-par' effect)",
      "B": "Rise toward par value",
      "C": "Remain constant at its premium level",
      "D": "Fluctuate with infinite volatility"
    },
    "correct_option": "A",
    "explanation": "Assuming constant market interest rates, the price of any option-free bond must converge to its face par value at maturity; hence, premium bonds amortize down toward par.",
    "distractor_analysis": {
      "A": "Correct. Assuming constant market interest rates, the price of any option-free bond must ",
      "B": "Incorrect. Common distractor based on: Assuming premium bonds stay at a premium through redemption.",
      "C": "Incorrect. Common distractor based on: Assuming premium bonds stay at a premium through redemption.",
      "D": "Incorrect. Common distractor based on: Assuming premium bonds stay at a premium through redemption."
    },
    "misconception": "Assuming premium bonds stay at a premium through redemption.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Fixed-Income Valuation",
    "difficulty_tier": 2,
    "question_text": "The current yield of a bond is calculated as:",
    "options": {
      "A": "Annual Cash Coupon / Current Flat Market Price",
      "B": "Annual Cash Coupon / Par Value",
      "C": "Yield to Maturity minus Risk-Free Rate",
      "D": "Capital Gain Yield plus Dividend Yield"
    },
    "correct_option": "A",
    "explanation": "Current Yield = Annual Cash Coupon / Current Bond Price. It measures annual cash income yield, ignoring capital gains/losses from amortization to par.",
    "distractor_analysis": {
      "A": "Correct. Current Yield = Annual Cash Coupon / Current Bond Price. It measures annual cash",
      "B": "Incorrect. Common distractor based on: Dividing annual coupon by par value instead of current marke",
      "C": "Incorrect. Common distractor based on: Dividing annual coupon by par value instead of current marke",
      "D": "Incorrect. Common distractor based on: Dividing annual coupon by par value instead of current marke"
    },
    "misconception": "Dividing annual coupon by par value instead of current market price.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Fixed-Income Valuation",
    "difficulty_tier": 2,
    "question_text": "When market discount rates increase across all maturities, bond prices:",
    "options": {
      "A": "Decrease, with longer-maturity bonds experiencing greater percentage price drops than shorter-maturity bonds",
      "B": "Increase, because coupon payments become more valuable",
      "C": "Remain completely unchanged for fixed-rate bonds",
      "D": "Decrease, with short-term bonds falling more than long-term bonds"
    },
    "correct_option": "A",
    "explanation": "Bond prices and yields share an inverse relationship. Due to duration, longer-term bonds have greater sensitivity and experience larger percentage declines when discount rates rise.",
    "distractor_analysis": {
      "A": "Correct. Bond prices and yields share an inverse relationship. Due to duration, longer-te",
      "B": "Incorrect. Common distractor based on: Believing bond prices increase when market interest rates ri",
      "C": "Incorrect. Common distractor based on: Believing bond prices increase when market interest rates ri",
      "D": "Incorrect. Common distractor based on: Believing bond prices increase when market interest rates ri"
    },
    "misconception": "Believing bond prices increase when market interest rates rise.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Fixed-Income Valuation",
    "difficulty_tier": 2,
    "question_text": "A 10-year annual-pay bond with par $1,000 has an 8% coupon. If market YTM is also 8%, what is the bond's price?",
    "options": {
      "A": "$1,000.00",
      "B": "$1,080.00",
      "C": "$920.00",
      "D": "$800.00"
    },
    "correct_option": "A",
    "explanation": "When a bond's coupon rate is exactly equal to its market required yield to maturity (Coupon = YTM), the present value of coupons and par equals face value ($1,000 par).",
    "distractor_analysis": {
      "A": "Correct. When a bond's coupon rate is exactly equal to its market required yield to matur",
      "B": "Incorrect. Common distractor based on: Adding one year's coupon to par value ($1,080).",
      "C": "Incorrect. Common distractor based on: Adding one year's coupon to par value ($1,080).",
      "D": "Incorrect. Common distractor based on: Adding one year's coupon to par value ($1,080)."
    },
    "misconception": "Adding one year's coupon to par value ($1,080).",
    "time_estimate_seconds": 30
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Fixed-Income Valuation",
    "difficulty_tier": 2,
    "question_text": "On coupon payment dates (when accrued interest is zero):",
    "options": {
      "A": "The full (dirty) price is exactly equal to the flat (clean) price",
      "B": "The full price exceeds the flat price by one semi-annual coupon",
      "C": "The flat price drops to zero",
      "D": "The bond must be redeemed at par"
    },
    "correct_option": "A",
    "explanation": "Immediately following a coupon distribution, accrued interest resets to zero. Since Full Price = Flat Price + Accrued Interest, Full Price equals Flat Price on coupon payment dates.",
    "distractor_analysis": {
      "A": "Correct. Immediately following a coupon distribution, accrued interest resets to zero. Si",
      "B": "Incorrect. Common distractor based on: Assuming accrued interest is never zero.",
      "C": "Incorrect. Common distractor based on: Assuming accrued interest is never zero.",
      "D": "Incorrect. Common distractor based on: Assuming accrued interest is never zero."
    },
    "misconception": "Assuming accrued interest is never zero.",
    "time_estimate_seconds": 30
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Asset-Backed Securities",
    "difficulty_tier": 2,
    "question_text": "In the securitization process, the primary purpose of transferring underlying collateral loans to a Special Purpose Entity (SPE) is to:",
    "options": {
      "A": "Create bankruptcy remoteness, shielding investors from the bankruptcy risk of the loan originator",
      "B": "Eliminate all prepayment and credit risk of underlying borrowers",
      "C": "Avoid paying federal income taxes on bond coupon payments",
      "D": "Guarantee that underlying borrowers will never default"
    },
    "correct_option": "A",
    "explanation": "Transferring assets to a legally distinct bankruptcy-remote SPE (Special Purpose Vehicle) ensures that if the originating bank goes bankrupt, creditors of the bank have no claim on the securitized loans.",
    "distractor_analysis": {
      "A": "Correct. Transferring assets to a legally distinct bankruptcy-remote SPE (Special Purpose",
      "B": "Incorrect. Common distractor based on: Assuming securitization eliminates borrower credit defaults.",
      "C": "Incorrect. Common distractor based on: Assuming securitization eliminates borrower credit defaults.",
      "D": "Incorrect. Common distractor based on: Assuming securitization eliminates borrower credit defaults."
    },
    "misconception": "Assuming securitization eliminates borrower credit defaults.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Asset-Backed Securities",
    "difficulty_tier": 2,
    "question_text": "In a collateralized mortgage obligation (CMO), prepayment risk consists of two distinct components:",
    "options": {
      "A": "Contraction risk (faster prepayments when rates fall) and extension risk (slower prepayments when rates rise)",
      "B": "Default risk and currency risk",
      "C": "Liquidity risk and sovereign political risk",
      "D": "Reinvestment risk and inflation risk exclusively"
    },
    "correct_option": "A",
    "explanation": "Prepayment risk comprises: Contraction risk (homeowners refinance when interest rates drop, shortening bond life) and Extension risk (homeowners hold mortgages longer when rates rise, extending bond life).",
    "distractor_analysis": {
      "A": "Correct. Prepayment risk comprises: Contraction risk (homeowners refinance when interest ",
      "B": "Incorrect. Common distractor based on: Confusing prepayment risk with credit default risk.",
      "C": "Incorrect. Common distractor based on: Confusing prepayment risk with credit default risk.",
      "D": "Incorrect. Common distractor based on: Confusing prepayment risk with credit default risk."
    },
    "misconception": "Confusing prepayment risk with credit default risk.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Asset-Backed Securities",
    "difficulty_tier": 2,
    "question_text": "In a sequential-pay CMO structure, principal cash flows and prepayments are directed:",
    "options": {
      "A": "Entirely to Tranche A until fully retired, before any principal is allocated to Tranche B",
      "B": "Equally in pro-rata shares across all tranches simultaneously",
      "C": "Exclusively to the residual equity tranche first",
      "D": "To the tranche with the highest coupon rate"
    },
    "correct_option": "A",
    "explanation": "In sequential-pay CMOs, tranches receive interest concurrently, but all principal repayments are paid sequentially: Tranche A receives 100% of principal until paid off, then Tranche B, and so forth.",
    "distractor_analysis": {
      "A": "Correct. In sequential-pay CMOs, tranches receive interest concurrently, but all principa",
      "B": "Incorrect. Common distractor based on: Assuming principal prepayments are divided pro-rata across a",
      "C": "Incorrect. Common distractor based on: Assuming principal prepayments are divided pro-rata across a",
      "D": "Incorrect. Common distractor based on: Assuming principal prepayments are divided pro-rata across a"
    },
    "misconception": "Assuming principal prepayments are divided pro-rata across all tranches.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Asset-Backed Securities",
    "difficulty_tier": 2,
    "question_text": "Planned Amortization Class (PAC) tranches in a CMO achieve stable principal repayment schedules by:",
    "options": {
      "A": "Using support (companion) tranches to absorb prepayment variability within a defined PAC collar",
      "B": "Purchasing credit default swaps from the Federal Reserve",
      "C": "Requiring underlying homeowners to forfeit their prepayment rights",
      "D": "Guaranteeing a fixed 10% annual return"
    },
    "correct_option": "A",
    "explanation": "PAC tranches offer protection against both contraction and extension risk within an upper and lower prepayment speed collar because companion (support) tranches absorb excess or deficient prepayments.",
    "distractor_analysis": {
      "A": "Correct. PAC tranches offer protection against both contraction and extension risk within",
      "B": "Incorrect. Common distractor based on: Thinking PAC tranches eliminate the borrower's option to pre",
      "C": "Incorrect. Common distractor based on: Thinking PAC tranches eliminate the borrower's option to pre",
      "D": "Incorrect. Common distractor based on: Thinking PAC tranches eliminate the borrower's option to pre"
    },
    "misconception": "Thinking PAC tranches eliminate the borrower's option to prepay.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Asset-Backed Securities",
    "difficulty_tier": 2,
    "question_text": "Which of the following is an internal credit enhancement mechanism used in asset-backed security structures?",
    "options": {
      "A": "Overcollateralization and subordinated senior/subordinate tranching",
      "B": "A surety bond issued by an external monoline insurance company",
      "C": "A standby letter of credit provided by a commercial bank",
      "D": "A sovereign debt guarantee by the national treasury"
    },
    "correct_option": "A",
    "explanation": "Internal credit enhancements are built into the structure (senior/subordinated subordination, overcollateralization, excess spread reserves). Letters of credit and surety bonds are external enhancements.",
    "distractor_analysis": {
      "A": "Correct. Internal credit enhancements are built into the structure (senior/subordinated s",
      "B": "Incorrect. Common distractor based on: Confusing internal structural subordination with external ba",
      "C": "Incorrect. Common distractor based on: Confusing internal structural subordination with external ba",
      "D": "Incorrect. Common distractor based on: Confusing internal structural subordination with external ba"
    },
    "misconception": "Confusing internal structural subordination with external bank guarantees.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Asset-Backed Securities",
    "difficulty_tier": 2,
    "question_text": "Commercial Mortgage-Backed Securities (CMBS) typically feature two primary protection metrics against credit risk at the property level:",
    "options": {
      "A": "Debt Service Coverage Ratio (DSCR) and Loan-to-Value (LTV) ratio",
      "B": "Macaulay duration and modified convexity",
      "C": "Beta coefficient and Sharpe ratio",
      "D": "Price-to-earnings and price-to-book ratios"
    },
    "correct_option": "A",
    "explanation": "CMBS lenders evaluate credit strength using DSCR = Net Operating Income / Debt Service (cushion above 1.0) and LTV = Loan Amount / Appraised Property Value (equity cushion).",
    "distractor_analysis": {
      "A": "Correct. CMBS lenders evaluate credit strength using DSCR = Net Operating Income / Debt S",
      "B": "Incorrect. Common distractor based on: Using equity market ratios for commercial real estate debt.",
      "C": "Incorrect. Common distractor based on: Using equity market ratios for commercial real estate debt.",
      "D": "Incorrect. Common distractor based on: Using equity market ratios for commercial real estate debt."
    },
    "misconception": "Using equity market ratios for commercial real estate debt.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Asset-Backed Securities",
    "difficulty_tier": 2,
    "question_text": "Unlike residential mortgages, commercial mortgages frequently feature call protection mechanisms that penalize or restrict early prepayment, such as:",
    "options": {
      "A": "Defeasance, prepayment penalty points, and yield maintenance charges",
      "B": "Mandatory conversion into corporate equity shares",
      "C": "Unlimited free refinancing options at any time",
      "D": "Government subsidies covering prepayment interest differentials"
    },
    "correct_option": "A",
    "explanation": "CMBS loans protect against prepayment contraction risk via borrower lockout periods, yield maintenance penalties, prepayment fees, and defeasance (replacing the mortgage with a portfolio of Treasuries).",
    "distractor_analysis": {
      "A": "Correct. CMBS loans protect against prepayment contraction risk via borrower lockout peri",
      "B": "Incorrect. Common distractor based on: Assuming commercial mortgages allow penalty-free prepayments",
      "C": "Incorrect. Common distractor based on: Assuming commercial mortgages allow penalty-free prepayments",
      "D": "Incorrect. Common distractor based on: Assuming commercial mortgages allow penalty-free prepayments"
    },
    "misconception": "Assuming commercial mortgages allow penalty-free prepayments like conforming residential loans.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Asset-Backed Securities",
    "difficulty_tier": 2,
    "question_text": "Auto loan asset-backed securities (ABS) are backed by:",
    "options": {
      "A": "Amortizing, fully secured retail automobile loans with scheduled monthly principal and interest payments",
      "B": "Revolving, unsecured lines of consumer credit",
      "C": "Commercial real estate construction loans",
      "D": "Sovereign municipal infrastructure bonds"
    },
    "correct_option": "A",
    "explanation": "Auto loan ABS are collateralized by fully amortizing consumer installment loans secured by physical vehicles, generating predictable monthly cash flows with low extension risk.",
    "distractor_analysis": {
      "A": "Correct. Auto loan ABS are collateralized by fully amortizing consumer installment loans ",
      "B": "Incorrect. Common distractor based on: Confusing auto loan ABS with non-amortizing revolving credit",
      "C": "Incorrect. Common distractor based on: Confusing auto loan ABS with non-amortizing revolving credit",
      "D": "Incorrect. Common distractor based on: Confusing auto loan ABS with non-amortizing revolving credit"
    },
    "misconception": "Confusing auto loan ABS with non-amortizing revolving credit card ABS.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Asset-Backed Securities",
    "difficulty_tier": 2,
    "question_text": "In credit card ABS, the collateral is non-amortizing and revolving. During the initial 'revolving period':",
    "options": {
      "A": "Principal payments made by cardholders are used to purchase new receivables rather than distributed to bondholders",
      "B": "All bond principal is paid off immediately within 90 days",
      "C": "No interest payments are made to investors",
      "D": "Credit card interest rates are legally capped at zero"
    },
    "correct_option": "A",
    "explanation": "During the revolving period (typically 1 to 5 years), principal collections from cardholders are reinvested in new receivables generated on the accounts, while bondholders receive monthly coupon interest only.",
    "distractor_analysis": {
      "A": "Correct. During the revolving period (typically 1 to 5 years), principal collections from",
      "B": "Incorrect. Common distractor based on: Assuming principal is distributed to bondholders during the ",
      "C": "Incorrect. Common distractor based on: Assuming principal is distributed to bondholders during the ",
      "D": "Incorrect. Common distractor based on: Assuming principal is distributed to bondholders during the "
    },
    "misconception": "Assuming principal is distributed to bondholders during the revolving period.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Asset-Backed Securities",
    "difficulty_tier": 2,
    "question_text": "What is the Single Monthly Mortality (SMM) rate in mortgage-backed security analysis?",
    "options": {
      "A": "The percentage of outstanding mortgage balance that is prepaid in a specific month in excess of scheduled principal amortization",
      "B": "The percentage of borrowers who default during the calendar year",
      "C": "The monthly interest rate earned on escrow reserves",
      "D": "The monthly default mortality rate of commercial properties"
    },
    "correct_option": "A",
    "explanation": "SMM measures non-scheduled early principal prepayments during a single month as a percentage of available beginning mortgage balance after scheduled amortization. CPR annualizes SMM.",
    "distractor_analysis": {
      "A": "Correct. SMM measures non-scheduled early principal prepayments during a single month as ",
      "B": "Incorrect. Common distractor based on: Confusing SMM with default rates.",
      "C": "Incorrect. Common distractor based on: Confusing SMM with default rates.",
      "D": "Incorrect. Common distractor based on: Confusing SMM with default rates."
    },
    "misconception": "Confusing SMM with default rates.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Asset-Backed Securities",
    "difficulty_tier": 2,
    "question_text": "Defeasance in a commercial mortgage loan involves:",
    "options": {
      "A": "The borrower replacing the mortgaged property with a portfolio of government securities that replicate the remaining debt service cash flows",
      "B": "The lender forgiving 50% of the loan principal balance",
      "C": "Transferring default liability to the tenant leasing the property",
      "D": "Liquidating the building at foreclosure auction"
    },
    "correct_option": "A",
    "explanation": "Defeasance allows the borrower to release the commercial property from the mortgage lien by pledging a dedicated basket of US Treasuries matching remaining principal and interest payments.",
    "distractor_analysis": {
      "A": "Correct. Defeasance allows the borrower to release the commercial property from the mortg",
      "B": "Incorrect. Common distractor based on: Thinking defeasance represents loan default or debt forgiven",
      "C": "Incorrect. Common distractor based on: Thinking defeasance represents loan default or debt forgiven",
      "D": "Incorrect. Common distractor based on: Thinking defeasance represents loan default or debt forgiven"
    },
    "misconception": "Thinking defeasance represents loan default or debt forgiveness.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Yield & Spread Analysis",
    "difficulty_tier": 2,
    "question_text": "Macaulay duration measures the weighted average time until a bond's cash flows are received. For an option-free annual coupon bond, Modified Duration is calculated as:",
    "options": {
      "A": "Modified Duration = Macaulay Duration / (1 + YTM)",
      "B": "Modified Duration = Macaulay Duration * (1 + YTM)",
      "C": "Modified Duration = Macaulay Duration / YTM^2",
      "D": "Modified Duration = Macaulay Duration + Convexity"
    },
    "correct_option": "A",
    "explanation": "Modified Duration = MacDur / (1 + y). It measures the approximate percentage change in bond price for a 100-basis-point (1%) shift in yield to maturity: % Delta P approx -ModDur * Delta y.",
    "distractor_analysis": {
      "A": "Correct. Modified Duration = MacDur / (1 + y). It measures the approximate percentage cha",
      "B": "Incorrect. Common distractor based on: Multiplying Macaulay duration by (1 + y) instead of dividing",
      "C": "Incorrect. Common distractor based on: Multiplying Macaulay duration by (1 + y) instead of dividing",
      "D": "Incorrect. Common distractor based on: Multiplying Macaulay duration by (1 + y) instead of dividing"
    },
    "misconception": "Multiplying Macaulay duration by (1 + y) instead of dividing.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Yield & Spread Analysis",
    "difficulty_tier": 2,
    "question_text": "A bond has Modified Duration of 7.5 years and annual convexity of 80. If yield to maturity decreases by 100 basis points (-0.01), what is the estimated percentage price change?",
    "options": {
      "A": "+7.90%",
      "B": "+7.50%",
      "C": "+7.10%",
      "D": "+8.30%"
    },
    "correct_option": "A",
    "explanation": "% Delta P approx -ModDur * Delta y + 0.5 * Convexity * (Delta y)^2 = -7.5 * (-0.01) + 0.5 * 80 * (-0.01)^2 = +0.075 + 0.5 * 80 * 0.0001 = +0.075 + 0.0040 = +0.0790 = +7.90%.",
    "distractor_analysis": {
      "A": "Correct. % Delta P approx -ModDur * Delta y + 0.5 * Convexity * (Delta y)^2 = -7.5 * (-0.",
      "B": "Incorrect. Common distractor based on: Omitting the positive convexity adjustment (+7.50%).",
      "C": "Incorrect. Common distractor based on: Omitting the positive convexity adjustment (+7.50%).",
      "D": "Incorrect. Common distractor based on: Omitting the positive convexity adjustment (+7.50%)."
    },
    "misconception": "Omitting the positive convexity adjustment (+7.50%).",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Yield & Spread Analysis",
    "difficulty_tier": 2,
    "question_text": "Effective duration is preferred over Modified duration for valuing bonds with embedded options (such as callable or mortgage-backed bonds) because:",
    "options": {
      "A": "It accounts for changes in future cash flows caused by the exercise of embedded options as yields change",
      "B": "It requires zero knowledge of benchmark interest rates",
      "C": "It is strictly equal to the bond's stated maturity in years",
      "D": "It is unaffected by prepayment speed changes"
    },
    "correct_option": "A",
    "explanation": "Modified duration assumes future cash flows are fixed and static. For callable or mortgage bonds where cash flows vary when rates change, Effective Duration = (P_minus - P_plus) / (2 * P0 * Delta y) must be used.",
    "distractor_analysis": {
      "A": "Correct. Modified duration assumes future cash flows are fixed and static. For callable o",
      "B": "Incorrect. Common distractor based on: Assuming modified duration can accurately price bonds with o",
      "C": "Incorrect. Common distractor based on: Assuming modified duration can accurately price bonds with o",
      "D": "Incorrect. Common distractor based on: Assuming modified duration can accurately price bonds with o"
    },
    "misconception": "Assuming modified duration can accurately price bonds with option-dependent cash flows.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Yield & Spread Analysis",
    "difficulty_tier": 2,
    "question_text": "What is the Z-spread (Zero-Volatility Spread) of a corporate bond?",
    "options": {
      "A": "The constant spread that, when added to each spot rate on the benchmark Treasury spot curve, equates the bond's cash flows to its market price",
      "B": "The difference between the bond's YTM and the yield of a benchmark government bond (G-spread)",
      "C": "The spread over the interbank swap rate curve",
      "D": "The spread calculated assuming future interest rates have zero duration"
    },
    "correct_option": "A",
    "explanation": "The Z-spread is the constant basis point spread that must be added to every zero-coupon Treasury spot rate across all maturity tenors to discount bond cash flows to current market price.",
    "distractor_analysis": {
      "A": "Correct. The Z-spread is the constant basis point spread that must be added to every zero",
      "B": "Incorrect. Common distractor based on: Confusing Z-spread (spread over spot curve) with G-spread (s",
      "C": "Incorrect. Common distractor based on: Confusing Z-spread (spread over spot curve) with G-spread (s",
      "D": "Incorrect. Common distractor based on: Confusing Z-spread (spread over spot curve) with G-spread (s"
    },
    "misconception": "Confusing Z-spread (spread over spot curve) with G-spread (spread over single YTM).",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Yield & Spread Analysis",
    "difficulty_tier": 2,
    "question_text": "For a callable bond, how does the Option-Adjusted Spread (OAS) compare to its Z-spread?",
    "options": {
      "A": "OAS is lower than Z-spread because it removes the value of the embedded call option granted to the issuer",
      "B": "OAS is strictly higher than Z-spread",
      "C": "OAS and Z-spread are always identical",
      "D": "OAS is equal to Z-spread plus the option cost"
    },
    "correct_option": "A",
    "explanation": "Z-spread includes compensation for the embedded call option (cost of option > 0): Z-spread = OAS + Option Cost -> OAS = Z-spread - Option Cost. Thus OAS < Z-spread for a callable bond.",
    "distractor_analysis": {
      "A": "Correct. Z-spread includes compensation for the embedded call option (cost of option > 0)",
      "B": "Incorrect. Common distractor based on: Assuming OAS is higher than Z-spread for a callable bond.",
      "C": "Incorrect. Common distractor based on: Assuming OAS is higher than Z-spread for a callable bond.",
      "D": "Incorrect. Common distractor based on: Assuming OAS is higher than Z-spread for a callable bond."
    },
    "misconception": "Assuming OAS is higher than Z-spread for a callable bond.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Yield & Spread Analysis",
    "difficulty_tier": 2,
    "question_text": "Which bond has positive convexity at all yield levels?",
    "options": {
      "A": "An option-free fixed-rate bond",
      "B": "A callable bond when interest rates decline significantly below the call strike",
      "C": "A mortgage-backed security exhibiting severe contraction risk",
      "D": "A step-down floating rate bond"
    },
    "correct_option": "A",
    "explanation": "Option-free bonds always exhibit positive convexity (price-yield curve is convex to origin: price gains from yield drops exceed price losses from yield rises). Callable bonds exhibit negative convexity at low yields.",
    "distractor_analysis": {
      "A": "Correct. Option-free bonds always exhibit positive convexity (price-yield curve is convex",
      "B": "Incorrect. Common distractor based on: Believing callable bonds maintain positive convexity at low ",
      "C": "Incorrect. Common distractor based on: Believing callable bonds maintain positive convexity at low ",
      "D": "Incorrect. Common distractor based on: Believing callable bonds maintain positive convexity at low "
    },
    "misconception": "Believing callable bonds maintain positive convexity at low interest rates.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Yield & Spread Analysis",
    "difficulty_tier": 2,
    "question_text": "Money Duration (Dollar Duration) of a bond measures:",
    "options": {
      "A": "The estimated dollar change in bond value for a given change in yield, calculated as Modified Duration multiplied by full bond price",
      "B": "The percentage change in bond price per dollar change in coupons",
      "C": "The total cash coupons received over the life of the bond",
      "D": "The cash yield generated by money market mutual funds"
    },
    "correct_option": "A",
    "explanation": "Money Duration = ModDur * Full Price. It expresses interest rate risk in monetary dollar terms rather than percentage terms (DV01 / PVBP = Money Duration * 0.0001).",
    "distractor_analysis": {
      "A": "Correct. Money Duration = ModDur * Full Price. It expresses interest rate risk in monetar",
      "B": "Incorrect. Common distractor based on: Confusing money duration with percentage duration.",
      "C": "Incorrect. Common distractor based on: Confusing money duration with percentage duration.",
      "D": "Incorrect. Common distractor based on: Confusing money duration with percentage duration."
    },
    "misconception": "Confusing money duration with percentage duration.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Yield & Spread Analysis",
    "difficulty_tier": 2,
    "question_text": "The Price Value of a Basis Point (PVBP or DV01) of a bond is:",
    "options": {
      "A": "The absolute change in bond price resulting from a 1-basis-point (0.01%) change in yield",
      "B": "The coupon payment received every 100 days",
      "C": "The spread between 10-year and 2-year Treasury yields",
      "D": "The transaction commission paid on interbank trades"
    },
    "correct_option": "A",
    "explanation": "PVBP (DV01) = (P_minus - P_plus) / 2 for a 1 bp yield move. It quantifies the dollar price impact of a 0.01% yield shift.",
    "distractor_analysis": {
      "A": "Correct. PVBP (DV01) = (P_minus - P_plus) / 2 for a 1 bp yield move. It quantifies the do",
      "B": "Incorrect. Common distractor based on: Confusing PVBP with a 100 basis point yield move.",
      "C": "Incorrect. Common distractor based on: Confusing PVBP with a 100 basis point yield move.",
      "D": "Incorrect. Common distractor based on: Confusing PVBP with a 100 basis point yield move."
    },
    "misconception": "Confusing PVBP with a 100 basis point yield move.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Yield & Spread Analysis",
    "difficulty_tier": 2,
    "question_text": "Key rate duration measures a bond's price sensitivity to:",
    "options": {
      "A": "A change in benchmark yield at a specific maturity point on the yield curve, holding all other key rates constant",
      "B": "A parallel shift across the entire term structure of interest rates",
      "C": "Changes in the central bank discount rate exclusively",
      "D": "Changes in currency exchange rates"
    },
    "correct_option": "A",
    "explanation": "Key rate duration measures shaping risk (sensitivity to non-parallel yield curve shifts like steepening, flattening, or twists) by shifting a single maturity knot point while holding others fixed.",
    "distractor_analysis": {
      "A": "Correct. Key rate duration measures shaping risk (sensitivity to non-parallel yield curve",
      "B": "Incorrect. Common distractor based on: Confusing key rate duration with effective duration (which a",
      "C": "Incorrect. Common distractor based on: Confusing key rate duration with effective duration (which a",
      "D": "Incorrect. Common distractor based on: Confusing key rate duration with effective duration (which a"
    },
    "misconception": "Confusing key rate duration with effective duration (which assumes parallel shifts).",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Yield & Spread Analysis",
    "difficulty_tier": 2,
    "question_text": "For an option-free zero-coupon bond maturing in exactly 8 years, its Macaulay duration is:",
    "options": {
      "A": "8.0 years",
      "B": "4.0 years",
      "C": "7.4 years",
      "D": "0 years"
    },
    "correct_option": "A",
    "explanation": "Because a zero-coupon bond delivers 100% of its cash flow on its single maturity date, its weighted average cash flow time (Macaulay duration) is strictly equal to its time to maturity (8.0 years).",
    "distractor_analysis": {
      "A": "Correct. Because a zero-coupon bond delivers 100% of its cash flow on its single maturity",
      "B": "Incorrect. Common distractor based on: Thinking zero-coupon bonds have zero duration.",
      "C": "Incorrect. Common distractor based on: Thinking zero-coupon bonds have zero duration.",
      "D": "Incorrect. Common distractor based on: Thinking zero-coupon bonds have zero duration."
    },
    "misconception": "Thinking zero-coupon bonds have zero duration.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Yield & Spread Analysis",
    "difficulty_tier": 2,
    "question_text": "G-spread (Government Spread) is calculated as the difference between a corporate bond's yield to maturity and:",
    "options": {
      "A": "The yield of an actual or interpolated benchmark government bond with matching maturity",
      "B": "The interbank swap rate of identical duration",
      "C": "The London Interbank Offered Rate (LIBOR)",
      "D": "The rate of domestic consumer price inflation"
    },
    "correct_option": "A",
    "explanation": "G-spread is the yield difference between a corporate bond and an interpolated government bond of equivalent maturity on the benchmark sovereign yield curve.",
    "distractor_analysis": {
      "A": "Correct. G-spread is the yield difference between a corporate bond and an interpolated go",
      "B": "Incorrect. Common distractor based on: Confusing G-spread with I-spread (which uses the swap rate c",
      "C": "Incorrect. Common distractor based on: Confusing G-spread with I-spread (which uses the swap rate c",
      "D": "Incorrect. Common distractor based on: Confusing G-spread with I-spread (which uses the swap rate c"
    },
    "misconception": "Confusing G-spread with I-spread (which uses the swap rate curve).",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Credit Analysis",
    "difficulty_tier": 2,
    "question_text": "In credit analysis, Expected Loss from a corporate bond default is calculated as:",
    "options": {
      "A": "Probability of Default (PD) x Loss Given Default (LGD)",
      "B": "Probability of Default (PD) x Recovery Rate (RR)",
      "C": "Loss Given Default / Recovery Rate",
      "D": "Coupon Rate x Default Spread"
    },
    "correct_option": "A",
    "explanation": "Expected Loss = PD x LGD = PD x (1 - Recovery Rate). If a bond has a 2% default probability and 60% recovery rate (40% LGD), Expected Loss = 2% x 40% = 0.80%.",
    "distractor_analysis": {
      "A": "Correct. Expected Loss = PD x LGD = PD x (1 - Recovery Rate). If a bond has a 2% default ",
      "B": "Incorrect. Common distractor based on: Using recovery rate in place of loss given default (1 - RR).",
      "C": "Incorrect. Common distractor based on: Using recovery rate in place of loss given default (1 - RR).",
      "D": "Incorrect. Common distractor based on: Using recovery rate in place of loss given default (1 - RR)."
    },
    "misconception": "Using recovery rate in place of loss given default (1 - RR).",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Credit Analysis",
    "difficulty_tier": 2,
    "question_text": "Under the traditional '4 Cs of Credit' framework, what does 'Capacity' evaluate?",
    "options": {
      "A": "The borrower's operational and financial ability to service debt on time out of operating cash flows",
      "B": "The physical manufacturing floor space of the borrower",
      "C": "The quality and value of pledged collateral assets",
      "D": "The ethical reputation and management integrity of corporate executives"
    },
    "correct_option": "A",
    "explanation": "The 4 Cs are: Capacity (cash flow generation ability), Collateral (asset quality/pledges), Covenants (contractual restrictions), and Character (management integrity).",
    "distractor_analysis": {
      "A": "Correct. The 4 Cs are: Capacity (cash flow generation ability), Collateral (asset quality",
      "B": "Incorrect. Common distractor based on: Confusing Capacity (cash flow) with Collateral or Character.",
      "C": "Incorrect. Common distractor based on: Confusing Capacity (cash flow) with Collateral or Character.",
      "D": "Incorrect. Common distractor based on: Confusing Capacity (cash flow) with Collateral or Character."
    },
    "misconception": "Confusing Capacity (cash flow) with Collateral or Character.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Credit Analysis",
    "difficulty_tier": 2,
    "question_text": "The boundary dividing investment-grade corporate bonds from speculative-grade (high-yield / 'junk') bonds corresponds to credit ratings of:",
    "options": {
      "A": "Baa3 (Moody's) / BBB- (S&P/Fitch) and above are investment grade; Ba1 / BB+ and below are high yield",
      "B": "A3 / A- and above are investment grade",
      "C": "Caa1 / CCC+ and above are investment grade",
      "D": "Baa1 / BBB+ and above are investment grade"
    },
    "correct_option": "A",
    "explanation": "Investment grade spans Aaa/AAA down to Baa3/BBB-. High-yield (speculative / junk) starts immediately below at Ba1/BB+ down to C/D.",
    "distractor_analysis": {
      "A": "Correct. Investment grade spans Aaa/AAA down to Baa3/BBB-. High-yield (speculative / junk",
      "B": "Incorrect. Common distractor based on: Setting the investment grade cutoff at A- or BBB+.",
      "C": "Incorrect. Common distractor based on: Setting the investment grade cutoff at A- or BBB+.",
      "D": "Incorrect. Common distractor based on: Setting the investment grade cutoff at A- or BBB+."
    },
    "misconception": "Setting the investment grade cutoff at A- or BBB+.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Credit Analysis",
    "difficulty_tier": 2,
    "question_text": "Credit migration risk (downgrade risk) refers to the risk that:",
    "options": {
      "A": "An issuer's credit rating is downgraded, widening its yield spread and causing a drop in bond price",
      "B": "The borrower physically relocates corporate headquarters to a foreign nation",
      "C": "Bond coupons are paid in a depreciated foreign currency",
      "D": "The bondholder fails to receive physical delivery of certificates"
    },
    "correct_option": "A",
    "explanation": "Credit migration risk is the risk that an issuer's creditworthiness deteriorates, leading credit rating agencies to downgrade the debt, which widens credit spreads and reduces market value prior to default.",
    "distractor_analysis": {
      "A": "Correct. Credit migration risk is the risk that an issuer's creditworthiness deteriorates",
      "B": "Incorrect. Common distractor based on: Thinking credit migration refers to corporate geographic rel",
      "C": "Incorrect. Common distractor based on: Thinking credit migration refers to corporate geographic rel",
      "D": "Incorrect. Common distractor based on: Thinking credit migration refers to corporate geographic rel"
    },
    "misconception": "Thinking credit migration refers to corporate geographic relocation.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Credit Analysis",
    "difficulty_tier": 2,
    "question_text": "Priority of claims in a corporate liquidation bankruptcy generally follows which hierarchy?",
    "options": {
      "A": "Senior secured debt > Senior unsecured debt > Subordinated debt > Preferred stock > Common equity",
      "B": "Common equity > Preferred stock > Senior unsecured debt > Senior secured debt",
      "C": "Senior unsecured debt > Senior secured debt > Subordinated debt > Common stock",
      "D": "Subordinated debt > Senior secured debt > Common stock"
    },
    "correct_option": "A",
    "explanation": "Under the absolute priority rule: secured creditors (backed by specific collateral) are satisfied first, followed by senior unsecured debentures, subordinated debt, preferred equity, and lastly common stockholders.",
    "distractor_analysis": {
      "A": "Correct. Under the absolute priority rule: secured creditors (backed by specific collater",
      "B": "Incorrect. Common distractor based on: Placing equity or unsecured debt ahead of secured debt.",
      "C": "Incorrect. Common distractor based on: Placing equity or unsecured debt ahead of secured debt.",
      "D": "Incorrect. Common distractor based on: Placing equity or unsecured debt ahead of secured debt."
    },
    "misconception": "Placing equity or unsecured debt ahead of secured debt.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Credit Analysis",
    "difficulty_tier": 2,
    "question_text": "What is the Debt-to-EBITDA ratio used for in corporate credit analysis?",
    "options": {
      "A": "It measures financial leverage and indicates the number of years of current operating cash earnings required to repay total debt",
      "B": "It measures immediate cash liquidity available within 24 hours",
      "C": "It determines the appropriate dividend payout ratio for common shares",
      "D": "It measures the tax deductibility of depreciation expenses"
    },
    "correct_option": "A",
    "explanation": "Debt/EBITDA is a primary leverage metric used by rating agencies and credit analysts to measure the scale of corporate debt relative to standardized operating cash generation.",
    "distractor_analysis": {
      "A": "Correct. Debt/EBITDA is a primary leverage metric used by rating agencies and credit anal",
      "B": "Incorrect. Common distractor based on: Confusing Debt/EBITDA with liquidity or equity dividend rati",
      "C": "Incorrect. Common distractor based on: Confusing Debt/EBITDA with liquidity or equity dividend rati",
      "D": "Incorrect. Common distractor based on: Confusing Debt/EBITDA with liquidity or equity dividend rati"
    },
    "misconception": "Confusing Debt/EBITDA with liquidity or equity dividend ratios.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Credit Analysis",
    "difficulty_tier": 2,
    "question_text": "High-yield (speculative grade) corporate credit analysis focuses much more heavily on:",
    "options": {
      "A": "Liquidity, short-term debt maturity profile, and collateral liquidation recovery value than investment-grade analysis",
      "B": "Macroeconomic sovereign foreign exchange policy exclusively",
      "C": "Stock option black-scholes volatility models",
      "D": "Dividend growth rate projections over 20-year horizons"
    },
    "correct_option": "A",
    "explanation": "Because high-yield issuers face higher immediate default risk, analysis emphasizes near-term liquidity, debt rollover runways, covenant restrictions, and worst-case asset recovery liquidation values.",
    "distractor_analysis": {
      "A": "Correct. Because high-yield issuers face higher immediate default risk, analysis emphasiz",
      "B": "Incorrect. Common distractor based on: Analyzing high-yield debt like stable investment-grade utili",
      "C": "Incorrect. Common distractor based on: Analyzing high-yield debt like stable investment-grade utili",
      "D": "Incorrect. Common distractor based on: Analyzing high-yield debt like stable investment-grade utili"
    },
    "misconception": "Analyzing high-yield debt like stable investment-grade utilities.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Credit Analysis",
    "difficulty_tier": 2,
    "question_text": "Credit spreads on corporate bonds typically behave counter-cyclically, meaning they:",
    "options": {
      "A": "Widen during economic recessions and narrow during economic expansions",
      "B": "Narrow during recessions and widen during booms",
      "C": "Remain completely static across all economic cycles",
      "D": "Move in lockstep with central bank policy interest rates"
    },
    "correct_option": "A",
    "explanation": "During recessions, default probabilities rise and market liquidity drops, causing investors to demand higher risk premiums, widening credit spreads. During expansions, default risk falls, narrowing spreads.",
    "distractor_analysis": {
      "A": "Correct. During recessions, default probabilities rise and market liquidity drops, causin",
      "B": "Incorrect. Common distractor based on: Assuming credit spreads narrow during recessions.",
      "C": "Incorrect. Common distractor based on: Assuming credit spreads narrow during recessions.",
      "D": "Incorrect. Common distractor based on: Assuming credit spreads narrow during recessions."
    },
    "misconception": "Assuming credit spreads narrow during recessions.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Credit Analysis",
    "difficulty_tier": 2,
    "question_text": "Structural subordination occurs when:",
    "options": {
      "A": "A holding company issues debt while its operating subsidiaries incur their own debt, leaving holding company creditors junior to subsidiary creditors",
      "B": "Bond covenants explicitly state that all debt is equal in priority",
      "C": "The board of directors converts common equity into preferred equity",
      "D": "Corporate debentures are guaranteed by an external parent entity"
    },
    "correct_option": "A",
    "explanation": "Structural subordination arises from corporate organization: subsidiary creditors have direct legal claims on subsidiary cash flows and assets, leaving holding company creditors with claims only on residual equity.",
    "distractor_analysis": {
      "A": "Correct. Structural subordination arises from corporate organization: subsidiary creditor",
      "B": "Incorrect. Common distractor based on: Confusing structural subordination with contractual subordin",
      "C": "Incorrect. Common distractor based on: Confusing structural subordination with contractual subordin",
      "D": "Incorrect. Common distractor based on: Confusing structural subordination with contractual subordin"
    },
    "misconception": "Confusing structural subordination with contractual subordination.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Credit Analysis",
    "difficulty_tier": 2,
    "question_text": "In credit rating agency terminology, what does an 'outlook' of 'Negative' indicate?",
    "options": {
      "A": "There is a heightened probability that the issuer's credit rating will be downgraded over the next 12 to 24 months",
      "B": "The issuer has entered formal bankruptcy default proceedings immediately",
      "C": "The bond coupon rate will automatically decrease by 50 basis points",
      "D": "The bond is removed from all institutional benchmark indexes"
    },
    "correct_option": "A",
    "explanation": "A credit rating outlook assesses potential medium-term direction (typically 1-2 years): a Negative outlook signals that credit trends are deteriorating and a downgrade is likely if unaddressed.",
    "distractor_analysis": {
      "A": "Correct. A credit rating outlook assesses potential medium-term direction (typically 1-2 ",
      "B": "Incorrect. Common distractor based on: Confusing a negative rating outlook with an immediate credit",
      "C": "Incorrect. Common distractor based on: Confusing a negative rating outlook with an immediate credit",
      "D": "Incorrect. Common distractor based on: Confusing a negative rating outlook with an immediate credit"
    },
    "misconception": "Confusing a negative rating outlook with an immediate credit default.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Credit Analysis",
    "difficulty_tier": 2,
    "question_text": "Why can two bonds with identical credit ratings from the same rating agency trade at different credit yield spreads?",
    "options": {
      "A": "Differences in secondary market liquidity, issue size, covenant strength, and sector-specific supply and demand",
      "B": "Credit ratings legally fix trading yields across all broker-dealers",
      "C": "Rating agencies mandate identical trading prices across same-rated bonds",
      "D": "Bond yields are determined exclusively by par value"
    },
    "correct_option": "A",
    "explanation": "Ratings capture only default risk and loss severity. Market credit spreads also price liquidity differences, issue float size, covenant protections, call features, and industry-specific market dynamics.",
    "distractor_analysis": {
      "A": "Correct. Ratings capture only default risk and loss severity. Market credit spreads also ",
      "B": "Incorrect. Common distractor based on: Assuming credit ratings capture all market pricing factors i",
      "C": "Incorrect. Common distractor based on: Assuming credit ratings capture all market pricing factors i",
      "D": "Incorrect. Common distractor based on: Assuming credit ratings capture all market pricing factors i"
    },
    "misconception": "Assuming credit ratings capture all market pricing factors including liquidity.",
    "time_estimate_seconds": 45
  }
];
