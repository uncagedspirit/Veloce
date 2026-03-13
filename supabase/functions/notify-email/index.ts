const BREVO_API_KEY   = Deno.env.get('BREVO_API_KEY')            ?? '';
const SENDER_EMAIL    = Deno.env.get('NOTIFY_SENDER_EMAIL')       ?? '';
const SENDER_NAME     = Deno.env.get('NOTIFY_SENDER_NAME')        ?? 'Veloce Studio';
const RECEIVER_EMAIL  = Deno.env.get('NOTIFY_RECEIVER_EMAIL')     ?? '';
const BREVO_API_URL   = 'https://api.brevo.com/v3/smtp/email';

interface WebhookPayload {
  type:       'INSERT' | 'UPDATE' | 'DELETE';
  table:      string;
  schema:     string;
  record:     Record<string, unknown>;
  old_record: Record<string, unknown> | null;
}

const val = (v: unknown): string =>
  (v === null || v === undefined || v === '')
    ? '<em style="color:#888">—</em>'
    : String(v);

const row = (label: string, value: unknown) => `
  <tr>
    <td style="padding:10px 16px;border-bottom:1px solid #1e2d2d;color:#8bbfbf;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;width:160px;white-space:nowrap;vertical-align:top;">${label}</td>
    <td style="padding:10px 16px;border-bottom:1px solid #1e2d2d;color:#d4e8e8;font-size:14px;vertical-align:top;">${val(value)}</td>
  </tr>`;

const arrayVal = (v: unknown): string => {
  if (!v) return val(null);
  const arr: string[] = Array.isArray(v)
    ? v
    : (typeof v === 'string' ? JSON.parse(v) : []);
  return arr.length
    ? arr.map((i: string) =>
        `<span style="display:inline-block;padding:3px 10px;margin:2px;background:#1c4f4f;border:1px solid #2a6060;color:#8bbfbf;font-size:11px;letter-spacing:0.06em;">${i}</span>`
      ).join('')
    : val(null);
};

const sliderLabel = (v: number | null | undefined, left: string, right: string): string => {
  if (v === null || v === undefined) return val(null);
  if (v <= 2) return `${left} (${v}/5)`;
  if (v >= 4) return `${right} (${v}/5)`;
  return `Balanced (${v}/5)`;
};

function wrapEmail(badge: string, badgeColor: string, title: string, body: string): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#070c0c;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#070c0c;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr>
          <td style="background:#0d1515;border:1px solid #1e2d2d;border-bottom:none;padding:32px 40px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="font-size:18px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:#d4e8e8;">
                  VELOCE<span style="color:#e03120;">.</span>STUDIO
                </td>
                <td align="right">
                  <span style="display:inline-block;padding:4px 14px;background:${badgeColor};font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#070c0c;">
                    ${badge}
                  </span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background:#e03120;padding:20px 40px;">
            <p style="margin:0;font-size:22px;font-weight:800;letter-spacing:-0.01em;text-transform:uppercase;color:#070c0c;">
              ${title}
            </p>
          </td>
        </tr>
        <tr>
          <td style="background:#0d1515;border:1px solid #1e2d2d;border-top:none;padding:0;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
              ${body}
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 0 0;text-align:center;color:#3a5050;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;">
            Veloce Studio &middot; Automated Notification &middot; ${new Date().toUTCString()}
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function buildLeadEmail(r: Record<string, unknown>): { subject: string; html: string } {
  const body = `
    ${row('Name',         r.name)}
    ${row('Email',        r.email)}
    ${row('Company',      r.company)}
    ${row('Website',      r.website)}
    ${row('Project type', r.project_type)}
    ${row('Budget',       r.budget)}
    ${row('Timeline',     r.timeline)}
    <tr>
      <td style="padding:10px 16px;border-bottom:1px solid #1e2d2d;color:#8bbfbf;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;width:160px;vertical-align:top;">Description</td>
      <td style="padding:10px 16px;border-bottom:1px solid #1e2d2d;color:#d4e8e8;font-size:14px;line-height:1.6;vertical-align:top;">${val(r.description)}</td>
    </tr>
    ${row('Status',       r.status)}
    ${row('Submitted at', r.created_at)}
  `;
  return {
    subject: `New Lead — ${val(r.name)} (${val(r.project_type)})`,
    html: wrapEmail('New Lead', '#e03120', `New Lead: ${val(r.name)}`, body),
  };
}

