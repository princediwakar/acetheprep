// Path: lib/data/banks/cfa/quant.ts
import type { SeedQuestion } from "../../question-bank-seed";

export const CFA_QUANT_QUESTIONS: SeedQuestion[] = [
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Time Value of Money",
    "difficulty_tier": 2,
    "question_text": "An investor deposits $10,000 into an account paying a nominal interest rate of 6% compounded monthly. What is the effective annual rate (EAR)?",
    "options": {
      "A": "6.17%",
      "B": "6.00%",
      "C": "6.14%",
      "D": "6.25%"
    },
    "correct_option": "A",
    "explanation": "EAR = (1 + r/m)^m - 1 = (1 + 0.06/12)^12 - 1 = (1.005)^12 - 1 = 1.061678 - 1 = 6.168% approx 6.17%.",
    "distractor_analysis": {
      "A": "Correct. EAR = (1 + r/m)^m - 1 = (1 + 0.06/12)^12 - 1 = (1.005)^12 - 1 = 1.061678 - 1 = 6",
      "B": "Incorrect. Common distractor based on: Using nominal rate 6% directly without compounding adjustmen",
      "C": "Incorrect. Common distractor based on: Using nominal rate 6% directly without compounding adjustmen",
      "D": "Incorrect. Common distractor based on: Using nominal rate 6% directly without compounding adjustmen"
    },
    "misconception": "Using nominal rate 6% directly without compounding adjustments.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Time Value of Money",
    "difficulty_tier": 2,
    "question_text": "What is the present value of a perpetuity paying $500 annually at the end of each year, discounted at an interest rate of 8%?",
    "options": {
      "A": "$6,250",
      "B": "$4,000",
      "C": "$5,000",
      "D": "$7,500"
    },
    "correct_option": "A",
    "explanation": "Present value of a perpetual ordinary annuity PV = PMT / r = 500 / 0.08 = $6,250.",
    "distractor_analysis": {
      "A": "Correct. Present value of a perpetual ordinary annuity PV = PMT / r = 500 / 0.08 = $6,250",
      "B": "Incorrect. Common distractor based on: Multiplying payment by interest rate (500 * 0.08 = 40) or di",
      "C": "Incorrect. Common distractor based on: Multiplying payment by interest rate (500 * 0.08 = 40) or di",
      "D": "Incorrect. Common distractor based on: Multiplying payment by interest rate (500 * 0.08 = 40) or di"
    },
    "misconception": "Multiplying payment by interest rate (500 * 0.08 = 40) or dividing incorrectly.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Time Value of Money",
    "difficulty_tier": 2,
    "question_text": "How does the present value of an annuity due compare to that of an ordinary annuity with identical payments, discount rate, and maturity?",
    "options": {
      "A": "PV of annuity due is higher by a factor of (1 + r)",
      "B": "PV of annuity due is lower by a factor of (1 + r)",
      "C": "Both present values are strictly equal",
      "D": "PV of annuity due is higher by PMT * r"
    },
    "correct_option": "A",
    "explanation": "In an annuity due, each payment occurs at the beginning of the period rather than at the end. Because each cash flow is received one period earlier, PV_due = PV_ordinary * (1 + r).",
    "distractor_analysis": {
      "A": "Correct. In an annuity due, each payment occurs at the beginning of the period rather tha",
      "B": "Incorrect. Common distractor based on: Assuming cash flows at the start of period have lower presen",
      "C": "Incorrect. Common distractor based on: Assuming cash flows at the start of period have lower presen",
      "D": "Incorrect. Common distractor based on: Assuming cash flows at the start of period have lower presen"
    },
    "misconception": "Assuming cash flows at the start of period have lower present value.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Time Value of Money",
    "difficulty_tier": 2,
    "question_text": "If an investment promises to double in value over 8 years, what is its approximate annual compound rate of return using the Rule of 72?",
    "options": {
      "A": "9.0%",
      "B": "8.0%",
      "C": "7.2%",
      "D": "12.0%"
    },
    "correct_option": "A",
    "explanation": "By the Rule of 72: approximate growth rate r approx 72 / t = 72 / 8 = 9.0% per annum.",
    "distractor_analysis": {
      "A": "Correct. By the Rule of 72: approximate growth rate r approx 72 / t = 72 / 8 = 9.0% per a",
      "B": "Incorrect. Common distractor based on: Dividing 72 by 9 instead of 8, or calculating 8% directly.",
      "C": "Incorrect. Common distractor based on: Dividing 72 by 9 instead of 8, or calculating 8% directly.",
      "D": "Incorrect. Common distractor based on: Dividing 72 by 9 instead of 8, or calculating 8% directly."
    },
    "misconception": "Dividing 72 by 9 instead of 8, or calculating 8% directly.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Time Value of Money",
    "difficulty_tier": 2,
    "question_text": "What is the continuously compounded annual rate of return equivalent to an effective annual rate (EAR) of 8.33%?",
    "options": {
      "A": "8.00%",
      "B": "8.33%",
      "C": "8.69%",
      "D": "7.92%"
    },
    "correct_option": "A",
    "explanation": "The continuously compounded rate r_cc = ln(1 + EAR) = ln(1 + 0.0833) = ln(1.0833) approx 0.0800 = 8.00%.",
    "distractor_analysis": {
      "A": "Correct. The continuously compounded rate r_cc = ln(1 + EAR) = ln(1 + 0.0833) = ln(1.0833",
      "B": "Incorrect. Common distractor based on: Assuming continuous rate is greater than EAR.",
      "C": "Incorrect. Common distractor based on: Assuming continuous rate is greater than EAR.",
      "D": "Incorrect. Common distractor based on: Assuming continuous rate is greater than EAR."
    },
    "misconception": "Assuming continuous rate is greater than EAR.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Time Value of Money",
    "difficulty_tier": 2,
    "question_text": "An investor requires $50,000 in 5 years. If the risk-free discount rate is 5% compounded annually, how much must be deposited today?",
    "options": {
      "A": "$39,176",
      "B": "$41,250",
      "C": "$35,000",
      "D": "$45,000"
    },
    "correct_option": "A",
    "explanation": "PV = FV / (1 + r)^n = 50,000 / (1.05)^5 = 50,000 / 1.27628 = $39,176.31.",
    "distractor_analysis": {
      "A": "Correct. PV = FV / (1 + r)^n = 50,000 / (1.05)^5 = 50,000 / 1.27628 = $39,176.31.",
      "B": "Incorrect. Common distractor based on: Using simple interest subtraction (50,000 * 0.25 = 12,500; 5",
      "C": "Incorrect. Common distractor based on: Using simple interest subtraction (50,000 * 0.25 = 12,500; 5",
      "D": "Incorrect. Common distractor based on: Using simple interest subtraction (50,000 * 0.25 = 12,500; 5"
    },
    "misconception": "Using simple interest subtraction (50,000 * 0.25 = 12,500; 50,000 - 12,500 = 37,500).",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Time Value of Money",
    "difficulty_tier": 2,
    "question_text": "What is the future value at t = 3 of an ordinary annuity paying $1,000 at the end of each year for 3 years at 10% annual interest?",
    "options": {
      "A": "$3,310",
      "B": "$3,000",
      "C": "$3,641",
      "D": "$3,100"
    },
    "correct_option": "A",
    "explanation": "FV = PMT * [((1 + r)^n - 1) / r] = 1,000 * [((1.10)^3 - 1) / 0.10] = 1,000 * [(1.331 - 1) / 0.10] = 1,000 * 3.31 = $3,310.",
    "distractor_analysis": {
      "A": "Correct. FV = PMT * [((1 + r)^n - 1) / r] = 1,000 * [((1.10)^3 - 1) / 0.10] = 1,000 * [(1",
      "B": "Incorrect. Common distractor based on: Summing cash flows without compounding ($3,000).",
      "C": "Incorrect. Common distractor based on: Summing cash flows without compounding ($3,000).",
      "D": "Incorrect. Common distractor based on: Summing cash flows without compounding ($3,000)."
    },
    "misconception": "Summing cash flows without compounding ($3,000).",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Time Value of Money",
    "difficulty_tier": 2,
    "question_text": "If nominal risk-free rate is 5% and expected inflation is 2%, what is the approximate real risk-free rate using the Fisher relation?",
    "options": {
      "A": "3.0%",
      "B": "7.0%",
      "C": "2.5%",
      "D": "10.0%"
    },
    "correct_option": "A",
    "explanation": "Nominal rate approx real rate + expected inflation. Real risk-free rate approx nominal rate - expected inflation = 5% - 2% = 3.0%. Exact: (1.05 / 1.02) - 1 = 2.94%.",
    "distractor_analysis": {
      "A": "Correct. Nominal rate approx real rate + expected inflation. Real risk-free rate approx n",
      "B": "Incorrect. Common distractor based on: Adding inflation to nominal rate (7%) instead of subtracting",
      "C": "Incorrect. Common distractor based on: Adding inflation to nominal rate (7%) instead of subtracting",
      "D": "Incorrect. Common distractor based on: Adding inflation to nominal rate (7%) instead of subtracting"
    },
    "misconception": "Adding inflation to nominal rate (7%) instead of subtracting.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Time Value of Money",
    "difficulty_tier": 2,
    "question_text": "A project generates cash flows of -$1,000 at t=0, +$600 at t=1, and +$600 at t=2. At a 10% discount rate, what is the Net Present Value (NPV)?",
    "options": {
      "A": "+$41.32",
      "B": "+$200.00",
      "C": "-$41.32",
      "D": "+$100.00"
    },
    "correct_option": "A",
    "explanation": "NPV = -1,000 + 600 / 1.10 + 600 / (1.10)^2 = -1,000 + 545.45 + 495.87 = -1,000 + 1,041.32 = +$41.32.",
    "distractor_analysis": {
      "A": "Correct. NPV = -1,000 + 600 / 1.10 + 600 / (1.10)^2 = -1,000 + 545.45 + 495.87 = -1,000 +",
      "B": "Incorrect. Common distractor based on: Summing nominal undiscounted cash flows ($200.00).",
      "C": "Incorrect. Common distractor based on: Summing nominal undiscounted cash flows ($200.00).",
      "D": "Incorrect. Common distractor based on: Summing nominal undiscounted cash flows ($200.00)."
    },
    "misconception": "Summing nominal undiscounted cash flows ($200.00).",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Time Value of Money",
    "difficulty_tier": 2,
    "question_text": "The internal rate of return (IRR) of an investment project is the discount rate that:",
    "options": {
      "A": "Equates the present value of future cash inflows to initial investment cost (NPV = 0)",
      "B": "Maximizes the net future value of the project",
      "C": "Equals the firm's weighted average cost of capital",
      "D": "Minimizes project operating expenses"
    },
    "correct_option": "A",
    "explanation": "By definition, IRR is the discount rate at which the Net Present Value (NPV) of all project cash flows equals zero.",
    "distractor_analysis": {
      "A": "Correct. By definition, IRR is the discount rate at which the Net Present Value (NPV) of ",
      "B": "Incorrect. Common distractor based on: Confusing IRR with cost of capital or hurdle rate.",
      "C": "Incorrect. Common distractor based on: Confusing IRR with cost of capital or hurdle rate.",
      "D": "Incorrect. Common distractor based on: Confusing IRR with cost of capital or hurdle rate."
    },
    "misconception": "Confusing IRR with cost of capital or hurdle rate.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Time Value of Money",
    "difficulty_tier": 2,
    "question_text": "An investor deposits $2,000 at the end of each year for 10 years at 7% annual interest. What is the value of the account immediately after the final deposit?",
    "options": {
      "A": "$27,633",
      "B": "$20,000",
      "C": "$31,450",
      "D": "$25,200"
    },
    "correct_option": "A",
    "explanation": "FV = 2,000 * [((1.07)^10 - 1) / 0.07]. Since (1.07)^10 = 1.96715, numerator = 0.96715 / 0.07 = 13.8164. FV = 2,000 * 13.8164 = $27,632.89 approx $27,633.",
    "distractor_analysis": {
      "A": "Correct. FV = 2,000 * [((1.07)^10 - 1) / 0.07]. Since (1.07)^10 = 1.96715, numerator = 0.",
      "B": "Incorrect. Common distractor based on: Multiplying nominal payments without compounding ($20,000).",
      "C": "Incorrect. Common distractor based on: Multiplying nominal payments without compounding ($20,000).",
      "D": "Incorrect. Common distractor based on: Multiplying nominal payments without compounding ($20,000)."
    },
    "misconception": "Multiplying nominal payments without compounding ($20,000).",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Statistical Concepts & Market Returns",
    "difficulty_tier": 2,
    "question_text": "For a positively skewed (skewed to the right) unimodal distribution of asset returns, the relationship between mean, median, and mode is:",
    "options": {
      "A": "Mode < Median < Mean",
      "B": "Mean < Median < Mode",
      "C": "Mean = Median = Mode",
      "D": "Median < Mode < Mean"
    },
    "correct_option": "A",
    "explanation": "In a positively skewed distribution, extreme positive outliers pull the arithmetic mean to the right. The mode is at the highest peak, followed by the median, with the mean being the highest: Mode < Median < Mean.",
    "distractor_analysis": {
      "A": "Correct. In a positively skewed distribution, extreme positive outliers pull the arithmet",
      "B": "Incorrect. Common distractor based on: Confusing positive skew with negative skew (Mean < Median < ",
      "C": "Incorrect. Common distractor based on: Confusing positive skew with negative skew (Mean < Median < ",
      "D": "Incorrect. Common distractor based on: Confusing positive skew with negative skew (Mean < Median < "
    },
    "misconception": "Confusing positive skew with negative skew (Mean < Median < Mode).",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Statistical Concepts & Market Returns",
    "difficulty_tier": 2,
    "question_text": "An investor earns returns of +20% in Year 1 and -20% in Year 2. What is the geometric mean annual return?",
    "options": {
      "A": "-2.02%",
      "B": "0.00%",
      "C": "+2.00%",
      "D": "-4.00%"
    },
    "correct_option": "A",
    "explanation": "Geometric mean return R_G = sqrt((1 + 0.20)(1 - 0.20)) - 1 = sqrt(1.20 * 0.80) - 1 = sqrt(0.96) - 1 = 0.979796 - 1 = -0.0202 = -2.02%. The arithmetic mean is (20 - 20)/2 = 0%.",
    "distractor_analysis": {
      "A": "Correct. Geometric mean return R_G = sqrt((1 + 0.20)(1 - 0.20)) - 1 = sqrt(1.20 * 0.80) -",
      "B": "Incorrect. Common distractor based on: Assuming arithmetic mean of zero implies zero compound geome",
      "C": "Incorrect. Common distractor based on: Assuming arithmetic mean of zero implies zero compound geome",
      "D": "Incorrect. Common distractor based on: Assuming arithmetic mean of zero implies zero compound geome"
    },
    "misconception": "Assuming arithmetic mean of zero implies zero compound geometric return.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Statistical Concepts & Market Returns",
    "difficulty_tier": 2,
    "question_text": "Which measure of central tendency is most appropriate for determining the average cost per share when investing equal monetary sums across different price points?",
    "options": {
      "A": "Harmonic mean",
      "B": "Arithmetic mean",
      "C": "Geometric mean",
      "D": "Trimmed mean"
    },
    "correct_option": "A",
    "explanation": "The harmonic mean is mathematically suited for finding the average price paid when equal dollar amounts are invested over time (dollar-cost averaging).",
    "distractor_analysis": {
      "A": "Correct. The harmonic mean is mathematically suited for finding the average price paid wh",
      "B": "Incorrect. Common distractor based on: Using arithmetic mean (which overstates average cost).",
      "C": "Incorrect. Common distractor based on: Using arithmetic mean (which overstates average cost).",
      "D": "Incorrect. Common distractor based on: Using arithmetic mean (which overstates average cost)."
    },
    "misconception": "Using arithmetic mean (which overstates average cost).",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Statistical Concepts & Market Returns",
    "difficulty_tier": 2,
    "question_text": "According to Chebyshev's inequality, for any distribution shape, what minimum proportion of observations must lie within k = 2 standard deviations of the mean?",
    "options": {
      "A": "75%",
      "B": "68%",
      "C": "89%",
      "D": "95%"
    },
    "correct_option": "A",
    "explanation": "Chebyshev's inequality states that at least 1 - 1/k^2 of observations lie within k standard deviations of the mean. For k = 2: 1 - 1/(2^2) = 1 - 1/4 = 3/4 = 75%.",
    "distractor_analysis": {
      "A": "Correct. Chebyshev's inequality states that at least 1 - 1/k^2 of observations lie within",
      "B": "Incorrect. Common distractor based on: Confusing Chebyshev (75% for any distribution) with normal d",
      "C": "Incorrect. Common distractor based on: Confusing Chebyshev (75% for any distribution) with normal d",
      "D": "Incorrect. Common distractor based on: Confusing Chebyshev (75% for any distribution) with normal d"
    },
    "misconception": "Confusing Chebyshev (75% for any distribution) with normal distribution empirical rule (95%).",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Statistical Concepts & Market Returns",
    "difficulty_tier": 2,
    "question_text": "A return distribution that has fatter tails and a more peaked center than a normal distribution is characterized by:",
    "options": {
      "A": "Leptokurtic with positive excess kurtosis (> 0)",
      "B": "Platykurtic with negative excess kurtosis (< 0)",
      "C": "Mesokurtic with zero kurtosis",
      "D": "Positively skewed with zero kurtosis"
    },
    "correct_option": "A",
    "explanation": "A leptokurtic distribution has kurtosis > 3 (excess kurtosis > 0), exhibiting fat tails (higher probability of extreme tail risk) and a tall, slender central peak.",
    "distractor_analysis": {
      "A": "Correct. A leptokurtic distribution has kurtosis > 3 (excess kurtosis > 0), exhibiting fa",
      "B": "Incorrect. Common distractor based on: Confusing leptokurtic (fat tails) with platykurtic (thin tai",
      "C": "Incorrect. Common distractor based on: Confusing leptokurtic (fat tails) with platykurtic (thin tai",
      "D": "Incorrect. Common distractor based on: Confusing leptokurtic (fat tails) with platykurtic (thin tai"
    },
    "misconception": "Confusing leptokurtic (fat tails) with platykurtic (thin tails).",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Statistical Concepts & Market Returns",
    "difficulty_tier": 2,
    "question_text": "What is the sample variance of the dataset: 4, 6, 8, 10? (Mean = 7)",
    "options": {
      "A": "6.67",
      "B": "5.00",
      "C": "2.58",
      "D": "20.00"
    },
    "correct_option": "A",
    "explanation": "Deviations from mean 7: (4-7)=-3, (6-7)=-1, (8-7)=+1, (10-7)=+3. Squared deviations: 9 + 1 + 1 + 9 = 20. Sample variance divides by n - 1 = 4 - 1 = 3: s^2 = 20 / 3 = 6.67.",
    "distractor_analysis": {
      "A": "Correct. Deviations from mean 7: (4-7)=-3, (6-7)=-1, (8-7)=+1, (10-7)=+3. Squared deviati",
      "B": "Incorrect. Common distractor based on: Dividing by n = 4 (population variance = 5.00) instead of n ",
      "C": "Incorrect. Common distractor based on: Dividing by n = 4 (population variance = 5.00) instead of n ",
      "D": "Incorrect. Common distractor based on: Dividing by n = 4 (population variance = 5.00) instead of n "
    },
    "misconception": "Dividing by n = 4 (population variance = 5.00) instead of n - 1 = 3.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Statistical Concepts & Market Returns",
    "difficulty_tier": 2,
    "question_text": "The Sharpe ratio of an investment portfolio is calculated as:",
    "options": {
      "A": "(Portfolio return - Risk-free rate) / Portfolio standard deviation",
      "B": "(Portfolio return - Benchmark return) / Tracking error",
      "C": "(Portfolio return - Risk-free rate) / Beta",
      "D": "Portfolio return / Portfolio variance"
    },
    "correct_option": "A",
    "explanation": "Sharpe ratio = (R_p - R_f) / sigma_p, measuring excess return per unit of total risk (standard deviation). Treynor ratio divides by systematic risk (beta).",
    "distractor_analysis": {
      "A": "Correct. Sharpe ratio = (R_p - R_f) / sigma_p, measuring excess return per unit of total ",
      "B": "Incorrect. Common distractor based on: Confusing Sharpe ratio (divides by total risk sigma) with Tr",
      "C": "Incorrect. Common distractor based on: Confusing Sharpe ratio (divides by total risk sigma) with Tr",
      "D": "Incorrect. Common distractor based on: Confusing Sharpe ratio (divides by total risk sigma) with Tr"
    },
    "misconception": "Confusing Sharpe ratio (divides by total risk sigma) with Treynor ratio (divides by beta).",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Statistical Concepts & Market Returns",
    "difficulty_tier": 2,
    "question_text": "Which quantile divides an ordered dataset into four equal segments, each containing 25% of the observations?",
    "options": {
      "A": "Quartile",
      "B": "Quintile",
      "C": "Decile",
      "D": "Percentile"
    },
    "correct_option": "A",
    "explanation": "Quartiles divide data into 4 equal quarters (Q1 = 25th, Q2 = 50th/median, Q3 = 75th percentile). Quintiles divide into 5, deciles into 10, percentiles into 100.",
    "distractor_analysis": {
      "A": "Correct. Quartiles divide data into 4 equal quarters (Q1 = 25th, Q2 = 50th/median, Q3 = 7",
      "B": "Incorrect. Common distractor based on: Confusing quartiles (4) with quintiles (5).",
      "C": "Incorrect. Common distractor based on: Confusing quartiles (4) with quintiles (5).",
      "D": "Incorrect. Common distractor based on: Confusing quartiles (4) with quintiles (5)."
    },
    "misconception": "Confusing quartiles (4) with quintiles (5).",
    "time_estimate_seconds": 30
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Statistical Concepts & Market Returns",
    "difficulty_tier": 2,
    "question_text": "What is the primary advantage of using the median rather than the arithmetic mean as a measure of central tendency?",
    "options": {
      "A": "The median is not distorted by extreme outliers or skewness in the dataset",
      "B": "The median incorporates algebraic properties necessary for mathematical manipulation",
      "C": "The median uses every single value in the dataset equally",
      "D": "The median is always strictly higher than the mode"
    },
    "correct_option": "A",
    "explanation": "The median represents the central 50th percentile rank and is robust to extreme outliers and asymmetric skewness.",
    "distractor_analysis": {
      "A": "Correct. The median represents the central 50th percentile rank and is robust to extreme ",
      "B": "Incorrect. Common distractor based on: Assuming the mean is more resistant to outliers than the med",
      "C": "Incorrect. Common distractor based on: Assuming the mean is more resistant to outliers than the med",
      "D": "Incorrect. Common distractor based on: Assuming the mean is more resistant to outliers than the med"
    },
    "misconception": "Assuming the mean is more resistant to outliers than the median.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Statistical Concepts & Market Returns",
    "difficulty_tier": 2,
    "question_text": "A mutual fund has annual returns of 10%, 15%, -5%, and 20%. What is the arithmetic mean annual return?",
    "options": {
      "A": "10.0%",
      "B": "8.5%",
      "C": "9.2%",
      "D": "12.5%"
    },
    "correct_option": "A",
    "explanation": "Arithmetic mean = (10 + 15 - 5 + 20) / 4 = 40 / 4 = 10.0%.",
    "distractor_analysis": {
      "A": "Correct. Arithmetic mean = (10 + 15 - 5 + 20) / 4 = 40 / 4 = 10.0%.",
      "B": "Incorrect. Common distractor based on: Arithmetic calculation error.",
      "C": "Incorrect. Common distractor based on: Arithmetic calculation error.",
      "D": "Incorrect. Common distractor based on: Arithmetic calculation error."
    },
    "misconception": "Arithmetic calculation error.",
    "time_estimate_seconds": 30
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Statistical Concepts & Market Returns",
    "difficulty_tier": 2,
    "question_text": "For any set of non-identical positive numbers, the mathematical relationship between the arithmetic mean (AM), geometric mean (GM), and harmonic mean (HM) is:",
    "options": {
      "A": "AM > GM > HM",
      "B": "HM > GM > AM",
      "C": "GM > AM > HM",
      "D": "AM = GM = HM"
    },
    "correct_option": "A",
    "explanation": "By the classical Pythagorean mean inequality, for any set of positive numbers that are not all identical: AM > GM > HM. They are equal only if all values are identical.",
    "distractor_analysis": {
      "A": "Correct. By the classical Pythagorean mean inequality, for any set of positive numbers th",
      "B": "Incorrect. Common distractor based on: Reversing the inequality order.",
      "C": "Incorrect. Common distractor based on: Reversing the inequality order.",
      "D": "Incorrect. Common distractor based on: Reversing the inequality order."
    },
    "misconception": "Reversing the inequality order.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Probability Distributions",
    "difficulty_tier": 2,
    "question_text": "For a standard normal distribution (Z ~ N(0, 1)), approximately what percentage of observations falls within +- 1.96 standard deviations of the mean?",
    "options": {
      "A": "95.0%",
      "B": "68.3%",
      "C": "99.0%",
      "D": "90.0%"
    },
    "correct_option": "A",
    "explanation": "Under a standard normal distribution, exactly 95.0% of probability density lies within +- 1.96 standard deviations of the mean (leaving 2.5% in each tail).",
    "distractor_analysis": {
      "A": "Correct. Under a standard normal distribution, exactly 95.0% of probability density lies ",
      "B": "Incorrect. Common distractor based on: Confusing 1.96 standard deviations (95%) with 1 standard dev",
      "C": "Incorrect. Common distractor based on: Confusing 1.96 standard deviations (95%) with 1 standard dev",
      "D": "Incorrect. Common distractor based on: Confusing 1.96 standard deviations (95%) with 1 standard dev"
    },
    "misconception": "Confusing 1.96 standard deviations (95%) with 1 standard deviation (68.3%) or 2.58 standard deviations (99%).",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Probability Distributions",
    "difficulty_tier": 2,
    "question_text": "A continuous random variable X is uniformly distributed between 10 and 50. What is the probability that X is between 20 and 35?",
    "options": {
      "A": "0.375",
      "B": "0.500",
      "C": "0.300",
      "D": "0.250"
    },
    "correct_option": "A",
    "explanation": "P(20 <= X <= 35) = (35 - 20) / (50 - 10) = 15 / 40 = 3/8 = 0.375.",
    "distractor_analysis": {
      "A": "Correct. P(20 <= X <= 35) = (35 - 20) / (50 - 10) = 15 / 40 = 3/8 = 0.375.",
      "B": "Incorrect. Common distractor based on: Dividing by 50 instead of total interval length (50 - 10 = 4",
      "C": "Incorrect. Common distractor based on: Dividing by 50 instead of total interval length (50 - 10 = 4",
      "D": "Incorrect. Common distractor based on: Dividing by 50 instead of total interval length (50 - 10 = 4"
    },
    "misconception": "Dividing by 50 instead of total interval length (50 - 10 = 40).",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Probability Distributions",
    "difficulty_tier": 2,
    "question_text": "Which probability distribution is bounded below by zero and is frequently used to model asset prices?",
    "options": {
      "A": "Lognormal distribution",
      "B": "Normal distribution",
      "C": "Student's t-distribution",
      "D": "Uniform distribution"
    },
    "correct_option": "A",
    "explanation": "Asset prices cannot drop below zero (due to limited liability). If continuously compounded returns are normally distributed, asset prices follow a lognormal distribution, which is bounded below by zero and right-skewed.",
    "distractor_analysis": {
      "A": "Correct. Asset prices cannot drop below zero (due to limited liability). If continuously ",
      "B": "Incorrect. Common distractor based on: Selecting normal distribution (which allows negative prices)",
      "C": "Incorrect. Common distractor based on: Selecting normal distribution (which allows negative prices)",
      "D": "Incorrect. Common distractor based on: Selecting normal distribution (which allows negative prices)"
    },
    "misconception": "Selecting normal distribution (which allows negative prices).",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Probability Distributions",
    "difficulty_tier": 2,
    "question_text": "In a binomial distribution with n = 4 independent trials and probability of success p = 0.5, what is the probability of obtaining exactly 2 successes?",
    "options": {
      "A": "0.375",
      "B": "0.250",
      "C": "0.500",
      "D": "0.125"
    },
    "correct_option": "A",
    "explanation": "P(X = 2) = 4C2 * (0.5)^2 * (0.5)^2 = 6 * (0.25) * (0.25) = 6 * 0.0625 = 0.375.",
    "distractor_analysis": {
      "A": "Correct. P(X = 2) = 4C2 * (0.5)^2 * (0.5)^2 = 6 * (0.25) * (0.25) = 6 * 0.0625 = 0.375.",
      "B": "Incorrect. Common distractor based on: Forgetting combinations factor 4C2 = 6 (calculating 0.5^4 = ",
      "C": "Incorrect. Common distractor based on: Forgetting combinations factor 4C2 = 6 (calculating 0.5^4 = ",
      "D": "Incorrect. Common distractor based on: Forgetting combinations factor 4C2 = 6 (calculating 0.5^4 = "
    },
    "misconception": "Forgetting combinations factor 4C2 = 6 (calculating 0.5^4 = 0.0625).",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Probability Distributions",
    "difficulty_tier": 2,
    "question_text": "According to Roy's safety-first criterion, an investor seeking to minimize the probability of portfolio return falling below threshold return R_L will select the portfolio that maximizes:",
    "options": {
      "A": "[E(R_p) - R_L] / sigma_p",
      "B": "[R_L - E(R_p)] / sigma_p",
      "C": "sigma_p / [E(R_p) - R_L]",
      "D": "E(R_p) - R_L"
    },
    "correct_option": "A",
    "explanation": "Roy's Safety-First ratio SFRatio = [E(R_p) - R_L] / sigma_p. Maximizing this ratio pushes the disaster threshold R_L the greatest number of standard deviations into the lower tail, minimizing shortfall probability.",
    "distractor_analysis": {
      "A": "Correct. Roy's Safety-First ratio SFRatio = [E(R_p) - R_L] / sigma_p. Maximizing this rat",
      "B": "Incorrect. Common distractor based on: Inverting numerator or dividing by variance.",
      "C": "Incorrect. Common distractor based on: Inverting numerator or dividing by variance.",
      "D": "Incorrect. Common distractor based on: Inverting numerator or dividing by variance."
    },
    "misconception": "Inverting numerator or dividing by variance.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Probability Distributions",
    "difficulty_tier": 2,
    "question_text": "As the degrees of freedom increase toward infinity, Student's t-distribution:",
    "options": {
      "A": "Approaches the standard normal distribution",
      "B": "Develops increasingly fatter tails than normal",
      "C": "Becomes positively skewed",
      "D": "Collapses into a discrete binomial distribution"
    },
    "correct_option": "A",
    "explanation": "Student's t-distribution is symmetric and bell-shaped with fatter tails than the normal. As degrees of freedom df -> infinity, the variance approaches 1 and the t-distribution converges asymptotically to the standard normal Z distribution.",
    "distractor_analysis": {
      "A": "Correct. Student's t-distribution is symmetric and bell-shaped with fatter tails than the",
      "B": "Incorrect. Common distractor based on: Assuming t-distribution becomes skewed as sample size increa",
      "C": "Incorrect. Common distractor based on: Assuming t-distribution becomes skewed as sample size increa",
      "D": "Incorrect. Common distractor based on: Assuming t-distribution becomes skewed as sample size increa"
    },
    "misconception": "Assuming t-distribution becomes skewed as sample size increases.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Probability Distributions",
    "difficulty_tier": 2,
    "question_text": "If portfolio return R follows N(12%, 16%), what is the probability of earning a negative return (R < 0%)? (Z = -3.0 corresponds to cumulative probability 0.0013)",
    "options": {
      "A": "0.13%",
      "B": "2.50%",
      "C": "1.00%",
      "D": "5.00%"
    },
    "correct_option": "A",
    "explanation": "Standard deviation sigma = sqrt(16%) = 4%? Wait: if variance is 16%, sigma = 4%. Z = (0 - 12)/4 = -3.0. P(Z < -3.0) = 0.0013 = 0.13%.",
    "distractor_analysis": {
      "A": "Correct. Standard deviation sigma = sqrt(16%) = 4%? Wait: if variance is 16%, sigma = 4%.",
      "B": "Incorrect. Common distractor based on: Using variance directly in denominator instead of standard d",
      "C": "Incorrect. Common distractor based on: Using variance directly in denominator instead of standard d",
      "D": "Incorrect. Common distractor based on: Using variance directly in denominator instead of standard d"
    },
    "misconception": "Using variance directly in denominator instead of standard deviation.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Probability Distributions",
    "difficulty_tier": 2,
    "question_text": "What is the variance of a binomial distribution with n trials and probability of success p?",
    "options": {
      "A": "n * p * (1 - p)",
      "B": "n * p",
      "C": "n * p^2",
      "D": "sqrt(n * p * (1 - p))"
    },
    "correct_option": "A",
    "explanation": "For a binomial distribution, the mean is n*p and the variance is sigma^2 = n * p * (1 - p). The standard deviation is the square root.",
    "distractor_analysis": {
      "A": "Correct. For a binomial distribution, the mean is n*p and the variance is sigma^2 = n * p",
      "B": "Incorrect. Common distractor based on: Confusing variance with standard deviation.",
      "C": "Incorrect. Common distractor based on: Confusing variance with standard deviation.",
      "D": "Incorrect. Common distractor based on: Confusing variance with standard deviation."
    },
    "misconception": "Confusing variance with standard deviation.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Probability Distributions",
    "difficulty_tier": 2,
    "question_text": "In Monte Carlo simulation, risk analysis is conducted by:",
    "options": {
      "A": "Repeatedly drawing random values from specified probability distributions to model complex path-dependent outcomes",
      "B": "Deterministically changing a single input variable while holding all others constant",
      "C": "Using historical returns without any distribution assumptions",
      "D": "Back-testing an investment strategy across exactly one past calendar year"
    },
    "correct_option": "A",
    "explanation": "Monte Carlo simulation generates thousands of scenario trials by repeatedly drawing random variables from assumed probability distributions to establish the distribution of portfolio outcomes.",
    "distractor_analysis": {
      "A": "Correct. Monte Carlo simulation generates thousands of scenario trials by repeatedly draw",
      "B": "Incorrect. Common distractor based on: Confusing Monte Carlo simulation with single-variable sensit",
      "C": "Incorrect. Common distractor based on: Confusing Monte Carlo simulation with single-variable sensit",
      "D": "Incorrect. Common distractor based on: Confusing Monte Carlo simulation with single-variable sensit"
    },
    "misconception": "Confusing Monte Carlo simulation with single-variable sensitivity analysis.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Probability Distributions",
    "difficulty_tier": 2,
    "question_text": "A Bernoulli random variable has only two possible outcomes: 1 (success) with probability p, and 0 (failure) with probability 1 - p. What is its expected value?",
    "options": {
      "A": "p",
      "B": "1 - p",
      "C": "p * (1 - p)",
      "D": "1"
    },
    "correct_option": "A",
    "explanation": "E(X) = 1 * p + 0 * (1 - p) = p.",
    "distractor_analysis": {
      "A": "Correct. E(X) = 1 * p + 0 * (1 - p) = p.",
      "B": "Incorrect. Common distractor based on: Confusing expected value (p) with variance (p(1-p)).",
      "C": "Incorrect. Common distractor based on: Confusing expected value (p) with variance (p(1-p)).",
      "D": "Incorrect. Common distractor based on: Confusing expected value (p) with variance (p(1-p))."
    },
    "misconception": "Confusing expected value (p) with variance (p(1-p)).",
    "time_estimate_seconds": 30
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Probability Distributions",
    "difficulty_tier": 2,
    "question_text": "The Central Limit Theorem states that the distribution of sample means approaches a normal distribution as sample size increases, provided that:",
    "options": {
      "A": "Sample size n is sufficiently large (typically n >= 30), regardless of the underlying population distribution",
      "B": "The underlying population is strictly normally distributed",
      "C": "The population has infinite variance",
      "D": "Observations are perfectly positively correlated"
    },
    "correct_option": "A",
    "explanation": "The Central Limit Theorem guarantees that for any population distribution with finite mean and variance, the sampling distribution of the sample mean becomes approximately normal as sample size n >= 30.",
    "distractor_analysis": {
      "A": "Correct. The Central Limit Theorem guarantees that for any population distribution with f",
      "B": "Incorrect. Common distractor based on: Assuming the underlying population must already be normal.",
      "C": "Incorrect. Common distractor based on: Assuming the underlying population must already be normal.",
      "D": "Incorrect. Common distractor based on: Assuming the underlying population must already be normal."
    },
    "misconception": "Assuming the underlying population must already be normal.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Hypothesis Testing",
    "difficulty_tier": 2,
    "question_text": "In hypothesis testing, committing a Type I error means:",
    "options": {
      "A": "Rejecting a true null hypothesis (false positive)",
      "B": "Failing to reject a false null hypothesis (false negative)",
      "C": "Selecting an improper sample size",
      "D": "Calculating an incorrect test statistic"
    },
    "correct_option": "A",
    "explanation": "Type I error occurs when a researcher rejects the null hypothesis when it is actually true. The probability of Type I error is significance level alpha.",
    "distractor_analysis": {
      "A": "Correct. Type I error occurs when a researcher rejects the null hypothesis when it is act",
      "B": "Incorrect. Common distractor based on: Confusing Type I error (rejecting true null) with Type II er",
      "C": "Incorrect. Common distractor based on: Confusing Type I error (rejecting true null) with Type II er",
      "D": "Incorrect. Common distractor based on: Confusing Type I error (rejecting true null) with Type II er"
    },
    "misconception": "Confusing Type I error (rejecting true null) with Type II error (failing to reject false null).",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Hypothesis Testing",
    "difficulty_tier": 2,
    "question_text": "The power of a statistical hypothesis test is defined as:",
    "options": {
      "A": "1 - P(Type II error) = 1 - beta",
      "B": "1 - P(Type I error) = 1 - alpha",
      "C": "alpha + beta",
      "D": "P(Type I error) / P(Type II error)"
    },
    "correct_option": "A",
    "explanation": "Power of a test is the probability of correctly rejecting a false null hypothesis: Power = 1 - beta, where beta is the probability of Type II error.",
    "distractor_analysis": {
      "A": "Correct. Power of a test is the probability of correctly rejecting a false null hypothesi",
      "B": "Incorrect. Common distractor based on: Confusing power (1 - beta) with confidence level (1 - alpha)",
      "C": "Incorrect. Common distractor based on: Confusing power (1 - beta) with confidence level (1 - alpha)",
      "D": "Incorrect. Common distractor based on: Confusing power (1 - beta) with confidence level (1 - alpha)"
    },
    "misconception": "Confusing power (1 - beta) with confidence level (1 - alpha).",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Hypothesis Testing",
    "difficulty_tier": 2,
    "question_text": "When conducting a two-tailed test of a population mean with a small sample (n = 20) drawn from a normal population with unknown variance, the appropriate test statistic is:",
    "options": {
      "A": "t-statistic with n - 1 = 19 degrees of freedom",
      "B": "z-statistic using the standard normal distribution",
      "C": "Chi-square statistic with 20 degrees of freedom",
      "D": "F-statistic with 19 numerator degrees of freedom"
    },
    "correct_option": "A",
    "explanation": "When population variance is unknown and sample size is small (n < 30) from a normal population, the t-statistic with n - 1 degrees of freedom must be used.",
    "distractor_analysis": {
      "A": "Correct. When population variance is unknown and sample size is small (n < 30) from a nor",
      "B": "Incorrect. Common distractor based on: Using z-statistic when population variance is unknown and n ",
      "C": "Incorrect. Common distractor based on: Using z-statistic when population variance is unknown and n ",
      "D": "Incorrect. Common distractor based on: Using z-statistic when population variance is unknown and n "
    },
    "misconception": "Using z-statistic when population variance is unknown and n is small.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Hypothesis Testing",
    "difficulty_tier": 2,
    "question_text": "In hypothesis testing, the p-value is best defined as:",
    "options": {
      "A": "The smallest significance level at which the null hypothesis can be rejected",
      "B": "The probability that the null hypothesis is true",
      "C": "The probability that the alternative hypothesis is false",
      "D": "The significance level selected by the researcher prior to testing"
    },
    "correct_option": "A",
    "explanation": "The p-value is the probability of obtaining a test statistic at least as extreme as the observed value, assuming the null hypothesis is true. It is the minimum significance level alpha for rejecting H0.",
    "distractor_analysis": {
      "A": "Correct. The p-value is the probability of obtaining a test statistic at least as extreme",
      "B": "Incorrect. Common distractor based on: Mistaking p-value for the probability that the null hypothes",
      "C": "Incorrect. Common distractor based on: Mistaking p-value for the probability that the null hypothes",
      "D": "Incorrect. Common distractor based on: Mistaking p-value for the probability that the null hypothes"
    },
    "misconception": "Mistaking p-value for the probability that the null hypothesis is true.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Hypothesis Testing",
    "difficulty_tier": 2,
    "question_text": "Which statistical test is used to test a hypothesis concerning the equality of variances of two normally distributed populations?",
    "options": {
      "A": "F-test",
      "B": "t-test",
      "C": "Chi-square test",
      "D": "z-test"
    },
    "correct_option": "A",
    "explanation": "An F-test compares the ratio of two sample variances (F = s1^2 / s2^2) to test whether two population variances are equal. Chi-square tests a single population variance.",
    "distractor_analysis": {
      "A": "Correct. An F-test compares the ratio of two sample variances (F = s1^2 / s2^2) to test w",
      "B": "Incorrect. Common distractor based on: Confusing F-test (two variances) with Chi-square test (singl",
      "C": "Incorrect. Common distractor based on: Confusing F-test (two variances) with Chi-square test (singl",
      "D": "Incorrect. Common distractor based on: Confusing F-test (two variances) with Chi-square test (singl"
    },
    "misconception": "Confusing F-test (two variances) with Chi-square test (single variance).",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Hypothesis Testing",
    "difficulty_tier": 2,
    "question_text": "A researcher tests H0: mu = 0 vs Ha: mu != 0 at 5% significance level. The calculated test statistic produces a p-value of 0.023. The researcher should:",
    "options": {
      "A": "Reject the null hypothesis because p-value < 0.05",
      "B": "Fail to reject the null hypothesis because p-value < 0.05",
      "C": "Increase sample size before deciding",
      "D": "Accept the null hypothesis as proven true"
    },
    "correct_option": "A",
    "explanation": "Decision rule: If p-value < alpha (significance level), reject H0. Here 0.023 < 0.05, so the null hypothesis is rejected with statistical significance.",
    "distractor_analysis": {
      "A": "Correct. Decision rule: If p-value < alpha (significance level), reject H0. Here 0.023 < ",
      "B": "Incorrect. Common distractor based on: Failing to reject when p-value is below significance level.",
      "C": "Incorrect. Common distractor based on: Failing to reject when p-value is below significance level.",
      "D": "Incorrect. Common distractor based on: Failing to reject when p-value is below significance level."
    },
    "misconception": "Failing to reject when p-value is below significance level.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Hypothesis Testing",
    "difficulty_tier": 2,
    "question_text": "What test statistic is used to test a hypothesis about the variance of a single normally distributed population?",
    "options": {
      "A": "Chi-square test statistic: (n - 1) * s^2 / sigma0^2",
      "B": "t-statistic: (x_bar - mu0) / (s / sqrt(n))",
      "C": "F-test statistic: s1^2 / s2^2",
      "D": "z-statistic: (x_bar - mu0) / (sigma / sqrt(n))"
    },
    "correct_option": "A",
    "explanation": "Testing a single population variance uses the Chi-square test statistic chi^2 = (n - 1) s^2 / sigma0^2 with n - 1 degrees of freedom.",
    "distractor_analysis": {
      "A": "Correct. Testing a single population variance uses the Chi-square test statistic chi^2 = ",
      "B": "Incorrect. Common distractor based on: Using F-statistic for a single variance.",
      "C": "Incorrect. Common distractor based on: Using F-statistic for a single variance.",
      "D": "Incorrect. Common distractor based on: Using F-statistic for a single variance."
    },
    "misconception": "Using F-statistic for a single variance.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Hypothesis Testing",
    "difficulty_tier": 2,
    "question_text": "In a one-tailed hypothesis test where the researcher wants to prove that portfolio alpha is positive, the null and alternative hypotheses should be formulated as:",
    "options": {
      "A": "H0: alpha <= 0 versus Ha: alpha > 0",
      "B": "H0: alpha >= 0 versus Ha: alpha < 0",
      "C": "H0: alpha = 0 versus Ha: alpha != 0",
      "D": "H0: alpha > 0 versus Ha: alpha <= 0"
    },
    "correct_option": "A",
    "explanation": "The alternative hypothesis Ha contains the claim the researcher seeks to establish (alpha > 0). The null hypothesis H0 is the status quo or opposite condition (alpha <= 0).",
    "distractor_analysis": {
      "A": "Correct. The alternative hypothesis Ha contains the claim the researcher seeks to establi",
      "B": "Incorrect. Common distractor based on: Placing the research objective into the null hypothesis inst",
      "C": "Incorrect. Common distractor based on: Placing the research objective into the null hypothesis inst",
      "D": "Incorrect. Common distractor based on: Placing the research objective into the null hypothesis inst"
    },
    "misconception": "Placing the research objective into the null hypothesis instead of alternative.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Hypothesis Testing",
    "difficulty_tier": 2,
    "question_text": "If a 95% confidence interval for a population mean is [4.2%, 8.8%], what conclusion is reached for a two-tailed test of H0: mu = 0% at alpha = 5%?",
    "options": {
      "A": "Reject H0 because 0% falls outside the 95% confidence interval",
      "B": "Fail to reject H0 because 0% falls outside the confidence interval",
      "C": "Accept H0 because the confidence interval is strictly positive",
      "D": "The test is inconclusive without calculating the test statistic"
    },
    "correct_option": "A",
    "explanation": "A two-tailed hypothesis test at significance level alpha is equivalent to constructing a (1 - alpha) confidence interval. If the hypothesized value (0%) lies outside the interval, reject H0.",
    "distractor_analysis": {
      "A": "Correct. A two-tailed hypothesis test at significance level alpha is equivalent to constr",
      "B": "Incorrect. Common distractor based on: Thinking confidence intervals cannot be used to conduct hypo",
      "C": "Incorrect. Common distractor based on: Thinking confidence intervals cannot be used to conduct hypo",
      "D": "Incorrect. Common distractor based on: Thinking confidence intervals cannot be used to conduct hypo"
    },
    "misconception": "Thinking confidence intervals cannot be used to conduct hypothesis tests.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Hypothesis Testing",
    "difficulty_tier": 2,
    "question_text": "Decreasing the significance level alpha of a hypothesis test from 5% to 1% causes:",
    "options": {
      "A": "The probability of Type I error to decrease, while the probability of Type II error increases",
      "B": "The probability of both Type I and Type II errors to decrease",
      "C": "The power of the test to increase",
      "D": "The critical value threshold to move closer to the center"
    },
    "correct_option": "A",
    "explanation": "Lowering alpha reduces the risk of false positives (Type I error), but widens the non-rejection region, making it harder to reject false null hypotheses (increasing Type II error beta and reducing power).",
    "distractor_analysis": {
      "A": "Correct. Lowering alpha reduces the risk of false positives (Type I error), but widens th",
      "B": "Incorrect. Common distractor based on: Assuming reducing alpha decreases both Type I and Type II er",
      "C": "Incorrect. Common distractor based on: Assuming reducing alpha decreases both Type I and Type II er",
      "D": "Incorrect. Common distractor based on: Assuming reducing alpha decreases both Type I and Type II er"
    },
    "misconception": "Assuming reducing alpha decreases both Type I and Type II errors simultaneously.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Hypothesis Testing",
    "difficulty_tier": 2,
    "question_text": "When testing whether the mean difference of paired observations (e.g. before-and-after returns of the same funds) is zero, the appropriate test is:",
    "options": {
      "A": "Paired comparisons t-test",
      "B": "Two independent samples pooled variance t-test",
      "C": "Chi-square test of independence",
      "D": "F-test for equality of means"
    },
    "correct_option": "A",
    "explanation": "When samples are dependent or paired (measuring the same entity across two conditions), the paired comparisons t-test on difference scores d_i is used.",
    "distractor_analysis": {
      "A": "Correct. When samples are dependent or paired (measuring the same entity across two condi",
      "B": "Incorrect. Common distractor based on: Using an independent two-sample t-test on paired data.",
      "C": "Incorrect. Common distractor based on: Using an independent two-sample t-test on paired data.",
      "D": "Incorrect. Common distractor based on: Using an independent two-sample t-test on paired data."
    },
    "misconception": "Using an independent two-sample t-test on paired data.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Simple Linear Regression",
    "difficulty_tier": 2,
    "question_text": "In a simple linear regression model Y = b0 + b1 * X + e, what does the coefficient of determination (R^2) measure?",
    "options": {
      "A": "The proportion of total variation in dependent variable Y explained by independent variable X",
      "B": "The slope of the estimated regression line",
      "C": "The correlation between error terms across time",
      "D": "The probability that the true slope equals zero"
    },
    "correct_option": "A",
    "explanation": "R^2 = Explained Sum of Squares / Total Sum of Squares (ESS / TSS), measuring the fraction of variation in Y explained by the regression on X. In simple linear regression, R^2 = r_xy^2.",
    "distractor_analysis": {
      "A": "Correct. R^2 = Explained Sum of Squares / Total Sum of Squares (ESS / TSS), measuring the",
      "B": "Incorrect. Common distractor based on: Confusing R^2 with the regression slope coefficient b1.",
      "C": "Incorrect. Common distractor based on: Confusing R^2 with the regression slope coefficient b1.",
      "D": "Incorrect. Common distractor based on: Confusing R^2 with the regression slope coefficient b1."
    },
    "misconception": "Confusing R^2 with the regression slope coefficient b1.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Simple Linear Regression",
    "difficulty_tier": 2,
    "question_text": "What is the relationship between the sample correlation coefficient r and the estimated slope coefficient b1 in a simple linear regression?",
    "options": {
      "A": "b1 = r * (s_y / s_x)",
      "B": "b1 = r * (s_x / s_y)",
      "C": "b1 = r^2",
      "D": "b1 = r"
    },
    "correct_option": "A",
    "explanation": "b1 = Cov(X,Y) / Var(X) = [r * s_x * s_y] / s_x^2 = r * (s_y / s_x). The slope equals correlation scaled by the ratio of standard deviations.",
    "distractor_analysis": {
      "A": "Correct. b1 = Cov(X,Y) / Var(X) = [r * s_x * s_y] / s_x^2 = r * (s_y / s_x). The slope eq",
      "B": "Incorrect. Common distractor based on: Inverting the ratio of standard deviations (using s_x / s_y)",
      "C": "Incorrect. Common distractor based on: Inverting the ratio of standard deviations (using s_x / s_y)",
      "D": "Incorrect. Common distractor based on: Inverting the ratio of standard deviations (using s_x / s_y)"
    },
    "misconception": "Inverting the ratio of standard deviations (using s_x / s_y).",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Simple Linear Regression",
    "difficulty_tier": 2,
    "question_text": "Which of the following is a core assumption of Ordinary Least Squares (OLS) regression?",
    "options": {
      "A": "The error terms have constant variance (homoskedasticity) and are uncorrelated with each other",
      "B": "The independent variable is perfectly collinear with error terms",
      "C": "The error terms increase exponentially with the independent variable",
      "D": "The dependent variable must follow a uniform distribution"
    },
    "correct_option": "A",
    "explanation": "OLS assumes error terms have expected value 0, constant variance (no heteroskedasticity), are uncorrelated (no autocorrelation), and independent of X.",
    "distractor_analysis": {
      "A": "Correct. OLS assumes error terms have expected value 0, constant variance (no heteroskeda",
      "B": "Incorrect. Common distractor based on: Assuming error terms are expected to be heteroskedastic.",
      "C": "Incorrect. Common distractor based on: Assuming error terms are expected to be heteroskedastic.",
      "D": "Incorrect. Common distractor based on: Assuming error terms are expected to be heteroskedastic."
    },
    "misconception": "Assuming error terms are expected to be heteroskedastic.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Simple Linear Regression",
    "difficulty_tier": 2,
    "question_text": "In a regression with n = 32 observations, what degrees of freedom are associated with testing the statistical significance of slope coefficient b1?",
    "options": {
      "A": "n - 2 = 30",
      "B": "n - 1 = 31",
      "C": "n = 32",
      "D": "n - k - 2 = 28"
    },
    "correct_option": "A",
    "explanation": "In simple linear regression (one intercept and one slope, 2 estimated parameters), degrees of freedom for residual sum of squares and t-test of slope is n - 2 = 32 - 2 = 30.",
    "distractor_analysis": {
      "A": "Correct. In simple linear regression (one intercept and one slope, 2 estimated parameters",
      "B": "Incorrect. Common distractor based on: Using n - 1 degrees of freedom (confusing with sample varian",
      "C": "Incorrect. Common distractor based on: Using n - 1 degrees of freedom (confusing with sample varian",
      "D": "Incorrect. Common distractor based on: Using n - 1 degrees of freedom (confusing with sample varian"
    },
    "misconception": "Using n - 1 degrees of freedom (confusing with sample variance).",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Simple Linear Regression",
    "difficulty_tier": 2,
    "question_text": "If the correlation between two asset returns is r = -0.80, what is the coefficient of determination (R^2) in a simple linear regression between them?",
    "options": {
      "A": "0.64 (64%)",
      "B": "-0.80",
      "C": "-0.64",
      "D": "0.80 (80%)"
    },
    "correct_option": "A",
    "explanation": "In simple linear regression, R^2 = r^2 = (-0.80)^2 = +0.64. R^2 is strictly non-negative and indicates 64% of variation is explained.",
    "distractor_analysis": {
      "A": "Correct. In simple linear regression, R^2 = r^2 = (-0.80)^2 = +0.64. R^2 is strictly non-",
      "B": "Incorrect. Common distractor based on: Reporting a negative R^2 (-0.64).",
      "C": "Incorrect. Common distractor based on: Reporting a negative R^2 (-0.64).",
      "D": "Incorrect. Common distractor based on: Reporting a negative R^2 (-0.64)."
    },
    "misconception": "Reporting a negative R^2 (-0.64).",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Simple Linear Regression",
    "difficulty_tier": 2,
    "question_text": "Standard error of the estimate (s_e) in a simple linear regression measures:",
    "options": {
      "A": "The standard deviation of the regression residuals (scatter of points around regression line)",
      "B": "The standard error of the slope coefficient estimator",
      "C": "The total variance of the independent variable",
      "D": "The sample correlation between X and Y"
    },
    "correct_option": "A",
    "explanation": "Standard error of estimate s_e = sqrt(SSE / (n - 2)), measuring standard deviation of residuals and indicating model fit precision.",
    "distractor_analysis": {
      "A": "Correct. Standard error of estimate s_e = sqrt(SSE / (n - 2)), measuring standard deviati",
      "B": "Incorrect. Common distractor based on: Confusing standard error of the estimate (s_e) with standard",
      "C": "Incorrect. Common distractor based on: Confusing standard error of the estimate (s_e) with standard",
      "D": "Incorrect. Common distractor based on: Confusing standard error of the estimate (s_e) with standard"
    },
    "misconception": "Confusing standard error of the estimate (s_e) with standard error of slope (s_b1).",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Simple Linear Regression",
    "difficulty_tier": 2,
    "question_text": "In the Capital Asset Pricing Model (CAPM) regression R_i - R_f = alpha + beta * (R_m - R_f) + e, the slope coefficient beta measures:",
    "options": {
      "A": "Systematic risk of the security relative to the market",
      "B": "Firm-specific unsystematic risk",
      "C": "Excess alpha generated by active portfolio management",
      "D": "The total standard deviation of the asset"
    },
    "correct_option": "A",
    "explanation": "In the market model regression, the slope coefficient beta represents systematic, non-diversifiable market sensitivity: beta = Cov(R_i, R_m) / Var(R_m).",
    "distractor_analysis": {
      "A": "Correct. In the market model regression, the slope coefficient beta represents systematic",
      "B": "Incorrect. Common distractor based on: Confusing beta (systematic risk) with alpha or unsystematic ",
      "C": "Incorrect. Common distractor based on: Confusing beta (systematic risk) with alpha or unsystematic ",
      "D": "Incorrect. Common distractor based on: Confusing beta (systematic risk) with alpha or unsystematic "
    },
    "misconception": "Confusing beta (systematic risk) with alpha or unsystematic risk.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Simple Linear Regression",
    "difficulty_tier": 2,
    "question_text": "An ANOVA table for a simple regression shows Total Sum of Squares (TSS) = 500 and Sum of Squared Errors (SSE) = 150. What is Explained Sum of Squares (ESS)?",
    "options": {
      "A": "350",
      "B": "650",
      "C": "150",
      "D": "0.70"
    },
    "correct_option": "A",
    "explanation": "TSS = ESS + SSE -> ESS = TSS - SSE = 500 - 150 = 350. R^2 = 350 / 500 = 0.70.",
    "distractor_analysis": {
      "A": "Correct. TSS = ESS + SSE -> ESS = TSS - SSE = 500 - 150 = 350. R^2 = 350 / 500 = 0.70.",
      "B": "Incorrect. Common distractor based on: Adding TSS and SSE together.",
      "C": "Incorrect. Common distractor based on: Adding TSS and SSE together.",
      "D": "Incorrect. Common distractor based on: Adding TSS and SSE together."
    },
    "misconception": "Adding TSS and SSE together.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Simple Linear Regression",
    "difficulty_tier": 2,
    "question_text": "To test whether the slope coefficient b1 is statistically significantly different from zero, the t-statistic is calculated as:",
    "options": {
      "A": "t = (b1 - 0) / s_b1",
      "B": "t = b1 / s_e",
      "C": "t = R^2 / s_b1",
      "D": "t = (b1 - b0) / n"
    },
    "correct_option": "A",
    "explanation": "Testing H0: b1 = 0 vs Ha: b1 != 0 uses t = (estimated slope - hypothesized slope) / standard error of slope = b1 / s_b1 with n - 2 degrees of freedom.",
    "distractor_analysis": {
      "A": "Correct. Testing H0: b1 = 0 vs Ha: b1 != 0 uses t = (estimated slope - hypothesized slope",
      "B": "Incorrect. Common distractor based on: Dividing by standard error of estimate s_e instead of standa",
      "C": "Incorrect. Common distractor based on: Dividing by standard error of estimate s_e instead of standa",
      "D": "Incorrect. Common distractor based on: Dividing by standard error of estimate s_e instead of standa"
    },
    "misconception": "Dividing by standard error of estimate s_e instead of standard error of slope s_b1.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Simple Linear Regression",
    "difficulty_tier": 2,
    "question_text": "How does a prediction interval for a forecasted value of Y compare to a confidence interval for the mean value of Y at the same X?",
    "options": {
      "A": "The prediction interval is strictly wider because it includes variance of the error term",
      "B": "The prediction interval is narrower",
      "C": "Both intervals are mathematically identical",
      "D": "The prediction interval ignores estimation error"
    },
    "correct_option": "A",
    "explanation": "A prediction interval forecasts an individual Y outcome (s_f^2 = s_e^2 [1 + 1/n + (X - X_bar)^2 / ((n-1)s_x^2)]), making it strictly wider than the confidence interval for the expected mean of Y.",
    "distractor_analysis": {
      "A": "Correct. A prediction interval forecasts an individual Y outcome (s_f^2 = s_e^2 [1 + 1/n ",
      "B": "Incorrect. Common distractor based on: Assuming individual forecast intervals are narrower than mea",
      "C": "Incorrect. Common distractor based on: Assuming individual forecast intervals are narrower than mea",
      "D": "Incorrect. Common distractor based on: Assuming individual forecast intervals are narrower than mea"
    },
    "misconception": "Assuming individual forecast intervals are narrower than mean estimate intervals.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Quantitative Methods",
    "skill_domain": "Simple Linear Regression",
    "difficulty_tier": 2,
    "question_text": "The Ordinary Least Squares (OLS) criterion chooses the regression line that:",
    "options": {
      "A": "Minimizes the sum of squared vertical differences (residuals) between observed and predicted values",
      "B": "Maximizes the correlation coefficient",
      "C": "Minimizes the sum of absolute horizontal deviations",
      "D": "Passes through the origin (0, 0) regardless of data points"
    },
    "correct_option": "A",
    "explanation": "OLS selects intercept and slope by minimizing Sum of Squared Errors: SSE = sum (Y_i - Y_hat_i)^2.",
    "distractor_analysis": {
      "A": "Correct. OLS selects intercept and slope by minimizing Sum of Squared Errors: SSE = sum (",
      "B": "Incorrect. Common distractor based on: Assuming OLS minimizes absolute errors (which is LAD, not OL",
      "C": "Incorrect. Common distractor based on: Assuming OLS minimizes absolute errors (which is LAD, not OL",
      "D": "Incorrect. Common distractor based on: Assuming OLS minimizes absolute errors (which is LAD, not OL"
    },
    "misconception": "Assuming OLS minimizes absolute errors (which is LAD, not OLS).",
    "time_estimate_seconds": 35
  }
];
