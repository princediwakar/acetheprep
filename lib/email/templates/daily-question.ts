// Path: lib/email/templates/daily-question.ts

interface DailyQuestionEmailData {
  userName?: string;
  examName: string;
  questionId: string;
  skillDomain: string;
  difficultyTier: number;
  questionText: string;
  options: Record<string, string>;
  baseUrl: string;
}

export function generateDailyQuestionEmailHtml({
  userName = "Test-Taker",
  examName,
  questionId,
  skillDomain,
  difficultyTier,
  questionText,
  options,
  baseUrl,
}: DailyQuestionEmailData): string {
  const sortedOptionKeys = Object.keys(options).sort();

  const optionButtons = sortedOptionKeys
    .map((letter) => {
      const optionUrl = `${baseUrl}/q/${questionId}?answer=${letter}&utm_source=daily_email`;
      const optionText = options[letter];

      return `
      <tr>
        <td style="padding: 6px 0;">
          <a href="${optionUrl}" 
             style="display: block; width: 100%; box-sizing: border-box; background-color: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 14px 18px; text-decoration: none; color: #f8fafc; font-size: 14px; line-height: 20px; transition: background-color 0.15s ease;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
              <tr>
                <td width="30" valign="top">
                  <span style="display: inline-block; width: 24px; height: 24px; line-height: 24px; text-align: center; background-color: #312e81; color: #a5b4fc; font-weight: 700; font-size: 12px; border-radius: 6px; font-family: monospace;">
                    ${letter}
                  </span>
                </td>
                <td style="color: #e2e8f0; font-size: 14px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                  ${optionText}
                </td>
                <td width="20" align="right" style="color: #64748b; font-size: 14px;">
                  &rarr;
                </td>
              </tr>
            </table>
          </a>
        </td>
      </tr>
      `;
    })
    .join("");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Daily Trap Drill — AceThePrep</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b0f19; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f8fafc;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0b0f19; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 560px; background-color: #111827; border: 1px solid #1f2937; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);">
          
          <!-- Top Gradient Accent -->
          <tr>
            <td style="height: 4px; background: linear-gradient(90deg, #6366f1, #a855f7, #ec4899);"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding: 28px 28px 16px 28px;">
              <table role="presentation" width="100%">
                <tr>
                  <td>
                    <span style="display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #818cf8; background-color: rgba(99, 102, 241, 0.15); padding: 4px 10px; border-radius: 6px; border: 1px solid rgba(99, 102, 241, 0.3);">
                      60-Second Daily Calibration
                    </span>
                    <h1 style="margin: 14px 0 6px 0; font-size: 20px; font-weight: 800; color: #ffffff; letter-spacing: -0.02em;">
                      ${examName} • Level ${difficultyTier} Challenge
                    </h1>
                    <p style="margin: 0; font-size: 13px; color: #94a3b8;">
                      Focus Area: <strong style="color: #cbd5e1;">${skillDomain}</strong>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Question Stem Box -->
          <tr>
            <td style="padding: 0 28px 20px 28px;">
              <div style="background-color: #1e293b; border: 1px solid #334155; border-radius: 14px; padding: 20px; font-size: 15px; line-height: 24px; color: #f1f5f9;">
                ${questionText}
              </div>
            </td>
          </tr>

          <!-- Option Buttons (Direct 1-Click Answering) -->
          <tr>
            <td style="padding: 0 28px 24px 28px;">
              <p style="margin: 0 0 12px 0; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b;">
                Tap your answer to reveal the trap analysis:
              </p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                ${optionButtons}
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 28px; background-color: #0b0f19; border-top: 1px solid #1f2937; text-align: center;">
              <p style="margin: 0 0 8px 0; font-size: 12px; color: #64748b;">
                AceThePrep Spaced Calibration • One question a day to stop memory decay before test day.
              </p>
              <a href="${baseUrl}/home" style="color: #818cf8; font-size: 12px; text-decoration: none; font-weight: 600;">
                Go to Full Dashboard &rarr;
              </a>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