function buildQuestionnaireEmail(r: Record<string, unknown>): { subject: string; html: string } {
  const spectrum = (r.design_spectrum as Record<string, number> | null) ?? {};
  const body = `
    ${row('Lead ID',       r.lead_id)}
    <tr><td colspan="2" style="padding:8px 16px;background:#0a1212;color:#e03120;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;border-bottom:1px solid #1e2d2d;">Business</td></tr>
    ${row('Business type', r.business_type)}
    ${row('Audience',      r.target_audience)}
    ${row('Goal',          r.website_goal)}
    <tr>
      <td style="padding:10px 16px;border-bottom:1px solid #1e2d2d;color:#8bbfbf;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;width:160px;vertical-align:top;">Problem to solve</td>
      <td style="padding:10px 16px;border-bottom:1px solid #1e2d2d;color:#d4e8e8;font-size:14px;line-height:1.6;vertical-align:top;">${val(r.problem_to_solve)}</td>
    </tr>
    <tr><td colspan="2" style="padding:8px 16px;background:#0a1212;color:#e03120;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;border-bottom:1px solid #1e2d2d;">Design</td></tr>
    <tr>
      <td style="padding:10px 16px;border-bottom:1px solid #1e2d2d;color:#8bbfbf;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;width:160px;vertical-align:top;">Brand personality</td>
      <td style="padding:10px 16px;border-bottom:1px solid #1e2d2d;vertical-align:top;">${arrayVal(r.brand_personality)}</td>
    </tr>
    <tr>
      <td style="padding:10px 16px;border-bottom:1px solid #1e2d2d;color:#8bbfbf;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;width:160px;vertical-align:top;">Inspiration sites</td>
      <td style="padding:10px 16px;border-bottom:1px solid #1e2d2d;color:#d4e8e8;font-size:14px;vertical-align:top;">${arrayVal(r.inspiration_sites)}</td>
    </tr>
    ${row('Minimal → Complex',    sliderLabel(spectrum.minimal_complex,    'Minimal',   'Complex'))}
    ${row('Corporate → Creative', sliderLabel(spectrum.corporate_creative, 'Corporate', 'Creative'))}
    ${row('Classic → Modern',     sliderLabel(spectrum.classic_modern,     'Classic',   'Modern'))}
    ${row('Static → Interactive', sliderLabel(spectrum.static_interactive, 'Static',    'Interactive'))}
    <tr><td colspan="2" style="padding:8px 16px;background:#0a1212;color:#e03120;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;border-bottom:1px solid #1e2d2d;">Structure &amp; Content</td></tr>
    <tr>
      <td style="padding:10px 16px;border-bottom:1px solid #1e2d2d;color:#8bbfbf;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;width:160px;vertical-align:top;">Pages needed</td>
      <td style="padding:10px 16px;border-bottom:1px solid #1e2d2d;vertical-align:top;">${arrayVal(r.pages_needed)}</td>
    </tr>
    ${row('Content status',  r.content_status)}
    <tr>
      <td style="padding:10px 16px;border-bottom:1px solid #1e2d2d;color:#8bbfbf;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;width:160px;vertical-align:top;">Brand assets</td>
      <td style="padding:10px 16px;border-bottom:1px solid #1e2d2d;vertical-align:top;">${arrayVal(r.brand_assets)}</td>
    </tr>
    ${row('Has domain',      r.has_domain)}
    ${row('Has hosting',     r.has_hosting)}
    <tr><td colspan="2" style="padding:8px 16px;background:#0a1212;color:#e03120;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;border-bottom:1px solid #1e2d2d;">Features &amp; Marketing</td></tr>
    <tr>
      <td style="padding:10px 16px;border-bottom:1px solid #1e2d2d;color:#8bbfbf;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;width:160px;vertical-align:top;">Features required</td>
      <td style="padding:10px 16px;border-bottom:1px solid #1e2d2d;vertical-align:top;">${arrayVal(r.features_required)}</td>
    </tr>
    ${row('CMS preference',  r.cms_preference)}
    <tr>
      <td style="padding:10px 16px;border-bottom:1px solid #1e2d2d;color:#8bbfbf;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;width:160px;vertical-align:top;">Marketing tools</td>
      <td style="padding:10px 16px;border-bottom:1px solid #1e2d2d;vertical-align:top;">${arrayVal(r.marketing_tools)}</td>
    </tr>
    ${row('SEO level',       r.seo_level)}
    <tr><td colspan="2" style="padding:8px 16px;background:#0a1212;color:#e03120;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;border-bottom:1px solid #1e2d2d;">Final Goals</td></tr>
    <tr>
      <td style="padding:10px 16px;border-bottom:1px solid #1e2d2d;color:#8bbfbf;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;width:160px;vertical-align:top;">Success definition</td>
      <td style="padding:10px 16px;border-bottom:1px solid #1e2d2d;color:#d4e8e8;font-size:14px;line-height:1.6;vertical-align:top;">${val(r.success_definition)}</td>
    </tr>
    <tr>
      <td style="padding:10px 16px;border-bottom:1px solid #1e2d2d;color:#8bbfbf;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;width:160px;vertical-align:top;">Business outcome</td>
      <td style="padding:10px 16px;border-bottom:1px solid #1e2d2d;color:#d4e8e8;font-size:14px;line-height:1.6;vertical-align:top;">${val(r.business_outcome)}</td>
    </tr>
    ${row('Submitted at',    r.created_at)}
  `;
  return {
    subject: `Questionnaire Submitted — Lead ${val(r.lead_id)}`,
    html: wrapEmail('Questionnaire', '#8bbfbf', 'Discovery Questionnaire Received', body),
  };
}

