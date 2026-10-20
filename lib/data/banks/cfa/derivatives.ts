// Path: lib/data/banks/cfa/derivatives.ts
import type { SeedQuestion } from "../../question-bank-seed";

export const CFA_DERIVATIVES_QUESTIONS: SeedQuestion[] = [
  {
    "exam_name": "CFA Level 1",
    "subject": "Derivatives",
    "skill_domain": "Derivative Markets & Instruments",
    "difficulty_tier": 2,
    "question_text": "How is a forward commitment distinguished from a contingent claim?",
    "options": {
      "A": "In a forward commitment, both parties have a contractual obligation to settle; in a contingent claim, outcome depends on the exercise of a right by one party",
      "B": "A forward commitment is always traded on an exchange; contingent claims are exclusively OTC",
      "C": "Forward commitments involve zero financial risk"
    },
    "correct_option": "A",
    "explanation": "Forward commitments (forwards, futures, swaps) obligate both parties to complete the transaction. Contingent claims (options, credit derivatives) grant one party the right, but not the obligation, to execute.",
    "distractor_analysis": {
      "A": "Correct. Forward commitments (forwards, futures, swaps) obligate both parties to complete",
      "B": "Incorrect. Common distractor based on: Confusing forward commitments with contingent claims.",
      "C": "Incorrect. Common distractor based on: Confusing forward commitments with contingent claims."
    },
    "misconception": "Confusing forward commitments with contingent claims.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Derivatives",
    "skill_domain": "Derivative Markets & Instruments",
    "difficulty_tier": 2,
    "question_text": "Which of the following is a key economic benefit provided by derivative markets?",
    "options": {
      "A": "Enhanced price discovery and efficient reallocation of financial risk",
      "B": "Elimination of all price volatility in physical spot markets",
      "C": "Guaranteed positive investment returns for hedgers"
    },
    "correct_option": "A",
    "explanation": "Derivatives provide critical price discovery (revealing consensus expectations), lower transaction costs, enhance market liquidity, and allow risk to be transferred efficiently to parties willing to bear it.",
    "distractor_analysis": {
      "A": "Correct. Derivatives provide critical price discovery (revealing consensus expectations),",
      "B": "Incorrect. Common distractor based on: Assuming derivatives eliminate physical spot market price vo",
      "C": "Incorrect. Common distractor based on: Assuming derivatives eliminate physical spot market price vo"
    },
    "misconception": "Assuming derivatives eliminate physical spot market price volatility.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Derivatives",
    "skill_domain": "Derivative Markets & Instruments",
    "difficulty_tier": 2,
    "question_text": "Over-the-counter (OTC) derivative contracts differ from exchange-traded derivatives primarily in that OTC derivatives are:",
    "options": {
      "A": "Customized bilateral contracts with counterparty credit risk, typically with less regulatory oversight",
      "B": "Standardized contracts with daily mark-to-market settlement guaranteed by a clearinghouse",
      "C": "Exclusively traded by retail individual investors"
    },
    "correct_option": "A",
    "explanation": "OTC derivatives are customized bilateral agreements tailored to specific client needs, exposing counterparties to credit default risk. Exchange-traded derivatives are standardized with clearinghouse guarantees.",
    "distractor_analysis": {
      "A": "Correct. OTC derivatives are customized bilateral agreements tailored to specific client ",
      "B": "Incorrect. Common distractor based on: Confusing OTC customization with exchange standardization.",
      "C": "Incorrect. Common distractor based on: Confusing OTC customization with exchange standardization."
    },
    "misconception": "Confusing OTC customization with exchange standardization.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Derivatives",
    "skill_domain": "Derivative Markets & Instruments",
    "difficulty_tier": 2,
    "question_text": "The no-arbitrage principle in derivative pricing asserts that:",
    "options": {
      "A": "Two portfolios producing identical future cash flows under all possible states must trade at identical current prices",
      "B": "Arbitrageurs earn infinite profits in all financial markets",
      "C": "Derivative prices are completely independent of underlying spot prices"
    },
    "correct_option": "A",
    "explanation": "Law of One Price: If two assets or portfolios generate identical future payouts in all states of the world, they must sell for the exact same market price today to eliminate riskless arbitrage.",
    "distractor_analysis": {
      "A": "Correct. Law of One Price: If two assets or portfolios generate identical future payouts ",
      "B": "Incorrect. Common distractor based on: Assuming arbitrageurs accept market directional risk.",
      "C": "Incorrect. Common distractor based on: Assuming arbitrageurs accept market directional risk."
    },
    "misconception": "Assuming arbitrageurs accept market directional risk.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Derivatives",
    "skill_domain": "Derivative Markets & Instruments",
    "difficulty_tier": 2,
    "question_text": "In financial markets, a forward contract is originally entered into at a price that sets the initial value of the contract (V0) to:",
    "options": {
      "A": "Zero",
      "B": "The current spot price S0",
      "C": "The strike price multiplied by interest rate"
    },
    "correct_option": "A",
    "explanation": "Forward contracts require zero upfront cash exchange. The forward price F0 is calculated precisely so that the initial economic value of the contract to both counterparties is exactly zero (V0 = 0).",
    "distractor_analysis": {
      "A": "Correct. Forward contracts require zero upfront cash exchange. The forward price F0 is ca",
      "B": "Incorrect. Common distractor based on: Confusing forward price F0 (a future transaction rate) with ",
      "C": "Incorrect. Common distractor based on: Confusing forward price F0 (a future transaction rate) with "
    },
    "misconception": "Confusing forward price F0 (a future transaction rate) with initial contract value V0 (which is $0).",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Derivatives",
    "skill_domain": "Derivative Markets & Instruments",
    "difficulty_tier": 2,
    "question_text": "A credit default swap (CDS) functions economically like an insurance policy where the protection buyer:",
    "options": {
      "A": "Pays periodic premium spread payments to the protection seller in exchange for compensation upon a credit event",
      "B": "Borrows cash from the protection seller at a floating rate",
      "C": "Purchases the underlying reference bond at a discount"
    },
    "correct_option": "A",
    "explanation": "A CDS is a bilateral contingent claim: the buyer pays periodic premiums (CDS spread) and receives a par payoff from the seller if the reference entity experiences a defined credit event (default, bankruptcy).",
    "distractor_analysis": {
      "A": "Correct. A CDS is a bilateral contingent claim: the buyer pays periodic premiums (CDS spr",
      "B": "Incorrect. Common distractor based on: Confusing a CDS with a direct cash loan.",
      "C": "Incorrect. Common distractor based on: Confusing a CDS with a direct cash loan."
    },
    "misconception": "Confusing a CDS with a direct cash loan.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Derivatives",
    "skill_domain": "Derivative Markets & Instruments",
    "difficulty_tier": 2,
    "question_text": "Which entity acts as the central counterparty to both buyers and sellers in exchange-traded derivative transactions?",
    "options": {
      "A": "Clearinghouse",
      "B": "Commercial investment bank",
      "C": "Securities and Exchange Commission"
    },
    "correct_option": "A",
    "explanation": "The clearinghouse acts as the buyer to every clearing member seller and seller to every buyer (novation), effectively guaranteeing performance and mitigating bilateral counterparty risk.",
    "distractor_analysis": {
      "A": "Correct. The clearinghouse acts as the buyer to every clearing member seller and seller t",
      "B": "Incorrect. Common distractor based on: Confusing the clearinghouse with commercial brokers.",
      "C": "Incorrect. Common distractor based on: Confusing the clearinghouse with commercial brokers."
    },
    "misconception": "Confusing the clearinghouse with commercial brokers.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Derivatives",
    "skill_domain": "Derivative Markets & Instruments",
    "difficulty_tier": 2,
    "question_text": "In derivative markets, what does 'convenience yield' represent for physical commodity holders?",
    "options": {
      "A": "The non-monetary benefit of holding the physical inventory (e.g. avoiding production interruptions) during shortages",
      "B": "The cash dividend paid by gold bullion",
      "C": "The interest earned on margin cash deposits"
    },
    "correct_option": "A",
    "explanation": "Convenience yield is the tangible benefit of having physical inventory immediately on hand to avert supply chain disruptions or exploit temporary spot price spikes, reducing the forward price.",
    "distractor_analysis": {
      "A": "Correct. Convenience yield is the tangible benefit of having physical inventory immediate",
      "B": "Incorrect. Common distractor based on: Assuming commodities pay cash dividends.",
      "C": "Incorrect. Common distractor based on: Assuming commodities pay cash dividends."
    },
    "misconception": "Assuming commodities pay cash dividends.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Derivatives",
    "skill_domain": "Derivative Markets & Instruments",
    "difficulty_tier": 2,
    "question_text": "Why are derivative prices determined using risk-neutral valuation?",
    "options": {
      "A": "Derivative payoffs can be replicated with the underlying asset and risk-free debt, making pricing independent of investor risk aversion",
      "B": "Derivative market traders are completely indifferent to financial risk",
      "C": "All underlying assets have zero standard deviation"
    },
    "correct_option": "A",
    "explanation": "Because arbitrageurs can build a riskless replicating portfolio (combining underlying and risk-free borrowing), derivative prices must be identical regardless of individual risk preferences.",
    "distractor_analysis": {
      "A": "Correct. Because arbitrageurs can build a riskless replicating portfolio (combining under",
      "B": "Incorrect. Common distractor based on: Thinking risk-neutral valuation means real-world investors d",
      "C": "Incorrect. Common distractor based on: Thinking risk-neutral valuation means real-world investors d"
    },
    "misconception": "Thinking risk-neutral valuation means real-world investors don't care about risk.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Derivatives",
    "skill_domain": "Derivative Markets & Instruments",
    "difficulty_tier": 2,
    "question_text": "A derivative contract whose payoff depends on whether the temperature in Chicago falls below freezing for 10 consecutive days is a:",
    "options": {
      "A": "Weather derivative",
      "B": "Total return equity swap",
      "C": "Foreign currency forward"
    },
    "correct_option": "A",
    "explanation": "Weather derivatives base payouts on measurable objective weather indices (cooling degree days, heating degree days, freeze events), allowing utilities and farmers to hedge volume risk.",
    "distractor_analysis": {
      "A": "Correct. Weather derivatives base payouts on measurable objective weather indices (coolin",
      "B": "Incorrect. Common distractor based on: Confusing weather derivatives with commodity futures.",
      "C": "Incorrect. Common distractor based on: Confusing weather derivatives with commodity futures."
    },
    "misconception": "Confusing weather derivatives with commodity futures.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Derivatives",
    "skill_domain": "Derivative Markets & Instruments",
    "difficulty_tier": 2,
    "question_text": "The process of 'novation' in derivative clearing refers to:",
    "options": {
      "A": "The legal substitution of the clearinghouse as counterparty to both original contracting parties",
      "B": "The early termination of a derivative contract due to default",
      "C": "The physical delivery of underlying shares at expiration"
    },
    "correct_option": "A",
    "explanation": "Novation is the legal mechanism whereby the clearinghouse steps in between the original buyer and seller, replacing a single bilateral contract with two separate contracts with the clearinghouse.",
    "distractor_analysis": {
      "A": "Correct. Novation is the legal mechanism whereby the clearinghouse steps in between the o",
      "B": "Incorrect. Common distractor based on: Confusing novation with margin calls or settlement.",
      "C": "Incorrect. Common distractor based on: Confusing novation with margin calls or settlement."
    },
    "misconception": "Confusing novation with margin calls or settlement.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Derivatives",
    "skill_domain": "Forward & Futures Contracts",
    "difficulty_tier": 2,
    "question_text": "In an asset with zero carry costs and zero benefits, what is the no-arbitrage forward price F0 for a contract maturing in T years?",
    "options": {
      "A": "F0 = S0 * (1 + r)^T",
      "B": "F0 = S0 / (1 + r)^T",
      "C": "F0 = S0 * (1 + r * T)"
    },
    "correct_option": "A",
    "explanation": "No-arbitrage forward pricing compounds current spot price at the risk-free rate: F0 = S0 * (1 + r)^T. If F0 deviated, cash-and-carry or reverse cash-and-carry arbitrage would eliminate the gap.",
    "distractor_analysis": {
      "A": "Correct. No-arbitrage forward pricing compounds current spot price at the risk-free rate:",
      "B": "Incorrect. Common distractor based on: Discounting spot price instead of compounding it forward.",
      "C": "Incorrect. Common distractor based on: Discounting spot price instead of compounding it forward."
    },
    "misconception": "Discounting spot price instead of compounding it forward.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Derivatives",
    "skill_domain": "Forward & Futures Contracts",
    "difficulty_tier": 2,
    "question_text": "How does a futures contract differ from a forward contract regarding counterparty credit risk?",
    "options": {
      "A": "Futures virtually eliminate counterparty risk through daily mark-to-market settlement and clearinghouse margin requirements",
      "B": "Futures carry higher counterparty risk because contracts trade on exchanges",
      "C": "Forwards eliminate counterparty risk through government insurance"
    },
    "correct_option": "A",
    "explanation": "Futures feature daily cash settlement (mark-to-market), initial and maintenance margins, and clearinghouse novation, eliminating multi-period accumulation of credit risk common in OTC forwards.",
    "distractor_analysis": {
      "A": "Correct. Futures feature daily cash settlement (mark-to-market), initial and maintenance ",
      "B": "Incorrect. Common distractor based on: Assuming forwards and futures have identical credit risk.",
      "C": "Incorrect. Common distractor based on: Assuming forwards and futures have identical credit risk."
    },
    "misconception": "Assuming forwards and futures have identical credit risk.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Derivatives",
    "skill_domain": "Forward & Futures Contracts",
    "difficulty_tier": 2,
    "question_text": "If an asset provides a known present value of cash benefits (dividends) gamma and incurs present value of storage costs theta, the forward price is:",
    "options": {
      "A": "F0 = (S0 - gamma + theta) * (1 + r)^T",
      "B": "F0 = (S0 + gamma - theta) * (1 + r)^T",
      "C": "F0 = S0 * (1 + r)^T - gamma + theta"
    },
    "correct_option": "A",
    "explanation": "Benefits (dividends gamma) reduce the net cost of carry and lower the forward price; costs (storage theta) increase the cost of carry and raise the forward price: F0 = (S0 - gamma + theta)(1 + r)^T.",
    "distractor_analysis": {
      "A": "Correct. Benefits (dividends gamma) reduce the net cost of carry and lower the forward pr",
      "B": "Incorrect. Common distractor based on: Adding benefits and subtracting costs (inverting net cost of",
      "C": "Incorrect. Common distractor based on: Adding benefits and subtracting costs (inverting net cost of"
    },
    "misconception": "Adding benefits and subtracting costs (inverting net cost of carry signs).",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Derivatives",
    "skill_domain": "Forward & Futures Contracts",
    "difficulty_tier": 2,
    "question_text": "In a futures contract, if a trader's margin account balance drops below the maintenance margin level, the trader receives a margin call requiring deposit of funds to restore the account to:",
    "options": {
      "A": "The initial margin level",
      "B": "The maintenance margin level",
      "C": "Zero balance"
    },
    "correct_option": "A",
    "explanation": "Unlike equity margin calls (which restore to maintenance margin), a futures margin call requires the trader to deposit variation margin sufficient to restore the account all the way back to the Initial Margin level.",
    "distractor_analysis": {
      "A": "Correct. Unlike equity margin calls (which restore to maintenance margin), a futures marg",
      "B": "Incorrect. Common distractor based on: Assuming futures margin calls only restore to the maintenanc",
      "C": "Incorrect. Common distractor based on: Assuming futures margin calls only restore to the maintenanc"
    },
    "misconception": "Assuming futures margin calls only restore to the maintenance level.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Derivatives",
    "skill_domain": "Forward & Futures Contracts",
    "difficulty_tier": 2,
    "question_text": "What is the value of a long forward contract at expiration (time T) with delivery price F0 when spot price is S_T?",
    "options": {
      "A": "V_T = S_T - F0",
      "B": "V_T = F0 - S_T",
      "C": "V_T = S_T * (1 + r)^T"
    },
    "correct_option": "A",
    "explanation": "At maturity, the long forward holder buys the asset at F0 and can sell it at current spot S_T, producing a terminal payoff of V_T = S_T - F0. The short receives F0 - S_T.",
    "distractor_analysis": {
      "A": "Correct. At maturity, the long forward holder buys the asset at F0 and can sell it at cur",
      "B": "Incorrect. Common distractor based on: Confusing the long payoff (S_T - F0) with the short payoff (",
      "C": "Incorrect. Common distractor based on: Confusing the long payoff (S_T - F0) with the short payoff ("
    },
    "misconception": "Confusing the long payoff (S_T - F0) with the short payoff (F0 - S_T).",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Derivatives",
    "skill_domain": "Forward & Futures Contracts",
    "difficulty_tier": 2,
    "question_text": "During the life of a forward contract (at time t prior to expiration T), the value of an existing long forward contract V_t is calculated as:",
    "options": {
      "A": "V_t = S_t - F0 / (1 + r)^(T - t)",
      "B": "V_t = S_t - F0",
      "C": "V_t = F0 - S_t / (1 + r)^(T - t)"
    },
    "correct_option": "A",
    "explanation": "Value to the long at intermediate time t is the current spot price minus the present value of the agreed forward delivery price: V_t = S_t - F0 / (1 + r)^(T - t).",
    "distractor_analysis": {
      "A": "Correct. Value to the long at intermediate time t is the current spot price minus the pre",
      "B": "Incorrect. Common distractor based on: Failing to discount the forward delivery price F0 back to ti",
      "C": "Incorrect. Common distractor based on: Failing to discount the forward delivery price F0 back to ti"
    },
    "misconception": "Failing to discount the forward delivery price F0 back to time t.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Derivatives",
    "skill_domain": "Forward & Futures Contracts",
    "difficulty_tier": 2,
    "question_text": "If the market forward price F0 is higher than the theoretical no-arbitrage price [S0 * (1 + r)^T], an arbitrageur can earn a riskless profit by:",
    "options": {
      "A": "Borrowing at r, buying the spot asset S0, and selling the forward contract F0 (Cash-and-carry arbitrage)",
      "B": "Shorting the spot asset, lending proceeds at r, and buying the forward contract",
      "C": "Buying both the spot asset and the forward contract"
    },
    "correct_option": "A",
    "explanation": "If the forward is overpriced (F0 > theoretical), sell the overpriced forward contract and buy the physical asset funded by borrowing at r (cash-and-carry arbitrage).",
    "distractor_analysis": {
      "A": "Correct. If the forward is overpriced (F0 > theoretical), sell the overpriced forward con",
      "B": "Incorrect. Common distractor based on: Confusing cash-and-carry with reverse cash-and-carry arbitra",
      "C": "Incorrect. Common distractor based on: Confusing cash-and-carry with reverse cash-and-carry arbitra"
    },
    "misconception": "Confusing cash-and-carry with reverse cash-and-carry arbitrage.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Derivatives",
    "skill_domain": "Forward & Futures Contracts",
    "difficulty_tier": 2,
    "question_text": "The settlement price of an exchange-traded futures contract is:",
    "options": {
      "A": "An official price calculated by the exchange near the close of trading used for daily mark-to-market calculations",
      "B": "The price established on the very first trade of the trading day",
      "C": "The average price across all contracts traded over the past calendar month"
    },
    "correct_option": "A",
    "explanation": "The daily settlement price is determined by the exchange based on closing trade averages, serving as the benchmark price against which all open positions are marked-to-market daily.",
    "distractor_analysis": {
      "A": "Correct. The daily settlement price is determined by the exchange based on closing trade ",
      "B": "Incorrect. Common distractor based on: Confusing settlement price with opening price.",
      "C": "Incorrect. Common distractor based on: Confusing settlement price with opening price."
    },
    "misconception": "Confusing settlement price with opening price.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Derivatives",
    "skill_domain": "Forward & Futures Contracts",
    "difficulty_tier": 2,
    "question_text": "Forward Rate Agreements (FRAs) are OTC forward contracts where the underlying is:",
    "options": {
      "A": "A benchmark interest rate (such as SOFR or EURIBOR)",
      "B": "A physical agricultural commodity",
      "C": "A foreign currency exchange cross rate"
    },
    "correct_option": "A",
    "explanation": "An FRA is an interest rate forward contract where counterparties agree on an interest rate to be paid on a future notional loan starting at a future date (e.g. 3x9 FRA).",
    "distractor_analysis": {
      "A": "Correct. An FRA is an interest rate forward contract where counterparties agree on an int",
      "B": "Incorrect. Common distractor based on: Confusing FRAs with commodity forwards.",
      "C": "Incorrect. Common distractor based on: Confusing FRAs with commodity forwards."
    },
    "misconception": "Confusing FRAs with commodity forwards.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Derivatives",
    "skill_domain": "Forward & Futures Contracts",
    "difficulty_tier": 2,
    "question_text": "Contango in a futures market describes a condition where:",
    "options": {
      "A": "Futures prices are higher than current spot prices, resulting in a negative roll yield for long investors",
      "B": "Futures prices are lower than current spot prices",
      "C": "The futures basis is strictly positive and constant"
    },
    "correct_option": "A",
    "explanation": "Contango occurs when futures trade at a premium to spot prices (upward-sloping curve). Long futures investors roll expiring contracts by selling low and buying higher-priced deferred contracts, suffering negative roll yield.",
    "distractor_analysis": {
      "A": "Correct. Contango occurs when futures trade at a premium to spot prices (upward-sloping c",
      "B": "Incorrect. Common distractor based on: Confusing contango (futures > spot) with backwardation (futu",
      "C": "Incorrect. Common distractor based on: Confusing contango (futures > spot) with backwardation (futu"
    },
    "misconception": "Confusing contango (futures > spot) with backwardation (futures < spot).",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Derivatives",
    "skill_domain": "Forward & Futures Contracts",
    "difficulty_tier": 2,
    "question_text": "In backwardation, futures prices are below spot prices primarily because:",
    "options": {
      "A": "The convenience yield of holding physical inventory exceeds financing and storage costs",
      "B": "Storage costs are infinitely high",
      "C": "Interest rates are negative"
    },
    "correct_option": "A",
    "explanation": "When physical shortages occur, convenience yield surges above financing and storage costs, depressing forward and futures prices below spot (normal backwardation).",
    "distractor_analysis": {
      "A": "Correct. When physical shortages occur, convenience yield surges above financing and stor",
      "B": "Incorrect. Common distractor based on: Assuming backwardation is caused by high storage costs.",
      "C": "Incorrect. Common distractor based on: Assuming backwardation is caused by high storage costs."
    },
    "misconception": "Assuming backwardation is caused by high storage costs.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Derivatives",
    "skill_domain": "Option Basics",
    "difficulty_tier": 2,
    "question_text": "Put-Call Parity for European options on a non-dividend-paying stock establishes which fundamental relationship?",
    "options": {
      "A": "C + X / (1 + r)^T = P + S",
      "B": "C + P = S + X / (1 + r)^T",
      "C": "C - P = X / (1 + r)^T - S"
    },
    "correct_option": "A",
    "explanation": "Fiduciary Call (Call + Present Value of Strike X) replicates Protective Put (Put + Spot Stock S): C + X / (1 + r)^T = P + S.",
    "distractor_analysis": {
      "A": "Correct. Fiduciary Call (Call + Present Value of Strike X) replicates Protective Put (Put",
      "B": "Incorrect. Common distractor based on: Transposing terms incorrectly (e.g. adding S to call instead",
      "C": "Incorrect. Common distractor based on: Transposing terms incorrectly (e.g. adding S to call instead"
    },
    "misconception": "Transposing terms incorrectly (e.g. adding S to call instead of put).",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Derivatives",
    "skill_domain": "Option Basics",
    "difficulty_tier": 2,
    "question_text": "An investor purchases a European call option with strike price $50 for a premium of $4. If the stock price at expiration is $62, what is the net profit per share?",
    "options": {
      "A": "$8.00",
      "B": "$12.00",
      "C": "$4.00"
    },
    "correct_option": "A",
    "explanation": "Gross payoff at expiration = max(0, S_T - X) = max(0, 62 - 50) = $12. Net profit = Payoff - Premium = $12 - $4 = $8.00.",
    "distractor_analysis": {
      "A": "Correct. Gross payoff at expiration = max(0, S_T - X) = max(0, 62 - 50) = $12. Net profit",
      "B": "Incorrect. Common distractor based on: Reporting gross payoff ($12.00) without deducting the $4 opt",
      "C": "Incorrect. Common distractor based on: Reporting gross payoff ($12.00) without deducting the $4 opt"
    },
    "misconception": "Reporting gross payoff ($12.00) without deducting the $4 option premium paid.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Derivatives",
    "skill_domain": "Option Basics",
    "difficulty_tier": 2,
    "question_text": "What is the maximum potential loss for the seller (writer) of an uncovered (naked) call option?",
    "options": {
      "A": "Theoretically unlimited",
      "B": "Limited to the premium received",
      "C": "Limited to the strike price"
    },
    "correct_option": "A",
    "explanation": "Because a stock price can theoretically rise without limit, the writer of a naked call faces unlimited liability: as S_T increases, the obligation to deliver shares at strike X creates unlimited losses.",
    "distractor_analysis": {
      "A": "Correct. Because a stock price can theoretically rise without limit, the writer of a nake",
      "B": "Incorrect. Common distractor based on: Believing option writers can only lose the premium received.",
      "C": "Incorrect. Common distractor based on: Believing option writers can only lose the premium received."
    },
    "misconception": "Believing option writers can only lose the premium received.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Derivatives",
    "skill_domain": "Option Basics",
    "difficulty_tier": 2,
    "question_text": "An option is described as 'in-the-money' (ITM) when:",
    "options": {
      "A": "It would generate a positive payoff if exercised immediately based on current spot price",
      "B": "Its market price equals its strike price",
      "C": "Its time value is exactly zero"
    },
    "correct_option": "A",
    "explanation": "An option is in-the-money when exercising it produces positive intrinsic value: Call has S > X; Put has X > S.",
    "distractor_analysis": {
      "A": "Correct. An option is in-the-money when exercising it produces positive intrinsic value: ",
      "B": "Incorrect. Common distractor based on: Confusing in-the-money with at-the-money (S = X).",
      "C": "Incorrect. Common distractor based on: Confusing in-the-money with at-the-money (S = X)."
    },
    "misconception": "Confusing in-the-money with at-the-money (S = X).",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Derivatives",
    "skill_domain": "Option Basics",
    "difficulty_tier": 2,
    "question_text": "Which of the following factors causes the value of BOTH European call and put options to increase?",
    "options": {
      "A": "An increase in volatility of the underlying asset",
      "B": "An increase in the risk-free interest rate",
      "C": "A decrease in time to expiration"
    },
    "correct_option": "A",
    "explanation": "Higher volatility increases the dispersion of future asset prices, expanding the probability of deep in-the-money payoffs while downside losses remain truncated at zero. Thus volatility increases both call and put values.",
    "distractor_analysis": {
      "A": "Correct. Higher volatility increases the dispersion of future asset prices, expanding the",
      "B": "Incorrect. Common distractor based on: Assuming higher volatility hurts option holders.",
      "C": "Incorrect. Common distractor based on: Assuming higher volatility hurts option holders."
    },
    "misconception": "Assuming higher volatility hurts option holders.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Derivatives",
    "skill_domain": "Option Basics",
    "difficulty_tier": 2,
    "question_text": "An American-style option differs from a European-style option in that:",
    "options": {
      "A": "An American option can be exercised at any time prior to and including the expiration date",
      "B": "An American option can only be exercised on the final expiration day",
      "C": "American options are traded only in the United States"
    },
    "correct_option": "A",
    "explanation": "American options grant early exercise rights at any date up to maturity, making American options worth at least as much as (and often more than) identical European options.",
    "distractor_analysis": {
      "A": "Correct. American options grant early exercise rights at any date up to maturity, making ",
      "B": "Incorrect. Common distractor based on: Thinking the distinction is geographic rather than exercise ",
      "C": "Incorrect. Common distractor based on: Thinking the distinction is geographic rather than exercise "
    },
    "misconception": "Thinking the distinction is geographic rather than exercise flexibility.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Derivatives",
    "skill_domain": "Option Basics",
    "difficulty_tier": 2,
    "question_text": "A protective put strategy consists of:",
    "options": {
      "A": "Holding the underlying stock and buying a put option on that stock",
      "B": "Selling a put option and buying a call option",
      "C": "Buying a call option and holding risk-free cash"
    },
    "correct_option": "A",
    "explanation": "A protective put combines long stock with a long put option, establishing a price floor below which portfolio value cannot decline while preserving upside gains.",
    "distractor_analysis": {
      "A": "Correct. A protective put combines long stock with a long put option, establishing a pric",
      "B": "Incorrect. Common distractor based on: Confusing protective put with covered call.",
      "C": "Incorrect. Common distractor based on: Confusing protective put with covered call."
    },
    "misconception": "Confusing protective put with covered call.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Derivatives",
    "skill_domain": "Option Basics",
    "difficulty_tier": 2,
    "question_text": "A covered call investment strategy involves:",
    "options": {
      "A": "Owning the underlying stock and selling (writing) a call option against that stock position",
      "B": "Buying a call option and buying a put option at identical strikes",
      "C": "Selling short the stock and buying a call option"
    },
    "correct_option": "A",
    "explanation": "Covered call writes a call option against existing long equity shares, generating premium cash income while capping upside appreciation at the strike price.",
    "distractor_analysis": {
      "A": "Correct. Covered call writes a call option against existing long equity shares, generatin",
      "B": "Incorrect. Common distractor based on: Confusing covered call with protective put.",
      "C": "Incorrect. Common distractor based on: Confusing covered call with protective put."
    },
    "misconception": "Confusing covered call with protective put.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Derivatives",
    "skill_domain": "Option Basics",
    "difficulty_tier": 2,
    "question_text": "What is the intrinsic value of a put option with strike price $40 when the underlying stock trades at $33?",
    "options": {
      "A": "$7.00",
      "B": "$0.00",
      "C": "$33.00"
    },
    "correct_option": "A",
    "explanation": "Intrinsic value of a put = max(0, X - S) = max(0, 40 - 33) = $7.00.",
    "distractor_analysis": {
      "A": "Correct. Intrinsic value of a put = max(0, X - S) = max(0, 40 - 33) = $7.00.",
      "B": "Incorrect. Common distractor based on: Subtracting strike from stock (33 - 40 = negative, giving 0)",
      "C": "Incorrect. Common distractor based on: Subtracting strike from stock (33 - 40 = negative, giving 0)"
    },
    "misconception": "Subtracting strike from stock (33 - 40 = negative, giving 0).",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Derivatives",
    "skill_domain": "Option Basics",
    "difficulty_tier": 2,
    "question_text": "If stock price is $100, strike price is $100, risk-free rate is 5%, time to maturity is 1 year, and a 1-year European call trades at $10, what is the price of a 1-year European put at $100? (PV(100) = $95.24)",
    "options": {
      "A": "$5.24",
      "B": "$10.00",
      "C": "$14.76"
    },
    "correct_option": "A",
    "explanation": "By Put-Call Parity: P = C + X / (1 + r)^T - S = $10 + $95.24 - $100 = $105.24 - $100 = $5.24.",
    "distractor_analysis": {
      "A": "Correct. By Put-Call Parity: P = C + X / (1 + r)^T - S = $10 + $95.24 - $100 = $105.24 - ",
      "B": "Incorrect. Common distractor based on: Arithmetic errors in rearranging put-call parity.",
      "C": "Incorrect. Common distractor based on: Arithmetic errors in rearranging put-call parity."
    },
    "misconception": "Arithmetic errors in rearranging put-call parity.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Derivatives",
    "skill_domain": "Option Basics",
    "difficulty_tier": 2,
    "question_text": "An option's total market price (premium) is equal to:",
    "options": {
      "A": "Intrinsic Value + Time Value",
      "B": "Intrinsic Value - Time Value",
      "C": "Strike Price + Spot Price"
    },
    "correct_option": "A",
    "explanation": "Option Premium = Intrinsic Value (immediate exercise value) + Time Value (speculative volatility option value prior to maturity).",
    "distractor_analysis": {
      "A": "Correct. Option Premium = Intrinsic Value (immediate exercise value) + Time Value (specul",
      "B": "Incorrect. Common distractor based on: Subtracting time value from intrinsic value.",
      "C": "Incorrect. Common distractor based on: Subtracting time value from intrinsic value."
    },
    "misconception": "Subtracting time value from intrinsic value.",
    "time_estimate_seconds": 30
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Derivatives",
    "skill_domain": "Swaps",
    "difficulty_tier": 2,
    "question_text": "In a plain vanilla interest rate swap, the counterparties agree to exchange:",
    "options": {
      "A": "Fixed-rate interest payments for floating-rate interest payments based on a specified notional principal",
      "B": "Full principal amounts in different currencies at inception and maturity",
      "C": "Equity market capital gains for corporate bond coupon payments"
    },
    "correct_option": "A",
    "explanation": "A plain vanilla interest rate swap exchanges net interest cash flows between a fixed-rate payer and a floating-rate payer (e.g. SOFR) on a designated notional amount without exchanging principal.",
    "distractor_analysis": {
      "A": "Correct. A plain vanilla interest rate swap exchanges net interest cash flows between a f",
      "B": "Incorrect. Common distractor based on: Assuming principal amounts are exchanged in an interest rate",
      "C": "Incorrect. Common distractor based on: Assuming principal amounts are exchanged in an interest rate"
    },
    "misconception": "Assuming principal amounts are exchanged in an interest rate swap.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Derivatives",
    "skill_domain": "Swaps",
    "difficulty_tier": 2,
    "question_text": "How is the fixed swap rate in a newly initiated interest rate swap determined?",
    "options": {
      "A": "It is set such that the present value of the fixed payments equals the present value of expected floating payments (initial swap value = 0)",
      "B": "It is pegged to the central bank discount rate plus 200 bps",
      "C": "It is equal to the prevailing 10-year Treasury yield"
    },
    "correct_option": "A",
    "explanation": "At swap initiation, the fixed swap rate is calculated using no-arbitrage spot discount factors so that the market value of the swap to both parties is exactly zero.",
    "distractor_analysis": {
      "A": "Correct. At swap initiation, the fixed swap rate is calculated using no-arbitrage spot di",
      "B": "Incorrect. Common distractor based on: Assuming swaps have positive market value at initiation.",
      "C": "Incorrect. Common distractor based on: Assuming swaps have positive market value at initiation."
    },
    "misconception": "Assuming swaps have positive market value at initiation.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Derivatives",
    "skill_domain": "Swaps",
    "difficulty_tier": 2,
    "question_text": "In a currency swap, how do principal cash flows differ from an interest rate swap?",
    "options": {
      "A": "In a currency swap, principal amounts in two different currencies are typically exchanged at inception and re-exchanged at maturity",
      "B": "Currency swaps never exchange principal amounts",
      "C": "Currency swap principal is converted to gold at settlement"
    },
    "correct_option": "A",
    "explanation": "Unlike interest rate swaps (where notional principal is never exchanged), currency swaps involve exchanging principal amounts at inception at spot rate and re-exchanging at maturity, along with interest payments in respective currencies.",
    "distractor_analysis": {
      "A": "Correct. Unlike interest rate swaps (where notional principal is never exchanged), curren",
      "B": "Incorrect. Common distractor based on: Assuming currency swaps do not exchange principal.",
      "C": "Incorrect. Common distractor based on: Assuming currency swaps do not exchange principal."
    },
    "misconception": "Assuming currency swaps do not exchange principal.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Derivatives",
    "skill_domain": "Swaps",
    "difficulty_tier": 2,
    "question_text": "If market interest rates rise significantly after an interest rate swap is established, who benefits?",
    "options": {
      "A": "The fixed-rate payer (floating-rate receiver)",
      "B": "The floating-rate payer (fixed-rate receiver)",
      "C": "Both counterparties equally"
    },
    "correct_option": "A",
    "explanation": "The fixed-rate payer pays the pre-agreed lower fixed rate and receives the now higher floating rate, resulting in positive market value (gain). The fixed-rate receiver loses.",
    "distractor_analysis": {
      "A": "Correct. The fixed-rate payer pays the pre-agreed lower fixed rate and receives the now h",
      "B": "Incorrect. Common distractor based on: Thinking the fixed-rate receiver gains when interest rates r",
      "C": "Incorrect. Common distractor based on: Thinking the fixed-rate receiver gains when interest rates r"
    },
    "misconception": "Thinking the fixed-rate receiver gains when interest rates rise.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Derivatives",
    "skill_domain": "Swaps",
    "difficulty_tier": 2,
    "question_text": "An equity swap allows an asset manager to exchange:",
    "options": {
      "A": "The total return on an equity index for a floating interest rate payment (or another index return)",
      "B": "Physical stock certificates for corporate debentures",
      "C": "Call options for put options"
    },
    "correct_option": "A",
    "explanation": "In an equity swap, one leg pays the total return (capital gains plus dividends) on an equity index or basket, while the other leg pays a fixed or floating interest rate.",
    "distractor_analysis": {
      "A": "Correct. In an equity swap, one leg pays the total return (capital gains plus dividends) ",
      "B": "Incorrect. Common distractor based on: Confusing equity swaps with stock lending.",
      "C": "Incorrect. Common distractor based on: Confusing equity swaps with stock lending."
    },
    "misconception": "Confusing equity swaps with stock lending.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Derivatives",
    "skill_domain": "Swaps",
    "difficulty_tier": 2,
    "question_text": "Netting in an interest rate swap refers to:",
    "options": {
      "A": "Calculating the difference between the fixed and floating payments so only the net difference is transferred between counterparties",
      "B": "Deducting income taxes from swap cash flows",
      "C": "Eliminating swap transactions from corporate balance sheets"
    },
    "correct_option": "A",
    "explanation": "Payment netting simplifies settlement and reduces counterparty settlement credit risk: the party owing the larger cash flow simply pays the net difference to the other party.",
    "distractor_analysis": {
      "A": "Correct. Payment netting simplifies settlement and reduces counterparty settlement credit",
      "B": "Incorrect. Common distractor based on: Assuming gross payments are wired in both directions.",
      "C": "Incorrect. Common distractor based on: Assuming gross payments are wired in both directions."
    },
    "misconception": "Assuming gross payments are wired in both directions.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Derivatives",
    "skill_domain": "Swaps",
    "difficulty_tier": 2,
    "question_text": "A company with floating-rate bank debt enters into an interest rate swap paying fixed and receiving floating. The combined synthetic position results in:",
    "options": {
      "A": "Fixed-rate debt, hedging the firm against rising interest rates",
      "B": "Floating-rate debt with double leverage",
      "C": "Zero interest rate liability"
    },
    "correct_option": "A",
    "explanation": "The company pays floating to the bank, receives floating from the swap (canceling out floating risk), and pays fixed on the swap leg, converting its debt into a synthetic fixed-rate liability.",
    "distractor_analysis": {
      "A": "Correct. The company pays floating to the bank, receives floating from the swap (cancelin",
      "B": "Incorrect. Common distractor based on: Assuming the swap increases floating rate exposure.",
      "C": "Incorrect. Common distractor based on: Assuming the swap increases floating rate exposure."
    },
    "misconception": "Assuming the swap increases floating rate exposure.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Derivatives",
    "skill_domain": "Swaps",
    "difficulty_tier": 2,
    "question_text": "The swap spread is defined as the difference between:",
    "options": {
      "A": "The fixed rate on an interest rate swap and the yield of a benchmark government bond of matching maturity",
      "B": "The bid and ask rates quoted by the swap dealer",
      "C": "The fixed swap rate and 3-month SOFR"
    },
    "correct_option": "A",
    "explanation": "Swap Spread = Fixed Swap Rate - Benchmark Government Bond Yield. It reflects credit risk in the banking sector and supply/demand dynamics for interest rate hedging.",
    "distractor_analysis": {
      "A": "Correct. Swap Spread = Fixed Swap Rate - Benchmark Government Bond Yield. It reflects cre",
      "B": "Incorrect. Common distractor based on: Confusing swap spread with bid-ask dealer spreads.",
      "C": "Incorrect. Common distractor based on: Confusing swap spread with bid-ask dealer spreads."
    },
    "misconception": "Confusing swap spread with bid-ask dealer spreads.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Derivatives",
    "skill_domain": "Swaps",
    "difficulty_tier": 2,
    "question_text": "Over the life of an interest rate swap, as market rates fluctuate, the market value of the swap to each counterparty:",
    "options": {
      "A": "Deviates from zero, representing an asset for one party and an equal liability for the other",
      "B": "Remains permanently fixed at zero",
      "C": "Increases for both counterparties simultaneously"
    },
    "correct_option": "A",
    "explanation": "While initial value V0 = 0, subsequent shifts in benchmark interest rates cause future floating payments to diverge from fixed obligations, creating positive value (asset) for one party and negative value (liability) for the other.",
    "distractor_analysis": {
      "A": "Correct. While initial value V0 = 0, subsequent shifts in benchmark interest rates cause ",
      "B": "Incorrect. Common distractor based on: Thinking swap values remain zero throughout contract life.",
      "C": "Incorrect. Common distractor based on: Thinking swap values remain zero throughout contract life."
    },
    "misconception": "Thinking swap values remain zero throughout contract life.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Derivatives",
    "skill_domain": "Swaps",
    "difficulty_tier": 2,
    "question_text": "In a basis swap, counterparties exchange:",
    "options": {
      "A": "Two different floating reference rates (e.g. 1-month SOFR versus 3-month SOFR)",
      "B": "A fixed rate for a floating rate",
      "C": "Equity returns for corporate bond yields"
    },
    "correct_option": "A",
    "explanation": "A basis swap exchanges two floating rate benchmarks with different tenors or index references (e.g. 3-month SOFR vs 1-month SOFR), allowing institutions to manage basis risk.",
    "distractor_analysis": {
      "A": "Correct. A basis swap exchanges two floating rate benchmarks with different tenors or ind",
      "B": "Incorrect. Common distractor based on: Confusing basis swap with plain vanilla fixed-for-floating s",
      "C": "Incorrect. Common distractor based on: Confusing basis swap with plain vanilla fixed-for-floating s"
    },
    "misconception": "Confusing basis swap with plain vanilla fixed-for-floating swap.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Derivatives",
    "skill_domain": "Swaps",
    "difficulty_tier": 2,
    "question_text": "A swaption is an option that grants the holder the right to:",
    "options": {
      "A": "Enter into an underlying interest rate swap on pre-agreed terms at a future date",
      "B": "Immediately cancel an existing bond issuance",
      "C": "Convert a corporate bond into common shares"
    },
    "correct_option": "A",
    "explanation": "A swaption (swap option) is an option to enter into an interest rate swap: a payer swaption gives the right to pay fixed; a receiver swaption gives the right to receive fixed.",
    "distractor_analysis": {
      "A": "Correct. A swaption (swap option) is an option to enter into an interest rate swap: a pay",
      "B": "Incorrect. Common distractor based on: Confusing swaptions with convertible bonds.",
      "C": "Incorrect. Common distractor based on: Confusing swaptions with convertible bonds."
    },
    "misconception": "Confusing swaptions with convertible bonds.",
    "time_estimate_seconds": 35
  }
];
