// Path: lib/data/banks/cfa/equity.ts
import type { SeedQuestion } from "../../question-bank-seed";

export const CFA_EQUITY_QUESTIONS: SeedQuestion[] = [
  {
    "exam_name": "CFA Level 1",
    "subject": "Equity Investments",
    "skill_domain": "Market Organization & Structure",
    "difficulty_tier": 2,
    "question_text": "An investor buys a stock on margin at $50 per share with an initial margin requirement of 50% and maintenance margin of 30%. At what price will the investor receive a margin call?",
    "options": {
      "A": "$35.71",
      "B": "$40.00",
      "C": "$25.00",
      "D": "$30.00"
    },
    "correct_option": "A",
    "explanation": "Margin call price P = P0 * (1 - Initial Margin) / (1 - Maintenance Margin) = $50 * (1 - 0.50) / (1 - 0.30) = $50 * (0.50 / 0.70) = $25 / 0.70 = $35.71.",
    "distractor_analysis": {
      "A": "Correct. Margin call price P = P0 * (1 - Initial Margin) / (1 - Maintenance Margin) = $50",
      "B": "Incorrect. Common distractor based on: Applying maintenance margin directly to initial price ($35.0",
      "C": "Incorrect. Common distractor based on: Applying maintenance margin directly to initial price ($35.0",
      "D": "Incorrect. Common distractor based on: Applying maintenance margin directly to initial price ($35.0"
    },
    "misconception": "Applying maintenance margin directly to initial price ($35.00) or miscalculating borrowed debt.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Equity Investments",
    "skill_domain": "Market Organization & Structure",
    "difficulty_tier": 2,
    "question_text": "Which order type is placed to buy a stock above the current market price once a specified trigger price is reached, typically used to limit losses on a short position?",
    "options": {
      "A": "Stop-buy order",
      "B": "Limit-buy order",
      "C": "Market-on-close order",
      "D": "Good-til-canceled limit order"
    },
    "correct_option": "A",
    "explanation": "A stop-buy order becomes an active market buy order only when the market price rises to or above the specified stop trigger price, commonly used to protect short sellers against runaway price surges.",
    "distractor_analysis": {
      "A": "Correct. A stop-buy order becomes an active market buy order only when the market price r",
      "B": "Incorrect. Common distractor based on: Confusing stop-buy orders with limit-buy orders (which execu",
      "C": "Incorrect. Common distractor based on: Confusing stop-buy orders with limit-buy orders (which execu",
      "D": "Incorrect. Common distractor based on: Confusing stop-buy orders with limit-buy orders (which execu"
    },
    "misconception": "Confusing stop-buy orders with limit-buy orders (which execute at or below specified price).",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Equity Investments",
    "skill_domain": "Market Organization & Structure",
    "difficulty_tier": 2,
    "question_text": "In a quote-driven (dealer) financial market:",
    "options": {
      "A": "Dealers provide continuous liquidity by quoting two-sided bid and ask prices from their own proprietary inventory",
      "B": "Orders from buyers and sellers are matched directly using an electronic order book without intermediaries",
      "C": "Brokers locate buyers and sellers through custom private bilateral auctions",
      "D": "All trades clear at a single batch auction price once per day"
    },
    "correct_option": "A",
    "explanation": "In quote-driven markets (over-the-counter and dealer bond markets), dealers maintain inventory and post bid-ask quotes, earning the spread for supplying liquidity. Order-driven markets match trader orders directly.",
    "distractor_analysis": {
      "A": "Correct. In quote-driven markets (over-the-counter and dealer bond markets), dealers main",
      "B": "Incorrect. Common distractor based on: Confusing quote-driven markets with order-driven auction mar",
      "C": "Incorrect. Common distractor based on: Confusing quote-driven markets with order-driven auction mar",
      "D": "Incorrect. Common distractor based on: Confusing quote-driven markets with order-driven auction mar"
    },
    "misconception": "Confusing quote-driven markets with order-driven auction markets.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Equity Investments",
    "skill_domain": "Market Organization & Structure",
    "difficulty_tier": 2,
    "question_text": "In an initial public offering (IPO), an underwriting syndicate that agrees to purchase the entire issuance from the issuer and resell to public investors operates under a:",
    "options": {
      "A": "Firm commitment underwriting agreement",
      "B": "Best-efforts offering",
      "C": "Private placement exemption",
      "D": "Rights offering"
    },
    "correct_option": "A",
    "explanation": "Under firm commitment underwriting, the investment bank syndicate buys the entire issue at a negotiated discount, absorbing all unsold inventory price risk. In best-efforts offerings, the underwriter acts merely as an agent.",
    "distractor_analysis": {
      "A": "Correct. Under firm commitment underwriting, the investment bank syndicate buys the entir",
      "B": "Incorrect. Common distractor based on: Confusing firm commitment with best efforts.",
      "C": "Incorrect. Common distractor based on: Confusing firm commitment with best efforts.",
      "D": "Incorrect. Common distractor based on: Confusing firm commitment with best efforts."
    },
    "misconception": "Confusing firm commitment with best efforts.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Equity Investments",
    "skill_domain": "Market Organization & Structure",
    "difficulty_tier": 2,
    "question_text": "A short seller of equity shares must:",
    "options": {
      "A": "Borrow the shares, sell them in the open market, and pay any declared dividends to the stock lender until the position is closed",
      "B": "Purchase call options with zero cash collateral",
      "C": "Hold the short position for a mandatory minimum holding period of 12 months",
      "D": "Retain the physical share certificates in an escrow account"
    },
    "correct_option": "A",
    "explanation": "Short selling involves borrowing securities from a lender, selling them, and assuming the obligation to return the borrowed shares in the future while reimbursing the lender for any dividends declared during the loan period.",
    "distractor_analysis": {
      "A": "Correct. Short selling involves borrowing securities from a lender, selling them, and ass",
      "B": "Incorrect. Common distractor based on: Thinking short sellers receive dividends rather than paying ",
      "C": "Incorrect. Common distractor based on: Thinking short sellers receive dividends rather than paying ",
      "D": "Incorrect. Common distractor based on: Thinking short sellers receive dividends rather than paying "
    },
    "misconception": "Thinking short sellers receive dividends rather than paying them to the lender.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Equity Investments",
    "skill_domain": "Market Organization & Structure",
    "difficulty_tier": 2,
    "question_text": "What function do financial intermediaries known as clearinghouses perform in securities trading?",
    "options": {
      "A": "They act as the central counterparty to both sides of every cleared trade, mitigating bilateral counterparty credit risk",
      "B": "They set statutory tax rates on capital gains",
      "C": "They determine the quarterly earnings reports of listed public corporations",
      "D": "They provide fundamental equity research reports to retail investors"
    },
    "correct_option": "A",
    "explanation": "Clearinghouses novate trades, becoming the buyer to every seller and seller to every buyer, guaranteeing trade settlement and managing margin collateral to eliminate counterparty failure risk.",
    "distractor_analysis": {
      "A": "Correct. Clearinghouses novate trades, becoming the buyer to every seller and seller to e",
      "B": "Incorrect. Common distractor based on: Confusing clearinghouses with fundamental research analysts.",
      "C": "Incorrect. Common distractor based on: Confusing clearinghouses with fundamental research analysts.",
      "D": "Incorrect. Common distractor based on: Confusing clearinghouses with fundamental research analysts."
    },
    "misconception": "Confusing clearinghouses with fundamental research analysts.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Equity Investments",
    "skill_domain": "Market Organization & Structure",
    "difficulty_tier": 2,
    "question_text": "Which financial market execution mechanism operates by organizing continuous electronic order books matching bids and offers based on price-time priority?",
    "options": {
      "A": "Order-driven market",
      "B": "Quote-driven dealer market",
      "C": "Brokered market",
      "D": "Direct search market"
    },
    "correct_option": "A",
    "explanation": "Order-driven markets (such as modern major equity exchanges) match client buy and sell orders based on transparent standardized rules prioritizing best price and earliest timestamp.",
    "distractor_analysis": {
      "A": "Correct. Order-driven markets (such as modern major equity exchanges) match client buy an",
      "B": "Incorrect. Common distractor based on: Confusing order-driven systems with quote-driven dealer netw",
      "C": "Incorrect. Common distractor based on: Confusing order-driven systems with quote-driven dealer netw",
      "D": "Incorrect. Common distractor based on: Confusing order-driven systems with quote-driven dealer netw"
    },
    "misconception": "Confusing order-driven systems with quote-driven dealer networks.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Equity Investments",
    "skill_domain": "Market Organization & Structure",
    "difficulty_tier": 2,
    "question_text": "Leverage ratio in a margin transaction where an investor posts 40% initial equity margin is:",
    "options": {
      "A": "2.50",
      "B": "1.40",
      "C": "0.40",
      "D": "0.60"
    },
    "correct_option": "A",
    "explanation": "Leverage ratio = Total Asset Value / Equity Investment = 1 / Initial Margin % = 1 / 0.40 = 2.50.",
    "distractor_analysis": {
      "A": "Correct. Leverage ratio = Total Asset Value / Equity Investment = 1 / Initial Margin % = ",
      "B": "Incorrect. Common distractor based on: Using debt-to-equity ratio instead of total assets to equity",
      "C": "Incorrect. Common distractor based on: Using debt-to-equity ratio instead of total assets to equity",
      "D": "Incorrect. Common distractor based on: Using debt-to-equity ratio instead of total assets to equity"
    },
    "misconception": "Using debt-to-equity ratio instead of total assets to equity.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Equity Investments",
    "skill_domain": "Market Organization & Structure",
    "difficulty_tier": 2,
    "question_text": "A limit order to sell 500 shares at $65 when the current market bid-ask is $64.50 - $64.80 will:",
    "options": {
      "A": "Remain unexecuted on the order book until market price rises to at least $65",
      "B": "Execute immediately at the current market ask price of $64.80",
      "C": "Be rejected by the exchange matching engine",
      "D": "Execute immediately at the current market bid price of $64.50"
    },
    "correct_option": "A",
    "explanation": "A limit order to sell sets a minimum acceptable price ($65). Because current market bid is below $65, the order rests in the order book waiting for buyers willing to pay $65 or higher.",
    "distractor_analysis": {
      "A": "Correct. A limit order to sell sets a minimum acceptable price ($65). Because current mar",
      "B": "Incorrect. Common distractor based on: Assuming limit sell orders execute below the specified limit",
      "C": "Incorrect. Common distractor based on: Assuming limit sell orders execute below the specified limit",
      "D": "Incorrect. Common distractor based on: Assuming limit sell orders execute below the specified limit"
    },
    "misconception": "Assuming limit sell orders execute below the specified limit price.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Equity Investments",
    "skill_domain": "Market Organization & Structure",
    "difficulty_tier": 2,
    "question_text": "Which market asset classification consists of assets that derive their cash flows directly from claims on real physical assets or real business operations?",
    "options": {
      "A": "Financial assets (equity and debt)",
      "B": "Real assets (real estate, land, infrastructure)",
      "C": "Derivative instruments",
      "D": "Commodity futures"
    },
    "correct_option": "A",
    "explanation": "Financial assets represent legal contractual claims to future cash flows produced by real assets. Real assets are tangible physical assets (land, machinery, real estate).",
    "distractor_analysis": {
      "A": "Correct. Financial assets represent legal contractual claims to future cash flows produce",
      "B": "Incorrect. Common distractor based on: Confusing real physical assets with financial asset contract",
      "C": "Incorrect. Common distractor based on: Confusing real physical assets with financial asset contract",
      "D": "Incorrect. Common distractor based on: Confusing real physical assets with financial asset contract"
    },
    "misconception": "Confusing real physical assets with financial asset contracts.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Equity Investments",
    "skill_domain": "Market Organization & Structure",
    "difficulty_tier": 2,
    "question_text": "In a primary market transaction, the proceeds from the sale of securities flow to:",
    "options": {
      "A": "The issuing corporation or government entity",
      "B": "Existing secondary market public investors",
      "C": "The clearinghouse guarantee fund",
      "D": "The securities exchange operating company"
    },
    "correct_option": "A",
    "explanation": "Primary market transactions involve the original creation and issuance of securities where capital flows directly from investors to the issuing corporate or sovereign entity.",
    "distractor_analysis": {
      "A": "Correct. Primary market transactions involve the original creation and issuance of securi",
      "B": "Incorrect. Common distractor based on: Confusing primary market capital raising with secondary mark",
      "C": "Incorrect. Common distractor based on: Confusing primary market capital raising with secondary mark",
      "D": "Incorrect. Common distractor based on: Confusing primary market capital raising with secondary mark"
    },
    "misconception": "Confusing primary market capital raising with secondary market trading between investors.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Equity Investments",
    "skill_domain": "Security Market Indexes",
    "difficulty_tier": 2,
    "question_text": "In a price-weighted index (such as the Dow Jones Industrial Average), how does a 2-for-1 stock split of a constituent stock affect the index calculation?",
    "options": {
      "A": "The divisor must be adjusted downward so the index level remains unaffected by the split",
      "B": "The index level drops by 50% automatically",
      "C": "The constituent stock is immediately removed from the index",
      "D": "All other constituent stock prices are doubled"
    },
    "correct_option": "A",
    "explanation": "A price-weighted index divides the sum of constituent share prices by a divisor. When a stock splits, its price halves, so the divisor must be reduced to maintain index continuity.",
    "distractor_analysis": {
      "A": "Correct. A price-weighted index divides the sum of constituent share prices by a divisor.",
      "B": "Incorrect. Common distractor based on: Thinking a stock split causes the entire index level to plun",
      "C": "Incorrect. Common distractor based on: Thinking a stock split causes the entire index level to plun",
      "D": "Incorrect. Common distractor based on: Thinking a stock split causes the entire index level to plun"
    },
    "misconception": "Thinking a stock split causes the entire index level to plunge.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Equity Investments",
    "skill_domain": "Security Market Indexes",
    "difficulty_tier": 2,
    "question_text": "A major criticism of market-capitalization-weighted indexes (such as the S&P 500) is that they:",
    "options": {
      "A": "Overweight overvalued stocks whose prices have risen and underweight undervalued stocks",
      "B": "Require frequent costly rebalancing to maintain equal weights across stocks",
      "C": "Are biased toward small-cap illiquid stocks",
      "D": "Require manual divisor adjustments whenever dividends are paid"
    },
    "correct_option": "A",
    "explanation": "Market-cap weighting allocates higher weights to companies whose share prices have appreciated most, reinforcing momentum and potentially over-allocating capital to overvalued bubble stocks.",
    "distractor_analysis": {
      "A": "Correct. Market-cap weighting allocates higher weights to companies whose share prices ha",
      "B": "Incorrect. Common distractor based on: Believing market-cap indexes require frequent trading rebala",
      "C": "Incorrect. Common distractor based on: Believing market-cap indexes require frequent trading rebala",
      "D": "Incorrect. Common distractor based on: Believing market-cap indexes require frequent trading rebala"
    },
    "misconception": "Believing market-cap indexes require frequent trading rebalancing (they are inherently self-rebalancing).",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Equity Investments",
    "skill_domain": "Security Market Indexes",
    "difficulty_tier": 2,
    "question_text": "In an equal-weighted index, maintaining equal constituent weightings requires:",
    "options": {
      "A": "Periodic rebalancing by selling outperforming stocks and buying underperforming stocks",
      "B": "Zero portfolio trading turnover across time",
      "C": "Adjusting the index divisor whenever market capitalization changes",
      "D": "Giving greater weight to high-dividend-yield stocks"
    },
    "correct_option": "A",
    "explanation": "As stock prices move, higher-returning stocks become overweighted and lagging stocks underweighted. To restore equal weighting, managers must systematically trim winners and buy losers (contrarian rebalancing).",
    "distractor_analysis": {
      "A": "Correct. As stock prices move, higher-returning stocks become overweighted and lagging st",
      "B": "Incorrect. Common distractor based on: Assuming equal-weighted indexes require zero rebalancing tur",
      "C": "Incorrect. Common distractor based on: Assuming equal-weighted indexes require zero rebalancing tur",
      "D": "Incorrect. Common distractor based on: Assuming equal-weighted indexes require zero rebalancing tur"
    },
    "misconception": "Assuming equal-weighted indexes require zero rebalancing turnover.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Equity Investments",
    "skill_domain": "Security Market Indexes",
    "difficulty_tier": 2,
    "question_text": "What is a float-adjusted market-capitalization-weighted index?",
    "options": {
      "A": "An index that weights constituents based only on shares available for public purchase, excluding locked-in insider and government stakes",
      "B": "An index that adjusts stock prices for daily floating interest rates",
      "C": "An index that weights shares by foreign currency exchange rate fluctuations",
      "D": "An index that holds equal shares of all listed equities"
    },
    "correct_option": "A",
    "explanation": "Float adjustment excludes restricted shares (held by founders, governments, or strategic corporate parents), weighting each company by shares actually tradeable by the public.",
    "distractor_analysis": {
      "A": "Correct. Float adjustment excludes restricted shares (held by founders, governments, or s",
      "B": "Incorrect. Common distractor based on: Confusing float-adjusted index with floating-rate debt instr",
      "C": "Incorrect. Common distractor based on: Confusing float-adjusted index with floating-rate debt instr",
      "D": "Incorrect. Common distractor based on: Confusing float-adjusted index with floating-rate debt instr"
    },
    "misconception": "Confusing float-adjusted index with floating-rate debt instruments.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Equity Investments",
    "skill_domain": "Security Market Indexes",
    "difficulty_tier": 2,
    "question_text": "Which of the following is an example of a fundamental-weighted index?",
    "options": {
      "A": "An index where constituents are weighted by cash dividends, book value, or operating cash flows",
      "B": "An index weighted by constituent share prices divided by a divisor",
      "C": "An index weighted strictly by total outstanding common shares",
      "D": "An index tracking only government treasury bills"
    },
    "correct_option": "A",
    "explanation": "Fundamental weighting allocates weights based on corporate financial metrics (dividends, earnings, revenues, book value) rather than market prices, introducing a value tilt.",
    "distractor_analysis": {
      "A": "Correct. Fundamental weighting allocates weights based on corporate financial metrics (di",
      "B": "Incorrect. Common distractor based on: Confusing fundamental weighting with market-cap weighting.",
      "C": "Incorrect. Common distractor based on: Confusing fundamental weighting with market-cap weighting.",
      "D": "Incorrect. Common distractor based on: Confusing fundamental weighting with market-cap weighting."
    },
    "misconception": "Confusing fundamental weighting with market-cap weighting.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Equity Investments",
    "skill_domain": "Security Market Indexes",
    "difficulty_tier": 2,
    "question_text": "A fixed-income index is generally more difficult to replicate than an equity index because:",
    "options": {
      "A": "The universe of bonds is vastly larger and many individual bond issues trade infrequently in illiquid OTC markets",
      "B": "Bond coupons cannot be converted to cash",
      "C": "Bonds do not have maturity dates",
      "D": "All bonds must trade on centralized public electronic exchanges"
    },
    "correct_option": "A",
    "explanation": "Corporations often have dozens of distinct bond issues, and most trade by appointment in illiquid dealer markets with high bid-ask spreads, making exact index replication impractical.",
    "distractor_analysis": {
      "A": "Correct. Corporations often have dozens of distinct bond issues, and most trade by appoin",
      "B": "Incorrect. Common distractor based on: Assuming bond markets are more liquid and centralized than e",
      "C": "Incorrect. Common distractor based on: Assuming bond markets are more liquid and centralized than e",
      "D": "Incorrect. Common distractor based on: Assuming bond markets are more liquid and centralized than e"
    },
    "misconception": "Assuming bond markets are more liquid and centralized than equity markets.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Equity Investments",
    "skill_domain": "Security Market Indexes",
    "difficulty_tier": 2,
    "question_text": "What does index reconstitution refer to?",
    "options": {
      "A": "The periodic addition and deletion of constituent securities to ensure the index accurately reflects its target market",
      "B": "Adjusting constituent weightings to restore target allocations after price moves",
      "C": "Recalculating historical returns after an accounting scandal",
      "D": "Converting a price-weighted index into a market-cap index"
    },
    "correct_option": "A",
    "explanation": "Reconstitution is the process of updating the member list of the index (adding qualifying companies and removing those that fail market cap or liquidity criteria). Rebalancing adjusts weights.",
    "distractor_analysis": {
      "A": "Correct. Reconstitution is the process of updating the member list of the index (adding q",
      "B": "Incorrect. Common distractor based on: Confusing reconstitution (changing constituents) with rebala",
      "C": "Incorrect. Common distractor based on: Confusing reconstitution (changing constituents) with rebala",
      "D": "Incorrect. Common distractor based on: Confusing reconstitution (changing constituents) with rebala"
    },
    "misconception": "Confusing reconstitution (changing constituents) with rebalancing (adjusting weights).",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Equity Investments",
    "skill_domain": "Security Market Indexes",
    "difficulty_tier": 2,
    "question_text": "How does a total return index differ from a price return index?",
    "options": {
      "A": "A total return index reflects both capital appreciation and the reinvestment of cash dividends",
      "B": "A total return index measures only price changes and excludes dividends",
      "C": "A total return index deducts inflation from capital gains",
      "D": "A total return index incorporates portfolio management fees"
    },
    "correct_option": "A",
    "explanation": "Price return indexes track only changes in security prices. Total return indexes assume that all cash distributions (dividends, interest) are fully reinvested into the index.",
    "distractor_analysis": {
      "A": "Correct. Price return indexes track only changes in security prices. Total return indexes",
      "B": "Incorrect. Common distractor based on: Confusing total return with price return.",
      "C": "Incorrect. Common distractor based on: Confusing total return with price return.",
      "D": "Incorrect. Common distractor based on: Confusing total return with price return."
    },
    "misconception": "Confusing total return with price return.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Equity Investments",
    "skill_domain": "Security Market Indexes",
    "difficulty_tier": 2,
    "question_text": "Commodity indexes typically track commodity futures contracts rather than physical spot commodities because:",
    "options": {
      "A": "Holding physical commodities entails substantial storage, insurance, and transportation costs",
      "B": "Futures contracts are exempt from market volatility",
      "C": "Physical commodities cannot be legally owned by institutions",
      "D": "Futures contracts eliminate all contango and backwardation"
    },
    "correct_option": "A",
    "explanation": "Investing in physical barrels of crude oil or bushels of wheat involves prohibitive storage and spoilage costs, making liquid exchange-traded futures the standard vehicle for commodity indexing.",
    "distractor_analysis": {
      "A": "Correct. Investing in physical barrels of crude oil or bushels of wheat involves prohibit",
      "B": "Incorrect. Common distractor based on: Thinking institutional funds warehouse physical commodities ",
      "C": "Incorrect. Common distractor based on: Thinking institutional funds warehouse physical commodities ",
      "D": "Incorrect. Common distractor based on: Thinking institutional funds warehouse physical commodities "
    },
    "misconception": "Thinking institutional funds warehouse physical commodities for index tracking.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Equity Investments",
    "skill_domain": "Security Market Indexes",
    "difficulty_tier": 2,
    "question_text": "In a price-weighted index with 3 stocks priced at $10, $20, and $60, a 10% price increase in the $60 stock will affect the index:",
    "options": {
      "A": "Six times more than a 10% increase in the $10 stock",
      "B": "Identically to a 10% increase in the $10 stock",
      "C": "Three times less than a 10% increase in the $20 stock",
      "D": "In proportion to each company's total market capitalization"
    },
    "correct_option": "A",
    "explanation": "In a price-weighted index, higher-priced stocks have proportionally larger influence. A 10% rise in the $60 stock represents a $6 move, which affects the index 6x more than a $1 move in the $10 stock.",
    "distractor_analysis": {
      "A": "Correct. In a price-weighted index, higher-priced stocks have proportionally larger influ",
      "B": "Incorrect. Common distractor based on: Assuming price-weighted indexes weight percentage changes eq",
      "C": "Incorrect. Common distractor based on: Assuming price-weighted indexes weight percentage changes eq",
      "D": "Incorrect. Common distractor based on: Assuming price-weighted indexes weight percentage changes eq"
    },
    "misconception": "Assuming price-weighted indexes weight percentage changes equally.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Equity Investments",
    "skill_domain": "Security Market Indexes",
    "difficulty_tier": 2,
    "question_text": "Security market indexes serve multiple uses in investment management, including:",
    "options": {
      "A": "Acting as asset allocation benchmarks, measuring systematic risk (beta), and serving as underlying for index funds and ETFs",
      "B": "Guaranteeing minimum annual returns for private wealth clients",
      "C": "Eliminating trading fees for broker-dealers",
      "D": "Providing audited corporate financial statements"
    },
    "correct_option": "A",
    "explanation": "Indexes serve as performance benchmarks for active managers, model inputs for estimating systematic risk, proxies for asset class returns, and underlying assets for passive ETFs.",
    "distractor_analysis": {
      "A": "Correct. Indexes serve as performance benchmarks for active managers, model inputs for es",
      "B": "Incorrect. Common distractor based on: Assuming indexes provide return guarantees.",
      "C": "Incorrect. Common distractor based on: Assuming indexes provide return guarantees.",
      "D": "Incorrect. Common distractor based on: Assuming indexes provide return guarantees."
    },
    "misconception": "Assuming indexes provide return guarantees.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Equity Investments",
    "skill_domain": "Market Efficiency",
    "difficulty_tier": 2,
    "question_text": "According to the Efficient Market Hypothesis (EMH), in a weak-form efficient market, an investor cannot achieve abnormal risk-adjusted returns by analyzing:",
    "options": {
      "A": "Historical market trading volume and past price data (technical analysis)",
      "B": "Public corporate earnings releases and financial statements",
      "C": "Corporate insider trading disclosures",
      "D": "Patents filed with government authorities"
    },
    "correct_option": "A",
    "explanation": "Weak-form EMH states that past prices and volume information are already fully incorporated into current market prices; hence technical analysis cannot yield abnormal alpha.",
    "distractor_analysis": {
      "A": "Correct. Weak-form EMH states that past prices and volume information are already fully i",
      "B": "Incorrect. Common distractor based on: Assuming weak-form efficiency renders fundamental analysis u",
      "C": "Incorrect. Common distractor based on: Assuming weak-form efficiency renders fundamental analysis u",
      "D": "Incorrect. Common distractor based on: Assuming weak-form efficiency renders fundamental analysis u"
    },
    "misconception": "Assuming weak-form efficiency renders fundamental analysis useless (that is semi-strong).",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Equity Investments",
    "skill_domain": "Market Efficiency",
    "difficulty_tier": 2,
    "question_text": "If a market is semi-strong-form efficient, which investment strategy will be unable to consistently generate abnormal risk-adjusted returns?",
    "options": {
      "A": "Fundamental analysis of publicly available financial statements and economic news",
      "B": "Insider trading based on nonpublic merger discussions",
      "C": "Holding a broad, low-cost passive index fund",
      "D": "Investing in risk-free sovereign debt"
    },
    "correct_option": "A",
    "explanation": "Semi-strong efficiency asserts that all publicly available information is instantaneously reflected in security prices. Therefore, neither technical analysis nor fundamental analysis can generate abnormal returns.",
    "distractor_analysis": {
      "A": "Correct. Semi-strong efficiency asserts that all publicly available information is instan",
      "B": "Incorrect. Common distractor based on: Thinking insider trading is ineffective in semi-strong marke",
      "C": "Incorrect. Common distractor based on: Thinking insider trading is ineffective in semi-strong marke",
      "D": "Incorrect. Common distractor based on: Thinking insider trading is ineffective in semi-strong marke"
    },
    "misconception": "Thinking insider trading is ineffective in semi-strong markets (it only becomes ineffective under strong-form).",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Equity Investments",
    "skill_domain": "Market Efficiency",
    "difficulty_tier": 2,
    "question_text": "Under strong-form market efficiency, security prices reflect:",
    "options": {
      "A": "All information, including both publicly available and private insider information",
      "B": "Only historical trading price patterns",
      "C": "Publicly available financial reporting statements only",
      "D": "Corporate dividend forecasts only"
    },
    "correct_option": "A",
    "explanation": "Strong-form EMH states that prices reflect all information from all sources, public and private. In a strong-form efficient market, even corporate insiders cannot generate abnormal profits.",
    "distractor_analysis": {
      "A": "Correct. Strong-form EMH states that prices reflect all information from all sources, pub",
      "B": "Incorrect. Common distractor based on: Confusing strong-form with semi-strong-form efficiency.",
      "C": "Incorrect. Common distractor based on: Confusing strong-form with semi-strong-form efficiency.",
      "D": "Incorrect. Common distractor based on: Confusing strong-form with semi-strong-form efficiency."
    },
    "misconception": "Confusing strong-form with semi-strong-form efficiency.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Equity Investments",
    "skill_domain": "Market Efficiency",
    "difficulty_tier": 2,
    "question_text": "The 'January Effect' is an empirical market anomaly characterized by:",
    "options": {
      "A": "Small-cap stocks historically generating abnormal positive returns during the first few trading days of January",
      "B": "Large-cap stocks consistently outperforming small-cap stocks throughout winter",
      "C": "Bond yields declining to zero every January",
      "D": "Corporate executives selling personal shares in early January"
    },
    "correct_option": "A",
    "explanation": "The January Effect refers to the persistent empirical tendency for small-cap equities to outperform in January, frequently attributed to year-end tax-loss selling followed by reinvestment in early January.",
    "distractor_analysis": {
      "A": "Correct. The January Effect refers to the persistent empirical tendency for small-cap equ",
      "B": "Incorrect. Common distractor based on: Confusing the January effect with large-cap outperformance.",
      "C": "Incorrect. Common distractor based on: Confusing the January effect with large-cap outperformance.",
      "D": "Incorrect. Common distractor based on: Confusing the January effect with large-cap outperformance."
    },
    "misconception": "Confusing the January effect with large-cap outperformance.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Equity Investments",
    "skill_domain": "Market Efficiency",
    "difficulty_tier": 2,
    "question_text": "Which market anomaly contradicts semi-strong-form market efficiency by showing that stock prices take weeks to fully adjust to earnings surprises?",
    "options": {
      "A": "Post-Earnings Announcement Drift (PEAD)",
      "B": "The size effect",
      "C": "The weekend effect",
      "D": "The value premium"
    },
    "correct_option": "A",
    "explanation": "PEAD shows that firms reporting significant positive (or negative) quarterly earnings surprises experience continued price drift in the same direction for weeks, violating instantaneous semi-strong adjustment.",
    "distractor_analysis": {
      "A": "Correct. PEAD shows that firms reporting significant positive (or negative) quarterly ear",
      "B": "Incorrect. Common distractor based on: Confusing PEAD with the weekend effect.",
      "C": "Incorrect. Common distractor based on: Confusing PEAD with the weekend effect.",
      "D": "Incorrect. Common distractor based on: Confusing PEAD with the weekend effect."
    },
    "misconception": "Confusing PEAD with the weekend effect.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Equity Investments",
    "skill_domain": "Market Efficiency",
    "difficulty_tier": 2,
    "question_text": "Behavioral finance suggests that market pricing anomalies persist primarily because of:",
    "options": {
      "A": "Cognitive human biases and structural limits to arbitrage",
      "B": "Lack of computing power on electronic exchanges",
      "C": "Statutory limits on stock ownership",
      "D": "Government price controls on listed equities"
    },
    "correct_option": "A",
    "explanation": "Behavioral finance argues that investor cognitive biases (overconfidence, loss aversion) create mispricings, while real-world limits to arbitrage (short-sale costs, liquidity risk) prevent rational capital from immediately eliminating them.",
    "distractor_analysis": {
      "A": "Correct. Behavioral finance argues that investor cognitive biases (overconfidence, loss a",
      "B": "Incorrect. Common distractor based on: Assuming mispricings persist due to slow internet speeds.",
      "C": "Incorrect. Common distractor based on: Assuming mispricings persist due to slow internet speeds.",
      "D": "Incorrect. Common distractor based on: Assuming mispricings persist due to slow internet speeds."
    },
    "misconception": "Assuming mispricings persist due to slow internet speeds.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Equity Investments",
    "skill_domain": "Market Efficiency",
    "difficulty_tier": 2,
    "question_text": "If security prices immediately react in an unbiased manner to public corporate earnings releases, the market is exhibiting:",
    "options": {
      "A": "Semi-strong-form informational efficiency",
      "B": "Weak-form efficiency only",
      "C": "Market inefficiency and structural failure",
      "D": "Strong-form efficiency where insiders lose money"
    },
    "correct_option": "A",
    "explanation": "Unbiased, rapid price adjustment to newly released public corporate news is the textbook definition and empirical benchmark of semi-strong-form market efficiency.",
    "distractor_analysis": {
      "A": "Correct. Unbiased, rapid price adjustment to newly released public corporate news is the ",
      "B": "Incorrect. Common distractor based on: Thinking instantaneous public news adjustment is weak-form e",
      "C": "Incorrect. Common distractor based on: Thinking instantaneous public news adjustment is weak-form e",
      "D": "Incorrect. Common distractor based on: Thinking instantaneous public news adjustment is weak-form e"
    },
    "misconception": "Thinking instantaneous public news adjustment is weak-form efficiency.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Equity Investments",
    "skill_domain": "Market Efficiency",
    "difficulty_tier": 2,
    "question_text": "In an efficient market, the primary role of a professional portfolio manager is to:",
    "options": {
      "A": "Construct a diversified portfolio tailored to the client's specific risk tolerance, return objectives, tax situation, and liquidity needs",
      "B": "Consistently identify mispriced securities to beat the market benchmark",
      "C": "Engage in high-frequency day-trading using candlestick charts",
      "D": "Predict macroeconomic turning points through proprietary crystal-ball algorithms"
    },
    "correct_option": "A",
    "explanation": "Even if markets are highly efficient and alpha is zero, managers provide crucial value through asset allocation, diversification, tax optimization, and aligning portfolios with client IPS constraints.",
    "distractor_analysis": {
      "A": "Correct. Even if markets are highly efficient and alpha is zero, managers provide crucial",
      "B": "Incorrect. Common distractor based on: Believing active stock picking is the only role of a portfol",
      "C": "Incorrect. Common distractor based on: Believing active stock picking is the only role of a portfol",
      "D": "Incorrect. Common distractor based on: Believing active stock picking is the only role of a portfol"
    },
    "misconception": "Believing active stock picking is the only role of a portfolio manager.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Equity Investments",
    "skill_domain": "Market Efficiency",
    "difficulty_tier": 2,
    "question_text": "The 'Value Effect' anomaly refers to the empirical finding that:",
    "options": {
      "A": "Stocks with low price-to-earnings (P/E) or low price-to-book (P/B) ratios have historically outperformed high-multiplier growth stocks",
      "B": "Growth stocks with high P/E ratios consistently outperform value stocks over all time horizons",
      "C": "Firms with zero book value generate the highest alpha",
      "D": "Valuation multiples are uncorrelated with stock returns"
    },
    "correct_option": "A",
    "explanation": "The value anomaly (documented by Fama and French) demonstrates that value stocks (low P/E, low P/B, high dividend yield) historically deliver higher risk-adjusted returns than high-multiplier glamour/growth stocks.",
    "distractor_analysis": {
      "A": "Correct. The value anomaly (documented by Fama and French) demonstrates that value stocks",
      "B": "Incorrect. Common distractor based on: Assuming growth stocks have historically outperformed value ",
      "C": "Incorrect. Common distractor based on: Assuming growth stocks have historically outperformed value ",
      "D": "Incorrect. Common distractor based on: Assuming growth stocks have historically outperformed value "
    },
    "misconception": "Assuming growth stocks have historically outperformed value stocks.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Equity Investments",
    "skill_domain": "Market Efficiency",
    "difficulty_tier": 2,
    "question_text": "Loss aversion in behavioral finance refers to the tendency of investors to:",
    "options": {
      "A": "Feel the psychological pain of an investment loss approximately twice as intensely as the pleasure of an equivalent gain",
      "B": "Prefer higher variance of returns under all circumstances",
      "C": "Sell winning stocks immediately to avoid paying income taxes",
      "D": "Purchase only insurance policies with zero deductibles"
    },
    "correct_option": "A",
    "explanation": "Kahneman and Tversky's prospect theory established that individuals are loss-averse: losing $1,000 causes roughly double the psychological disutility that winning $1,000 delivers in satisfaction.",
    "distractor_analysis": {
      "A": "Correct. Kahneman and Tversky's prospect theory established that individuals are loss-ave",
      "B": "Incorrect. Common distractor based on: Confusing loss aversion with general risk aversion.",
      "C": "Incorrect. Common distractor based on: Confusing loss aversion with general risk aversion.",
      "D": "Incorrect. Common distractor based on: Confusing loss aversion with general risk aversion."
    },
    "misconception": "Confusing loss aversion with general risk aversion.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Equity Investments",
    "skill_domain": "Market Efficiency",
    "difficulty_tier": 2,
    "question_text": "If an analyst discovers that corporate insiders earn significant abnormal profits by trading their company's stock, this empirical finding rejects:",
    "options": {
      "A": "Strong-form market efficiency",
      "B": "Weak-form market efficiency",
      "C": "Semi-strong-form market efficiency only",
      "D": "The existence of trading transaction costs"
    },
    "correct_option": "A",
    "explanation": "Insider trading profits directly violate strong-form efficiency (which claims private inside info is already priced in). They do not contradict semi-strong or weak-form efficiency.",
    "distractor_analysis": {
      "A": "Correct. Insider trading profits directly violate strong-form efficiency (which claims pr",
      "B": "Incorrect. Common distractor based on: Assuming insider trading profits reject weak-form efficiency",
      "C": "Incorrect. Common distractor based on: Assuming insider trading profits reject weak-form efficiency",
      "D": "Incorrect. Common distractor based on: Assuming insider trading profits reject weak-form efficiency"
    },
    "misconception": "Assuming insider trading profits reject weak-form efficiency.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Equity Investments",
    "skill_domain": "Equity Valuation",
    "difficulty_tier": 2,
    "question_text": "A company just paid an annual dividend of $2.00 (D0 = $2.00). Dividends are expected to grow at a constant rate of 5% in perpetuity. If the required rate of return is 9%, what is the intrinsic value of the stock using the Gordon Growth Model?",
    "options": {
      "A": "$52.50",
      "B": "$50.00",
      "C": "$47.62",
      "D": "$55.00"
    },
    "correct_option": "A",
    "explanation": "Next year's dividend D1 = D0 * (1 + g) = $2.00 * (1 + 0.05) = $2.10. Intrinsic value P0 = D1 / (r - g) = $2.10 / (0.09 - 0.05) = $2.10 / 0.04 = $52.50.",
    "distractor_analysis": {
      "A": "Correct. Next year's dividend D1 = D0 * (1 + g) = $2.00 * (1 + 0.05) = $2.10. Intrinsic v",
      "B": "Incorrect. Common distractor based on: Using D0 in numerator ($2.00 / 0.04 = $50.00) without growin",
      "C": "Incorrect. Common distractor based on: Using D0 in numerator ($2.00 / 0.04 = $50.00) without growin",
      "D": "Incorrect. Common distractor based on: Using D0 in numerator ($2.00 / 0.04 = $50.00) without growin"
    },
    "misconception": "Using D0 in numerator ($2.00 / 0.04 = $50.00) without growing the dividend by (1 + g).",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Equity Investments",
    "skill_domain": "Equity Valuation",
    "difficulty_tier": 2,
    "question_text": "A firm has Return on Equity (ROE) of 15% and a dividend payout ratio of 40%. What is its sustainable growth rate (g)?",
    "options": {
      "A": "9.0%",
      "B": "6.0%",
      "C": "15.0%",
      "D": "10.0%"
    },
    "correct_option": "A",
    "explanation": "Retention rate b = 1 - Payout Ratio = 1 - 0.40 = 0.60. Sustainable growth rate g = b * ROE = 0.60 * 15% = 9.0%.",
    "distractor_analysis": {
      "A": "Correct. Retention rate b = 1 - Payout Ratio = 1 - 0.40 = 0.60. Sustainable growth rate g",
      "B": "Incorrect. Common distractor based on: Multiplying ROE directly by payout ratio (15% * 0.40 = 6.0%)",
      "C": "Incorrect. Common distractor based on: Multiplying ROE directly by payout ratio (15% * 0.40 = 6.0%)",
      "D": "Incorrect. Common distractor based on: Multiplying ROE directly by payout ratio (15% * 0.40 = 6.0%)"
    },
    "misconception": "Multiplying ROE directly by payout ratio (15% * 0.40 = 6.0%).",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Equity Investments",
    "skill_domain": "Equity Valuation",
    "difficulty_tier": 2,
    "question_text": "Enterprise Value (EV) is calculated as:",
    "options": {
      "A": "Market value of common equity + Market value of preferred stock + Market value of debt - Cash and short-term investments",
      "B": "Market value of equity + Cash - Total Debt",
      "C": "Total Assets minus Total Liabilities",
      "D": "Net Income multiplied by EV/EBITDA multiple"
    },
    "correct_option": "A",
    "explanation": "EV represents the theoretical purchase takeover cost of the core operating business: EV = Market Cap of Common Equity + Preferred Equity + Debt - Cash and Cash Equivalents.",
    "distractor_analysis": {
      "A": "Correct. EV represents the theoretical purchase takeover cost of the core operating busin",
      "B": "Incorrect. Common distractor based on: Adding cash instead of subtracting it from enterprise value.",
      "C": "Incorrect. Common distractor based on: Adding cash instead of subtracting it from enterprise value.",
      "D": "Incorrect. Common distractor based on: Adding cash instead of subtracting it from enterprise value."
    },
    "misconception": "Adding cash instead of subtracting it from enterprise value.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Equity Investments",
    "skill_domain": "Equity Valuation",
    "difficulty_tier": 2,
    "question_text": "Why is the EV/EBITDA multiple often preferred over the P/E multiple when comparing companies across international borders?",
    "options": {
      "A": "EV/EBITDA is capital-structure neutral and unaffected by differences in depreciation methods or tax rates",
      "B": "EV/EBITDA is strictly higher than P/E for all companies",
      "C": "EV/EBITDA ignores total operating expenses entirely",
      "D": "EV/EBITDA can only be calculated for profitable dividend-paying companies"
    },
    "correct_option": "A",
    "explanation": "EBITDA measures operating cash earnings before financing leverage (interest), taxes, and non-cash depreciation policies, making it ideal for cross-border comparisons with differing tax and capital structures.",
    "distractor_analysis": {
      "A": "Correct. EBITDA measures operating cash earnings before financing leverage (interest), ta",
      "B": "Incorrect. Common distractor based on: Assuming EV/EBITDA is affected by financial leverage differe",
      "C": "Incorrect. Common distractor based on: Assuming EV/EBITDA is affected by financial leverage differe",
      "D": "Incorrect. Common distractor based on: Assuming EV/EBITDA is affected by financial leverage differe"
    },
    "misconception": "Assuming EV/EBITDA is affected by financial leverage differences.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Equity Investments",
    "skill_domain": "Equity Valuation",
    "difficulty_tier": 2,
    "question_text": "In a two-stage dividend discount model, the terminal value at the end of the high-growth stage (t = n) is calculated using:",
    "options": {
      "A": "P_n = D_(n+1) / (r - g_longterm)",
      "B": "P_n = D_n / (r - g_longterm)",
      "C": "P_n = D_n * (1 + r)^n",
      "D": "P_n = Net Income_n / WACC"
    },
    "correct_option": "A",
    "explanation": "Terminal value at t = n applies the constant growth model using dividend at t = n + 1: P_n = D_(n+1) / (r - g), which is then discounted back to t = 0.",
    "distractor_analysis": {
      "A": "Correct. Terminal value at t = n applies the constant growth model using dividend at t = ",
      "B": "Incorrect. Common distractor based on: Using dividend at year n instead of year n + 1.",
      "C": "Incorrect. Common distractor based on: Using dividend at year n instead of year n + 1.",
      "D": "Incorrect. Common distractor based on: Using dividend at year n instead of year n + 1."
    },
    "misconception": "Using dividend at year n instead of year n + 1.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Equity Investments",
    "skill_domain": "Equity Valuation",
    "difficulty_tier": 2,
    "question_text": "A stock currently trades at $60 per share. Forecasted EPS for next year is $4.00, and trailing 12-month EPS is $3.00. What is its leading P/E and trailing P/E respectively?",
    "options": {
      "A": "Leading P/E = 15.0x, Trailing P/E = 20.0x",
      "B": "Leading P/E = 20.0x, Trailing P/E = 15.0x",
      "C": "Leading P/E = 12.0x, Trailing P/E = 15.0x",
      "D": "Leading P/E = 15.0x, Trailing P/E = 12.0x"
    },
    "correct_option": "A",
    "explanation": "Leading P/E = Current Price / Forecasted Next 12M EPS = $60 / $4.00 = 15.0x. Trailing P/E = Current Price / Historical Past 12M EPS = $60 / $3.00 = 20.0x.",
    "distractor_analysis": {
      "A": "Correct. Leading P/E = Current Price / Forecasted Next 12M EPS = $60 / $4.00 = 15.0x. Tra",
      "B": "Incorrect. Common distractor based on: Confusing leading (forward) P/E with trailing (historical) P",
      "C": "Incorrect. Common distractor based on: Confusing leading (forward) P/E with trailing (historical) P",
      "D": "Incorrect. Common distractor based on: Confusing leading (forward) P/E with trailing (historical) P"
    },
    "misconception": "Confusing leading (forward) P/E with trailing (historical) P/E.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Equity Investments",
    "skill_domain": "Equity Valuation",
    "difficulty_tier": 2,
    "question_text": "When valuing equity using Free Cash Flow to Equity (FCFE), the appropriate discount rate is:",
    "options": {
      "A": "Cost of equity (r_e)",
      "B": "Weighted average cost of capital (WACC)",
      "C": "Pre-tax cost of debt (r_d)",
      "D": "Risk-free rate (R_f)"
    },
    "correct_option": "A",
    "explanation": "Cash flows to equity holders (FCFE) must be discounted at the rate required by equity providers (cost of equity r_e). Cash flows to the entire firm (FCFF) are discounted at WACC.",
    "distractor_analysis": {
      "A": "Correct. Cash flows to equity holders (FCFE) must be discounted at the rate required by e",
      "B": "Incorrect. Common distractor based on: Discounting FCFE at WACC (or FCFF at cost of equity).",
      "C": "Incorrect. Common distractor based on: Discounting FCFE at WACC (or FCFF at cost of equity).",
      "D": "Incorrect. Common distractor based on: Discounting FCFE at WACC (or FCFF at cost of equity)."
    },
    "misconception": "Discounting FCFE at WACC (or FCFF at cost of equity).",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Equity Investments",
    "skill_domain": "Equity Valuation",
    "difficulty_tier": 2,
    "question_text": "Which valuation metric is most appropriate for valuing early-stage high-growth technology companies that currently generate negative earnings and cash flows?",
    "options": {
      "A": "Price-to-Sales (P/S) ratio",
      "B": "Price-to-Earnings (P/E) ratio",
      "C": "Dividend Discount Model (DDM)",
      "D": "Price-to-Cash Flow ratio"
    },
    "correct_option": "A",
    "explanation": "When a start-up has negative net income, negative EBITDA, and pays no dividends, P/E, EV/EBITDA, and DDM are undefined or meaningless. Price-to-Sales (P/S) is always positive as long as sales exist.",
    "distractor_analysis": {
      "A": "Correct. When a start-up has negative net income, negative EBITDA, and pays no dividends,",
      "B": "Incorrect. Common distractor based on: Attempting to calculate P/E on negative earnings.",
      "C": "Incorrect. Common distractor based on: Attempting to calculate P/E on negative earnings.",
      "D": "Incorrect. Common distractor based on: Attempting to calculate P/E on negative earnings."
    },
    "misconception": "Attempting to calculate P/E on negative earnings.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Equity Investments",
    "skill_domain": "Equity Valuation",
    "difficulty_tier": 2,
    "question_text": "Asset-based valuation is most reliable and useful when valuing:",
    "options": {
      "A": "Financial institutions or natural resource companies with tangible, liquid, mark-to-market assets",
      "B": "Software technology companies with heavy investments in uncapitalized R&D and human capital",
      "C": "Advertising marketing agencies with valuable customer brand loyalty",
      "D": "Pharmaceutical research laboratories in clinical phase trials"
    },
    "correct_option": "A",
    "explanation": "Asset-based valuation works best for asset-heavy firms (banks, REITs, natural resource firms) where book values closely track liquid market values. It fails for firms driven by intangible intellectual property.",
    "distractor_analysis": {
      "A": "Correct. Asset-based valuation works best for asset-heavy firms (banks, REITs, natural re",
      "B": "Incorrect. Common distractor based on: Applying asset-based models to tech firms with unrecorded in",
      "C": "Incorrect. Common distractor based on: Applying asset-based models to tech firms with unrecorded in",
      "D": "Incorrect. Common distractor based on: Applying asset-based models to tech firms with unrecorded in"
    },
    "misconception": "Applying asset-based models to tech firms with unrecorded intangible assets.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Equity Investments",
    "skill_domain": "Equity Valuation",
    "difficulty_tier": 2,
    "question_text": "According to the justified leading P/E formula derived from the Gordon Growth Model, justified P/E is calculated as:",
    "options": {
      "A": "(1 - b) / (r - g) = Payout Ratio / (r - g)",
      "B": "(1 + g) / (r - g)",
      "C": "b / (r - g)",
      "D": "ROE / (r - g)"
    },
    "correct_option": "A",
    "explanation": "From P0 = D1 / (r - g) and D1 = E1 * (1 - b): P0 / E1 = (1 - b) / (r - g), where 1 - b is the dividend payout ratio.",
    "distractor_analysis": {
      "A": "Correct. From P0 = D1 / (r - g) and D1 = E1 * (1 - b): P0 / E1 = (1 - b) / (r - g), where",
      "B": "Incorrect. Common distractor based on: Using retention rate b in numerator instead of payout ratio ",
      "C": "Incorrect. Common distractor based on: Using retention rate b in numerator instead of payout ratio ",
      "D": "Incorrect. Common distractor based on: Using retention rate b in numerator instead of payout ratio "
    },
    "misconception": "Using retention rate b in numerator instead of payout ratio (1 - b).",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Equity Investments",
    "skill_domain": "Equity Valuation",
    "difficulty_tier": 2,
    "question_text": "An investor utilizes an asset pricing model to estimate cost of equity. If risk-free rate is 4%, equity risk premium is 6%, and stock beta is 1.5, what is required return r_e via CAPM?",
    "options": {
      "A": "13.0%",
      "B": "10.0%",
      "C": "15.0%",
      "D": "11.5%"
    },
    "correct_option": "A",
    "explanation": "CAPM required return r_e = R_f + beta * ERP = 4% + 1.5 * (6%) = 4% + 9% = 13.0%.",
    "distractor_analysis": {
      "A": "Correct. CAPM required return r_e = R_f + beta * ERP = 4% + 1.5 * (6%) = 4% + 9% = 13.0%.",
      "B": "Incorrect. Common distractor based on: Adding beta directly to ERP (4% + 1.5 + 6% = 11.5%) or omitt",
      "C": "Incorrect. Common distractor based on: Adding beta directly to ERP (4% + 1.5 + 6% = 11.5%) or omitt",
      "D": "Incorrect. Common distractor based on: Adding beta directly to ERP (4% + 1.5 + 6% = 11.5%) or omitt"
    },
    "misconception": "Adding beta directly to ERP (4% + 1.5 + 6% = 11.5%) or omitting risk-free rate.",
    "time_estimate_seconds": 35
  }
];
