// Path: lib/email/templates/duel-result-notification.ts

interface DuelResultEmailData {
  challengerName?: string;
  peerName: string;
  examName: string;
  challengerScore: number;
  peerScore: number;
  total: number;
  duelUrl: string;
}

export function generateDuelResultEmailHtml({
  challengerName = "Test-Taker",
  peerName,
  examName,
  challengerScore,
  peerScore,
  total,
  duelUrl,
}: DuelResultEmailData): string {
  const challengerPct = Math.round((challengerScore / total) * 100);
  const peerPct = Math.round((peerScore / total) * 100);
  const peerWon = peerScore > challengerScore;
  const isTie = peerScore === challengerScore;

  const resultHeadline = peerWon
    ? `${peerName} outscored you on ${examName}!`
    : isTie
    ? `${peerName} matched your score on ${examName}!`
    : `You held the lead against ${peerName} on ${examName}!`;

  const resultBadge = peerWon
    ? `<span style="display: inline-block; background-color: #451a03; color: #fbbf24; padding: 4px 12px; border-radius: 8px; font-size: 12px; font-weight: 700; border: 1px solid #78350f;">New High Score</span>`
    : isTie
    ? `<span style="display: inline-block; background-color: #1e1b4b; color: #a5b4fc; padding: 4px 12px; border-radius: 8px; font-size: 12px; font-weight: 700; border: 1px solid #4338ca;">Tied Match</span>`
    : `<span style="display: inline-block; background-color: #064e3b; color: #6ee7b7; padding: 4px 12px; border-radius: 8px; font-size: 12px; font-weight: 700; border: 1px solid #047857;">Challenger Defended</span>`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quiz Duel Completed — AceThePrep</title>
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
                    ${resultBadge}
                    <h1 style="margin: 16px 0 8px 0; font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: -0.02em;">
                      ${resultHeadline}
                    </h1>
                    <p style="margin: 0; font-size: 14px; line-height: 22px; color: #94a3b8;">
                      Hey ${challengerName}, your peer <strong style="color: #ffffff;">${peerName}</strong> just completed your 10-question ${examName} quiz duel.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Score Comparison Grid -->
          <tr>
            <td style="padding: 12px 32px 24px 32px;">
              <table role="presentation" width="100%" style="background-color: #0f172a; border: 1px solid #1e293b; border-radius: 14px; overflow: hidden;">
                <tr>
                  <!-- Challenger Score -->
                  <td width="50%" style="padding: 20px; text-align: center; border-right: 1px solid #1e293b;">
                    <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.05em; margin-bottom: 4px;">
                      Your Benchmark
                    </div>
                    <div style="font-size: 28px; font-weight: 800; color: #ffffff; line-height: 1;">
                      ${challengerScore} <span style="font-size: 14px; color: #64748b; font-weight: 500;">/ ${total}</span>
                    </div>
                    <div style="font-size: 12px; color: #818cf8; font-weight: 600; margin-top: 6px;">
                      ${challengerPct}%
                    </div>
                  </td>

                  <!-- Peer Score -->
                  <td width="50%" style="padding: 20px; text-align: center;">
                    <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.05em; margin-bottom: 4px;">
                      ${peerName}'s Score
                    </div>
                    <div style="font-size: 28px; font-weight: 800; color: ${peerWon ? "#34d399" : isTie ? "#a5b4fc" : "#f87171"}; line-height: 1;">
                      ${peerScore} <span style="font-size: 14px; color: #64748b; font-weight: 500;">/ ${total}</span>
                    </div>
                    <div style="font-size: 12px; color: ${peerWon ? "#34d399" : isTie ? "#a5b4fc" : "#f87171"}; font-weight: 600; margin-top: 6px;">
                      ${peerPct}%
                    </div>
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
                    <a href="${duelUrl}" style="display: block; width: 100%; box-sizing: border-box; background: linear-gradient(135deg, #6366f1, #4f46e5); color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 700; padding: 14px 24px; border-radius: 12px; text-align: center; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);">
                      View Head-to-Head Duel Board &rarr;
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin: 16px 0 0 0; font-size: 12px; color: #64748b;">
                Want to run another set? Practice drills and custom mocks on <a href="https://www.acetheprep.com" style="color: #818cf8; text-decoration: none;">AceThePrep</a>.
              </p>
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
