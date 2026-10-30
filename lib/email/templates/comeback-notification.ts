// Path: lib/email/templates/comeback-notification.ts

interface ComebackEmailData {
  userName?: string;
  dueCount: number;
  decayingDomains: string[];
  actionUrl: string;
}

export function generateComebackEmailHtml({
  userName = "Test-Taker",
  dueCount,
  decayingDomains,
  actionUrl,
}: ComebackEmailData): string {
  const domainPills = decayingDomains
    .slice(0, 4)
    .map(
      (domain) => `
      <span style="display: inline-block; background-color: #1e1b4b; color: #a5b4fc; padding: 4px 10px; border-radius: 9999px; font-size: 12px; font-weight: 600; margin: 3px; border: 1px solid #4338ca;">
        ${domain}
      </span>
    `
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Memory Decay Alert — AceThePrep</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b0f19; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f8fafc;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0b0f19; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 540px; background-color: #111827; border: 1px solid #1f2937; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);">
          
          <!-- Top Accent Bar -->
          <tr>
            <td style="height: 4px; background: linear-gradient(90deg, #6366f1, #a855f7, #ec4899);"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding: 32px 32px 16px 32px;">
              <table role="presentation" width="100%">
                <tr>
                  <td>
                    <span style="display: inline-block; font-size: 13px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: #818cf8; background-color: rgba(99, 102, 241, 0.15); padding: 4px 12px; border-radius: 8px; border: 1px solid rgba(99, 102, 241, 0.3);">
                      Spaced Repetition Protocol
                    </span>
                    <h1 style="margin: 16px 0 8px 0; font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: -0.02em;">
                      ${dueCount} Concept ${dueCount === 1 ? "Trap is" : "Traps are"} Due for Review
                    </h1>
                    <p style="margin: 0; font-size: 14px; line-height: 22px; color: #94a3b8;">
                      Hey ${userName}, your Leitner memory half-life window has reached the review threshold. Reviewing now locks these concepts into long-term recall before test day.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Decaying Domains Box -->
          <tr>
            <td style="padding: 0 32px 24px 32px;">
              <div style="background-color: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 16px;">
                <p style="margin: 0 0 10px 0; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #cbd5e1;">
                  Vulnerable Topics Requiring Immediate Drill:
                </p>
                <div>
                  ${domainPills}
                </div>
              </div>
            </td>
          </tr>

          <!-- Action Button -->
          <tr>
            <td style="padding: 0 32px 32px 32px;" align="center">
              <a href="${actionUrl}" style="display: inline-block; width: 100%; box-sizing: border-box; text-align: center; background: linear-gradient(135deg, #4f46e5, #7c3aed); color: #ffffff; font-size: 15px; font-weight: 700; text-decoration: none; padding: 14px 24px; border-radius: 12px; box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.4);">
                Clear Queue Now (Takes ~2 mins) &rarr;
              </a>
              <p style="margin: 12px 0 0 0; font-size: 12px; color: #64748b;">
                Estimated time: 2 minutes to recover lost projected score points.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #0f172a; border-top: 1px solid #1e293b; text-align: center;">
              <p style="margin: 0 0 6px 0; font-size: 12px; color: #64748b;">
                AceThePrep — AI-Powered Standardized Exam Drilling
              </p>
              <p style="margin: 0; font-size: 11px; color: #475569;">
                You are receiving this because of active spaced repetition practice in your account.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

