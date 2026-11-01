// Path: lib/email/templates/referral-reward-notification.ts

interface ReferralRewardEmailData {
  inviterName?: string;
  friendName?: string;
  daysGranted?: number;
  expiryDateStr?: string;
}

export function generateReferralRewardEmailHtml({
  inviterName = "Test-Taker",
  friendName = "Your study partner",
  daysGranted = 7,
  expiryDateStr,
}: ReferralRewardEmailData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Study Partner Pass Unlocked — AceThePrep</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b0f19; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f8fafc;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0b0f19; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 540px; background-color: #111827; border: 1px solid #1f2937; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);">
          
          <!-- Top Accent Bar -->
          <tr>
            <td style="height: 4px; background: linear-gradient(90deg, #10b981, #6366f1, #a855f7);"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding: 32px 32px 16px 32px;">
              <table role="presentation" width="100%">
                <tr>
                  <td>
                    <span style="display: inline-block; background-color: #064e3b; color: #6ee7b7; padding: 4px 12px; border-radius: 8px; font-size: 12px; font-weight: 700; border: 1px solid #047857;">
                      Study Partner Reward
                    </span>
                    <h1 style="margin: 16px 0 8px 0; font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: -0.02em;">
                      ${daysGranted} Days of Pro Unlocked!
                    </h1>
                    <p style="margin: 0; font-size: 14px; line-height: 22px; color: #94a3b8;">
                      Hey ${inviterName}, great news! <strong style="color: #ffffff;">${friendName}</strong> just joined AceThePrep using your study link.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Pro Pass Features Card -->
          <tr>
            <td style="padding: 12px 32px 24px 32px;">
              <table role="presentation" width="100%" style="background-color: #0f172a; border: 1px solid #1e293b; border-radius: 14px; padding: 20px;">
                <tr>
                  <td>
                    <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #34d399; letter-spacing: 0.05em; margin-bottom: 8px;">
                      Active Pro Privileges Activated
                    </div>
                    <ul style="margin: 0; padding-left: 18px; font-size: 13px; line-height: 22px; color: #cbd5e1;">
                      <li>Unlimited daily test sessions (No 10-question cap)</li>
                      <li>Full 25Q Practice Sets & 50Q Diagnostic Mocks</li>
                      <li>AI Socratic distractor trap debates</li>
                      <li>Spaced repetition Leitner mistake scheduling</li>
                    </ul>
                    ${
                      expiryDateStr
                        ? `<p style="margin: 12px 0 0 0; font-size: 11px; color: #64748b;">Valid through: <strong style="color: #94a3b8;">${expiryDateStr}</strong></p>`
                        : ""
                    }
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding: 0 32px 32px 32px; text-align: center;">
              <table role="presentation" width="100%">
                <tr>
                  <td>
                    <a href="https://www.acetheprep.com/home" style="display: block; width: 100%; box-sizing: border-box; background: linear-gradient(135deg, #10b981, #059669); color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 700; padding: 14px 24px; border-radius: 12px; text-align: center; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);">
                      Launch Pro Practice Drills &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 32px; background-color: #0b0f19; border-top: 1px solid #1f2937; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #475569;">
                AceThePrep &middot; Socratic AI & Distractor Trap Forensics
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
