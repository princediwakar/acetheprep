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
      "B": "$25.00",
      "C": "$40.00"
    },
    "correct_option": "A",
    "explanation": "Margin call price P = P0 * (1 - Initial Margin) / (1 - Maintenance Margin) = $50 * (1 - 0.50) / (1 - 0.30) = $50 * (0.50 / 0.70) = $25 / 0.70 = $35.71.",
    "distractor_analysis": {
      "A": "Correct. Margin call price P = P0 * (1 - Initial Margin) / (1 - Maintenance Margin) = $50 * (1 - 0.50) / (1 - 0.30) = $50 * (0.50 / 0.70) = $25 / 0.70 = $35.71.",
      "B": "Incorrect. \"$25.00\" misapplies equity valuation models: applying maintenance margin directly to initial price ($35.00) or miscalculating borrowed debt.",
      "C": "Incorrect. \"$40.00\" misapplies equity valuation models: applying maintenance margin directly to initial price ($35.00) or miscalculating borrowed debt."
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
      "A": "Market-on-close order",
      "B": "Stop-buy order",
      "C": "Limit-buy order"
    },
    "correct_option": "B",
    "explanation": "A stop-buy order becomes an active market buy order only when the market price rises to or above the specified stop trigger price, commonly used to protect short sellers against runaway price surges.",
    "distractor_analysis": {
      "A": "Incorrect. \"Market-on-close order\" misapplies equity valuation models: confusing stop-buy orders with limit-buy orders (which execute at or below specified price).",
      "B": "Correct. A stop-buy order becomes an active market buy order only when the market price rises to or above the specified stop trigger price, commonly used to protect short sellers against runaway price surges.",
      "C": "Incorrect. \"Limit-buy order\" misapplies equity valuation models: confusing stop-buy orders with limit-buy orders (which execute at or below specified price)."
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
      "A": "Orders from buyers and sellers are matched directly using an electronic order book without intermediaries",
      "B": "Brokers locate buyers and sellers through custom private bilateral auctions",
      "C": "Dealers provide continuous liquidity by quoting two-sided bid and ask prices from their own proprietary inventory"
    },
    "correct_option": "C",
    "explanation": "In quote-driven markets (over-the-counter and dealer bond markets), dealers maintain inventory and post bid-ask quotes, earning the spread for supplying liquidity. Order-driven markets match trader orders directly.",
    "distractor_analysis": {
      "A": "Incorrect. \"Orders from buyers and sellers are matched directly using an electronic order book without intermediaries\" misapplies equity valuation models: confusing quote-driven markets with order-driven auction markets.",
      "B": "Incorrect. \"Brokers locate buyers and sellers through custom private bilateral auctions\" misapplies equity valuation models: confusing quote-driven markets with order-driven auction markets.",
      "C": "Correct. In quote-driven markets (over-the-counter and dealer bond markets), dealers maintain inventory and post bid-ask quotes, earning the spread for supplying liquidity. Order-driven markets match trader orders directly."
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
      "C": "Private placement exemption"
    },
    "correct_option": "A",
    "explanation": "Under firm commitment underwriting, the investment bank syndicate buys the entire issue at a negotiated discount, absorbing all unsold inventory price risk. In best-efforts offerings, the underwriter acts merely as an agent.",
    "distractor_analysis": {
      "A": "Correct. Under firm commitment underwriting, the investment bank syndicate buys the entire issue at a negotiated discount, absorbing all unsold inventory price risk. In best-efforts offerings, the underwriter acts merely as an agent.",
      "B": "Incorrect. \"Best-efforts offering\" misapplies equity valuation models: confusing firm commitment with best efforts.",
      "C": "Incorrect. \"Private placement exemption\" misapplies equity valuation models: confusing firm commitment with best efforts."
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
      "A": "Purchase call options with zero cash collateral",
      "B": "Borrow the shares, sell them in the open market, and pay any declared dividends to the stock lender until the position is closed",
      "C": "Hold the short position for a mandatory minimum holding period of 12 months"
    },
    "correct_option": "B",
    "explanation": "Short selling involves borrowing securities from a lender, selling them, and assuming the obligation to return the borrowed shares in the future while reimbursing the lender for any dividends declared during the loan period.",
    "distractor_analysis": {
      "A": "Incorrect. \"Purchase call options with zero cash collateral\" misapplies equity valuation models: thinking short sellers receive dividends rather than paying them to the lender.",
      "B": "Correct. Short selling involves borrowing securities from a lender, selling them, and assuming the obligation to return the borrowed shares in the future while reimbursing the lender for any dividends declared during the loan period.",
      "C": "Incorrect. \"Hold the short position for a mandatory minimum holding period of 12 months\" misapplies equity valuation models: thinking short sellers receive dividends rather than paying them to the lender."
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
      "A": "They determine the quarterly earnings reports of listed public corporations",
      "B": "They set statutory tax rates on capital gains",
      "C": "They act as the central counterparty to both sides of every cleared trade, mitigating bilateral counterparty credit risk"
    },
    "correct_option": "C",
    "explanation": "Clearinghouses novate trades, becoming the buyer to every seller and seller to every buyer, guaranteeing trade settlement and managing margin collateral to eliminate counterparty failure risk.",
    "distractor_analysis": {
      "A": "Incorrect. \"They determine the quarterly earnings reports of listed public corporations\" misapplies equity valuation models: confusing clearinghouses with fundamental research analysts.",
      "B": "Incorrect. \"They set statutory tax rates on capital gains\" misapplies equity valuation models: confusing clearinghouses with fundamental research analysts.",
      "C": "Correct. Clearinghouses novate trades, becoming the buyer to every seller and seller to every buyer, guaranteeing trade settlement and managing margin collateral to eliminate counterparty failure risk."
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
      "B": "Brokered market",
      "C": "Quote-driven dealer market"
    },
    "correct_option": "A",
    "explanation": "Order-driven markets (such as modern major equity exchanges) match client buy and sell orders based on transparent standardized rules prioritizing best price and earliest timestamp.",
    "distractor_analysis": {
      "A": "Correct. Order-driven markets (such as modern major equity exchanges) match client buy and sell orders based on transparent standardized rules prioritizing best price and earliest timestamp.",
      "B": "Incorrect. \"Brokered market\" misapplies equity valuation models: confusing order-driven systems with quote-driven dealer networks.",
      "C": "Incorrect. \"Quote-driven dealer market\" misapplies equity valuation models: confusing order-driven systems with quote-driven dealer networks."
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
      "A": "0.40",
      "B": "2.50",
      "C": "1.40"
    },
    "correct_option": "B",
    "explanation": "Leverage ratio = Total Asset Value / Equity Investment = 1 / Initial Margin % = 1 / 0.40 = 2.50.",
    "distractor_analysis": {
      "A": "Incorrect. \"0.40\" misapplies equity valuation models: using debt-to-equity ratio instead of total assets to equity.",
      "B": "Correct. Leverage ratio = Total Asset Value / Equity Investment = 1 / Initial Margin % = 1 / 0.40 = 2.50.",
      "C": "Incorrect. \"1.40\" misapplies equity valuation models: using debt-to-equity ratio instead of total assets to equity."
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
      "A": "Execute immediately at the current market ask price of $64.80",
      "B": "Be rejected by the exchange matching engine",
      "C": "Remain unexecuted on the order book until market price rises to at least $65"
    },
    "correct_option": "C",
    "explanation": "A limit order to sell sets a minimum acceptable price ($65). Because current market bid is below $65, the order rests in the order book waiting for buyers willing to pay $65 or higher.",
    "distractor_analysis": {
      "A": "Incorrect. \"Execute immediately at the current market ask price of $64.80\" misapplies equity valuation models: assuming limit sell orders execute below the specified limit price.",
      "B": "Incorrect. \"Be rejected by the exchange matching engine\" misapplies equity valuation models: assuming limit sell orders execute below the specified limit price.",
      "C": "Correct. A limit order to sell sets a minimum acceptable price ($65). Because current market bid is below $65, the order rests in the order book waiting for buyers willing to pay $65 or higher."
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
      "C": "Derivative instruments"
    },
    "correct_option": "A",
    "explanation": "Financial assets represent legal contractual claims to future cash flows produced by real assets. Real assets are tangible physical assets (land, machinery, real estate).",
    "distractor_analysis": {
      "A": "Correct. Financial assets represent legal contractual claims to future cash flows produced by real assets. Real assets are tangible physical assets (land, machinery, real estate).",
      "B": "Incorrect. \"Real assets (real estate, land, infrastructure)\" misapplies equity valuation models: confusing real physical assets with financial asset contracts.",
      "C": "Incorrect. \"Derivative instruments\" misapplies equity valuation models: confusing real physical assets with financial asset contracts."
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
      "A": "Existing secondary market public investors",
      "B": "The issuing corporation or government entity",
      "C": "The clearinghouse guarantee fund"
    },
    "correct_option": "B",
    "explanation": "Primary market transactions involve the original creation and issuance of securities where capital flows directly from investors to the issuing corporate or sovereign entity.",
    "distractor_analysis": {
      "A": "Incorrect. \"Existing secondary market public investors\" misapplies equity valuation models: confusing primary market capital raising with secondary market trading between investors.",
      "B": "Correct. Primary market transactions involve the original creation and issuance of securities where capital flows directly from investors to the issuing corporate or sovereign entity.",
      "C": "Incorrect. \"The clearinghouse guarantee fund\" misapplies equity valuation models: confusing primary market capital raising with secondary market trading between investors."
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
      "A": "The constituent stock is immediately removed from the index",
      "B": "The index level drops by 50% automatically",
      "C": "The divisor must be adjusted downward so the index level remains unaffected by the split"
    },
    "correct_option": "C",
    "explanation": "A price-weighted index divides the sum of constituent share prices by a divisor. When a stock splits, its price halves, so the divisor must be reduced to maintain index continuity.",
    "distractor_analysis": {
      "A": "Incorrect. \"The constituent stock is immediately removed from the index\" misapplies equity valuation models: thinking a stock split causes the entire index level to plunge.",
      "B": "Incorrect. \"The index level drops by 50% automatically\" misapplies equity valuation models: thinking a stock split causes the entire index level to plunge.",
      "C": "Correct. A price-weighted index divides the sum of constituent share prices by a divisor. When a stock splits, its price halves, so the divisor must be reduced to maintain index continuity."
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
      "B": "Are biased toward small-cap illiquid stocks",
      "C": "Require frequent costly rebalancing to maintain equal weights across stocks"
    },
    "correct_option": "A",
    "explanation": "Market-cap weighting allocates higher weights to companies whose share prices have appreciated most, reinforcing momentum and potentially over-allocating capital to overvalued bubble stocks.",
    "distractor_analysis": {
      "A": "Correct. Market-cap weighting allocates higher weights to companies whose share prices have appreciated most, reinforcing momentum and potentially over-allocating capital to overvalued bubble stocks.",
      "B": "Incorrect. \"Are biased toward small-cap illiquid stocks\" misapplies equity valuation models: believing market-cap indexes require frequent trading rebalancing (they are inherently self-rebalancing).",
      "C": "Incorrect. \"Require frequent costly rebalancing to maintain equal weights across stocks\" misapplies equity valuation models: believing market-cap indexes require frequent trading rebalancing (they are inherently self-rebalancing)."
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
      "A": "Adjusting the index divisor whenever market capitalization changes",
      "B": "Periodic rebalancing by selling outperforming stocks and buying underperforming stocks",
      "C": "Zero portfolio trading turnover across time"
    },
    "correct_option": "B",
    "explanation": "As stock prices move, higher-returning stocks become overweighted and lagging stocks underweighted. To restore equal weighting, managers must systematically trim winners and buy losers (contrarian rebalancing).",
    "distractor_analysis": {
      "A": "Incorrect. \"Adjusting the index divisor whenever market capitalization changes\" misapplies equity valuation models: assuming equal-weighted indexes require zero rebalancing turnover.",
      "B": "Correct. As stock prices move, higher-returning stocks become overweighted and lagging stocks underweighted. To restore equal weighting, managers must systematically trim winners and buy losers (contrarian rebalancing).",
      "C": "Incorrect. \"Zero portfolio trading turnover across time\" misapplies equity valuation models: assuming equal-weighted indexes require zero rebalancing turnover."
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
      "A": "An index that adjusts stock prices for daily floating interest rates",
      "B": "An index that weights shares by foreign currency exchange rate fluctuations",
      "C": "An index that weights constituents based only on shares available for public purchase, excluding locked-in insider and government stakes"
    },
    "correct_option": "C",
    "explanation": "Float adjustment excludes restricted shares (held by founders, governments, or strategic corporate parents), weighting each company by shares actually tradeable by the public.",
    "distractor_analysis": {
      "A": "Incorrect. \"An index that adjusts stock prices for daily floating interest rates\" misapplies equity valuation models: confusing float-adjusted index with floating-rate debt instruments.",
      "B": "Incorrect. \"An index that weights shares by foreign currency exchange rate fluctuations\" misapplies equity valuation models: confusing float-adjusted index with floating-rate debt instruments.",
      "C": "Correct. Float adjustment excludes restricted shares (held by founders, governments, or strategic corporate parents), weighting each company by shares actually tradeable by the public."
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
      "C": "An index weighted strictly by total outstanding common shares"
    },
    "correct_option": "A",
    "explanation": "Fundamental weighting allocates weights based on corporate financial metrics (dividends, earnings, revenues, book value) rather than market prices, introducing a value tilt.",
    "distractor_analysis": {
      "A": "Correct. Fundamental weighting allocates weights based on corporate financial metrics (dividends, earnings, revenues, book value) rather than market prices, introducing a value tilt.",
      "B": "Incorrect. \"An index weighted by constituent share prices divided by a divisor\" misapplies equity valuation models: confusing fundamental weighting with market-cap weighting.",
      "C": "Incorrect. \"An index weighted strictly by total outstanding common shares\" misapplies equity valuation models: confusing fundamental weighting with market-cap weighting."
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
      "A": "Bond coupons cannot be converted to cash",
      "B": "The universe of bonds is vastly larger and many individual bond issues trade infrequently in illiquid OTC markets",
      "C": "Bonds do not have maturity dates"
    },
    "correct_option": "B",
    "explanation": "Corporations often have dozens of distinct bond issues, and most trade by appointment in illiquid dealer markets with high bid-ask spreads, making exact index replication impractical.",
    "distractor_analysis": {
      "A": "Incorrect. \"Bond coupons cannot be converted to cash\" misapplies equity valuation models: assuming bond markets are more liquid and centralized than equity markets.",
      "B": "Correct. Corporations often have dozens of distinct bond issues, and most trade by appointment in illiquid dealer markets with high bid-ask spreads, making exact index replication impractical.",
      "C": "Incorrect. \"Bonds do not have maturity dates\" misapplies equity valuation models: assuming bond markets are more liquid and centralized than equity markets."
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
      "A": "Recalculating historical returns after an accounting scandal",
      "B": "Adjusting constituent weightings to restore target allocations after price moves",
      "C": "The periodic addition and deletion of constituent securities to ensure the index accurately reflects its target market"
    },
    "correct_option": "C",
    "explanation": "Reconstitution is the process of updating the member list of the index (adding qualifying companies and removing those that fail market cap or liquidity criteria). Rebalancing adjusts weights.",
    "distractor_analysis": {
      "A": "Incorrect. \"Recalculating historical returns after an accounting scandal\" misapplies equity valuation models: confusing reconstitution (changing constituents) with rebalancing (adjusting weights).",
      "B": "Incorrect. \"Adjusting constituent weightings to restore target allocations after price moves\" misapplies equity valuation models: confusing reconstitution (changing constituents) with rebalancing (adjusting weights).",
      "C": "Correct. Reconstitution is the process of updating the member list of the index (adding qualifying companies and removing those that fail market cap or liquidity criteria). Rebalancing adjusts weights."
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
      "B": "A total return index deducts inflation from capital gains",
      "C": "A total return index measures only price changes and excludes dividends"
    },
    "correct_option": "A",
    "explanation": "Price return indexes track only changes in security prices. Total return indexes assume that all cash distributions (dividends, interest) are fully reinvested into the index.",
    "distractor_analysis": {
      "A": "Correct. Price return indexes track only changes in security prices. Total return indexes assume that all cash distributions (dividends, interest) are fully reinvested into the index.",
      "B": "Incorrect. \"A total return index deducts inflation from capital gains\" misapplies equity valuation models: confusing total return with price return.",
      "C": "Incorrect. \"A total return index measures only price changes and excludes dividends\" misapplies equity valuation models: confusing total return with price return."
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
      "A": "Physical commodities cannot be legally owned by institutions",
      "B": "Holding physical commodities entails substantial storage, insurance, and transportation costs",
      "C": "Futures contracts are exempt from market volatility"
    },
    "correct_option": "B",
    "explanation": "Investing in physical barrels of crude oil or bushels of wheat involves prohibitive storage and spoilage costs, making liquid exchange-traded futures the standard vehicle for commodity indexing.",
    "distractor_analysis": {
      "A": "Incorrect. \"Physical commodities cannot be legally owned by institutions\" misapplies equity valuation models: thinking institutional funds warehouse physical commodities for index tracking.",
      "B": "Correct. Investing in physical barrels of crude oil or bushels of wheat involves prohibitive storage and spoilage costs, making liquid exchange-traded futures the standard vehicle for commodity indexing.",
      "C": "Incorrect. \"Futures contracts are exempt from market volatility\" misapplies equity valuation models: thinking institutional funds warehouse physical commodities for index tracking."
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
      "A": "Identically to a 10% increase in the $10 stock",
      "B": "Three times less than a 10% increase in the $20 stock",
      "C": "Six times more than a 10% increase in the $10 stock"
    },
    "correct_option": "C",
    "explanation": "In a price-weighted index, higher-priced stocks have proportionally larger influence. A 10% rise in the $60 stock represents a $6 move, which affects the index 6x more than a $1 move in the $10 stock.",
    "distractor_analysis": {
      "A": "Incorrect. \"Identically to a 10% increase in the $10 stock\" misapplies equity valuation models: assuming price-weighted indexes weight percentage changes equally.",
      "B": "Incorrect. \"Three times less than a 10% increase in the $20 stock\" misapplies equity valuation models: assuming price-weighted indexes weight percentage changes equally.",
      "C": "Correct. In a price-weighted index, higher-priced stocks have proportionally larger influence. A 10% rise in the $60 stock represents a $6 move, which affects the index 6x more than a $1 move in the $10 stock."
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
      "C": "Eliminating trading fees for broker-dealers"
    },
    "correct_option": "A",
    "explanation": "Indexes serve as performance benchmarks for active managers, model inputs for estimating systematic risk, proxies for asset class returns, and underlying assets for passive ETFs.",
    "distractor_analysis": {
      "A": "Correct. Indexes serve as performance benchmarks for active managers, model inputs for estimating systematic risk, proxies for asset class returns, and underlying assets for passive ETFs.",
      "B": "Incorrect. \"Guaranteeing minimum annual returns for private wealth clients\" misapplies equity valuation models: assuming indexes provide return guarantees.",
      "C": "Incorrect. \"Eliminating trading fees for broker-dealers\" misapplies equity valuation models: assuming indexes provide return guarantees."
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
      "A": "Public corporate earnings releases and financial statements",
      "B": "Historical market trading volume and past price data (technical analysis)",
      "C": "Corporate insider trading disclosures"
    },
    "correct_option": "B",
    "explanation": "Weak-form EMH states that past prices and volume information are already fully incorporated into current market prices; hence technical analysis cannot yield abnormal alpha.",
    "distractor_analysis": {
      "A": "Incorrect. \"Public corporate earnings releases and financial statements\" misapplies equity valuation models: assuming weak-form efficiency renders fundamental analysis useless (that is semi-strong).",
      "B": "Correct. Weak-form EMH states that past prices and volume information are already fully incorporated into current market prices; hence technical analysis cannot yield abnormal alpha.",
      "C": "Incorrect. \"Corporate insider trading disclosures\" misapplies equity valuation models: assuming weak-form efficiency renders fundamental analysis useless (that is semi-strong)."
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
      "A": "Holding a broad, low-cost passive index fund",
      "B": "Insider trading based on nonpublic merger discussions",
      "C": "Fundamental analysis of publicly available financial statements and economic news"
    },
    "correct_option": "C",
    "explanation": "Semi-strong efficiency asserts that all publicly available information is instantaneously reflected in security prices. Therefore, neither technical analysis nor fundamental analysis can generate abnormal returns.",
    "distractor_analysis": {
      "A": "Incorrect. \"Holding a broad, low-cost passive index fund\" misapplies equity valuation models: thinking insider trading is ineffective in semi-strong markets (it only becomes ineffective under strong-form).",
      "B": "Incorrect. \"Insider trading based on nonpublic merger discussions\" misapplies equity valuation models: thinking insider trading is ineffective in semi-strong markets (it only becomes ineffective under strong-form).",
      "C": "Correct. Semi-strong efficiency asserts that all publicly available information is instantaneously reflected in security prices. Therefore, neither technical analysis nor fundamental analysis can generate abnormal returns."
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
      "B": "Publicly available financial reporting statements only",
      "C": "Only historical trading price patterns"
    },
    "correct_option": "A",
    "explanation": "Strong-form EMH states that prices reflect all information from all sources, public and private. In a strong-form efficient market, even corporate insiders cannot generate abnormal profits.",
    "distractor_analysis": {
      "A": "Correct. Strong-form EMH states that prices reflect all information from all sources, public and private. In a strong-form efficient market, even corporate insiders cannot generate abnormal profits.",
      "B": "Incorrect. \"Publicly available financial reporting statements only\" misapplies equity valuation models: confusing strong-form with semi-strong-form efficiency.",
      "C": "Incorrect. \"Only historical trading price patterns\" misapplies equity valuation models: confusing strong-form with semi-strong-form efficiency."
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
      "A": "Bond yields declining to zero every January",
      "B": "Small-cap stocks historically generating abnormal positive returns during the first few trading days of January",
      "C": "Large-cap stocks consistently outperforming small-cap stocks throughout winter"
    },
    "correct_option": "B",
    "explanation": "The January Effect refers to the persistent empirical tendency for small-cap equities to outperform in January, frequently attributed to year-end tax-loss selling followed by reinvestment in early January.",
    "distractor_analysis": {
      "A": "Incorrect. \"Bond yields declining to zero every January\" misapplies equity valuation models: confusing the january effect with large-cap outperformance.",
      "B": "Correct. The January Effect refers to the persistent empirical tendency for small-cap equities to outperform in January, frequently attributed to year-end tax-loss selling followed by reinvestment in early January.",
      "C": "Incorrect. \"Large-cap stocks consistently outperforming small-cap stocks throughout winter\" misapplies equity valuation models: confusing the january effect with large-cap outperformance."
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
      "A": "The size effect",
      "B": "The weekend effect",
      "C": "Post-Earnings Announcement Drift (PEAD)"
    },
    "correct_option": "C",
    "explanation": "PEAD shows that firms reporting significant positive (or negative) quarterly earnings surprises experience continued price drift in the same direction for weeks, violating instantaneous semi-strong adjustment.",
    "distractor_analysis": {
      "A": "Incorrect. \"The size effect\" misapplies equity valuation models: confusing pead with the weekend effect.",
      "B": "Incorrect. \"The weekend effect\" misapplies equity valuation models: confusing pead with the weekend effect.",
      "C": "Correct. PEAD shows that firms reporting significant positive (or negative) quarterly earnings surprises experience continued price drift in the same direction for weeks, violating instantaneous semi-strong adjustment."
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
      "C": "Statutory limits on stock ownership"
    },
    "correct_option": "A",
    "explanation": "Behavioral finance argues that investor cognitive biases (overconfidence, loss aversion) create mispricings, while real-world limits to arbitrage (short-sale costs, liquidity risk) prevent rational capital from immediately eliminating them.",
    "distractor_analysis": {
      "A": "Correct. Behavioral finance argues that investor cognitive biases (overconfidence, loss aversion) create mispricings, while real-world limits to arbitrage (short-sale costs, liquidity risk) prevent rational capital from immediately eliminating them.",
      "B": "Incorrect. \"Lack of computing power on electronic exchanges\" misapplies equity valuation models: assuming mispricings persist due to slow internet speeds.",
      "C": "Incorrect. \"Statutory limits on stock ownership\" misapplies equity valuation models: assuming mispricings persist due to slow internet speeds."
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
      "A": "Weak-form efficiency only",
      "B": "Semi-strong-form informational efficiency",
      "C": "Market inefficiency and structural failure"
    },
    "correct_option": "B",
    "explanation": "Unbiased, rapid price adjustment to newly released public corporate news is the textbook definition and empirical benchmark of semi-strong-form market efficiency.",
    "distractor_analysis": {
      "A": "Incorrect. \"Weak-form efficiency only\" misapplies equity valuation models: thinking instantaneous public news adjustment is weak-form efficiency.",
      "B": "Correct. Unbiased, rapid price adjustment to newly released public corporate news is the textbook definition and empirical benchmark of semi-strong-form market efficiency.",
      "C": "Incorrect. \"Market inefficiency and structural failure\" misapplies equity valuation models: thinking instantaneous public news adjustment is weak-form efficiency."
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
      "A": "Engage in high-frequency day-trading using candlestick charts",
      "B": "Consistently identify mispriced securities to beat the market benchmark",
      "C": "Construct a diversified portfolio tailored to the client's specific risk tolerance, return objectives, tax situation, and liquidity needs"
    },
    "correct_option": "C",
    "explanation": "Even if markets are highly efficient and alpha is zero, managers provide crucial value through asset allocation, diversification, tax optimization, and aligning portfolios with client IPS constraints.",
    "distractor_analysis": {
      "A": "Incorrect. \"Engage in high-frequency day-trading using candlestick charts\" misapplies equity valuation models: believing active stock picking is the only role of a portfolio manager.",
      "B": "Incorrect. \"Consistently identify mispriced securities to beat the market benchmark\" misapplies equity valuation models: believing active stock picking is the only role of a portfolio manager.",
      "C": "Correct. Even if markets are highly efficient and alpha is zero, managers provide crucial value through asset allocation, diversification, tax optimization, and aligning portfolios with client IPS constraints."
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
      "B": "Firms with zero book value generate the highest alpha",
      "C": "Growth stocks with high P/E ratios consistently outperform value stocks over all time horizons"
    },
    "correct_option": "A",
    "explanation": "The value anomaly (documented by Fama and French) demonstrates that value stocks (low P/E, low P/B, high dividend yield) historically deliver higher risk-adjusted returns than high-multiplier glamour/growth stocks.",
    "distractor_analysis": {
      "A": "Correct. The value anomaly (documented by Fama and French) demonstrates that value stocks (low P/E, low P/B, high dividend yield) historically deliver higher risk-adjusted returns than high-multiplier glamour/growth stocks.",
      "B": "Incorrect. \"Firms with zero book value generate the highest alpha\" misapplies equity valuation models: assuming growth stocks have historically outperformed value stocks.",
      "C": "Incorrect. \"Growth stocks with high P/E ratios consistently outperform value stocks over all time horizons\" misapplies equity valuation models: assuming growth stocks have historically outperformed value stocks."
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
      "A": "Sell winning stocks immediately to avoid paying income taxes",
      "B": "Feel the psychological pain of an investment loss approximately twice as intensely as the pleasure of an equivalent gain",
      "C": "Prefer higher variance of returns under all circumstances"
    },
    "correct_option": "B",
    "explanation": "Kahneman and Tversky's prospect theory established that individuals are loss-averse: losing $1,000 causes roughly double the psychological disutility that winning $1,000 delivers in satisfaction.",
    "distractor_analysis": {
      "A": "Incorrect. \"Sell winning stocks immediately to avoid paying income taxes\" misapplies equity valuation models: confusing loss aversion with general risk aversion.",
      "B": "Correct. Kahneman and Tversky's prospect theory established that individuals are loss-averse: losing $1,000 causes roughly double the psychological disutility that winning $1,000 delivers in satisfaction.",
      "C": "Incorrect. \"Prefer higher variance of returns under all circumstances\" misapplies equity valuation models: confusing loss aversion with general risk aversion."
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
      "A": "Weak-form market efficiency",
      "B": "Semi-strong-form market efficiency only",
      "C": "Strong-form market efficiency"
    },
    "correct_option": "C",
    "explanation": "Insider trading profits directly violate strong-form efficiency (which claims private inside info is already priced in). They do not contradict semi-strong or weak-form efficiency.",
    "distractor_analysis": {
      "A": "Incorrect. \"Weak-form market efficiency\" misapplies equity valuation models: assuming insider trading profits reject weak-form efficiency.",
      "B": "Incorrect. \"Semi-strong-form market efficiency only\" misapplies equity valuation models: assuming insider trading profits reject weak-form efficiency.",
      "C": "Correct. Insider trading profits directly violate strong-form efficiency (which claims private inside info is already priced in). They do not contradict semi-strong or weak-form efficiency."
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
      "C": "$47.62"
    },
    "correct_option": "A",
    "explanation": "Next year's dividend D1 = D0 * (1 + g) = $2.00 * (1 + 0.05) = $2.10. Intrinsic value P0 = D1 / (r - g) = $2.10 / (0.09 - 0.05) = $2.10 / 0.04 = $52.50.",
    "distractor_analysis": {
      "A": "Correct. Next year's dividend D1 = D0 * (1 + g) = $2.00 * (1 + 0.05) = $2.10. Intrinsic value P0 = D1 / (r - g) = $2.10 / (0.09 - 0.05) = $2.10 / 0.04 = $52.50.",
      "B": "Incorrect. \"$50.00\" misapplies equity valuation models: using d0 in numerator ($2.00 / 0.04 = $50.00) without growing the dividend by (1 + g).",
      "C": "Incorrect. \"$47.62\" misapplies equity valuation models: using d0 in numerator ($2.00 / 0.04 = $50.00) without growing the dividend by (1 + g)."
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
      "A": "6.0%",
      "B": "9.0%",
      "C": "15.0%"
    },
    "correct_option": "B",
    "explanation": "Retention rate b = 1 - Payout Ratio = 1 - 0.40 = 0.60. Sustainable growth rate g = b * ROE = 0.60 * 15% = 9.0%.",
    "distractor_analysis": {
      "A": "Incorrect. \"6.0%\" misapplies equity valuation models: multiplying roe directly by payout ratio (15% * 0.40 = 6.0%).",
      "B": "Correct. Retention rate b = 1 - Payout Ratio = 1 - 0.40 = 0.60. Sustainable growth rate g = b * ROE = 0.60 * 15% = 9.0%.",
      "C": "Incorrect. \"15.0%\" misapplies equity valuation models: multiplying roe directly by payout ratio (15% * 0.40 = 6.0%)."
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
      "A": "Total Assets minus Total Liabilities",
      "B": "Market value of equity + Cash - Total Debt",
      "C": "Market value of common equity + Market value of preferred stock + Market value of debt - Cash and short-term investments"
    },
    "correct_option": "C",
    "explanation": "EV represents the theoretical purchase takeover cost of the core operating business: EV = Market Cap of Common Equity + Preferred Equity + Debt - Cash and Cash Equivalents.",
    "distractor_analysis": {
      "A": "Incorrect. \"Total Assets minus Total Liabilities\" misapplies equity valuation models: adding cash instead of subtracting it from enterprise value.",
      "B": "Incorrect. \"Market value of equity + Cash - Total Debt\" misapplies equity valuation models: adding cash instead of subtracting it from enterprise value.",
      "C": "Correct. EV represents the theoretical purchase takeover cost of the core operating business: EV = Market Cap of Common Equity + Preferred Equity + Debt - Cash and Cash Equivalents."
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
      "B": "EV/EBITDA ignores total operating expenses entirely",
      "C": "EV/EBITDA is strictly higher than P/E for all companies"
    },
    "correct_option": "A",
    "explanation": "EBITDA measures operating cash earnings before financing leverage (interest), taxes, and non-cash depreciation policies, making it ideal for cross-border comparisons with differing tax and capital structures.",
    "distractor_analysis": {
      "A": "Correct. EBITDA measures operating cash earnings before financing leverage (interest), taxes, and non-cash depreciation policies, making it ideal for cross-border comparisons with differing tax and capital structures.",
      "B": "Incorrect. \"EV/EBITDA ignores total operating expenses entirely\" misapplies equity valuation models: assuming ev/ebitda is affected by financial leverage differences.",
      "C": "Incorrect. \"EV/EBITDA is strictly higher than P/E for all companies\" misapplies equity valuation models: assuming ev/ebitda is affected by financial leverage differences."
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
      "A": "P_n = D_n * (1 + r)^n",
      "B": "P_n = D_(n+1) / (r - g_longterm)",
      "C": "P_n = D_n / (r - g_longterm)"
    },
    "correct_option": "B",
    "explanation": "Terminal value at t = n applies the constant growth model using dividend at t = n + 1: P_n = D_(n+1) / (r - g), which is then discounted back to t = 0.",
    "distractor_analysis": {
      "A": "Incorrect. \"P_n = D_n * (1 + r)^n\" misapplies equity valuation models: using dividend at year n instead of year n + 1.",
      "B": "Correct. Terminal value at t = n applies the constant growth model using dividend at t = n + 1: P_n = D_(n+1) / (r - g), which is then discounted back to t = 0.",
      "C": "Incorrect. \"P_n = D_n / (r - g_longterm)\" misapplies equity valuation models: using dividend at year n instead of year n + 1."
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
      "A": "Leading P/E = 20.0x, Trailing P/E = 15.0x",
      "B": "Leading P/E = 12.0x, Trailing P/E = 15.0x",
      "C": "Leading P/E = 15.0x, Trailing P/E = 20.0x"
    },
    "correct_option": "C",
    "explanation": "Leading P/E = Current Price / Forecasted Next 12M EPS = $60 / $4.00 = 15.0x. Trailing P/E = Current Price / Historical Past 12M EPS = $60 / $3.00 = 20.0x.",
    "distractor_analysis": {
      "A": "Incorrect. \"Leading P/E = 20.0x, Trailing P/E = 15.0x\" misapplies equity valuation models: confusing leading (forward) p/e with trailing (historical) p/e.",
      "B": "Incorrect. \"Leading P/E = 12.0x, Trailing P/E = 15.0x\" misapplies equity valuation models: confusing leading (forward) p/e with trailing (historical) p/e.",
      "C": "Correct. Leading P/E = Current Price / Forecasted Next 12M EPS = $60 / $4.00 = 15.0x. Trailing P/E = Current Price / Historical Past 12M EPS = $60 / $3.00 = 20.0x."
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
      "C": "Pre-tax cost of debt (r_d)"
    },
    "correct_option": "A",
    "explanation": "Cash flows to equity holders (FCFE) must be discounted at the rate required by equity providers (cost of equity r_e). Cash flows to the entire firm (FCFF) are discounted at WACC.",
    "distractor_analysis": {
      "A": "Correct. Cash flows to equity holders (FCFE) must be discounted at the rate required by equity providers (cost of equity r_e). Cash flows to the entire firm (FCFF) are discounted at WACC.",
      "B": "Incorrect. \"Weighted average cost of capital (WACC)\" misapplies equity valuation models: discounting fcfe at wacc (or fcff at cost of equity).",
      "C": "Incorrect. \"Pre-tax cost of debt (r_d)\" misapplies equity valuation models: discounting fcfe at wacc (or fcff at cost of equity)."
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
      "A": "Price-to-Earnings (P/E) ratio",
      "B": "Price-to-Sales (P/S) ratio",
      "C": "Dividend Discount Model (DDM)"
    },
    "correct_option": "B",
    "explanation": "When a start-up has negative net income, negative EBITDA, and pays no dividends, P/E, EV/EBITDA, and DDM are undefined or meaningless. Price-to-Sales (P/S) is always positive as long as sales exist.",
    "distractor_analysis": {
      "A": "Incorrect. \"Price-to-Earnings (P/E) ratio\" misapplies equity valuation models: attempting to calculate p/e on negative earnings.",
      "B": "Correct. When a start-up has negative net income, negative EBITDA, and pays no dividends, P/E, EV/EBITDA, and DDM are undefined or meaningless. Price-to-Sales (P/S) is always positive as long as sales exist.",
      "C": "Incorrect. \"Dividend Discount Model (DDM)\" misapplies equity valuation models: attempting to calculate p/e on negative earnings."
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
      "A": "Advertising marketing agencies with valuable customer brand loyalty",
      "B": "Software technology companies with heavy investments in uncapitalized R&D and human capital",
      "C": "Financial institutions or natural resource companies with tangible, liquid, mark-to-market assets"
    },
    "correct_option": "C",
    "explanation": "Asset-based valuation works best for asset-heavy firms (banks, REITs, natural resource firms) where book values closely track liquid market values. It fails for firms driven by intangible intellectual property.",
    "distractor_analysis": {
      "A": "Incorrect. \"Advertising marketing agencies with valuable customer brand loyalty\" misapplies equity valuation models: applying asset-based models to tech firms with unrecorded intangible assets.",
      "B": "Incorrect. \"Software technology companies with heavy investments in uncapitalized R&D and human capital\" misapplies equity valuation models: applying asset-based models to tech firms with unrecorded intangible assets.",
      "C": "Correct. Asset-based valuation works best for asset-heavy firms (banks, REITs, natural resource firms) where book values closely track liquid market values. It fails for firms driven by intangible intellectual property."
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
      "B": "b / (r - g)",
      "C": "(1 + g) / (r - g)"
    },
    "correct_option": "A",
    "explanation": "From P0 = D1 / (r - g) and D1 = E1 * (1 - b): P0 / E1 = (1 - b) / (r - g), where 1 - b is the dividend payout ratio.",
    "distractor_analysis": {
      "A": "Correct. From P0 = D1 / (r - g) and D1 = E1 * (1 - b): P0 / E1 = (1 - b) / (r - g), where 1 - b is the dividend payout ratio.",
      "B": "Incorrect. \"b / (r - g)\" misapplies equity valuation models: using retention rate b in numerator instead of payout ratio (1 - b).",
      "C": "Incorrect. \"(1 + g) / (r - g)\" misapplies equity valuation models: using retention rate b in numerator instead of payout ratio (1 - b)."
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
      "A": "15.0%",
      "B": "13.0%",
      "C": "10.0%"
    },
    "correct_option": "B",
    "explanation": "CAPM required return r_e = R_f + beta * ERP = 4% + 1.5 * (6%) = 4% + 9% = 13.0%.",
    "distractor_analysis": {
      "A": "Incorrect. \"15.0%\" misapplies equity valuation models: adding beta directly to erp (4% + 1.5 + 6% = 11.5%) or omitting risk-free rate.",
      "B": "Correct. CAPM required return r_e = R_f + beta * ERP = 4% + 1.5 * (6%) = 4% + 9% = 13.0%.",
      "C": "Incorrect. \"10.0%\" misapplies equity valuation models: adding beta directly to erp (4% + 1.5 + 6% = 11.5%) or omitting risk-free rate."
    },
    "misconception": "Adding beta directly to ERP (4% + 1.5 + 6% = 11.5%) or omitting risk-free rate.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Equity Investments",
    "skill_domain": "Equity Valuation: Concepts and Basic Tools",
    "difficulty_tier": 3,
    "question_text": "An equity analyst evaluates a stable industrial firm with a required rate of return of 10.0%, a return on equity (ROE) of 15.0%, and a constant dividend payout ratio of 40.0%. What is the justified forward price-to-earnings ratio ($P_0 / E_1$) of this firm?",
    "options": {
      "A": "10.0x",
      "B": "4.0x",
      "C": "40.0x"
    },
    "correct_option": "C",
    "explanation": "Step 1: Calculate the retention rate $b = 1 - \\text{Payout Ratio} = 1 - 0.40 = 0.60$.\nStep 2: Calculate the sustainable growth rate $g = b \\times \\text{ROE} = 0.60 \\times 15.0\\% = 9.0\\%$.\nStep 3: Calculate the justified forward P/E ratio:\n$$\\frac{P_0}{E_1} = \\frac{1 - b}{r - g} = \\frac{0.40}{0.10 - 0.09} = \\frac{0.40}{0.01} = 40.0x$$.",
    "distractor_analysis": {
      "A": "Incorrect. Erroneously used $1 / r = 1 / 0.10 = 10.0x$, ignoring the firm's growth rate $g$.",
      "B": "Incorrect. Divided the payout ratio by $r$ directly without accounting for the denominator difference $(r - g)$: $0.40 / 0.10 = 4.0x$.",
      "C": "Correct. Step 1: Calculate the retention rate $b = 1 - \\text{Payout Ratio} = 1 - 0.40 = 0.60$.\nStep 2: Calculate the sustainable growth rate $g = b \\times \\text{ROE} = 0.60 \\times 15.0\\% = 9.0\\%$.\nStep 3: Calculate the justified forward P/E ratio:\n$$\\frac{P_0}{E_1} = \\frac{1 - b}{r - g} = \\frac{0.40}{0.10 - 0.09} = \\frac{0.40}{0.01} = 40.0x$$."
    },
    "misconception": "Using the static earnings capitalization multiple ($1/r$) or neglecting the denominator spread $(r - g)$ in the Gordon Growth Model.",
    "time_estimate_seconds": 70
  }
];
