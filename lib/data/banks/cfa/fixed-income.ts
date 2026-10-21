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
      "C": "Cross-default provision"
    },
    "correct_option": "A",
    "explanation": "Negative covenants prohibit or restrict the borrower from specific actions (e.g. issuing senior debt, selling assets, paying excessive dividends). Affirmative covenants mandate actions (e.g. paying taxes, providing timely audits).",
    "distractor_analysis": {
      "A": "Correct. Negative covenants prohibit or restrict the borrower from specific actions (e.g. issuing senior debt, selling assets, paying excessive dividends). Affirmative covenants mandate actions (e.g. paying taxes, providing timely audits).",
      "B": "Incorrect. \"Affirmative covenant\" is a fixed income valuation trap: confusing negative covenants with affirmative covenants.",
      "C": "Incorrect. \"Cross-default provision\" is a fixed income valuation trap: confusing negative covenants with affirmative covenants."
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
      "A": "Interest is paid in both currencies simultaneously every quarter",
      "B": "Coupon payments are denominated in one currency and principal par repayment is made in another currency",
      "C": "Coupons and principal are paid in whichever currency has appreciated most"
    },
    "correct_option": "B",
    "explanation": "Dual-currency bonds specify that coupon interest is paid in one designated currency, while final redemption par principal is returned in a different foreign currency.",
    "distractor_analysis": {
      "A": "Incorrect. \"Interest is paid in both currencies simultaneously every quarter\" is a fixed income valuation trap: confusing dual-currency bonds with multi-currency credit facilities.",
      "B": "Correct. Dual-currency bonds specify that coupon interest is paid in one designated currency, while final redemption par principal is returned in a different foreign currency.",
      "C": "Incorrect. \"Coupons and principal are paid in whichever currency has appreciated most\" is a fixed income valuation trap: confusing dual-currency bonds with multi-currency credit facilities."
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
      "A": "Conversion option",
      "B": "Put option",
      "C": "Call option"
    },
    "correct_option": "C",
    "explanation": "A callable bond includes an embedded call option owned by the issuer, allowing the borrower to refinance debt if market interest rates decline. Callable bonds trade at lower prices (higher yields) than non-callable bonds.",
    "distractor_analysis": {
      "A": "Incorrect. \"Conversion option\" is a fixed income valuation trap: confusing a callable bond (issuer option) with a putable bond (investor option).",
      "B": "Incorrect. \"Put option\" is a fixed income valuation trap: confusing a callable bond (issuer option) with a putable bond (investor option).",
      "C": "Correct. A callable bond includes an embedded call option owned by the issuer, allowing the borrower to refinance debt if market interest rates decline. Callable bonds trade at lower prices (higher yields) than non-callable bonds."
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
      "B": "Required margin (discount margin)",
      "C": "Reference rate"
    },
    "correct_option": "A",
    "explanation": "In an FRN, the fixed spread added to the floating reference rate (SOFR) is the quoted margin (QM), determined at issuance to compensate for issuer credit risk.",
    "distractor_analysis": {
      "A": "Correct. In an FRN, the fixed spread added to the floating reference rate (SOFR) is the quoted margin (QM), determined at issuance to compensate for issuer credit risk.",
      "B": "Incorrect. \"Required margin (discount margin)\" is a fixed income valuation trap: confusing quoted margin with discount margin.",
      "C": "Incorrect. \"Reference rate\" is a fixed income valuation trap: confusing quoted margin with discount margin."
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
      "A": "The coupon rate fluctuates while principal par remains strictly fixed at $1,000",
      "B": "The principal par value is adjusted semi-annually based on changes in the CPI, and the fixed coupon rate is applied to the adjusted principal",
      "C": "The bondholder receives physical gold bullion at maturity"
    },
    "correct_option": "B",
    "explanation": "Capital-indexed bonds (TIPS) adjust the principal par value periodically by CPI inflation. The fixed coupon percentage is then applied to the inflation-adjusted principal, preserving real purchasing power.",
    "distractor_analysis": {
      "A": "Incorrect. \"The coupon rate fluctuates while principal par remains strictly fixed at $1,000\" is a fixed income valuation trap: thinking tips adjust the coupon percentage rather than the principal par.",
      "B": "Correct. Capital-indexed bonds (TIPS) adjust the principal par value periodically by CPI inflation. The fixed coupon percentage is then applied to the inflation-adjusted principal, preserving real purchasing power.",
      "C": "Incorrect. \"The bondholder receives physical gold bullion at maturity\" is a fixed income valuation trap: thinking tips adjust the coupon percentage rather than the principal par."
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
      "A": "Pays annual coupons equal to prevailing inflation",
      "B": "Can never be redeemed prior to maturity under any circumstance",
      "C": "Makes zero interim interest payments, paying the entire par face value at maturity"
    },
    "correct_option": "C",
    "explanation": "Zero-coupon bonds pay no intermediate coupons; total return is generated entirely through accretion of the discount to par value at maturity. Its Macaulay duration equals its maturity.",
    "distractor_analysis": {
      "A": "Incorrect. \"Pays annual coupons equal to prevailing inflation\" is a fixed income valuation trap: believing zero-coupon bonds have zero interest rate sensitivity.",
      "B": "Incorrect. \"Can never be redeemed prior to maturity under any circumstance\" is a fixed income valuation trap: believing zero-coupon bonds have zero interest rate sensitivity.",
      "C": "Correct. Zero-coupon bonds pay no intermediate coupons; total return is generated entirely through accretion of the discount to par value at maturity. Its Macaulay duration equals its maturity."
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
      "C": "Maintain cash equal to 100% of all future coupon payments in escrow"
    },
    "correct_option": "A",
    "explanation": "A sinking fund provision mandates periodic scheduled redemption of principal (by lot or open market purchase), reducing credit risk and maturity refinancing pressure.",
    "distractor_analysis": {
      "A": "Correct. A sinking fund provision mandates periodic scheduled redemption of principal (by lot or open market purchase), reducing credit risk and maturity refinancing pressure.",
      "B": "Incorrect. \"Deposit annual profits into a high-risk hedge fund equity account\" is a fixed income valuation trap: confusing sinking funds with ordinary call options.",
      "C": "Incorrect. \"Maintain cash equal to 100% of all future coupon payments in escrow\" is a fixed income valuation trap: confusing sinking funds with ordinary call options."
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
      "A": "Zero inflation purchasing power risk",
      "B": "Minimal credit default risk because the sovereign possesses taxing authority and money-creation power",
      "C": "Zero interest rate price risk"
    },
    "correct_option": "B",
    "explanation": "Sovereigns borrowing in domestic currency possess ultimate money-printing and taxation powers, giving them the highest credit quality domestically, though they remain exposed to inflation and interest rate risk.",
    "distractor_analysis": {
      "A": "Incorrect. \"Zero inflation purchasing power risk\" is a fixed income valuation trap: assuming domestic sovereign bonds are free from inflation risk.",
      "B": "Correct. Sovereigns borrowing in domestic currency possess ultimate money-printing and taxation powers, giving them the highest credit quality domestically, though they remain exposed to inflation and interest rate risk.",
      "C": "Incorrect. \"Zero interest rate price risk\" is a fixed income valuation trap: assuming domestic sovereign bonds are free from inflation risk."
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
      "A": "Pay floating interest indexed directly to crude oil prices",
      "B": "Increase its coupon rate whenever the issuer's credit rating is upgraded",
      "C": "Automatically increase its coupon rate to specified higher levels on predetermined future calendar dates"
    },
    "correct_option": "C",
    "explanation": "Step-up bonds feature predetermined scheduled upward steps in the coupon rate over the life of the bond, providing built-in yield step-ups or incentivizing the issuer to exercise call provisions.",
    "distractor_analysis": {
      "A": "Incorrect. \"Pay floating interest indexed directly to crude oil prices\" is a fixed income valuation trap: thinking step-up bonds increase coupons upon credit upgrades.",
      "B": "Incorrect. \"Increase its coupon rate whenever the issuer's credit rating is upgraded\" is a fixed income valuation trap: thinking step-up bonds increase coupons upon credit upgrades.",
      "C": "Correct. Step-up bonds feature predetermined scheduled upward steps in the coupon rate over the life of the bond, providing built-in yield step-ups or incentivizing the issuer to exercise call provisions."
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
      "B": "Convertible bond",
      "C": "Callable bond"
    },
    "correct_option": "A",
    "explanation": "A putable bond grants the bondholder the right to sell the bond back to the borrower at par, protecting the investor against rising market interest rates or credit degradation.",
    "distractor_analysis": {
      "A": "Correct. A putable bond grants the bondholder the right to sell the bond back to the borrower at par, protecting the investor against rising market interest rates or credit degradation.",
      "B": "Incorrect. \"Convertible bond\" is a fixed income valuation trap: confusing putable bond (investor right) with callable bond (issuer right).",
      "C": "Incorrect. \"Callable bond\" is a fixed income valuation trap: confusing putable bond (investor right) with callable bond (issuer right)."
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
      "A": "Mandatory maturity of exactly 5 years across all tranches",
      "B": "Shelf registration allowing the issuer to offer debt securities continuously over time on flexible custom terms",
      "C": "Exemption from all federal securities disclosure laws"
    },
    "correct_option": "B",
    "explanation": "MTN programs operate under shelf registration, giving corporate issuers flexibility to issue discrete custom debt tranches across various maturities and currencies as funding needs arise.",
    "distractor_analysis": {
      "A": "Incorrect. \"Mandatory maturity of exactly 5 years across all tranches\" is a fixed income valuation trap: assuming mtns are restricted strictly to 5-year intermediate terms.",
      "B": "Correct. MTN programs operate under shelf registration, giving corporate issuers flexibility to issue discrete custom debt tranches across various maturities and currencies as funding needs arise.",
      "C": "Incorrect. \"Exemption from all federal securities disclosure laws\" is a fixed income valuation trap: assuming mtns are restricted strictly to 5-year intermediate terms."
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
      "A": "Premium to par value",
      "B": "Par value of exactly $1,000",
      "C": "Discount to par value"
    },
    "correct_option": "C",
    "explanation": "When a bond's coupon rate (6%) is lower than its market discount rate / YTM (8%), investors discount cash flows at a higher rate, driving the bond price below par (trading at a discount).",
    "distractor_analysis": {
      "A": "Incorrect. \"Premium to par value\" is a fixed income valuation trap: confusing discount bonds (coupon < ytm) with premium bonds (coupon > ytm).",
      "B": "Incorrect. \"Par value of exactly $1,000\" is a fixed income valuation trap: confusing discount bonds (coupon < ytm) with premium bonds (coupon > ytm).",
      "C": "Correct. When a bond's coupon rate (6%) is lower than its market discount rate / YTM (8%), investors discount cash flows at a higher rate, driving the bond price below par (trading at a discount)."
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
      "C": "$975.25"
    },
    "correct_option": "A",
    "explanation": "Discounting each cash flow at its spot rate: Price = $50 / (1.04)^1 + $1,050 / (1.06)^2 = $48.077 + $1,050 / 1.1236 = $48.077 + $934.496 = $982.57 approx $982.18.",
    "distractor_analysis": {
      "A": "Correct. Discounting each cash flow at its spot rate: Price = $50 / (1.04)^1 + $1,050 / (1.06)^2 = $48.077 + $1,050 / 1.1236 = $48.077 + $934.496 = $982.57 approx $982.18.",
      "B": "Incorrect. \"$1,000.00\" is a fixed income valuation trap: discounting both cash flows at an unweighted average rate.",
      "C": "Incorrect. \"$975.25\" is a fixed income valuation trap: discounting both cash flows at an unweighted average rate."
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
      "A": "Par value + Coupon Payment",
      "B": "Flat (clean) price + Accrued Interest",
      "C": "Flat price - Accrued Interest"
    },
    "correct_option": "B",
    "explanation": "Full (dirty) price represents the actual cash amount paid by the buyer to the seller: Full Price = Flat (clean quoted) Price + Accrued Interest earned since the last coupon date.",
    "distractor_analysis": {
      "A": "Incorrect. \"Par value + Coupon Payment\" is a fixed income valuation trap: subtracting accrued interest from flat price.",
      "B": "Correct. Full (dirty) price represents the actual cash amount paid by the buyer to the seller: Full Price = Flat (clean quoted) Price + Accrued Interest earned since the last coupon date.",
      "C": "Incorrect. \"Flat price - Accrued Interest\" is a fixed income valuation trap: subtracting accrued interest from flat price."
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
      "A": "2.00%",
      "B": "4.00%",
      "C": "7.04%"
    },
    "correct_option": "C",
    "explanation": "(1 + z2)^2 = (1 + z1) * (1 + 1y1y) -> (1.05)^2 = (1.03) * (1 + f) -> 1.1025 / 1.03 = 1 + f -> 1 + f = 1.070388 -> f = 7.039% approx 7.04%.",
    "distractor_analysis": {
      "A": "Incorrect. \"2.00%\" is a fixed income valuation trap: taking simple subtraction (2 * 5% - 3% = 7.0% linear approximation) or simple average.",
      "B": "Incorrect. \"4.00%\" is a fixed income valuation trap: taking simple subtraction (2 * 5% - 3% = 7.0% linear approximation) or simple average.",
      "C": "Correct. (1 + z2)^2 = (1 + z1) * (1 + 1y1y) -> (1.05)^2 = (1.03) * (1 + f) -> 1.1025 / 1.03 = 1 + f -> 1 + f = 1.070388 -> f = 7.039% approx 7.04%."
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
      "B": "4.0%",
      "C": "8.16%"
    },
    "correct_option": "A",
    "explanation": "The bond-equivalent yield simply doubles the semi-annual periodic yield: BEY = 2 * r_semi = 2 * 4% = 8.0%. The effective annual rate would be (1.04)^2 - 1 = 8.16%.",
    "distractor_analysis": {
      "A": "Correct. The bond-equivalent yield simply doubles the semi-annual periodic yield: BEY = 2 * r_semi = 2 * 4% = 8.0%. The effective annual rate would be (1.04)^2 - 1 = 8.16%.",
      "B": "Incorrect. \"4.0%\" is a fixed income valuation trap: confusing bey (nominal annualized: 2 x semi) with ear (compounded).",
      "C": "Incorrect. \"8.16%\" is a fixed income valuation trap: confusing bey (nominal annualized: 2 x semi) with ear (compounded)."
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
      "A": "The bond has multiple embedded Bermudan call dates",
      "B": "A bond is illiquid and lacks recent active secondary market trade quotes",
      "C": "The issuer is in formal sovereign bankruptcy reorganization"
    },
    "correct_option": "B",
    "explanation": "Matrix pricing estimates market discount rates and prices for thinly traded or unquoted bonds by interpolating yields from comparable liquid benchmark bonds of similar maturity and credit rating.",
    "distractor_analysis": {
      "A": "Incorrect. \"The bond has multiple embedded Bermudan call dates\" is a fixed income valuation trap: applying matrix pricing to highly liquid on-the-run treasuries.",
      "B": "Correct. Matrix pricing estimates market discount rates and prices for thinly traded or unquoted bonds by interpolating yields from comparable liquid benchmark bonds of similar maturity and credit rating.",
      "C": "Incorrect. \"The issuer is in formal sovereign bankruptcy reorganization\" is a fixed income valuation trap: applying matrix pricing to highly liquid on-the-run treasuries."
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
      "A": "Rise toward par value",
      "B": "Remain constant at its premium level",
      "C": "Decline toward par value (the 'pull-to-par' effect)"
    },
    "correct_option": "C",
    "explanation": "Assuming constant market interest rates, the price of any option-free bond must converge to its face par value at maturity; hence, premium bonds amortize down toward par.",
    "distractor_analysis": {
      "A": "Incorrect. \"Rise toward par value\" is a fixed income valuation trap: assuming premium bonds stay at a premium through redemption.",
      "B": "Incorrect. \"Remain constant at its premium level\" is a fixed income valuation trap: assuming premium bonds stay at a premium through redemption.",
      "C": "Correct. Assuming constant market interest rates, the price of any option-free bond must converge to its face par value at maturity; hence, premium bonds amortize down toward par."
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
      "C": "Yield to Maturity minus Risk-Free Rate"
    },
    "correct_option": "A",
    "explanation": "Current Yield = Annual Cash Coupon / Current Bond Price. It measures annual cash income yield, ignoring capital gains/losses from amortization to par.",
    "distractor_analysis": {
      "A": "Correct. Current Yield = Annual Cash Coupon / Current Bond Price. It measures annual cash income yield, ignoring capital gains/losses from amortization to par.",
      "B": "Incorrect. \"Annual Cash Coupon / Par Value\" is a fixed income valuation trap: dividing annual coupon by par value instead of current market price.",
      "C": "Incorrect. \"Yield to Maturity minus Risk-Free Rate\" is a fixed income valuation trap: dividing annual coupon by par value instead of current market price."
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
      "A": "Remain completely unchanged for fixed-rate bonds",
      "B": "Decrease, with longer-maturity bonds experiencing greater percentage price drops than shorter-maturity bonds",
      "C": "Increase, because coupon payments become more valuable"
    },
    "correct_option": "B",
    "explanation": "Bond prices and yields share an inverse relationship. Due to duration, longer-term bonds have greater sensitivity and experience larger percentage declines when discount rates rise.",
    "distractor_analysis": {
      "A": "Incorrect. \"Remain completely unchanged for fixed-rate bonds\" is a fixed income valuation trap: believing bond prices increase when market interest rates rise.",
      "B": "Correct. Bond prices and yields share an inverse relationship. Due to duration, longer-term bonds have greater sensitivity and experience larger percentage declines when discount rates rise.",
      "C": "Incorrect. \"Increase, because coupon payments become more valuable\" is a fixed income valuation trap: believing bond prices increase when market interest rates rise."
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
      "A": "$920.00",
      "B": "$1,080.00",
      "C": "$1,000.00"
    },
    "correct_option": "C",
    "explanation": "When a bond's coupon rate is exactly equal to its market required yield to maturity (Coupon = YTM), the present value of coupons and par equals face value ($1,000 par).",
    "distractor_analysis": {
      "A": "Incorrect. \"$920.00\" is a fixed income valuation trap: adding one year's coupon to par value ($1,080).",
      "B": "Incorrect. \"$1,080.00\" is a fixed income valuation trap: adding one year's coupon to par value ($1,080).",
      "C": "Correct. When a bond's coupon rate is exactly equal to its market required yield to maturity (Coupon = YTM), the present value of coupons and par equals face value ($1,000 par)."
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
      "B": "The flat price drops to zero",
      "C": "The full price exceeds the flat price by one semi-annual coupon"
    },
    "correct_option": "A",
    "explanation": "Immediately following a coupon distribution, accrued interest resets to zero. Since Full Price = Flat Price + Accrued Interest, Full Price equals Flat Price on coupon payment dates.",
    "distractor_analysis": {
      "A": "Correct. Immediately following a coupon distribution, accrued interest resets to zero. Since Full Price = Flat Price + Accrued Interest, Full Price equals Flat Price on coupon payment dates.",
      "B": "Incorrect. \"The flat price drops to zero\" is a fixed income valuation trap: assuming accrued interest is never zero.",
      "C": "Incorrect. \"The full price exceeds the flat price by one semi-annual coupon\" is a fixed income valuation trap: assuming accrued interest is never zero."
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
      "A": "Eliminate all prepayment and credit risk of underlying borrowers",
      "B": "Create bankruptcy remoteness, shielding investors from the bankruptcy risk of the loan originator",
      "C": "Avoid paying federal income taxes on bond coupon payments"
    },
    "correct_option": "B",
    "explanation": "Transferring assets to a legally distinct bankruptcy-remote SPE (Special Purpose Vehicle) ensures that if the originating bank goes bankrupt, creditors of the bank have no claim on the securitized loans.",
    "distractor_analysis": {
      "A": "Incorrect. \"Eliminate all prepayment and credit risk of underlying borrowers\" is a fixed income valuation trap: assuming securitization eliminates borrower credit defaults.",
      "B": "Correct. Transferring assets to a legally distinct bankruptcy-remote SPE (Special Purpose Vehicle) ensures that if the originating bank goes bankrupt, creditors of the bank have no claim on the securitized loans.",
      "C": "Incorrect. \"Avoid paying federal income taxes on bond coupon payments\" is a fixed income valuation trap: assuming securitization eliminates borrower credit defaults."
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
      "A": "Default risk and currency risk",
      "B": "Liquidity risk and sovereign political risk",
      "C": "Contraction risk (faster prepayments when rates fall) and extension risk (slower prepayments when rates rise)"
    },
    "correct_option": "C",
    "explanation": "Prepayment risk comprises: Contraction risk (homeowners refinance when interest rates drop, shortening bond life) and Extension risk (homeowners hold mortgages longer when rates rise, extending bond life).",
    "distractor_analysis": {
      "A": "Incorrect. \"Default risk and currency risk\" is a fixed income valuation trap: confusing prepayment risk with credit default risk.",
      "B": "Incorrect. \"Liquidity risk and sovereign political risk\" is a fixed income valuation trap: confusing prepayment risk with credit default risk.",
      "C": "Correct. Prepayment risk comprises: Contraction risk (homeowners refinance when interest rates drop, shortening bond life) and Extension risk (homeowners hold mortgages longer when rates rise, extending bond life)."
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
      "C": "Exclusively to the residual equity tranche first"
    },
    "correct_option": "A",
    "explanation": "In sequential-pay CMOs, tranches receive interest concurrently, but all principal repayments are paid sequentially: Tranche A receives 100% of principal until paid off, then Tranche B, and so forth.",
    "distractor_analysis": {
      "A": "Correct. In sequential-pay CMOs, tranches receive interest concurrently, but all principal repayments are paid sequentially: Tranche A receives 100% of principal until paid off, then Tranche B, and so forth.",
      "B": "Incorrect. \"Equally in pro-rata shares across all tranches simultaneously\" is a fixed income valuation trap: assuming principal prepayments are divided pro-rata across all tranches.",
      "C": "Incorrect. \"Exclusively to the residual equity tranche first\" is a fixed income valuation trap: assuming principal prepayments are divided pro-rata across all tranches."
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
      "A": "Requiring underlying homeowners to forfeit their prepayment rights",
      "B": "Using support (companion) tranches to absorb prepayment variability within a defined PAC collar",
      "C": "Purchasing credit default swaps from the Federal Reserve"
    },
    "correct_option": "B",
    "explanation": "PAC tranches offer protection against both contraction and extension risk within an upper and lower prepayment speed collar because companion (support) tranches absorb excess or deficient prepayments.",
    "distractor_analysis": {
      "A": "Incorrect. \"Requiring underlying homeowners to forfeit their prepayment rights\" is a fixed income valuation trap: thinking pac tranches eliminate the borrower's option to prepay.",
      "B": "Correct. PAC tranches offer protection against both contraction and extension risk within an upper and lower prepayment speed collar because companion (support) tranches absorb excess or deficient prepayments.",
      "C": "Incorrect. \"Purchasing credit default swaps from the Federal Reserve\" is a fixed income valuation trap: thinking pac tranches eliminate the borrower's option to prepay."
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
      "A": "A standby letter of credit provided by a commercial bank",
      "B": "A surety bond issued by an external monoline insurance company",
      "C": "Overcollateralization and subordinated senior/subordinate tranching"
    },
    "correct_option": "C",
    "explanation": "Internal credit enhancements are built into the structure (senior/subordinated subordination, overcollateralization, excess spread reserves). Letters of credit and surety bonds are external enhancements.",
    "distractor_analysis": {
      "A": "Incorrect. \"A standby letter of credit provided by a commercial bank\" is a fixed income valuation trap: confusing internal structural subordination with external bank guarantees.",
      "B": "Incorrect. \"A surety bond issued by an external monoline insurance company\" is a fixed income valuation trap: confusing internal structural subordination with external bank guarantees.",
      "C": "Correct. Internal credit enhancements are built into the structure (senior/subordinated subordination, overcollateralization, excess spread reserves). Letters of credit and surety bonds are external enhancements."
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
      "B": "Beta coefficient and Sharpe ratio",
      "C": "Macaulay duration and modified convexity"
    },
    "correct_option": "A",
    "explanation": "CMBS lenders evaluate credit strength using DSCR = Net Operating Income / Debt Service (cushion above 1.0) and LTV = Loan Amount / Appraised Property Value (equity cushion).",
    "distractor_analysis": {
      "A": "Correct. CMBS lenders evaluate credit strength using DSCR = Net Operating Income / Debt Service (cushion above 1.0) and LTV = Loan Amount / Appraised Property Value (equity cushion).",
      "B": "Incorrect. \"Beta coefficient and Sharpe ratio\" is a fixed income valuation trap: using equity market ratios for commercial real estate debt.",
      "C": "Incorrect. \"Macaulay duration and modified convexity\" is a fixed income valuation trap: using equity market ratios for commercial real estate debt."
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
      "A": "Mandatory conversion into corporate equity shares",
      "B": "Defeasance, prepayment penalty points, and yield maintenance charges",
      "C": "Unlimited free refinancing options at any time"
    },
    "correct_option": "B",
    "explanation": "CMBS loans protect against prepayment contraction risk via borrower lockout periods, yield maintenance penalties, prepayment fees, and defeasance (replacing the mortgage with a portfolio of Treasuries).",
    "distractor_analysis": {
      "A": "Incorrect. \"Mandatory conversion into corporate equity shares\" is a fixed income valuation trap: assuming commercial mortgages allow penalty-free prepayments like conforming residential loans.",
      "B": "Correct. CMBS loans protect against prepayment contraction risk via borrower lockout periods, yield maintenance penalties, prepayment fees, and defeasance (replacing the mortgage with a portfolio of Treasuries).",
      "C": "Incorrect. \"Unlimited free refinancing options at any time\" is a fixed income valuation trap: assuming commercial mortgages allow penalty-free prepayments like conforming residential loans."
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
      "A": "Revolving, unsecured lines of consumer credit",
      "B": "Commercial real estate construction loans",
      "C": "Amortizing, fully secured retail automobile loans with scheduled monthly principal and interest payments"
    },
    "correct_option": "C",
    "explanation": "Auto loan ABS are collateralized by fully amortizing consumer installment loans secured by physical vehicles, generating predictable monthly cash flows with low extension risk.",
    "distractor_analysis": {
      "A": "Incorrect. \"Revolving, unsecured lines of consumer credit\" is a fixed income valuation trap: confusing auto loan abs with non-amortizing revolving credit card abs.",
      "B": "Incorrect. \"Commercial real estate construction loans\" is a fixed income valuation trap: confusing auto loan abs with non-amortizing revolving credit card abs.",
      "C": "Correct. Auto loan ABS are collateralized by fully amortizing consumer installment loans secured by physical vehicles, generating predictable monthly cash flows with low extension risk."
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
      "C": "No interest payments are made to investors"
    },
    "correct_option": "A",
    "explanation": "During the revolving period (typically 1 to 5 years), principal collections from cardholders are reinvested in new receivables generated on the accounts, while bondholders receive monthly coupon interest only.",
    "distractor_analysis": {
      "A": "Correct. During the revolving period (typically 1 to 5 years), principal collections from cardholders are reinvested in new receivables generated on the accounts, while bondholders receive monthly coupon interest only.",
      "B": "Incorrect. \"All bond principal is paid off immediately within 90 days\" is a fixed income valuation trap: assuming principal is distributed to bondholders during the revolving period.",
      "C": "Incorrect. \"No interest payments are made to investors\" is a fixed income valuation trap: assuming principal is distributed to bondholders during the revolving period."
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
      "A": "The monthly interest rate earned on escrow reserves",
      "B": "The percentage of outstanding mortgage balance that is prepaid in a specific month in excess of scheduled principal amortization",
      "C": "The percentage of borrowers who default during the calendar year"
    },
    "correct_option": "B",
    "explanation": "SMM measures non-scheduled early principal prepayments during a single month as a percentage of available beginning mortgage balance after scheduled amortization. CPR annualizes SMM.",
    "distractor_analysis": {
      "A": "Incorrect. \"The monthly interest rate earned on escrow reserves\" is a fixed income valuation trap: confusing smm with default rates.",
      "B": "Correct. SMM measures non-scheduled early principal prepayments during a single month as a percentage of available beginning mortgage balance after scheduled amortization. CPR annualizes SMM.",
      "C": "Incorrect. \"The percentage of borrowers who default during the calendar year\" is a fixed income valuation trap: confusing smm with default rates."
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
      "A": "Transferring default liability to the tenant leasing the property",
      "B": "The lender forgiving 50% of the loan principal balance",
      "C": "The borrower replacing the mortgaged property with a portfolio of government securities that replicate the remaining debt service cash flows"
    },
    "correct_option": "C",
    "explanation": "Defeasance allows the borrower to release the commercial property from the mortgage lien by pledging a dedicated basket of US Treasuries matching remaining principal and interest payments.",
    "distractor_analysis": {
      "A": "Incorrect. \"Transferring default liability to the tenant leasing the property\" is a fixed income valuation trap: thinking defeasance represents loan default or debt forgiveness.",
      "B": "Incorrect. \"The lender forgiving 50% of the loan principal balance\" is a fixed income valuation trap: thinking defeasance represents loan default or debt forgiveness.",
      "C": "Correct. Defeasance allows the borrower to release the commercial property from the mortgage lien by pledging a dedicated basket of US Treasuries matching remaining principal and interest payments."
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
      "B": "Modified Duration = Macaulay Duration / YTM^2",
      "C": "Modified Duration = Macaulay Duration * (1 + YTM)"
    },
    "correct_option": "A",
    "explanation": "Modified Duration = MacDur / (1 + y). It measures the approximate percentage change in bond price for a 100-basis-point (1%) shift in yield to maturity: % Delta P approx -ModDur * Delta y.",
    "distractor_analysis": {
      "A": "Correct. Modified Duration = MacDur / (1 + y). It measures the approximate percentage change in bond price for a 100-basis-point (1%) shift in yield to maturity: % Delta P approx -ModDur * Delta y.",
      "B": "Incorrect. \"Modified Duration = Macaulay Duration / YTM^2\" is a fixed income valuation trap: multiplying macaulay duration by (1 + y) instead of dividing.",
      "C": "Incorrect. \"Modified Duration = Macaulay Duration * (1 + YTM)\" is a fixed income valuation trap: multiplying macaulay duration by (1 + y) instead of dividing."
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
      "A": "+7.50%",
      "B": "+7.90%",
      "C": "+7.10%"
    },
    "correct_option": "B",
    "explanation": "% Delta P approx -ModDur * Delta y + 0.5 * Convexity * (Delta y)^2 = -7.5 * (-0.01) + 0.5 * 80 * (-0.01)^2 = +0.075 + 0.5 * 80 * 0.0001 = +0.075 + 0.0040 = +0.0790 = +7.90%.",
    "distractor_analysis": {
      "A": "Incorrect. \"+7.50%\" is a fixed income valuation trap: omitting the positive convexity adjustment (+7.50%).",
      "B": "Correct. % Delta P approx -ModDur * Delta y + 0.5 * Convexity * (Delta y)^2 = -7.5 * (-0.01) + 0.5 * 80 * (-0.01)^2 = +0.075 + 0.5 * 80 * 0.0001 = +0.075 + 0.0040 = +0.0790 = +7.90%.",
      "C": "Incorrect. \"+7.10%\" is a fixed income valuation trap: omitting the positive convexity adjustment (+7.50%)."
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
      "A": "It requires zero knowledge of benchmark interest rates",
      "B": "It is strictly equal to the bond's stated maturity in years",
      "C": "It accounts for changes in future cash flows caused by the exercise of embedded options as yields change"
    },
    "correct_option": "C",
    "explanation": "Modified duration assumes future cash flows are fixed and static. For callable or mortgage bonds where cash flows vary when rates change, Effective Duration = (P_minus - P_plus) / (2 * P0 * Delta y) must be used.",
    "distractor_analysis": {
      "A": "Incorrect. \"It requires zero knowledge of benchmark interest rates\" is a fixed income valuation trap: assuming modified duration can accurately price bonds with option-dependent cash flows.",
      "B": "Incorrect. \"It is strictly equal to the bond's stated maturity in years\" is a fixed income valuation trap: assuming modified duration can accurately price bonds with option-dependent cash flows.",
      "C": "Correct. Modified duration assumes future cash flows are fixed and static. For callable or mortgage bonds where cash flows vary when rates change, Effective Duration = (P_minus - P_plus) / (2 * P0 * Delta y) must be used."
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
      "C": "The spread over the interbank swap rate curve"
    },
    "correct_option": "A",
    "explanation": "The Z-spread is the constant basis point spread that must be added to every zero-coupon Treasury spot rate across all maturity tenors to discount bond cash flows to current market price.",
    "distractor_analysis": {
      "A": "Correct. The Z-spread is the constant basis point spread that must be added to every zero-coupon Treasury spot rate across all maturity tenors to discount bond cash flows to current market price.",
      "B": "Incorrect. \"The difference between the bond's YTM and the yield of a benchmark government bond (G-spread)\" is a fixed income valuation trap: confusing z-spread (spread over spot curve) with g-spread (spread over single ytm).",
      "C": "Incorrect. \"The spread over the interbank swap rate curve\" is a fixed income valuation trap: confusing z-spread (spread over spot curve) with g-spread (spread over single ytm)."
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
      "A": "OAS and Z-spread are always identical",
      "B": "OAS is lower than Z-spread because it removes the value of the embedded call option granted to the issuer",
      "C": "OAS is strictly higher than Z-spread"
    },
    "correct_option": "B",
    "explanation": "Z-spread includes compensation for the embedded call option (cost of option > 0): Z-spread = OAS + Option Cost -> OAS = Z-spread - Option Cost. Thus OAS < Z-spread for a callable bond.",
    "distractor_analysis": {
      "A": "Incorrect. \"OAS and Z-spread are always identical\" is a fixed income valuation trap: assuming oas is higher than z-spread for a callable bond.",
      "B": "Correct. Z-spread includes compensation for the embedded call option (cost of option > 0): Z-spread = OAS + Option Cost -> OAS = Z-spread - Option Cost. Thus OAS < Z-spread for a callable bond.",
      "C": "Incorrect. \"OAS is strictly higher than Z-spread\" is a fixed income valuation trap: assuming oas is higher than z-spread for a callable bond."
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
      "A": "A mortgage-backed security exhibiting severe contraction risk",
      "B": "A callable bond when interest rates decline significantly below the call strike",
      "C": "An option-free fixed-rate bond"
    },
    "correct_option": "C",
    "explanation": "Option-free bonds always exhibit positive convexity (price-yield curve is convex to origin: price gains from yield drops exceed price losses from yield rises). Callable bonds exhibit negative convexity at low yields.",
    "distractor_analysis": {
      "A": "Incorrect. \"A mortgage-backed security exhibiting severe contraction risk\" is a fixed income valuation trap: believing callable bonds maintain positive convexity at low interest rates.",
      "B": "Incorrect. \"A callable bond when interest rates decline significantly below the call strike\" is a fixed income valuation trap: believing callable bonds maintain positive convexity at low interest rates.",
      "C": "Correct. Option-free bonds always exhibit positive convexity (price-yield curve is convex to origin: price gains from yield drops exceed price losses from yield rises). Callable bonds exhibit negative convexity at low yields."
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
      "B": "The total cash coupons received over the life of the bond",
      "C": "The percentage change in bond price per dollar change in coupons"
    },
    "correct_option": "A",
    "explanation": "Money Duration = ModDur * Full Price. It expresses interest rate risk in monetary dollar terms rather than percentage terms (DV01 / PVBP = Money Duration * 0.0001).",
    "distractor_analysis": {
      "A": "Correct. Money Duration = ModDur * Full Price. It expresses interest rate risk in monetary dollar terms rather than percentage terms (DV01 / PVBP = Money Duration * 0.0001).",
      "B": "Incorrect. \"The total cash coupons received over the life of the bond\" is a fixed income valuation trap: confusing money duration with percentage duration.",
      "C": "Incorrect. \"The percentage change in bond price per dollar change in coupons\" is a fixed income valuation trap: confusing money duration with percentage duration."
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
      "A": "The coupon payment received every 100 days",
      "B": "The absolute change in bond price resulting from a 1-basis-point (0.01%) change in yield",
      "C": "The spread between 10-year and 2-year Treasury yields"
    },
    "correct_option": "B",
    "explanation": "PVBP (DV01) = (P_minus - P_plus) / 2 for a 1 bp yield move. It quantifies the dollar price impact of a 0.01% yield shift.",
    "distractor_analysis": {
      "A": "Incorrect. \"The coupon payment received every 100 days\" is a fixed income valuation trap: confusing pvbp with a 100 basis point yield move.",
      "B": "Correct. PVBP (DV01) = (P_minus - P_plus) / 2 for a 1 bp yield move. It quantifies the dollar price impact of a 0.01% yield shift.",
      "C": "Incorrect. \"The spread between 10-year and 2-year Treasury yields\" is a fixed income valuation trap: confusing pvbp with a 100 basis point yield move."
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
      "A": "A parallel shift across the entire term structure of interest rates",
      "B": "Changes in the central bank discount rate exclusively",
      "C": "A change in benchmark yield at a specific maturity point on the yield curve, holding all other key rates constant"
    },
    "correct_option": "C",
    "explanation": "Key rate duration measures shaping risk (sensitivity to non-parallel yield curve shifts like steepening, flattening, or twists) by shifting a single maturity knot point while holding others fixed.",
    "distractor_analysis": {
      "A": "Incorrect. \"A parallel shift across the entire term structure of interest rates\" is a fixed income valuation trap: confusing key rate duration with effective duration (which assumes parallel shifts).",
      "B": "Incorrect. \"Changes in the central bank discount rate exclusively\" is a fixed income valuation trap: confusing key rate duration with effective duration (which assumes parallel shifts).",
      "C": "Correct. Key rate duration measures shaping risk (sensitivity to non-parallel yield curve shifts like steepening, flattening, or twists) by shifting a single maturity knot point while holding others fixed."
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
      "C": "7.4 years"
    },
    "correct_option": "A",
    "explanation": "Because a zero-coupon bond delivers 100% of its cash flow on its single maturity date, its weighted average cash flow time (Macaulay duration) is strictly equal to its time to maturity (8.0 years).",
    "distractor_analysis": {
      "A": "Correct. Because a zero-coupon bond delivers 100% of its cash flow on its single maturity date, its weighted average cash flow time (Macaulay duration) is strictly equal to its time to maturity (8.0 years).",
      "B": "Incorrect. \"4.0 years\" is a fixed income valuation trap: thinking zero-coupon bonds have zero duration.",
      "C": "Incorrect. \"7.4 years\" is a fixed income valuation trap: thinking zero-coupon bonds have zero duration."
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
      "A": "The London Interbank Offered Rate (LIBOR)",
      "B": "The yield of an actual or interpolated benchmark government bond with matching maturity",
      "C": "The interbank swap rate of identical duration"
    },
    "correct_option": "B",
    "explanation": "G-spread is the yield difference between a corporate bond and an interpolated government bond of equivalent maturity on the benchmark sovereign yield curve.",
    "distractor_analysis": {
      "A": "Incorrect. \"The London Interbank Offered Rate (LIBOR)\" is a fixed income valuation trap: confusing g-spread with i-spread (which uses the swap rate curve).",
      "B": "Correct. G-spread is the yield difference between a corporate bond and an interpolated government bond of equivalent maturity on the benchmark sovereign yield curve.",
      "C": "Incorrect. \"The interbank swap rate of identical duration\" is a fixed income valuation trap: confusing g-spread with i-spread (which uses the swap rate curve)."
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
      "A": "Loss Given Default / Recovery Rate",
      "B": "Probability of Default (PD) x Recovery Rate (RR)",
      "C": "Probability of Default (PD) x Loss Given Default (LGD)"
    },
    "correct_option": "C",
    "explanation": "Expected Loss = PD x LGD = PD x (1 - Recovery Rate). If a bond has a 2% default probability and 60% recovery rate (40% LGD), Expected Loss = 2% x 40% = 0.80%.",
    "distractor_analysis": {
      "A": "Incorrect. \"Loss Given Default / Recovery Rate\" is a fixed income valuation trap: using recovery rate in place of loss given default (1 - rr).",
      "B": "Incorrect. \"Probability of Default (PD) x Recovery Rate (RR)\" is a fixed income valuation trap: using recovery rate in place of loss given default (1 - rr).",
      "C": "Correct. Expected Loss = PD x LGD = PD x (1 - Recovery Rate). If a bond has a 2% default probability and 60% recovery rate (40% LGD), Expected Loss = 2% x 40% = 0.80%."
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
      "B": "The quality and value of pledged collateral assets",
      "C": "The physical manufacturing floor space of the borrower"
    },
    "correct_option": "A",
    "explanation": "The 4 Cs are: Capacity (cash flow generation ability), Collateral (asset quality/pledges), Covenants (contractual restrictions), and Character (management integrity).",
    "distractor_analysis": {
      "A": "Correct. The 4 Cs are: Capacity (cash flow generation ability), Collateral (asset quality/pledges), Covenants (contractual restrictions), and Character (management integrity).",
      "B": "Incorrect. \"The quality and value of pledged collateral assets\" is a fixed income valuation trap: confusing capacity (cash flow) with collateral or character.",
      "C": "Incorrect. \"The physical manufacturing floor space of the borrower\" is a fixed income valuation trap: confusing capacity (cash flow) with collateral or character."
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
      "A": "A3 / A- and above are investment grade",
      "B": "Baa3 (Moody's) / BBB- (S&P/Fitch) and above are investment grade; Ba1 / BB+ and below are high yield",
      "C": "Caa1 / CCC+ and above are investment grade"
    },
    "correct_option": "B",
    "explanation": "Investment grade spans Aaa/AAA down to Baa3/BBB-. High-yield (speculative / junk) starts immediately below at Ba1/BB+ down to C/D.",
    "distractor_analysis": {
      "A": "Incorrect. \"A3 / A- and above are investment grade\" is a fixed income valuation trap: setting the investment grade cutoff at a- or bbb+.",
      "B": "Correct. Investment grade spans Aaa/AAA down to Baa3/BBB-. High-yield (speculative / junk) starts immediately below at Ba1/BB+ down to C/D.",
      "C": "Incorrect. \"Caa1 / CCC+ and above are investment grade\" is a fixed income valuation trap: setting the investment grade cutoff at a- or bbb+."
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
      "A": "The borrower physically relocates corporate headquarters to a foreign nation",
      "B": "Bond coupons are paid in a depreciated foreign currency",
      "C": "An issuer's credit rating is downgraded, widening its yield spread and causing a drop in bond price"
    },
    "correct_option": "C",
    "explanation": "Credit migration risk is the risk that an issuer's creditworthiness deteriorates, leading credit rating agencies to downgrade the debt, which widens credit spreads and reduces market value prior to default.",
    "distractor_analysis": {
      "A": "Incorrect. \"The borrower physically relocates corporate headquarters to a foreign nation\" is a fixed income valuation trap: thinking credit migration refers to corporate geographic relocation.",
      "B": "Incorrect. \"Bond coupons are paid in a depreciated foreign currency\" is a fixed income valuation trap: thinking credit migration refers to corporate geographic relocation.",
      "C": "Correct. Credit migration risk is the risk that an issuer's creditworthiness deteriorates, leading credit rating agencies to downgrade the debt, which widens credit spreads and reduces market value prior to default."
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
      "C": "Senior unsecured debt > Senior secured debt > Subordinated debt > Common stock"
    },
    "correct_option": "A",
    "explanation": "Under the absolute priority rule: secured creditors (backed by specific collateral) are satisfied first, followed by senior unsecured debentures, subordinated debt, preferred equity, and lastly common stockholders.",
    "distractor_analysis": {
      "A": "Correct. Under the absolute priority rule: secured creditors (backed by specific collateral) are satisfied first, followed by senior unsecured debentures, subordinated debt, preferred equity, and lastly common stockholders.",
      "B": "Incorrect. \"Common equity > Preferred stock > Senior unsecured debt > Senior secured debt\" is a fixed income valuation trap: placing equity or unsecured debt ahead of secured debt.",
      "C": "Incorrect. \"Senior unsecured debt > Senior secured debt > Subordinated debt > Common stock\" is a fixed income valuation trap: placing equity or unsecured debt ahead of secured debt."
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
      "A": "It determines the appropriate dividend payout ratio for common shares",
      "B": "It measures financial leverage and indicates the number of years of current operating cash earnings required to repay total debt",
      "C": "It measures immediate cash liquidity available within 24 hours"
    },
    "correct_option": "B",
    "explanation": "Debt/EBITDA is a primary leverage metric used by rating agencies and credit analysts to measure the scale of corporate debt relative to standardized operating cash generation.",
    "distractor_analysis": {
      "A": "Incorrect. \"It determines the appropriate dividend payout ratio for common shares\" is a fixed income valuation trap: confusing debt/ebitda with liquidity or equity dividend ratios.",
      "B": "Correct. Debt/EBITDA is a primary leverage metric used by rating agencies and credit analysts to measure the scale of corporate debt relative to standardized operating cash generation.",
      "C": "Incorrect. \"It measures immediate cash liquidity available within 24 hours\" is a fixed income valuation trap: confusing debt/ebitda with liquidity or equity dividend ratios."
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
      "A": "Stock option black-scholes volatility models",
      "B": "Macroeconomic sovereign foreign exchange policy exclusively",
      "C": "Liquidity, short-term debt maturity profile, and collateral liquidation recovery value than investment-grade analysis"
    },
    "correct_option": "C",
    "explanation": "Because high-yield issuers face higher immediate default risk, analysis emphasizes near-term liquidity, debt rollover runways, covenant restrictions, and worst-case asset recovery liquidation values.",
    "distractor_analysis": {
      "A": "Incorrect. \"Stock option black-scholes volatility models\" is a fixed income valuation trap: analyzing high-yield debt like stable investment-grade utilities.",
      "B": "Incorrect. \"Macroeconomic sovereign foreign exchange policy exclusively\" is a fixed income valuation trap: analyzing high-yield debt like stable investment-grade utilities.",
      "C": "Correct. Because high-yield issuers face higher immediate default risk, analysis emphasizes near-term liquidity, debt rollover runways, covenant restrictions, and worst-case asset recovery liquidation values."
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
      "B": "Remain completely static across all economic cycles",
      "C": "Narrow during recessions and widen during booms"
    },
    "correct_option": "A",
    "explanation": "During recessions, default probabilities rise and market liquidity drops, causing investors to demand higher risk premiums, widening credit spreads. During expansions, default risk falls, narrowing spreads.",
    "distractor_analysis": {
      "A": "Correct. During recessions, default probabilities rise and market liquidity drops, causing investors to demand higher risk premiums, widening credit spreads. During expansions, default risk falls, narrowing spreads.",
      "B": "Incorrect. \"Remain completely static across all economic cycles\" is a fixed income valuation trap: assuming credit spreads narrow during recessions.",
      "C": "Incorrect. \"Narrow during recessions and widen during booms\" is a fixed income valuation trap: assuming credit spreads narrow during recessions."
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
      "A": "Bond covenants explicitly state that all debt is equal in priority",
      "B": "A holding company issues debt while its operating subsidiaries incur their own debt, leaving holding company creditors junior to subsidiary creditors",
      "C": "The board of directors converts common equity into preferred equity"
    },
    "correct_option": "B",
    "explanation": "Structural subordination arises from corporate organization: subsidiary creditors have direct legal claims on subsidiary cash flows and assets, leaving holding company creditors with claims only on residual equity.",
    "distractor_analysis": {
      "A": "Incorrect. \"Bond covenants explicitly state that all debt is equal in priority\" is a fixed income valuation trap: confusing structural subordination with contractual subordination.",
      "B": "Correct. Structural subordination arises from corporate organization: subsidiary creditors have direct legal claims on subsidiary cash flows and assets, leaving holding company creditors with claims only on residual equity.",
      "C": "Incorrect. \"The board of directors converts common equity into preferred equity\" is a fixed income valuation trap: confusing structural subordination with contractual subordination."
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
      "A": "The issuer has entered formal bankruptcy default proceedings immediately",
      "B": "The bond coupon rate will automatically decrease by 50 basis points",
      "C": "There is a heightened probability that the issuer's credit rating will be downgraded over the next 12 to 24 months"
    },
    "correct_option": "C",
    "explanation": "A credit rating outlook assesses potential medium-term direction (typically 1-2 years): a Negative outlook signals that credit trends are deteriorating and a downgrade is likely if unaddressed.",
    "distractor_analysis": {
      "A": "Incorrect. \"The issuer has entered formal bankruptcy default proceedings immediately\" is a fixed income valuation trap: confusing a negative rating outlook with an immediate credit default.",
      "B": "Incorrect. \"The bond coupon rate will automatically decrease by 50 basis points\" is a fixed income valuation trap: confusing a negative rating outlook with an immediate credit default.",
      "C": "Correct. A credit rating outlook assesses potential medium-term direction (typically 1-2 years): a Negative outlook signals that credit trends are deteriorating and a downgrade is likely if unaddressed."
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
      "C": "Rating agencies mandate identical trading prices across same-rated bonds"
    },
    "correct_option": "A",
    "explanation": "Ratings capture only default risk and loss severity. Market credit spreads also price liquidity differences, issue float size, covenant protections, call features, and industry-specific market dynamics.",
    "distractor_analysis": {
      "A": "Correct. Ratings capture only default risk and loss severity. Market credit spreads also price liquidity differences, issue float size, covenant protections, call features, and industry-specific market dynamics.",
      "B": "Incorrect. \"Credit ratings legally fix trading yields across all broker-dealers\" is a fixed income valuation trap: assuming credit ratings capture all market pricing factors including liquidity.",
      "C": "Incorrect. \"Rating agencies mandate identical trading prices across same-rated bonds\" is a fixed income valuation trap: assuming credit ratings capture all market pricing factors including liquidity."
    },
    "misconception": "Assuming credit ratings capture all market pricing factors including liquidity.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Fixed-Income Valuation",
    "difficulty_tier": 2,
    "question_text": "A 5-year, 6.0% annual-pay coupon bond with a par value of $1,000 is currently trading in the market to yield 7.2% per annum. Using a standard financial calculator, the bond's full price per $1,000 of par value is closest to:",
    "options": {
      "A": "$1,051.40",
      "B": "$951.04",
      "C": "$978.20"
    },
    "correct_option": "B",
    "explanation": "To calculate bond price: PV = sum of discounted coupon cash flows + discounted par value. PV = 60 / (1.072)^1 + 60 / (1.072)^2 + ... + 1060 / (1.072)^5 = $951.04. Texas Instruments BA II Plus keystrokes: [2nd][CLR TVM] -> 5 [N] -> 7.2 [I/Y] -> 60 [PMT] -> 1000 [FV] -> [CPT][PV] => -951.04.",
    "distractor_analysis": {
      "A": "Incorrect. Inverted the coupon and yield relationship: when yield (7.2%) exceeds coupon (6.0%), the bond MUST trade at a discount (< $1,000), not a premium.",
      "B": "Correct. To calculate bond price: PV = sum of discounted coupon cash flows + discounted par value. PV = 60 / (1.072)^1 + 60 / (1.072)^2 + ... + 1060 / (1.072)^5 = $951.04. Texas Instruments BA II Plus keystrokes: [2nd][CLR TVM] -> 5 [N] -> 7.2 [I/Y] -> 60 [PMT] -> 1000 [FV] -> [CPT][PV] => -951.04.",
      "C": "Incorrect. Used 4 periods instead of 5, or solved with a simple linear discount."
    },
    "misconception": "Failing to recognize that when YTM > Coupon, the bond must trade at a discount (< 1000), or misconfiguring N in the BA II Plus TVM register.",
    "time_estimate_seconds": 60
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Understanding Fixed-Income Risk and Return",
    "difficulty_tier": 3,
    "question_text": "A portfolio manager holds a 10-year, 6.0% annual coupon corporate bond currently priced at 98.50 with an annual yield-to-maturity of 6.20%. If benchmark yields instantaneously shift upward by 40 basis points, the bond price falls to 95.60; if yields shift downward by 40 basis points, the bond price rises to 101.55. What is the effective duration of the bond?",
    "options": {
      "A": "6.04",
      "B": "7.44",
      "C": "7.55"
    },
    "correct_option": "C",
    "explanation": "Effective Duration formula:\n$$\\text{EffDur} = \\frac{PV_- - PV_+}{2 \\times \\Delta \\text{Curve} \\times PV_0}$$\nGiven: $PV_0 = 98.50$, $PV_- = 101.55$, $PV_+ = 95.60$, and $\\Delta \\text{Curve} = 40 \\text{ bps} = 0.0040$.\n$$\\text{EffDur} = \\frac{101.55 - 95.60}{2 \\times 0.0040 \\times 98.50} = \\frac{5.95}{0.0080 \\times 98.50} = \\frac{5.95}{0.7880} \\approx 7.5508 \\approx 7.55$$.",
    "distractor_analysis": {
      "A": "Incorrect. Confused effective duration with the bond's annual coupon rate or Macaulay duration of a perpetuity.",
      "B": "Incorrect. Omitted the factor of 2 in the denominator, or used the coupon rate instead of the initial bond price in the base.",
      "C": "Correct. Effective Duration formula:\n$$\\text{EffDur} = \\frac{PV_- - PV_+}{2 \\times \\Delta \\text{Curve} \\times PV_0}$$\nGiven: $PV_0 = 98.50$, $PV_- = 101.55$, $PV_+ = 95.60$, and $\\Delta \\text{Curve} = 40 \\text{ bps} = 0.0040$.\n$$\\text{EffDur} = \\frac{101.55 - 95.60}{2 \\times 0.0040 \\times 98.50} = \\frac{5.95}{0.0080 \\times 98.50} = \\frac{5.95}{0.7880} \\approx 7.5508 \\approx 7.55$$."
    },
    "misconception": "Forgetting the factor of 2 in the denominator ($2 \\times \\Delta y \\times PV_0$) when computing effective duration from price shifts.",
    "time_estimate_seconds": 75
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Fixed Income",
    "skill_domain": "Understanding Fixed-Income Risk and Return",
    "difficulty_tier": 3,
    "question_text": "A bond has an annual modified duration of 8.20 and an annual convexity of 84.0. If the bond's yield-to-maturity decreases by 150 basis points ($-0.0150$), what is the estimated total percentage price change of the bond using both duration and convexity?",
    "options": {
      "A": "+13.25%",
      "B": "+12.30%",
      "C": "+11.36%"
    },
    "correct_option": "A",
    "explanation": "The percentage price change estimating formula using duration and convexity is:\n$$\\frac{\\Delta P}{P} \\approx -\\text{ModDur} \\times \\Delta y + \\frac{1}{2} \\times \\text{Convexity} \\times (\\Delta y)^2$$\nDuration effect: $-8.20 \\times (-0.0150) = +0.1230 = +12.30\\%$.\nConvexity effect: $\\frac{1}{2} \\times 84.0 \\times (-0.0150)^2 = 42.0 \\times 0.000225 = +0.00945 = +0.945\\%$.\nTotal percentage change: $+12.30\\% + 0.945\\% = +13.245\\% \\approx +13.25\\%$.",
    "distractor_analysis": {
      "A": "Correct. The percentage price change estimating formula using duration and convexity is:\n$$\\frac{\\Delta P}{P} \\approx -\\text{ModDur} \\times \\Delta y + \\frac{1}{2} \\times \\text{Convexity} \\times (\\Delta y)^2$$\nDuration effect: $-8.20 \\times (-0.0150) = +0.1230 = +12.30\\%$.\nConvexity effect: $\\frac{1}{2} \\times 84.0 \\times (-0.0150)^2 = 42.0 \\times 0.000225 = +0.00945 = +0.945\\%$.\nTotal percentage change: $+12.30\\% + 0.945\\% = +13.245\\% \\approx +13.25\\%$.",
      "B": "Incorrect. Calculated only the first-order duration effect (+12.30%), completely omitting the positive convexity adjustment.",
      "C": "Incorrect. Subtracted the convexity adjustment instead of adding it (convexity always increases price change regardless of yield direction)."
    },
    "misconception": "Subtracting convexity rather than adding it, or ignoring the 1/2 factor in the Taylor series convexity approximation.",
    "time_estimate_seconds": 80
  }
];
