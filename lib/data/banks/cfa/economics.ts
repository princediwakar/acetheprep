// Path: lib/data/banks/cfa/economics.ts
import type { SeedQuestion } from "../../question-bank-seed";

export const CFA_ECONOMICS_QUESTIONS: SeedQuestion[] = [
  {
    "exam_name": "CFA Level 1",
    "subject": "Economics",
    "skill_domain": "Microeconomic Analysis",
    "difficulty_tier": 2,
    "question_text": "If the own-price elasticity of demand for a product is -1.5, a 10% decrease in price will cause total revenue to:",
    "options": {
      "A": "Decrease",
      "B": "Increase",
      "C": "Remain unchanged"
    },
    "correct_option": "B",
    "explanation": "When demand is elastic (|elasticity| > 1.0), percentage increase in quantity demanded (+15%) exceeds percentage reduction in price (-10%), causing total revenue (P x Q) to increase.",
    "distractor_analysis": {
      "A": "Incorrect. \"Decrease\" contradicts economic principles: assuming price cuts always reduce total revenue.",
      "B": "Correct. When demand is elastic (|elasticity| > 1.0), percentage increase in quantity demanded (+15%) exceeds percentage reduction in price (-10%), causing total revenue (P x Q) to increase.",
      "C": "Incorrect. \"Remain unchanged\" contradicts economic principles: assuming price cuts always reduce total revenue."
    },
    "misconception": "Assuming price cuts always reduce total revenue.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Economics",
    "skill_domain": "Microeconomic Analysis",
    "difficulty_tier": 2,
    "question_text": "Under perfect competition in the long-run equilibrium, an individual firm produces at the output level where:",
    "options": {
      "A": "Marginal Revenue exceeds Average Variable Cost by the maximum amount",
      "B": "Price > Marginal Cost, earning supernormal monopoly profit",
      "C": "Price = Marginal Cost = Minimum Average Total Cost, earning zero economic profit"
    },
    "correct_option": "C",
    "explanation": "Long-run competitive equilibrium forces price to equal marginal cost and minimum average total cost (P = MC = min ATC), driving economic profits to zero.",
    "distractor_analysis": {
      "A": "Incorrect. \"Marginal Revenue exceeds Average Variable Cost by the maximum amount\" contradicts economic principles: confusing zero economic profit with zero accounting profit.",
      "B": "Incorrect. \"Price > Marginal Cost, earning supernormal monopoly profit\" contradicts economic principles: confusing zero economic profit with zero accounting profit.",
      "C": "Correct. Long-run competitive equilibrium forces price to equal marginal cost and minimum average total cost (P = MC = min ATC), driving economic profits to zero."
    },
    "misconception": "Confusing zero economic profit with zero accounting profit.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Economics",
    "skill_domain": "Microeconomic Analysis",
    "difficulty_tier": 2,
    "question_text": "If cross-price elasticity of demand between Good X and Good Y is positive (+0.8), the two goods are:",
    "options": {
      "A": "Substitutes",
      "B": "Complements",
      "C": "Veblen goods"
    },
    "correct_option": "A",
    "explanation": "Positive cross-price elasticity means an increase in the price of Good Y leads to an increase in demand for Good X, identifying them as substitute goods.",
    "distractor_analysis": {
      "A": "Correct. Positive cross-price elasticity means an increase in the price of Good Y leads to an increase in demand for Good X, identifying them as substitute goods.",
      "B": "Incorrect. \"Complements\" contradicts economic principles: confusing substitutes (positive) with complements (negative).",
      "C": "Incorrect. \"Veblen goods\" contradicts economic principles: confusing substitutes (positive) with complements (negative)."
    },
    "misconception": "Confusing substitutes (positive) with complements (negative).",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Economics",
    "skill_domain": "Microeconomic Analysis",
    "difficulty_tier": 2,
    "question_text": "In a monopoly, the profit-maximizing output condition is characterized by:",
    "options": {
      "A": "Marginal Revenue = Average Total Cost",
      "B": "Marginal Revenue = Marginal Cost, with Price > Marginal Cost",
      "C": "Price = Marginal Cost"
    },
    "correct_option": "B",
    "explanation": "A monopolist maximizes profit by producing where MR = MC. Because the demand curve slopes downward, Price exceeds Marginal Revenue, resulting in P > MC and deadweight loss.",
    "distractor_analysis": {
      "A": "Incorrect. \"Marginal Revenue = Average Total Cost\" contradicts economic principles: assuming monopolists produce where p = mc.",
      "B": "Correct. A monopolist maximizes profit by producing where MR = MC. Because the demand curve slopes downward, Price exceeds Marginal Revenue, resulting in P > MC and deadweight loss.",
      "C": "Incorrect. \"Price = Marginal Cost\" contradicts economic principles: assuming monopolists produce where p = mc."
    },
    "misconception": "Assuming monopolists produce where P = MC.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Economics",
    "skill_domain": "Microeconomic Analysis",
    "difficulty_tier": 2,
    "question_text": "The Law of Diminishing Marginal Returns states that as successive units of a variable input are added to fixed inputs:",
    "options": {
      "A": "Total output immediately decreases",
      "B": "Average fixed cost begins to rise",
      "C": "Marginal product of the variable input eventually declines"
    },
    "correct_option": "C",
    "explanation": "Beyond a certain level of production, adding more units of a variable input (e.g. labor) to fixed capital causes the marginal additions to output (marginal product) to decline.",
    "distractor_analysis": {
      "A": "Incorrect. \"Total output immediately decreases\" contradicts economic principles: confusing diminishing returns with negative total returns.",
      "B": "Incorrect. \"Average fixed cost begins to rise\" contradicts economic principles: confusing diminishing returns with negative total returns.",
      "C": "Correct. Beyond a certain level of production, adding more units of a variable input (e.g. labor) to fixed capital causes the marginal additions to output (marginal product) to decline."
    },
    "misconception": "Confusing diminishing returns with negative total returns.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Economics",
    "skill_domain": "Microeconomic Analysis",
    "difficulty_tier": 2,
    "question_text": "A Giffen good is an inferior good for which the negative income effect:",
    "options": {
      "A": "Outweighs the substitution effect, resulting in an upward-sloping demand curve",
      "B": "Is smaller than the substitution effect",
      "C": "Is exactly canceled by the substitution effect"
    },
    "correct_option": "A",
    "explanation": "A Giffen good is a highly inferior staple where the negative income effect dominates the substitution effect, leading to higher quantity demanded when price increases.",
    "distractor_analysis": {
      "A": "Correct. A Giffen good is a highly inferior staple where the negative income effect dominates the substitution effect, leading to higher quantity demanded when price increases.",
      "B": "Incorrect. \"Is smaller than the substitution effect\" contradicts economic principles: confusing giffen goods with veblen luxury status goods.",
      "C": "Incorrect. \"Is exactly canceled by the substitution effect\" contradicts economic principles: confusing giffen goods with veblen luxury status goods."
    },
    "misconception": "Confusing Giffen goods with Veblen luxury status goods.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Economics",
    "skill_domain": "Microeconomic Analysis",
    "difficulty_tier": 2,
    "question_text": "In the kinked demand curve model of oligopoly, the demand curve facing an individual firm is:",
    "options": {
      "A": "Less elastic above the prevailing price and more elastic below it",
      "B": "More elastic above the current prevailing price and less elastic below it",
      "C": "Linear and infinitely elastic throughout"
    },
    "correct_option": "B",
    "explanation": "Firms assume rivals will not match price increases (making demand elastic above prevailing price) but will aggressively match price cuts (making demand inelastic below it).",
    "distractor_analysis": {
      "A": "Incorrect. \"Less elastic above the prevailing price and more elastic below it\" contradicts economic principles: inverting the elasticity above and below the kink.",
      "B": "Correct. Firms assume rivals will not match price increases (making demand elastic above prevailing price) but will aggressively match price cuts (making demand inelastic below it).",
      "C": "Incorrect. \"Linear and infinitely elastic throughout\" contradicts economic principles: inverting the elasticity above and below the kink."
    },
    "misconception": "Inverting the elasticity above and below the kink.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Economics",
    "skill_domain": "Microeconomic Analysis",
    "difficulty_tier": 2,
    "question_text": "A firm should temporarily shut down operations in the short run if market price falls below:",
    "options": {
      "A": "Average Fixed Cost (AFC)",
      "B": "Minimum Average Total Cost (ATC)",
      "C": "Minimum Average Variable Cost (AVC)"
    },
    "correct_option": "C",
    "explanation": "In the short run, fixed costs are sunk. If price covers Average Variable Cost (P >= AVC), the firm covers operating costs and contributes toward fixed overhead. If P < min AVC, it minimizes losses by shutting down.",
    "distractor_analysis": {
      "A": "Incorrect. \"Average Fixed Cost (AFC)\" contradicts economic principles: confusing the short-run shutdown rule (p < avc) with the long-run exit rule (p < atc).",
      "B": "Incorrect. \"Minimum Average Total Cost (ATC)\" contradicts economic principles: confusing the short-run shutdown rule (p < avc) with the long-run exit rule (p < atc).",
      "C": "Correct. In the short run, fixed costs are sunk. If price covers Average Variable Cost (P >= AVC), the firm covers operating costs and contributes toward fixed overhead. If P < min AVC, it minimizes losses by shutting down."
    },
    "misconception": "Confusing the short-run shutdown rule (P < AVC) with the long-run exit rule (P < ATC).",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Economics",
    "skill_domain": "Microeconomic Analysis",
    "difficulty_tier": 2,
    "question_text": "Which market structure is characterized by many sellers, differentiated products, low barriers to entry, and zero economic profits in the long run?",
    "options": {
      "A": "Monopolistic competition",
      "B": "Oligopoly",
      "C": "Perfect competition"
    },
    "correct_option": "A",
    "explanation": "Monopolistic competition combines product differentiation (slight pricing power) with free entry and exit, driving long-run economic profit to zero.",
    "distractor_analysis": {
      "A": "Correct. Monopolistic competition combines product differentiation (slight pricing power) with free entry and exit, driving long-run economic profit to zero.",
      "B": "Incorrect. \"Oligopoly\" contradicts economic principles: confusing monopolistic competition with oligopoly.",
      "C": "Incorrect. \"Perfect competition\" contradicts economic principles: confusing monopolistic competition with oligopoly."
    },
    "misconception": "Confusing monopolistic competition with oligopoly.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Economics",
    "skill_domain": "Microeconomic Analysis",
    "difficulty_tier": 2,
    "question_text": "Income elasticity of demand for luxury goods is:",
    "options": {
      "A": "Negative",
      "B": "Greater than 1.0",
      "C": "Between 0 and 1.0"
    },
    "correct_option": "B",
    "explanation": "A luxury good has income elasticity > 1.0 (demand expands by a greater percentage than income growth). Normal necessities are between 0 and 1; inferior goods are negative.",
    "distractor_analysis": {
      "A": "Incorrect. \"Negative\" contradicts economic principles: confusing luxury goods with normal necessities.",
      "B": "Correct. A luxury good has income elasticity > 1.0 (demand expands by a greater percentage than income growth). Normal necessities are between 0 and 1; inferior goods are negative.",
      "C": "Incorrect. \"Between 0 and 1.0\" contradicts economic principles: confusing luxury goods with normal necessities."
    },
    "misconception": "Confusing luxury goods with normal necessities.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Economics",
    "skill_domain": "Microeconomic Analysis",
    "difficulty_tier": 2,
    "question_text": "Consumer surplus is best defined as the difference between:",
    "options": {
      "A": "Market price and the marginal cost of production",
      "B": "Total revenue and total explicit economic cost",
      "C": "The maximum price consumers are willing to pay and the actual market price paid"
    },
    "correct_option": "C",
    "explanation": "Consumer surplus represents the area below the demand curve and above the market clearing price, measuring the net economic benefit realized by buyers.",
    "distractor_analysis": {
      "A": "Incorrect. \"Market price and the marginal cost of production\" contradicts economic principles: confusing consumer surplus with producer surplus.",
      "B": "Incorrect. \"Total revenue and total explicit economic cost\" contradicts economic principles: confusing consumer surplus with producer surplus.",
      "C": "Correct. Consumer surplus represents the area below the demand curve and above the market clearing price, measuring the net economic benefit realized by buyers."
    },
    "misconception": "Confusing consumer surplus with producer surplus.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Economics",
    "skill_domain": "Monetary and Fiscal Policy",
    "difficulty_tier": 2,
    "question_text": "If the central bank increases the commercial bank reserve requirement ratio, what happens to the money supply and interest rates?",
    "options": {
      "A": "Money supply decreases and short-term interest rates increase",
      "B": "Both money supply and interest rates decrease",
      "C": "Money supply increases and interest rates decrease"
    },
    "correct_option": "A",
    "explanation": "Increasing reserve requirements lowers the money multiplier (1/RR), restricting bank credit creation and contracting the money supply, which pushes short-term interest rates upward.",
    "distractor_analysis": {
      "A": "Correct. Increasing reserve requirements lowers the money multiplier (1/RR), restricting bank credit creation and contracting the money supply, which pushes short-term interest rates upward.",
      "B": "Incorrect. \"Both money supply and interest rates decrease\" contradicts economic principles: assuming higher reserve requirements expand lending.",
      "C": "Incorrect. \"Money supply increases and interest rates decrease\" contradicts economic principles: assuming higher reserve requirements expand lending."
    },
    "misconception": "Assuming higher reserve requirements expand lending.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Economics",
    "skill_domain": "Monetary and Fiscal Policy",
    "difficulty_tier": 2,
    "question_text": "The quantity theory of money (MV = PY) implies that if money velocity V and real output Y are constant, an increase in money supply M causes:",
    "options": {
      "A": "A decrease in the price level",
      "B": "A proportional increase in the general price level P (inflation)",
      "C": "An immediate doubling of real gross domestic product"
    },
    "correct_option": "B",
    "explanation": "In the classical monetarist framework MV = PY, with velocity and real transactions fixed, growth in the money supply translates directly into proportional inflation in price level P.",
    "distractor_analysis": {
      "A": "Incorrect. \"A decrease in the price level\" contradicts economic principles: believing monetary expansion automatically increases real long-run output.",
      "B": "Correct. In the classical monetarist framework MV = PY, with velocity and real transactions fixed, growth in the money supply translates directly into proportional inflation in price level P.",
      "C": "Incorrect. \"An immediate doubling of real gross domestic product\" contradicts economic principles: believing monetary expansion automatically increases real long-run output."
    },
    "misconception": "Believing monetary expansion automatically increases real long-run output.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Economics",
    "skill_domain": "Monetary and Fiscal Policy",
    "difficulty_tier": 2,
    "question_text": "The 'crowding-out effect' in fiscal policy refers to:",
    "options": {
      "A": "Tax increases reducing household labor supply",
      "B": "Government subsidies crowding out foreign exporters",
      "C": "Government deficit borrowing increasing real interest rates and reducing private capital investment"
    },
    "correct_option": "C",
    "explanation": "When government borrows heavily to fund fiscal deficits, increased demand for loanable funds drives real interest rates higher, crowding out private business investment expenditure.",
    "distractor_analysis": {
      "A": "Incorrect. \"Tax increases reducing household labor supply\" contradicts economic principles: thinking crowding out refers to physical imports or population shifts.",
      "B": "Incorrect. \"Government subsidies crowding out foreign exporters\" contradicts economic principles: thinking crowding out refers to physical imports or population shifts.",
      "C": "Correct. When government borrows heavily to fund fiscal deficits, increased demand for loanable funds drives real interest rates higher, crowding out private business investment expenditure."
    },
    "misconception": "Thinking crowding out refers to physical imports or population shifts.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Economics",
    "skill_domain": "Monetary and Fiscal Policy",
    "difficulty_tier": 2,
    "question_text": "According to Ricardian equivalence, a debt-financed tax cut by the government will:",
    "options": {
      "A": "Have no impact on aggregate demand because forward-looking households save the tax cut to pay future taxes",
      "B": "Substantially increase current consumer spending and stimulate aggregate demand",
      "C": "Permanently lower long-term interest rates"
    },
    "correct_option": "A",
    "explanation": "Ricardian equivalence posits that rational consumers anticipate future tax liabilities required to repay government debt, offsetting deficit spending with increased private savings.",
    "distractor_analysis": {
      "A": "Correct. Ricardian equivalence posits that rational consumers anticipate future tax liabilities required to repay government debt, offsetting deficit spending with increased private savings.",
      "B": "Incorrect. \"Substantially increase current consumer spending and stimulate aggregate demand\" contradicts economic principles: assuming consumers spend the entire tax windfall.",
      "C": "Incorrect. \"Permanently lower long-term interest rates\" contradicts economic principles: assuming consumers spend the entire tax windfall."
    },
    "misconception": "Assuming consumers spend the entire tax windfall.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Economics",
    "skill_domain": "Monetary and Fiscal Policy",
    "difficulty_tier": 2,
    "question_text": "An economy operating above full employment with an inflationary output gap can be stabilized by:",
    "options": {
      "A": "Lowering the central bank policy interest rate",
      "B": "Contractionary fiscal policy (cutting government spending or raising taxes)",
      "C": "Expansionary open market bond purchases by the central bank"
    },
    "correct_option": "B",
    "explanation": "An inflationary gap (aggregate demand exceeding potential GDP) requires contractionary policy—reducing government spending, raising taxes, or tightening interest rates—to shift AD leftward.",
    "distractor_analysis": {
      "A": "Incorrect. \"Lowering the central bank policy interest rate\" contradicts economic principles: applying expansionary fiscal policy during an inflationary boom.",
      "B": "Correct. An inflationary gap (aggregate demand exceeding potential GDP) requires contractionary policy—reducing government spending, raising taxes, or tightening interest rates—to shift AD leftward.",
      "C": "Incorrect. \"Expansionary open market bond purchases by the central bank\" contradicts economic principles: applying expansionary fiscal policy during an inflationary boom."
    },
    "misconception": "Applying expansionary fiscal policy during an inflationary boom.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Economics",
    "skill_domain": "Monetary and Fiscal Policy",
    "difficulty_tier": 2,
    "question_text": "What is the primary operational mandate of an inflation-targeting central bank?",
    "options": {
      "A": "Maximizing national export trade surpluses",
      "B": "Fixing the foreign exchange rate to gold",
      "C": "Maintaining headline or core inflation within a specified numerical target band over the medium term"
    },
    "correct_option": "C",
    "explanation": "Inflation targeting commits the monetary authority to using policy interest rates to keep forecasted inflation close to an explicit target (typically around 2%).",
    "distractor_analysis": {
      "A": "Incorrect. \"Maximizing national export trade surpluses\" contradicts economic principles: confusing inflation targeting with exchange rate pegging.",
      "B": "Incorrect. \"Fixing the foreign exchange rate to gold\" contradicts economic principles: confusing inflation targeting with exchange rate pegging.",
      "C": "Correct. Inflation targeting commits the monetary authority to using policy interest rates to keep forecasted inflation close to an explicit target (typically around 2%)."
    },
    "misconception": "Confusing inflation targeting with exchange rate pegging.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Economics",
    "skill_domain": "Monetary and Fiscal Policy",
    "difficulty_tier": 2,
    "question_text": "In a liquidity trap, monetary policy becomes largely ineffective because:",
    "options": {
      "A": "Demand for money becomes infinitely elastic at near-zero interest rates, so injections of liquidity are hoarded as cash",
      "B": "Inflation expectations rise uncontrollably",
      "C": "Commercial banks face statutory reserve requirements of 100%"
    },
    "correct_option": "A",
    "explanation": "At the zero lower bound, interest rates cannot fall further. Open market purchases simply swap bonds for cash, which banks and households hoard rather than lend or spend.",
    "distractor_analysis": {
      "A": "Correct. At the zero lower bound, interest rates cannot fall further. Open market purchases simply swap bonds for cash, which banks and households hoard rather than lend or spend.",
      "B": "Incorrect. \"Inflation expectations rise uncontrollably\" contradicts economic principles: assuming monetary policy retains full power at the zero lower bound.",
      "C": "Incorrect. \"Commercial banks face statutory reserve requirements of 100%\" contradicts economic principles: assuming monetary policy retains full power at the zero lower bound."
    },
    "misconception": "Assuming monetary policy retains full power at the zero lower bound.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Economics",
    "skill_domain": "Monetary and Fiscal Policy",
    "difficulty_tier": 2,
    "question_text": "A central bank conducting open market bond sales is implementing:",
    "options": {
      "A": "Expansionary monetary policy that lowers lending rates",
      "B": "Contractionary monetary policy that drains reserves from the banking system",
      "C": "Quantitative easing to stimulate mortgage borrowing"
    },
    "correct_option": "B",
    "explanation": "Selling government securities on the open market absorbs commercial bank cash reserves, reducing loanable funds and raising interbank interest rates (contractionary policy).",
    "distractor_analysis": {
      "A": "Incorrect. \"Expansionary monetary policy that lowers lending rates\" contradicts economic principles: confusing bond sales (tightening) with bond purchases (easing).",
      "B": "Correct. Selling government securities on the open market absorbs commercial bank cash reserves, reducing loanable funds and raising interbank interest rates (contractionary policy).",
      "C": "Incorrect. \"Quantitative easing to stimulate mortgage borrowing\" contradicts economic principles: confusing bond sales (tightening) with bond purchases (easing)."
    },
    "misconception": "Confusing bond sales (tightening) with bond purchases (easing).",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Economics",
    "skill_domain": "Monetary and Fiscal Policy",
    "difficulty_tier": 2,
    "question_text": "Automatic stabilizers in fiscal policy refer to:",
    "options": {
      "A": "Automated computer trading rules executed by the treasury",
      "B": "Discretionary stimulus packages passed by parliament during recessions",
      "C": "Built-in tax and transfer mechanisms that counteract economic fluctuations without explicit legislative action"
    },
    "correct_option": "C",
    "explanation": "Automatic stabilizers (such as progressive income tax brackets and unemployment insurance) automatically reduce tax burdens and boost transfer payments during recessions without legislative delays.",
    "distractor_analysis": {
      "A": "Incorrect. \"Automated computer trading rules executed by the treasury\" contradicts economic principles: confusing automatic stabilizers with discretionary fiscal stimulus.",
      "B": "Incorrect. \"Discretionary stimulus packages passed by parliament during recessions\" contradicts economic principles: confusing automatic stabilizers with discretionary fiscal stimulus.",
      "C": "Correct. Automatic stabilizers (such as progressive income tax brackets and unemployment insurance) automatically reduce tax burdens and boost transfer payments during recessions without legislative delays."
    },
    "misconception": "Confusing automatic stabilizers with discretionary fiscal stimulus.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Economics",
    "skill_domain": "Monetary and Fiscal Policy",
    "difficulty_tier": 2,
    "question_text": "The transmission mechanism of monetary policy describes how central bank interest rate changes affect:",
    "options": {
      "A": "Aggregate demand, output, employment, and the overall price level through credit, asset prices, and exchange rates",
      "B": "Corporate tax receipts collected by the internal revenue service",
      "C": "Constitutional debt ceiling negotiations"
    },
    "correct_option": "A",
    "explanation": "The monetary transmission mechanism traces how shifts in the policy rate ripple through market interest rates, asset prices, bank lending, exchange rates, and ultimately aggregate demand and inflation.",
    "distractor_analysis": {
      "A": "Correct. The monetary transmission mechanism traces how shifts in the policy rate ripple through market interest rates, asset prices, bank lending, exchange rates, and ultimately aggregate demand and inflation.",
      "B": "Incorrect. \"Corporate tax receipts collected by the internal revenue service\" contradicts economic principles: confusing transmission mechanism with physical currency distribution.",
      "C": "Incorrect. \"Constitutional debt ceiling negotiations\" contradicts economic principles: confusing transmission mechanism with physical currency distribution."
    },
    "misconception": "Confusing transmission mechanism with physical currency distribution.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Economics",
    "skill_domain": "Monetary and Fiscal Policy",
    "difficulty_tier": 2,
    "question_text": "Which function of money enables market participants to defer payments and settle future debt obligations?",
    "options": {
      "A": "Unit of account",
      "B": "Standard of deferred payment",
      "C": "Medium of exchange"
    },
    "correct_option": "B",
    "explanation": "Money functions as a standard of deferred payment by serving as the accepted benchmark unit for specifying future debts and contractual obligations.",
    "distractor_analysis": {
      "A": "Incorrect. \"Unit of account\" contradicts economic principles: confusing deferred payment with medium of exchange.",
      "B": "Correct. Money functions as a standard of deferred payment by serving as the accepted benchmark unit for specifying future debts and contractual obligations.",
      "C": "Incorrect. \"Medium of exchange\" contradicts economic principles: confusing deferred payment with medium of exchange."
    },
    "misconception": "Confusing deferred payment with medium of exchange.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Economics",
    "skill_domain": "International Trade & Capital Flows",
    "difficulty_tier": 2,
    "question_text": "According to the Ricardian theory of comparative advantage, mutually beneficial international trade occurs whenever two nations have:",
    "options": {
      "A": "Identical labor productivity across all industries",
      "B": "Equal absolute production costs in all product categories",
      "C": "Different opportunity costs of producing goods, even if one country has an absolute advantage in all goods"
    },
    "correct_option": "C",
    "explanation": "David Ricardo proved that trade gains stem from comparative advantage (differences in relative opportunity costs), allowing specialization even if one partner has an absolute advantage across all goods.",
    "distractor_analysis": {
      "A": "Incorrect. \"Identical labor productivity across all industries\" contradicts economic principles: believing absolute advantage is required to benefit from trade.",
      "B": "Incorrect. \"Equal absolute production costs in all product categories\" contradicts economic principles: believing absolute advantage is required to benefit from trade.",
      "C": "Correct. David Ricardo proved that trade gains stem from comparative advantage (differences in relative opportunity costs), allowing specialization even if one partner has an absolute advantage across all goods."
    },
    "misconception": "Believing absolute advantage is required to benefit from trade.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Economics",
    "skill_domain": "International Trade & Capital Flows",
    "difficulty_tier": 2,
    "question_text": "The fundamental macroeconomic balance of payments identity states that the current account balance (CA) equals:",
    "options": {
      "A": "CA = (S - I) + (T - G)",
      "B": "CA = S + I + G",
      "C": "CA = (I - S) + (G - T)"
    },
    "correct_option": "A",
    "explanation": "From Y = C + I + G + (X - M) and Y = C + S + T: X - M = (S - I) + (T - G). Current Account balance equals private saving surplus (S - I) plus public fiscal surplus (T - G).",
    "distractor_analysis": {
      "A": "Correct. From Y = C + I + G + (X - M) and Y = C + S + T: X - M = (S - I) + (T - G). Current Account balance equals private saving surplus (S - I) plus public fiscal surplus (T - G).",
      "B": "Incorrect. \"CA = S + I + G\" contradicts economic principles: sign errors in the macroeconomic balance identity.",
      "C": "Incorrect. \"CA = (I - S) + (G - T)\" contradicts economic principles: sign errors in the macroeconomic balance identity."
    },
    "misconception": "Sign errors in the macroeconomic balance identity.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Economics",
    "skill_domain": "International Trade & Capital Flows",
    "difficulty_tier": 2,
    "question_text": "Which trade barrier generates tariff revenue for the domestic government while raising the domestic price of imported goods?",
    "options": {
      "A": "Voluntary export restraint (VER)",
      "B": "Import tariff",
      "C": "Import quota with licenses granted to foreign exporters"
    },
    "correct_option": "B",
    "explanation": "An import tariff imposes a tax on foreign imports, collected directly by the domestic government. An import quota transfers rents to license holders, and VER transfers rents to foreign exporters.",
    "distractor_analysis": {
      "A": "Incorrect. \"Voluntary export restraint (VER)\" contradicts economic principles: confusing tariff revenue with quota rents.",
      "B": "Correct. An import tariff imposes a tax on foreign imports, collected directly by the domestic government. An import quota transfers rents to license holders, and VER transfers rents to foreign exporters.",
      "C": "Incorrect. \"Import quota with licenses granted to foreign exporters\" contradicts economic principles: confusing tariff revenue with quota rents."
    },
    "misconception": "Confusing tariff revenue with quota rents.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Economics",
    "skill_domain": "International Trade & Capital Flows",
    "difficulty_tier": 2,
    "question_text": "According to the Heckscher-Ohlin model, a country with abundant capital and scarce labor will:",
    "options": {
      "A": "Export only natural raw commodities",
      "B": "Export labor-intensive goods and import capital-intensive goods",
      "C": "Export capital-intensive goods and import labor-intensive goods"
    },
    "correct_option": "C",
    "explanation": "The Heckscher-Ohlin theorem states that nations export goods intensive in their abundant domestic factors of production (capital) and import goods intensive in scarce factors (labor).",
    "distractor_analysis": {
      "A": "Incorrect. \"Export only natural raw commodities\" contradicts economic principles: inverting factor intensity predictions.",
      "B": "Incorrect. \"Export labor-intensive goods and import capital-intensive goods\" contradicts economic principles: inverting factor intensity predictions.",
      "C": "Correct. The Heckscher-Ohlin theorem states that nations export goods intensive in their abundant domestic factors of production (capital) and import goods intensive in scarce factors (labor)."
    },
    "misconception": "Inverting factor intensity predictions.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Economics",
    "skill_domain": "International Trade & Capital Flows",
    "difficulty_tier": 2,
    "question_text": "A persistent current account deficit in a country must be financed by:",
    "options": {
      "A": "A net financial account surplus (net capital inflows / foreign borrowing)",
      "B": "A surplus in domestic consumer spending",
      "C": "An immediate appreciation of the domestic currency"
    },
    "correct_option": "A",
    "explanation": "Because the balance of payments must sum to zero (CA + FA + KA = 0), a current account deficit must be offset by net capital inflows (financial account surplus) via foreign borrowing or foreign asset sales.",
    "distractor_analysis": {
      "A": "Correct. Because the balance of payments must sum to zero (CA + FA + KA = 0), a current account deficit must be offset by net capital inflows (financial account surplus) via foreign borrowing or foreign asset sales.",
      "B": "Incorrect. \"A surplus in domestic consumer spending\" contradicts economic principles: assuming a current account deficit can exist without corresponding foreign financing.",
      "C": "Incorrect. \"An immediate appreciation of the domestic currency\" contradicts economic principles: assuming a current account deficit can exist without corresponding foreign financing."
    },
    "misconception": "Assuming a current account deficit can exist without corresponding foreign financing.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Economics",
    "skill_domain": "International Trade & Capital Flows",
    "difficulty_tier": 2,
    "question_text": "Which regional economic integration level establishes common external tariffs against non-members while eliminating internal trade barriers?",
    "options": {
      "A": "Common market",
      "B": "Customs union",
      "C": "Free trade area"
    },
    "correct_option": "B",
    "explanation": "A Free Trade Area removes internal tariffs but allows member countries to set independent external tariffs. A Customs Union establishes a common external tariff policy across all members.",
    "distractor_analysis": {
      "A": "Incorrect. \"Common market\" contradicts economic principles: confusing free trade area with customs union.",
      "B": "Correct. A Free Trade Area removes internal tariffs but allows member countries to set independent external tariffs. A Customs Union establishes a common external tariff policy across all members.",
      "C": "Incorrect. \"Free trade area\" contradicts economic principles: confusing free trade area with customs union."
    },
    "misconception": "Confusing free trade area with customs union.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Economics",
    "skill_domain": "International Trade & Capital Flows",
    "difficulty_tier": 2,
    "question_text": "Foreign direct investment (FDI) is distinguished from foreign portfolio investment (FPI) by:",
    "options": {
      "A": "FDI consisting exclusively of short-term liquid sovereign debt purchases",
      "B": "FDI trading on secondary electronic stock exchanges",
      "C": "FDI involving long-term substantial ownership (> 10%) with operational managerial control"
    },
    "correct_option": "C",
    "explanation": "FDI entails significant physical capital investment and managerial control (>= 10% ownership), whereas portfolio investment represents passive holdings of liquid financial securities.",
    "distractor_analysis": {
      "A": "Incorrect. \"FDI consisting exclusively of short-term liquid sovereign debt purchases\" contradicts economic principles: confusing physical fdi with passive liquid portfolio flows.",
      "B": "Incorrect. \"FDI trading on secondary electronic stock exchanges\" contradicts economic principles: confusing physical fdi with passive liquid portfolio flows.",
      "C": "Correct. FDI entails significant physical capital investment and managerial control (>= 10% ownership), whereas portfolio investment represents passive holdings of liquid financial securities."
    },
    "misconception": "Confusing physical FDI with passive liquid portfolio flows.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Economics",
    "skill_domain": "International Trade & Capital Flows",
    "difficulty_tier": 2,
    "question_text": "When a small importing nation imposes an import tariff on a good, the net effect on national economic welfare is:",
    "options": {
      "A": "Negative, due to deadweight production and consumption distortion losses",
      "B": "Zero, because tariff revenue exactly offsets consumer welfare losses",
      "C": "Positive, because domestic producers gain more than consumers lose"
    },
    "correct_option": "A",
    "explanation": "For a small country that cannot influence world prices, the tariff causes deadweight losses in production efficiency and consumption choices that exceed tariff revenue, reducing net national welfare.",
    "distractor_analysis": {
      "A": "Correct. For a small country that cannot influence world prices, the tariff causes deadweight losses in production efficiency and consumption choices that exceed tariff revenue, reducing net national welfare.",
      "B": "Incorrect. \"Zero, because tariff revenue exactly offsets consumer welfare losses\" contradicts economic principles: assuming tariffs create net positive economic welfare for small countries.",
      "C": "Incorrect. \"Positive, because domestic producers gain more than consumers lose\" contradicts economic principles: assuming tariffs create net positive economic welfare for small countries."
    },
    "misconception": "Assuming tariffs create net positive economic welfare for small countries.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Economics",
    "skill_domain": "International Trade & Capital Flows",
    "difficulty_tier": 2,
    "question_text": "The primary role of the International Monetary Fund (IMF) is to:",
    "options": {
      "A": "Fund long-term poverty reduction infrastructure projects in developing nations",
      "B": "Promote global monetary cooperation, financial stability, and provide balance-of-payments emergency financing",
      "C": "Set global statutory corporate income tax rates"
    },
    "correct_option": "B",
    "explanation": "The IMF focuses on macroeconomic stability, exchange rate cooperation, and emergency balance of payments liquidity. The World Bank focuses on long-term economic development and poverty reduction.",
    "distractor_analysis": {
      "A": "Incorrect. \"Fund long-term poverty reduction infrastructure projects in developing nations\" contradicts economic principles: confusing the imf with the world bank.",
      "B": "Correct. The IMF focuses on macroeconomic stability, exchange rate cooperation, and emergency balance of payments liquidity. The World Bank focuses on long-term economic development and poverty reduction.",
      "C": "Incorrect. \"Set global statutory corporate income tax rates\" contradicts economic principles: confusing the imf with the world bank."
    },
    "misconception": "Confusing the IMF with the World Bank.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Economics",
    "skill_domain": "International Trade & Capital Flows",
    "difficulty_tier": 2,
    "question_text": "If a nation's domestic investment (I) exceeds domestic private savings (S) and the fiscal budget is balanced (G = T), the country must have a:",
    "options": {
      "A": "Capital account surplus driven by export growth",
      "B": "Current account surplus (net foreign lending)",
      "C": "Current account deficit (net foreign borrowing)"
    },
    "correct_option": "C",
    "explanation": "From CA = (S - I) + (T - G): if S < I and T = G, then CA is negative (current account deficit). Domestic investment must be funded by foreign capital inflows.",
    "distractor_analysis": {
      "A": "Incorrect. \"Capital account surplus driven by export growth\" contradicts economic principles: assuming domestic investment exceeding saving causes a trade surplus.",
      "B": "Incorrect. \"Current account surplus (net foreign lending)\" contradicts economic principles: assuming domestic investment exceeding saving causes a trade surplus.",
      "C": "Correct. From CA = (S - I) + (T - G): if S < I and T = G, then CA is negative (current account deficit). Domestic investment must be funded by foreign capital inflows."
    },
    "misconception": "Assuming domestic investment exceeding saving causes a trade surplus.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Economics",
    "skill_domain": "International Trade & Capital Flows",
    "difficulty_tier": 2,
    "question_text": "A voluntary export restraint (VER) differs from an import tariff primarily because:",
    "options": {
      "A": "The quota rents are captured by the foreign exporter rather than collected as domestic government revenue",
      "B": "It increases total domestic import volumes",
      "C": "It does not create any domestic deadweight loss"
    },
    "correct_option": "A",
    "explanation": "A VER restricts export volume from the foreign producer. Domestic prices rise, but the economic rent is captured by foreign exporters as higher margins rather than by the importing government.",
    "distractor_analysis": {
      "A": "Correct. A VER restricts export volume from the foreign producer. Domestic prices rise, but the economic rent is captured by foreign exporters as higher margins rather than by the importing government.",
      "B": "Incorrect. \"It increases total domestic import volumes\" contradicts economic principles: thinking vers generate tariff tax revenue for the importing country.",
      "C": "Incorrect. \"It does not create any domestic deadweight loss\" contradicts economic principles: thinking vers generate tariff tax revenue for the importing country."
    },
    "misconception": "Thinking VERs generate tariff tax revenue for the importing country.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Economics",
    "skill_domain": "Currency Exchange Rates",
    "difficulty_tier": 2,
    "question_text": "If the spot exchange rate changes from 1.20 USD/EUR to 1.32 USD/EUR, the Euro has:",
    "options": {
      "A": "Appreciated by 9.09% against the US Dollar",
      "B": "Appreciated by 10.0% against the US Dollar",
      "C": "Depreciated by 10.0% against the US Dollar"
    },
    "correct_option": "B",
    "explanation": "The base currency is EUR. Percentage change = (1.32 - 1.20) / 1.20 = 0.12 / 1.20 = +10.0%. The Euro has appreciated by 10.0%.",
    "distractor_analysis": {
      "A": "Incorrect. \"Appreciated by 9.09% against the US Dollar\" contradicts economic principles: confusing base and price currency appreciation calculations.",
      "B": "Correct. The base currency is EUR. Percentage change = (1.32 - 1.20) / 1.20 = 0.12 / 1.20 = +10.0%. The Euro has appreciated by 10.0%.",
      "C": "Incorrect. \"Depreciated by 10.0% against the US Dollar\" contradicts economic principles: confusing base and price currency appreciation calculations."
    },
    "misconception": "Confusing base and price currency appreciation calculations.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Economics",
    "skill_domain": "Currency Exchange Rates",
    "difficulty_tier": 2,
    "question_text": "According to Covered Interest Rate Parity (CIRP), the forward exchange rate premium or discount is determined by:",
    "options": {
      "A": "Historical spot exchange rate volatility",
      "B": "The relative size of the two countries' gross domestic products",
      "C": "The nominal interest rate differential between the two currencies"
    },
    "correct_option": "C",
    "explanation": "Covered interest rate parity formula: F / S = (1 + r_price) / (1 + r_base). The forward premium or discount prevents arbitrage by perfectly offsetting the interest rate differential.",
    "distractor_analysis": {
      "A": "Incorrect. \"Historical spot exchange rate volatility\" contradicts economic principles: assuming forward rates are driven by unhedged currency speculation.",
      "B": "Incorrect. \"The relative size of the two countries' gross domestic products\" contradicts economic principles: assuming forward rates are driven by unhedged currency speculation.",
      "C": "Correct. Covered interest rate parity formula: F / S = (1 + r_price) / (1 + r_base). The forward premium or discount prevents arbitrage by perfectly offsetting the interest rate differential."
    },
    "misconception": "Assuming forward rates are driven by unhedged currency speculation.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Economics",
    "skill_domain": "Currency Exchange Rates",
    "difficulty_tier": 2,
    "question_text": "If the 1-year US interest rate is 5% and the 1-year Eurozone interest rate is 2%, with spot rate S = 1.10 USD/EUR, what is the 1-year forward rate F (USD/EUR)?",
    "options": {
      "A": "1.1324 USD/EUR",
      "B": "1.1500 USD/EUR",
      "C": "1.0686 USD/EUR"
    },
    "correct_option": "A",
    "explanation": "F = S * [(1 + r_USD) / (1 + r_EUR)] = 1.10 * (1.05 / 1.02) = 1.10 * 1.02941 = 1.13235 approx 1.1324 USD/EUR. The base currency (EUR) trades at a forward premium because its interest rate is lower.",
    "distractor_analysis": {
      "A": "Correct. F = S * [(1 + r_USD) / (1 + r_EUR)] = 1.10 * (1.05 / 1.02) = 1.10 * 1.02941 = 1.13235 approx 1.1324 USD/EUR. The base currency (EUR) trades at a forward premium because its interest rate is lower.",
      "B": "Incorrect. \"1.1500 USD/EUR\" contradicts economic principles: inverting the interest rate ratio (using 1.02 / 1.05 = 1.0686).",
      "C": "Incorrect. \"1.0686 USD/EUR\" contradicts economic principles: inverting the interest rate ratio (using 1.02 / 1.05 = 1.0686)."
    },
    "misconception": "Inverting the interest rate ratio (using 1.02 / 1.05 = 1.0686).",
    "time_estimate_seconds": 50
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Economics",
    "skill_domain": "Currency Exchange Rates",
    "difficulty_tier": 2,
    "question_text": "According to Absolute Purchasing Power Parity (PPP), the spot exchange rate S (Price/Base) between two currencies is equal to:",
    "options": {
      "A": "The ratio of interest rates: r_price / r_base",
      "B": "The ratio of domestic price levels: P_price / P_base",
      "C": "The ratio of money supplies: M_price / M_base"
    },
    "correct_option": "B",
    "explanation": "Absolute PPP asserts that law of one price holds for a broad basket of goods, meaning S(P/B) = P_price / P_base.",
    "distractor_analysis": {
      "A": "Incorrect. \"The ratio of interest rates: r_price / r_base\" contradicts economic principles: inverting price levels or confusing with interest parity.",
      "B": "Correct. Absolute PPP asserts that law of one price holds for a broad basket of goods, meaning S(P/B) = P_price / P_base.",
      "C": "Incorrect. \"The ratio of money supplies: M_price / M_base\" contradicts economic principles: inverting price levels or confusing with interest parity."
    },
    "misconception": "Inverting price levels or confusing with interest parity.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Economics",
    "skill_domain": "Currency Exchange Rates",
    "difficulty_tier": 2,
    "question_text": "The real exchange rate between domestic currency (d) and foreign currency (f) is calculated as:",
    "options": {
      "A": "Nominal exchange rate S(d/f) + (P_foreign - P_domestic)",
      "B": "Nominal exchange rate S(d/f) * (P_domestic / P_foreign)",
      "C": "Nominal exchange rate S(d/f) * (P_foreign / P_domestic)"
    },
    "correct_option": "C",
    "explanation": "Real exchange rate q(d/f) = S(d/f) * (P_f / P_d). It measures the purchasing power of domestic goods relative to foreign goods.",
    "distractor_analysis": {
      "A": "Incorrect. \"Nominal exchange rate S(d/f) + (P_foreign - P_domestic)\" contradicts economic principles: inverting relative price level indices.",
      "B": "Incorrect. \"Nominal exchange rate S(d/f) * (P_domestic / P_foreign)\" contradicts economic principles: inverting relative price level indices.",
      "C": "Correct. Real exchange rate q(d/f) = S(d/f) * (P_f / P_d). It measures the purchasing power of domestic goods relative to foreign goods."
    },
    "misconception": "Inverting relative price level indices.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Economics",
    "skill_domain": "Currency Exchange Rates",
    "difficulty_tier": 2,
    "question_text": "In a dealer quote of 1.2540 - 1.2545 USD/EUR, the bid-ask spread is:",
    "options": {
      "A": "0.0005 (5 pips)",
      "B": "0.0040",
      "C": "0.0500"
    },
    "correct_option": "A",
    "explanation": "Bid = 1.2540, Ask = 1.2545. Spread = Ask - Bid = 1.2545 - 1.2540 = 0.0005 (5 pips or basis points in FX).",
    "distractor_analysis": {
      "A": "Correct. Bid = 1.2540, Ask = 1.2545. Spread = Ask - Bid = 1.2545 - 1.2540 = 0.0005 (5 pips or basis points in FX).",
      "B": "Incorrect. \"0.0040\" contradicts economic principles: arithmetic calculation error.",
      "C": "Incorrect. \"0.0500\" contradicts economic principles: arithmetic calculation error."
    },
    "misconception": "Arithmetic calculation error.",
    "time_estimate_seconds": 30
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Economics",
    "skill_domain": "Currency Exchange Rates",
    "difficulty_tier": 2,
    "question_text": "If CAD/USD is 1.3000 and EUR/USD is 0.8500, what is the cross exchange rate CAD/EUR?",
    "options": {
      "A": "0.6538 CAD/EUR",
      "B": "1.5294 CAD/EUR",
      "C": "1.1050 CAD/EUR"
    },
    "correct_option": "B",
    "explanation": "CAD/EUR = (CAD/USD) / (EUR/USD) = 1.3000 / 0.8500 = 1.5294 CAD/EUR.",
    "distractor_analysis": {
      "A": "Incorrect. \"0.6538 CAD/EUR\" contradicts economic principles: multiplying instead of dividing cross rates.",
      "B": "Correct. CAD/EUR = (CAD/USD) / (EUR/USD) = 1.3000 / 0.8500 = 1.5294 CAD/EUR.",
      "C": "Incorrect. \"1.1050 CAD/EUR\" contradicts economic principles: multiplying instead of dividing cross rates."
    },
    "misconception": "Multiplying instead of dividing cross rates.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Economics",
    "skill_domain": "Currency Exchange Rates",
    "difficulty_tier": 2,
    "question_text": "The Marshall-Lerner condition states that currency depreciation will improve the trade balance if:",
    "options": {
      "A": "Domestic interest rates are higher than foreign interest rates",
      "B": "The government eliminates its fiscal deficit",
      "C": "The sum of the price elasticities of demand for exports and imports is greater than 1 (|e_x + e_m| > 1)"
    },
    "correct_option": "C",
    "explanation": "For a devaluation to improve the current account, import and export demand must be sufficiently elastic so that volume expansion outweighs price worsening: |e_x + e_m| > 1.",
    "distractor_analysis": {
      "A": "Incorrect. \"Domestic interest rates are higher than foreign interest rates\" contradicts economic principles: assuming any currency depreciation automatically improves the trade balance immediately.",
      "B": "Incorrect. \"The government eliminates its fiscal deficit\" contradicts economic principles: assuming any currency depreciation automatically improves the trade balance immediately.",
      "C": "Correct. For a devaluation to improve the current account, import and export demand must be sufficiently elastic so that volume expansion outweighs price worsening: |e_x + e_m| > 1."
    },
    "misconception": "Assuming any currency depreciation automatically improves the trade balance immediately.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Economics",
    "skill_domain": "Currency Exchange Rates",
    "difficulty_tier": 2,
    "question_text": "The J-curve effect in international economics refers to the empirical phenomenon where:",
    "options": {
      "A": "A currency depreciation initially worsens the trade balance before improving it over the medium term",
      "B": "Interest rates drop before rising following central bank interventions",
      "C": "Exchange rates fluctuate in a parabolic shape across calendar months"
    },
    "correct_option": "A",
    "explanation": "Following a currency devaluation, existing trade contracts are fixed in volume, so the higher cost of imports worsens the trade balance initially. As volumes adjust over time, the balance improves, tracing a J-shape.",
    "distractor_analysis": {
      "A": "Correct. Following a currency devaluation, existing trade contracts are fixed in volume, so the higher cost of imports worsens the trade balance initially. As volumes adjust over time, the balance improves, tracing a J-shape.",
      "B": "Incorrect. \"Interest rates drop before rising following central bank interventions\" contradicts economic principles: assuming the trade balance improves immediately upon depreciation.",
      "C": "Incorrect. \"Exchange rates fluctuate in a parabolic shape across calendar months\" contradicts economic principles: assuming the trade balance improves immediately upon depreciation."
    },
    "misconception": "Assuming the trade balance improves immediately upon depreciation.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Economics",
    "skill_domain": "Currency Exchange Rates",
    "difficulty_tier": 2,
    "question_text": "Under a crawling peg exchange rate regime, the domestic currency is:",
    "options": {
      "A": "Completely freely floating on global foreign exchange markets",
      "B": "Periodically adjusted in small amounts at a fixed rate or in response to changes in selective quantitative indicators",
      "C": "Permanently tied to another currency with no permissible adjustments"
    },
    "correct_option": "B",
    "explanation": "A crawling peg allows the exchange rate to adjust periodically in small steps to accommodate inflation differentials while maintaining nominal anchor stability.",
    "distractor_analysis": {
      "A": "Incorrect. \"Completely freely floating on global foreign exchange markets\" contradicts economic principles: confusing crawling peg with clean float or hard currency board.",
      "B": "Correct. A crawling peg allows the exchange rate to adjust periodically in small steps to accommodate inflation differentials while maintaining nominal anchor stability.",
      "C": "Incorrect. \"Permanently tied to another currency with no permissible adjustments\" contradicts economic principles: confusing crawling peg with clean float or hard currency board."
    },
    "misconception": "Confusing crawling peg with clean float or hard currency board.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "CFA Level 1",
    "subject": "Economics",
    "skill_domain": "Currency Exchange Rates",
    "difficulty_tier": 2,
    "question_text": "In a spot FX transaction, what price does an investor pay to buy the base currency from a market-making dealer?",
    "options": {
      "A": "Mid-market price",
      "B": "Bid price",
      "C": "Ask (Offer) price"
    },
    "correct_option": "C",
    "explanation": "The dealer buys at the bid and sells at the ask. A client buying the base currency buys from the dealer at the dealer's ask (offer) price.",
    "distractor_analysis": {
      "A": "Incorrect. \"Mid-market price\" contradicts economic principles: thinking clients buy at the bid price.",
      "B": "Incorrect. \"Bid price\" contradicts economic principles: thinking clients buy at the bid price.",
      "C": "Correct. The dealer buys at the bid and sells at the ask. A client buying the base currency buys from the dealer at the dealer's ask (offer) price."
    },
    "misconception": "Thinking clients buy at the bid price.",
    "time_estimate_seconds": 35
  }
];
