import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("RichContent & Data Visualization Engine", () => {
  it("detects and extracts GFM Markdown pipe tables correctly", () => {
    const mdTable = `
A corporate dataset records the performance of five regional divisions:

| Regional Division | Annual Revenue | Operating Costs | Headcount |
| :--- | :--- | :--- | :--- |
| Division A | $2.4M | $1.8M | 40 |
| Division B | $3.6M | $2.4M | 60 |
| Division C | $1.5M | $0.9M | 20 |

Which division achieved the highest operating profit per employee?
`;

    const lines = mdTable.split("\n").map((l) => l.trim()).filter(Boolean);
    const tableLines = lines.filter((l) => l.startsWith("|") && l.endsWith("|"));
    assert.equal(tableLines.length, 5); // 1 header + 1 divider + 3 rows
  });

  it("detects and recovers legacy inline run-on tables (Screenshot Fix)", () => {
    const screenshotText =
      "Table Analysis: The table below reports annual figures for four products. Product P: 1,200 units sold; revenue $18,000 Product Q: 800 units sold; revenue $14,400 Product R: 1,500 units sold; revenue $16,500 Product S: 600 units sold; revenue $9,600 Which product had the greatest revenue per unit sold?";

    const entityNames =
      "(?:Product|Division|Company|Partner|Shift|Formulation|Alpha|Beta|Gamma|Delta|Epsilon)";
    const prefixPattern = new RegExp(
      `(?:^|[.\\n\\s])(${entityNames}(?:\\s+[A-Za-z0-9]+)?):`,
      "gi"
    );

    const matches: string[] = [];
    let m;
    while ((m = prefixPattern.exec(screenshotText)) !== null) {
      matches.push(m[1].trim());
    }

    assert.deepEqual(matches, [
      "Product P",
      "Product Q",
      "Product R",
      "Product S",
    ]);
  });

  it("parses embedded chart code blocks cleanly", () => {
    const chartMarkdown = `
A pie chart illustrates global energy production by source:

\`\`\`chart:pie
{
  "title": "Global Energy Production",
  "data": [
    { "name": "Petroleum", "value": 35 },
    { "name": "Coal", "value": 25 },
    { "name": "Natural Gas", "value": 20 }
  ]
}
\`\`\`

What is the sector angle?
`;

    const chartRegex = /```chart(?::(bar|line|pie|area))?\s*([\s\S]*?)```/i;
    const match = chartMarkdown.match(chartRegex);
    assert.ok(match, "Chart block must be detected");
    assert.equal(match[1], "pie");

    const json = JSON.parse(match[2].trim());
    assert.equal(json.title, "Global Energy Production");
    assert.equal(json.data.length, 3);
  });

  it("extracts Multi-Source Reasoning (MSR) tabs cleanly from Image 1 text", () => {
    const msrText = `Tab 1 (Contract Terms): 'Consultants traveling on firm business are reimbursed for airfare up to $600 per domestic flight, hotel stays up to $200 per night, and a flat per diem meal stipend of $75 per day.'\nTab 2 (Expense Report): 'A consultant completed a 4-day, 3-night business trip. The expense report claimed: Airfare $550, Hotel (3 nights total) $660, Meals (4 days) $300.'\n\nWhat is the total reimbursed amount approved under firm policy?`;

    const tabRegex = /(?:^|\n)\s*(?:Tab|Exhibit|Source)\s+(\d+)\s*(?:\(([^)]+)\)|:)?:\s*/gi;
    const matches: string[] = [];
    let m;
    while ((m = tabRegex.exec(msrText)) !== null) {
      matches.push(m[2] ? m[2].trim() : `Source ${m[1]}`);
    }

    assert.deepEqual(matches, ["Contract Terms", "Expense Report"]);
  });

  it("protects currency tokens from being falsely parsed as KaTeX math", () => {
    const text = "airfare up to $600 per domestic flight, hotel stays up to $200 per night, and $75 per day.";
    const currencyRegex = /(?<=^|[\s("'`“\[])\$((?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?(?:[kMB]|k\/mo)?)(?=$|\s|,(?!\d)|\.(?!\d)|[;:!?"'`”\)\]])/g;
    const currencies: string[] = [];
    const protectedText = text.replace(currencyRegex, (match) => {
      currencies.push(match);
      return `__CURRENCY_${currencies.length - 1}__`;
    });

    const mathParts = protectedText.split(/(\$\$.*?\$\$|\$.*?\$)/g);
    // Should have NO math parts!
    const mathCount = mathParts.filter(p => p.startsWith("$") && p.endsWith("$")).length;
    assert.equal(mathCount, 0, "No false math parts should be matched in pure currency text");
    assert.equal(currencies.length, 3);
    assert.deepEqual(currencies, ["$600", "$200", "$75"]);
  });

  it("does not hijack formulas starting with numbers into currency (Screenshot Fix)", () => {
    const currencyRegex = /(?<=^|[\s("'`“\[])\$((?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?(?:[kMB]|k\/mo)?)(?=$|\s|,(?!\d)|\.(?!\d)|[;:!?"'`”\)\]])/g;
    const formula = "$5,000(1.02)^{12}$";
    const matches = formula.match(currencyRegex);
    assert.equal(matches, null, "Formula starting with number must NOT match currency regex");

    const optionA = "$5,000(1.08)^3$";
    assert.equal(optionA.match(currencyRegex), null);

    const mathNumber = "$5,000$";
    assert.equal(mathNumber.match(currencyRegex), null);

    const singleDigitMath = "$7$";
    assert.equal(singleDigitMath.match(currencyRegex), null);
  });
});

