/**
 * SupabaseService — REST API wrapper for Veloce lead pipeline
 *
 * Setup:
 *   1. Create a .env file in your project root:
 *      VITE_SUPABASE_URL=https://yourproject.supabase.co
 *      VITE_SUPABASE_ANON_KEY=your-anon-key
 *
 *   2. Run the SQL schema below in Supabase SQL editor:
 *
 *   -- LEADS TABLE
 *   create table leads (
 *     id uuid primary key default gen_random_uuid(),
 *     name text not null,
 *     email text not null,
 *     company text,
 *     website text,
 *     project_type text,
 *     budget text,
 *     timeline text,
 *     description text,
 *     status text default 'new',
 *     created_at timestamptz default now()
 *   );
 *
 *   -- QUESTIONNAIRE TABLE
 *   create table questionnaire (
 *     id uuid primary key default gen_random_uuid(),
 *     lead_id uuid references leads(id) on delete cascade,
 *     business_type text,
 *     target_audience text,
 *     website_goal text,
 *     problem_to_solve text,
 *     brand_personality text[],
 *     design_spectrum jsonb,
 *     inspiration_sites jsonb,
 *     pages_needed text[],
 *     content_status text,
 *     brand_assets text[],
 *     has_domain boolean,
 *     has_hosting boolean,
 *     features_required text[],
 *     cms_preference text,
 *     marketing_tools text[],
 *     seo_level text,
 *     success_definition text,
 *     business_outcome text,
 *     created_at timestamptz default now()
 *   );
 *
 *   -- Enable RLS and add insert policies as needed
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const IS_DEV = !SUPABASE_URL;

const headers = () => ({
  'Content-Type': 'application/json',
  apikey: SUPABASE_KEY || '',
  Authorization: `Bearer ${SUPABASE_KEY || ''}`,
  Prefer: 'return=representation',
});

async function req(path, method = 'GET', body = null) {
  if (IS_DEV) {
    console.info(`[Supabase DEV] ${method} /rest/v1${path}`, body ?? '');
    return null;
  }
  const res = await fetch(`${SUPABASE_URL}/rest/v1${path}`, {
    method,
    headers: headers(),
    ...(body !== null ? { body: JSON.stringify(body) } : {}),
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => res.statusText);
    throw new Error(`Supabase ${res.status}: ${msg}`);
  }
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export const SupabaseService = {
  /** Insert a new lead row, returns { id, ...data } */
  async createLead(data) {
    if (IS_DEV) {
      const id = `dev_${Date.now()}`;
      console.info('[Supabase DEV] createLead →', { id, ...data });
      return { id, ...data };
    }
    const result = await req('/leads', 'POST', data);
    return Array.isArray(result) ? result[0] : result;
  },

  /** Patch an existing lead row */
  async updateLead(id, patch) {
    if (IS_DEV) {
      console.info('[Supabase DEV] updateLead →', id, patch);
      return { id, ...patch };
    }
    const result = await req(`/leads?id=eq.${id}`, 'PATCH', patch);
    return Array.isArray(result) ? result[0] : result;
  },

  /** Insert questionnaire row linked to lead */
  async submitQuestionnaire(data) {
    if (IS_DEV) {
      const id = `dev_q_${Date.now()}`;
      console.info('[Supabase DEV] submitQuestionnaire →', { id, ...data });
      return { id, ...data };
    }
    const result = await req('/questionnaire', 'POST', data);
    return Array.isArray(result) ? result[0] : result;
  },
};