function buildContactEmail(r: Record<string, unknown>): { subject: string; html: string } {
  const body = `
    ${row('Name',           r.name)}
    ${row('Email',          r.email)}
    ${row('Company',        r.company)}
    ${row('Contact method', r.contact_method)}
    <tr>
      <td style="padding:10px 16px;border-bottom:1px solid #1e2d2d;color:#8bbfbf;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;width:160px;vertical-align:top;">Message</td>
      <td style="padding:10px 16px;border-bottom:1px solid #1e2d2d;color:#d4e8e8;font-size:14px;line-height:1.7;vertical-align:top;">${val(r.message)}</td>
    </tr>
    ${row('Submitted at',   r.created_at)}
  `;
  return {
    subject: `Contact Message — ${val(r.name)}`,
    html: wrapEmail('Contact', '#1c7070', `Contact Message: ${val(r.name)}`, body),
  };
}

async function sendEmail(subject: string, html: string): Promise<void> {
  const res = await fetch(BREVO_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender:      { email: SENDER_EMAIL, name: SENDER_NAME },
      to:          [{ email: RECEIVER_EMAIL }],
      subject,
      htmlContent: html,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Brevo ${res.status}: ${text}`);
  }
}

Deno.serve(async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const payload: WebhookPayload = await req.json();

    if (payload.type !== 'INSERT') {
      return new Response(
        JSON.stringify({ skipped: true, reason: 'not an INSERT' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const { table, record } = payload;
    let emailData: { subject: string; html: string };

    if      (table === 'leads')            emailData = buildLeadEmail(record);
    else if (table === 'questionnaire')    emailData = buildQuestionnaireEmail(record);
    else if (table === 'contact_messages') emailData = buildContactEmail(record);
    else {
      return new Response(
        JSON.stringify({ skipped: true, reason: `unknown table: ${table}` }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      );
    }

    await sendEmail(emailData.subject, emailData.html);

    return new Response(
      JSON.stringify({ ok: true, table, subject: emailData.subject }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );

  } catch (err) {
    console.error('[notify-email]', err);
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
});