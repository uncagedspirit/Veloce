const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const IS_DEV = !SUPABASE_URL || !SUPABASE_KEY;

function isValidUUID(str) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);
}

const headers = () => ({
  'Content-Type': 'application/json',
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  Prefer: 'return=representation',
});

async function req(path, method = 'GET', body = null) {
  if (IS_DEV) {
    console.info(`[Supabase DEV] ${method} /rest/v1${path}`, body ?? '');
    return null;
  }

  const url = `${SUPABASE_URL}/rest/v1${path}`;
  const res = await fetch(url, {
    method,
    headers: headers(),
    ...(body !== null ? { body: JSON.stringify(body) } : {}),
  });

  const text = await res.text();
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${text || res.statusText}`);
  return text ? JSON.parse(text) : null;
}

export const SupabaseService = {

  async createLead(data) {
    if (IS_DEV) {
      const id = crypto.randomUUID();
      console.info('[Supabase DEV] createLead →', { id, ...data });
      return { id, ...data };
    }
    const result = await req('/leads', 'POST', data);
    const row = Array.isArray(result) ? result[0] : result;
    if (!row?.id) throw new Error('Supabase did not return inserted lead row');
    return row;
  },

  async updateLead(id, patch) {
    if (IS_DEV) {
      console.info('[Supabase DEV] updateLead →', id, patch);
      return { id, ...patch };
    }
    const result = await req(`/leads?id=eq.${id}`, 'PATCH', patch);
    const row = Array.isArray(result) ? result[0] : result;
    return row ?? { id, ...patch };
  },

  async submitQuestionnaire(data) {
    const payload = { ...data };
    if (payload.lead_id && !isValidUUID(payload.lead_id)) {
      console.warn('[SupabaseService] Dropping invalid lead_id:', payload.lead_id);
      delete payload.lead_id;
    }
    if (IS_DEV) {
      const id = crypto.randomUUID();
      console.info('[Supabase DEV] submitQuestionnaire →', { id, ...payload });
      return { id, ...payload };
    }
    const result = await req('/questionnaire', 'POST', payload);
    const row = Array.isArray(result) ? result[0] : result;
    if (!row?.id) throw new Error('Supabase did not return inserted questionnaire row');
    return row;
  },

  async submitContactMessage(data) {
    if (IS_DEV) {
      const id = crypto.randomUUID();
      console.info('[Supabase DEV] submitContactMessage →', { id, ...data });
      return { id, ...data };
    }
    const result = await req('/contact_messages', 'POST', {
      name:           data.name,
      email:          data.email,
      company:        data.company  || null,
      contact_method: data.contact_method || null,
      message:        data.message,
    });
    const row = Array.isArray(result) ? result[0] : result;
    if (!row?.id) throw new Error('Supabase did not return inserted contact_messages row');
    return row;
  },
};